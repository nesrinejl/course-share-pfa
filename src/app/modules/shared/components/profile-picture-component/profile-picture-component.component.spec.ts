import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePictureComponentComponent } from './profile-picture-component.component';

describe('ProfilePictureComponentComponent', () => {
  let component: ProfilePictureComponentComponent;
  let fixture: ComponentFixture<ProfilePictureComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePictureComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePictureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
