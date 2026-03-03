import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private router: Router) {}

  login() {
    this.error = null;
    if (!this.username.trim()) {
      this.error = 'Ingrese un nombre de usuario';
      return;
    }

    // Fake login: store minimal user in localStorage
    localStorage.setItem('fake_user', JSON.stringify({ username: this.username }));
    // Navigate to dashboard
    this.router.navigate(['/dashboard']);
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
