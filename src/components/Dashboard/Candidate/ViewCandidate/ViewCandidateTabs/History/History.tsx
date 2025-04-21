// import React, { useState } from "react";
import { useState } from "../../../../../../shared/modules/React";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import { Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { TextField, FormControl } from "../../../../../../shared/modules/MaterialImports/FormInputs";
import { Card } from "../../../../../../shared/modules/MaterialImports/Card";
import { MenuItem } from "../../../../../../shared/modules/MaterialImports/Menu";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import "./History.scss";

const History = () => {
  const [gender, setGender] = useState("");
  const handleChangeGender = (e: SelectChangeEvent) => {
    setGender(e.target.value as string);
  };
  const [result, setResult] = useState("");
  const handleChangeResult = (e: SelectChangeEvent) => {
    setResult(e.target.value as string);
  };
  const [recruiter, setRecruiter] = useState("");
  const handleChangeRecruiter = (e: SelectChangeEvent) => {
    setRecruiter(e.target.value as string);
  };
  const [activity, setActivity] = useState("");
  const handleChangeActivity = (e: SelectChangeEvent) => {
    setActivity(e.target.value as string);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "70%" }}>
        <Typography
          sx={{ color: "blue" }}
          variant="subtitle1"
        >
          Activities Information
        </Typography>
        <Card sx={{ margin: "10px", padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ width: "30%", marginBottom: "10px" }}>
              <Typography variant="body2">Activity</Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={activity}
                    onChange={handleChangeActivity}
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">Recruiter</Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={recruiter}
                    onChange={handleChangeRecruiter}
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">Result</Typography>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <Select
                    size="small"
                    value={result}
                    onChange={handleChangeResult}
                  >
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ width: "30%", marginBottom: "10px" }}>
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ width: "30%", marginBottom: "10px" }}>
              <Typography variant="body2">Designation</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "63%" }}>
              <Typography variant="body2">Regarding</Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ width: "30%", marginBottom: "10px" }}>
              <Typography variant="body2">BCC for Emails</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "63%" }}>
              <Typography variant="body2">
                Additional recipients for Emails
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
        </Card>
        <Typography
          sx={{ color: "blue" }}
          variant="subtitle1"
        >
          Schedule
        </Typography>
        <Card sx={{ margin: "10px", padding: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ width: "30%", marginBottom: "10px" }}>
              <Typography variant="body2">Start Date</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">End Date</Typography>
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
              }}
            >
              <Box>
                <Typography variant="body2">No Time</Typography>
                <CheckCircleRoundedIcon
                  sx={{ fontSize: "25px", marginTop: "10px", color: "blue" }}
                />
              </Box>
              <Box>
                <Typography variant="body2">Alarm</Typography>
                <CheckCircleRoundedIcon
                  sx={{ fontSize: "25px", marginTop: "10px", color: "blue" }}
                />
              </Box>
              <Box>
                <Typography variant="body2">Done</Typography>
                <CheckCircleRoundedIcon
                  sx={{ fontSize: "25px", marginTop: "10px", color: "blue" }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <Box sx={{ width: "30%", marginBottom: "10px" }}>
              <Typography variant="body2">Company</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">Candidate</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ width: "30%" }}>
              <Typography variant="body2">Job</Typography>
              <TextField
                variant="outlined"
                size="small"
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Box sx={{ width: "96%" }}>
              <Typography variant="body2">Comments</Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                variant="outlined"
              />
            </Box>
          </Box>
        </Card>
      </Box>
      <Box sx={{ width: "30%" }}></Box>
    </Box>
  );
};

export default History;
