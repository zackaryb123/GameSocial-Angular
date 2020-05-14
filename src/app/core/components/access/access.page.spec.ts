import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessPage } from './access.page';

describe('AcessoComponent', () => {
  let component: AccessPage;
  let fixture: ComponentFixture<AccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
