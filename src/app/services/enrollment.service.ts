import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Enrollment } from '../models/enrollment.model';
import { UserData } from '../models/user.model';

import { FETCHING_JSON_REQUESTS_HTTP_OPTIONS } from '../constants/http-options.constants';

const backendUrl  = environment.apiUrl + '/enrollments';

@Injectable()
export class EnrollmentService {

  constructor(
    private http: HttpClient,
  ) {}

  createEnrollment(courseId: string, email: string): Observable<Enrollment> {
    return this.http.post<Enrollment>(backendUrl, { courseId: courseId, email: email});
  }

  getStudentsByCourseId(courseId: string): Observable<UserData[]> {

    const options = { ...FETCHING_JSON_REQUESTS_HTTP_OPTIONS };

    options.params = new HttpParams();
    options.params = options.params.set('courseId', courseId);

    return this.http.get<UserData[]>(backendUrl, options);
  }
}
