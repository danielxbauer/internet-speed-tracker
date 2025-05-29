import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { SpeedTrackDto } from './speed-track.dto';

@Injectable({ providedIn: 'root' })
export class SpeedApiService {
  public async getTrackedSpeed(): Promise<SpeedTrackDto[]> {
    const response = await fetch('speed_log.csv');
    const data = await response.text();
    const rows = data.trim().split('\n');

    return rows.map((row) => {
      const [timestamp, speed] = row.split(',');
      const track: SpeedTrackDto = {
        timestamp: DateTime.fromISO(timestamp),
        speed: parseFloat(speed),
      };
      return track;
    });
  }
}
