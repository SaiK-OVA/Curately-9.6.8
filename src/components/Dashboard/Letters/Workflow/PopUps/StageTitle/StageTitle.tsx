import { useEffect, useState } from '../../../../../../shared/modules/React';
// useRef
import './StageTitle.scss';


import ApiService from '../../../../../../shared/api/api';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import { Button, Grid, IconButton, showToaster, TextField } from '../../../../../../shared/modules/commonImports';
import { Card, CardContent, CardActions } from '../../../../../../shared/modules/MaterialImports/Card';

// import SaveIcon from '@mui/icons-material/Save';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { userLocalData } from '../../../../../../shared/services/userData';
// import { Position } from 'reactflow';

export interface MessageBoxInterface {
    stageData: any,
    updated: (title: string) => void,
    position: string,
    workflowId: string,
}



const StageTitle = (
    {
        stageData, updated, position, workflowId
    }: MessageBoxInterface,
) => {

    // const [stageTitle, setStageTitle] = useState((stageData.title) ? stageData.title : stageData.name);
    const [stageTitle, setStageTitle] = useState(stageData.title);
    const [stageTitleOld, setStageTitleOld] = useState(stageData.title);
    const [stageInstructions, setStageInstructions] = useState(stageData.instructions);
    const [showEditTitle, setShowEditTitle] = useState(false);
    const [showEditInstructions, setShowEditInstructions] = useState(false);

    // const tempData = useRef({
    //     stageTitle: stageData.title,
    //     stageInstructions: stageData.instructions
    // })

    const saveInstructions = (input: 'title' | 'instructions', tempInstructions?: string) => {
        tempInstructions = tempInstructions ? tempInstructions : stageInstructions.trim()
        if (input === 'title' && !stageTitle) {
            showToaster('Enter Stage Title.', 'error')
            return
        }
        if ((input === 'instructions') && !tempInstructions) {
            showToaster('Enter Stage Instructions.', 'error')
            return
        }
        let data = {
            stageId: stageData.stageId,
            title: stageTitle.trim(),
            instructions: tempInstructions ? tempInstructions : stageInstructions.trim(),
            clientId: userLocalData.getvalue('clientId'),
            position: position,
            workflowid: workflowId,

        }
        trackPromise(
            ApiService.postWithData('admin', 'saveStage', data).then((response: any) => {
                // tempData.current = {
                //     stageTitle: stageTitle,
                //     stageInstructions: stageInstructions
                // }
                setStageTitle(stageTitle.trim());
                setStageInstructions(tempInstructions ? tempInstructions : stageInstructions.trim());
                setShowEditTitle(false);
                setShowEditInstructions(false);
                if (response.data.message === "Success") {
                    showToaster('Stage Saved Succesfully', 'success');
                    updated(stageTitle);
                } else {
                    showToaster(response.data.Error, 'error');
                    // console.log(response.data);
                }
            })
        )

    };

    useEffect(() => {
        if (stageData.name === "On Hold" && stageInstructions === "") {
            let tempInstructions = 'We have received your application and are currently reviewing it. Your interest in this opportunity is sincerely appreciated. Rest assured; we will make every effort to get in touch with you as soon as possible. We value your time and interest, and we look forward to connecting with you shortly.';
            setStageInstructions(tempInstructions);
            saveInstructions('instructions', tempInstructions);
        }

    }, [])




    return (
        <div className='StageTitle'>
            {
                (stageData.name) ?
                    <div>
                        <Typography variant="h6" gutterBottom className='pt-2'>
                            {/* {(stageData.title) ? stageData.title : stageData.name} */}
                            {stageData.name}
                        </Typography>
                        <Card className="mt-4 mb-5">
                            <CardContent>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="stretch"
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                    </Grid>
                                    <Grid className={`${(showEditTitle || stageTitle) ? 'd-none' : ''}`}>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            startIcon={<AddCircleOutlineIcon />}
                                            className={`mb-4 fs-24 fw-7 tt-none addButton`}
                                            onClick={() => setShowEditTitle(true)}
                                            disabled={showEditInstructions}
                                            title={`${(stageTitle) ? 'Edit Title' : ''}`}
                                        // sx={{ width: 350 }}
                                        >
                                            {(stageTitle) ? stageTitle : 'Add a Title'}
                                        </Button>
                                    </Grid>
                                    <div>
                                        <span
                                            // container
                                            // direction="row"
                                            // justifyContent="flex-start"
                                            // alignItems="center"
                                            className={`editGrid titleGrid ${(showEditTitle || !stageTitle) ? 'd-none' : ''}`}
                                            style={{ justifyContent: "space-between", alignItems: 'flex-start' }}
                                        >
                                            <span
                                                className='titleSpan fs-24 fw-7 '
                                                onClick={() => setShowEditTitle(true)}
                                            >
                                                <span className='stage_title'>
                                                    {(stageTitle) ? stageTitle : 'Add a Title'}
                                                </span>
                                            </span>
                                            <span className='pt-4'>
                                                <IconButton
                                                    aria-label="Edit"
                                                    className='editIcon'
                                                    onClick={() => setShowEditTitle(true)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </span>
                                        </span>
                                    </div>
                                    <Card sx={{ width: 350 }} className={`mt-1 mb-4 ${(showEditTitle) ? '' : 'd-none'}`} >
                                        <CardContent>
                                            <TextField
                                                id='stageTitle'
                                                type="text"
                                                value={stageTitle}
                                                onChange={
                                                    (e) => {
                                                        setStageTitle(e.target.value);
                                                    }
                                                }
                                                name='stageTitle'
                                                fullWidth
                                                size='small'
                                                // className={`mt-1 mb-4 ${(showEditTitle) ? '' : 'd-none'}`}
                                                label='Stage Title'
                                            />
                                        </CardContent>
                                        <CardActions>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                            >
                                                <Button
                                                    variant="text"
                                                    onClick={() => {
                                                        setStageTitle("");
                                                        setShowEditTitle(false);
                                                        setStageTitle(stageTitleOld);
                                                    }}
                                                    size={'small'}
                                                    className={'mt-2 mr-2'}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    // startIcon={<SaveIcon />}
                                                    onClick={() => { saveInstructions('title') }}
                                                    size={'small'}
                                                    className={'mt-2'}
                                                >
                                                    Save
                                                </Button>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                    <Grid className={`${(showEditInstructions || stageInstructions) ? 'd-none' : ''}`}>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            startIcon={<AddCircleOutlineIcon />}
                                            className={`mb-4 fs-16 fw-7 tt-none addButton`}
                                            onClick={() => setShowEditInstructions(true)}
                                            disabled={showEditTitle}
                                            title={`${(stageInstructions) ? 'Edit Instructions' : ''}`}
                                        // sx={{ width: 350 }}
                                        >
                                            {(stageInstructions) ? stageInstructions : 'Add instructions'}
                                        </Button>
                                    </Grid>
                                    <div>
                                        <span
                                            // container
                                            // direction="row"
                                            // justifyContent="flex-start"
                                            // alignItems="center"
                                            className={`editGrid instructionsGrid ${(showEditInstructions || !stageInstructions) ? 'd-none' : ''}`}
                                        >
                                            <span
                                                className='titleSpan mb-4 fs-16 fw-7'
                                                onClick={() => setShowEditInstructions(true)}
                                            >
                                                {(stageInstructions) ?
                                                    // <span dangerouslySetInnerHTML={{ __html: stageInstructions.trim().split('\n').map((line, index) => line.trim() ? `${line.trim()}<br />` : '').join('') }}></span>
                                                    <span dangerouslySetInnerHTML={{ __html: stageInstructions.trim().split('\n').filter((line: string) => line.trim() !== '').join('<br />') }}></span>
                                                    :
                                                    'Add instructions'}
                                            </span>
                                            <span>
                                                <IconButton
                                                    aria-label="Edit"
                                                    className='editIcon py-0'
                                                    onClick={() => setShowEditInstructions(true)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </span>
                                        </span>
                                    </div>
                                    <Card sx={{ width: 350 }} className={`mt-1 mb-2 ${(showEditInstructions) ? '' : 'd-none'}`} >
                                        <CardContent>
                                            <TextField
                                                id='stageInstructions'
                                                type="text"
                                                value={stageInstructions}
                                                onChange={
                                                    (e) => {
                                                        setStageInstructions(e.target.value);
                                                    }
                                                }
                                                name='stageInstructions'
                                                fullWidth
                                                size='small'
                                                // className={`mt-1 mb-2 ${(showEditInstructions) ? '' : 'd-none'}`}
                                                label='Enter Stage Instructions'
                                                multiline
                                                rows={4}
                                            />
                                        </CardContent>
                                        <CardActions>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-end"
                                                alignItems="center"
                                            >
                                                <Button
                                                    variant="text"
                                                    onClick={() => { setShowEditInstructions(false) }}
                                                    size={'small'}
                                                    className={'mt-2 mr-2'}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    // startIcon={<SaveIcon />}
                                                    onClick={() => { saveInstructions('instructions') }}
                                                    size={'small'}
                                                    className={'mt-2'}
                                                >
                                                    Save
                                                </Button>
                                            </Grid>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </CardContent>
                        </Card>
                    </div>
                    : null
            }
        </div>
    )
}

export default StageTitle;