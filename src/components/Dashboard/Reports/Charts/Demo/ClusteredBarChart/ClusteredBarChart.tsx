import { useLayoutEffect } from 'react';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { am5, am5themes_Animated, initializeChart } from '../../../../../../shared/modules/AM5Charts/AM5Chart';
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';

const ClusteredBarChart = ({name,data, height, width}:{name:string, height:string, width:string, data:{
  percent: string,
  male: number,
  female: number,
  other:number,
}[]}) => {
    useLayoutEffect(() => {
    let root = initializeChart({id:"chartTurn"});


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
  // wheelX: "panX",
  // wheelY: "zoomX",
  paddingLeft:0,
  layout: root.verticalLayout
}));

// Data
// let data = [{
//   percent: "Reason 1",
//   male: 30,
//   female: 27,
//   other:5
// },{
//   percent:"Reason 2",
//   male: 40,
//   female: 45,
//   other:3
// },{
//   percent:"Reason 3",
//   male: 15,
//   female: 16,
//   other:2
// },{
//   percent:"Reason 4",
//   male: 60,
//   female: 61,
//   other:2
// },{
//   percent:"Reason 5",
//   male: 40,
//   female: 32,
//   other:6
// }];


// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "percent",
  renderer: am5xy.AxisRendererY.new(root, {
    inversed: true,
    cellStartLocation: 0.1,
    cellEndLocation: 0.9,
    minorGridEnabled: true,
    minGridDistance:10
  })
}));

yAxis.data.setAll(data);

let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, {
    strokeOpacity: 0.1,
    minGridDistance: 50,
  }),
  min: 0
}));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function createSeries(field:any, name:any) {
  let series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    xAxis: xAxis,
    yAxis: yAxis,
    valueXField: field,
    categoryYField: "percent",
    sequencedInterpolation: true,
    tooltip: am5.Tooltip.new(root, {
      pointerOrientation: "horizontal",
      labelText: "[bold]{name}[/]\n{categoryY}: {valueX}"
    })
  }));

  series.columns.template.setAll({
    height: am5.p100,
    strokeOpacity: 0,
    //fontSize:12
  });


  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 1,
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        centerY: am5.p50,
        // text: "{valueX}",
        populateText: false
      })
    });
  });

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      locationX: 1,
      locationY: 0.5,
      sprite: am5.Label.new(root, {
        centerX: am5.p100,
        centerY: am5.p50,
        // text: "{name}",
        fill: am5.color('#ffffff'),
        populateText:false
      })
    });
  });

  series.data.setAll(data);
  series.appear();

  return series;
}

createSeries("male", "Male");
createSeries("female", "Female");
createSeries("other", "Others");


// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
let legend = chart.children.push(am5.Legend.new(root, {
  centerX: am5.p50,
  x: am5.p50
}));

legend.data.setAll(chart.series.values);


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
  behavior: "zoomY"
}));
cursor.lineY.set("forceHidden", true);
cursor.lineX.set("forceHidden", true);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);

return () => {
    root.dispose();
  };
}, [data]);
  return (
    <Box className="" id="chartTurn" style={{
      height: height ? height : '250px',
      width: width ? width : '100%',
      marginBottom:"20px" 
    }}
>
      <p className='fs-14'><strong>{name}</strong></p> 
    </Box>
  )
}

export default ClusteredBarChart