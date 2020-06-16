import { Component, Inject } from '@angular/core';


import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';

import { SnackBar } from '../../../../models/snack-bar.model';
import { NewCourseComponent } from 'src/app/modules/courses/new-course/new-course.component';

@Component({
  templateUrl: './snack-bar.component.html',
  styleUrls: [ './snack-bar.component.scss' ]
})

export class SnackBarComponent {

  durationInSeconds = 5;

  constructor(
      private snackBar: MatSnackBar,
      public snackBarRef: MatSnackBarRef<SnackBarComponent>,
      @Inject(MAT_SNACK_BAR_DATA) public data: SnackBar
  ) {}

  openSnackBar() {
    this.snackBar.openFromComponent(NewCourseComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
