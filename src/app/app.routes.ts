import { Routes } from '@angular/router';
import { HomeComponent } from './feature/landing/home/home.component';
import { LoginComponent } from './feature/auth/login/login.component';
import { RegisterComponent } from './feature/auth/register/register.component';
import { DashboardComponent } from './feature/root/dashboard/dashboard.component';
import { AddReceiverComponent } from './feature/root/add-receiver/add-receiver.component';
import { AddGroupComponent } from './feature/root/add-group/add-group.component';
import { SendSmsComponent } from './feature/root/send-sms/send-sms.component';
import { SendWhatsappComponent } from './feature/root/send-whatsapp/send-whatsapp.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-receiver', component: AddReceiverComponent },
  { path: 'add-group', component: AddGroupComponent },
  { path: 'send-sms/:type/:id', component: SendSmsComponent },
  { path: 'send-whatsapp/:type/:id', component: SendWhatsappComponent },
//  { path: '**', redirectTo: '' },
];
