// import React from 'react';
// import Camera from CameraTag;

import './AddVideo.scss';
import { useEffect, useState } from '../../../../shared/modules/React';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';
import { userLocalData } from '../../../../shared/services/userData';
import {Dialog, DialogTitle, DialogContent} from '../../../../shared/modules/MaterialImports/Dialog';
import {TextField} from '../../../../shared/modules/MaterialImports/TextField';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {Button} from '../../../../shared/modules/MaterialImports/Button';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import CameraTagWrapper from '../CameraTag/CameraTagWrapper';

const AddVideo = () => {

    const [commonUrl, setCommonUrl] = useState('');
    const [cameraData, setCameraData] = useState({ "cameratagId": "", "label": "" });
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setCommonUrl(`${(window.location.protocol === 'https:') ? 'https://app.curately.ai' : 'http://52.41.18.83:41088'}/Accuick_API/CameraTagAccountManager.html?recrId=${userLocalData.getvalue('recrId')}`);

        window.addEventListener('message', handlerForRecruiterRecording)

        return () => window.removeEventListener('message', handlerForRecruiterRecording)
    }, []);


    const handlerForRecruiterRecording = (ev: MessageEvent<{
        addCameraTagVideo: boolean,
        title: string,
        videoUrl: string,
        action: string
    }>) => {
        if (ev.data.addCameraTagVideo) {

            let videoInfoData = {
                "cameratagId": ev.data.videoUrl,
                "label": ev.data.title,
                "createdBy": userLocalData.getvalue('recrId'),
                "clientId": userLocalData.getvalue('clientId')
            }
            setCameraData({
                "cameratagId": ev.data.videoUrl,
                "label": ev.data.title,
            });

            setCommonUrl('');

            // passedStageData.video
            // http://35.155.202.216:8080/QADemoCurately/savevideo
            trackPromise(
                ApiService.postWithData('admin', 'savevideo', videoInfoData).then((response: any) => {
                    console.log(response.data);
                    if (response.data.Success) {
                        setOpenDialog(false);
                        showToaster("Video added successfully.", 'success');
                        setCommonUrl(`${(window.location.protocol === 'https:') ? 'https://app.curately.ai' : 'http://52.41.18.83:41088'}/Accuick_API/CameraTagAccountManager.html?recrId=${userLocalData.getvalue('recrId')}`);
                        setCameraData({ "cameratagId": "", "label": "" })
                    } else {
                        setOpenDialog(true);
                        // setCommonUrl(`${(window.location.protocol === 'https:') ? 'https://app.curately.ai' : 'http://52.41.18.83:41088'}/Accuick_API/CameraTagAccountManager.html?recrId=${userLocalData.getvalue('recrId')}`);
                        showToaster(response.data.Message
                            , 'error');
                    }
                })
            );
        }
    };

    const handleUpdateClick = () => {
        if (![null, undefined, "", 0].includes(cameraData.label)) {
            handlerForRecruiterRecording({
                data: {
                    addCameraTagVideo: true,
                    title: cameraData.label,
                    videoUrl: cameraData.cameratagId,
                    action: ""
                }
            } as MessageEvent)
        }
    }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4296);
    }, []);

    return (
        <div id="AddVideo" className='p-4 modal-height'>
            <CameraTagWrapper />
            {/* <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                <Grid size={6} className='mt-5'>
                    <label className='inputLabel text-center'>Video Title</label><span style={{ color: 'red' }}>*</span>
                    <div className='mt-2'>
                        <TextField size='small' />
                        <Button variant="outlined" className='record ml-5 mt-1'>Record or Upload Video</Button>
                    </div>
                </Grid>
            </Grid> */}
            {/* <CameraTag
                appUuid='a-fa1219f0-641d-013b-999e-0abe8b919efd'
                id='myCamera'
            /> */}
            <Dialog open={openDialog} maxWidth={"xs"} fullWidth>
                <DialogTitle>
                    <Typography variant='h6'>Add Video</Typography>
                </DialogTitle>
                <DialogContent >
                    <Stack alignItems={"flex-end"} spacing={2} py={1.5}>
                        <TextField
                            fullWidth
                            size='small' label={"Video Title"}
                            placeholder={"Enter video title"}
                            name='add_video'
                            value={cameraData.label}
                            onChange={(e: any) => setCameraData({ ...cameraData, label: e.target.value })} />
                        <Button variant='contained' onClick={handleUpdateClick}>Update</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddVideo
