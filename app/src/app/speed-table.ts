import { Component, computed, input } from '@angular/core';
import { AggregatedSpeedTracks } from './shared/aggregated-speed-tracks.model';

@Component({
  selector: 'app-speed-table',
  template: `
    <div class="border overflow-hidden border-neutral-200 rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2 text-sm font-medium text-gray-700 text-left">
              Timestamp
            </th>
            <th class="px-4 py-2 text-sm font-medium text-gray-700 text-right">
              Avg Speed
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          @for( track of sortedSpeedTracks(); track $index) {
          <tr
            [class.text-red-500]="track.averageSpeed < 10"
            [class.bg-red-50]="track.averageSpeed < 10"
          >
            <td class="px-4 py-2 text-left">
              <div class="text-lg">
                {{ track.end.toFormat('dd.MM. HH:mm') }}
              </div>
              <div class="text-xs text-gray-500">
                {{ track.start.toFormat('HH:mm') }} -
                {{ track.end.toFormat('HH:mm') }}
              </div>
            </td>
            <td class="px-4 py-2 text-right">
              <div class="text-lg">
                {{ track.averageSpeed.toFixed(2) }}
                <span class="text-sm">Mbps</span>
              </div>
              <div class="text-xs text-gray-500">
                {{ track.minSpeed.toFixed(2) }} -
                {{ track.maxSpeed.toFixed(2) }}
              </div>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class SpeedTable {
  public speedTracks = input.required<AggregatedSpeedTracks[]>();

  protected sortedSpeedTracks = computed(() => {
    return this.speedTracks()
      .slice()
      .sort((a, b) => {
        return b.end.toMillis() - a.end.toMillis();
      });
  });
}
