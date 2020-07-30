import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent {

  initials = '';

  constructor(
  ) { }

  @Input()
  set fullName(fullName: string) {
    this.initials = fullName[0] + fullName[fullName.lastIndexOf(' ') + 1];
  }
  get fullName(): string { return this.initials; }

}
