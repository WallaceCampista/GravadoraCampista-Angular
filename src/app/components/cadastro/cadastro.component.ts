// In `src/app/components/cadastro/cadastro.component.ts`
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      nome: [''],
      sobrenome: [''],
      username: [''],
      password: [''],
      email: ['']
    });
  }

  onRegister() {
    const user = {
      username: this.form.value.username,
      password: this.form.value.password,
      email: this.form.value.email,
      primeiroNome: this.form.value.nome,
      sobrenome: this.form.value.sobrenome
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erro ao registrar usuário:', error);
      }
    });
  }
}
