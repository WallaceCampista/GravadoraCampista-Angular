import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-musica',
  templateUrl: './cadastro-musica.component.html',
  styleUrls: ['./cadastro-musica.component.scss']
})
export class CadastroMusicaComponent {
  isLoading = false;
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      IDdoAlbum: [''],
      nomeMusica: [''],
      resumoMusica: [''],
      DuracaoMusica: ['']
    });
  }

  onRegister() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/musica']);
    }, 2000);
  }
}
