import { useFormik, Yup } from '../../../../../../shared/modules/Formik'; //
// import { useEffect } from 'react';


import {Card, CardContent} from '../../../../../../shared/modules/MaterialImports/Card';
import {Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';
import {FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
// import MenuItem from '@mui/material/MenuItem';
// import TextField from '@mui/material/TextField';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
// import Button from '@mui/material/Button';


// import userData from '../../../../shared/data/userData';
// import { StageInterface } from '../../Add/AddWorkflow';
// import { trackPromise } from 'react-promise-tracker';
import { showToaster, Grid } from '../../../../../../shared/modules/commonImports';

import ApiService from '../../../../../../shared/api/api';

import './DataCollection.scss';
// import { useState, useEffect } from 'react';
import { userLocalData } from '../../../../../../shared/services/userData';
import { MUIAutoComplete } from '../../../../../shared/MUIAutoComplete/MUIAutoComplete';
import ErrorMessage from '../../../../../shared/Error/ErrorMessage';


const DataCollection = ({
    updated, stageId, passedStageData
}: {
    updated: any, stageId: string, passedStageData: any
}
) => {

    if (!passedStageData) {
        passedStageData = {
            formId: "",
            formName: "",
            isNotify: "",
            recruiterId: "",
            isComplete: "",
            show_questions: "",
            ruleId: "",
            recruiterName: ""
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
            isNotify: (passedStageData.isNotify) ? passedStageData.isNotify : false,
            recruiterId: (passedStageData.recruiterId) ? passedStageData.recruiterId : "",
            isComplete: true,
            // isComplete: (passedStageData.isComplete) ? passedStageData.isComplete : false,
            // show_questions: true,
            show_questions: ((passedStageData.show_questions === true) || (passedStageData.show_questions === false)) ? passedStageData.show_questions : true,
        },
        // enableReinitialize: true,
        validationSchema: dataSchema,
        onSubmit: (values) => {
            // console.log(values);
            saveDataForm();
        },
    });
    const saveDataForm = (formId?: string, recrId?: string) => {
        let tempData = {
            stageId: stageId,
            recrId: userLocalData.getvalue('recrId'),
            // formId: formId ? formId : dataFormik.values.formId,
            formId: formId ? formId : "",
            isNotify: dataFormik.values.isNotify,
            recruiterId: recrId ? recrId : dataFormik.values.recruiterId,
            isComplete: dataFormik.values.isComplete,
            show_questions: dataFormik.values.show_questions,
            clientId: userLocalData.getvalue('clientId')
        }
        // trackPromise(
        ApiService.postWithParams(193, 'Curately/Workflow/workflow_dataCollection_save.jsp', tempData).then((response: any) => {
            // console.log(response);
            if (response.data.message === "Success") {
                // showToaster(`Data Form has been ${(passedStageData.ruleId) ? "updated" : "saved"}.`, 'success');
                // updated('');
            } else {
                showToaster(response.data.Error, 'error');
            }
        })
        // );
    }

    // const [formsList, setFormsList] = useState<any>([]);

    // useEffect(() => {

    // trackPromise(
    //     // ApiService.getByParams(193, 'Curately/Workflow/workflow_typeform_list.jsp', { clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
    //     //     setFormsList(response.data);
    //     // })
    //         ApiService.postWithData('233seq', 'DemoSequence/formBuilder', { action: "list", clientId: userLocalData.getvalue('clientId'), userid: "" })
    //             .then((response: any) => {
    //                 let builderList = [];
    //                 for (let gl = 0; gl < response.data.list.length; gl++) {
    //                     const element = response.data.list[gl];
    //                     builderList.push(element);

    //                 }
    //                 setFormsList(builderList);
    //             })
    //             .catch((error) => {
    //                 console.error("Error:", error);
    //                 // alert('Error occurred.', 'error');
    //             })
    // );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    // useEffect(() => {
    //     dataFormik.setFieldValue('formId', '');
    //     dataFormik.setFieldValue('formName', '');
    // }, []);

    return (
        <>
            <Card className='mt-5 dataCollection'>
                <CardContent>
                    <form
                        onSubmit={dataFormik.handleSubmit}
                    // onChange={
                    //     (e: any) => {
                    //         // console.log(e);
                    //         if (e.target.id !== "recruiterIdAutoComplete") {
                    //             dataFormik.handleSubmit(e)
                    //         }
                    //     }}
                    >

                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="stretch"
                        >
                            <Typography variant='h6' className='mb-3'>Data Form Collection</Typography>

                            <MUIAutoComplete className='mb-3'
                                id='dataCollectionName'
                                handleChange={(id: any, name: string) => {
                                    dataFormik.setFieldValue('formId', id);
                                    dataFormik.setFieldValue('formName', name);
                                    // dataFormik.handleChange(e)
                                    saveDataForm(id);
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

                            <Grid className='mt-2'
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
                                            saveDataForm("", id);
                                        }}
                                        valuePassed={(passedStageData.recruiterName) ? { label: passedStageData.recruiterName, id: passedStageData.recruiterId } : {}}
                                        isMultiple={false}
                                        placeholder="Select Recruiter"
                                        width="254px"
                                        type='id'
                                        className='custom-margin'
                                    />
                                    <ErrorMessage formikObj={dataFormik} name={'recruiterId'}></ErrorMessage>
                                </Grid>
                                <input type='hidden' name="fromName" value={dataFormik.values.recruiterId} />
                            </Grid>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name='isComplete'
                                        checked={dataFormik.values.isComplete}
                                        onChange={dataFormik.handleChange}
                                        disabled
                                    />
                                }
                                label="Move the candidate to next stage when they complete filling the form"
                            />

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
                    </form>


                </CardContent>
            </Card>
        </>
    )
}
export default DataCollection;