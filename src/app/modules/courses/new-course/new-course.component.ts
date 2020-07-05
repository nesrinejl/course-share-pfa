import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';

import { Router } from '@angular/router';

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
    public dialogRef: MatDialogRef<NewCourseComponent>,
    private snackBar: MatSnackBar,

  ) {}


  newCourseForm: FormGroup = this.formBuilder.group({

    courseName: [ '', Validators.required, blankValidator() ],
    courseDescription : ['']

  });

  onCreateCourse(){
    const currentUser: UserData = this.authService.getUser();
    const course: Course = { ...this.newCourseForm.value };

    if (this.newCourseForm.invalid){
      return;
    }
    if (currentUser) {
      course.creator = currentUser._id;
    }
    this.courseService.createCourse(course).subscribe(
      (response: any) => {
          this.snackBar.open('Le cours a été créé avec succès!');

          this.router.navigate([ '/teacher/courses' ]);
          this.dialogRef.close(true);
      },
      (error: any) => {
          this.snackBar.open('Oups! Une erreur s\'est produite. Veuillez vérifier votre saisie et réessayer plus tard.');
          console.log(error);
      }

    );

  }

}
