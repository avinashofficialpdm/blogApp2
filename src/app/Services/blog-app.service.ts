import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class BlogAppService {
  baseUrl:string="http://localhost:3000/"

  constructor(private _http: HttpClient) { }

  getBlogs():Observable<Blog[]> {
    return this._http.get<Blog[]>(this.baseUrl+"blogs")
  }

  getUsers():Observable<User[]> {
    return this._http.get<User[]>(this.baseUrl+"users")
  }

  
  signUpUser(user: object) {
    return this._http.post(this.baseUrl+"users", user)
  }

  addBlog(blog: Blog):void {
    this._http.post(this.baseUrl+"blogs", blog).subscribe({
      next() { alert("success");},
      error() {
        console.log(Error);
        alert("Failed")
      }
    })
  }

  addComment(id:string|null,updatedData:Blog){
    return this._http.put(this.baseUrl+"blogs/"+id,updatedData)
  }

  deleteBlog(i:number):Observable<Blog>{
    return this._http.delete<Blog>(this.baseUrl+"blogs/"+i)
  }
  
  deleteUser(id:string|null):Observable<User>{
    return this._http.delete<User>(this.baseUrl+"users/"+id)
  }
}
