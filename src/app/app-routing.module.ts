import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsResolveGuard } from './blogs-resolve.guard';
import { ShowBlogComponent } from './show-blog/show-blog.component';
import { AddBlogComponent } from './user/add-blog/add-blog.component';
import { LoginGuard } from './user/login.guard';
import { UserLoginComponent } from './userLogin/userLogin.component';
import { UserSignUpComponent } from './userSignUp/userSignUp.component';

const routes: Routes = [
  {
    path: "",
    component: ShowBlogComponent,
    resolve: {
      data: BlogsResolveGuard
    }
  },
  {
    path: 'userLogin',
    component: UserLoginComponent
  },
  {
    path: 'userLogged',
    loadChildren: () => import('./user/user.module')
      .then(mod => mod.UserModule)
  },
  {
    path: "userSignUp",
    component: UserSignUpComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
