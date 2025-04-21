import { React } from '../../../../../../shared/modules/React';
import {Tabs, Tab} from '../../../../../../shared/modules/MaterialImports/Tabs';
// import Typography from '@mui/material/Typography';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import {Stack} from '../../../../../../shared/modules/MaterialImports/Stack';
// import { SystemCheckerCriteria } from './SystemChecker';
import SystemCheckerReport from './SystemCheckerReport';

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
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

// https://resume.accuick.com/Pipl/workflow_systemchecker_save.jsp


const SystemChecker = ({ workflowName, stageId, passedStageData = {} }: { workflowName: string, stageId: string, passedStageData: any }) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ padding: "20px", borderRadius: "4px", boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.17) !important' }}>
            <Stack direction="row" spacing="3">
                {/* <Stack >
                    <Box sx={{ height: '600px', width: '250px' }}>
                        <Typography variant='h4'>Company</Typography>
                    </Box>



                </Stack> */}

                <Stack sx={{ width: '100%' }}>

                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ alignItems: 'center' }}>
                            <Tab label="System checker criteria" {...a11yProps(0)} />
                            <Tab label="System checker report" {...a11yProps(1)} />

                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        {/* <SystemCheckerCriteria workflowName={workflowName} stageId={stageId} passedStageData={passedStageData} /> */}

                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <SystemCheckerReport />
                    </CustomTabPanel>
                </Stack>

            </Stack >

        </Box >
    );
}


export default SystemChecker;