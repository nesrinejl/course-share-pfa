import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { NewCourseComponent } from './new-course/new-course.component';

import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CourseComponent } from './course/course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { NewChapterComponent } from './new-chapter/new-chapter.component';
import { NewContentComponent } from './new-content/new-content.component';

@NgModule({
  imports: [

    CommonModule,
    CoursesRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule

  ],
  declarations: [

    CoursesComponent,
    NewCourseComponent,
    CourseComponent,
    CoursesListComponent,
    NewChapterComponent,
    NewContentComponent

  ],
  entryComponents: [
    NewCourseComponent,
    NewChapterComponent
  ]
})
export class CoursesModule { }
