import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;

  isLoading: boolean = false;
  access: boolean = false;

  errorMessages: string[] = []; 

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(() => {
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.access = true;
          this.registerForm.reset();
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
  }

  onInputChange() {
    this.errorMessages = [];  
  }

}
