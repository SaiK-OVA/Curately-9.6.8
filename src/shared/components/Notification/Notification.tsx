
import { CloseOutlined } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { IconButton } from '../../../shared/modules/MaterialImports/Button';
import { Stack } from '../../../shared/modules/MaterialImports/Stack';
import { Typography } from '../../../shared/modules/MaterialImports/Typography';
import ApiSerive from '../../api/api';
import { globalData } from '../../services/globalData';
import { userLocalData } from '../../services/userData';
import './Notification.scss';

const Notification = (
    { open, closePopup }:
        { open: boolean, closePopup: () => void }
) => {
    const [noticationList, setNoticationList] = useState<{ jobId: string, jobTitle: string, source: string, userName: string, userId: string; date: string }[]>([]);

    const getNotificationLog = () => {
        // https://app.curately.ai/Accuick_API/Curately/Dashboard/applicants_notifications.jsp?clientId=2
        // { "jobId": "1601", "jobTitle": "Marketing Communications Writer", "source": "Indeed", "userName": "TOM MULLEN", "userId": "43178" }
        ApiSerive.getByParams(193, 'Curately/Dashboard/applicants_notifications.jsp', { clientId: userLocalData.getvalue('clientId') }).then((response) => {
            console.log(response.data);
            setNoticationList(response.data);
        })
    }
    useEffect(() => {
        getNotificationLog();
    }, [])

    const openCandidateView = (candId: string, jobId: string) => {
        window.open(globalData.getWindowLocation() + "candidate/view/" + candId.trim() + "/" + jobId);
    }

    const openJobView = (jobId: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + jobId);
    }

    return (
        <Dialog open={open} onClose={closePopup} id="NotificationDialog" PaperProps={{ sx: { position: "fixed", top: 60, right: 0, m: 0 } }}>
            <DialogTitle className='drawer-header'>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} >
                    <Typography variant='h6'>Notification</Typography>
                    <IconButton onClick={closePopup} size='small'><CloseOutlined fontSize='small' /></IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                {
                    // { "jobId": "1601", "jobTitle": "Marketing Communications Writer", "source": "Indeed", "userName": "TOM MULLEN", "userId": "43178" }
                    noticationList.map((item) => {
                        return <div className='notification'>
                            {/* {item.type === 'applicant' &&  */}
                            <div className='fs-13'>
                                <span>
                                    New applicant
                                    <span className="hightLightTd mx-1" onClick={() => openCandidateView(item.userId, item.jobId)} >{item.userName}</span>
                                    applied to
                                    <span className="hightLightTd mx-1" onClick={() => openJobView(item.jobId)} >{item.jobTitle}</span>
                                </span>
                                <div className='pt-1'>
                                    {/* {item.source} */}
                                    {item.date ?
                                        DateTime.fromFormat(item.date.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy t')
                                        :
                                        ""
                                    }
                                </div>
                            </div>
                            {/* } */}
                        </div>
                    })
                }
            </DialogContent>
        </Dialog>
    )

}

export default Notification;