import { Component, EventEmitter, Output } from '@angular/core';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  backGroundImage = ""
  backGroundColor = ""
  fontColor = ""
  @Output() isABoutOpen = new EventEmitter()
  constructor(private weatherService:WeatherService) {
    this.weatherService.backGroundConfigure.subscribe(Response => {
      this.backGroundImage = Response.Image
      this.backGroundColor = Response.Color
      this.fontColor = Response.fontColor
    })
  }
  navigate() {
    this.isABoutOpen.emit(false)
  }
}
