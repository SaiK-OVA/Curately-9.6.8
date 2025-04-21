import { Grid } from "../../../../../shared/modules/commonImports";
import {Tabs,Tab} from '../../../../../shared/modules/MaterialImports/Tabs';
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';
import {Box} from '../../../../../shared/modules/MaterialImports/Box';
import {React} from "../../../../../shared/modules/React";
import ColumnWithRotatedLabel from "./ColumnWithRotatedLabel/ColumnWithRotatedLabel";
import PieChart from "./PieChart/PieChart";
import Donut from "./Donut/Donut";
import StackedColumnChart from "./StackedColumnChart/StackedColumnChart";
import ClusteredColumnChart from "./ClusteredColumnChart/ClusteredColumnChart";
import Comparing from "./Comparing/Comparing";
import USHeat from "./USHeat/USHeat";
import FunnelChart from "./FunnelChart/FunnelChart";
import TrendLines from "./TrendLines/TrendLines";
import ClusteredBarChart from "./ClusteredBarChart/ClusteredBarChart";
import GroupedSortedColumns from "./GroupedSortedColumns/GroupedSortedColumns";
import HeatMap from "./HeatMap/HeatMap";
import MultipleValueAxes from "./MultipleValueAxes/MultipleValueAxes";
import StackedBarChart from "./StackedBarChart/StackedBarChart";

const Demo = () => {
    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div id="Demo">

            <Typography variant="h6" >Charts Demo</Typography>

            <Grid container className="customCard p-0 filterExpand-grid mt-4" >

                {/* <Grid sx={{ width: 310, overflow: 'hidden', opacity: 1 }}> */}
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 700 }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Column with Rotated Labels" />
                        <Tab label="US Heat(Choropleth) Map" />
                        <Tab label="Stacked Bar Chart" />
                        <Tab label="Comparing Different Date Values Google Analytics Style" />
                        <Tab label="Pie Chart" />
                        <Tab label="Clustered Column Chart" />
                        <Tab label="Donut chart" />
                        <Tab label="100% Stacked Column Chart" />
                        <Tab label="Heat map with legend" />
                        <Tab label="Multiple value Axes" />
                        <Tab label="Bar chart" />
                        <Tab label="Grouped and Sorted Columns" />
                        <Tab label="Clustered Bar Chart" />
                        <Tab label="Trend Lines" />
                        <Tab label="Funnel Chart" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <ColumnWithRotatedLabel id={"ColumnWithRotatedLabel"} height={'200px'} width={'531px'} colors={'0D2AAB'} heading="New Members by Month" data={[]} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <USHeat id={"USHeat"} data={[]}/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <StackedBarChart id={"StackedBarChart"} data={[]} />                      
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Comparing id={"Comparing"} data={[]}/>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <PieChart id={"PieChart"} data={[]} />
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <ClusteredColumnChart id={'ClusteredColumnChart'} name="Y O Y Savings Report" height={'200px'} width={"98%"} data={[]}/>
                    </TabPanel>
                    <TabPanel value={value} index={6}>
                        <Donut id={"Donut"} data={[]} />
                    </TabPanel>
                    <TabPanel value={value} index={7}>
                        <StackedColumnChart id="StackedColumnChart" data={[]} />
                    </TabPanel>
                    
                    <TabPanel value={value} index={8}>
                        <HeatMap id={"HeatMap"} data={[]}/>
                    </TabPanel>
                    <TabPanel value={value} index={9}>
                        <MultipleValueAxes height={'240px'}  width ={'336px'} heading={'TurnAroundTime for Each Stage'}/>
                    </TabPanel>
                    <TabPanel value={value} index={10}>
                    <StackedBarChart id={"StackedBarChart"} data={[]}/>
                    </TabPanel>
                    <TabPanel value={value} index={11}>
                        <GroupedSortedColumns data={[]} id={"GroupedSortedColumns"}/>
                    </TabPanel>
                    <TabPanel value={value} index={12}>
                        <ClusteredBarChart name="Offer declining reason" height={"200px"} width={'350px'} data={[]}/>
                    </TabPanel>
                    <TabPanel value={value} index={13}>
                        <TrendLines/>
                    </TabPanel>
                     <TabPanel value={value} index={14}>
                        <FunnelChart id={"Funnel"} data={[]}/>
                    </TabPanel>                
                </Box>
                {/* <ul>
                        <li>Column with Rotated Labels</li>
                        <li>Animated Time-Line Pie Chart</li>
                        <li>US Heat(Choropleth) Map</li>
                        <li>Stacked Bar Chart</li>
                        <li>Comparing Different Date Values Google Analytics Style</li>
                        <PieChart />
                        <li>Clustered Column Chart</li>
                        <li>Donut chart</li>
                        <li>100% Stacked Column Chart</li>
                        <li>Heat map with legend</li>
                        <li>Multiple value Axes</li>
                        <li>Bar chart</li>
                        <li>Table</li>
                        <li>Grouped and Sorted Columns</li>
                        <li>Clustered Bar Chart</li>
                        <li>Trend Lines</li>
                        <li>Funnel Chart</li>
                    </ul> */}
            </Grid>
            {/* <Grid sx={{ width: 'calc(100% - 310px)' }}>
                    Full screen
                </Grid> */}
            {/* </Grid> */}
        </div>
    )
}
export default Demo;