import { NgModule } from '@angular/core';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports:[
    CommonModule,
    AngularMaterialModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})

export class AuthModule {}
