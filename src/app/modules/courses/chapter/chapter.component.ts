import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { CourseService } from '../../../services/course.service';

import { Course } from '../../../models/course.model';
import { UserData } from '../../../models/user.model';
import { Chapter } from '../../../models/chapter.model';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {


  isLoading = true;
  panelOpenState = false;
  isCreator = false;

  chapter: Chapter = new Chapter();
  chapters: Chapter[] = [];
  course: Course = new Course();
  creator: UserData;

  courseId: string;
  creatorName: string;
  role: string;

  currentUser: UserData = this.authService.getUser();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private  courseService: CourseService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
          this.loadChapter(paramMap.get('chapterId'), paramMap.get('courseId'));
          this.loadCourse(paramMap.get('courseId'));
         // this.loadCourseCreator(paramMap.get('courseId'));
      }
  );
  }

  loadChapter(chapterId: string, courseId: string) {
    this.isLoading = true;
    const currentUser: UserData = this.authService.getUser();
    this.role = currentUser.role;

    this.courseService.getChapterById(chapterId, courseId).subscribe(

      (chapter: Chapter) => {

        this.chapter = chapter;
        this.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  navigateToChapterDetails(courseId: string, chapterId: string) {

    if (this.role === 'Teacher') {
      this.router.navigateByUrl('/teacher/courses/' + courseId + '/chapters/' + chapterId);
    } else {
      this.router.navigateByUrl('/student/courses/' + courseId + '/chapters/' + chapterId);
    }

  }

  navigateToCourse(courseId: string) {

    if (this.role === 'Teacher') {
      this.router.navigateByUrl('/teacher/courses/' + courseId );
    } else {
      this.router.navigateByUrl('/student/courses/' + courseId );
    }

  }

  navigateToAddContent(courseId: string, chapterId: string) {
    this.router.navigateByUrl('/teacher/courses/' + courseId + '/chapters/' + chapterId + '/add-content');
  }

  loadCourse(courseId: string) {
    console.log();
    this.courseService.getCourseById(courseId).subscribe(
      (result: any) => {
        this.course = result.course;
        this.creator = result.creator;
        console.log(result.creator);
        if (this.currentUser) {
          this.isCreator = this.currentUser._id === this.course.creator;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
