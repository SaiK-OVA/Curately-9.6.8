
// import React, { useState, useContext } from "react";
// import { useContext } from "react";
import { useEffect, useState } from "../../../../../../shared/modules/React";
// import { useNavigate } from 'react-router-dom';
import { Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { Button } from "../../../../../../shared/modules/MaterialImports/Button";
import { Card } from "../../../../../../shared/modules/MaterialImports/Card";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
// import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
// import SearchSharpIcon from '@mui/icons-material/SearchSharp';
// import Research from "./Research/Research";
// import ExistingContacts from "./ExistingContacts/ExistingContacts";
// import Sequence from "./Sequence/Sequence";
// import CustomFields from "./CustomFields/CustomerFields";
// import Opportunities from "./Opportunities/Opportunities";
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import CloudIcon from '@mui/icons-material/Cloud';
// import Paper from '@mui/material/Paper';
import { useParams, useNavigate } from 'react-router-dom';
// import apiService from "../../shared/api/apiService";
// import CircularProgress from '@mui/material/CircularProgress';
// import ProfileResearch from "./ProfileResearch/ProfileResearch";
import { CircularProgress } from '../../../../../../shared/modules/MaterialImports/CircularProgress';
import apiService from "../../shared/api/apiService";
// import { Store } from "../DataLabs/DataLabs";
import './Profile.scss'
import { DateTime } from '../../../../../../shared/modules/Luxon';
import { userLocalData } from "../../../../../../shared/services/userData";
// import PDLBreadCrumbs from "./PDLBreadCrumbs";
import BasicBreadcrumbs from "../../../../../../shared/components/BreadCrumbs/BreadCrumbs";
import {
  Menu,
  MenuItem,
} from "../../../../../../shared/modules/MaterialImports/Menu";
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";

// const labels = [
//   { label: 'Buyer intent 7-19', id: 1 },
//   { label: 'NJ Now hiring 7-18', id: 2 },
//   { label: 'KMQ', id: 3 },
//   { label: 'NY Indeed Hiring', id: 4 },
//   { label: 'MSP_List', id: 5 },
//   { label: "AGS New", id: 6 },
//   { label: 'CCWJULY23', id: 7 },
//   {
//     label: 'CCW Booth Lead',
//     id: 8,
//   },
//   { label: 'CCW Attendee_2', id: 9 },
//   { label: 'Arizone - CXJobs', id: 10 },
//   {
//     label: 'Georgia - CXJobs',
//     id: 11,
//   },
//   {
//     label: 'San Antonio - CXJobs',
//     id: 12,
//   },
//   { label: 'Austin - CXJobs', id: 13 },
//   { label: 'Onsite - CXJobs', id: 14 },
//   {
//     label: 'Remote - CXJobs',
//     id: 15,
//   },
//   { label: "Dallas - CXJobs", id: 16 }

// ];

const Profile = () => {

  console.log('Profile Component');
  const navigate = useNavigate();
  const { id } = useParams();
  // const [searchData, setSearchData] = useContext(Store);
  const recrData = JSON.parse(localStorage.getItem('demoUserInfo') || '{}');
  // const navigate = useNavigate();
  const [shortData, setShortData] = useState(localStorage["short" + id] ? JSON.parse(localStorage["short" + id]) : {});
  // console.log('shortData', shortData);
  // const [isReSearch, setIsReSearch] = useState(true);
  // const [isExistingContacts, setIsExistingContacts] = useState(false);
  // const [isSequnece, setIsSequnece] = useState(false);
  // const [isCustomFields, setIsCustomFields] = useState(false);
  // const [isOpportunities, setIsOpportunities] = useState(false);
  // const [selectedRadiovalue, setSelectedRadioValue] = useState('Note');
  // const [isRadioNote, setIsRadioNote] = useState(true);
  // const [isRadioCall, setIsRadioCall] = useState(false);
  // const [isRadioAction, setIsRadioAction] = useState(false);
  // const [isRadioTask, setIsRadioTask] = useState(false);
  // const [isContact, setIsContact] = useState(true)
  // const [isAccount, setIsAccount] = useState(false)
  // const [noteText, setNoteText] = useState('')
  // const [callText, setCallText] = useState('')
  // const [actionText, setActionText] = useState('')
  // const [tastText, setTaskText] = useState('')

  const [isNameHover, setIsNameHover] = useState(false)
  const [isMailHover, setIsMailHover] = useState(false)
  const [isCallHover, setIsCallHover] = useState(false)
  const [isCompanyHover, setIsCompanyHover] = useState(false)
  const [isContactStageHover, setIsContactStageHover] = useState(false)
  const [isContactOwnerHover, setIsContactOwnerHover] = useState(false)
  const [isLocationHover, setIsLocationHover] = useState(false)
  const [isLocalTimeHover, setIsLocalTimeHover] = useState(false)
  const [contactMenu, setContactMenu] = useState<any>(null)
  const openContactMenu = Boolean(contactMenu);

  // const isCandidate = () => window.location.hash.includes('/resume/people');
  const isContact = () => window.location.hash.includes('/contact/people');

  const handleOpenContact = (event: React.MouseEvent<HTMLButtonElement>) => {
    //  setSelectedRowId(rowVal.id)
    setContactMenu(event.currentTarget)
    if (shortData.linkedin_url) {
      let postObj = {
        "linkedinUrl": [
          shortData?.linkedin_url
        ],
        clientId: recrData.clientId,
        recrId: recrData.recrId,
      }
      setApiLoading(true);
      apiService.profilesSearch(postObj).then((response: any) => {
        setApiLoading(false);
        console.log(response, 'fgtt', response.data.Success, response.data)
        if (response.data.Success) {
          let responseData = response.data.data[0]
          shortData.recommended_personal_email = responseData && responseData.emails.length > 0 ? responseData.emails[0] : null;
          shortData.mobile_phone = responseData && responseData.phones.length > 0 ? responseData.phones[0] : null
          shortData.isShowEmail = responseData.isShowEmail;
          shortData.isShowPhone = responseData.isShowPhone;
          shortData.isPackageEmailValidity = responseData.isPackageEmailValidity;
          shortData.isPackagePhoneValidity = responseData.isPackagePhoneValidity;
          shortData.emailType = responseData.emailType;
          shortData.phoneType = responseData.phoneType;
        }
        else {
          setContactMenu(event.currentTarget)
        }
      })
    }
    else {

      setContactMenu(event.currentTarget)
    }

  }

  const handleCloseContactMenu = (type: string) => {
    if (!type) {
      setContactMenu(null)
      return
    }

    let postObj = {
      "requestInfo": [
        {
          url: shortData.linkedin_url,
          type: 1,
          firstName: shortData.first_name,
          lastName: shortData.last_name,
          isSaveWithEmail: (type == "email" || type == "both") ? true : false,
          isSaveWithPhoneNumber: (type == "phone" || type == "both") ? true : false,
          emailType: null,
          phoneType: null
        }
      ],
      recrId: userLocalData.getvalue('recrId'),
      clientId: userLocalData.getvalue('clientId'),
    }

    if (type == "email") {
      postObj.requestInfo[0].emailType = shortData.emailType
    }
    else if (type == "phone") {
      postObj.requestInfo[0].phoneType = shortData.phoneType
    }
    else {
      postObj.requestInfo[0].emailType = shortData.emailType
      postObj.requestInfo[0].phoneType = shortData.phoneType
    }



    setApiLoading(true)

    // let pdlStartPath = localStorage.getItem('pdlStartPath');

    // let pdlClientName = localStorage.getItem('pdlClientName')


    apiService.saveLinkedinData(postObj).then((response: any) => {

      channelToBroadcast.postMessage({
        checkCreditScore: true
      });

      setApiLoading(false);
      setContactMenu(null);


      if (response.data.Success) {

        const breadCrumbsData = [
          {
            text: "Search",
            link: `../../${isContact() ? 'contact' : 'resume'}/people`
          },
          {
            text: "People",
            link: `../../${isContact() ? 'contact' : 'resume'}/people?isPdlSearch=true`,
          },
          {
            text: shortData.first_name + " " + shortData.last_name, link: ""
          },
        ];

        navigate(`../../../${isContact() ? 'contact' : 'candidate'}/view/${isContact() ? response.data.contId : response.data.userId}`, { state: { data: breadCrumbsData } });

        // let url1 = `${pdlStartPath}#/${pdlClientName}/${isContact() ? 'contact' : 'candidate'}/view/${isContact() ? response.data.contId : response.data.userId}`;
        // window.location.href = url1;

        localStorage.setItem("isProfileAccessed", JSON.stringify(true));
      } else if (response.data.Error) {
        showToaster(response.data.Message, 'error');
      }

      // let url1 = `https://app.curately.ai/#/demo/candidate/view/${response.data.userId}`;
      // window.open(url1, "_self", "noreferrer");
    });
  }
  // const [isHideActivities, setIsHideActivities] = useState(true)
  // const [NameEditanchorEl, setNameEditAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [addSequenceanchorEl, setAddSequenceAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [crmanchorEl, setCRMAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [MoreanchorEl, setMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [addtolistanchorEl, setAddToListAnchorEl] = React.useState<null | HTMLElement>(null);
  // const [pinNoteChecked, setPinNoteChecked] = useState(false);

  // const [isRoles, setIsRoles] = useState(false)
  const [apiLoading, setApiLoading] = useState(false)
  // const onClickRoles = () => {
  //   setIsRoles(!isRoles)
  // }

  const recrIds = userLocalData.getvalue("invitedAndReferredRecrIds");
  const isChromeExtEnable = userLocalData.isChromeExtensionEnabled();

  const channelToBroadcast = new BroadcastChannel("checkConsumedProfileCredits");

  const [profileCredits, setProfileCredits] = useState(0);
  const [consumedCredits, setConsumedCredits] = useState(0)
  const [smsCredits, setSmsCredits] = useState(0)
  const [consumedSmsCredits, setConsumedSmsCredits] = useState(0)

  useEffect(() => {
    let creditsData = localStorage.getItem(`credits_${userLocalData.getvalue('recrId')}`)
    if (creditsData) {
      let parsedCreditsData = JSON.parse(creditsData)
      console.log(parsedCreditsData)
      setProfileCredits(parsedCreditsData?.totalProfileCredits)
      setConsumedCredits(parsedCreditsData?.consumedProfileCredits)
      if (userLocalData.getvalue(
        "paymentType"
      ) !== 1 || userLocalData.getvalue(
        "paymentType"
      ) !== 2) {
        setSmsCredits(parsedCreditsData?.totalSmsCredits)
        setConsumedSmsCredits(parsedCreditsData?.consumedSmsCredits)
      }

    }
  }, [])

  const goToDetailPage = () => {
    let dataToPass: any = {
      recrId: userLocalData.getvalue('recrId'),
      companyId: "12938", //localStorage.getItem("companyId"),
      clientId: userLocalData.getvalue('clientId'),
      personIds: [id],
    };

    if (isChromeExtEnable) {
      dataToPass.recrIds = recrIds;
    }
    setApiLoading(true)

    let pdlStartPath = localStorage.getItem('pdlStartPath');

    let pdlClientName = localStorage.getItem('pdlClientName')


    apiService.saveToAccuick(dataToPass).then((response: any) => {

      channelToBroadcast.postMessage({
        checkCreditScore: true
      });

      setApiLoading(false)
      let url1 = `${pdlStartPath}#/${pdlClientName}/${isContact() ? 'contact' : 'candidate'}/view/${isContact() ? response.data.contId : response.data.userId}`;
      window.location.href = url1;

      localStorage.setItem("isProfileAccessed", JSON.stringify(true));

      // let url1 = `https://app.curately.ai/#/demo/candidate/view/${response.data.userId}`;
      // window.open(url1, "_self", "noreferrer");
    });


    // navigate(`/contacts/${id}`);
  }




  // const [contactLoading, setContactLoading] = useState(false);

  // const [profileData, setProfileData] = useState(
  //   {
  //     "id": "",
  //     "full_name": "",
  //     "first_name": "",
  //     "middle_initial": "",
  //     "middle_name": null,
  //     "last_initial": "",
  //     "last_name": "",
  //     "gender": "",
  //     "birth_year": 1985,
  //     "birth_date": null,
  //     "linkedin_url": "",
  //     "linkedin_username": "",
  //     "linkedin_id": "",
  //     "facebook_url": "",
  //     "facebook_username": "",
  //     "facebook_id": "",
  //     "twitter_url": "",
  //     "twitter_username": "",
  //     "github_url": null,
  //     "github_username": null,
  //     "work_email": "",
  //     "personal_emails": [],
  //     "recommended_personal_email": "",
  //     "mobile_phone": "",
  //     "industry": "",
  //     "job_title": "",
  //     "job_title_role": null,
  //     "job_title_sub_role": null,
  //     "job_title_levels": [],
  //     "job_company_id": "",
  //     "job_company_name": "",
  //     "job_company_website": "",
  //     "job_company_size": "",
  //     "job_company_founded": 1999,
  //     "job_company_industry": "",
  //     "job_company_linkedin_url": "",
  //     "job_company_linkedin_id": "",
  //     "job_company_facebook_url": "",
  //     "job_company_twitter_url": "",
  //     "job_company_location_name": "",
  //     "job_company_location_locality": "",
  //     "job_company_location_metro": "",
  //     "job_company_location_region": "",
  //     "job_company_location_geo": "",
  //     "job_company_location_street_address": "",
  //     "job_company_location_address_line_2": null,
  //     "job_company_location_postal_code": "",
  //     "job_company_location_country": "",
  //     "job_company_location_continent": "",
  //     "job_last_updated": "",
  //     "job_start_date": "",
  //     "location_name": "",
  //     "location_locality": "",
  //     "location_metro": "",
  //     "location_region": "",
  //     "location_country": "",
  //     "location_continent": "",
  //     "location_street_address": "",
  //     "location_address_line_2": null,
  //     "location_postal_code": "",
  //     "location_geo": "",
  //     "location_last_updated": "",
  //     "phone_numbers": [],
  //     "emails": [],
  //     "interests": [],
  //     "skills": [],
  //     "location_names": [],
  //     "regions": [],
  //     "countries": [],
  //     "street_addresses": [],
  //     "experience": [],
  //     "education": [],
  //     "profiles": [],
  //     "version_status": {
  //       "status": "",
  //       "contains": [],
  //       "previous_version": "",
  //       "current_version": ""
  //     }
  //   }
  // );


  // const openCRMBtn = Boolean(crmanchorEl);
  // const openAddToListenBtn = Boolean(addtolistanchorEl);

  // const { id } = useParams();



  // const handleClickAddToListen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAddToListAnchorEl(event.currentTarget);
  // };


  // const handleClickCRMBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setCRMAnchorEl(event.currentTarget);
  // };



  // const handleProfileMenuClose = () => {
  //   setAddSequenceAnchorEl(null);
  //   setCRMAnchorEl(null);
  //   setMoreAnchorEl(null);
  //   setAddToListAnchorEl(null);
  //   setNameEditAnchorEl(null)
  // };





  // const handleContactOwnerHoverEnter = () => {
  //   setIsContactStageHover(false)
  //   setIsContactOwnerHover(true)
  //   setIsLocationHover(false)
  //   setIsLocalTimeHover(false)
  //   setIsNameHover(false)
  //   setIsMailHover(false)
  //   setIsCallHover(false)
  //   setIsCompanyHover(false)
  // }



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





  // const onClickReSearch = () => {
  //   setIsReSearch(true);
  //   setIsExistingContacts(false);
  //   setIsSequnece(false);
  //   setIsCustomFields(false);
  //   setIsOpportunities(false);
  // };

  const diffExperience = (start: any, end: any): string => {
    if (!start) return "";
    let eventEndTime: any;
    if (end) {
      eventEndTime = DateTime.fromISO(end).toISODate();
    } else {
      eventEndTime = DateTime.now().toISODate();
    }
    let eventStartTime: any = DateTime.fromISO(start).toISODate();
    let endDate = DateTime.fromISO(eventEndTime);
    let startDate = DateTime.fromISO(eventStartTime);
    let diff = endDate.diff(startDate, ['years', 'months']);
    let years = Math.floor(diff.years);
    let months = Math.round(diff.months);
    if (endDate < startDate.plus({ years, months })) {
      months -= 1;
    }
    if (years === 0 && months === 0) {
      return "";
    }
    let finalDiff = "";
    if (years > 0) {
      finalDiff += `${years} Yr${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      finalDiff += ` ${months} Mo${months > 1 ? 's' : ''}`;
    }
    return finalDiff.trim();
  }



  // const getProfileDetails = () => {
  //   // send value to the backend
  //   setContactLoading(true)
  //   let dataToPass = {
  //     'personId': id,
  //   };

  //   trackPromise(
  //     apiService.getProfileData(dataToPass).then((response: any) => {
  //       setContactLoading(false)
  //       // debugger
  //       if (response.data && response.data.data) {
  //         setProfileData(response.data.data);
  //         setContactLoading(false)
  //         console.log(profileData);
  //       }
  //     })
  //   );
  // };

  // React.useEffect(() => {
  //   setContactLoading(true)
  //   getProfileDetails();
  // }, [])


  // const mobileset: string = profileData.mobile_phone

  // const formattedMobile = `(${mobileset.slice(2, 5)})-${mobileset.slice(5, 8)}-${mobileset.slice(8)}`;

  // const filteredExperiences = profileData.experience.filter((emp: any) => emp.company.name === profileData.job_company_name);
  // console.log(filteredExperiences)

  const goToUpgrade = () => {

    navigate("/" + userLocalData.getvalue('clientName') + "/upgrade");
  }

  return (
    <Stack sx={{ mt: 5, cursor: 'default' }}
      ml='20%' mr='20%'>
      <Stack sx={{ width: '100%', }}>
        <BasicBreadcrumbs />
        <Card sx={{ mb: 2, boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
          <Stack sx={{
            display: 'flex', flexDirection: 'row', width: '100%',
            textTransform: 'capitalize', overflowY: "auto"
          }}>
            <Stack sx={{ width: '100%', display: "flex", justifyContent: "space-between", flexDirection: "row" }}>

              <Box
                sx={{ pl: 3, pt: 2, mb: 3, width: "60%" }}
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
                  whiteSpace: 'nowrap',
                  textAlign: 'left'
                }} variant="h6">{shortData.full_name}</Typography>


                <Typography component='p' sx={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: '#1A1A1A',
                  textAlign: 'left'
                }}>
                  {shortData.job_title} at <Box component='span'
                    sx={{
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontWeight: 600,
                      fontSize: '14px',
                      color: '#146EF6'
                    }}
                  >
                    {shortData.job_company_name} {shortData.location_name}
                  </Box>
                </Typography>
              </Box>
              <Box sx={{ justifyContent: "center", alignItems: "center", display: "flex", height: "100%", borderLeft: '1px solid #E6E6E6', width: "40%" }}>
                <>
                  <Button
                    variant="contained"
                    disableRipple
                    endIcon={<ExpandMoreIcon />}
                    onClick={(event: any) => handleOpenContact(event)}
                    sx={{
                      // display: 'flex',
                      // alignItems: "center",
                      // justifyContent: "center",
                      // alignSelf: "center",
                      fontSize: "14px",
                      width: "125px",
                      height: "30px",
                      whiteSpace: "nowrap",
                      textTransform:
                        "capitalize",
                      backgroundColor:
                        "#146ef6",
                      boxShadow: 0,
                      "&:hover": {
                        backgroundColor:
                          "#0852C2",
                        boxShadow: 0,
                      },
                    }}
                  >
                    Access Contact
                    {/* {savedRecords.includes(row.id) ? 'Saved' : 'Save to Accuick'} */}

                  </Button>
                  <Menu
                    id={"contact-menu-popup"}

                    anchorEl={contactMenu}
                    open={openContactMenu}
                    onClose={() => handleCloseContactMenu("")}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    MenuListProps={{
                      "aria-labelledby": "contact-menu-popup",
                    }}
                    sx={{
                      "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper":
                      {
                        minWidth: "160px",
                        "& .MuiPaper-root.MuiMenu-paper.MuiPopover-paper": {
                          overflowX: "hidden",
                          border: "#D9D9D9 1px solid",
                          boxShadow: "0px 0px 0px 0px",
                        },
                        "& .MuiList-root.MuiMenu-list": {
                          pt: 0,
                          mb: 0,
                          mr: 0,
                          pb: 0
                        },
                      },
                    }}
                  >
                    {profileCredits !== 0 && profileCredits !== consumedCredits ? <MenuItem
                      sx={{
                        "&.MuiButtonBase-root.MuiMenuItem-root":
                        {
                          pr: "8px",
                          pl: "8px",
                          mr: "0px !important",
                        },

                        width: "100%",
                      }}
                      disableRipple
                      onClick={() => {
                        setContactMenu(null)
                        // handleCloseContactMenu("email")
                      }
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          width: "100%",
                        }}
                      >
                        <span>Email</span>
                        {shortData.recommended_personal_email ? <Button
                          variant="contained"
                          id={`${shortData.id}`}
                          sx={{
                            textTransform: "capitalize",
                            backgroundColor: "#146EF6",
                            fontWeight: 700,
                            fontSize: "14px",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            color: "#ffffff",
                            height: "32px",
                            width: "fit-content",
                            whiteSpace: "nowrap",
                            boxShadow: "0",
                            "&:hover": {
                              backgroundColor: "#0852C2",
                              color: "#ffffff",
                              boxShadow: "0",
                            },

                          }}
                          className=""
                          onClick={() => {
                            handleCloseContactMenu(
                              "email",

                            )
                          }}
                        >
                          View
                        </Button> : <span>N/A</span>}
                      </div>
                    </MenuItem> :

                      <MenuItem
                        sx={{
                          "&.MuiButtonBase-root.MuiMenuItem-root":
                          {
                            pr: "8px",
                            pl: "8px",
                            mr: "0px !important",
                          },

                          width: "100%",
                        }}
                        disableRipple
                        onClick={() =>
                          setContactMenu(null)
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            width: "100%",
                          }}
                        >
                          <span>Email</span>

                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className=""
                            onClick={() => {
                              goToUpgrade();
                            }}
                            startIcon={
                              <UpgradeOutlinedIcon fontSize="small" />
                            }
                          >
                            Upgrade
                          </Button>

                        </div>
                      </MenuItem>}

                    <MenuItem sx={{
                      "&.MuiButtonBase-root.MuiMenuItem-root": {
                        pr: "8px",
                        pl: "8px",
                        mr: "0px !important",
                      },

                      width: "100%"
                    }}
                      disableRipple
                      onClick={() => {
                        // if (recrData.paymentType > 2 && (smsCredits !== 0 && smsCredits !== consumedSmsCredits))
                        //   handleCloseContactMenu("phone")
                        // else {
                        setContactMenu(null)
                        // }
                      }}>
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <span>Mobile</span>
                        {shortData.mobile_phone ? (recrData.paymentType && parseInt(recrData.paymentType) <= 2) ? <Button variant='contained' color='primary' size='small' className='' onClick={() => {
                          goToUpgrade();
                        }}
                          startIcon={<UpgradeOutlinedIcon fontSize="small" />}
                        >Upgrade</Button> : <Button variant='contained' color='primary' size='small' className='' onClick={() => {
                          handleCloseContactMenu("phone");
                        }}

                        >View</Button> : <span>N/A</span>}

                      </div>
                    </MenuItem>
                    {shortData.recommended_personal_email && shortData.mobile_phone && <MenuItem sx={{
                      "&.MuiButtonBase-root.MuiMenuItem-root": {
                        pr: "8px",
                        pl: "8px",
                        mr: "0px !important",
                      },

                      width: "100%"
                    }}
                      disableRipple
                      onClick={() => {
                        setContactMenu(null);
                        // handleCloseContactMenu("both")
                      }
                      }>
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <span>Both</span>
                        {recrData.paymentType && (recrData.paymentType != 3 && recrData.paymentType != 4) ? <Button variant='contained' color='primary' size='small' className='' onClick={() => {
                          goToUpgrade();
                        }}
                          startIcon={<UpgradeOutlinedIcon fontSize="small" />}
                        >Upgrade</Button> :
                          <Button variant='contained' color='primary' size='small' className='' onClick={() => {
                            handleCloseContactMenu("both");
                          }}

                          >View</Button>
                        }

                      </div>
                    </MenuItem>}

                  </Menu>
                </>

              </Box>



            </Stack>

          </Stack>
          {shortData.summary &&
            <div className="summary-con">
              <p className="summary-hd">Summary</p>
              <p className="summary-para-text">{shortData.summary}</p>
            </div>
          }


          {shortData.experience && <Stack sx={{ borderTop: !shortData.summary ? '1px solid #E6E6E6' : "", pl: 3, pt: 1, pb: 1 }}>
            <Typography sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', mb: 1, fontSize: "17px", fontWeight: "500", textAlign: 'left' }}>
              Experience
            </Typography>
            {shortData.experience.map((exp: any) => {
              return (
                <>
                  <Box sx={{ mb: 2, textAlign: 'left' }}>
                    {/* <Typography sx={{ textTransform: "capitalize", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: "14px" }}>
                      {exp.company.name}
                    </Typography>
                    <Typography sx={{ textTransform: "capitalize", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: "14px" }}>
                      {exp.title.name}
                    </Typography>
                    <Typography sx={{ textTransform: "capitalize", fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: "14px" }}>
                      <span>{moment(exp.start_date).format("MMM YY")}</span>
                      {exp.end_date ? <span>{" -" + moment(exp.end_date).format("MMM YY")}</span> : " - Present"}
                    </Typography> */}
                    <h4 style={{ margin: "0px", letterSpacing: "0.06em", textAlign: 'left' }}>
                      <div>
                        <p className="title-style" style={{ margin: "0px", lineHeight: "30px" }}>{exp.title.name} |
                          {" " + exp.company?.name}</p>

                      </div>
                    </h4>
                    {exp.start_date &&
                      <span className="subheading pl25">
                        {DateTime.fromISO(exp.start_date).toFormat("MMM-yyyy")}
                        <span>
                          {(!exp.end_date) ? ' to Till Date' : " to " + DateTime.fromISO(exp.end_date).toFormat("MMM-yyyy")}
                        </span>
                        &nbsp;&middot; {(diffExperience(exp.start_date, exp.end_date))}
                      </span>
                    }
                    {exp.summary &&
                      <div className="job-summary-con">
                        <p className="job-summary-para-text">
                          {exp.summary}
                        </p>
                      </div>
                    }
                  </Box>

                </>
              )
            })}
            {/* <Button variant="outlined"
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
                </Menu> */}
          </Stack>}
          {/* <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E6E6E6', pt: 0.5 }}>
            <Box sx={{
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
              fontWeight: 600,
              fontSize: '14px',
              color: '#1A1A1A',
              pl: 3,
            }} >
              Not present in any list
            </Box>
            <Box sx={{ pr: 3 }}>
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
                      // paddingLeft: '10px',
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

        {/* <Card sx={{ height: 'auto', pr: 1, mb: 2, boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
          <Stack sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Stack sx={{ width: '55%', borderRight: '1px solid #E6E6E6' }}>

              <Box>
                <Typography sx={{
                  pt: 1, pb: 1, pl: 3,
                  borderBottom: '1px #E6E6E6 solid',
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600,
                  color: '#1A1A1A'
                }}>
                  Work History
                </Typography>
              </Box>

              <Stack sx={{ p: 2 }}>
                <Stack >
                  <Stack direction='row' spacing={2}
                    sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} mb={2}>
                    <Stack>
                      <Box sx={{ backgroundColor: '#D9D9D9', borderRadius: '3px', height: '31.99px', width: '32.17px', }}>
                        <img src="https://res.cloudinary.com/doxor5nnu/image/upload/v1683968391/Amazon-Logo-Font-1-scaled_f7sumk.webp" alt="img" style={{ height: '31.99px', width: '32.17px', borderRadius: '3px' }} />
                      </Box>
                    </Stack>
                    <Box>
                      <Typography component='h6' sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>Altice USA</Typography>
                      <Typography component='p' sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, color: '#474747', width: '192px' }}>Supervisor Tech Customer Care / Current</Typography>
                    </Box>
                  </Stack>

                  <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction='row' spacing={2}
                      sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Stack sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <Box sx={{ backgroundColor: '#D9D9D9', borderRadius: '3px', height: '31.99px', width: '32.17px', mt: '7px' }}>
                          <img src="https://res.cloudinary.com/doxor5nnu/image/upload/v1683968391/Amazon-Logo-Font-1-scaled_f7sumk.webp" alt="img" style={{ height: '31.99px', width: '32.17px', borderRadius: '3px' }} />
                        </Box>
                        <Stack sx={{ display: isRoles ? 'block' : 'none', borderLeft: '1px solid #E6E6E6', height: '25px' }}></Stack>
                      </Stack>
                      <Box>
                        <Typography component='h6' sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600, color: '#1A1A1A' }}>Altice USA</Typography>
                        <Typography component='p' sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, color: '#474747', width: '192px' }}>Supervisor Tech Customer Care / Current</Typography>
                      </Box>
                    </Stack>
                    <Box>
                      <Button
                        disableRipple
                        onClick={onClickRoles}
                        endIcon={<ArrowDropDownIcon />} sx={{
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600, color: '#146EF6', textTransform: 'capitalize',
                          '&:hover': {
                            backgroundColor: '#E6E6E6',
                            color: '#146EF6'
                          }
                        }}>
                        3 Roles
                      </Button>
                    </Box>
                  </Stack>
                </Stack>

                <Stack sx={{ display: isRoles ? 'block' : 'none' }}>

                  <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} direction='row' spacing={3}>
                    <Stack>
                      <Stack sx={{ borderLeft: '1px solid #E6E6E6', height: '25px', ml: '15.4px' }}></Stack>
                      <Stack sx={{ backgroundColor: '#E6E6E6', height: '10px', width: '10px', borderRadius: '50%', ml: 1.3 }}></Stack>
                      <Stack sx={{ borderLeft: '1px solid #E6E6E6', height: '25px', ml: '15.4px' }}></Stack>
                    </Stack>
                    <Stack>
                      <Typography sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600, color: '#1A1A1A', width: '100%' }}>Site and Project Manager</Typography>
                      <Typography sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, color: '#474747' }}>2008 - 2009</Typography>
                    </Stack>
                  </Stack>

                  <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} direction='row' spacing={3}>
                    <Stack>
                      <Stack sx={{ borderLeft: '1px solid #E6E6E6', height: '25px', ml: '15.5px' }}></Stack>
                      <Stack sx={{ backgroundColor: '#E6E6E6', height: '10px', width: '10px', borderRadius: '50%', ml: 1.3 }}></Stack>
                      <Stack sx={{ height: '25px' }}></Stack>
                    </Stack>
                    <Stack>
                      <Typography sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600, color: '#1A1A1A', width: '100%' }}>Site and Project Manager</Typography>
                      <Typography sx={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, color: '#474747' }}>2008 - 2009</Typography>
                    </Stack>
                  </Stack>

                </Stack>
              </Stack>

            </Stack>



            <Stack sx={{ width: '45%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flext-start', pl: '15px', pt: 2, pb: 2 }} direction="column" spacing={1.5}>

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
                      Carlow, Ireland
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

            </Stack>
          </Stack>
        </Card> */}

        {/* <Card sx={{
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


          </Stack>
        </Card>
        <ProfileResearch /> */}
        {/* {isReSearch && <Research  />} */}
        {/* {isExistingContacts && <ExistingContacts />}
      {isSequnece && <Sequence />}
      {isCustomFields && <CustomFields />}
      {isOpportunities && <Opportunities />} */}
      </Stack >



    </Stack >

  );
}
export default Profile





