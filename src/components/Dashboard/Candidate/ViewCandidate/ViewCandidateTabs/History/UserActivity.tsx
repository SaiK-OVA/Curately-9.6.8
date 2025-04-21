//import { useMemo, useRef, useState } from 'react';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Card, CardContent } from '../../../../../../shared/modules/MaterialImports/Card';
// import { Button } from '../../../../../../shared/modules/MaterialImports/Button';
// import { Stack } from '../../../../../../shared/modules/MaterialImports/Stack';
// import { Link } from 'react-router-dom';
import './UserActivity.scss';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import TvOutlinedIcon from '@mui/icons-material/TvOutlined';
import InterpreterModeOutlinedIcon from '@mui/icons-material/InterpreterModeOutlined';
import VideoChatOutlinedIcon from '@mui/icons-material/VideoChatOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import OutboundOutlinedIcon from '@mui/icons-material/OutboundOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import OutputOutlinedIcon from '@mui/icons-material/OutputOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import SignalWifiStatusbar4BarOutlinedIcon from '@mui/icons-material/SignalWifiStatusbar4BarOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SavedSearchOutlinedIcon from '@mui/icons-material/SavedSearchOutlined';
//import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { Grid,showToaster } from '../../../../../../shared/modules/commonImports';
import { globalData } from '../../../../../../shared/services/globalData';
import { Button, IconButton } from '../../../../../../shared/modules/MaterialImports/Button'
import { Accordion, AccordionDetails, AccordionSummary, ExpandMoreIcon } from '../../../../../../shared/modules/MaterialImports/Accordion';
import { CloseIcon, Dialog,DialogContent, DialogTitle } from '../../../../../../shared/modules/MaterialImports/Dialog';
import React from 'react';
import { trackPromise } from 'react-promise-tracker';
import ApiService from "../../../../../../shared/api/api";
import { userLocalData } from '../../../../../../shared/services/userData';

const UserActivity = ({ historyList }: { historyList: any }) => {

    const [activitiesList, setActivitiesList] = useState<{}[]>([]);

    useEffect(() => {
        let tempList = historyList.map((history: any) => {
            return {
                activityTypeId: history.activityTypeId,
                activityId: history.activityId,
                recrName: history.recrName,
                jobTitle: history.jobTitle,
                jobId: history.jobId,
                saveDate: history.saveDate?.trim() && DateTime.fromFormat(history.saveDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').isValid ? DateTime.fromFormat(history.saveDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy HH:mm a') : "",
                textToDisplay: getActivityNode(history),
                isGroup: history.isGroup,
                count: history.count,
                userName:history.userName
            };
        });
        setActivitiesList(tempList);
    }, [historyList]);

  const [userDetails, setUserDetails]= useState([])
  const [open, setOpen] = React.useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null)
  const [pagination, setPagination] = useState({
          pageIndex: 0,
          pageSize: 25, //customize the default page size
      });

  const handleClickOpen = (activityId: number, activityTypeId: number,recrName:string) => {
    setSelectedActivity(recrName)
    userActivityDeatiles(activityId,activityTypeId)
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  const userActivityDeatiles = (activityId: number, activityTypeId: number) => {
        const payLoad = {
            "clientId": userLocalData.getvalue("clientId"),
            "activityTypeId": activityTypeId,
            "pageSize": pagination.pageSize,
            "activityId": activityId
        }
        trackPromise(
            ApiService.postWithData("admin", "getUserActivityDetail", payLoad).then((res: any) => {
                if (res?.data?.Success) {
                    const userData = res.data.userTriggerJobTasks
                    setUserDetails(userData)
                    showToaster("User Deatiles Displayed", "success")
                   
                } else showToaster((res.data.message) ? res.data.message : "An error occured.", 'error')
            })
        )
}
    const getIcon = (activityTypeId: number) => {
        switch (activityTypeId) {
            case 1:
                return <MailOutlinedIcon />;
            case 2:
                return <SmsOutlinedIcon />;
            case 3:
                return <WorkOutlineOutlinedIcon />;
            case 4:
                return <CallOutlinedIcon />;
            case 5:
                return <ReviewsOutlinedIcon />;
            case 6:
                return <TvOutlinedIcon />;
            case 7:
                return <InterpreterModeOutlinedIcon />;
            case 8:
                return <VideoChatOutlinedIcon />;
            case 9:
                return <AssessmentOutlinedIcon />;
            case 10:
                return <SaveAsOutlinedIcon />;
            case 11:
                return <OutboundOutlinedIcon />;
            case 12:
                return <FileOpenOutlinedIcon />;
            case 13:
                return <ReplyOutlinedIcon />;
            case 14:
                return <OutputOutlinedIcon />;
            case 15:
                return <AssignmentTurnedInOutlinedIcon />;
            case 16:
                return <SignalWifiStatusbar4BarOutlinedIcon />;
            case 17:
                return <Diversity3OutlinedIcon />;
            case 18:
                return <SellOutlinedIcon />;
            case 19:
                return <EditNoteOutlinedIcon />;
            case 20:
                return <SendOutlinedIcon />;
            case 21:
                return <LocalActivityOutlinedIcon />;
            case 22:
                return <LocalActivityOutlinedIcon />;
            case 23:
                return <SavedSearchOutlinedIcon />;
            case 24:
                return <LocalActivityOutlinedIcon />;
            case 25:
                return <LocalActivityOutlinedIcon />;
            case 26:
                return <LocalActivityOutlinedIcon />;
            case 27:
                return <WorkspacesOutlinedIcon />;
        }
    }

    const getActivityNode = (activity: any) => {
        switch (activity.activityTypeId) {
            case 1:
                return (
                    (activity.jobTitle)? 
                    <>  
                      {activity.recrName} sent an {activity.activityTypeName} about the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                        {activity.recrName} sent an {activity.activityTypeName} the new position.
                    </>
                    )
            case 2:
                return (
                (activity.jobTitle)? 
                <>  
                  {activity.recrName} sent an {activity.activityTypeName} regarding the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)}>{activity.jobTitle}</span> role.
                </>
                : 
                <> 
                    {activity.recrName} sent an {activity.activityTypeName} the new position.
                </>
                )
            case 3:
                return (
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName} applied for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                       {activity.userName} applied for the position.
                    </>
                    )
            case 4:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.recrName} {activity.activityTypeName} {activity.userName} regarding the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      {activity.recrName} {activity.activityTypeName} the {activity.userName} regarding the position.
                    </>
                    )
            case 5:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.recrName} {activity.activityTypeName} {activity.userName} application for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                      {activity.recrName} {activity.activityTypeName} the {activity.userName} application.
                    </>
                    )
            case 6:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.recrName} initiated the {activity.activityTypeName} process for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      {activity.recrName} initiated the {activity.activityTypeName} process for the position
                    </>
                    )
            case 7:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.recrName} scheduled an {activity.activityTypeName} <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                      {activity.recrName} Recruiter scheduled an {activity.activityTypeName} for the role.
                    </>
                    )
            case 8:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.recrName}  assigned {activity.activityTypeName} for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      {activity.recrName} assigned {activity.activityTypeName} for the position.
                    </>
                    ) 
                //<>{activity.activityTypeName}-{activity.description} <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> Job.</>;
            case 9:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.recrName}  assigned {activity.activityTypeName} for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      {activity.recrName} assigned {activity.activityTypeName} for the position.
                    </>
                    )
            case 10:
                return (
                    (activity.jobTitle)? 
                    <>  
                      {activity.recrName}  sent documents for signing for the<span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                      {activity.recrName} sent documents for signing for the position.
                    </>
                    )
            case 11:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName}'s application was marked as {activity.activityTypeName} for the<span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      {activity.userName}'s application was marked as {activity.activityTypeName}.
                    </>
                    )
            case 12:
                return (
                    (activity.jobTitle)? 
                    <>
                      The <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role was marked as {activity.activityTypeName}.
                    </>
                    : 
                    <> 
                      Position was marked as {activity.activityTypeName}.
                    </>
                    )
            case 13:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName} replied regarding the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      {activity.userName} replied regarding the position.
                    </>
                    )
            case 14:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName} opted out of the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                      {activity.userName} opted out of the position.
                    </>
                    )
            case 15:
                return (
                  (activity.jobTitle)?
                  <>  
                    {activity.recrName} assigned the position of <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> to {activity.userName}
                  </>
                  : 
                  <> 
                    {activity.recrName} assigned a new position to the {activity.userName}
                  </>
                );
            case 16:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName}'s status was updated for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                      {activity.userName}'s status was updated.
                    </>
                    )
            case 17:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName} was added to the talent pool for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      {activity.userName} was added to the talent pool.
                    </>
                    )
            case 18:
                return(
                    (activity.jobTitle)? 
                    <>  
                      A tag was added to {activity.userName}'s profile for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                      A tag was added to the {activity.userName}'s profile.
                    </>
                    )
            case 19:
                return(
                    (activity.jobTitle)? 
                    <>  
                      A note was added to {activity.userName}'s profile for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      A note was added to the {activity.userName}'s profile.
                    </>
                    )
            case 20:
                return(
                    (activity.jobTitle)? 
                    <>  
                      A campaign was sent regarding the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                      A campaign was sent regarding the role.
                    </>
                    )
            case 21:
                return(
                    (activity.jobTitle)? 
                    <>  
                      A metric was recorded for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      A metric was recorded for the position.
                    </>
                    )
            case 22:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName} visited the career portal for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                      {activity.userName} visited the career portal.
                    </>
                    )
            case 23:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName} searched for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      {activity.userName} searched for the position.
                    </>
                    )
            case 24:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName} logged into their profile for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      {activity.userName} logged into their profile.
                    </>
                    )
            case 25:
                return(
                    (activity.jobTitle)? 
                    <>  
                      The hiring status was changed for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      Hiring status was changed for the position.
                    </>
                    )
            case 26:
                return(
                    (activity.jobTitle)? 
                    <>  
                      {activity.userName}'s journey was assigned for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> role.
                    </>
                    : 
                    <> 
                      {activity.userName}'s journey was assigned..
                    </>
                    )
            case 27:
                return(
                    (activity.jobTitle)? 
                    <>  
                      The workflow was updated for the <span className="hightLightTd" onClick={() => openJobView(activity.jobId)} >{activity.jobTitle}</span> position.
                    </>
                    : 
                    <> 
                      Workflow was updated for the position.
                    </>
                    )
        }
    }


    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }


    return (
        <Box id="UserAcitivity-container">
            {/* <Box id="UserAcitivity-header">
                <Typography variant="body1" className="header-link">
                    Newest First
                </Typography>

                <Typography variant="body1" className="header-link">
                    All Activities
                </Typography>
            </Box> */}
            {activitiesList && activitiesList.length > 0 ?
            (activitiesList.map((activity: any, index: number) => (
                <Card key={index} className="my-2">
                    <CardContent className='p-2'>
                        <Grid container
                            direction="row"
                            sx={{
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                            spacing={2}
                        >
                            <Grid>
                                {getIcon(activity.activityTypeId)}
                            </Grid>
                            <Grid size="grow">
                                <Grid
                                    container
                                    direction="column"
                                    sx={{
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start",
                                    }}
                                >

                                    <Typography variant="body1">{activity.textToDisplay}</Typography>
                                    <Typography variant="caption" color="textSecondary" className='activity-content'>
                                        {activity.saveDate}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Button variant="contained" color="primary" className='mt-2' size='small' onClick={()=>handleClickOpen(activity.activityId,activity.activityTypeId,activity.recrName)}>{activity.isGroup  ?`Show Activities ${activity.count === "0" ? " " : `(${activity.count})` }` : `Show Deatiles ${activity.count == 0 ? " " : `(${activity.count})`}` }</Button>
                        </Grid>
                    </CardContent>
                </Card>
            ))) : (
              <Typography style={{display:"flex", justifyContent:"center"}}>No records data</Typography>
            )}
            <div>
                  <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} sx={{ '& .MuiDialog-paper' : {
                    height: '500px' ,width: '800px', maxWidth: '90%'} }}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                      {selectedActivity ? `Recruiter : ${selectedActivity}` : "Model title"}

                    </DialogTitle>
                    <IconButton aria-label="close" onClick={handleClose} sx={(theme)=> ({
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: theme.palette.grey[500],
                      })}
                      >
                      <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                    { userDetails && userDetails.length > 0 ? (
                    userDetails?.map((task:any, index:number) => (
                      <Accordion key={task.taskId} defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <Typography component="span">Task Type: {task.taskType.replace(/_/g, ' ')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <h4>Task Order: {task.taskOrder}</h4>
                        <h4>Task Execution Status: {task.taskExecutionStatus.replace(/_/g,' ')}</h4>
                        </AccordionDetails>
                      </Accordion>
                       ))):(
                        <Typography style={{display:"flex", justifyContent:"center"}}>No records data</Typography>
                      )}
                    </DialogContent>
                  </Dialog>
            </div>
                </Box>
    );
};

export default UserActivity;
