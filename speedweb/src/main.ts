import { Chart } from "chart.js";
import { buildChart } from "./chart";
import { aggregateDataQuarterHour, fetchCsvData } from "./fetchCsvData";
import "./style.css";
import { renderTable } from "./table";

const data = await fetchCsvData("speed_log.csv");
const quarterHourData = aggregateDataQuarterHour(data);

const chartCanvas = document.getElementById("speedChart") as HTMLCanvasElement;
const context = chartCanvas.getContext("2d")!;
const chartConfig = buildChart(quarterHourData);
new Chart(context, chartConfig);

const tableElement = document.getElementById("speedTable") as HTMLTableElement;
renderTable(tableElement, quarterHourData);
