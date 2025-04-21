
import {Grid, IconButton, Button} from '../../../../../../../shared/modules/commonImports';
// import React, { useEffect } from "react";
import {Dialog, DialogContent, DialogTitle, DialogActions} from '../../../../../../../shared/modules/MaterialImports/Dialog';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import Paper from '@mui/material/Paper';
// import TableHead from '@mui/material/TableHead';
// import TableCell from '@mui/material/TableCell';
// import TableRow from '@mui/material/TableRow';
// import TableBody from '@mui/material/TableBody';
import { MUIAutoComplete } from '../../../../../../shared/MUIAutoComplete/MUIAutoComplete'
import { Yup, useFormik } from '../../../../../../../shared/modules/Formik';
import { userLocalData } from "../../../../../../../shared/services/userData";
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../../../../shared/api/api';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import CloseIcon from '@mui/icons-material/Close';

import './CloneToOtherJob.scss'
import { globalData } from '../../../../../../../shared/services/globalData';




const CloneToOtherJob = (
    { open, closePopup, jobId, userIds }: {
        open: boolean;
        closePopup: () => void;
        jobId: any;
        userIds: any
    }
) => {
    const mergeData = {
        fromJobId: jobId ? jobId : '',
        clientId: userLocalData.getvalue('clientId'),
        toJobId: "",
        recrId: userLocalData.getvalue('recrId'),
        userIds: userIds[0] ? userIds[0] : '',
        jobTitle: ""
    }

    const mergeSchema = Yup.object().shape({
        fromJobId: Yup.string().required('fromJobId is required'),
        clientId: Yup.string().required('clientId is required'),
        toJobId: Yup.string().required('toJobId is required'),
        recrId: Yup.string().required('recrId is required'),
        userIds: Yup.string().required('userIds is required'),
        jobTitle: Yup.string()
    });

    const mergeFormik = useFormik({
        initialValues: mergeData,
        validationSchema: mergeSchema,
        onSubmit: () => { }
    })

    const cloneDataParams = {
        fromJobId: mergeFormik.values.fromJobId,
        clientId: mergeFormik.values.clientId,
        toJobId: mergeFormik.values.toJobId,
        recrId: mergeFormik.values.recrId,
        userIds: mergeFormik.values.userIds,
    }

    const handleFormCloneSubmit = () => {
        if (mergeFormik.values.fromJobId != mergeFormik.values.toJobId) {
            trackPromise(
                ApiService.getByParams(193, 'Curately/Jobs/cloned_other_job.jsp', cloneDataParams).then(
                    (result: any) => {
                        if (result.data.Message == 'Success') {
                            showToaster('Successfully cloned to other job.', 'success');
                            window.open(globalData.getWindowLocation() + "candidate/view/" + mergeFormik.values.userIds + "/" + mergeFormik.values.toJobId);
                            closePopup();
                        } else {
                            showToaster((result.data.Message) ? result.data.Message : 'An error occured', 'error')
                        }
                    }
                )
            )

        }
        else {
            showToaster('From Job and To Job should not be same.', 'error')
        }
    }

    return (
        <Dialog
            maxWidth={'sm'}
            fullWidth={true} open={open} className='AddJobModal customInputs'
            id='nextActionDialogBox'
        >
            <DialogTitle className="header">
                <span>Clone to Another Job</span>
                <IconButton
                    aria-label="close"
                    onClick={closePopup}
                    className="closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Grid
                    container
                >
                    {/* <Grid size={6} className='mt-1'>
                        <label className='inputLabel'>Enter the Jobid</label>
                        <TextField fullWidth className='mt-1'
                            id="jobId"
                            name="jobId"
                            variant="outlined"
                            type="text"
                            size="small"
                            margin="dense"

                        />
                    </Grid>
                    <Grid size={4} className='mt-2'><Button variant="text"
                        type='button'
                        color="primary"
                        className='mt-5 ml-5'
                    > Find</Button>
                    </Grid> */}
                </Grid>

                {/* <Box sx={{ height: 150, width: '100%', marginTop: "15px" }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 450 }} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Job ID</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">JobTitle</TableCell>
                                        <TableCell align="right">Company</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            123456
                                        </TableCell>
                                        <TableCell align="right">previously worked</TableCell>
                                        <TableCell align="right">Reporting Manager</TableCell>
                                        <TableCell align="right">Accenture</TableCell>

                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Grid>
                        <div className='detailsDiv mt-3' >
                            <span className='mainLabel'>Selected Job ID:</span>
                            <span className='valueLabel'></span>
                        </div>
                        <div className='detailsDiv mt-3' >
                            <span className='mainLabel'>Selected Job Title:</span>
                            <span className='valueLabel'></span>
                        </div>
                    </Grid>
                     */}
                <MUIAutoComplete
                    id='jobTitleB'
                    handleChange={(id: any, name: string) => {
                        console.log('id:', id)
                        mergeFormik.setValues({
                            ...mergeFormik.values,
                            toJobId: id,
                            jobTitle: name
                        })
                    }}

                    valuePassed={{

                        id: mergeFormik.values.toJobId,
                        label: mergeFormik.values.jobTitle,

                    }}
                    isMultiple={false}
                    // textToShow="Select EmailTemplates"
                    placeholder={""}
                    //placeholder="Select jobTitle"
                    width="100%"
                    type='jobTitleAndId'
                />
            </DialogContent >
            <DialogActions>
                <Grid
                    container
                    direction="row"
                    justifyContent="end"
                    alignItems="center"
                >

                    <Button
                        onClick={closePopup}
                        variant="outlined"
                        type='button'
                        size="small"
                        color="secondary"
                        className='mr-2'
                    > Cancel</Button>
                    <Button
                        type='submit'
                        className='mr-2'
                        color="primary" variant='contained' size="small"
                        onClick={() => { handleFormCloneSubmit() }}
                    >clone</Button>
                </Grid>
            </DialogActions>
        </Dialog>
    )
}

export default CloneToOtherJob