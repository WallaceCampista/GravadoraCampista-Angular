import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BandaService } from 'src/app/service/servicos/formularios/banda.service';
import { AlbumService } from 'src/app/service/servicos/formularios/album.service';
import { MusicaService } from 'src/app/service/servicos/formularios/musica.service';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';
import { extrairMensagemErro } from 'src/app/utils/mensagem-erro';

export type TipoEdicao = 'banda' | 'album' | 'musica' | 'usuario';

const TITULOS: Record<TipoEdicao, string> = {
  banda: 'banda',
  album: 'álbum',
  musica: 'música',
  usuario: 'usuário'
};

@Component({
  selector: 'app-popup-editar',
  templateUrl: './popup-editar.component.html',
  styleUrls: ['./popup-editar.component.scss']
})
export class PopupEditarComponent {
  @Output() salvo = new EventEmitter<void>();
  showModal: boolean = false;
  tipo: TipoEdicao = 'banda';
  item: any;
  editForm: FormGroup;
  isSaving = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private bandaService: BandaService,
    private albumService: AlbumService,
    private musicaService: MusicaService,
    private authService: AuthService
  ) {
    this.editForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
      primeiroNome: [''],
      sobrenome: [''],
      isAdmin: [false],
      nomeBanda: [''],
      resumoBanda: [''],
      idBanda: [''],
      nomeAlbum: [''],
      resumoAlbum: [''],
      idAlbum: [''],
      nomeMusica: [''],
      resumoMusica: [''],
      duracaoMusica: ['']
    });
  }

  get titulo(): string {
    return TITULOS[this.tipo];
  }

  // Abre o formulário já preenchido com os dados atuais do item da tabela
  abrir(tipo: TipoEdicao, item: any) {
    this.tipo = tipo;
    this.item = item;
    this.errorMessage = null;
    this.editForm.reset({ isAdmin: false });

    switch (tipo) {
      case 'banda':
        this.editForm.patchValue({ nomeBanda: item.nome, resumoBanda: item.resumo });
        break;
      case 'album':
        this.editForm.patchValue({ idBanda: item.idBanda, nomeAlbum: item.nome, resumoAlbum: item.resumo });
        break;
      case 'musica':
        this.editForm.patchValue({ idAlbum: item.idAlbum, nomeMusica: item.nome, resumoMusica: item.resumo, duracaoMusica: item.duracao });
        break;
      case 'usuario':
        this.editForm.patchValue({
          username: item.username,
          email: item.email,
          primeiroNome: item.nome,
          sobrenome: item.sobrenome,
          isAdmin: item.isAdmin
        });
        break;
    }
    this.showModal = true;
  }

  fechar() {
    this.showModal = false;
  }

  saveChanges() {
    const valores = this.editForm.value;
    let requisicao: Observable<string>;

    switch (this.tipo) {
      case 'banda':
        if (!this.preenchidos(valores.nomeBanda, valores.resumoBanda)) return;
        requisicao = this.bandaService.updateBand(this.item.id, {
          nomeBanda: valores.nomeBanda,
          resumoBanda: valores.resumoBanda
        });
        break;
      case 'album':
        if (!this.preenchidos(valores.idBanda, valores.nomeAlbum, valores.resumoAlbum)) return;
        requisicao = this.albumService.updateAlbum(this.item.id, {
          idBanda: Number(valores.idBanda),
          nomeAlbum: valores.nomeAlbum,
          resumoAlbum: valores.resumoAlbum
        });
        break;
      case 'musica':
        if (!this.preenchidos(valores.idAlbum, valores.nomeMusica, valores.resumoMusica, valores.duracaoMusica)) return;
        requisicao = this.musicaService.updateMusic(this.item.id, {
          idAlbum: Number(valores.idAlbum),
          nomeMusica: valores.nomeMusica,
          resumoMusica: valores.resumoMusica,
          duracao: Number(valores.duracaoMusica)
        });
        break;
      case 'usuario': {
        // O backend grava qualquer campo enviado, então só manda o que foi preenchido (senha vazia = manter)
        const usuario: any = { isAdmin: valores.isAdmin };
        for (const campo of ['username', 'password', 'email', 'primeiroNome', 'sobrenome']) {
          const valor = (valores[campo] ?? '').toString().trim();
          if (valor) {
            usuario[campo] = valor;
          }
        }
        requisicao = this.authService.updateUser(this.item.id, usuario);
        break;
      }
      default:
        return;
    }

    this.isSaving = true;
    this.errorMessage = null;
    requisicao.subscribe({
      next: () => {
        this.isSaving = false;
        this.fechar();
        this.salvo.emit();
      },
      error: (error: HttpErrorResponse) => {
        this.isSaving = false;
        this.errorMessage = extrairMensagemErro(error, 'Erro ao salvar as alterações.');
      }
    });
  }

  private preenchidos(...valores: any[]): boolean {
    const ok = valores.every(valor => valor !== null && valor !== undefined && valor.toString().trim() !== '');
    this.errorMessage = ok ? null : 'Preencha todos os campos.';
    return ok;
  }
}
