import { Component, computed, inject, resource } from '@angular/core';
import { DateTime, Duration } from 'luxon';
import { KpiCard } from './kpi-card';
import { aggregateData } from './shared/aggregate.util';
import { AggregatedSpeedTracks } from './shared/aggregated-speed-tracks.model';
import { SpeedApiService } from './shared/speed-api.service';
import { SpeedChart } from './speed-chart';
import { SpeedTable } from './speed-table';

@Component({
  selector: 'app-root',
  imports: [SpeedChart, SpeedTable, KpiCard],
  templateUrl: './app.html',
})
export class App {
  private readonly speedApiService = inject(SpeedApiService);

  private speedTracksResource = resource({
    loader: () => this.speedApiService.getTrackedSpeed(),
    defaultValue: [],
  });

  protected speedTracks = this.speedTracksResource.value.asReadonly();

  protected aggregated15min = computed<AggregatedSpeedTracks[]>(() => {
    return aggregateData(
      this.speedTracks(),
      Duration.fromDurationLike({ minutes: 15 })
    );
  });

  protected aggregated1h = computed<AggregatedSpeedTracks[]>(() => {
    return aggregateData(
      this.speedTracks(),
      Duration.fromDurationLike({ hours: 1 })
    );
  });

  protected lastTrack = computed(() => {
    const tracks = this.speedTracks();
    if (tracks.length === 0) {
      return null;
    }
    return tracks[tracks.length - 1];
  });

  private tracksToday = computed(() => {
    const threeHoursAgo = DateTime.now().startOf('day');
    return this.speedTracks().filter(
      (track) => track.timestamp >= threeHoursAgo
    );
  });

  protected bestToday = computed(() => {
    const tracks = this.tracksToday();
    return tracks.length !== 0
      ? tracks.reduce((a, b) => (b.speed > a.speed ? b : a))
      : null;
  });

  protected worstToday = computed(() => {
    const tracks = this.tracksToday();
    return tracks.length !== 0
      ? tracks.reduce((a, b) => (b.speed < a.speed ? b : a))
      : null;
  });
}
