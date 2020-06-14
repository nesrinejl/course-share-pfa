import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { blankValidator } from '../../../utils/validators.util';

import { CourseService } from '../../../services/course.service';
import { AuthService } from '../../../services/auth.service';
import { UserData } from '../../../models/user.model';
import { Course } from 'src/app/models/course.model';
@Component({
  templateUrl: './new-course.component.html',
  styleUrls: [ './new-course.component.css' ]
})

export class NewCourseComponent {

  constructor(
    public courseService: CourseService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<NewCourseComponent>
  ) {}


  newCourseForm: FormGroup = this.formBuilder.group({

    courseName: [ '', Validators.required, blankValidator() ],
    courseDescription : ['']

  });

  onCreateCourse(){
    const currentUser: UserData = this.authService.getUser();
    const form: Course = { ...this.newCourseForm.value };

    if (this.newCourseForm.invalid){
      return;
    }
    if (currentUser) {
      form.creator = currentUser._id;

    }
    this.courseService.createCourse(form).subscribe(
      (response: any) => {
          console.log('form created successfully!');
          this.router.navigate([ '/' ]);
          this.dialogRef.close(true);
      },
      (error: any) => {
          console.log(error);
      }

    );

  }

}
