import { Comment } from '../models/comment.model';

export class Post {
  _id?: string;
  postContent?: string;
  author?: string;
  comments?: Comment[] = [];
  createdAt?: string;
  updatedAt?: string;
}
