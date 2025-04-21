import { useCallback, useRef, useState } from '../../../../shared/modules/React';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogTitle, DialogContent, CloseIcon } from "../../../../shared/modules/MaterialImports/Dialog";
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import './AddCandidateDialog.scss'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from "../../../../shared/modules/MaterialImports/Button";
import AddCandidateModal from './AddCandidateModal/AddCandidateModal';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { usePromiseTracker } from 'react-promise-tracker';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';
import { userLocalData } from '../../../../shared/services/userData';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import { Loader } from '../../../shared/Loader/Loader';



interface AddCandidateDialogProps {
    open: boolean;
    onClose: (type?: "ADD") => void;
}
function AddCandidateDialog({ open, onClose }: AddCandidateDialogProps) {


    const { promiseInProgress } = usePromiseTracker();

    const [candidateData, setCandidateData] = useState<any>({});

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [openAddCandidateModal, setOpenAddCandidateModal] = useState(false);
    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        AddResumeFormik.setFieldValue('resume', acceptedFiles && acceptedFiles.length ? acceptedFiles[0] : null);
        //  fileInputRef.current?.click();
        if (acceptedFiles && acceptedFiles.length) {
            uploadFileForm(acceptedFiles[0]);
        }
        // documentFormik.setFieldValue('document', acceptedFiles && acceptedFiles.length ? acceptedFiles[0] : null);
    }, []);
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop, multiple: false })
    const files = acceptedFiles.map((file: any) => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
    ));

    const initialAddResumeDetails = {
        "clientId": userLocalData.getvalue('clientId'),
        "resume": "",
    }
    const addResumeSchema = Yup.object().shape({

        clientId: Yup.string().required('Required'),
        resume: Yup.string().required('Required'),
    })

    const AddResumeFormik = useFormik({
        initialValues: initialAddResumeDetails,
        validationSchema: addResumeSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
        },
        // onSubmit: handleSubmit
    });


    const uploadFileForm = (filePassed: File) => {

        console.log(filePassed);
        setIsFormSubmitted(true);
        //   console.log(AddResumeFormik.values);
        // if (AddResumeFormik.isValid) {
        trackPromise(
            //      http://52.88.252.214:90/QADemoCurately/resumeMe
            ApiService.postWithFileData('admin', 'resumeMe', {
                clientId: userLocalData.getvalue('clientId'),
                resume: filePassed
            }).then(
                (response) => {
                    // console.log(response.data);
                    if (response.data.Success) {
                        //  showToaster('Resume has been saved successfully.', 'success');
                        setCandidateData(response.data);
                        setOpenAddCandidateModal(true);
                    } else {
                        showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                    }
                })
        )
        // } else {
        //     showToaster('Please fill all fields.', 'error');
        // }
    }
    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }
    return (
        <div>
            <Dialog maxWidth={'md'}
                open={open}
                className='AddUserModal customInputs' id='addCandidateDialog'>
                <DialogTitle className='py-2'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span style={{ fontWeight: 'bold' }}>Add a Candidate</span>
                        <span onClick={() => onClose()}>
                            <CloseIcon />
                        </span>
                    </Grid>

                </DialogTitle>
                {/* <Divider /> */}
                <DialogContent className='px-5'>
                    {
                        promiseInProgress ? <Loader /> : null
                    }
                    <form onSubmit={AddResumeFormik.handleSubmit} >
                        <Box sx={{ width: '100%', marginBottom: '20px' }}>
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
                                                <Stack
                                                    direction="column"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    spacing={1}
                                                    onClick={() => saveAuditLog(3926)}
                                                >
                                                    <UploadFileIcon />
                                                    <Typography>Drag drop resume here</Typography>
                                                    <Typography>or click here to browse your device<span style={{ color: 'red' }}>*</span></Typography>
                                                </Stack>
                                    }
                                </div>
                            </div>

                        </Box>
                        <Box sx={{ width: '100%' }}>
                            <div className='dropzone'>
                                <Stack spacing={2} alignItems="center" justifyContent="center">
                                    {/* <UploadFileIcon fontSize="large" /> */}
                                    <Typography variant="body1">
                                        Don't have a resume? No Worries.
                                    </Typography>
                                    <Button type="submit" variant='contained' color="primary" onClick={() => { saveAuditLog(3927); setOpenAddCandidateModal(true) }}>
                                        Add Candidate Manually
                                    </Button>
                                    {
                                        (openAddCandidateModal) ?
                                            <AddCandidateModal
                                                open={openAddCandidateModal}
                                                closePopup={(type?: "ADD") => {
                                                    onClose(type);
                                                    setOpenAddCandidateModal(false)
                                                }}
                                                candidateData={candidateData.userId ? candidateData : {}}
                                            />
                                            :
                                            null
                                    }
                                </Stack>

                            </div>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddCandidateDialog;
