import  {React, useState, useEffect } from '../../../../../shared/modules/React';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { Tab, Tabs } from '../../../../../shared/modules/MaterialImports/Tabs';
import ClusteredColumnChart from '../Demo/ClusteredColumnChart/ClusteredColumnChart';
import StackedBarChart from '../Demo/StackedBarChart/StackedBarChart';

import { StackedCostManager, StackedCostBU, StackedCostJob, StackedYOYData, StackedYOYData1, StackedCostManager1, StackedCostBU1, StackedCostJob1 } from '../GraphData';
import { Grid } from '../../../../../shared/modules/commonImports';
import './ExecutiveInsights.scss';
import { Card, CardContent } from '../../../../../shared/modules/MaterialImports/Card';
import RefreshIcon from '@mui/icons-material/Refresh';
import {Tooltip} from '../../../../../shared/modules/MaterialImports/ToolTip';
import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';

const ExecutiveInsights = () => {
    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    interface YOYStaring {
        year: string,
        growth: number,
        expansion: number,
        rebate: number,
    }[]

    function CustomTabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
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

    const [listReportData, setListReportData] = useState(0);
    const [listBUReportData, setListBUReportData] = useState(0);
    const [listCTReportData, setListCTReportData] = useState(0);
    const [listYOYReportData, setListYOYReportData] = useState(0);

    let dataReportYOY = (listYOYReportData !== 0) ? StackedYOYData : StackedYOYData1
    let dataReportCostManager = (listReportData !== 0) ? StackedCostManager : StackedCostManager1
    let dataReportCostBU = (listBUReportData !== 0) ? StackedCostBU : StackedCostBU1
    let dataReportCostJob = (listCTReportData !== 0) ? StackedCostJob : StackedCostJob1

    const getReportYOYJsonData = () => {
        let RndID = (listYOYReportData !== 0) ? 0 : 1;
        setListYOYReportData(RndID);

    }

    const getReportJsonData = () => {
        let RndID = (listReportData !== 0) ? 0 : 1;
        setListReportData(RndID);

    }
    const getBUReportJsonData = () => {
        let RndID = (listBUReportData !== 0) ? 0 : 1;
        setListBUReportData(RndID);

    }

    const getCTReportJsonData = () => {
        let RndID = (listCTReportData !== 0) ? 0 : 1;
        setListCTReportData(RndID);

    }

    let data = [{
        year: "Year1",
        growth: 30,
        expansion: 20,
        rebate: 5,
    }, {
        year: "Year2",
        growth: 70,
        expansion: 40,
        rebate: 10,

    }, {
        year: "Year3",
        growth: 90,
        expansion: 15,
        rebate: 30,

    }];

    useEffect(() => {
        // setListYOYSaving_Report(data);
        // console.log("graphDataSaveJob");
        // console.log(graphDataSaveJob);
        // SetGraphDataManager(StackedCostManager);
    }, []);



    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div id="executiveInsights">

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Overview" />
                        {/* <Tab label="YOY Savings" /> */}
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>

                    <div>
                        <Grid container spacing={2} className='ml-2'>
                            <div className='sourcingHeader'>
                                <h4 className='content'>Executive Insights</h4>
                            </div>
                        </Grid>
                    </div>

                    <Grid container spacing={1} className='ml-2 mr-4'>
                        <Grid size={2} className=' mr-4'>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>New Community Members</h3>
                                    </div>
                                    <p className='hrs'>25.2K</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>11.6K</span>
                                        <span>(+10%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={2} className=' mr-4'>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Jobs Published</h3>
                                    </div>
                                    <p className='hrs'>71</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>62</span>
                                        <span>(+10%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={2} className=' mr-4'>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Total Positions</h3>
                                    </div>
                                    <p className='hrs'>90</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>76</span>
                                        <span>(+14%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={2} className=' mr-4'>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Fulfillment</h3>
                                    </div>
                                    <p className='hrs'>82%</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>77</span>
                                        <span>(10%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={2}>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Submission to Hires</h3>
                                    </div>
                                    <p className='hrs'>3.4:1</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>4.5.1</span>
                                        <span>(10%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} className='ml-1 mr-4 px-4'>
                        <Grid size={4} >
                            <Card>

                                <Stack
                                    direction="row"
                                    className="customCard px-4 py-2"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Typography variant="h6" className="header">
                                        Cost Savings By Job
                                    </Typography>
                                    <Stack direction="row" className="btn-container" spacing={2}>
                                        <Tooltip title="Refresh">
                                            <span><RefreshIcon
                                                sx={{ color: '#7f7f7f' }}
                                                className="cursor-pointer"
                                                onClick={() => getReportJsonData()}
                                            />
                                            </span>
                                        </Tooltip>
                                    </Stack>
                                </Stack>

                                <CardContent>
                                    <StackedBarChart
                                        id={"stackChart"}
                                        colors={['#082CCE', '#A49DEE']}
                                        colorLabels={['Registered', 'Invited']}
                                        name="Cost Savings By Job"
                                        data={dataReportCostJob}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Card>
                                <Stack
                                    direction="row"
                                    className="customCard px-4 py-2"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Typography variant="h6" className="header">
                                        Cost Savings By Business Unit
                                    </Typography>
                                    <Stack direction="row" className="btn-container" spacing={2}>


                                        <Tooltip title="Refresh">
                                            <span><RefreshIcon
                                                sx={{ color: '#7f7f7f' }}
                                                className="cursor-pointer"
                                                onClick={() => getBUReportJsonData()}
                                            />
                                            </span>
                                        </Tooltip>
                                    </Stack>
                                </Stack>
                                <CardContent>
                                    <StackedBarChart
                                        id="ChartBar"
                                        colors={['#082CCE', '#EE8355']}
                                        colorLabels={['Registered', 'Invited']}
                                        name="Cost Savings By Business Unit"
                                        data={dataReportCostBU}
                                    />

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={4}>
                            <Card>
                                <Stack
                                    direction="row"
                                    className="customCard px-4 py-2"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Typography variant="h6" className="header">
                                        Cost Savings By Manager
                                    </Typography>
                                    <Stack direction="row" className="btn-container" spacing={2}>


                                        <Tooltip title="Refresh">
                                            <span><RefreshIcon
                                                sx={{ color: '#7f7f7f' }}
                                                className="cursor-pointer"
                                                onClick={() => getCTReportJsonData()}
                                            />
                                            </span>
                                        </Tooltip>
                                    </Stack>
                                </Stack>
                                <CardContent>
                                    <StackedBarChart
                                        id="ChartBar1"
                                        colors={['#082CCE', '#8FBAF0']}
                                        colorLabels={['Registered', 'Invited']}
                                        name="Cost Savings By Manager"
                                        data={dataReportCostManager}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                </CustomTabPanel>
                {/* <CustomTabPanel value={value} index={1}>
                    <Grid container spacing={2}>
                        <Grid size={4} >
                            <Card>
                                <Stack
                                    direction="row"
                                    className="customCard px-4 py-2"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <Typography variant="h6" className="header">
                                        Y O Y Savings Report
                                    </Typography>
                                    <Stack direction="row" className="btn-container" spacing={2}>

                                        <Tooltip title="Refresh">
                                            <span><RefreshIcon
                                                sx={{ color: '#7f7f7f' }}
                                                className="cursor-pointer"
                                                onClick={() => getReportYOYJsonData()}
                                            />
                                            </span>
                                        </Tooltip>
                                    </Stack>
                                </Stack>
                                <CardContent>

                                    <ClusteredColumnChart name="Y O Y Savings Report" id={"cls1"} height={'200px'} width={"98%"} data={dataReportYOY} labels={['Growth', 'Expansion', 'Rebate']}/>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CustomTabPanel> */}
            </Box>
        </div>
    );

}

export default React.memo(ExecutiveInsights);