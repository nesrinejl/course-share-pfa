import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { NewCourseComponent } from './new-course/new-course.component';


const COURSES_ROUTES: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      // {
      //   path: 'new-course',
      //   component: NewCourseComponent
      // }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(COURSES_ROUTES) ],
  exports: [ RouterModule ]
})
export class CoursesRoutingModule {

}
