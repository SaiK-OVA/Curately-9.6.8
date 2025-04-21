import { useLayoutEffect } from 'react';

import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import { am5, am5themes_Animated, initializeChart } from '../../../../../../shared/modules/AM5Charts/AM5Chart';
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';

const Comparing = ({ id, data, name, dateformat, height, width, dayOrMonth = 'day' }: {
  id: string, name: string, dateformat: string, height?: string, width?: string,  dayOrMonth?: 'day' | 'month', data: {
    date: number,
    value1: number,
    value2?: number,
    previousDate:string,
  }[]}) => {
  useLayoutEffect(() => {
    let root = initializeChart({id});

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      // panX: true,
      // panY: true,
      // wheelX: "panX",
      // wheelY: "zoomX",
      pinchZoomX: true
    }));

    chart.get("colors")?.set("step", 3);


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.3,

      baseInterval: {
        timeUnit: dayOrMonth,
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true, minGridDistance: 30,
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    // function makeSeries(name: any, fieldName: any) {
    let series = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value1",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueX}: {valueY}\n{previousDate}: {value2}"
      })
    }));


    series.strokes.template.setAll({
      strokeWidth: 2
    });

    series.get("tooltip")?.get("background")?.set("fillOpacity", 0.5);

    let series2 = chart.series.push(am5xy.LineSeries.new(root, {
      name: "Series 2",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value2",
      valueXField: "date"
    }));
    series2.strokes.template.setAll({
      strokeDasharray: [2, 2],
      strokeWidth: 2,
    });

    // Set date fields
    // https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
    root.dateFormatter.setAll({
      dateFormat: dateformat,
      dateFields: ["valueX"]
    });


    // Set data
    // let data = [{
    //   date: new Date(2023, 7).getTime(),
    //   value1: 824,
    //   value2: 1482,
    //   previousDate: new Date(2023, 7)
    // }, {
    //   date: new Date(2023, 8).getTime(),
    //   value1: 622,
    //   value2: 1175,
    //   previousDate: "2023-08"
    //   //Aug 2023
    // }, {
    //   date: new Date(2023, 9).getTime(),
    //   value1: 722,
    //   value2: 1280,
    //   previousDate: "2023-09"
    // }, {
    //   date: new Date(2023, 10).getTime(),
    //   value1: 504,
    //   value2: 991,
    //   previousDate: "2023-10"
    // }, {
    //   date: new Date(2023, 11).getTime(),
    //   value1: 416,
    //   value2: 832,
    //   previousDate: "2023-11"
    // }, {
    //   date: new Date(2023, 12).getTime(),
    //   value1: 398,
    //   value2: 787,
    //   previousDate: "2023-12"
    // }]


    series.data.setAll(data);
    series2.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
    // }
    // makeSeries("Data","data")
    // makeSeries("PreviousDate","previousDate")

    return () => {
      root.dispose();
    };
  }, [data]);

  return (

    <Box className="" id={id} style={{
      height: height ? height : '250px',
      width: width ? width : '100%',
    }}>
      {name && <p className='fs-14'><strong>{name}</strong></p>}
    </Box>
  );
}
export default Comparing;