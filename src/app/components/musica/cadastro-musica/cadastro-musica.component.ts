import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicaService } from 'src/app/service/servicos/formularios/musica.service';
import { extrairMensagemErro } from 'src/app/utils/mensagem-erro';

@Component({
  selector: 'app-cadastro-musica',
  templateUrl: './cadastro-musica.component.html',
  styleUrls: ['./cadastro-musica.component.scss']
})
export class CadastroMusicaComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  @Output() musicRegistered = new EventEmitter<void>();

  showSuccessAlert = false;
  showErrorAlert = false;
  alertMessage = '';

  constructor(private router: Router, private fb: FormBuilder, private musicaService: MusicaService) {
    this.form = this.fb.group({
      idAlbum: ['', Validators.required],
      nomeMusica: ['', Validators.required],
      resumoMusica: ['', Validators.required],
      duracao: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  onRegister() {
    if (this.form.invalid) {
      this.mostrarAlerta('Preencha todos os campos.', false);
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      const { idAlbum, nomeMusica, resumoMusica, duracao } = this.form.value;
      const music = { idAlbum: Number(idAlbum), nomeMusica, resumoMusica, duracao: Number(duracao) };
      this.musicaService.registerMusic(music).subscribe(response => {
        this.isLoading = false;
        if (response.status === 201) {
          this.mostrarAlerta('Cadastro realizado com sucesso!', true);
          this.musicRegistered.emit();
          this.router.navigate(['/musica']).then(() => {
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
