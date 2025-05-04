import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @Input()
  public type?: "text" | "email" | "password" = "text";

  @Input()
  public placeholder?: string = "";
  
  @Input()
  public value?: string = "";
  
  @Input()
  public name?: string = "";

  @Input()
  public id?: string = "";

  @Input()
  public isRequired?: boolean = false;

}
