import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MosqueModel } from '../models/mosque.model';
import { MosqueDetail } from '../models/mosquedetail.model';
import { NearbyMosque } from '../models/nearbymosque.model';
import { UserMosque } from '../models/user-mosque.model';




@Injectable({
  providedIn: 'root'
})
export class MosqueService {

  

  constructor(
    public http: HttpClient
  ) { }

  // getNearebyMosquesLatLng(place_id:any){
  //   return this.http.get<MosqueModel>(`http://localhost/Go_pray/place_detail_from_place_id.php?place_id=${place_id}`);
  // }

  getNearebyMosques(lat:any,lng:any){
    return this.http.get<any>(`https://optest.therssoftware.com/prayer_app/api/mosque-by-location?latitude=${lat}&longitude=${lng}`);
  }

  mosqueDetail(id:any){
    return this.http.get<MosqueDetail>(`http://optest.therssoftware.com/prayer_app/api/mosque-details/${id}`);
  }
  msqDetail(id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/mosque-details/${id}`);
  }


  userMosqueList(id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/user-mosque-list/${id}`);
  }

  mosqueInfo(id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/mosque-details/${id}`);
  }

  getNotice(id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/mosque-notice/${id}`);
  }
  getNoticeDetail(id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/notice-details/${id}`);
  }
  getNews(id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/mosque-news/${id}`);
  }
  getNewsDetail(id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/news-details/${id}`);
  }

  updateNotice(id:any,title: any, notice: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/edit-notice`,
      { id: id, title: title,notice:notice }, httpOptions
    )
  }

  
  addNotice(mosque_id:any,title: any, notice: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/add-notice`,
      { mosque_id: mosque_id, title: title,notice:notice }, httpOptions
    )
  }
  deleteNotice(id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/delete-notice/${id}`);
  }

  //----------------------------------------------------------------

  updateNews(id:any,news:any,news_image:any,title:any,sub_title:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/edit-mosque-news`,
      { id: id, news:news, title: title,sub_title: sub_title,news_image:news_image }, httpOptions
    )
  }

 

  addNews(mosque_id:any,news:any,news_image:any,title:any,sub_title:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/add-mosque-news`,
      { mosque_id: mosque_id, news:news, title: title,sub_title: sub_title,news_image:news_image }, httpOptions
    )
  }
  
  
  

  
  
  
  
  
  mosquePrayerTime(mosque_id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/mosque-prayer-times/${mosque_id}`);
  }

  deleteNews(id:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/delete-mosque-news/${id}`);
  }

  updateMosque(id:any,name: any, desc: any, addr:any,lat:any,lng:any,des_fl:any,doa_fl:any,pryr_fl:any,not_fl:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/edit-setting`,
      { id: id, name: name,description:desc,address:addr,notice_flag:not_fl,description_flag:des_fl,doa_flag:doa_fl,prayer_time_flag:pryr_fl,location:addr,latitude:lat,longitude:lng}, httpOptions
    )

  }


  updatePrayerTime(mosque_id:any,day_id: any, date:any,fajr:any,zuhr:any,asr:any,magrib:any,isha){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    console.log(day_id)
    switch(day_id){
      case '0':{
        
        return this.http.post<any>(
          `http://optest.therssoftware.com/prayer_app/api/edit-prayer-time`,
          { mosque_id: mosque_id,index:day_id, date_one:date,fazr_saturday_time:fajr, dhuhr_saturday_time:zuhr,asr_saturday_time:asr, maghrib_saturday_time:magrib,isha_saturday_time:isha}, httpOptions
        )
        break
      }
      case '1':{
        console.log("ok")
        return this.http.post<any>(
          `http://optest.therssoftware.com/prayer_app/api/edit-prayer-time`,
          { mosque_id: mosque_id, index: day_id,date_two:date,fazr_sunday_time:fajr,dhuhr_sunday_time:zuhr,asr_sunday_time:asr, maghrib_sunday_time:magrib,isha_sunday_time:isha}, httpOptions
        )
        break
      }
      case '2':{
        console.log("ok")
        return this.http.post<any>(
          `http://optest.therssoftware.com/prayer_app/api/edit-prayer-time`,
          { mosque_id: mosque_id, index: day_id,date_three:date, fazr_monday_time:fajr, dhuhr_monday_time:zuhr,asr_monday_time:asr, maghrib_monday_time:magrib,isha_monday_time:isha}, httpOptions
        )
        break
      }
      case '3':{
        console.log("ok")
        return this.http.post<any>(
          `http://optest.therssoftware.com/prayer_app/api/edit-prayer-time`,
          { mosque_id: mosque_id, index: day_id,date_four:date,fazr_tuesday_time:fajr, dhuhr_tuesday_time:zuhr,asr_tuesday_time:asr, maghrib_tuesday_time:magrib,isha_tuesday_time:isha}, httpOptions
        )
        break
      }
      case '4':{
        console.log("ok")
        return this.http.post<any>(
          `http://optest.therssoftware.com/prayer_app/api/edit-prayer-time`,
          { mosque_id: mosque_id, index: day_id,date_five:date,fazr_wednesday_time:fajr, dhuhr_wednesday_time:zuhr,asr_wednesday_time:asr, maghrib_wednesday_time:magrib,isha_wednesday_time:isha}, httpOptions
        )
        break
      }
      case '5':{
        console.log("ok")
        return this.http.post<any>(
          `http://optest.therssoftware.com/prayer_app/api/edit-prayer-time`,
          { mosque_id: mosque_id, index: day_id,date_six:date,fazr_thursday_time:fajr, dhuhr_thursday_time:zuhr,asr_thursday_time:asr, maghrib_thursday_time:magrib,isha_thursday_time:isha}, httpOptions
        )
        break
      }
      case '6':{
        console.log("ok")
        return this.http.post<any>(
          `http://optest.therssoftware.com/prayer_app/api/edit-prayer-time`,
          { mosque_id: mosque_id, index: day_id,date_seven:date,fazr_friday_time:fajr, dhuhr_friday_time:zuhr,asr_friday_time:asr, maghrib_friday_time:magrib,isha_friday_time:isha}, httpOptions
        )
        break
      }
    }
    

  }

  getTheme(mosque_id){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/mosque-active-theme/${mosque_id}`);
  }

  updateTheme(mosque_id,theme){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/update-active-theme`,
      { mosque_id: mosque_id, active_theme:theme }, httpOptions
    )
  }

  getPref(userID:any){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/preferred-mosque/${userID}`);
  }

  setPref(u_id:any,m_id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/update-preferred-mosque`,
      { user_id: u_id, preferred_mosque_id:m_id }, httpOptions
    )
  }

  committeeDetail(memberId){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/committee-member-details/${memberId}`);
  }
  
}