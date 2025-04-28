import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  contactForm = {
    name: '',
    email: '',
    company: '',
    message: '',
  };

  onSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', this.contactForm);
  }
}
