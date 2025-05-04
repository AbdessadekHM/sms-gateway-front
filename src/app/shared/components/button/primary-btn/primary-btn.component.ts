import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-primary-btn',
  imports: [],
  templateUrl: './primary-btn.component.html',
  styleUrl: './primary-btn.component.css'
})
export class PrimaryBtnComponent {

  @Input()
  public text!:string;
  @Output()
  private click:EventEmitter<any> = new EventEmitter<any>();


  onClick(){
    this.click.emit();
  }
  

}
