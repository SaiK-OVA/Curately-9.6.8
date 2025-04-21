import { useMemo } from '../../../../../shared/modules/React';
import {Radio, RadioGroup, Checkbox} from '../../../../../shared/modules/MaterialImports/FormElements';
import { FormControl, TextField, FormControlLabel } from '../../../../../shared/modules/MaterialImports/FormInputs';
import Paper from '@mui/material/Paper';
//import Tabs from '@mui/material/Tabs';
import {Tab} from '../../../../../shared/modules/MaterialImports/Tabs';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
import {Grid, Button} from '../../../../../shared/modules/commonImports';
import MailIcon from '@mui/icons-material/Mail';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ManIcon from '@mui/icons-material/Man';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { styled } from '@mui/material/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

//import InputAdornment from '@mui/material/InputAdornment';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";

import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";


import './ShortlistedResumes.scss';

type Resumes = {
    checkbox: string;
    canname: {
        firstName: string;
        lastName: string;
    };
    email: string;
    phone1: string;
    phone2: string;
    status: string;
    username: {
        firstName: string;
        lastName: string;
    };
    lastaction: string;
};

const data: Resumes[] = [
    {
        checkbox: "",
        canname: {
            firstName: "Jason",
            lastName: "gerbitz",
        },
        email: "ason.gerbitz@gmail.com",
        phone1: "(832) 334-2897",
        phone2: "(281) 528-3768",
        status: "Initiate Onboard",
        username: {
            firstName: "Shashwat",
            lastName: "Shukla",
        },
        lastaction: "03/17/2023 11:51",
    },
    {
        checkbox: "",
        canname: {
            firstName: "Kendra",
            lastName: "ball",
        },
        email: "kball858@gmail.com",
        phone1: "(404) 324-1031",
        phone2: "(602) 473-2338",
        status: "Initiate Onboard",
        username: {
            firstName: "Shashwat",
            lastName: "Shukla",
        },
        lastaction: "03/18/2023 11:28",
    },
    {
        checkbox: "",
        canname: {
            firstName: "Jennifer",
            lastName: "suffle",
        },
        email: "jsuffle7@gmail.com",
        phone1: "(786) 295-3544",
        phone2: "(786) 720-4980",
        status: "Initiate Onboard",
        username: {
            firstName: "Uzma",
            lastName: "Bashir",
        },
        lastaction: "03/16/2023 16:45",
    },
    {
        checkbox: "",
        canname: {
            firstName: "Beatriz",
            lastName: "ossa",
        },
        email: "beayanessaangel2016@gmail.com",
        phone1: "(786) 295-3544",
        phone2: "(786) 720-4980",
        status: "Pipeline",
        username: {
            firstName: "Dushyant",
            lastName: "Kumar",
        },
        lastaction: "03/16/2023 11:34",
    },
    {
        checkbox: "",
        canname: {
            firstName: "Angela",
            lastName: "kessler",
        },
        email: "vibrant_eyes81@yahoo.com",
        phone1: "(520) 982-6523",
        phone2: "",
        status: "Contacted",
        username: {
            firstName: "Sudipa",
            lastName: "Majumder",
        },
        lastaction: "03/16/2023 13:57",
    },
];


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));



const ShortlistedResumes = () => {

    const columns = useMemo<MRT_ColumnDef<Resumes>[]>(
        () => [
            {
                accessorKey: 'checkbox',
                header: '',
                Header: <i><Checkbox /></i>,
                Cell: ({ renderedCellValue, row }) => (
                    <span><FormControlLabel label='' style={{ paddingLeft: '10px' }}
                        control={<Checkbox />}
                    /></span>
                )
            },
            {
                accessorKey: 'canname', //normal accessorKey
                header: 'Candidate',
                accessorFn: (row: any) => `${row.canname.firstName.toLowerCase()} ${row.canname.lastName.toLowerCase()}`,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                Cell: ({ row }) => (
                    <span className="no-capitalization">{row.original.email}</span>
                ),
            },

            {
                accessorKey: 'phone1',
                header: 'Phone1',
            },
            {
                accessorKey: 'phone2',
                header: 'Phone2',
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            {
                accessorKey: 'username',
                header: 'Username',
                accessorFn: (row: any) => `${row.username.firstName} ${row.username.lastName}`,
            },
            {
                accessorKey: 'lastaction',
                header: 'LastAction',
            },
        ],
        [],
    );




    const initialShortlistedDetails = {
        "selectaction": "",
        "view": "",
        "list": "",
    };


    const shortlistedSchema = Yup.object().shape({
        "selectaction": Yup.string(),
        "view": Yup.string(),
        "list": Yup.string(),
    });


    const shortlistedFormik = useFormik({
        initialValues: initialShortlistedDetails,
        validationSchema: shortlistedSchema,
        onSubmit: (values) => {
            // console.log(values);
        }
    });
    return (
        <>
            <div className="candidate py-5 px-5 mx-5">
                <form
                    onSubmit={shortlistedFormik.handleSubmit}
                >
                    <Grid>
                        <FormControl>
                            <RadioGroup row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue=""
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="myCandidates" control={<Radio />} label="My Candidates" />
                                <FormControlLabel value="allCandidates" control={<Radio />} label="All Candidates" />
                            </RadioGroup>
                        </FormControl>
                        <TextField placeholder='View' style={{ width: '170px' }}
                            id="view"
                            name="view"
                            value={shortlistedFormik.values.view}
                            size="small"
                            onChange={shortlistedFormik.handleChange}
                            variant="outlined"
                            select
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="any">any</MenuItem>
                            <MenuItem value="some">some</MenuItem>
                        </TextField>
                        <TextField placeholder='Select action' style={{ width: '170px', marginLeft: '10px' }}
                            id="selectaction"
                            name="selectaction"
                            value={shortlistedFormik.values.selectaction}
                            size="small"
                            onChange={shortlistedFormik.handleChange}
                            variant="outlined"
                            select
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="some">some</MenuItem>
                            <MenuItem value="any">any</MenuItem>
                        </TextField>
                        <Button style={{ color: "primary", marginLeft: "55px" }} variant="contained" type="submit">
                            Go
                        </Button>
                        <TextField className='right'
                            size="small"
                            id="list"
                            name='list'
                            label='Filter the list'
                            value={shortlistedFormik.values.list}
                            onChange={shortlistedFormik.handleChange}
                        >
                        </TextField>
                        <FilterAltIcon className='right' style={{ marginTop: '15px' }} />
                    </Grid >
                    <div>
                        <h2 className="advert">Shortlisted Resumes</h2>
                        <div>
                            <MaterialReactTable columns={columns} data={data}
                                enableDensityToggle={false}
                                enableMultiRowSelection={true}
                                enableColumnResizing
                                initialState={{ showGlobalFilter: true }}
                                muiTableHeadCellProps={{
                                    sx: (theme) => ({
                                        background: 'var(--curatelyPurple)',
                                        color: 'var(--curatelyWhite)',
                                    }),

                                }}
                                icons={{
                                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                                }} />
                        </div>
                    </div>

                    {/* <Tabs style={{ margin: 0 }}>
                <Tab label="ShortListed Resumes" className="advert" />
            </Tabs> */}
                    <Tab label="ShortListed Resumes" className="advert" />
                    <hr style={{ marginLeft: '15px' }} />
                    <div className='radio'>
                        <FormControl>
                            <RadioGroup row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue=""
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="myCandidates" control={<Radio />} label="My Candidates" />
                                <FormControlLabel value="allCandidates" control={<Radio />} label="All Candidates" style={{ marginLeft: '80px' }} />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
                        <Grid size={4}>
                            <Item>
                                <div className='bigbox'>
                                    <div style={{ marginTop: '20px', marginBottom: '5px' }}>
                                        <label>SEKHAR GUNDABATTULA</label>
                                        <br />
                                        <div style={{ display: 'flex', marginTop: '5px', alignItems: "center" }}>
                                            <EventRepeatIcon style={{ paddingRight: '10px' }} /><label style={{ paddingRight: '20px', marginTop: '10px' }}>08/06/2012</label>
                                            <AccessTimeIcon style={{ paddingRight: '10px' }} /><label style={{ paddingRight: '20px', marginTop: '10px' }}>05:42:46</label>
                                            <PhoneInTalkIcon style={{ paddingRight: '10px' }} />
                                            <label style={{ paddingRight: '20px', marginTop: '6px' }}>(917)379-8183</label>
                                        </div>
                                        <br />
                                        <div style={{ display: 'flex', alignItems: "center" }}>
                                            <MailIcon style={{ paddingRight: '10px' }} /><label style={{ paddingRight: '20px', marginTop: '6px', alignItems: "center" }}>sathish@ingeniusbs.com</label>
                                            <ManIcon style={{ paddingRight: '10px' }} /><label style={{ paddingRight: '20px', marginTop: '6px', alignItems: "center" }}>Mvali</label>
                                        </div>
                                        <div>
                                            <div className='externalapp'>
                                                <AssignmentIcon style={{ marginTop: '5px', padding: '5px' }} /><label style={{ marginTop: '5px', padding: '3px' }}>External Application</label>
                                                <div>
                                                    <Button className="downloadcv" variant="contained" size="small">
                                                        <VisibilityIcon style={{ marginTop: '3px', padding: '3px' }} /><label style={{ marginTop: '3px', padding: '3px' }}>View Profile</label>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </>
    )
}

export default ShortlistedResumes;