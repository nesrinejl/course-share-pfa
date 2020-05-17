// service : implémente canActive dans l'interface angular w n7ot'ha f configuration mte3 routing
//canActivate: accepte les types des services yraj3ou ya true ya false ( ken true t7el sinon lé)
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authService.getIsAuth();
    
    if (!isAuth){
      this.router.navigate(['/auth/login']);
    }
    return isAuth;
  }

}

