//import { useEffect, useRef, useState } from '../../../../shared/modules/React';
// import { Dialog } from 'primereact/dialog';
//import ViewCandidate from './ViewCandidate';
// import { Loader } from '../../../shared/Loader/Loader';
import Drawer from "@mui/material/Drawer"
import { IconButton } from "../../../../shared/modules/MaterialImports/Button"
import { Stack } from "../../../../shared/modules/MaterialImports/Stack"
//import { Typography } from "../../../../shared/modules/MaterialImports/Typography"
import CloseRounded from "@mui/icons-material/CloseRounded"
// import KeyboardArrowLeftRounded from "@mui/icons-material/KeyboardArrowLeftRounded"
// import KeyboardArrowRightRounded from "@mui/icons-material/KeyboardArrowRightRounded"
// import { showToaster } from '../../../shared/SnackBar/SnackBar';
// import { trackPromise } from 'react-promise-tracker';
// import ApiService from "../../../../shared/api/api";


import './ViewVoiceAICandidateModal.scss';
import { Grid } from "../../../../shared/modules/MaterialImports/Grid2";
//import AudioPlayer from 'react-h5-audio-player';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';

const ViewVoiceAICandidateModal = (
    { open, closePopup, candidateId, candidateViewScreening }:
        { open: boolean, closePopup: () => void, candidateId: string, candidateViewScreening?: any }
) => {
    //const [viewCandidateId, setViewCandidateId] = useState<any>(""); // Candidate Id


    return (
        <Drawer open={open} sx={{ zIndex: 999, height: "100vh", }} onClose={closePopup} anchor='right' id="ViewVoiceAICandidateModal" >
            <Stack width={"70vw"} minHeight={"110vh"} position={"relative"}>
                <Stack className="viewCandidateModalHeader">
                    <Stack alignItems={"center"} justifyContent={"right"} direction={"row"} px={1} width={"80%"}>
                        {/* <Typography variant="h6">Voice AI Candidate</Typography> */}
                        <IconButton size='small' onClick={closePopup}><CloseRounded /></IconButton>
                    </Stack>
                </Stack>
                {/* <Loader /> */}
                <div className='ScreeningView'>
                    <Grid container alignItems={"center"} width={"auto"} columnSpacing={1}>
                        <Grid className="ScreeningViewHeader">
                            <div className='pl-4 pr-4 ' style={{ overflowY: "auto", height: "auto" }}
                                dangerouslySetInnerHTML={{ __html: candidateViewScreening?.activityLogHtmlHeader }}></div>
                        </Grid>
                        <Grid className="ScreeningViewHeader" sx={{ width: "100%", padding: "10px 2px" }}>
                            <div className='pl-4 pr-4 ' style={{ overflowY: "auto", width: "100%" }} >
                                <AudioPlayer src={candidateViewScreening?.callRecordUrl}
                                    progressJumpSteps={{
                                        forward: 10000,
                                        backward: 10000
                                    }}
                                    customProgressBarSection={
                                        [
                                            RHAP_UI.PROGRESS_BAR,
                                            RHAP_UI.CURRENT_TIME,
                                            <div> / </div>,
                                            RHAP_UI.DURATION,
                                        ]
                                    }
                                    // customVolumeControls={[]}
                                    customAdditionalControls={[]}
                                    customControlsSection={[
                                        //  RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION,
                                        RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS, <div style={{ width: "10px" }}>   </div>,
                                    ]}
                                    //customAdditionalControls={[RHAP_UI.LOOP]} 

                                    showJumpControls={true}
                                    //    showDownloadProgress={false}
                                    layout="horizontal-reverse"
                                    onPlay={(e) => console.log("onPlay")} />
                            </div>
                        </Grid>
                        <Grid className="ScreeningViewHeader">
                            <div className='pl-4 pr-4 ' style={{ overflowY: "auto", height: "auto" }}
                                dangerouslySetInnerHTML={{ __html: candidateViewScreening?.activityLogHtmlBody }}></div>
                        </Grid>

                    </Grid>
                </div>
            </Stack>
        </Drawer >
    )
}

export default ViewVoiceAICandidateModal;