import { useLayoutEffect } from 'react';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';

import { am5, am5themes_Animated, initializeChart } from "../../../../../../shared/modules/AM5Charts/AM5Chart";
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';

const StackedColumnChart = ({ id, data, name , size }: {
  id: string, name: string, data: {
    "year": string,
    "male": number,
    "female": number,
    "other": number,
  }[],  size : {
    width: string, height: string, marginBottom: string
   }
}) => {
  useLayoutEffect(() => {
    let root = initializeChart({ id });

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      // panX: false,
      // panY: false,
      // wheelX: "panX",
      // wheelY: "zoomX",
      paddingLeft: 0,
      layout: root.verticalLayout
    }));

    // Define data
    // let data = [{
    //   "year": "DA",
    //   "male": 30,
    //   "female": 20,
    //   "other": 4,

    // }, {
    //   "year": "SA",
    //   "male": 40,
    //   "female": 15,
    //   "other": 6,
    // }, {
    //   "year": "Associate",
    //   "male": 15,
    //   "female": 20,
    //   "other": 2,
    // }, {
    //   "year": "HRBP",
    //   "male": 60,
    //   "female": 25,
    //   "other": 8,
    // }, {
    //   "year": "DE",
    //   "male": 40,
    //   "female": 23,
    //   "other": 9,
    // }
    // ]


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minorGridEnabled: true,
      minGridDistance: 50
    });

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "year",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {}),
    }));

    xRenderer.grid.template.setAll({
      location: 1,
    })

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      min: 0,
      max: 100,
      numberFormat: "#",
      strictMinMax: true,
      calculateTotals: true,
      renderer: am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1,
        minGridDistance: 10
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
        valueYField: fieldName,
        valueYShow: "valueYTotalPercent",
        categoryXField: "year",

      }));

      series.columns.template.setAll({
        tooltipText: "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%",
        tooltipY: am5.percent(15),

      });
      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            // oversizedBehavior: "truncate",
            // text: "{valueYTotalPercent.formatNumber('#.#')}%",
            fill: root.interfaceColors.get("alternativeText"),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,

          })
        });
      });

      legend.data.push(series);
    }

    makeSeries("Male", "male");
    makeSeries("Female", "female");
    makeSeries("Other", "other");



    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (

    <Box className="" id={id} style={size}>
      {/* <Box className="" id="chartdiv1" style={{ width: "700px", height: "300px" }}> */}
      {/* <Typography variant='h6'>Hired by Job Roles</Typography> */}
      <p className='fs-14'><strong>{name}</strong></p>
    </Box>
  );
}
export default StackedColumnChart;