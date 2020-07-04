import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

import { blankValidator, customEmailValidator, passwordStrengthValidator } from '../../../utils/validators.util';
import { UserRolesEnum } from 'src/app/enumerations/user-roles.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription;
  private token : string;
  private courseId: string;
  showLoader = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

  signUpForm: FormGroup = this.formBuilder.group({

    firstName: [ '', Validators.required, blankValidator() ],
    lastName: [ '', Validators.required, blankValidator() ],
    email: [ '', Validators.required, customEmailValidator() ],
    password: [ '', Validators.required, passwordStrengthValidator() ],
    passwordConfirmation: [ '', Validators.required ]

  });

  selected = "Enseignant";

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      // authStatus => {
      //   this.isLoading = false;
      // }
    );
    this.activatedRoute.paramMap.subscribe(

      (paramMap: ParamMap) => {
          this.token = paramMap.get('token');
          this.courseId = paramMap.get('courseId');
          this.authService.setToken(this.token);
          console.log(this.courseId);
          console.log(this.token);
      }
    );
  }

  onSignup() {

    if (this.signUpForm.get('password').value !== this.signUpForm.get('passwordConfirmation').value) {
      this.signUpForm.get('passwordConfirmation').setErrors({ notIdentical: true });
      return;
    }


    if (this.signUpForm.invalid) {
      return;
    }
    this.showLoader = true;

    if (this.courseId && this.token) {

      this.authService
        .createUser(
          this.signUpForm.value.email,
          this.signUpForm.value.password,
          this.signUpForm.value.firstName,
          this.signUpForm.value.lastName,
          UserRolesEnum.STUDENT,
          this.courseId
        );

    } else {

      this.authService
      .createUser(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.firstName,
        this.signUpForm.value.lastName,
        UserRolesEnum.TEACHER
      );

    }
   // this.isLoading = true;
  }

  ngOnDestroy() {
    this.authStatusSub
      .unsubscribe();
  }

}
