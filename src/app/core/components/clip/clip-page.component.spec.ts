import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipPageComponent } from './clip-page.component';

describe('ClipPageComponent', () => {
  let component: ClipPageComponent;
  let fixture: ComponentFixture<ClipPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClipPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
