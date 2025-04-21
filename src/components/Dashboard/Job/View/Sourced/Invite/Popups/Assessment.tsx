import {FormControlLabel} from '../../../../../../../shared/modules/MaterialImports/FormInputs'
import {Switch} from '../../../../../../../shared/modules/MaterialImports/Switch'
import {Grid} from '../../../../../../../shared/modules/MaterialImports/Grid'
import {Typography} from '../../../../../../../shared/modules/MaterialImports/Typography'
// import './Assessment.scss';

import { Fragment, useEffect, useState } from '../../../../../../../shared/modules/React';
import {Divider} from '../../../../../../../shared/modules/MaterialImports/Divider'
import { AssessmentInterface } from '../../../../../../../shared/data/assessments'
import { masterEmmersionAssessments } from '../../../../../../../shared/data/emmersionAssessments'
import { userLocalData } from '../../../../../../../shared/services/userData'
import ApiService from '../../../../../../../shared/api/api';
import { showToaster } from '../../../../../../shared/SnackBar/SnackBar'
import { trackPromise } from '../../../../../../../shared/modules/PromiseTrackter';
import {Stack} from '../../../../../../../shared/modules/MaterialImports/Stack';
import { Button, IconButton } from '../../../../../../../shared/modules/MaterialImports/Button';
import { Box } from '../../../../../../../shared/modules/MaterialImports/Box';

import { Edit } from '@mui/icons-material';



const Assessment = ({
    stageId, updated, passedStageData, selectedRows, inviteToAssignCB, inviteToLinks
}: {
    stageId: string,
    passedStageData: any, selectedRows: any,
    inviteToLinks: string[],
    inviteToAssignCB: { (inviteTypeId: number, userId?: string): void },
    updated: { (title: string): void },
}) => {


    const [selectedAssessmentsIds, setSelectedAssessmentsIds] = useState(passedStageData);

    const [assessmentsList, setAssessmentsList] = useState<any[]>([]);
    // const [assessmentsList, setAssessmentsList] = useState(JSON.parse(JSON.stringify(masterAssessment)));
    const [emmersionAssessmentsList, setEmmersionAssessmentsList] = useState(JSON.parse(JSON.stringify(masterEmmersionAssessments)));
    const [initialLoad, setInitialLoad] = useState(false);
    const [isFormSaved, setIsFormSaved] = useState(false);
    const [isEditClicked, setIsEditClicked] = useState(false);

    const loadAssessmentData = () => {
        trackPromise(
            ApiService.getCall(
                "admin",
                "getAssessmentsList"
            ).then((res) => {
                if (res.data?.Success) {
                    let tempAssessmentsList = [];
                    if (!!passedStageData?.inviteAssessmentsList?.length) {
                        tempAssessmentsList = !!res.data?.assessmentsList?.length ? res.data.assessmentsList.map((item: any) => {
                            let isChecked = passedStageData?.inviteAssessmentsList.some((each: any) => each.assessmentsId === item.assessmentsId);
                            return {
                                ...item,
                                isChecked
                            }
                        }) : [];
                    } else {
                        tempAssessmentsList = !!res.data?.assessmentsList?.length ? res.data.assessmentsList.map((item: any) => ({
                            ...item, isChecked: false
                        })) : [];
                    }
                    setAssessmentsList(tempAssessmentsList);
                    setInitialLoad(true);
                }
            })
        )
    }


    const onAssessmentCheck = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        let tempAssessment = [...assessmentsList];
        let index = tempAssessment.findIndex(x => x.assessmentsId === id);
        if (index !== -1) {
            tempAssessment[index].isChecked = e.target.checked;
            setAssessmentsList([...tempAssessment]);
            // saveAssessment();
        }

        // let tempEmmersionAssessment = [...emmersionAssessmentsList];
        // let eIndex = tempEmmersionAssessment.findIndex(x => x.assessmentsId === id);
        // if (eIndex !== -1) {
        //     tempEmmersionAssessment[eIndex].isChecked = e.target.checked;
        //     setEmmersionAssessmentsList([...tempEmmersionAssessment]);
        //     saveAssessment();
        // }
    }

    useEffect(() => {
        loadAssessmentData();
        setIsFormSaved(!!passedStageData?.inviteAssessmentsList?.length ? true : false);
        // ApiService.emmersionApi().then((response: any) => {
        //     console.log(response)
        // })
    }, [passedStageData]);

    const saveAssessment = () => {
        let tempAssessmentIds = assessmentsList.filter((obj: AssessmentInterface) => obj.isChecked).map((i: AssessmentInterface) => ({ "assessmentsId": i.assessmentsId }));
        // let tempEmmersionIds = emmersionAssessmentsList.filter((obj: EmmersionAssessmentInterface) => obj.isChecked).map((i: EmmersionAssessmentInterface) => i.assessmentsId);
        // let tempIds = tempAssessmentIds.concat(tempEmmersionIds);

        if (tempAssessmentIds.length) {
            setSelectedAssessmentsIds(tempAssessmentIds);
            let dataToPass = {
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId'),
                jobId: stageId,
                assessmentsLanguages: tempAssessmentIds,
            }
            trackPromise(
                ApiService.postWithData(
                    "admin",
                    'inviteAssessments',
                    dataToPass
                ).then((response: any) => {
                    if (response.data.Message === "Success") {
                        showToaster(`${isEditClicked ? "Updated" : "Saved"}  successfully.`, 'success');
                        setIsEditClicked(false);
                        updated("4");
                    } else {
                        showToaster(response.data.Message, 'error');
                    }
                })
            );
        } else {
            showToaster('Select at least one Assessment to save', 'error');
        }
    }

    const assignAssessment = () => {
        let userIds = Object.keys(selectedRows)
        if (!!userIds?.length && userIds.length > 1) {
            userIds.forEach((userId) => {
                inviteToAssignCB(4, userId);
            })
        } else {
            inviteToAssignCB(4);
            updated("4");
        }
    }

    const handleSaveAndAssign = () => {
        saveAssessment();
        assignAssessment();
    }



    return (
        <Box className='assessment'>
            {(isFormSaved && !isEditClicked) ?
                <Box>
                    <Stack direction={"row"} alignItems={"flex-start"} justifyContent={"space-between"}>
                        <Stack spacing={1}>
                            {assessmentsList.map((each: any, index: number) => (
                                <Typography variant='h6' key={index} className='data-collection-form-name'>{each.name}: <Typography variant='caption'>{each.isChecked ? "Yes" : "No"}</Typography></Typography>
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
                        {(isFormSaved && selectedRows && !!Object.values(selectedRows)?.length && (!inviteToLinks?.length)) && <Button variant='contained' onClick={assignAssessment} disableElevation>Assign</Button>}
                    </Stack>
                </Box> :
                (initialLoad) ?
                    <Grid>
                        {
                            assessmentsList.map((item: AssessmentInterface, i: number) => {
                                return (
                                    <Grid key={item.assessmentCode}>
                                        <FormControlLabel
                                            control={
                                                <Switch name='isEnable'
                                                    checked={item.isChecked}
                                                    onChange={
                                                        (e) => {
                                                            onAssessmentCheck(item.assessmentsId, e)
                                                        }
                                                    }
                                                />
                                            }
                                            label={<Typography variant='h6'>{item.name}</Typography>}
                                            labelPlacement='start'
                                            className='ml-0 switchSpaceBetween'
                                        />
                                        {
                                            ((assessmentsList.length - 1) !== i) ?
                                                <Divider className='my-2' />
                                                :
                                                <span className='mb-3'></span>
                                        }
                                    </Grid>
                                )
                            })
                        }
                        {/* <Divider className='my-2' />
                            <Typography variant='h6' className='mb-2 mt-4'>Emmersion</Typography> */}
                        {/* <Card className='assessment'>
                                <CardContent>
                                    <Grid>
                                        {
                                            emmersionAssessmentsList.map((item: AssessmentInterface, i: number) => {
                                                return (
                                                    <Grid key={item.assessmentCode}>
                                                        <FormControlLabel
                                                            control={
                                                                <Switch name='isEnable'
                                                                    checked={item.isChecked}
                                                                    onChange={
                                                                        (e) => {
                                                                            onAssessmentCheck(item.assessmentsId, e)
                                                                        }
                                                                    }
                                                                />
                                                            }
                                                            label={<Typography variant='h6' sx={{ fontSize: 16 }}>{item.name}</Typography>}
                                                            labelPlacement='start'
                                                            className='ml-0 switchSpaceBetween'
                                                        />
                                                        {
                                                            ((emmersionAssessmentsList.length - 1) !== i) ?
                                                                <Divider className='my-2' />
                                                                :
                                                                <span className='mb-3'></span>
                                                        }
                                                    </Grid>
                                                )
                                            })
                                        }
                                    </Grid>
                                </CardContent>
                            </Card> */}

                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center" mt={2} gap={1}
                        >
                            {!isFormSaved && <Button onClick={saveAssessment} sx={{ textTransform: "none" }} variant='outlined' size='small'>Save</Button>}
                            {(!isFormSaved && selectedRows && !!Object.values(selectedRows)?.length) && <Button variant='outlined' size='small' disableElevation sx={{ textTransform: "none" }} onClick={handleSaveAndAssign}>Save & Assign</Button>}
                            {(isEditClicked && <Button variant='outlined' size='small' disableElevation onClick={saveAssessment} sx={{ textTransform: "none" }}>Update</Button>)}
                        </Grid>
                    </Grid>
                    :
                    null
            }
        </Box>
    )
}

export default Assessment