import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Image } from './models/image';

@Injectable()
export class SlideshowService {
  getImages(currentPage: Number): Observable<Image[]> {
      return this.http.get<Image[]>(this.requestUrl + "&page=" + currentPage);
  }

    requestUrl:string = "https://api.unsplash.com/photos/?client_id=6bb5bb78cfde81736048d37f2d3399d5024a6a5be277ad88a4b1a366a5e4f77f";
    
  constructor(private http:HttpClient) {
      
   }


}
