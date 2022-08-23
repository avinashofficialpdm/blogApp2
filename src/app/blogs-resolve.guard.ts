import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogAppService } from './Services/blog-app.service';

@Injectable({
  providedIn: 'root'
})
export class BlogsResolveGuard implements Resolve<Observable<object>> {

  constructor(private _serv: BlogAppService) { }
 
  resolve() {
    return this._serv.getBlogs()
  }

}
