import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from '../../../services/course.service';
import { AuthService } from '../../../services/auth.service';

import { Course } from '../../../models/course.model';
import { UserData } from '../../../models/user.model';

import { NewCourseComponent } from 'src/app/modules/courses/new-course/new-course.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],

})
export class CoursesListComponent implements OnInit {

  isLoading = true;
  courses : Course[] = [];

  currentUser : UserData = this.authService.getUser();

  constructor(
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (!this.currentUser) {
        return;
    }
    console.log(this.currentUser);

    this.isLoading = true;
    if (this.currentUser.role === 'Teacher') {
      this.courseService.getCoursesByCreatorId(this.currentUser._id).subscribe(
        (courses: Course[]) => {
          this.courses = courses;
          this.isLoading = false;
        },
        (error: any) => {
          console.log(error);
          this.courses = [];
          this.isLoading = false;
        }
      )
    }
    if (this.currentUser.role === 'Student') {
      this.courseService.getCoursesByStudentId(this.currentUser._id).subscribe(
        (result: any) => {
          this.courses = result.courses;
          this.isLoading = false;

        },
        (error: any) => {
          console.log(error);
          this.courses = [];
          this.isLoading = false;
        }
      )
    }

  }

  openNewCourseDialog() {
    this.dialog.open(
      NewCourseComponent,
        {
          width: '500px'
        }
    );
  }

  navigateToCourseDetails(courseId: string) {
    if (this.currentUser.role === 'Teacher') {
      this.router.navigateByUrl('/teacher/courses/' + courseId);
    } else {
      this.router.navigateByUrl('/student/courses/' + courseId);
    }

  }

}
