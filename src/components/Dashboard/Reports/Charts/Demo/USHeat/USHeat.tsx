import { useLayoutEffect } from 'react';
import { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

import { am5, am5themes_Animated, initializeChart } from "../../../../../../shared/modules/AM5Charts/AM5Chart";
import { am5geodata_usaLow, am5map } from "../../../../../../shared/modules/AM5Charts/GEOChart";

/* Chart code */
// Create root
const UsHeatChart = ({ id, data, heading, size ,colors }: {
  id: string, data: { value: number, id: string }[], heading?: string, size: {
    width: string, height: string, marginBottom: string
  }, colors: string[]
}) => {
  useLayoutEffect(() => {
    let root = initializeChart({ id });

    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    let chart = root.container.children.push(am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "none",
      projection: am5map.geoAlbersUsa(),
      layout: root.horizontalLayout
    }));

    let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_usaLow as FeatureCollection<Geometry, GeoJsonProperties>,
      valueField: "value",
      calculateAggregates: true
    }));

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}: {value}"
    });

    polygonSeries.set("heatRules", [{
      target: polygonSeries.mapPolygons.template,
      dataField: "value",
      max: am5.color(colors[1]),
      min: am5.color(colors[0]),
      key: "fill"
    }]);

    // polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
    //   heatLegend.showValue(ev.target.dataItem.get("value"));
    // });
    polygonSeries.mapPolygons.template.events.on("pointerover", (ev: any) => {
      if (ev.target.dataItem) {
        heatLegend.showValue(ev.target.dataItem.get("value"));
      }
    });

    polygonSeries.data.setAll(data);
    // [
    //   { id: "US-AL", value: 4447100 },
    //   { id: "US-AK", value: 626932 },
    //   { id: "US-AZ", value: 5130632 },
    //   { id: "US-AR", value: 2673400 },
    //   { id: "US-CA", value: 33871648 },
    //   { id: "US-CO", value: 4301261 },
    //   { id: "US-CT", value: 3405565 },
    //   { id: "US-DE", value: 783600 },
    //   { id: "US-FL", value: 15982378 },
    //   { id: "US-GA", value: 8186453 },
    //   { id: "US-HI", value: 1211537 },
    //   { id: "US-ID", value: 1293953 },
    //   { id: "US-IL", value: 12419293 },
    //   { id: "US-IN", value: 6080485 },
    //   { id: "US-IA", value: 2926324 },
    //   { id: "US-KS", value: 2688418 },
    //   { id: "US-KY", value: 4041769 },
    //   { id: "US-LA", value: 4468976 },
    //   { id: "US-ME", value: 1274923 },
    //   { id: "US-MD", value: 5296486 },
    //   { id: "US-MA", value: 6349097 },
    //   { id: "US-MI", value: 9938444 },
    //   { id: "US-MN", value: 4919479 },
    //   { id: "US-MS", value: 2844658 },
    //   { id: "US-MO", value: 5595211 },
    //   { id: "US-MT", value: 902195 },
    //   { id: "US-NE", value: 1711263 },
    //   { id: "US-NV", value: 1998257 },
    //   { id: "US-NH", value: 1235786 },
    //   { id: "US-NJ", value: 8414350 },
    //   { id: "US-NM", value: 1819046 },
    //   { id: "US-NY", value: 18976457 },
    //   { id: "US-NC", value: 8049313 },
    //   { id: "US-ND", value: 642200 },
    //   { id: "US-OH", value: 11353140 },
    //   { id: "US-OK", value: 3450654 },
    //   { id: "US-OR", value: 3421399 },
    //   { id: "US-PA", value: 12281054 },
    //   { id: "US-RI", value: 1048319 },
    //   { id: "US-SC", value: 4012012 },
    //   { id: "US-SD", value: 754844 },
    //   { id: "US-TN", value: 5689283 },
    //   { id: "US-TX", value: 20851820 },
    //   { id: "US-UT", value: 2233169 },
    //   { id: "US-VT", value: 608827 },
    //   { id: "US-VA", value: 7078515 },
    //   { id: "US-WA", value: 5894121 },
    //   { id: "US-WV", value: 1808344 },
    //   { id: "US-WI", value: 5363675 },
    //   { id: "US-WY", value: 493782 }
    // ]

    let heatLegend = chart.children.push(am5.HeatLegend.new(root, {
      orientation: "vertical",
      startColor: am5.color(colors[0]),
      endColor: am5.color(colors[1]),
      startText: "Lowest",
      endText: "Highest",
      stepCount: 5
    }));

    heatLegend.startLabel.setAll({
      fontSize: 12,
      fill: heatLegend.get("startColor")
    });

    heatLegend.endLabel.setAll({
      fontSize: 12,
      fill: heatLegend.get("endColor")
    });

    // change this to template when possible
    polygonSeries.events.on("datavalidated", function () {
      heatLegend.set("startValue", polygonSeries.getPrivate("valueLow"));
      heatLegend.set("endValue", polygonSeries.getPrivate("valueHigh"));
    });

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div id={id} style={size}>
      {heading !== "" && <p className='fs-14'><strong>{heading}</strong></p>}
    </div>
  );
}
export default UsHeatChart;