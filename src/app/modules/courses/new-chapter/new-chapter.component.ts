import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { blankValidator } from '../../../utils/validators.util';

import { CourseService } from '../../../services/course.service';
import { AuthService } from '../../../services/auth.service';
import { UserData } from '../../../models/user.model';
import { Course } from 'src/app/models/course.model';
import { Chapter } from 'src/app/models/chapter.model';

@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.css']
})
export class NewChapterComponent implements OnInit {

  constructor(
    public courseService: CourseService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<NewChapterComponent>) { }

  newChapterForm: FormGroup = this.formBuilder.group({

    chapterName: [ '', Validators.required, blankValidator() ],

  });

  ngOnInit(): void {
  }
  onCreateChapter(){

    const currentUser: UserData = this.authService.getUser();
    const chapter: Chapter = { ...this.newChapterForm.value };
    const courseId = this.courseService.getCourseId()._id;
    console.log(courseId)

    if (this.newChapterForm.invalid){
      return;
    }
    // if (currentUser) {
    //   course.creator = currentUser._id;
    // }
    this.courseService.addChapter(chapter, courseId).subscribe(
      (response: any) => {
          this.router.navigate([ '/' ]);
          this.dialogRef.close(true);
      },
      (error: any) => {
          console.log(error);
      }

    );

  }

}
