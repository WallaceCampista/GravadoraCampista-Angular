import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { urlMidia } from 'src/app/utils/midia';

// Uma faixa pronta para tocar: o que o reprodutor e o controle de mídia do sistema mostram
export interface Faixa {
  id: number;
  nome: string;
  banda: string;
  album: string;
  capaArquivo: string | null;
  audioArquivo: string;
}

export interface EstadoPlayer {
  fila: Faixa[];
  indice: number;     // posição da faixa atual na fila (-1 = reprodutor fechado)
  tocando: boolean;
  tempo: number;      // segundos já tocados
  duracao: number;    // segundos da faixa (0 até o navegador ler o começo do arquivo)
  volume: number;     // 0 a 1
  erro: string | null;
}

const INICIAL: EstadoPlayer = { fila: [], indice: -1, tocando: false, tempo: 0, duracao: 0, volume: 1, erro: null };

// Um único elemento de áudio para o site inteiro: como o serviço não é recriado ao trocar de
// página, a música continua tocando enquanto a pessoa navega.
@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly estado = new BehaviorSubject<EstadoPlayer>(INICIAL);
  readonly estado$ = this.estado.asObservable();
  // Só existe no navegador: na pré-renderização (SSR) não há áudio
  private readonly audio: HTMLAudioElement | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    if (isPlatformBrowser(platformId)) {
      this.audio = new Audio();
      this.audio.preload = 'metadata';
      this.ouvirAudio(this.audio);
      this.ligarTeclasDeMidia();
    }
  }

  get faixaAtual(): Faixa | null {
    const { fila, indice } = this.estado.value;
    return fila[indice] ?? null;
  }

  get tocando(): boolean {
    return this.estado.value.tocando;
  }

  // Troca a fila inteira e começa pela faixa escolhida ("Tocar álbum" ou o ▶ de uma faixa)
  tocarFila(fila: Faixa[], inicio = 0) {
    if (!fila.length) {
      return;
    }
    this.atualizar({ fila });
    this.irPara(inicio);
  }

  alternar() {
    if (!this.audio || !this.faixaAtual) {
      return;
    }
    if (this.audio.paused) {
      this.tocar();
    } else {
      this.audio.pause();
    }
  }

  // Como nos players: depois de 3 segundos, "anterior" volta ao começo da faixa
  anterior() {
    const { indice } = this.estado.value;
    if (!this.audio || this.audio.currentTime > 3 || indice <= 0) {
      this.buscar(0);
      return;
    }
    this.irPara(indice - 1);
  }

  proxima() {
    const { fila, indice } = this.estado.value;
    if (indice < fila.length - 1) {
      this.irPara(indice + 1);
    }
  }

  buscar(segundos: number) {
    if (this.audio && Number.isFinite(segundos)) {
      this.audio.currentTime = segundos;
    }
  }

  definirVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.min(1, Math.max(0, volume));
    }
  }

  fechar() {
    if (this.audio) {
      this.audio.pause();
      this.audio.removeAttribute('src');
      this.audio.load();
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = null;
      }
    }
    this.estado.next({ ...INICIAL, volume: this.estado.value.volume });
  }

  private irPara(indice: number) {
    const faixa = this.estado.value.fila[indice];
    if (!this.audio || !faixa) {
      return;
    }
    this.atualizar({ indice, tempo: 0, duracao: 0, erro: null });
    this.audio.src = urlMidia(faixa.audioArquivo) ?? '';
    this.tocar();
    this.mostrarNoSistema(faixa);
  }

  private tocar() {
    // Recusa sem problema: trocar de faixa no meio do carregamento cancela o play anterior,
    // e um arquivo que não abre cai no evento "error"
    this.audio?.play().catch(() => {});
  }

  private ouvirAudio(audio: HTMLAudioElement) {
    audio.addEventListener('play', () => {
      this.atualizar({ tocando: true });
      this.atualizarSistema();
    });
    audio.addEventListener('pause', () => {
      this.atualizar({ tocando: false });
      this.atualizarSistema();
    });
    audio.addEventListener('timeupdate', () => this.atualizar({ tempo: audio.currentTime }));
    audio.addEventListener('loadedmetadata', () => {
      this.atualizar({ duracao: audio.duration });
      this.atualizarSistema();
    });
    audio.addEventListener('seeked', () => this.atualizarSistema());
    audio.addEventListener('volumechange', () => this.atualizar({ volume: audio.volume }));
    // No fim da fila o áudio só pausa; o ▶ toca a última faixa de novo
    audio.addEventListener('ended', () => this.proxima());
    audio.addEventListener('error', () => {
      if (this.faixaAtual) {
        this.atualizar({ tocando: false, erro: 'Não foi possível tocar esta faixa.' });
      }
    });
  }

  // Media Session: as teclas de mídia do teclado e o controle de mídia do sistema/navegador
  private ligarTeclasDeMidia() {
    if (!('mediaSession' in navigator)) {
      return;
    }
    const acoes: [MediaSessionAction, MediaSessionActionHandler][] = [
      ['play', () => this.tocar()],
      ['pause', () => this.audio?.pause()],
      ['previoustrack', () => this.anterior()],
      ['nexttrack', () => this.proxima()],
      ['seekto', detalhes => this.buscar(detalhes.seekTime ?? 0)]
    ];
    for (const [acao, tratar] of acoes) {
      try {
        navigator.mediaSession.setActionHandler(acao, tratar);
      } catch {
        // Navegador sem suporte a essa ação
      }
    }
  }

  private mostrarNoSistema(faixa: Faixa) {
    if (!('mediaSession' in navigator)) {
      return;
    }
    const capa = urlMidia(faixa.capaArquivo);
    navigator.mediaSession.metadata = new MediaMetadata({
      title: faixa.nome,
      artist: faixa.banda,
      album: faixa.album,
      artwork: capa ? [{ src: capa }] : []
    });
  }

  private atualizarSistema() {
    const audio = this.audio;
    if (!audio || !('mediaSession' in navigator)) {
      return;
    }
    navigator.mediaSession.playbackState = audio.paused ? 'paused' : 'playing';
    if (Number.isFinite(audio.duration)) {
      try {
        navigator.mediaSession.setPositionState({
          duration: audio.duration,
          position: Math.min(audio.currentTime, audio.duration),
          playbackRate: audio.playbackRate
        });
      } catch {
        // Posição inválida durante a troca de faixa
      }
    }
  }

  private atualizar(parcial: Partial<EstadoPlayer>) {
    this.estado.next({ ...this.estado.value, ...parcial });
  }
}
