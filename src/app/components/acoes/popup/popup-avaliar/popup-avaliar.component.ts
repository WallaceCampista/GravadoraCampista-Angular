import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-popup-avaliar',
  templateUrl: './popup-avaliar.component.html',
  styleUrls: ['./popup-avaliar.component.scss']
})
export class PopupAvaliarComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('notaInput') notaInput!: ElementRef;

  showModal: boolean = false;

  ngAfterViewInit() {
    // Remover o setTimeout daqui
  }

  ngAfterViewChecked() {
    if (this.showModal) {
      setTimeout(() => this.notaInput.nativeElement.focus(), 0);
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
