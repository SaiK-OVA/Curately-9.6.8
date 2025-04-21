import { useEffect, useState } from '../../../../../../shared/modules/React';
import {FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
import {Switch} from '../../../../../../shared/modules/MaterialImports/Switch';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import './Assessment.scss'


// import Button from '@mui/material/Button'
import {Card, CardContent} from '../../../../../../shared/modules/MaterialImports/Card'
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider'

import ApiService from '../../../../../../shared/api/api';
// import { trackPromise } from 'react-promise-tracker'
import { showToaster, Grid } from '../../../../../../shared/modules/commonImports';
import { AssessmentInterface, masterAssessment } from '../../../../../../shared/data/assessments'
import { EmmersionAssessmentInterface, masterEmmersionAssessments } from '../../../../../../shared/data/emmersionAssessments'
import { userLocalData } from '../../../../../../shared/services/userData'

const Assessment = ({ stageId, passedStageData }: { stageId: string, passedStageData: any }) => {

    const [selectedAssessmentsIds, setSelectedAssessmentsIds] = useState(passedStageData);

    const [assessmentsList, setAssessmentsList] = useState(JSON.parse(JSON.stringify(masterAssessment)));
    const [emmersionAssessmentsList, setEmmersionAssessmentsList] = useState(JSON.parse(JSON.stringify(masterEmmersionAssessments)));
    const [initialLoad, setInitialLoad] = useState(false);

    const loadAssessmentData = () => {
        if (selectedAssessmentsIds && selectedAssessmentsIds.length) {
            let tempAssessment = [...assessmentsList];
            for (let st = 0; st < selectedAssessmentsIds.length; st++) {
                let index = tempAssessment.findIndex(x => x.assessmentsId === selectedAssessmentsIds[st]?.assessmentsId);
                if (index !== -1) {
                    tempAssessment[index].isChecked = true;
                }
            }
            setAssessmentsList([...tempAssessment]);

            let tempEmmersionAssessment = [...emmersionAssessmentsList];
            for (let st = 0; st < selectedAssessmentsIds.length; st++) {
                let index = tempEmmersionAssessment.findIndex(x => x.assessmentsId === selectedAssessmentsIds[st]?.assessmentsId);
                if (index !== -1) {
                    tempEmmersionAssessment[index].isChecked = true;
                }
            }
            setEmmersionAssessmentsList([...tempEmmersionAssessment]);
        }
        setInitialLoad(true);
    }

    const onAssessmentCheck = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        let tempAssessment = [...assessmentsList];
        let index = tempAssessment.findIndex(x => x.assessmentsId === id);
        if (index !== -1) {
            tempAssessment[index].isChecked = e.target.checked;
            setAssessmentsList([...tempAssessment]);
            saveAssessment();
        }

        let tempEmmersionAssessment = [...emmersionAssessmentsList];
        let eIndex = tempEmmersionAssessment.findIndex(x => x.assessmentsId === id);
        if (eIndex !== -1) {
            tempEmmersionAssessment[eIndex].isChecked = e.target.checked;
            setEmmersionAssessmentsList([...tempEmmersionAssessment]);
            saveAssessment();
        }
    }

    useEffect(() => {
        loadAssessmentData();
        // ApiService.emmersionApi().then((response: any) => {
        //     console.log(response)
        // })
    }, []);

    const saveAssessment = () => {
        let tempAssessmentIds = assessmentsList.filter((obj: AssessmentInterface) => obj.isChecked).map((i: AssessmentInterface) => i.assessmentsId);
        let tempEmmersionIds = emmersionAssessmentsList.filter((obj: EmmersionAssessmentInterface) => obj.isChecked).map((i: EmmersionAssessmentInterface) => i.assessmentsId);
        let tempIds = tempAssessmentIds.concat(tempEmmersionIds);
        if (tempIds.length) {
            // console.log(tempIds);
            setSelectedAssessmentsIds(tempIds);
            let dataToPass = {
                recrId: userLocalData.getvalue('recrId'),
                satgeId: stageId,
                assessmentsIds: tempIds.join(),
                clientId: userLocalData.getvalue('clientId')
            }
            // trackPromise(
            // );
            ApiService.postWithData('admin', 'saveandupdateStageAssessments', dataToPass).then((response: any) => {
                // console.log(response);
                if (response.data.Success) {
                    // showToaster(`Assessments are saved successfully.`, 'success');
                } else {
                    showToaster(response.data.Message, 'error');
                }
            })
        } else {
            showToaster('Select at least one Assessment to save', 'error');
        }
    }



    return (
        <Card className='assessment'>
            <CardContent>
                {
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
                                                label={<Typography className='badgeFont'>{item.name}</Typography>}
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
                            <Divider className='my-2' />
                            <Typography variant='h6' className='mb-2 mt-4'>Emmersion</Typography>
                            <Card className='assessment'>
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
                                                            label={<Typography className='badgeFont' sx={{ fontSize: 16 }}>{item.name}</Typography>}
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
                            </Card>

                            {/* <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Button onClick={saveAssessment} variant='outlined' size='small'>Save</Button>
                            </Grid> */}
                        </Grid>
                        :
                        null
                }
            </CardContent>
        </Card>
    )
}

export default Assessment