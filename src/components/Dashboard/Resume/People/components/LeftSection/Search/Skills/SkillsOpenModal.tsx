import {  useContext } from "react";
import { useState } from "../../../../../../../../shared/modules/React";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import styles from "./../../../../shared/config/variables.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";

const SkillsModalOpen = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isMouseSkillsFilt, setIsMouseSkillsFilt] = useState(false);

  const onClickSkillsFilter = (event: any) => {
    // event.stopPropagation();
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      skillsIn: [],
      autoSkillsList: [],
    }));
  };

  // const onClickRemoveSkills = () => {
  //   setSearchModalData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     skillsIn: [],
  //     autoSkillsList: [],
  //   }));
  // };

  const onMouseOverSkillsFilt = () => {
    setIsMouseSkillsFilt(true);
  };

  const onMouseOutSkillsFilt = () => {
    setIsMouseSkillsFilt(false);
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
            <FontAwesomeIcon
              style={{
                color: styles.primaryTextColor,
                paddingLeft: "8px",
              }}
              icon={faSquarePollHorizontal}
            />
            <Typography
              variant="body1"
              className="menu-title"
              sx={{ color: styles.primaryTextColor }}
            >
              Skills
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchModalData.skillsIn && searchModalData.skillsIn.length ? (
              <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                <Stack
                  onClick={onClickSkillsFilter}
                  onMouseOver={onMouseOverSkillsFilt}
                  onMouseOut={onMouseOutSkillsFilt}
                  className="filter-child-num-con "
                >
                  <CloseIcon
                    sx={{
                      color: isMouseSkillsFilt
                        ? styles.primaryTextColor
                        : "#737373",
                      fontSize: "16px",
                    }}
                    // onClick={onClickRemoveSkills}
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
                    {searchModalData.skillsIn.length}
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

export default SkillsModalOpen;
