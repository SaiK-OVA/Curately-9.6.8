// import React, { useContext, useState } from "react";
import { React, useState } from "../../../../../../shared/modules/React";
import { Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { Button } from "../../../../../../shared/modules/MaterialImports/Button";
import { Card } from "../../../../../../shared/modules/MaterialImports/Card";
import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
// import LoopIcon from '@mui/icons-material/Loop';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
// import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AddIcon from '@mui/icons-material/Add';
// import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import ApartmentIcon from '@mui/icons-material/Apartment';
// import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
// import LinearProgress from '@mui/material/LinearProgress';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import PeopleIcon from '@mui/icons-material/People';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Research from "./Research/Research";
import ExistingContacts from "./ExistingContacts/ExistingContacts";
import Sequence from "./Sequence/Sequence";
import CustomFields from "./CustomFields/CustomerFields";
import Opportunities from "./Opportunities/Opportunities";
import { styled } from '@mui/material/styles';
import { Radio, RadioGroup, Checkbox } from '../../../../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel, FormControl, TextField } from '../../../../../../shared/modules/MaterialImports/FormInputs';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Autocomplete from '@mui/material/Autocomplete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Menu } from '../../../../../../shared/modules/MaterialImports/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import CloudIcon from '@mui/icons-material/Cloud';
// import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import apiService from "../../shared/api/apiService";
import { CircularProgress } from '../../../../../../shared/modules/MaterialImports/CircularProgress';
// import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import MuiAlert from "@mui/material/Alert";
// import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
// import MobileFriendlyOutlinedIcon from "@mui/icons-material/MobileFriendlyOutlined";

import './Contacts.scss'
// import { Store } from "../DataLabs/DataLabs";


const BpIcon = styled("span")((
  // { theme }
) => ({
  borderRadius: 1,
  width: 16,
  height: 16,
  backgroundColor: '#ffffff',
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#146EF6',
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""'
  },
});

const RadioBpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark" ? "red" : "inset 0 0 0 1px #CACACC"
}));

const RadioBpCheckedIcon = styled(RadioBpIcon)({
  backgroundColor: '#146EF6',
  boxShadow: 'none',
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""'
  }
});

const BpCheckboxContainer = styled("div")({
  '.bp-icon': {
    border: "1px #CACACC solid",
  },
  "& .bp-checkbox:hover .bp-icon": {
    borderColor: '#146EF6',
  }
});

const labels = [
  { label: 'Buyer intent 7-19', id: 1 },
  { label: 'NJ Now hiring 7-18', id: 2 },
  { label: 'KMQ', id: 3 },
  { label: 'NY Indeed Hiring', id: 4 },
  { label: 'MSP_List', id: 5 },
  { label: "AGS New", id: 6 },
  { label: 'CCWJULY23', id: 7 },
  {
    label: 'CCW Booth Lead',
    id: 8,
  },
  { label: 'CCW Attendee_2', id: 9 },
  { label: 'Arizone - CXJobs', id: 10 },
  {
    label: 'Georgia - CXJobs',
    id: 11,
  },
  {
    label: 'San Antonio - CXJobs',
    id: 12,
  },
  { label: 'Austin - CXJobs', id: 13 },
  { label: 'Onsite - CXJobs', id: 14 },
  {
    label: 'Remote - CXJobs',
    id: 15,
  },
  { label: "Dallas - CXJobs", id: 16 }

];

const Contacts = () => {

  const [isReSearch, setIsReSearch] = useState(true);
  // const [searchData, setSearchData] = useContext(Store)
  const [isExistingContacts, setIsExistingContacts] = useState(false);
  const [isSequnece, setIsSequnece] = useState(false);
  const [isCustomFields, setIsCustomFields] = useState(false);
  const [isOpportunities, setIsOpportunities] = useState(false);
  const [selectedRadiovalue, setSelectedRadioValue] = useState('Note');
  const [isRadioNote, setIsRadioNote] = useState(true);
  const [isRadioCall, setIsRadioCall] = useState(false);
  const [isRadioAction, setIsRadioAction] = useState(false);
  const [isRadioTask, setIsRadioTask] = useState(false);
  const [isContact, setIsContact] = useState(true)
  const [isAccount, setIsAccount] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [callText, setCallText] = useState('')
  const [actionText, setActionText] = useState('')
  const [tastText, setTaskText] = useState('')
  const [isNameHover, setIsNameHover] = useState(false)
  const [isMailHover, setIsMailHover] = useState(false)
  const [isCallHover, setIsCallHover] = useState(false)
  const [isCompanyHover, setIsCompanyHover] = useState(false)
  const [isContactStageHover, setIsContactStageHover] = useState(false)
  const [isContactOwnerHover, setIsContactOwnerHover] = useState(false)
  const [isLocationHover, setIsLocationHover] = useState(false)
  const [isLocalTimeHover, setIsLocalTimeHover] = useState(false)
  const [isHideActivities, setIsHideActivities] = useState(true)
  const [NameEditanchorEl, setNameEditAnchorEl] = React.useState<null | HTMLElement>(null);
  const [addSequenceanchorEl, setAddSequenceAnchorEl] = React.useState<null | HTMLElement>(null);
  const [crmanchorEl, setCRMAnchorEl] = React.useState<null | HTMLElement>(null);
  const [MoreanchorEl, setMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [addtolistanchorEl, setAddToListAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pinNoteChecked, setPinNoteChecked] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [isRecordSavedAccuick, setIsRecordSavedAccuick] = React.useState(false);
  // const [apiLoading, setApiLoading] = React.useState(false);

  const [profileData, setProfileData] = useState(
    {
      "id": "",
      "full_name": "",
      "first_name": "",
      "middle_initial": "",
      "middle_name": null,
      "last_initial": "",
      "last_name": "",
      "gender": "",
      "birth_year": 1985,
      "birth_date": null,
      "linkedin_url": "",
      "linkedin_username": "",
      "linkedin_id": "",
      "facebook_url": "",
      "facebook_username": "",
      "facebook_id": "",
      "twitter_url": "",
      "twitter_username": "",
      "github_url": null,
      "github_username": null,
      "work_email": "",
      "personal_emails": [],
      "recommended_personal_email": "",
      "mobile_phone": "",
      "industry": "",
      "job_title": "",
      "job_title_role": null,
      "job_title_sub_role": null,
      "job_title_levels": [],
      "job_company_id": "",
      "job_company_name": "",
      "job_company_website": "",
      "job_company_size": "",
      "job_company_founded": 1999,
      "job_company_industry": "",
      "job_company_linkedin_url": "",
      "job_company_linkedin_id": "",
      "job_company_facebook_url": "",
      "job_company_twitter_url": "",
      "job_company_location_name": "",
      "job_company_location_locality": "",
      "job_company_location_metro": "",
      "job_company_location_region": "",
      "job_company_location_geo": "",
      "job_company_location_street_address": "",
      "job_company_location_address_line_2": null,
      "job_company_location_postal_code": "",
      "job_company_location_country": "",
      "job_company_location_continent": "",
      "job_last_updated": "",
      "job_start_date": "",
      "location_name": "",
      "location_locality": "",
      "location_metro": "",
      "location_region": "",
      "location_country": "",
      "location_continent": "",
      "location_street_address": "",
      "location_address_line_2": null,
      "location_postal_code": "",
      "location_geo": "",
      "location_last_updated": "",
      "phone_numbers": [],
      "emails": [],
      "interests": [],
      "skills": [],
      "location_names": [],
      "regions": [],
      "countries": [],
      "street_addresses": [],
      "experience": [],
      "education": [],
      "profiles": [],
      "version_status": {
        "status": "",
        "contains": [],
        "previous_version": "",
        "current_version": ""
      }
    }
  );

  // const openAddSequenceBtn = Boolean(addSequenceanchorEl);
  // const openCRMBtn = Boolean(crmanchorEl);
  // const openMoreBtn = Boolean(MoreanchorEl);
  // const openAddToListenBtn = Boolean(addtolistanchorEl);
  const openNameEdit = Boolean(NameEditanchorEl);
  const { id } = useParams();


  const handleHideActivities = () => {
    setIsHideActivities(!isHideActivities)
  }

  const handleClickNameEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNameEditAnchorEl(event.currentTarget);
  };

  // const handleClickAddToListen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAddToListAnchorEl(event.currentTarget);
  // };

  // const handleClickAddSequenceBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAddSequenceAnchorEl(event.currentTarget);
  // };

  // const submitToAccuick = () => {
  //   setApiLoading(true);
  //   // // newChecked.map()
  //   // const newChecked = [...checked];
  //   // const filteredData1 = displayData.filter((item, index) => newChecked[index]);
  //   // const filteredData2 = filteredData1.map((item, index) => item.id);
  //   // // const filteredData = displayData.map((item, index) => {
  //   // //   if (newChecked[index]) {
  //   // //     return item.id;
  //   // //   }
  //   // //   // return false
  //   // // });
  //   // // displayData
  //   // if(!filteredData2.length){
  //   //   setApiLoading(false);
  //   //   return
  //   // }
  //   let dataToPass = {
  //     recrId: parseInt(searchData.userId),
  //     "companyId": "12938",//localStorage.getItem("companyId"),
  //     "clientId": localStorage.getItem("clientId"),
  //     "personIds": [id]
  //   }
  //   apiService.saveToAccuick(dataToPass).then((
  //     // response: any
  //   ) => {
  //     setApiLoading(false);
  //     setIsRecordSavedAccuick(true);

  //   });

  // }

  const closeRestore = () => {
    setIsRecordSavedAccuick(false);
  }

  // const handleClickCRMBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setCRMAnchorEl(event.currentTarget);
  // };

  // const handleClickMoreBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setMoreAnchorEl(event.currentTarget);
  // };

  const handleProfileMenuClose = () => {
    setAddSequenceAnchorEl(null);
    setCRMAnchorEl(null);
    setMoreAnchorEl(null);
    setAddToListAnchorEl(null);
    setNameEditAnchorEl(null)
  };



  const handleContactStageHoverEnter = () => {
    setIsContactStageHover(true)
    setIsContactOwnerHover(false)
    setIsLocationHover(false)
    setIsLocalTimeHover(false)
    setIsNameHover(false)
    setIsMailHover(false)
    setIsCallHover(false)
    setIsCompanyHover(false)
  }

  const handleContactOwnerHoverEnter = () => {
    setIsContactStageHover(false)
    setIsContactOwnerHover(true)
    setIsLocationHover(false)
    setIsLocalTimeHover(false)
    setIsNameHover(false)
    setIsMailHover(false)
    setIsCallHover(false)
    setIsCompanyHover(false)
  }

  const handleLocationHoverEnter = () => {
    setIsContactStageHover(false)
    setIsContactOwnerHover(false)
    setIsLocationHover(true)
    setIsLocalTimeHover(false)
    setIsNameHover(false)
    setIsMailHover(false)
    setIsCallHover(false)
    setIsCompanyHover(false)
  }

  const handleLocalTimeHoverEnter = () => {
    setIsContactStageHover(false)
    setIsContactOwnerHover(false)
    setIsLocationHover(false)
    setIsLocalTimeHover(true)
    setIsNameHover(false)
    setIsMailHover(false)
    setIsCallHover(false)
    setIsCompanyHover(false)
  }

  const handleNameHoverEnter = () => {
    setIsNameHover(true)
    setIsMailHover(false)
    setIsCallHover(false)
    setIsCompanyHover(false)
    setIsContactStageHover(false)
    setIsContactOwnerHover(false)
    setIsLocationHover(false)
    setIsLocalTimeHover(false)
  }

  const handleMailHoverEnter = () => {
    setIsNameHover(false)
    setIsMailHover(true)
    setIsCallHover(false)
    setIsCompanyHover(false)
    setIsContactStageHover(false)
    setIsContactOwnerHover(false)
    setIsLocationHover(false)
    setIsLocalTimeHover(false)

  }

  const handleCallHoverEnter = () => {
    setIsNameHover(false)
    setIsMailHover(false)
    setIsCallHover(true)
    setIsCompanyHover(false)
    setIsContactStageHover(false)
    setIsContactOwnerHover(false)
    setIsLocationHover(false)
    setIsLocalTimeHover(false)

  }

  const handleCompanyHoverEnter = () => {
    setIsNameHover(false)
    setIsMailHover(false)
    setIsCallHover(false)
    setIsCompanyHover(true)
    setIsContactStageHover(false)
    setIsContactOwnerHover(false)
    setIsLocationHover(false)
    setIsLocalTimeHover(false)

  }

  const handleHoverLeave = () => {
    setIsNameHover(false)
    setIsMailHover(false)
    setIsCallHover(false)
    setIsCompanyHover(false)
    setIsContactStageHover(false)
    setIsContactOwnerHover(false)
    setIsLocationHover(false)
    setIsLocalTimeHover(false)

  }

  const handleNoteChange = (event: any) => {
    setNoteText(event.target.value);
  };
  const handleCallChange = (event: any) => {
    setCallText(event.target.value);
  };
  const handleActionChange = (event: any) => {
    setActionText(event.target.value);
  };
  const handleTaskChange = (event: any) => {
    setTaskText(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue((event.target as HTMLInputElement).value);
  };

  const onclickContact = () => {
    setIsContact(true)
    setIsAccount(false)
  }

  const onclickAccount = () => {
    setIsContact(false)
    setIsAccount(true)
  }

  const onClickRadioNote = () => {
    setIsRadioNote(true)
    setIsRadioCall(false)
    setIsRadioAction(false)
    setIsRadioTask(false)
    setSelectedRadioValue('Note')
  }

  const onClickRadioCall = () => {
    setIsRadioNote(false)
    setIsRadioCall(true)
    setIsRadioAction(false)
    setIsRadioTask(false)
    setSelectedRadioValue('Call')
  }

  const onClickRadioAction = () => {
    setIsRadioNote(false)
    setIsRadioCall(false)
    setIsRadioAction(true)
    setIsRadioTask(false)
    setSelectedRadioValue('Action')
  }

  const onClickRadioTask = () => {
    setIsRadioNote(false)
    setIsRadioCall(false)
    setIsRadioAction(false)
    setIsRadioTask(true)
    setSelectedRadioValue('Task')
  }

  const onClickReSearch = () => {
    setIsReSearch(true);
    setIsExistingContacts(false);
    setIsSequnece(false);
    setIsCustomFields(false);
    setIsOpportunities(false);
  };


  const onClickExistingContacts = () => {
    setIsExistingContacts(true);
    setIsReSearch(false);
    setIsSequnece(false);
    setIsCustomFields(false);
    setIsOpportunities(false);
  };

  const onClickSequnece = () => {
    setIsReSearch(false);
    setIsExistingContacts(false);
    setIsSequnece(true);
    setIsCustomFields(false);
    setIsOpportunities(false);
  };

  const onClickCustomFields = () => {
    setIsReSearch(false);
    setIsExistingContacts(false);
    setIsSequnece(false);
    setIsCustomFields(true);
    setIsOpportunities(false);
  };

  const onClickOpportunities = () => {
    setIsReSearch(false);
    setIsExistingContacts(false);
    setIsSequnece(false);
    setIsCustomFields(false);
    setIsOpportunities(true);
  };

  const handleChangePinNoteChecked = (event: any) => {
    setPinNoteChecked(event.target.checked);
  };

  const getProfileDetails = () => {
    // send value to the backend
    if (!localStorage["profile" + id]) {
      setContactLoading(true)
      let dataToPass = {
        'personId': id,
      };

      apiService.getProfileData(dataToPass).then((response: any) => {
        setContactLoading(false)
        // debugger
        if (response.data && response.data.data) {
          setProfileData(response.data.data);
          setContactLoading(false)
          console.log('profileData', profileData);
        }
      });

    } else {
      setProfileData(JSON.parse(localStorage["profile" + id]));
      setContactLoading(false)

    }
  };

  React.useEffect(() => {
    setContactLoading(true)
    getProfileDetails();
  }, [])


  const mobileset: string = profileData.mobile_phone

  const formattedMobile = mobileset ? `(${mobileset.slice(2, 5)})-${mobileset.slice(5, 8)}-${mobileset.slice(8)}` : ``;

  const filteredExperiences = profileData.experience.filter((emp: any) => emp.company.name === profileData.job_company_name);
  console.log(filteredExperiences)

  return (<>
    {
      contactLoading ? (
        <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }} >
          <CircularProgress sx={{ color: '#146EF6' }} />
        </Box >
      ) : (
        <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', mt: '15px', cursor: 'default' }}
          ml='8%' mr='8%'>
          <Stack sx={{ width: '70%' }}>
            <Snackbar
              id="sfdf"
              onClose={closeRestore}
              open={isRecordSavedAccuick}
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MuiAlert
                elevation={6}
                variant="filled"
                icon={
                  <MarkEmailReadOutlinedIcon
                    sx={{
                      color: "#ffffff",
                      fontSize: "20px",
                    }}
                  />
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#2e7d32",
                  width: "250px",
                  // '& .MuiButtonBase-root.MuiIconButton-root': {
                  //   '&:hover': {
                  //     backgroundColor: '#ffffff'
                  //   }
                  // },

                  "& .MuiAlert-message": {
                    fontSize: "14px",
                    fontFamily: "Segoe UI",
                    fontWeight: 600,
                    color: "#ffffff",
                  },
                }}
              >
                Record stored successfull
              </MuiAlert>
            </Snackbar>
            <Card sx={{ pt: 3, pb: 0, pl: 3, height: 'auto', mb: 2, boxShadow: '0 0 5px 5px rgba(0, 0, 0, 0.2)' }}>
              <Stack sx={{
                display: 'flex', flexDirection: 'row', width: '100%',
                textTransform: 'capitalize'
              }}>
                <Stack sx={{ width: '50%' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', width: '40%' }}
                    onMouseEnter={handleNameHoverEnter}
                    onMouseLeave={handleHoverLeave}
                  >
                    <Typography sx={{
                      fontSize: '20px',
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: '600',
                      lineHeight: '26.6px',
                      color: '#1A1A1A',
                      marginBottom: '5px',
                      mr: '5px',
                      whiteSpace: 'nowrap'
                    }} variant="h6">{profileData.full_name}</Typography>
                    {isNameHover &&
                      <Box>
                        <Button
                          id="name-edit-btn"
                          aria-controls={openNameEdit ? 'name-edit-btn-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={openNameEdit ? 'true' : undefined}
                          onClick={handleClickNameEdit}
                          disableRipple
                          startIcon={<BorderColorIcon sx={{ fontSize: '15px' }} />}
                          sx={{
                            height: '25px',
                            width: '65px',
                            boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)',
                            textTransform: 'capitalize',
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: 600,
                            fontSize: '14px',
                            backgroundColor: openNameEdit === true ? "#F7F7F7" : '#FFFFFF',
                            color: openNameEdit === true ? '#146EF6' : '#CACACC',
                            '& .MuiButton-startIcon>*:nth-of-type(1)': {
                              fontSize: '12px'
                            },
                            '&:hover': {
                              backgroundColor: '#F7F7F7',
                              color: '#146EF6',
                            }
                          }}
                        >
                          Edit
                        </Button>
                        <Menu
                          id="name-edit-btn-menu"
                          anchorEl={NameEditanchorEl}
                          open={openNameEdit}
                          onClose={handleProfileMenuClose}
                          MenuListProps={{
                            'aria-labelledby': 'name-edit-btn',
                          }}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                          }}
                          PaperProps={{
                            style: { overflow: "visible" }
                          }}
                          sx={{
                            width: '300px',
                            // height: '140px',
                            '& .MuiInputBase-input.MuiOutlinedInput-input': {
                              padding: '4px 5px'
                            },
                            '& .MuiList-root.MuiMenu-list': {
                              p: 0
                            }
                          }}
                        >

                          <Box sx={{ border: '1px solid #CACACC', borderRadius: '3px' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                              <TextField
                                sx={{
                                  mb: '5px',
                                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#146EF6',
                                  },
                                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#CACACC',
                                    borderWidth: '1px',
                                  },
                                }}
                              />
                              <TextField
                                sx={{
                                  mb: '5px',
                                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#146EF6',
                                  },
                                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#CACACC',
                                    borderWidth: '1px',
                                  },
                                }}
                              />
                            </Box>
                            <Box sx={{ borderTop: '1px solid #E6E6E6' }}></Box>
                            <Stack direction='row' sx={{ p: 1, backgroundColor: '#F7F7F7' }} >
                              <Button variant="outlined"
                                disableRipple
                                onClick={handleProfileMenuClose}
                                sx={{
                                  width: '138px',
                                  height: '31px',
                                  m: '1px',
                                  textTransform: 'capitalize',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  color: '#1A1A1A',
                                  borderColor: '#CACACC',
                                  backgroundColor: '#FBFBFD',
                                  boxShadow: '0px',
                                  '&:hover': {
                                    borderColor: '#146EF6',
                                    color: '#146EF6',
                                    backgroundColor: '#ffffff',
                                  }
                                }}
                              >
                                Cancel
                              </Button>
                              <Button variant="contained"
                                disableRipple
                                sx={{
                                  width: '134px',
                                  height: '31px',
                                  m: '1px',
                                  textTransform: 'capitalize',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  color: '#ffffff',
                                  backgroundColor: '#146EF6',
                                  boxShadow: '0px',
                                  '&:hover': {
                                    backgroundColor: '#0852C2',
                                    color: '#ffffff'
                                  }
                                }}
                              >
                                Save
                              </Button>
                            </Stack>
                          </Box>
                        </Menu>
                      </Box>
                    }
                  </Box>
                  <Typography component='p' sx={{
                    mb: 2, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontWeight: 600,
                    fontSize: '14px',
                    color: '#1A1A1A',
                  }}>
                    {profileData.job_title} at <Box component='span'
                      sx={{
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#146EF6'
                      }}
                    >
                      {profileData.job_company_name} {profileData.job_company_location_name}
                    </Box>
                  </Typography>
                  {/* <Button variant="contained"
                    id='addseqbtn'
                    aria-controls={openAddSequenceBtn ? 'addseqbtnmenu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAddSequenceBtn ? 'true' : undefined}
                    onClick={submitToAccuick}
                    disableRipple
                    sx={{
                      mb: 2, textTransform: 'capitalize', backgroundColor: openAddSequenceBtn === true ? '#0852C2' : '#146EF6', fontWeight: 700,
                      fontSize: '14px',
                      color: '#ffffff',
                      height: '32px',
                      width: 'auto',
                      boxShadow: '0',
                      '&:hover': {
                        backgroundColor: '#0852C2',
                        color: '#ffffff',
                        boxShadow: '0'
                      },

                    }}
                    startIcon={<SendOutlinedIcon />}
                  >
                    Save To Accuick 
                    {apiLoading && <CircularProgress size={15} sx={{
                      color:"#ffffff",
                      ml:"10px"
                    }}/> }
                  </Button>
                  <Menu
                    id="addseqbtnmenu"
                    anchorEl={addSequenceanchorEl}
                    open={openAddSequenceBtn}
                    onClose={handleProfileMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'addseqbtn',
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center"
                    }}
                    PaperProps={{
                      style: { overflow: "visible" }
                    }}
                    sx={{
                      width: "327px",
                      height: '175px',
                      borderRadius: '3px',
                      marginTop: '2px',
                      padding: '15px',
                      '& .MuiList-root': {
                        paddingTop: '0px',
                        paddingBottom: '0px',

                      },
                      '& .MuiMenuItem-root': {
                        lineHeight: '17px',
                        color: '#474747',
                        fontSize: '14px',
                        // paddingTop: '0px',
                        // paddingBottom: '0px',
                        padding: '8px',
                        minHeight: '20px',
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: '600',
                        // paddingLeft: '4px',
                        // paddingRight: '15px',
                        '&:hover': {
                          backgroundColor: '#146EF6',
                          color: '#ffffff',
                        },
                      },

                    }}
                  >
                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                      display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                        borderRadius: '5px 5px 0px 0px'
                      }
                    }}>
                      <Box component='span' >
                        < CloudIcon sx={{ height: '11px', width: '16px' }} />
                      </Box>
                      Add contact to an apollo sequence
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <Box component='span' >
                        < CloudIcon sx={{ height: '11px', width: '16px' }} />
                      </Box>
                      Mark all sequence as finished
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <Box component='span' >
                        < CloudIcon sx={{ height: '11px', width: '16px' }} />
                      </Box>
                      Remove From Sequence
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <Box component='span' >
                        < CloudIcon sx={{ height: '11px', width: '16px' }} />
                      </Box>
                      Connect Salesloft
                    </MenuItem>
                    <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                      display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                        borderRadius: '0px 0px 5px 5px'
                      }
                    }}>
                      <Box component='span' >
                        < CloudIcon sx={{ height: '11px', width: '16px' }} />
                      </Box>
                      Connect Outreach
                    </MenuItem>
                  </Menu>
                  <Stack direction='row' spacing={1} mt={1}>
                    <Button variant="outlined"
                      disableRipple
                      startIcon={<WidgetsOutlinedIcon sx={{ color: '#474747', height: '15px', width: '15px' }} />}
                      endIcon={<ArrowDropDownIcon />}
                      id='crmbtn'
                      aria-controls={openCRMBtn ? 'crmbtnmenu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openCRMBtn ? 'true' : undefined}
                      onClick={handleClickCRMBtn}
                      sx={{
                        borderColor: openCRMBtn === true ? '#146EF6' : '#CACACC',
                        backgroundColor: '#FBFBFD',
                        height: '32px',
                        width: '122px',
                        paddingLeft: '15px',
                        paddinRight: '15px',
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: openCRMBtn === true ? '#146EF6' : '#1A1A1A',
                        '&:hover': {
                          color: '#146EF6',
                          borderColor: '#146EF6',
                          backgroundColor: '#ffffff'
                        }
                      }}
                    >
                      CRM/ATS
                    </Button>
                    <Menu
                      id="crmbtnmenu"
                      anchorEl={crmanchorEl}
                      open={openCRMBtn}
                      onClose={handleProfileMenuClose}
                      MenuListProps={{
                        'aria-labelledby': 'crmbtn',
                      }}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                      }}
                      PaperProps={{
                        style: { overflow: "visible" }
                      }}
                      sx={{
                        width: "327px",
                        height: '175px',
                        borderRadius: '3px',
                        marginTop: '2px',
                        padding: '15px',
                        '& .MuiList-root': {
                          paddingTop: '0px',
                          paddingBottom: '0px',

                        },
                        '& .MuiMenuItem-root': {
                          lineHeight: '17px',
                          color: '#474747',
                          fontSize: '14px',
                          // paddingTop: '0px',
                          // paddingBottom: '0px',
                          padding: '8px',
                          minHeight: '20px',
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontWeight: '600',
                          // paddingLeft: '4px',
                          // paddingRight: '15px',
                          '&:hover': {
                            backgroundColor: '#146EF6',
                            color: '#ffffff',
                          },
                        },

                      }}
                    >
                      <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                          borderRadius: '5px 5px 0px 0px'
                        }
                      }}>
                        <Box component='span' >
                          < CloudIcon sx={{ height: '11px', width: '16px' }} />
                        </Box>
                        Connect Salesforce
                      </MenuItem>
                      <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        <Box component='span' >
                          < CloudIcon sx={{ height: '11px', width: '16px' }} />
                        </Box>
                        Connect HubSpot
                      </MenuItem>
                      <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                          borderRadius: '0px 0px 5px 5px'
                        }
                      }}>
                        <Box component='span' >
                          < CloudIcon sx={{ height: '11px', width: '16px' }} />
                        </Box>
                        Connect Greenhouse
                      </MenuItem>
                    </Menu>
                    <Button
                      disableRipple
                      id='morebtn'
                      aria-controls={openMoreBtn ? 'morebtnmenu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMoreBtn ? 'true' : undefined}
                      onClick={handleClickMoreBtn}
                      endIcon={<ArrowDropDownIcon />}
                      sx={{
                        color: '#737373',
                        textTransform: 'capitalize',
                        fontSize: '14px',
                        backgroundColor: openMoreBtn === true ? '#F0F0F0' : '#ffffff',
                        '&:hover': {
                          backgroundColor: '#F0F0F0'
                        }
                      }}
                    >
                      More
                    </Button>
                    <Menu
                      id="morebtnmenu"
                      anchorEl={MoreanchorEl}
                      open={openMoreBtn}
                      onClose={handleProfileMenuClose}
                      MenuListProps={{
                        'aria-labelledby': 'morebtn',
                      }}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                      }}
                      PaperProps={{
                        style: { overflow: "visible" }
                      }}
                      sx={{
                        width: "327px",
                        height: '175px',
                        borderRadius: '3px',
                        marginTop: '2px',
                        padding: '15px',
                        '& .MuiList-root': {
                          paddingTop: '0px',
                          paddingBottom: '0px',

                        },
                        '& .MuiMenuItem-root': {
                          lineHeight: '17px',
                          color: '#474747',
                          fontSize: '14px',
                          // paddingTop: '0px',
                          // paddingBottom: '0px',
                          padding: '8px',
                          minHeight: '20px',
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontWeight: '600',
                          // paddingLeft: '4px',
                          // paddingRight: '15px',
                          '&:hover': {
                            backgroundColor: '#146EF6',
                            color: '#ffffff',
                          },
                        },

                      }}
                    >
                      <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                          borderRadius: '5px 5px 0px 0px'
                        }
                      }}>
                        Edit Contact Info
                      </MenuItem>
                      <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        Delete
                      </MenuItem>
                      <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        Enrich Email
                      </MenuItem>
                      <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        Enrich Mobile Number
                      </MenuItem>
                      <MenuItem disableRipple onClick={handleProfileMenuClose} sx={{
                        display: 'flex', alignItems: 'center', gap: '9px', '&:hover': {
                          borderRadius: '0px 0px 5px 5px'
                        }
                      }}>
                        Merge Duplicate
                      </MenuItem>
                    </Menu>
                    <Button
                      disableRipple
                      startIcon={<MailOutlineOutlinedIcon sx={{ width: '15px', height: '15px' }} />}
                      sx={{
                        color: '#737373', textTransform: 'capitalize', fontSize: '14px',
                        '&:hover': {
                          backgroundColor: '#F0F0F0'
                        }
                      }}
                    >
                      Email
                    </Button>
                  </Stack> */}

                </Stack>
                <Stack sx={{ width: '50%', height: '190px' }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                  >
                    <Box sx={{
                      backgroundColor: '#F7F7F7',
                      border: '#F0F0F0 1px solid',
                      width: '26.59px',
                      height: '26.59px',
                      borderRadius: '50%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                    }}>
                      <MailOutlineOutlinedIcon sx={{
                        color: '#737373',
                        height: '11px',
                        width: '11px',
                        backgroundColor: '#F7F7F7',
                        border: '#F0F0F0 1px solid',
                      }} />
                    </Box>


                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}
                      onMouseEnter={handleMailHoverEnter}
                      onMouseLeave={handleHoverLeave}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: '600',
                            fontSize: '14px',
                            color: '#146EF6',
                            cursor: 'default',
                            '&:hover': {
                              color: '#0852C2'
                            }
                          }}
                        >{profileData.recommended_personal_email}</Typography>

                        <Typography
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: 600,
                            fontSize: '12px',
                            color: '#474747',
                            cursor: 'default'
                          }}
                        >Business Primary</Typography>
                      </Box>
                      {isMailHover && <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)',
                          mr: 1
                        }}
                      >
                        <Button
                          disableRipple
                          sx={{
                            width: '33.3%',
                            height: '25px',
                            minWidth: '15%',
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            },
                            '&:hover svg': {
                              color: '#146EF6',
                            }
                          }}
                        >
                          <ContentCopyOutlinedIcon sx={{
                            fontSize: '15px',
                            color: '#CACACC'
                          }} />
                        </Button>
                        <Button
                          disableRipple
                          sx={{
                            width: '33.3%',
                            height: '25px',
                            minWidth: '15%',
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            },
                            '&:hover svg': {
                              color: '#146EF6',
                            }
                          }}
                        >
                          <BorderColorIcon sx={{ fontSize: '15px', color: '#CACACC' }} />
                        </Button>
                        <Button
                          disableRipple
                          sx={{
                            width: '33.3%',
                            height: '25px',
                            minWidth: '15%',
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            },
                            '&:hover svg': {
                              color: '#146EF6',
                            }

                          }}
                        >
                          <DeleteOutlinedIcon sx={{ fontSize: '15px', color: '#CACACC' }} />
                        </Button>
                      </Box>
                      }
                    </Box>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                  >
                    <Box sx={{
                      backgroundColor: '#F7F7F7',
                      border: '#F0F0F0 1px solid',
                      width: '26.59px',
                      height: '26.59px',
                      borderRadius: '50%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                    }}>
                      <CallOutlinedIcon sx={{
                        color: '#737373',
                        height: '11px',
                        width: '11px',
                        backgroundColor: '#F7F7F7',
                        border: '#F0F0F0 1px solid',
                      }} />
                    </Box>


                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}
                      onMouseEnter={handleCallHoverEnter}
                      onMouseLeave={handleHoverLeave}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                        <Typography
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: '600',
                            fontSize: '14px',
                            color: '#146EF6',
                            cursor: 'default',
                            '&:hover': {
                              color: '#0852C2'
                            }
                          }}
                        >Request Mobile Number</Typography>

                        <Typography
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: 600,
                            fontSize: '14px',
                            color: '#474747',
                            cursor: 'default'
                          }}
                        >1 Credit</Typography>
                      </Box>
                      {isCallHover && <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)',
                          mr: 1
                        }}
                      >
                        <Button
                          disableRipple
                          sx={{
                            width: '33.3%',
                            height: '25px',
                            minWidth: '15%',
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            },
                            '&:hover svg': {
                              color: '#146EF6',
                            }
                          }}
                        >
                          <ContentCopyOutlinedIcon sx={{
                            fontSize: '15px',
                            color: '#CACACC'
                          }} />
                        </Button>
                        <Button
                          disableRipple
                          sx={{
                            width: '33.3%',
                            height: '25px',
                            minWidth: '15%',
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            },
                            '&:hover svg': {
                              color: '#146EF6',
                            }
                          }}
                        >
                          <BorderColorIcon sx={{ fontSize: '15px', color: '#CACACC' }} />
                        </Button>
                        <Button
                          disableRipple
                          sx={{
                            width: '33.3%',
                            height: '25px',
                            minWidth: '15%',
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            },
                            '&:hover svg': {
                              color: '#146EF6',
                            }

                          }}
                        >
                          <DeleteOutlinedIcon sx={{ fontSize: '15px', color: '#CACACC' }} />
                        </Button>
                      </Box>
                      }
                    </Box>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '10px',
                  }}
                  >
                    <Box sx={{
                      backgroundColor: '#F7F7F7',
                      border: '#F0F0F0 1px solid',
                      width: '26.59px',
                      height: '26.59px',
                      borderRadius: '50%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: '10px',
                    }}>
                      <ApartmentIcon sx={{
                        color: '#737373',
                        height: '11px',
                        width: '11px',
                        backgroundColor: '#F7F7F7',
                        border: '#F0F0F0 1px solid',
                      }} />
                    </Box>


                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                      }}
                      onMouseEnter={handleCompanyHoverEnter}
                      onMouseLeave={handleHoverLeave}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: '600',
                            fontSize: '14px',
                            color: '#146EF6',
                            cursor: 'default',
                            '&:hover': {
                              color: '#0852C2'
                            }
                          }}
                        >
                          {formattedMobile}</Typography>

                        <Box component='span'
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: 600,
                            fontSize: '12px',
                            color: '#474747',
                            cursor: 'default'
                          }}
                        >Primary</Box>
                      </Box>
                      {isCompanyHover && <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)',
                          mr: 1
                        }}
                      >
                        <Button
                          disableRipple
                          sx={{
                            width: '33.3%',
                            height: '25px',
                            minWidth: '15%',
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            },
                            '&:hover svg': {
                              color: '#146EF6',
                            }
                          }}
                        >
                          <ContentCopyOutlinedIcon sx={{
                            fontSize: '15px',
                            color: '#CACACC'
                          }} />
                        </Button>
                        <Button
                          disableRipple
                          sx={{
                            width: '33.3%',
                            height: '25px',
                            minWidth: '15%',
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            },
                            '&:hover svg': {
                              color: '#146EF6',
                            }
                          }}
                        >
                          <BorderColorIcon sx={{ fontSize: '15px', color: '#CACACC' }} />
                        </Button>
                        <Button
                          disableRipple
                          sx={{
                            width: '33.3%',
                            height: '25px',
                            minWidth: '15%',
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            },
                            '&:hover svg': {
                              color: '#146EF6',
                            }

                          }}
                        >
                          <DeleteOutlinedIcon sx={{ fontSize: '15px', color: '#CACACC' }} />
                        </Button>
                      </Box>
                      }
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      disableRipple
                      startIcon={<AddIcon sx={{ color: '#146EF6', height: '15px', width: '15px' }} />}
                      sx={{
                        color: '#146EF6', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: '600', textTransform: 'capitalize', '&:hover': {
                          backgroundColor: '#ffffff',
                          color: '#0852C2'
                        },
                        '&:hover svg': {
                          color: '#0852C2'
                        }
                      }}
                    >
                      Add Phone Number
                    </Button>
                  </Box>
                </Stack>
              </Stack>
              {/* <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box component='h6' sx={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#1A1A1A',
                }} >
                  Lists:  <Box component='span' sx={{ width: '180px', height: '20px' }}>
                    <Button
                      disableRipple
                      endIcon={< ClearOutlinedIcon sx={{ color: '#737373', height: '10px', width: '10px' }} />}
                      sx={{
                        fontSize: '12px', color: '#474747', textTransform: 'capitalize', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', borderRadius: '2px', backgroundColor: '#F0F0F0',
                        '&:hover': {
                          backgroundColor: ' #CACACC'
                        }
                      }}
                    >
                      CCM - Telecommunication

                    </Button>
                  </Box>
                </Box>
                <Box component='h6' sx={{ pr: 3 }}>
                  <Button
                    id="add-list-btn"
                    aria-controls={openAddToListenBtn ? "addlistmenu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAddToListenBtn ? 'true' : undefined}
                    onClick={handleClickAddToListen}
                    startIcon={< PlaylistAddOutlinedIcon />}
                    disableRipple
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#146EF6',
                      textTransform: 'capitalize',
                      '&:hover': {
                        backgroundColor: '#ffffff',
                        color: '#0852C2'
                      }
                    }}
                  >
                    Add To List
                  </Button>
                  <Menu
                    id="addlistmenu"
                    anchorEl={addtolistanchorEl}
                    open={openAddToListenBtn}
                    onClose={handleProfileMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'add-list-btn',
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center"
                    }}
                    PaperProps={{
                      style: { overflow: "visible" }
                    }}

                    sx={{
                      boxShadow: '0px',
                      '& .MuiList-root.MuiMenu-list': {
                        pt: '8px',
                        pb: '15px',
                        pr: '10px',
                        pl: '10px'
                      }
                    }}
                  >


                    <Autocomplete
                      disablePortal
                      disableClearable
                      onChange={handleProfileMenuClose}
                      id="combo-box-demo"
                      options={labels}
                      sx={{
                        width: '259px',
                        height: '30px',
                        '& .MuiOutlinedInput-root': {
                          p: 0
                        },
                        '& .MuiAutocomplete-popupIndicator': {
                          transform: "unset",
                          color: "#737373",
                          '& .MuiTouchRipple-root': {
                            display: 'none',
                          },
                          '&:hover': {
                            backgroundColor: '#ffffff'
                          }
                        },
                      }}
                      PaperComponent={({ children }) => (
                        <Paper style={{
                          minWidth: '274px',
                          left: '50%',
                          transform: 'translateX(-3.7%)',
                          height: 'auto',
                          overflow: 'hidden',
                          paddingRight: '5px',
                        }}>{children}</Paper>
                      )}

                      renderOption={(props, option) => (
                        <li {...props}
                          style={{
                            color: '#1A1A1A',
                            fontSize: '14px',
                            fontWeight: 600,
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            marginLeft: '10px',
                            marginRight: '10px'
                          }}
                          onMouseEnter={(e: any) => {
                            e.target.style.backgroundColor = '#F7F7F7';
                          }}
                          onMouseLeave={(e: any) => {
                            e.target.style.backgroundColor = 'unset';
                          }}
                        >{option.label}</li>
                      )}
                      renderInput={(params) => <TextField {...params} placeholder="Select / Type to create list"
                        sx={{
                          '& .MuiInputBase-input.MuiOutlinedInput-input': {
                            color: '#1A1A1A',
                            fontSize: '14px',
                            fontWeight: 600,
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          },
                          '& .MuiInputBase-input::placeholder': {
                            color: '#919191',
                            fontSize: '14px',
                            fontWeight: 600,
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            opacity: 1,
                          },
                          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#146EF6',
                          },
                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#CACACC',
                            borderWidth: '1px'
                          },
                        }}
                      />}
                    />
                  </Menu>
                </Box>
              </Stack> */}
            </Card>

            <Card sx={{ height: 'auto', pr: 1, mb: 2, boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
              <Stack sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Stack sx={{ width: '50%' }}>
                  <Box>
                    <Typography sx={{
                      pt: 1, pb: 1, pl: 3,
                      borderBottom: '1px #E6E6E6 solid',
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600,
                      color: '#1A1A1A'
                    }}>
                      Work History
                    </Typography>
                    {profileData.experience.map((emp: any) => (

                      <Stack p={2} direction='row' spacing={2}
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
                      >
                        <Stack direction='row' spacing={2}
                          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <Box sx={{ backgroundColor: '#D9D9D9', borderRadius: '3px', height: '31.99px', width: '32.17px', display: 'none' }}>
                            <img src="https://res.cloudinary.com/doxor5nnu/image/upload/v1683968391/Amazon-Logo-Font-1-scaled_f7sumk.webp" alt="img" style={{ height: '31.99px', width: '32.17px', borderRadius: '3px' }} />
                          </Box>
                          <Box>
                            <Typography component='h6' sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>{emp.company.name} {emp.company.location ? emp.company.location.country : ''}</Typography>
                            <Typography component='p' sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, color: '#474747', width: '192px' }}>{emp.title.name}</Typography>
                            <Typography component='p' sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, color: '#474747', width: '192px' }}>{emp.start_date ? emp.start_date : `-`} / {emp.end_date ? emp.end_date : `-`}</Typography>
                          </Box>
                        </Stack>
                        {/* <Box>

                          <Button
                            disableRipple
                            endIcon={<ArrowDropDownIcon />} sx={{
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600, color: '#146EF6', textTransform: 'capitalize',
                              '&:hover': {
                                backgroundColor: '#ffffff',
                                color: '#0852C2'
                              }
                            }}>
                            Roles
                          </Button>
                        </Box> */}
                      </Stack>
                    ))}
                  </Box>
                </Stack>
                <Stack sx={{ borderLeft: '1px #E6E6E6 solid', width: '50%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flext-start', pl: '15px', pt: 2, pb: 2 }} direction="column" spacing={1.5}>

                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'start', width: '100%', height: '25px' }}>
                    <Typography component='p' sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1A1A1A',
                      width: '50%'

                    }}>
                      Contact Stage
                    </Typography>
                    <Box sx={{ width: '70%' }}
                      onMouseEnter={handleContactStageHoverEnter}
                      onMouseLeave={handleHoverLeave}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                          disableRipple
                          sx={{
                            backgroundColor: '#F0F0F0', color: '#474747', fontSize: '12px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            textTransform: 'capitalize', width: '85px', height: '30px',
                            '&:hover': {
                              backgroundColor: '#CACACA'
                            }
                          }}
                        >
                          Approaching
                        </Button>
                        {isContactStageHover &&
                          <Box>
                            <Button
                              disableRipple
                              startIcon={<BorderColorIcon sx={{ fontSize: '15px' }} />}
                              sx={{
                                height: '25px',
                                width: '65px',
                                color: '#CACACC',
                                backgroundColor: '#FFFFFF',
                                boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)',
                                textTransform: 'capitalize',
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                fontWeight: 600,
                                fontSize: '14px',
                                '& .MuiButton-startIcon>*:nth-of-type(1)': {
                                  fontSize: '12px'
                                },
                                '&:hover': {
                                  backgroundColor: '#F7F7F7',
                                  color: '#146EF6',
                                }
                              }}
                            >
                              Edit
                            </Button>
                          </Box>
                        }
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '25px' }}>
                    <Typography component='p' sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1A1A1A',
                      width: '50%'

                    }}>
                      Contact Owner
                    </Typography>
                    <Box sx={{ width: '70%' }}>
                      <Box sx={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                        position: 'relative'
                      }}
                        onMouseEnter={handleContactOwnerHoverEnter}
                        onMouseLeave={handleHoverLeave}
                      >
                        <Typography component='p'
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: 600,
                            fontSize: '14px',
                            color: '#1A1A1A',
                          }}
                        >
                          Manish Karani
                        </Typography >
                        {isContactOwnerHover &&
                          <Box sx={{ display: 'flex', flexDirection: 'row', boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)', }}>
                            <Button
                              disableRipple
                              sx={{
                                color: '#CACACC',
                                backgroundColor: '#FFFFFF',
                                minWidth: '40px',
                                '&:hover': {
                                  backgroundColor: '#F7F7F7',
                                  color: '#146EF6',
                                }
                              }}
                            >
                              <ContentCopyOutlinedIcon sx={{ fontSize: '15px' }} />
                            </Button>
                            <Button
                              disableRipple
                              sx={{
                                color: '#CACACC',
                                backgroundColor: '#FFFFFF',
                                minWidth: '40px',
                                '&:hover': {
                                  backgroundColor: '#F7F7F7',
                                  color: '#146EF6',
                                }
                              }}
                            >
                              <BorderColorIcon sx={{ fontSize: '15px' }} />
                            </Button>
                          </Box>
                        }
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '25px' }}>

                    <Typography component='p' sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1A1A1A',
                      width: '50%'
                    }}>
                      Engagement
                    </Typography>

                    <Typography component='p' sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1A1A1A',
                      width: '70%'

                    }}>
                      0 Inbound . 3 Outbound
                    </Typography>

                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '25px' }}>
                    <Typography component='p' sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1A1A1A',
                      width: '50%'

                    }}>
                      Last 12 Months
                    </Typography>
                    <Stack sx={{ width: '70%' }} direction='row' spacing={1}>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundImage: 'linear-gradient(#E6E6E6 70%,#43CD89 30%)' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundImage: 'linear-gradient(#E6E6E6 80%,#43CD89 20%)' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                      <Box sx={{ width: '6px', height: '25px', backgroundColor: '#E6E6E6' }}></Box>
                    </Stack>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '25px' }}>
                    <Typography component='p' sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1A1A1A',
                      width: '50%'
                    }}>
                      Location
                    </Typography>

                    <Box sx={{ width: '70%' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        onMouseEnter={handleLocationHoverEnter}
                        onMouseLeave={handleHoverLeave}
                      >
                        <Typography component='p'
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: 600,
                            fontSize: '14px',
                            color: '#1A1A1A',
                          }}
                        >
                          {profileData.location_name}
                        </Typography >
                        {isLocationHover &&
                          <Box sx={{ display: 'flex', flexDirection: 'row', boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)', }}>
                            <Button
                              disableRipple
                              sx={{
                                color: '#CACACC',
                                backgroundColor: '#FFFFFF',
                                minWidth: '40px',
                                '&:hover': {
                                  backgroundColor: '#F7F7F7',
                                  color: '#146EF6',
                                }
                              }}
                            >
                              <ContentCopyOutlinedIcon sx={{ fontSize: '15px' }} />
                            </Button>
                            <Button
                              disableRipple
                              sx={{
                                color: '#CACACC',
                                backgroundColor: '#FFFFFF',
                                minWidth: '40px',
                                '&:hover': {
                                  backgroundColor: '#F7F7F7',
                                  color: '#146EF6',
                                }
                              }}
                            >
                              <BorderColorIcon sx={{ fontSize: '15px' }} />
                            </Button>
                          </Box>
                        }
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', height: '25px' }}>
                    <Typography component='p' sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#1A1A1A',
                      width: '50%'

                    }}>
                      Local Time
                    </Typography>

                    <Box sx={{ width: '70%' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                        onMouseEnter={handleLocalTimeHoverEnter}
                        onMouseLeave={handleHoverLeave}
                      >
                        <Typography component='p'
                          sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontWeight: 600,
                            fontSize: '14px',
                            color: '#1A1A1A',
                          }}
                        >
                          May 9, 2023 10:00 AM
                        </Typography >
                        {isLocalTimeHover &&
                          <Box sx={{ display: 'flex', flexDirection: 'row', boxShadow: '0px 2px 9px rgba(0, 0, 0, 0.1)', }}>
                            <Button
                              disableRipple
                              sx={{
                                color: '#CACACC',
                                backgroundColor: '#FFFFFF',
                                minWidth: '40px',
                                '&:hover': {
                                  backgroundColor: '#F7F7F7',
                                  color: '#146EF6',
                                }
                              }}
                            >
                              <ContentCopyOutlinedIcon sx={{ fontSize: '15px' }} />
                            </Button>
                            <Button
                              disableRipple
                              sx={{
                                color: '#CACACC',
                                backgroundColor: '#FFFFFF',
                                minWidth: '40px',
                                '&:hover': {
                                  backgroundColor: '#F7F7F7',
                                  color: '#146EF6',
                                }
                              }}
                            >
                              <BorderColorIcon sx={{ fontSize: '15px' }} />
                            </Button>
                          </Box>
                        }
                      </Box>
                    </Box>
                  </Box>
                </Stack>
              </Stack>
            </Card>

            <Card sx={{
              pr: 3,
              pl: 3,
              pt: 3,
              pb: 2,
              mb: 2,
              // display: 'flex',
              // flexDirection: 'row',
              // alignItems: 'center',
              // justifyContent: 'space-around',
              boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
            }}>
              <Stack direction='row' spacing={6} sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                height: '5px',
              }}>
                <Stack
                  onClick={onClickReSearch}

                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                    pb: 1.8,
                    borderBottom: isReSearch ? '1px solid #146EF6' : '1px solid #737373',
                    cursor: 'pointer',
                    '&:hover': {
                      borderBottom: '1px solid #146EF6',
                      '&:hover svg,&:hover p': {
                        color: '#146EF6',
                      },
                    }
                  }}

                >
                  <SearchSharpIcon sx={{ color: isReSearch ? '#146EF6' : '#737373', fontSize: "24px" }} />
                  <Typography sx={{
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isReSearch ? '#146EF6' : '#474747',
                  }}>Research</Typography>
                </Stack>
                <Box sx={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1,
                  pb: 1.8,
                  cursor: 'pointer',
                  borderBottom: isExistingContacts ? '1px solid #146EF6' : '1px solid #737373',
                  '&:hover': {
                    borderBottom: '1px solid #146EF6',
                    '&:hover svg,&:hover p': {
                      color: '#146EF6',
                    },
                  }
                }}
                  onClick={onClickExistingContacts}
                >
                  <PeopleIcon sx={{ color: isExistingContacts ? '#146EF6' : '#737373', fontSize: "24px" }} />
                  <Typography sx={{
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isExistingContacts ? '#146EF6' : '#474747',
                  }}>Existing Contacts</Typography>
                </Box>
                <Box sx={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1,
                  pb: 1.8,
                  cursor: 'pointer',
                  borderBottom: isSequnece ? '1px solid #146EF6' : '1px solid #737373',
                  '&:hover': {
                    borderBottom: '1px solid #146EF6',
                    '&:hover svg,&:hover p': {
                      color: '#146EF6',
                    },
                  }
                }}
                  onClick={onClickSequnece}
                >
                  <SendOutlinedIcon sx={{ fontSize: '24px', color: isSequnece ? '#146EF6' : '#1A1A1A' }} />
                  <Typography sx={{
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isSequnece ? '#146EF6' : '#474747',
                  }}
                    component='p'
                  >
                    Sequences</Typography>
                  <Box sx={{
                    height: '19px', width: '19px', backgroundColor: '#474747', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', direction: 'row', justifyContent: "center",
                  }}>
                    <Typography
                      sx={{
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: '9px',
                        fontWeight: 600,
                        color: '#ffffff !important'
                      }}

                    >1
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1,
                  pb: 1.8,
                  cursor: 'pointer',
                  borderBottom: isCustomFields ? '1px solid #146EF6' : '1px solid #737373',
                  '&:hover': {
                    borderBottom: '1px solid #146EF6',
                    '&:hover svg,&:hover p': {
                      color: '#146EF6',
                    },
                  }
                }}
                  onClick={onClickCustomFields}
                >
                  <SendOutlinedIcon sx={{ fontSize: '24px', color: isCustomFields ? '#146EF6' : '#1A1A1A' }} />
                  <Typography sx={{
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isCustomFields ? '#146EF6' : '#474747',
                  }} component='p'>Custom Fields</Typography>
                </Box>
                <Box sx={{
                  display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1,
                  pb: 1.8,
                  cursor: 'pointer',
                  borderBottom: isOpportunities ? '1px solid #146EF6' : '1px solid #737373',
                  '&:hover': {
                    borderBottom: '1px solid #146EF6',
                    '&:hover svg,&:hover p': {
                      color: '#146EF6',
                    },
                  }
                }}
                  onClick={onClickOpportunities}
                >
                  <SendOutlinedIcon sx={{ fontSize: '24px', color: isOpportunities ? '#146EF6' : '#1A1A1A' }} />
                  <Typography sx={{
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isOpportunities ? '#146EF6' : '#474747'
                  }}>Opportunities</Typography>
                </Box>
              </Stack>
            </Card>
            {isReSearch && <Research companydetails={filteredExperiences}
              profileData={profileData}
              keywords={profileData.skills}
              mobile={profileData.mobile_phone} />}
            {isExistingContacts && <ExistingContacts />}
            {isSequnece && <Sequence />}
            {isCustomFields && <CustomFields />}
            {isOpportunities && <Opportunities />}
          </Stack >

          <Stack sx={{ width: '25%' }}>
            <Card sx={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #E6E6E6',
                p: '1%'
              }}>
                <Typography
                  sx={{
                    color: '#1A1A1A', fontSize: '16px', fontWeight: 600, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    pl: '5%'
                  }}
                >
                  Activities</Typography>
                <Button
                  disableRipple
                  sx={{
                    color: '#146EF6', fontSize: '14px', textTransform: 'capitalize', fontWeight: 600, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', pr: '5%', '&:hover': {
                      backgroundColor: '#E6E6E6',

                    }
                  }}
                  onClick={handleHideActivities}
                >
                  {isHideActivities ? 'Hide Activities' : 'Show Activities'}
                </Button>
              </Box>

              {isHideActivities &&
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  pt: 1,

                }}>
                  <Box sx={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                    borderBottom: isContact ? '1px solid #146EF6' : '1px solid #E6E6E6',
                    cursor: 'pointer',
                    width: '50%',
                    pb: 1,
                    '&:hover': {
                      borderBottom: '1px solid #146EF6',
                      '&:hover svg,&:hover p': {
                        color: '#146EF6',
                      },
                    }
                  }}
                    onClick={onclickContact}
                  >
                    <Box
                      sx={{
                        pl: '20%',
                      }}

                    >
                      <PersonOutlinedIcon sx={{ color: isContact ? '#146EF6' : '#737373', fontSize: '18px', mt: '3px' }} />
                    </Box>
                    <Box>
                      <Typography component='p'
                        sx={{
                          color: isContact ? '#146EF6' : '#474747',
                          fontSize: '14px',
                          fontWeight: 600,
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}>
                        Contact
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{
                    display: 'flex', flexDirection: 'row', alignItems: 'center',
                    borderBottom: isAccount ? '1px solid #146EF6' : '1px solid #E6E6E6',
                    cursor: 'pointer',
                    width: '50%',
                    pb: 1,
                    '&:hover': {
                      borderBottom: '1px solid #146EF6',
                      '&:hover svg,&:hover p': {
                        color: '#146EF6',
                      },
                    }
                  }}
                    onClick={onclickAccount}
                  >
                    <Box
                      sx={{ pl: '20%' }}

                    >
                      <PersonOutlinedIcon sx={{ color: isAccount ? '#146EF6' : '#737373', fontSize: '18px', mt: '3px' }} />
                    </Box>
                    <Box>
                      <Typography component='p'
                        sx={{
                          color: isAccount ? '#146EF6' : '#474747',
                          fontSize: '14px',
                          fontWeight: 600,
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        }}>
                        Account
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              }

              {isContact &&
                <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                  <Box sx={{ display: isHideActivities ? 'block' : 'none', flexDirection: 'row', justifyContent: 'center' }}>
                    <FormControl sx={{ width: '100%' }}>
                      <RadioGroup
                        row
                        value={selectedRadiovalue}
                        onChange={handleRadioChange}
                        sx={{
                          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap',
                          '& .MuiFormControlLabel-root': {
                            mr: 0, ml: 0
                          }
                        }}

                      >
                        <FormControlLabel
                          value='Note'
                          onClick={onClickRadioNote}
                          control={
                            <Radio
                              disableRipple
                              color="default"
                              checkedIcon={<RadioBpCheckedIcon />}
                              icon={<RadioBpIcon />}
                            />
                          }
                          label={
                            <Typography component='label'
                              sx={{
                                color: '#1A1A1A',
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                fontWeight: 600,
                                fontSize: '14px'
                              }}
                            >
                              Note
                            </Typography>
                          }
                        // sx={{ pl: '0%' }}
                        />

                        <FormControlLabel
                          value='Call'
                          onClick={onClickRadioCall}
                          control={
                            <Radio
                              disableRipple
                              color="default"
                              checkedIcon={<RadioBpCheckedIcon />}
                              icon={<RadioBpIcon />}
                            />
                          }
                          label={
                            <Typography component='label'
                              sx={{
                                color: '#1A1A1A',
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                fontWeight: 600,
                                fontSize: '14px'
                              }}
                            >
                              Call
                            </Typography>
                          }
                        // sx={{ pl: '0%' }}
                        />

                        <FormControlLabel
                          value='Action'
                          onClick={onClickRadioAction}
                          control={
                            <Radio
                              disableRipple
                              color="default"
                              checkedIcon={<RadioBpCheckedIcon />}
                              icon={<RadioBpIcon />}
                            />
                          }
                          label={
                            <Typography component='label'
                              sx={{
                                color: '#1A1A1A',
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                fontWeight: 600,
                                fontSize: '14px'
                              }}
                            >
                              Action
                            </Typography>
                          }
                        />

                        <FormControlLabel
                          value='Task'
                          onClick={onClickRadioTask}
                          control={
                            <Radio
                              disableRipple
                              color="default"
                              checkedIcon={<RadioBpCheckedIcon />}
                              icon={<RadioBpIcon />}
                            />
                          }
                          label={
                            <Typography component='label'
                              sx={{
                                color: '#1A1A1A',
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                fontWeight: 600,
                                fontSize: '14px'
                              }}
                            >
                              Task
                            </Typography>
                          }
                        // sx={{ pl: 1 }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>



                  {isRadioNote &&
                    <Stack sx={{ width: '100%' }}>
                      <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          <TextField
                            color="error"
                            sx={{
                              width: '85%',
                              height: '72px',
                              pb: 5,
                              color: '#1A1A1A',
                              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#146EF6',
                              },
                              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#146EF6',
                                borderWidth: '1px',
                              },
                              '& .MuiInputBase-input': {
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              },
                              '& .MuiInputBase-input::placeholder': {
                                color: '#919191',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                opacity: 0.80,
                              },
                            }}
                            multiline
                            rows={3}
                            placeholder="Type a note..."
                            value={noteText}
                            onChange={handleNoteChange}
                          />
                        </Box>


                        <Stack direction='row' spacing={2} pl='8%' sx={{ display: isHideActivities ? 'block' : 'none' }} mb={2}>
                          <Button
                            disableRipple
                            sx={{
                              width: '81px',
                              height: '31px',
                              backgroundColor: noteText ? '#146EF6' : '#CACACC',
                              textTransform: 'capitalize',
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: '14px',
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              '&:hover': {
                                backgroundColor: noteText ? '#146EF6' : '#CACACC',
                              }
                            }}
                          >
                            Log Note
                          </Button>
                          <FormControlLabel
                            control={
                              <BpCheckboxContainer>
                                <Checkbox
                                  className="bp-checkbox"
                                  disableRipple
                                  onChange={handleChangePinNoteChecked}
                                  checked={pinNoteChecked}
                                  checkedIcon={<BpCheckedIcon
                                    //  className="bp-icon" 
                                    style={{ borderColor: pinNoteChecked ? '#146EF6' : '' }} />}
                                  icon={<BpIcon className="bp-icon" />} />
                              </BpCheckboxContainer>}
                            label={
                              <Typography component='label'
                                sx={{
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  lineHeight: '1px'
                                }}
                              >
                                Pin note to top
                              </Typography>
                            }
                          />
                        </Stack>
                      </Stack>
                      <Stack >
                        <Stack sx={{
                          '&:hover': {
                            backgroundColor: '#F7F7F7'
                          }
                        }}>
                          <Box sx={{ height: '32px', backgroundColor: '#F7F7F7', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: '1%', }}>
                            <Typography
                              sx={{
                                color: '#474747',
                                fontSize: '16px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                pl: '1.5%'
                              }}
                            >
                              Activities
                            </Typography>
                            <Button
                              disableRipple
                              endIcon={<ArrowDropDownIcon />}
                              sx={{
                                color: '#146EF6',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                textTransform: 'capitalize',
                                whiteSpace: 'nowrap',
                                '&:hover': {
                                  backgroundColor: '#F7F7F7',
                                  color: '#0852C2'
                                }
                              }}
                            >
                              Showing 1 Activity Type
                            </Button>

                          </Box>

                          <Box sx={{ pl: '5%', pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Box >
                                <Typography component='p' sx={{
                                  pr: '5%',
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',

                                }}>
                                  Justin Kidd to <Box component='span' sx={{ color: '#146EF6', }}> Jose Ortiz </Box>
                                </Typography>
                              </Box>
                              <Box component='div' sx={{ borderRight: '1px solid #919191', display: 'flex', alignItems: 'center' }}></Box>
                              <Box>
                                <Typography component='p' sx={{
                                  pl: '5%', color: '#474747',
                                  fontSize: '11px',
                                  fontWeight: 400,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  mt: '2px',

                                }}>
                                  Step 4 of <Box component='span' sx={{ color: '#146EF6', }}>Justin CRNinja Drip</Box>
                                </Typography>
                              </Box>
                            </Box>
                            <Typography component='p'
                              sx={{
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              }}
                            >
                              Achieve 50% Less Attrition. At Ninja-Like Speed.
                            </Typography>

                            <Box>
                              <Typography component='p'
                                sx={{
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  pr: '5%'
                                }}
                              >
                                Hi Jose, Get the Right Agents, With the Right Skills,
                                Right Away, It's been about two weeks since we....
                              </Typography>
                              <Box sx={{
                                backgroundColor: '#EB7A2F',
                                height: '20px', width: '155px',
                                borderRadius: '3px', textAlign: 'center', mt: 1,
                              }}>
                                <Typography component='p' sx={{
                                  color: '#ffffff', fontSize: '12px',
                                  fontWeight: 700, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}>
                                  Not Sent - Sendgrid Drop
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                            <Box>
                              <Typography component='p' sx={{
                                color: '#474747',
                                fontSize: '12px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}>
                                Mar 30
                              </Typography>
                            </Box>

                            <MoreHorizIcon sx={{
                              color: '#474747',
                              fontSize: '20px',
                            }} />

                          </Box>
                        </Stack>
                        <Stack>

                          <Stack sx={{
                            '&:hover': {
                              backgroundColor: '#F7F7F7',
                            }
                          }}>
                            <Box sx={{ pl: '8%', pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Box>
                                  <Typography component='p' sx={{
                                    pr: 1,
                                    color: '#474747',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}>
                                    Justin Kidd to <Box component='span' sx={{ color: '#146EF6', }}> Jose Ortiz </Box>
                                  </Typography>
                                </Box>
                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                <Box>
                                  <Typography component='p' sx={{
                                    pl: 1, color: '#474747',
                                    fontSize: '11px',
                                    fontWeight: 400,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    mt: '2px'
                                  }}>
                                    Step 3 of <Box component='span' sx={{ color: '#146EF6', }}>Justin CRNinja Drip</Box>
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography component='p'
                                sx={{
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  pr: '5%'
                                }}
                              >
                                90 Days to Fill Your Contact Center Class? Try 14.
                              </Typography>

                              <Box>
                                <Typography component='p'
                                  sx={{
                                    color: '#474747',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    pr: '5%'
                                  }}
                                >
                                  Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                  Change Your hiring timelines forever with the...
                                </Typography>
                                <Stack
                                  direction='row' alignItems='center' mt={1} mb={1}
                                >
                                  <Box sx={{ height: '23px', width: '23px', backgroundColor: '#1DB268', borderRadius: '50%', textAlign: 'center' }}>
                                    <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                  </Box>
                                  <Box sx={{ borderTop: '2px solid #1DB268', width: '10px' }}></Box>
                                  <Box sx={{ height: '23px', width: '23px', backgroundColor: '#1DB268', borderRadius: '50%', textAlign: 'center' }}>
                                    <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                  </Box>
                                  <Box sx={{ borderTop: '2px solid #1DB268', width: '10px' }}></Box>
                                  <Box sx={{ height: '23px', width: '23px', backgroundColor: '#F0F0F0', borderRadius: '50%', textAlign: 'center' }}>
                                    <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                  </Box>
                                  <Box sx={{ borderTop: '2px solid #F0F0F0', width: '10px' }}></Box>
                                  <Box sx={{ height: '23px', width: '23px', backgroundColor: '#F0F0F0', borderRadius: '50%', textAlign: 'center' }}>
                                    <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                  </Box>
                                </Stack>
                              </Box>
                            </Box>

                            <Box sx={{
                              display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2,
                              borderBottom: '1px solid #E6E6E6'
                            }}>
                              <Box>
                                <Typography component='p' sx={{
                                  color: '#474747',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  fontFamily: 'Segoe UI'
                                }}>
                                  Mar 30
                                </Typography>
                              </Box>

                              <MoreHorizIcon sx={{
                                color: '#474747',
                                fontSize: '20px',
                              }} />

                            </Box>
                          </Stack>
                        </Stack>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Button
                            disableRipple
                            sx={{
                              color: '#146EF6',
                              fontSize: '14px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              textTransform: 'capitalize',
                              '&:hover': {
                                backgroundColor: '#E6E6E6',

                              }
                            }}
                          >
                            Show in Window View
                          </Button>
                        </Box>
                      </Stack>

                    </Stack>
                  }

                  {isRadioCall &&
                    <Stack sx={{ width: '100%' }}>
                      <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          {/* <Box
                    sx={{ pl: 2, mb: 1, width: '85%' }}
                  > */}
                          <Autocomplete
                            disablePortal
                            id="selectdispose"
                            options={labels}
                            sx={{
                              width: '85%',
                              mb: 1,
                              "& .MuiAutocomplete-popupIndicator": {
                                transform: "unset",
                                color: "#737373",
                                '& .MuiTouchRipple-root': {
                                  display: 'none',
                                },
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              },
                              '& .MuiOutlinedInput-root': {
                                p: 0
                              },
                              '& .MuiAutocomplete-clearIndicator': {
                                color: '#919191',
                                height: '8px',
                                width: '8px',
                                mr: 1,
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              }
                            }}
                            getOptionLabel={(option) => option.label}

                            renderOption={(props, option) => (
                              (<li {...props}
                                style={{
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}
                                onMouseEnter={(e: any) => {
                                  e.target.style.backgroundColor = '#146EF6';
                                  e.target.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e: any) => {
                                  e.target.style.backgroundColor = 'unset';
                                  e.target.style.color = 'unset';
                                }}
                              >{option.label}</li>) // Customize the font color here
                            )}
                            renderInput={(params) => <TextField {...params} placeholder="Select disposition..."
                              sx={{
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                  color: '#737373',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  opacity: 1,
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                  borderWidth: '1px'
                                },
                              }} />}
                          />
                          {/* </Box> */}
                          {/* <Box
                    sx={{ pl: 2, mb: 1 }}
                  > */}
                          <Autocomplete
                            disablePortal
                            id="selectpurpose"
                            options={labels}
                            sx={{
                              width: '85%',
                              mb: 1,
                              "& .MuiAutocomplete-popupIndicator": {
                                transform: "unset",
                                color: "#737373",
                                '& .MuiTouchRipple-root': {
                                  display: 'none',
                                },
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              },
                              '& .MuiOutlinedInput-root': {
                                pl: 0,
                                pb: 0,
                                pt: 0,
                                pr: 0
                              },
                              '& .MuiAutocomplete-clearIndicator': {
                                color: '#919191',
                                height: '8px',
                                width: '8px',
                                mr: 1,
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              }
                            }}
                            getOptionLabel={(option) => option.label}

                            renderOption={(props, option) => (
                              (<li {...props}
                                style={{
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}
                                onMouseEnter={(e: any) => {
                                  e.target.style.backgroundColor = '#146EF6';
                                  e.target.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e: any) => {
                                  e.target.style.backgroundColor = 'unset';
                                  e.target.style.color = 'unset';
                                }}
                              >{option.label}</li>) // Customize the font color here
                            )}
                            renderInput={(params) => <TextField {...params} placeholder="Select Purpose..."
                              sx={{
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                  color: '#737373',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  opacity: 1,
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                  borderWidth: '1px'
                                },
                              }} />}
                          />
                          {/* </Box> */}
                          <TextField
                            sx={{
                              width: '85%',
                              height: '72px',
                              pb: 5,
                              color: '#1A1A1A',
                              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#146EF6',
                              },
                              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#146EF6',
                                borderWidth: '1px',
                              },
                              '& .MuiInputBase-input': {
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              },
                              '& .MuiInputBase-input::placeholder': {
                                color: '#919191',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                opacity: 0.80,
                              },
                            }}
                            multiline
                            rows={3}
                            placeholder="Type a note..."
                            value={callText}
                            onChange={handleCallChange}
                          />
                        </Box>

                        <Stack direction='row' spacing={2} pl='8%' alignItems='center' mb={2}>
                          <Button
                            disableRipple
                            sx={{
                              width: '81px',
                              height: '31px',
                              backgroundColor: callText ? '#146EF6' : '#CACACC',
                              textTransform: 'capitalize',
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: '14px',
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              '&:hover': {
                                backgroundColor: callText ? '#146EF6' : '#CACACC',
                              }
                            }}
                          >
                            Log Call
                          </Button>

                        </Stack>
                      </Stack>

                      <Stack >
                        <Box sx={{ height: '32px', backgroundColor: '#F7F7F7', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 0.2 }}>
                          <Typography
                            sx={{
                              color: '#474747',
                              fontSize: '16px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              pl: 2
                            }}
                          >
                            Activities
                          </Typography>
                          <Button
                            disableRipple
                            endIcon={<ArrowDropDownIcon />}
                            sx={{
                              color: '#146EF6',
                              fontSize: '14px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              textTransform: 'capitalize',
                              pr: 1,
                              whiteSpace: 'nowrap',
                              '&:hover': {
                                backgroundColor: '#F7F7F7',
                                color: '#0852C2'
                              }
                            }}
                          >
                            Showing 1 Activity Type
                          </Button>

                        </Box>

                        <Stack sx={{
                          '&:hover': {
                            backgroundColor: '#F7F7F7'
                          }
                        }}>
                          <Box sx={{ pl: '8%', pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Box>
                                <Typography component='p' sx={{
                                  pr: 1,
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}>
                                  Justin Kidd to <Box component='span' sx={{ color: '#146EF6', }}> Jose Ortiz </Box>
                                </Typography>
                              </Box>
                              <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                              <Box>
                                <Typography component='p' sx={{
                                  pl: 1, color: '#474747',
                                  fontSize: '11px',
                                  fontWeight: 400,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  mt: '2px'
                                }}>
                                  Step 4 of <Box component='span' sx={{ color: '#146EF6', }}>Justin CRNinja Drip</Box>
                                </Typography>
                              </Box>
                            </Box>
                            <Typography component='p'
                              sx={{
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}
                            >
                              Achieve 50% Less Attrition. At Ninja-Like Speed.
                            </Typography>

                            <Box>
                              <Typography component='p'
                                sx={{
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}
                              >
                                Hi Jose, Get the Right Agents, With the Right Skills,
                                Right Away, It's been about two weeks since we....
                              </Typography>
                              <Box sx={{
                                backgroundColor: '#EB7A2F',
                                height: '20px', width: '155px',
                                borderRadius: '3px', textAlign: 'center', mt: 1,
                              }}>
                                <Typography component='p' sx={{
                                  color: '#ffffff', fontSize: '12px',
                                  fontWeight: 700, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}>
                                  Not Sent - Sendgrid Drop
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                            <Box>
                              <Typography component='p' sx={{
                                color: '#474747',
                                fontSize: '12px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}>
                                Mar 30
                              </Typography>
                            </Box>

                            <MoreHorizIcon sx={{
                              color: '#474747',
                              fontSize: '20px',
                            }} />

                          </Box>
                        </Stack>

                        <Stack sx={{
                          '&:hover': {
                            backgroundColor: '#F7F7F7'
                          }
                        }}>
                          <Box sx={{ p: '8%', pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Box>
                                <Typography component='p' sx={{
                                  pr: 1,
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}>
                                  Justin Kidd to <Box component='span' sx={{ color: '#146EF6', }}> Jose Ortiz </Box>
                                </Typography>
                              </Box>
                              <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                              <Box>
                                <Typography component='p' sx={{
                                  pl: 1, color: '#474747',
                                  fontSize: '11px',
                                  fontWeight: 400,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  mt: '2px'
                                }}>
                                  Step 3 of <Box component='span' sx={{ color: '#146EF6', }}>Justin CRNinja Drip</Box>
                                </Typography>
                              </Box>
                            </Box>
                            <Typography component='p'
                              sx={{
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}
                            >
                              90 Days to Fill Your Contact Center Class? Try 14.
                            </Typography>

                            <Box>
                              <Typography component='p'
                                sx={{
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}
                              >
                                Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                Change Your hiring timelines forever with the...
                              </Typography>
                              <Stack
                                direction='row' alignItems='center' mt={1} mb={1}
                              >
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#1DB268', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                                <Box sx={{ borderTop: '2px solid #1DB268', width: '10px' }}></Box>
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#1DB268', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                                <Box sx={{ borderTop: '2px solid #1DB268', width: '10px' }}></Box>
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#F0F0F0', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                                <Box sx={{ borderTop: '2px solid #F0F0F0', width: '10px' }}></Box>
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#F0F0F0', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                              </Stack>
                            </Box>
                          </Box>
                          <Box sx={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2,
                            borderBottom: '1px solid #E6E6E6'
                          }}>
                            <Box>
                              <Typography component='p' sx={{
                                color: '#474747',
                                fontSize: '12px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}>
                                Mar 30
                              </Typography>
                            </Box>

                            <MoreHorizIcon sx={{
                              color: '#474747',
                              fontSize: '20px',
                            }} />

                          </Box>
                        </Stack>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Button
                            disableRipple
                            sx={{
                              color: '#146EF6',
                              fontSize: '14px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              textTransform: 'capitalize',
                              '&:hover': {
                                backgroundColor: '#E6E6E6',

                              }
                            }}
                          >
                            Show in Window View
                          </Button>
                        </Box>
                      </Stack>

                    </Stack>
                  }

                  {isRadioAction &&
                    <Stack sx={{ width: '100%' }}>
                      <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          <TextField
                            sx={{
                              width: '85%',
                              height: '72px',
                              pb: 5,
                              color: '#1A1A1A',
                              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#146EF6',
                              },
                              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#146EF6',
                                borderWidth: '1px',
                              },
                              '& .MuiInputBase-input': {
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              },
                              '& .MuiInputBase-input::placeholder': {
                                color: '#919191',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                opacity: 0.80,
                              },
                            }}
                            multiline
                            rows={3}
                            placeholder="Type a note..."
                            value={actionText}
                            onChange={handleActionChange}
                          />
                        </Box>

                        <Stack direction='row' spacing={2} pl='8%' alignItems='center' mb={2}>
                          <Button
                            disableRipple
                            sx={{
                              width: '130px',
                              height: '31px',
                              backgroundColor: actionText ? '#146EF6' : '#CACACC',
                              textTransform: 'capitalize',
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: '14px',
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              '&:hover': {
                                backgroundColor: actionText ? '#146EF6' : '#CACACC',
                              }
                            }}
                          >
                            Log Action Item
                          </Button>

                        </Stack>
                      </Stack>

                      <Stack >
                        <Box sx={{ height: '32px', backgroundColor: '#F7F7F7', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 0.2 }}>
                          <Typography
                            sx={{
                              color: '#474747',
                              fontSize: '16px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              pl: 2
                            }}
                          >
                            Activities
                          </Typography>
                          <Button
                            disableRipple
                            endIcon={<ArrowDropDownIcon />}
                            sx={{
                              color: '#146EF6',
                              fontSize: '14px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              textTransform: 'capitalize',
                              pr: 1,
                              whiteSpace: 'nowrap',
                              '&:hover': {
                                backgroundColor: '#F7F7F7',
                                color: '#0852C2'
                              }
                            }}
                          >
                            Showing 1 Activity Type
                          </Button>

                        </Box>

                        <Stack sx={{
                          '&:hover': {
                            backgroundColor: '#F7F7F7'
                          }
                        }}>
                          <Box sx={{ pl: '8%', pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Box>
                                <Typography component='p' sx={{
                                  pr: 1,
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}>
                                  Justin Kidd to <Box component='span' sx={{ color: '#146EF6', }}> Jose Ortiz </Box>
                                </Typography>
                              </Box>
                              <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                              <Box>
                                <Typography component='p' sx={{
                                  pl: 1, color: '#474747',
                                  fontSize: '11px',
                                  fontWeight: 400,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  mt: '2px'
                                }}>
                                  Step 4 of <Box component='span' sx={{ color: '#146EF6', }}>Justin CRNinja Drip</Box>
                                </Typography>
                              </Box>
                            </Box>
                            <Typography component='p'
                              sx={{
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}
                            >
                              Achieve 50% Less Attrition. At Ninja-Like Speed.
                            </Typography>

                            <Box>
                              <Typography component='p'
                                sx={{
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}
                              >
                                Hi Jose, Get the Right Agents, With the Right Skills,
                                Right Away, It's been about two weeks since we....
                              </Typography>
                              <Box sx={{
                                backgroundColor: '#EB7A2F',
                                height: '20px', width: '155px',
                                borderRadius: '3px', textAlign: 'center', mt: 1,
                              }}>
                                <Typography component='p' sx={{
                                  color: '#ffffff', fontSize: '12px',
                                  fontWeight: 700, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}>
                                  Not Sent - Sendgrid Drop
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                            <Box>
                              <Typography component='p' sx={{
                                color: '#474747',
                                fontSize: '12px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}>
                                Mar 30
                              </Typography>
                            </Box>

                            <MoreHorizIcon sx={{
                              color: '#474747',
                              fontSize: '20px',
                            }} />

                          </Box>
                        </Stack>

                        <Stack sx={{
                          '&:hover': {
                            backgroundColor: '#F7F7F7'
                          }
                        }}>
                          <Box sx={{ pl: '8%', pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Box>
                                <Typography component='p' sx={{
                                  pr: 1,
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}>
                                  Justin Kidd to <Box component='span' sx={{ color: '#146EF6', }}> Jose Ortiz </Box>
                                </Typography>
                              </Box>
                              <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                              <Box>
                                <Typography component='p' sx={{
                                  pl: 1, color: '#474747',
                                  fontSize: '11px',
                                  fontWeight: 400,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  mt: '2px'
                                }}>
                                  Step 3 of <Box component='span' sx={{ color: '#146EF6', }}>Justin CRNinja Drip</Box>
                                </Typography>
                              </Box>
                            </Box>
                            <Typography component='p'
                              sx={{
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}
                            >
                              90 Days to Fill Your Contact Center Class? Try 14.
                            </Typography>

                            <Box>
                              <Typography component='p'
                                sx={{
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}
                              >
                                Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                Change Your hiring timelines forever with the...
                              </Typography>
                              <Stack
                                direction='row' alignItems='center' mt={1} mb={1}
                              >
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#1DB268', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                                <Box sx={{ borderTop: '2px solid #1DB268', width: '10px' }}></Box>
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#1DB268', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                                <Box sx={{ borderTop: '2px solid #1DB268', width: '10px' }}></Box>
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#F0F0F0', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                                <Box sx={{ borderTop: '2px solid #F0F0F0', width: '10px' }}></Box>
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#F0F0F0', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                              </Stack>
                            </Box>
                          </Box>
                          <Box sx={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2,
                            borderBottom: '1px solid #E6E6E6'
                          }}>
                            <Box>
                              <Typography component='p' sx={{
                                color: '#474747',
                                fontSize: '12px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}>
                                Mar 30
                              </Typography>
                            </Box>

                            <MoreHorizIcon sx={{
                              color: '#474747',
                              fontSize: '20px',
                            }} />

                          </Box>
                        </Stack>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Button
                            disableRipple
                            sx={{
                              color: '#146EF6',
                              fontSize: '14px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              textTransform: 'capitalize',
                              '&:hover': {
                                backgroundColor: '#E6E6E6',

                              }
                            }}
                          >
                            Show in Window View
                          </Button>
                        </Box>
                      </Stack>

                    </Stack>
                  }

                  {isRadioTask &&
                    <Stack sx={{ width: '100%' }}>
                      <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          {/* <Box
                  sx={{ pl: 2, mb: 1 }}
                > */}

                          <Autocomplete
                            disablePortal
                            id="selecttaskdispose"
                            options={labels}
                            sx={{
                              width: '85%',

                              mb: 1,
                              "& .MuiAutocomplete-popupIndicator": {
                                transform: "unset",
                                color: "#737373",
                                '& .MuiTouchRipple-root': {
                                  display: 'none',
                                },
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              },
                              '& .MuiOutlinedInput-root': {
                                pl: 0,
                                pb: 0,
                                pt: 0,
                                pr: 0
                              },
                              '& .MuiAutocomplete-clearIndicator': {
                                color: '#919191',
                                height: '8px',
                                width: '8px',
                                mr: 1,
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              }
                            }}
                            getOptionLabel={(option) => option.label}

                            renderOption={(props, option) => (
                              (<li {...props}
                                style={{
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}
                                onMouseEnter={(e: any) => {
                                  e.target.style.backgroundColor = '#146EF6';
                                  e.target.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e: any) => {
                                  e.target.style.backgroundColor = 'unset';
                                  e.target.style.color = 'unset';
                                }}
                              >{option.label}</li>) // Customize the font color here
                            )}
                            renderInput={(params) => <TextField {...params} placeholder="Select disposition..."
                              sx={{
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                  color: '#737373',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  opacity: 1,
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                  borderWidth: '1px'
                                },
                              }} />}
                          />
                          {/* </Box>
                <Box
                  sx={{ pl: 2, mb: 1 }}
                > */}
                          <Autocomplete
                            disablePortal
                            id="selecttaskpurpose"
                            options={labels}
                            sx={{
                              width: '85%',

                              mb: 1,
                              "& .MuiAutocomplete-popupIndicator": {
                                transform: "unset",
                                color: "#737373",
                                '& .MuiTouchRipple-root': {
                                  display: 'none',
                                },
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              },
                              '& .MuiOutlinedInput-root': {
                                pl: 0,
                                pb: 0,
                                pt: 0,
                                pr: 0
                              },
                              '& .MuiAutocomplete-clearIndicator': {
                                color: '#919191',
                                height: '8px',
                                width: '8px',
                                mr: 1,
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              }
                            }}
                            getOptionLabel={(option) => option.label}

                            renderOption={(props, option) => (
                              (<li {...props}
                                style={{
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}
                                onMouseEnter={(e: any) => {
                                  e.target.style.backgroundColor = '#146EF6';
                                  e.target.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e: any) => {
                                  e.target.style.backgroundColor = 'unset';
                                  e.target.style.color = 'unset';
                                }}
                              >{option.label}</li>) // Customize the font color here
                            )}
                            renderInput={(params) => <TextField {...params} placeholder="Select Purpose..."
                              sx={{
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                  color: '#737373',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  opacity: 1,
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                  borderWidth: '1px'
                                },
                              }} />}
                          />
                          {/* </Box>
                <Box
                  sx={{ pl: 2, mb: 1 }}
                > */}
                          <Autocomplete
                            disablePortal
                            id="taskassign"
                            options={labels}
                            sx={{
                              width: '85%',

                              mb: 1,
                              "& .MuiAutocomplete-popupIndicator": {
                                transform: "unset",
                                color: "#737373",
                                '& .MuiTouchRipple-root': {
                                  display: 'none',
                                },
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              },
                              '& .MuiOutlinedInput-root': {
                                pl: 0,
                                pb: 0,
                                pt: 0,
                                pr: 0
                              },
                              '& .MuiAutocomplete-clearIndicator': {
                                color: '#919191',
                                height: '8px',
                                width: '8px',
                                mr: 1,
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              }
                            }}
                            getOptionLabel={(option) => option.label}

                            renderOption={(props, option) => (
                              (<li {...props}
                                style={{
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}
                                onMouseEnter={(e: any) => {
                                  e.target.style.backgroundColor = '#146EF6';
                                  e.target.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e: any) => {
                                  e.target.style.backgroundColor = 'unset';
                                  e.target.style.color = 'unset';
                                }}
                              >{option.label}</li>) // Customize the font color here
                            )}
                            renderInput={(params) => <TextField {...params} placeholder="Assigned to"
                              sx={{
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                  color: '#737373',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  opacity: 1,
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                  borderWidth: '1px'
                                },
                              }} />}
                          />
                          {/* </Box> */}
                          <Stack
                            sx={{ mb: 1, width: '85%' }}
                            direction='row'
                            spacing={1}
                          >
                            <Autocomplete
                              disablePortal
                              disableClearable
                              id="selecttaskdate"
                              options={labels}
                              sx={{
                                width: '50%',

                                "& .MuiAutocomplete-popupIndicator": {
                                  transform: "unset",
                                  color: "#737373",
                                  '& .MuiTouchRipple-root': {
                                    display: 'none',
                                  },
                                  '&:hover': {
                                    backgroundColor: '#ffffff'
                                  }
                                },
                                '& .MuiOutlinedInput-root': {
                                  pl: 0,
                                  pb: 0,
                                  pt: 0,
                                  pr: 0
                                },
                                '& .MuiAutocomplete-clearIndicator': {
                                  color: '#919191',
                                  height: '8px',
                                  width: '8px',
                                  mr: 1,
                                  '&:hover': {
                                    backgroundColor: '#ffffff'
                                  }
                                }
                              }}
                              getOptionLabel={(option) => option.label}

                              renderOption={(props, option) => (
                                (<li {...props}
                                  style={{
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                  onMouseEnter={(e: any) => {
                                    e.target.style.backgroundColor = '#146EF6';
                                    e.target.style.color = '#ffffff';
                                  }}
                                  onMouseLeave={(e: any) => {
                                    e.target.style.backgroundColor = 'unset';
                                    e.target.style.color = 'unset';
                                  }}
                                >{option.label}</li>) // Customize the font color here
                              )}
                              renderInput={(params) => <TextField {...params} placeholder="Select Date"
                                sx={{
                                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  },
                                  '& .MuiInputBase-input::placeholder': {
                                    color: '#737373',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    opacity: 1,
                                  },
                                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#146EF6',
                                  },
                                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#146EF6',
                                    borderWidth: '1px'
                                  },
                                }} />}
                            />

                            <Autocomplete
                              disablePortal
                              disableClearable
                              id="selecttasktime"
                              options={labels}
                              sx={{
                                width: '50%',

                                "& .MuiAutocomplete-popupIndicator": {
                                  transform: "unset",
                                  color: "#737373",
                                  '& .MuiTouchRipple-root': {
                                    display: 'none',
                                  },
                                  '&:hover': {
                                    backgroundColor: '#ffffff'
                                  }
                                },
                                '& .MuiOutlinedInput-root': {
                                  pl: 0,
                                  pb: 0,
                                  pt: 0,
                                  pr: 0
                                },
                                '& .MuiAutocomplete-clearIndicator': {
                                  color: '#919191',
                                  height: '8px',
                                  width: '8px',
                                  mr: 1,
                                  '&:hover': {
                                    backgroundColor: '#ffffff'
                                  }
                                }
                              }}
                              getOptionLabel={(option) => option.label}

                              renderOption={(props, option) => (
                                (<li {...props}
                                  style={{
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  }}
                                  onMouseEnter={(e: any) => {
                                    e.target.style.backgroundColor = '#146EF6';
                                    e.target.style.color = '#ffffff';
                                  }}
                                  onMouseLeave={(e: any) => {
                                    e.target.style.backgroundColor = 'unset';
                                    e.target.style.color = 'unset';
                                  }}
                                >{option.label}</li>) // Customize the font color here
                              )}
                              renderInput={(params) => <TextField {...params} placeholder="Select Time"
                                sx={{
                                  '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  },
                                  '& .MuiInputBase-input::placeholder': {
                                    color: '#737373',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                    opacity: 1,
                                  },
                                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#146EF6',
                                  },
                                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#146EF6',
                                    borderWidth: '1px'
                                  },
                                }} />}
                            />
                          </Stack>
                          {/* <Box
                  sx={{ pl: 2, mb: 1 }}
                > */}
                          <Autocomplete
                            disablePortal
                            id="taskpriority"
                            options={labels}
                            sx={{
                              width: '85%',
                              mb: 1,
                              "& .MuiAutocomplete-popupIndicator": {
                                transform: "unset",
                                color: "#737373",
                                '& .MuiTouchRipple-root': {
                                  display: 'none',
                                },
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              },
                              '& .MuiOutlinedInput-root': {
                                pl: 0,
                                pb: 0,
                                pt: 0,
                                pr: 0
                              },
                              '& .MuiAutocomplete-clearIndicator': {
                                color: '#919191',
                                height: '8px',
                                width: '8px',
                                mr: 1,
                                '&:hover': {
                                  backgroundColor: '#ffffff'
                                }
                              }
                            }}
                            getOptionLabel={(option) => option.label}

                            renderOption={(props, option) => (
                              (<li {...props}
                                style={{
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}
                                onMouseEnter={(e: any) => {
                                  e.target.style.backgroundColor = '#146EF6';
                                  e.target.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e: any) => {
                                  e.target.style.backgroundColor = 'unset';
                                  e.target.style.color = 'unset';
                                }}
                              >{option.label}</li>) // Customize the font color here
                            )}
                            renderInput={(params) => <TextField {...params} placeholder="Select Priority"
                              sx={{
                                '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                  color: '#1A1A1A',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                },
                                '& .MuiInputBase-input::placeholder': {
                                  color: '#737373',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  opacity: 1
                                },
                                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                },
                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                  borderColor: '#146EF6',
                                  borderWidth: '1px'
                                },
                              }} />}
                          />
                          {/* </Box> */}
                          <TextField
                            sx={{
                              width: '85%',
                              height: '72px',
                              pb: 5,
                              color: '#1A1A1A',
                              '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#146EF6',
                              },
                              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#146EF6',
                                borderWidth: '1px',
                              },
                              '& .MuiInputBase-input': {
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              },
                              '& .MuiInputBase-input::placeholder': {
                                color: '#919191',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                opacity: 0.80,
                              },
                            }}
                            multiline
                            rows={3}
                            placeholder="Type a note..."
                            value={tastText}
                            onChange={handleTaskChange}
                          />
                        </Box>

                        <Stack direction='row' spacing={2} pl='8%' alignItems='center' mb={2}>
                          <Button
                            disableRipple
                            sx={{
                              width: '81px',
                              height: '31px',
                              backgroundColor: tastText ? '#146EF6' : '#CACACC',
                              textTransform: 'capitalize',
                              color: '#ffffff',
                              fontWeight: 700,
                              fontSize: '14px',
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              '&:hover': {
                                backgroundColor: tastText ? '#146EF6' : '#CACACC',
                              }
                            }}
                          >
                            Log Task
                          </Button>

                        </Stack>
                      </Stack>

                      <Stack >
                        <Box sx={{ height: '32px', backgroundColor: '#F7F7F7', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 0.2 }}>
                          <Typography
                            sx={{
                              color: '#474747',
                              fontSize: '16px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              pl: '5%'
                            }}
                          >
                            Activities
                          </Typography>
                          <Button
                            disableRipple
                            endIcon={<ArrowDropDownIcon />}
                            sx={{
                              color: '#146EF6',
                              fontSize: '14px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              textTransform: 'capitalize',
                              pr: 1,
                              whiteSpace: 'nowrap',
                              '&:hover': {
                                backgroundColor: '#F7F7F7',
                                color: '#0852C2'
                              }
                            }}
                          >
                            Showing 1 Activity Type
                          </Button>

                        </Box>

                        <Stack sx={{
                          '&:hover': {
                            backgroundColor: '#F7F7F7'
                          }
                        }}>
                          <Box sx={{ pl: '8%', pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Box>
                                <Typography component='p' sx={{
                                  pr: 1,
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}>
                                  Justin Kidd to <Box component='span' sx={{ color: '#146EF6', }}> Jose Ortiz </Box>
                                </Typography>
                              </Box>
                              <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                              <Box>
                                <Typography component='p' sx={{
                                  pl: 1, color: '#474747',
                                  fontSize: '11px',
                                  fontWeight: 400,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  mt: '2px'
                                }}>
                                  Step 4 of <Box component='span' sx={{ color: '#146EF6', }}>Justin CRNinja Drip</Box>
                                </Typography>
                              </Box>
                            </Box>
                            <Typography component='p'
                              sx={{
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}
                            >
                              Achieve 50% Less Attrition. At Ninja-Like Speed.
                            </Typography>

                            <Box>
                              <Typography component='p'
                                sx={{
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}
                              >
                                Hi Jose, Get the Right Agents, With the Right Skills,
                                Right Away, It's been about two weeks since we....
                              </Typography>
                              <Box sx={{
                                backgroundColor: '#EB7A2F',
                                height: '20px', width: '155px',
                                borderRadius: '3px', textAlign: 'center', mt: 1,
                              }}>
                                <Typography component='p' sx={{
                                  color: '#ffffff', fontSize: '12px',
                                  fontWeight: 700, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                }}>
                                  Not Sent - Sendgrid Drop
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                            <Box>
                              <Typography component='p' sx={{
                                color: '#474747',
                                fontSize: '12px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}>
                                Mar 30
                              </Typography>
                            </Box>

                            <MoreHorizIcon sx={{
                              color: '#474747',
                              fontSize: '20px',
                            }} />

                          </Box>
                        </Stack>

                        <Stack sx={{
                          '&:hover': {
                            backgroundColor: '#F7F7F7'
                          }
                        }}>
                          <Box sx={{ pl: '8%', pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                              <Box>
                                <Typography component='p' sx={{
                                  pr: 1,
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}>
                                  Justin Kidd to <Box component='span' sx={{ color: '#146EF6', }}> Jose Ortiz </Box>
                                </Typography>
                              </Box>
                              <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                              <Box>
                                <Typography component='p' sx={{
                                  pl: 1, color: '#474747',
                                  fontSize: '11px',
                                  fontWeight: 400,
                                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                  mt: '2px'
                                }}>
                                  Step 3 of <Box component='span' sx={{ color: '#146EF6', }}>Justin CRNinja Drip</Box>
                                </Typography>
                              </Box>
                            </Box>
                            <Typography component='p'
                              sx={{
                                color: '#1A1A1A',
                                fontSize: '14px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}
                            >
                              90 Days to Fill Your Contact Center Class? Try 14.
                            </Typography>

                            <Box>
                              <Typography component='p'
                                sx={{
                                  color: '#474747',
                                  fontSize: '14px',
                                  fontWeight: 400,
                                  fontFamily: 'Segoe UI'
                                }}
                              >
                                Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                Change Your hiring timelines forever with the...
                              </Typography>
                              <Stack
                                direction='row' alignItems='center' mt={1} mb={1}
                              >
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#1DB268', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                                <Box sx={{ borderTop: '2px solid #1DB268', width: '10px' }}></Box>
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#1DB268', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                                <Box sx={{ borderTop: '2px solid #1DB268', width: '10px' }}></Box>
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#F0F0F0', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                                <Box sx={{ borderTop: '2px solid #F0F0F0', width: '10px' }}></Box>
                                <Box sx={{ height: '23px', width: '23px', backgroundColor: '#F0F0F0', borderRadius: '50%', textAlign: 'center' }}>
                                  <MailOutlineOutlinedIcon sx={{ width: '13px', height: '13px', color: '#ffffff' }} />
                                </Box>
                              </Stack>
                            </Box>
                          </Box>
                          <Box sx={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 2,
                            borderBottom: '1px solid #E6E6E6'
                          }}>
                            <Box>
                              <Typography component='p' sx={{
                                color: '#474747',
                                fontSize: '12px',
                                fontWeight: 600,
                                fontFamily: 'Segoe UI'
                              }}>
                                Mar 30
                              </Typography>
                            </Box>

                            <MoreHorizIcon sx={{
                              color: '#474747',
                              fontSize: '20px',
                            }} />

                          </Box>
                        </Stack>
                        <Box sx={{ textAlign: 'center', p: 1 }}>
                          <Button
                            disableRipple
                            sx={{
                              color: '#146EF6',
                              fontSize: '14px',
                              fontWeight: 600,
                              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              textTransform: 'capitalize',
                              '&:hover': {
                                backgroundColor: '#E6E6E6',

                              }
                            }}
                          >
                            Show in Window View
                          </Button>
                        </Box>
                      </Stack>

                    </Stack>
                  }
                </Stack>
              }

              {isAccount &&
                <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                  Account
                </Stack>
              }

            </Card>
          </Stack >

        </Stack >
      )}
  </>);
}
export default Contacts;
