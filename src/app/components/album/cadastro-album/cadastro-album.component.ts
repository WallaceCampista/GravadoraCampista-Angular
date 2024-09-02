import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlbumService } from 'src/app/service/servicos/formularios/album.service';

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
          this.albumRegistered.emit();
          this.router.navigate(['/album']).then(() => {
            this.resetForm();
          });
        } else {
        }
      }, error => {
        this.isLoading = false;
      });
    }, 1000);
  }

  resetForm() {
    this.form.reset();
  }
}
