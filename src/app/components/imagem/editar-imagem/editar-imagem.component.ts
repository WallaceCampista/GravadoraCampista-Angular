import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BandaService } from 'src/app/service/servicos/formularios/banda.service';
import { AlbumService } from 'src/app/service/servicos/formularios/album.service';
import { extrairMensagemErro } from 'src/app/utils/mensagem-erro';
import { LIMITE_IMAGEM_MB, TIPOS_IMAGEM } from 'src/app/utils/midia';

// Parte do popup de edição (só admin): envia ou remove a foto da banda / capa do álbum na hora,
// separado do botão "Salvar" dos outros campos.
@Component({
  selector: 'app-editar-imagem',
  templateUrl: './editar-imagem.component.html',
  styleUrls: ['./editar-imagem.component.scss']
})
export class EditarImagemComponent implements OnDestroy {
  @Input() tipo: 'banda' | 'album' = 'banda';
  @Input() id!: number;
  @Input() arquivo: string | null = null;
  @Input() nome: string = '';
  @Output() alterada = new EventEmitter<void>();

  readonly tiposAceitos = TIPOS_IMAGEM.join(',');
  readonly limiteMb = LIMITE_IMAGEM_MB;
  previa: string | null = null;
  enviando = false;
  mensagem: string | null = null;
  erro: string | null = null;

  constructor(private bandaService: BandaService, private albumService: AlbumService) {}

  get rotulo(): string {
    return this.tipo === 'banda' ? 'Foto da banda' : 'Capa do álbum';
  }

  get temImagem(): boolean {
    return !!(this.previa || this.arquivo);
  }

  escolher(seletor: HTMLInputElement) {
    const arquivo = seletor.files?.[0];
    seletor.value = ''; // permite escolher o mesmo arquivo de novo
    if (!arquivo) {
      return;
    }
    if (!TIPOS_IMAGEM.includes(arquivo.type)) {
      this.mostrarErro('Escolha uma imagem JPG, PNG ou WebP.');
      return;
    }
    if (arquivo.size > LIMITE_IMAGEM_MB * 1024 * 1024) {
      this.mostrarErro(`A imagem passa do limite de ${LIMITE_IMAGEM_MB} MB.`);
      return;
    }

    const envio = this.tipo === 'banda'
      ? this.bandaService.enviarFoto(this.id, arquivo)
      : this.albumService.enviarCapa(this.id, arquivo);
    this.executar(envio, () => this.trocarPrevia(URL.createObjectURL(arquivo)), 'Imagem atualizada!');
  }

  remover() {
    const remocao = this.tipo === 'banda'
      ? this.bandaService.removerFoto(this.id)
      : this.albumService.removerCapa(this.id);
    this.executar(remocao, () => {
      this.trocarPrevia(null);
      this.arquivo = null;
    }, 'Imagem removida.');
  }

  ngOnDestroy(): void {
    this.trocarPrevia(null);
  }

  private executar(requisicao: Observable<string>, aoConcluir: () => void, sucesso: string) {
    this.enviando = true;
    this.mensagem = null;
    this.erro = null;
    requisicao.subscribe({
      next: () => {
        this.enviando = false;
        aoConcluir();
        this.mensagem = sucesso;
        this.alterada.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.enviando = false;
        this.mostrarErro(extrairMensagemErro(error, 'Não foi possível salvar a imagem.'));
      }
    });
  }

  // A prévia é um endereço local (blob:) do arquivo escolhido; libera o anterior para não vazar memória
  private trocarPrevia(nova: string | null) {
    if (this.previa) {
      URL.revokeObjectURL(this.previa);
    }
    this.previa = nova;
  }

  private mostrarErro(mensagem: string) {
    this.mensagem = null;
    this.erro = mensagem;
  }
}
