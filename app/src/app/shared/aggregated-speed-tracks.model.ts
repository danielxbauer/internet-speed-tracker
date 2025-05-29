import { DateTime } from 'luxon';
import { SpeedTrackDto } from './speed-track.dto';

export interface AggregatedSpeedTracks {
  start: DateTime;
  end: DateTime;
  averageSpeed: number;
  minSpeed: number;
  maxSpeed: number;
  tracks: SpeedTrackDto[];
}
