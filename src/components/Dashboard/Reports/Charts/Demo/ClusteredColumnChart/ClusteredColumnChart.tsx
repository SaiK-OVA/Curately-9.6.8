import { useLayoutEffect } from 'react';
import { am5, am5themes_Animated, initializeChart } from '../../../../../../shared/modules/AM5Charts/AM5Chart';
import am5xy from '../../../../../../shared/modules/AM5Charts/AM5XY';
import { CircularProgress } from '../../../../../../shared/modules/MaterialImports/CircularProgress';

const ClusteredColumnChart = ({ id, name, height, width, data, labels, loading = false }: {
    id: string, name: string, height: string, width: string, loading: boolean, data: {
        year: string,
        value1: number,
        value2: number,
        value3: number,
        value4?: number,
    }[], labels: string[]
}) => {
    useLayoutEffect(() => {
        if (loading) return;
        let root = initializeChart({ id });

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        let chart = root.container.children.push(am5xy.XYChart.new(root, {
            // panX: false,
            // panY: false,
            // paddingLeft: 0,
            // wheelX: "panX",
            // wheelY: "zoomX",
            layout: root.verticalLayout
        }));


        // Add legend
        // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
        let legend = chart.children.push(
            am5.Legend.new(root, {
                centerX: am5.p50,
                x: am5.p50
            })
        );

        // let data = [{
        //     year: "Year1",
        //     growth: 30,
        //     expansion: 50,
        //     rebate: 5,
        // }, {
        //     year: "Year2",
        //     growth: 70,
        //     expansion: 90,
        //     rebate: 10,

        // }, {
        //     year: "Year3",
        //     growth: 90,
        //     expansion: 95,
        //     rebate: 30,

        // }]


        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xRenderer = am5xy.AxisRendererX.new(root, {
            cellStartLocation: 0.1,
            cellEndLocation: 0.9,
            minorGridEnabled: true,
            minGridDistance: 10
        });

        let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "year",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        xRenderer.grid.template.setAll({
            location: 1,
        });

        xAxis.data.setAll(data);

        let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1,
                minGridDistance:10,
            }),
            min: 0,
            maxPrecision: 0,
        }));


        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        function makeSeries(name: any, fieldName: any) {
            let series = chart.series.push(am5xy.ColumnSeries.new(root, {
                name: name,
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: fieldName,
                categoryXField: "year"
            }));

            series.columns.template.setAll({
                tooltipText: "{name}, {categoryX}:{valueY}",
                width: am5.percent(90),
                tooltipY: 0,
                strokeOpacity: 0
            });

            series.data.setAll(data);

            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear();

            series.bullets.push(function () {
                return am5.Bullet.new(root, {
                    locationY: 0,
                    sprite: am5.Label.new(root, {
                        
                        text: "{valueY}",
                        fill: root.interfaceColors.get("alternativeText"),
                        centerY: 0,
                        centerX: am5.p50,
                        populateText: true
                    })
                });
            });

            legend.data.push(series);
        }

        makeSeries(labels[0], "value1");
        makeSeries(labels[1], "value2");
        makeSeries(labels[2], "value3");



        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        chart.appear(1000, 100);

        return () => {
            root.dispose();
        };
    }, [data, loading]);

    return (
        <div id={id} className="chart-container">
            {loading && (
                <div className="loading-spinner">
                    <CircularProgress />
                </div>
            )}
            {name && <p className="chart-title"><strong>{name}</strong></p>}
        </div>
    );
}
export default ClusteredColumnChart;