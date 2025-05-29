import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  template: `
    <div class="flex flex-col border border-neutral-200 rounded-lg p-4 ">
      <div class="text-xs">{{ header() }}</div>
      @if(subHeader()) {
      <div class="text-xs text-gray-500">{{ subHeader() }}</div>
      }

      <div class="text-center">
        <div class="font-medium text-3xl">{{ value() }}</div>
        <div class="text-xs">{{ info() }}</div>
      </div>
    </div>
  `,
})
export class KpiCard {
  public header = input.required<string>();
  public subHeader = input<string>();
  public value = input.required<string>();
  public info = input.required<string>();
}
