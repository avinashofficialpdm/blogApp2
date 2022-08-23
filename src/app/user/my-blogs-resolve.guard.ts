import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Blog } from '../models/blog';
import { BlogAppService } from '../Services/blog-app.service';

@Injectable({
  providedIn: 'root'
})

export class MyBlogsResolveGuard implements Resolve<Observable<object>> {

  curentUserId?: string | null
  currentUser: Blog | any
  constructor(private _serv: BlogAppService) { }

  // used rxjs operators to filter the blogs written by the current user
  resolve() {
    this._serv.getUsers().subscribe((user:any) => {
      this.currentUser = user.find((element: any) => element.id == localStorage.getItem("userLoggedIn"))
    })
    return this._serv.getBlogs()
      .pipe(map((blogs: any) => blogs.filter((blog: any) => blog.authorUname == this.currentUser.username)))
  }

}
