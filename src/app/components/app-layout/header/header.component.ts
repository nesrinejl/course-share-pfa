import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UserData } from '../../../models/user.model';

import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

import { ConfirmationDialogComponent } from '../../auth/confirmation-dialog/confirmation-dialog.component';


import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserData;
  userRole: string;
  fullName: string;

  displayLoader = false;

  loaderSubscription: Subscription;
  constructor(
    private loaderService: LoaderService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.user = this.authService.getUser();
    this.fullName = this.user.lastName + ' ' + this.user.firstName;
    this.userRole = this.authService.getUserRole();
    this.loaderSubscription = this.loaderService.displayLoader().subscribe(
      (displayLoader) => this.displayLoader = displayLoader
    );

  }

  onLogout() {
    const DIALOG_REF = this.dialog.open(
      ConfirmationDialogComponent,
        {
          width: '500px'
        }
    );

    DIALOG_REF.afterClosed().subscribe(result => {
        if (result === true) {
          this.authService.logout();
          this.router.navigate(['auth/login']);
        }
    });

  }



  navigateToCourses() {
    if (this.user.role === 'Teacher') {
      this.router.navigateByUrl('/teacher/courses');
    } else {
      this.router.navigateByUrl('/student/courses');
    }
}

}
