import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Tab } from '@mui/material'
import React from 'react'
import ExecutiveInsights from './ExecutiveInsights'
import { userLocalData } from '../../../../../shared/services/userData'
import ExecutiveInsightsBMSOverview from './ExecutiveInsightsBMSOverview'

const ExecutiveInsightsMaster = () => {

    const [value, setValue] = React.useState('1');
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  return (
    [6].includes(userLocalData.getvalue("clientId")) ? ( 
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Overview" value="1" />
                <Tab label="KPI's" value="2" />
                <Tab label="Weekly Trend" value="3" />
                <Tab label="Insights" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box sx={{ flexGrow: 1 }}>
                <ExecutiveInsightsBMSOverview dashboardId="yWYEablYEq" />
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ flexGrow: 1 }}>
                <ExecutiveInsightsBMSOverview dashboardId="vgAGzNB1Kl" />
              </Box>
            </TabPanel>
            <TabPanel value="3">
              <Box sx={{ flexGrow: 1 }}>
                <ExecutiveInsightsBMSOverview dashboardId="aQ1ypJEx8o" />
              </Box>
            </TabPanel>
            <TabPanel value="4">
              <Box sx={{ flexGrow: 1 }}>
                <ExecutiveInsightsBMSOverview dashboardId="ovAR0QexlV" />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
    ) : (
        <ExecutiveInsights />
    )
  )
}
   
export default ExecutiveInsightsMaster
