import { useLayoutEffect } from 'react';


import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { am5, am5themes_Animated, initializeChart } from '../../../../../../shared/modules/AM5Charts/AM5Chart';
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';

const ColumnWithRotatedLabel = ({ id, data, height, width,colors, heading }: { id: string, height:string,width:string, colors:string, data: { label: string, value: number }[], heading?: string }) => {

  useLayoutEffect(() => {
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    const root = initializeChart({ id });

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      // panX: true,
      // panY: true,
      // wheelX: "panX",
      // wheelY: "zoomX",
      // pinchZoomX: true,
      paddingLeft: 0,
      paddingRight: 1,
    }));

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: 30,
      minorGridEnabled: true
    });

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 5,
      fontSize: 12
    });

    xRenderer.grid.template.setAll({
      location: 1
    })

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "label",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yRenderer = am5xy.AxisRendererY.new(root, {
      strokeOpacity: 0.1
    })

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: yRenderer
    }));

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "label",
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add("fill", function (fill, target) {
      //  return chart.get("colors")?.getIndex(series.columns.indexOf(target));
      return chart.get("colors")?.set("colors", [
        am5.color(colors),
      ]);
    });


    // series.columns.template.adapters.add("stroke", function (stroke, target) {
    //   return chart.get("colors")?.getIndex(series.columns.indexOf(target));
    // });


    // Set data
    // let data = [{
    //   country: "Aug 2023",
    //   value: 1482
    // }, {
    //   country: "Sep 2023",
    //   value: 1175
    // }, {
    //   country: "Oct 2023",
    //   value: 1280
    // }, {
    //   country: "Nov 2023",
    //   value: 991
    // }, {
    //   country: "Dec 2023",
    //   value: 832
    // }, {
    //   country: "Jan 2023",
    //   value: 787
    // }];


    xAxis.data.setAll(data);
    series.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    return () => {
      root.dispose();
    };
  }, [data]);
  return (
    //     <div id={id} style={{ width: "350px", height: "200px",marginBottom:"20px"  }}>
    // </div>
    (<div>
      <Box className="" id={id} style={{
        height: height ? height : '250px',
        width: width ? width : '100%',
        marginBottom: "20px"
      }}>
        {heading !== "" && <p className='fs-14'><strong>{heading}</strong></p>}

      </Box>
    </div>)
  );

}

export default ColumnWithRotatedLabel
