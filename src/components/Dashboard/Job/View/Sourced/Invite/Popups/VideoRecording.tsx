import {Stack} from '../../../../../../../shared/modules/MaterialImports/Stack'
import { Button, IconButton } from '../../../../../../../shared/modules/MaterialImports/Button';
import { Box } from '../../../../../../../shared/modules/MaterialImports/Box';
import { Typography } from '../../../../../../../shared/modules/MaterialImports/Typography';
import { TextField } from '../../../../../../../shared/modules/MaterialImports/FormInputs';
import { Grid } from '../../../../../../../shared/modules/MaterialImports/Grid';
import { useState, useRef, useEffect, Fragment } from '../../../../../../../shared/modules/React'
// import './VideoRecording.scss'
import { Yup, useFormik, FieldArray, Form, Formik } from '../../../../../../../shared/modules/Formik'; 
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ApiService from '../../../../../../../shared/api/api';
// import { trackPromise } from 'react-promise-tracker';

import SaveIcon from '@mui/icons-material/Save';
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../../../shared/services/userData';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar';
import { Edit } from '@mui/icons-material';


const VideoRecording = ({
    stageId, passedStageData, updated, selectedRows, inviteToAssignCB, inviteToLinks
}: {
    stageId: string,
    passedStageData: any, selectedRows: any,
    inviteToLinks: string[]
    updated: { (title: string): void },
    inviteToAssignCB: { (inviteTypeId: number, userId?: string): void },
}) => {
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [isEditClicked, setIsEditClicked] = useState(false);

    useEffect(() => {
        setIsFormSaved(!!passedStageData?.inviteJobVideoRecordingsList?.length ? true : false);
    }, [passedStageData])

    const needToAddOrRemove = useRef({
        addIndex: -1,
        removeIndex: -1,
        removeId: -1
    });
    const [questionsList, setQuestionsList] = useState(
        (!!passedStageData?.inviteJobVideoRecordingsList?.length)
            ?
            passedStageData?.inviteJobVideoRecordingsList
            :
            [
                {
                    question: '',
                    length: 10,
                    questionId: ''
                },
                {
                    question: '',
                    length: 10,
                    questionId: ''
                }
            ]
    )

    const VideoRecordingSchema = Yup.object().shape({
        questions: Yup.array().of(
            Yup.object().shape({
                question: Yup.string().required('Required'),
                length: Yup.number().required('Required').min(10, 'Minimum 10 seconds'),
                questionId: Yup.string()
            })
        )
    })
    const VideoRecordingFormik = useFormik({
        initialValues: {
            questions: (!!passedStageData?.inviteJobVideoRecordingsList?.length) ? passedStageData?.inviteJobVideoRecordingsList : [
                {
                    question: '',
                    length: 10,
                    questionId: ''
                },
                // {
                //     question: '',
                //     length: 10,
                //     questionId: ''
                // }
            ]
        },
        validationSchema: VideoRecordingSchema,
        onSubmit: (values) => {
            // if (values.userName === "admin" && values.password === "12345678") {
            // }
            alert('SUCCESS!! :-)\n\n' + JSON.stringify(values, null, 4));
        },
    })


    const onSubmit = () => {
        let { questions } = VideoRecordingFormik.values;
        let condArray = ["", null, undefined];
        let isQuestionsValid = questions?.every((each: { question: string, length: string }) => !condArray.includes(each.question) && !condArray.includes(each.length))
        let payLoad = {
            "clientId": userLocalData.getvalue('clientId'),
            "recrId": userLocalData.getvalue('recrId'),
            "jobId": parseInt(stageId),
            "questions": questions.map((each: any) => ({
                question: each.question,
                length: each.length
            }))
        }
        if (isQuestionsValid) {
            trackPromise(
                ApiService.postWithData(
                    "admin",
                    "inviteJobVideoRecordings",
                    payLoad
                ).then((res) => {
                    if (res.data.Message === "Success") {
                        showToaster(`${isEditClicked ? "Updated" : "Saved"} Successfully`, "success");
                        updated("3");
                        setIsEditClicked(false)
                    } else showToaster(res.data.Messge, "error");
                })
            )
        } else showToaster("Please fill all the fields", "error");
    }

    const addNewQuestion = async () => {
        let tempQuestions = [
            ...VideoRecordingFormik.values.questions
        ]
        tempQuestions.push({
            question: '',
            length: 10,
            questionId: ''
        });
        needToAddOrRemove.current.addIndex = tempQuestions.length + 1;
        await VideoRecordingFormik.setFieldValue('questions', tempQuestions);
        setQuestionsList(tempQuestions);
    }

    const removeNewQuestion = async (i: number) => {
        let tempQuestions = [
            ...VideoRecordingFormik.values.questions
        ]
        needToAddOrRemove.current.removeIndex = i;
        needToAddOrRemove.current.removeId = tempQuestions[i].questionId;
        if (tempQuestions[i].questionId) {
            // trackPromise(
            //     ApiService.deleteById('233seq', 'DemoAutomation/deleteQuestion', tempQuestions[i].questionId + '/' + userLocalData.getvalue('clientId')).then(async (response: any) => {
            //         // console.log(response);
            //         if (response.data.Success) {
            tempQuestions.splice(i, 1);
            await VideoRecordingFormik.setFieldValue('questions', tempQuestions);
            setQuestionsList(tempQuestions);
            needToAddOrRemove.current.removeIndex = -1;
            needToAddOrRemove.current.removeId = -1;
            //         } else {
            //         }
            //     })
            // );
        } else {
            tempQuestions.splice(i, 1);
            await VideoRecordingFormik.setFieldValue('questions', tempQuestions);
            setQuestionsList(tempQuestions);
        }
    }

    const saveOrUpdateQuestions = async (i: number) => {
        if ((questionsList[i].question !== VideoRecordingFormik.values.questions[i].question) || (questionsList[i].length !== VideoRecordingFormik.values.questions[i].length)) {
            let tempQuestions = [
                ...VideoRecordingFormik.values.questions
            ]
            if (tempQuestions[i].question) {
                let tempData = {
                    questionId: (tempQuestions[i].questionId) ? tempQuestions[i].questionId : '0',
                    stageId: stageId,
                    question: tempQuestions[i].question,
                    length: tempQuestions[i].length,
                    recrId: userLocalData.getvalue('recrId'),
                    clientId: userLocalData.getvalue('clientId')
                }
                // if (!tempQuestions[i].questionId) {
                //     delete tempData.questionId;
                // }
                // trackPromise(
                //     ApiService.postWithData('233seq', 'DemoAutomation/saveorUpdateQuestion', tempData).then(async (response: any) => {
                //         // console.log(response);
                //         if (tempData.questionId === "0") {
                //             // setTimeout(async () => {
                //             let tempQuestions1 = [
                //                 ...VideoRecordingFormik.values.questions
                //             ]
                //             if (needToAddOrRemove.current.addIndex !== -1) {
                //                 if (tempQuestions1.length !== needToAddOrRemove.current.addIndex) {
                //                     tempQuestions1.push({
                //                         question: '',
                //                         length: 10,
                //                         questionId: ''
                //                     });
                //                 }
                //                 needToAddOrRemove.current.addIndex = -1;
                //             }
                //             tempQuestions1[i].questionId = response.data.questionId;
                //             await VideoRecordingFormik.setFieldValue('questions', tempQuestions1);
                //             setQuestionsList(tempQuestions1);
                //             if (needToAddOrRemove.current.removeIndex !== -1) {
                //                 if (needToAddOrRemove.current.removeId === tempQuestions1[needToAddOrRemove.current.removeIndex].questionId) {
                //                     removeNewQuestion(needToAddOrRemove.current.removeIndex);
                //                 }
                //                 needToAddOrRemove.current.removeIndex = -1;
                //                 needToAddOrRemove.current.removeId = -1;
                //             }
                //             // }, 500);
                //         }
                //     })
                // )
            }
        }
    }

    const assignVideoRecording = () => {
        let userIds = Object.keys(selectedRows)
        if (!!userIds?.length && userIds.length > 1) {
            userIds.forEach((userId) => {
                inviteToAssignCB(3, userId);
            })
        } else {
            inviteToAssignCB(3);
            updated("3");
        }
    }

    const handleSaveAndAssign = () => {
        onSubmit();
        assignVideoRecording();
    }

    return (
        <div className='videoRecording'>
            {(isFormSaved && !isEditClicked) ?
                <Box>
                    <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"space-between"}>
                        <Stack spacing={1}>
                            {VideoRecordingFormik.values.questions.map((each: any, index: number) => (
                                <Typography variant='h6' key={index} className='data-collection-form-name'>{each.question}: <Typography variant='caption'>{each.length}</Typography></Typography>
                            ))}
                        </Stack>
                        {!passedStageData?.alreadyAssigned && <IconButton size='small' onClick={() => setIsEditClicked(true)}><Edit fontSize='small' /></IconButton>}
                    </Stack>
                    {Object.keys(selectedRows)?.length === inviteToLinks.length ? <Stack my={2} spacing={2}>
                        {inviteToLinks.map((each, index) => (
                            <Fragment key={index}>
                                <a href={each} target={'__blank'}><Typography color={"blue"}>{each}</Typography></a>
                            </Fragment>
                        ))}
                    </Stack> : null}
                    <Stack alignItems={"flex-end"} mt={2}>
                        {(isFormSaved && selectedRows && !!Object.values(selectedRows)?.length && (!inviteToLinks?.length)) && <Button variant='contained' onClick={assignVideoRecording} disableElevation>Assign</Button>}
                    </Stack>
                </Box>
                :
                <div>
                    < Formik
                        onSubmit={onSubmit}
                        initialValues={VideoRecordingFormik.initialValues}
                    >
                        {
                            ({ errors, values, touched, setFieldValue, handleChange }) => (
                                <Form
                                >
                                    <Grid>
                                        <FieldArray
                                            name="questions"
                                        >
                                            {
                                                ({ push, remove }) => (
                                                    <div>
                                                        <Grid
                                                            container
                                                            direction="row"
                                                            justifyContent="flex-start"
                                                            alignItems="center"
                                                        >
                                                            {
                                                                VideoRecordingFormik.values.questions.map(
                                                                    (item: any, i: number) => {

                                                                        return (
                                                                            <Grid container className='mr-3 mt-3' key={`question${i}`} alignItems={"center"}>

                                                                                <TextField
                                                                                    id={`question${i}`}
                                                                                    type="text"
                                                                                    value={item.question}
                                                                                    onChange={VideoRecordingFormik.handleChange}
                                                                                    onBlur={(e) => saveOrUpdateQuestions(i)}
                                                                                    name={`questions[${i}].question`}
                                                                                    fullWidth
                                                                                    size='small'
                                                                                    label={`Question ${i + 1}`}
                                                                                    sx={{ width: 'calc(100% - 200px)' }}
                                                                                    className='mr-3'
                                                                                />
                                                                                <TextField
                                                                                    id={`length${i}`}
                                                                                    type="number"
                                                                                    value={item.length}
                                                                                    onChange={VideoRecordingFormik.handleChange}
                                                                                    onBlur={(e) => saveOrUpdateQuestions(i)}
                                                                                    name={`questions[${i}].length`}
                                                                                    fullWidth
                                                                                    size='small'
                                                                                    label={`Length (length)`}
                                                                                    sx={{ width: 135 }}
                                                                                    className='mr-3'
                                                                                />
                                                                                <RemoveCircleOutlineIcon
                                                                                    onClick={() => removeNewQuestion(i)}
                                                                                    sx={{ color: 'red' }}
                                                                                    className='cursorPointer'
                                                                                />
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                )
                                                            }
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            direction='row'
                                                            justifyContent='flex-start'
                                                            className='mt-3' gap={1.5} alignItems={"center"}
                                                        >
                                                            <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={addNewQuestion}>
                                                                Add Question
                                                            </Button>
                                                            {!isFormSaved && <Button variant="outlined" startIcon={<SaveIcon />} type="submit" size={'small'} >Save</Button>}
                                                            {(!isFormSaved && selectedRows && !!Object.values(selectedRows)?.length) && <Button variant='outlined' size='small' disableElevation onClick={handleSaveAndAssign}>Save & Assign</Button>}
                                                            {(isEditClicked && <Button variant='outlined' disableElevation type='submit' size={'small'} sx={{ textTransform: "none" }}>Update</Button>)}
                                                        </Grid>
                                                    </div>
                                                )
                                            }
                                        </FieldArray>
                                    </Grid>
                                </Form>
                            )}
                    </Formik >
                </div>
            }
        </div>
    )
}

export default VideoRecording