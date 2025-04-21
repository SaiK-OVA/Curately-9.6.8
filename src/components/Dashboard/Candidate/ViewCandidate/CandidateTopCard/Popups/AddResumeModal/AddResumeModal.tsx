
import { useCallback } from '../../../../../../../shared/modules/React';
import { useFormik, Yup } from '../../../../../../../shared/modules/Formik'
import { useDropzone } from 'react-dropzone';
import ApiService from '../../../..../../../../../../shared/api/api';
import { Dialog, DialogContent, DialogTitle, DialogActions, CloseIcon } from '../../../../../../../shared/modules/MaterialImports/Dialog';
// import Divider from '@mui/material/Divider';
import { Button, IconButton } from '../../../../../../../shared/modules/MaterialImports/Button';
import { FormControlLabel } from '../../../../../../../shared/modules/MaterialImports/FormInputs'
import { Checkbox } from '../../../../../../../shared/modules/MaterialImports/FormElements';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../../../shared/services/userData';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import { globalData } from '../../../../../../../shared/services/globalData';

import "./AddResumeModal.scss";

const AddResumeModal = (
    { dialogOpen, handleClose }: { dialogOpen: boolean, handleClose: any }

) => {



    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files

        addCandidateFormik.setFieldValue('resume', acceptedFiles && acceptedFiles.length ? acceptedFiles[0] : null);
    }, []);
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop, multiple: false })

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialValues = {
        resume: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
    }

    const addCandidateSchema = Yup.object({
        resume: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().required('Required').email('Invalid email format'),
        phoneNo: Yup.string(),
    })
    const addCandidateFormik = useFormik({
        initialValues,
        validationSchema: addCandidateSchema,
        onSubmit: () => {
            saveForm();
        },
        validateOnMount: true

    });

    const saveForm = () => {
        // setIsFormSubmitted(true);
        // if (addCandidateFormik.dirty && addCandidateFormik.isValid) {
        // console.log(addCandidateFormik.values);
        // console.log(acceptedFiles);
        if (addCandidateFormik.values.resume || (addCandidateFormik.values.firstName && addCandidateFormik.values.lastName && addCandidateFormik.values.email)) {
            // Contacts/contacts_save.jsp
            let tempFormData = new FormData();
            tempFormData.append('Fname', (addCandidateFormik.values.firstName) ? addCandidateFormik.values.firstName : "");
            tempFormData.append('Lname', (addCandidateFormik.values.lastName) ? addCandidateFormik.values.lastName : "");
            tempFormData.append('Email', (addCandidateFormik.values.email) ? addCandidateFormik.values.email : "");
            tempFormData.append('Resume', addCandidateFormik.values.resume);
            tempFormData.append('userName', userLocalData.getvalue('userName'));
            tempFormData.append('userId', userLocalData.getvalue('recrId'));
            // { ...addCandidateFormik.values, rdCand: "1" }
            trackPromise(
                ApiService.postWithFileData(193, 'Candidate/candidate_upload.jsp', tempFormData).then(
                    (response: any) => {
                        if (response.data.success) {
                            showToaster(response.data.message, 'success');
                            addCandidateFormik.resetForm();
                            setTimeout(() => {
                                window.open(globalData.getWindowLocation() + "candidate/view/" + response.data.candidateId.trim());
                            }, 250);
                            //closePopup();
                        } else {
                            showToaster((response.data.message) ? response.data.message : "An error occured while saving the Candidate.", 'error')
                        }
                    }
                )
            )
        } else {
            showToaster('Please fill all required fields.', 'error');
        }
    }
    // const [value, setValue] = useState(0);

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setValue(newValue);

    //     setIsFormSubmitted(false);
    //     acceptedFiles.splice(0, 1)
    //     addCandidateFormik.setFieldValue('resume', null);
    // };

    const files = acceptedFiles.map((file: any) => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
    ));
    // console.log(files);

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={dialogOpen}
            id="addResumeModal">
            <DialogTitle className="header">
                <span>Add Resume</span>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    className="closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className='px-5'>
                <div className='customDropZone'>
                    <div {...getRootProps({
                        className: `dropzone ${acceptedFiles.length > 0 ? 'fileDroped' : ''}`
                    })}>
                        <input {...getInputProps()} multiple={false} />
                        {
                            isDragActive ?
                                <p>Drop the resume here ... *</p> :
                                (files && files.length) ?
                                    <p>{files}</p>
                                    :
                                    <p>Drag 'n' drop resume here, or click to select <span style={{ color: 'red' }}>*</span></p>
                        }
                    </div>
                </div>
                <FormControlLabel
                    control={<Checkbox />}
                    label="Formatted Resume"
                    labelPlacement="end"
                    id="formattedResume"
                    name="formattedResume"
                    className="mt-3"
                />
            </DialogContent>

            <DialogActions>
                <Button variant="contained" color="primary" className='ml-2'>Upload</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddResumeModal;


