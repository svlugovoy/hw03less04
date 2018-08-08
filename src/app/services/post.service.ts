import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Post } from '../models/post';
import { environment } from '../../environments/environment';

@Injectable()
export class PostService {

  api_url = environment.api_url;

  constructor(
    public http: HttpClient
  ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.api_url}/posts`);
  }

  deletePost(id: number): Observable<Object> {
    return this.http.delete<Object>(`${this.api_url}/posts/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.api_url}/posts`, post);
  }

}
