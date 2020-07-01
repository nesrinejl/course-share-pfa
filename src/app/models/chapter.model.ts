import { Content } from "../models/content.model";

export class Chapter {
  _id?: string;
  chapterName: string;
  content: Content[] = [];
  createdAt?: string;
  updatedAt?: string;
}
