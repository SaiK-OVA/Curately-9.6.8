
import DownloadIcon from '@mui/icons-material/Download';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebhookIcon from '@mui/icons-material/Webhook';
import SmsIcon from '@mui/icons-material/Sms';
// import SaveIcon from '@mui/icons-material/Save';

import {FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
import {Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';
import  {React, useEffect, useState } from '../../../../../../shared/modules/React';
import {Card, CardContent} from '../../../../../../shared/modules/MaterialImports/Card';
// Button
import { Grid, showToaster } from '../../../../../../shared/modules/commonImports';
import {FormGroup} from '../../../../../../shared/modules/MaterialImports/FormGroup';

import ApiService from '../../../../../../shared/api/api';

import './Trigger.scss';
// import { trackPromise } from 'react-promise-tracker';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import { userLocalData } from '../../../../../../shared/services/userData';
// import { useDebounce } from '../../../../shared/modules/debounce';
// import AddMessageBox from '../../PopUps/AddMessageBox/AddMessageBox';


const Trigger = (
    { stageId, passedStageData }: { stageId: string, passedStageData: any }
) => {


    const [initialLoad, setInitialLoad] = useState(false);
    // const [selectedTriggerIds, setSelectedTriggerIds] = useState<number[]>([]);

    const [triggerOptions, setTriggerOptions] = useState([
        { id: 1, isChecked: true, label: 'Applicant' },
        { id: 8, isChecked: false, label: 'Facebook Lead' },
        { id: 9, isChecked: false, label: 'Linkedin Lead' },
        { id: 10, isChecked: false, label: 'Webhook' },
        { id: 11, isChecked: false, label: 'Text to apply' }
    ]);

    const getTriggerIcon = (id: number) => {
        switch (id) {
            case 1:
                return <DownloadIcon className='triggerIcon' />
            case 8:
                return <FacebookIcon className='triggerIcon' />
            case 9:
                return <LinkedInIcon className='triggerIcon' />
            case 10:
                return <WebhookIcon className='triggerIcon' />
            case 11:
                return <SmsIcon className='triggerIcon' />

            default:
                return <></>;
        }
    }
    const onTriggerCheck = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        let tempTrigger = [...triggerOptions];
        let index = tempTrigger.findIndex(x => x.id === id);
        if (index !== -1) {
            tempTrigger[index].isChecked = e.target.checked;
            setTriggerOptions([...tempTrigger]);
            // useDebounce(saveTrigger, 400);
            saveTrigger();
        }
    }
    const saveTrigger = (): void => {
        let triggerIds: number[] = [];
        for (let to = 0; to < triggerOptions.length; to++) {
            if (triggerOptions[to].isChecked) {
                triggerIds.push(triggerOptions[to].id);
            }

        }
        // if (triggerIds.length) {
        let data = {
            stageId: stageId,
            triggerIds: triggerIds.join(),
            clientId: userLocalData.getvalue('clientId')
        }
        // trackPromise(
        ApiService.postWithParams(193, 'Curately/Workflow/workflow_trigger_save.jsp', data).then((response: any) => {

            // console.log(response);
            if (response.data.message === "Success") {
                // setSelectedTriggerIds(triggerIds);
                // showToaster('Triggers have been Saved.', 'success');
            } else {
                showToaster(response.data.Error, 'error');
            }
        })
        // );
        // } else {
        //     showToaster('Please Select at least One trigger', 'error');
        // }
    }
    // disabled all options
    // const loadTriggerData = () => {
    //     if (passedStageData.stage_trigger && passedStageData.stage_trigger.length) {
    //         let tempTrigger = [...triggerOptions];
    //         let tempStageIds = [];
    //         for (let st = 0; st < passedStageData.stage_trigger.length; st++) {
    //             let index = tempTrigger.findIndex(x => x.id === Number(passedStageData.stage_trigger[st].triggerId));
    //             if (index !== -1) {
    //                 tempTrigger[index].isChecked = true;
    //                 tempStageIds.push(tempTrigger[index].id);
    //             }
    //         }
    //         setTriggerOptions([...tempTrigger]);
    //     }
    //     setInitialLoad(true);
    // }
    useEffect(() => {
        setInitialLoad(true);
        // disabled all options
        // if (stageId) {
        //     loadTriggerData()
        // }
    }, []);


    return (
        <div className="trigger">
            {
                (initialLoad) ?
                    <div className="mt-5">
                        <Card className="pt-3">
                            <CardContent><Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant="h6" gutterBottom>
                                    Trigger
                                </Typography>
                                {/* <Button variant="outlined" startIcon={<SaveIcon />} onClick={saveTrigger} size='small' >
                                    {(selectedTriggerIds.length) ? 'Update' : 'Save'}
                                </Button> */}
                            </Grid>
                                <Typography variant='body1' >
                                    Trigger is an event that starts workflow
                                </Typography>
                                <FormGroup>
                                    <Grid container spacing={2} className='mt-1 ml-2'>
                                        {
                                            triggerOptions.map((item) => {
                                                return <Grid key={item.id}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                value={item.id}
                                                                checked={item.isChecked}
                                                                onChange={(e) => onTriggerCheck(item.id, e)}
                                                                size='small'
                                                                className='checkbox'
                                                                disabled={item.id !== 1}
                                                            />}
                                                        label={
                                                            <Grid
                                                                container
                                                                direction="row"
                                                                justifyContent="flex-start"
                                                                alignItems="center"
                                                                className='checkIconText'
                                                            >
                                                                {getTriggerIcon(item.id)}
                                                                <span className='pl-1'>{item.label}</span>
                                                            </Grid>
                                                        }
                                                        className={`pr-3 checkLabel ${(item.isChecked) ? 'checked' : ''} `}
                                                    />
                                                </Grid>
                                            })
                                        }
                                    </Grid>
                                </FormGroup>
                            </CardContent>
                        </Card>
                    </div>
                    : null
            }
        </div>
    )
}

export default Trigger