import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class NewsService {

  

  constructor(
    public http: HttpClient
  ) { }

  getAllNews(offset){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/offset-wise-news-api?offset=${offset}`);
  }

  getNews(id){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/news-api-details/${id}`);
    
  }

  like(user_id,news_id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/like-news`,
      { user_id: user_id, news_id:news_id }, httpOptions
    )
  }
  bookmark(user_id,news_id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/bookmark-news`,
      { user_id: user_id, news_id:news_id }, httpOptions
    )
  }

  checkNewsStatus(user_id,news_id){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/check-news-status/${user_id}/${news_id}`);
  }

  updateShareCount(news_id){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };
    return this.http.post<any>(
      `http://optest.therssoftware.com/prayer_app/api/share-news`,
      { news_id:news_id }, httpOptions
    )
  }

  searchNews(value,offset){
    return this.http.get<any>(`http://optest.therssoftware.com/prayer_app/api/search-news-api?offset=${offset}&title=${value}`);
  }
}