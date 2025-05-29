import { Component, input } from '@angular/core';
import { SpeedTrackDto } from './shared/speed-track.dto';

@Component({
  selector: 'app-speed-table',
  template: `
    <table>
      <thead>
        <tr>
          <th class="p-1 font-medium">Timestamp</th>
          <th class="p-1 font-medium text-right">Speed (Mbps)</th>
        </tr>
      </thead>

      <tbody>
        @for( track of speedTracks(); track $index) {
        <tr [class.text-red-500]="track.speed < 10">
          <td class="p-1 text-left">
            {{ track.timestamp.toFormat('dd.MM.yyyy HH:mm') }}
          </td>
          <td class="p-1 text-right">
            {{ track.speed.toFixed(2) }}
          </td>
        </tr>
        }
      </tbody>
    </table>
  `,
})
export class SpeedTable {
  public speedTracks = input.required<SpeedTrackDto[]>();
}
