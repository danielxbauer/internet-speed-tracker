import { type ChartConfiguration } from "chart.js/auto";
import "chartjs-adapter-luxon";

async function fetchCsvData(csvPath: string) {
  const response = await fetch(csvPath);
  const data = await response.text();

  const rows = data.trim().split("\n");
  const labels: string[] = [];
  const values: number[] = [];

  for (const row of rows) {
    const [timestamp, speed] = row.split(",");
    labels.push(timestamp);
    values.push(parseFloat(speed));
  }

  return { labels, values };
}

export async function buildChart(csvPath: string) {
  const { labels, values } = await fetchCsvData(csvPath);

  const config: ChartConfiguration<"line", number[]> = {
    type: "line",
    data: {
      labels: labels,
      datasets: [{ label: "Download Speed (Mbps)", data: values }],
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
