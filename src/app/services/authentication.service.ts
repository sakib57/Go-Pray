import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthResponseData } from '../models/authresponsedata.model';
import { MosqueUser } from '../models/mosquruser.model';

@Injectable({
    providedIn: 'root'
  })

export class AuthenticationService {

    constructor(private http: HttpClient) { }

    fbBackendLogin(name: string, email: string, fb_img: string, fb_id: string){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
            })
          };
          return this.http.post<AuthResponseData>(
            `http://optest.therssoftware.com/prayer_app/api/register-normal-user`,
            { name: name, email: email, facebook_pic_url: fb_img,facebook_id: fb_id }, httpOptions
          )
    }

    googleBackendLogin(name: string, email: string, google_img: string, google_id: string){
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded',
            })
          };
          return this.http.post<AuthResponseData>(
            `http://optest.therssoftware.com/prayer_app/api/register-normal-user`,
            { name: name, email: email, google_pic_url: google_img,google_id: google_id }, httpOptions
          )
    }

    mosqueOwnerLogin(email:string, password: any){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<MosqueUser>(
        `http://optest.therssoftware.com/prayer_app/api/login-mosque-user`,
        { email: email, password: password }, httpOptions
      )
    }
    userReg(name:string,email:string, password: any){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `http://optest.therssoftware.com/prayer_app/api/register-normal-user`,
        { name:name, email: email, password:password }, httpOptions
      )
    }
    userLogin(email:string, password: any){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post<any>(
        `http://optest.therssoftware.com/prayer_app/api/login-user`,
        { email: email, password:password }, httpOptions
      )
    }


    removeToken(id,token){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      };
      return this.http.post(
        `http://optest.therssoftware.com/prayer_app/api/delete-token`,
        { user_id: id, token: token }, httpOptions
      )
    }
    
}