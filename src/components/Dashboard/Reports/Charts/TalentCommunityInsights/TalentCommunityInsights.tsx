import {React, useState } from '../../../../../shared/modules/React';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Tab } from '../../../../../shared/modules/MaterialImports/Tabs';
import { Grid } from '../../../../../shared/modules/commonImports';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Menu, MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import Donut from '../Demo/Donut/Donut';
import { Card, CardContent } from '../../../../../shared/modules/MaterialImports/Card';
import './TalentCommunityInsights.scss'
import { TextField } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import USHeat from '../Demo/USHeat/USHeat';
import StackedBarChart from '../Demo/StackedBarChart/StackedBarChart';
import "./TalentCommunityInsights.scss";
import Comparing from '../Demo/Comparing/Comparing';
import PieChart from '../Demo/PieChart/PieChart';
import ApiService from '../../../../../shared/api/api';
import { userLocalData } from '../../../../../shared/services/userData';


import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import CandidateModal from '../CandidateModal/CandidateModal';

interface HourData {
  Hour: string;
  New: number;
}

interface DayData {
  Day: string;
  New: number;
  Hours: HourData[];
}

interface MonthData {
  Month: string;
  Year: string;
  New: number;
  Days: DayData[];
}

const TalentCommunityInsights = () => {
  const [value, setValue] = React.useState('1');
  const [newMembersData, setNewMembersData] = React.useState<any>([]);
  const [canSourceData, setCanSourceData] = React.useState<any>([]);
  const [byLocationData, setByLocation] = React.useState<any>([]);
  const [StackedSourcedData, setStackedSourcedData] = React.useState<any>([]);
  const [StackedJobTitltData, setStackedJobTitltData] = React.useState<any>([]);
  const [StackedLocationData, setStackedLocationData] = React.useState<any>([]);



  const [chartData, setChartData] = React.useState<MonthData[]>([]);
  const [currentLevel, setCurrentLevel] = React.useState<'month' | 'day' | 'hour'>('month');
  const [currentData, setCurrentData] = React.useState<{ category: string; value: number }[]>([]);
  const [drillStack, setDrillStack] = React.useState<{ level: 'month' | 'day' | 'hour', data: { category: string; value: number }[] }[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuPosition, setMenuPosition] = React.useState<{ mouseX: number; mouseY: number } | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<{ category: string; value: number } | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const chartRef = React.useRef<HTMLDivElement>(null);
  const chartInstanceRef = React.useRef<am5xy.XYChart | null>(null);


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    // padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const size = {
    width: "350px", height: "220px", marginBottom: "20px"
  }
  // const StackedSourcedData = [
  //   {
  //     year: "Referral",
  //     registered: 59.85,
  //     invited: 40.15,

  //   }, {
  //     year: "People Directory",
  //     registered: 60.75,
  //     invited: 39.28,

  //   }, {
  //     year: "Carrer Builder",
  //     registered: 59.48,
  //     invited: 40.56,

  //   },
  //   {
  //     year: "Monster",
  //     registered: 60.32,
  //     invited: 39.68,

  //   },
  //   {
  //     year: "Indeed",
  //     registered: 62.10,
  //     invited: 37.90,

  //   },
  //   {
  //     year: "LinkedIn",
  //     registered: 58.1,
  //     invited: 41.87,

  //   }

  // ]
  // const StackedJobTitltData = [
  //   {
  //     year: "Bussiness Analyst",
  //     registered: 60.75,
  //     invited: 39.28,

  //   }, {
  //     year: "Bussiness Analyst/M",
  //     registered: 59.48,
  //     invited: 40.56,

  //   },
  //   {
  //     year: "Project Cooridinator",
  //     registered: 60.32,
  //     invited: 39.68,

  //   },
  //   {
  //     year: "Project Manager",
  //     registered: 62.10,
  //     invited: 37.90,

  //   },
  //   {
  //     year: "Project Manager AD",
  //     registered: 58.1,
  //     invited: 41.87,

  //   }
  // ]
  // const StackedLocationData = [
  //   {
  //     year: "GA",
  //     registered: 60.75,
  //     invited: 39.28,

  //   }, {
  //     year: "PA",
  //     registered: 59.48,
  //     invited: 40.56,

  //   },
  //   {
  //     year: "MA",
  //     registered: 60.32,
  //     invited: 39.68,

  //   },
  //   {
  //     year: "NY",
  //     registered: 62.10,
  //     invited: 37.90,

  //   },
  //   {
  //     year: "NJ",
  //     registered: 58.1,
  //     invited: 41.87,

  //   }
  // ]
  const StackedMatchScoreData = [
    {
      label: "51-60%",
      value1: 60.75,
      value2: 39.28,

    }, {
      label: "61-70%",
      value1: 59.48,
      value2: 40.56,

    },
    {
      label: "71-80%",
      value1: 60.32,
      value2: 39.68,

    },
    {
      label: "81-90%",
      value1: 62.10,
      value2: 37.90,

    },
    {
      label: "Above 90%",
      value1: 58.1,
      value2: 41.87,

    }
  ]
  const stackedRaceData = [
    {
      label: "Black or Africa",
      value1: 60.75,
      value2: 39.28,

    }, {
      label: "White",
      value1: 59.48,
      value2: 40.56,

    },
    {
      label: "Native Hawaiian",
      value1: 60.32,
      value2: 39.68,

    },
    {
      label: "American Indian",
      value1: 62.10,
      value2: 37.90,

    },
    {
      label: "Asian",
      value1: 58.1,
      value2: 41.87,

    }
  ]


  const comparingJob = [
    {
      date: new Date(2023, 7).getTime(),
      value1: 824,
      value2: 1482,
      previousDate: "2023-07"
    }, {
      date: new Date(2023, 8).getTime(),
      value1: 622,
      value2: 1175,
      previousDate: "2023-08"
      //Aug 2023
    }, {
      date: new Date(2023, 9).getTime(),
      value1: 722,
      value2: 1280,
      previousDate: "2023-09"
    }, {
      date: new Date(2023, 10).getTime(),
      value1: 504,
      value2: 991,
      previousDate: "2023-10"
    }, {
      date: new Date(2023, 11).getTime(),
      value1: 416,
      value2: 832,
      previousDate: "2023-11"
    }, {
      date: new Date(2023, 12).getTime(),
      value1: 398,
      value2: 787,
      previousDate: "2023-12"
    }
  ]
  const comparingApplicationData = [
    {
      date: new Date(2023, 7).getTime(),
      value1: 18,
      value2: 835,
      previousDate: "2023-07"
    }, {
      date: new Date(2023, 8).getTime(),
      value1: 22,
      value2: 622,
      previousDate: "2023-08"
      //Aug 2023
    }, {
      date: new Date(2023, 9).getTime(),
      value1: 75,
      value2: 722,
      previousDate: "2023-09"
    }, {
      date: new Date(2023, 10).getTime(),
      value1: 504,
      value2: 991,
      previousDate: "2023-10"
    }, {
      date: new Date(2023, 11).getTime(),
      value1: 16,
      value2: 504,
      previousDate: "2023-11"
    }, {
      date: new Date(2023, 12).getTime(),
      value1: 10,
      value2: 398,
      previousDate: "2023-12"
    }
  ]

  const matchScoreData = [{
    category: "Above 90%",
    value: 501.9
  }, {
    category: "81-90%",
    value: 301.9
  }, {
    category: "71-80%",
    value: 201.1
  }, {
    category: "61-70%",
    value: 165.8
  }, {
    category: "51-60%",
    value: 139.9
  }]

  // const loadNewMembersData = () => {
  // debugger
  //   ApiService.getById(2168095, 'curatelyAdmin/newMembersByMonth', userLocalData.getvalue('clientId')).then(
  //     (response: any) => {
  //       const jsonData = response.data.json;
  //       let data = [];
  //       for (let i = 0; i < jsonData.length; i++) {
  //         data.push({
  //           label: jsonData[i].Month.substring(0, 3) + " " + jsonData[i].Year,
  //           value: jsonData[i].New
  //         })
  //       }
  //       setNewMembersData(data);
  //     }
  //   )
  // }

  const loadCanSourceData = () => {
    ApiService.getById(2168095, 'curatelyAdmin/candidatesBySource', userLocalData.getvalue('clientId')).then(
      (response: any) => {
        const jsonData = response.data.json;
        let data = [];
        for (let i = 0; i < jsonData.length; i++) {
          data.push({
            category: jsonData[i].source,
            value: jsonData[i].CandidateCount
          })
        }
        setCanSourceData(data);
      }
    )
  }

  const loadByLocationData = () => {
    ApiService.getById(2168095, 'curatelyAdmin/byGeographicalLocation', userLocalData.getvalue('clientId')).then(
      (response: any) => {
        const jsonData = response.data.json;
        let data = [];
        for (let i = 0; i < jsonData.length; i++) {
          data.push({
            id: "US-" + jsonData[i].stateName,
            value: jsonData[i].CandidateCount
          })
        }
        setByLocation(data);
      }
    )
  }

  const loadBySourceData = () => {
    ApiService.getById(2168095, 'curatelyAdmin/bySource', userLocalData.getvalue('clientId')).then(
      (response: any) => {
        const jsonData = response.data.json;
        let data = [];
        for (let i = 0; i < jsonData.length; i++) {
          data.push({
            label: jsonData[i].source,
            value1: jsonData[i].Registered,
            value2: jsonData[i].Invited,
          })
        }
        setStackedSourcedData(data);
      }
    )
  }

  const loadByJobTitles = () => {
    ApiService.getById(2168095, 'curatelyAdmin/byJobTitles', userLocalData.getvalue('clientId')).then(
      (response: any) => {
        const jsonData = response.data.json;
        let data = [];
        for (let i = 0; i < jsonData.length; i++) {
          data.push({
            label: jsonData[i].jobTitle,
            value1: jsonData[i].Joined,
            value2: jsonData[i].Pending,
            value3: jsonData[i].New
          })
        }
        setStackedJobTitltData(data);
      }
    )
  }

  const loadByLocations = () => {
    ApiService.getById(2168095, 'curatelyAdmin/byLocations', userLocalData.getvalue('clientId')).then(
      (response: any) => {
        const jsonData = response.data.json;
        // console.log(jsonData)
        let data = [];
        for (let i = 0; i < jsonData.length; i++) {
          data.push({
            label: jsonData[i].stateName,
            value1: jsonData[i].Joined,
            value2: jsonData[i].Pending,
            value3: jsonData[i].New
          })
        }
        setStackedLocationData(data);
      }
    )
  }

  React.useEffect(() => {
    //loadNewMembersData();
    loadCanSourceData();
    loadByLocationData();
    loadBySourceData();
    loadByJobTitles();
    loadByLocations();
    //loadDummyData();
  }, []);

  React.useEffect(() => {
    loadDummyData();
  }, []);

  const loadDummyData = React.useCallback(() => {
    const dummyData: MonthData[] = [
      {
        Month: 'January',
        Year: '2023',
        New: 150,
        Days: [
          {
            Day: '01-01-2023',
            New: 50,
            Hours: [
              { Hour: '00:00', New: 10 },
              { Hour: '01:00', New: 15 },
            ]
          },
          {
            Day: '02-01-2023',
            New: 100,
            Hours: [
              { Hour: '02:00', New: 20 },
              { Hour: '03:00', New: 30 },
            ]
          },
        ]
      },
      {
        Month: 'February',
        Year: '2023',
        New: 200,
        Days: [
          {
            Day: '01-02-2023',
            New: 80,
            Hours: [
              { Hour: '04:00', New: 25 },
              { Hour: '05:00', New: 35 },
            ]
          },
          {
            Day: '02-02-2023',
            New: 120,
            Hours: [
              { Hour: '06:00', New: 40 },
              { Hour: '07:00', New: 50 },
            ]
          },
        ]
      },
    ];
    setChartData(dummyData);
    const initialData = dummyData.map(item => ({
      category: `${item.Month.substring(0, 3)} ${item.Year}`,
      value: item.New
    }));
    setCurrentData(initialData);
  }, []);

  const initializeChart = React.useCallback((data: MonthData[] | DayData[] | HourData[], level: 'month' | 'day' | 'hour') => {
    const newData = data.map(item => ({
      category: level === 'month' ? `${(item as MonthData).Month.substring(0, 3)} ${(item as MonthData).Year}` :
        level === 'day' ? (item as DayData).Day :
          (item as HourData).Hour,
      value: item.New
    }));
    setCurrentData(newData);
  }, []);

  const handleDrillDown = React.useCallback((level: 'day' | 'hour') => {
    setLoading(true);
    setTimeout(() => {
      if (currentLevel === 'month' && level === 'day') {
        setDrillStack(prev => [...prev, { level: 'month', data: currentData }]);
        setCurrentLevel('day');
        initializeChart(chartData.flatMap(m => m.Days), 'day');
      } else if (currentLevel === 'day' && level === 'hour') {
        const selectedDays = chartData.flatMap(m => m.Days).filter(day =>
          currentData.some(data => data.category === day.Day)
        );
        setDrillStack(prev => [...prev, { level: 'day', data: currentData }]);
        setCurrentLevel('hour');
        initializeChart(selectedDays.flatMap(d => d.Hours), 'hour');
      }
      setLoading(false);
    }, 500); // Simulate loading time
  }, [currentLevel, currentData, chartData, initializeChart]);

  const handleDrillUp = React.useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      if (drillStack.length > 0) {
        const previousState = drillStack[drillStack.length - 1];
        setDrillStack(prev => prev.slice(0, -1));
        setCurrentLevel(previousState.level);
        setCurrentData(previousState.data);
      }
      setLoading(false);
    }, 500); // Simulate loading time
  }, [drillStack]);

  const handleColumnClick = React.useCallback((event: any, item: { category: string; value: number }) => {
    event.preventDefault();
    setMenuPosition({ mouseX: event.clientX, mouseY: event.clientY });
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  }, [setMenuPosition, setAnchorEl, setSelectedItem]);

  React.useEffect(() => {
    let root: am5.Root | undefined;
    let chart: am5xy.XYChart | undefined;

    if (chartRef.current && currentData.length > 0) {
      root = am5.Root.new(chartRef.current);
      root.setThemes([am5themes_Animated.new(root)]);

      chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "none",
          wheelY: "none",
          pinchZoomX: false
        })
      );

      const xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "category",
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 })
      }));

      const yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));

      const series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "New Members",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        categoryXField: "category"
      }));

      series.columns.template.setAll({
        tooltipText: "{categoryX}: {valueY}",
        width: am5.percent(90),
        tooltipY: 0,
        cornerRadiusTL: 5,
        cornerRadiusTR: 5
      });

      series.columns.template.events.on("click", (event) => {

        const dataItem = event.target.dataItem;
        if (dataItem) {
          handleColumnClick(event.originalEvent, dataItem.dataContext as { category: string; value: number });
        }
      });

      xAxis.data.setAll(currentData);
      series.data.setAll(currentData);

      chartInstanceRef.current = chart;
    }

    return () => {
      root?.dispose();
    };
  }, [currentData, handleColumnClick]);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
    setMenuPosition(null);
  };
  // const [openModal, setOpenModal] = useState(false);
  // const handleOpen = () => setOpenModal(true);
  // const handleClose = () => setOpenModal(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Category can be string or null
const [selectedValue, setSelectedValue] = useState<number | null>(null);      // Value can be number or null

    const handleSliceClick = (category:string, value:number) => {
        setSelectedCategory(category);
        setSelectedValue(value !== undefined ? value : 0);
        setOpenModal(true);
        console.log(category,"category",value,"value")
    };
 
  const handleClose = () => setOpenModal(false);

  return (
    <div id="TalentCommunityInsights">
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Overview" value="1" />
              <Tab label="Applications" value="2" />
              <Tab label="Match Insights" value="3" />
              <Tab label="DEI" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid size={3}>
                  <h2 className='input-label'>Gender equals</h2>
                  <TextField fullWidth className='mt-1'
                    size="small"
                    id="gender"
                    name='gender'
                    variant="outlined"
                    select
                    label="Select All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={3}>

                  <h2 className='input-label'>Race and Ethnicity equals</h2>
                  <TextField fullWidth className='mt-1'
                    size="small"
                    id="Race"
                    name='Race'
                    variant="outlined"
                    select
                    label='Select all'
                  >
                    <MenuItem value='Select all'>Select all</MenuItem>
                    <MenuItem value='American Indian or Alaska Native'>American Indian or Alaska Native</MenuItem>
                    <MenuItem value='Asian'>Asian</MenuItem>
                    <MenuItem value='Black or African American'>Associates</MenuItem>
                    <MenuItem value='Native Hawaiian or other Pacific Islander'>Native Hawaiian or other Pacific Islander</MenuItem>
                    <MenuItem value='White' >White</MenuItem>
                  </TextField>

                </Grid>
                <Grid size={3}>
                  <h2 className='input-label'>Location equals</h2>
                  <TextField fullWidth className='mt-1'
                    size="small"
                    id="location"
                    name='location'
                    variant="outlined"
                    select
                    label="Al"
                  >
                    <MenuItem value="Al"> Al</MenuItem>
                    <MenuItem value="AR"> AR</MenuItem>
                    <MenuItem value="AZ"> AZ</MenuItem>
                    <MenuItem value="Alabama"> Alabama</MenuItem>
                    <MenuItem value="Arkansas"> Arkansas</MenuItem>
                    <MenuItem value="CA"> CA</MenuItem>
                    <MenuItem value="CO"> CO</MenuItem>
                    <MenuItem value="CONNECTICUT"> CONNECTICUT</MenuItem>
                    <MenuItem value="CT"> CT</MenuItem>
                    <MenuItem value="ca"> ca</MenuItem>
                    <MenuItem value="co"> co</MenuItem>
                  </TextField>

                </Grid>
                <Grid size={3}>

                  <h2 className='input-label'>JobTitle equals</h2>
                  <TextField fullWidth className='mt-1'
                    size="small"
                    id="gender"
                    name='gender'
                    variant="outlined"
                    select
                    label="Select all"
                  >
                    <MenuItem value="Select all">Select all</MenuItem>
                    <MenuItem value=" Research Scientist">Associate Research Scientist</MenuItem>
                    <MenuItem value="Business Analyst">Business Analyst</MenuItem>
                    <MenuItem value="Business Analyst/Manufacturing">Business Analyst/Manufacturing</MenuItem>
                    <MenuItem value="Business Analyst/Process Modeler">Business Analyst/Process Modeler</MenuItem>
                    <MenuItem value="DigitalMarketing Specialist">Digital Marketing Specialist</MenuItem>
                    <MenuItem value="Laboratory Animal Technician">Laboratory Animal Technician</MenuItem>
                    <MenuItem value="Laboratory Technician">Laboratory Technician</MenuItem>
                    <MenuItem value="Manufacturing Technician">Manufacturing Technician</MenuItem>
                    <MenuItem value="Material Handler">Material Handler</MenuItem>
                    <MenuItem value="Project Coordinator">Project Coordinator</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid size={4}>
                  <Card className='customCard mt-5' style={{ padding: '20px' }}>
                    <Typography variant="h6">New Members By Month</Typography>
                    <div id="chartdiv" ref={chartRef} style={{ width: '100%', height: '215px', position: 'relative' }}  >
                    </div>
                    <Menu
                      id="chart-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorReference="anchorPosition"
                      anchorPosition={menuPosition !== null ? { top: menuPosition.mouseY, left: menuPosition.mouseX } : undefined}
                    >
                      <MenuItem>
                        <div style={{ width: '15px', height: '15px', backgroundColor: '#2196f3', marginRight: '10px', borderRadius: '2px' }}></div>
                        <Typography variant="inherit">New Candidates <span style={{ fontWeight: 'bold' }}>{selectedItem?.value}</span></Typography>
                      </MenuItem>
                      <Divider />
                      {currentLevel === 'month' && (
                        <MenuItem onClick={() => { handleDrillDown('day'); handleMenuClose(); }}>
                          <Typography variant="inherit">Drill down to Daily</Typography>
                        </MenuItem>
                      )}
                      {currentLevel === 'day' && (
                        <>
                          <MenuItem onClick={() => { handleDrillDown('hour'); handleMenuClose(); }}>
                            <Typography variant="inherit">Drill down to Hourly</Typography>
                          </MenuItem>
                          <MenuItem onClick={() => { handleDrillUp(); handleMenuClose(); }}>
                            <Typography variant="inherit">Drill up to Monthly</Typography>
                          </MenuItem>
                        </>
                      )}
                      {currentLevel === 'hour' && (
                        <MenuItem onClick={() => { handleDrillUp(); handleMenuClose(); }}>
                          <Typography variant="inherit">Drill up to Daily</Typography>
                        </MenuItem>
                      )}
                    </Menu>
                  </Card>
                </Grid>
                <Grid size={4}>
                  <Card className='customCard  mt-5'>
                    <Donut id="chartdiv1" data={canSourceData} name="Candidate Source" height='200px' />
                  </Card>
                </Grid>
                <Grid size={4}>
                  <Card className='customCard  mt-5'>
                    <USHeat id="chartHeat"
                      colors={['#DEF5FF', '#219FD7']}
                      data={byLocationData}
                      size={{ width: "350px", height: "200px", marginBottom: "20px" }} heading="By Geographical location" />
                  </Card>
                </Grid>
              </Grid>
              < Grid container spacing={2}>
                <Grid size={4}>
                  <Card className='customCard  mt-5'>
                    <StackedBarChart
                      id="ChartBar1"
                      name="By Source"
                      colorLabels={['Registered', 'Invited']}
                      colors={['#082CCE', '#ADB2C7']}
                      data={StackedSourcedData} />
                  </Card>
                </Grid>
                <Grid size={4}>
                  <Card className='customCard  mt-5'>
                    <StackedBarChart
                      id="ChartBar2"
                      name="By JobTitles"
                      colors={['#7285DC', '#8191D8', '#6771dc']}
                      colorLabels={['Joined', 'Pending', 'New']}
                      data={StackedJobTitltData}
                    />
                  </Card>
                </Grid>
                <Grid size={4}>
                  <Card className='customCard  mt-5'>
                    <StackedBarChart
                      id="ChartBar3"
                      name="By Locations"
                      colors={['#7285DC', '#8191D8', '#6771dc']}
                      colorLabels={['Joined', 'Pending', 'New']}
                      data={StackedLocationData} />
                  </Card>
                </Grid>
              </Grid>
            </Box>

          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={2}>
              <Grid size={3}>
                <Card sx={{ width: 250 }}>
                  <CardContent>
                    <div className='applicationCard'> # Applications
                      <div className='mt-3'>
                        <span>
                          3,496
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={3}>
                <Card sx={{ width: 250 }}>
                  <CardContent>
                    <div className='applicationCard'>
                      <div>
                        # Hires
                      </div>
                      <div className='mt-3'>
                        <span>
                          103
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={3}>
                <Card sx={{ width: 250 }}>
                  <CardContent>
                    <div className='applicationCard'>
                      <div>
                        Application per Job
                      </div>
                      <div className='mt-3'>
                        <span>
                          233.07
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={3}>
                <Card sx={{ width: 250 }}>
                  <CardContent>
                    <div className='applicationCard'>
                      <div>
                        Avg Time to Apply(hrs)
                      </div>
                      <div className='mt-3'>
                        <span>
                          5
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={5} className="mt-5">
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <Comparing id="Comparing" name="Job Presented VS Applied" data={comparingJob} dateformat='yyyy-MM' />
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <Comparing id="Comparing1" name="Applications VS Hires" data={comparingApplicationData} dateformat='yyyy-MM' />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <Grid container spacing={2}>
              <Grid size={4} >
                <Card>
                  <CardContent>
                  
                    <PieChart id={"piechart"} data={matchScoreData} size={size} heading='Match Score Index' onSliceClick={handleSliceClick} />
                  
                  </CardContent>
                </Card>
              </Grid>
              <CandidateModal open={openModal} handleClose={handleClose} categoryData={selectedCategory} scoreValue={selectedValue}/>
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <StackedBarChart
                      id="ChartBar"
                      name="Match score Index - By Gender and Job"
                      data={StackedMatchScoreData}
                      colors={['#7285DC', '#ADB2C7']}
                      colorLabels={['Registered', 'Invited']}
                      height='220px'
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="4">
            <Grid container spacing={2}>
              <Grid size={4} >
                <Card>
                  <CardContent>
                    <div className='race'>
                      <StackedBarChart
                        id="ChartBarstack"
                        data={stackedRaceData}
                        colors={['#7285DC', '#44EAED']}
                        colorLabels={['Registered', 'Invited']}
                        name="By Race and Ethnicity" />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4} >
                <Card>
                  <CardContent>
                    <div className='race'>
                      <StackedBarChart
                        id="ChartBarstack1"
                        data={StackedJobTitltData}
                        name="By Job Titles"
                        colors={['#7285DC', '#CCC2E6']}
                        colorLabels={['Registered', 'Invited']}
                      />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4} >
                <Card>
                  <CardContent>
                    <div className='race'>
                      <StackedBarChart
                        id="ChartBarstack2"
                        data={StackedLocationData}
                        name="By Locations"
                        colors={['#7285DC', '#9DD2EE']}
                        colorLabels={['Registered', 'Invited']} />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

        </TabContext>
      </Box>
    </div>
  );
};
export default React.memo(TalentCommunityInsights);