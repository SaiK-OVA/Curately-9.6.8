import {Dialog, DialogTitle, DialogContent}  from '../../../../../shared/modules/MaterialImports/Dialog';
import {Divider} from '../../../../../shared/modules/MaterialImports/Divider';
import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';

import CloseIcon from '@mui/icons-material/Close';
import './VideoPreview.scss';

const VideoPreview = ({
    url,
    open,
    closePopup
}: {
    url: string,
    open: boolean,
    closePopup: () => void
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
                        Video Preview
                    </span>
                    <span onClick={() => closePopup()} className="closePopup">
                        <CloseIcon />
                    </span>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <iframe src={url} title='Workflow' allowFullScreen></iframe>
            </DialogContent>
        </Dialog>
    )
}

export default VideoPreview;