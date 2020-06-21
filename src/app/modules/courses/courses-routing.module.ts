import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';

import { CourseComponent } from './course/course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { ChapterComponent } from './chapter/chapter.component';
import { NewContentComponent } from './new-content/new-content.component';


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
        path: ':courseId',
        component: CourseComponent
      },
      {
        path: ':courseId/chapters/:chapterId',
        component: ChapterComponent
      },
      {
        path: ':courseId/chapters/:chapterId/add-content',
        component: NewContentComponent
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
