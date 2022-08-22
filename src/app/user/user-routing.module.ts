import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsResolveGuard } from '../blogs-resolve.guard';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { LoginGuard } from './login.guard';
import { MyBlogsComponent } from './myBlogs/myBlogs.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';

const routes: Routes = [
  {
    path:'addBlog/:id',
    component:AddBlogComponent,
    canActivate:[LoginGuard],

  },
  {
    path:'viewBlog/:id',
    component:ViewBlogComponent,
    canActivate:[LoginGuard]
  },
  {
    path:'myBlog',
    component:MyBlogsComponent,
    canActivate:[LoginGuard],
    resolve:{
      myBlogs:BlogsResolveGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
