import { buildChart } from "./chart";
import "./style.css";

buildChart({
  canvasId: "speedChart",
  csvPath: "../speed_log.csv",
});
