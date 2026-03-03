import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  user = signal<{ username?: string } | null>(null);

  constructor(private router: Router) {
    try {
      const raw = localStorage.getItem('fake_user');
      if (raw) this.user.set(JSON.parse(raw));
    } catch (e) {
      this.user.set(null);
    }
  }

  logout() {
    localStorage.removeItem('fake_user');
    this.router.navigate(['/']);
  }
}
