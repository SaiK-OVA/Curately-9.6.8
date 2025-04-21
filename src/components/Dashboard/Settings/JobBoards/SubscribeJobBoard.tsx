import { useEffect, useState } from '../../../../shared/modules/React';
import { Grid, Button, TextField } from "../../../../shared/modules/commonImports";
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
//import FormControl from "@mui/material/FormControl";
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../shared/api/api';
//import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
//import Editor from '../../../shared/EmailDialogBox/EmailBody';
//import ErrorMessage from '../../../shared/Error/ErrorMessage';

import { Dialog, DialogContent, DialogTitle } from '../../../../shared/modules/MaterialImports/Dialog';
import './SubscribeJobBoard.scss';
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
//import { trackPromise } from "react-promise-tracker";



const SubscribeJobBoard = (
    { open, closePopup, subscribeJobBoardData, add, subscribeJobBoardGetData }: {
        open: boolean;
        closePopup: (refetch?: boolean) => void;
        subscribeJobBoardData: any;
        add: boolean;
        subscribeJobBoardGetData: any
    }
) => {

    const getFieldValue = (fieldData: any) => {
        if (!!subscribeJobBoardGetData[0]?.field?.length) {
            const fieldValue = subscribeJobBoardGetData[0]?.field?.find((item: any) => item?.name === fieldData?.name);
            return ![null, undefined, ""].includes(fieldValue.value) ? fieldValue.value : "";
        } else return "";
    }

    useEffect(() => {
        SubscribeJobBoardFormik.setFieldValue(`portalId`, subscribeJobBoardData[0]?.portalId, true);
        let tempApplicantsList = [];
        tempApplicantsList = subscribeJobBoardData[0]?.field?.map((each: any) => {
            return {
                ...each,
                name: each.name,
                required: each.name === "PostDuration" ? "yes" : each.required,
                value: getFieldValue(each)
            };
        })
        SubscribeJobBoardFormik.setFieldValue(`field`, tempApplicantsList, true);
    }, [subscribeJobBoardData, subscribeJobBoardGetData]);



    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const initialSubscribeJobBoardDetails = {
        "portalId": "",
        "field": [{
            "name": "",
            "value": "",
            "required": "",
        }]
    }
    const SubscribeJobBoardSchema = Yup.object().shape({
        portalId: Yup.string(),
        field: Yup.array().of(
            Yup.object().shape({
                name: Yup.string(),
                value: Yup.string(),
                required: Yup.string(),
            })
        )
    });

    const saveForm = () => {
        setIsFormSubmitted(true);
        //  console.log(SubscribeJobBoardFormik.values);
        (SubscribeJobBoardFormik.values.portalId === "") && showToaster('Please fill all mandatory fields.', 'error')

        SubscribeJobBoardFormik.values.field && SubscribeJobBoardFormik.values.field.length > 0 && SubscribeJobBoardFormik.values.field.map((setting: any, si: number) => (
            (setting.value === "" && setting.required === "yes") && showToaster('Please fill all mandatory fields.', 'error')
        ))
        const isMandatoryFieldsValid = SubscribeJobBoardFormik.values.field.every((each) => {
            if (each?.required === "yes") {
                return [null, undefined, ""].includes(each.value) ? false : true;
            } else return true
        })

        if (isMandatoryFieldsValid) {
            const payLoad = {
                "portalId": SubscribeJobBoardFormik.values.portalId,
                "field": SubscribeJobBoardFormik.values.field.filter(
                    (each) => !["", undefined, null].includes(each.value)).map(
                        ({ name, value, required }: any) => ({ name, value, required }))
            }
            trackPromise(
                ApiService.postWithData('admin', 'activateJobBoard', { ...payLoad }).then(
                    (response: any) => {
                        // console.log(response.data);
                        if (response.data.Success) {
                            showToaster('JobBoard has been Subscribe successfully.', 'success');
                            closePopup(true);
                            SubscribeJobBoardFormik.resetForm();
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
            )
        } else {
            showToaster('Please fill all mandatory fields.', 'error');
        }
    }

    const updateForm = () => {
        setIsFormSubmitted(true);
        //  console.log(SubscribeJobBoardFormik.values);
        (SubscribeJobBoardFormik.values.portalId === "") && showToaster('Please fill all mandatory fields.', 'error')

        SubscribeJobBoardFormik.values.field && SubscribeJobBoardFormik.values.field.length > 0 && SubscribeJobBoardFormik.values.field.map((setting: any, si: number) => (
            (setting.value === "" && setting.required === "yes") && showToaster('Please fill all mandatory fields.', 'error')
        ))

        const isMandatoryFieldsValid = SubscribeJobBoardFormik.values.field.every((each) => {
            if (each?.required === "yes") {
                return [null, undefined, ""].includes(each.value) ? false : true;
            } else return true
        })

        if (isMandatoryFieldsValid) {
            const payLoad = {
                "portalId": SubscribeJobBoardFormik.values.portalId,
                "field": SubscribeJobBoardFormik.values.field.filter(
                    (each) => !["", undefined, null].includes(each.value)).map(
                        ({ name, value, required }: any) => ({ name, value, required }))
            }
            trackPromise(
                ApiService.postWithData('admin', 'editSubscribedJobBoard', { ...payLoad }).then(
                    (response: any) => {
                        // console.log(response.data);
                        if (response.data.Success) {
                            showToaster('JobBoard has been Subscribe successfully.', 'success');
                            closePopup(true);
                            SubscribeJobBoardFormik.resetForm();
                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
            )
        } else {
            showToaster('Please fill all fields.', 'error');
        }
    }


    const SubscribeJobBoardFormik = useFormik({
        initialValues: initialSubscribeJobBoardDetails,
        validationSchema: SubscribeJobBoardSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
            //  console.log(SubscribeJobBoardFormik.values);
        },
        validateOnMount: true
    });


    const renderFilter = (filter: any, index: number) => {
        switch (filter.element) {

            case 'select':
                return (
                    <>
                        <TextField
                            value={filter.value}
                            //   value={SubscribeJobBoardFormik.values.field[index].value}
                            onChange={(event) => handleTextChange(filter.name, event.target.value, filter.required)}
                            select
                            name={filter.name}
                            fullWidth
                            size="small"

                            label={
                                <>
                                    {filter.title}
                                    {filter.required === "yes" ? <span style={{ color: 'red' }}>*</span> : null}
                                </>
                            }
                            // required={filter.required === "yes" ? true : false}
                            type={filter.element}
                        >
                            {filter?.values?.value?.map((sector: any, index: number) => (
                                <MenuItem key={index} value={sector.value}>{sector.name}</MenuItem>
                            ))}
                        </TextField>
                    </>
                );
            case 'text':
                return (
                    <>

                        <TextField
                            value={filter.value}
                            //value={(SubscribeJobBoardFormik.values.field[index].value)? SubscribeJobBoardFormik.values.field[index].value : filter.value}
                            fullWidth
                            name={filter.name}
                            onChange={(event) => handleTextChange(filter.name, event.target.value, filter.required)}
                            label={
                                <>
                                    {filter.title}
                                    {filter.required === "yes" ? <span style={{ color: 'red' }}>*</span> : null}
                                </>
                            }
                            // required={filter.required === "yes" ? true : false}
                            type={filter.element}
                            size="small"
                        />
                    </>

                );

            case 'hidden':
                return (
                    <>
                        <TextField
                            value={filter.value}
                            // value={SubscribeJobBoardFormik.values.field[index].value}
                            fullWidth
                            name={filter.name}
                            onChange={(event) => handleTextChange(filter.name, event.target.value, filter.required)}
                            label={
                                <>
                                    {filter.title}
                                    {filter.required === "yes" ? <span style={{ color: 'red' }}>*</span> : null}
                                </>
                            }
                            // value={SubscribeJobBoardFormik.values.field[index].value}
                            type={filter.element}
                            size="small"
                        />
                    </>

                );

            default:
                return null;
        }
    };

    const handleSettingJobBoard = (boardId: any) => {

        //http://35.155.202.216:8095/idibu/getBoardFieldsForUpdate

        trackPromise(
            //  ApiService.postWithData('admin', 'getBoardFieldsForUpdate', { "boardId": boardId }).then((response) => {
            ApiService.postWithData('admin', 'getBoardFieldsForUpdate', { "boardId": boardId }).then((response) => {

                console.log("response.data");

                console.log(response.data);
                if (response.data.Status === 200) {

                    //SubscribeJobBoardFormik.values.field.name
                    for (let iam = 0; iam < response.data.idibu.response?.fields?.field?.length; iam++) {

                        const tempIdx = SubscribeJobBoardFormik.values?.field.findIndex((item: { name: any }) => item.name == response.data.idibu.response.fields.field[iam].name);
                        console.log(tempIdx);
                        console.log(response.data.idibu.response.fields.field[iam].value);
                        // response.data.idibu.response.fields.field[iam].name = false;
                        // SubscribeJobBoardFormik.values.field[tempIdx].value = response.data.idibu.response.fields.field[iam].value;
                        SubscribeJobBoardFormik.setFieldValue(`field[${tempIdx}].value`, response.data.idibu.response.fields.field[iam].value, true);

                    }

                    //  console.log(response.data.idibu.response.fields.field);
                    //   let tempFiledsList = [
                    //       {
                    //           portalId: (boardId) ? boardId : "",
                    //           portalName: (boardName) ? boardName : "",
                    //           field: response.data?.idibu?.response?.fields?.field
                    //       }
                    //   ];
                    // console.log(tempFiledsList);

                } else {
                    showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                }
            })
        )
    }
    const handleTextChange = (fieldName: string, newValue: string, required: string) => {
        const tempIndex = SubscribeJobBoardFormik.values.field.findIndex((item: { name: string }) => item.name === fieldName);
        if (tempIndex !== -1) {
            let tempFieldsData = SubscribeJobBoardFormik.values.field
            tempFieldsData[tempIndex].value = newValue;
            SubscribeJobBoardFormik.setFieldValue(`field`, [...tempFieldsData])
        } else {
            SubscribeJobBoardFormik.setFieldValue(`field`, [...SubscribeJobBoardFormik.values.field, {
                name: fieldName, value: newValue, required: required, element: "text", maxchars: "", order: 0, title: fieldName, type: "general"
            }]);
        }
    }

    useEffect(() => {
        return () => {
            SubscribeJobBoardFormik.resetForm({ ...initialSubscribeJobBoardDetails as any })
        }
    }, [])

    return (
        <>
            <Dialog
                maxWidth={'md'} fullWidth={true}
                // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
                onClose={() => closePopup()}
                open={open} className='SubscribeJobBoardModal customInputs' id='SubscribeJobBoard'>

                <DialogTitle
                    className='py-2'
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span className='addHeader'>
                            Subscribe Job Board - {subscribeJobBoardData[0]?.portalName}
                        </span>
                        <div>
                            <Grid
                                container
                                direction="row"
                                justifyContent="end"
                                alignItems="center"
                            >
                                {/* <CloseIcon /> onClick={() => closePopup()}  */}
                                <Button variant="outlined"
                                    type='button'
                                    color="secondary"
                                    className='mr-2'
                                    onClick={() => closePopup()}
                                >Cancel</Button>
                                <Button variant="contained"
                                    type='button'
                                    color="primary"
                                    onClick={add ? updateForm : saveForm}
                                >Subscribe</Button>
                            </Grid>
                        </div>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent className='px-0'>
                    <form
                        onSubmit={SubscribeJobBoardFormik.handleSubmit}
                    >
                        <div className='SubscribeJobBoards-wrap'>
                            <div className='form-block ml-4'>

                                <div className='block-inner  ml-4' >

                                    {subscribeJobBoardData && subscribeJobBoardData.length > 0 ?
                                        <Grid container direction="row"
                                            justifyContent="flex-start"
                                            alignItems="flex-start"
                                            sx={{ width: "100%" }}
                                            spacing={2}
                                        >
                                            {/* {
                                                (subscribeJobBoardData.length === 1) && <Grid size={6} key={subscribeJobBoardData[0]?.field.id} className=" ml-2 mt-3" >
                                                    {renderFilter(subscribeJobBoardData[0]?.field, 0)}
                                                </Grid>
                                            } */}

                                            {!!SubscribeJobBoardFormik.values?.field?.length && SubscribeJobBoardFormik.values?.field?.map((setting: any, si: number) => (
                                                <Grid size={6} key={si} className=" ml-2 mt-3" >
                                                    {renderFilter(setting, si)}
                                                </Grid>
                                            ))
                                            }

                                        </Grid>
                                        :
                                        null
                                    }

                                </div>
                            </div>

                        </div>

                    </form >
                </DialogContent >

            </Dialog>
        </>
    )
}
export default SubscribeJobBoard
