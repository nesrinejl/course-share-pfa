import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



import { blankValidator } from '../../../utils/validators.util';

import { CourseService } from '../../../services/course.service';
import { AuthService } from '../../../services/auth.service';

import { UserData } from '../../../models/user.model';

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
    public dialogRef: MatDialogRef<NewChapterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  newChapterForm: FormGroup = this.formBuilder.group({

    chapterName: [ '', Validators.required, blankValidator() ],

  });

  ngOnInit(): void {
    console.log(this.data.courseId);
  }
  onCreateChapter(){

    const currentUser: UserData = this.authService.getUser();
    const chapter: any = {
      chapters : [{...this.newChapterForm.value}]
    };

    console.log(chapter);
    if (this.newChapterForm.invalid){
      return;
    }
    // if (currentUser) {
    //   course.creator = currentUser._id;
    // }
    this.courseService.addChapter(chapter, this.data.courseId).subscribe(
      (createdChapter: Chapter) => {
          this.dialogRef.close(createdChapter);
      },
      (error: any) => {
          console.log(error);
      }
    );

  }

}
