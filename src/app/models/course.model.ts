import { Chapter } from "../models/chapter.model";

export class Course {
  _id?: string;
  courseName?: string;
  courseDescription?: string;
  chapters?: Chapter[] = [];
  creator?: string;

}
