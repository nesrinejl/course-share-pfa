import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student.component';

export const STUDENT_ROUTES: Routes = [
  {
      path: '',
      component: StudentComponent,
      children: [
        {
          path: 'courses',
          loadChildren: () => import('../courses/courses.module').then(m => m.CoursesModule)
        },
        {
          path: '**',
          redirectTo: 'courses',
          pathMatch: 'full'
        }
      ]
  }
]
@NgModule({
  imports: [ RouterModule.forChild(STUDENT_ROUTES) ],
  exports: [ RouterModule ]
})
export class StudentRoutingModule {

}
