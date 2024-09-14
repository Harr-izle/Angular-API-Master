import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interface/post';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl:string ='https://jsonplaceholder.typicode.com/posts'

  constructor(private http:HttpClient) { }

  getPost():Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }


}
