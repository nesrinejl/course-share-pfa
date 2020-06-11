import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewCourseComponent } from './new-course/new-course.component';

export const COURSE_ROUTES: Routes = [
  {
      path: '',
      component: NewCourseComponent
  }
]
@NgModule({
  imports: [ RouterModule.forChild(COURSE_ROUTES) ],
  exports: [ RouterModule ]
})
export class CourseRoutingModule {

}
