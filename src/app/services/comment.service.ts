import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../models/comment';
import { environment } from '../../environments/environment';

@Injectable()
export class CommentService {

  api_url = environment.api_url;

  constructor(
    public http: HttpClient
  ) { }

  getCommentsByPostId(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.api_url}/posts/${id}/comments`);
  }


}
