import { DateTime, Duration } from 'luxon';
import { AggregatedSpeedTracks } from './aggregated-speed-tracks.model';
import { SpeedTrackDto } from './speed-track.dto';

function roundDownToInterval(dt: DateTime, duration: Duration): DateTime {
  const millis = duration.as('milliseconds');
  const timestamp = dt.toMillis();
  const rounded = Math.floor(timestamp / millis) * millis;
  return DateTime.fromMillis(rounded, { zone: dt.zone });
}

function getAverageSpeed(tracks: SpeedTrackDto[]): number {
  return tracks.reduce((sum, track) => sum + track.speed, 0) / tracks.length;
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
  let start = roundDownToInterval(data[0].timestamp, interval);
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
          minSpeed: Math.min(...tracks.map((t) => t.speed)),
          maxSpeed: Math.max(...tracks.map((t) => t.speed)),
          tracks: tracks,
        });
      }

      tracks = [track];
      start = roundDownToInterval(timestamp, interval);
      end = start.plus(interval);
    }
  }

  // Handle the last segment
  if (tracks.length > 0) {
    aggregated.push({
      start: start,
      end: end,
      averageSpeed: getAverageSpeed(tracks),
      minSpeed: Math.min(...tracks.map((t) => t.speed)),
      maxSpeed: Math.max(...tracks.map((t) => t.speed)),
      tracks: tracks,
    });
  }

  return aggregated;
}
