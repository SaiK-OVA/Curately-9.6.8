// import { useState } from '../../../../../../../shared/modules/React';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import { useFormik, Yup } from '../../../../../../../shared/modules/Formik';
import { useNavigate } from 'react-router-dom';


import ApiService from '../../../../../../../shared/api/api';
import { userLocalData } from '../../../../../../../shared/services/userData';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import { MUIAutoComplete } from "../../../../../../shared/MUIAutoComplete/MUIAutoComplete";


import { Dialog, DialogContent, DialogActions, DialogTitle, CloseIcon } from '../../../../../../../shared/modules/MaterialImports/Dialog';
import { Button, IconButton } from '../../../../../../../shared/modules/MaterialImports/Button';
import { FormControl } from "../../../../../../../shared/modules/MaterialImports/FormInputs";
import "./AddMatchToModal.scss";


const AddMatchToModal = ({ dialogOpen, closePopup, candidateId, moveToVoiceAI }: { dialogOpen: boolean; closePopup: any; candidateId: number[]; moveToVoiceAI: boolean }) => {

    // const { candidateId } = useParams();

    // const [selectedJobTitle, setSelectedJobTitle] = useState({
    //     title: "",
    //     id: ""
    // });
    let navigate = useNavigate();

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const initialValues = {
        recrId: userLocalData.getvalue('recrId'),
        clientId: userLocalData.getvalue('clientId'),
        userId: candidateId,
        jobId: "",
        selectedJobTitle: "",
    }

    // https://app.curately.ai/Accuick_API/Curately/Candidate/assign_job.jsp?clientId=3&recrId=61&jobId=1&userId=3520

    const matchToSchema = Yup.object({
        recrId: Yup.string().required('Required'),
        clientId: Yup.string().required('Required'),
        userId: Yup.string(),
        selectedJobId: Yup.string().required('Required'),
    });

    const matchToFormik = useFormik({
        initialValues,
        validationSchema: matchToSchema,
        onSubmit: () => {
            saveForm(false);
        },
        validateOnMount: true

    });

    const saveForm = (voiceAI: boolean) => {
        // setIsFormSubmitted(true);
        // if (matchToFormik.dirty && matchToFormik.isValid) {
        // console.log(matchToFormik.values);
        // console.log(userLocalData);
        if (matchToFormik.values.jobId) {
            let recrId = userLocalData.getvalue('recrId');
            let clientId = userLocalData.getvalue('clientId');
            let jobId = matchToFormik.values.jobId;

            // https://app.curately.ai/Accuick_API/Curately/Candidate/assign_job.jsp?clientId=3&recrId=61&jobId=1&userId=3520

            trackPromise(
                ApiService.postWithData("admin", 'saveAssignJob', { recrId: recrId, clientId: clientId, userIds: candidateId, jobId: Number(jobId) }).then(
                    (response: any) => {
                        if (response.data.Success === true) {
                            // showToaster("Job Assign Successfully", 'success');
                            if (!voiceAI) {

                                showToaster((response.data.Message), "success")
                                matchToFormik.resetForm();
                                if (candidateId.length === 1) {
                                    navigate('/' + userLocalData.getvalue('clientName') + '/candidate/view/' + candidateId[0] + '/' + jobId);
                                }
                                closePopup();
                            } else {
                                publishCandidateToVoiceAI();
                            }

                        } else if (response.data.Message === "Already Assigned To This Job") {
                            if (voiceAI) {
                                publishCandidateToVoiceAI();
                            } else {
                                showToaster((response.data.Message) ? response.data.Message : "An error occured while assigning the Candidate.", 'error')
                            }
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occured while assigning the Candidate.", 'error')
                        }
                    }
                )
            )
        } else {
            showToaster('Please fill all required fields.', 'error');
        }
    }

    const addToVoiceAI = () => {
        if (matchToFormik.values.jobId) {
            // let recrId = userLocalData.getvalue('recrId');
            let clientId = userLocalData.getvalue('clientId');
            let jobId = matchToFormik.values.jobId;

            trackPromise(
                ApiService.postWithData("voiceai", 'jobs/checkJobExists', { clientId: clientId, jobId: Number(jobId) }).then(
                    (response: any) => {
                        if (response.data.Success === true) {
                            saveForm(true);
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occured while assigning the Candidate.", 'error')
                        }
                    }
                )
            )
        } else {
            showToaster('Please select Job.', 'error');
        }
    }

    // VOice AI publish Candidate
    const publishCandidateToVoiceAI = () => {

        // let canidateIdToPass = "";
        // Object.entries(rowSelection).forEach(([key, value]) => {
        //     if (!canidateIdToPass && value) {
        //         canidateIdToPass = key;
        //     }
        // });
        if (candidateId) {

            let data = {
                "jobId": matchToFormik.values.jobId,
                "type": "shortList",
                "recrId": userLocalData.getvalue('recrId'),
                "userIds": candidateId,
                "clientId": userLocalData.getvalue('clientId')
            }

            //  https://adminapi.cxninja.com/voice-ai-prod/candidates/submitCandidates
            trackPromise(
                ApiService.postWithData('voiceai', 'candidates/submitCommunityCandidates', data).then((response: any) => {
                    let errorResponse = ""; let successResponse = "";
                    if (response.data.Success) {
                        showToaster((response.data.Message) ? response.data.Message : 'User Voice AI Created Successfully', 'success');
                       
                    }
                    else {
                        if (response.data?.candidatesResponse?.length > 1) {
                            let calculatedData = response.data.candidatesResponse;
                            for (let si = 0; si < calculatedData.length; si++) {

                                if (calculatedData[si]?.error) {
                                    errorResponse += calculatedData[si].failureUserId + " - " + calculatedData[si].errorResponse + "\n";

                                    // setRowSelection({});
                                } else {
                                    successResponse += calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.\n";
                                    //     showToaster(calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.", 'success');
                                    
                                }
                            }

                            (errorResponse) ? showToaster(errorResponse, 'error') : null;
                            (successResponse) ? showToaster(successResponse, 'success') : null;

                        } else {
                            let calculatedData = response.data.candidatesResponse;
                            if (calculatedData.error) {
                                errorResponse += calculatedData.failureUserId + " - " + calculatedData.errorResponse + "\n";

                                // setRowSelection({});
                            } else {
                                successResponse += calculatedData?.first_name + " " + calculatedData?.last_name + " - User Voice AI Created Successfully.\n";
                                //     showToaster(calculatedData[si]?.first_name + " " + calculatedData[si]?.last_name + " - User Voice AI Created Successfully.", 'success');
                               
                            }
                        }

                        showToaster((response.data.Message) ? response.data.Message : errorResponse ? errorResponse : "Error fetching Voice AI", 'error');
                    }
                })
                    .catch((error) => {
                        console.error('Error fetching Voice AI:', error);
                    })
            )
        }

    }

    return (
        <Dialog
            onClose={closePopup}
            aria-labelledby="customized-dialog-title"
            open={dialogOpen}
            maxWidth={'md'}
            fullWidth={true}
            id="AddMatchToModal"
        >
            <DialogTitle className="header">
                {moveToVoiceAI ? <span>Match To VoiceAI</span> : <span>Match To</span>}

                <IconButton
                    aria-label="close"
                    onClick={closePopup}
                    className="closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>

                <FormControl fullWidth className='mb-3 mt-3'>
                    {/* <label className="input-label">Associate Job</label> */}
                    <MUIAutoComplete
                        id='jobTitle'
                        handleChange={(id: any, name: string) => {
                            matchToFormik.setFieldValue('jobId', id);
                            matchToFormik.setFieldValue('selectedJobTitle', name);
                        }}
                        valuePassed={(matchToFormik.values.jobId) ? { label: matchToFormik.values.selectedJobTitle, id: matchToFormik.values.jobId } : {}}
                        isMultiple={false}
                        textToShow="Select Job"
                        width="100%"
                        type='assignJobToCandidate'
                        placeholder="Enter Job Title"

                    />

                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button variant='contained' type='button' color="primary" className='ml-2' onClick={() => saveForm(false)} >Assign</Button>
                {moveToVoiceAI ? <Button variant='contained' type='button' color="primary" className='ml-2' onClick={addToVoiceAI} >Move to VoiceAI </Button> : null}
            </DialogActions>

        </Dialog>
    )
}

export default AddMatchToModal;