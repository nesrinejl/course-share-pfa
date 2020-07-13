import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { blankValidator } from '../../../utils/validators.util';


import { AuthService } from '../../../services/auth.service';
import { CourseService } from '../../../services/course.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { UserService } from '../../../services/user.service';

import { Course } from '../../../models/course.model';
import { UserData } from '../../../models/user.model';
import { NewChapterComponent } from '../new-chapter/new-chapter.component';
import { AddStudentDialogComponent } from '../add-student-dialog/add-student-dialog.component';
import { Post } from 'src/app/models/post.model';

import * as io from 'socket.io-client';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  isLoading = true;
  panelOpenState = false;
  isCreator = false;
  isAuthor = false;

  students: UserData[] = [];
  comments = [];
  currentUser: UserData;
  author: UserData;
  course: Course = new Course();
  creator: UserData;

  authorName: string;
  commentAuthorName: string;
  userName: string;
  role: string;
  creatorName: string;

  socket;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private enrollmentService: EnrollmentService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService

  ) { }

  addPostForm: FormGroup = this.formBuilder.group({

    postContent: ['', [Validators.required], [blankValidator()]]

  });

  addCommentForm: FormGroup = this.formBuilder.group({
    commentContent: ['', [Validators.required], [blankValidator()]]
  });

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');
    this.activatedRoute.paramMap.subscribe(
      (paramMap: ParamMap) => {
        this.loadCourse(paramMap.get('courseId'), 0);

        this.loadCourseCreator(paramMap.get('courseId'));
        console.log(paramMap.get('courseId'));

        this.socket.on('newCommentAdded', (data) => {
          this.snackBar.open('Un nouveau commentaire!');
          this.loadCourse(paramMap.get('courseId'), 0);
        });
      }
    );
  }


  loadCourse(courseId: string, selectedTabIndex: number) {

    const currentUser: UserData = this.authService.getUser();
    this.role = currentUser.role;


    if (selectedTabIndex === 0 || selectedTabIndex === 1) {
      this.isLoading = true;

      this.courseService.getCourseById(courseId).subscribe(

        (course: Course) => {
          this.course = course;

          if (currentUser) {
            this.isCreator = currentUser._id === this.course.creator;
            this.course.posts.forEach(post => {
              this.isAuthor = currentUser._id === post.author;
            });

          }

          if (!this.isCreator) {
            this.userName = currentUser.lastName + ' ' + currentUser.firstName;
          }

          if (this.isAuthor) {
            this.authorName = currentUser.lastName + ' ' + currentUser.firstName;
          }

          if (!this.isAuthor) {

          }

          this.course.posts.forEach(post => {
            this.loadComments(post._id);
          });

          this.isLoading = false;
        },
        (error: any) => {
          console.log(error);
          this.isLoading = false;
        }
      );
    }
    if (selectedTabIndex === 2) {
      this.isLoading = true;

      this.courseService.getCourseById(courseId).subscribe(

        (course: Course) => {
          this.course = course;


          if (currentUser) {
            this.isCreator = currentUser._id === this.course.creator;
          }

          if (!this.isCreator) {
            this.userName = currentUser.lastName + ' ' + currentUser.firstName;
          }
          console.log(this.course.posts);
          this.course.posts.forEach(post => {
            console.log(post);
            this.loadComments(post._id);
          });
          this.loadStudents();
          this.isLoading = false;
        },
        (error: any) => {
          console.log(error);
          this.isLoading = false;
        }
      )
    }


  }

  // loadCourse(courseId: string, selectedTabIndex: number) {

  //   const currentUser: UserData = this.authService.getUser();
  //   this.role = currentUser.role;
  //   if (selectedTabIndex === 0 || selectedTabIndex === 1) {
  //     this.isLoading = true;
  //     this.courseService.getCourseById(courseId).subscribe(

  //       (course: Course) => {
  //         this.course = course;
  //         if (currentUser) {
  //           this.isCreator = currentUser._id === this.course.creator;
  //         }
  //         console.log(this.course);

  //         if (!this.isCreator) {
  //           this.userName = currentUser.lastName + ' ' + currentUser.firstName;
  //         }
  //       //   this.course.posts.forEach(post => {
  //       //   this.loadCommentAuthor(post._id);
  //       //   // this.userService.getUserById(post.author).subscribe(
  //       //   //   (author: UserData) => {
  //       //   //     this.authorName = author.lastName + ' ' + author.firstName;
  //       //   //     this.isLoading = false;
  //       //   //   },
  //       //   //   (error: any) => {
  //       //   //       this.isLoading = false;
  //       //   //   }
  //       //   //   );
  //       // });
  //        // this.loadStudents();
  //         this.isLoading = false;
  //       },
  //       (error: any) => {
  //         console.log(error);
  //         this.isLoading = false;
  //       }
  //     );
  //   }
  //   if (selectedTabIndex === 2) {

  //     this.isLoading = true;
  //     this.courseService.getCourseById(courseId).subscribe(

  //       (course: Course) => {
  //         this.course = course;

  //         if (currentUser) {
  //           this.isCreator = currentUser._id === this.course.creator;
  //         }

  //         if (!this.isCreator) {
  //           this.userName = currentUser.lastName + ' ' + currentUser.firstName;
  //         }

  //         //this.loadStudents();
  //         this.isLoading = false;
  //       },
  //       (error: any) => {
  //         console.log(error);
  //         this.isLoading = false;
  //       });
  //   }
  // }

  loadCourseCreator(courseId: string) {

    this.courseService
      .getCreatorByCourseId(courseId)
      .subscribe(
        (result: any) => {
          this.creator = result.creator;
         // return this.creatorName = this.creator.lastName + ' ' + this.creator.firstName;
        },
        (error: any) => {

        }
      );
  }

  openNewChapterDialog() {
    this.dialog.open(
      NewChapterComponent,
      {
        data: {
          courseId: this.course._id,
        },
        width: '500px'
      }

    )
      .afterClosed()
      .subscribe(
        result => {
          this.loadCourse(this.course._id, 1);
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

  loadStudents() {

    this.isLoading = true;
    this.enrollmentService
      .getStudentsByCourseId(this.course._id)
      .subscribe(
        (result: any) => {
          this.students = result.students;
          this.isLoading = false;
        },
        (error: any) => {
          this.isLoading = false;
        }
      );

  }

  onOpenAddStudentDialog() {
    this.dialog.open(
      AddStudentDialogComponent,
      {
        data: {
          courseId: this.course._id,
        },
        width: '500px'
      }

    )
      .afterClosed()
      .subscribe(
        result => {
          this.loadStudents();
        }
      );
  }

  onAddPost() {

    const currentUser: UserData = this.authService.getUser();

    const post: any = {
      posts: [{ ...this.addPostForm.value, author: currentUser._id }]
    };
    console.log(post);
    if (this.addPostForm.invalid) {
      return;
    }

    this.courseService.addPost(post, this.course._id).subscribe(

      (response: any) => {
        this.snackBar.open('Le post a été créé avec succès!');
        this.loadCourse(this.course._id, 0);
        this.addPostForm.reset();
      },
      (error: any) => {
        this.snackBar.open('Oups! Une erreur s\'est produite. Veuillez vérifier votre saisie et réessayer plus tard.');
        console.log(error);
      }
    );

  }

  onAddComment(postId: string) {

    const currentUser: UserData = this.authService.getUser();

    const comment: Comment = { ...this.addCommentForm.value, author: currentUser._id };

    if (this.addCommentForm.invalid) {
      return;
    }

    this.courseService.addComment(comment, postId, this.course._id).subscribe(

      () => {

        this.snackBar.open('Un commentaire ajouté!');
        this.loadCourse(this.course._id, 0);
        this.addCommentForm.reset();

      },
      (error: any) => {

        this.snackBar.open('Oups! Une erreur s\'est produite. Veuillez vérifier votre saisie et réessayer plus tard.');
        console.log(error);

      }

    );
  }


  loadComments(postId: string) {

    this.courseService
      .getCommentByPostId(this.course._id, postId)
      .subscribe(
        (result: any) => {
            this.comments = result;
            console.log(this.comments);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
