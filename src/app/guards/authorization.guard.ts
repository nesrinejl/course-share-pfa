import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { UserData } from './../models/user.model';
import { UserRolesEnum } from '../enumerations/user-roles.enum';
import { getRoutePrefixFromRole } from '../utils/navigations.util';


@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private location: Location
    ) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

      const currentUser: UserData = this.authService.getUser();

      if (currentUser !== null) {
          const canActivate = state.url.startsWith(getRoutePrefixFromRole(currentUser.role));
          if (!canActivate) {
              this.location.back();
          }
          return canActivate;
      }

  }



}
