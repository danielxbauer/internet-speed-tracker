import { Component, computed, inject, resource, signal } from '@angular/core';
import { Duration } from 'luxon';
import { aggregateData } from './shared/aggregate.util';
import { AggregatedSpeedTracks } from './shared/aggregated-speed-tracks.model';
import { SpeedApiService } from './shared/speed-api.service';
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

  private interval = signal(Duration.fromDurationLike({ minutes: 15 }));

  protected aggregatedSpeedTracks = computed<AggregatedSpeedTracks[]>(() => {
    return aggregateData(this.speedTracks(), this.interval());
  });
}
