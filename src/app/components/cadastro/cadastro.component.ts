import {Component, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';
import { ErrorComponent } from '../alertas/error/error.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  form: FormGroup;
  errorMessage: string | null = null;
  @ViewChild(ErrorComponent) errorComponent!: ErrorComponent;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      primeiroNome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onRegister() {
    const user = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      primeiroNome: this.form.value.primeiroNome,
      sobrenome: this.form.value.sobrenome
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 201) {
          this.router.navigate(['/login']);
        } else {
          // this.errorMessage = this.formatErrorMessage(error.error) || 'Erro desconhecido';
          this.errorMessage = 'Erro desconhecido';
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      }
    });
  }
}
