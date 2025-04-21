import { useEffect, useState } from '../../../../../../shared/modules/React';
import {Dialog, DialogContent, DialogTitle} from '../../../../../../shared/modules/MaterialImports/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';

import {Grid} from '../../../../../../shared/modules/MaterialImports/Grid';



import './RecruiterVideoRecording.scss'


const RecruiterVideoRecording = (
    {
        open,
        stageId,
        closePopup,
        updated
    }: {
        open: boolean,
        stageId: string,
        closePopup: () => void,
        updated: () => void
    }
) => {

    const [url, setUrl] = useState('');

    useEffect(() => {


        // const handlerForRecruiterRecording = (ev: MessageEvent<{
        //     recruiterVideoPublished: boolean,
        //     id: string,
        //     stageId: string,
        //     recrId: string,
        //     mp4_url: string
        // }>) => {
        //     console.log(ev.data);
        //     if (ev.data.recruiterVideoPublished) {
        //         if (stageId === ev.data.stageId && userData.getId() === ev.data.recrId) {
        //             let videoInfoData = {
        //                 stageId: stageId,
        //                 video_type: 2,
        //                 video_link: ev.data.mp4_url,
        //                 // videoid: ev.data.id
        //             }
        //             trackPromise(
        //                 ApiService.saveInfoVideo(videoInfoData).then((response: any) => {
        //                     // console.log(response.data);
        //                     if (response.data.Success) {
        //                         updated();
        //                     } else {
        //                         showToaster(response.data.Error, 'error');
        //                     }
        //                 })
        //             );
        //         }

        //     }
        // }

        // window.addEventListener('message', handlerForRecruiterRecording)

        // setUrl(`${(window.location.protocol === 'https:') ? 'https://resume.accuick.com' : 'http://34.208.108.171:41088'}/Pipl/CameraTagRecruiter.html?recrId=${userData.getId()}&stageId=${stageId}`);

        // Don't forget to remove addEventListener
        // return () => window.removeEventListener('message', handlerForRecruiterRecording)

    }, [])


    return (
        <Dialog open={open} className='RecruiterVideoRecording' maxWidth={false}>
            <DialogTitle className='py-2'>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span>
                        Record Video
                    </span>
                    <span onClick={() => closePopup()} className="closePopup">
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <iframe src={url} title='Recording Video'></iframe>
            </DialogContent>
        </Dialog>
    )
}

export default RecruiterVideoRecording