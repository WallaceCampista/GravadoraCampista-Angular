// src/app/components/login/loginbox/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService,  } from 'src/app/service/servicos/usuario/auth.service';
import { UserService } from 'src/app/service/servicos/usuario/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
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

    setTimeout(() => {
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          localStorage.setItem('token', response.token); // Armazena o token no localStorage
          this.userService.nomeUser = response.primeiroNome; // Define o nome do usuário
          this.userService.isAdmin = response.isAdmin; // Define se o usuário é administrador
          this.router.navigate(['/home']);
        },
        error: () => {
          this.isLoading = false;
          // Exibir mensagem de erro (implemente conforme necessário)
        }
      });
    }, 1000); // Aguarda 1 segundo antes de fazer a requisição
  }
}
