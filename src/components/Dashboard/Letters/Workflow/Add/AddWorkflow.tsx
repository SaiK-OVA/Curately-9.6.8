// import React from 'react';
import { useState } from '../../../../../shared/modules/React';

// import CssBaseline from '@mui/materia

import './AddWorkflow.scss';
// import masterStagesList from '../../../shared/data/Stages';
import {Button, TextField, Grid} from '../../../../../shared/modules/commonImports';
import { Link, useNavigate } from 'react-router-dom';

import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';
import ApiService from '../../../../../shared/api/api';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../shared/services/userData';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';



export interface StageInterface {
    number: string;
    name: string;
    title: string;
    stageId: string;
    stageTypeId: string;
    isInAdmin?: boolean;
}

const Workflow = () => {

    const navigate = useNavigate();


    const [workflowName, setWorkflowName] = useState('');


    const saveWorkflowName = () => {
        if (workflowName) {
            let data = {
                "workFlowId": "0",
                "workFlowName": workflowName,
                "createdBy": userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            }
            trackPromise(

                ApiService.postWithData('admin', 'saveandupdateWorkFlow', data).then((response: any) => {
                    if (response.data.Success) {
                        let tempParams = {
                            workflowId: response.data.workFlowId,
                            clientId: userLocalData.getvalue('clientId')
                        }
                        saveAuditLog(4203);
                        ApiService.postWithParams(193, 'Curately/Workflow/workflow_stages_basic.jsp', tempParams).then((response1: any) => {
                            // console.log(response1);
                            navigate('/' + userLocalData.getvalue('clientName') + '/letter/workflows/edit/' + response.data.workFlowId);
                        })
                    } else {
                        showToaster('WorkFlowName already exists here!', 'error');
                        // console.log(response.data);
                    }
                })
            );
        } else {
            showToaster('Enter Workflow Name', 'error');
        }
    }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <div className='Workflow mr-5 pt-3'>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="customCard px-4 py-2 mb-2"
                sx={{ minHeight: "auto !important" }}
            >
                <Typography variant="h6" className="headerName">Add Workflow</Typography>

                <Link to={`/${userLocalData.getvalue('clientName')}/letter/workflows/list`} className="btn btn-primary ml-2 c-white underlineNone">
                    <Button variant="outlined" type="button" className='' size="small">
                        Back to list
                    </Button>
                </Link>
            </Grid>
            <Grid
                container

                className="customCard"
                alignItems="center"
                sx={{ minHeight: 'auto !important' }}
            >

                <div className='pt-4'>
                    <Typography style={{ fontWeight: "bold" }}>Workflow Name</Typography>
                    <TextField
                        id='workflowName'
                        type="text"
                        value={workflowName}
                        onChange={
                            (e) => {
                                setWorkflowName(e.target.value)
                            }
                        }
                        name='workflowName'
                        fullWidth
                        size='small'
                        className='mt-1 mb-2'
                    // placeholder='Workflow Name'
                    />
                </div>
                <div className='mt-5 pt-4 ml-4'>
                    <Button variant='contained' onClick={saveWorkflowName}>Save</Button>
                </div>
            </Grid>

        </div>
    );
}



export default Workflow;