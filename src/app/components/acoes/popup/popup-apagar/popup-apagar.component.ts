import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup-apagar',
  templateUrl: './popup-apagar.component.html',
  styleUrls: ['./popup-apagar.component.scss']
})
export class PopupApagarComponent {
  showModal = false;
  @Output() confirm = new EventEmitter<void>();

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onDelete() {
    this.confirm.emit();
    this.toggleModal();
  }
}
