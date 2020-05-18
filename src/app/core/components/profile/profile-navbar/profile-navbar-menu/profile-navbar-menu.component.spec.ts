import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {ProfileNavbarMenuComponent} from './profile-navbar-menu.component';

describe('ProfileNavbarMenuComponent', () => {
  let component: ProfileNavbarMenuComponent;
  let fixture: ComponentFixture<ProfileNavbarMenuComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProfileNavbarMenuComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [NoopAnimationsModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNavbarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a navbar-menu component', () => {
    expect(component).toBeTruthy();
  });

  it('should hide menu by default', () => {
    expect(component.hide).toBeTruthy();
  });

  it('should not be signed-in by default', () => {
    expect(component.signedIn).toBeFalsy();
  });

  it('should hide the menu', () => {
    component.hideMenu();
    const actual = component.hide;
    const expected = true;
    expect(actual).toBe(expected);
  });

  it('should toggle the menu visibility', () => {
    const initialState = component.hide;
    component.toggleMenu();
    const actual = component.hide;
    const expected = !initialState;
    expect(actual).toBe(expected);
  });

  it('should hide the menu on ESC key pressed', () => {
    const mockedKeyboardEvent = {
      keyCode: 27 // ESC key code
    };
    component.handleKeyPress(mockedKeyboardEvent as KeyboardEvent);
    const actual = component.hide;
    const expected = true;
    expect(actual).toBe(expected);
  });

  it('should emit a sign out event when user signs out', () => {
    spyOn(component.signOut, 'emit');
    component.handleSignOut();
    expect(component.signOut.emit).toHaveBeenCalledTimes(1);
  });
});
