import { useLayoutEffect } from 'react';

import { am5, am5themes_Animated, initializeChart } from "../../../../../../shared/modules/AM5Charts/AM5Chart";
//import { create } from '@amcharts/amcharts5';
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';


const StackedBarChart = ({ id, data, name, colors, colorLabels, height, width }: { id: string, name: string, colors: string[], colorLabels: string[], data: { label: string, value1: number, value2: number, value3?: number }[], height?: string, width?: string }) => {
  useLayoutEffect(() => {
    //const chart = create("chartDiv", am5.xyChart);
    let root = initializeChart({ id });


    let myTheme = am5.Theme.new(root);

    myTheme.rule("Grid", ["base"]).setAll({
      strokeOpacity: 0.1
    });


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root),
      myTheme
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      // panX: false,
      // panY: false,
      // wheelX: "panY",
      // wheelY: "zoomY",
      paddingLeft: 0,

      layout: root.verticalLayout
    }));

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    // chart.set("scrollbarY", am5.Scrollbar.new(root, {
    //   orientation: "vertical"
    // }));



    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yRenderer = am5xy.AxisRendererY.new(root, { minGridDistance: 10 });
    let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "label",
      renderer: yRenderer,
      tooltip: am5.Tooltip.new(root, {}),
    }));

    yRenderer.grid.template.setAll({
      location: 1
    })

    yAxis.data.setAll(data);


    let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      maxPrecision: 0,
      renderer: am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
        strokeOpacity: 0.1
      })
    }));

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(am5.Legend.new(root, {
      centerX: am5.p50,
      x: am5.p50
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name: any, fieldName: any) {
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: name,
        stacked: true,
        xAxis: xAxis,
        yAxis: yAxis,
        baseAxis: yAxis,
        valueXField: fieldName,
        categoryYField: "label"
      }));

      series.columns.template.setAll({
        tooltipText: "{name}, {label}: {valueX}",
        tooltipY: am5.percent(90),
        height: 15
      });
      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            //  text: "{valueX}",
            //  fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true
          })
        });
      });
      legend.data.push(series);
      // return chart.get("colors")?.set("colors", [
      //   am5.color('#7285DC'),
      //   am5.color('#ADB2C7')
      // ]);
      return chart.get("colors")?.set("colors", [am5.color(colors[0]), am5.color(colors[1])]);


    }

    makeSeries(colorLabels[0], "value1");
    makeSeries(colorLabels[1], "value2");
    {colorLabels[2] && makeSeries(colorLabels[2], "value3");}



    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);


    return () => {
      root.dispose();
    };
  }, [colors]);

  return (
    // <div>
    //   <Box className="" id={id} style={{
    //     height: "240px",
    //     left: "112px",
    //     top: "96px",
    //     width: "336px"
    //   }}>
    //     <Typography variant='h6'>By Source</Typography>
    //   </Box>
    // </div>
    // <div id="chartBar" style={{ width: "400px", height: "400px" }}></div>
    (<div id={id} style={{ width: width ? width : "100%", height: height ? height : "240px", marginBottom: '20px' }}>
      <p className='fs-14' ><strong >{name}</strong></p>
    </div>)
  );
}
export default StackedBarChart;