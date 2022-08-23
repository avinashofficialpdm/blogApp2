import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogAppService } from '../Services/blog-app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
  
export class UserLoginComponent {

  hide = true;
  
  constructor(
    private serv: BlogAppService, 
    private _rout: Router, 
    private _snackBar: MatSnackBar) { }

  login(form:any) {
    this.serv.getUsers().subscribe((res: any) => {
      if (res.find((element: any) => element.username == form.value.username)) {
        let currentUser = res.find((element: any) => element.username == form.value.username)
        if (currentUser.password == form.value.password) {
          localStorage.setItem("userLoggedIn", currentUser.id)
          localStorage.setItem("loggedUser", currentUser.name)
          this._snackBar.open("Login success", "", { duration: 2 * 1000 })
          setTimeout(() => {
            this._rout.navigateByUrl("")
          }, 1000);
        } else {
          alert("Wrong password")
        }
      } else {
        alert("No user found")
      }
    })
  }
}
