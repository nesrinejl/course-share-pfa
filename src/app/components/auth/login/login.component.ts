import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { customEmailValidator } from '../../../utils/validators.util';
import { UserRolesEnum } from 'src/app/enumerations/user-roles.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword = true;

  constructor(public authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  loginForm: FormGroup = this.formBuilder.group({

    email: [ '', Validators.required, customEmailValidator() ],
    password: [ '', Validators.required ]

  });


  ngOnInit(): void {

    if (this.authService.getIsAuth()){

      this.authService.routeUserAfterAuthentication();

    }
  }

  onLogin(){
    if (this.loginForm.invalid){
      return;
    }
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }



}
