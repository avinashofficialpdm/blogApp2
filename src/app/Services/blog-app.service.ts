import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Blog } from '../models/blog';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BlogAppService {
  baseUrl:string="http://localhost:3000/"

  constructor(private _http: HttpClient) { }

  handleError(error:Error){
    alert(error.message)
    return throwError(error.message)
  }

  getBlogs():Observable<Blog[]> {
    return this._http.get<Blog[]>(this.baseUrl+"blogs")
    .pipe(retry(1),catchError(this.handleError))
  }

  getUsers():Observable<User[]> {
    return this._http.get<User[]>(this.baseUrl+"users")
    .pipe(retry(1),catchError(this.handleError))
  }
  
  signUpUser(user: object) {
    return this._http.post(this.baseUrl+"users", user)
    .pipe(retry(1),catchError(this.handleError))
  }

  addBlog(blog: Blog) {
    return this._http.post(this.baseUrl+"blogs", blog)
    .pipe(retry(1),catchError(this.handleError))
  }

  addComment(id:number|null,updatedData:Blog|undefined){   
    return this._http.put(this.baseUrl+"blogs/"+id,updatedData)
    .pipe(retry(1),catchError(this.handleError))
  }

  deleteBlog(i:number):Observable<Blog>{
    return this._http.delete<Blog>(this.baseUrl+"blogs/"+i)
    .pipe(retry(1),catchError(this.handleError))
  }
  
  deleteUser(id:string|null):Observable<User>{
    return this._http.delete<User>(this.baseUrl+"users/"+id)
    .pipe(retry(1),catchError(this.handleError))
  }
}
