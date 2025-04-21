// import React, { useState, useContext } from "react";
import { useContext } from "react";
import { useState } from "../../../../../../../../shared/modules/React";
import {  Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import {  Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "../../../DataLabs/DataLabs";

const SkillsClose = () => {

  const [searchData, setSearchData] = useContext(Store);
  const [isMouseSkillsFilt, setIsMouseSkillsFilt] = useState(false);

  const onClickSkillsFilter = (event: any) => {
    event.stopPropagation();
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      skillsIn: [],
      autoSkillsList: [],
    }));
  };

  const onClickRemoveSkills = () => {
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      skillsIn: [],
      autoSkillsList: [],
    }));
  };

  const onClickSkillsFiltSelOpt = (event: any) => {
    event.stopPropagation();
  };

  const onMouseOverSkillsFilt = () => {
    setIsMouseSkillsFilt(true);
  };

  const onMouseOutSkillsFilt = () => {
    setIsMouseSkillsFilt(false);
  };

  const removeSkillsElement = (index: any) => {
    if (index !== -1) {
      const updatedAutoSkillsList = searchData.autoSkillsList;
      updatedAutoSkillsList.splice(index,1);
      const updatedSkills = searchData.skillsIn;
      updatedSkills.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        skillsIn: updatedSkills,
        autoSkillsList: updatedAutoSkillsList,
      }));
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
            <FontAwesomeIcon
              style={{
                paddingLeft: "8px",
              }}
              icon={faSquarePollHorizontal}
            />
            <Typography variant="body1" className="menu-title">
              Skills
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchData.skillsIn && searchData.skillsIn.length ? (
              <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                <Stack
                  onClick={onClickSkillsFilter}
                  onMouseOver={onMouseOverSkillsFilt}
                  onMouseOut={onMouseOutSkillsFilt}
                  className="filter-child-num-con"
                >
                  <CloseIcon
                    sx={{
                      color: isMouseSkillsFilt
                        ? styles.primaryTextColor
                        : "#737373",
                      fontSize: "16px",
                    }}
                    onClick={onClickRemoveSkills}
                  />
                  <Typography
                    sx={{
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: isMouseSkillsFilt
                        ? styles.primaryTextColor
                        : styles.blackcolor,
                    }}
                  >
                    {searchData.skillsIn.length}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <></>
            )}
            <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
          </Stack>
        </Stack>
        {searchData.skillsIn && searchData.skillsIn.length ? (
          <Stack
            onClick={onClickSkillsFiltSelOpt}
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
              Skills:
            </Typography>
            {searchData.skillsIn.map((skills: any, index: any) => (
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
                  {skills}
                </Typography>
                <CloseIcon
                  onClick={() => removeSkillsElement(index)}
                  sx={{ color: "#ffffff", fontSize: "small" }}
                />
              </Stack>
            ))}
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default SkillsClose;
