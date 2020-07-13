import { Chapter } from '../models/chapter.model';
import { Post } from './post.model';

export class Course {
  _id?: string;
  courseName?: string;
  courseDescription?: string;
  chapters?: Chapter[] = [];
  posts?: Post[] = [];
  creator?: string;
  createdAt?: string;
  updatedAt?: string;

}
