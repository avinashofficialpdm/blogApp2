import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogAppService } from 'src/app/Services/blog-app.service';

@Component({
  selector: 'app-myBlogs',
  templateUrl: './myBlogs.component.html',
  styleUrls: ['./myBlogs.component.css']
})
export class MyBlogsComponent implements OnInit {

  curentUserId: any
  currentUser: any
  myBlogs: any[] = []
  loggedUser:any
  constructor(private serv: BlogAppService,
    private _rout:Router,
    private _route:ActivatedRoute) { }

  ngOnInit() {
    this.loggedUser = localStorage.getItem("userLoggedIn")
    this.curentUserId= localStorage.getItem("userLoggedIn")
    this.serv.getUsers().subscribe((user:any)=>{
    this.currentUser= user.find((element:any)=>element.id==this.curentUserId)
    
      // 'myblogs' took from resolve guard
     let Blogs= this._route.snapshot.data['myBlogs']
     
        Blogs.forEach((blog:any) => {
          if(blog.authorUname==this.currentUser.username){
            this.myBlogs.push(blog)
          }
        });
    })
    this.myBlogs.sort(function compare(obj1, obj2) { return <any>new Date(obj2.date) - <any>new Date(obj1.date) })
  }

  deleteBlog(i:number):void{
    if(confirm("Are you sure ? ")){
      this.serv.deleteBlog(i).subscribe((res:any)=>{
        window.location.reload()
      })
    }
  }

  addBlog():void {
    this._rout.navigate(['userLogged/addBlog', this.loggedUser])
  }

}
