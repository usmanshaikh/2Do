import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import * as chartJSHelpers from "chart.js/helpers";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

const StatisticChart = () => {
  const d1 = 80;
  const d2 = 100 - d1;
  let data = {
    labels: ["Red", "Gray"],
    datasets: [
      {
        data: [d1, d2],
        backgroundColor: ["#FF6684", "#ccc"],
        hoverBackgroundColor: ["#FF6384", "#ccc"],
      },
    ],
  };
  let options = {
    cutout: "90%",
    maintainAspectRatio: false,
    elements: {
      arc: {
        roundedCornersFor: 0,
      },
      center: {
        maxText: "100%",
        text: "67%",
        fontColor: "#FF6684",
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        fontStyle: "normal",
        fontSize: 30,
        minFontSize: 1,
        maxFontSize: 256,
      },
    },
  };
  let plugins = {
    afterUpdate: (chart) => {
      if (chart.config.options.elements.center) {
        var helpers = chartJSHelpers;
        var centerConfig = chart.config.options.elements.center;
        var globalConfig = ChartJS.defaults;
        var ctx = chart.ctx;
        var fontStyle = helpers.valueOrDefault(centerConfig.fontStyle, globalConfig.font.style);
        var fontFamily = helpers.valueOrDefault(centerConfig.fontFamily, globalConfig.font.family);
        if (centerConfig.fontSize) var fontSize = centerConfig.fontSize;
        // figure out the best font size, if one is not specified
        else {
          ctx.save();
          var fontSize = helpers.valueOrDefault(centerConfig.minFontSize, 1);
          var maxFontSize = helpers.valueOrDefault(centerConfig.maxFontSize, 256);
          var maxText = helpers.valueOrDefault(centerConfig.maxText, centerConfig.text);
          do {
            ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
            var textWidth = ctx.measureText(maxText).width;
            // check if it fits, is within configured limits and that we are not simply toggling back and forth
            if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize) fontSize += 1;
            else {
              // reverse last step
              fontSize -= 1;
              break;
            }
          } while (true);
          ctx.restore();
        }
        // save properties
        chart.center = {
          font: helpers.fontString(fontSize, fontStyle, fontFamily),
          fillStyle: helpers.valueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor),
        };
      }
      // if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
      //   var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
      //   arc.round = {
      //     x: (chart.chartArea.left + chart.chartArea.right) / 2,
      //     y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
      //     radius: (chart._metasets[0].data[0].outerRadius + chart._metasets[0].data[0].innerRadius) / 2,
      //     thickness: (chart._metasets[0].data[0].outerRadius - chart._metasets[0].data[0].innerRadius) / 2 - 1,
      //     backgroundColor: chart._metasets[0].data[0].options.backgroundColor,
      //   };
      // }
    },
    afterDraw: (chart) => {
      if (chart.center) {
        var centerConfig = chart.config.options.elements.center;
        var ctx = chart.ctx;
        ctx.save();
        ctx.font = chart.center.font;
        ctx.fillStyle = chart.center.fillStyle;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.fillText(centerConfig.text, centerX, centerY);
        ctx.restore();
      }
      // if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
      //   var ctx = chart.ctx;
      //   var arc = chart.getDatasetMeta(0).data[chart.config.options.elements.arc.roundedCornersFor];
      //   var startAngle = Math.PI / 2 - arc.getProps().startAngle;
      //   var endAngle = Math.PI / 2 - arc.getProps().endAngle;

      //   ctx.save();
      //   ctx.translate(arc.round.x, arc.round.y);
      //   ctx.fillStyle = arc.round.backgroundColor;
      //   ctx.beginPath();
      //   ctx.arc(
      //     arc.round.radius * Math.sin(startAngle),
      //     arc.round.radius * Math.cos(startAngle),
      //     arc.round.thickness,
      //     0,
      //     2 * Math.PI
      //   );
      //   ctx.arc(
      //     arc.round.radius * Math.sin(endAngle),
      //     arc.round.radius * Math.cos(endAngle),
      //     arc.round.thickness,
      //     0,
      //     2 * Math.PI
      //   );
      //   ctx.closePath();
      //   ctx.fill();
      //   ctx.restore();
      // }
    },
  };
  return (
    <>
      <Doughnut data={data} options={options} plugins={[plugins]} height={null} width={null} />
    </>
  );
};

export default StatisticChart;
