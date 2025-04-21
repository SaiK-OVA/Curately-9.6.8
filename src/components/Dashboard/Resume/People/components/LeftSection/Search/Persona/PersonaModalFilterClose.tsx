import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Stack} from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArticleIcon from "@mui/icons-material/Article";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";
import '../Search.scss'

const PersonaModalFilterClose = () => {

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
          <Stack
            spacing={1}
            direction="row"
          >
            <PersonAddAlt1OutlinedIcon
              sx={{
                fontSize: "24px",

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
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchModalData.personaIds.length == 0 ? (
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
            <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
          </Stack>
        </Stack>
        {/* {searchModalData.personaIds.length ? (
          <>
            <Stack
              onClick={onClickPersonaFiltSelOpt}
              direction="row"
              useFlexGap
              flexWrap="wrap"
              sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#ffffff !important",
                paddingTop: "6px",
                paddingLeft: "22.83px",
                paddingBottom: "14px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#000000",
                  marginRight: "22px",
                }}
              >
                Persona:
              </Typography>
              {searchModalData.personaIds.map((Persona: any, index: any) => (
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
                      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#ffffff",
                    }}
                  >
                    {Persona}
                  </Typography>
                  <CloseIcon
                    onClick={() => removePersonaElement(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )} */}
      </Stack>
    </Stack>
  );
};

export default PersonaModalFilterClose;
