import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetailComponent {
  name: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(pm => {
      this.name = pm.get('name');
    });
  }

  back() {
    this.router.navigate(['/users']);
  }
}
