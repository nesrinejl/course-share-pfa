
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { UserData } from '../models/user.model';

import { FETCHING_JSON_REQUESTS_HTTP_OPTIONS } from '../constants/http-options.constants';

const backendUrl  = environment.apiUrl + '/user';



@Injectable()
export class UserService{


  constructor(
    private http: HttpClient,
  ) { }

  getUserById(userId: string): Observable<UserData> {

      const options = { ...FETCHING_JSON_REQUESTS_HTTP_OPTIONS };

      options.params = new HttpParams();
      options.params = options.params.set('userId', userId);

      return this.http.get<UserData>(backendUrl, options);

  }
}
