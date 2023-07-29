import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeatherService } from '../Services/weather.service';
import {trigger, state, style, animate, transition, query} from '@angular/animations'
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  animations: [trigger('openClose', [
    
    state('open', style({
      'box-shadow': '-3px 6px 5px 0px rgba(176,164,176,1)',
      'border':'solid white',
     'background-color': '#000',
     'color': '#fff',
     'opacity': '.5',
      'height': '80vh',
      'overflow-y': 'scroll'
   })), state('closed', style({
     'box-shadow': '-3px 6px 5px 0px rgba(176,164,176,1)',
     'border':'solid white',
     'background-color': '#000',
     'color': '#fff',
     'opacity': '.5',
     
   })
   ), transition('closed <=> open', [animate('0.2s')])
  ])
 
  ]
})
export class WeatherComponent implements OnInit{
  weatherData: any
  moreInfoOpen: boolean = false
  infoString: string = "More Info"
  foreCastData:any
  backGroundColor = ""
  backGroundImage = ""
  @Output() isCardExpanded = new EventEmitter()
  constructor(private weatherService: WeatherService) {
    
  }
  
  ngOnInit() {

    
    this.getCurrentTime()

    this.weatherService.placeNameWithCode.subscribe(Response => {
      this.myWeatherData(Response.name)
    })
    
  }

  getCurrentTime() {
    const currentTime = new Date()
    if ((currentTime.getHours()>=0 && currentTime.getHours()<7) || (currentTime.getHours()>21 && currentTime.getHours()<24) ) {
      this.weatherService.backGroundConfigure.next({Image:"NightSKY.jpg",Color:"#000000",fontColor:"#ffffff"})
      this.backGroundImage = "NightSKY.jpg"
      this.backGroundColor="#000000"
    } else if (currentTime.getHours()>6 && currentTime.getHours()<17) {
      this.weatherService.backGroundConfigure.next({Image:"BlueSKYWITHSUN.jpg",Color:"#ffffff",fontColor:"#000000"})
      this.backGroundImage = "BlueSKYWITHSUN.jpg"
      this.backGroundColor="#ffffff"
    } else {
      this.weatherService.backGroundConfigure.next({Image:"EveningSKY.jpg",Color:"#f98a6c",fontColor:"#ffffff"})
      this.backGroundImage = "EveningSKY.jpg"
      this.backGroundColor="#f98a6c"
    }
  }
  

  myWeatherData(value:string) {
    this.weatherService.getRealtimeWeaterData(value).subscribe((Response) => {
      this.weatherData = Response
      
    });
  }

  myWeatherForecast(location:string) {
    this.weatherService.getWeatherForeCast(location).subscribe(Response => {
      this.foreCastData = Response
    })
  }



  expandTransition() {
    this.isCardExpanded.emit(this.moreInfoOpen)
    this.infoString = this.moreInfoOpen == true ? "More Info" : "Less Info"
    if (this.moreInfoOpen == false) {
      setTimeout(() => {
        this.myWeatherForecast("Paris")
      },100)
    }
    
    this.foreCastData = this.moreInfoOpen == false ? this.foreCastData = null : this.foreCastData = this.foreCastData
    this.moreInfoOpen = !this.moreInfoOpen
    
  }
}
