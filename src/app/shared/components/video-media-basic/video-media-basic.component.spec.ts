import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoMediaBasicComponent } from './video-media-basic.component';

describe('VideoMediaBasicComponent', () => {
  let component: VideoMediaBasicComponent;
  let fixture: ComponentFixture<VideoMediaBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoMediaBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoMediaBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
