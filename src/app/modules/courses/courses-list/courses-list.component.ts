import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from '../../../services/course.service';
import { AuthService } from '../../../services/auth.service';

import { Course } from '../../../models/course.model';
import { UserData } from '../../../models/user.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],

})
export class CoursesListComponent implements OnInit {

  isLoading = true;
  courses : Course[] = [];


  constructor(
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService,

  ) { }

  ngOnInit(): void {
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
  loadCourses() {

  }

  onCreateNewCourse() {
    //this.headerComponent.openNewCourseDialog();
  }

  navigateToCourseDetails(courseId: string) {
    this.router.navigateByUrl('/teacher/courses/' + courseId);
  }

}
