import { Routes } from '@angular/router';
import { HomeComponent } from './feature/landing/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { DashboardComponent } from './feature/root/dashboard/dashboard.component';
import { AddReceiverComponent } from './feature/root/add-receiver/add-receiver.component';
import { AddGroupComponent } from './feature/root/add-group/add-group.component';
import { SendSmsComponent } from './feature/root/send-sms/send-sms.component';
import { SendWhatsappComponent } from './feature/root/send-whatsapp/send-whatsapp.component';
import { authGuard } from './core/guards/auth.guard';
import { ManageUsersComponent } from './feature/root/manage-users/manage-users.component';
import { ProfileComponent } from './feature/root/profile/profile.component';
import { ScheduleListComponent } from './feature/root/schedule-list/schedule-list.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'manage-users', component: ManageUsersComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'add-receiver', component: AddReceiverComponent, canActivate: [authGuard] },
  { path: 'add-group', component: AddGroupComponent, canActivate: [authGuard] },
  { path: 'schedule', component: ScheduleListComponent, canActivate: [authGuard] },
  { path: 'send-sms/:type/:id', component: SendSmsComponent, canActivate: [authGuard] },
  { path: 'send-whatsapp/:type/:id', component: SendWhatsappComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
