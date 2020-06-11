import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { UserData } from '../../../models/user.model';
import { NewCourseComponent } from 'src/app/modules/courses/new-course/new-course.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserData;
  userRole: string;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.user = this.authService.getUser();
    this.userRole = this.authService.getUserRole();

  }

  onLogout(){
    this.authService.logout();
  }

  openNewCourseDialog() {
    this.dialog.open(
      NewCourseComponent,
        {
          width: '500px'
        }
    );
  }


}
