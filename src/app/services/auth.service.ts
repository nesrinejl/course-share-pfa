import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';

import { UserData } from '../models/user.model';
import { UserRolesEnum } from '../enumerations/user-roles.enum';
import { getRoutePrefixFromRole } from '../utils/navigations.util';


const BackendUrl  = environment.apiUrl + '/user';

@Injectable({ providedIn: "root" })
export class AuthService{

  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private user: UserData;

  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.autoAuthUser();
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUser() {
    return this.user;
  }
  getUserRole() {
    return this.user.role;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string, firstName: string, lastName: string, role: UserRolesEnum, courseId?: string) {
    const userData: any = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role
    };
    if (courseId) {
      userData.courseId = courseId;
    }
    this.http
      .post(BackendUrl + '/sign-up', userData)
      .subscribe(() => {
        this.router.navigate(["/auth/login"]);
        localStorage.removeItem('token');
        this.token = undefined;
        }, error => {
          this.authStatusListener.next(false);
        }


      );
  }

  routeUserAfterAuthentication() {

    const user = this.getUser();
    this.router.navigate([getRoutePrefixFromRole(user.role)]);

  }

  login(email: string, password: string) {

     const loginInCredentials = {email: email, password: password};
     this.http.post<{token: string, expiresIn: number}>(BackendUrl + '/login', loginInCredentials)
      .subscribe(
        response => {
          this.http.get(BackendUrl, { params: new HttpParams().set('email', email) })
            .subscribe(
              (userData : UserData) => {

                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;

                this.user = userData;
                this.authStatusListener.next(true);

                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000)

                this.saveAuthData(response.token, expirationDate, userData);
                this.routeUserAfterAuthentication();

              }
            )

      }, error => {

        this.authStatusListener.next(false);
        switch (error.status) {
          case 400:
              this.snackBar.open('Quelque chose ne va pas!  Veuillez réessayer plus tard');
              break;
          case 401:
              this.snackBar.open('Identifiants incorrects!');
              break;
        }

      }
    );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0){
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.user = authInformation.user;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {

    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.user = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/auth/login']);

  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000 );
  }

  private saveAuthData(token: string, expirationDate: Date, user: UserData) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('user', JSON.stringify(user));
  }


  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');

  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const user = JSON.parse(localStorage.getItem('user'));
    if (!token || !user || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      user: user,
    }
  }
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }
}

