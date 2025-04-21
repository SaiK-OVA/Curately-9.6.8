import  { React, useState, useRef } from "../../../../shared/modules/React";
import {Stack} from "../../../../shared/modules/MaterialImports/Stack";
import {Grid} from "../../../../shared/modules/MaterialImports/Grid";
import {Typography} from "../../../../shared/modules/MaterialImports/Typography";
import Slider from '@mui/material/Slider';
import {Accordion, AccordionSummary, AccordionDetails} from '../../../../shared/modules/MaterialImports/Accordion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box} from "../../../../shared/modules/MaterialImports/Box";
import {CardContent} from '../../../../shared/modules/MaterialImports/Card';
import PieChart from "../../Reports/Charts/Demo/PieChart/PieChart";

// const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
import {FormGroup} from '../../../../shared/modules/MaterialImports/FormGroup';
import {FormControlLabel} from '../../../../shared/modules/MaterialImports/FormInputs';
import {Checkbox} from "../../../../shared/modules/MaterialImports/FormElements";
import "./JobsAI.scss";
import {List, ListItem, ListItemText} from '../../../../shared/modules/MaterialImports/List';
import ListSubheader from '@mui/material/ListSubheader';


const JobsAI = () => {
   
    const matchScoreData = [{
        category: "50-90%",
        value: 501.9
    }, {
        category: "81-90%",
        value: 301.9
    }, {
        category: "71-80%",
        value: 201.1
    }, {
        category: "17-23%",
        value: 201.1
    }]
    const size = {
        width: "270px", height: "180px", marginBottom: "20px"
    }


    const [dense, setDense] = React.useState(false);
    const [weightage, setWeightage] = useState([40, 40, 10, 10,]);
    const weightageRef = useRef([40, 40, 10, 10,]);
    const updateWeightage = (value: number, index: number) => {
        let remaining = 100 - parseInt(String(value), 10);
        let oneRemained = Math.floor(remaining / 3);
        let secondRemained = Math.floor(remaining / 3);
        let thirdRemained = remaining - oneRemained - secondRemained;
        switch (index) {
            case 0:
                setWeightage([parseInt(String(value), 10), oneRemained, secondRemained, thirdRemained]);
                weightageRef.current = [parseInt(String(value), 10), oneRemained, secondRemained, thirdRemained];
                break;
            case 1:
                setWeightage([oneRemained, parseInt(String(value), 10), secondRemained, thirdRemained]);
                weightageRef.current = [oneRemained, parseInt(String(value), 10), secondRemained, thirdRemained];
                break;
            case 2:
                setWeightage([oneRemained, secondRemained, parseInt(String(value), 10), thirdRemained]);
                weightageRef.current = [oneRemained, secondRemained, parseInt(String(value), 10), thirdRemained];
                break;
            case 3:
            default:
                setWeightage([oneRemained, secondRemained, thirdRemained, parseInt(String(value), 10)]);
                weightageRef.current = [oneRemained, secondRemained, thirdRemained, parseInt(String(value), 10)];
                break;
        }
    };

    return (
        <div>

            <Stack className="customCard" style={{ padding: '8px' }} >

                <Grid sx={{ backgroundColor: 'rgb(229, 246, 253)', margin: '2px', borderRadius: '5px' }}>
                    <Typography sx={{ fontSize: 'x-large', fontWeight: "600", margin: '8px', color: '#219C90' }}>
                        Adjust the importance of each category here. This will affect how each match is scored
                    </Typography>
                    <Stack direction="row">
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ margin: '2px' }}>
                            <Stack spacing={2}>
                                <Stack direction="row">
                                    <Typography sx={{ width: '60px', textAlign: "right", color: '#219C90' }} className='fs-13 fw-6'>Skills for</Typography>
                                    <Typography className='fs-13 fw-6' sx={{ textAlign: 'right', width: '40px', color: '#219C90' }}>{weightage[0]}%</Typography>
                                </Stack>
                                <Slider aria-label="Skills for"
                                    value={weightage[0]}
                                    step={1}
                                    onChange={(e, newVal) => updateWeightage(newVal as number, 0)}
                                    sx={{
                                        width: '130px', color: '#EF5A6F', height: '10px'
                                    }}

                                />
                            </Stack>
                        </Grid>

                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                            <Stack spacing={2}>
                                <Stack direction="row">
                                    <Typography sx={{ width: '60px', textAlign: "right", color: '#219C90' }} className='fs-13 fw-6'>Job Titles</Typography>
                                    <Typography className='fs-13 fw-6' sx={{ textAlign: 'right', width: '40px', color: '#219C90' }}>{weightage[1]}%</Typography>
                                </Stack>
                                <Slider aria-label="Job Titles"
                                    value={weightage[1]}
                                    step={1}
                                    onChange={(e, newVal) => updateWeightage(newVal as number, 1)}
                                    sx={{
                                        width: '130px', color: '#50B498', height: '10px'
                                    }}

                                />
                            </Stack>
                        </Grid>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                            <Stack spacing={2}>
                                <Stack direction="row">
                                    <Typography sx={{ width: '60px', textAlign: "right", color: '#219C90' }} className='fs-13 fw-6'>Job Stab</Typography>
                                    <Typography className='fs-13 fw-6' sx={{ textAlign: 'right', width: '40px', color: '#219C90' }}>{weightage[3]}%</Typography>
                                </Stack>
                                <Slider aria-label="Job Stability"
                                    value={weightage[3]}
                                    step={1}
                                    onChange={(e, newVal) => updateWeightage(newVal as number, 3)}
                                    sx={{
                                        width: '130px', color: '#3FA2F6', height: '10px'
                                    }}

                                />
                            </Stack>
                        </Grid>
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                            <Stack spacing={2}>
                                <Stack direction="row">
                                    <Typography sx={{ width: '60px', textAlign: "right", color: '#219C90' }} className='fs-13 fw-6'>Education</Typography>
                                    <Typography className='fs-13 fw-6' sx={{ textAlign: 'right', width: '40px', color: '#219C90' }}>{weightage[2]}%</Typography>
                                </Stack>
                                <Slider aria-label="Education"
                                    value={weightage[2]}
                                    step={1}
                                    onChange={(e, newVal) => updateWeightage(newVal as number, 2)}
                                    sx={{
                                        width: '130px', color: '#3FA2F6', height: '10px'
                                    }}
                                />
                            </Stack>
                        </Grid>
                    </Stack>
                </Grid>
            </Stack>

            <Stack direction='row' justifyContent='center' alignItems='center' className={`customCard`}>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={dense}
                                        onChange={(event) => setDense(event.target.checked)}
                                    />
                                }
                                label="Ti Marcel"
                            />
                        </FormGroup>
                        <Stack>
                            <Grid size={12} sm container>
                                <Grid size="grow" container direction="column" spacing={2}>
                                    <Grid size="grow">
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            <span style={{ fontStyle: 'italic' }}>Lose Gatos CA</span>    4 Years Of Experience
                                        </Typography>
                                        <Typography gutterBottom>
                                            <strong>Work</strong>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                            <strong>TGM CONTRACTING & CONSULTING</strong>
                                        </Typography>
                                    </Grid>

                                </Grid>
                            </Grid>

                        </Stack>
                    </Grid>
                    <Grid size={6}>
                        <Stack className="customCard">
                            <Typography sx={{ alignItems: 'center', backgroundColor: '#3FA2F6', textAlign: 'center', fontWeight: '700', color: 'white' }}> Score - 45 </Typography>
                            <Stack direction="row" alignItems="center" >
                                <Grid size={6}>
                                    <CardContent>
                                        <PieChart id={"piechart"} data={matchScoreData} size={size} heading='Match Score Index' />

                                    </CardContent>
                                </Grid>
                                <Grid size={6}>
                                    <Accordion className="mb-2"  >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            className="accordingBG1"

                                        >
                                            Skills
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                component="form"
                                                noValidate
                                                sx={{
                                                    display: 'grid',

                                                    gap: 2,
                                                }}
                                            >

                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                                    component="nav"
                                                    aria-labelledby="nested-list-subheader"
                                                    subheader={
                                                        <ListSubheader component="div" id="nested-list-subheader">
                                                            Found in resume and job
                                                        </ListSubheader>
                                                    }>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Audit" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Best Practices" className="lableList" />
                                                    </ListItem>

                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Documentation" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Documenting" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Process Documentation" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Project Management" className="lableList" />
                                                    </ListItem>
                                                </List>

                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="mb-2">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            className="accordingBG2"
                                        >
                                            Job Title
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                component="form"
                                                noValidate
                                                sx={{
                                                    display: 'grid',

                                                    gap: 2,
                                                }}
                                            >
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                                    component="nav"
                                                    aria-labelledby="nested-list-subheader"
                                                    subheader={
                                                        <ListSubheader component="div" id="nested-list-subheader">
                                                            Found in resume and job
                                                        </ListSubheader>
                                                    }>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Audit" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Best Practices" className="lableList" />
                                                    </ListItem>

                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Documentation" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Documenting" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Process Documentation" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Project Management" className="lableList" />
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>

                                    <Accordion className="mb-2">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            className="accordingBG3"
                                        >
                                            Job Stability
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                component="form"
                                                noValidate
                                                sx={{
                                                    display: 'grid',

                                                    gap: 2,
                                                }}
                                            >
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                                    component="nav"
                                                    aria-labelledby="nested-list-subheader"
                                                    subheader={
                                                        <ListSubheader component="div" id="nested-list-subheader">
                                                            Found in resume and job
                                                        </ListSubheader>
                                                    }>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Audit" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Best Practices" className="lableList" />
                                                    </ListItem>

                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Documentation" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Documenting" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Process Documentation" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Project Management" className="lableList" />
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="mb-2">
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1-content"
                                            id="panel1-header"
                                            className="accordingBG4"
                                        >
                                            Educations
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box
                                                component="form"
                                                noValidate
                                                sx={{
                                                    display: 'grid',

                                                    gap: 2,
                                                }}
                                            >
                                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                                    component="nav"
                                                    aria-labelledby="nested-list-subheader"
                                                    subheader={
                                                        <ListSubheader component="div" id="nested-list-subheader">
                                                            Found in resume and job
                                                        </ListSubheader>
                                                    }>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Audit" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Best Practices" className="lableList" />
                                                    </ListItem>

                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Documentation" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Documenting" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Process Documentation" className="lableList" />
                                                    </ListItem>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary="Project Management" className="lableList" />
                                                    </ListItem>
                                                </List>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    )
}

export default JobsAI