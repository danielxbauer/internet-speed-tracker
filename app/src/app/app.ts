import { Component, inject, resource } from '@angular/core';
import { SpeedApiService } from './shared/speed-api.service';
import { SpeedTable } from './speed-table';

@Component({
  selector: 'app-root',
  imports: [SpeedTable],
  templateUrl: './app.html',
})
export class App {
  private readonly speedApiService = inject(SpeedApiService);

  protected speedTracksResource = resource({
    loader: () => this.speedApiService.getTrackedSpeed(),
    defaultValue: [],
  });
}
