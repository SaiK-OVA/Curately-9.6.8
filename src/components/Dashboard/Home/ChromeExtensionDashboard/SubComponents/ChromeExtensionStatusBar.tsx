import { React, useState, useEffect } from "../../../../../shared/modules/React";
// import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";


import { Dialog, CloseIcon, DialogContent, DialogTitle, } from "../../../../../shared/modules/MaterialImports/Dialog";
// import { List, ListItem, ListItemIcon, ListItemText } from "../../../../../shared/modules/MaterialImports/List";
// import { Box } from "../../../../../shared/modules/MaterialImports/Box";
// import { Avatar } from "../../../../../shared/modules/MaterialImports/Avatar";
// import { Typography } from "../../../../../shared/modules/MaterialImports/Typography";
// import { Checkbox } from "../../../../../shared/modules/MaterialImports/FormElements";
// import { IconButton, Button } from "../../../../../shared/modules/MaterialImports/Button";
// import { Tooltip } from "../../../../../shared/modules/MaterialImports/ToolTip";


// import LinearProgress from '@mui/material/LinearProgress';


// import AddIcon from "@mui/icons-material/Add";


import ApiService from "../../../../../shared/api/api";
// import { getShortName } from "../../../../../shared/utils/ShortName";
import { userLocalData } from "../../../../../shared/services/userData";
// import { showToaster } from "../../../../shared/SnackBar/SnackBar";

import Drawer from "@mui/material/Drawer";
import { Grid } from "../../../../../shared/modules/MaterialImports/Grid2";
import { Stack } from "../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../shared/modules/MaterialImports/Typography";
import { IconButton } from "../../../../../shared/modules/MaterialImports/Button";


import InviteTeamMembers from "../../../Settings/Invite/InviteTeamMembers/InviteTeamMembers";

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CloseRounded from '@mui/icons-material/CloseRounded';

import Activitylog from "../../../Reports/Activitylog/Activitylog";

import "./ChromeExtensionStatusBar.scss";
import { DateTime } from "luxon";

// interface Teammate {
//   id: number;
//   name: string;
//   email: string;
//   selected: boolean;
// }


const ChromeExtensionStatusBar = () => {
  // const [openHiPopup, setOpenHiPopup] = React.useState(false);
  const [showInvitePopup, setShowInvitePopup] = React.useState(false);
  const [creditsPopupType, setCreditsPopupType] = React.useState<'' | 'email' | 'phone'>('');
  // const [teamMembersList, setTeamMembersList] = useState<Teammate[]>([]);
  // const [selectAll, setSelectAll] = useState(false);
  // const [invitedList, setInvitedList] = useState<Teammate[]>([]);

  // const [secondaryName, setSecondaryName] = useState("");


  const [credits, setCredits] = useState({
    consumedEmailCredits: 0,
    consumedProfileCredits: 0,
    consumedSmsCredits: 0,
    daysLeft: 0,
    totalEmailCredits: 0,
    totalProfileCredits: 0,
    totalSmsCredits: 0,
    profilePercentage: 0,
    startDate: "",
    expireDate: "",
  });

  const channelToBroadcast = new BroadcastChannel("checkConsumedProfileCredits");

  useEffect(() => {
    channelToBroadcast.onmessage = ev => {
      // console.log(ev);
      if (ev.data.checkCreditScore && userLocalData.getvalue('recrId')) {
        getCredits();
      }
    };

  }, []);

  useEffect(() => {
    // const userEmail = userLocalData.getvalue('email');
    // if (userEmail.split('@')[1]) {
    //   getDomainRecruitersList();
    // } else {
    getCredits();
    // }
  }, []);

  // const getDomainRecruitersList = (invitedRecruiterDetails: any) => {
  //   trackPromise(
  //     ApiService.postWithData('admin', 'getDomainsRecruiterDetails', { domain: userLocalData.getvalue('email').split('@')[1], recrId: userLocalData.getvalue('recrId') }).then((response) => {
  //       if (response.data.Success) {
  //         const objFind = response.data.domainRecruiterDetails.find((obj: { domain: string }) => { return obj.domain === userLocalData.getvalue('email').split('@')[1] });
  //         if (objFind?.domain) {
  //           let invitedRecruiterList: Teammate[] = [];
  //           for (let ir = 0; ir < invitedRecruiterDetails.length; ir++) {
  //             invitedRecruiterList.push({
  //               email: invitedRecruiterDetails[ir].email,
  //               id: invitedRecruiterDetails[ir].recrId,
  //               name: invitedRecruiterDetails[ir].recruiterName,
  //               selected: true
  //             })

  //           }
  //           if (invitedRecruiterList.length) {
  //             setInvitedList(invitedRecruiterList);
  //           }
  //           let recruiterDeatils: Teammate[] = [];
  //           for (let rd = 0; rd < objFind.recruiterDetails.length; rd++) {
  //             if (objFind.recruiterDetails[rd].recruiterName && objFind.recruiterDetails[rd].recrId) {
  //               const idExists = invitedRecruiterList.some(e => e.id === objFind.recruiterDetails[rd].recrId);
  //               if (!idExists) {
  //                 recruiterDeatils.push({
  //                   name: objFind.recruiterDetails[rd].recruiterName,
  //                   email: objFind.recruiterDetails[rd].email,
  //                   id: objFind.recruiterDetails[rd].recrId,
  //                   selected: false
  //                 })
  //               }
  //             }
  //           }
  //           setTeamMembersList(recruiterDeatils);
  //           // if (recruiterDeatils.length) {
  //           //   // M.Vali and +23 others are
  //           //   if (recruiterDeatils.length === 1) {
  //           //     setSecondaryName(`${recruiterDeatils[0].name} is already member of this orgnization`);
  //           //     // setSecondaryName(`M.Vali and +23 others are already member of this orgnization`);
  //           //   } else {
  //           //     setSecondaryName(`${recruiterDeatils[0].name} and +${recruiterDeatils.length - 1} others are already member of this orgnization`);
  //           //   }
  //           //   if (!localStorage.getItem('openHiPopup')) {
  //           //     setOpenHiPopup(true);
  //           //     localStorage.setItem('openHiPopup', 'true');
  //           //   }

  //           // }
  //         }
  //       }
  //     })
  //   )
  // }


  const getCredits = () => {
    // https://qaadminapi.curately.ai/curatelyAdmin/getCredits/7/3291
    ApiService.getById('admin', `getCredits/${userLocalData.getvalue('clientId')}`, userLocalData.getvalue('recrId')).then((response) => {
      // console.log(response.data);
      if (response.data.Success) {
        setCredits({
          consumedEmailCredits: response.data.consumedEmailCredits,
          consumedProfileCredits: response.data.consumedProfileCredits,
          consumedSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.consumedSmsCredits,
          daysLeft: response.data.daysLeft,
          totalEmailCredits: response.data.totalEmailCredits,
          totalProfileCredits: response.data.totalProfileCredits,
          totalSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.totalSmsCredits,
          profilePercentage: ((response.data.consumedProfileCredits / response.data.totalProfileCredits) * 100),
          startDate: response.data.startDate ? DateTime.fromFormat(response.data.startDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : "",
          expireDate: response.data.expireDate ? DateTime.fromFormat(response.data.expireDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : ""
        });
        localStorage.setItem(`credits_${userLocalData.getvalue('recrId')}`, JSON.stringify({
          consumedEmailCredits: response.data.consumedEmailCredits,
          consumedProfileCredits: response.data.consumedProfileCredits,
          consumedSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.consumedSmsCredits,
          daysLeft: response.data.daysLeft,
          totalEmailCredits: response.data.totalEmailCredits,
          totalProfileCredits: response.data.totalProfileCredits,
          totalSmsCredits: ((response.data.paymentType === 1) || (response.data.paymentType === 2)) ? 0 : response.data.totalSmsCredits,
          profilePercentage: ((response.data.consumedProfileCredits / response.data.totalProfileCredits) * 100),
          isPackageEmailValidity: Number(response.data.totalEmailCredits) ? (Number(response.data.totalEmailCredits) > Number(response.data.consumedEmailCredits)) ? true : false : false,
          isPackagePhoneValidity: ((response.data.paymentType !== 1) && (response.data.paymentType !== 2) && Number(response.data.totalSmsCredits)) ? (Number(response.data.totalSmsCredits) - Number(response.data.consumedSmsCredits)) ? true : false : false,
          startDate: response.data.startDate ? DateTime.fromFormat(response.data.startDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : "",
          expireDate: response.data.expireDate ? DateTime.fromFormat(response.data.expireDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : ""
        }));




        // getDomainRecruitersList(response.data.invitedRecruiterDetails);
      }
    })
  }

  const closeInvitePopup = () => {
    // setOpenHiPopup(false);
    setShowInvitePopup(false);
  };

  // const handleClick = () => {
  //   setShowInvitePopup(true);
  // };

  // const handleSelectTeammate = (id: number) => {
  //   const updatedTeammates = teamMembersList.map((teammate) =>
  //     teammate.id === id
  //       ? { ...teammate, selected: !teammate.selected }
  //       : teammate
  //   );
  //   setTeamMembersList(updatedTeammates);

  //   const allSelected = updatedTeammates.every((teammate) => teammate.selected);
  //   setSelectAll(allSelected);
  // };
  // const handleSelectAll = () => {
  //   const newSelectAll = !selectAll;
  //   setSelectAll(newSelectAll);
  //   setTeamMembersList((prev) =>
  //     prev.map((teammate) => ({ ...teammate, selected: newSelectAll }))
  //   );
  // };
  // const handleInvite = () => {

  //   const selectedTeammates = [...invitedList, ...teamMembersList.filter((teammate) => teammate.selected)];

  //   if (selectedTeammates.length) {
  //     trackPromise(
  //       ApiService.postWithData('admin', 'saveOrUpdateInviteRecruiterGroup', {
  //         recrId: userLocalData.getvalue('recrId'),
  //         inviteRecrIds: selectedTeammates.map((o) => o.id).join()
  //       }).then((response) => {
  //         if (response.data.Success) {
  //           showToaster('Teammates are invited successfully.', 'success');
  //           setInvitedList(() => [...selectedTeammates]);
  //           setTeamMembersList(teamMembersList.filter((teammate) => !teammate.selected));
  //           setSelectAll(false);
  //           closeInvitePopup();
  //         }
  //       })
  //     )
  //   } else {
  //     showToaster('Please select atleast one Teammate', 'error');
  //   }
  // };

  // const closeHiPopup = () => {
  //   setOpenHiPopup(false);
  // }

  const closeCreditsPopup = () => {
    setCreditsPopupType("");
  }


  return (
    (<div id="ChromeExtension_Header">
      <div className={`progress_bar ${credits.consumedProfileCredits ? 'cursor-pointer' : ''}`} onClick={() => {
        if (credits.consumedProfileCredits) {
          setCreditsPopupType('email');
        }
      }}>
        <div className="progress_bar_sub">
          <MailOutlineOutlinedIcon className="mr-2" />
          <div><span className={credits.consumedProfileCredits ? "c-skyblue fw-6" : ""}>{credits.consumedProfileCredits}</span>/{credits.totalProfileCredits}</div>
          {/* <div style={{ color: "#f46969" }}>{credits.daysLeft} days</div> */}
        </div>
        {/* <LinearProgress variant="determinate" value={credits.profilePercentage} /> */}
      </div>
      {
        credits.totalSmsCredits ?
          <div className={`progress_bar ${credits.consumedSmsCredits ? 'cursor-pointer' : ''}`} onClick={() => {
            if (credits.consumedSmsCredits) {
              setCreditsPopupType('phone');
            }
          }}>
            <div className="progress_bar_sub">
              <CallOutlinedIcon className="mr-2" />
              <div><span className={credits.consumedSmsCredits ? "c-skyblue fw-6" : ""}>{credits.consumedSmsCredits}</span>/{credits.totalSmsCredits}</div>
            </div>
          </div>
          :
          null
      }
      {/* <Box className="invite_teammate">
        // <Box flex={1}>
        //   <LinearProgress variant="determinate" value={50} />
        // </Box> 
        {
          invitedList.length > 4 ?
            <>
              <Tooltip title={`+ ${invitedList.length - 4}`}>
                <Avatar sx={{ bgcolor: "#3f51b5", fontSize: 12, marginRight: "-10px", width: 30, height: 30 }} >
                  + {invitedList.length - 4}
                </Avatar>
              </Tooltip>
              {
                invitedList.slice(0, 4).map((teammate) => (
                  <Tooltip title={teammate.name} key={teammate.id}>
                    <Avatar key={teammate.id} sx={{ bgcolor: "#3f51b5", fontSize: 12, marginRight: "-10px", width: 30, height: 30 }} >
                      {getShortName(teammate.name)}
                    </Avatar>
                  </Tooltip>
                ))
              }
            </>
            :
            invitedList.map((teammate) => (
              <Tooltip title={teammate.name} key={teammate.id}>
                <Avatar key={teammate.id} sx={{ bgcolor: "#3f51b5", fontSize: 12, marginRight: "-10px", width: 30, height: 30 }} >
                  {getShortName(teammate.name)}
                </Avatar>
              </Tooltip>
            ))
        }
        {
          teamMembersList.length ?
            <Tooltip title={'Invite teammates'}>
              <Box className="add_icon" onClick={handleClick}
                sx={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", backgroundColor: "#007bff", }}
              >
                <AddIcon className="addIcon" sx={{ color: "#fff" }} />
              </Box>
            </Tooltip>
            :
            null
        }
      </Box> */}
      {showInvitePopup && (
        (<Dialog open={showInvitePopup} onClose={closeInvitePopup} >
          <DialogTitle id="alert-dialog-title">
            <Grid container direction="row" justifyContent="space-between" alignItems="center" >
              <span className='addHeader'>
                Invite Team Members
              </span>
              <CloseIcon onClick={closeInvitePopup} />

            </Grid>
          </DialogTitle>
          <DialogContent sx={{ minWidth: 500 }} className='pt-4'>
            <InviteTeamMembers closeInvitePopup={(refresh) => {
              if (refresh) {
                getCredits();
              }
              closeInvitePopup();
            }} />
          </DialogContent>
        </Dialog>)
        // <Dialog open={showInvitePopup}>
        //   <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Invite Your Teammates</DialogTitle>
        //   <IconButton aria-label="close" onClick={closeInvitePopup} sx={(theme) => ({ position: "absolute", right: 8, top: 8, color: theme.palette.grey[500] })} >
        //     <CloseIcon style={{ fontSize: "28px" }} />
        //   </IconButton>
        //   <DialogContent dividers>
        //     <Typography gutterBottom> We found your teammates already using curately. Invite them to access this project.</Typography>
        //     <List className="teammateList">
        //       <ListItem>
        //         <ListItemIcon>
        //           <Checkbox checked={selectAll} onChange={handleSelectAll} />
        //         </ListItemIcon>
        //         <ListItemText primary="Select All" />
        //       </ListItem>
        //       {teamMembersList.map((teammate) => (
        //         <ListItem key={teammate.id}>
        //           <ListItemIcon>
        //             <Checkbox checked={teammate.selected} onChange={() => handleSelectTeammate(teammate.id)} />
        //           </ListItemIcon>
        //           <Avatar sx={{ bgcolor: "#8787cc", marginRight: 1 }}>{getShortName(teammate.name)}</Avatar>
        //           <ListItemText primary={teammate.name} secondary={teammate.email} />
        //         </ListItem>
        //       ))}
        //     </List>
        //   </DialogContent>
        //   <DialogActions className="Invite_to_project">
        //     <Button onClick={handleInvite} variant="contained" color="primary" >Invite</Button>
        //   </DialogActions>
        // </Dialog>
      )}
      {/* {openHiPopup && (
        <Dialog open={openHiPopup}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Say Hi to your team</DialogTitle>
          <IconButton aria-label="close" onClick={closeHiPopup} sx={(theme) => ({ position: "absolute", right: 8, top: 8, color: theme.palette.grey[500], })}>
            <CloseIcon style={{ fontSize: "28px" }} />
          </IconButton>
          <DialogContent dividers>
            <Typography gutterBottom>We found your Team Members List already using curately. Join them in their projects.</Typography>
            <Box className="popup_box_container">
              <div>
                <div className="popup_box_subdiv">
                  <ListItem>
                    <Avatar sx={{ bgcolor: "#000", marginRight: 1 }}>
                      {getShortName(userLocalData.getvalue('clientName'))}
                    </Avatar>
                    <ListItemText className="primary_secondary">
                      <div className="primary_name">{userLocalData.getvalue('clientName')}</div>
                      <div style={{ color: "gray" }}>{secondaryName}</div>
                    </ListItemText>
                  </ListItem>
                </div>
                <div className="popup_box_sub">
                  <Button autoFocus variant="contained" color="primary" className="request_button" onClick={() => { closeHiPopup(); setShowInvitePopup(true); }} >Request to Join</Button>
                  <Button onClick={closeHiPopup} sx={{ color: "gray" }} className="remind_button" >Remind me later</Button>
                </div>
              </div>
            </Box>
          </DialogContent>
        </Dialog>
      )} */}
      {
        creditsPopupType ?

          <Drawer open={Boolean(creditsPopupType)} sx={{ zIndex: 999, height: "100vh", }} onClose={() => { closeCreditsPopup() }} anchor='right' id="creditsPopup">
            <Stack width={"1100px"} minHeight={"100vh"} position={"relative"}>
              <Stack width={"1100px"} direction={"row"} justifyContent={"space-between"} alignItems={"center"} className='creditsPopupHeader'>
                <Typography variant='h6' className=" tt-capital">{creditsPopupType} - Credits</Typography>
                <IconButton size='small' onClick={() => { closeCreditsPopup() }}><CloseRounded /></IconButton>
              </Stack>
              <div className="creditsBody">
                <Activitylog type={creditsPopupType} closeInvitePopup={() => {
                  closeCreditsPopup();
                }} />
              </div>
            </Stack>
          </Drawer >
          :
          null
      }


    </div>)
  );
};

export default ChromeExtensionStatusBar;
