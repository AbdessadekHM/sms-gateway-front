import { Routes } from '@angular/router';
import { HomeComponent } from './feature/landing/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { canActivateAuthRole } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'receivers',
    loadChildren: () =>
      import('./feature/receivers/receivers.module').then(
        (m) => m.ReceiversModule
      ),
    canActivate: [canActivateAuthRole],
    data: {
      role: 'USER',
    },
  },
  { path: '**', redirectTo: '' },
];
