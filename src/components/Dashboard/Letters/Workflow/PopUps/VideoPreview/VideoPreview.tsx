import {Dialog, DialogTitle, DialogContent} from '../../../../../../shared/modules/MaterialImports/Dialog';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import {Grid} from '../../../../../../shared/modules/MaterialImports/Grid';

import CloseIcon from '@mui/icons-material/Close';
import './VideoPreview.scss';

const VideoPreview = ({
    url,
    open,
    closePopup,
    title = ""
}: {
    url: string,
    open: boolean,
    closePopup: () => void;
    title?: string
}) => {


    return (
        <Dialog open={open} className='VideoPreview' maxWidth={false}>
            <DialogTitle className='py-2'>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span>
                        Video Preview {title ? `- ${title}` : '' } 
                    </span>
                    <span onClick={() => closePopup()} className="closePopup">
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                {
                    url.includes('cameratag.com/') ?
                        <video src={url} controls autoPlay width={"900px"} height={"500px"}>
                            Your browser does not support the video tag.
                        </video>
                        :
                        <iframe src={url} title='Workflow' allowFullScreen></iframe>
                }
            </DialogContent>
        </Dialog>
    )
}

export default VideoPreview;