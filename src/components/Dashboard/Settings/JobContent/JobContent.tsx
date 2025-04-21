import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { Grid } from '../../../../shared/modules/commonImports';
import { useEffect, useState } from 'react'
//import ReactQuill from 'react-quill-new';
import Editor from '../../../shared/EmailDialogBox/EmailBody';
//import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import './JobContent.scss'
//import { link } from 'fs';
import { userLocalData } from '../../../../shared/services/userData';
import ApiService from '../../../../shared/api/api';
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import { CloseIcon } from '../../../../shared/modules/MaterialImports/CloseIcon';

function JobContent() {

    const [editorHeaderContent, setEditorHeaderContent] = useState('')
    const [editorFooterContent, setEditorFooterContent] = useState('')
    const handleEditorHeaderChange = (content: any) => {
        setEditorHeaderContent(content)
    }
    const handleEditorFooterChange = (content: any) => {
        setEditorFooterContent(content)
    }
    const handleSave = () => {
        // const stripHtml = (str: string) => str.replace(/<[^>]*>/g, '');

        const payLoad = {
            "clientId": userLocalData.getvalue("clientId"),
            "header": editorHeaderContent?.trim() ? editorHeaderContent.toString() : "",
            "footer": editorFooterContent?.trim() ? editorFooterContent.toString() : "",

        }
        ApiService.postWithData("admin", "saveOrUpdateHeaderFooterDetails", payLoad).then((response: any) => {
            if (response.data.Success) {
                showToaster(response.data.Message ? response.data.Message : "Content saved Successfully.", 'success');
            } else {
                showToaster("Error", 'error');
            }
        })
    }

    useEffect(() => {
        handleGetData();
    }, [])

    const handleGetData = () => {

        const payLoad = {
            "clientId": userLocalData.getvalue("clientId")
        }
        ApiService.postWithData("admin", "getHeaderFooterDetails", payLoad).then((response: any) => {
            if (response.data.Success == true) {
                setEditorHeaderContent(response.data?.headerFooterDetails?.header);
                setEditorFooterContent(response.data?.headerFooterDetails?.footer);
                //showToaster(response.data.Message, 'success');
            } else {
                showToaster("Something Error is there!", 'error');
            }
        })
    }

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div id="jobContent1">
            <Grid
                container
                direction="row"
                className="customCard px-4 py-2 mt-4 ml-5"
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                sx={{ minHeight: 'auto !important', width: '96% !important' }}
            >
                <Typography variant="h6" className="headerName">
                    Job Content
                </Typography>
                <Stack direction="row" className="btn-container">
                    <Button variant="contained"
                        color="primary"
                        onClick={handleSave}
                    >Save</Button>
                    <Button variant="outlined" type="button" className='ml-2'
                        size="small" color='secondary'
                        onClick={handleOpen}
                    >Preview</Button>

                </Stack>
            </Grid>
            <Box className="header_footer_box">
                {/* <Grid sx={{ marginLeft: '20px' }} className='preview_icon' onClick={handleOpen}>
                    <RemoveRedEyeOutlinedIcon className='cursor-pointer' />
                </Grid> */}
                <Grid container spacing={1} className="header_footer_subbox">
                    <Grid size={12} sx={{ ml: 2 }} style={{ width: '97%' }}>
                        <Typography variant="h6" className="preview-heading">Header:</Typography>
                        <Editor
                            toolbarId='header'
                            placeholder=''
                            id='header'
                            handleChange={(e: any) => {
                                handleEditorHeaderChange(e);
                            }}
                            editorHtml={editorHeaderContent}
                            mentions={true}
                            saveTemplate={false}
                        />
                        {/* <ReactQuill theme="snow" value={editorHeaderContent} onChange={handleEditorHeaderChange} style={{ height: '110px', width: 'max-content', marginTop: '8px' }} onBlur={handleSave} /> */}

                    </Grid>
                    <Grid size={1}></Grid>
                    <Grid size={12} sx={{ mr: 0, ml: 2 }} style={{ width: '97%' }}>
                        <Typography variant="h6" className="preview-heading">Footer:</Typography>
                        {/* <ReactQuill theme="snow" value={editorFooterContent} onChange={handleEditorFooterChange} style={{ height: '110px', width: 'max-content', marginTop: '8px' }} onBlur={handleSave} /> */}

                        <Editor
                            toolbarId='footer'
                            placeholder=''
                            id='footer'
                            handleChange={(e: any) => {
                                handleEditorFooterChange(e);
                            }}
                            editorHtml={editorFooterContent}
                            mentions={true}
                            saveTemplate={false}
                        />

                    </Grid>
                </Grid>

            </Box>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth id="jobContent">
                <DialogTitle className="header">  <span>Preview</span>

                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        className="closeBtn"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    {/* <Divider /> */}
                    <div className="description-con"><p className="description-text"><b>Description</b></p>
                        <span dangerouslySetInnerHTML={{ __html: editorHeaderContent }} />
                        <p>Role: Collections Agent</p><p>Location: Winterville, NC 28590</p><p>Duration: 12 Months Contract</p><p>Pay Scale: $13 - $15/hr</p><p><br /></p><p>Primary Purpose:</p><p>Collect delinquent accounts in a timely, orderly and professional manner while following all standardized collections procedures. Make supervisor aware of problem accounts that may result in repossession, foreclosure, or charge-off.</p><p><br /></p><p>Essential Duties and Responsibilities:</p><p>Following is a summary of the essential functions for this job. Other duties may be performed, both major and minor, which are not mentioned below. Specific activities may change from time to time.</p><p>1. Meet performance expectations for collection efforts for assigned accounts based upon individual goals and objectives, e.g., a minimum calls per day, contact percentage, promises/calls ratio, promises kept.</p><p>2. Place or receive calls in priority order as established by management. Negotiate payment arrangements with clients to cure delinquency, evaluating ability and willingness to pay. Navigate and interpret various screens and relay information to clients accurately and professionally.</p><p>3. Determine cause of delinquency and best course of action to assist delinquent customer.</p><p>4. Document all collection efforts for each assigned account in accordance with established procedures, which may include using action and reaction codes, rescheduling feature, scratch pad entries, etc. in the collection system.</p><p>5. Communicate collection efforts to branch lenders on assigned accounts in accordance with established standards, if applicable.</p><p>6. Order updated credit bureau report or initiate skip tracing process in accordance with established standards.</p><p>7. Review files from Loan Services in accordance with established standards, if applicable.</p><p>8. Initiate deferrals on accounts based upon written policy guidelines.</p><p>9. Communicate regularly with collections supervisor on status of problem accounts in accordance with established standards.</p><p>10. Ensure that all delinquent accounts and assigned queues have been thoroughly worked according to standardized collection procedures.</p><p>11. Ensure that appropriate letters are sent to debtors.</p><p>12. Process customers payments through electronic draft, if applicable.</p><p>13. Process account maintenance transactions according to established guidelines.</p><p><br /></p><p>Required Skills and Competencies:</p><p>The requirements listed below are representative of the knowledge, skill and/or ability required. Reasonable accommodations may be made to enable individuals with disabilities to perform the essential functions.</p><p>1. High school diploma or equivalent</p><p>2. Good verbal and written communication skills</p><p>3. Good decision-making and problem-solving skills</p><p>4. Good time management/organizational skills</p><p>5. Ability to utilize Microsoft applications, including Outlook, Word, Excel, Access, and PowerPoint</p><p>6. Ability to work in a team environment</p><p>7. Ability to work flexible schedule, including overtime as needed</p><p><br /></p><p>Desired Skills:</p><p>1. Previous customer service, collections, or sales experience</p><p>2. Bilingual</p><p><br /></p><p>Schedule:</p><p><br /></p><p><br /></p><p>Days</p><p>Assigned hours</p><p>Monday Thursday</p><p>2 days at 8-5 and 2 days at 12-9</p><p>Friday</p><p>Twice a month 11-8 if assigned or 8-5 if not</p><p>Saturday</p><p>As assigned usually twice a month 1 @ 8-12 and last Saturday is 8-2 all teammates</p><p>Sunday</p><p>As assigned usually once every 3-4 month except if the last day of the month falls on Monday, Tuesday or Wednesday then all teammates will work the Sunday prior from 3-9</p><p>Last day of the Month</p><p>All teammates will work 8am to 9pm unless the last day falls on Sunday then they will work 12pm to 9pm</p></div>
                    {/* <Divider /> */}
                    <div className="preview-text" dangerouslySetInnerHTML={{ __html: editorFooterContent }} />
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default JobContent
