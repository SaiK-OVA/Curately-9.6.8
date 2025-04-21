import { useLayoutEffect } from 'react';

import { am5, am5themes_Animated, initializeChart } from "../../../../../../shared/modules/AM5Charts/AM5Chart";
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';

const TrendLines = ({ id, data, name, dateformat, height, width }: {
  id: string, name: string, dateformat: string, heading?: string, height?: string, width?: string,
  data: {
    date: number,
    value: number,
  }[]
}) => {
  
  useLayoutEffect(() => {
    let root = initializeChart({ id });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    root.dateFormatter.setAll({
      dateFormat: dateformat,
      dateFields: ["valueX"]
    });

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        focusable: true,
        // panX: true,
        // panY: true,
        // wheelX: "panX",
        // wheelY: "zoomX",
        // pinchZoomX: true,
        paddingLeft: 0
      })
    );

    let easing = am5.ease.linear;

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.5,
        groupData: false,
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {
          // pan: "zoom",
          minGridDistance: 70,
          minorGridEnabled: true
        }),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 1,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        minBulletDistance: 10,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "{valueY}"
        })
      })
    );

    // Set up data processor to parse string dates
    // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: dateformat,
      dateFields: ["date"]
    });

    series.data.setAll(data);

    series.bullets.push(function () {
      let circle = am5.Circle.new(root, {
        radius: 4,
        fill: series.get("fill"),
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 2
      });

      return am5.Bullet.new(root, {
        sprite: circle
      });
    });

    // createTrendLine(
    //   [
    //     { date: new Date(2024, 1).getTime(), value: 10 },
    //     { date: new Date(2024, 2).getTime(), value: 19 }
    //   ],
    //   root.interfaceColors.get("positive")
    // );

    // createTrendLine(
    //   [
    //     { date: new Date(2024, 1).getTime(), value: 16 },
    //     { date: new Date(2024, 2).getTime(), value: 10 }
    //   ],
    //   root.interfaceColors.get("negative")
    // );

    function createTrendLine(data: any, color: any) {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueXField: "date",
          stroke: color,
          valueYField: "value"
        })
      );

      series.data.processor = am5.DataProcessor.new(root, {
        dateFormat: dateformat,
        dateFields: ["date"]
      });

      series.data.setAll(data);
    }
    return () => {
      root.dispose();
    };

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations

  }, [id, data]);
  return (
    <div id={id} style={{
      height: height ? height : '240px',
      width: width ? width : '100%',
    }}>
      {name && <p className='fs-14'><strong>{name}</strong></p>}
    </div>
  )
}

export default TrendLines