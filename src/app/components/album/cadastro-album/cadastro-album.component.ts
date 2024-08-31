import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlbumService } from 'src/app/service/servicos/album.service';

@Component({
  selector: 'app-cadastro-album',
  templateUrl: './cadastro-album.component.html',
  styleUrls: ['./cadastro-album.component.scss']
})
export class CadastroAlbumComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  @Output() albumRegistered = new EventEmitter<void>();

  constructor(private router: Router, private fb: FormBuilder, private albumService: AlbumService) {
    this.form = this.fb.group({
      idBanda: [''],
      nomeAlbum: [''],
      resumoAlbum: ['']
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  onRegister() {
    this.isLoading = true;
    setTimeout(() => {
      const album = this.form.value;
      this.albumService.registerAlbum(album).subscribe(response => {
        this.isLoading = false;
        if (response.status === 201) {
          console.log('Album cadastrado com sucesso!');
          this.albumRegistered.emit();
          this.router.navigate(['/album']).then(() => {
            this.resetForm();
          });
        } else {
          console.error('Erro ao cadastrar o album:', response);
        }
      }, error => {
        this.isLoading = false;
        console.error('Erro ao cadastrar o album:', error);
      });
    }, 1000);
  }

  resetForm() {
    this.form.reset();
  }
}
