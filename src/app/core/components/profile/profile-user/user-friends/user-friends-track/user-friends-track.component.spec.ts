import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFriendsTrackComponent } from './user-friends-track.component';

describe('UserFriendsTrackComponent', () => {
  let component: UserFriendsTrackComponent;
  let fixture: ComponentFixture<UserFriendsTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFriendsTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFriendsTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
