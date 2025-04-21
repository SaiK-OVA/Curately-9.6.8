import {React} from '../../../../../shared/modules/React';
import {Tab} from '../../../../../shared/modules/MaterialImports/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Box} from '../../../../../shared/modules/MaterialImports/Box';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';
import {Card, CardContent} from '../../../../../shared/modules/MaterialImports/Card';
import FunnelChart from '../Demo/FunnelChart/FunnelChart';
import {TextField} from "../../../../../shared/modules/MaterialImports/TextField";
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';

import './PipelineInsights.scss';

const PipelineInsights = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const FunnelChartData = [{
        label: "Applications Created",
        value: 915.0
      }, {
        label: "Pre-Interview",
        value: 800.0
      }, {
        label: "Phone Interview",
        value: 700.0
      },
      {
        label: "Onsite",
        value: 600.0
      }, {
        label: "Offer",
        value: 200.0
      },
      {
        label: "Hired",
        value: 190.0
      },
      ];

    return (
        <div id='PipelineInsights'>
            <Box>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Passthrough Rates" value="1"  />
                            <Tab label="Time in a Stage" value="2"  />
                            <Tab label="Passthrough Rates by Job" value="3" 
                            // style={{ textTransform: "capitalize" }}
                             />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Card>
                                    <CardContent>
                                        <div className='pipeLine'>
                                            <FunnelChart id="funnel" data={FunnelChartData} heading="Candidate Pipeline Analytics" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="flex-end" className="mt-3">
                            <Grid>
                                <div className='GroupBy'>
                                    <label className='inputLabel'>Group By</label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        id="prefix"
                                        name='prefix'
                                        variant="outlined"
                                        select
                                        label='All'
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Value 1">Value 1</MenuItem>
                                        <MenuItem value="Value 2">Value 2</MenuItem>
                                        <MenuItem value="Value 3">Value 3</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                            <Grid>
                                <div className='GroupBy'>
                                    <label className='inputLabel'>Metric</label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        id="prefix"
                                        name='prefix'
                                        variant="outlined"
                                        select
                                        label='All'
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Value 1">Value 1</MenuItem>
                                        <MenuItem value="Value 2">Value 2</MenuItem>
                                        <MenuItem value="Value 3">Value 3</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                            <Grid>
                                <div className='GroupBy'>
                                    <label className='inputLabel'>Breakdown</label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        id="prefix"
                                        name='prefix'
                                        variant="outlined"
                                        select
                                        label='All'
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Value 1">Value 1</MenuItem>
                                        <MenuItem value="Value 2">Value 2</MenuItem>
                                        <MenuItem value="Value 3">Value 3</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Card>
                                    <CardContent>
                                        <div className='pipeLine'>
                                        <FunnelChart id="funnelTime" data={FunnelChartData} heading="Candidate Pipeline Analytics" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="flex-end" className="mt-3">
                            <Grid>
                                <div className='GroupBy'>
                                    <label className='inputLabel'>Group By</label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        id="prefix"
                                        name='prefix'
                                        variant="outlined"
                                        select
                                        label='All'
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Value 1">Value 1</MenuItem>
                                        <MenuItem value="Value 2">Value 2</MenuItem>
                                        <MenuItem value="Value 3">Value 3</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                            <Grid>
                                <div className='GroupBy'>
                                    <label className='inputLabel'>Metric</label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        id="prefix"
                                        name='prefix'
                                        variant="outlined"
                                        select
                                        label='All'
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Value 1">Value 1</MenuItem>
                                        <MenuItem value="Value 2">Value 2</MenuItem>
                                        <MenuItem value="Value 3">Value 3</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                            <Grid>
                                <div className='GroupBy'>
                                    <label className='inputLabel'>Breakdown</label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        id="prefix"
                                        name='prefix'
                                        variant="outlined"
                                        select
                                        label='All'
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Value 1">Value 1</MenuItem>
                                        <MenuItem value="Value 2">Value 2</MenuItem>
                                        <MenuItem value="Value 3">Value 3</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value="3">
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Card>
                                    <CardContent>
                                        <div className='pipeLine'>
                                        <FunnelChart id="funnelRates" data={FunnelChartData} heading="Candidate Pipeline Analytics" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justifyContent="flex-end" className="mt-3">
                            <Grid>
                                <div className='GroupBy'>
                                    <label className='inputLabel'>Group By</label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        id="prefix"
                                        name='prefix'
                                        variant="outlined"
                                        select
                                        label='All'
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Value 1">Value 1</MenuItem>
                                        <MenuItem value="Value 2">Value 2</MenuItem>
                                        <MenuItem value="Value 3">Value 3</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                            <Grid>
                                <div className='GroupBy'>
                                    <label className='inputLabel'>Metric</label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        id="prefix"
                                        name='prefix'
                                        variant="outlined"
                                        select
                                        label='All'
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Value 1">Value 1</MenuItem>
                                        <MenuItem value="Value 2">Value 2</MenuItem>
                                        <MenuItem value="Value 3">Value 3</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                            <Grid>
                                <div className='GroupBy'>
                                    <label className='inputLabel'>Breakdown</label>
                                    <TextField fullWidth className='mt-1'
                                        size="small"
                                        id="prefix"
                                        name='prefix'
                                        variant="outlined"
                                        select
                                        label='All'
                                    >
                                        <MenuItem value="All">All</MenuItem>
                                        <MenuItem value="Value 1">Value 1</MenuItem>
                                        <MenuItem value="Value 2">Value 2</MenuItem>
                                        <MenuItem value="Value 3">Value 3</MenuItem>
                                    </TextField>
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default React.memo(PipelineInsights);