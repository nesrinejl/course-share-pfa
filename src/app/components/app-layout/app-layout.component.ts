import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';


import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit, OnDestroy {

  displayLoader = false;
  loaderSubscription: Subscription;

  constructor(
    private loaderService: LoaderService,

  ) { }

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService.displayLoader().subscribe(
      (displayLoader) => this.displayLoader = displayLoader
    );
  }

  ngOnDestroy() {

    if (this.loaderSubscription) {
        this.loaderSubscription.unsubscribe();
    }

}


}
