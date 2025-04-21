import { AddOutlined, CloseOutlined, SearchOutlined } from '@mui/icons-material';
import { AxiosResponse } from 'axios';
import ApiService from "../../../../../shared/api/api";
import { Button, IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { Checkbox } from '../../../../../shared/modules/MaterialImports/FormElements';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { List, ListItem, ListItemIcon, ListItemText } from '../../../../../shared/modules/MaterialImports/List';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { TextField } from '../../../../../shared/modules/MaterialImports/TextField';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { React, useEffect, useRef, useState } from '../../../../../shared/modules/React';
import { userLocalData } from '../../../../../shared/services/userData';
import CustomPagination from '../../../../shared/CustomPagination/CustomPagination';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import "./CreateQuestionsModal.scss";
import Parsable from '../../../../../shared/utils/Parsable';

interface ICreateQuestionsModalProps {
    open: boolean;
    jobIds: Array<string>;
    closePopup: () => void;
    loadJobs: () => void;
}

const CreateQuestionsModal: React.FC<ICreateQuestionsModalProps> = ({ open, closePopup, jobIds, loadJobs }) => {
    const [totalCount, setTotalCount] = useState(0);
    const [questionsList, setQuestionsList] = useState<any[]>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 50 });
    const [questionsSearch, setQuestionsSearch] = useState("");
    const [selectedQuestionsList, setSelectedQuestionsList] = useState<any[]>([]);
    const [isApiCalled, setIsApiCalled] = useState(false);
    const accessKey = "voice_AI_questions";
    const isInitialLoad = useRef(true);

    useEffect(() => {
        if (open) {
            if (!isInitialLoad.current) {
                getQuestions()
            } else {
                const LSData = localStorage.getItem(accessKey);
                if (!["", null, undefined].includes(LSData) && Parsable.isJSON(LSData as string)) {
                    const parsedLSData = JSON.parse(LSData as string);
                    setPagination(parsedLSData.pagination);
                    setQuestionsList(parsedLSData.questions);
                    setQuestionsSearch(parsedLSData.searchValue);
                    setSelectedQuestionsList(parsedLSData.selectedQuestions);
                    setTotalCount(parsedLSData.totalCount);
                    setIsApiCalled(true)
                } else getQuestions();
            }
        }
    }, [open]);

    useEffect(() => {
        if (!isInitialLoad.current) {
            getQuestions();
        }
    }, [pagination.pageIndex, questionsSearch])

    const setDataToLS = (questions: any[], selectedQuestions: any[], totalQuestionsCount?: number) => {
        let dataToLs = {
            questions,
            totalCount: totalQuestionsCount ? totalQuestionsCount : totalCount,
            pagination, selectedQuestions,
            searchValue: questionsSearch,
        }
        localStorage.setItem(accessKey, JSON.stringify(dataToLs))
    }

    const getIsChekedStatus = (questionId: string) => {
        if (!!selectedQuestionsList?.length) {
            let selectedQuestionIndex = selectedQuestionsList.findIndex((each) => each?.id === questionId);
            return (selectedQuestionIndex >= 0) ? true : false
        } else return false;
    }

    const getQuestions = () => {
        // https://adminapi.cxninja.com/voice-ai-prod/questions/getQuestions
        trackPromise(
            ApiService.postWithData("voiceai", "questions/getQuestions", {
                "page": pagination.pageIndex + 1,
                "rowsPerPage": pagination.pageSize,
                "search": questionsSearch
            }).then((res: AxiosResponse<any>) => {
                if (res?.data?.Success) {
                    setTotalCount(res?.data?.total || 0);
                    const questions = !!res?.data?.questions?.length ? res?.data?.questions.map((each: any) => ({
                        ...each,
                        isChecked: getIsChekedStatus(each.id)
                    })) : [];
                    setQuestionsList([...questions]);
                    setDataToLS(questions, selectedQuestionsList, res?.data?.total || 0);
                }
                setIsApiCalled(true);
                isInitialLoad.current = false;
            }).catch(error => {
                setIsApiCalled(true);
                isInitialLoad.current = false;
                showToaster(error.message ? error.message : "Something went wrong", 'error');
            })
        )
    }

    const handleListItemClick = (listData: any, listIndex: number) => {
        const { isChecked, ...rest } = listData;
        let tempQuestionsList = questionsList;
        let tempSelectedQuestionsList = selectedQuestionsList;

        if (selectedQuestionsList.length < 25 || isChecked) {
            tempQuestionsList = tempQuestionsList.map((each, index) => ({
                ...each, isChecked: index === listIndex ? !each.isChecked : each.isChecked
            }))

            const existsQuestionIndex = tempSelectedQuestionsList.findIndex((each) => each.id === rest.id);
            if (existsQuestionIndex >= 0) tempSelectedQuestionsList.splice(existsQuestionIndex, 1);
            else tempSelectedQuestionsList.push({ ...rest });

            setSelectedQuestionsList([...tempSelectedQuestionsList]);
            setQuestionsList([...tempQuestionsList]);
            setDataToLS(tempQuestionsList, tempSelectedQuestionsList);
        }
        else showToaster("Max Limit 25 reached", "error");
    }


    const handleSelectedQuestionAction = (type: "REQUIRED" | "DELETE" | "CHANGE", questionIndex: number, value?: string) => {
        let tempSelectedQuestionList = selectedQuestionsList;
        let tempQuestionsList = questionsList;
        switch (type) {
            case "REQUIRED":
                tempSelectedQuestionList = tempSelectedQuestionList.map((each, index) => ({
                    ...each, isImportant: index === questionIndex ? !Boolean(each.isImportant) : Boolean(each.isImportant)
                }));
                setSelectedQuestionsList([...tempSelectedQuestionList]);
                setDataToLS(questionsList, tempSelectedQuestionList);
                break;
            case "DELETE":
                let questionId = selectedQuestionsList[questionIndex].id;
                tempQuestionsList = tempQuestionsList.map((each) => ({
                    ...each, isChecked: each.id === questionId ? false : each.isChecked
                }))
                tempSelectedQuestionList.splice(questionIndex, 1);

                setSelectedQuestionsList([...tempSelectedQuestionList]);
                setQuestionsList([...tempQuestionsList]);
                setDataToLS(tempQuestionsList, tempSelectedQuestionList);
                break;
            case "CHANGE":
                tempSelectedQuestionList[questionIndex].question = value;
                setSelectedQuestionsList([...tempSelectedQuestionList]);
                setDataToLS(questionsList, tempSelectedQuestionList);
                break;
            default: break;
        }
    }

    const handleAddQuestion = () => {
        let tempSelectedQuestionsList = selectedQuestionsList;
        tempSelectedQuestionsList.push({ id: "", isImportant: false, question: "" });
        setSelectedQuestionsList([...tempSelectedQuestionsList]);
        setDataToLS(questionsList, tempSelectedQuestionsList);
    }

    const handleSave = () => {
        const isSelectedQuestionsValid = selectedQuestionsList.every((each) => ![null, undefined, ""].includes(each.question));
        if (!!selectedQuestionsList?.length && isSelectedQuestionsValid) {
            let data = {
                "clientId": userLocalData.getvalue("clientId"),
                "recrId": userLocalData.getvalue("recrId"),
                "jobIds": jobIds,
                "questions": selectedQuestionsList.map((each) => ({
                    ...each,
                    isImportant: Boolean(each.isImportant)
                }))
            }

            ApiService.postWithData('voiceai', `jobs/submitJob`, data).then((response) => {
                if (response.data?.length) {
                    let calculatedData = response.data;
                    let errorResponse = ""; let successResponse = "";
                    for (let si = 0; si < calculatedData.length; si++) {
                        if (calculatedData[si]?.error) {
                            errorResponse += calculatedData[si].failureJobId + " - " + calculatedData[si].errorResponse + "\n";
                        } else {
                            successResponse += calculatedData[si]?.title + " - User Voice AI Created Successfully.\n";
                        }
                    }
                    (errorResponse) ? showToaster(errorResponse, 'error') : null;
                    if (successResponse) {
                        loadJobs();
                        showToaster(successResponse, 'success')
                    }
                }
            }).catch(error => {
                showToaster(error.message ? error.message : "Unable to Publish Job to Voice AI", 'error');
            });

        } else {
            showToaster("Please enter question", "error")
        }
    }

    return (

        <Dialog open={(isApiCalled && open)} maxWidth="lg" fullWidth onClose={closePopup} id="createQuestionsModal">
            <DialogTitle className="py-1">
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant='caption' className="addHeader"> Add Voice AI Questions</Typography>
                    <IconButton size='small' onClick={() => closePopup()} color="inherit">
                        <CloseOutlined />
                    </IconButton>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className="py-4">
                <Grid container size={12} m={0} p={0} >
                    <Grid size={6} className="questions-grid">
                        <TextField
                            size='small'
                            placeholder='Search Questions here...'
                            value={questionsSearch}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                isInitialLoad.current = false;
                                setPagination({ ...pagination, pageIndex: 0 });
                                setQuestionsSearch(e.target.value);
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: <SearchOutlined fontSize='small' sx={{ mr: 1 }} color='action' />,
                                    endAdornment: <IconButton
                                        size='small'
                                        disabled={["", null, undefined].includes(questionsSearch)}
                                        onClick={() => {
                                            isInitialLoad.current = false;
                                            setPagination({ ...pagination, pageIndex: 0 })
                                            setQuestionsSearch("");
                                        }}>
                                        <CloseOutlined fontSize='small' /></IconButton>
                                }
                            }}
                            sx={{ display: "flex", flexDirection: "row", justifySelf: "flex-end" }}
                        />
                        <List disablePadding >
                            {!!questionsList?.length ? questionsList.map((each: any, index: number) => (
                                <ListItem key={index} onClick={() => { handleListItemClick(each, index) }}>
                                    <ListItemIcon className='checkboxWidth'>
                                        <Checkbox size='small' checked={each.isChecked} value={each.isChecked} />
                                    </ListItemIcon>
                                    <ListItemText primary={each.question} />
                                </ListItem>

                            )) : <ListItem className='no-records-text'>
                                <ListItemText secondary={"No Records found"} />
                            </ListItem>}
                        </List>
                        <Stack direction={"row"} justifyContent={"end"} alignItems={"center"} className='pagination-container'>
                            <CustomPagination
                                page={pagination.pageIndex}
                                rowsPerPage={pagination.pageSize}
                                rowCount={totalCount}
                                onChangePage={(page) => {
                                    isInitialLoad.current = false;
                                    setPagination({ ...pagination, pageIndex: page })
                                }}
                            />
                        </Stack>

                    </Grid>
                    <Divider orientation="vertical" flexItem sx={{ height: 'auto', pr: 1 }} />
                    <Grid size={5.8} >
                        <Grid
                            container
                            size={12}
                            maxWidth={"100%"}
                            columnSpacing={1}
                            sx={{ mb: '4px', ml: 2 }}
                            alignItems={"center"}
                        >
                            <Grid size={0.6}>
                                <Typography variant='caption' className="addHeader1"></Typography>
                            </Grid>

                            <Grid size={9}>
                                <Typography variant='caption' className="addHeader1">Question</Typography>
                            </Grid>
                            <Grid size={2.4} >
                                <Typography variant='caption' className="addHeader1">Is Important</Typography>
                            </Grid>
                            {/* <Grid size={1}>
                                {/ * <Typography variant='caption' className="addHeader1">Delete</Typography> * /}
                            </Grid> */}
                        </Grid>
                        <Stack className="selected-questions-grid">

                            {!!selectedQuestionsList?.length ? selectedQuestionsList?.map((each, index) => (
                                <React.Fragment key={index}>
                                    <Grid
                                        container
                                        size={12}
                                        maxWidth={"100%"}
                                        rowSpacing={1.5} columnSpacing={2}
                                        style={{ marginBottom: '4px' }}
                                        alignItems={"center"}
                                        className="selected_question_border"
                                    >
                                        <Grid size={0.6}>{index + 1}</Grid>

                                        <Grid size={9.4}>
                                            {!["", null, undefined].includes(each?.id) ? <Typography>{each.question}</Typography> :
                                                <TextField
                                                    name={`Question${index}`}
                                                    value={each.question}
                                                    size='small'
                                                    placeholder='Enter Question'
                                                    fullWidth multiline
                                                    rows={2}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSelectedQuestionAction("CHANGE", index, e.target.value)}
                                                />}
                                        </Grid>
                                        <Grid size={2}>

                                            <Stack direction={"row"} alignItems={"center"} spacing={0} justifyContent={'flex-end'}>
                                                <Checkbox checked={each.isImportant} size='small' onClick={() => handleSelectedQuestionAction("REQUIRED", index)} />
                                                <IconButton size='small' onClick={() => handleSelectedQuestionAction("DELETE", index)}><CloseOutlined fontSize='small' /></IconButton>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>

                            )) :

                                <Grid size={12}>
                                    <Typography color="textDisabled" textAlign={"center"} mt={2}>No Questions Selected</Typography>
                                </Grid>}

                        </Stack>
                    </Grid>
                </Grid>

            </DialogContent>
            <Divider />
            <DialogActions>
                <Stack direction={"row"} alignItems={"center"} spacing={2} className="actions-container">
                    <Button startIcon={<AddOutlined />} variant='contained' disabled={selectedQuestionsList.length >= 25} onClick={handleAddQuestion}>Add Question</Button>
                    <Button variant='contained' onClick={handleSave}>Save</Button>
                    <Button variant='contained' color="inherit" onClick={closePopup}>Cancel</Button>
                </Stack>

            </DialogActions>

        </Dialog>
    )
}

export default CreateQuestionsModal;
