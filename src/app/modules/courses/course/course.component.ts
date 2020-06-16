import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../../services/auth.service';
import { CourseService } from '../../../services/course.service';

import { Course } from '../../../models/course.model';
import { UserData } from '../../../models/user.model';
import { NewChapterComponent } from '../new-chapter/new-chapter.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  isLoading = true;
  panelOpenState = false;

  isCreator = false;

  currentUser: UserData;
  course: Course = new Course();
  courseId: string;

  userName: string;
  typesOfShoes: string[] = ['Sirine Mabrouk', 'Sirine Mabrouk', 'Sirine Mabrouk', 'Sirine Mabrouk', 'Sirine Mabrouk'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private  courseService: CourseService,
    private authService: AuthService,
    private dialog: MatDialog,


  ) { }
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
          this.courseId = paramMap.get('courseId');
          this.loadCourse();
      }
  );

  }

  loadCourse() {
    this.isLoading = true;
    const currentUser : UserData = this.authService.getUser();

    this.courseService.getCourseById(this.courseId).subscribe(

      (course: Course) => {
        this.course = course;
       // console.log(course.chapters[1].chapterName);
        if (currentUser) {
          this.isCreator = currentUser._id === this.course.creator;

        }
        if (!this.isCreator) {

          this.userName = currentUser.lastName + ' ' + currentUser.firstName;

        }else{
          // this.userName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
          // console.log(this.userName);
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }
  openNewChapterDialog(){
    this.dialog.open(
      NewChapterComponent,
        {
          width: '500px'
        }
    );
  }
}
