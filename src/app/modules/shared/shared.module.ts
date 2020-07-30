import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';

@NgModule({
  declarations: [
      SnackBarComponent,
      ProfilePictureComponent
  ],
  entryComponents: [
      SnackBarComponent
  ],
  imports: [
      CommonModule,
  ],
  exports: [
      ProfilePictureComponent
  ],
  providers: [

  ]
})
export class SharedModule {

}
