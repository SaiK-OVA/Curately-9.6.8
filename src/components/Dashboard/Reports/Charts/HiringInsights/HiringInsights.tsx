import React from 'react'
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { Tab, Tabs } from '../../../../../shared/modules/MaterialImports/Tabs';
import { Card } from '../../../../../shared/modules/MaterialImports/Card';
import Donut from '../Demo/Donut/Donut';
import ClusteredBarChart from '../Demo/ClusteredBarChart/ClusteredBarChart';
import GroupedSortedColumns from '../Demo/GroupedSortedColumns/GroupedSortedColumns';
import { Grid, TextField } from '../../../../../shared/modules/commonImports';
import StackedColumnChart from '../Demo/StackedColumnChart/StackedColumnChart';
import HeatMap from '../Demo/HeatMap/HeatMap';
import ClusteredColumnChart from '../Demo/ClusteredColumnChart/ClusteredColumnChart';
import Comparing from '../Demo/Comparing/Comparing';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import StackedBarChart from '../Demo/StackedBarChart/StackedBarChart';
import TrendLines from '../Demo/TrendLines/TrendLines';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './HiringInsights.scss'



const HiringInsights = () => {
    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const hiredCandidatesData = [{ value: 29, category: "Campus" },
    { value: 25, category: "Lateral" },
    { value: 20, category: "LinkedIn" },
    { value: 19, category: "Refferal" },
    { value: 5, category: "Other" }]

    const donutData = [
        { value: 74, category: "Accepted" },
        { value: 26, category: "Rejected" }
    ]
    const vacancyTrend = [{
        date: new Date(2023, 1, 22).getTime(),
        value1: 50,
        value2: 30,
        previousDate: "2023-01-22"
    }, {
        date: new Date(2023, 2, 22).getTime(),
        value1: 25,
        value2: 40,
        previousDate: "2023-02-22"
        //Aug 2023
    }, {
        date: new Date(2023, 3, 22).getTime(),
        value1: 40,
        value2: 15,
        previousDate: "2023-03-22"
    }, {
        date: new Date(2023, 4, 22).getTime(),
        value1: 35,
        value2: 60,
        previousDate: "2023-4-22"
    }, {
        date: new Date(2023, 5, 22).getTime(),
        value1: 55,
        value2: 40,
        previousDate: "2023-5-22"
    }, {
        date: new Date(2023, 6, 22).getTime(),
        value1: 60,
        value2: 20,
        previousDate: "2023-6-22"
    }]


    const jobRolesData = [
        {
            "year": "DA",
            "male": 30,
            "female": 20,
            "other": 4,

        }, {
            "year": "SA",
            "male": 40,
            "female": 15,
            "other": 6,
        }, {
            "year": "Associate",
            "male": 15,
            "female": 20,
            "other": 2,
        }, {
            "year": "HRBP",
            "male": 60,
            "female": 25,
            "other": 8,
        }, {
            "year": "DE",
            "male": 40,
            "female": 23,
            "other": 9,
        }
    ]

    const hiredData = [
        {
            label: "Community colleges",
            value1: 60.75,
            value2: 0,
        },
        {
            label: "Liberal arts and colleges",
            value1: 60.75,
            value2: 0,

        }, {
            label: "Technical Schools",
            value1: 59.48,
            value2: 0,

        },
        {
            label: "IVY Leage University",
            value1: 60.32,
            value2: 0,

        },
        {
            label: "Private University",
            value1: 62.10,
            value2: 0,

        },
        {
            label: "Public University",
            value1: 58.1,
            value2: 0,

        }]


    const ageData = [{
        year: "18-22",
        value1: 30,
        value2: 23,
        value3: 5,
    }, {
        year: "23-27",
        value1: 40,
        value2: 23,
        value3: 10,

    }, {
        year: "28-32",
        value1: 15,
        value2: 40,
        value3: 30,

    }, {
        year: "33-37",
        value1: 90,
        value2: 21,
        value3: 30,

    }, {
        year: "38-45",
        value1: 40,
        value2: 32,
        value3: 30,

    }, {
        year: "45+",
        value1: 25,
        value2: 15,
        value3: 30,

    }]

    const progressData = [{ value: 29, category: "Campus" },
    { value: 30, category: "Candidates Under Review" },
    { value: 20, category: "Initial Contact" },
    { value: 20, category: "Cleared Tech round" },
    { value: 20, category: "Cleared HR round" },
    { value: 5, category: "Onboarding process" }]

    const decliningData = [{
        percent: "Reason 1",
        male: 30,
        female: 27,
        other: 5
    }, {
        percent: "Reason 2",
        male: 40,
        female: 45,
        other: 3
    }, {
        percent: "Reason 3",
        male: 15,
        female: 16,
        other: 2
    }, {
        percent: "Reason 4",
        male: 60,
        female: 61,
        other: 2
    }, {
        percent: "Reason 5",
        male: 40,
        female: 32,
        other: 6
    }]

    let HeatMapData = {
        yAxisCategoryField: "weekday",
        xAxisCategoryField: "hour",
        seriesStrokeColor: '#ffffff',
        seriesRulesMin: '#E6E6FA',
        seriesRulesMax: '#3264a8',
        yAxisData: [
            { weekday: "18-22" },
            { weekday: "23-27" },
            { weekday: "28-32" },
            { weekday: "33-37" },
            { weekday: "45+" },
        ],
        xAxisData: [
            { hour: "<$50k" },
            { hour: "$51k-$100k" },
            { hour: "$101k-$200k" },
            { hour: "$201k-$300k" },
            { hour: "$301k+" },
        ],
        displayData: [
            {
                hour: "<$50k",
                weekday: "18-22",
                value: 4
            }, {
                hour: "$51k-$100k",
                weekday: "18-22",
                value: 11
            }, {
                hour: "$101k-$200k",
                weekday: "18-22",
                value: 5
            }, {
                hour: "$201k-$300k",
                weekday: "18-22",
                value: 12
            }, {
                hour: "$301k+",
                weekday: "18-22",
                value: 3
            }, {
                hour: "<$50k",
                weekday: "23-27",
                value: 6
            }, {
                hour: "$51k-$100k",
                weekday: "23-27",
                value: 5
            }, {
                hour: "$101k-$200k",
                weekday: "23-27",
                value: 14
            }, {
                hour: "$201k-$300k",
                weekday: "23-27",
                value: 17
            }, {
                hour: "$301k+",
                weekday: "23-27",
                value: 9
            }, {
                hour: "<$50k",
                weekday: "28-32",
                value: 11
            }, {
                hour: "$51k-$100k",
                weekday: "28-32",
                value: 21
            }, {
                hour: "$101k-$200k",
                weekday: "28-32",
                value: 15
            }, {
                hour: "$201k-$300k",
                weekday: "28-32",
                value: 25
            }, {
                hour: "$301k+",
                weekday: "28-32",
                value: 15
            }, {
                hour: "<$50k",
                weekday: "33-37",
                value: 6
            }, {
                hour: "$51k-$100k",
                weekday: "33-37",
                value: 12
            }, {
                hour: "$101k-$200k",
                weekday: "33-37",
                value: 23
            }, {
                hour: "$201k-$300k",
                weekday: "33-37",
                value: 5
            }, {
                hour: "$301k+",
                weekday: "33-37",
                value: 23
            }, {
                hour: "<$50k",
                weekday: "45+",
                value: 2
            }, {
                hour: "$51k-$100k",
                weekday: "45+",
                value: 5
            }, {
                hour: "$101k-$200k",
                weekday: "45+",
                value: 4
            }, {
                hour: "$201k-$300k",
                weekday: "45+",
                value: 2
            }, {
                hour: "$301k+",
                weekday: "45+",
                value: 2
            }
        ]
    }

    const size = {
        width: "450px", height: "200px", marginBottom: "20px"
    }
    const stageData = [
        {
            date: new Date(2024, 1).getTime(),
            value: 8
        },
        {
            date: new Date(2024, 2).getTime(),
            value: 10
        },
        {
            date: new Date(2024, 3).getTime(),
            value: 12
        },
        {
            date: new Date(2024, 4).getTime(),
            value: 14
        },
        {
            date: new Date(2024, 5).getTime(),
            value: 11
        },
        {
            date: new Date(2024, 6).getTime(),
            value: 6
        },
        {
            date: new Date(2024, 7).getTime(),
            value: 7
        },
    ];

    const filledRolesData =
        [{
            label: "Engineering",
            value1: 60.75,
            value2: 39.28,

        }, {
            label: "Operations",
            value1: 59.48,
            value2: 40.56,

        },
        {
            label: "IT",
            value1: 60.32,
            value2: 39.68,

        },
        {
            label: "Admin",
            value1: 62.10,
            value2: 37.90,

        },
        {
            label: "Marketing",
            value1: 58.1,
            value2: 41.87,

        }]

    const hiringData = {
        "Finance": {
            "White": 50,
            "Blacks": 25,
            "SouthEastAsians": 5,
            "Others": 20,
            quantity: 100
        },
        "Marketing": {
            "White": 25,
            "Blacks": 30,
            "SouthEastAsians": 43,
            "Others": 7,
            quantity: 120
        },
        "HR": {
            "White": 40,
            "Blacks": 50,
            "SouthEastAsians": 22,
            "Others": 8,
            quantity: 150
        },
        "Operations": {
            "White": 35,
            "Blacks": 20,
            "SouthEastAsians": 43,
            "Others": 9,
            quantity: 100
        },
        "Sales": {
            "White": 55,
            "Blacks": 15,
            "SouthEastAsians": 30,
            "Others": 11,
            quantity: 80
        },
        "Engineering": {
            "White": 60,
            "Blacks": 30,
            "SouthEastAsians": 33,
            "Others": 7,
            quantity: 200
        },
        "Data Science": {
            "White": 23,
            "Blacks": 34,
            "SouthEastAsians": 32,
            "Others": 3,
            quantity: 150
        }
    };
    return (
        <div id="hiringInsights">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Screen1" />
                        <Tab label="In Progress" />
                        <Tab label="Race & Ethnicity" />
                    </Tabs>
                </Box>
                <Box sx={{ flexGrow: 1, marginTop: "15px" }}>
                    <Grid container spacing={2}>
                        <Grid size={3}>

                            <label className='inputLabel'>Department</label>
                            <TextField fullWidth className='mt-1'
                                size="small"
                                id="Department"
                                name='Department'
                                variant="outlined"
                                select
                                label="Data Science"
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="IT">IT</MenuItem>
                                <MenuItem value="HR">HR</MenuItem>
                                <MenuItem value="Data Science">Data Science</MenuItem>
                                <MenuItem value="Data Engineering">Data Engineering</MenuItem>
                            </TextField>

                        </Grid>

                        <Grid size={3}>
                            <label className='inputLabel'>Job Role</label>
                            <TextField fullWidth className='mt-1'
                                size="small"
                                id="Job Role"
                                name='Job Role'
                                variant="outlined"
                                select
                                label="Associates"
                            >
                                <MenuItem value="Associates">Associates</MenuItem>
                                <MenuItem value="Senior Associates">Senior Associates</MenuItem>
                                <MenuItem value="Data Scientist">Data Scientist</MenuItem>
                                <MenuItem value="Data Analyst ">Data Analyst </MenuItem>
                                <MenuItem value="HRBP">HRBP</MenuItem>
                                <MenuItem value="Data Engineer">Data Engineer</MenuItem>
                                <MenuItem value="All">All</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={2}>
                            <label className='inputLabel'>Recruiter</label>
                            <TextField fullWidth className='mt-1'
                                size="small"
                                id="Recruiter"
                                name='Recruiter'
                                variant="outlined"
                                select
                                label="All"
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Samantha">Samantha</MenuItem>
                                <MenuItem value="Claire">Claire</MenuItem>
                                <MenuItem value="Samuel">Samuel</MenuItem>
                                <MenuItem value="Max">Max</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={2}>
                            <label className='inputLabel'>Location</label>
                            <TextField fullWidth className='mt-1'
                                size="small"
                                id="Location"
                                name='Location'
                                variant="outlined"
                                select
                                label="All"
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="United States">United States</MenuItem>
                                <MenuItem value="United Kingdom">United Kingdom</MenuItem>
                                <MenuItem value="Europe">Europe</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={2}>
                            <label className='inputLabel'>Type</label>
                            <TextField fullWidth className='mt-1'
                                size="small"
                                id="Type"
                                name='Type'
                                variant="outlined"
                                select
                                label="All"
                            >
                                <MenuItem value="All">All</MenuItem>
                                <MenuItem value="Campus">Campus</MenuItem>
                                <MenuItem value="Lateral">Lateral</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
                    <Grid container spacing={2} sx={{ marginLeft: "5px" }}>
                        <Grid size={1.5}>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Jobs</h3>
                                    </div>
                                    <p className='hrs'>752</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>792</span>
                                        <span>(-5%)</span>
                                    </div>
                                </div>
                            </div>

                        </Grid>
                        <Grid size={1.5}>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Applications</h3>
                                    </div>
                                    <p className='hrs'>2.3K</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>2.1K</span>
                                        <span>(+8.6%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={2}>
                            {/* <Item>Shortlisted candidates<br></br>
                                <b>1.3K</b><br></br>
                                vs prev=1.4K(-7.6%)</Item> */}
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Shortlisted candidates</h3>
                                    </div>
                                    <p className='hrs'>1.3K</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>1.4K</span>
                                        <span>(-7.6%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={1.5}>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Assessment Phase</h3>
                                    </div>
                                    <p className='hrs'>1.3K</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>217</span>
                                        <span>(+8.2%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={1.5}>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Interview Phase</h3>
                                    </div>
                                    <p className='hrs'>138</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>145</span>
                                        <span>(-5.0)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={1.5}>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Offered</h3>
                                    </div>
                                    <p className='hrs'>78</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>54</span>
                                        <span>(+30.7%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={2}>
                            <div className='data'>
                                <div className='avg'>
                                    <div className='response'>
                                        <h3>Hired</h3>
                                    </div>
                                    <p className='hrs'>78</p>
                                    <div className='prev'>
                                        <span>vs prev = </span>
                                        <span>38</span>
                                        <span>(-13.1%)</span>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={3.5}>
                                <Card className='customCard  mt-5'>
                                    <Donut 
                                    id="chartdiv" 
                                    name="Hired Candidates By Source" 
                                    data={hiredCandidatesData} 
                                    />
                                </Card>
                            </Grid>
                            <Grid size={4.5}>
                                <Card className='customCard  mt-5'>
                                    <Comparing 
                                        id="comparing" 
                                        name="Hiring to Vacancy Trend" 
                                        data={vacancyTrend} 
                                        dateformat='yyyy-MM'
                                        height='270px'
                                    />
                                </Card>
                            </Grid>
                            <Grid size={4}>
                                <Card className='customCard  mt-5'>
                                    <StackedColumnChart name="Hired by Job Roles" size = {{width: "450px", height: "250px", marginBottom: "20px"}} id="StackedColumnChart" data={jobRolesData} />
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid size={3.5}>
                                <Card className='customCard  mt-5'>
                                    <StackedBarChart
                                        id="ChartBar1"
                                        name="Hired"
                                        colors={['#082CCE', '#082CCE']}
                                        colorLabels={['Registered', 'Invited']}
                                        data={hiredData} />
                                </Card>
                            </Grid>
                            <Grid size={4.5}>
                                <Card className='customCard  mt-5'>
                                    <HeatMap
                                        id={"heatChart"}
                                        size={{width: "450px", height: "240px", marginBottom: "20px"}}
                                        name="Salary distribution by Experience for hired candidates"
                                        chartDataPassed={HeatMapData} />
                                </Card>
                            </Grid>
                            <Grid size={4}>
                                <Card className='customCard  mt-5'>
                                    <ClusteredColumnChart id={"cls"} height={'240px'} width={"98%"} name="Hired by Age Bracket" data={ageData} labels={['Growth', 'Expansion', 'Rebate']}/>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={4}>
                                <Card className='customCard  mt-5'>
                                    <Donut id="progress" name="Progress Distribution" data={progressData} height='220px'/>
                                </Card>
                            </Grid>
                            <Grid size={4}>
                                <Card className='customCard  mt-5'>
                                    <ClusteredBarChart name="Offer declining reason" height={"220px"} width={'350px'} data={decliningData} />
                                </Card>
                            </Grid>
                            <Grid size={4}>
                                <Card className='customCard  mt-5'>
                                    <TrendLines id="AroundTime" name="TurnAroundTime for Each Stage" data={stageData} dateformat='yyyy-MM-dd' height='240px'/>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid size={4}>
                                <Card className='customCard  mt-5'>
                                    <StackedBarChart
                                        id="ChartBar1"
                                        colors={['#082CCE', '#A49DEE']}
                                        colorLabels={['Registered', 'Invited']}
                                        name="Filled roles to Vacancies"
                                        data={filledRolesData} />
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>

                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid size={3}>
                                <Card className='customCard  mt-5'>
                                    <Donut id="chartdiv1" name="Acceptance Rate - White" data={donutData} />
                                </Card>
                            </Grid>
                            <Grid size={3}>
                                <Card className='customCard  mt-5'>
                                    <Donut name="Acceptance Rate - Black" id="chartdiv2" data={donutData} />
                                </Card>
                            </Grid>
                            <Grid size={3}>
                                <Card className='customCard  mt-5'>
                                    <Donut id="chartdiv3" name="Acceptance Rate - South East Asians" data={donutData} />
                                </Card>
                            </Grid>

                            <Grid size={3}>
                                <Card className='customCard  mt-5'>
                                    <Donut id="chartdiv4" name="Acceptance Rate - Others" data={[{ value: 70, category: "Accepted" },
                                    { value: 30, category: "Rejected" },

                                    ]} />
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Card className='customCard mt-5'>
                                    <GroupedSortedColumns heading="Hiring - Accepted Candidates by Department and Ethnicity" data={hiringData} id={"groupData"}/>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>

                </CustomTabPanel>

            </Box>
        </div>
    );

}

export default React.memo(HiringInsights);