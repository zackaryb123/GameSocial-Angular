import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
// import { MediaParserService } from '../../../../core/services';
import {ButtonGroupButton} from '../../../../shared/components/button-group/button-group.component';

export interface ITrackInfoSelectEvent {
  time: string;
  media: any;
}

@Component({
  selector: 'track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackInfoComponent {
  @Input()
  set media(m: any) {
    if (m) {
      this.extractTracks(m);
      this.description = m.snippet.description;
      this.video = m;
    }
  }
  @Output() selectTrack = new EventEmitter<ITrackInfoSelectEvent>();
  @Output() dismiss = new EventEmitter();

  video: any;
  description = '';
  tracks = [];
  infoButtons = [
    { label: 'About', value: 'about' },
    { label: 'Tracks', value: 'tracks' }
  ];
  selected = this.infoButtons[0];

  constructor(private mediaParser: any) {}

  hasTracks() {
    return this.tracks.length > 0;
  }

  extractTracks(media: any) {
    const tracks = this.mediaParser.extractTracks(media.snippet.description);
    if (Array.isArray(tracks)) {
      this.tracks = tracks;
    }
  }

  handleSelectTrack(
    $event: Event,
    track: string,
    media: any
  ) {
    $event.stopImmediatePropagation();
    const time = this.mediaParser.extractTime(track);
    if (time) {
      this.selectTrack.emit({ time: time[0], media });
    }
  }

  toggleInfo() {
    this.dismiss.emit();
  }

  onInfoClick(event: ButtonGroupButton) {
    this.selected = event;
  }
}
