import Chart from "chart.js/auto";
import "chartjs-adapter-luxon";

export async function buildChart(options: {
  canvasId: string;
  csvPath: string;
}): Promise<void> {
  const response = await fetch(options.csvPath);
  const data = await response.text();

  const rows = data.trim().split("\n");
  const labels: string[] = [];
  const values: number[] = [];

  for (const row of rows) {
    const [timestamp, speed] = row.split(",");
    // labels.push(new Date(timestamp));
    labels.push(timestamp);
    values.push(parseFloat(speed));
  }

  const ctx = (
    document.getElementById(options.canvasId) as HTMLCanvasElement
  ).getContext("2d");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{ label: "Download Speed (Mbps)", data: values }],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
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
    },
  });
}
