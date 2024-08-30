import { Component } from '@angular/core';

@Component({
  selector: 'app-popup-apagar',
  templateUrl: './popup-apagar.component.html',
  styleUrls: ['./popup-apagar.component.scss']
})
export class PopupApagarComponent {
  showModal = false;
  isDeleting = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }

  onDelete() {
    this.isDeleting = true;
    setTimeout(() => {
      this.isDeleting = false;
      // Adicione aqui a lógica de deleção
      this.toggleModal();
    }, 2000);
  }
}
