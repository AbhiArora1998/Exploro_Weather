
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { WeatherService } from './Services/weather.service';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
  
export class AppComponent implements AfterViewInit {
  title = 'WeatherProject';
  backGroundColor = ""
  isOpen = true
  onAboutPage = false
  color=""
  constructor(private weatherService: WeatherService,private elementRef: ElementRef,private primengConfig: PrimeNGConfig) { }
  ngAfterViewInit(): void {
    this.weatherService.backGroundConfigure.subscribe(Response => {
      this.backGroundColor = Response.Color;
      this.color =Response.fontColor
      this.elementRef.nativeElement.ownerDocument
        .body.style.backgroundColor = this.backGroundColor
      this.primengConfig.ripple = true
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
  aboutPage(value: boolean) {
    this.onAboutPage = value
  }
  
  
}
