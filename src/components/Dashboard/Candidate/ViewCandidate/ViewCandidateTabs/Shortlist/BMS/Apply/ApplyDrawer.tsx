// import { CloseRounded } from '@mui/icons-material'
import { useEffect, useState } from '../../../../../../../../shared/modules/React';
import { Box } from '../../../../../../../../shared/modules/MaterialImports/Box';
import { FC } from 'react';
import ApplyDialog from './ApplyDialog';
import UserProfile from '../UserProfile';
import { trackPromise } from '../../../../../../../../shared/modules/PromiseTrackter';
import { showToaster } from '../../../../../../../../shared/modules/commonImports';
// import ApplyUserProfile from './ApplyUserProfile';
import ApiService from "../../../../../../../../shared/api/api"
// 


interface BMSInternalSubmissionObject {
    address: Address;
    available: boolean;
    'available-date': string;
    // 'desired-location': Address;
    'desired-positions': string[];
    email: string;
    'employment-preferences': string[];
    experience: Experience[];
    'first-name': string;
    headline: string;
    'is-active': boolean;
    'last-name': string;
    'payment-preference': string;
    phone: string;
    rates: Rate[];
    resume: Resume;
    skills: string[];
    summary: string;
    'willing-to-relocate': boolean;
}

interface Resume {
    'content-type': string;
    data: string;
    name: string;
}

interface Rate {
    amount: number;
    currency: string;
    unit: string;
}

interface Experience {
    city: string;
    'end-date': string;
    'is-current': boolean;
    'job-title': string;
    organization: string;
    phone: string;
    'start-date': string;
    state: string;
    summary: string;
}

interface Address {
    address1: string;
    address2: string;
    city: string;
    'country-code': string;
    'postal-code': string;
    state: string;
    street1: string;
    street2: string;
}

const ApplyDrawer: FC<
    { openApply: boolean, handleDrawerClose: any, candidateData: any, saveData: (json: any, stageId?: any, isCloseFormBuilderPopup?: boolean) => void; candidateId: string; completedStages: any }
> = ({ openApply, handleDrawerClose, candidateData, saveData, candidateId, completedStages }) => {
    const [isContinue, setIsContinue] = useState(false);
    const [profile, setProfile] = useState<BMSInternalSubmissionObject>({
        "first-name": "",
        "last-name": "",
        "headline": "",
        "summary": "",
        "available-date": "",
        "is-active": false,
        "rates": [{ unit: "Hourly", currency: "USD", amount: 0 }],
        "available": false,
        "willing-to-relocate": false,
        "email": "",
        "phone": "",
        "payment-preference": "",
        "desired-positions": [],
        "employment-preferences": [],
        "skills": [],
        "experience": [],
        "address": {
            "address1": "",
            "address2": "",
            "city": "",
            "state": "",
            "postal-code": "",
            "country-code": "US",
            "street1": "",
            "street2": ""
        },
        "resume": {
            "name": "",
            "data": "",
            "content-type": ""
        }
    });
    const [profileStageId, setProfileStageId] = useState(null);


    useEffect(() => {
        //    console.log(completedStages);
        if (completedStages?.length) {
            for (let cs = 0; cs < completedStages.length; cs++) {
                if (completedStages[cs]?.json?.isCustomForm && (completedStages[cs]?.json?.customStageName === "BMS_InternalSubmission")) {
                    if (completedStages[cs]?.json?.jsonData?.['first-name']) {
                        setProfile(completedStages[cs]?.json?.jsonData);
                        setProfileStageId(completedStages[cs]?.stageId)
                        console.log(completedStages[cs]?.json?.jsonData);
                        break;
                    }
                }
            }
        }
    }, []);

    const handleSaveUserData = (dataToPass: any) => {
        // trackPromise(
        //     ApiService.putWithData('beeline', `candidate/${candidateId}`, dataToPass).then((response) => {
        //         console.log(response);
        //         console.log(response.data);
        //         // message:"Profile id 58333 created."
        //         if (response.data?.Success) {
        //             //  response.data.message?.includes('created') || response.data.message?.includes('updated')
        //             saveData({ ...dataToPass }, profileStageId, false);
        //             setIsContinue(true);
        //             // toggleViewMode();
        //         } else {
        //             showToaster(response.data?.Message ? response.data?.Message : "Error occured while saving ", 'error');
        //         }
        //     })
        // )
        saveData({ ...dataToPass }, profileStageId, false);
        setIsContinue(true);
    }


    return (
        // <Drawer open={openApply} onClose={handleDrawerClose} anchor='right' PaperProps={{
        //     sx: { width: '900px' },
        //     transition: 'transform 0.3s ease-in-out',
        // }}>
        //     <AppBar position='sticky' className='apply-drawer-title-container'>
        //         <Stack direction={"row"} justifyContent={"space-between"} spacing={2} alignItems={"center"} >
        //             <Typography variant='h6'>Apply</Typography>
        //             <IconButton onClick={handleDrawerClose}>
        //                 <CloseRounded />
        //             </IconButton>

        //         </Stack>
        //     </AppBar>
        // </Drawer>
        (<Box bgcolor={"#f3f5f7"} >
            {openApply && (
                (isContinue ? <ApplyDialog open={openApply} handleClose={handleDrawerClose} profile={profile} saveData={(json) => saveData(json)} handleBack={() => setIsContinue(false)} candidateId={candidateId} /> : // <UserProfile candidateData={profileData} open={false} closePopup={() => { }} saveData={() => { }} />
                <UserProfile
                    candidateData={candidateData}
                    closePopup={() => { handleDrawerClose() }}
                    open={openApply}
                    saveData={
                        (json) => {
                            handleSaveUserData(json)
                        }}
                    candidateId={candidateId}
                    clientSubmission={true}
                    completedStages={completedStages}
                />)
                // <UserProfile profiles={profileData} isprofile={false} callProfileStore={callProfileStore} handleContinue={() => setIsContinue(true)} candidateData={undefined} />
            )}
        </Box>)
    );
}

export default ApplyDrawer
