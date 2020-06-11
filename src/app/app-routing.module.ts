import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';


const routes: Routes = [
  // { path: '', component: AppLayoutComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(mod => mod.AuthModule),  },
  
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard, AuthorizationGuard],
    children: [
      {
        path: 'student',
        loadChildren: () => import('./modules/student/student.module').then(mod => mod.StudentModule),
      },
      {
        path: 'teacher',
        loadChildren: () => import('./modules/teacher/teacher.module').then(mod => mod.TeacherModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
