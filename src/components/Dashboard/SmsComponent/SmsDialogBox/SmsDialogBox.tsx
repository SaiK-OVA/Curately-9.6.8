import './SmsDialogBox.scss';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import { Grid, Button, IconButton, FormControl, TextField } from '../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';

import { Fragment, useState } from '../../../../shared/modules/React';
//import { userLocalData } from '../../../shared/services/userData';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
// import { Button, Card, CardActions, CardContent, CardHeader, Checkbox, DialogActions, Divider, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import { Checkbox, Radio, RadioGroup } from '../../../../shared/modules/MaterialImports/FormElements';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { TimePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { LocalizationProvider, DatePicker, AdapterLuxon } from '../../../../shared/modules/MaterialImports/DatePicker';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import EditIcon from '@mui/icons-material/Edit';
import JsonData from './DummyData.json';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import Message from './Message';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { DateTime } from '../../../../shared/modules/Luxon';



export interface DialogProps {
    dialogOpen: boolean;
    onClose: () => void;
    name: string;
    toPhone: string;
    contactId?: string;
    candidateId: string;
    jobId?: string;
    workflowJobCandidateId?: string;
}



type SmsData = {
    smsid: string;
    type: 'IN' | 'OUT';
    body: string;
    candid: number;
    isread: number;
    savedt: string;
}

const SmsDialogBox = ({ dialogOpen, onClose, name, toPhone, candidateId = "", contactId = "", workflowJobCandidateId = "", jobId = "" }: DialogProps) => {
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);
    const [nestedOpen, setNestedOpen] = useState(false);

    // const OpenCard = () => {
    //     setOpen(true);
    //     setNestedOpen(true);
    // };

    const closeCard = () => {
        setOpen(false);
        setNestedOpen(false);
    };

    const [textArea1, setTextarea1] = useState("");
    const [textArea2, setTextarea2] = useState("");


    const maxCharacterCount = 140; // Set your desired maximum character count

    const ta1HandleChange = (event: { target: { value: any; }; }) => {
        const inputText = event.target.value;
        if (inputText.length <= maxCharacterCount) {
            setTextarea1(inputText);
        }
    };
    const ta2HandleChange = (event: { target: { value: any; }; }) => {
        const inputTextArea = event.target.value;
        if (inputTextArea.length <= maxCharacterCount) {
            setTextarea2(inputTextArea);
        }
    };

    type MessageGroup = {
        [date: string]: typeof JsonData;
    };

    const groupedMessagesByDate = JsonData.reduce<MessageGroup>((acc, message) => {
        const date = DateTime.fromSQL(message.savedt).toFormat('EEEE MMMM d');
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(message);
        return acc;
    }, {});






    return (
        <div>
            <Dialog
                maxWidth={'lg'}
                // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
                fullWidth={true} open={dialogOpen} className='AddJobModal'
                id='PhoneDialog'
            >
                <DialogTitle className="header">
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span className='addHeader'>
                            Send SMS
                        </span>
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            className="closeBtn"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </DialogTitle>
                <DialogContent sx={{ px: 0 }}>
                    <Grid container className="customCard p-0 ">
                        <Grid className="division item1" >
                            <Typography className='p-3'>
                                Contact Number
                            </Typography>
                            <Divider />
                            <Box sx={{ height: "40vh", overflow: "auto" }}>
                                <Typography p={4} ml={15}>
                                    <IconButton>
                                        <MessageRoundedIcon />
                                    </IconButton>
                                    This is the beginning of your conversation
                                </Typography>
                                <div>
                                    {/* {JsonData.map((item) => (
                                        <div key={item.smsid}>
                                            <p>{item.body}</p>
                                            <p>{item.type}</p>
                                        </div>
                                    ))} */}
                                    {Object.entries(groupedMessagesByDate).map(([date, messages]) => (
                                        <div key={date}>
                                            <div className="time">{date}</div>
                                            {messages.map((sms) => (
                                                (sms.type === 'IN' || sms.type === 'OUT') &&
                                                <Message key={sms.smsid} type={sms.type} body={sms.body} time={sms.savedt} />
                                            ))}
                                        </div>
                                    ))}


                                </div>

                            </Box>
                            <Box className="division pt-2 pb-5 ">
                                <TextareaAutosize
                                    value={textArea1}
                                    onChange={ta1HandleChange}
                                    placeholder='Type your message here!'
                                    aria-label="minimum height"
                                    minRows={5}
                                    // placeholder="Minimum 3 rows"
                                    // maxlength="420"
                                    style={{ width: '90%', marginLeft: "15px" }}
                                />

                                <Button className="float-right" size='small' variant='contained'>Send</Button>
                                <Stack
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    <Tooltip title="Templates">

                                        <IconButton onClick={() => setOpen(true)}>

                                            <TurnedInNotIcon />

                                        </IconButton>

                                    </Tooltip>
                                    <div className="float-right" style={{ marginLeft: "250px" }}>
                                        {/*<span id="count">0</span>
                                <span> of 420 characters</span>*/}
                                        {0 + textArea1.length} of
                                        {maxCharacterCount} characters
                                    </div>
                                </Stack>
                            </Box>
                            <Stack direction="row" spacing={2} mt={4} className="d-none">
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Delay sending message"
                                    labelPlacement="end"
                                    id="DelaySendingMessage"
                                    name="DelaySendingMessage"
                                    className="mt-2 ml-2"
                                    onChange={() => setChecked(!checked)} checked={checked}

                                />
                                {
                                    checked ? (
                                        <div>
                                            <Stack direction="row" spacing={2} mt={2}>

                                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                    <DatePicker
                                                        label={
                                                            <Fragment>
                                                                Date
                                                                <span style={{ color: 'red' }}>*</span>
                                                            </Fragment>
                                                        }
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        onChange={(date: any) => console.log(date)}
                                                    />
                                                </LocalizationProvider>
                                                <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                    <TimePicker
                                                        label={
                                                            <Fragment>
                                                                Time
                                                                <span style={{ color: 'red' }}>*</span>
                                                            </Fragment>
                                                        }
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        viewRenderers={{
                                                            hours: renderTimeViewClock,
                                                            minutes: renderTimeViewClock,
                                                            seconds: renderTimeViewClock,
                                                        }}
                                                        onChange={(time: any) => console.log(time)}
                                                    />
                                                </LocalizationProvider>
                                            </Stack>
                                        </div>
                                    ) : (<div></div>)
                                }
                            </Stack>
                        </Grid>
                        <Grid className="division item2">

                            <Box id="mockChat" className="mockchat">

                                <div className="device">

                                    <div className="screen">

                                        <div id='numberInScreen'>

                                        </div>

                                        <div className="app">

                                            {/* <p style={{ display: "none" }}></p> */}

                                            <div className="reply" >{textArea1}</div>

                                        </div>

                                    </div>

                                </div>

                            </Box>

                        </Grid>
                        {/* <Grid className="division item2">
                            <Box id="mockChat" className="mockchat">
                                <div className="device">
                                    <div className="screen">
                                        <div id='numberInScreen'>
                                        </div>
                                        <div className="app">
                                            <div className="reply" style={{ display: "none" }}></div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </Grid> */}
                    </Grid>
                </DialogContent>
                <div>
                    <Dialog open={open} sx={{ width: "520px", height: "500px", overflow: "auto" }}>
                        <DialogTitle className="header">
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <span className='addHeader'>
                                    Templates
                                </span>
                                <IconButton
                                    aria-label="close"
                                    className="closeBtn"
                                    onClick={() => setNestedOpen(true)}
                                >

                                    <EditIcon />
                                </IconButton>
                            </Grid>
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <TextField
                                        id="title"
                                        name="title"
                                        type="text"
                                        size="small"
                                        placeholder='Search'
                                    />
                                </Grid>
                                <Grid size="grow">
                                    <Button variant='outlined'>Mine</Button>
                                </Grid>
                                <Grid size="grow">
                                    <Button variant='outlined'>All</Button>
                                </Grid>
                            </Grid>
                            <Box sx={{ height: "40vh" }}>

                            </Box>
                        </DialogContent >
                    </Dialog>
                </div>
                <div>
                    <Dialog open={nestedOpen} sx={{ width: "520px", height: "500px", overflow: "auto" }}>
                        <DialogTitle className="header">
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <span className='addHeader'>
                                    Add Template
                                </span>
                                <IconButton
                                    aria-label="close"
                                    onClick={closeCard}
                                    className="closeBtn"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Grid>
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2}
                            >
                                <TextField className='inputLabel mt-1'
                                    id="merge"
                                    name="merge"
                                    size="small"
                                    select
                                    defaultValue={0}

                                >
                                    <MenuItem value="0">Merge Fileds</MenuItem>
                                    <MenuItem value="First name">First name</MenuItem>
                                    <MenuItem value="Last name">Last name</MenuItem>
                                    <MenuItem value="First name and Last name">First name and Last name</MenuItem>
                                    <MenuItem value="Email">Email</MenuItem>
                                </TextField>
                            </Stack>
                            <TextField fullWidth className='mt-1'
                                id="lastName"
                                name="lastName"
                                variant="outlined"
                                type="text"
                                size="small"
                                label="Name"
                            />
                            <TextareaAutosize
                                value={textArea2}
                                onChange={ta2HandleChange}
                                placeholder='Type your Template here!'
                                aria-label="minimum height"
                                minRows={5}
                                // placeholder="Minimum 3 rows"
                                // maxlength="420"
                                style={{ width: '100%', marginTop: "15px" }}
                            />
                            <div className="float-right" style={{ marginRight: "5px" }}>
                                {/*<span id="count">0</span>
                                <span> of 420 characters</span>*/}
                                {0 + textArea2.length} of
                                {maxCharacterCount} characters
                            </div>
                            <FormControl sx={{ marginTop: "15px" }}>
                                <RadioGroup
                                    row
                                    name="ISassignedTo"
                                >
                                    <FormControlLabel value="Mine" control={<Radio />} label="Mine" />
                                    <FormControlLabel value="Sharetoall" control={<Radio />} label="Share To All" />
                                </RadioGroup>
                            </FormControl>
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button variant='outlined'>Add</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Dialog>

        </div>
    )
}

export default SmsDialogBox;