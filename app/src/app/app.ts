import { Component, computed, inject, resource, signal } from '@angular/core';
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

  private interval = signal(Duration.fromDurationLike({ minutes: 30 }));

  protected aggregatedSpeedTracks = computed<AggregatedSpeedTracks[]>(() => {
    return aggregateData(this.speedTracks(), this.interval());
  });

  protected lastTrack = computed(() => {
    const tracks = this.speedTracks();
    if (tracks.length === 0) {
      return null;
    }
    return tracks[tracks.length - 1];
  });

  private tracksInLast3Hours = computed(() => {
    const threeHoursAgo = DateTime.now().minus({ hours: 3 });
    return this.speedTracks().filter(
      (track) => track.timestamp >= threeHoursAgo
    );
  });

  protected bestInLast3Hours = computed(() => {
    const recentTracks = this.tracksInLast3Hours();
    if (recentTracks.length === 0) {
      return null;
    }

    return recentTracks.reduce((a, b) => (b.speed > a.speed ? b : a));
  });

  protected wrostInLast3Hours = computed(() => {
    const recentTracks = this.tracksInLast3Hours();
    if (recentTracks.length === 0) {
      return null;
    }

    return recentTracks.reduce((a, b) => (b.speed < a.speed ? b : a));
  });
}
