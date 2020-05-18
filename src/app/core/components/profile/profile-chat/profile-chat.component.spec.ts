import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChatComponent } from './profile-chat.component';

describe('ProfileChatComponent', () => {
  let component: ProfileChatComponent;
  let fixture: ComponentFixture<ProfileChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
