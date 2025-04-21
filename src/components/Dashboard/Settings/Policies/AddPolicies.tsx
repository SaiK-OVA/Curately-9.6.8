import { React, useState, useCallback, useEffect } from '../../../../shared/modules/React';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { IconButton, Button } from '../../../../shared/modules/MaterialImports/Button';
import { TextField, FormControl, FormLabel, FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { RadioGroup, Radio } from '../../../../shared/modules/MaterialImports/FormElements';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { useFormik, Yup } from '../../../../shared/modules/Formik';
import IsValidUrl from '../../../../shared/utils/IsValidUrl';
import './AddPolicies.scss'
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../shared/services/userData';
import ApiService from '../../../../shared/api/api';
import { useDropzone } from 'react-dropzone';
import InfoIcon from '@mui/icons-material/Info';
interface AddPoliciesProps {
    open: boolean;
    handleClose: (open: boolean) => void
    add: boolean;
    policyData: PolicyData;
}
interface PolicyData {
    policyName: string;
    policyURL: string;
    policyType?: any;
    policyContent: string;
    policyDownloadPath?: any;
    clientId: string;
    policyId?: string;
    policyDocument?: any;
}
const AddPolicies: React.FC<AddPoliciesProps> = ({ open, handleClose, add, policyData }) => {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const clearFile = () => {
        policyFormik.setFieldValue('policyDocument', null);
        acceptedFiles.length = 0;
        if (inputRef.current) {
            inputRef.current.value = ""; // Reset the file input
        }
    };

    const handleCloseAddHolidaysDialog = () => {
        handleClose(false);
        clearFile();

    };
    const onDrop = useCallback((acceptedFiles: any) => {
        policyFormik.setFieldValue('policyDocument', acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles, inputRef } = useDropzone({
        onDrop,
        multiple: false
    });
    const validationSchema = Yup.object({
        policyName: Yup.string().required('Policy name is required'),
        policyURL: Yup.string()
            .when('policyType', {
                is: 'url',
                then: (f: any) => f.test(
                    'is-valid-url',
                    'Enter a valid URL',
                    (value: string) => IsValidUrl.check(value || '')
                ).required('URL is required for URL type'),
                otherwise: (f: any) => f.notRequired()
            }),
        policyContent: Yup.string()
            .when('policyType', {
                is: 'content',
                then: (f: any) => f.required('Policy content is required'),
                otherwise: (f: any) => f.notRequired()
            }),
        policyDocument: Yup.mixed()
            .when('policyType', {
                is: 'upload',
                then: (f: any) => f.required('A document is required for Upload type'),
                otherwise: (f: any) => f.notRequired()
            }),
        policyType: Yup.string().required('Policy type is required'),
    }).test(
        'at-least-one',
        'You must provide at least one type of policy detail (URL, Content, or Document)',
        (value: any) => (value.policyType === 'url' && value.policyURL) ||
            (value.policyType === 'content' && value.policyContent) ||
            (value.policyType === 'upload' && value.policyDocument)
    );

    const policyFormik = useFormik({
        initialValues: {
            policyName: policyData ? policyData.policyName : '',
            policyURL: policyData ? policyData.policyURL : '',
            policyContent: policyData ? policyData.policyContent : '',
            policyDocument: policyData ? policyData.policyDownloadPath : '',
            policyType: policyData ? policyData.policyType : 'url',
            policyId: policyData ? policyData.policyId : ''
        },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            // console.log(values);

        },
    });
    const files = acceptedFiles.map((file: any) => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
    ));
    const handlePolicyTypeChange = (event: any) => {
        const newType = event.target.value;
        // policyFormik.setFieldValue('policyType', newType);
        // policyFormik.setFieldValue('policyURL', '');
        // policyFormik.setFieldValue('policyContent', '');
        // policyFormik.setFieldValue('policyDocument', '');
        policyFormik.setFieldValue('policyType', newType);
        if (newType === 'url' || newType === 'content') {
            clearFile();
        }
        // policyFormik.setFieldValue('policyType', newType);
        if (newType === 'url') {
            policyFormik.setFieldValue('policyContent', '');
            policyFormik.setFieldValue('policyDocument', null);
        } else if (newType === 'content') {
            policyFormik.setFieldValue('policyURL', '');
            policyFormik.setFieldValue('policyDocument', null);
        } else if (newType === 'upload') {
            policyFormik.setFieldValue('policyURL', '');
            policyFormik.setFieldValue('policyContent', '');
        }
    };



    const savePolicies = () => {
        setIsFormSubmitted(true);

        if (!policyFormik.values.policyName.trim()) {
            showToaster("Please enter a Policy Name", "error");
            return;
        }
        if (policyFormik.values.policyType === 'url' && !policyFormik.values.policyURL.trim()) {
            showToaster("Please enter a URL for the URL type", "error");
            return;
        }
        if (policyFormik.values.policyType === 'content' && !policyFormik.values.policyContent.trim()) {
            showToaster("Please enter content for the Content type", "error");
            return;
        }
        if (policyFormik.values.policyType === 'upload' && !policyFormik.values.policyDocument) {
            showToaster("Please upload a document for the Upload type", "error");
            return;
        }

        policyFormik.validateForm().then(errors => {
            if (Object.keys(errors).length === 0) {
                let data: any = {
                    policyName: policyFormik.values.policyName,
                    clientId: userLocalData.getvalue("clientId"),
                };

                if (policyFormik.values.policyId) {
                    data.policyId = policyFormik.values.policyId;
                }

                if (policyFormik.values.policyType === 'url') {
                    data.policyURL = policyFormik.values.policyURL;
                } else if (policyFormik.values.policyType === 'content') {
                    data.policyContent = policyFormik.values.policyContent;
                } else if (policyFormik.values.policyType === 'upload') {
                    data.policyDocument = policyFormik.values.policyDocument;
                }

                const action = data.policyId ? 'updated' : 'saved';
                trackPromise(
                    ApiService.postWithFileData('admin', 'savePolicy', data).then(
                        (response: any) => {
                            if (response.data.Success) {
                                showToaster(`Policy has been ${action} successfully`, 'success');
                                policyFormik.resetForm();
                                policyFormik.setFieldValue('policyDocument', null);
                                handleClose(true);
                            } else {
                                showToaster(response.data.Message ? response.data.Message : 'An error occurred', 'error');
                            }
                        }
                    ).catch(error => {
                        showToaster('Network or server error occurred', 'error');
                    })
                );
            } else {
                showToaster('Please fill all required fields.', 'error');
            }
        });
    };

    useEffect(() => {
        console.log("Current policy type:", policyFormik.values.policyType);
    }, [policyFormik.values.policyType]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }, [inputRef, policyFormik.values.policyDocument]);
    const policyDocumentUrl = policyData?.policyDownloadPath
        ? `${import.meta.env.VITE_URL_AWS}${policyData.policyDownloadPath}`
        : '';

    const fileName = policyDocumentUrl ? policyDocumentUrl.split('/').pop() : 'No file selected';

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (

        <Dialog open={open} onClose={() => handleClose(false)} fullWidth={true}>
            <DialogTitle>{add ? 'Add New' : 'Update'} Policy</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCloseAddHolidaysDialog}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent className='AddPoliciesdialogContent'>
                <form onSubmit={policyFormik.handleSubmit}>
                    <Stack className='AddPolicyDialogContent'>
                        <FormControl fullWidth >
                            <FormLabel className='AddPolicyFormControlLabel'>Policy Name</FormLabel>
                            <TextField
                                variant="outlined"
                                name="policyName"
                                size="small"

                                value={policyFormik.values.policyName}
                                onChange={policyFormik.handleChange}
                                error={policyFormik.touched.policyName && Boolean(policyFormik.errors.policyName)}
                            // helperText={(policyFormik.touched.policyName && typeof policyFormik.errors.policyName === 'string') ? policyFormik.errors.policyName : ''}
                            />
                        </FormControl>
                    </Stack>
                    <FormControl size="small" fullWidth>
                        <Box display="flex" alignItems="center">
                            <FormLabel className='policyDetailsLabel'>Provide Policy Details</FormLabel>
                            <Tooltip title="Please select exactly one type of policy detail to provide." placement="right">
                                <InfoIcon style={{ color: 'rgba(0, 0, 0, 0.54)', marginLeft: 4, marginTop: 8, paddingTop: '2' }} />
                            </Tooltip>
                        </Box>
                        <RadioGroup
                            name="policyType"
                            value={policyFormik.values.policyType}

                            onChange={handlePolicyTypeChange}
                            className="policyDetailsLabel"
                        >
                            <Stack spacing={2} direction={"row"} >
                                <FormControlLabel
                                    value="url"
                                    control={<Radio />}
                                    label="URL"
                                />
                                <FormControlLabel
                                    value="content"
                                    control={<Radio />}
                                    label="Content"
                                />
                                <FormControlLabel
                                    value="upload"
                                    control={<Radio />}
                                    label="Upload"
                                />
                            </Stack>
                        </RadioGroup>
                        {policyFormik.values.policyType === 'url' && (

                            <div className={policyFormik.values.policyType === 'url' ? 'policyDetailsLabel policyInputContainer active' : 'policyInputContainer'}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="policyURL"
                                    size="small"
                                    placeholder="Enter Policy URL"
                                    value={policyFormik.values.policyURL}
                                    onChange={policyFormik.handleChange}
                                    error={policyFormik.touched.policyURL && Boolean(policyFormik.errors.policyURL)}

                                    helperText={policyFormik.touched.policyURL && typeof policyFormik.errors.policyURL === 'string' ? policyFormik.errors.policyURL : ''}
                                />
                            </div>
                        )}
                        {policyFormik.values.policyType === 'content' && (


                            <div className={policyFormik.values.policyType === 'content' ? ' policyDetailsLabel policyInputContainer active' : 'policyInputContainer'}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    name="policyContent"
                                    label="Copy paste Policy Content"
                                    value={policyFormik.values.policyContent}
                                    onChange={policyFormik.handleChange}
                                    error={policyFormik.touched.policyContent && Boolean(policyFormik.errors.policyContent)}
                                    helperText={policyFormik.touched.policyContent && typeof policyFormik.errors.policyContent === 'string' ? policyFormik.errors.policyContent : ''}
                                />
                            </div>
                        )}
                        {policyFormik.values.policyType === 'upload' && (


                            <div className={policyFormik.values.policyType === 'upload' ? ' policyDetailsLabel policyInputContainer active' : 'policyInputContainer'}>
                                <FormControl fullWidth className="customDropZone">
                                    <div {...getRootProps({ className: `customDropZone dropzone ${acceptedFiles.length > 0 ? 'fileDropped' : ''}` })}>
                                        <input {...getInputProps()} />
                                        {isDragActive ? (
                                            <p>Drop the document here...</p>
                                        ) : acceptedFiles.length > 0 ? (
                                            <p>{acceptedFiles[0].name}</p>
                                        ) : policyDocumentUrl ? (
                                            <p>{fileName}</p>
                                        ) : (
                                            <p>Drag 'n' drop document here, or click to select <span style={{ color: 'red' }}>*</span></p>
                                        )}
                                    </div>
                                </FormControl>

                                {/* {policyDocumentUrl && (
        <div>
            <a href={policyDocumentUrl} target="_blank" rel="noopener noreferrer">
                {fileName}
            </a>
        </div>
    )} */}
                            </div>
                        )}

                    </FormControl>


                    <DialogActions>
                        <Button
                            variant="outlined"
                            type='button'
                            size="small"
                            color="secondary"
                            className='mr-2' onClick={() => { saveAuditLog(4284); handleCloseAddHolidaysDialog() }}>Cancel</Button>
                        <Button type="submit" color="primary" onClick={() => { saveAuditLog(4285); savePolicies() }} variant='contained'>{add ? 'Add' : 'Update'} Policy</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog >

    );
};

export default AddPolicies;
