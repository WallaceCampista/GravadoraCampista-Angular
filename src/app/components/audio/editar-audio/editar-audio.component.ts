import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicaService } from 'src/app/service/servicos/formularios/musica.service';
import { extrairMensagemErro } from 'src/app/utils/mensagem-erro';
import { LIMITE_AUDIO_MB } from 'src/app/utils/midia';

export interface AudioMusica {
  audioArquivo: string;  // "" = sem áudio
  duracao: number;
}

// Parte do popup de edição da música (só admin): envia ou remove o MP3 na hora, separado do "Salvar".
// A API lê a duração do arquivo; depois do envio a música é lida de novo para mostrar essa duração.
@Component({
  selector: 'app-editar-audio',
  templateUrl: './editar-audio.component.html',
  styleUrls: ['./editar-audio.component.scss']
})
export class EditarAudioComponent {
  @Input() id!: number;
  @Input() arquivo: string = '';
  @Input() duracao: number = 0;
  @Output() alterado = new EventEmitter<AudioMusica>();

  readonly limiteMb = LIMITE_AUDIO_MB;
  enviando = false;
  mensagem: string | null = null;
  erro: string | null = null;

  constructor(private musicaService: MusicaService) {}

  escolher(seletor: HTMLInputElement) {
    const arquivo = seletor.files?.[0];
    seletor.value = ''; // permite escolher o mesmo arquivo de novo
    if (!arquivo) {
      return;
    }
    // Alguns sistemas não informam o tipo; aí vale a extensão (a API confere o conteúdo de qualquer jeito)
    if (arquivo.type !== 'audio/mpeg' && !arquivo.name.toLowerCase().endsWith('.mp3')) {
      this.mostrarErro('Escolha um arquivo MP3.');
      return;
    }
    if (arquivo.size > LIMITE_AUDIO_MB * 1024 * 1024) {
      this.mostrarErro(`O áudio passa do limite de ${LIMITE_AUDIO_MB} MB.`);
      return;
    }
    this.executar(this.musicaService.enviarAudio(this.id, arquivo), 'MP3 enviado!');
  }

  remover() {
    this.executar(this.musicaService.removerAudio(this.id), 'Áudio removido.');
  }

  private executar(requisicao: Observable<string>, sucesso: string) {
    this.enviando = true;
    this.mensagem = null;
    this.erro = null;
    requisicao.subscribe({
      next: () => this.recarregar(sucesso),
      error: (error: HttpErrorResponse) => {
        this.enviando = false;
        this.mostrarErro(extrairMensagemErro(error, 'Não foi possível salvar o áudio.'));
      }
    });
  }

  private recarregar(sucesso: string) {
    this.musicaService.getAllMusic().subscribe({
      next: musicas => {
        const musica = musicas.find((item: any) => item.idMusica === this.id);
        this.enviando = false;
        this.mensagem = sucesso;
        if (musica) {
          this.arquivo = musica.audioArquivo ?? '';
          this.duracao = musica.duracao;
          this.alterado.emit({ audioArquivo: this.arquivo, duracao: this.duracao });
        }
      },
      error: () => {
        this.enviando = false;
        this.mensagem = sucesso;
      }
    });
  }

  private mostrarErro(mensagem: string) {
    this.mensagem = null;
    this.erro = mensagem;
  }
}
