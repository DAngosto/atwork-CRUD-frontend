import { Routes } from '@angular/router';
import { AuthenticationGuard } from './modules/shared/guards/authentication.guard';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { RegisterComponent } from './modules/authentication/components/register/register.component';
import { UnauthorizedComponent } from './modules/shared/components/unauthorized/unauthorized.component';
import { EmployeesPageComponent } from './modules/employees/components/employees-page/employees-page.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [{ path: '', component: DashboardComponent }],
  },
  {
    path: 'employees',
    canActivate: [AuthenticationGuard],
    canActivateChild: [AuthenticationGuard],
    children: [{ path: '', component: EmployeesPageComponent }],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
