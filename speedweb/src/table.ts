import { DateTime } from "luxon";

export function renderTable(
  tableElement: HTMLTableElement,
  data: { labels: string[]; values: number[] }
) {
  tableElement.innerHTML = ""; // Clear existing table content

  // Create a simple table with the data
  const tableHeader = tableElement.createTHead();
  const headerRow = tableHeader.insertRow();

  const headerCell1 = headerRow.insertCell();
  headerCell1.textContent = "Timestamp";
  headerCell1.classList.add("text-left", "font-medium");

  const headerCell2 = headerRow.insertCell();
  headerCell2.textContent = "Speed (Mbps)";
  headerCell2.classList.add("text-right", "font-medium");

  const tableBody = tableElement.createTBody();
  // Populate the table with data
  for (let i = data.labels.length - 1; i != 0; i--) {
    const timestamp = DateTime.fromISO(data.labels[i]);
    const speed = data.values[i];

    const row = tableBody.insertRow();
    const cell1 = row.insertCell();
    cell1.textContent = timestamp.toFormat("dd.MM.yyyy HH:mm");
    cell1.classList.add("text-left", "p-1");

    const cell2 = row.insertCell();
    cell2.textContent = speed.toFixed(2);
    cell2.classList.add("text-right", "p-1");

    if (speed < 10) {
      cell1.classList.add("text-red-500");
      cell2.classList.add("text-red-500");
    }
  }
}
