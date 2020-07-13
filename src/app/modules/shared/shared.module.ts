import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ProfilePictureComponentComponent } from './components/profile-picture-component/profile-picture-component.component';

@NgModule({
  declarations: [
      SnackBarComponent,
      ProfilePictureComponentComponent
  ],
  entryComponents: [
      SnackBarComponent
  ],
  imports: [
      CommonModule,
  ],
  exports: [

  ],
  providers: [

  ]
})
export class SharedModule {

}
