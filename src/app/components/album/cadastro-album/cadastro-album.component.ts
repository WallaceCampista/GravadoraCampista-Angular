import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlbumService } from 'src/app/service/servicos/formularios/album.service';
import { BandaService } from 'src/app/service/servicos/formularios/banda.service';
import { extrairMensagemErro } from 'src/app/utils/mensagem-erro';

@Component({
  selector: 'app-cadastro-album',
  templateUrl: './cadastro-album.component.html',
  styleUrls: ['./cadastro-album.component.scss']
})
export class CadastroAlbumComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  @Output() albumRegistered = new EventEmitter<void>();
  bandas: { idBanda: number; nomeBanda: string }[] = [];

  showSuccessAlert = false;
  showErrorAlert = false;
  alertMessage = '';

  constructor(private router: Router, private fb: FormBuilder, private albumService: AlbumService, private bandaService: BandaService) {
    this.form = this.fb.group({
      idBanda: [''],
      nomeAlbum: [''],
      resumoAlbum: ['']
    });
  }

  ngOnInit() {
    this.resetForm();
    this.bandaService.getAllBand().subscribe(bandas => this.bandas = bandas);
  }

  onRegister() {
    const { idBanda, nomeAlbum, resumoAlbum } = this.form.value;
    if (!idBanda || !nomeAlbum || !resumoAlbum) {
      this.mostrarAlerta('Preencha todos os campos.', false);
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const album = { idBanda: Number(idBanda), nomeAlbum, resumoAlbum };
      this.albumService.registerAlbum(album).subscribe(response => {
        this.isLoading = false;
        if (response.status === 201) {
          this.mostrarAlerta('Cadastro realizado com sucesso!', true);
          this.albumRegistered.emit();
          this.router.navigate(['/album']).then(() => {
            this.resetForm();
          });
        } else {
          this.mostrarAlerta('Erro ao cadastrar!', false);
        }
      }, error => {
        this.isLoading = false;
        this.mostrarAlerta(extrairMensagemErro(error, 'Erro ao cadastrar!'), false);
      });
    }, 1000);
  }

  mostrarAlerta(mensagem: string, sucesso: boolean) {
    this.alertMessage = mensagem;
    this.showSuccessAlert = sucesso;
    this.showErrorAlert = !sucesso;
    this.hideAlertsAfterDelay();
  }

  hideAlertsAfterDelay() {
    setTimeout(() => {
      this.showSuccessAlert = false;
      this.showErrorAlert = false;
    }, 3000);
  }

  resetForm() {
    this.form.reset();
  }
}
