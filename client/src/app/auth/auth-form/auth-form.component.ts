import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  public loginErrorMessage = '';
  public isPasswordShown = false;
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public togglePasswordShow(): void {
    this.isPasswordShown = !this.isPasswordShown;
  }

  public onFormSubmit(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: (userData) => {
        console.log(userData);
        this.loginErrorMessage = '';
        this.router.navigateByUrl('/');
      },
      error: (e) => {
        this.loginErrorMessage = e.error.error;
      },
    });
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }
}
