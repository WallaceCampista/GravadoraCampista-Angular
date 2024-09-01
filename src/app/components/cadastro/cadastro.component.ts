// cadastro.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onRegister() {
    if (this.form.valid) {
      this.http.post('http://localhost:8080/usuarios/post/registro/', this.form.value)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/login']);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 201) {
              this.router.navigate(['/login']);
            } else {
              console.error('Erro ao registrar usuário:', error);
            }
          }
        });
    }
  }
}
