import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

import { blankValidator, customEmailValidator, passwordStrengthValidator } from '../../../utils/validators.util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription;

  constructor(public authService: AuthService, private formBuilder: FormBuilder) {}

  signUpForm: FormGroup = this.formBuilder.group({
    firstName: [ '', Validators.required, blankValidator() ],
    lastName: [ '', Validators.required, blankValidator() ],
    email: [ '', Validators.required, customEmailValidator() ],
    role: [ '', Validators.required, blankValidator() ],
    password: [ '', Validators.required, passwordStrengthValidator() ],
    passwordConfirmation: [ '', Validators.required ]
  });

  // hide = true;
  // hideConfirmPass =true;

  selected = "Enseignant";

  ngOnInit(): void {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      // authStatus => {
      //   this.isLoading = false;
      // }
    );
  }
  onSignup(){

    if (this.signUpForm.get('password').value !== this.signUpForm.get('passwordConfirmation').value) {
      this.signUpForm.get('passwordConfirmation').setErrors({ notIdentical: true });
      return;
    }
    if (this.signUpForm.invalid){
      return;
    }
   // this.isLoading = true;
    this.authService
      .createUser(
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.firstName,
        this.signUpForm.value.lastName,
        this.signUpForm.value.role
      );
  }
  ngOnDestroy(){
    this.authStatusSub
      .unsubscribe();
  }

}
