import { Duration } from 'luxon';
import { SpeedTrackDto } from './speed-track.dto';

function getAverageSpeed(tracks: SpeedTrackDto[]): number {
    return tracks.reduce((sum, track) => sum + track.speed, 0) / tracks.length;
}

export function aggregateData(data: SpeedTrackDto[], interval: Duration) {
    if (data.length === 0) {
        return [];
    }

    const aggregatedData: SpeedTrackDto[] = [];
    const intervalMs = interval.toMillis();

    let currentTracks: SpeedTrackDto[] = [];
    let currentStartTime = data[0].timestamp;

    for (let i = 0; i < data.length; i++) {
        const timestamp = data[i].timestamp;
        const diffMs = timestamp.diff(currentStartTime, [
            'milliseconds',
        ]).milliseconds;
        if (diffMs < intervalMs) {
            currentTracks.push(data[i]);
        } else {
            if (currentTracks.length > 0) {
                aggregatedData.push({
                    timestamp: currentStartTime,
                    speed: getAverageSpeed(currentTracks),
                });
            }

            currentTracks = [data[i]];
            currentStartTime = timestamp;
        }
    }

    // Handle the last segment
    if (currentTracks.length > 0) {
        if (currentTracks.length > 0) {
            aggregatedData.push({
                timestamp: currentStartTime,
                speed: getAverageSpeed(currentTracks),
            });
        }
    }

    return aggregatedData;
}
