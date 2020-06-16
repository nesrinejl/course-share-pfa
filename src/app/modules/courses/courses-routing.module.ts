import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';

import { CourseComponent } from './course/course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';


const coursesRoutes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: '',
        component: CoursesListComponent
      },
      {
        path: 'course/:courseId',
        component: CourseComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(coursesRoutes) ],
  exports: [ RouterModule ]
})
export class CoursesRoutingModule {

}
