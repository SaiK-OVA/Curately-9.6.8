// import React from 'react';
import { useLayoutEffect } from 'react';

import { am5, am5themes_Animated, initializeChart } from "../../../../../../shared/modules/AM5Charts/AM5Chart";
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';

const HeatMap = ({ id, chartDataPassed, name, size }: {
  id: string, name: string, 
  chartDataPassed: {
    yAxisCategoryField: string;
    xAxisCategoryField: string;
    seriesStrokeColor: string;
    seriesRulesMin: string;
    seriesRulesMax: string;
    yAxisData: {
      weekday: string;
    }[];
    xAxisData: {
      hour: string;
    }[];
    displayData: {
      hour: string,
      weekday: string,
      value: number
    }[];
  } ,
  size : {
   width: string, height: string, marginBottom: string
  }
}) => {
  useLayoutEffect(() => {
    let root = initializeChart({ id });


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      // panX: false,
      // panY: false,
      // wheelX: "none",
      // wheelY: "none",
      paddingLeft: 0,
      layout: root.verticalLayout
    }));


    // Create axes and their renderers
    let yRenderer = am5xy.AxisRendererY.new(root, {
      visible: false,
      minGridDistance: 20,
      inversed: true,
      minorGridEnabled: true,

    });

    yRenderer.grid.template.set("visible", false);

    let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0,
      renderer: yRenderer,
      categoryField: chartDataPassed.yAxisCategoryField,
    }));

    let xRenderer = am5xy.AxisRendererX.new(root, {
      visible: false,
      minGridDistance: 50,
      opposite: true,
      minorGridEnabled: true,

    });

    xRenderer.grid.template.set("visible", false);

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      renderer: xRenderer,
      categoryField: chartDataPassed.xAxisCategoryField,
    }));


    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/#Adding_series
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      calculateAggregates: true,
      stroke: am5.color(chartDataPassed.seriesStrokeColor),
      clustered: false,
      xAxis: xAxis,
      yAxis: yAxis,
      categoryXField: chartDataPassed.xAxisCategoryField,
      categoryYField: chartDataPassed.yAxisCategoryField,
      valueField: "value",
    }));

    series.columns.template.setAll({
      tooltipText: "{value}",
      strokeOpacity: 1,
      strokeWidth: 2,
      width: am5.percent(100),
      height: am5.percent(100),

    });
    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          // oversizedBehavior: "truncate",
          text: "{value}",
          centerY: am5.p50,
          centerX: am5.p50,
          populateText: true,
        })
      });
    });
    // series.columns.template.events.on("pointerover", function (event: any) {
    //   let di = event.target.dataItem;
    //   if (di) {
    //     heatLegend.showValue(di.get("value", 0));
    //   }
    // });

    // series.events.on("datavalidated", function () {
    //   heatLegend.set("startValue", series.getPrivate("valueHigh"));
    //   heatLegend.set("endValue", series.getPrivate("valueLow"));
    // });


    // Set up heat rules
    // https://www.amcharts.com/docs/v5/concepts/settings/heat-rules/
    series.set("heatRules", [{
      target: series.columns.template,
      min: am5.color(chartDataPassed.seriesRulesMin),
      max: am5.color(chartDataPassed.seriesRulesMax),
      dataField: "value",
      key: "fill",

    }]);


    // Add heat legend
    // https://www.amcharts.com/docs/v5/concepts/legend/heat-legend/
    // let heatLegend = chart.bottomAxesContainer.children.push(am5.HeatLegend.new(root, {
    //   orientation: "horizontal",
    //   endColor: am5.color(0xE6E6FA),
    //   startColor: am5.color(0x3264a8)
    // }));


    // Set data
    // https://www.amcharts.com/docs/v5/charts/xy-chart/#Setting_data

    series.data.setAll(chartDataPassed.displayData);
    yAxis.data.setAll(chartDataPassed.yAxisData);
    xAxis.data.setAll(chartDataPassed.xAxisData);

    return () => {
      root.dispose();
    };
  }, []);
  return (
    // <Box className="" id="chartheatmap" style={{
    //   height: "240px",
    //   left: "112px",
    //   top: "96px",
    //   width: "336px"
    // }}>
    //   <Typography variant='subtitle2'>Salary distribution by Experience for hired candidates</Typography>
    // </Box>
    (<div id={id}
      style={size}>
      <p className='fs-14'><strong>{name}</strong></p>
    </div>)
  );
}

export default HeatMap