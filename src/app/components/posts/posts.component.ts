import {Component, OnInit} from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.service';
import {Comment} from '../../models/comment';
import {CommentService} from '../../services/comment.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  isAdmin = true;
  postsCount: number;

  post: Post = {
    userId: 1,
    title: '',
    body: ''
  };

  constructor(
    public postService: PostService,
    public commentService: CommentService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService
  ) {
  }

  ngOnInit() {
    this.spinner.show();
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
      this.postsCount = this.posts.length;
      this.spinner.hide();
    });
  }

  showCommentsForPost(post: Post) {

    if (!post.comments) {
      this.spinner.show();
      this.commentService.getCommentsByPostId(post.id).subscribe((comments: Comment[]) => {
          post.comments = comments;
          this.spinner.hide();
        },
        (error) => {
          this.toastr.error(error.message, 'Error!');
        });
    }
    post.showComments = !post.showComments;
  }

  onSubmit(f) {
    const newPost: Post = {
      userId: 1,
      title: this.post.title,
      body: this.post.body
    };
    this.postService.createPost(newPost).subscribe((response) => {
        this.postsCount = this.posts.length;
        response.id = this.postsCount + 1; // jsonplaceholder always return id=101
        console.log(response);
        this.posts.push(response);
        this.toastr.success('Post created.', 'Created!');
      },
      (error) => {
        this.toastr.error(error.message, 'Error!');
      });
    f.reset();
  }


  onDelete(id: number) {
    if (id > 100) {
      this.posts = this.posts.filter((post: Post) => post.id !== id);
      this.postsCount = this.posts.length;
      this.toastr.success('Post deleted.', 'Deleted!');
      return;
    }
    this.postService.deletePost(id).subscribe((data: Object) => {
        this.posts = this.posts.filter((post: Post) => post.id !== id);
        this.postsCount = this.posts.length;
        this.toastr.success('Post deleted.', 'Deleted!');
      },
      (error) => {
        this.toastr.error(error.message, 'Error!');
      });
  }
}
