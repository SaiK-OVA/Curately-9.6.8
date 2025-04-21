import { useState } from '../../../../../../../../shared/modules/React';
import { useFormik, Yup } from "../../../../../../../../shared/modules/Formik";
// import { Dialog, DialogActions } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
// import { DialogContent } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
// import { DialogTitle } from '../../../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../../../shared/modules/MaterialImports/Divider';
import { Grid } from '../../../../../../../../shared/modules/MaterialImports/Grid';
import { Button } from '../../../../../../../../shared/modules/MaterialImports/Button';
// import { TextField } from '../../../../../../../../shared/modules/MaterialImports/FormInputs';
// import { MenuItem } from '../../../../../../../../shared/modules/MaterialImports/Menu';
// import { Checkbox } from '../../../../../../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel } from '../../../../../../../../shared/modules/MaterialImports/FormInputs';
import { FormControl } from '../../../../../../../../shared/modules/MaterialImports/FormInputs';
import { Radio } from '../../../../../../../../shared/modules/MaterialImports/FormElements';
import { RadioGroup } from '../../../../../../../../shared/modules/MaterialImports/FormElements';
// import ErrorMessage from '../../../../../../../shared/Error/ErrorMessage';
import { DateTime } from '../../../../../../../../shared/modules/Luxon';

import ApiService from '../../../../../../../../shared/api/api';
import { trackPromise } from '../../../../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../../../../shared/services/userData';
import { showToaster } from '../../../../../../../shared/SnackBar/SnackBar';

import './Interview.scss';

const Interview = ({ open, closePopup, saveData, interviewData, candidateId }: {
    open: boolean;
    closePopup: () => void;
    saveData: (acceptOrReject: "Accept" | "Reject") => void;
    candidateId: string;
    interviewData:
    {
        contact: {
            details: string;
            email: string;
            name: string;
            phone: string;
        },
        "interview-comments": string;
        "interview-id": string;
        "meeting-details": string;
        "meeting-type": string;
        "provide-interview-information-flag": Boolean;
        "reschedule-required": string;
        status: string;
        "selected-available-date-id": string;
        "available-dates": {
            "end-date": string
            "interview-date-id": string
            "start-date": string
        }[]
    }
}
) => {
    // {
    //     "isCustom": true,
    //     "customForm":"bmsInterview",
    //     "json": {
    //       "status": "Pending",
    //       "contact": {
    //         "name": "EXP, HMX",
    //         "phone": null,
    //         "email": null,
    //         "details": ""
    //       },
    //       "interview-id": "d2b10ede-92c8-4c46-b808-44bfc39c3b33",
    //       "meeting-type": "MicrosoftTeams",
    //       "meeting-details": "www.interview.com",
    //       "available-dates": [
    //         {
    //           "start-date": "2024-09-26T14:00:00.000Z",
    //           "end-date": "2024-09-26T15:00:00.000Z",
    //           "interview-date-id": "bc2e57f3-77bb-427a-b82d-e064ba8b25cf"
    //         },
    //         {
    //           "start-date": "2024-09-27T18:00:00.000Z",
    //           "end-date": "2024-09-27T19:00:00.000Z",
    //           "interview-date-id": "90776a5d-3eb1-476b-9054-bd9a00ebaa62"
    //         }
    //       ],
    //       "provide-interview-information-flag": false,
    //       "interview-comments": null,
    //       "reschedule-required": null
    //     }
    //   }





    const availableDates: {
        "end-date": string
        "interview-date-id": string
        "start-date": string
    }[] = interviewData['available-dates'].length ? interviewData['available-dates'] : [];
    // { startDate: "2024-10-02T01:15:00.000Z",  endDate: "2024-10-02T02:15:00.000Z",  interviewDateId: "7090829f-f543-47d0-84a6-a7bd90b82cb1" }
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialValues = {
        // interviewId: "",
        status: interviewData.status ? interviewData.status : "",
        meetingType: interviewData["meeting-type"] ? interviewData["meeting-type"] : "",
        meetingDetails: interviewData['meeting-details'] ? interviewData['meeting-details'] : "",
        name: interviewData.contact?.name ? interviewData.contact.name : "",
        phone: interviewData.contact?.phone ? interviewData.contact.phone : "",
        email: interviewData.contact?.email ? interviewData.contact.email : "",
        details: interviewData.contact?.details ? interviewData.contact.details : "",
        // availableDates:[],
        interviewFlag: interviewData['provide-interview-information-flag'] ? interviewData['provide-interview-information-flag'] : false,
        interviewComments: interviewData['interview-comments'] ? interviewData['interview-comments'] : "",
        "selected-available-date-id": ""
    }
    const addInterviewSchema = Yup.object().shape({
        // interviewId: Yup.string(),
        status: Yup.string(),
        meetingType: Yup.string(),
        meetingDetails: Yup.string(),
        name: Yup.string(),
        phone: Yup.string(),
        email: Yup.string(),
        details: Yup.string(),
        // availableDates:Yup.array().of(
        //     Yup.object().shape({
        //         startDate: Yup.string(),
        //         endDate:Yup.string(),
        //         interviewDateId:Yup.string(),
        //     })),
        interviewFlag: Yup.boolean(),
        interviewComments: Yup.string(),
        "selected-available-date-id": Yup.string(),

    })
    const addInterviewFormik = useFormik({
        initialValues,
        validationSchema: addInterviewSchema,
        onSubmit: () => {
            // addInterview();

        },
    });

    const addInterview = (acceptOrReject: "Accept" | "Reject") => {
        setIsFormSubmitted(true);
        console.log(addInterviewFormik.values);

        let dataToPass = {
            "meeting-details": addInterviewFormik.values.interviewFlag ? addInterviewFormik.values.meetingDetails : "",
            "partner-comments": "",
            "selected-available-date-id": addInterviewFormik.values['selected-available-date-id']
        }
        const interviewId = interviewData?.['interview-id'];
        const url = (acceptOrReject === "Accept") ? `interviews/${userLocalData.getvalue('clientId')}/${interviewId}/accept` : `interviews/${interviewId}/decline`

        trackPromise(
            ApiService.postWithData('beeline', `${url}`, dataToPass).then((response) => {
                console.log(response.data);
                if (response.data.Success) {
                    saveData(acceptOrReject);
                } else {
                    showToaster((response.data.Message) ? response.data.Message : "An error occured while submitting data.", 'error');
                }
            })
        )

        // saveData(acceptOrReject);
        // saveData();
    }

    return (
        // <Dialog
        //     maxWidth={'md'}
        //     fullWidth open={open} id="AddInterviewModal">
        //     <DialogTitle
        //         className='py-2'
        //     >
        //     </DialogTitle>
        // </Dialog >
        (<div id='AddBMSInterview' className='px-4'>
            <Grid container direction="column" justifyContent="center" alignItems="flex-start" className='p-4'>
                <div className='py-1'><span className='labelText'>Status: </span> <span className='valueText'>{addInterviewFormik.values.status}</span></div>
                <div className='py-1'><span className='labelText'>Meeting Type: </span> <span className='valueText'>{addInterviewFormik.values.meetingType}</span></div>
                <div className='py-1'><span className='labelText'>Meeting Details: </span> <span className='valueText'>{addInterviewFormik.values.meetingDetails}</span></div>
                <div className='py-1'><span className='labelText'>Name: </span> <span className='valueText'>{addInterviewFormik.values.name}</span></div>
                <div className='py-1'><span className='labelText'>Phone: </span> <span className='valueText'>{addInterviewFormik.values.phone}</span></div>
                <div className='py-1'><span className='labelText'>Email: </span> <span className='valueText'>{addInterviewFormik.values.email}</span></div>
                <div className='py-1'><span className='labelText'>Details: </span> <span className='valueText'>{addInterviewFormik.values.details}</span></div>
                <div className='py-1'><span className='labelText'>Comments: </span> <span className='valueText'>{addInterviewFormik.values.interviewComments}</span></div>
            </Grid>
            <form onSubmit={addInterviewFormik.handleSubmit} className='px-5 py-4' style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
                {/* <Grid container spacing={2} direction="row" className='mt-1'
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    <Grid size={6} className="pr-2">
                        <label className='inputLabel'>Interiew Status <span style={{ color: 'red' }}>*</span></label>
                        <TextField fullWidth className='mt-1'
                            id="status"
                            name="status"
                            size="small"
                            variant="outlined"
                            value={addInterviewFormik.values.status}
                            onChange={addInterviewFormik.handleChange}
                            select>
                            <MenuItem value='Accepted'>Accepted</MenuItem>
                            <MenuItem value='Pending'>Pending</MenuItem>
                            <MenuItem value='Cancelled'>Cancelled</MenuItem>
                            <MenuItem value='Declined'>Declined</MenuItem>
                        </TextField>
                        <ErrorMessage formikObj={addInterviewFormik} name={'status'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                    <Grid size={6} className="pr-2">
                        <label className='inputLabel'>Meeting Type <span style={{ color: 'red' }}>*</span></label>
                        <TextField fullWidth className='mt-1'
                            id="meetingType"
                            name="meetingType"
                            size="small"
                            variant="outlined"
                            type="text"
                            value={addInterviewFormik.values.meetingType}
                            onChange={addInterviewFormik.handleChange}
                        />
                        <ErrorMessage formikObj={addInterviewFormik} name={'meetingType'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    <Grid size={6} className="pr-2">
                        <label className='inputLabel'>Meeting Details <span style={{ color: 'red' }}>*</span></label>
                        <TextField fullWidth className='mt-1'
                            id="meetingDetails"
                            name="meetingDetails"
                            size="small"
                            variant="outlined"
                            type="text"
                            value={addInterviewFormik.values.meetingDetails}
                            onChange={addInterviewFormik.handleChange}
                        />
                        <ErrorMessage formikObj={addInterviewFormik} name={"meetingDetails"} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                    <Grid size={6} className="pr-2">
                        <label className='inputLabel'>Name <span style={{ color: 'red' }}>*</span></label>
                        <TextField fullWidth className='mt-1'
                            id="name"
                            name="name"
                            size="small"
                            variant="outlined"
                            type="text"
                            value={addInterviewFormik.values.name}
                            onChange={addInterviewFormik.handleChange}

                        />
                        <ErrorMessage formikObj={addInterviewFormik} name={"name"} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    <Grid size={6} className="pr-2">
                        <label className='inputLabel'>Phone</label>
                        <TextField fullWidth className='mt-1'
                            id="phone"
                            name="phone"
                            size="small"
                            variant="outlined"
                            type="text"
                            value={addInterviewFormik.values.phone}
                            onChange={addInterviewFormik.handleChange}
                        />
                        <ErrorMessage formikObj={addInterviewFormik} name={'phone'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                    <Grid size={6} className="pr-2">
                        <label className='inputLabel'>Email</label>
                        <TextField fullWidth className='mt-1'
                            id="email"
                            name="email"
                            size="small"
                            variant="outlined"
                            value={addInterviewFormik.values.email}
                            onChange={addInterviewFormik.handleChange}
                        />
                        <ErrorMessage formikObj={addInterviewFormik} name={'email'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    <Grid size={6} className="pr-2">
                        <label className='inputLabel'>Details</label>
                        <TextField fullWidth className='mt-1'
                            id="details"
                            name="details"
                            size="small"
                            variant="outlined"
                            value={addInterviewFormik.values.details}
                            onChange={addInterviewFormik.handleChange}
                        />
                        <ErrorMessage formikObj={addInterviewFormik} name={'details'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                    </Grid>
                    <Grid size={6} className="pr-2 ">
                        <label className='inputLabel'>Comments</label>
                        <TextField fullWidth className='mt-1'
                            id="interviewComments"
                            name="interviewComments"
                            size="small"
                            variant="outlined"
                            value={addInterviewFormik.values.interviewComments}
                            onChange={addInterviewFormik.handleChange}
                            multiline
                            minRows={1}
                        />

                    </Grid>
                </Grid>
                <Grid container spacing={2} direction="row"
                    justifyContent="flex-start"
                    alignItems="center">
                    <Grid size={6} className="pr-2 mt-1">
                        <div >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="interviewFlag"
                                        name='interviewFlag'
                                        checked={addInterviewFormik.values.interviewFlag}
                                        onChange={addInterviewFormik.handleChange}

                                    />
                                }
                                label={
                                    <div>
                                        <label className='sub-heading'>Provide Interview Information flag <span style={{ color: 'red' }}>*</span> </label>
                                    </div>

                                }
                            />
                            <ErrorMessage formikObj={addInterviewFormik} name={'interviewFlag'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </div>
                    </Grid>
                </Grid> */}
                <Grid container spacing={2} direction="row" className='mt-1'
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    <Grid size={6} className='pr-2'>
                        <label className='sub-heading'>Available Interview Dates <span style={{ color: 'red' }}>*</span> </label>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="worklocation-radio-buttons-group-label"
                                name='selected-available-date-id'
                                value={addInterviewFormik.values['selected-available-date-id']}
                                onChange={addInterviewFormik.handleChange}

                            >
                                {availableDates.map((date) => (

                                    <FormControlLabel id={date['interview-date-id']} value={date['interview-date-id']} control={<Radio />} label={<>{`${(date['start-date']) ? DateTime.fromFormat(date['start-date'].substring(0, 19).replace('T', ' '), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy   hh:mm a') : ""} - ${(date['end-date']) ? DateTime.fromFormat(date['end-date'].substring(0, 19).replace('T', ' '), 'yyyy-MM-dd hh:mm:ss').toFormat('hh:mm a') : ""}`}</>} />
                                ))}
                                {/* 2021-05-02T01:15:00.000Z */}

                                {/* <FormControlLabel value="2" control={<Radio />} label="End Date" />
                                <FormControlLabel value="3" control={<Radio />} label="Interview Date" /> */}

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </form>
            <Divider />
            <Grid container direction="row" justifyContent="end" alignItems="center" className='p-4'>
                {/* <Button variant="outlined" type='button' color="secondary" className='mr-2' onClick={closePopup}>Cancel</Button> */}
                <Button variant="contained" type='button' color="primary" onClick={() => addInterview("Accept")} className='mr-3' >Accept</Button>
                <Button variant="contained" type='button' color="primary" onClick={() => addInterview("Reject")} >Reject</Button>
            </Grid>
        </div>)
    );
}

export default Interview;