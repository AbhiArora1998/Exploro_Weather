import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/Environment/environment.dev";
import { PlaceInterface } from "../models/PlaceInterface";

@Injectable({
    providedIn:"root"
})
export class PlacesService{

    citySearched:PlaceInterface |undefined

    placesUrl = environment.PLACES_API
    
    constructor(private httplient: HttpClient) { }
    
    getPlaceData(cityName:string, CountryCode:string) {
      return  this.httplient.get<PlaceInterface>(this.placesUrl+"places/geoname", {
            params: {
                name: cityName,
                country: CountryCode,
                apikey:environment.MAP_API_KEY
            }
        })
    }

    setAttractionValue(value:any) {
        console.log(value, "service")
        this.citySearched = value
    }

    getAttractionValue() {
        if (this.citySearched) {
            return this.httplient.get(this.placesUrl + "places/autosuggest",{
                params: {
                    name: this.citySearched.name,
                    radius: 5000,
                    lon: this.citySearched.lon,
                    lat: this.citySearched.lat,
                    apikey:environment.MAP_API_KEY
                }
            }) 
        }
        return null
    }

    getAttractionsImages(xid:number) {
        return this.httplient.get(this.placesUrl + "places/xid/"+xid, {
            params: {
               
                apikey:environment.MAP_API_KEY
            }
        })
    }

}