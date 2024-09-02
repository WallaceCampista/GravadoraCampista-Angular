import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';
import { UserService } from 'src/app/service/servicos/usuario/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  form: FormGroup;
  errorMessage: string | null = null;

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
    event.preventDefault();
    this.onLogin();
  }

  onLogin() {
    this.isLoading = true;

    setTimeout(() => {
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          localStorage.setItem('token', response.token);
          this.userService.nomeUser = response.primeiroNome;
          this.userService.isAdmin = response.isAdmin;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.isLoading = false;
          console.log('Headers:', error.headers);
          // this.errorMessage = error.headers.get('message')
          this.errorMessage = 'Usuário ou senha inválidos';
          this.form.reset();
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        }
      });
    }, 1000);
  }
}
