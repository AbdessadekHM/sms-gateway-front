import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToastComponent } from './shared/components/toast/toast.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
