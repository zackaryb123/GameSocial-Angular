import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PIPES } from '@shared/pipes';
import { PlaylistTrackComponent } from './now-playlist-track.component';
import {
  VideoMock,
  VideoMockWithSpecialChars
} from '@mocks/playlist-track.mocks';
import { MediaParserService } from '@core/services';

describe('PlaylistTrackComponent', () => {
  let component: PlaylistTrackComponent;
  let fixture: ComponentFixture<PlaylistTrackComponent>;

  function createComponent(video = VideoMock) {
    fixture = TestBed.createComponent(PlaylistTrackComponent);
    component = fixture.componentInstance;
    component.video = <any>video;
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    const mediaParserSpy = jasmine.createSpyObj('mediaParserSpy', [
      'extractTracks',
      'verifyTracksCue',
      'extractTime',
      'parseTracks'
    ]);
    TestBed.configureTestingModule({
      declarations: [PlaylistTrackComponent, ...PIPES],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: MediaParserService, useValue: mediaParserSpy }]
    }).compileComponents();
  }));

  it('should create a component', () => {
    createComponent();
    expect(component).toBeDefined();
  });

  it('should select the track when title is clicked', () => {
    createComponent();
    const trigger = fixture.debugElement.query(By.css('.video-title'));
    spyOn(component.select, 'emit');
    const actual = component.select.emit;
    trigger.triggerEventHandler('click', {});
    expect(actual).toHaveBeenCalled();
  });
});
