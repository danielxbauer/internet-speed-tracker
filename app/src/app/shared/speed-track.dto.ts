import { DateTime } from 'luxon';

export interface SpeedTrackDto {
  timestamp: DateTime;
  speed: number;
}
