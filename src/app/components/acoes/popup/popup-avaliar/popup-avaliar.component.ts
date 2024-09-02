import { Component, ViewChild, ElementRef, AfterViewInit, AfterViewChecked, ChangeDetectorRef, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BandaService } from 'src/app/service/servicos/formularios/banda.service';

@Component({
  selector: 'app-popup-avaliar',
  templateUrl: './popup-avaliar.component.html',
  styleUrls: ['./popup-avaliar.component.scss']
})
export class PopupAvaliarComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('notaInput') notaInput!: ElementRef;
  @Input() bandId!: number;

  showModal: boolean = false;
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private cdr: ChangeDetectorRef, private bandaService: BandaService) {
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

  toggleModal(bandId?: number) {
    this.showModal = !this.showModal;
    if (bandId !== undefined) {
      this.bandId = bandId;
    }
  }

  avaliar() {
    const nota = this.form.get('nota')?.value;
    if (this.bandId && nota) {
      this.bandaService.avaliarBanda(this.bandId, nota).subscribe(
        response => {
          this.toggleModal();
        },
        error => {
        }
      );
    }
  }
}
