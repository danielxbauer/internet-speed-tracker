// @ts-check

/**
 *
 * @param {string} csvFilePath
 */
async function fetchCSV(csvFilePath) {
  const response = await fetch(csvFilePath);
  const data = await response.text();

  const rows = data.trim().split("\n");
  const labels = [];
  const values = [];

  rows.forEach((row) => {
    const [timestamp, speed] = row.split(",");
    labels.push(new Date(timestamp));
    values.push(parseFloat(speed));
  });

  const ctx = document.getElementById("speedChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Download Speed (Mbps)",
          data: values,
          borderColor: "blue",
          borderWidth: 2,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            tooltipFormat: "YYYY-MM-DD HH:mm",
            unit: "hour",
          },
          title: { display: true, text: "Time" },
        },
        y: {
          title: { display: true, text: "Mbps" },
        },
      },
    },
  });
}

fetchCSV("speed_log.csv");
