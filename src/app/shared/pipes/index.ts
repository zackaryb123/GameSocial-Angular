import {SearchPipe} from './search.pipe';
import {IsInQueuePipe} from './isInQueue.pipe';
import {VideoToThumbPipe} from './videoToThumb.pipe';
import {ToFriendlyDurationPipe} from './toFriendlyDuration.pipe';
import {DateAgoPipe} from './DateAgoPipe';

export const SHARED_PIPES = [
  SearchPipe,
  IsInQueuePipe,
  VideoToThumbPipe,
  ToFriendlyDurationPipe,
  DateAgoPipe
];
