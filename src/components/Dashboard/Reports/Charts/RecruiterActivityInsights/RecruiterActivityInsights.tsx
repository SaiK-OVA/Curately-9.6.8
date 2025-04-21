import {React} from '../../../../../shared/modules/React';
import {Tab} from '../../../../../shared/modules/MaterialImports/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Box} from '../../../../../shared/modules/MaterialImports/Box';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';
import {TextField} from "../../../../../shared/modules/MaterialImports/TextField";
import './RecruiterActivityInsights.scss';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';

const RecruiterActivityInsights = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div id='recruiterInsights'>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Overview" value="1"
              // style={{ textTransform: "capitalize" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div>
              <Grid container>
                <Grid>
                  <div className='sourcingHeader'>
                    <h4 className='content'>Recruiter Activity Insights</h4>
                  </div>
                </Grid>
              </Grid>
            </div>
            <Grid container justifyContent="flex-end" >
              <Grid>
                <div className='date'>
                  <div className='dateContent'>
                    <h4>Start date</h4>
                    <Box className="inputContent">
                    05/23/2023
                    </Box>
                  </div>
                  <div className='dateContent'>
                    <h4>End date</h4>
                    <Box className="inputContent">
                    05/23/2023
                    </Box>
                  </div>
                </div>
              </Grid>
              <Grid>
                <div className='GroupBy'>
                  <label className='inputLabel'>Recruiter</label>
                  <TextField fullWidth className='mt-1'
                    size="small"
                    label='All'
                    select
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Value 1">Value 1</MenuItem>
                    <MenuItem value="Value 2">Value 2</MenuItem>
                    <MenuItem value="Value 3">Value 3</MenuItem>
                  </TextField>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="pl-2">
              {/* <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Avg Response Time</h3>
                    </div>
                    <p className='hrs'>3 Hrs</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>4.2 Hrs</span>
                      <span>(30%)</span>
                    </div>
                  </div>
                </div>
              </Grid> */}
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Submissions:Interviews</h3>
                    </div>
                    <p className='hrs'>1.8:1</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>3.1 Hrs</span>
                      <span>(10%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid>
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
            <Grid container spacing={2} className="mt-3 pl-2">
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Invitations Sent</h3>
                    </div>
                    <p className='hrs'>5.2K</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>4.2 Hrs</span>
                      <span>(10%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Invitations accepted</h3>
                    </div>
                    <p className='hrs'>2.2K</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>4.2 Hrs</span>
                      <span>(10%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
              {/* <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Linkedin Outreach</h3>
                    </div>
                    <p className='hrs'>15.2K</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>4.2 Hrs</span>
                      <span>(10%)</span>
                    </div>
                  </div>
                </div>
              </Grid> */}
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Email Outreach</h3>
                    </div>
                    <p className='hrs'>45.3K</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>4.2 Hrs</span>
                      <span>(10%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Phone calls</h3>
                    </div>
                    <p className='hrs'>600</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>4.2 Hrs</span>
                      <span>(10%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mt-3 pl-2">
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Screened</h3>
                    </div>
                    <p className='hrs'>9.2K</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>8.6K</span>
                      <span>(+10%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Shortlisted</h3>
                    </div>
                    <p className='hrs'>1.3K</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>1.6K</span>
                      <span>(+10%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Submitted</h3>
                    </div>
                    <p className='hrs'>47</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>29</span>
                      <span>(+30%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Interviews</h3>
                    </div>
                    <p className='hrs'>26</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>22</span>
                      <span>(+20%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid>
                <div className='data'>
                  <div className='avg'>
                    <div className='response'>
                      <h3>Offers</h3>
                    </div>
                    <p className='hrs'>17</p>
                    <div className='prev'>
                      <span>vs prev = </span>
                      <span>11</span>
                      <span>(+25%)</span>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}

export default RecruiterActivityInsights