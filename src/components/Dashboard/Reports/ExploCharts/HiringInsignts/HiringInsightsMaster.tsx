import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Tab } from '@mui/material';
import React from 'react'
import HiringInsights from './HiringInsights';
// import RaceandEthnicity from './RaceandEthnicity';

const HiringInsightsMaster = () => {

      const [value, setValue] = React.useState('1');
      const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };
    return (
        <>
          <div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Overview" value="1" />
                    {/* <Tab label="Race and Ethnicity" value="2" /> */}
                   
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Box sx={{ flexGrow: 1 }}>
                  <HiringInsights />
                  </Box>
                </TabPanel>
                {/* <TabPanel value="2">
                  <Box sx={{ flexGrow: 1 }}>
                  <RaceandEthnicity />
                  </Box>
                </TabPanel> */}
              
              </TabContext>
            </Box>
          </div>
    
        </>
      )
}

export default HiringInsightsMaster
