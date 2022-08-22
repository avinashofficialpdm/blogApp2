import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BlogAppService } from 'src/app/Services/blog-app.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  currentBlogId: any
  currentBlog: any
  comments: any[] = []
  currentUser: any
  faUser = faUser
  reviewText:string=""
  constructor(private route: ActivatedRoute, private serv: BlogAppService, private _rout: Router) { }

  addCommentForm = new FormGroup({
    review: new FormControl(''),
    username: new FormControl(''),
    id: new FormControl('')
  })

  ngOnInit(): void {
    this.currentBlogId = this.route.snapshot.paramMap.get("id")
    this.blogs()
    this.serv.getUsers().subscribe((res: any) => {
      this.currentUser = res.find((user: any) => user.id == localStorage.getItem("userLoggedIn"))
    })

  }

  blogs(){
    this.serv.getBlogs().subscribe((res: any) => {
      this.currentBlog = res.find((element: any) => element.id == this.currentBlogId)
      this.comments = this.currentBlog.comments
    })
  }

  

  addComment(): void {
    this.serv.getBlogs().subscribe((res: any) => {

      // for adding a unique id for each comments
      let newId: any = 1
      let clickedBlog = res.find((blog: any) => blog.name == this.currentBlog.name)
      this.addCommentForm.value.username = this.currentUser.username
      if (clickedBlog.comments.length > 0) {
        newId = clickedBlog.comments[clickedBlog.comments.length - 1].id + 1
      }
      this.addCommentForm.value.id = newId



      // adding the comment and sending the put request 
      clickedBlog.comments.push(this.addCommentForm.value)
      this.serv.addComment(this.currentBlogId, clickedBlog).subscribe((res:any)=>{
        this.reviewText="";
        alert("Success")
        this.blogs()
      })
    })
  }


}
