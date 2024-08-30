import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-album',
  templateUrl: './cadastro-album.component.html',
  styleUrls: ['./cadastro-album.component.scss']
})
export class CadastroAlbumComponent {
  isLoading = false;
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      idBanda: [''],
      nomeAlbum: [''],
      resumoAlbum: ['']
    });
  }

  onRegister() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/album']);
    }, 2000);
  }
}
