import { useCallback ,useEffect, useState} from '../../../../../../../shared/modules/React';
import { useFormik, Yup } from '../../../../../../../shared/modules/Formik';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import { useDropzone } from 'react-dropzone';
// import { useParams } from 'react-router-dom';


import { userLocalData } from '../../../../../../../shared/services/userData';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../../../../shared/api/api';

import { Dialog, DialogContent, DialogActions, DialogTitle, CloseIcon } from '../../../../../../../shared/modules/MaterialImports/Dialog';
import { Button, IconButton } from '../../../../../../../shared/modules/MaterialImports/Button';
import { FormControl, TextField } from "../../../../../../../shared/modules/MaterialImports/FormInputs";
import { MenuItem } from "../../../../../../../shared/modules/MaterialImports/Menu";
import "./AddDocumentModal.scss";
// import ErrorMessage from '../../../../../../shared/Error/ErrorMessage';



const AddDocumentModal = ({ dialogOpen, closePopup, candidateId, jobId,add , documentData }: { dialogOpen: boolean; closePopup: any; candidateId: string; jobId: string; add:boolean , documentData:any}) => {
    const [documentType, setDocumentType] = useState<any[]>([])


    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files

        documentFormik.setFieldValue('document', acceptedFiles && acceptedFiles.length ? acceptedFiles[0] : null);
    }, []);
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop, multiple: false })

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialValues = {
        docTitle:  documentData?.docTitle || '',
        docType:  documentData?.documentTypeId || '',
        docNotes: documentData?.docNotes ||'',
        document: null,
    }


    const documentSchema = Yup.object({
        document: Yup.mixed().required('Document is required'),
        recrId: Yup.string().required('Required'),
        clientId: Yup.string().required('Required'),
        docTitle: Yup.string().required('Alternate Name is required.'),
        docType: Yup.string().required('Document type is required.'),
        userId: Yup.string(),
        jobId: Yup.string(),
        docNotes: Yup.string(),
    })
    const documentFormik = useFormik({
        initialValues,
        validationSchema: documentSchema,
        onSubmit: () => {
            saveForm();
        },
        validateOnMount: true

    });
    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const saveForm = () => {
        if (!documentFormik.values.document && !documentData?.fileName) {
            showToaster('Please select a document.', 'error');
            return; 
        }
        // setIsFormSubmitted(true);
        // if (documentFormik.dirty && documentFormik.isValid) {
        // console.log(documentFormik.values);
        // console.log(acceptedFiles);
        if (documentFormik.values.docTitle || (documentFormik.values.docTitle && documentFormik.values.docType)) {
            let tempFormData = new FormData();
            tempFormData.append('recrId', userLocalData.getvalue('recrId'));
            tempFormData.append('clientId', userLocalData.getvalue('clientId'));
            tempFormData.append('userId', candidateId ? candidateId : "");
            tempFormData.append('jobId', (jobId) ? jobId : "");

            tempFormData.append('docTitle', (documentFormik.values.docTitle) ? documentFormik.values.docTitle : "");
            tempFormData.append('docType', (documentFormik.values.docType) ? documentFormik.values.docType : "");
            tempFormData.append('docNotes', (documentFormik.values.docNotes) ? documentFormik.values.docNotes : "coverletter");
            if (!add) {
                if (documentData?.docId) {
                    tempFormData.append('docId', documentData.docId); 
                }
                if (documentFormik.values.document) {
                    tempFormData.append('resume', documentFormik.values.document);
                }
            } else {
                if (documentFormik.values.document) {
                    tempFormData.append('resume', documentFormik.values.document);
                } else {
                    tempFormData.append('resume', "");
                }
            }
            // https://www4.accuick.com/Accuick_API/Curately/Documents/upload.jsp
            //https://app.curately.ai/Accuick_API/Curately/Documents/upload.jsp
            trackPromise(
                ApiService.postWithFileData('admin', 'upload', tempFormData).then(
                    (response: any) => {
                        //    console.log(response.data);
                        if (response.data.Message === "Success") {
                            showToaster("Document has been uploaded successfully", 'success');
                            documentFormik.resetForm();
                            //  console.log(response.data)
                            setTimeout(() => {
                                //  window.open(globalData.getWindowLocation() + "candidate/view/" + response.data.candidateId);
                            }, 250);
                            closePopup();
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'Some error is there. Try again.', 'error')
                        }
                    }
                )
            )
        } else if(!documentFormik.values.document ){
            showToaster('Please select a document.', 'error');
        } else {
            showToaster('Please fill all required fields.', 'error');
        }
    }
    // const [value, setValue] = useState(0);

    // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //     setValue(newValue);

    //     setIsFormSubmitted(false);
    //     acceptedFiles.splice(0, 1)
    //     documentFormik.setFieldValue('document', null);
    // };

    const files = acceptedFiles.map((file: any) => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
    ));
    // console.log(files);
//    const handleDocTypeChange = (value:string) => {
//     const updateData = {...documentData}
//     updateData.fileName = ''
//     setDocumentData(updateData)

//    }
    useEffect(()=>{
        getDocumentTpes()
    },[]);

    let clientId = userLocalData.getvalue('clientId')
    const getDocumentTpes = () =>{
    ApiService.getCall("admin", `getDocumentTypes/${clientId}`)
    .then((response)=>{
        console.log(response.data.documentTypeDetails,"res..")
        if(response.data.Success){
            setDocumentType(response.data.documentTypeDetails)
        } else {
            showToaster("Failed to load document types", 'error');
        }
        })
        }


    return (
        <Dialog
            onClose={closePopup}
            aria-labelledby="customized-dialog-title"
            open={dialogOpen}
            id="addDocumentModal"
        >
            <DialogTitle className="header">
            <span>{add ? 'Add' : 'Update'} Document</span>

                <IconButton
                    aria-label="close"
                    onClick={closePopup}
                    className="closeBtn"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className='customDropZone'>
                    <div {...getRootProps({
                        className: `dropzone ${acceptedFiles.length > 0 ? 'fileDroped' : ''}`
                    })}>
                        <input {...getInputProps()} multiple={false} />
                        {
                            isDragActive ? (
                                <p>Drop the resume here ... *</p>
                            ) : (
                                (acceptedFiles.length || documentData?.fileName) ? (
                                    <p>{acceptedFiles.length > 0 ? files : documentData.fileName}</p>
                                ) : (
                                    <p>Drag 'n' drop document here, or click to select <span style={{ color: 'red' }}>*</span></p>
                                )
                            )
                        }
                    </div>
                </div>
                {/* <ErrorMessage formikObj={documentFormik} name='document' isFormSubmitted={isFormSubmitted} /> */}
                <FormControl fullWidth className='mb-3 mt-3'>
                <label className="input-label">Alternate Name<span style={{ color: 'red' }}>*</span></label>
                    <TextField
                        variant="outlined"
                        id="docTitle"
                        size="small"
                        className='m-0'
                        value={documentFormik.values.docTitle}
                        onChange={documentFormik.handleChange}
                    />
                    {/* <ErrorMessage formikObj={documentFormik} name='docTitle' isFormSubmitted={isFormSubmitted} /> */}
                </FormControl>
                <FormControl fullWidth className='mb-3'>
                    <label className="input-label">Document Type<span style={{ color: 'red' }}>{add ? '*' : ''}</span></label>
                    <TextField
                        select
                        id="demo-simple-select"
                        size="small"
                        className='m-0'
                        value={documentFormik.values.docType}
                        onChange={
                            (e) => {
                                documentFormik.setFieldValue('docType', e.target.value)
                                // handleDocTypeChange(e.target.value)
                            }
                        }
                    >
                        <MenuItem value=""></MenuItem>
                        {documentType.map((type)=>(
                             <MenuItem key={type.documentTypeId} value={type.documentTypeId}>{type.documentType}</MenuItem>
                        ))}
                    </TextField>
                    {/* <ErrorMessage formikObj={documentFormik} name='docType' isFormSubmitted={isFormSubmitted} /> */}
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button variant='contained' type='button' color="primary" className='ml-2' onClick={saveForm}>{add ? 'Upload' : 'Update'}</Button>
            </DialogActions>

        </Dialog>
    )
}

export default AddDocumentModal;