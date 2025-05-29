import { Component, computed, inject, resource } from '@angular/core';
import { Duration } from 'luxon';
import { aggregateData } from './shared/aggregate.util';
import { SpeedApiService } from './shared/speed-api.service';
import { SpeedTrackDto } from './shared/speed-track.dto';
import { SpeedChart } from './speed-chart';
import { SpeedTable } from './speed-table';

@Component({
  selector: 'app-root',
  imports: [SpeedChart, SpeedTable],
  templateUrl: './app.html',
})
export class App {
  private readonly speedApiService = inject(SpeedApiService);

  private speedTracksResource = resource({
    loader: () => this.speedApiService.getTrackedSpeed(),
    defaultValue: [],
  });

  protected speedTracks = this.speedTracksResource.value.asReadonly();

  protected aggregatedSpeedTracks = computed<SpeedTrackDto[]>(() => {
    return aggregateData(
      this.speedTracks(),
      Duration.fromDurationLike({ minutes: 15 })
    ).map((item) => ({ timestamp: item.end, speed: item.averageSpeed }));
  });
}
