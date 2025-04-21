import { useLayoutEffect } from 'react';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import { am5, am5themes_Animated, initializeChart } from '../../../../../../shared/modules/AM5Charts/AM5Chart';
import am5percent from '../../../../../../shared/modules/AM5Charts/AM5Percent';

const Donut = ({ id, data, name, width, height }: { id: string, name: string, data: { value: number, category: string }[], width?: string, height?: string }) => {
    useLayoutEffect(() => {
        let root = initializeChart({ id });


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
            am5themes_Animated.new(root)
        ]);


        // Create chart
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
        let chart = root.container.children.push(am5percent.PieChart.new(root, {
            layout: root.verticalLayout,
            innerRadius: am5.percent(75)
        }));


        // Create series
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
        let series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category",
            alignLabels: true
        }));

        series.labels.template.setAll({
            textType: "circular",
            centerX: 1,
            centerY: 0,
            fontSize: 12,
            maxWidth: 100,
            oversizedBehavior: "wrap",
            text: "{category}"
        });


        // Set data
        // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
        // series.data.setAll([
        //     { value: 41, category: "LinkedIn" },
        //     { value: 20, category: "Monster" },
        //     { value: 20, category: "Indeed" },
        //     { value: 13, category: "Career Builder" },
        //     // { value: 6, category: "People Directory" },
        // ]);

        series.data.setAll(data);
        // Create legend
        // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
        // let legend = chart.children.push(am5.Legend.new(root, {
        //     centerX: am5.percent(50),
        //     x: am5.percent(50),
        //     marginTop: 15,
        //     marginBottom: 15,
        // }));

        //legend.data.setAll(series.dataItems);


        // Play initial series animation
        // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
        series.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, [id, data]);

    return (
        // <div id={id} style={{ width: "350px", height: "200px",marginBottom:"20px"  }}>
        (<div>
            <Box id={id} style={{ 
                width: width ? width : '100%', 
                height: height ? height : '250px',
                marginBottom: '20px',
            }}>
                {name && <p className='fs-14'><strong>{name}</strong></p>}
            </Box>
        </div>)
    );
}
export default Donut;