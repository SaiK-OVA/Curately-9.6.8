import { useEffect, useRef, useState } from '../../../../shared/modules/React';
// import { Dialog } from 'primereact/dialog';
import ViewCandidate from './ViewCandidate';
// import { Loader } from '../../../shared/Loader/Loader';
import Drawer from "@mui/material/Drawer"
import { IconButton } from "../../../../shared/modules/MaterialImports/Button"
import { Stack } from "../../../../shared/modules/MaterialImports/Stack"
import { Typography } from "../../../../shared/modules/MaterialImports/Typography"
import CloseRounded from "@mui/icons-material/CloseRounded"
import KeyboardArrowLeftRounded from "@mui/icons-material/KeyboardArrowLeftRounded"
import KeyboardArrowRightRounded from "@mui/icons-material/KeyboardArrowRightRounded"



import './ViewCandidateModal.scss';


const ViewCandidateModal = (
    { open, closePopup, jobId, candidateId, candidateIdsList }:
        { open: boolean, closePopup: () => void, jobId: string, candidateId: string, candidateIdsList?: any }
) => {
    const [viewCandidateId, setViewCandidateId] = useState<any>("");
    const isCurrentIndex = useRef(0);

    useEffect(() => {
        setViewCandidateId(candidateId);
        isCurrentIndex.current = getCandidateIndex(candidateId);
        return () => {
            isCurrentIndex.current = 0;
        }
    }, [candidateId, candidateIdsList]);

    const getCandidateIndex = (id: string) => {
        if (!!candidateIdsList?.length) {
            let index = candidateIdsList.findIndex((each: any) => each?.toString() === id?.toString()) || 0;
            return index >= 0 ? index : 0;
        } else return 0;
    }

    const handleChangeCandidate = (type: "BACKWARD" | "FORWARD") => {
        setViewCandidateId(null);
        switch (type) {
            case "BACKWARD":
                if (isCurrentIndex.current >= 0) {
                    new Promise((resolve) => {
                        setTimeout(() => { resolve(true) }, 100)
                    }).then(() => {
                        setViewCandidateId(candidateIdsList[(isCurrentIndex.current - 1)]);
                        isCurrentIndex.current = isCurrentIndex.current - 1;
                    })
                } else setViewCandidateId(candidateIdsList[isCurrentIndex.current])
                break;
            case "FORWARD":
                if ((isCurrentIndex.current + 1) !== candidateIdsList.length) {
                    new Promise((resolve) => {
                        setTimeout(() => { resolve(true) }, 100)
                    }).then(() => {
                        setViewCandidateId(candidateIdsList[(isCurrentIndex.current + 1)]);
                        isCurrentIndex.current = isCurrentIndex.current + 1;
                    })
                } else setViewCandidateId(candidateIdsList[isCurrentIndex.current])
                break;
            default: break;
        }
    }

    //Commented Prime react dialog for email and phone dialog issue
    // return <Dialog dismissableMask={true} visible={open} position={'right'} style={{ width: '85vw', height: '100vh', maxHeight: '100vh', margin: 0, zIndex: 999 }} onHide={() => closePopup()} draggable={false} resizable={false} id="ViewCandidateModal">
    //     <Loader />
    //     <ViewCandidate candidateId={candidateId} jobId={jobId} isInModal={true} />
    // </Dialog>

    return (
        <Drawer open={open} sx={{ zIndex: 999, height: "100vh", }} onClose={closePopup} anchor='right' id="ViewCandidateModal" >
            <Stack width={"85vw"} minHeight={"110vh"} position={"relative"}>
                <Stack className="viewCandidateModalHeader">
                    <Stack alignItems={"center"} justifyContent={"right"} direction={"row"} px={1} width={"100%"}>
                        {!!candidateIdsList?.length && <Stack direction="row" spacing={1} alignItems={"center"}>
                            <IconButton disabled={isCurrentIndex.current === 0} size='small' onClick={() => handleChangeCandidate("BACKWARD")}><KeyboardArrowLeftRounded /></IconButton>
                            <Typography>{`${isCurrentIndex.current + 1} of ${candidateIdsList?.length}`}</Typography>
                            <IconButton disabled={(isCurrentIndex.current + 1) === candidateIdsList.length} size='small' onClick={() => handleChangeCandidate("FORWARD")}><KeyboardArrowRightRounded /></IconButton>
                        </Stack>}
                        <IconButton size='small' onClick={closePopup}><CloseRounded /></IconButton>
                    </Stack>
                </Stack>
                {/* <Loader /> */}
                <div style={{ padding: "5rem 1rem", backgroundColor: "var(--c-neutral-10)" }}>
                    {viewCandidateId && <ViewCandidate candidateId={viewCandidateId} jobId={jobId} isInModal={true} />}
                </div>
            </Stack>
        </Drawer >
    )
}

export default ViewCandidateModal;