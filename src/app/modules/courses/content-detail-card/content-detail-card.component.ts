import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { MatAccordion } from '@angular/material/expansion';

import { Document } from 'src/app/models/document.model';
import { UserData } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Chapter } from 'src/app/models/chapter.model';

@Component({
  selector: 'app-content-detail-card',
  templateUrl: './content-detail-card.component.html',
  styleUrls: ['./content-detail-card.component.css']
})
export class ContentDetailCardComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  documents: Document[] = [];
  chapter: Chapter = new Chapter();
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(

      (paramMap: ParamMap) => {
          this.loadDocument(paramMap.get('chapterId'), paramMap.get('courseId'));
      }
  );
  }

  loadDocument(chapterId: string, courseId: string) {
    const currentUser : UserData = this.authService.getUser();

    this.courseService.getChapterById(chapterId, courseId).subscribe(

      (chapter: Chapter) => {

        this.chapter = chapter;

      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
