import { React, useCallback, useEffect, useState } from '../../../../shared/modules/React';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import { Button, IconButton, TextField, InputLabel, FormControl } from '../../../../shared/modules/commonImports';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu'
import { Select } from '../../../../shared/modules/MaterialImports/FormElements';
// import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import './AddSources.scss'
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../shared/services/userData';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import { debounce } from 'lodash';

// interface SourcesType {
//     sourcetypeid?: string;
//     sourceName?: string;
//     description?: string;
//     status?: boolean;
//     sourceTypeId?: string | null;
//     createdOn?: string | null;
//     clientId?: string | null;
// }

interface AddSourcesDialogProps {
    open: boolean;
    handleClose: (addorUpdate: boolean) => void;
    sourceData: any;
    add: boolean;

}

const AddSources: React.FC<AddSourcesDialogProps> = ({ open, handleClose, add, sourceData }) => {

    let clientId = userLocalData.getvalue('clientId');

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [sourceType, setSourceType] = useState<any[] | never[]>([]);


    const initialAddSourceDetails = sourceData ? {
        sourceId: sourceData ? sourceData.sourceId : '',
        sourceName: sourceData ? sourceData.sourceName : '',
        description: sourceData ? sourceData.description : '',
        sourceTypeId: sourceData ? sourceData.sourceTypeId.toString() : '',
        clientId: userLocalData.getvalue('clientId'),
    } : {
        sourceName: '',
        description: "",
        sourceTypeId: "",
        sourceId: '',
        clientId: userLocalData.getvalue('clientId'),
    }

    const addSourceSchema = Yup.object().shape({
        sourceName: Yup.string().matches(/^[a-zA-Z0-9-_@() ]+$/, 'Source name can only contain letters, numbers, and spaces').required('Source name is required'),
        description: Yup.string(),
        sourceTypeId: Yup.string().required('Source Type is required'),
        sourceId: Yup.string(),
        clientId: Yup.string(),
    });


    const addSourcesFormik = useFormik({
        initialValues: initialAddSourceDetails,
        validationSchema: addSourceSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
        },
        validateOnMount: true
    });

    const saveSource = () => {


        if (addSourcesFormik.values.sourceName.trim() === "") {
            showToaster("Please Enter Source name", "error");
            return false;
        } else if (addSourcesFormik.values.sourceTypeId.trim() === "") {
            showToaster("Please select 'Source Type", "error");
            return false;
        }

        setIsFormSubmitted(true);


        //http://35.155.202.216:8080/QADemoCurately/saveSource http://35.155.202.216:8080/QADemoCurately/saveSource
        if (addSourcesFormik.isValid) {
            trackPromise(
                //     ApiService.postWithData(216, 'QADemoCurately/saveSource', { ...addSourcesFormik.values }).then(
                ApiService.postWithData('admin', 'saveSource', { ...addSourcesFormik.values }).then(
                    (response: any) => {

                        if (response.data.Success) {
                            showToaster
                                ('Source has been saved successfully.', 'success');

                            addSourcesFormik.resetForm();
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


    const updateSource = () => {


        if (addSourcesFormik.values.sourceName.trim() === "") {
            showToaster("Please Enter Source name", "error");
            return false;
        } else if (addSourcesFormik.values.sourceTypeId === "") {
            showToaster("Please select 'Source Type", "error");
            return false;
        }

        setIsFormSubmitted(true);

        //http://35.155.202.216:8080/QADemoCurately/updateSource
        if (addSourcesFormik.isValid) {
            trackPromise(
                //   ApiService.postWithData(214, 'saveSource', { ...addSourcesFormik.values }).then(
                //  ApiService.postWithData(216, 'QADemoCurately/updateSource', { ...addSourcesFormik.values }).then(
                ApiService.postWithData('admin', 'updateSource', { ...addSourcesFormik.values }).then(
                    (response: any) => {
                        if (response?.data?.Success) {
                            showToaster
                                ('Source has been updated successfully.', 'success');

                            addSourcesFormik.resetForm();
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


    // const handleNewSourcesTypeChange = (event: SelectChangeEvent) => {
    //     const { name, value } = event.target;
    //     addSourcesFormik.setFieldValue(name, value);
    // };

    const handleCloseAddSourcesDialog = () => {
        handleClose(false);
        addSourcesFormik.resetForm();
    };

    const loadSourceType = useCallback(debounce(() => {
        trackPromise(

            //  ApiService.getByParams(193, 'Curately/userAIMatch.jsp', { userId: candidateId }).then(
            ApiService.getCall('admin', `getSourceTypeList/${clientId}`)
                .then((response: any) => {
                    setSourceType(response.data.list);
                }
                )
        )
    }, 600), []);

    useEffect(() => {
        loadSourceType();
    }, []);

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth={true}>
            <DialogTitle>{add ? "Add New" : "Update"} Sources</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCloseAddSourcesDialog}
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

                <form onSubmit={addSourcesFormik.handleSubmit} >
                    <Stack spacing={1} className='mt-1'>
                        <TextField
                            autoFocus
                            id="sourceName"
                            name="sourceName"
                            label="Source Name"
                            size='small'
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={addSourcesFormik.values.sourceName}
                            onChange={addSourcesFormik.handleChange}
                        // onChange={(event) => {
                        //     addSourcesFormik.setFieldValue('sourceName', event.target.value);
                        // }}
                        //   error={addSourcesFormik.touched.sourceName && Boolean(addSourcesFormik.errors.sourceName)}
                        //   helperText={addSourcesFormik.touched.sourceName && addSourcesFormik.errors.sourceName}

                        />

                        <ErrorMessage formikObj={addSourcesFormik} name={'sourceName'} isFormSubmitted={isFormSubmitted}></ErrorMessage>

                        {/* {addSourcesFormik.values.sourceTypeId ? addSourcesFormik.values.sourceTypeId : ''} */}
                        <FormControl size="small">
                            <InputLabel id="type-label">Type </InputLabel>
                            <Select
                                labelId="type-label"
                                id="type-select"
                                name="sourceTypeId"
                                label="sourceTypeId"
                                value={addSourcesFormik.values.sourceTypeId ? addSourcesFormik.values.sourceTypeId : ''}
                                onChange={addSourcesFormik.handleChange}
                            >
                                {sourceType && sourceType.map((item: any, index: any) => {

                                    return (<MenuItem key={index} value={`${item.sourceTypeId}`}>{item.sourceType}</MenuItem>)

                                })

                                }
                            </Select>
                        </FormControl>
                        <ErrorMessage formikObj={addSourcesFormik} name={'sourceTypeId'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                        <TextField
                            id="options"
                            label="Description"
                            placeholder='Brief Description'
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            value={addSourcesFormik.values.description}
                            //    onChange={addSourcesFormik.handleChange}
                            onChange={(event) => {
                                const description = event.target.value; //.split('\n');
                                addSourcesFormik.setFieldValue('description', description);
                            }}
                        //   error={addSourcesFormik.touched.description && Boolean(addSourcesFormik.errors.description)}
                        //    helperText={addSourcesFormik.touched.description && addSourcesFormik.errors.description}
                        />
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined"
                    type='button'
                    size="small"
                    color="secondary"
                    className='mr-2'
                    onClick={handleCloseAddSourcesDialog}
                >Cancel</Button>

                <Button color="primary" variant='contained' size="small" onClick={() => { (sourceData && sourceData.sourceId ? updateSource : saveSource)(); saveAuditLog(4235) }} >{add ? "Add" : "Update"} Sources</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddSources;
