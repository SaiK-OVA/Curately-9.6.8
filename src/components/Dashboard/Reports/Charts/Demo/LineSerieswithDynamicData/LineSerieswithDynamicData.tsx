import { useLayoutEffect } from 'react';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { CircularProgress } from '../../../../../../shared/modules/MaterialImports/CircularProgress';
import { am5, am5themes_Animated, initializeChart } from '../../../../../../shared/modules/AM5Charts/AM5Chart';
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';

const LineSerieswithDynamicData = ({ id, data, name, dateformat, height, width, dayOrMonth = 'day', labels, loading = false }: {
  id: string, name: string, dateformat: string, height?: string, width?: string, labels: string[], dayOrMonth?: 'day' | 'month', data: any, loading: boolean
}) => {
  useLayoutEffect(() => {
    if (!data || data.length === 0) return;
    let root = initializeChart({ id });
    root.setThemes([am5themes_Animated.new(root)]);
    
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        layout: root.verticalLayout
    }));

    chart.get("colors")?.set("step", 3);


    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    // let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    // cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation: 0.3,
      groupData: false,
      baseInterval: {
        timeUnit: dayOrMonth,
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true, minGridDistance: 50,
      }),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    const legend = chart.children.push(
        am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        layout: root.horizontalLayout
        })
    );


    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    // function makeSeries(name: any, fieldName: any) {

    for(let i=0; i<data.length; i++) {
        let series = chart.series.push(am5xy.LineSeries.new(root, {
          name: `${labels[i]}`,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          valueXField: "date",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueX}: {valueY}: {value}"
          })
        }));
        console.log(data[i])

        series.data.setAll(data[i]);

        legend.data.push(series);
    }

    // Set date fields
    // https://www.amcharts.com/docs/v5/concepts/data/#Parsing_dates
    root.dateFormatter.setAll({
      dateFormat: dateformat,
      dateFields: ["valueX"]
    });


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    return () => root.dispose();
  }, [id, data, dateformat, dayOrMonth, labels]);

  return (
    <Box id={id} className="chart-container" style={{ height, width }}>
      {loading && (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      )}
      {name && <p className="chart-title"><strong>{name}</strong></p>}
    </Box>
  );
};

export default LineSerieswithDynamicData;