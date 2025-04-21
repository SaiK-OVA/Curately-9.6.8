import React from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import Applicants from './Applicants/Applicants';
import Submissions from './Submissions/Submissions';
import UserDefined from './UserDefined/UserDefined';
import Advertise from './Advertise/Advertise';
import ShortlistedResumes from './ShortlistedResumes/ShortlistedResumes';
import Overview from './Overview/Overview';
import Interviews from './Interviews/Interviews';
import AutoResumeSearch from './AutoResumeSearch/AutoResumeSearch';
import OriginalPost from './OriginalPost/OriginalPost';
import Notes from './Notes/Notes';
// import AddJob from '../Add/AddJob';

import './EditJob.scss';


function TabPanel(props: any) {
    const { children, value, index } = props
    return (
        <div>
            {
                value === index && (
                    <div>{children}</div>
                )
            }
        </div>
    )
}


const EditJob = () => {


    const [value, setValue] = React.useState(0)

    const handleTabChange = (event: any, newValue: any) => {
        console.log(newValue);
        setValue(newValue);
    };

    return (<>
        <Stack spacing={2} direction="row">
            <Button className="edit" variant="contained">EDIT</Button>
            <Button className="advertise" variant="contained">ADVERTISE</Button>
            <Button className="userdefined" variant="contained">USER DEFINED</Button>
            <Button className="documents" variant="contained">DOCUMENTS</Button>
            <Button className="searchresume" variant="contained">SEARCH RESUME</Button>
            <Grid container spacing={2} direction="row" justifyContent="flex-end">
                <Button>
                    X
                </Button>
            </Grid>
        </Stack>
        <br />
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
                <Grid size={1.7}>
                    <label>Local Job ID</label>
                    <div className='box'
                    ><p></p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Job Created On</label>
                    <div className='box'><p></p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Account Manager</label>
                    <div className='box'><p>asdfghjkl</p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Hiring Manager</label>
                    <div className='box'><p>Christopher Fredian</p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Client ID</label>
                    <div className='box'><p>13625763</p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Type</label>
                    <div className='box'><p>Contract</p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Duration</label>
                    <div className='box'><p>6 Months</p></div>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid size={1.7}>
                    <label>Pipeline Status</label><br />
                    <div className='box'><p></p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Job Status</label>
                    <div className='box'><p>Open</p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Job Title</label>
                    <div className='box'><p>Customer Service Representative</p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Priority</label>
                    <div className='box'><p></p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Bill Rate</label>
                    <div className='box'><p>$ 27</p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Location</label>
                    <div className='box'><p>Boston , MA</p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Pay Rate</label>
                    <div className='box'><p>$ 20</p></div>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid size={1.7}>
                    <label>Remote</label>
                    <div className='box'><p>No</p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Assigned to</label>
                    <TextField id="assignedTo" name='assignedTo' size='small' />
                </Grid>
                <Grid size={1.7}>
                    <label>Job Posted</label>
                    <TextField id="jobPosted" name='jobPosted' size='small' />
                </Grid>
                <Grid size={1.7}>
                    <div className='box1'></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Position</label>
                    <div className='box'><p></p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Start Date</label>
                    <div className='box'><p></p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>No.of Positions</label>
                    <div className='box'><p>13</p></div>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid size={1.7}>
                    <div className='box1'></div>
                </Grid>
                <Grid size={1.7}>
                    <div className='box1'></div>
                </Grid>
                <Grid size={1.7}>
                    <div className='box1'></div>
                </Grid>
                <Grid size={1.7}>
                    <div className='box1'></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Travel %</label>
                    <div className='box'><p></p></div>
                </Grid>
                <Grid size={1.7}>
                    <label>Travel Comments</label>
                    <div className='box'><p></p></div>
                </Grid>
            </Grid>
        </Box >
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Tabs value={value} onChange={handleTabChange}>
                <Tab label="Overview" />
                <Tab label="Edit" />
                <Tab label="Notes" />
                <Tab label="Applicants" />
                <Tab label="User-Defined" />
                <Tab label="Shortlisted Resumes" />
                <Tab label="Auto Resume Search" />
                <Tab label="Submissions" />
                <Tab label="Interviews" />
                <Tab label="OP" />
                <Tab label="Advertise" />
            </Tabs>
            <hr />
            <TabPanel value={value} index={0}>
                <Overview />
            </TabPanel>

            <TabPanel value={value} index={1}>
                {/* <AddJob /> */}
            </TabPanel>

            <TabPanel value={value} index={2}>
                <Notes />
            </TabPanel>

            <TabPanel value={value} index={3}>
                <Applicants />
            </TabPanel>

            <TabPanel value={value} index={4}>
                <UserDefined />
            </TabPanel>

            <TabPanel value={value} index={5}>
                <ShortlistedResumes />
            </TabPanel>

            <TabPanel value={value} index={6}>
                <AutoResumeSearch />
            </TabPanel>

            <TabPanel value={value} index={7}>
                <Submissions />
            </TabPanel>

            <TabPanel value={value} index={8}>
                <Interviews />
            </TabPanel>

            <TabPanel value={value} index={9}>
                <OriginalPost />
            </TabPanel>

            <TabPanel value={value} index={10}>
                <Advertise />
            </TabPanel>
        </Box>
    </>);
}
export default EditJob;








