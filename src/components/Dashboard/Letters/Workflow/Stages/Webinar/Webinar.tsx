import { useState, useEffect,useRef } from '../../../../../../shared/modules/React';
import {Card, CardContent} from '../../../../../../shared/modules/MaterialImports/Card';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import {Grid, Button, showToaster, TextField } from '../../../../../../shared/modules/commonImports';
import ApiService from '../../../../../../shared/api/api';
import Autocomplete from '@mui/material/Autocomplete';
import { DateTime } from '../../../../../../shared/modules/Luxon';
import {Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';
import {FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
// import { DateTime } from 'luxon';
import { userLocalData } from '../../../../../../shared/services/userData';
import { StageInterface } from '../../Add/AddWorkflow';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';


import './Webinar.scss';



export interface WebinarInterface {
    start_time: string;
    join_url: string;
    topic: string;
    web_id: string;
}



const Webinar = (
    {
        updated, stageId, passedStageData, stagesList
    }: {
        updated: any, stageId: string, passedStageData: any, stagesList: StageInterface[]
    }
) => {

    // console.log(passedStageData);

    const saveDataForm = () => {
        // console.log(selectedWebinarsObj);
        // if (selectedWebinarsObj.length) {


        let tempData = {
            stageId: stageId,
            recrId: userLocalData.getvalue('recrId'),
            webinarIds: selectedWebinarsObj.map(function (a: WebinarInterface) { return a.web_id }).join("::"),
            topics: selectedWebinarsObj.map(function (a: WebinarInterface) { return a.topic }).join("::"),
            join_url: selectedWebinarsObj.map(function (a: WebinarInterface) { return a.join_url }).join("::"),
            start_time: selectedWebinarsObj.map(function (a: WebinarInterface) { return a.start_time }).join("::"),
            autoMoveToNextStage: autoMoveToNextStage,
            clientId: userLocalData.getvalue('clientId')
        }

        trackPromise(
            ApiService.getByParams(193, 'Curately/Workflow/workflow_webinar_save.jsp', tempData).then((response: any) => {
                // console.log(response);
                if (response.data.message === "Success") {
                    showToaster(`Webinar has been ${(passedStageData?.webinarList?.length) ? "updated" : "saved"}.`, 'success');
                    updated('');
                } else {
                    showToaster(response.data.Error, 'error');
                }
            })
        );
        // } else {
        //     showToaster('Select at least one Webinar', 'info');
        // }
    }

    const [nextStageList, setNextStageList] = useState<StageInterface[]>([]);
    const [ifWebinar, setIfWebinar] = useState("");
    const [elseWebinar, setElseWebinar] = useState("");
    const [open, setOpen] = useState(false);
    const [autoMoveToNextStage, setAutoMoveToNextStage] = useState((passedStageData?.autoMove === "0") ? false : true);
    const [webinarsList, setWebinarsList] = useState([]);
    const [selectedWebinarsObj, setSelectedWebinarsIds] = useState<WebinarInterface[]>([]);
    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            trackPromise(
                ApiService.getByParams(193, 'Curately/Workflow/workflow_webinar_list.jsp', { clientId: userLocalData.getvalue('clientId') }).then((response: any) => {
                    // console.log(response);
                    // console.log(passedStageData);
                    let tempWebinarList = [];
                    for (let wl = 0; wl < response.data.length; wl++) {
                        response.data[wl].start_time = DateTime.fromFormat(response.data[wl].start_time.substring(0, 19), 'MM-dd-yyyy hh:mm a').minus({ hours: 4 }).toFormat('MMM dd, yyyy hh:mm a');
                        for (let pd = 0; pd < passedStageData?.webinarList?.length; pd++) {
                            if (response.data[wl].web_id === passedStageData?.webinarList[pd]?.webinarId) {
                                tempWebinarList.push(response.data[wl]);
                            }
                        }
                    }
                    setSelectedWebinarsIds(tempWebinarList);
                    setWebinarsList(response.data);
                })
            );

            let stageIndex = stagesList.findIndex(obj => obj.stageId === stageId);
            if ((stageIndex > -1) && stagesList.length) {
                setNextStageList(stagesList.slice(stageIndex + 1));
            }
        }
     
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    return (
        <>
            <Card className='mt-5 webinar'>
                <CardContent>

                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="stretch"
                    >
                        <Typography variant='h6' className='mb-3'>Webinar Registration</Typography>
                        {
                            (webinarsList.length) ?
                                <Autocomplete
                                    multiple={true}
                                    id='webinarsList'
                                    options={webinarsList}
                                    open={open}
                                    onOpen={() => {
                                        setOpen(true);
                                    }}
                                    onClose={() => {
                                        setOpen(false);
                                    }}
                                    renderOption={(props, option) => {
                                        return (
                                            <li {...props} key={option.web_id}>
                                                {`${option.topic} - ${option.start_time}`}
                                            </li>
                                        );
                                    }}
                                    getOptionLabel={
                                        (option: WebinarInterface) => {
                                            return `${option.topic} - ${option.start_time}`
                                        }
                                        // 2022-04-26 18:00:00
                                        // DateTime.fromFormat(option.start_time, 'yyyy-MM-dd HH:mm:ss').toFormat('MM/dd/yyyy hh:mm a')
                                    }
                                    fullWidth
                                    filterSelectedOptions={true}
                                    clearOnBlur={true}
                                    // onInputChange={(e) => {
                                    //     if (e) {
                                    //         searchFromApi(e);
                                    //         console.log(filteredOptions)
                                    //     }
                                    // }}
                                    value={
                                        (selectedWebinarsObj.length) ? selectedWebinarsObj : []
                                    }
                                    // defaultValue={
                                    //     (selectedWebinarsObj.length) ? selectedWebinarsObj : []
                                    // }
                                    // (isMultiple) ? valuePassed ? [valuePassed] : [] : (valuePassed.id) ? valuePassed : null
                                    onChange={(e, val) => {
                                        // console.log('Change');
                                        // console.log(val);
                                        setSelectedWebinarsIds(val);
                                        if (val.length) {
                                            // let idToPass = val.map(
                                            //     (a: WebinarInterface) => a.id
                                            // );
                                            // handleChange(idToPass.join(','));
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            // label="Asynchronous"
                                            InputProps={{
                                                ...params.InputProps
                                            }}
                                        />
                                    )}
                                    className='customMUIAutoComplete'
                                    size='small'
                                />
                                : null
                        }
                        {/* <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="webinarId">Webinar Id</InputLabel>
                            <Select
                                labelId="webinarId"
                                id="webinarId"
                                name='webinarId'
                                multiple
                                value={selectedWebinarsObj}
                                onChange={
                                    (e) => {
                                        // console.log(e);
                                        // setSelectedWebinarsIds(e);
                                    }
                                }
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {webinarsList.map((webinar: WebinarInterface) => (
                                    <MenuItem key={webinar.web_id} value={webinar.web_id}>
                                        <Checkbox checked={selectedWebinarsObj.indexOf(webinar.web_id) > -1} 
                                        />
                                        <ListItemText primary={webinar.topic} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}

                        <Typography variant='body1' className='my-3'>Note: Applicant will be only able to register for one webinar.</Typography>
                        <FormControlLabel
                            className='mt-3'
                            control={
                                <Checkbox
                                    name='autoMoveToNextStage'
                                    checked={autoMoveToNextStage}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setAutoMoveToNextStage(event.target.checked);
                                    }}
                                />
                            }
                            label="If there are no webinars available then hide this stage and move the candidate to next stage."
                        />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start">
                        <label className='mt-4 mb-1'>If Candidate attended Webinar, move him to Stage</label>
                        <TextField
                            size='small'
                            id=''
                            select
                            onChange={(e) => setIfWebinar(e.target.value)}
                            value={ifWebinar}
                            name={`ifWebinar`}
                            className=''
                            // label='Move to Stage'
                            sx={{ width: '340px' }}
                        >
                            <MenuItem value=""></MenuItem>
                            {
                                nextStageList.map(
                                    (stage: any, i: number) => {
                                        return <MenuItem value={stage.stageId} key={stage.stageId} className={`${(stageId === stage.stageId) ? 'd-none' : ''}`}>{(stage.title) ? stage.title : stage.name}</MenuItem>
                                    }
                                )
                            }

                        </TextField>
                        <label className='mt-4 mb-1'>If Candidate didn't attend Webinar, move him to Stage</label>
                        <TextField
                            size='small'
                            id=''
                            select
                            onChange={(e) => setElseWebinar(e.target.value)}
                            value={elseWebinar}
                            name={`elseWebinar`}
                            className=''
                            // label='Move to Stage'
                            sx={{ width: '340px' }}
                        >
                            <MenuItem value=""></MenuItem>
                            {
                                nextStageList.map(
                                    (stage: any, i: number) => {
                                        return <MenuItem value={stage.stageId} key={stage.stageId} className={`${(stageId === stage.stageId) ? 'd-none' : ''}`}>{(stage.title) ? stage.title : stage.name}</MenuItem>
                                    }
                                )
                            }

                        </TextField>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Button color="primary" variant='contained' type="button" onClick={saveDataForm} className='mt-3 mr-2' size="small">
                            Save
                            {/* {(passedStageData.webinarId) ? "Update" : "Save"} */}
                        </Button>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default Webinar