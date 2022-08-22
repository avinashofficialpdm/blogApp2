import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogAppService {
  baseUrl:string="http://localhost:3000/"

  constructor(private _http: HttpClient) { }

  getBlogs():Observable<object> {
    return this._http.get(this.baseUrl+"blogs")
  }

  getUsers():Observable<object> {
    return this._http.get(this.baseUrl+"users")
  }

  
  signUpUser(user: any) {
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

  addComment(id:number,updatedData:Blog){
    return this._http.put(this.baseUrl+"blogs/"+id,updatedData)
  }

  deleteBlog(i:number):Observable<object>{
    return this._http.delete(this.baseUrl+"blogs/"+i)
  }
  
  deleteUser(id:string|null):Observable<object>{
    return this._http.delete(this.baseUrl+"users/"+id)
  }
}
