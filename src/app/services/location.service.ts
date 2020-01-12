import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationModel } from '../models/location.model';



@Injectable({
  providedIn: 'root'
})
export class LocationService {

  

  constructor(
    public http: HttpClient
  ) { }

  getLocation(val:any){
    // http://optest.therssoftware.com/prayer_app/api/get-place/${val}
    // http://localhost/Go_pray/place_suggession.php?name=${val}
    return this.http.get<LocationModel[]>(`http://optest.therssoftware.com/prayer_app/api/get-place?name=${val}`);
  }

  getAddress(lat,lng){
    return this.http.get<any>(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCWVwtYsL7a8pxq5V2xigxvgtDG25KOwM4`);
  }
}
