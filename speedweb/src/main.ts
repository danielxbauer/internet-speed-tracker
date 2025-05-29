import { Chart } from "chart.js";
import { buildChart } from "./chart";
import "./style.css";

const chartCanvas = document.getElementById("speedChart") as HTMLCanvasElement;
const context = chartCanvas.getContext("2d")!;
const chartConfig = await buildChart("speed_log.csv");
new Chart(context, chartConfig);
