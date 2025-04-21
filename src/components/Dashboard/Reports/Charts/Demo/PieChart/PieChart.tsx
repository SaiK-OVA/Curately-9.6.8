import { useLayoutEffect } from 'react';

import { am5, am5themes_Animated, initializeChart } from "../../../../../../shared/modules/AM5Charts/AM5Chart";
import am5percent from "../../../../../../shared/modules/AM5Charts/AM5Percent";

const Chart=({ id, data, heading ,size, onSliceClick }: { id: string, data: { value: number, category: string }[], heading?: string ,onSliceClick:any,  size : {
    width: string, height: string, marginBottom: string
   }})=>{
    useLayoutEffect(() => {
        let root = initializeChart({id});

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(
            am5percent.PieChart.new(root, {
                endAngle: 270
            })
        );

        

        // Create Y-axis
        let series = chart.series.push(
            am5percent.PieSeries.new(root, {
                valueField: "value",
                categoryField: "category",
                endAngle: 270
            })
        );
        series.states.create("hidden", {
            endAngle: -90
        });
        series.labels.template.setAll({
            maxWidth: 150,
            oversizedBehavior: "wrap", // to truncate labels, use "truncate"
            fontSize: 12,
            text: "{category}"
          });

        // series.data.setAll([{
        //     category: "Above 90%",
        //     value: 501.9
        // }, {
        //     category: "81-90%",
        //     value: 301.9
        // }, {
        //     category: "71-80%",
        //     value: 201.1
        // }, {
        //     category: "61-70%",
        //     value: 165.8
        // }, {
        //     category: "51-60%",
        //     value: 139.9
        // }]);

        // series.events.on("clicked", (event) => {
        //     const dataItem = event.target.dataItem;
        //     if (dataItem) {
        //         const category = dataItem.dataContext.category;
        //         const value = dataItem.dataContext.value;
        //         onSliceClick(category, value);
        //     }
        // });

        series.slices.template.events.on("click", (event) => {
            const dataItem = event.target.dataItem; // Get the clicked data item
            if (dataItem) {
              const clickedDataContext = dataItem.dataContext; // Safely access dataContext
              if (onSliceClick && clickedDataContext) {
                onSliceClick(clickedDataContext); // Call the passed function with the clicked category
              }
            }
          });
      
      
        series.data.setAll(data);

        series.appear(1000, 100);

       


        // Add legend
        let legend = chart.children.push(am5.Legend.new(root, {}));
        legend.data.setAll(chart.series.values);
        // var legend = chart.children.push(am5.Legend.new(root, {
        //     centerX: am5.percent(50),
        //     x: am5.percent(50),
        //     marginTop: 15,
        //     marginBottom: 15,
        //   }));
          
        //   legend.data.setAll(series.dataItems);
          
          
          // Play initial series animation
          // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
          series.appear(1000, 100);

        // Add cursor

        return () => {
            root.dispose();
        };
    }, [data, onSliceClick]);

    return (
        // <div id="chartdiv" style={{ width: "600px", height: "330px" }}>
        // <Typography variant='h6'>Match Score Index</Typography>    
        // </div>
        (<div id={id} style={size}>
            {heading !== '' && <p className='fs-14'><strong>{heading}</strong></p>}
        </div>)
    );
}
export default Chart;