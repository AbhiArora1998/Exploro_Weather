import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { WeatherService } from './Services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
  
export class AppComponent implements AfterViewInit {
  title = 'WeatherProject';
  backGroundColor = ""
  isOpen = true
 
  constructor(private weatherService: WeatherService,private elementRef: ElementRef) { }
  ngAfterViewInit(): void {
    this.weatherService.backGroundConfigure.subscribe(Response => {
      this.backGroundColor = Response.Color;
      this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = this.backGroundColor
  })
  }
  boolReceived(value: boolean) {
    if (value == true) {
      setTimeout(() => {
        this.isOpen = value
      }, 500);
    } else {
      this.isOpen = value
      
    }
    
  }
  
  
}
