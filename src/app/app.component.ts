import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';


import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent {}
