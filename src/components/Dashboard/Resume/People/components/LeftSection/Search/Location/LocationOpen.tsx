// import React from "react";
import { useContext } from "react";
import {React} from "../../../../../../../../shared/modules/React";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import { Stack  } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import { Store } from "../../../DataLabs/DataLabs";
import '../Search.scss'

const LocationOpen = () => {
  const [searchData, setSearchData] = useContext(Store);

  // console.log(searchData)
  // const onClickLocationFilter = (event: any) => {
  //   event.stopPropagation();
  // };

  const onClickLocationFiltSelOpt = (event: any) => {
    event.stopPropagation();
    setSearchData((prevSearchData: any) => ({
      ...prevSearchData,
      locations: [],
      locations_not_in: [],
      hq_locations: [],
      hq_locations_not_in: [],
      zipcode: "",
      distance: "",
      hqzipcode: "",
      hqdistance: null
    }));
  };

  const [isMouseLocationFilt, setIsMouseLocationFilt] = React.useState(false);
  const onMouseOverLocationFilt = () => {
    setIsMouseLocationFilt(true);
  };

  const onMouseOutLocationFilt = () => {
    setIsMouseLocationFilt(false);
  };

  // const removeLocationElement = (index: any) => {
  //   if (index !== -1) {
  //     const updatedLocation = searchData.locations;
  //     console.log(updatedLocation);
  //     updatedLocation.splice(index, 1);
  //     console.log(updatedLocation);
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       locations: updatedLocation,
  //     }));
  //   }
  // };

  // const removeLocationElementPast = (index: any) => {
  //   if (index !== -1) {
  //     const updatedLocation = searchData.locations_not_in;
  //     updatedLocation.splice(index, 1);
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       locations_not_in: updatedLocation,
  //     }));
  //   }
  // };

  // const removeHqLocationElement = (index: any) => {
  //   if (index !== -1) {
  //     const updatedHqLocation = searchData.hq_locations;
  //     console.log(updatedHqLocation);
  //     updatedHqLocation.splice(index, 1);
  //     console.log(updatedHqLocation);
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       hq_locations: updatedHqLocation,
  //     }));
  //   }
  // };

  // const removeHqLocationElementPast = (index: any) => {
  //   if (index !== -1) {
  //     const updatedHqLocation = searchData.hq_locations_not_in;
  //     updatedHqLocation.splice(index, 1);
  //     setSearchData((prevSearchData: any) => ({
  //       ...prevSearchData,
  //       hq_locations_not_in: updatedHqLocation,
  //     }));
  //   }
  // };

  // const onClickLocationSelOpt = (event: any) => {
  //   event.stopPropagation();
  // };

  // const onClickHqLocationSelOpt = (event: any) => {
  //   event.stopPropagation();
  // };

  // const removeZipCode = () => {
  //   setSearchData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     zipcode: "",
  //     distance: ""
  //   }));
  // }

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
            <LocationOnOutlinedIcon
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
              Location
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>

            {searchData.locations.length +
              searchData.locations_not_in.length +
              searchData.hq_locations.length +
              searchData.hq_locations_not_in.length + (searchData.zipcode !== "" ? 1 : 0) + (searchData.hqzipcode !== "" ? 1 : 0) === 0 ? (
              <></>
            ) : (
              <>
                <Stack
                  sx={{ display: "flex", flexDirection: "row", gap: "5px" }}
                >
                  <Stack
                    onClick={onClickLocationFiltSelOpt}
                    onMouseOver={onMouseOverLocationFilt}
                    onMouseOut={onMouseOutLocationFilt}
                   className="filter-child-num-con"
                  >
                    <CloseIcon
                      sx={{
                        color: isMouseLocationFilt
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
                        color: isMouseLocationFilt
                          ? styles.primaryTextColor
                          : styles.blackcolor,
                      }}
                    >
                      {searchData.locations.length +
                        searchData.locations_not_in.length +
                        searchData.hq_locations.length +
                        searchData.hq_locations_not_in.length + (searchData.zipcode !== "" ? 1 : 0) + (searchData.hqzipcode !== "" ? 1 : 0)}
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

export default LocationOpen;
