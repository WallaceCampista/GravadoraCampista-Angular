import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BandaService } from 'src/app/service/servicos/banda.service';

@Component({
  selector: 'app-cadastro-banda',
  templateUrl: './cadastro-banda.component.html',
  styleUrls: ['./cadastro-banda.component.scss']
})
export class CadastroBandaComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  @Output() bandRegistered = new EventEmitter<void>();

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
          console.log('Banda cadastrada com sucesso!');
          this.bandRegistered.emit();
          this.router.navigate(['/banda']).then(() => {
            this.resetForm();
          });
        } else {
          console.error('Erro ao cadastrar a banda:', response);
        }
      }, error => {
        this.isLoading = false;
        console.error('Erro ao cadastrar a banda:', error);
      });
    }, 1000);
  }

  resetForm() {
    this.form.reset();
  }
}
