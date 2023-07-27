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
      'overflow-y': 'scroll'
   })), state('closed', style({
     'box-shadow': '-3px 6px 5px 0px rgba(176,164,176,1)',
     
     'background-color': '#000',
     'color': '#fff',
     'opacity': '.5',
     
   })),transition('closed <=> open',[animate('0.2s')])
  ]),
  trigger('openClosePage', [
    state('open', style({
      'height': '120vh',
      
      
   })), state('closed', style({
    
     
   })),transition('closed <=> open',[animate('0.3s')])
  ])
  ]
})
export class WeatherComponent implements OnInit{
  ourValues: any
  moreInfoOpen: boolean = false
  infoString: string = "More Info"
  foreCastData:any


  constructor(private weatherService: WeatherService) {
    
  }
  
  ngOnInit() {

    
    this.weatherService.placeNameWithCode.subscribe(Response => {
      this.myWeatherData(Response.name)
      console.log("we got called ",Response)
    })
    
  }
  

  myWeatherData(value:string) {
    this.weatherService.getRealtimeWeaterData(value).subscribe((Response) => {
      this.ourValues = Response
      
    });
  }

  myWeatherForecast(location:string) {
    this.weatherService.getWeatherForeCast(location).subscribe(Response => {
      console.log(Response)
      
      this.foreCastData = Response
      console.log(this.foreCastData.forecast.forecastday[0].hour)
    })
  }



  expandTransition() {
    
    this.infoString = this.moreInfoOpen == true ? "More Info" : "Less Info"
    if (this.moreInfoOpen == false) {
      setTimeout(() => {
        this.myWeatherForecast("Paris")
      },100)
    }
    
    this.moreInfoOpen = !this.moreInfoOpen
    this.foreCastData = this.moreInfoOpen == true ? this.foreCastData = null: this.foreCastData = this.foreCastData
  }
}
