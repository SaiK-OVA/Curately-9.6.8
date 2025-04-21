import {React} from '../../../../../shared/modules/React';
import {Tab} from '../../../../../shared/modules/MaterialImports/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Box} from '../../../../../shared/modules/MaterialImports/Box';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';
import {Card,CardContent} from '../../../../../shared/modules/MaterialImports/Card';
import Donut from '../Demo/Donut/Donut';

import './SourcingInsights.scss'
import StackedColumnChart from '../Demo/StackedColumnChart/StackedColumnChart';
import DragOrdering from '../Demo/DragOrdering/DragOrdering';
import StackedBarChart from '../Demo/StackedBarChart/StackedBarChart';

const SourcingInsights = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const sourceApplicationData = [{ value: 20, category: "Career Portal" },
  { value: 5, category: "Referral" },
  { value: 30, category: "Job Boards" },
  { value: 20, category: "Community" },
  { value: 25, category: "Social Media" }];

  const sourceHireData = [
    { value: 20, category: "Career Portal" },
    { value: 5, category: "Referral" },
    { value: 30, category: "Job Boards" },
    { value: 20, category: "Community" },
    { value: 25, category: "Social Media" },
  ]

  const applicationToSubmissionData = [
    {
      "year": "LinkedIn",
      "male": 40,
      "female": 23,
      "other": 9,
    },
    {
      "year": "Indeed",
      "male": 60,
      "female": 25,
      "other": 8,
    }, {
      "year": "Monster",
      "male": 15,
      "female": 20,
      "other": 2,
    }, {
      "year": "CB",
      "male": 40,
      "female": 15,
      "other": 6,
    }, {
      "year": "CP",
      "male": 30,
      "female": 20,
      "other": 4,

    }
  ]

  const size = {
    width: "350px", height: "200px", marginBottom: "20px"
}
  const funnelData = [
    {
      Name: "June 22",
    GrossMargin: 22
    }, {
      Name: "May 22",
    GrossMargin: 40
    }, {
      Name: "Apr 22",
    GrossMargin: 60
    }, {
      Name: "Mar 22",
    GrossMargin: 15
    }, {
      Name: "Feb 22",
    GrossMargin: 40
    },
    {
      Name: "Jan 22",
    GrossMargin: 30
    }
  ]


  const funnelByGenderData = [
    {
      label: "Jun 22",
      value1: 59.85,
      value2: 40.15,

    }, {
      label: "May 22",
      value1: 60.75,
      value2: 39.28,

    }, {
      label: "Apr 22",
      value1: 59.48,
      value2: 40.56,

    },
    {
      label: "Mar 22",
      value1: 60.32,
      value2: 39.68,

    },
    {
      label: "Feb 22",
      value1: 62.10,
      value2: 37.90,

    },
    {
      label: "Jan 22",
      value1: 58.1,
      value2: 41.87,

    },
  ]

  const funnelBySourceData = [
    {
      Name: "June 22",
    GrossMargin: 22
    }, {
      Name: "May 22",
    GrossMargin: 40
    }, {
      Name: "Apr 22",
    GrossMargin: 60
    }, {
      Name: "Mar 22",
    GrossMargin: 15
    }, {
      Name: "Feb 22",
    GrossMargin: 40
    },
    {
      Name: "Jan 22",
    GrossMargin: 30
    }
  ]
  return (
    <div id='sourcing'>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Sourcing Insights" value="1" />
              {/* <Tab label="Scorecard" value="2"
              // style={{ textTransform: "capitalize" }} 
              /> */}
            </TabList>
          </Box>
          <TabPanel value="1">
            <div>
              <Grid container spacing={2}>
                <div className='sourcingHeader'>
                  <h4 className='content'>Sourcing Insights</h4>
                </div>
              </Grid>
            </div>
            <Grid container spacing={2} >
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <Donut id="chartdiv" name="Source of Application" data={sourceApplicationData} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <Donut id="chartdiv1" name="Source of Hires" data={sourceHireData} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mt-3">
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <StackedColumnChart id="scc" size= {size} name="Application to Submission by Source" data={applicationToSubmissionData} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <StackedColumnChart id="scc1" size ={size} name="Applications to Hires by source" data={applicationToSubmissionData} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
          {/* <TabPanel value="2">
            <Grid container spacing={2} >
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <div className='funnel'>
                      <DragOrdering id='funnel' name="Outreach Funnel" data={funnelData} colors='#a1caf1'  height='200px'/>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <div className='funnel'>
                      <StackedBarChart
                        id="funnelByGender"
                        colors={['#082CCE', '#A49DEE']}
                        colorLabels={['Registered', 'Invited']}
                        name="Outreach Funnel by Gender"
                        data={funnelByGenderData} 
                        height='200px'
                        />
                    </div>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={4}>
                <Card>
                  <CardContent>
                    <div className='funnel'>
                      <DragOrdering id='dragchart1' name="Outreach Funnel by Source" colors={'#082CCE'} data={funnelBySourceData} height='200px'/>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel> */}
        </TabContext>
      </Box>
    </div>

  )
}

export default React.memo(SourcingInsights);