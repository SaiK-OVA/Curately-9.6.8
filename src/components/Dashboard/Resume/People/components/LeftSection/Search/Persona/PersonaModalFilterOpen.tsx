import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
import {  Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";
import '../Search.scss'

const PersonaModalFilterOpen = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);

  const onClickPersonaFilter = (event: any) => {
    event.stopPropagation();
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      personaIds: [],
    }));
  };

  // const onClickPersonaFiltSelOpt = (event: any) => {
  //   event.stopPropagation();
  // };

  const [isMousePersonaFilt, setIsMousePersonaFilt] = React.useState(false);
  const onMouseOverPersonaFilt = () => {
    setIsMousePersonaFilt(true);
  };

  const onMouseOutPersonaFilt = () => {
    setIsMousePersonaFilt(false);
  };

  // const removePersonaElement = (index: any) => {
  //   if (index !== -1) {
  //     const updatedPersona = searchModalData.personaIds;
  //     updatedPersona.splice(index, 1);
  //     setSearchModalData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       personaIds: updatedPersona,
  //     }));
  //   }
  // };

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
          <Stack
            spacing={1}
            direction="row"
          >
            <PersonAddAlt1OutlinedIcon
              sx={{
                fontSize: "24px",
                color: styles.primaryTextColor,
                paddingLeft: "8px",
              }}
            />
            <Typography
              variant="body1"
              className="menu-title"
              sx={{ color: styles.primaryTextColor }}
            >
              Persona
            </Typography>
          </Stack>

          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchModalData.personaIds.length === 0 ? (
              <></>
            ) : (
              <>
                <Stack
                  sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                >
                  <Stack
                    onClick={onClickPersonaFilter}
                    onMouseOver={onMouseOverPersonaFilt}
                    onMouseOut={onMouseOutPersonaFilt}
                  className="filter-child-num-con"
                  >
                    <CloseIcon
                      sx={{
                        color: isMousePersonaFilt
                          ? styles.primaryTextColor
                          : "#737373",
                        fontSize: "16px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: "12px",
                        fontWeight: "600",
                        color: isMousePersonaFilt
                          ? styles.primaryTextColor
                          : styles.blackcolor,
                      }}
                    >
                      {searchModalData.personaIds.length}
                    </Typography>
                  </Stack>

                  {/* <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} /> */}
                </Stack>
              </>
            )}
            <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PersonaModalFilterOpen;
