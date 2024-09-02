import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BandaService } from 'src/app/service/servicos/formularios/banda.service';

@Component({
  selector: 'app-cadastro-banda',
  templateUrl: './cadastro-banda.component.html',
  styleUrls: ['./cadastro-banda.component.scss']
})
export class CadastroBandaComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  @Output() bandRegistered = new EventEmitter<void>();

  showSuccessAlert = false;
  showErrorAlert = false;
  alertMessage = '';

  constructor(private router: Router, private fb: FormBuilder, private bandaService: BandaService) {
    this.form = this.fb.group({
      nomeBanda: [''],
      resumoBanda: ['']
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  onRegister() {
    this.isLoading = true;
    setTimeout(() => {
      const band = this.form.value;
      this.bandaService.registerBand(band).subscribe(response => {
        this.isLoading = false;
        if (response.status === 201) {
          this.alertMessage = 'Cadastro realizado com sucesso!';
          this.showSuccessAlert = true;
          this.showErrorAlert = false;
          this.hideAlertsAfterDelay();
          this.bandRegistered.emit();
          this.router.navigate(['/banda']).then(() => {
            this.resetForm();
          });
        } else {
          this.alertMessage = 'Erro ao cadastrar!';
          this.showErrorAlert = true;
          this.showSuccessAlert = false;
          this.hideAlertsAfterDelay();
        }
      }, error => {
        this.isLoading = false;
        this.alertMessage = 'Erro ao cadastrar!';
        this.showErrorAlert = true;
        this.showSuccessAlert = false;
        this.hideAlertsAfterDelay();
      });
    }, 1000);
  }

  hideAlertsAfterDelay() {
    setTimeout(() => {
      this.showSuccessAlert = false;
      this.showErrorAlert = false;
    }, 3000);
  }

  resetForm() {
    this.form.reset();
  }
}
