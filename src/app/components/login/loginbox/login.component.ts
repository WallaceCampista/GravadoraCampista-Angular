// src/app/components/login/loginbox/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onLogin() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
  }
}
