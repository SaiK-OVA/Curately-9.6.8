// import React, { useState } from "react";
import { useState } from "../../../../../../shared/modules/React";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import { Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { TextField, FormControl } from "../../../../../../shared/modules/MaterialImports/FormInputs";
import { MenuItem } from "../../../../../../shared/modules/MaterialImports/Menu";
import { Card } from "../../../../../../shared/modules/MaterialImports/Card";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import RemoveIcon from "@mui/icons-material/Remove";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";



import "./MainDetails.scss";

const MainDetails = () => {
  const [gender, setGender] = useState("select");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [available, setAvailable] = useState("");

  const handleChangeGender = (e: SelectChangeEvent) => {
    setGender(e.target.value as string);
  };
  const handleChangeStatus = (e: SelectChangeEvent) => {
    setStatus(e.target.value as string);
  };
  const handleChangeSource = (e: SelectChangeEvent) => {
    setSource(e.target.value as string);
  };
  const handleChangeAvailable = (e: SelectChangeEvent) => {
    setAvailable(e.target.value as string);
  };

  const [candInfo, setCandInfo] = useState({ remove: false, add: true });
  const handleCandInfoClick = () => {
    setCandInfo({ remove: !candInfo.remove, add: !candInfo.add });
  };

  const [candProf, setCandProf] = useState({ remove: true, add: false });
  const handleCandProfClick = () => {
    setCandProf({ remove: !candProf.remove, add: !candProf.add });
  };

  const [persInfo, setPersInfo] = useState({ remove: true, add: false });
  const handlePersInfoClick = () => {
    setPersInfo({ remove: !persInfo.remove, add: !persInfo.add });
  };

  const [summary, setSummary] = useState({ remove: true, add: false });
  const handleSummaryClick = () => {
    setSummary({ remove: !summary.remove, add: !summary.add });
  };

  const [education, setEducation] = useState({ remove: true, add: false });
  const handleEducationClick = () => {
    setEducation({ remove: !education.remove, add: !education.add });
  };

  const [experience, setExperience] = useState({ remove: true, add: false });
  const handleExperienceClick = () => {
    setExperience({ remove: !experience.remove, add: !experience.add });
  };

  return (
    <div className="main-details-bg-container">
      <div
        onClick={handleCandInfoClick}
        className="symbol-side-head-cont"
      >
        {candInfo.remove && (
          <RemoveIcon sx={{ fontSize: "20px", color: "blue" }} />
        )}
        {candInfo.add && <AddIcon sx={{ fontSize: "20px", color: "blue" }} />}

        <Typography
          sx={{ color: "blue" }}
          variant="subtitle1"
        >
          Candidate Information
        </Typography>
      </div>
      {candInfo.add && (
        <Card sx={{ padding: "10px", margin: "10px", marginLeft: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ display: "flex", width: "40%" }}>
              <Box sx={{ width: "40%", marginRight: "15px" }}>
                <Typography variant="body2">Person Id</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                />
              </Box>
              <Box sx={{ width: "40%" }}>
                <Typography variant="body2">Prefix</Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                      size="small"
                      value={gender}
                      onChange={handleChangeGender}
                    >
                      <MenuItem value={10}>Mr.</MenuItem>
                      <MenuItem value={20}>Mrs.</MenuItem>
                      <MenuItem value={30}>Trans Women</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">First Name</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">Last Name</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
          <Box sx={{ width: "40%", marginBottom: "10px" }}>
            <Typography variant="body2">Owner</Typography>
            <TextField
              variant="outlined"
              size="small"
            />
          </Box>
        </Card>
      )}

      <div
        onClick={handleCandProfClick}
        className="symbol-side-head-cont"
      >
        {candProf.remove && (
          <RemoveIcon sx={{ fontSize: "20px", color: "blue" }} />
        )}
        {candProf.add && <AddIcon sx={{ fontSize: "20px", color: "blue" }} />}
        <Typography
          sx={{ color: "blue" }}
          variant="subtitle1"
        >
          Candidate Profile
        </Typography>
      </div>
      {candProf.add && (
        <Card sx={{ padding: "10px", margin: "10px", marginLeft: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ display: "flex", width: "40%" }}>
              <Box sx={{ width: "45%", display: "flex", alignSelf: "center" }}>
                <CheckCircleRoundedIcon
                  sx={{ fontSize: "20px", color: "blue" }}
                />
                <Typography variant="body2">Active</Typography>
              </Box>
              <Box sx={{ width: "45%", display: "flex", alignSelf: "center" }}>
                <CheckCircleRoundedIcon
                  sx={{ fontSize: "20px", color: "blue" }}
                />
                <Typography variant="body2">Employee</Typography>
              </Box>
            </Box>
            <Box sx={{ width: "30%", marginRight: "15px" }}>
              <Typography variant="body2">Candidate Status</Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={status}
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">Source</Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={source}
                    onChange={handleChangeSource}
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", width: "100%", marginBottom: "10px" }}>
            <Box sx={{ width: "40%" }}>
              <Typography variant="body2">Reffered By/Source Notes</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box
              sx={{
                width: "30%",
                display: "flex",
                justifyContent: "space-between",
                marginRight: "15px",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <Typography variant="body2">Default/Current Resume</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                />
              </Box>

              <TextField
                sx={{ alignSelf: "center", width: "35%", marginTop: "13px" }}
                placeholder="Preview"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">Available to Start</Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={available}
                    onChange={handleChangeAvailable}
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box></Box>
        </Card>
      )}

      <div
        onClick={handlePersInfoClick}
        className="symbol-side-head-cont"
      >
        {persInfo.remove && (
          <RemoveIcon sx={{ fontSize: "20px", color: "blue" }} />
        )}
        {persInfo.add && <AddIcon sx={{ fontSize: "20px", color: "blue" }} />}
        <Typography
          sx={{ color: "blue" }}
          variant="subtitle1"
        >
          Personal Information
        </Typography>
      </div>
      {persInfo.add && (
        <Card sx={{ padding: "10px", margin: "10px", marginLeft: "20px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ width: "40%", marginBottom: "10px" }}>
              <Typography variant="body2">Owner</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "30%", marginRight: "15px" }}>
              <Typography variant="body2">Owner</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "30%", marginRight: "15px" }}>
              <Typography variant="body2">Owner</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ width: "40%", marginBottom: "10px" }}>
              <Typography variant="body2">Owner</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "30%", marginRight: "15px" }}>
              <Typography variant="body2">Owner</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "30%", marginRight: "15px" }}>
              <Typography variant="body2">Owner</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
        </Card>
      )}

      <div
        onClick={handleSummaryClick}
        className="symbol-side-head-cont"
      >
        {summary.remove && (
          <RemoveIcon sx={{ fontSize: "20px", color: "blue" }} />
        )}
        {summary.add && <AddIcon sx={{ fontSize: "20px", color: "blue" }} />}
        <Typography
          sx={{ color: "blue" }}
          variant="subtitle1"
        >
          Summary
        </Typography>
      </div>
      {summary.add && (
        <Card sx={{ padding: "10px", margin: "10px", marginLeft: "20px" }}>
          <Typography variant="body2">Owner</Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
        </Card>
      )}

      <div
        onClick={handleEducationClick}
        className="symbol-side-head-cont"
      >
        {education.remove && (
          <RemoveIcon sx={{ fontSize: "20px", color: "blue" }} />
        )}
        {education.add && <AddIcon sx={{ fontSize: "20px", color: "blue" }} />}
        <Typography
          sx={{ color: "blue" }}
          variant="subtitle1"
        >
          Education
        </Typography>
      </div>
      {education.add && <Typography variant="body1">Education</Typography>}

      <div
        onClick={handleExperienceClick}
        className="symbol-side-head-cont"
      >
        {experience.remove && (
          <RemoveIcon sx={{ fontSize: "20px", color: "blue" }} />
        )}
        {experience.add && <AddIcon sx={{ fontSize: "20px", color: "blue" }} />}
        <Typography
          sx={{ color: "blue" }}
          variant="subtitle1"
        >
          Experience
        </Typography>
      </div>
      {experience.add && <Typography variant="body1">Experience</Typography>}
    </div>
  );
};

export default MainDetails;
