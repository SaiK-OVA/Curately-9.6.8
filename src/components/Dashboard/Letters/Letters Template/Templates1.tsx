// import * as React from 'react';
import {Grid, Button, InputLabel } from '../../../../shared/modules/commonImports';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {MenuItem} from '../../../../shared/modules/MaterialImports/Menu';
import {Box} from '../../../../shared/modules/MaterialImports/Box';

import {Radio, RadioGroup, Select} from '../../../../shared/modules/MaterialImports/FormElements';
import {FormControlLabel, FormControl, TextField} from '../../../../shared/modules/MaterialImports/FormInputs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Records from './templateslist.json';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import FormatTextdirectionLToRIcon from '@mui/icons-material/FormatTextdirectionLToR';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import SubscriptIcon from '@mui/icons-material/Subscript';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {Divider} from '../../../../shared/modules/MaterialImports/Divider';
import Link from '@mui/material/Link';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkOffIcon from '@mui/icons-material/LinkOff';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import HMobiledataIcon from '@mui/icons-material/HMobiledata';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';

import { useFormik, Yup } from "../../../../shared/modules/Formik";


import './Templates.scss';




// function editjob(
//     TemplateName: string,
//     CreatedBy: string,
//     DateCreated: string,
// ) {
//     return { TemplateName, CreatedBy, DateCreated }
// };
// const edit = [
//     editjob('Sourabhl', 'M', '06/05/2023'),
//     editjob('Sourabhl', 'Mv', '06/04/2023'),
//     editjob('Sourabhl', 'Mva', '06/03/2023'),
//     editjob('Sourabhl', 'Mval', '06/02/2023'),
//     editjob('Sourabhl', 'Mvali', '06/01/2023'),
//     editjob('Sourabhl', 'Ad', '06/02/2023'),
//     editjob('Sourabhl', 'Adi', '06/07/2023'),
//     editjob('Sourabhl', 'Adity', '06/04/2023'),
//     editjob('Sourabhl', 'Adity', '06/09/2023'),
//     editjob('Sourabhl', 'Adityak', '06/05/2023'),
//     editjob('Sourabhl', 'Sour', '06/01/2023'),
//     editjob('SouEmail', 'Sourabh', '06/05/2023'),
//     editjob('Sour Email', 'Sou', '06/08/2023'),
//     editjob('SouEmail', 'M', '06/05/2023'),
//     editjob('SouEmail', 'Mv', '06/04/2023'),
//     editjob('SouEmail', 'Mva', '06/03/2023'),
//     editjob('SouEmail', 'Mval', '06/02/2023'),
//     editjob('SouEmail', 'Mvali', '06/01/2023'),
//     editjob('SouEmail', 'Ad', '06/02/2023'),
//     editjob('SouEmail', 'Adi', '06/07/2023'),
//     editjob('SouEmail', 'Adity', '06/04/2023'),
//     editjob('SouEmail', 'Adity', '06/09/2023'),
//     editjob('SouEmail', 'Adityak', '06/05/2023'),
//     editjob('Sourabhl', 'Sour', '06/01/2023'),
//     editjob('SouEmail', 'Sourabh', '06/05/2023'),
//     editjob('Sour Email', 'Sou', '06/08/2023'),


// ];


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
}));

const Templates = () => {
    const initialEditjobDetails = {
        "templatename": "",
        "templateId": "",
        "subject": "",
        "subjectmergefields": "",
        "bodymergefields": "",
        "attachicon": "",
        "texticon": "",
    };


    const editjobSchema = Yup.object().shape({
        "templatename": Yup.string(),
        "templateId": Yup.string(),
        "subject": Yup.string(),
        "subjectmergefields": Yup.string(),
        'bodymergefields': Yup.string(),
        "attachicon": Yup.string(),
        "texticon": Yup.string(),
    });


    const editjobFormik = useFormik({
        initialValues: initialEditjobDetails,
        validationSchema: editjobSchema,
        onSubmit: (values) => {
            // console.log(values);
        }
    });

    return (
        <>
            <div >
                <form
                    onSubmit={editjobFormik.handleSubmit}
                >
                    <Box display="flex"
                        sx={{
                            justifyContent: 'center',
                        }}
                    >
                        <div className='fix'>
                            <Item>
                                <Button className='temp' variant="contained" color="primary">New</Button>
                                <Button className='temp' variant="contained" color="primary">Save</Button>
                                <Button className='temp' variant="contained" color="primary">Clone</Button>
                                <Button className='temp' variant="contained" color="primary">Delete</Button>
                                <TextField fullWidth style={{ width: '120px', padding: '2px' }}
                                    select
                                    size="small" label="Body Merge Fields:" placeholder='Merge Fields'
                                    id="bodymergefields"
                                    name="bodymergefields"
                                    value={editjobFormik.values.bodymergefields}
                                    onChange={editjobFormik.handleChange}
                                    variant="outlined"
                                >
                                    <MenuItem value="Merge Fields">Merge Fields</MenuItem>
                                    <MenuItem value="First name">First name</MenuItem>
                                    <MenuItem value="Last name">Last name</MenuItem>
                                    <MenuItem value="First name and Last name">First name and Last name</MenuItem>
                                    <MenuItem value="Job term">Job term</MenuItem>
                                    <MenuItem value="Job City">Job City</MenuItem>
                                    <MenuItem value="Job State">Job State</MenuItem>
                                    <MenuItem value="Job title">Job title</MenuItem>
                                    <MenuItem value="Pay range">Pay range</MenuItem>
                                    <MenuItem value="Target Pay">Target Pay</MenuItem>
                                    <MenuItem value="Public Job description">Public Job description </MenuItem>
                                    <MenuItem value="Email signature">Email signature</MenuItem>
                                    <MenuItem value="Skill Metric">Skill Metric</MenuItem>
                                </TextField>

                                <TextField fullWidth style={{ width: '120px', padding: '2px' }} placeholder='Merge Fields' label="Subject Merge Fields:"
                                    select
                                    size="small"
                                    id="subjectmergefields"
                                    name="subjectmergefields"
                                    value={editjobFormik.values.subjectmergefields}
                                    onChange={editjobFormik.handleChange}
                                    variant="outlined"
                                >
                                    <MenuItem value="Merge Fields">Merge Fields</MenuItem>
                                    <MenuItem value="First name">First name</MenuItem>
                                    <MenuItem value="Last name">Last name</MenuItem>
                                    <MenuItem value="First name and Last name">First name and Last name</MenuItem>
                                    <MenuItem value="Job term">Job term</MenuItem>
                                    <MenuItem value="Job City">Job City</MenuItem>
                                    <MenuItem value="Job State">Job State</MenuItem>
                                    <MenuItem value="Job title">Job title</MenuItem>
                                    <MenuItem value="Pay range">Pay range</MenuItem>
                                    <MenuItem value="Target Pay">Target Pay</MenuItem>
                                    <MenuItem value="Public Job description">Public Job description</MenuItem>
                                </TextField>
                            </Item>
                        </div>
                    </Box >
                    <div className='main'>
                        <Box>
                            <FormControl>
                                <RadioGroup row
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue=""
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="myCandidates" control={<Radio />} label="My Templates" />
                                    <FormControlLabel value="allCandidates" control={<Radio />} label="All Templates" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <Item>
                                        <TableContainer className='tab'>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="right"><label>ID</label></TableCell>
                                                        <TableCell align="right"><label>Label</label></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody style={{ overflow: 'scroll', padding: "16px", marginTop: "30px" }}>
                                                    {Records.map((row) => (
                                                        <TableRow >
                                                            <TableCell align="right">{row.id}</TableCell>
                                                            <TableCell align="right">{row.label}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Item>
                                </Grid>
                                <Grid size={8}>
                                    <Item className='lab'>
                                        <Box>
                                            <div className='tab'>
                                                <div>
                                                    <label style={{ marginTop: '15px' }}>Template Id:</label>
                                                    <div style={{ marginTop: '10px' }} className="row-full"><p style={{ paddingLeft: '10px' }}>189</p>
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '10px' }}>
                                                    <label>Template Name*:</label>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <TextField size="small"
                                                            id="templatename"
                                                            name='templatename'
                                                            value={editjobFormik.values.templatename}
                                                            onChange={editjobFormik.handleChange}
                                                            label="Sourabh follow up Email" />
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '10px' }}>
                                                    <label>Description:</label>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <TextField size="small"
                                                            id="subject"
                                                            name='subject'
                                                            value={editjobFormik.values.subject}
                                                            onChange={editjobFormik.handleChange} />
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '10px' }}>
                                                    <label>Subject*:</label>
                                                    <div style={{ marginTop: '10px' }}>
                                                        <TextField size="small"
                                                            id="subject"
                                                            name='subject'
                                                            value={editjobFormik.values.subject}
                                                            onChange={editjobFormik.handleChange}
                                                            label="Exciting job opportunity just for you!" />
                                                    </div>
                                                </div>
                                                <div style={{ marginTop: '10px' }}>
                                                    <label>Body*:</label>

                                                    <div>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                width: 'fit-content',
                                                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                                                borderRadius: 1,
                                                                bgcolor: 'background.paper',
                                                                color: 'text.secondary',
                                                                '& svg': {
                                                                    m: 0.5,
                                                                },
                                                                '& hr': {
                                                                    mx: 0.5,
                                                                },
                                                            }}
                                                        >
                                                            <FormatBoldIcon />
                                                            <FormatItalicIcon />
                                                            <StrikethroughSIcon />
                                                            <Divider orientation="vertical" flexItem />
                                                            <UndoIcon />
                                                            <RedoIcon />
                                                            <Divider orientation="vertical" flexItem />
                                                            <Box sx={{ minWidth: 65 }}>
                                                                <FormControl fullWidth>
                                                                    <InputLabel><FormatTextdirectionLToRIcon /></InputLabel>
                                                                    <Select
                                                                        id="texticon"
                                                                        name="texticon"
                                                                        value={editjobFormik.values.texticon}
                                                                        onChange={editjobFormik.handleChange}
                                                                        variant="outlined"
                                                                    >
                                                                        <MenuItem value="<FormatTextdirectionLToRIcon /> Paragraph"><FormatTextdirectionLToRIcon />Paragraph</MenuItem>
                                                                        <MenuItem value="<FormatQuoteIcon/> Quote"><FormatQuoteIcon />Quote</MenuItem>
                                                                        <MenuItem value="<HMobiledataIcon/><LooksOneIcon/>Header 1"><HMobiledataIcon /><LooksOneIcon />Header 1</MenuItem>
                                                                        <MenuItem value="<HMobiledataIcon/><LooksTwoIcon/>Header 2"><HMobiledataIcon /><LooksTwoIcon />Header 2</MenuItem>
                                                                        <MenuItem value="<HMobiledataIcon/><Looks3Icon/>Header 3"><HMobiledataIcon /><Looks3Icon />Header 3</MenuItem>
                                                                        <MenuItem value="<HMobiledataIcon/><Looks4Icon/>Header 4"><HMobiledataIcon /><Looks4Icon />Header 4</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                            <Divider orientation="vertical" flexItem />
                                                            <SuperscriptIcon />
                                                            <SubscriptIcon />
                                                            <Divider orientation="vertical" flexItem />
                                                            <Box sx={{ minWidth: 65 }}>
                                                                <FormControl fullWidth>
                                                                    <InputLabel><AttachFileIcon /></InputLabel>
                                                                    <Select
                                                                        id="attachicon"
                                                                        name="attachicon"
                                                                        value={editjobFormik.values.attachicon}
                                                                        onChange={editjobFormik.handleChange}
                                                                    >
                                                                        <MenuItem value="<AddLinkIcon /> Insert link"><AddLinkIcon /> Insert link</MenuItem>
                                                                        <MenuItem value="<LinkOffIcon/> Remove link"><LinkOffIcon /> Remove link</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                            <Divider orientation="vertical" flexItem />
                                                            <FormatAlignLeftIcon />
                                                            <FormatAlignCenterIcon />
                                                            <FormatAlignRightIcon />
                                                            <FormatAlignJustifyIcon />
                                                            <Divider orientation="vertical" flexItem />
                                                            <FormatListBulletedIcon />
                                                            <FormatListNumberedIcon />
                                                        </Box>
                                                    </div>
                                                    <div style={{ height: "140px", overflow: "scroll" }}>
                                                        <Box sx={{ width: 'fit-content', border: (theme) => `1px solid ${theme.palette.divider}` }}>
                                                            <div style={{ marginTop: '15px' }}>
                                                                < label className='lab'>First name</label>

                                                                <p className='para'>Hope you're doing awesome! I wanted to drop you a quick email to say a big thank you for showing interest in the amazing job opportunity we have right now. We're super stoked to have you as a potential candidate!</p>
                                                                <p className='para'>
                                                                    Guess what? We're so close to completing the process! If you need any help or have any questions about the remaining steps, I've got your back. Feel free to reach out whenever suits you best, and we can chat over a call or grab a virtual coffee to go through everything together.
                                                                </p>
                                                                <p className='para'>Oh, and here's the best part: you can wrap up your submission journey in a jiffy by clicking the link below. Easy!</p>

                                                                <label className='lab'>CandidateLink</label>

                                                                <p className='para'>  Once again, thanks for your interest and dedication. We truly believe you've got the skills and enthusiasm to rock this role. Can't wait to have you on board! If there's anything else I can do to assist you, just let me know.</p>

                                                                <p className='para'>Keep being awesome!</p>
                                                                <label className='lab'> Signature</label>
                                                            </div>
                                                        </Box>
                                                    </div>

                                                    <div className='lab'>
                                                        <Link href="#" underline="none">
                                                            {'Attachments...'}
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                    </div>
                </form >
            </div >
        </>
    );
}
export default Templates;