import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { UserData } from '../../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: UserData;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUser()
    console.log(this.user);
  }
  onLogout(){
    this.authService.logout();
  }
}
