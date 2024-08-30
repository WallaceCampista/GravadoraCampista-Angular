import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popup-editar',
  templateUrl: './popup-editar.component.html',
  styleUrls: ['./popup-editar.component.scss']
})
export class PopupEditarComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() tipo: string = '';
  editForm: FormGroup;
  isUsuarioRoute: boolean = false;
  isBandaRoute: boolean = false;
  isAlbumRoute: boolean = false;
  isMusicaRoute: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      isAdministrator: [false],
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

  ngOnInit() {
    this.route.url.subscribe(url => {
      this.isUsuarioRoute = url.some(segment => segment.path === 'usuario');
      this.isBandaRoute = url.some(segment => segment.path === 'banda');
      this.isAlbumRoute = url.some(segment => segment.path === 'album');
      this.isMusicaRoute = url.some(segment => segment.path === 'musica');
    });
  }

  toggleModal(tipo: string) {
    this.showModal = !this.showModal;
    this.tipo = tipo;
  }

  saveChanges() {
    console.log(this.editForm.value);
    this.toggleModal('');
  }
}
