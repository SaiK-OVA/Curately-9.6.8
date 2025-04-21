import {React} from "../../../../../../../../shared/modules/React";
import { useContext } from "react";
// import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import {Stack} from "../../../../../../../../shared/modules/MaterialImports/Stack";
import {Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
// import ArticleIcon from "@mui/icons-material/Article";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import styles from "./../../../../shared/config/variables.module.scss";
import CloseIcon from "@mui/icons-material/Close";
// import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Store } from "../../../DataLabs/DataLabs";
import '../Search.scss'

interface LocationCloseProps {
  getZipCode: (value: any, value2: any) => void;
  getHqZipCode: (value: any, value2: any) => void;
}

const LocationClose: React.FC<LocationCloseProps> = ({ getZipCode, getHqZipCode }) => {
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
      distance: null,
      hqzipcode: "",
      hqdistance: null
    }));
    getZipCode("", 25)
    getHqZipCode("", 25)
  };

  const [isMouseLocationFilt, setIsMouseLocationFilt] = React.useState(false);
  const onMouseOverLocationFilt = () => {
    setIsMouseLocationFilt(true);
  };

  const onMouseOutLocationFilt = () => {
    setIsMouseLocationFilt(false);
  };

  const removeLocationElement = (index: any) => {
    if (index !== -1) {
      const updatedLocation = searchData.locations;
      console.log(updatedLocation);
      updatedLocation.splice(index, 1);
      console.log(updatedLocation);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        locations: updatedLocation,
      }));
    }
  };

  const removeLocationElementPast = (index: any) => {
    if (index !== -1) {
      const updatedLocation = searchData.locations_not_in;
      updatedLocation.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        locations_not_in: updatedLocation,
      }));
    }
  };

  const removeHqLocationElement = (index: any) => {
    if (index !== -1) {
      const updatedHqLocation = searchData.hq_locations;
      console.log(updatedHqLocation);
      updatedHqLocation.splice(index, 1);
      console.log(updatedHqLocation);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        hq_locations: updatedHqLocation,
      }));
    }
  };

  const removeHqLocationElementPast = (index: any) => {
    if (index !== -1) {
      const updatedHqLocation = searchData.hq_locations_not_in;
      updatedHqLocation.splice(index, 1);
      setSearchData((prevSearchData: any) => ({
        ...prevSearchData,
        hq_locations_not_in: updatedHqLocation,
      }));
    }
  };

  const onClickLocationSelOpt = (event: any) => {
    event.stopPropagation();
  };

  const onClickHqLocationSelOpt = (event: any) => {
    event.stopPropagation();
  };

  const onClickZipCode = (event: any) => {
    event.stopPropagation();
  };

  const onClickHqZipCode = (event: any) => {
    event.stopPropagation();
  };

  const removeZipCode = () => {
    console.log("is coming")
    setSearchData((prevSearchData: any) => {
      return {
        ...prevSearchData,
        zipcode: "",
        distance: null
      }

    });
    getZipCode("", 25)
  }

  const removeHqZipCode = () => {
    console.log("is coming")
    setSearchData((prevSearchData: any) => {
      return {
        ...prevSearchData,
        hqzipcode: "",
        hqdistance: null
      }

    });
    getHqZipCode("", 25)
  }

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
            <LocationOnOutlinedIcon
              sx={{
                fontSize: "24px",

                paddingLeft: "8px",
              }}
            />
            <Typography
              variant="body1"
              className="menu-title"
            >
              Location
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchData.locations.length +
              searchData.locations_not_in.length +
              searchData.hq_locations.length +
              searchData.hq_locations_not_in.length + (searchData.zipcode !== "" ? 1 : 0)
              + (searchData.hqzipcode !== "" ? 1 : 0) === 0 ? (
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
            <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
          </Stack>
        </Stack>
        {searchData.locations.length ? (
          <>
            <Stack
              onClick={onClickLocationSelOpt}
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
                Locations:
              </Typography>
              {searchData.locations.map((location: any, index: any) => (
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
                    {location}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeLocationElement(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.locations_not_in.length ? (
          <>
            <Stack
              onClick={onClickLocationSelOpt}
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
                Exclude Locations:
              </Typography>
              {searchData.locations_not_in.map((location: any, index: any) => (
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
                    height: "20px",
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
                    {location}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeLocationElementPast(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.hq_locations.length ? (
          <>
            <Stack
              onClick={onClickHqLocationSelOpt}
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
                Hq Locations:
              </Typography>
              {searchData.hq_locations.map((hqlocation: any, index: any) => (
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
                    {hqlocation}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeHqLocationElement(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              ))}
            </Stack>
          </>
        ) : (
          <></>
        )}

        {searchData.hq_locations_not_in.length ? (
          <>
            <Stack
              onClick={onClickHqLocationSelOpt}
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
                Exclude Hq Locations:
              </Typography>
              {searchData.hq_locations_not_in.map(
                (hqlocation: any, index: any) => (
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
                      height: "20px",
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
                      {hqlocation}
                    </Typography>
                    <CloseIcon
                      onClick={() => removeHqLocationElementPast(index)}
                      sx={{ color: "#ffffff", fontSize: "small" }}
                    />
                  </Stack>
                )
              )}
            </Stack>
          </>
        ) : (
          <></>
        )}
        {searchData.zipcode !== "" ? (
          <>
            <Stack
              onClick={onClickZipCode}
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
                Zip code:
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
                  height: "20px",
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
                  {/* {searchData.zipcode} */}
                  {`${searchData.zipcode} (within ${searchData.distance} miles)`} 
                </Typography>
                <CloseIcon
                  onClick={removeZipCode}
                  sx={{ color: "#ffffff", fontSize: "small" }}
                />
              </Stack>

            </Stack>
          </>
        ) : (
          <></>
        )}


        {searchData.hqzipcode !== "" ? (
          <>
            <Stack
              onClick={onClickHqZipCode}
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
                Zip code:
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
                  height: "20px",
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
                  {`${searchData.hqzipcode} (within ${searchData.hqdistance} miles)`} 
                </Typography>
                <CloseIcon
                  onClick={removeHqZipCode}
                  sx={{ color: "#ffffff", fontSize: "small" }}
                />
              </Stack>

            </Stack>
          </>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default LocationClose;
