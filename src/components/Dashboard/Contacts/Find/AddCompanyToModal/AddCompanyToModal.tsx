import { useState, useEffect } from '../../../../../shared/modules/React';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { useFormik, Yup } from '../../../../../shared/modules/Formik';
//import { useNavigate } from 'react-router-dom';

import ApiService from '../../../../../shared/api/api';
import { userLocalData } from '../../../../../shared/services/userData';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
// import { MUIAutoComplete } from "../../../../shared/MUIAutoComplete/MUIAutoComplete";

import { Dialog, DialogContent, DialogActions, DialogTitle, CloseIcon } from '../../../../../shared/modules/MaterialImports/Dialog';
import { Button, IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { FormControl, TextField } from "../../../../../shared/modules/MaterialImports/FormInputs";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import "./AddCompanyToModal.scss";
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';

const AddCompanyToModal = ({ dialogOpen, closePopup, contactId, moveToJobDiva, saveJobDiva, type }: { dialogOpen: boolean; closePopup: any; contactId: number[]; moveToJobDiva: boolean, saveJobDiva: (data: any, checked: any) => void, type: string }) => {

    // const { contactId } = useParams();

    const creditsData: any = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`)
    const { consumedSmsCredits, totalSmsCredits } = JSON.parse(creditsData)
    console.log(consumedSmsCredits, 'consumedSmsCredits', totalSmsCredits)
    const [isDisabled, setDisabled] = useState<any>(false)

    const [selectedCompName, setSelectedCompName] = useState([{
        label: "",
        id: ""
    }]);
    // let navigate = useNavigate();

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const initialValues = {
        recrId: userLocalData.getvalue('recrId'),
        clientId: userLocalData.getvalue('clientId'),
        userId: contactId,
        compId: "",
        selectedCompName: "",
    }

    // https://app.curately.ai/Accuick_API/Curately/Candidate/assign_job.jsp?clientId=3&recrId=61&compId=1&userId=3520

    const matchToSchema = Yup.object({
        recrId: Yup.string().required('Required'),
        clientId: Yup.string().required('Required'),
        userId: Yup.string(),
        selectedCompName: Yup.string(),
    });

    const matchToFormik = useFormik({
        initialValues,
        validationSchema: matchToSchema,
        onSubmit: () => {
            //saveForm(false);
        },
        validateOnMount: true

    });


    const getCompanyList = () => {
        // http://35.155.202.216:8080/QADemoCurately/getRoleList
        trackPromise(
            ApiService.getCall('ats', `jobDiva/getCompanies/${userLocalData.getvalue('clientId')}`)
                .then((response: any) => {
                    const respData = response.data;
                    if (respData.Success) {
                        let tempData = response.data.data.map((i: { name: string, id: string }) => ({ id: i.id, label: i.name }))
                        console.log(tempData);
                        setSelectedCompName(tempData);
                    }
                })
        )
    }
    useEffect(() => {
        getCompanyList();
    }, []);

    const publishCandidateToJobdiva = () => {
        setDisabled(true)
        if (type === "people") {
            saveJobDiva(matchToFormik.values.selectedCompName, isMobileChecked)
            setDisabled(false)
            closePopup();
            return
        }

        let bodyRequest = {
            "atsName": "JobDiva",
            "clientId": userLocalData.getvalue('clientId'),
            "recruiterId": userLocalData.getvalue('recrId'),
            "moduleName": "Contact",
            "curatelyIds": contactId,
            "missingFields": (matchToFormik.values.selectedCompName) ? { "company": matchToFormik.values.selectedCompName } : null,
        }

        ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {
            if (response.data.Success) {
                showToaster(`Jobdiva - Contact is Publshed successfully`, 'success');
                closePopup();
                setDisabled(false)
            } else {
                setDisabled(false)
                showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Contact to Jobdiva", 'error');
            }
        }).catch(error => {
            setDisabled(false)
            showToaster(error.message ? error.message : "Unable to Publish Contact to Jobdiva", 'error');
        });

    }

    const [isMobileChecked, setMobileChecked] = useState<any>(false)

    const onMobileCheckBoxChange = (e: any) => {
        setMobileChecked(e.target.checked)
    }


    return (
        <Dialog
            onClose={closePopup}
            aria-labelledby="customized-dialog-title"
            open={dialogOpen}
            maxWidth={'md'}
            fullWidth={true}
            id="AddCompanyToModal"
        >
            <DialogTitle className="header">
                {/* {moveToJobDiva ? <span>Add Company To JobDiva</span> : <span>Add Company To JobDiva</span>} */}
                <span>Select Company Name </span>

                <IconButton
                    aria-label="close"
                    onClick={closePopup}
                    className="closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                {type === "people" && (consumedSmsCredits !== totalSmsCredits) && <Box>
                    Take note: Adding new contacts to a list requires <span style={{ fontWeight: 600 }}>1 email credit</span> per verified email. However, re-adding previously saved contacts won’t consume any credits.

                    <Box sx={{ mt: 1, mb: 1 }}>
                        <FormControlLabel sx={{ width: "20px", height: "20px" }} control={<Checkbox value={isMobileChecked} onChange={onMobileCheckBoxChange} />} label="" />
                        <span style={{ fontSize: "13px" }}>Each mobile number that is successfully enriched, you'll be <span style={{ fontWeight: "600" }}>charged 1 credit</span>, while saved contacts don't use any.</span>
                    </Box>
                </Box>}
                <FormControl fullWidth className='mb-3 mt-3'>

                    <TextField fullWidth className='mt-1 ml-1'
                        variant="outlined"
                        type="text"
                        size="small"
                        id='compTitle'
                        name="compTitle"
                        placeholder="Select Company Name"
                        title="Select Company Name"
                        label="Select Company Name"
                        value={matchToFormik.values.compId}
                        onChange={(e) => {
                            matchToFormik.setFieldValue('compId', e.target.value);
                            matchToFormik.setFieldValue('selectedCompName', e.target.value);
                        }}
                        select
                    >
                        <MenuItem value="" >Select Company Name</MenuItem>
                        {
                            selectedCompName.map((val: any) => {
                                return <MenuItem key={val.id} value={val.label} >{val.label}</MenuItem>
                            })
                        }
                    </TextField>

                    {/* <label className="input-label">Associate Job</label> */}
                    {/* <MUIAutoComplete
                        id='compTitle'
                        handleChange={(id: any, name: string) => {
                            matchToFormik.setFieldValue('compId', id);
                            matchToFormik.setFieldValue('selectedCompName', name);
                        }}
                        valuePassed={(matchToFormik.values.compId) ? { label: matchToFormik.values.selectedCompName, id: matchToFormik.values.compId } : {}}
                        isMultiple={false}
                        textToShow="Select Company"
                        width="100%"
                        type='assignCompanyToCandidate'
                        placeholder="Enter Company Name"

                    /> */}

                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button variant='contained' type='button' color="primary" className='ml-2' onClick={publishCandidateToJobdiva} disabled={isDisabled}>Move to JobDiva </Button>
            </DialogActions>

        </Dialog>
    )
}

export default AddCompanyToModal;