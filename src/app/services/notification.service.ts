import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })

export class NotificationService {

    constructor(private http: HttpClient) { }

    updateFirbaseNotificationToken(user_id: number,mosque_id:number,token: string){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
      
            })
          };
          return this.http.post(
            `https://optest.therssoftware.com/prayer_app/api/subscription-user`,
            { user_id:user_id, mosque_id: mosque_id, token: token }, httpOptions
          )
    }
    
}