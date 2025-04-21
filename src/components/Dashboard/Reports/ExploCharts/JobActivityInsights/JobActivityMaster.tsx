import { React, useEffect, useState } from "../../../../../shared/modules/React";
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Tab } from '../../../../../shared/modules/MaterialImports/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import UseExplo from "../UseExplo";

const JobActivityMaster = () => {
    const [value, setValue] = React.useState('1');
    const [currentEmbedID, setCurrentEmbedID] = useState('');
    
    // Get embedID based on the current tab value
    const getEmbedID = (tabValue: string) => {
        switch (tabValue) {
            case '1':
                return '08YWOzNYW4';
            case '2':
                return 'jDxe3GvALG';
            case '3':
                return 'QgYw7GpYvR';
            case '4':
                return '2WYnjGkYZX';
        }
    };
    
    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        const newEmbedID = getEmbedID(value);
        if (newEmbedID) {
            setCurrentEmbedID(newEmbedID);
        }
    }, [value]);

    const { jwt } = UseExplo({ embedID: currentEmbedID });

    const renderExploDashboard = () => {
        if (!jwt) {
            return <div>Loading dashboard...</div>;
        }
        
        return (
            <explo-dashboard
                dash-jwt={jwt}
                updateUrlParams={true}
                isProduction={true}
            />
        );
    };
    

    const renderTabContent = (tabValue: string) => {
        if (value !== tabValue) {
            return null;
        }
        
        return (
            <Box sx={{ flexGrow: 1 }}>
                {renderExploDashboard()}
            </Box>
        );
    };
           
    return (
        <>
            <div>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Job Export" value="1" />
                                <Tab label="Job Activity Export" value="2" />
                                <Tab label="Candidate Export" value="3" />
                                <Tab label="Text Message Export" value="4" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {renderTabContent('1')}
                        </TabPanel>
                        <TabPanel value="2">
                            {renderTabContent('2')}
                        </TabPanel>
                        <TabPanel value="3">
                            {renderTabContent('3')}
                        </TabPanel>
                        <TabPanel value="4">
                            {renderTabContent('4')}
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
        </>
    );
};

export default JobActivityMaster;


