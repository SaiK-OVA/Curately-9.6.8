// import React, { useState, useContext } from "react";
import {useState } from "../../../../../../../../shared/modules/React";
import { useContext  } from "react";
import { Stack } from "../../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import styles from "./../../../../shared/config/variables.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import { ModalStore } from "../../../DataLabs/DataLabs";

const CertificationModalOpen = () => {
  const [searchModalData, setSearchModalData] = useContext(ModalStore);
  const [isMouseCertificationsFilt, setIsMouseCertificationsFilt] =
    useState(false);

  const onClickCertificationsFilter = (event: any) => {
    // event.stopPropagation();
    setSearchModalData((prevSearchData: any) => ({
      ...prevSearchData,
      certificationsIn: [],
      autoCertificationsList: [],
    }));
  };

  // const onClickRemoveCertifications = () => {
  //   setSearchModalData((prevSearchData: any) => ({
  //     ...prevSearchData,
  //     certificationsIn: [],
  //     autoCertificationsList: [],
  //   }));
  // };

  const onMouseOverCertificationsFilt = () => {
    setIsMouseCertificationsFilt(true);
  };

  const onMouseOutCertificationsFilt = () => {
    setIsMouseCertificationsFilt(false);
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
              icon={faCertificate}
            />
            <Typography
              variant="body1"
              className="menu-title"
              sx={{ color: styles.primaryTextColor }}
            >
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
                  className="filter-child-num-con "
                >
                  <CloseIcon
                    sx={{
                      color: isMouseCertificationsFilt
                        ? styles.primaryTextColor
                        : "#737373",
                      fontSize: "16px",
                    }}
                    // onClick={onClickRemoveCertifications}
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
            <ArrowDropUpIcon sx={{ color: styles.primaryTextColor }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CertificationModalOpen;
