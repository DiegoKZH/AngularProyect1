import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';
import { UserListComponent } from './components/user-list/user-list';
import { FooterComponent } from './components/footer/footer';
import { NgApexchartsModule } from "ng-apexcharts";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, UserListComponent, FooterComponent,NgApexchartsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
  
  // Inyectamos el servicio Router
  private router = inject(Router);

  // Función para detectar si estamos en el dashboard
  isDashboardRoute(): boolean {
    return this.router.url === '/dashboard';
  }
}