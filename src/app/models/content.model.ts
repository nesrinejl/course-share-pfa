import { ContentTypeEnum } from "../enumerations/content-type.enum";
import { Document } from "../models/document.model";

export class Content {

  contentType: ContentTypeEnum;
  content: string;
  documents: Document[] = [];

}
