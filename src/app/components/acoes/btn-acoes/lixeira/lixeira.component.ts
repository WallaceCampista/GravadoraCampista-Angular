import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { PopupApagarComponent } from '../../popup/popup-apagar/popup-apagar.component';

@Component({
  selector: 'app-lixeira',
  templateUrl: './lixeira.component.html',
  styleUrls: ['./lixeira.component.scss']
})
export class LixeiraComponent {
  @ViewChild('popupApagar') popupApagar!: PopupApagarComponent;
  @Output() delete = new EventEmitter<void>();

  toggleModal() {
    this.popupApagar.toggleModal();
  }

  confirmDelete() {
    this.delete.emit();
  }
}
