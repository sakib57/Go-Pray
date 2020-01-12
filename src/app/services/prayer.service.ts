import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prayer } from '../models/prayer.model';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PrayerService {

  

  constructor(
    public http: HttpClient
  ) { }

  getPrayerTimeOfLocation(latitude: number, longitude:number, date: any){
    console.log("aaasssdddfffggg",latitude)
    // http://optest.therssoftware.com/prayer_app/api/current-prayer-time?latitude=-21.2885323&longitude=133.4606123&date=2019-08-12
    // https://optest.therssoftware.com/prayer_app/api/current-prayer-time?latitude=${latitude}&longitude=${longitude}&date=2019-08-12
    // http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2&month=${month}&year=${year}

    return this.http.get<Prayer>(`http://optest.therssoftware.com/prayer_app/api/current-prayer-time?latitude=${latitude}&longitude=${longitude}&date=${date}`);
  }

  
  
}
