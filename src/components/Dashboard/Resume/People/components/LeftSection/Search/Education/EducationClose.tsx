// import React, { useState, useContext } from "react";
import {useContext } from "react";
  import { useState } from '../../../../../../../../shared/modules/React'
import { Stack} from "../../../../../../../../shared/modules/MaterialImports/Stack";
import  {Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, 
  // faPenFancy
 } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "../../../DataLabs/DataLabs";
// import educationIcon from "../../../../shared/assets/icons/EducationDarkIcon.svg"

const EducationClose = () => {

  const [searchData, setSearchData] = useContext(Store);
  const [isMouseEducationFilt, setIsMouseEducationFilt] = useState(false);

  const onClickEducationFilter = (event: any) => {
    event.stopPropagation();
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,

      eduDegreeList: [],
      eduSchoolList: [],
      eduMajorList: [],
      education: {
        ...searchData.education,
        schoolIn: [],
        majorIn: [],
        degreeIn: [],
        educationStartYear: "",
        educationEndYear: "",
      },
      isFromYearValidation: false,
      isToYearValidation: false,
    }));
  };

  const onClickRemoveEducation = () => {
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,

      eduDegreeList: [],
      eduSchoolList: [],
      eduMajorList: [],
      education: {
        ...searchData.education,
        schoolIn: [],
        majorIn: [],
        degreeIn: [],
        educationStartYear: "",
        educationEndYear: "",
      },
      isFromYearValidation: false,
      isToYearValidation: false,
    }));
  };

  const onClickEducationFiltSelOpt = (event: any) => {
    event.stopPropagation();
  };

  const onMouseOverEducationFilt = () => {
    setIsMouseEducationFilt(true);
  };

  const onMouseOutEducationFilt = () => {
    setIsMouseEducationFilt(false);
  };

  const removeDegreeElement = (index: any) => {
    if (index !== -1) {
      const updatededuDegreeList = searchData.eduDegreeList;
      updatededuDegreeList.splice(index, 1);
      const updatedCertifications = searchData.education.degreeIn;
      updatedCertifications.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        eduDegreeList: updatededuDegreeList,
        education: {
          ...searchData.education,
          degreeIn: updatedCertifications,
        },
      }));
    }
  };

  const removeSchoolElement = (index: any) => {
    if (index !== -1) {
      const updatededuSchoolList = searchData.eduSchoolList;
      updatededuSchoolList.splice(index, 1);
      const updatedCertifications = searchData.education.schoolIn;
      updatedCertifications.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        eduSchoolList: updatededuSchoolList,
        education: {
          ...searchData.education,
          schoolIn: updatedCertifications,
        },
      }));
    }
  };

  const removeMajorElement = (index: any) => {
    if (index !== -1) {
      const updatededuMajorList = searchData.eduMajorList;
      updatededuMajorList.splice(index, 1);
      const updatedCertifications = searchData.education.majorIn;
      updatedCertifications.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        eduMajorList: updatededuMajorList,
        education: {
          ...searchData.education,
          majorIn: updatedCertifications,
        },
      }));
    }
  };

  const removeYearOfEduElement = (index: any) => {
    if (index !== -1) {
      if (index === 0) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            educationStartYear : "",
          },
        }));
      }
      else if (index === 1) {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          education: {
            ...searchData.education,
            educationEndYear: "",
          },
        }));
      }
      else {
        setSearchData((prevSearchData: any) => ({
          ...prevSearchData,
          
          education: {
            ...searchData.education,
            
            educationStartYear: "",
            educationEndYear: "",
          },
        }));
      }
      
    }
  };


  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        sx={{
          width: "100%",
          borderBottom: "1px solid",
          color: styles.blackcolor,
          borderBottomColor: styles.borderBottomColor,
          "&:hover": {
            cursor: "pointer",
            backgroundColor: styles.backGroundColorOnHover,
            color: styles.primaryTextColor,
          },
        }}
      >
        <Stack
          sx={{
            paddingY: "10px",
            paddingLeft: "10px",
            paddingRight: "17px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={1} direction="row" sx={{ alignItems: "center" }}>
            {/* <AssessmentOutlinedIcon
              sx={{
                fontSize: "24px",

                paddingLeft: "8px",
              }}
            /> */}
            <FontAwesomeIcon
              style={{
                paddingLeft: "8px",
              }}
              icon={faGraduationCap}
            />
            <Typography variant="body1" className="menu-title">
              Education
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {(searchData.education.degreeIn &&
              searchData.education.degreeIn.length) ||
            (searchData.education.schoolIn &&
              searchData.education.schoolIn.length) ||
            (searchData.education.majorIn &&
              searchData.education.majorIn.length) ||
            searchData.education.educationStartYear !== "" ||
            searchData.education.educationEndYear !== "" ? (
              <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                <Stack
                  onClick={onClickEducationFilter}
                  onMouseOver={onMouseOverEducationFilt}
                  onMouseOut={onMouseOutEducationFilt}
                  className="filter-child-num-con"
                >
                  <CloseIcon
                    sx={{
                      color: isMouseEducationFilt
                        ? styles.primaryTextColor
                        : "#737373",
                      fontSize: "16px",
                    }}
                    onClick={onClickRemoveEducation}
                  />
                  <Typography
                    sx={{
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: isMouseEducationFilt
                        ? styles.primaryTextColor
                        : styles.blackcolor,
                    }}
                  >
                    {searchData.education.degreeIn.length +
                      searchData.education.schoolIn.length +
                      searchData.education.majorIn.length +
                      (searchData.education.educationStartYear !== "" ? 1 : 0) +
                      (searchData.education.educationEndYear !== "" ? 1 : 0)}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <></>
            )}
            <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
          </Stack>
        </Stack>

        {searchData.education.degreeIn &&
        searchData.education.degreeIn.length ? (
          <Stack
            onClick={onClickEducationFiltSelOpt}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#ffffff !important",
              paddingTop: "6px",
              paddingLeft: "22.83px",
              paddingBottom: "14px",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
                marginRight: "22px",
              }}
            >
              Degrees:
            </Typography>
            {searchData.education.degreeIn.map((degree: any, index: any) => (
              <Stack
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2px 7px",
                  backgroundColor: "#919191",
                  gap: "10px",
                  borderRadius: "2px",
                  margin: "1px 2px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  {degree}
                </Typography>
                <CloseIcon
                  onClick={() => removeDegreeElement(index)}
                  sx={{ color: "#ffffff", fontSize: "small" }}
                />
              </Stack>
            ))}
          </Stack>
        ) : (
          <></>
        )}

        {searchData.education.majorIn && searchData.education.majorIn.length ? (
          <Stack
            onClick={onClickEducationFiltSelOpt}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#ffffff !important",
              paddingTop: "6px",
              paddingLeft: "22.83px",
              paddingBottom: "14px",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
                marginRight: "22px",
              }}
            >
              Major:
            </Typography>
            {searchData.education.majorIn.map((major: any, index: any) => (
              <Stack
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2px 7px",
                  backgroundColor: "#919191",
                  gap: "10px",
                  borderRadius: "2px",
                  margin: "1px 2px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  {major}
                </Typography>
                <CloseIcon
                  onClick={() => removeMajorElement(index)}
                  sx={{ color: "#ffffff", fontSize: "small" }}
                />
              </Stack>
            ))}
          </Stack>
        ) : (
          <></>
        )}

        {searchData.education.schoolIn &&
        searchData.education.schoolIn.length ? (
          <Stack
            onClick={onClickEducationFiltSelOpt}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#ffffff !important",
              paddingTop: "6px",
              paddingLeft: "22.83px",
              paddingBottom: "14px",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
                marginRight: "22px",
              }}
            >
              School:
            </Typography>
            {searchData.education.schoolIn.map((school: any, index: any) => (
              <Stack
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2px 7px",
                  backgroundColor: "#919191",
                  gap: "10px",
                  borderRadius: "2px",
                  margin: "1px 2px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily:
                      'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#ffffff",
                  }}
                >
                  {school}
                </Typography>
                <CloseIcon
                  onClick={() => removeSchoolElement(index)}
                  sx={{ color: "#ffffff", fontSize: "small" }}
                />
              </Stack>
            ))}
          </Stack>
        ) : (
          <></>
        )}

        {searchData.education.educationStartYear !== "" ? (
          <Stack
            onClick={onClickEducationFiltSelOpt}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#ffffff !important",
              paddingTop: "6px",
              paddingLeft: "22.83px",
              paddingBottom: "14px",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
                marginRight: "22px",
              }}
            >
              Start Year of Education:
            </Typography>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "2px 7px",
                backgroundColor: "#919191",
                gap: "10px",
                borderRadius: "2px",
                margin: "1px 2px",
              }}
            >
              <Typography
                sx={{
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                {searchData.education.educationStartYear}
              </Typography>
              <CloseIcon
                onClick={() => removeYearOfEduElement(0)}
                sx={{ color: "#ffffff", fontSize: "small" }}
              />
            </Stack>
          </Stack>
        ) : (
          <></>
        )}

        {searchData.education.educationEndYear !== "" ? (
          <Stack
            onClick={onClickEducationFiltSelOpt}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#ffffff !important",
              paddingTop: "6px",
              paddingLeft: "22.83px",
              paddingBottom: "14px",
            }}
          >
            <Typography
              sx={{
                fontFamily:
                  'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                fontSize: "12px",
                fontWeight: "600",
                color: "#000000",
                marginRight: "22px",
              }}
            >
              End Year of Education:
            </Typography>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "2px 7px",
                backgroundColor: "#919191",
                gap: "10px",
                borderRadius: "2px",
                margin: "1px 2px",
              }}
            >
              <Typography
                sx={{
                  fontFamily:
                    'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                {searchData.education.educationEndYear}
              </Typography>
              <CloseIcon
                onClick={() => removeYearOfEduElement(1)}
                sx={{ color: "#ffffff", fontSize: "small" }}
              />
            </Stack>
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default EducationClose;
