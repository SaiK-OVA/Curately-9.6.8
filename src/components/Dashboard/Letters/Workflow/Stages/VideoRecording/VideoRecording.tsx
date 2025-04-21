import { Grid, Button, TextField } from '../../../../../../shared/modules/commonImports';
import { Card, CardContent } from '../../../../../../shared/modules/MaterialImports/Card';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { useState, useRef } from 'react'
import './VideoRecording.scss'
import { FieldArray, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ApiService from '../../../../../../shared/api/api';
// import { trackPromise } from 'react-promise-tracker';

// import SaveIcon from '@mui/icons-material/Save';
import { trackPromise } from 'react-promise-tracker';
import { userLocalData } from '../../../../../../shared/services/userData';

const VideoRecording = ({ stageId, passedStageData }: { stageId: string, passedStageData: any }) => {


    const needToAddOrRemove = useRef({
        addIndex: -1,
        removeIndex: -1,
        removeId: -1
    });
    const [questionsList, setQuestionsList] = useState(
        (passedStageData)
            ?
            passedStageData
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
            questions: (passedStageData) ? passedStageData : [
                // {
                //     question: '',
                //     length: 10,
                //     questionId: ''
                // },
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
        console.dir(VideoRecordingFormik.values);
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
            trackPromise(
                ApiService.deleteById('admin', 'deleteQuestion', tempQuestions[i].questionId + '/' + userLocalData.getvalue('clientId')).then(async (response: any) => {
                    // console.log(response);
                    if (response.data.Success) {
                        tempQuestions.splice(i, 1);
                        await VideoRecordingFormik.setFieldValue('questions', tempQuestions);
                        setQuestionsList(tempQuestions);
                        needToAddOrRemove.current.removeIndex = -1;
                        needToAddOrRemove.current.removeId = -1;
                    } else {
                    }
                })
            );
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
                trackPromise(
                    ApiService.postWithData('admin', 'saveorUpdateQuestion', tempData).then(async (response: any) => {
                        // console.log(response);
                        if (tempData.questionId === "0") {
                            // setTimeout(async () => {
                            let tempQuestions1 = [
                                ...VideoRecordingFormik.values.questions
                            ]
                            if (needToAddOrRemove.current.addIndex !== -1) {
                                if (tempQuestions1.length !== needToAddOrRemove.current.addIndex) {
                                    tempQuestions1.push({
                                        question: '',
                                        length: 10,
                                        questionId: ''
                                    });
                                }
                                needToAddOrRemove.current.addIndex = -1;
                            }
                            tempQuestions1[i].questionId = response.data.questionId;
                            await VideoRecordingFormik.setFieldValue('questions', tempQuestions1);
                            setQuestionsList(tempQuestions1);
                            if (needToAddOrRemove.current.removeIndex !== -1) {
                                if (needToAddOrRemove.current.removeId === tempQuestions1[needToAddOrRemove.current.removeIndex].questionId) {
                                    removeNewQuestion(needToAddOrRemove.current.removeIndex);
                                }
                                needToAddOrRemove.current.removeIndex = -1;
                                needToAddOrRemove.current.removeId = -1;
                            }
                            // }, 500);
                        }
                    })
                )

            }
        }
    }

    return (
        <div className='videoRecording'>
            <Card>
                <CardContent>
                    <Typography variant='h6'>Video Recording Questions</Typography>
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
                                                                                <Grid container className='mr-3 mt-3' key={`question${i}`}>

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
                                                                className='mt-3'
                                                            >
                                                                <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={addNewQuestion}>
                                                                    Add Question
                                                                </Button>
                                                                {/* <Button variant="outlined" startIcon={<SaveIcon />} type="submit" size={'small'} >
                                                                    Save
                                                                </Button> */}
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
                </CardContent>
            </Card>
        </div>
    )
}

export default VideoRecording