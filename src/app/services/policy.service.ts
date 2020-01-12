import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})
export class PolicyService{
    constructor(
      public http: HttpClient
    ) { }

    getPolicy(){
        return this.http.get<any>(`https://optest.therssoftware.com/prayer_app/api/privacy-policy`);
    }

    getUserAgreement(){
        return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/user-agreement`);
    }
}