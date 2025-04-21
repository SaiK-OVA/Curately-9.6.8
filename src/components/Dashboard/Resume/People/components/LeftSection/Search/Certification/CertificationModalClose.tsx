// import React, { useState, useContext } from "react";
import {  useContext } from "react";
import { useState } from "../../../../../../../../shared/modules/React";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./../../../../shared/config/variables.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";

const CertificationModalClose = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isMouseCertificationsFilt, setIsMouseCertificationsFilt] =
    useState(false);

  const onClickCertificationsFilter = (event: any) => {
    event.stopPropagation();
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      certificationsIn: [],
      autoCertificationsList: [],
    }));
  };

  const onClickRemoveCertifications = () => {
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      certificationsIn: [],
      autoCertificationsList: [],
    }));
  };

  const onClickCertificationsFiltSelOpt = (event: any) => {
    event.stopPropagation();
  };

  const onMouseOverCertificationsFilt = () => {
    setIsMouseCertificationsFilt(true);
  };

  const onMouseOutCertificationsFilt = () => {
    setIsMouseCertificationsFilt(false);
  };

  const removeCertificationsElement = (index: any) => {
    if (index !== -1) {
      const updatedAutoCertificationsList = searchModalData.autoCertificationsList;
      updatedAutoCertificationsList.splice(index, 1);
      const updatedCertifications = searchModalData.certificationsIn;
      updatedCertifications.splice(index, 1);
      setSearchModalData((prevSearchData: any) => ({
        ...prevSearchData,
        certificationsIn: updatedCertifications,
        autoCertificationsList: updatedAutoCertificationsList,
      }));
    }
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Stack
        sx={{
          width: "100%",
          borderBottom: "1px solid",
          borderBottomColor: styles.borderBottomColor,
          color: styles.blackcolor,
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
              icon={faCertificate}
            />
            <Typography variant="body1" className="menu-title">
              Certification
            </Typography>
          </Stack>
          <Stack sx={{ display: "flex", flexDirection: "row", gap: "3px" }}>
            {searchModalData.certificationsIn &&
            searchModalData.certificationsIn.length ? (
              <Stack sx={{ display: "flex", flexDirection: "row", gap: "5px" }}>
                <Stack
                  onClick={onClickCertificationsFilter}
                  onMouseOver={onMouseOverCertificationsFilt}
                  onMouseOut={onMouseOutCertificationsFilt}
                  className="filter-child-num-con"
                >
                  <CloseIcon
                    sx={{
                      color: isMouseCertificationsFilt
                        ? styles.primaryTextColor
                        : "#737373",
                      fontSize: "16px",
                    }}
                    onClick={onClickRemoveCertifications}
                  />
                  <Typography
                    sx={{
                      fontFamily:
                        'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                      fontSize: "12px",
                      fontWeight: "600",
                      color: isMouseCertificationsFilt
                        ? styles.primaryTextColor
                        : styles.blackcolor,
                    }}
                  >
                    {searchModalData.certificationsIn.length}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <></>
            )}
            <ArrowDropDownIcon sx={{ color: styles.arrowDropDownColor }} />
          </Stack>
        </Stack>
        {searchModalData.certificationsIn && searchModalData.certificationsIn.length ? (
          <Stack
            onClick={onClickCertificationsFiltSelOpt}
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
              Certifications:
            </Typography>
            {searchModalData.certificationsIn.map(
              (certifications: any, index: any) => (
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
                    {certifications}
                  </Typography>
                  <CloseIcon
                    onClick={() => removeCertificationsElement(index)}
                    sx={{ color: "#ffffff", fontSize: "small" }}
                  />
                </Stack>
              )
            )}
          </Stack>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

export default CertificationModalClose;
