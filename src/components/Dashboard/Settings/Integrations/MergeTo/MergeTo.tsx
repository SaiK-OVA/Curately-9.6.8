import { useEffect, useState } from "../../../../../shared/modules/React";
import { Grid, Button } from '../../../../../shared/modules/commonImports';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { useMergeLink } from "@mergeapi/react-merge-link";
import ApiService from "../../../../../shared/api/api";
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import { Stack } from "../../../../../shared/modules/MaterialImports/Stack";
import SyncRoundedIcon from '@mui/icons-material/SyncRounded';
import { showToaster } from "../../../../shared/SnackBar/SnackBar";
// import { userLocalData } from "../../../../../shared/services/userData";

const MergeTo = ({ integrationData, passedData }: {
    integrationData: { linkToken: string; clientName: string; integrationName: string; uniqueId: string; },
    passedData: { image: string; integrationName: string; uniqueId: string; } | null
}) => {

    const [connected, setConnected] = useState(false);
    const [mergeIntegratedData, setMergeIntegratedData] = useState<{ accountToken: string, image: string, integrationName: string, uniqueId: string }>({
        accountToken: "", image: "", integrationName: "", uniqueId: ""
    });
    const [syncStarted, setSyncStarted] = useState(false);
    useEffect(() => {
        handleConnectedData();
    }, [passedData, integrationData]);

    const handleConnectedData = () => {
        if (passedData && passedData?.uniqueId) {
            setMergeIntegratedData({
                ...mergeIntegratedData,
                ...passedData
            })
            setConnected(true);
        }
    }

    const onSuccess = (public_token: string, additionalInfo: any) => {
        // Send public_token to server (Step 3)
        console.log(public_token);
        console.log(additionalInfo);
        // client-name
        // https://adminapi.cxninja.com/merge-uapi-service/retrieveAccountToken/
        // ed25cd50bb2be4301ac98037d74e2af2-3
        // ${userLocalData.getvalue("clientId")}
        trackPromise(
            ApiService.getCall('merge', `retrieveAccountToken/${public_token}/${integrationData.uniqueId}/3`).then((response: any) => {
                if (response.status === 200) {
                    handleSyncOnSuccess();
                    setMergeIntegratedData({ ...response.data })
                    setConnected(true);
                }
            })
        )
    };
    const { open, isReady } = useMergeLink({
        linkToken: integrationData.linkToken, //"XgNm8DTbo5IsNtmDWCfSotqwh-GbarrBU82HILWBgGsw8-YEAQfjfw", // Replace ADD_GENERATED_LINK_TOKEN with the token retrieved from your backend (Step 1)
        onSuccess,
        // tenantConfig: {
        // apiBaseURL: "https://api-eu.merge.dev" /* OR your specified single tenant API base URL */
        // },
    });

    const handleSyncOnSuccess = () => {
        setSyncStarted(true);
        // trackPromise(
        ApiService.getCall("merge", "sync-status/" + integrationData.uniqueId + "/3").then((response) => {
            setSyncStarted(false);
            showToaster(response?.data?.Success ? "Syncing done" : "Syncing failed", response?.data?.Success ? "success" : "error");
        }).catch((error: any) => {
            setSyncStarted(false);
            showToaster(`Syncing Failed`, "error");
        })
    }

    const disConnect = () => {
        trackPromise(
            // + userLocalData.getvalue("clientId") + "/" 
            ApiService.getCall('merge', 'deleteAccount/3/' + (integrationData.uniqueId || mergeIntegratedData.uniqueId)).then((response: any) => {
                console.log(response.data);
                setConnected(false);
                window.location.reload();
            })
        )
    }
    // const imageUrl = {
    //     "ApplicantStack": "https://merge-api-production.s3.amazonaws.com/media/ApplicantStack_Square_Logo_wBHYVRL.jpg",
    //     "Ashby": "https://merge-api-production.s3.amazonaws.com/media/Ashby_Square_Logo_3uQWavw.png",
    //     "BambooHR": "https://merge-api-production.s3.amazonaws.com/media/BambooHR_Square_Logo.jpg",
    //     "Breezy": "https://merge-api-production.s3.amazonaws.com/media/Breezy_Square_Logo.jpg",
    //     "CATS": "https://merge-api-production.s3.amazonaws.com/media/CATS_Square_Logo_J4NkqoE.jpg",
    //     "ClayHR": "https://merge-api-production.s3.amazonaws.com/media/PlatformClayHR_square_0Hwn5DL.png",
    //     "Clockwork": "https://merge-api-production.s3.amazonaws.com/media/Clockwork_Square_Logo.jpg",
    //     "Comeet": "https://merge-api-production.s3.amazonaws.com/media/Comeet_Square_Logo.jpg",
    //     "Cornerstone TalentLink": "https://merge-api-production.s3.amazonaws.com/media/Cornerstone_Square_Logo.jpg",
    //     "EngageATS": "https://merge-api-production.s3.amazonaws.com/media/EngageATS_square.png",
    //     "Eploy": "https://merge-api-production.s3.amazonaws.com/media/Eploy_square.png",
    //     "Fountain": "https://merge-api-production.s3.amazonaws.com/media/Fountain_Square_Logo.png",
    //     "Freshteam": "https://merge-api-production.s3.amazonaws.com/media/PlatformFreshteam_square.png",
    //     "Greenhouse": "https://merge-api-production.s3.amazonaws.com/media/Greenhouse_Square_Logo.jpg",
    //     "Greenhouse - Job Boards API": "https://merge-api-production.s3.amazonaws.com/media/Greenhouse_Square_Logo.jpeg",
    //     "Harbour ATS": "https://merge-api-production.s3.amazonaws.com/media/PlatformHarbour_square_dYGCWZM.png",
    //     "Homerun": "https://merge-api-production.s3.amazonaws.com/media/homerun.png",
    //     "HR Cloud": "https://merge-api-production.s3.amazonaws.com/media/HR_Cloud_Square_Logo.jpg",
    //     "iCIMS": "https://merge-api-production.s3.amazonaws.com/media/PlatformICIMS_square.png",
    //     "Infinite BrassRing": "https://merge-api-production.s3.amazonaws.com/media/Infinite_square_oo6UcJ3.png",
    //     "JazzHR": "https://merge-api-production.s3.amazonaws.com/media/JazzHR_Square_Logo_WQcMDMd.jpg",
    //     "JobAdder": "https://merge-api-production.s3.amazonaws.com/media/Platformjobadder_square.png",
    //     "JobDiva": "https://merge-api-production.s3.amazonaws.com/media/PlatformJobDiva.png",
    //     "JobScore": "https://merge-api-production.s3.amazonaws.com/media/JobScore-square.png",
    //     "Jobsoid": "https://merge-api-production.s3.amazonaws.com/media/Jobsoid_Square_Logo_L2UcdnQ.jpg",
    //     "Jobvite": "https://merge-api-production.s3.amazonaws.com/media/Jobvite_Square_Logo.png",
    //     "Lano": "https://merge-api-production.s3.amazonaws.com/media/Lano_Square_Logo.png",
    //     "Lever": "https://merge-api-production.s3.amazonaws.com/media/Lever_Square_Logo_oYg8yBW.jpg",
    //     "Occupop": "https://merge-api-production.s3.amazonaws.com/media/Occupop-square.png",
    //     "Oracle Recruiting": "https://merge-api-production.s3.amazonaws.com/media/Oracle_Recruiting_square.png",
    //     "Oracle Taleo": "https://merge-api-production.s3.amazonaws.com/media/Taleo_Square_Logo.jpg",
    //     "Personio Recruiting": "https://merge-api-production.s3.amazonaws.com/media/2.jpeg",
    //     "Pinpoint": "https://merge-api-production.s3.amazonaws.com/media/Pinpoint_square.png",
    //     "Polymer": "https://merge-api-production.s3.amazonaws.com/media/Polymer_square.png",
    //     "Recruiterflow": "https://merge-api-production.s3.amazonaws.com/media/RecruiterFlow_Square_Logo_0pzjFF2.jpg",
    //     "Recruitive": "https://merge-api-production.s3.amazonaws.com/media/PlatformRecruitive_square.png",
    //     "Sage HR": "https://merge-api-production.s3.amazonaws.com/media/Sage_Square_Logo_FAQpKpP.jpg",
    //     "SuccessFactors": "https://merge-api-production.s3.amazonaws.com/media/SuccessFactors_Square_Logo_BcXogF0.jpg",
    //     "SmartRecruiters": "https://merge-api-production.s3.amazonaws.com/media/SmartRecruiters_Square_Logo_j8vLfEW.png",
    //     "TalentLyft": "https://merge-api-production.s3.amazonaws.com/media/PlatformTalentLyft.png",
    //     "TalentReef": "https://merge-api-production.s3.amazonaws.com/media/TalentReef_Square_Logo.png",
    //     "Teamtailor": "https://merge-api-production.s3.amazonaws.com/media/Teamtailor_Square_Logo.jpg",
    //     "Tellent": "https://merge-api-production.s3.amazonaws.com/media/PlatformTellent.png",
    //     "Tribepad": "https://merge-api-production.s3.amazonaws.com/media/PlatformTribepad.png",
    //     "UKG Pro Recruiting": "https://merge-api-production.s3.amazonaws.com/media/UKG_Square_Logo_zTMYILE.png",
    //     "Workable": "https://merge-api-production.s3.amazonaws.com/media/Workable_Square_Logo_OvllNl9.jpg",
    //     "Workday": "https://merge-api-production.s3.amazonaws.com/media/Workday_Square_Logo.jpg",
    //     "Zoho Recruit": "https://merge-api-production.s3.amazonaws.com/media/PlatformZoho_recruit_square.png",
    //     "Avature": "https://merge-api-production.s3.amazonaws.com/media/PlatformAvature.png",
    //     "Join": "https://merge-api-production.s3.amazonaws.com/media/PlatformJoin_square_yd1EauK.png",
    //     "Easycruit": "https://merge-api-production.s3.amazonaws.com/media/PlatformEasyCruit.png",
    //     "Taleez": "https://merge-api-production.s3.amazonaws.com/media/PlatformTaleez.png",
    //     "Traffit": "https://merge-api-production.s3.amazonaws.com/media/PlatformTraffit_jTdJ5ZL.png",
    //     "Gem": "",
    //     "Welcome to the Jungle": ""
    // }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <div className='customCard pr-0 pt-1 pl-0'>
            <style>{`
             @keyframes spin {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
            }
            `}</style>
            <Grid container spacing={2} className=""
                direction="row"
                justifyContent="flex-start"
                alignItems="center">
                <Grid size={1} className='mt-4 ml-4'>
                    {
                        (mergeIntegratedData?.integrationName && connected) ? <img src={mergeIntegratedData?.image} width={"50"} /> :
                            <span className="atsText">ATS</span>
                    }
                    {/* {
                        integrationData.integrationName && (imageUrl as any)[integrationData.integrationName] ?
                            <img src={(imageUrl as any)[integrationData.integrationName]} width="36" height="40" />
                            :
                            // GreenHouse
                            <svg width="36" height="40" viewBox="0 0 36 40" fill="none">
                                <path d="M16.676 12.3849C16.676 14.3162 15.8589 16.0246 14.5218 17.3617C13.0362 18.8473 10.8821 19.2187 10.8821 20.4814C10.8821 22.1899 13.6305 21.6699 16.2674 24.3069C18.013 26.0525 19.0901 28.3552 19.0901 31.0292C19.0901 36.3032 14.8561 40.5 9.54503 40.5C4.23398 40.5 0 36.3032 0 31.033C0 28.3552 1.07707 26.0525 2.82266 24.3069C5.45961 21.6699 8.20798 22.1899 8.20798 20.4814C8.20798 19.2187 6.05385 18.8473 4.56824 17.3617C3.2312 16.0246 2.41411 14.3162 2.41411 12.3106C2.41411 8.448 5.57103 5.32823 9.43361 5.32823C10.1764 5.32823 10.8449 5.43965 11.402 5.43965C12.4048 5.43965 12.9248 4.99396 12.9248 4.2883C12.9248 3.87976 12.7391 3.3598 12.7391 2.80269C12.7391 1.53993 13.8162 0.5 15.1161 0.5C16.416 0.5 17.4559 1.57707 17.4559 2.87697C17.4559 4.25116 16.3788 4.88254 15.5617 5.17967C14.8932 5.40251 14.3733 5.69963 14.3733 6.36815C14.3733 7.63092 16.676 8.85655 16.676 12.3849ZM15.9331 31.033C15.9331 27.3561 13.2219 24.3849 9.54503 24.3849C5.86815 24.3849 3.15692 27.3561 3.15692 31.033C3.15692 34.6727 5.86815 37.6811 9.54503 37.6811C13.2219 37.6811 15.9331 34.669 15.9331 31.033ZM13.7419 12.3106C13.7419 9.97075 11.8477 8.03946 9.54503 8.03946C7.24234 8.03946 5.34819 9.97075 5.34819 12.3106C5.34819 14.6504 7.24234 16.5817 9.54503 16.5817C11.8477 16.5817 13.7419 14.6504 13.7419 12.3106Z" fill="#23A47F" />
                            </svg>
                    } */}
                </Grid>
                <Grid size={8} className=''>
                    {/* <Typography variant="h6" gutterBottom>{mergeIntegratedData.integrationName} </Typography> */}
                    {/* <span className="atsText">ATS</span> */}
                    {
                        mergeIntegratedData?.integrationName ?
                            <Typography>{`Integrate your ${mergeIntegratedData?.integrationName} with Curately. For Bi-Directional sync of Jobs, Candidates.`}</Typography>
                            :
                            <Typography>Integrate your ATS with Curately. For Bi-Directional sync of Jobs, Candidates.</Typography>
                    }
                </Grid>
                <Grid size={2} className='mt-4' style={{ minWidth: '150px' }}>
                    {
                        connected ?
                            (<Stack spacing={1}>
                                <Button variant="contained" size="large" onClick={disConnect}>Disconnect</Button>
                                {syncStarted ? <Button sx={{ textTransform: "none" }} startIcon={<SyncRoundedIcon sx={{
                                    animation: "spin 1s linear infinite"
                                }} />}>Syncing</Button> : null}
                            </Stack>)
                            :
                            <Button variant="contained" size="large" disabled={!isReady} onClick={() => { open(); saveAuditLog(4291) }}>Connect</Button>
                    }
                </Grid>
                <Grid size={2} className='mt-4' style={{ minWidth: '150px' }}>
                </Grid>
            </Grid>
        </div>
    )
}

export default MergeTo;