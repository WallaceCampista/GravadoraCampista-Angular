// src/app/components/login/loginbox/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../service/servicos/usuario/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    this.onLogin();
  }

  onLogin() {
    this.isLoading = true;
    console.log('isLoading:', this.isLoading); // Adicionado para depuração

    setTimeout(() => {
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Login bem-sucedido:', response);
          localStorage.setItem('token', response.token); // Armazena o token no localStorage
          this.router.navigate(['/home']);
        },
        error: () => {
          this.isLoading = false;
          console.log('isLoading:', this.isLoading); // Adicionado para depuração
          // Exibir mensagem de erro (implemente conforme necessário)
        }
      });
    }, 1000); // Aguarda 1 segundo antes de fazer a requisição
  }
}
