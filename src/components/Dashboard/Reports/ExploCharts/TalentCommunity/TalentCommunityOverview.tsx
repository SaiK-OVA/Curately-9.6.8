import { React } from "../../../../../shared/modules/React";
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Tab } from '../../../../../shared/modules/MaterialImports/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import TalentCommunityDEI from "./TalentCommunityDEI";
import TalentCommOverview from "./TalentCommOverview";
import TalentCommunityApplications from "./TalentCommunityApplications";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'explo-dashboard': any;
    }
  }
}

const TalentCommunityOverview = () => {

  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
                <Tab label="Applications" value="2" />
                {/* <Tab label="DEI" value="3" /> */}
                {/* <Tab label="DEI" value="4" /> */}
              </TabList>
            </Box>
            <TabPanel value="1">
              <Box sx={{ flexGrow: 1 }}>
              <TalentCommOverview />
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={{ flexGrow: 1 }}>
              <TalentCommunityApplications />
              </Box>
            </TabPanel>
            {/* <TabPanel value="4">
              <Box sx={{ flexGrow: 1 }}>
                <TalentCommunityDEI/>
              </Box>
            </TabPanel> */}
          </TabContext>
        </Box>
      </div>

    </>
  )
}

export default TalentCommunityOverview;
