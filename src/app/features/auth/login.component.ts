import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  constructor(
  private fb: FormBuilder,
  private http: HttpClient,
  private router: Router,
  private authService: AuthService
) {}


  ngOnInit() {
  this.form = this.fb.group({
    employeeId: ['', Validators.required],
    password: ['', Validators.required],
  });
}


  // onSubmit(): void {
  //   if (this.form.valid) {
  //     const loginReq = this.form.value;

  //     this.authService.login(loginReq).subscribe({
  //       next: (response) => {
  //         localStorage.setItem('token', response.token);
  //         this.router.navigate(['/dashboard']);
  //       },
  //       error: (err) => {
  //         console.error('Login failed:', err);
  //       },
  //     });
  //   }
  // }
}

