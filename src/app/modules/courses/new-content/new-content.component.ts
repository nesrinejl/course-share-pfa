import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { blankValidator } from '../../../utils/validators.util';

import { CourseService } from '../../../services/course.service';

import { Course } from '../../../models/course.model';
import { UserData } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { Chapter } from '../../../models/chapter.model';
import { Content } from '../../../models/content.model';

import { ContentTypeEnum } from '../../../enumerations/content-type.enum';

import { mimeType } from '../../../utils/mime-type.validator';

@Component({
  selector: 'app-new-content',
  templateUrl: './new-content.component.html',
  styleUrls: ['./new-content.component.scss']
})
export class NewContentComponent implements OnInit {

  course: Course = new Course();
  chapter: Chapter = new Chapter();
  currentUser: UserData;
  documentsArray : Document[] = [];

  chapterId: string;
  courseId: string;
  imagePreview: string;

  showDocumentCard = false;
  isCreator = false;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  addContentForm: FormGroup = this.formBuilder.group({

    content: ['',  [Validators.required, Validators.maxLength(500)] , [ blankValidator() ]],
    contentType: [ ContentTypeEnum.DOCUMENTATION ],
    documents: this.formBuilder.array([])

  });

  get documents() {


    return this.addContentForm.get('documents') as FormArray;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {

          this.courseId = paramMap.get('courseId');
          this.chapterId = paramMap.get('chapterId');
          this.loadChapter(this.chapterId, this.courseId);
          this.loadCourse(this.courseId);
      })

  }

  onCreateContent(){

    const contentData: Content = { ...this.addContentForm.value };
    // if (this.addContentForm.invalid){
    //   return;
    // }
    //console.log(this.documents);
    this.courseService.addContent(this.chapterId, this.courseId,  contentData.content, this.documents.value).subscribe(
      (response: any) => {
        this.snackBar.open('Le contenu a été ajouté à ce chapitre avec succès!');

        this.router.navigateByUrl( '/teacher/courses/' + this.courseId + '/chapters/' + this.chapterId );

    },
    (error: any) => {
        this.snackBar.open('Oups! Something went wrong, please verify your input and try again later.');
        console.log(error);
    }
    );


  }
  loadCourse(courseId: string) {
    const currentUser : UserData = this.authService.getUser();

    this.courseService.getCourseById(courseId).subscribe(

      (course: Course) => {
        this.course = course;
        if (currentUser) {
          this.isCreator = currentUser._id === this.course.creator;

        }

      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  loadChapter(chapterId: string, courseId: string) {

    this.courseService.getChapterById(chapterId, courseId).subscribe(

      (chapter: Chapter) => {

        this.chapter = chapter;
        console.log(chapter);

      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onAddDocument() {

    this.documents.push(this.formBuilder.group({
        documentType: [ '', Validators.required ],
        file: ['', [Validators.required], [mimeType]],
        //file : new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    }));
    console.log(this.documents.controls.values);
    this.showDocumentCard = true;
  }


  onRemoveDocument(index: number) {
    this.documents.removeAt(index);
  }


  onDocumentSelectionChange(){

  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.addContentForm.patchValue({file: file});
    for (let i=0; i<this.documents.controls.length; i++){

      this.documents.controls[i].get('file').updateValueAndValidity();
      //this.documents.get('file').updateValueAndValidity();
    }

    // adding image Preview url
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}
