import {SearchPipe} from './search.pipe';
import {IsInQueuePipe} from './isInQueue.pipe';
import {VideoToThumbPipe} from './videoToThumb.pipe';
import {ToFriendlyDurationPipe} from './toFriendlyDuration.pipe';

export const SHARED_PIPES = [
  SearchPipe,
  IsInQueuePipe,
  VideoToThumbPipe,
  ToFriendlyDurationPipe
];
