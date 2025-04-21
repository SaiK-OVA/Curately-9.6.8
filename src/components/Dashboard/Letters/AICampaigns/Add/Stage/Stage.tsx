import { useState } from '../../../../../../shared/modules/React';
import { Menu, MenuItem } from '../../../../../../shared/modules/MaterialImports/Menu';

// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';

import { Grid, showToaster, TextField, InputAdornment, Button, IconButton, } from '../../../../../../shared/modules/commonImports';
// import { DateTime } from 'luxon';

import EmailAutoComplete from '../../../../../../shared/components/EmailAutoComplete/EmailAutoComplete';
import GridViewIcon from "@mui/icons-material/GridView";
import { MUIAutoComplete } from '../../../../../shared/MUIAutoComplete/MUIAutoComplete';
import Editor from '../../../../../shared/EmailDialogBox/EmailBody';
import CodeIcon from '@mui/icons-material/Code';
import NotesIcon from '@mui/icons-material/Notes';
import { StageInterface } from '../AddAICampaigns';

import '../AddAICampaigns.scss';
import './Stage.scss';
import { Dialog, DialogContent, DialogTitle } from '../../../../../../shared/modules/MaterialImports/Dialog';
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';
import { ListItemText } from '../../../../../../shared/modules/MaterialImports/List';
import { Stack } from '../../../../../../shared/modules/MaterialImports/Stack';
import { ToggleButton, ToggleButtonGroup } from '../../../../../../shared/modules/MaterialImports/ToggleButton';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';

import { AccessTimeOutlined, AddOutlined, AutoAwesome, Close, CloseOutlined, KeyboardArrowUp, RemoveOutlined, VisibilityOutlined } from '@mui/icons-material';
import { userLocalData } from '../../../../../../shared/services/userData';

const Stage = (
    { stage, i, sequenceFormik, calculateTotalBusinessDays, setFromEmailValue, getTemplate, clearSubjectAndBody, setFormFieldValue, handleRegenerateCB }
        :
        {
            stage: StageInterface;
            i: number;
            sequenceFormik: any;
            calculateTotalBusinessDays: (add: string, val: string, index: number) => void;
            setFromEmailValue: (i: number, val: any, type: any, addOrRemove: string) => void;
            getTemplate: any;
            clearSubjectAndBody: (i: number) => void;
            setFormFieldValue: (i: number, mailBody: string, subject: string, templateId: string) => void;
            handleRegenerateCB: (mailBody: string, subject: string) => any;
        }
) => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [manageTimingAnchorEl, setManageTimingAnchorEl] = useState<null | HTMLElement>(null);
    const openManageTimingAnchorEl = Boolean(manageTimingAnchorEl);
    const [openPreview, setOpenPreview] = useState(false);

    const handleBusinessDays = (type: "decrement" | "increment") => {
        let count = Number(stage.businessDays) || 0;
        let value = count;
        if (type === "increment") value = count + 1;

        if (type === "decrement") {
            if (count > 0) value = count - 1;
        }
        calculateTotalBusinessDays("change", value.toString(), i);
    }

    const handleDayBtnClick = (days: any) => {
        let stages = [...sequenceFormik.values.stages];
        stages = stages.map((item: any, index: number) => ({
            ...item,
            weekDays: (index === i) ? days : item.weekDays
        }))
        sequenceFormik.setFieldValue("stages", [...stages])
    }

    const handlePreviewClick = () => {
        if (["", "<p></p>", null, undefined].includes(stage.mailBody)) {
            showToaster('Please Enter Body.', 'error');
        } else if (stage.subject === "") {
            showToaster('Please Enter Subject.', 'error');
        } else {
            setOpenPreview(true)
        }
    }
    const handleRegenerateClick = async () => {
        let regeneratedData = await handleRegenerateCB(stage.mailBody, stage.subject);
        setFormFieldValue(i, regeneratedData.mailBody, regeneratedData.subject, '');
    }

    const checkMailAndSubjectDisable = () => {
        const emailBodyToCheck = stage.mailBody.replace(/<p>/g, "").replace(/<br>/g, "").replace(/<\/p>/g, "");
        if ((emailBodyToCheck?.trim() && (stage.mailBody !== "<p><br></p>")) && stage.subject?.trim()) {
            return false;
        }
        return true
    }

    return (
        <Box
            className='stageBody bg-white'
            id={`stageIdToView${i}`}
            key={`stageBody${i}`}
        >
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                className='py-2 '
            >

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    className='px-5 pb-2'
                >
                    <ListItemText primary={`Stage ${i + 1}`} secondary={""} />
                    <Stack direction={"row"} spacing={1} alignItems={"center"} className='body-header-btns'>
                        <Button variant='outlined' color="primary" startIcon={<AccessTimeOutlined />} size="small" onClick={(e) => setManageTimingAnchorEl(e.currentTarget)} >Manage Timing</Button>
                        <Button variant='outlined' color='primary' startIcon={<VisibilityOutlined />} size="small" disabled={checkMailAndSubjectDisable()} onClick={handlePreviewClick}>Preview</Button>
                        <Button variant='outlined' color='inherit' className='regenerate-btn' size="small" disabled={checkMailAndSubjectDisable()} onClick={handleRegenerateClick} startIcon={<AutoAwesome />}>Regenerate</Button>
                        <IconButton disableRipple size='small'><KeyboardArrowUp fontSize='large' htmlColor="#474747" /></IconButton>
                    </Stack>
                    <Menu
                        id="addsequencelistmenu"
                        anchorEl={manageTimingAnchorEl}
                        open={openManageTimingAnchorEl}
                        onClose={() => setManageTimingAnchorEl(null)}
                        MenuListProps={{ "aria-labelledby": "add-sequencelist-btn", }}
                        anchorOrigin={{ vertical: "bottom", horizontal: "left", }}
                        transformOrigin={{ vertical: "top", horizontal: "left", }}
                        sx={{
                            boxShadow: "0px", mt: 1,
                            "& .MuiList-root.MuiMenu-list": {
                                px: "15px", py: "20px",
                            },
                            "& .MuiPaper-root": { borderRadius: "12px" }
                        }}
                    >
                        <Stack spacing={3} alignItems={"flex-start"} className='manage-timing-menu'>
                            <Box>
                                <Typography>{"Send day(s) after the first message"}</Typography>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    placeholder='0'
                                    id={`businessDays${i}`}
                                    name={`stages[${i}].businessDays`}
                                    onChange={sequenceFormik.handleChange}
                                    value={stage.businessDays}
                                    InputProps={{
                                        startAdornment: <Button variant='text' color="primary" onClick={() => handleBusinessDays("decrement")}><RemoveOutlined /></Button>,
                                        endAdornment: <Button variant='text' color="secondary" onClick={() => handleBusinessDays("increment")}><AddOutlined /></Button>
                                    }}
                                    type='number'
                                    sx={{ width: 120 }}
                                />
                            </Box>

                            <Box>
                                <Typography>Only send on these days of the week</Typography>
                                {/* <Stack direction={"row"} alignItems={"center"} spacing={0.5}>
                                    {weekDays.map((each, index) => (
                                        <Button key={index} variant='outlined' className={`${stage.customDays.includes(each) ? "selectedDay" : "nonSelectedDay"}`} onClick={() => handleDayBtnClick(each)}>{each}</Button>
                                    ))}
                                </Stack> */}
                                <ToggleButtonGroup
                                    id={`weekDays${i}`}
                                    value={stage.weekDays}
                                    onChange={(e, newFormats) => handleDayBtnClick(newFormats)}
                                    aria-label="Working Day"
                                >
                                    {weekDays.map((each, index) => (
                                        <ToggleButton value={each} key={index}>{each}</ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </Box>

                        </Stack>

                    </Menu>
                </Grid>

                <Box>
                    <Divider className='primaryDivider' />

                    <Grid container className="px-5 pt-2">
                        <Grid size={12}>
                            <TextField
                                id={`subject${i}`}
                                name={`stages[${i}].subject`}
                                placeholder="Type a subject for your email"
                                variant="standard"
                                size='small'
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Subject:</InputAdornment>,
                                    disableUnderline: true
                                }}
                                value={stage.subject}
                                onChange={sequenceFormik.handleChange}
                                fullWidth
                            />
                            <Divider className='secondaryDivider' />
                        </Grid>
                        <Grid container rowSpacing={0} columnSpacing={2} className='pt-2' size={12}>
                            <Grid size={12}>
                                <EmailAutoComplete
                                    id={`fromEmail${i}`}
                                    handleChange={(e: any, addOrRemove: string) => {
                                        setFromEmailValue(i, e, 'fromEmail', addOrRemove);
                                    }}
                                    // emailValue={"fromEmail"}
                                    emailValue={stage.fromEmail.code}
                                    isMultiple={false}
                                    textToShow="From:"
                                    variant='none'
                                />
                            </Grid>

                            {/* <Divider className='secondaryDivider' /> */}
                            <Grid size={4} className='d-none'>
                                <TextField
                                    id={`ccEmail${i}`}
                                    name={`stages[${i}].ccEmail`}
                                    placeholder="Enter email address"
                                    variant="standard"
                                    size='small'
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">CC:</InputAdornment>,
                                        endAdornment: <CloseOutlined className="close-icon" onClick={() => sequenceFormik.setFieldValue(`stages[${i}].ccEmail`, "")} />,
                                        disableUnderline: true
                                    }}
                                    value={stage.ccEmail}
                                    onChange={sequenceFormik.handleChange}
                                    fullWidth
                                />
                            </Grid>

                            {/* <Divider className='secondaryDivider' /> */}
                            <Grid size={4} className='d-none'>
                                <TextField
                                    id={`bccEmail${i}`}
                                    name={`stages[${i}].bccEmail`}
                                    placeholder="Enter email address"
                                    variant="standard"
                                    size='small'
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">BCC:</InputAdornment>,
                                        endAdornment: <CloseOutlined className="close-icon" onClick={() => sequenceFormik.setFieldValue(`stages[${i}].bccEmail`, "")} />,
                                        disableUnderline: true
                                    }}
                                    value={stage.bccEmail}
                                    onChange={sequenceFormik.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid size={12}>
                                <Divider className='secondaryDivider mb-1' />
                            </Grid>
                        </Grid>


                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            size={12}
                        >
                            <Grid size={4}>
                                <TextField
                                    size="small"
                                    id={`template${i}`}
                                    select
                                    value={stage.template}
                                    onChange={e => {
                                        // console.log(e)
                                        sequenceFormik.handleChange(e);
                                    }}
                                    name={`stages[${i}].template`}
                                    fullWidth
                                    className="mailInputs"
                                    defaultValue="0"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                Template
                                            </InputAdornment>
                                        ),
                                        disableUnderline: true,
                                    }} variant='standard'
                                >
                                    {
                                        !userLocalData.isChromeExtensionEnabled() &&
                                        <MenuItem value="allTemplates">
                                            <GridViewIcon
                                                fontSize="small"
                                                style={{ marginRight: 8 }}
                                            />
                                            All Templates
                                        </MenuItem>
                                    }
                                    {
                                        !userLocalData.isChromeExtensionEnabled() &&
                                        <MenuItem value="emailBuilder">
                                            <CodeIcon
                                                fontSize="small"
                                                style={{ marginRight: 8 }}
                                            />
                                            HTML Template
                                        </MenuItem>
                                    }
                                    <MenuItem value="emailTemplates">
                                        <NotesIcon
                                            fontSize="small"
                                            style={{ marginRight: 8 }}
                                        />
                                        Text Template
                                    </MenuItem>

                                </TextField>
                            </Grid>

                            <Grid size={8} className='all_email_templates'>
                                {
                                    (stage.template === "allTemplates") ?
                                        <MUIAutoComplete
                                            id='AllEmailTemplates'
                                            handleChange={(id: any, name: string, type: "EmailBuilderTemplate" | "EmailTemplates") => {
                                                // console.log(id, name)
                                                if (id) {
                                                    getTemplate(i, id, (type === "EmailBuilderTemplate") ? 'emailBuilder' : 'emailTemplates');
                                                } else {
                                                    clearSubjectAndBody(i);
                                                }

                                            }}
                                            valuePassed={''}
                                            isMultiple={false}
                                            textToShow="Search All Email Templates"
                                            placeholder=""
                                            width="100%"
                                            type='AllEmailTemplates'
                                            className='Ai-Campaign-select-templates'


                                        />
                                        :
                                        (stage.template === "emailBuilder") ?
                                            <MUIAutoComplete
                                                id='AllEmailTemplates'
                                                handleChange={(id: any, name: string) => {
                                                    // console.log(id, name);
                                                    if (id) {
                                                        getTemplate(i, id, 'emailBuilder');
                                                    } else {
                                                        clearSubjectAndBody(i);
                                                    }

                                                }}
                                                valuePassed={''}
                                                isMultiple={false}
                                                textToShow="Search HTML Template"
                                                placeholder=""
                                                width="100%"
                                                type='EmailBuilderTemplate'
                                                className='Ai-Campaign-select-templates'
                                            />
                                            :
                                            (stage.template === "emailTemplates") ?
                                                <MUIAutoComplete
                                                    id='AllEmailTemplates'
                                                    handleChange={(id: any, name: string) => {
                                                        // console.log(id, name);
                                                        if (id) {
                                                            getTemplate(i, id, 'emailTemplates');
                                                        } else {
                                                            clearSubjectAndBody(i);
                                                        }

                                                    }}
                                                    valuePassed={''}
                                                    isMultiple={false}
                                                    textToShow="Search Text Template"
                                                    placeholder=""
                                                    width="100%"
                                                    type='EmailTemplate'
                                                    className='Ai-Campaign-select-templates'
                                                />
                                                :
                                                null
                                }


                            </Grid>
                        </Grid>

                    </Grid>
                    <Divider className='primaryDivider py-2' />
                    <Stack className='px-5 pt-5'>
                        <Editor
                            toolbarId={`toolbarId${i}`}
                            id={`text_editor${i}`}
                            handleChange={(e: any) => {
                                setFormFieldValue(i, e, '', '');
                            }}
                            editorHtml={stage.mailBody}
                            mentions={true}
                            saveTemplate={true}
                            subject={stage.subject}
                        />
                    </Stack>
                </Box>
            </Grid>

            <Dialog open={openPreview} onClose={() => setOpenPreview(false)} maxWidth="md" fullWidth>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                    <DialogTitle>{`Stage ${i + 1}`}</DialogTitle>
                    <IconButton onClick={() => setOpenPreview(false)}>
                        <Close />
                    </IconButton>
                </Stack>
                <Divider className='aicampaign-preview-dialog-divider' />
                <DialogContent>
                    <Stack spacing={1.5} className='form-preview-container'>
                        <Typography>{"Subject: "}<Typography variant='caption'>{stage.subject}</Typography></Typography>
                        <Divider className='aicampaign-preview-dialog-divider' />
                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography>{"From: "}<Typography variant='caption'>{stage.fromEmail.code}</Typography></Typography>
                            {/* <Typography>{"Cc: "}<Typography variant='caption'>{stage.ccEmail}</Typography></Typography>
                            <Typography>{"Bcc: "}<Typography variant='caption'>{stage.bccEmail}</Typography></Typography> */}
                        </Stack>
                        <Divider className='aicampaign-preview-dialog-divider' />
                        <Box component={"div"} dangerouslySetInnerHTML={{ __html: stage.mailBody }} />
                    </Stack>
                </DialogContent>
            </Dialog>

        </Box >
    )
}



export default Stage;