import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopupEditarComponent } from '../../popup/popup-editar/popup-editar.component'; // Corrigir o caminho do módulo

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  @ViewChild('popupEditar') popupEditar!: PopupEditarComponent;
  tipo: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe(url => {
      const path = url[0].path;
      if (path === 'banda' || path === 'album' || path === 'musica') {
        this.tipo = path;
      }
    });
  }

  openPopup() {
    this.popupEditar.toggleModal(this.tipo);
  }
}
