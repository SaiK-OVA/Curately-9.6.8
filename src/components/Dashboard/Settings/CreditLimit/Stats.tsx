import { Typography, Box, Divider } from '@mui/material'
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';
import { userLocalData } from '../../../../shared/services/userData';
import { useEffect, useState } from '../../../../shared/modules/React';


export default function Stats() {
    const [statsData, setStatsData] = useState<any>({});

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = () => {
        trackPromise(
            ApiService.getById(
                "admin",
                "getCredits",
                `${userLocalData.getvalue("clientId")}/${userLocalData.getvalue("recrId")}`
            ).then((res: any) => {
                if (res.data.Success) {
                    setStatsData(res.data);
                }
            })
        )
    }

    return (
        <div>
            <Typography variant="h6" sx={{ fontSize: "14px" }} gutterBottom>Show Stats</Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="h6" sx={{ mb: 1, fontSize: "14px" }}>Email Credits Summary</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 3 }}>
                <Typography>{`Total Credits: ${statsData?.totalProfileCredits || 0}`}</Typography>
                {/* <Typography>Assigned Credits: 1000</Typography>
                <Typography>Unassigned Credits: 200</Typography> */}
                <Typography>{`Used Credits: ${statsData?.consumedProfileCredits || 0}`}</Typography>
                <Typography>{`Remaining Credits: ${(statsData?.totalProfileCredits || 0) - (statsData?.consumedProfileCredits || 0)}`}</Typography>
            </Box>

            <Typography variant="h6" sx={{ mb: 1, fontSize: "14px" }}>Phone Credits Summary</Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography>{`Total Credits: ${statsData?.totalSmsCredits || 0}`}</Typography>
                {/* <Typography>Assigned Credits: 100</Typography>
                <Typography>Unassigned Credits: 0</Typography> */}
                <Typography>{`Used Credits: ${statsData?.consumedSmsCredits || 0}`}</Typography>
                <Typography>{`Remaining Credits: ${(statsData?.totalSmsCredits || 0) - (statsData?.consumedSmsCredits || 0)}`}</Typography>
            </Box></div>
    )
}
