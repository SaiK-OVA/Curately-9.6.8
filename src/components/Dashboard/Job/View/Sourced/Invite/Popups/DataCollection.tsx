import { Yup, useFormik } from '../../../../../../../shared/modules/Formik'; //



// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
import { Checkbox } from '../../../../../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel } from '../../../../../../../shared/modules/MaterialImports/FormInputs';
import { Grid } from '../../../../../../../shared/modules/MaterialImports/Grid';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
import { Typography } from '../../../../../../../shared/modules/MaterialImports/Typography';
// import Button from '@mui/material/Button';


// import userData from '../../../../shared/data/userData';
// import { StageInterface } from '../../Add/AddWorkflow';
// import { trackPromise } from 'react-promise-tracker';


import ApiService from '../../../../../../../shared/api/api';

// import './DataCollection.scss';
import { userLocalData } from '../../../../../../../shared/services/userData';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import { MUIAutoComplete } from '../../../../../../shared/MUIAutoComplete/MUIAutoComplete';
// import ErrorMessage from '../../../../../../shared/Error/ErrorMessage';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import { Stack } from '../../../../../../../shared/modules/MaterialImports/Stack';
import { Button, IconButton } from '../../../../../../../shared/modules/MaterialImports/Button';
import { Box } from '../../../../../../../shared/modules/MaterialImports/Box';
import { Fragment, useEffect, useState } from '../../../../../../../shared/modules/React';
import { Edit } from '@mui/icons-material';

const DataCollection = ({
    stageId, updated, passedStageData, selectedRows, inviteToAssignCB, inviteToLinks
}: {
    stageId: string,
    passedStageData: any, selectedRows: any,
    inviteToLinks: string[],
    inviteToAssignCB: { (inviteTypeId: number, userId?: string): void },
    updated: { (title: string): void },
}) => {
    passedStageData = passedStageData?.screening
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [isEditClicked, setIsEditClicked] = useState(false);
    useEffect(() => {
        setIsFormSaved(passedStageData?.formId ? true : false);
    }, [passedStageData]);
    if (!passedStageData) {
        passedStageData = {
            formId: "",
            formName: "",
            recruiterId: "",
            recruiterName: "",
            isComplete: "",
            ruleId: "",
            oneByOne: true,
            notifyRecruiter: false,
        }
    }
    const dataSchema = Yup.object().shape({
        formId: Yup.string(),
        formName: Yup.string(),
        isNotify: Yup.bool(),
        recruiterId: Yup.string()
            .when('isNotify', {
                is: true,
                then: (f:any) => f.required('Recruiter is required.')
            }),
        isComplete: Yup.bool(),
        show_questions: Yup.bool()

    });
    const dataFormik = useFormik({
        initialValues: {
            formId: (passedStageData.formId) ? passedStageData.formId : "",
            formName: (passedStageData.formName) ? passedStageData.formName : "",
            isNotify: (passedStageData.notifyRecruiter) ? passedStageData.notifyRecruiter : false,
            recruiterId: (passedStageData.recruiterId) ? passedStageData.recruiterId : "",
            isComplete: true,
            // isComplete: (passedStageData.isComplete) ? passedStageData.isComplete : false,
            // show_questions: true,
            // show_questions: ((passedStageData.oneByOne === true) || (passedStageData.oneByOne === false)) ? Boolean(passedStageData.oneByOne) : true,
            show_questions: ["1", "0"].includes(passedStageData.oneByOne) ? Boolean(parseInt(passedStageData.oneByOne)) : true
        },
        // enableReinitialize: true,
        validationSchema: dataSchema,
        onSubmit: (values) => {
            // console.log(values);
            saveDataForm();
        },
    });

    const saveDataForm = () => {
        const screeningParams = {
            clientId: userLocalData.getvalue("clientId"),
            jobId: stageId,
            recrId: dataFormik.values.recruiterId ? dataFormik.values.recruiterId : userLocalData.getvalue("recrId"),
            formName: dataFormik.values.formName,
            formId: dataFormik.values.formId,
            oneByOne: dataFormik.values.show_questions ? 1 : 0,
            notifyRecruiter: dataFormik.values.isNotify,
        }
        let isParamsValid = Object.values(screeningParams).every((item) => !["", null, undefined].includes(item));
        if (isParamsValid) {
            trackPromise(
                ApiService.getByParams(193, "Curately/Invite/invite_job_screening_save.jsp", { ...screeningParams }).then((res) => {
                    if (res.data.Message === "Success") {
                        showToaster(`${isEditClicked ? "Updated" : "Saved"} Successfully`, "success")
                        setIsEditClicked(false);
                        updated("1");
                    } else showToaster(res.data.Message, "error")
                })
            )
        } else showToaster("Please fill the required fields", "error");
    }

    const assignDataCollection = () => {
        let userIds = Object.keys(selectedRows)
        if (!!userIds?.length && userIds.length > 1) {
            userIds.forEach((userId) => {
                inviteToAssignCB(1, userId);
            })
        } else {
            inviteToAssignCB(1);
            updated("1");
        }
    }

    const handleSaveAndAssign = () => {
        saveDataForm();
        assignDataCollection();
    }

    return (
        <>
            <Box className='dataCollection'>
                {(isFormSaved && !isEditClicked) ?
                    <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"space-between"}>
                        <Stack>
                            <Typography variant='h6' className='data-collection-form-name'>Selected Form Name: <Typography variant='caption'>{passedStageData.formName}</Typography></Typography>
                            <Typography variant='h6' className='data-collection-form-name'>Notify Recruiter Name: <Typography variant='caption'>{passedStageData.recruiterName}</Typography></Typography>
                            <Typography variant='h6' className='data-collection-form-name'>Show one question at a time: <Typography variant='caption'>{dataFormik.values.show_questions ? "Yes" : "No"}</Typography></Typography>
                        </Stack>
                        {!passedStageData?.alreadyAssigned && <IconButton className="ml-3" size='small' onClick={() => setIsEditClicked(true)}><Edit fontSize='small' /></IconButton>}
                    </Stack> :

                    <form
                        onSubmit={dataFormik.handleSubmit}
                        onChange={
                            (e: any) => {
                                // console.log(e);
                                if (e.target.id !== "recruiterIdAutoComplete") {
                                    // dataFormik.handleSubmit(e)
                                }
                            }}
                    >

                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            {/* <Typography variant='h6' className='mb-3'>Data Form Collection</Typography> */}


                            <MUIAutoComplete
                                id='dataCollectionName'
                                handleChange={(id: any, name: string) => {
                                    dataFormik.setFieldValue('formId', id);
                                    dataFormik.setFieldValue('formName', name);
                                    // dataFormik.handleChange(e)
                                }}
                                valuePassed={
                                    (dataFormik.values.formId) ? { label: dataFormik.values.formName, id: dataFormik.values.formId } :
                                        {}
                                }
                                isMultiple={false}
                                textToShow=""
                                // width="250px"
                                type='DataCollection'
                                placeholder=""
                            />

                            {/* <TextField
                                size='small'
                                id='formId'
                                select
                                onChange={
                                    (e) => {
                                        dataFormik.handleChange(e)
                                        saveDataForm(e.target.value);
                                    }
                                }
                                value={dataFormik.values.formId}
                                name={`formId`}
                                className='mb-2'
                                label='Data Form'
                                sx={{ width: 525 }}
                            >
                                <MenuItem value=""></MenuItem>
                                {formsList.map(
                                    (stage: any, i: number) => {
                                        return <MenuItem value={stage.form_id} key={stage.form_id}>{(stage.form_name && stage.form_name.trim()) ? stage.form_name : ""}</MenuItem>
                                    }
                                )}

                            </TextField> */}

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                sx={{ minHeight: 56.13 }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name='isNotify'
                                            checked={dataFormik.values.isNotify}
                                            onChange={dataFormik.handleChange}
                                        />
                                    }
                                    label="Notify recruiter when form filled"
                                />

                                <Grid
                                    className={`${(dataFormik.values.isNotify) ? '' : 'd-none'}`}
                                >
                                    <MUIAutoComplete
                                        id='recruiterId'
                                        handleChange={(id: any, name: string) => {
                                            dataFormik.setFieldValue('recruiterId', id);
                                        }}
                                        valuePassed={(passedStageData.recruiterName) ? { label: passedStageData.recruiterName, id: passedStageData.recruiterId } : {}}
                                        isMultiple={false}
                                        placeholder="Select Recruiter"
                                        width="254px"
                                        type='id'
                                        className='custom-margin'
                                    />
                                    {/* <ErrorMessage formikObj={dataFormik} name={'recruiterId'}></ErrorMessage> */}
                                </Grid>
                                <input type='hidden' name="fromName" value={dataFormik.values.recruiterId} />
                            </Grid>

                            {/* <FormControlLabel
                                control={
                                    <Checkbox
                                        name='isComplete'
                                        checked={dataFormik.values.isComplete}
                                        onChange={dataFormik.handleChange}
                                        disabled
                                    />
                                }
                                label="Move the candidate to next stage when they complete filling the form"
                            /> */}

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name='show_questions'
                                        checked={dataFormik.values.show_questions}
                                        onChange={dataFormik.handleChange}
                                    />
                                }
                                label="Show one question at a time"
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                        >
                            {/* <Button color="primary" variant='contained' type="submit" className='mt-3 mr-2' size="small">
                                Save
                            </Button> */}
                            {/* {(passedStageData.ruleId) ? "Update" : "Save"} */}
                        </Grid>
                    </form>}
                {Object.keys(selectedRows)?.length === inviteToLinks.length ? <Stack my={2} spacing={2}>
                    {inviteToLinks.map((each, index) => (
                        <Fragment key={index}>
                            <a href={each} target={'__blank'}><Typography color={"blue"}>{each}</Typography></a>
                        </Fragment>
                    ))}
                </Stack> : null}

                <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={1} my={1} mr={1}>
                    {!isFormSaved && <Button variant='contained' disableElevation onClick={saveDataForm}>Save</Button>}
                    {(isFormSaved && selectedRows && !!Object.values(selectedRows)?.length && (!inviteToLinks?.length)) && <Button variant='contained' onClick={assignDataCollection} disableElevation>Assign</Button>}
                    {(!isFormSaved && selectedRows && !!Object.values(selectedRows)?.length) && <Button variant='contained' disableElevation onClick={handleSaveAndAssign}>Save & Assign</Button>}
                    {(isEditClicked && <Button variant='contained' disableElevation onClick={saveDataForm}>Update</Button>)}
                </Stack>
            </Box>
        </>
    )
}
export default DataCollection;