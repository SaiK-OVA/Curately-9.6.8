// import React, { useState, useContext } from "react";
import {  useContext } from "react";
import { useState } from "../../../../../../../../shared/modules/React";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGraduationCap, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap} from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
// import { ModalStore, Store } from "../../../DataLabs/DataLabs";
import { ModalStore } from "../../../DataLabs/DataLabs";
import styles from "./../../../../shared/config/variables.module.scss";
// import educationIcon from "../../../../shared/assets/icons/EducationDarkIcon.svg";

const EducationModalOpen = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isMouseEducationFilt, setIsMouseEducationFilt] = useState(false);

  const onClickEducationFilter = (event: any) => {
    // event.stopPropagation();
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      eduDegreeList: [],
      eduSchoolList: [],
      eduMajorList: [],
      education: {
        ...searchModalData.education,
        schoolIn: [],
        majorIn: [],
        degreeIn: [],

        educationStartYear: "",
        educationEndYear: "",
      },
    }));
  };

  // const onClickRemoveEducation = () => {
  //   setSearchModalData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     eduDegreeList: [],
  //     eduSchoolList: [],
  //     eduMajorList: [],
  //     education: {
  //       ...searchModalData.education,
  //       schoolIn: [],
  //       majorIn: [],
  //       degreeIn: [],

  //       educationStartYear: "",
  //       educationEndYear: "",
  //     },
  //   }));
  // };

  const onMouseOverEducationFilt = () => {
    setIsMouseEducationFilt(true);
  };

  const onMouseOutEducationFilt = () => {
    setIsMouseEducationFilt(false);
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        sx={{
          width: "100%",
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
                color: styles.primaryTextColor,
                paddingLeft: "8px",
              }}
            /> */}
            <FontAwesomeIcon
              style={{
                color: styles.primaryTextColor,
                paddingLeft: "8px",
              }}
              icon={faGraduationCap}
            />

            <Typography
              variant="body1"
              className="menu-title"
              sx={{ color: styles.primaryTextColor }}
            >
              Education
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {(searchModalData.education.degreeIn &&
              searchModalData.education.degreeIn.length) ||
              (searchModalData.education.schoolIn &&
                searchModalData.education.schoolIn.length) ||
              (searchModalData.education.majorIn &&
                searchModalData.education.majorIn.length) ||
              searchModalData.education.educationStartYear !== "" ||
              searchModalData.education.educationEndYear !== "" ? (
              <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                <Stack
                  onClick={onClickEducationFilter}
                  onMouseOver={onMouseOverEducationFilt}
                  onMouseOut={onMouseOutEducationFilt}
                  className="filter-child-num-con "
                >
                  <CloseIcon
                    sx={{
                      color: isMouseEducationFilt
                        ? styles.primaryTextColor
                        : "#737373",
                      fontSize: "16px",
                    }}
                  // onClick={onClickRemoveEducation}
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
                    {(searchModalData.education?.degreeIn?.length || 0) +
                      (searchModalData.education?.schoolIn?.length || 0) +
                      (searchModalData.education?.majorIn?.length || 0) +
                      (searchModalData.education.educationStartYear !== ""
                        ? 1
                        : 0) +
                      (searchModalData.education.educationEndYear !== ""
                        ? 1
                        : 0)}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <></>
            )}
            <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EducationModalOpen;
