import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup  } from '@angular/forms';
import { blankValidator } from '../../../utils/validators.util';

@Component({
  templateUrl: './new-course.component.html',
  styleUrls: [ './new-course.component.css' ]
})

export class NewCourseComponent {

  constructor(
    private formBuilder: FormBuilder,
    dialogRef: MatDialogRef<NewCourseComponent>
  ) {}


  newCourseForm: FormGroup = this.formBuilder.group({

    courseName: [ '', Validators.required, blankValidator() ],
    courseDescription : ['']

  });

  onSubmit(){
    console.log(this.newCourseForm.get('courseName').value);
  }

}
