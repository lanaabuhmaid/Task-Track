import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent {
  constructor() {
    console.log('📦 Dashboard loaded');
  }
  role = 'employee'; // مؤقتا
  userName = 'Lana'; // مؤقتا
}
