import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [CommonModule, FormsModule], 
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  message: string | null = null;

  onSubmit() {
    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        this.message = 'Registration successful! Please login.';
        this.router.navigate(['/login']);
      },
      error: () => (this.message = 'Registration failed'),
    });
  }
}
