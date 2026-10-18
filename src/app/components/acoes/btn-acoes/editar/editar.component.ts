import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PopupEditarComponent, TipoEdicao } from '../../popup/popup-editar/popup-editar.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent {
  @ViewChild('popupEditar') popupEditar!: PopupEditarComponent;
  @Input() tipo: TipoEdicao = 'banda';
  @Input() item: any;
  @Output() salvo = new EventEmitter<void>();

  openPopup() {
    this.popupEditar.abrir(this.tipo, this.item);
  }
}
