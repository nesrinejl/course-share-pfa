import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

import { Course } from '../../models/course.model';
import { UserData } from '../../models/user.model';

import { HeaderComponent } from 'src/app/components/app-layout/header/header.component';


@Component({
  templateUrl: './courses.component.html',
  styleUrls: [ './courses.component.scss' ]

})
export class CoursesComponent implements OnInit{
  isLoading = true;

  courses : Course[] = [];

  ngOnInit() {

    const currentUser : UserData = this.authService.getUser();
    if (!currentUser) {
        return;
    }

    this.isLoading = true;
    this.courseService.getCoursesByUserId(currentUser._id).subscribe(
      (courses: Course[]) => {
        this.courses = courses;
          this.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.courses = [];
        this.isLoading = false;
      }
    );
  }
  constructor(
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService,

  ) {}

  loadCourses() {

  }

  onCreateNewCourse() {
    //this.headerComponent.openNewCourseDialog();
  }

  navigateToCourseDetails() {
    //this.router.navigateByUrl('/app/form/' + formId);
  }


}
