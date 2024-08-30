// src/app/components/acoes/btn-acoes/lixeira/lixeira.component.ts
import { Component, ViewChild } from '@angular/core';
import { PopupApagarComponent } from '../../popup/popup-apagar/popup-apagar.component';

@Component({
  selector: 'app-lixeira',
  templateUrl: './lixeira.component.html',
  styleUrls: ['./lixeira.component.scss']
})
export class LixeiraComponent {
  @ViewChild('popupApagar') popupApagar!: PopupApagarComponent;

  toggleModal() {
    this.popupApagar.toggleModal();
  }
}
