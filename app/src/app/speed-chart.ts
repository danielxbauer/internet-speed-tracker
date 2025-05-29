import {
  Component,
  effect,
  ElementRef,
  input,
  untracked,
  viewChild,
} from '@angular/core';
import Chart, { type ChartConfiguration } from 'chart.js/auto';
import 'chartjs-adapter-luxon';
import { AggregatedSpeedTracks } from './shared/aggregated-speed-tracks.model';

@Component({
  selector: 'app-speed-chart',
  template: `
    <div class="relative h-[50vh] w-full">
      <canvas #chart></canvas>
    </div>
  `,
})
export class SpeedChart {
  public speedTracks = input.required<AggregatedSpeedTracks[]>();

  protected canvas = viewChild.required('chart', { read: ElementRef });
  private chart: Chart | null = null;

  private init = effect(() => {
    const speedTracks = this.speedTracks();
    const canvasElement = this.canvas().nativeElement;

    untracked(() => {
      this.chart?.destroy();

      const labels = speedTracks.map((s) => s.end.toISO()!);
      const values = speedTracks.map((s) => s.averageSpeed);

      const context = canvasElement.getContext('2d');
      const chartConfig = getChartConfig(labels, values);
      this.chart = new Chart(context, chartConfig);
    });
  });
}

function getChartConfig(
  labels: string[],
  values: number[]
): ChartConfiguration<'line', number[]> {
  const config: ChartConfiguration<'line', number[]> = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{ label: 'Download Speed (Mbps)', data: values }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'hour',
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5, // helpful for small screens
          },
          title: {
            display: true,
            text: 'Time',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Speed (Mbps)',
          },
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Internet Speed Over Time',
        },
        tooltip: {
          mode: 'nearest',
          intersect: false,
        },
      },
    },
  };

  return config;
}
