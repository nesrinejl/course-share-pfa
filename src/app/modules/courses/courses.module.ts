import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { NewCourseComponent } from './new-course/new-course.component';

import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [

    CommonModule,
    CoursesRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule

  ],
  declarations: [

    CoursesComponent,
    NewCourseComponent

  ],
  entryComponents: [
    NewCourseComponent
  ]
})
export class CoursesModule { }
