import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { Course } from '../models/course.model';

import { HeaderComponent } from '.././components/app-layout/header/header.component'
import { FETCHING_JSON_REQUESTS_HTTP_OPTIONS } from '../constants/http-options.constants';


const backendUrl  = environment.apiUrl + '/courses';

@Injectable()
export class CourseService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createCourse(course: Course): Observable<any>{
    //const courseData = new FormData();
    return this.http.post<any>(backendUrl + '/new-course', course);

    // this.http
    //   .post(BACKEND_URL + '/courses/', course)
    //   .subscribe(() => {
    //     this.router.navigate(["/"]);
    //     }, error => {
    //       //this.authStatusListener.next(false);
    //     }
    //   );
  }

  getCoursesByUserId(userId: string): Observable<Course[]>{

    const options = { ...FETCHING_JSON_REQUESTS_HTTP_OPTIONS };

    options.params = new HttpParams();
    options.params = options.params.set('userId', userId);

    console.log(this.http.get<Course[]>(backendUrl, options));
    return this.http.get<Course[]>(backendUrl, options);

  }

}
