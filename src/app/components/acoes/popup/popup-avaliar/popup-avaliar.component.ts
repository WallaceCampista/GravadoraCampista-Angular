import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-avaliar',
  templateUrl: './popup-avaliar.component.html',
  styleUrls: ['./popup-avaliar.component.scss']
})
export class PopupAvaliarComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('notaInput') notaInput!: ElementRef;

  showModal: boolean = false;
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.form = this.fb.group({
      nota: ['']
    });
  }

  ngAfterViewInit() {
    // Remover o setTimeout daqui
  }

  ngAfterViewChecked() {
    if (this.showModal && this.notaInput && this.notaInput.nativeElement) {
      this.cdr.detectChanges(); // Ensure the view is updated
      setTimeout(() => {
        if (this.notaInput && this.notaInput.nativeElement) {
          this.notaInput.nativeElement.focus();
        }
      }, 0);
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
