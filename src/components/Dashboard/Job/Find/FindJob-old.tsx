import  { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { useEffect, useMemo, useState } from "../../../../shared/modules/React";
import {Accordion, AccordionDetails, AccordionSummary} from '../../../../shared/modules/MaterialImports/Accordion';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
import CampaignIcon from '@mui/icons-material/Campaign';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import GridViewIcon from '@mui/icons-material/GridView';
import {Button} from '../../../../shared/modules/MaterialImports/Button';
import AddIcon from '@mui/icons-material/Add';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import React from "react";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import {Grid} from '../../../../shared/modules/MaterialImports/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import TitleIcon from '@mui/icons-material/Title';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessIcon from '@mui/icons-material/Business';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import PersonIcon from '@mui/icons-material/Person';
import BiotechIcon from '@mui/icons-material/Biotech';
import PaymentsIcon from '@mui/icons-material/Payments';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SettingsIcon from '@mui/icons-material/Settings';
import FilterListIcon from '@mui/icons-material/FilterList';
import {MenuItem} from '../../../../shared/modules/MaterialImports/Menu';
import {FormGroup} from '../../../../shared/modules/MaterialImports/FormGroup';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Radio, RadioGroup, Checkbox} from '../../../../shared/modules/MaterialImports/FormElements';
import {TextField, FormControlLabel, FormControl} from '../../../../shared/modules/MaterialImports/FormInputs';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';




import './FindJob.scss';


const data = [
    {
        name: 'Jae Ellard', title: 'Facilitator-in-Chief" |Leadership Developer', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'Golden, Colorado', employees: '231,000', email: 'Silva@12345', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'

    },
    {
        name: 'Abed Nahas', title: 'Skype & Teams Support Engineering Manager', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'Egypt', employees: '231,000', email: '', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'
    },
    {
        name: 'Tan Nguyen', title: 'software design', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'Vietnam', employees: '231,000', email: '', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'
    },
    {
        name: 'D Stj', title: '75,000.00 LAW SUIT FOR CARTOONING AND MOCKING THE ACTIVATION HACK!', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'Oklahoma City, Oklahoma', employees: '231,000', email: '', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'
    },
    {
        name: 'Ghasem Ghane', title: '* mokhatabin', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'Semnan, Iran', employees: '231,000', email: '', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'
    },
    {
        name: 'Li Te', title: '.net', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'China', employees: '231,000', email: '', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'
    },
    {
        name: 'Freddy Les', title: 'Full Stack .NET | ANGULAR | REACT | AZure Tech Lead', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'Los Angeles, California', employees: '231,000', email: '', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'
    },
    {
        name: 'Bhargavi G', title: '.NET Developer', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'Hillsboro, Oregon', employees: '231,000', email: '', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'
    },
    {
        name: 'Shilpa Srivari', title: '.net developer', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'Bellevue, Washington', employees: '231,000', email: '', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'
    },
    {
        name: 'Chandni Patel', title: '.NET Developer', company: 'Microsoft', quickActions: 'Save Contact', contactLocation: 'United States', employees: '231,000', email: '', industry: 'Information Technology &Services', keywords: 'business software, developer tools, home, educational software, tablets, search, advertising, servers, windows operating system, windows applications, platforms, smartphones, cloud computing, quantum computing, future of work, productivity, ai, artificial intelligence, machine learning, laptops, mixed reality, virtual reality, gaming, developers, it professional, computers, electronics, mobile phones, shopping'
    }
];

const Findjob = () => {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
    }));

    const [rowSelection, setRowSelection] = useState({});

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);
    const columns: MRT_ColumnDef<(typeof data)[0]>[] = useMemo(
        () => [
            {
                accessorKey: "name", //simple recommended way to define a column
                header: "Name",
                enableColumnPinning: true,
                muiTableHeadCellProps: { sx: { fontSize: "12px", fontWeight: "400" } }, //custom props
                Cell: ({ renderedCellValue, row }) => (
                    <Box className="elli">
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span style={{ fontSize: "14px" }}><Button href="#text-buttons">{renderedCellValue}</Button></span>
                    </Box>
                ),
            },
            {
                accessorFn: (row: any) => row.title, //alternate way
                id: "title", //id required if you use accessorFn instead of accessorKey
                header: "Title",
                Header: <i style={{ fontSize: "12px", fontWeight: "400" }}>Title</i>, //optional custom markup
                Cell: ({ renderedCellValue, row }) => (
                    <Box className="elli"
                        sx={{
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt=""
                            src={row.original.title}
                        />
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span className="elli" style={{ fontSize: "14px", fontWeight: "400" }}>{renderedCellValue}</span>
                        <div style={{ padding: '5px' }}>
                            <span style={{ fontSize: "14px" }}>{<CampaignIcon style={{ paddingRight: '5px' }} />}</span>
                        </div>
                    </Box>
                ),
            },
            {
                accessorKey: "company", //simple recommended way to define a column
                header: "Company",
                muiTableHeadCellProps: { sx: { fontSize: "12px", fontWeight: "400" } }, //custom props
                Cell: ({ renderedCellValue, row }) => (
                    <Box className="elli"
                        sx={{
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt=""
                            src={row.original.company}

                        />
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span><GridViewIcon /></span>
                        <span style={{ fontSize: "14px", fontWeight: "400" }}>{renderedCellValue}</span>
                        <div style={{ padding: '5px' }}>
                            <span>{<AttachFileIcon style={{ paddingRight: '5px' }} />}</span>
                            <span>{< LinkedInIcon style={{ paddingRight: '5px' }} />}</span>
                            <span>{<FacebookIcon style={{ paddingRight: '5px' }} />}</span>
                            <span>{<TwitterIcon style={{ paddingRight: '5px' }} />}</span>
                        </div>

                    </Box>

                ),
            },
            {
                accessorKey: "quickActions", //simple recommended way to define a column
                header: "Quick Actions",
                muiTableHeadCellProps: { sx: { fontSize: "12px", fontWeight: "400" } }, //custom props
                Cell: ({ renderedCellValue, row }) => (
                    <Box className="elli"
                        sx={{
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt=""
                            src={row.original.quickActions}
                        />
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span style={{ fontSize: "14px", fontWeight: "400" }}>{renderedCellValue}</span>
                        <div style={{ padding: '5px' }}>
                            <span>{<MarkEmailReadIcon style={{ paddingRight: '5px' }} />}</span>
                        </div>
                    </Box>
                ),
            },
            {
                accessorKey: "contactLocation", //simple recommended way to define a column
                header: "Contact Location",
                muiTableHeadCellProps: { sx: { fontSize: "12px", fontWeight: "400" } }, //custom props
                Cell: ({ renderedCellValue, row }) => (
                    <Box className="elli">
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span style={{ fontSize: "14px" }}>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorKey: "employees", //simple recommended way to define a column
                header: "# Employees",
                muiTableHeadCellProps: { sx: { fontSize: "12px", fontWeight: "400" } }, //custom props
                Cell: ({ renderedCellValue, row }) => (
                    <Box className="elli">
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span style={{ fontSize: "14px" }}>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorKey: "email", //simple recommended way to define a column
                header: "Email",
                muiTableHeadCellProps: { sx: { fontSize: "12px", fontWeight: "400" } }, //custom props
                Cell: ({ renderedCellValue, row }) => (
                    <Box className="elli"
                        sx={{
                            alignItems: 'center',
                            gap: '1rem',
                        }}
                    >
                        <img
                            alt=""
                            src={row.original.email}
                        />
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}

                        <span style={{ fontSize: "14px", fontWeight: "400" }}>{renderedCellValue}</span>
                        <div style={{ paddingRight: '5px' }}>
                            <span style={{ fontSize: "14px" }}>{<MarkEmailUnreadIcon style={{ paddingRight: '5px' }} />}</span>
                            <span style={{ fontSize: "14px" }}><CloudDownloadIcon style={{ paddingRight: '5px' }} /></span>
                        </div>
                    </Box>
                ),
            },
            {
                accessorKey: "industry", //simple recommended way to define a column
                header: "Industry",
                muiTableHeadCellProps: { sx: { fontSize: "12px", fontWeight: "400" } }, //custom props
                Cell: ({ renderedCellValue, row }) => (
                    <Box className="elli">
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span className="elli" style={{ fontSize: "14px" }}>{renderedCellValue}</span>
                    </Box>
                ),
            },
            {
                accessorKey: "keywords", //simple recommended way to define a column
                header: "Keywords",
                muiTableHeadCellProps: { sx: { fontSize: "12px", fontWeight: "400" } }, //custom props
                Cell: ({ renderedCellValue, row }) => (
                    <Box className="elli">
                        {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                        <span style={{ fontSize: "14px" }}>{renderedCellValue}</span>
                    </Box>
                ),

            }
        ],

        []
    );

    return (
        <div>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <Item style={{ border: "1px solid blue" }}>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<FormatListBulletedIcon className="icons" />}>
                                        Lists
                                    </Button>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button className="sideButtons" startIcon={<PersonIcon className="icons" />}>
                                        People
                                    </Button>
                                    <Button className="sideButtons" startIcon={<HomeWorkIcon className="icons" />}>
                                        Companies
                                    </Button>
                                </AccordionDetails>
                                <Accordion>
                                    <AccordionSummary>
                                        <Button className="sideButtons" startIcon={<SettingsIcon className="icons" style={{ textTransform: 'capitalize' }} />}>
                                            Include lists
                                        </Button>
                                        <Button className="sideButtons" startIcon={<FilterListIcon className="icons" />}>
                                            Most Recent
                                        </Button>
                                    </AccordionSummary>
                                </Accordion>
                                <Box sx={{ width: "50%" }}>
                                    <TextField style={{ width: '200px' }} placeholder="Select lists..."
                                        size="small"
                                        variant="outlined"
                                        select>
                                        <MenuItem value=""><Button className="sideButtons" startIcon={<FormatListBulletedIcon className="icons" />}>All </Button>
                                            <MenuItem value=""><Button className="sideButtons" startIcon={<PersonIcon className="icons" />}>
                                                My
                                            </Button>
                                                <MenuItem value=""><Button className="sideButtons" startIcon={<HomeWorkIcon className="icons" />}>
                                                    Team
                                                </Button></MenuItem>
                                            </MenuItem>
                                        </MenuItem>
                                    </TextField>
                                </Box>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}>
                                        <Button>
                                            Advanced settings
                                        </Button>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <Box sx={{ width: "50%" }}>

                                                <label>Include All lists...</label>
                                                <TextField style={{ width: '200px' }} label="Include All"
                                                    placeholder="Include All lists..."
                                                    size="small"
                                                    variant="outlined"
                                                    select><MenuItem value=""><Button className="sideButtons" startIcon={<FormatListBulletedIcon className="icons" />}>All </Button>
                                                        <MenuItem value=""><Button className="sideButtons" startIcon={<PersonIcon className="icons" />}>
                                                            My
                                                        </Button>
                                                            <MenuItem value=""><Button className="sideButtons" startIcon={<HomeWorkIcon className="icons" />}>
                                                                Team
                                                            </Button></MenuItem>
                                                        </MenuItem>
                                                    </MenuItem></TextField>
                                            </Box>
                                        </div>
                                        <div>
                                            <Box sx={{ width: "50%" }}>
                                                <TextField style={{ width: '200px' }} label="Exclude" placeholder="Exclude lists..."
                                                    size="small"
                                                    variant="outlined"
                                                    select><MenuItem value=""><Button className="sideButtons" startIcon={<FormatListBulletedIcon className="icons" />}>All </Button>
                                                        <MenuItem value=""><Button className="sideButtons" startIcon={<PersonIcon className="icons" />}>
                                                            My
                                                        </Button>
                                                            <MenuItem value=""><Button className="sideButtons" startIcon={<HomeWorkIcon className="icons" />}>
                                                                Team
                                                            </Button></MenuItem>
                                                        </MenuItem>
                                                    </MenuItem></TextField>
                                            </Box>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<PersonAddAlt1Icon className="icons" />}>
                                        Persona
                                    </Button>
                                </AccordionSummary>
                            </Accordion>

                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<BadgeIcon className="icons" />}>
                                        Name
                                    </Button>
                                </AccordionSummary>
                                <AccordionSummary>
                                    <TextField label="Enter name..." variant="outlined" />
                                </AccordionSummary>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<TitleIcon className="icons" />}>
                                        Job Titles
                                    </Button>
                                </AccordionSummary>
                                <Accordion>
                                    <Item>
                                        <Stack style={{ border: '1px solid blue' }}>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue=""
                                                    name="radio-buttons-group"
                                                >
                                                    <FormControl>
                                                        <FormControlLabel value="Isanyof" control={<Radio />} label="Is any of" />
                                                        <Accordion>
                                                            <AccordionSummary>
                                                                <Box sx={{ width: "50%" }}>
                                                                    <TextField style={{ width: '200px' }} placeholder="Select lists..."
                                                                        size="small"
                                                                        variant="outlined"
                                                                        select>
                                                                        <MenuItem value="manager">manager
                                                                        </MenuItem>
                                                                        <MenuItem value="project manager">project manager
                                                                        </MenuItem>
                                                                        <MenuItem value="teacher">teacher</MenuItem>
                                                                        <MenuItem value="owner">owner</MenuItem>
                                                                        <MenuItem value="student">student</MenuItem>
                                                                        <MenuItem value="director">director</MenuItem>
                                                                        <MenuItem value="software engineer">software engineer</MenuItem>
                                                                        <MenuItem value="consultant">consultant</MenuItem>
                                                                        <MenuItem value="account manager">account manager</MenuItem>
                                                                        <MenuItem value="engineer">engineer</MenuItem>
                                                                        <MenuItem value="professor">professor</MenuItem>
                                                                        <MenuItem value="sales manager">sales manager</MenuItem>
                                                                        <MenuItem value="sales">sales</MenuItem>
                                                                        <MenuItem value="partner">partner</MenuItem>
                                                                        <MenuItem value="associate">associate</MenuItem>
                                                                        <MenuItem value="president">president</MenuItem>
                                                                        <MenuItem value="administrative assistant">administrative assistant</MenuItem>
                                                                        <MenuItem value="supervisor">supervisor</MenuItem>
                                                                        <MenuItem value="general manager">general manager</MenuItem>
                                                                        <MenuItem value="realtor">realtor</MenuItem>
                                                                    </TextField>
                                                                </Box>
                                                            </AccordionSummary>
                                                        </Accordion>
                                                        <Accordion>
                                                            <AccordionDetails>
                                                                <FormControl>
                                                                    <FormControlLabel control={<Checkbox />} label="Is not any of" />
                                                                </FormControl>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                        <Accordion >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}>
                                                                <TextField label="Enter titles to exclude" variant="outlined" />
                                                            </AccordionSummary>
                                                        </Accordion>
                                                        <FormControl>
                                                            <FormControlLabel control={<Checkbox />} label="Include past job titles" />
                                                        </FormControl>
                                                        <Accordion >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <TextField label="Search for a past job title" variant="outlined" />
                                                            </AccordionSummary>
                                                        </Accordion>

                                                    </FormControl>
                                                    <Stack>
                                                        <FormControlLabel value="isknown" control={<Radio />} label="Is known" />
                                                    </Stack>
                                                    <Stack>
                                                        <FormControlLabel value="isunknown " control={<Radio />} label="Is unknown" />
                                                    </Stack>
                                                </RadioGroup>
                                            </FormControl>
                                        </Stack>
                                    </Item>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Button className="manage">
                                            Management Level
                                        </Button>
                                    </AccordionSummary>
                                    <div>
                                        <FormGroup style={{ padding: '25px', marginTop: "0px" }}>
                                            <FormControlLabel control={<Checkbox />} label="Owner" />
                                            <FormControlLabel control={<Checkbox />} label="Founder" />
                                            <FormControlLabel control={<Checkbox />} label="C suite" />
                                            <FormControlLabel control={<Checkbox />} label="Partner" />
                                            <FormControlLabel control={<Checkbox />} label="Vp" />
                                            <FormControlLabel control={<Checkbox />} label="Head" />
                                            <FormControlLabel control={<Checkbox />} label="Director" />
                                            <FormControlLabel control={<Checkbox />} label="Manager" />
                                            <FormControlLabel control={<Checkbox />} label="Senior" />
                                            <FormControlLabel control={<Checkbox />} label="Entry" />
                                            <FormControlLabel control={<Checkbox />} label="Intern" />
                                        </FormGroup>
                                    </div>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Button className="manage">
                                            Departments & Job Function
                                        </Button>
                                    </AccordionSummary>
                                    <TextField label="Search departments" variant="outlined" />
                                    <div>
                                        <FormGroup style={{ padding: '25px' }}>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="C-Suite" /> <AddIcon />
                                            </Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Engineering & Technical" /><AddIcon />
                                            </Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Design" /> <AddIcon /></Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Education" /> <AddIcon /></Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Finance" /> <AddIcon />
                                            </Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Human Resources" /> <AddIcon /></Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Information Technology" /> <AddIcon /></Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Legal" /> <AddIcon /></Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Marketing" /> <AddIcon /></Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Medical & Health" /> <AddIcon /></Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Operations" /> <AddIcon /></Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Sales" /> <AddIcon />
                                            </Button>
                                            <Button className="manage" style={{ justifyContent: 'flex-start' }}>
                                                <FormControlLabel control={<Checkbox />} label="Consulting" /> <AddIcon />
                                            </Button>
                                        </FormGroup>
                                    </div>
                                </Accordion>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item style={{ border: "1px solid blue" }}>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<HomeWorkIcon className="icons" />}>
                                        Company
                                    </Button>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Item>
                                        <Stack style={{ border: '1px solid blue' }}>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue=""
                                                    name="radio-buttons-group"
                                                >
                                                    <FormControl>
                                                        <FormControlLabel value="Isanyof" control={<Radio />} label="Is any of" />
                                                        <Accordion >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <TextField label="Enter companies..." variant="outlined" />
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <FormControl>
                                                                    <FormControlLabel control={<Checkbox />} label="Is not any of" />
                                                                </FormControl>
                                                                <Accordion >
                                                                    <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                    >
                                                                        <TextField label="Enter companies to exclude..." variant="outlined" />
                                                                    </AccordionSummary>
                                                                </Accordion>
                                                                <FormControl>
                                                                    <FormControlLabel control={<Checkbox />} label="Include past company" />
                                                                </FormControl>
                                                                <Accordion >
                                                                    <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                    >
                                                                        <TextField label="Enter past companies..." variant="outlined" />
                                                                    </AccordionSummary>
                                                                </Accordion>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </FormControl>
                                                    <Stack>
                                                        <FormControlLabel value="isknown" control={<Radio />} label="Is known" />
                                                    </Stack>
                                                    <Stack>
                                                        <FormControlLabel value="isunknown " control={<Radio />} label="Is unknown" />
                                                    </Stack>
                                                </RadioGroup>
                                            </FormControl>
                                        </Stack>
                                    </Item>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item style={{ border: "1px solid blue" }}>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<LocationOnIcon className="icons" />}>
                                        Location
                                    </Button>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button className="sideButtons" startIcon={<PersonIcon className="icons" />}>
                                        Contact
                                    </Button>
                                    <Button className="sideButtons" startIcon={<HomeWorkIcon className="icons" />}>
                                        Account HQ
                                    </Button>
                                    <Item>
                                        <Stack>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue=""
                                                    name="radio-buttons-group"
                                                >
                                                    <FormControl>
                                                        <FormControlLabel value="selectregion" control={<Radio />} label="Select region" />
                                                        <Accordion >
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                            >
                                                                <div>City / State / Country / ZIP
                                                                    <TextField label="Enter locations..." variant="outlined" />
                                                                </div>
                                                            </AccordionSummary>
                                                            <Accordion>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}>
                                                                    <Button>
                                                                        Exclude locations
                                                                    </Button>
                                                                </AccordionSummary>
                                                                <Accordion >
                                                                    <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                    >
                                                                        <div>City / State / Country to exclude:
                                                                            <TextField label="Enter locations to exclude..." variant="outlined" />
                                                                        </div>
                                                                    </AccordionSummary>
                                                                </Accordion>
                                                            </Accordion>
                                                        </Accordion>
                                                    </FormControl>
                                                    <Stack>
                                                        <FormControlLabel value="selectzipcoderadius" control={<Radio />} label="Select ZIP code radius" />
                                                    </Stack>
                                                </RadioGroup>
                                            </FormControl>
                                        </Stack>
                                    </Item>
                                </AccordionDetails>

                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<SupervisorAccountIcon className="icons" />}>
                                        #Employees
                                    </Button>
                                </AccordionSummary>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >

                                    <Button className="sideButtons" startIcon={<BusinessIcon className="icons" />}>
                                        Industry & Keywords
                                    </Button>
                                </AccordionSummary>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<AssessmentIcon className="icons" />}>
                                        Buying Intent
                                    </Button>
                                </AccordionSummary>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<MarkEmailReadIcon className="icons" />}>
                                        Email Status
                                    </Button>
                                </AccordionSummary>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<PersonIcon className="icons" />}>
                                        Owner
                                    </Button>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button className="sideButtons" startIcon={<PersonIcon className="icons" />}>
                                        Contact
                                    </Button>
                                    <Button className="sideButtons" startIcon={<HomeWorkIcon className="icons" />}>
                                        Account
                                    </Button>
                                </AccordionDetails>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<BiotechIcon className="icons" />}>
                                        Technologies
                                    </Button>
                                </AccordionSummary>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<AttachMoneyIcon className="icons" />}>
                                        Revenue
                                    </Button>
                                </AccordionSummary>
                            </Accordion>
                        </Stack>
                    </Item>
                    <Item>
                        <Stack>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Button className="sideButtons" startIcon={<PaymentsIcon className="icons" />}>
                                        Funding
                                    </Button>
                                </AccordionSummary>
                            </Accordion>
                        </Stack>
                    </Item>
                </Grid>
                <Grid size={9}>
                    <Item>
                        <Stack direction="row" spacing={3}>
                            <Button variant="outlined" className="topRowButtons" startIcon={<AddIcon className="icons" />}>
                                Save
                            </Button>
                            <Button variant="outlined" className="topRowButtons" startIcon={<EmailIcon className="icons" />}>
                                Email
                            </Button>
                            <Button variant="outlined" className="topRowButtons" startIcon={<SendIcon className="icons" />}>
                                Sequence
                            </Button>
                            <Button variant="outlined" className="topRowButtons" startIcon={<PlaylistAddIcon className="icons" />}>
                                Lists
                            </Button>
                            <Button variant="outlined" className="topRowButtons" startIcon={<FileDownloadIcon className="icons" />}>
                                Export
                            </Button>
                            <Button variant="outlined" className="topRowButtons" startIcon={<EditIcon className="icons" />}>
                                Edit
                            </Button>
                            <Button variant="outlined" className="topRowButtons" startIcon={<CloudUploadIcon className="icons" />}>
                                Push to CRM/ATS
                            </Button>
                            <Button variant="outlined" className="topRowButtons" startIcon={<MoreHorizIcon className="icons" />}>
                            </Button>
                            <Button variant="outlined" className="topRowButtons" startIcon={<FormatLineSpacingIcon className="icons" />}>
                                Relevance
                            </Button>
                        </Stack>
                        <MaterialReactTable
                            columns={columns} enableRowSelection
                            data={data}
                            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                            state={{ rowSelection }} //pass our managed row selection state to the table to use
                            enablePinning
                            initialState={{ columnPinning: { left: ['name'] }, density: 'compact', showGlobalFilter: true }}
                            enableColumnResizing
                            enableGlobalFilterModes
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                        />
                    </Item>
                </Grid>
            </Grid >
        </div >
    );
}

export default Findjob;






