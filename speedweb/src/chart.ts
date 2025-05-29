import { type ChartConfiguration } from "chart.js/auto";
import "chartjs-adapter-luxon";

export function buildChart(data: { labels: string[]; values: number[] }) {
  const config: ChartConfiguration<"line", number[]> = {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [{ label: "Download Speed (Mbps)", data: data.values }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "hour",
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 5, // helpful for small screens
          },
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          title: {
            display: true,
            text: "Speed (Mbps)",
          },
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Internet Speed Over Time",
        },
        tooltip: {
          mode: "nearest",
          intersect: false,
        },
      },
    },
  };

  return config;
}
