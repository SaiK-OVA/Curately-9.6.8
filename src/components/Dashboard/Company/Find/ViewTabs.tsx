import * as React from "react";
// import {
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props} />;
});



const ViewTabs = () => {


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        PaperProps={{ sx: { width: "100%", height: "100%", left: 150, m: 0 } }}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', height: '40px' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ mb: 2 }}
            >
              <Typography>Back to Contacts list</Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Stack direction="row" spacing={2} paddingY={2} paddingLeft={4}>
          <Avatar {...stringAvatar('Kent Dodds')} sx={{ width: 56, height: 56 }} />
          <Typography>Kent Dodds</Typography><br></br>
          <Typography>Vali Company</Typography>
        </Stack>
        <Box
          sx={{
            width: "70%",
            typography: "body1",
            minHeight: "70vh",
            overflow: "scroll",
          }}
        >
          <TabContext value={value}>
            <Box sx={{ minHeight: "10vh" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  fontFamily: "sans-serif",
                  backgroundColor: "#f1e7f3",
                  fontWeight: "500",
                  color: "black",
                  width: "70%",
                  textTransform: "capitalize",
                  "& .Mui-selected": {
                    color: "purple",
                    borderBottom: "2px solid purple",
                  },
                  position: "fixed",
                }}
              >
                <Tab
                  sx={{
                    fontFamily: "sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "black",
                    textTransform: "capitalize",
                  }}
                  label="Notes"
                  value="1"
                />
                <Tab
                  sx={{
                    fontFamily: "sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "black",
                    textTransform: "capitalize",
                  }}
                  label="Activities"
                  value="2"
                />
                <Tab
                  sx={{
                    fontFamily: "sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "black",
                    textTransform: "capitalize",
                  }}
                  label="Jobs"
                  value="3"
                />
                <Tab
                  sx={{
                    fontFamily: "sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "black",
                    textTransform: "capitalize",
                  }}
                  label="Hires"
                  value="4"
                />
                <Tab
                  sx={{
                    fontFamily: "sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "black",
                    textTransform: "capitalize",
                  }}
                  label="Edit"
                  value="5"
                />
              </TabList>
            </Box>
            <Box
              sx={{
                overflowY: "scroll",
                minHeight: "50vh",

              }}
            >
              <TabPanel value="1">
                <h3>HOME</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua.</p>
              </TabPanel>
              <TabPanel value="2">
                Item Two
              </TabPanel>
              <TabPanel value="3">
                <h4>Status Type Created Job:Title Client Job Id HM Manager Location Rate Inter Sub Client Sub FHM
                  Interview Client React Offers</h4>
              </TabPanel>
              <TabPanel value="4">
                Item four
              </TabPanel>
              <TabPanel value="5">
                <h3>Contact Information</h3>
                <Grid container spacing={2}>
                  <Grid size={3}>
                    <FormLabel >Person Id</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Prefix</FormLabel><br></br>
                    <TextField
                      size='small'
                      id='Prefix'
                      name="Prefix"
                      select
                      className='mb-1'
                      sx={{ width: 195 }}
                      margin="none"

                    >
                      <MenuItem value="1"> Mr.</MenuItem>
                      <MenuItem value="2"> Mrs.</MenuItem>
                      <MenuItem value="3"> Ms.</MenuItem>
                      <MenuItem value="4"> Dr.</MenuItem>
                      <MenuItem value="5"> Rev. </MenuItem>
                      <MenuItem value="6"> Hov.</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >First Name</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Middle Name</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt="2px">
                  <Grid size={3}>
                    <FormLabel >Last Name</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Nickname/Preferred</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Title</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Department</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt="2px">
                  <Grid size={3}>
                    <FormLabel >Employer pipeline Status</FormLabel>
                    <TextField
                      size='small'
                      id='EPS'
                      name="EPS"
                      select
                      className='mb-2'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1">0:Inactive</MenuItem>
                      <MenuItem value="2">1:Target</MenuItem>
                      <MenuItem value="3">2:Sendouts</MenuItem>
                      <MenuItem value="4">3:Interviewing</MenuItem>

                    </TextField>
                  </Grid>
                  <Grid size={3}>
                    <FormControlLabel control={<Checkbox />} label="nle" />
                  </Grid>
                  <Grid size={3}>
                    <FormControlLabel control={<Checkbox />} label="No Bulk" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Owner</FormLabel><br></br>
                    <TextField
                      size='small'
                      id='Owner'
                      name="Owner"
                      select
                      className='mb-2'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1"> Aditya kumar</MenuItem>
                      <MenuItem value="2"> Akash kumar</MenuItem>
                      <MenuItem value="3"> Mastan vali</MenuItem>
                      <MenuItem value="4"> Sunil yekulla</MenuItem>
                      <MenuItem value="5"> Adam jones</MenuItem>
                      <MenuItem value="6"> Adi kulakarni</MenuItem>
                      <MenuItem value="7"> Akash Mehra</MenuItem>

                    </TextField>
                  </Grid>
                </Grid>
                <h3>Work Contact Information</h3>
                <Grid container spacing={2} mt="2px">
                  <Grid size={3}>
                    <FormLabel >Phone</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Phone</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Phone</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Phone</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt="2px">
                  <Grid size={3}>
                    <TextField
                      size='small'
                      id='EPS'
                      name="EPS"
                      select
                      className='mb-2'
                      label='Phone Type'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1">Phone Type</MenuItem>
                      <MenuItem value="2">Mobile</MenuItem>
                      <MenuItem value="3">Work-Direct</MenuItem>
                      <MenuItem value="4">Corporate Phone</MenuItem>

                    </TextField>
                  </Grid>
                  <Grid size={3}>
                    <TextField
                      size='small'
                      id='Phone'
                      name="Phone"
                      select

                      label='Phone Type'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1">Phone Type</MenuItem>
                      <MenuItem value="2">Mobile</MenuItem>
                      <MenuItem value="3">Work-Direct</MenuItem>
                      <MenuItem value="4">Corporate Phone</MenuItem>

                    </TextField>
                  </Grid>
                  <Grid size={3}>
                    <TextField
                      size='small'
                      id='EPS'
                      name="EPS"
                      select

                      label='Phone Type'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1">Phone Type</MenuItem>
                      <MenuItem value="2">Mobile</MenuItem>
                      <MenuItem value="3">Work-Direct</MenuItem>
                      <MenuItem value="4">Corporate Phone</MenuItem>

                    </TextField>
                  </Grid>
                  <Grid size={3}>
                    <TextField
                      size='small'
                      id='EPS'
                      name="EPS"
                      select

                      label='Phone Type'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1">Phone Type</MenuItem>
                      <MenuItem value="2">Mobile</MenuItem>
                      <MenuItem value="3">Work-Direct</MenuItem>
                      <MenuItem value="4">Corporate Phone</MenuItem>

                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt="2px">
                  <Grid size={3}>
                    <TextField
                      size='small'
                      id='NoStatus'
                      name="NoStatus"
                      select

                      label='No Status'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1">No Status</MenuItem>
                      <MenuItem value="2">Verified</MenuItem>
                      <MenuItem value="3">Questionable</MenuItem>
                      <MenuItem value="4">Not Working</MenuItem>

                    </TextField>
                  </Grid>
                  <Grid size={3}>
                    <TextField
                      size='small'
                      id='NoStatus'
                      name="NoStatus"
                      select

                      label='No Status'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1">No Status</MenuItem>
                      <MenuItem value="2">Verified</MenuItem>
                      <MenuItem value="3">Questionable</MenuItem>
                      <MenuItem value="4">Not Working</MenuItem>

                    </TextField>
                  </Grid>
                  <Grid size={3}>
                    <TextField
                      size='small'
                      id='NoStatus'
                      name="NoStatus"
                      select

                      label='No Status'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1">No Status</MenuItem>
                      <MenuItem value="2">Verified</MenuItem>
                      <MenuItem value="3">Questionable</MenuItem>
                      <MenuItem value="4">Not Working</MenuItem>

                    </TextField>
                  </Grid>
                  <Grid size={3}>
                    <TextField
                      size='small'
                      id='NoStatus'
                      name="NoStatus"
                      select

                      label='No Status'
                      sx={{ width: 195 }}
                      margin="none"
                    >
                      <MenuItem value="1">No Status</MenuItem>
                      <MenuItem value="2">Verified</MenuItem>
                      <MenuItem value="3">Questionable</MenuItem>
                      <MenuItem value="4">Not Working</MenuItem>

                    </TextField>
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt="2px">
                  <Grid size={3}>
                    <FormLabel >Email</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Alternate Email</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Reports To</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Linkedin</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                </Grid>
                <h3>Alternate Bussiness Address</h3>
                <Grid container spacing={2} >
                  <Grid size={6} >
                    <FormLabel >Office Location Name</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={6}>
                    <FormLabel >Street Address</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt="2px">
                  <Grid size={3}>
                    <FormLabel >City</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >State or Prov.</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Zip Code</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                  <Grid size={3}>
                    <FormLabel >Country</FormLabel>
                    <TextField id="outlined-basic" size='small' variant="outlined" />
                  </Grid>
                </Grid>
                <h3>Msp Programs</h3>
                <Grid container spacing={2} >
                  <Grid size={12}>
                    <FormLabel >Companies</FormLabel><br></br>
                    <TextField id="outlined-basic" size='small' variant="outlined" fullWidth />
                  </Grid>
                </Grid>
              </TabPanel>

            </Box>
          </TabContext>
        </Box>

      </Dialog>
    </>
  );
};
export default ViewTabs;
