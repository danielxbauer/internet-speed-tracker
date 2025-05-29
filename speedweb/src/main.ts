import { Chart } from "chart.js";
import { Duration } from "luxon";
import { buildChart } from "./chart";
import { aggregateData, fetchCsvData } from "./fetchCsvData";
import "./style.css";
import { renderTable } from "./table";

const data = await fetchCsvData("speed_log.csv");
const aggregatedData = aggregateData(
  data,
  Duration.fromDurationLike({ minutes: 15 })
);

const chartCanvas = document.getElementById("speedChart") as HTMLCanvasElement;
const context = chartCanvas.getContext("2d")!;
const chartConfig = buildChart(aggregatedData);
new Chart(context, chartConfig);

const tableElement = document.getElementById("speedTable") as HTMLTableElement;
renderTable(tableElement, aggregatedData);
