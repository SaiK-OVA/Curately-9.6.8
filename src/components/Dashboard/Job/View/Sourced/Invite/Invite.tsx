import { lazy, Suspense, useEffect, useState } from '../../../../../../shared/modules/React';
import { CircularProgress } from '../../../../../../shared/modules/MaterialImports/CircularProgress';
import { Button, IconButton } from '../../../../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../../../../shared/modules/MaterialImports/Grid2';
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';
import { CloseIcon, Dialog, DialogContent, DialogTitle } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Menu, MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ApiService from "../../../../../../shared/api/api";

const DataCollection = lazy(() => import('./Popups/DataCollection'));
const VideoRecording = lazy(() => import('./Popups/VideoRecording'));
const Assessment = lazy(() => import('./Popups/Assessment'));
const DocumentSigning = lazy(() => import('./Popups/DocumentSigning/DocumentSigning'));
const Scheduling = lazy(() => import('./Popups/Scheduling/Scheduling'));


import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../../../shared/services/userData';
import { useParams } from 'react-router-dom';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';
import './Invite.scss';


const Invite = ({ selectedRows, openIds }: { selectedRows: any, openIds?: any }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const [inviteData, setInviteData] = useState<any>();
  const [inviteStagesData, setInviteStagesData] = useState([]);
  const params = useParams();
  const [inviteToLinks, setInviteToLinks] = useState<string[]>([]);

  const [interviewSchedular, setInterviewSchedular] = useState({
    "summary": "",
    "end_date": "",
    "eventId": "",
    "join_url": "",
    "description": "",
    "duration": "",
    "accountId": "",
    "calendarId": "",
    "providerid": "",
    "location": "",
    "recrId": "",
    "created_date": "",
    "cronofyId": "",
    "start_date": ""
  });

  useEffect(() => {
    getInviteToMenuOptions();
  }, []);

  const getInviteToMenuOptions = () => {
    trackPromise(
      ApiService.postWithData("admin", "inviteTypes", {
        clientId: userLocalData.getvalue('clientId')
      }).then((res) => {
        if (res.data.Success === true) {
          setInviteStagesData(res.data.inviteTypeResponses || []);
        }
      })
    )
  }



  const handleButtonClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };




  const handleGetStageDetails = (inviteType: string) => {
    let queryParams = {
      clientId: `${userLocalData.getvalue("clientId")}`,
      jobId: params.jobId,
      inviteType
    }
    if (["1", "5", "2"].includes(inviteType)) {
      trackPromise(
        ApiService.getByParams(193, "Curately/Invite/invite_job_get.jsp", queryParams).then((res) => {
          if (res.data?.interviewSchedular && res.data?.interviewSchedular?.eventId) {
            setInterviewSchedular(res.data.interviewSchedular);
            setAnchorEl(null);
            setOpenDialog(true);
          } else if (res.status === 200) {
            setInviteData(res?.data || {});
            setAnchorEl(null);
            setOpenDialog(true);
          }
        })
      )
    } else {
      let inviteGetUrl = (inviteType === "3") ? "getInviteJobVideoRecordings" : (inviteType === "4") ? "getInviteAssessments" : "";
      ApiService.postWithData(
        "admin",
        `${inviteGetUrl}`,
        queryParams
      ).then((res) => {
        if (res.status === 200) {
          setInviteData(res?.data || {});
          setOpenDialog(true);
        }
      })
    }
  }

  const reloadStage = (inviteType: string) => {
    if (!!Object.keys(selectedRows)?.length && Object.keys(selectedRows)?.length > 1) {
      handleGetStageDetails(inviteType)
    } else handleDialogClose();
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenDialog(false);
  };

  const handleMenuItemClick = (option: { typeId: string, typeName: string }) => {
    handleGetStageDetails(option.typeId)
    setSelectedOption(option.typeName);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setAnchorEl(null);
    setInviteToLinks([]);
  };

  const getOpenId = (userId?: string) => {
    if (userId) {
      return openIds.find((each: any) => each.userId.toString() === userId.toString()).openId;
    } else return openIds[0].openId;
  }

  const handleInviteToAssign = (inviteTypeId: number, userId?: string) => {
    const payLoad = {
      clientId: userLocalData.getvalue("clientId"),
      jobId: params.jobId,
      inviteType: `${inviteTypeId}`,
      openId: getOpenId(userId ? userId : Object.keys(selectedRows).filter((key) => selectedRows[key])[0]),
      userId: userId ? userId : Object.keys(selectedRows).filter((key) => selectedRows[key])[0],
    }
    let isParamsValid = Object.values(payLoad).every((item) => !["", null, undefined].includes(item));
    if (isParamsValid) {
      if ([3, 4].includes(inviteTypeId)) {
        trackPromise(
          ApiService.postWithData(
            "admin",
            "inviteUsers",
            { ...payLoad, recrId: userLocalData.getvalue("recrId") }
          ).then((response) => {
            if (response?.data?.Success) {
              let url = `${window.location.protocol === "http:" ? "http://localhost:3002" : window.location.origin}/workflow/#/invite/${response.data.names[0].split(":")[1].trim()}`;
              let tempInviteToLinks = inviteToLinks;

              if (!!Object.keys(selectedRows)?.length && Object.keys(selectedRows).length > 1) {
                tempInviteToLinks.push(url);
                setInviteToLinks([...tempInviteToLinks])
              } else {
                window.open(url);
              }
              showToaster(response.data.Message === "Success" ? "Assigned Successfully" : response.data.Message, (response.data.Message === "Success") ? "success" : "error")
            } else {
              showToaster((response.data.Message) ? response.data.Message : "An Error occurred while assigning the Candidate.", 'error');
            }
          })
        )
      } else {
        trackPromise(
          ApiService.getByParams(193, "Curately/Invite/invite_users.jsp", { ...payLoad }).then((response) => {
            if (response?.data?.token) {
              // if ((response.data.Message === "Success") && response.data.token) {
              let url = `${window.location.protocol === "http:" ? "http://localhost:3000" : window.location.origin}/workflow/#/invite/${response.data.token.trim()}`;
              let tempInviteToLinks = inviteToLinks;

              if (!!Object.keys(selectedRows)?.length && Object.keys(selectedRows).length > 1) {
                tempInviteToLinks.push(url);
                setInviteToLinks([...tempInviteToLinks])
              } else {
                window.open(url);
              }
              showToaster(response.data.Message === "Success" ? "Assigned Successfully" : response.data.Message, (response.data.Message === "Success") ? "success" : "error")
            } else {
              showToaster((response.data.Message) ? response.data.Message : "An Error occurred while assigning the Candidate.", 'error');
            }
          })
        )
      }
    } else showToaster("Something went wrong", "error");
  }

  const StageComponent = () => {
    const inviteToProps = {
      stageId: params.jobId as string,
      updated: reloadStage,
      passedStageData: inviteData,
      selectedRows: selectedRows,
      inviteToAssignCB: handleInviteToAssign,
      inviteToLinks
    }
    if (selectedOption === "Screening") {
      return <Suspense fallback={<CircularProgress className="centered" />} ><DataCollection {...inviteToProps} /></Suspense>
    }
    else if (selectedOption === "Video Assessments") {
      return <Suspense fallback={<CircularProgress className="centered" />} ><VideoRecording {...inviteToProps} /></Suspense>
    }
    else if (selectedOption === "Assessments") {
      return <Suspense fallback={<CircularProgress className="centered" />} ><Assessment {...inviteToProps} /></Suspense>
    }
    else if (selectedOption === "Document Signinig") {
      return <Suspense fallback={<CircularProgress className="centered" />} ><DocumentSigning stageId={''} inviteProps={inviteToProps} /></Suspense>
    }
    else if (selectedOption === "Interview") {
      return <Suspense fallback={<CircularProgress className="centered" />} ><Scheduling updated={reloadStage} passedSchedulingData={interviewSchedular} selectedRows={selectedRows} inviteToAssignCB={handleInviteToAssign} inviteToLinks={inviteToLinks} closePopup={handleDialogClose} /></Suspense>
    }
  }

  return (
    <div id='invitePopup'>
      <Button variant="outlined"
        color="secondary"
        // className='mr-2'
        endIcon={<ArrowDropDownIcon />}
        onClick={handleButtonClick}
      // disabled={!!Object.keys(selectedRows)?.length ? (Object.keys(selectedRows).length === 1 ? false : true) : false} >
      //  disabled={(Object.keys(selectedRows).length > 1) ? false : true} > 
      >
        Invite to
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {inviteStagesData.map((each: { typeId: string, typeName: string }, index: number) => (
          <MenuItem key={index} onClick={() => handleMenuItemClick(each)}>
            {each.typeName}
          </MenuItem>
        ))}
        {/* <MenuItem onClick={() => handleMenuItemClick('Screening')}>
          Screening
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Interview')}>
          Interview
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Video Assessment')}>
          Video Assessment
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('Assessment')}>
          Assessment
        </MenuItem> */}
      </Menu>

      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth={true} maxWidth={"md"} className='invite-dialog-container'>
        <DialogTitle className="header">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <span className='addHeader'>
              {selectedOption}
            </span>
            <IconButton
              aria-label="close"
              onClick={handleDialogClose}
              className="closeBtn"
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </DialogTitle>
        <Divider />
        <DialogContent
        >
          {
            StageComponent()
          }
          {/* <Typography className="c-grey fs-13 fw-6">{selectedOption === 'Option 4' ? 'Select assessment' : 'Select video assessment from'}</Typography>
                  {selectedOption === 'Option 4' &&
                      <>
                          <Button
                              variant="outlined"
                              color="secondary"
                              onClick={handleMenuOpen}
                              ref={anchorE2}
                              className="mt-2"
                              endIcon={<ArrowDropDownIcon/>}
                          >
                              Select Assessment
                          </Button>
                          <Menu
                              anchorEl={anchorE2.current}
                              open={menuOpen}
                              onClose={handleMenuClose}
                          >
                              <MenuItem onClick={handleMenuClose}>
                                  Technical Assessment
                              </MenuItem>
                              <MenuItem  onClick={handleMenuClose}>
                                  General Assessment
                              </MenuItem>
                              <MenuItem  onClick={handleMenuClose}>
                                  ABC Video Assessment
                              </MenuItem>
                              <MenuItem onClick={handleMenuClose}>
                                  Test Assessment
                              </MenuItem>
                          </Menu>

                      </>
                  }
                  {selectedOption === 'Option 3' && <RadioGroup row>
            <FormControlLabel 
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontWeight: 'bold',
                },
              }}
            value="Linked Workflow(KT Demo)" control={<Radio />} label="Linked Workflow(KT Demo)"/>
            <FormControlLabel
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontWeight: 'bold',
                },
              }}
             value="other video assessments" control={<Radio />} label="other video assessments" />
                  </RadioGroup>}
                  {selectedOption === 'Option 3' && <Box
            sx={{
              mt: 2,
              bgcolor: '#edf6fb',
              p: 1,
              border: `2px solid  #80b2f8`,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <InfoOutlinedIcon sx={{ mr: 1, color: '#80b2f8' }} />
            <Typography color="textPrimary">
              Invitation will be sent for : <br />
               <span style={{ color: '#80b2f8',fontWeight :'bold' }}>"ABC video Assessment"</span> in <span style={{ color: '#80b2f8',fontWeight :'bold' }}>"KT Demo"</span> work flow 
            </Typography>
                  </Box>} */}

        </DialogContent>
        <Divider />
        {/* <DialogActions sx={{ justifyContent: 'flex-start', paddingLeft:'25px'  }}>
          <Button variant="contained" color="primary" onClick={handleDialogClose}>
            Invite
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          
        </DialogActions> */}
      </Dialog>
    </div >
  );
};

export default Invite;
