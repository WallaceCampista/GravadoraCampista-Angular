import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicaService } from 'src/app/service/servicos/formularios/musica.service';

@Component({
  selector: 'app-cadastro-musica',
  templateUrl: './cadastro-musica.component.html',
  styleUrls: ['./cadastro-musica.component.scss']
})
export class CadastroMusicaComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  @Output() musicRegistered = new EventEmitter<void>();

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
    this.isLoading = true;
    setTimeout(() => {
      const music = this.form.value;
      this.musicaService.registerMusic(music).subscribe(response => {
        this.isLoading = false;
        if (response.status === 201) {
          this.musicRegistered.emit();
          this.router.navigate(['/musica']).then(() => {
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
