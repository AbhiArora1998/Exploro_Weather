import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import {trigger, state, style, animate, transition} from '@angular/animations'
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  animations: [trigger('openClose', [
    state('open', style({
      'box-shadow': '-3px 6px 5px 0px rgba(176,164,176,1)',
     
     'background-color': '#000',
     'color': '#fff',
     'opacity': '.5',
     'height': '80vh', 
   })), state('closed', style({
     'box-shadow': '-3px 6px 5px 0px rgba(176,164,176,1)',
     
     'background-color': '#000',
     'color': '#fff',
     'opacity': '.5',
   })),transition('closed <=> open',[animate('0.2s')])
  ])]
})
export class WeatherComponent implements OnInit{
  ourValues: any
  moreInfoOpen: boolean = false
  infoString :string="More Info"
  constructor(private weatherService: WeatherService) {
    
  }
  
  ngOnInit() {

    this.myWeatherData("Paris")
  }
  

  myWeatherData(value:string) {
    this.weatherService.getRealtimeWeaterData(value).subscribe((Response) => {
      this.ourValues = Response
      console.log(this.ourValues)
    });
  }
  expandTransition() {
   
    this.infoString = this.moreInfoOpen == true ? "More Info" : "Less Info"
    this.moreInfoOpen = !this.moreInfoOpen
  }
}
