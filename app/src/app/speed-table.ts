import { Component, input } from '@angular/core';
import { AggregatedSpeedTracks } from './shared/aggregated-speed-tracks.model';

@Component({
  selector: 'app-speed-table',
  template: `
    <table>
      <thead>
        <tr>
          <th class="p-1 font-medium text-left">Timestamp</th>
          <th class="p-1 font-medium text-right">Avg Speed (Mbps)</th>
        </tr>
      </thead>

      <tbody>
        @for( track of speedTracks(); track $index) {
        <tr [class.text-red-500]="track.averageSpeed < 10">
          <td class="p-1 text-left">
            <div class="text-lg">
              {{ track.end.toFormat('dd.MM. HH:mm') }}
            </div>
            <div class="text-xs text-gray-500">
              {{ track.start.toFormat('HH:mm') }} -
              {{ track.end.toFormat('HH:mm') }}
            </div>
          </td>
          <td class="p-1 text-right">
            <div class="text-lg">{{ track.averageSpeed.toFixed(2) }}</div>
            <div class="text-xs text-gray-500">
              {{ track.minSpeed.toFixed(2) }} - {{ track.maxSpeed.toFixed(2) }}
            </div>
          </td>
        </tr>
        }
      </tbody>
    </table>
  `,
})
export class SpeedTable {
  public speedTracks = input.required<AggregatedSpeedTracks[]>();
}
