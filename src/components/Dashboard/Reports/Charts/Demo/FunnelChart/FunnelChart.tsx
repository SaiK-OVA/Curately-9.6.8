
import { useLayoutEffect } from 'react';
import './FunnelChart.scss';
import { am5, initializeChart } from "../../../../../../shared/modules/AM5Charts/AM5Chart";
import am5percent from "../../../../../../shared/modules/AM5Charts/AM5Percent";



const FunnelChart = ({ id, data, heading }: { id: string, data: { label: string, value: number }[], heading?: string }) => {
  useLayoutEffect(() => {
    let root = initializeChart({ id});

    let chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Define data
  

    // Create series
    let series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        name: "Series",
        valueField: "value",
        categoryField: "label",
        orientation: "vertical",
        alignLabels: false
      })
    );


    series.data.setAll(data);

    series.slices.template.set("tooltipText", "{category}: [bold]{value}[/]");



    // Add legend
    // let legend = chart.children.push(am5.Legend.new(root, {
    //   centerX: am5.percent(50),
    //   y: am5.percent(50),
    //   layout: root.verticalLayout
    // }));
    let legend = chart.children.push(am5.Legend.new(root, {}));

    legend.data.setAll(series.dataItems);

    return () => {
      root.dispose();
    };
  }, [data]);
  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  return (
    <div id={id} style={{ width: "1200px", height: "265px" }}>
    {heading !== "" &&  <p className='fs-14 pipeline'><strong>{heading}</strong></p>}
    </div>
  )
}

export default FunnelChart