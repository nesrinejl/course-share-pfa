import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfViewerModule } from 'ng2-pdf-viewer';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { NewCourseComponent } from './new-course/new-course.component';

import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CourseComponent } from './course/course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { NewChapterComponent } from './new-chapter/new-chapter.component';
import { NewContentComponent } from './new-content/new-content.component';
import { ChapterComponent } from './chapter/chapter.component';
import { ContentDetailCardComponent } from './content-detail-card/content-detail-card.component';
import { AddStudentDialogComponent } from './add-student-dialog/add-student-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [

    CommonModule,
    CoursesRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PdfViewerModule,
    SharedModule

  ],
  declarations: [

    CoursesComponent,
    NewCourseComponent,
    CourseComponent,
    CoursesListComponent,
    NewChapterComponent,
    NewContentComponent,
    ChapterComponent,
    ContentDetailCardComponent,
    AddStudentDialogComponent,


  ],
  entryComponents: [
    NewCourseComponent,
    NewChapterComponent,
    AddStudentDialogComponent
  ]
})
export class CoursesModule { }
