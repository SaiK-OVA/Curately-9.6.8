// import React, { useEffect } from "react";
import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Stack, Typography, Button, Card } from "@mui/material";
import { Box } from "../../../../../../../../shared/modules/MaterialImports/Box";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import  {Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import { Button } from "../../../../../../../../shared/modules/MaterialImports/Button";
// import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import {Checkbox} from "../../../../../../../../shared/modules/MaterialImports/FormElements";
import { styled } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import ArticleIcon from "@mui/icons-material/Article";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
// import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
// import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
// import Switch from "@mui/material/Switch";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
// import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import TextField from "@mui/material/TextField";
// import WestRoundedIcon from "@mui/icons-material/WestRounded";
// import JobTitle from "../JobTitle/JobTitle";
// import JobTitleOpen from "../JobTitle/JobTitleOpen";
// import JobTitleClose from "../JobTitle/JobTitleClose";
// import Industry from "../Industry/Industry";
// import Location from "../Location/Location";
// import Employees from "../Employees/Employees";
import "../Search.scss";
import "./Persona.scss";
import styles from "./../../../../shared/config/variables.module.scss";
import PersonaModal from "./PersonaModal";
import apiService from "../../../../shared/api/apiService";
import { debounce } from "@mui/material/utils";
import { Store } from "../../../DataLabs/DataLabs";
import { ModalStore } from "../../../DataLabs/DataLabs";
import { userLocalData } from "../../../../../../../../shared/services/userData";
// interface PersonaProps {
//   isPersona: boolean;
// }

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#f7f7f7",
  // border: '2px solid #000',
  // borderWidth: '0px !important',
  boxShadow: 24,
  height: "90%",
  width: "45%",

  // p: 4,
};

const BpIcon = styled("span")((
  // { theme }
) => ({
  borderRadius: 1,
  width: 16,
  height: 16,
  backgroundColor: "#ffffff",
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: styles.primaryTextColor,
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
});

const BpCheckboxContainer = styled("div")({
  ".bp-icon": {
    border: "1px #CACACC solid",
  },
  "& .bp-checkbox:hover .bp-icon": {
    borderColor: styles.primaryTextColor,
  },
});

// const PersonaData = [
//   { id: 1, label: 'QA Managers' },
//   { id: 2, label: 'UX Managers' },
//   { id: 3, label: 'CXninja HR and TAG' },
//   { id: 4, label: 'CXninja Contact center ops' },
// ]

interface PersonaProps {
  persona: String;
  // updatePersonaDataFromModal: any;
}

const PersonaModalFilter: React.FC<PersonaProps> = (
  // { persona }
) => {
  const [isEditPersona, setIsEditPersona] = React.useState(false);
  const [isManagePersona, setIsManagePerSona] = React.useState(false);
  const [isNewPersona, setIsNewPerSona] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isCopy, setIsCopy] = React.useState(false);
  const [labelName, setIsLabelName] = React.useState("");
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isRefetch, setFetch] = React.useState(false);

  const recrIds = userLocalData.getvalue("invitedAndReferredRecrIds");
  const isChromeExtEnable = userLocalData.isChromeExtensionEnabled(); 

  // maintain local search state for modal

  const [searchData, setSearchData] = useContext(Store);

  const [personaChecked, setPersonaChecked] = React.useState<{
    [key: string]: boolean;
  }>({});

  const [personadata, setPersonaData] = React.useState<any[] | never[]>([]);
  const [managePersonadata, setManagePersonaData] = React.useState<[] | null>(
    null
  );
  // const [userNameData, setuserNameData] = React.useState<any[] | never[]>([]);

  const [updatePersonaData, setUpdatePersona] = React.useState<[] | null>(null);

  const handlePersonaCheckboxChange = (personId: any) => {
    setPersonaChecked((prevCheckItems: any) => ({
      ...prevCheckItems,
      [personId]: !prevCheckItems[personId],
    }));

    // const personaCheckedLabelNameObj = personadata.find((item: any) => item.personaId === personId)
    // const personaCheckedLabelName = personaCheckedLabelNameObj.personaName

    // if (searchModalData.personaIds.includes(personaCheckedLabelName)) {
    //   // const filterPersonaChecked = searchModalData.personaIds.filter((item: any) => item === personaCheckedLabelName)

    //   const labelIndex = searchModalData.personaIds.indexOf(personaCheckedLabelName)

    //   const personaRemove = searchModalData.personaIds.splice(labelIndex, 1)

    //   // console.log('labelIndex', labelIndex)

    //   setSearchData((prevSearchData: any) => ({
    //     ...prevSearchData,
    //     personaIds: searchModalData.personaIds
    //   }));

    // } else {
    //   setSearchData((prevSearchData: any) => ({
    //     ...prevSearchData,
    //     personaIds: [...searchModalData.personaIds, personaCheckedLabelName],
    //   }));
    // }

    // console.log('personaCheckedLabelName', personaCheckedLabelName)

    setSearchModalData((prevSearchData: any) => {
      const updatedPersonaAdd = [...searchModalData.personaIds];
      // console.log('ids:', updatedPersonaAdd)
      const index = updatedPersonaAdd.indexOf(personId);
      if (index !== -1) {
        updatedPersonaAdd.splice(index, 1);
      } else {
        updatedPersonaAdd.push(personId);
      }
      console.log("aaa", updatedPersonaAdd);

      return { ...prevSearchData, personaIds: updatedPersonaAdd };
    });
  };

  const sendPersonaData = () => {
    let sendPersonaData: any = {
      recrId: parseInt(searchData.userId),
      clientId: userLocalData.getvalue('clientId'),
    };

    if (isChromeExtEnable) {
      sendPersonaData.recrIds = recrIds;
    }

    apiService.PersonaDatalist(sendPersonaData).then((response: any) => {
      if (response.data.Success) {
        // console.log('PersonaData:', response.data.PersonaList)
        // setPersonaData(response.data.PersonaList)
        // updatePersonaDataFromModal(response.data.PersonaList);
      }
    });
  };

  const sendPersonaManageData = () => {
    let sendManageData: any = {
      recrId: parseInt(searchData.userId),
      clientId: userLocalData.getvalue('clientId'),
    };

    if (isChromeExtEnable) {
      sendManageData.recrIds = recrIds;
    }

    apiService.PersonaManageData(sendManageData).then((response: any) => {
      if (response.data.Success) {
        // console.log('PersonaManageData:', response.data.PersonaList)
        setManagePersonaData(response.data.PersonaList);
        setPersonaData(response.data.PersonaList);
      }
    });
  };

  const refetchPersonData = (value: any) => {
    setFetch(value);
  };

  let sendFilterData;

  const getFilterData = () => {
    let dataObj = Object.keys(searchModalData);
    let sendData: any = {};
    for (var i = 0; i < dataObj.length; i++) {
      if (searchModalData[dataObj[i]]) {
        let obj = searchModalData[dataObj[i]];
        if (obj && obj.length) {
          sendData[dataObj[i]] = obj;
        }
        // console.log(obj);
      }
    }
    sendData.sort_by = "";
    sendData.page_num = 0;
    sendData.page_size = 10;
    return sendData;
  };

  const sendPersonaCreateData = (userName: string): void => {
    sendFilterData = getFilterData();
    let sendCreateData: any = {
      recrId: parseInt(searchData.userId),
      personaName: userName,
      orderBy: "1",
      filterJson: JSON.stringify(sendFilterData),
    };

    if (isChromeExtEnable) {
      sendCreateData.recrIds = recrIds;
    }

    apiService.CreatePersonaData(sendCreateData).then((response: any) => {
      if (response.data.Success && response.data.Status === 200) {
        // console.log('PersonaCreateData:', response.data.Message)
        sendPersonaManageData();
        // sendPersonaData();
      }
    });
  };

  const debouncedSendCreateRequest = debounce(sendPersonaCreateData, 500);

  const getPersonaCreateData = (userName: string) => {
    debouncedSendCreateRequest(userName);
  };

  const sendPersonaEditData = (user: any): void => {
    sendFilterData = getFilterData();
    console.log("sendFilterData..", sendFilterData)
    let sendCreateData: any = {
      personaId: user.personaId,
      personaName: user.personaName,
      filterJson: JSON.stringify(sendFilterData),
      isActive: user.isActive ? 1 : 0,
    };

    apiService.EditPersonaData(sendCreateData).then((response: any) => {
      if (response.data.Success && response.data.Status === 200) {
        sendPersonaManageData();
        // sendPersonaData();
      }
    });
  };

  // const debouncedSendEditRequest = debounce(sendPersonaEditData, 500);

  // const getPersonaEditData = (userName: string) => {
  //   debouncedSendEditRequest(userName);
  // };

  React.useEffect(() => {
    // getPersonaData("");
    // sendPersonaData();
    sendPersonaManageData();
    if (false) {
      getPersonaCreateData("");
    }
  }, [isRefetch]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Fetch the persona data from the API
  //     fetch('http://35.155.202.216:8080/people_search/managePersonaList', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userId: 1,
  //       }),
  //     })
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.Success) {
  //           const sortedPersonas = data.PersonaList.sort((a: any, b: any) => a.orderBy - b.orderBy);
  //           console.log('Persona List:');
  //           sortedPersonas.forEach((persona: any) => {
  //             console.log('Persona List:', persona)
  //           });
  //         } else {
  //           console.error('Failed to fetch persona list');
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error:', error);
  //       });
  //   };

  //   fetchData();
  // }, []);

  const handleHoverEnter = (PersonaId: any) => {
    setIsEditPersona(PersonaId);
  };
  const handleHoverLeave = () => {
    setIsEditPersona(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setIsManagePerSona(true);
    setIsNewPerSona(false);
    setIsEdit(false);
    setIsCopy(false);
    sendPersonaManageData();
  };
  const handleClose1 = () => setOpen(false);

  const handleIsAllPersonas = () => {
    setOpen(true);
    setIsManagePerSona(true);
    setIsNewPerSona(false);
    setIsEdit(false);
    setIsCopy(false);
  };
  const intializeStoreData = () => {
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      industries: [],
      industries_not_in: [],
      industry_company_not_in_names: [],
      industry_company_names: [],
      industry_all_company_names: [],
      industry_adv_settings: "",
      company_names: [],
      company_not_in_names: [],
      company_past_names: [],
      exclude_company_names: [],
      no_of_employees: [],
      min: "",
      max: "",
      person_titles: [],
      person_not_titles: [],
      person_past_titles: [],
      title_is_boolean: "",
      title_management_level: [],
      title_department: [],
      title_department_sub_role: [],
      full_name: "",
      minYear: "",
      maxYear: "",
      skillsIn: [],
      languagesIn: [],
      certificationsIn: [],
      booleanSearch: "",
      eduDegreeList: [],
      eduSchoolList: [],
      eduMajorList: [],
      autoSkillsList: [],
      autoLanguagesList: [],
      autoCertificationsList: [],
      education: {
        schoolIn: [],
        majorIn: [],
        degreeIn: [],
        educationStartYear: "",
        educationEndYear: "",
      },
      zipcode: "",
      hqzipcode: "",
      hqdistance: null,
      locations: [],
      locations_not_in: [],
      hq_locations: [],
      hq_locations_not_in: [],
    }));
  };
  const handleIsAddPersonas = () => {
    intializeStoreData();
    setOpen(true);

    setIsLabelName("");
    setIsManagePerSona(false);
    setIsNewPerSona(true);
    setIsEdit(false);
    setUpdatePersona(null);
    setIsCopy(false);
  };

  const handleCopyPersona = (PersonaId: any): void => {
    // debugger;
    setIsManagePerSona(false);
    setIsNewPerSona(PersonaId);
    setIsEdit(false);
    setIsCopy(true);
    const selectedPersona = personadata.find(
      (persona: any) => persona.personaId === PersonaId
    );

    if (selectedPersona) {
      const labelName = selectedPersona.personaName;
      setIsLabelName(labelName);
      setUpdatePersona(selectedPersona);
      // console.log('isCopy:', labelName);
    }
  };

  const handleEditPersona = (PersonaId: any): void => {
    setIsCopy(false);
    intializeStoreData();
    setIsManagePerSona(false);
    setIsNewPerSona(PersonaId);
    setIsEdit(PersonaId);

    const selectedPersona = personadata.find(
      (persona: any) => persona.personaId === PersonaId
    );

    if (selectedPersona) {
      const labelName = selectedPersona.personaName;
      setIsLabelName(labelName);
      // console.log(selectedPersona, 'isEdit:', labelName);
      setUpdatePersona(selectedPersona);
    }
    setOpen(true);
  };

  const handleIsManagePersona = () => {
    setIsManagePerSona(true);
    setIsNewPerSona(false);
    setIsEdit(false);
    setIsCopy(false);
  };

  const handleIsNewPersona = () => {
    intializeStoreData();
    setIsNewPerSona(true);
    setIsManagePerSona(false);
    setIsEdit(false);
    setIsCopy(false);
  };

  return (
    // <Stack
    //   p={1}
    //   className={selectPersona ? "expanded" : ""}
    //   onClick={handleSelect}
    // >
    //   <Box className="left-containers-align">
    //     <Box className="left-containers-align">
    //       <PersonAddAlt1Icon
    //         className="list-icon"
    //         sx={{ fontSize: "24px" }}
    //       />
    //       <Typography
    //         component="p"
    //         className="menu-title"
    //       >
    //         Persona
    //       </Typography>
    //     </Box>
    //     <Box className="left-containers-dropdown">
    //       <ArrowDropDownIcon
    //         sx={{ display: selectPersona ? "none" : "block" }}
    //       />
    //       <ArrowDropUpIcon sx={{ display: selectPersona ? "block" : "none" }} />
    //     </Box>
    //   </Box>
    //   <Box sx={{ display: selectPersona ? "block" : "none", height: "200px" }}>
    //     Persona DropDown
    //   </Box>
    // </Stack>
    (<Stack sx={{ mb: 1 }}>
      {/* {persona} */}
      <Stack
        sx={{
          color: styles.blackcolor,
          "&:hover": {
            color: styles.primaryTextColor,
          },
        }}
        // className={selectJobTitle ? "expanded" : ""}
      >
        {/* <Stack
          sx={{
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            spacing={1}
            direction="row"
          >
            <PersonAddAlt1Icon
              sx={{
                fontSize: "24px",
                color: styles.primaryTextColor,
                paddingLeft: "8px",
              }}
            />
            <Typography
              variant="body1"
              className="menu-title"
            >
              Persona
            </Typography>
          </Stack>
          <Stack>
            <ArrowDropUpIcon />
          </Stack>
        </Stack> */}
        <Box>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              ml: 1,
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                color: styles.primaryTextColor,
                ml: "5px",
                "&:hover": {
                  color: "rgba(8, 82, 194, 1)",
                },
              }}
              onClick={handleOpen}
            >
              <Box component="div">
                <SettingsOutlinedIcon sx={{ fontSize: "12px" }} />
              </Box>

              <Box component="div">
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    pl: "3px",
                  }}
                >
                  Manage Personas
                </Typography>
              </Box>
            </Stack>

            {/* <Button onClick={handleOpen}>Open modal</Button> */}

            <>
              {personadata
                .filter((data) => data.isActive)
                .map((item: any) => (
                  <Stack
                    key={item.personaId}
                    onMouseEnter={() => handleHoverEnter(item.personaId)}
                    onMouseLeave={handleHoverLeave}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "98%",
                      borderRadius: "3px",
                      "&:hover": {
                        backgroundColor: "#F0F0F0",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      // onClick={onClickisFirstRow}
                      sx={{
                        width: "90%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        "& .MuiButtonBase-root.MuiCheckbox-root": {
                          pl: "3px ",
                          pr: "0px",
                          pt: 0,
                          pb: "3px",
                        },
                      }}
                    >
                      <Box>
                        <BpCheckboxContainer>
                          <Checkbox
                            className="bp-checkbox"
                            id={`${item.personaId}`}
                            disableRipple
                            color="default"
                            checked={
                              searchModalData.personaIds.includes(
                                item.personaId
                              )
                                ? true
                                : false
                            }
                            // checked={!!personaChecked[item.personaId]}
                            // checked={searchModalData.personaIds.includes([item.personaId])}
                            checkedIcon={
                              <BpCheckedIcon
                                // className="bp-icon"
                                style={{
                                  borderColor: styles.primaryTextColor,
                                }}
                              />
                            }
                            icon={<BpIcon className="bp-icon" />}
                            onChange={() =>
                              handlePersonaCheckboxChange(item.personaId)
                            }
                          />
                        </BpCheckboxContainer>
                      </Box>

                      <Box
                        component="label"
                        htmlFor={item.personaId}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Typography
                          sx={{
                            color: styles.blackcolor,
                            fontSize: "14px",
                            fontWeight: "600",
                            fontFamily:
                              'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            marginRight: "5px",
                            textAlign: "left",
                          }}
                        >
                          {item.personaName}
                        </Typography>

                        {/* <Box>
                        <InfoOutlinedIcon sx={{ color: '#737373', fontSize: "14px", }} />
                      </Box>

                      <Typography
                        sx={{
                          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                          fontSize: "12px",
                          fontWeight: "400",
                          color: styles.defaultTextColor,
                          alignSelf: "center",
                        }}
                      >
                        (4.7k)
                      </Typography> */}
                      </Box>
                    </Stack>

                    {isEditPersona === item.personaId && (
                      <>
                        <Box
                          component="div"
                          sx={{ width: "8%", pr: 1 }}
                          onClick={() => handleEditPersona(item.personaId)}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily:
                                'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                              cursor: "pointer",
                              pr: 1,
                            }}
                          >
                            Edit
                          </Typography>
                        </Box>
                      </>
                    )}
                  </Stack>
                ))}
            </>
            <Stack
              sx={{
                borderBottom: "1px solid #e6e6e6",
                mt: 1,
                mb: 1,
                width: "98%",
              }}
            ></Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "98%",
              }}
            >
              <Button
                variant="outlined"
                disableRipple
                onClick={handleIsAllPersonas}
                sx={{
                  width: "45%",
                  height: "32px",
                  borderColor: "rgba(202, 202, 204, 1)",
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    borderColor: "#146ef6",
                    color: "#146ef6",
                    backgroundColor: "#ffffff",
                  },
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "rgba(26, 26, 26, 1)",
                }}
              >
                All Personas
              </Button>

              <Button
                variant="outlined"
                onClick={handleIsAddPersonas}
                disableRipple
                className="persona-btn"
                startIcon={
                  <AddCircleOutlineRoundedIcon sx={{ color: "#146ef6" }} />
                }
                sx={{
                  width: "45%",
                  height: "32px",
                  borderColor: "rgba(202, 202, 204, 1)",
                  textTransform: "capitalize",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    borderColor: "#146ef6",
                    color: "#146ef6",
                    backgroundColor: "#ffffff",
                  },
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "rgba(26, 26, 26, 1)",
                  "& .MuiButton-startIcon>*:nth-of-type(1)": {
                    fontSize: "14px",
                  },
                }}
              >
                Persona
              </Button>
            </Stack>

            <Stack></Stack>
          </Stack>
        </Box>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PersonaModal
            isNewPersona={isNewPersona}
            isManagePersona={isManagePersona}
            handleIsNewPersona={handleIsNewPersona}
            handleClose1={handleClose1}
            handleIsManagePersona={handleIsManagePersona}
            isEdit={isEdit}
            labelName={labelName}
            handleEditPersona={handleEditPersona}
            handleCopyPersona={handleCopyPersona}
            isCopy={isCopy}
            managePersonadata={managePersonadata}
            refetchPersonData={refetchPersonData}
            isRefetch={isRefetch}
            updatePersonaData={updatePersonaData}
            sendPersonaEditData={sendPersonaEditData}
            sendPersonaCreateData={sendPersonaCreateData}
            showOnlyPersona={true}
          />
        </Box>
      </Modal>
    </Stack>)
  );
};
export default PersonaModalFilter;
