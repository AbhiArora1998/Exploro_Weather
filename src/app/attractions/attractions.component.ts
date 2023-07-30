import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../Services/Places.service';
import { PlaceInterface } from "../models/PlaceInterface"
import {  NgForm } from '@angular/forms';
import { WeatherService } from '../Services/weather.service';
import { AttractionsContent } from '../models/Attractions';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css'],
  animations: [trigger('upDown', [
    state('*', style({
      'box-shadow': '-3px 6px 5px 0px rgba(176,164,176,1)',
     'background-color': '#000',
     'color':'#fff',
     'opacity':'0',
      'height': '30vh',
      'overflow-y': 'scroll',
      'margin-bottom': '10px',
     'border':'solid white',
     'margin-left':'10px'

   })), state('down', style({
    'box-shadow': '-3px 6px 5px 0px white',
    'background-color': '#000',
    'color':'#fff',
    'opacity':'.6',
     'height': '30vh',
     'overflow-y': 'scroll',
     'margin-bottom': '10px',
     'margin-left':'10px',
     'border':'solid white',
     
   })),transition('* <=> down',[animate('1s')])
  ])
  ]
})
export class AttractionsComponent implements OnInit{
  placeData: any
  initialvalue=""
  featuresFound: any = []
  attractionsFound: AttractionsContent[] = []
  moreInfobox: boolean = false
  moreInfoData:any
  i = 0
  fontColor ="#000000"
  constructor(private placeService: PlacesService,private weatherService:WeatherService) {
   
  }

  ngOnInit() {
      this.placeService.getPlaceData(this.weatherService.placeNameWithCode.value.name, this.weatherService.placeNameWithCode.value.code).subscribe(Response => {
        this.i = 0
        this.placeData = Response
        this.weatherService.setCountryNameAndCode(Response)
        this.placeService.setAttractionValue(Response)
        this.getAttractions()
      })
    
    this.weatherService.backGroundConfigure.subscribe(Response => {
      this.fontColor = Response.fontColor
    })
    
  }

  submitData(value:NgForm) {
    


    this.placeService.getPlaceData(value.value.countryName, value.value.countryCode).subscribe(Response => {
      this.i = 0
      this.weatherService.placeNameWithCode.next({name:value.value.countryName,code:value.value.countryCode})
      this.placeData = Response
      this.weatherService.setCountryNameAndCode(Response)
      this.placeService.setAttractionValue(Response)
      this.getAttractions()
    })
  }
  getAttractions() {
    this.attractionsFound = []
    
    this.placeService.getAttractionValue()?.subscribe(Response => {
      this.featuresFound = Response
      
      
      if (this.featuresFound.features) {
        
        this.getImages(this.featuresFound.features)
      }
      
     
    })
  }

  getImages(value:any[]) {
   
    if (value[this.i]) {

      setTimeout(() => {
        this.placeService.getAttractionsImages(value[this.i].properties.xid).subscribe(Response => {
          var data: any = Response
          console.log(data,"with")
              
          this.attractionsFound.push({
            place: data.name,
            rate: data.rate,
            xid: data.xid,
            kinds: data.kinds,
            coordinates: value[this.i]? value[this.i]?.geometry.coordinates:[],
            address: data.address.road,
            info: data.wikipedia_extracts ? data.wikipedia_extracts.text : "No Info Available",
            image: data.preview ? data.preview.source : "No Image",
          })
        })
        this.i = this.i + 1
        if (this.i < this.featuresFound.features.length) {

          this.getImages(value)
        }
      }, 200);
    
    }
  }

  moreInfo(value:any) {
    this.moreInfobox = this.moreInfobox == true ? false : true
    console.log(this.moreInfobox)
    this.moreInfoData = value
  }
  

}
