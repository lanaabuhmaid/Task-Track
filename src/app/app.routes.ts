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
      },
      {
        path: 'team-members',
        loadComponent: () =>
          import('./features/dashboard/team-members/team-members.component').then(m => m.TeamMembersComponent)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/dashboard/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('./features/dashboard/attendance/attendance.component').then(m => m.AttendanceComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
