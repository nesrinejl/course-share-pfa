import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeacherComponent } from './teacher.component';


export const TEACHER_ROUTES: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: 'courses',
        loadChildren: () => import('../courses/courses.module').then(m => m.CoursesModule)
      }
    ]
  }
]
@NgModule({
  imports: [ RouterModule.forChild(TEACHER_ROUTES) ],
  exports: [ RouterModule ]
})
export class TeacherRoutingModule {

}
