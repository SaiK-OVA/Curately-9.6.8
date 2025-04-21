import { useLayoutEffect } from 'react';
import { am5, am5themes_Animated, initializeChart } from "../../../../../../shared/modules/AM5Charts/AM5Chart";
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';

const GroupedSortedColumns = ({ data, id, heading }: {
  id: string, heading?: string, data: {
    [key: string]:{
      "White": number,
      "Blacks": number,
      "SouthEastAsians": number,
      "Others": number,
      quantity: number
    }}
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
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        // panX: false,
        // panY: false,
        // wheelX: "none",
        // wheelY: "none",
        paddingLeft: 0
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 40,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({ text: " " });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "category",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{realName}"
        })
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        max: 200,
        renderer: am5xy.AxisRendererY.new(root, { opposite: true })
      })
    );

    let yAxis2 = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        syncWithAxis: yAxis,
        min: 0,
        max: 80,
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis2,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{provider} {realName}: {valueY}"
        })
      })
    );

    series.columns.template.setAll({
      fillOpacity: 0.9,
      strokeOpacity: 0
    });
    series.columns.template.adapters.add("fill", (fill: any, target: any) => {
      return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", (stroke, target) => {
      return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    });

    let lineSeries = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series 2",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "quantity",
        sequencedInterpolation: true,
        stroke: chart.get("colors")?.getIndex(13),
        fill: chart.get("colors")?.getIndex(13),
        categoryXField: "category",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      })
    );

    lineSeries.strokes.template.set("strokeWidth", 2);

    lineSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        locationY: 1,
        locationX: undefined,
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: lineSeries.get("fill")
        })
      });
    });

    // when data validated, adjust location of data item based on count
    lineSeries.events.on("datavalidated", function () {
      am5.array.each(lineSeries.dataItems, function (dataItem: any) {
        // if count divides by two, location is 0 (on the grid)
        if (
          dataItem.dataContext.count / 2 ==
          Math.round(dataItem.dataContext.count / 2)
        ) {
          dataItem.set("locationX", 0);
        }
        // otherwise location is 0.5 (middle)
        else {
          dataItem.set("locationX", 0.5);
        }
      });
    });

    let chartData: any[] = [];

    // Set data
    // let data: any = {
    //   "Finance": {
    //     "White": 50,
    //     "Blacks": 25,
    //     "South East Asians": 5,
    //     "Others": 20,
    //     quantity: 100
    //   },
    //   "Marketing": {
    //     "White": 25,
    //     "Blacks": 30,
    //     "South East Asians": 43,
    //     "Others": 7,
    //     quantity: 120
    //   },
    //   "HR": {
    //     "White": 40,
    //     "Blacks": 50,
    //     "South East Asians": 22,
    //     "Others": 8,
    //     quantity: 150
    //   },
    //   "Operations": {
    //     "White": 35,
    //     "Blacks": 20,
    //     "South East Asians": 43,
    //     "Others": 9,
    //     quantity: 100
    //   },
    //   "Sales": {
    //     "White": 55,
    //     "Blacks": 15,
    //     "South East Asians": 30,
    //     "Others": 11,
    //     quantity: 80
    //   },
    //   "Engineering": {
    //     "White": 60,
    //     "Blacks": 30,
    //     "South East Asians": 33,
    //     "Others": 7,
    //     quantity: 200
    //   },
    //   "Data Science": {
    //     "White": 23,
    //     "Blacks": 34,
    //     "South East Asians": 32,
    //     "Others": 3,
    //     quantity: 150
    //   },
    //   "Adminstration": {
    //     "White": 53,
    //     "Blacks": 22,
    //     quantity: 200
    //   }
    // };

    // process data ant prepare it for the chart
    for (var providerName in data) {
      let providerData = data[providerName];

      // add data of one provider to temp array
      let tempArray = [];
      let count = 0;
      // add items
      for (var itemName in providerData) {
        if (itemName != "quantity") {
          count++;
          // we generate unique category for each column (providerName + "_" + itemName) and store realName
          tempArray.push({
            category: providerName + "_" + itemName,
            realName: itemName,
            value: providerData[itemName],
            provider: providerName
          });
        }
      }
      // sort temp array
      tempArray.sort(function (a, b) {
        if (a.value > b.value) {
          return 1;
        } else if (a.value < b.value) {
          return -1;
        } else {
          return 0;
        }
      });

      // add quantity and count to middle data item (line series uses it)
      let lineSeriesDataIndex = Math.floor(count / 2);
      tempArray[lineSeriesDataIndex].quantity = providerData.quantity;
      tempArray[lineSeriesDataIndex].count = count;
      // push to the final data
      am5.array.each(tempArray, function (item) {
        chartData.push(item);
      });

      // create range (the additional label at the bottom)

      let range = xAxis.makeDataItem({});
      xAxis.createAxisRange(range);

      range.set("category", tempArray[0].category);
      range.set("endCategory", tempArray[tempArray.length - 1].category);

      let label = range.get("label");

      label?.setAll({
        text: tempArray[0].provider,
        dy: 30,
        fontWeight: "bold",
        tooltipText: tempArray[0].provider
      });

      let tick = range.get("tick");
      tick?.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 0 });

      let grid = range.get("grid");
      grid?.setAll({ strokeOpacity: 1 });
    }

    // add range for the last grid
    let range = xAxis.makeDataItem({});
    xAxis.createAxisRange(range);
    range.set("category", chartData[chartData.length - 1].category);
    let tick = range.get("tick");
    tick?.setAll({ visible: true, strokeOpacity: 1, length: 50, location: 1 });

    let grid = range.get("grid");
    grid?.setAll({ strokeOpacity: 1, location: 1 });

    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);
    lineSeries.data.setAll(chartData);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/

    return () => {
      root.dispose();
    };
  }, [data]);
  return (
    <div id={id} style={{ height: "600px", marginBottom: "10px" }}>{heading !== "" && <p className='fs-14'><strong>{heading}</strong></p>}
    </div>
  )

}

export default GroupedSortedColumns