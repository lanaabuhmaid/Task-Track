import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login.component').then((m) => m.LoginPageComponent),
      }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboards/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'tasks',
        loadComponent: () =>
          import('./features/dashboard/tasks/tasks.component').then(m => m.TasksComponent)
      },
      {
        path: 'add-tasks',
        loadComponent: () =>
          import('./features/dashboard/add-tasks/add-tasks.component').then(m => m.AddTasksComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
