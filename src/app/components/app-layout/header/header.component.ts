import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { UserData } from '../../../models/user.model';

import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {

    this.user = this.authService.getUser();
    this.userRole = this.authService.getUserRole();

  }

  onLogout(){
    this.authService.logout();
  }



  navigateToCourses() {
    if (this.user.role === 'Teacher') {
      this.router.navigateByUrl('/teacher/courses');
    }
    else {
      this.router.navigateByUrl('/student/courses');
    }
}

}
