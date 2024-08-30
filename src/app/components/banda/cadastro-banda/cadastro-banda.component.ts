import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro-banda',
  templateUrl: './cadastro-banda.component.html',
  styleUrls: ['./cadastro-banda.component.scss']
})
export class CadastroBandaComponent implements OnInit {
  isLoading = false;
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
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
      this.isLoading = false;
      this.router.navigate(['/banda']).then(() => {
        this.resetForm();
      });
    }, 2000);
  }

  resetForm() {
    this.form.reset();
  }
}
