import TextField from '@mui/material/TextField';
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
//import Radio from '@mui/material/Radio';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import  { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from 'react';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';


import './Applicants.scss';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

type Applicant = {
    canName: string;
    statusPipeline: string;
    entered: string;
    homePhone: string;
    source: string;
};
const data: Applicant[] = [
    {
        canName: 'Max Rivera',
        statusPipeline: '0: ExternalApplication',
        entered: '03/16/2023 14:59:44',
        homePhone: "8482431045",
        source: "LinkedIn",

    },
    {
        canName: 'Zaida Lopez',
        statusPipeline: '0: ExternalApplication',
        entered: '03/15/2023 14:02:21',
        homePhone: "",
        source: "Indeed",

    },
    {
        canName: 'ERIKA E',
        statusPipeline: '0: ExternalApplication',
        entered: '03/14/2023 14:51:45',
        homePhone: "",
        source: "LinkedIn",

    },
    {
        canName: 'JOHN FERRA',
        statusPipeline: '0: ExternalApplication',
        entered: '03/15/2023 08:58:49',
        homePhone: "5208700826",
        source: "Volcanic",

    },
    {
        canName: 'Belki Irzmar',
        statusPipeline: '0: ExternalApplication',
        entered: '03/14/2023 19:49:10',
        homePhone: "",
        source: "Volcanic",

    },
];



const Applicants = () => {

    const columns = useMemo<MRT_ColumnDef<Applicant>[]>(
        () => [
            {
                accessorKey: 'canName', //normal accessorKey
                header: 'Can:Name',
            },
            {
                accessorKey: 'statusPipeline',//access nested data with dot notation
                header: 'StatusPipeline',
            },
            {
                accessorKey: 'entered',
                header: 'Entered',
            },
            {
                accessorKey: 'homePhone',
                header: 'HomePhone',
            },
            {
                accessorKey: 'source',
                header: 'Source',
            },
        ],
        [],
    );

    return (<>
        <TextField className='right' style={{ width: '25%' }}
            size="small"
            id="priority"
            name='priority'
            label='Filter the list'

        >

        </TextField>
        <FilterAltIcon className='right' style={{ marginTop: '15px' }} />
        <br />
        <div>
            <h2 className="advert">Applicants</h2>
            <MaterialReactTable columns={columns} data={data}
                enableDensityToggle={false}
                initialState={{ showGlobalFilter: true }}
                icons={{
                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                }}
                muiTableHeadCellProps={{
                    sx: (theme) => ({
                        background: 'var(--curatelyPurple)',
                        color: 'var(--curatelyWhite)',
                    }),
                }} />
        </div>
        <hr />
        {/* <Tabs style={{ margin: 0 }}>
            <Tab label="Applicants" className="advert" />
        </Tabs> */}
        <Tab label="Applicants" className="advert" />
        <hr style={{ marginLeft: '15px' }} />
        <Grid container spacing={2} justifyContent="flex-start">
            <Grid size={4}>
                <Item>
                    <div className='bigbox'>
                        <div style={{ marginTop: '5px', alignItems: 'center', padding: '10px' }}>
                            <ErrorOutlineIcon style={{ marginRight: '5px' }} /><label>NATASHA KAZIM</label>
                            <br />
                            <div style={{ display: 'flex', marginTop: '5px', alignItems: "center" }}>
                                <EventRepeatIcon style={{ paddingRight: '10px' }} /><label style={{ paddingRight: '20px', marginTop: '10px' }}>08/06/2012</label>
                                <AccessTimeIcon style={{ paddingRight: '10px' }} /><label style={{ paddingRight: '20px', marginTop: '10px' }}>05:42:46</label>
                                <PhoneInTalkIcon style={{ paddingRight: '10px' }} />
                                <label style={{ paddingRight: '15px', marginTop: '10px' }}>(917)379-8183</label>
                            </div>
                            <br />
                            <div>
                                <div className='externalapp'>
                                    <AssignmentIcon className="externalapplication" />
                                    <label className="externalapplication">
                                        ExternalApplication</label>
                                    <div>
                                        <Button className="downloadcv" variant="contained" size="small">
                                            DOWNLOAD CV
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Item>
            </Grid>
        </Grid>
    </>);
}

export default Applicants;