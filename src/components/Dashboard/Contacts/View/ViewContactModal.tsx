import React, { useEffect, useRef, useState } from 'react';
import ViewContact from './ViewContact'
import Drawer from '@mui/material/Drawer'
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { IconButton } from '../../../../shared/modules/MaterialImports/Button';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import CloseRounded from '@mui/icons-material/CloseRounded';
import KeyboardArrowLeftRounded from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import "./ViewContactModal.scss";

interface IViewContactModalProps {
    open: boolean;
    closeDrawer: () => void;
    contactIdsList?: any;
    contactId: string | number
}

const ViewContactModal: React.FC<IViewContactModalProps> = ({ open, closeDrawer, contactIdsList, contactId }) => {
    const [viewContactId, setViewContactId] = useState<any>("");
    const isCurrentIndex = useRef(0);

    useEffect(() => {
        setViewContactId(contactId);
        isCurrentIndex.current = getCandidateIndex(contactId);
        return () => {
            isCurrentIndex.current = 0;
        }
    }, [contactId, contactIdsList]);

    const getCandidateIndex = (id: string | number) => {
        if (!!contactIdsList?.length) {
            let index = contactIdsList.findIndex((each: any) => each?.toString() === id?.toString()) || 0;
            return index >= 0 ? index : 0;
        } else return 0;
    }

    const handleChangeCandidate = (type: "BACKWARD" | "FORWARD") => {
        setViewContactId(null);
        switch (type) {
            case "BACKWARD":
                if (isCurrentIndex.current >= 0) {
                    new Promise((resolve) => {
                        setTimeout(() => { resolve(true) }, 100)
                    }).then(() => {
                        setViewContactId(contactIdsList[(isCurrentIndex.current - 1)]);
                        isCurrentIndex.current = isCurrentIndex.current - 1;
                    })
                } else setViewContactId(contactIdsList[isCurrentIndex.current])
                break;
            case "FORWARD":
                if ((isCurrentIndex.current + 1) !== contactIdsList.length) {
                    new Promise((resolve) => {
                        setTimeout(() => { resolve(true) }, 100)
                    }).then(() => {
                        setViewContactId(contactIdsList[(isCurrentIndex.current + 1)]);
                        isCurrentIndex.current = isCurrentIndex.current + 1;
                    })
                } else setViewContactId(contactIdsList[isCurrentIndex.current])
                break;
            default: break;
        }
    }

    return (
        <Drawer open={open} onClose={closeDrawer} sx={{ zIndex: 999, height: "100vh", }} anchor='right' id="ViewCandidateDrawer">
            <Stack width={"85vw"} minHeight={"110vh"} position={"relative"}>
                <Stack className="viewContactModalHeader">
                    <Stack alignItems={"center"} justifyContent={"right"} direction={"row"} px={1} width={"100%"}>
                        {!!contactIdsList?.length && <Stack direction="row" spacing={1} alignItems={"center"}>
                            <IconButton disabled={isCurrentIndex.current === 0} size='small' onClick={() => handleChangeCandidate("BACKWARD")}><KeyboardArrowLeftRounded /></IconButton>
                            <Typography>{`${isCurrentIndex.current + 1} of ${contactIdsList?.length}`}</Typography>
                            <IconButton disabled={(isCurrentIndex.current + 1) === contactIdsList.length} size='small' onClick={() => handleChangeCandidate("FORWARD")}><KeyboardArrowRightRounded /></IconButton>
                        </Stack>}
                        <IconButton size='small' onClick={closeDrawer}><CloseRounded /></IconButton>
                    </Stack>
                </Stack>
                <div style={{ padding: "5rem 1rem 1rem", background: "var(--c-neutral-10)" }}>
                    {viewContactId && <ViewContact viewContactId={viewContactId} isInModal={true} />}
                </div>
            </Stack>
        </Drawer>
    )
}

export default ViewContactModal;
