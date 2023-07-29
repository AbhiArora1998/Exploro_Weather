import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/Environment/environment.dev";

@Injectable({
    providedIn:'root'
})
export class WeatherService{
    
    weatherUrl = "https://weatherapi-com.p.rapidapi.com/"
    placeNameWithCode = new BehaviorSubject<any>({name:"Toronto",code:"CA"})
    backGroundConfigure = new BehaviorSubject<any>({Image:"BlueSKYWITHSUN.jpg",Color:"#ffffff",fontColor:"#000000"}) 
    constructor(private http: HttpClient) {
        
    }

    getRealtimeWeaterData(location:string) {
      return  this.http.get(this.weatherUrl +'current.json', {
            headers:{
                'X-RapidAPI-Key': environment.X_RAPIDAPI_KEY,
                'X-RapidAPI-Host': environment.X_RAPIDAPI_HOST
            },
            params: {q: location}
        })
    }

    getWeatherForeCast( location:string) {
        return this.http.get(this.weatherUrl + "forecast.json", {
            headers: {
                'X-RapidAPI-Key': environment.X_RAPIDAPI_KEY,
                'X-RapidAPI-Host': environment.X_RAPIDAPI_HOST
            },
            params:{q: location}
        })
    }

    setCountryNameAndCode(value:any) {
        this.placeNameWithCode.next(value)
    }
}