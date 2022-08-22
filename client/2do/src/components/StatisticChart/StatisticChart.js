import React from "react";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement);

const StatisticChart = ({ report }) => {
  const createdIdx = report.findIndex((object) => object.label === "created");
  const completedIdx = report.findIndex((object) => object.label === "completed");
  const pendingIdx = report.findIndex((object) => object.label === "pending");

  const created = report[createdIdx].count;
  const completed = report[completedIdx].count;
  const pending = report[pendingIdx].count;

  const chartColorFill = "#ed467e";
  const chartColorUnfilled = "#cccccc";
  const progressPercentage = Math.round((completed / created) * 100);

  let data = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: [chartColorFill, chartColorUnfilled],
        hoverBackgroundColor: [chartColorFill, chartColorUnfilled],
      },
    ],
  };
  let options = {
    cutout: "95%",
    maintainAspectRatio: false,
    elements: {
      arc: {
        roundedCornersFor: 0,
        borderWidth: 0,
      },
      center: {
        text: `${progressPercentage}%`,
        fontColor: chartColorFill,
        fontFamily: "'Poppins', 'Arial', sans-serif",
        fontStyle: "normal",
        fontSize: 30,
      },
    },
  };
  let plugins = {
    afterDraw: (chart) => {
      let centerConfig = chart.config.options.elements.center;
      let ctx = chart.ctx;
      ctx.save();
      ctx.font = "normal 25px 'Poppins', 'Arial', sans-serif";
      ctx.fillStyle = chartColorFill;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.fillText(centerConfig.text, centerX, centerY);
      ctx.restore();
    },
  };
  return (
    <>
      <Doughnut data={data} options={options} plugins={[plugins]} height={null} width={null} />
    </>
  );
};

export default StatisticChart;
