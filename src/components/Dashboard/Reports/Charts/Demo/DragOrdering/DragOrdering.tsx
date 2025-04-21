import { useLayoutEffect } from 'react';
import { am5, am5themes_Animated, initializeChart } from "../../../../../../shared/modules/AM5Charts/AM5Chart";
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';

/* Chart code */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
const DragOrdering = ({ id, data, name, colors, width, height }: { id: string, colors: string, name: string, width?: string, height?: string, data: { GrossMargin: number, Name: string }[] }) => {
  useLayoutEffect(() => {
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
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        // panX: false,
        // panY: false,
        // wheelX: "none",
        // wheelY: "none",
        paddingLeft: 0
      })
    );


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yRenderer = am5xy.AxisRendererY.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });
    yRenderer.grid.template.set("location", 1);

    let yAxis = chart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "Name",
        renderer: yRenderer
      })
    );

    let xAxis = chart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          visible: true,
          strokeOpacity: 0.1,
          minGridDistance: 80
        })
      })
    );


    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "GrossMargin",
        valueYField: "Name",
        sequencedInterpolation: true,
        categoryYField: "Name"
      })
    );

    let columnTemplate = series.columns.template;

    columnTemplate.setAll({
      draggable: true,
      cursorOverStyle: "pointer",
      tooltipText: "{valueY}:{valueX}",
      cornerRadiusBR: 10,
      cornerRadiusTR: 10,
      strokeOpacity: 0
    });
    columnTemplate.adapters.add("fill", (fill, target) => {
      //  return chart.get("colors")?.getIndex(series.columns.indexOf(target));
      return chart.get("colors")?.set("colors", [
        am5.color('#a1caf1'),
      ]);
    });

    // columnTemplate.adapters.add("stroke", (stroke, target) => {
    //   return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    // });

    columnTemplate.events.on("dragstop", () => {
      sortCategoryAxis();
    });

    // Get series item by category
    function getSeriesItem(category: any) {
      for (var i = 0; i < series.dataItems.length; i++) {
        let dataItem = series.dataItems[i];
        if (dataItem.get("categoryY") == category) {
          return dataItem;
        }
      }
    }


    // Axis sorting
    function sortCategoryAxis() {
      // Sort by value
      series.dataItems.sort(function (x, y) {
        return y.get("graphics").y() - x.get("graphics").y();
      });

      let easing = am5.ease.out(am5.ease.cubic);

      // Go through each axis item
      am5.array.each(yAxis.dataItems, function (dataItem) {
        // get corresponding series item
        let seriesDataItem = getSeriesItem(dataItem.get("category"));

        if (seriesDataItem) {
          // get index of series data item
          let index = series.dataItems.indexOf(seriesDataItem);

          let column = seriesDataItem.get("graphics");

          // position after sorting
          let fy =
            yRenderer.positionToCoordinate(yAxis.indexToPosition(index)) -
            column.height() / 2;

          // set index to be the same as series data item index
          if (index != dataItem.get("index")) {
            dataItem.set("index", index);

            // current position
            let x = column.x();
            let y = column.y();

            column.set("dy", -(fy - y));
            column.set("dx", x);

            column.animate({ key: "dy", to: 0, duration: 600, easing: easing });
            column.animate({ key: "dx", to: 0, duration: 600, easing: easing });
          } else {
            column.animate({ key: "y", to: fy, duration: 600, easing: easing });
            column.animate({ key: "x", to: 0, duration: 600, easing: easing });
          }
        }
      });

      // Sort axis items by index.
      // This changes the order instantly, but as dx and dy is set and animated,
      // they keep in the same places and then animate to true positions.
      yAxis.dataItems.sort(function (x: any, y: any) {
        return x.get("index") - y.get("index");
      });
    }

    // Set data
    //   let data = [{
    //     Name: "June 22",
    //     value: 22
    //   }, {
    //     Name: "May 22",
    //     value: 40
    //   }, {
    //     Name: "Apr 22",
    //     value: 60
    //   },  {
    //     Name: "Mar 22",
    //     value: 15
    //   },{
    //     Name: "Feb 22",
    //     value: 40
    //   },
    //   {
    //     Name: "Jan 22",
    //     value: 30
    //   }
    // ];

    yAxis.data.setAll(data);
    series.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, [colors]);
  return (
    // <Box  id={id} style={{ width: "600px", height: "200px" }}>
    //     <Typography variant='h6'>Outreach Funnel</Typography>
    // </Box>
    (<div id={id} style={{ width: width ? width : '100%', height: height ? height : '250px', marginBottom: "20px" }}>
      <p className='fs-14'><strong>{name}</strong></p>
    </div>)
  );
}
export default DragOrdering;