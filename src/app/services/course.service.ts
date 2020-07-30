import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { Course } from '../models/course.model';

import { FETCHING_JSON_REQUESTS_HTTP_OPTIONS } from '../constants/http-options.constants';

import { Chapter } from '../models/chapter.model';
import { Content } from '../models/content.model';
import { Document } from '../models/document.model';
import { UserData } from '../models/user.model';
import { Post } from '../models/post.model';

const backendUrl  = environment.apiUrl + '/courses';

@Injectable()
export class CourseService {

  private course: Course;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createCourse(course: Course): Observable<any> {

    return this.http.post<any>(backendUrl + '/new-course', course);

  }

// get courses by creatorId
  getCoursesByCreatorId(creatorId: string): Observable<Course[]> {

    const options = { ...FETCHING_JSON_REQUESTS_HTTP_OPTIONS };

    options.params = new HttpParams();
    options.params = options.params.set('creatorId', creatorId);

    return this.http.get<Course[]>(backendUrl, options);

  }

  // get course by Id
  getCourseById(courseId: string): Observable<Course> {

    const url = backendUrl + '/' + courseId;

    return this.http.get<Course>(url, FETCHING_JSON_REQUESTS_HTTP_OPTIONS);

  }

  addChapter(chapter: any, courseId: string): Observable<any> {
    return this.http.post<any>(backendUrl + '/' + courseId + '/chapters', chapter);
  }

  getChapterById(chapterId: string, courseId: string): Observable<Chapter> {

    const url = backendUrl + '/' +  courseId + '/chapters/' + chapterId;

    return this.http.get<Chapter>(url, FETCHING_JSON_REQUESTS_HTTP_OPTIONS);

  }

  getChaptersByCourseId(courseId: string): Observable<any> {
    const url = backendUrl + '/' +  courseId + '/chapters/';

    return this.http.get<any>(url, FETCHING_JSON_REQUESTS_HTTP_OPTIONS );

  }

  addContent(chapterId: string, courseId: string,  content: string, contentType: string, contentTitle: string,  documents: Document[]): Observable<Content> {
    const contentData = new FormData();
    contentData.append('contentTitle', contentTitle);
    contentData.append('content', content);
    contentData.append('contentType', contentType);
    documents.forEach((document) => {
      contentData.append('documentTypes', document.documentType);
      contentData.append('documents', document.file);
    });
    console.log(contentData.getAll('content'));
    console.log(contentData.getAll('documents').values());

    return this.http.post<Content>(backendUrl + '/' + courseId + '/chapters/' + chapterId  + '/add-content', contentData);
  }

  getCoursesByStudentId(studentId: string): Observable<Course[]> {

    const options = { ...FETCHING_JSON_REQUESTS_HTTP_OPTIONS };

    options.params = new HttpParams();
    options.params = options.params.set('studentId', studentId);

    return this.http.get<Course[]>(backendUrl, options);

  }

  getCreatorByCourseId(courseId: string): Observable<any> {
    return this.http.get<any>(backendUrl + '/' + courseId);
  }

  addPost(post: Post, courseId: string): Observable<Post> {
    return this.http.post<Post>(backendUrl + '/' + courseId + '/posts', post);
  }

  getPostsByCourseId(courseId: string): Observable<any> {
    return this.http.get<any>(backendUrl + '/' + courseId + '/posts');
  }

  addComment(comment: Comment, postId: string, courseId: string): Observable<Comment> {
    return this.http.post<Comment>(backendUrl + '/' + courseId + '/posts/' + postId, comment);
  }

  getCommentByPostId(courseId: string, postId: string): Observable<any> {
    return this.http.get<any>(backendUrl + '/' + courseId + '/posts/' + postId + '/comments');
  }
}
