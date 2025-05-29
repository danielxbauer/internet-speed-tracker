import { DateTime, Duration } from 'luxon';
import { SpeedTrackDto } from './speed-track.dto';

function roundDownTo15Minutes(dt: DateTime) {
  const minutes = Math.floor(dt.minute / 15) * 15;
  return dt.set({ minute: minutes, second: 0, millisecond: 0 });
}

function getAverageSpeed(tracks: SpeedTrackDto[]): number {
  return tracks.reduce((sum, track) => sum + track.speed, 0) / tracks.length;
}

export interface AggregatedSpeedTracks {
  start: DateTime;
  end: DateTime;
  averageSpeed: number;
  tracks: SpeedTrackDto[];
}

export function aggregateData(
  data: SpeedTrackDto[],
  interval: Duration
): AggregatedSpeedTracks[] {
  if (data.length === 0) {
    return [];
  }

  const aggregated: AggregatedSpeedTracks[] = [];

  let tracks: SpeedTrackDto[] = [];
  let start = roundDownTo15Minutes(data[0].timestamp);
  let end = start.plus(interval);

  for (const track of data) {
    const timestamp = track.timestamp;
    if (timestamp < end) {
      tracks.push(track);
    } else {
      if (tracks.length > 0) {
        aggregated.push({
          start: start,
          end: end,
          averageSpeed: getAverageSpeed(tracks),
          tracks: tracks,
        });
      }

      tracks = [track];
      start = roundDownTo15Minutes(timestamp);
      end = start.plus(interval);
    }
  }

  // Handle the last segment
  if (tracks.length > 0) {
    aggregated.push({
      start: start,
      end: end,
      averageSpeed: getAverageSpeed(tracks),
      tracks: tracks,
    });
  }

  return aggregated;
}
