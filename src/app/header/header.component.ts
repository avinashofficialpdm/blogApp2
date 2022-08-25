import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogAppService } from 'src/app/Services/blog-app.service';
import { CountService } from 'src/app/Services/count.service';
import { User } from '../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userlogged: boolean = false
  loggedUserId: string|null=""
  nameOfloggedUser?: string|null
  countOfBlogs?: number
  countOfUsers?: number

  constructor(private _rout: Router,
     private countServ: CountService,
     private blogServ: BlogAppService) { }

  ngOnInit() {
    this.isLoggedIn()

    // subscribing the behaviourSubject value for showing the count
    this.countServ.countSub$.subscribe(number => { this.countOfBlogs = number })
    this.countServ.userCountSub$.subscribe(number => { this.countOfUsers = number })
  }


  isLoggedIn():void{
    if (localStorage.getItem('userLoggedIn')) {
      this.userlogged = true
      this.nameOfloggedUser = localStorage.getItem("loggedUser")
      this.loggedUserId = localStorage.getItem("userLoggedIn")
    }
  }

  logout():void {
    if (confirm("Are you sure you want to Logout")) {
      localStorage.clear()
      this.isLoggedIn()
      location.replace("")
    }
  }

  // calls this function when delete button clicks and call the delete function in service file.
  // sending the currently logged user ID
  deleteAccount() :void{
    if (confirm("Are you sure you want to delete your Account")) {
      this.blogServ.deleteUser(this.loggedUserId).subscribe(() => {
        alert("Deleted Successfully")
        localStorage.clear()
        this.isLoggedIn()
        location.replace("")
      })
    }
  }


  //calls this function on add blog navigation button clicks and
  // send the currently logged userID as a parameter 
  addBlog():void {
    this._rout.navigate(['userLogged/addBlog', this.loggedUserId])
  }
}
