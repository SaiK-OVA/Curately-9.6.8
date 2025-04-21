import { React, useState } from "../../../../shared/modules/React";
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { Button } from "../../../../shared/modules/MaterialImports/Button";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Card } from "../../../../shared/modules/MaterialImports/Card";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { styled } from '@mui/material/styles';
import { Radio, RadioGroup, Checkbox } from '../../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel, FormControl, TextField } from '../../../../shared/modules/MaterialImports/FormInputs';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';

import '../../../shared/Activities/Activities.scss'
import { DatePicker, LocalizationProvider } from "../../../../shared/modules/MaterialImports/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: 1,
  width: 16,
  height: 16,
  backgroundColor: '#ffffff',
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'var(--c-primary-color)',
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""'
  },
});

const RadioBpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 16,
  height: 16,
  boxShadow:
    theme.palette.mode === "dark" ? "red" : "inset 0 0 0 1px var(--c-secondary-color)"
}));

const RadioBpCheckedIcon = styled(RadioBpIcon)({
  backgroundColor: 'var(--c-primary-color)',
  boxShadow: 'none',
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    display: "block",
    width: 16,
    height: 16,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""'
  }
});

const BpCheckboxContainer = styled("div")({
  '.bp-icon': {
    border: "1px var(--c-secondary-color) solid",
  },
  "& .bp-checkbox:hover .bp-icon": {
    borderColor: 'var(--c-primary-color)',
  }
});

const labels = [
  { label: 'Aakash Kumar', id: 1 },
  { label: 'Achila A', id: 2 },
  { label: 'Aditya Kumar', id: 3 },
  { label: 'Amanda Gerson', id: 4 },
  { label: 'Guru Sakthi', id: 5 },
];
const typeLabels = [
  { label: 'To-Do', id: 1 },
  { label: 'Call', id: 2 },
  { label: 'Email', id: 3 },
];
const PriorityLabels = [
  { label: 'None', id: 1 },
  { label: 'Low', id: 2 },
  { label: 'Medium', id: 3 },
  { label: 'High', id: 4 },
];
const dateLabels = [
  { label: 'Today', id: 1 },
  { label: 'Tomorrow', id: 2 },
  { label: 'In 2 days(Monday)', id: 3 },
  { label: 'In 3 days(Tuesday)', id: 4 },
  { label: 'In 1 week July 29', id: 5 },
  { label: 'In 2 week August 5', id: 6 },
  { label: 'In 1 month August 22', id: 7 },
  { label: 'In 6 months January 22', id: 8 },
  { label: 'Custom Date', id: 9 },
];
const timeLabels = [
  { label: '12:00 AM', id: 1 },
  { label: '12:15 AM', id: 2 },
  { label: '12:30 AM', id: 3 },
  { label: '12:45 AM', id: 4 },
  { label: '1:00 AM', id: 5 },
  { label: '1:15 AM', id: 6 },
  { label: '1:30 AM', id: 7 },
  { label: '1:45 AM', id: 8 },
  { label: '2:00 AM', id: 9 },
  { label: '2:15 AM', id: 10 },
  { label: '2:30 AM', id: 11 },
  { label: '2:45 AM', id: 12 },
  { label: '3:00 AM', id: 13 },
  { label: '3:15 AM', id: 14 },
  { label: '3:30 AM', id: 15 },
  { label: '3:45 AM', id: 16 },
  { label: '4:00 AM', id: 17 },
  { label: '4:15 AM', id: 18 },
  { label: '4:30 AM', id: 19 },
  { label: '4:45 AM', id: 20 },
  { label: '5:00 AM', id: 21 },
  { label: '5:15 AM', id: 22 },
  { label: '5:30 AM', id: 23 },
  { label: '5:45 AM', id: 24 },
  { label: '6:00 AM', id: 25 },
  { label: '6:15 AM', id: 26 },
  { label: '6:30 AM', id: 27 },
  { label: '6:45 AM', id: 28 },
  { label: '7:00 AM', id: 29 },
  { label: '7:15 AM', id: 30 },
  { label: '7:30 AM', id: 31 },
  { label: '7:45 AM', id: 32 },
  { label: '8:00 AM', id: 33 },
  { label: '8:15 AM', id: 34 },
  { label: '8:30 AM', id: 35 },
  { label: '8:45 AM', id: 36 },
  { label: '9:00 AM', id: 37 },
  { label: '9:15 AM', id: 38 },
  { label: '9:30 AM', id: 39 },
  { label: '9:45 AM', id: 40 },
  { label: '10:00 AM', id: 41 },
  { label: '10:15 AM', id: 42 },
  { label: '10:30 AM', id: 43 },
  { label: '10:45 AM', id: 44 },
  { label: '11:00 AM', id: 45 },
  { label: '11:15 AM', id: 46 },
  { label: '11:30 AM', id: 47 },
  { label: '11:45 AM', id: 48 },
  { label: '12:00 PM', id: 49 },
  { label: '12:15 PM', id: 50 },
  { label: '12:30 PM', id: 51 },
  { label: '12:45 PM', id: 52 },
  { label: '1:00 PM', id: 53 },
  { label: '1:15 PM', id: 54 },
  { label: '1:30 PM', id: 55 },
  { label: '1:45 PM', id: 56 },
  { label: '2:00 PM', id: 57 },
  { label: '2:15 PM', id: 58 },
  { label: '2:30 PM', id: 59 },
  { label: '2:45 PM', id: 60 },
  { label: '3:00 PM', id: 61 },
  { label: '3:15 PM', id: 62 },
  { label: '3:30 PM', id: 63 },
  { label: '3:45 PM', id: 64 },
  { label: '4:00 PM', id: 65 },
  { label: '4:15 PM', id: 66 },
  { label: '4:30 PM', id: 67 },
  { label: '4:45 PM', id: 68 },
  { label: '5:00 PM', id: 69 },
  { label: '5:15 PM', id: 70 },
  { label: '5:30 PM', id: 71 },
  { label: '5:45 PM', id: 72 },
  { label: '6:00 PM', id: 73 },
  { label: '6:15 PM', id: 74 },
  { label: '6:30 PM', id: 75 },
  { label: '6:45 PM', id: 76 },
  { label: '7:00 PM', id: 77 },
  { label: '7:15 PM', id: 78 },
  { label: '7:30 PM', id: 79 },
  { label: '7:45 PM', id: 80 },
  { label: '8:00 PM', id: 81 },
  { label: '8:15 PM', id: 82 },
  { label: '8:30 PM', id: 83 },
  { label: '8:45 PM', id: 84 },
  { label: '9:00 PM', id: 85 },
  { label: '9:15 PM', id: 86 },
  { label: '9:30 PM', id: 87 },
  { label: '9:45 PM', id: 88 },
  { label: '10:00 PM', id: 89 },
  { label: '10:15 PM', id: 90 },
  { label: '10:30 PM', id: 91 },
  { label: '10:45 PM', id: 92 },
  { label: '11:00 PM', id: 93 },
  { label: '11:15 PM', id: 94 },
  { label: '11:30 PM', id: 95 },
  { label: '11:45 PM', id: 96 },


];

const ContactActivities = () => {

  const [selectedRadiovalue, setSelectedRadioValue] = useState('Note');
  const [isRadioNote, setIsRadioNote] = useState(true);
  const [isRadioCall, setIsRadioCall] = useState(false);
  const [isRadioAction, setIsRadioAction] = useState(false);
  const [isRadioTask, setIsRadioTask] = useState(false);
  const [isContact, setIsContact] = useState(true)
  const [isAccount, setIsAccount] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [callText, setCallText] = useState('')
  const [actionText, setActionText] = useState('')
  const [tastText, setTaskText] = useState('')
  const [isHideActivities, setIsHideActivities] = useState(true)
  const [pinNoteChecked, setPinNoteChecked] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);



  const handleHideActivities = () => {
    setIsHideActivities(!isHideActivities)
  }
  const handleNoteChange = (event: any) => {
    setNoteText(event.target.value);
  };
  const handleCallChange = (event: any) => {
    setCallText(event.target.value);
  };
  const handleActionChange = (event: any) => {
    setActionText(event.target.value);
  };
  const handleTaskChange = (event: any) => {
    setTaskText(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadioValue((event.target as HTMLInputElement).value);
  };

  const onclickContact = () => {
    setIsContact(true)
    setIsAccount(false)
  }

  const onclickAccount = () => {
    setIsContact(false)
    setIsAccount(true)
  }

  const onClickRadioNote = () => {
    setIsRadioNote(true)
    setIsRadioCall(false)
    setIsRadioAction(false)
    setIsRadioTask(false)
    setSelectedRadioValue('Note')
  }

  const onClickRadioCall = () => {
    setIsRadioNote(false)
    setIsRadioCall(true)
    setIsRadioAction(false)
    setIsRadioTask(false)
    setSelectedRadioValue('Call')
  }

  const onClickRadioAction = () => {
    setIsRadioNote(false)
    setIsRadioCall(false)
    setIsRadioAction(true)
    setIsRadioTask(false)
    setSelectedRadioValue('Req Call')
  }

  const onClickRadioTask = () => {
    setIsRadioNote(false)
    setIsRadioCall(false)
    setIsRadioAction(false)
    setIsRadioTask(true)
    setSelectedRadioValue('Meeting')
  }

  const handleChangePinNoteChecked = (event: any) => {
    setPinNoteChecked(event.target.checked);
  };
  return (
    (<div className="Activities">
      {
        contactLoading ? (
          <Box className="initialBox" >
            <CircularProgress sx={{ color: 'var(--c-primary-color)' }} className="centered" />
          </Box >
        ) : (
          <Stack className="mainStack">

            <Stack sx={{ width: '100%' }}>
              <Card sx={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                <Box className="mainHeadBox">
                  <Typography className="Activities-Style" >
                    Activities</Typography>
                  <Button
                    disableRipple
                    className="hide-Activities-Style"
                    onClick={handleHideActivities}
                  >
                    Hide Activities
                  </Button>
                </Box>

                {isHideActivities &&
                  <Box className="hide-Act-Box1">
                    <Box className="con-Acc-Box"
                      sx={{
                        borderBottom: isContact ? '1px solid var(--c-primary-color)' : '1px solid #E6E6E6',
                      }}
                      onClick={onclickContact}
                    >
                      <Box
                        sx={{
                          pl: '20%',
                        }}

                      >
                        <PersonOutlinedIcon sx={{ color: isContact ? 'var(--c-primary-color)' : '#737373', fontSize: '18px', mt: '3px' }} />
                      </Box>
                      <Box>
                        <Typography component='p' className="con-Acc-Text"
                          sx={{
                            color: isContact ? 'var(--c-primary-color)' : '#474747',
                          }}>
                          Contact
                        </Typography>
                      </Box>
                    </Box>

                    <Box className="con-Acc-Box"
                      sx={{
                        borderBottom: isAccount ? '1px solid var(--c-primary-color)' : '1px solid #E6E6E6',

                      }}
                      onClick={onclickAccount}
                    >
                      <Box
                        sx={{ pl: '20%' }}

                      >
                        <PersonOutlinedIcon sx={{ color: isAccount ? 'var(--c-primary-color)' : '#737373', fontSize: '18px', mt: '3px' }} />
                      </Box>
                      <Box>
                        <Typography component='p' className="con-Acc-Text"
                          sx={{
                            color: isAccount ? 'var(--c-primary-color)' : '#474747',
                          }}>
                          Account
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                }

                {isContact &&
                  <Stack >
                    <Box sx={{ display: isHideActivities ? 'block' : 'none', flexDirection: 'row', justifyContent: 'center' }}>
                      <FormControl sx={{ width: '100%' }}>
                        <RadioGroup
                          row
                          value={selectedRadiovalue}
                          onChange={handleRadioChange}
                          sx={{
                            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'nowrap',
                            '& .MuiFormControlLabel-root': {
                              mr: 0, ml: 0
                            }
                          }}

                        >
                          <FormControlLabel
                            value='Note'
                            onClick={onClickRadioNote}
                            control={
                              <Radio
                                disableRipple
                                color="default"
                                checkedIcon={<RadioBpCheckedIcon />}
                                icon={<RadioBpIcon />}
                              />
                            }
                            label={
                              <Typography component='label'
                                className="labelDiv"
                              >
                                Note
                              </Typography>
                            }
                          // sx={{ pl: '0%' }}
                          />

                          <FormControlLabel
                            value='Call'
                            onClick={onClickRadioCall}
                            control={
                              <Radio
                                disableRipple
                                color="default"
                                checkedIcon={<RadioBpCheckedIcon />}
                                icon={<RadioBpIcon />}
                              />
                            }
                            label={
                              <Typography component='label'
                                className="labelDiv"
                              >
                                Call
                              </Typography>
                            }
                          // sx={{ pl: '0%' }}
                          />

                          <FormControlLabel
                            value='Req Call'
                            onClick={onClickRadioAction}
                            control={
                              <Radio
                                disableRipple
                                color="default"
                                checkedIcon={<RadioBpCheckedIcon />}
                                icon={<RadioBpIcon />}
                              />
                            }
                            label={
                              <Typography component='label'
                                className="labelDiv"
                              >
                                Req Call
                              </Typography>
                            }
                          />

                          <FormControlLabel
                            value='Meeting'
                            onClick={onClickRadioTask}
                            control={
                              <Radio
                                disableRipple
                                color="default"
                                checkedIcon={<RadioBpCheckedIcon />}
                                icon={<RadioBpIcon />}
                              />
                            }
                            label={
                              <Typography component='label'
                                className="labelDiv"
                              >
                                Meeting
                              </Typography>
                            }
                          // sx={{ pl: 1 }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Box>



                    {isRadioNote &&
                      <Stack sx={{ width: '100%' }}>
                        <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                          <Box className="radio-Box">
                            <TextField
                              color="error"
                              className="typeNote"
                              multiline
                              rows={3}
                              placeholder="Type a note..."
                              value={noteText}
                              onChange={handleNoteChange}
                            />
                          </Box>


                          <Stack direction='row' spacing={2} pl='8%' sx={{ display: isHideActivities ? 'block' : 'none' }} mb={2} mt={3}>
                            <Button
                              disableRipple
                              className="Logcall-style"
                              sx={{
                                mt: '5%',
                                backgroundColor: noteText ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                '&:hover': {
                                  backgroundColor: noteText ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                }
                              }}
                            >
                              Log Note
                            </Button>
                            <FormControlLabel
                              control={
                                <BpCheckboxContainer>
                                  <Checkbox
                                    className="bp-checkbox"
                                    disableRipple
                                    onChange={handleChangePinNoteChecked}
                                    checked={pinNoteChecked}
                                    checkedIcon={<BpCheckedIcon className="bp-icon" style={{ borderColor: pinNoteChecked ? 'var(--c-primary-color)' : '' }} />}
                                    icon={<BpIcon className="bp-icon" />} />
                                </BpCheckboxContainer>}
                              label={
                                <Typography component='label'
                                  className="pin-Note"
                                >
                                  Pin note to top
                                </Typography>
                              }
                            />
                          </Stack>
                        </Stack>
                        <Stack >
                          <Stack sx={{
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            }
                          }}>
                            <Box sx={{ height: '32px', backgroundColor: '#F7F7F7', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: '1%', }}>
                              <Typography
                                className="Activities-Style-2"
                              >
                                Activities
                              </Typography>
                              <Button
                                disableRipple
                                endIcon={<ArrowDropDownIcon />}
                                className="typeText"
                              >
                                Showing 1 Activity Type
                              </Button>

                            </Box>

                            <Box className="boxText">
                              <Box className="mainDiv">
                                <Box >
                                  <Typography component='p' className="boxText-text">
                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                  </Typography>
                                </Box>
                                <Box component='div' sx={{ borderRight: '1px solid #919191', display: 'flex', alignItems: 'center' }}></Box>
                                <Box>
                                  <Typography component='p'
                                    className="boxText-text1">
                                    Step 4 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography component='p'
                                className="boxText-text2"
                              >
                                Achieve 50% Less Attrition. At Ninja-Like Speed.
                              </Typography>

                              <Box>
                                <Typography component='p'
                                  className="boxText-text3"
                                >
                                  Hi Jose, Get the Right Agents, With the Right Skills,
                                  Right Away, It's been about two weeks since we....
                                </Typography>
                                <Box className="boxText-box2">
                                  <Typography component='p' className="boxText-text4">
                                    Not Sent - Sendgrid Drop
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            <Box className="dateBox">
                              <Box>
                                <Typography component='p' className="dateText">
                                  Mar 30
                                </Typography>
                              </Box>

                              <MoreHorizIcon sx={{
                                color: '#474747',
                                fontSize: '20px',
                              }} />

                            </Box>
                          </Stack>
                          <Stack>

                            <Stack sx={{
                              '&:hover': {
                                backgroundColor: '#F7F7F7',
                              }
                            }}>
                              <Box className="boxText">
                                <Box className="mainDiv">
                                  <Box>
                                    <Typography component='p' className="boxText-text">
                                      Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                    </Typography>
                                  </Box>
                                  <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                  <Box>
                                    <Typography component='p' className="boxText-text1">
                                      Step 3 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                    </Typography>
                                  </Box>
                                </Box>
                                <Typography component='p' className="boxText-text2"
                                  sx={{

                                    pr: '5%'
                                  }}
                                >
                                  90 Days to Fill Your Contact Center Class? Try 14.
                                </Typography>

                                <Box>
                                  <Typography component='p'
                                    className="boxText-text3"
                                  >
                                    Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                    Change Your hiring timelines forever with the...
                                  </Typography>
                                  <Stack
                                    direction='row' alignItems='center' mt={1} mb={1}
                                  >
                                    <Box className="mailBox-bg1">
                                      <MailOutlineOutlinedIcon className="mail-Icon" />
                                    </Box>
                                    <Box className="mail-Border1"></Box>
                                    <Box className="mailBox-bg1">
                                      <MailOutlineOutlinedIcon className="mail-Icon" />
                                    </Box>
                                    <Box className="mail-Border1"></Box>
                                    <Box className="mailBox-bg2">
                                      <MailOutlineOutlinedIcon className="mail-Icon" />
                                    </Box>
                                    <Box className="mail-Border2"></Box>
                                    <Box className="mailBox-bg2">
                                      <MailOutlineOutlinedIcon className="mail-Icon" />
                                    </Box>
                                  </Stack>
                                </Box>
                              </Box>

                              <Box className="dateBox"
                                sx={{
                                  borderBottom: '1px solid #E6E6E6'
                                }}>
                                <Box>
                                  <Typography component='p' className="dateText">
                                    Mar 30
                                  </Typography>
                                </Box>

                                <MoreHorizIcon sx={{
                                  color: '#474747',
                                  fontSize: '20px',
                                }} />

                              </Box>
                            </Stack>
                          </Stack>
                          <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Button
                              disableRipple
                              className="bottom-Window"
                            >
                              Show in Window View
                            </Button>
                          </Box>
                        </Stack>

                      </Stack>
                    }

                    {isRadioCall &&
                      <Stack sx={{ width: '100%' }}>
                        <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                          <Box className="radio-Box">
                            {/* <Box
                      sx={{ pl: 2, mb: 1, width: '85%' }}
                    > */}
                            <Autocomplete
                              disablePortal
                              id="selectdispose"
                              options={labels}
                              className="autocomplete"
                              getOptionLabel={(option) => option.label}

                              renderOption={(props, option) => (
                                (<li {...props}
                                  style={{
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'Segoe UI',
                                  }}
                                  onMouseEnter={(e: any) => {
                                    e.target.style.backgroundColor = 'var(--c-primary-color)';
                                    e.target.style.color = '#ffffff';
                                  }}
                                  onMouseLeave={(e: any) => {
                                    e.target.style.backgroundColor = 'unset';
                                    e.target.style.color = 'unset';
                                  }}
                                >{option.label}</li>) // Customize the font color here
                              )}
                              renderInput={(params) => <TextField {...params} placeholder="Contact Name"
                                className="render-Tf" />}
                            />
                            {/* </Box> */}
                            {/* <Box
                      sx={{ pl: 2, mb: 1 }}
                    > */}
                            <Autocomplete
                              disablePortal
                              id="selectpurpose"
                              options={labels}
                              className="autocomplete"
                              getOptionLabel={(option) => option.label}

                              renderOption={(props, option) => (
                                (<li {...props}
                                  style={{
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'Segoe UI',
                                  }}
                                  onMouseEnter={(e: any) => {
                                    e.target.style.backgroundColor = 'var(--c-primary-color)';
                                    e.target.style.color = '#ffffff';
                                  }}
                                  onMouseLeave={(e: any) => {
                                    e.target.style.backgroundColor = 'unset';
                                    e.target.style.color = 'unset';
                                  }}
                                >{option.label}</li>) // Customize the font color here
                              )}
                              renderInput={(params) => <TextField {...params} placeholder="Call Outcome"
                                className="render-Tf" />}
                            />
                            <Stack
                              sx={{ mb: 1, width: '85%' }}
                              direction='row'
                              spacing={1}
                            >
                              <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker label="Select Date" />
                              </LocalizationProvider>

                              <Autocomplete
                                disablePortal
                                disableClearable
                                id="selecttasktime"
                                options={timeLabels}
                                sx={{
                                  width: '50%',

                                  "& .MuiAutocomplete-popupIndicator": {
                                    transform: "unset",
                                    color: "#737373",
                                    '& .MuiTouchRipple-root': {
                                      display: 'none',
                                    },
                                    '&:hover': {
                                      backgroundColor: '#ffffff'
                                    }
                                  },
                                  '& .MuiOutlinedInput-root': {
                                    pl: 0,
                                    pb: 0,
                                    pt: 0,
                                    pr: 0
                                  },
                                  '& .MuiAutocomplete-clearIndicator': {
                                    color: '#919191',
                                    height: '8px',
                                    width: '8px',
                                    mr: 1,
                                    '&:hover': {
                                      backgroundColor: '#ffffff'
                                    }
                                  }
                                }}
                                getOptionLabel={(option) => option.label}

                                renderOption={(props, option) => (
                                  (<li {...props}
                                    style={{
                                      color: '#1A1A1A',
                                      fontSize: '14px',
                                      fontWeight: 600,
                                      fontFamily: 'Segoe UI',
                                    }}
                                    onMouseEnter={(e: any) => {
                                      e.target.style.backgroundColor = 'var(--c-primary-color)';
                                      e.target.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e: any) => {
                                      e.target.style.backgroundColor = 'unset';
                                      e.target.style.color = 'unset';
                                    }}
                                  >{option.label}</li>) // Customize the font color here
                                )}
                                renderInput={(params) => <TextField {...params} placeholder="Select Time"
                                  className="render-Tf" />}
                              />
                            </Stack>

                            {/* <Box
                    sx={{ pl: 2, mb: 1 }}
                  > */}
                            {/* </Box> */}
                            <TextField
                              className="typeNote"
                              multiline
                              rows={3}
                              placeholder="Type a note..."
                              value={tastText}
                              onChange={handleTaskChange}
                            />
                            <Autocomplete
                              disablePortal
                              id="selectpurpose"
                              options={labels}
                              className="autocomplete"
                              sx={{ mt: "10%" }}
                              getOptionLabel={(option) => option.label}

                              renderOption={(props, option) => (
                                (<li {...props}
                                  style={{
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'Segoe UI',
                                  }}
                                  onMouseEnter={(e: any) => {
                                    e.target.style.backgroundColor = 'var(--c-primary-color)';
                                    e.target.style.color = '#ffffff';
                                  }}
                                  onMouseLeave={(e: any) => {
                                    e.target.style.backgroundColor = 'unset';
                                    e.target.style.color = 'unset';
                                  }}
                                >{option.label}</li>) // Customize the font color here
                              )}
                              renderInput={(params) => <TextField {...params} placeholder="Send Email To"
                                className="render-Tf" />}
                            />
                          </Box>

                          <Stack className="Logcall-stack" spacing={2} >
                            <Button
                              disableRipple
                              className="Logcall-style"
                              sx={{
                                mt: '5%',
                                backgroundColor: callText ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                '&:hover': {
                                  backgroundColor: callText ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                }
                              }}
                            >
                              Log Call
                            </Button>

                          </Stack>
                        </Stack>

                        <Stack >
                          <Box className="Activities-Style-Box">
                            <Typography
                              className="Activities-Style-2"
                            >
                              Activities
                            </Typography>
                            <Button
                              disableRipple
                              endIcon={<ArrowDropDownIcon />}
                              className="typeText"
                              sx={{
                                pr: 1,
                              }}
                            >
                              Showing 1 Activity Type
                            </Button>

                          </Box>

                          <Stack sx={{
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            }
                          }}>
                            <Box className="after-Act-Box">
                              <Box className="mainDiv">
                                <Box>
                                  <Typography component='p' className="boxText-text">
                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                  </Typography>
                                </Box>
                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                <Box>
                                  <Typography component='p' className="boxText-text1">
                                    Step 4 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography component='p'
                                className="boxText-text2"
                              >
                                Achieve 50% Less Attrition. At Ninja-Like Speed.
                              </Typography>

                              <Box>
                                <Typography component='p'
                                  className="boxText-text3"
                                >
                                  Hi Jose, Get the Right Agents, With the Right Skills,
                                  Right Away, It's been about two weeks since we....
                                </Typography>
                                <Box className="boxText-box2">
                                  <Typography component='p' className="boxText-text4">
                                    Not Sent - Sendgrid Drop
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box className="dateBox">
                              <Box>
                                <Typography component='p' className="dateText">
                                  Mar 30
                                </Typography>
                              </Box>

                              <MoreHorizIcon sx={{
                                color: '#474747',
                                fontSize: '20px',
                              }} />

                            </Box>
                          </Stack>

                          <Stack sx={{
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            }
                          }}>
                            <Box sx={{ p: '8%', pt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                              <Box className="mainDiv">
                                <Box>
                                  <Typography component='p' className="boxText-text">
                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                  </Typography>
                                </Box>
                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                <Box>
                                  <Typography component='p' className="boxText-text1">
                                    Step 3 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography component='p'
                                className="boxText-text2"
                              >
                                90 Days to Fill Your Contact Center Class? Try 14.
                              </Typography>

                              <Box>
                                <Typography component='p'
                                  className="boxText-text3"
                                >
                                  Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                  Change Your hiring timelines forever with the...
                                </Typography>
                                <Stack
                                  direction='row' alignItems='center' mt={1} mb={1}
                                >
                                  <Box className="mailBox-bg1">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                  <Box className="mail-Border1"></Box>
                                  <Box className="mailBox-bg1">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                  <Box className="mail-Border1"></Box>
                                  <Box className="mailBox-bg2">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                  <Box className="mail-Border2"></Box>
                                  <Box className="mailBox-bg2">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                </Stack>
                              </Box>
                            </Box>
                            <Box className="dateBox"
                              sx={{
                                borderBottom: '1px solid #E6E6E6'
                              }}>
                              <Box>
                                <Typography component='p' className="dateText">
                                  Mar 30
                                </Typography>
                              </Box>

                              <MoreHorizIcon sx={{
                                color: '#474747',
                                fontSize: '20px',
                              }} />

                            </Box>
                          </Stack>
                          <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Button
                              disableRipple
                              className="bottom-Window"
                            >
                              Show in Window View
                            </Button>
                          </Box>
                        </Stack>

                      </Stack>
                    }

                    {isRadioAction &&
                      <Stack sx={{ width: '100%' }}>
                        <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                          <Box className="radio-Box">
                            <TextField
                              className="typeNote"
                              multiline
                              rows={3}
                              placeholder="Type a note..."
                              value={actionText}
                              onChange={handleActionChange}
                            />
                          </Box>

                          <Stack spacing={2} className="Logcall-stack">
                            <Button
                              disableRipple
                              className="LogAction-style"
                              sx={{
                                backgroundColor: actionText ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                '&:hover': {
                                  backgroundColor: actionText ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                }
                              }}
                            >
                              Log Req Call
                            </Button>

                          </Stack>
                        </Stack>

                        <Stack >
                          <Box className="Activities-Style-Box">
                            <Typography
                              className="Activities-Style-2"
                            >
                              Activities
                            </Typography>
                            <Button
                              disableRipple
                              endIcon={<ArrowDropDownIcon />}
                              className="typeText"
                            >
                              Showing 1 Activity Type
                            </Button>

                          </Box>

                          <Stack sx={{
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            }
                          }}>
                            <Box className="after-Act-Box">
                              <Box className="mainDiv">
                                <Box>
                                  <Typography component='p' className="boxText-text">
                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                  </Typography>
                                </Box>
                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                <Box>
                                  <Typography component='p' className="boxText-text1">
                                    Step 4 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography component='p'
                                className="boxText-text2"
                              >
                                Achieve 50% Less Attrition. At Ninja-Like Speed.
                              </Typography>

                              <Box>
                                <Typography component='p'
                                  className="boxText-text3"
                                >
                                  Hi Jose, Get the Right Agents, With the Right Skills,
                                  Right Away, It's been about two weeks since we....
                                </Typography>
                                <Box className="boxText-box2">
                                  <Typography component='p' className="boxText-text4">
                                    Not Sent - Sendgrid Drop
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box className="dateBox">
                              <Box>
                                <Typography component='p' className="dateText">
                                  Mar 30
                                </Typography>
                              </Box>

                              <MoreHorizIcon sx={{
                                color: '#474747',
                                fontSize: '20px',
                              }} />

                            </Box>
                          </Stack>

                          <Stack sx={{
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            }
                          }}>
                            <Box className="after-Act-Box">
                              <Box className="mainDiv">
                                <Box>
                                  <Typography component='p' className="boxText-text">
                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                  </Typography>
                                </Box>
                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                <Box>
                                  <Typography component='p' className="boxText-text1">
                                    Step 3 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography component='p'
                                className="boxText-text2"
                              >
                                90 Days to Fill Your Contact Center Class? Try 14.
                              </Typography>

                              <Box>
                                <Typography component='p'
                                  className="boxText-text3"
                                >
                                  Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                  Change Your hiring timelines forever with the...
                                </Typography>
                                <Stack
                                  direction='row' alignItems='center' mt={1} mb={1}
                                >
                                  <Box className="mailBox-bg1">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                  <Box className="mail-Border1"></Box>
                                  <Box className="mailBox-bg1">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                  <Box className="mail-Border1"></Box>
                                  <Box className="mailBox-bg2">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                  <Box className="mail-Border2"></Box>
                                  <Box className="mailBox-bg2">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                </Stack>
                              </Box>
                            </Box>
                            <Box className="dateBox"
                              sx={{
                                borderBottom: '1px solid #E6E6E6'
                              }}>
                              <Box>
                                <Typography component='p' className="dateText">
                                  Mar 30
                                </Typography>
                              </Box>

                              <MoreHorizIcon sx={{
                                color: '#474747',
                                fontSize: '20px',
                              }} />

                            </Box>
                          </Stack>
                          <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Button
                              disableRipple
                              className="bottom-Window"
                            >
                              Show in Window View
                            </Button>
                          </Box>
                        </Stack>

                      </Stack>
                    }

                    {isRadioTask &&
                      <Stack sx={{ width: '100%' }}>
                        <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                          <Box className="radio-Box">
                            {/* <Box
                    sx={{ pl: 2, mb: 1 }}
                  > */}

                            <Autocomplete
                              disablePortal
                              id="selecttaskdispose"
                              options={labels}
                              className="autocomplete"
                              getOptionLabel={(option) => option.label}

                              renderOption={(props, option) => (
                                (<li {...props}
                                  style={{
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'Segoe UI',
                                  }}
                                  onMouseEnter={(e: any) => {
                                    e.target.style.backgroundColor = 'var(--c-primary-color)';
                                    e.target.style.color = '#ffffff';
                                  }}
                                  onMouseLeave={(e: any) => {
                                    e.target.style.backgroundColor = 'unset';
                                    e.target.style.color = 'unset';
                                  }}
                                >{option.label}</li>) // Customize the font color here
                              )}
                              renderInput={(params) => <TextField {...params} placeholder="Contact Name:"
                                className="render-Tf" />}
                            />
                            <Stack
                              sx={{ mb: 1, width: '85%' }}
                              direction='row'
                              spacing={1}
                            >
                              <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DatePicker label="Select Date" />
                              </LocalizationProvider>

                              <Autocomplete
                                disablePortal
                                disableClearable
                                id="selecttasktime"
                                options={timeLabels}
                                sx={{
                                  width: '50%',

                                  "& .MuiAutocomplete-popupIndicator": {
                                    transform: "unset",
                                    color: "#737373",
                                    '& .MuiTouchRipple-root': {
                                      display: 'none',
                                    },
                                    '&:hover': {
                                      backgroundColor: '#ffffff'
                                    }
                                  },
                                  '& .MuiOutlinedInput-root': {
                                    pl: 0,
                                    pb: 0,
                                    pt: 0,
                                    pr: 0
                                  },
                                  '& .MuiAutocomplete-clearIndicator': {
                                    color: '#919191',
                                    height: '8px',
                                    width: '8px',
                                    mr: 1,
                                    '&:hover': {
                                      backgroundColor: '#ffffff'
                                    }
                                  }
                                }}
                                getOptionLabel={(option) => option.label}

                                renderOption={(props, option) => (
                                  (<li {...props}
                                    style={{
                                      color: '#1A1A1A',
                                      fontSize: '14px',
                                      fontWeight: 600,
                                      fontFamily: 'Segoe UI',
                                    }}
                                    onMouseEnter={(e: any) => {
                                      e.target.style.backgroundColor = 'var(--c-primary-color)';
                                      e.target.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={(e: any) => {
                                      e.target.style.backgroundColor = 'unset';
                                      e.target.style.color = 'unset';
                                    }}
                                  >{option.label}</li>) // Customize the font color here
                                )}
                                renderInput={(params) => <TextField {...params} placeholder="Select Time"
                                  className="render-Tf" />}
                              />
                            </Stack>

                            {/* <Box
                    sx={{ pl: 2, mb: 1 }}
                  > */}
                            {/* </Box> */}
                            <TextField
                              className="typeNote"
                              multiline
                              rows={3}
                              placeholder="Type a note..."
                              value={tastText}
                              onChange={handleTaskChange}
                            />
                            <Autocomplete
                              disablePortal
                              id="selectpurpose"
                              options={labels}
                              className="autocomplete"
                              sx={{ mt: "10%" }}
                              getOptionLabel={(option) => option.label}

                              renderOption={(props, option) => (
                                (<li {...props}
                                  style={{
                                    color: '#1A1A1A',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    fontFamily: 'Segoe UI',
                                  }}
                                  onMouseEnter={(e: any) => {
                                    e.target.style.backgroundColor = 'var(--c-primary-color)';
                                    e.target.style.color = '#ffffff';
                                  }}
                                  onMouseLeave={(e: any) => {
                                    e.target.style.backgroundColor = 'unset';
                                    e.target.style.color = 'unset';
                                  }}
                                >{option.label}</li>) // Customize the font color here
                              )}
                              renderInput={(params) => <TextField {...params} placeholder="Send Email To"
                                className="render-Tf" />}
                            />
                          </Box>

                          <Stack spacing={2} className="Logcall-stack">
                            <Button
                              disableRipple
                              className="Logcall-style"
                              sx={{
                                mt: '2%',
                                backgroundColor: tastText ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                '&:hover': {
                                  backgroundColor: tastText ? 'var(--c-primary-color)' : 'var(--c-secondary-color)',
                                }
                              }}
                            >
                              Log meeting
                            </Button>

                          </Stack>
                        </Stack>

                        <Stack >
                          <Box className="Activities-Style-Box">
                            <Typography
                              className="Activities-Style-2"
                            >
                              Activities
                            </Typography>
                            <Button
                              disableRipple
                              endIcon={<ArrowDropDownIcon />}
                              className="typeText"
                            >
                              Showing 1 Activity Type
                            </Button>

                          </Box>

                          <Stack sx={{
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            }
                          }}>
                            <Box className="after-Act-Box">
                              <Box className="mainDiv">
                                <Box>
                                  <Typography component='p' className="boxText-text">
                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                  </Typography>
                                </Box>
                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                <Box>
                                  <Typography component='p' className="boxText-text1">
                                    Step 4 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography component='p'
                                className="boxText-text2"
                              >
                                Achieve 50% Less Attrition. At Ninja-Like Speed.
                              </Typography>

                              <Box>
                                <Typography component='p'
                                  className="boxText-text3"
                                >
                                  Hi Jose, Get the Right Agents, With the Right Skills,
                                  Right Away, It's been about two weeks since we....
                                </Typography>
                                <Box className="boxText-box2">
                                  <Typography component='p' className="boxText-text4">
                                    Not Sent - Sendgrid Drop
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                            <Box className="dateBox">
                              <Box>
                                <Typography component='p' className="dateText">
                                  Mar 30
                                </Typography>
                              </Box>

                              <MoreHorizIcon sx={{
                                color: '#474747',
                                fontSize: '20px',
                              }} />

                            </Box>
                          </Stack>

                          <Stack sx={{
                            '&:hover': {
                              backgroundColor: '#F7F7F7'
                            }
                          }}>
                            <Box className="after-Act-Box">
                              <Box className="mainDiv">
                                <Box>
                                  <Typography component='p' className="boxText-text">
                                    Justin Kidd to <Box component='span' sx={{ color: 'var(--c-primary-color)', }}> Jose Ortiz </Box>
                                  </Typography>
                                </Box>
                                <Box component='div' sx={{ borderRight: '1px solid #919191' }}></Box>
                                <Box>
                                  <Typography component='p' className="boxText-text1">
                                    Step 3 of <Box component='span' sx={{ color: 'var(--c-primary-color)', }}>Justin CRNinja Drip</Box>
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography component='p'
                                className="boxText-tex2"
                              >
                                90 Days to Fill Your Contact Center Class? Try 14.
                              </Typography>

                              <Box>
                                <Typography component='p'
                                  className="boxText-text3"
                                >
                                  Hi Jose, Too Good to be True? Nope,Ninjas are Real.
                                  Change Your hiring timelines forever with the...
                                </Typography>
                                <Stack
                                  direction='row' alignItems='center' mt={1} mb={1}
                                >
                                  <Box className="mailBox-bg1">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                  <Box className="mail-Border1"></Box>
                                  <Box className="mailBox-bg1">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                  <Box className="mail-Border1"></Box>
                                  <Box className="mailBox-bg2">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                  <Box className="mail-Border2"></Box>
                                  <Box className="mailBox-bg2">
                                    <MailOutlineOutlinedIcon className="mail-Icon" />
                                  </Box>
                                </Stack>
                              </Box>
                            </Box>
                            <Box className="dateBox"
                              sx={{
                                borderBottom: '1px solid #E6E6E6'
                              }}>
                              <Box>
                                <Typography component='p' className="dateText">
                                  Mar 30
                                </Typography>
                              </Box>

                              <MoreHorizIcon sx={{
                                color: '#474747',
                                fontSize: '20px',
                              }} />

                            </Box>
                          </Stack>
                          <Box sx={{ textAlign: 'center', p: 1 }}>
                            <Button
                              disableRipple
                              className="bottom-Window"
                            >
                              Show in Window View
                            </Button>
                          </Box>
                        </Stack>

                      </Stack>
                    }
                  </Stack>
                }

                {isAccount &&
                  <Stack sx={{ display: isHideActivities ? 'block' : 'none' }}>
                    Account
                  </Stack>
                }

              </Card>
            </Stack >

          </Stack >
        )}
    </div>)
  );
}
export default ContactActivities;
