import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EnrollmentService } from 'src/app/services/enrollment.service';
import { blankValidator, customEmailValidator } from '../../../utils/validators.util';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.css']
})
export class AddStudentDialogComponent {

  constructor(
    private formBuilder: FormBuilder,
    private enrollmentService: EnrollmentService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  addStudentForm: FormGroup = this.formBuilder.group({

    studentEmail: [ '', Validators.required, blankValidator(), customEmailValidator() ],

  });

  onAddStudent() {
    if (this.addStudentForm.invalid) {
      return;
    }
    this.enrollmentService.createEnrollment(
      this.data.courseId,
      this.addStudentForm.get('studentEmail').value
    ).subscribe(
      () => {

        this.snackBar.open('L\'invitation a été envoyé avec succès!');

        this.dialogRef.close();
    },
    (error: any) => {
        console.log(error);
        //snackbar
        this.snackBar.open('Oups! Something went wrong, please verify your input and try again later.');

    }
    );
  }
}
