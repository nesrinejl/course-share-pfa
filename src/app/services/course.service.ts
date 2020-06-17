import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { Course } from '../models/course.model';

import { HeaderComponent } from '.././components/app-layout/header/header.component'
import { FETCHING_JSON_REQUESTS_HTTP_OPTIONS } from '../constants/http-options.constants';
import { Chapter } from '../models/chapter.model';


const backendUrl  = environment.apiUrl + '/courses';

@Injectable()
export class CourseService {

  private course: Course;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createCourse(course: Course): Observable<any>{

    return this.http.post<any>(backendUrl + '/new-course', course);

  }
// get course by userId (creator)
  getCoursesByUserId(userId: string): Observable<Course[]>{

    const options = { ...FETCHING_JSON_REQUESTS_HTTP_OPTIONS };

    options.params = new HttpParams();
    options.params = options.params.set('userId', userId);

    return this.http.get<Course[]>(backendUrl, options);

  }

  //get course by Id
  getCourseById(courseId: string) : Observable<Course>{

    const url = backendUrl + '/' + courseId;

    return this.http.get<Course>(url, FETCHING_JSON_REQUESTS_HTTP_OPTIONS );

  }
  getCourseId(){
    return this.course;
  }

  addChapter(chapter: any, courseId: string): Observable<any>{
    return this.http.post<any>(backendUrl + '/' + courseId +'/chapters', chapter);
  }
}
