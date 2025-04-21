import { React, useState } from '../../../../shared/modules/React'
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog'
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button'
import { TextField } from '../../../../shared/modules/MaterialImports/FormInputs'
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import './AddOptionBank.scss'
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api'
import { userLocalData } from '../../../../shared/services/userData';

// interface OptionBankType {
//     optionBankId: string;
//     optionBankName: string;
//     options: string[];
//     createdby?: string | null;
//     status: boolean;
// }


interface AddOptionBankDialogProps {
    open: boolean;
    handleClose: (addorUpdate: boolean) => void;
    optionData: any;
    add: boolean;

}

const AddOptionBank: React.FC<AddOptionBankDialogProps> = ({ open, handleClose, add, optionData }) => {

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const initialAddOptionDetails = optionData ? {
        optionBankName: optionData.optionBankName || '',
        list: optionData?.options || "",
        optionBankId: optionData?.optionBankId || '',
        createdby: optionData?.createdby || '',
        clientId: userLocalData.getvalue('clientId'),
    } : {
        optionBankName: '',
        list: "",
        createdby: userLocalData.getvalue('recrId'),
        optionBankId: '',
        clientId: userLocalData.getvalue('clientId'),
    }

    const addOptionSchema = Yup.object().shape({
        optionBankName: Yup.string().required('Option name is required'),
        list: Yup.string().required('Option list is required'),
        optionBankId: Yup.string(),
        createdby: Yup.string(),
        clientId: Yup.string(),
    });


    const addOptionBankFormik = useFormik({
        initialValues: initialAddOptionDetails,
        validationSchema: addOptionSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
        },
        validateOnMount: true
    });


    // const handleCloseAddOptionBankDialog = () => {
    //     handleClose(false);
    //     addOptionBankFormik.resetForm();
    // };


    const saveOptions = () => {

        if (addOptionBankFormik.values.optionBankName.trim() === "") {
            showToaster("Please Enter Option Bank Name", "error");
            return false;
        } else if (addOptionBankFormik.values.list.trim() === "") {
            showToaster("Please enter Option List", "error");
            return false;
        }

        setIsFormSubmitted(true);

        if (addOptionBankFormik.isValid) {

            trackPromise(
                // ApiService.postWithData(216, 'QADemoCurately/saveOptionBank', { ...addOptionBankFormik.values})

                ApiService.postWithData('admin', 'saveOptionBank', { ...addOptionBankFormik.values })
                    .then((response: any) => {

                        if (response.data.Success) {
                            showToaster(response.data.Message, 'success');
                            addOptionBankFormik.resetForm();

                            handleClose(true);
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occured while saving the Option Bank.", 'error');
                        }
                    })
            );
        } else {
            showToaster('Please fill all required fields.', 'error')
        }

    }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <Dialog open={open} onClose={() => handleClose(false)} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle> {add ? "Add" : "Update"} Option</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={() => handleClose(false)}
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

                <form key={optionData?.optionBankId} >
                    <Stack spacing={2}>
                        <TextField

                            autoFocus
                            // margin="dense"    
                            id="OptionBankName"
                            label="Option Name"
                            size='small'
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={addOptionBankFormik.values.optionBankName}
                            onChange={(event) => {
                                addOptionBankFormik.setFieldValue("optionBankName", event.target.value)
                            }}

                        />
                        <TextField
                            id="options"
                            label="Options (Write each option in separate line)"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={addOptionBankFormik.values.list}
                            onChange={(event) => {

                                const options = event.target.value.split(',');
                                addOptionBankFormik.setFieldValue('list', options.toString());
                            }}
                        />
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined"
                    type='button'
                    color="secondary"
                    className='mr-2'
                    onClick={() => handleClose(false)}
                >Cancel</Button>
                <Button variant="contained"
                    type='button'
                    color="primary"
                    onClick={() => { saveAuditLog(4269); saveOptions() }}
                >{add ? "Save" : "Update"} Option</Button>

            </DialogActions>
        </Dialog>
    );
};

export default AddOptionBank;
