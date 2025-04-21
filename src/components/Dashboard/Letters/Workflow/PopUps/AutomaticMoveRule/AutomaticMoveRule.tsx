import { useEffect, useState, useCallback } from '../../../../../../shared/modules/React';
import { useFormik, Yup } from '../../../../../../shared/modules/Formik';
import {Card, CardContent} from '../../../../../../shared/modules/MaterialImports/Card';
import {Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';
import {FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';
import {Switch} from '../../../../../../shared/modules/MaterialImports/Switch';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';

import {Dialog, DialogTitle,  DialogContent,   DialogActions} from '../../../../../../shared/modules/MaterialImports/Dialog';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import { Button, Grid, IconButton, showToaster, TextField } from '../../../../../../shared/modules/commonImports';

import './AutomaticMoveRule.scss';

import { StageInterface } from '../../Add/AddWorkflow';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';

import ApiService from '../../../../../../shared/api/api';
import { userLocalData } from '../../../../../../shared/services/userData';
import { debounce } from "lodash";

// import { masterStatusList } from '../../../../../../shared/data/candidateStatusData';
const AutomaticMoveRule = (
    {
        updated, stagesList, stageId, automaticRuleData
    }: {
        updated: any, stagesList: StageInterface[], stageId: string, automaticRuleData: any
    }
) => {

    const [statusNameList, setStatusNameList] = useState<{
        id: string
        label: string
    }[]>([]);

    // const masterStagesListCopy = [...masterStatusList];

    const [automaticOpen, setAutomaticOpen] = useState(false);

    const [moveStageList, setMoveStageList] = useState<StageInterface[]>([]);

    const automaticRuleSchema = Yup.object().shape({
        ruleId: Yup.string(),
        isEnable: Yup.bool(),
        move_stageId: Yup.string(),
        idleDays: Yup.string(),
        candidateStatus: Yup.string(),
        sendMessage: Yup.bool()

    });
    const automaticInitialValues = {
        isEnable: (automaticRuleData.isEnable) ? automaticRuleData.isEnable : false,
        move_stageId: (automaticRuleData.move_stageId && automaticRuleData.move_stageId !== "0") ? automaticRuleData.move_stageId : "",
        idleDays: (automaticRuleData.idleDays && automaticRuleData.idleDays !== "0") ? automaticRuleData.idleDays : "",
        candidateStatus: (automaticRuleData.candidateStatus && automaticRuleData.candidateStatus !== "0") ? automaticRuleData.candidateStatus : "",
        sendMessage: (automaticRuleData.sendMessage && automaticRuleData.sendMessage === "1") ? true : false,                                                                   
    }
    const automaticRuleFormik = useFormik({
        initialValues: automaticInitialValues,
        // enableReinitialize: true,
        validationSchema: automaticRuleSchema,
        onSubmit: (values) => {
            if (!values.move_stageId || !values.idleDays || !values.candidateStatus) {
                showToaster('All fields are required.', 'error');
                return;
              }
              saveAutomaticRule(true);
        },
    });
    const saveAutomaticRule = (bool: boolean, checked: boolean) => {
        let tempData = {
            stageId: stageId,
            ruleId: automaticRuleData.ruleId || null,
            isEnable: (automaticRuleFormik.values.move_stageId && automaticRuleFormik.values.idleDays && automaticRuleFormik.values.idleDays !== "0") ? true : false,
            // isEnable: (!bool) ? checked : automaticRuleFormik.values.isEnable,
            move_stageId: automaticRuleFormik.values.move_stageId,
            idleDays: automaticRuleFormik.values.idleDays,
            candidateStatus: automaticRuleFormik.values.candidateStatus,
            sendMessage: (automaticRuleFormik.values.sendMessage) ? "1" : "0",
            recrId: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        }
        console.log(tempData);
        setAutomaticOpen(false);

        trackPromise(
            ApiService.postWithParams(193, 'Curately/Workflow/workflow_automaticrule_save.jsp', tempData).then((response: any) => {
                // console.log(response);
                if (response.data.message === "Success") {
                    if (bool) {
                        showToaster(`Automatic rules have been ${(automaticRuleData.ruleId) ? "updated" : "saved"}.`, 'success');
                    }
                    updated('');
                } else {
                    showToaster(response.data.Error, 'error');
                }
            })
        );
    }

    const reloadAutomatic = () => {
        automaticRuleFormik.setValues(automaticInitialValues);
        setAutomaticOpen(false);
    }

    const getStageName = (id: string) => {
        if (id) {
            let selectedStage = stagesList.find(x => x.stageId === id);
            return (selectedStage && selectedStage.title) ? selectedStage.title : (selectedStage && selectedStage.name) ? selectedStage.name : "";
        } else {
            return ""
        }
    }

    const getStatusName = (id: number) => {
        if (id) {
            let selectedStatus = statusNameList.find(x => Number(x.id) === Number(id));
            return (selectedStatus && selectedStatus.label) ? selectedStatus.label : "";
        } else {
            return ""
        }
    }


    useEffect(() => {

        let stageIndex = stagesList.findIndex(obj => obj.stageId === stageId);
        if ((stageIndex > -1) && stagesList.length) {
            setMoveStageList(stagesList.slice(stageIndex + 1));
        }
    }, []);


    // useEffect(() => {
    //     // http://52.88.252.214:90/QADemoCurately/getshortListBarStages/3
    //     ApiService.getCall(214, 'getshortListBarStages/' + userLocalData.getvalue('clientId')).then((result) => {
    //         const response=result.data.shortlistBarStages 
    //         const StatusName = response.map((i: { statusId: string, label: string }) => ({ id: i.statusId, label: i.label }))
    //         setStatusNameList(StatusName)
            
    //     })
    // }, [])

    const clientId = userLocalData.getvalue('clientId');

    const fetchShortListBarStages = useCallback(
        debounce(async () => {
            try {
                const result = await ApiService.getCall(214, `getshortListBarStages/${clientId}`);
                const response = result.data.shortlistBarStages;
                const StatusName = response.map((i) => ({
                    id: i.statusId,
                    label: i.label,
                }));
                setStatusNameList(StatusName);
            } catch (error) {
                console.error('Error fetching shortlist bar stages:', error);
            }
        }, 600),
        [clientId]
    );

    useEffect(() => {
        fetchShortListBarStages();
        return () => {
            fetchShortListBarStages.cancel();
        };
    }, [fetchShortListBarStages]);

const isSaveDisabled = !automaticRuleFormik.values.move_stageId || !automaticRuleFormik.values.idleDays || !automaticRuleFormik.values.candidateStatus;
    return (
        <Card className='mt-5 AutomaticRule'>
            <CardContent>
                <Typography variant='h6' className='pb-4'>
                    <span>Automatic  Move Rule</span>
                </Typography>
                <Grid className={`${(automaticRuleFormik.values.move_stageId && automaticRuleFormik.values.idleDays && automaticRuleFormik.values.idleDays !== "0") ? 'd-none' : ''}`}>
                    <Button
                        variant="contained"
                        color="primary"
                        // endIcon={<EditIcon />}

                        onClick={() => setAutomaticOpen(true)}
                        size={'small'}
                    // sx={{ width: 350 }}
                    >
                        Add Rule
                    </Button>
                </Grid>

                <span
                    className={`edit_Grid p-2 ${(automaticRuleFormik.values.move_stageId && automaticRuleFormik.values.idleDays && automaticRuleFormik.values.idleDays !== "0") ? '' : 'd-none'}`}
                >
                    <span
                        className={`mb-4 fs-16 fw-4`}
                        onClick={() => setAutomaticOpen(true)}
                    >
                        <span
                            className={`pr-3 ${(automaticRuleFormik.values.move_stageId) ? '' : 'd-none'}`}
                        >
                            Move to <span className='fw-7'>{getStageName(automaticRuleFormik.values.move_stageId)} Stage</span>
                        </span>
                        <span
                            className={`pr-3 ${(automaticRuleFormik.values.idleDays) ? '' : 'd-none'}`}
                        >
                            When idle for <span className='fw-7'>{automaticRuleFormik.values.idleDays} days</span>
                        </span>
                        <span
                            className={`pr-3 ${(automaticRuleFormik.values.candidateStatus) ? '' : 'd-none'}`}
                        >
                            and Change the Status to <span className='fw-7'>{getStatusName(automaticRuleFormik.values.candidateStatus)}</span>
                        </span>
                    </span>
                    <IconButton
                        aria-label="Edit"
                        className='edit_Icon py-0'
                        onClick={() => setAutomaticOpen(true)}
                    >
                        <EditIcon />
                    </IconButton>
                </span>
                {/* <Typography variant='h6' onClick={() => setAutomaticOpen(true)}>Automatic  Move Rule</Typography> */}
                <Dialog open={automaticOpen} className='AutomaticDialog' maxWidth={'md'}>
                    <form
                        onSubmit={automaticRuleFormik.handleSubmit}
                    >
                        <DialogTitle className='py-2'>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <span className='pr-2'>Automatic Move Rule </span>
                                <span onClick={() => reloadAutomatic()} className="closePopup">
                                    <CloseIcon />
                                </span>
                            </Grid>
                        </DialogTitle>
                        <Divider />
                        <DialogContent className='dialogContent'>
                            <Grid>
                                <FormControlLabel
                                    control={
                                        <Switch name='isEnable'
                                            onChange={
                                                (e) => {
                                                    automaticRuleFormik.handleChange(e);
                                                    saveAutomaticRule(false, e.target.checked);
                                                }
                                            }
                                            checked={automaticRuleFormik.values.isEnable}
                                        />
                                    }
                                    label={<Typography variant='h6'>Automatic  Move Rule</Typography>}
                                    labelPlacement='start'
                                    className='ml-0 mb-4 d-none'
                                />
                            </Grid>

                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="stretch"
                            // className={`${(automaticRuleFormik.values.isEnable) ? '' : 'd-none'}`}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >

                                    <TextField
                                        size='small'
                                        id=''
                                        select
                                        onChange={automaticRuleFormik.handleChange}
                                        value={automaticRuleFormik.values.move_stageId}
                                        name={`move_stageId`}
                                        className=''
                                        label='Move to Stage'
                                        sx={{ width: 'calc(100% - 240px)' }}
                                    >
                                        {/* <MenuItem value=""></MenuItem> */}
                                        {moveStageList.map((stage) => (
                      <MenuItem value={stage.stageId} key={stage.stageId} className={`${stageId === stage.stageId ? 'd-none' : ''}`}>
{stage.title || stage.name}
                      </MenuItem>
                    ))}

                                    </TextField>
                                    <TextField
                                        id="idleDays"
                                        size='small'
                                        name='idleDays'
                                        label="When idle for"
                                        className='ml-4'
                                        sx={{ width: 160 }}
                                        value={automaticRuleFormik.values.idleDays}
                                        onChange={automaticRuleFormik.handleChange}
                                        type="number"
                                        InputProps={{ inputProps: { min: 0 } }}
                                    // , max: 10
                                    />
                                    <span className='ml-4'>Days</span>
                                </Grid>
                                {/* <TextField
                                    size='small'
                                    id='candidateStatus'
                                    select
                                    onChange={automaticRuleFormik.handleChange}
                                    value={automaticRuleFormik.values.candidateStatus}
                                    name={`candidateStatus`}
                                    fullWidth
                                    className='mt-5 mb-4'
                                    // defaultValue="0"
                                    label='Candidate Status'
                                    sx={{ width: 'calc(100% - 240px)' }}

                                >
                                    <MenuItem value=""></MenuItem>
                                    {
                                        masterStagesListCopy.map(
                                            (status: any, i: number) => {
                                                return <MenuItem value={status.id} key={status.id}>{status.label}</MenuItem>
                                            }
                                        )
                                    }
                                </TextField> */}
                                <TextField
                                    size='small'
                                    id='candidateStatus'
                                    select
                                    onChange={automaticRuleFormik.handleChange}
                                    value={automaticRuleFormik.values.candidateStatus}
                                    name={`candidateStatus`}
                                    fullWidth
                                    className='mt-5 mb-4'
                                    // defaultValue="0"
                                    label='Candidate Status'
                                    sx={{ width: 'calc(100% - 240px)' }}

                                >
                                    {/* <MenuItem value=""></MenuItem> */}
                                    {
                                        statusNameList.map(
                                            (status) => {
                                                return <MenuItem value={status.id} key={status.id}>{status.label}</MenuItem>
                                            }
                                        )
                                    }
                                </TextField>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name='sendMessage'
                                            checked={automaticRuleFormik.values.sendMessage}
                                            onChange={automaticRuleFormik.handleChange}
                                        />
                                    }
                                    label="Send Automated Messages associated with move to stage" />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                            </Grid>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button color="primary"
                                variant='contained'
                                type="submit"
                                size="small"
                                disabled={isSaveDisabled}
                            // className={`mt-3 mr-2 ${(automaticRuleData === '') ? 'disabled' : 'enabled'}`}
                            >
                                {/* Save */}
                                {(automaticRuleData.ruleId) ? "Update" : "Save"}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </CardContent>
        </Card>
    )
}

export default AutomaticMoveRule;