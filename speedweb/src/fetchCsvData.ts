export async function fetchCsvData(csvPath: string) {
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

export function aggregateDataQuarterHour(data: {
  labels: string[];
  values: number[];
}) {
  const quarterHourData: { labels: string[]; values: number[] } = {
    labels: [],
    values: [],
  };
  const quarterHourInMs = 10 * 60 * 1000; // 15 minutes in milliseconds
  let currentSum = 0;
  let currentCount = 0;
  let currentStartTime = new Date(data.labels[0]).getTime();

  for (let i = 0; i < data.labels.length; i++) {
    const timestamp = new Date(data.labels[i]).getTime();
    if (timestamp - currentStartTime < quarterHourInMs) {
      currentSum += data.values[i];
      currentCount++;
    } else {
      if (currentCount > 0) {
        quarterHourData.labels.push(new Date(currentStartTime).toISOString());
        quarterHourData.values.push(currentSum / currentCount);
      }
      currentStartTime = timestamp;
      currentSum = data.values[i];
      currentCount = 1;
    }
  }

  // Handle the last segment
  if (currentCount > 0) {
    quarterHourData.labels.push(new Date(currentStartTime).toISOString());
    quarterHourData.values.push(currentSum / currentCount);
  }

  return quarterHourData;
}
