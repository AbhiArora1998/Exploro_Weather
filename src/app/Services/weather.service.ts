import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class WeatherService{
    
    weatherUrl ="https://weatherapi-com.p.rapidapi.com/current.json"
    constructor(private http:HttpClient) {
        
    }

    getRealtimeWeaterData(location:string) {
      return  this.http.get(this.weatherUrl, {
            headers:{
                'X-RapidAPI-Key': '1f889bf859msh88415dbb466eb08p1d0b6cjsn4b04b05aeadd',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            },
            params: {q: location}
        })
    }
}