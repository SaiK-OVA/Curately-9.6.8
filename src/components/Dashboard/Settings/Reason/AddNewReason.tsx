import { React, useCallback, useEffect, useState } from '../../../../shared/modules/React';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import { TextField, FormControl, Button, IconButton } from '../../../../shared/modules/commonImports';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu'
import './Reason.scss';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../shared/services/userData';
import { debounce } from '@mui/material';
import ErrorMessage from '../../../shared/Error/ErrorMessage';

// interface ReasonsType {
//     reasonId?: string;
//     reasonName?: string;
//     reasonTypeId?: string;
//     status?: string;
//     createdBy?: string;
//     clientId?: string;
// }

interface AddReasonDialogProps {
    helperText?: React.ReactNode;
    open: boolean;
    handleClose: (addorUpdate: boolean) => void;
    reasonData: any;
    add: boolean;
}

const AddNewReason: React.FC<AddReasonDialogProps> = ({ open, handleClose, add, reasonData }) => {

    let clientId = userLocalData.getvalue('clientId');
    let userId = userLocalData.getvalue('recrId');

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [reasonType, setReasonType] = useState<any[]>();

    const addReasonFormik = useFormik({
        initialValues: reasonData ? {
            reasonName: reasonData ? reasonData.reasonName : '',
            status: reasonData ? reasonData.status : '',
            reasonTypeId: reasonData ? reasonData.reasonTypeId : '',
            reasonId: reasonData ? reasonData.reasonId : '',
            createdBy: reasonData ? reasonData.createdBy : userId,
            clientId: reasonData ? reasonData.clientId : clientId,
        } : {
            reasonId: "",
            reasonName: "",
            reasonTypeId: "",
            status: "",
            createdBy: "",
            clientId: clientId,
        },
        validationSchema: Yup.object().shape({
            reasonName: Yup.string()
                .required('Reason Name is required')
                .matches(/^[a-zA-Z0-9-_@() ]+$/, 'Reason Name can only contain alphabets, numbers, underscores, slashes, and spaces'),
            clientId: Yup.string(),
            status: Yup.string().required('Status is required'),
            reasonTypeId: Yup.string().required('Reason Type is required'),
            createdBy: Yup.string()

        }),
        enableReinitialize: true,
        onSubmit: () => {
            //   handleAdd(values);
            setIsFormSubmitted(true);
        },
    });

    useEffect(() => {
        loadReasonTypeList();
    }, []);

    const loadReasonTypeList = useCallback(debounce(() => {
        trackPromise(
            //http://35.155.202.216:8080/QADemoCurately/getReasonTypeList/2
            //ApiService.getCall(216, `QADemoCurately/getReasonTypeList/${clientId}`)
            ApiService.getCall('admin', `getReasonTypeList/${clientId}`)
                .then((response: any) => {
                    setReasonType(response.data.list);
                })
        )
    }, 400), [])

    const saveReason = async () => {
        // await addReasonFormik.handleSubmit();
        setIsFormSubmitted(true);

        let data = {
            status: addReasonFormik.values.status,
            reasonName: addReasonFormik.values.reasonName,
            reasonTypeId: addReasonFormik.values.reasonTypeId,
            createdBy: userId,
            clientId: userLocalData.getvalue("clientId")
        }

        if (addReasonFormik.values.status && addReasonFormik.values.reasonName && addReasonFormik.values.reasonTypeId && addReasonFormik.isValid) {
            trackPromise(
                ApiService.postWithData('admin', 'saveReason', data).then(
                    (response: any) => {
                        if (response.data.Success) {
                            showToaster('Reason has been saved successfully.', 'success');
                            addReasonFormik.resetForm();
                            handleClose(true);
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occurred', 'error')
                        }
                    })
            )
        } else {
            showToaster('Please fill all fields.', 'error');
        }
    }


    const updateReason = () => {

        setIsFormSubmitted(true);

        //http://35.155.202.216:8080/QADemoCurately/updateReasons
        if (addReasonFormik.isValid) {
            trackPromise(
                //   ApiService.postWithData(214, 'saveSource', { ...addSourcesFormik.values }).then(
                //      ApiService.postWithData(216, 'QADemoCurately/updateReason', { ...addReasonFormik.values }).then(
                ApiService.postWithData('admin', 'saveReason', { ...addReasonFormik.values }).then(
                    (response: any) => {
                        if (response.data.Success) {
                            showToaster
                                ('Reason has been updated successfully.', 'success');

                            addReasonFormik.resetForm();
                            handleClose(true);
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
            )
        } else {
            showToaster('Please fill all fields.', 'error');
        }
    }



    const handleCloseAddReasonDialog = () => {
        handleClose(false);
        addReasonFormik.resetForm();
    };

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle> {add ? 'Add new' : 'Update'} Reason</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCloseAddReasonDialog}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                <form key={reasonData?.reasonId} onSubmit={addReasonFormik.handleSubmit}>
                    <Stack spacing={2}>
                        <FormControl size="small">
                            <TextField
                                fullWidth
                                size="small"
                                select
                                id="reasonTypeId"
                                name="reasonTypeId"
                                label="Reason Type *"
                                value={addReasonFormik.values.reasonTypeId}
                                onChange={(event) => addReasonFormik.setFieldValue('reasonTypeId', event.target.value)}
                                error={Boolean(addReasonFormik.errors.reasonTypeId && addReasonFormik.touched.reasonTypeId)}
                            >
                                {reasonType?.map((option) => (
                                    <MenuItem value={option.reasonTypeId} key={option.reasonTypeId}>
                                        {option.reasonType}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <ErrorMessage formikObj={addReasonFormik} name={'reasonTypeId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </FormControl>
                        <FormControl size="small">
                            <TextField
                                id="reason"
                                name="reason"
                                label="Reason *"
                                value={addReasonFormik.values.reasonName}
                                onChange={(event) => addReasonFormik.setFieldValue('reasonName', event.target.value)}
                                size="small"
                                type="text"
                                fullWidth
                                error={Boolean(addReasonFormik.errors.reasonName && addReasonFormik.touched.reasonName)}
                            />
                            <ErrorMessage formikObj={addReasonFormik} name={'reasonName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </FormControl>
                        <FormControl size="small">
                            <TextField
                                label="Status *"
                                fullWidth
                                select
                                id="status"
                                name="status"
                                size="small"
                                value={addReasonFormik.values.status || ''}
                                onChange={(event) => addReasonFormik.setFieldValue('status', event.target.value)}
                                error={Boolean(addReasonFormik.errors.status && addReasonFormik.touched.status)}
                                helperText={`${addReasonFormik.errors.status && addReasonFormik.touched.status ? addReasonFormik.errors.status : ''}`}
                            >
                                <MenuItem value="1">Active</MenuItem>
                                <MenuItem value="2">InActive</MenuItem>
                                <MenuItem value="3">Pending</MenuItem>
                            </TextField>
                            <ErrorMessage formikObj={addReasonFormik} name={'status'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        </FormControl>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant='contained' size="small" onClick={() => { saveAuditLog(4262); (add ? saveReason : updateReason)(); }} >{add ? "Save" : "Update"} Reason</Button>
            </DialogActions>
        </Dialog>
    )
};

export default AddNewReason;
