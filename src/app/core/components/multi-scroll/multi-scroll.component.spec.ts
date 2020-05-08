import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiScrollComponent } from './multi-scroll.component';

describe('MultiScrollComponent', () => {
  let component: MultiScrollComponent;
  let fixture: ComponentFixture<MultiScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
