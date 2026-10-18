import { Component, ViewChild, ElementRef, EventEmitter, Output, AfterViewChecked } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BandaService } from 'src/app/service/servicos/formularios/banda.service';
import { AlbumService } from 'src/app/service/servicos/formularios/album.service';
import { MusicaService } from 'src/app/service/servicos/formularios/musica.service';
import { extrairMensagemErro } from 'src/app/utils/mensagem-erro';

export type TipoAvaliacao = 'banda' | 'album' | 'musica';

@Component({
  selector: 'app-popup-avaliar',
  templateUrl: './popup-avaliar.component.html',
  styleUrls: ['./popup-avaliar.component.scss']
})
export class PopupAvaliarComponent implements AfterViewChecked {
  @ViewChild('notaInput') notaInput!: ElementRef;
  @Output() avaliado = new EventEmitter<void>();

  showModal: boolean = false;
  tipo: TipoAvaliacao = 'banda';
  id!: number;
  form: FormGroup;
  isSaving = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  // Nota que o usuário já deu a este item; avaliar de novo substitui
  minhaNota: number | null = null;
  private focarNota = false;

  constructor(
    private fb: FormBuilder,
    private bandaService: BandaService,
    private albumService: AlbumService,
    private musicaService: MusicaService
  ) {
    this.form = this.fb.group({
      nota: ['']
    });
  }

  abrir(tipo: TipoAvaliacao, id: number) {
    this.tipo = tipo;
    this.id = id;
    this.form.reset();
    this.errorMessage = null;
    this.successMessage = null;
    this.minhaNota = null;
    this.showModal = true;
    this.focarNota = true;
    this.carregarMinhaNota(tipo, id);
  }

  private carregarMinhaNota(tipo: TipoAvaliacao, id: number) {
    let requisicao: Observable<{ nota: number | null }>;
    if (tipo === 'album') {
      requisicao = this.albumService.minhaAvaliacaoAlbum(id);
    } else if (tipo === 'musica') {
      requisicao = this.musicaService.minhaAvaliacaoMusica(id);
    } else {
      requisicao = this.bandaService.minhaAvaliacaoBanda(id);
    }

    requisicao.subscribe({
      next: ({ nota }) => {
        // Ignora a resposta se o popup já foi aberto para outro item
        if (this.tipo !== tipo || this.id !== id || nota === null) {
          return;
        }
        this.minhaNota = nota;
        // Já preenche com a nota atual, sem apagar o que a pessoa começou a digitar
        const campo = this.form.get('nota');
        if (campo && (campo.value === null || campo.value === '')) {
          campo.setValue(nota);
        }
      },
      // Sem a nota anterior o popup funciona do mesmo jeito
      error: () => {}
    });
  }

  // O campo só existe depois que o *ngIf desenha o modal
  ngAfterViewChecked() {
    if (this.focarNota && this.notaInput) {
      this.focarNota = false;
      this.notaInput.nativeElement.focus();
    }
  }

  fechar() {
    this.showModal = false;
  }

  avaliar() {
    const texto = (this.form.get('nota')?.value ?? '').toString().replace(',', '.').trim();
    const nota = Number(texto);
    if (texto === '' || isNaN(nota) || nota < 0 || nota > 10) {
      this.errorMessage = 'Informe uma nota de 0 a 10.';
      return;
    }

    let requisicao: Observable<string>;
    if (this.tipo === 'album') {
      requisicao = this.albumService.avaliarAlbum(this.id, nota);
    } else if (this.tipo === 'musica') {
      requisicao = this.musicaService.avaliarMusica(this.id, nota);
    } else {
      requisicao = this.bandaService.avaliarBanda(this.id, nota);
    }

    this.isSaving = true;
    this.errorMessage = null;
    requisicao.subscribe({
      next: () => {
        this.isSaving = false;
        this.successMessage = this.minhaNota === null ? 'Avaliação registrada!' : 'Sua nota foi atualizada!';
        // Só avisa a tabela depois de fechar: recarregar a lista recria esta linha
        setTimeout(() => {
          this.fechar();
          this.avaliado.emit();
        }, 1200);
      },
      error: (error: HttpErrorResponse) => {
        this.isSaving = false;
        this.errorMessage = extrairMensagemErro(error, 'Erro ao registrar a avaliação.');
      }
    });
  }
}
