import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  isLoading: boolean = false;
  access: boolean = false;

  errorMessages: string[] = []; 

  constructor (private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {

  }


  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    const username = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/home']);
        this.loginForm.reset();
      },
      error: (errorResponse) => {
        this.isLoading = false;

        if (errorResponse.status === 400 && errorResponse.error) {
          this.errorMessages = errorResponse.error.map((err: any) => err.description);
        } else {
          this.errorMessages = ['An unexpected error occurred.'];
        }
      }
    });
  }

  onInputChange() {
    this.errorMessages = [];  
  }

}
