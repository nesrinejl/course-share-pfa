import { ContentTypeEnum } from "../enumerations/content-type.enum";
import { Document } from "../models/document.model";

export class Content {
  _id?: string;
  contentTitle?: string;
  contentType: ContentTypeEnum;
  content: string;
  documents?: Document[] = [];
  createdAt?: string;
  updatedAt?: string;
}
