import { Dialog, DialogTitle, DialogContent } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
import { IconButton } from '../../../../../../../../shared/modules/MaterialImports/Button';
//import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import './EditInternalSubmission.scss';
import { Grid } from '../../../../../../../../shared/modules/MaterialImports/Grid';
// import  { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
// import { useState, useEffect, useMemo } from 'react';
import { Box } from '../../../../../../../../shared/modules/MaterialImports/Box';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    dateofEmployment: string,
    previouslyworkedas: string,
    reportingManager: string,
    managerPhone: number,
    managerEmail: string,
    companyName: string,
    positionTitle: string,
    managerName: string,
    datesofGap: string,
    explanation: string,
    skill:string,
    yearsofexperience:string,
    lastUsed:string,
    Proficiency:string

) {
    return {
        dateofEmployment,
        previouslyworkedas,
        reportingManager,
        managerPhone,
        managerEmail,
        companyName,
        positionTitle,
        managerName,
        datesofGap,
        explanation,
        skill,
        yearsofexperience,
        lastUsed,
        Proficiency
    };
}




const EditInternalSubmission = ({ dialogOpen, handleDialogClose }: { dialogOpen: boolean, handleDialogClose: any }) => {
    const rows = [
        createData('12-03-2023', "Developer", "Mastan vali", 9351234567, "Ask@gmail.com", "Amazon", "Developer", "Aditya","12-05-2018","Unknown","-","-","-","Beginner"),
        createData('24-07-2022', "Manager", "Mastan vali", 9567898765, "Abcd@gmail.com", "Accenture", "Developer", "Aditya","12-05-2018","Unknown","-","-","-","Beginner"),
        createData('01-10-2021', "Tester", "Mastan vali", 8345678998, "company@gmail.com", "HCL", "Developer", "Aditya","12-05-2018","Unknown","-","-","-","Beginner"),
    ];

    return (
        <Dialog
            maxWidth={'md'}
            fullWidth={true} open={dialogOpen} className='AddJobModal'
            id='interviewsDialogBox'
        >
            <DialogTitle className="header">
                <span>Submission Details</span>

                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    className="closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    direction="row"
                    justifyContent="start"
                    alignItems="start"
                >


                    <Grid
                        container
                        className='customCard'
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', paddingBottom: '31px' }}
                    // spacing={2}
                    >
                        <Grid sx={{ width: 'calc(100% - 385px)' }}>
                            <span className="addHeader"> Personal Information</span>
                            <Grid size={6}>
                                <div className='detailsDiv mt-3'>
                                    <span className='mainLabel'>First Name:</span>
                                    {/* linkLabel */}
                                    <span className='valueLabel'>Qa</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Middle Name:</span>
                                    <span className='valueLabel'></span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Last Name: </span>
                                    <span className='valueLabel'>001</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Best phone Number:</span>
                                    <span className='valueLabel'>other</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Email ID:</span>
                                    <span className='valueLabel'>other</span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Skype ID:</span>
                                    <span className='valueLabel'></span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>LinkedIn Profile :</span>
                                    <span className='valueLabel'></span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Best Time to Call :</span>
                                    <span className='valueLabel'></span>
                                </div>
                                <div className='detailsDiv'>
                                    <span className='mainLabel'>Candidate Visa Status :</span>
                                    <span className='valueLabel'>H1b</span>
                                </div>

                            </Grid>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Employment Information</span>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Has the candidate worked previously at the client :</span>
                                <span className='valueLabel'>No</span>
                            </div>
                            <Box sx={{ height: 150, width: '100%',marginTop:"15px" }}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Date of Employment</TableCell>
                                                <TableCell align="right">Previously worked as</TableCell>
                                                <TableCell align="right">Reporting Manager</TableCell>
                                                <TableCell align="right">Manager Phone</TableCell>
                                                <TableCell align="right">Manager Email</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.dateofEmployment}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.dateofEmployment}
                                                    </TableCell>
                                                    <TableCell align="right">{row.previouslyworkedas}</TableCell>
                                                    <TableCell align="right">{row.reportingManager}</TableCell>
                                                    <TableCell align="right">{row.managerPhone}</TableCell>
                                                    <TableCell align="right">{row.managerEmail}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        <Grid>
                            <span className="addHeader">Gaps in Employment</span>
                            <Box sx={{ height: 150, width: '100%' ,marginTop:"15px"}}>
                            <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Dates of Gaps</TableCell>
                                                <TableCell align="right">Explanation</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.datesofGap}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.datesofGap}
                                                    </TableCell>
                                                    <TableCell align="right">{row.explanation}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Education</span>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Highest Education Completed: :</span>
                                <span className='valueLabel'>GED</span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Year of Graduation :</span>
                                <span className='valueLabel'></span>
                            </div>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Employer Information</span>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Employer Name :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Contact Name :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Contact Phone Number :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Contact Email :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Signed MSA :</span>
                                <span className='valueLabel'>No</span>
                            </div>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Motivation</span>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Why is the candidate looking for a new assignment?</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Is this candidate currently working ? :</span>
                                <span className='valueLabel'>Working</span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Is the current/ most recent position contract or perm? :</span>
                                <span className='valueLabel'>Contract</span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>When is/ was the end date of the most recent assignment? :</span>
                                <span className='valueLabel'></span>
                            </div>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Other Opportunities</span>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Is the candidate close to an offer: Possibility of getting a job offer soon (been interviewing with several companies for the past two weeks).
                                    Why would he take this job. Where does he rate this position in his search :</span>
                                <span className='valueLabel'></span>
                            </div>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Availability </span>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Availability to start a new assignment? :</span>
                                <span className='valueLabel'>immediately</span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Are there any vacations planned in within next 90 days :</span>
                                <span className='valueLabel'>No</span>
                            </div>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>If Yes, Provide details :</span>
                                <span className='valueLabel'></span>
                            </div>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Technical Competency </span>
                            <Box sx={{ height: 150, width: '100%' ,marginTop:"15px"}}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Skill</TableCell>
                                                <TableCell align="right">Years of Experience</TableCell>
                                                <TableCell align="right">Last Used</TableCell>
                                                <TableCell align="right">Proficiency</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.skill}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.skill}
                                                    </TableCell>
                                                    <TableCell align="right">{row.yearsofexperience}</TableCell>
                                                    <TableCell align="right">{row.lastUsed}</TableCell>
                                                    <TableCell align="right">{row.Proficiency}</TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Soft Skills</span>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Communication Skills (1 - Poor; 10 - Excellent) :</span>
                                <span className='valueLabel'>0</span>
                            </div>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">PreQuisites</span>
                            <div className='detailsDiv' >
                                <span className='mainLabel'>Does the candidate has any Felony/Misdemeanor/Criminal History? :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv' >
                                <span className='mainLabel'>Is the Candidate open for Drug Test and Background Check, does he anticipate any problem with that? :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv' >
                                <span className='mainLabel'>Has this candidate been submitted for this position through another vendor? :</span>
                                <span className='valueLabel'>No</span>
                            </div>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Reference Details </span>
                            <Box sx={{ height: 150, width: '100%' ,marginTop:"15px"}}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Company Name</TableCell>
                                                <TableCell align="right">Position Title</TableCell>
                                                <TableCell align="right">Manager Name</TableCell>
                                                <TableCell align="right">Manager Email</TableCell>
                                                <TableCell align="right">Manager Phone</TableCell>
                                                <TableCell align='right'>Date of Employment</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <TableRow
                                                    key={row.companyName}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.companyName}
                                                    </TableCell>
                                                    <TableCell align="right">{row.positionTitle}</TableCell>
                                                    <TableCell align="right">{row.managerName}</TableCell>
                                                    <TableCell align="right">{row.managerEmail}</TableCell>
                                                    <TableCell align="right">{row.managerPhone}</TableCell>
                                                    <TableCell align="right">{row.dateofEmployment}</TableCell>

                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                        <Grid>
                            <span className="addHeader ">Documents</span>
                            <div className='detailsDiv mt-3' >
                                <span className='mainLabel'>Attachments :</span>
                                <span className='valueLabel'></span>
                            </div>
                        </Grid>
                        <Grid >
                            <span className="addHeader ">Submission Details</span>
                            <div className='detailsDiv mt-3'>
                                <span className='mainLabel'>Candidate Summary:</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Candidate Source </span>
                                <span className='valueLabel'>Monster</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Sourced By : </span>
                                <span className='valueLabel'>Aditya Kumar</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>SID:</span>
                                <span className='valueLabel'>other</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Pay Rate :</span>
                                <span className='valueLabel'>Hourly</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Amount :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Tax Terms:</span>
                                <span className='valueLabel'>W2</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Current Location :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Job Location :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Distance from Job Location :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Local / Non-Local :</span>
                                <span className='valueLabel'>Non - Local</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Recipient :</span>
                                <span className='valueLabel'>Sunil Yekulla</span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Other Email ID's :</span>
                                <span className='valueLabel'></span>
                            </div>
                            <div className='detailsDiv'>
                                <span className='mainLabel'>Comments :</span>
                                <span className='valueLabel'></span>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

            </DialogContent>
        </Dialog>
    )
}

export default EditInternalSubmission;