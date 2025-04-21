
import './MyGMHeadcount.scss';
import React from 'react'
import { Grid, TextField } from '../../../../../shared/modules/commonImports';
import { Tab, Tabs } from '../../../../../shared/modules/MaterialImports/Tabs';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
import { Card } from '../../../../../shared/modules/MaterialImports/Card';
import TrendLines from '../Demo/TrendLines/TrendLines';
import Donut from '../Demo/Donut/Donut';
import MultilevelTree from './MultilevelTree/MultilevelTree';
import DragOrdering from '../Demo/DragOrdering/DragOrdering';
import ColumnLine from './ColumnLine/ColumnLine';
import HeatMap from '../Demo/HeatMap/HeatMap';


const MyGMHeadcount = () => {
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const progressData = [
    { value: 5, category: "lannuzzi,Gregory" },
    { value: 29, category: "Mike Nocella" },
    { value: 30, category: "House" },
    { value: 20, category: "Tejal Fitch" },
    { value: 20, category: "Fahad Khawaja" },
    { value: 20, category: "Lorena Fugedy" },

  ]

  const size = {
    width: "450px", height: "200px", marginBottom: "20px"
}

  const recruiterPerformanceData = [
    {
      Name: "Sarita Madge",
      GrossMargin: 73323.28
    }, {
      Name: "Hank Rajguru",
      GrossMargin: 47063.885
    }, {
      Name: "Suzie Shukla",
      GrossMargin: 41770.632
    }, {
      Name: "Raghavendra Panchangam",
      GrossMargin: 35337.04
    }, {
      Name: "Sam Nawab",
      GrossMargin: 35314.7683
    },
    {
      Name: "Adam Jones",
      GrossMargin: 34540.505
    }
  ]
  const consultantPerformanceData = [
    {
      Name: "Vakkalagadda, Amith",
      GrossMargin: 73323.28
    }, {
      Name: "Chellapilla, Sowmya",
      GrossMargin: 47063.885
    }, {
      Name: "Pawa, Pankaj",
      GrossMargin: 41770.632
    }, {
      Name: "Kethireddy, Sudhakar Reddy",
      GrossMargin: 35337.04
    }, {
      Name: "Sam Nawab",
      GrossMargin: 35314.7683
    },
    {
      Name: "Movassate, Mark Mazi",
      GrossMargin: 34540.505
    }
  ]

  const clientPerformanceData = [
    {
      Name: "Accenture",
      GrossMargin: 154562.805
    }, {
      Name: "CVS Health",
      GrossMargin: 47063.885
    }, {
      Name: "Samsung",
      GrossMargin: 41770.632
    }, {
      Name: "ATT",
      GrossMargin: 35337.04
    }, {
      Name: "Equifax, Inc.",
      GrossMargin: 35314.7683
    },
    {
      Name: "Fannie Mae",
      GrossMargin: 34540.505
    }
  ]
  let AssignmentData = {
    yAxisCategoryField: "weekday",
    xAxisCategoryField: "hour",
    seriesStrokeColor: '#ffffff',
    seriesRulesMin: '#4db183',
    seriesRulesMax: '#4db183',
    yAxisData: [
      { weekday: "05/05/2015" },
      { weekday: "01/01/2021" },
      { weekday: "02/22/2022" },
      { weekday: "08/22/2018" },
      { weekday: "09/15/2022" },
    ],
    xAxisData: [
      { hour: "Sunday" },
      { hour: "Monday" },
      { hour: "Tuesday" },
      { hour: "Wednesday" },
      { hour: "Thursday" },
    ],
    displayData :[{
      hour: "Sunday",
      weekday: "05/05/2015",
      value: 4
    }, {
      hour: "Monday",
      weekday: "01/01/2021",
      value: 11
    }, {
      hour: "Tuesday",
      weekday: "02/22/2022",
      value: 5
    }, {
      hour: "Wednesday",
      weekday: "08/22/2018",
      value: 12
    }, {
      hour: "Thursday",
      weekday: "09/15/2022",
      value: 3
    }, {
      hour: "Friday",
      weekday: "01/07/2024",
      value: 6
    }, {
      hour: "Saturday",
      weekday: "12/31/2023",
      value: 5
    }]
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
  return (
    <Grid sx={{ width: 'calc(100% - 310px)' }}>
      <div id="myGM">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="1" />
            <Tab label="2" />
            <Tab label="3" />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Grid container>
            <Grid container style={{ paddingLeft: '145px' }}>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Client</span></p>
                <div className='clientWrapper mt-1'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Accenture">Accenture</MenuItem>
                    <MenuItem value="Adobe Systems">Adobe Systems</MenuItem>
                    <MenuItem value="ADT">ADT</MenuItem>
                    <MenuItem value="AgFirst Farm Credit Bank">AgFirst Farm Credit Bank</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Portfolio manager</span></p>
                <div className='clientWrapper mt-1 ml-2'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Fahad Khawaja">Fahad Khawaja</MenuItem>
                    <MenuItem value="House">House</MenuItem>
                    <MenuItem value="Iannuzzi, Gregory">Iannuzzi, Gregory</MenuItem>
                    <MenuItem value="Lorena Fugedy">Lorena Fugedy</MenuItem>
                    <MenuItem value="Mike Nocella">Mike Nocella</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Recruiter</span></p>
                <div className='clientWrapper mt-1 ml-2'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Aakash Kumar">Aakash Kumar</MenuItem>
                    <MenuItem value="Abhishek Mahtolia  ">Abhishek Mahtolia  </MenuItem>
                    <MenuItem value="Achal Kumar">Achal Kumar</MenuItem>
                    <MenuItem value="Dhara Bhatt">Dhara Bhatt</MenuItem>
                    <MenuItem value="Edgar Sindole">Edgar Sindole</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Account manager</span></p>
                <div className='clientWrapper mt-1 ml-2'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Vishal Sinha">Vishal Sinha</MenuItem>
                    <MenuItem value="Sonali Dey">Sonali Dey</MenuItem>
                    <MenuItem value="Edgar Sindole">Edgar Sindole</MenuItem>
                    <MenuItem value="Dhara Bhatt">Dhara Bhatt</MenuItem>
                    <MenuItem value="Achal Kumar">Achal Kumar</MenuItem>
                  </TextField>
                </div>
              </Grid>
            </Grid>
            <Grid container className='mt-5 pl-2'>
              <Grid>
                <div className='activeHeadcount'>
                  <p style={{ textAlign: 'center' }}><span className="textClient">Active Headcount</span>
                    <div className='headCount'>
                      <span>1275</span>
                      <div style={{ display: 'flex' }}>
                        <div className='portal mt-2'>
                          <span>1154</span>
                          <div className='portalText mt-2'>
                            <span>Portal</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>97</span>
                          <div className='portalText mt-2'>
                            <span>Relationship</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>24</span>
                          <div className='portalText mt-2'>
                            <span>P2R</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </Grid>
              <Grid className='pl-5'>
                <div className='activeHeadcount'>
                  <p style={{ textAlign: 'center' }}><span className="textClient">Gross Margin</span>
                    <div className='headCount'>
                      <span>$1.77M</span>
                      <div style={{ display: 'flex' }}>
                        <div className='portal mt-2'>
                          <span>$1.5M</span>
                          <div className='portalText mt-2'>
                            <span>Portal</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>$165.6K</span>
                          <div className='portalText mt-2'>
                            <span>Relationship</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>$80K</span>
                          <div className='portalText mt-2'>
                            <span>P2R</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </Grid>
              <Grid className='pl-5'>
                <div className='hours'>
                  <p style={{ textAlign: 'center' }}><span>354.70K</span>
                    <div className='portalText mt-2'>
                      <span>Hours</span>
                    </div>
                  </p>
                </div>
              </Grid>
              <Grid className='pl-5'>
                <div className='hours'>
                  <p style={{ textAlign: 'center' }}><span>93</span>
                    <div className='portalText mt-2'>
                      <span>Clients</span>
                    </div>
                  </p>
                </div>
              </Grid>
            </Grid>
            <Grid container className='pl-2'>
              <Grid>
                <Card className="mt-5 pl-2">
                  <div className='trend'>
                    <TrendLines id="HeadCountTrend" name="Headcount Trend" data={stageData} dateformat='yyyy-MM-dd' height='220px'/>
                  </div>
                </Card>
              </Grid>
              <Grid className='pl-2'>
                <Card className="mt-5 pl-3">
                  <div className='trend'>
                    <TrendLines id="GrossMargin" name="Gross Margin Trend" data={stageData} dateformat='yyyy-MM-dd' height='220px'/>
                  </div>
                </Card>
              </Grid>
            </Grid>
            <Grid container className='pl-2'>
              <Grid>
                <Card className="mt-5 pl-2">
                  <div className='performance'>
                    <MultilevelTree />
                  </div>
                </Card>
              </Grid>
              <Grid className='pl-2'>
                <Card className="mt-5 pl-3">
                  <div className='performance'>
                    <Donut id="Portfolio" name="Portfolio Manager Performance" data={progressData} />
                  </div>
                </Card>
              </Grid>
              <Grid className='pl-2'>
                <Card className="mt-5 pl-3">
                  <div className='performance'>
                    <DragOrdering id='Recruiter' name="Recruiter Performance" data={recruiterPerformanceData} colors={"#a1caf1"} />
                  </div>
                </Card>
              </Grid>
            </Grid>
            <Grid container className='pl-2'>
              <Grid>
                <Card className="mt-5 pl-2">
                  <div className='performance'>
                    <DragOrdering id='Consultant' name="Consultant Performance" data={consultantPerformanceData} colors={"#a1caf1"} />
                  </div>
                </Card>
              </Grid>
              <Grid className='pl-2'>
                <Card className="mt-5 pl-3">
                  <div className='performance'>
                    <DragOrdering id='Client' name="Client Performance" data={clientPerformanceData} colors={"#a1caf1"} />
                  </div>
                </Card>
              </Grid>
              <Grid className='pl-2'>
                <Card className="mt-5 pl-3">
                  <div className='performance'>
                    <ColumnLine colors={["#00afb9"]} />
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Grid container>
            <Grid container style={{ paddingLeft: '145px' }}>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Client</span></p>
                <div className='clientWrapper mt-1'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Accenture">Accenture</MenuItem>
                    <MenuItem value="Adobe Systems">Adobe Systems</MenuItem>
                    <MenuItem value="ADT">ADT</MenuItem>
                    <MenuItem value="AgFirst Farm Credit Bank">AgFirst Farm Credit Bank</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Portfolio manager</span></p>
                <div className='clientWrapper mt-1 ml-2'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Fahad Khawaja">Fahad Khawaja</MenuItem>
                    <MenuItem value="House">House</MenuItem>
                    <MenuItem value="Iannuzzi, Gregory">Iannuzzi, Gregory</MenuItem>
                    <MenuItem value="Lorena Fugedy">Lorena Fugedy</MenuItem>
                    <MenuItem value="Mike Nocella">Mike Nocella</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Recruiter</span></p>
                <div className='clientWrapper mt-1 ml-2'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Aakash Kumar">Aakash Kumar</MenuItem>
                    <MenuItem value="Abhishek Mahtolia  ">Abhishek Mahtolia  </MenuItem>
                    <MenuItem value="Achal Kumar">Achal Kumar</MenuItem>
                    <MenuItem value="Dhara Bhatt">Dhara Bhatt</MenuItem>
                    <MenuItem value="Edgar Sindole">Edgar Sindole</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Account manager</span></p>
                <div className='clientWrapper mt-1 ml-2'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Vishal Sinha">Vishal Sinha</MenuItem>
                    <MenuItem value="Sonali Dey">Sonali Dey</MenuItem>
                    <MenuItem value="Edgar Sindole">Edgar Sindole</MenuItem>
                    <MenuItem value="Dhara Bhatt">Dhara Bhatt</MenuItem>
                    <MenuItem value="Achal Kumar">Achal Kumar</MenuItem>
                  </TextField>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className='pl-4'>
            <Grid>
              <Card className="mt-5 pl-2">
                <div className='assignments'>
                  <HeatMap id={"Assignments"}  size = {size} name="Calendar - Assignments start" chartDataPassed={AssignmentData}/>
                </div>
              </Card>
            </Grid>
          </Grid>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Grid container>
            <Grid container style={{ paddingLeft: '145px' }}>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Client</span></p>
                <div className='clientWrapper mt-1'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Accenture">Accenture</MenuItem>
                    <MenuItem value="Adobe Systems">Adobe Systems</MenuItem>
                    <MenuItem value="ADT">ADT</MenuItem>
                    <MenuItem value="AgFirst Farm Credit Bank">AgFirst Farm Credit Bank</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Portfolio manager</span></p>
                <div className='clientWrapper mt-1 ml-2'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Fahad Khawaja">Fahad Khawaja</MenuItem>
                    <MenuItem value="House">House</MenuItem>
                    <MenuItem value="Iannuzzi, Gregory">Iannuzzi, Gregory</MenuItem>
                    <MenuItem value="Lorena Fugedy">Lorena Fugedy</MenuItem>
                    <MenuItem value="Mike Nocella">Mike Nocella</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Recruiter</span></p>
                <div className='clientWrapper mt-1 ml-2'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Aakash Kumar">Aakash Kumar</MenuItem>
                    <MenuItem value="Abhishek Mahtolia  ">Abhishek Mahtolia  </MenuItem>
                    <MenuItem value="Achal Kumar">Achal Kumar</MenuItem>
                    <MenuItem value="Dhara Bhatt">Dhara Bhatt</MenuItem>
                    <MenuItem value="Edgar Sindole">Edgar Sindole</MenuItem>
                  </TextField>
                </div>
              </Grid>
              <Grid>
                <p style={{ textAlign: 'center' }}><span className="textClient">Account manager</span></p>
                <div className='clientWrapper mt-1 ml-2'>
                  <TextField fullWidth
                    size="small"
                    variant="outlined"
                    select
                    label="All"
                  >
                    <MenuItem value="0">Select All</MenuItem>
                    <MenuItem value="Vishal Sinha">Vishal Sinha</MenuItem>
                    <MenuItem value="Sonali Dey">Sonali Dey</MenuItem>
                    <MenuItem value="Edgar Sindole">Edgar Sindole</MenuItem>
                    <MenuItem value="Dhara Bhatt">Dhara Bhatt</MenuItem>
                    <MenuItem value="Achal Kumar">Achal Kumar</MenuItem>
                  </TextField>
                </div>
              </Grid>
            </Grid>
            <Grid container className='mt-5 pl-2'>
              <Grid>
                <div className='activeHeadcount'>
                  <p style={{ textAlign: 'center' }}><span className="textClient">Active Headcount - Last week</span>
                    <div className='headCount'>
                      <span>(Blank)</span>
                      <div style={{ display: 'flex' }}>
                        <div className='portal mt-2'>
                          <span>(Blank)</span>
                          <div className='portalText mt-2'>
                            <span>Portal</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>(Blank)</span>
                          <div className='portalText mt-2'>
                            <span>Relationship</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>(Blank)</span>
                          <div className='portalText mt-2'>
                            <span>P2R</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </Grid>
              <Grid className='pl-5'>
                <div className='activeHeadcount'>
                  <p style={{ textAlign: 'center' }}><span className="textClient">Gross Margin - Last week</span>
                    <div className='headCount'>
                      <span>(Blank)</span>
                      <div style={{ display: 'flex' }}>
                        <div className='portal mt-2'>
                          <span>(Blank)</span>
                          <div className='portalText mt-2'>
                            <span>Portal</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>(Blank)</span>
                          <div className='portalText mt-2'>
                            <span>Relationship</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>(Blank)</span>
                          <div className='portalText mt-2'>
                            <span>P2R</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </Grid>
              <Grid className='pl-5'>
                <div className='activeHeadcount'>
                  <p style={{ textAlign: 'center' }}><span className="textClient">Active Headcount</span>
                    <div className='headCount'>
                      <span>1275</span>
                      <div style={{ display: 'flex' }}>
                        <div className='portal mt-2'>
                          <span>1154</span>
                          <div className='portalText mt-2'>
                            <span>Portal</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>97</span>
                          <div className='portalText mt-2'>
                            <span>Relationship</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>24</span>
                          <div className='portalText mt-2'>
                            <span>P2R</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </Grid>
              <Grid className='pl-5'>
                <div className='activeHeadcount'>
                  <p style={{ textAlign: 'center' }}><span className="textClient">Gross Margin</span>
                    <div className='headCount'>
                      <span>$1.77M</span>
                      <div style={{ display: 'flex' }}>
                        <div className='portal mt-2'>
                          <span>$1.5M</span>
                          <div className='portalText mt-2'>
                            <span>Portal</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>$165.6K</span>
                          <div className='portalText mt-2'>
                            <span>Relationship</span>
                          </div>
                        </div>
                        <div className='portal mt-2'>
                          <span>$80K</span>
                          <div className='portalText mt-2'>
                            <span>P2R</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </p>
                </div>
              </Grid>
            </Grid>
            <Grid container className='pl-2'>
              <Grid>
                <Card className="mt-5 pl-2">
                  <div className='trend'>
                    <TrendLines id="HeadCount" name="Headcount Trend" data={stageData} dateformat='yyyy-MM-dd' height='220px'/>
                  </div>
                </Card>
              </Grid>
              <Grid className='pl-2'>
                <Card className="mt-5 pl-3">
                  <div className='trend'>
                    <TrendLines id="Gross" name="Gross Margin Trend" data={stageData} dateformat='yyyy-MM-dd' height='220px'/>
                  </div>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </CustomTabPanel>
      </div >
    </Grid>
  )
}

export default React.memo(MyGMHeadcount);