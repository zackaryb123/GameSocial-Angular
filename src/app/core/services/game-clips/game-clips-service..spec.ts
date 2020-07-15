import { TestBed } from '@angular/core/testing';
import {GameClipsService} from './game-clips.service';

describe('GameClipsServiceService', () => {
  let service: GameClipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameClipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
