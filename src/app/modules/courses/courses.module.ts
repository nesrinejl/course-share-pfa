import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';

import { CoursesComponent } from './courses.component';
import { NewCourseComponent } from './new-course/new-course.component';


@NgModule({
  imports: [
    CommonModule,
    CoursesRoutingModule
  ],
  declarations: [
    CoursesComponent,
    NewCourseComponent
  ],
})
export class CoursesModule { }
