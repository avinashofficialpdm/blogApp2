import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BlogAppService } from '../Services/blog-app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/user';
import { loginUser } from '../models/userLogin';

@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})

export class UserLoginComponent {

  hide = true;
  loginCredentials:loginUser=new loginUser()

  constructor(
    private serv: BlogAppService,
    private _rout: Router,
    private _snackBar: MatSnackBar) { }

  login() {
    console.log(this.loginCredentials);
    
    this.serv.getUsers().subscribe((res: User[]) => {
      if (res.find((element: User) => element.username == this.loginCredentials.username)) {
        let currentUser = res.find((element: User) => element.username == this.loginCredentials.username)
        if (currentUser) {
          if (currentUser.password == this.loginCredentials.password) {
            localStorage.setItem("userLoggedIn", currentUser.id)
            localStorage.setItem("loggedUser", currentUser.name)
            this._snackBar.open("Login success", "", { duration: 2 * 1000 })
            setTimeout(() => {
              this._rout.navigateByUrl("")
            }, 1000);
          } else {
            alert("Wrong password")
          }
        }
      } else {
        alert("No user found")
      }
    })
  }
}

