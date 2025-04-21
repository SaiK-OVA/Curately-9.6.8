import { React, useState, useMemo } from '../../../../../shared/modules/React';
import { Tabs, Tab } from '../../../../../shared/modules/MaterialImports/Tabs';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { styled } from '@mui/material/styles';
import { Switch } from '../../../../../shared/modules/MaterialImports/Switch';
import './Hubspot.scss'
import { Grid, Button } from '../../../../../shared/modules/commonImports';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';


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
            className='tabpanel'
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
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));
type Candidate = {
    date: string;
    name: {
        firstName: string;
        lastName: string;
    };
    payRate: string;
    recruiter: string;
    jobStatus: string;
    action: string;
};
const data: Candidate[] = [
    {
        date: '01/01/2001 06:30 AM',
        name: {
            firstName: 'Roberta',
            lastName: 'Frank-Bohm',
        },
        payRate: 'Hourly 5 W2',
        recruiter: 'Adam',
        jobStatus: "",
        action: "",

    },
    {
        date: '01/01/2001 06:30 AM',
        name: {
            firstName: 'Peggy ',
            lastName: 'Davis',
        },
        payRate: 'Hourly 5 W2',
        recruiter: 'Adam',
        jobStatus: "",
        action: "",

    },
];




const Hubspot = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                // accessorKey: 'name.firstName',//access nested data with dot notation
                header: 'Candidate',
                accessorFn: (row: any) => ` Push Contacts : ${row.name.firstName}${row.name.lastName}`,

            },
            {
                accessorKey: 'date', //normal accessorKey
                header: 'Date',

            },

            {
                accessorKey: 'payRate',
                header: 'PayRate',
            },
            {
                accessorKey: 'recruiter',
                header: 'Recruiter',
            },


        ],
        [],
    );
    return (
        <div id="hubSpot">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Basics" />
                        <Tab label="Errors" />
                        <Tab label="Contact Mappings" />
                        <Tab label="Account Mappings" />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Grid container spacing={3}>
                        <Grid
                            sx={{ width: 430, marginLeft: "15px", marginTop: "25px", padding: "14px" }}>
                            <div className='customCard' style={{ overflow: "auto", minHeight: "220px" }}>
                                <div className='card-body '>HubSpot Account</div>
                                <Divider />
                                <Typography className='fs-14 fw-5 p-5'>Connected as: mkarani@curatelyai.com <br></br>
                                    Team Portal ID: 45279392</Typography>
                                <div className="filterBtnWrap mt-8">
                                    <Button variant="text" >Unlink Account</Button>
                                </div>
                            </div>
                            <div className='customCard' style={{ overflow: "auto", minHeight: "220px" }}>
                                <div className='card-body '>Record Visibility</div>
                                <Divider />
                                <div style={{ padding: "15px" }}>
                                    <Typography className='p-3'>Allow users to search for Hubspot records in Apollo?</Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                        <Typography variant="subtitle2">Show all Hubspot contacts and leads in Apollo to the team.</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                        <Typography variant="subtitle2">Show all Hubspot accounts in Apollo to the team.</Typography>
                                    </Stack>
                                </div>
                                <div className="filterBtnWrap mt-8">
                                    <Button variant="text" >Save</Button>
                                </div>
                            </div>
                            <div className='customCard' style={{ overflow: "auto", minHeight: "220px" }}>
                                <div className='card-body '>Sync Now</div>
                                <Divider />
                                <div style={{ padding: "15px" }}>
                                    <Typography className='p-3'>Use these if you've made sync settings changes and want to retroactively apply the changes to all existing records.</Typography>
                                    <div className="sync-button mt-8">
                                        <Button variant="outlined"><FileDownloadIcon />Pull all Hubspot Contacts to Apollo Contacts</Button>
                                        <Button variant="outlined"><FileDownloadIcon />Pull all Hubspot Companies to Apollo Accounts</Button>
                                    </div>
                                </div>
                            </div>
                            <div className='customCard' style={{ overflow: "auto", minHeight: "220px" }}>
                                <div className='card-body'>Deletion Sync Settings</div>
                                <div style={{ padding: "5px" }}>
                                    <Typography className='mb-4'>Use the options below to sync contact, account or false deletions between Apollo and Hubspot. When enabled, we will automatically delete any Apollo records that are linked to deleted Hubspot records, and vice versa.</Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                        <Typography variant="subtitle1">Contacts</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
                                        <Typography variant="subtitle1">Accounts</Typography>
                                    </Stack>
                                </div>

                                <Button variant="contained" size="small" >Save</Button>
                            </div>
                            <div className='customCard' style={{ overflow: "auto", minHeight: "220px" }}>
                                <div className='card-body'>Merge Sync Settings</div>
                                <div style={{ padding: "5px" }}>
                                    <Typography className='mb-4'>Use the options below to sync contact or account merges between Hubspot and Apollo. When enabled, we will automatically merge any Apollo records that are linked to merged records in Hubspot and vice versa.</Typography>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
                                        <Typography variant="subtitle1">Contacts</Typography>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <AntSwitch inputProps={{ 'aria-label': 'ant design' }} />
                                        <Typography variant="subtitle1">Accounts</Typography>
                                    </Stack>
                                </div>

                                <Button variant="contained" size="small" >Save</Button>
                            </div>
                        </Grid>
                        <Grid sx={{ width: 640, marginLeft: "25px", marginTop: "25px", padding: "14px" }}>
                            <div className='customCard p-5'>
                                <div className='card-body'>Push Settings</div>
                                <Divider />
                                <div className='head'>CONTACTS</div>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Push Contacts</label>
                                </Stack>
                                <Typography variant="subtitle1" className='p-4'>Pushes any newly created Contacts to CRM, and updates them in CRM whenever a field in Apollo changes. Whenever a contact is pushed, we also push its account if it isn't already in HubSpot. This does NOT retroactively push contacts. Please enable this, then use the "Push All to Hubspot" button if you wish to push ALL contacts.</Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Only create contacts in Hubspot if at certain stages</label>
                                </Stack>
                                <div className='head'>ACCOUNTS</div>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Push Accounts</label>
                                </Stack>
                                <Typography variant="subtitle1" className='p-4'>Pushes any newly created Accounts to CRM, and updates them in CRM whenever a field in Apollo changes. This does NOT retroactively push accounts. Please enable this, then use the "Push All to Hubspot" button if you wish to push ALL accounts.</Typography>
                                <div className='head'>EMAILS</div>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ padding: "8px" }}>
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Outgoing emails sent within Apollo</label>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ padding: "8px" }}>
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Outgoing emails not sent within Apollo (e.g. within Gmail)</label>
                                </Stack>
                                <Typography variant="subtitle1" sx={{ padding: "5px" }}>If users downloaded the Chrome extension, they can potentially override this setting.</Typography>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ padding: "8px" }}>
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Incoming emails that are replies to emails sent within Apollo</label>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ padding: "8px" }}>
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Incoming emails from all other sources</label>
                                </Stack>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ padding: "8px" }}>
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Push emails even if sender or recipient doesn't exist in Hubspot (we will auto create Contacts not already in Hubspot).</label>
                                </Stack>
                                <Typography variant="subtitle1" sx={{ paddingLeft: "45px" }} >Contact push is currently turned off.</Typography>

                                <div className='head'>TASKS</div>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Push Completed Tasks</label>
                                </Stack>
                                <div className='head'>NOTES</div>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Push Notes</label>
                                </Stack>
                                <div className='head'>MEETING SUMMARIES</div>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Push Meeting Summaries</label>
                                </Stack>
                                <Typography variant="subtitle1" sx={{ paddingLeft: "45px" }}>Automatically push conversation summaries as a Activity/Note to its associated deal</Typography>
                                <div className='head'>PHONE CALLS</div>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <AntSwitch defaultChecked={false} inputProps={{ 'aria-label': 'ant design' }} />
                                    <label>Push Phone Calls</label>

                                </Stack>
                                <div style={{ padding: "18px" }}>
                                    <Typography variant="subtitle2" >Contact Source</Typography>
                                    <Typography variant="subtitle1">Hubspot does not have a customizable contact source by default. (There is a contact source but only Hubspot can edit it)Pick one here.</Typography>
                                    <Typography variant="subtitle2">Account Source</Typography>
                                    <Typography variant="subtitle1">Hubspot does not have a customizable account source by default. (There is an account source but only Hubspot can edit it) Pick one here.</Typography>
                                </div>
                                <div className="filterBtnWrap mt-8">
                                    <Button variant="text" >Save</Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className="MRTableCustom pl-0">
                        <MaterialReactTable columns={columns} data={data}
                            enableDensityToggle={false}
                            initialState={{ showGlobalFilter: true }}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                        />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Contact Mappings
                </CustomTabPanel>
                <CustomTabPanel value={value} index={3}>
                    Account Mappings
                </CustomTabPanel>
            </Box>
        </div>
    )
}
export default Hubspot;