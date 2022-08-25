import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faL, faUser } from '@fortawesome/free-solid-svg-icons';
import { Blog } from 'src/app/models/blog';
import { comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { BlogAppService } from 'src/app/Services/blog-app.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  currentBlogId: number | null=0
  currentBlog: Blog|undefined
  comments: comment[] = []
  currentUser: User|undefined
  faUser = faUser
  reviewText: string = ""


  allBlogs: Blog[]=[]

  constructor(private route: ActivatedRoute, private serv: BlogAppService,private _rout:Router) { }

  addCommentForm = new FormGroup({
    review: new FormControl(''),
    username: new FormControl(''),
    id: new FormControl('')
  })

  ngOnInit(): void {
    this.currentBlogId = JSON.parse(this.route.snapshot.paramMap.get("id")||"")
    this.allBlogs = this.route.snapshot.data['allBlogs']
    this.blogs()
    this.serv.getUsers().subscribe((res: User[]) => {
      this.currentUser = res.find((user: User) => user.id == localStorage.getItem("userLoggedIn"))
    })
  }

  blogs() {
    if (this.allBlogs) {
      this.currentBlog = this.allBlogs.find((element: Blog) => element.id == this.currentBlogId)
      if (this.currentBlog) {
        this.comments = this.currentBlog.comments
      }
    }
  }

  addComment(): void {
    this.serv.getBlogs().subscribe((res: Blog[]) => {

      // for adding a unique id for each comments
      let newId: string = ""
        let clickedBlog = res.find((blog: Blog) => blog.name == this.currentBlog?.name)
        this.addCommentForm.value.username = this.currentUser?.username
        if(clickedBlog){
          let length=clickedBlog.comments.length
          if (length > 0) {

           newId= <string>clickedBlog?.comments[length - 1]?.id + 1
          }
        }
        
        this.addCommentForm.value.id = newId
        
        // adding the comment and sending the put request 
        clickedBlog?.comments.push(this.addCommentForm.value)
        this.serv.addComment(this.currentBlogId, clickedBlog).subscribe(() => {
          this.reviewText = "";
          alert("Success")
          //this._rout.navigate(['userLogged/viewBlog/'+this.currentBlogId],{skipLocationChange:false})
           location.replace('userLogged/viewBlog/'+this.currentBlogId)
          this.blogs()
        })
    })
  }


}
