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

  contentType = ContentTypeEnum.DOCUMENTATION;
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

    contentTitle: ['',  [Validators.required, Validators.maxLength(50)] , [ blankValidator() ]],
    content: ['',  [Validators.required, Validators.maxLength(500)] , [ blankValidator() ]],
    //contentType: [ ContentTypeEnum.DOCUMENTATION ],
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
    if (this.addContentForm.invalid){
      return;
    }
    console.log(this.documents.value)
    this.courseService.addContent(this.chapterId, this.courseId,  contentData.content, this.contentType, contentData.contentTitle, this.documents.value).subscribe(
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
        file: ['', [Validators.required]],
    }));

    this.showDocumentCard = true;
  }


  onRemoveDocument(index: number) {
    this.documents.removeAt(index);
  }


  onDocumentSelectionChange(){

  }


  onFileChange(event: any, documentIndex: number, documentType: string) {

    // verify if there is a file
    if (!event.target) {
      return;
    }
    if (!event.target.files) {
      return;
    }
    if (event.target.files.length !== 1) {
      return;
    }

    // get that file from the event
    const file: File = event.target.files[0];

    // image validation
    if (documentType === 'IMAGE' && file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif'){
      this.snackBar.open('Le type de ce fichier est invalide! Le type de l\'image ne peut être que jpeg, jpg, png ou gif');
    }
    // file validation
    if (documentType === 'FILE' && file.type !== 'text/plain' && file.type !== 'application/pdf' && file.type !== 'application/x-rar-compressed' && file.type !== 'application/zip' && file.type !== 'application/vnd.ms-powerpoint' && file.type !== 'application/vnd.oasis.opendocument.text' && file.type !== 'application/msword'){
      this.snackBar.open('Le type de ce fichier est invalide! Le type fichier ne peut être que pdf, rar, zip, doc, odt ou gif');
    }
    // sound validation
    if (documentType === 'SOUND' && file.type !== 'audio/mpeg'){
      this.snackBar.open('Le type de ce fichier est invalide! Le type de fichier doit être en mpeg');
    }
    // video validation
    if (documentType === 'VIDEO' && file.type !== 'video/mpeg'){
      this.snackBar.open('Le type de ce fichier est invalide! Le type de fichier doit être en mp4');
    }
    // add the file to the form group
    this.documents.at(documentIndex).get('file').setValue(file);

    console.log(this.documents);

  }

  onDocumentTypeSelectionChange(index: number){

  }


}
