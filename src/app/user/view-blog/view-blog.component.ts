import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Blog } from 'src/app/models/blog';
import { User } from 'src/app/models/user';
import { BlogAppService } from 'src/app/Services/blog-app.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  currentBlogId: string|null=""
  currentBlog: any
  comments: any[] = []
  currentUser: any
  faUser = faUser
  reviewText:string=""
  constructor(private route: ActivatedRoute, private serv: BlogAppService) { }

  addCommentForm = new FormGroup({
    review: new FormControl(''),
    username: new FormControl(''),
    id: new FormControl('')
  })

  ngOnInit(): void {
    this.currentBlogId = this.route.snapshot.paramMap.get("id")
    this.blogs()
    this.serv.getUsers().subscribe((res: User[]) => {
      this.currentUser = res.find((user: User) => user.id == localStorage.getItem("userLoggedIn"))
    })

  }

  blogs(){
    this.serv.getBlogs().subscribe((res: Blog[]) => {
      this.currentBlog = res.find((element: Blog|any) => element.id == this.currentBlogId)
      this.comments = this.currentBlog.comments
    })
  }

  

  addComment(): void {
    this.serv.getBlogs().subscribe((res:any) => {

      // for adding a unique id for each comments
      let newId: string = ""
      let clickedBlog = res.find((blog: Blog) => blog.name == this.currentBlog.name)
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
