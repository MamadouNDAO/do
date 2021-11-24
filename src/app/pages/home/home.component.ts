import { ReqService } from './../../services/req.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any;
  post: any;
  p: number = 1;
  isDetail = false;
  isAuthor = false;
  title = 'Post Site';
  author: any;
  constructor(private req: ReqService) { }

  ngOnInit(): void {
    this.findPosts();
  }

  findPosts(){
    this.req.getPost().subscribe(
      res => {
        this.posts = res;
        for(let o of this.posts){
          this.req.getUser(o.userId).subscribe(resp => {o.userId = resp;})
        }
        console.log(this.posts);
      }
    )
  }

  showDetail(post: any){
    this.post = post;
    this.title = 'Post ('+this.post.userId.name+')';
    this.isDetail = true;
  }

  hideDetail(){
    this.isDetail = false;
    this.isAuthor = false;
  }

  showAuthor(author: any){
    this.author = author;
    this.isAuthor = true;
  }

  onSearch(input: any){
    this.req.getOnePost(input).subscribe(
      res => {
        this.post = res;
        this.req.getUser(this.post.userId).subscribe(resp => {this.post.userId = resp;})
      }
    )
    this.isDetail = true;
  }

}
