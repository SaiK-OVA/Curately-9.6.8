import  { React, useState } from "../../../../../shared/modules/React";
import  { Box }  from "../../../../../shared/modules/MaterialImports/Box";
import { Button } from "../../../../../shared/modules/MaterialImports/Button";
import { Stack } from "../../../../../shared/modules/MaterialImports/Stack";
import { Card } from "../../../../../shared/modules/MaterialImports/Card";
import { Typography } from "../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
// import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { styled } from '@mui/material/styles';
// import Radio from '@mui/material/Radio';
import { RadioGroup, Checkbox } from '../../../../../shared/modules/MaterialImports/FormElements';
import {FormControlLabel, FormControl, TextField} from '../../../../../shared/modules/MaterialImports/FormInputs';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import Autocomplete from '@mui/material/Autocomplete';
import {CircularProgress} from '../../../../../shared/modules/MaterialImports/CircularProgress';

import '../../../../shared/Activities/Activities.scss'


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

const CompanyActivites = () => {

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


  const handleChangePinNoteChecked = (event: any) => {
    setPinNoteChecked(event.target.checked);
  };
  return (
    <div className="Activities">
      {
        contactLoading ? (
          <Box className="initialBox" >
            <CircularProgress sx={{ color: 'var(--c-primary-color)' }} />
          </Box >
        ) : (
          <Stack className="mainStack">

            <Stack sx={{ width: '100%' }}>
              <Card sx={{ boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                <Box className="mainHeadBox">
                  <Typography className="Activities-Style" >
                    Notes</Typography>
                  <Button
                    disableRipple
                   className="hide-Activities-Style"
                    onClick={handleHideActivities}
                  >
                    Hide Notes
                  </Button>
                </Box>

                

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
                                mt:'10',
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

    </div>

  );
}
export default CompanyActivites;
