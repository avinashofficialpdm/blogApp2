import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogAppService } from '../Services/blog-app.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-userLogin',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
  
export class UserLoginComponent implements OnInit {

  hide = true;
  loggedUsername:string=""

  constructor(private serv: BlogAppService, private _rout: Router, private _snackBar: MatSnackBar) { }

  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
  }

  login() {
    this.serv.getUsers().subscribe((res: any) => {
      if (res.find((element: any) => element.username == this.loginForm.value.username)) {
        let currentUser = res.find((element: any) => element.username == this.loginForm.value.username)
        if (currentUser.password == this.loginForm.value.password) {
          this.loggedUsername = <string><any>this.loginForm.value.username
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
