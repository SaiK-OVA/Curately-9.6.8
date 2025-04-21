import { useEffect, useState } from '../../../../../shared/modules/React';
import { Dialog, DialogContent, DialogTitle } from "../../../../../shared/modules/MaterialImports/Dialog";
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Button, IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';
import { List, ListItem, ListItemIcon, ListItemText } from "../../../../../shared/modules/MaterialImports/List";
import { Mail as MailIcon, StarBorder as StarBorderIcon, Send as SendIcon, Add as AddIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@mui/icons-material';
import ApiService from "../../../../../shared/api/api";
import { DateTime } from '../../../../../shared/modules/Luxon';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import './CuratelyMailDialog.scss';
import { Card } from '../../../../../shared/modules/MaterialImports/Card';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import EmailDialogBox from '../../../../shared/EmailDialogBox/EmailDialogBox';
import { EmailDetailsDialog } from '../EmailDetailsDialog/EmailDetailsDialog';
import { EmailAccountData } from '../EmailAccountsList';

export interface DialogProps {
    dialogOpen: boolean;
    onClose: () => void;
    accountData: EmailAccountData;
}

interface Email {
    id: string;
    subject: string;
    from: {
        name: string;
        address: string;
    };
    to: {
        name: string;
        address: string;
    }[];
    date: string;
    emailId: string;
    text: {
        id: string;
        encodedSize: {
            html: number;
        };
    };
    unseen?: boolean;
}

export const CuratelyMailDialog = ({ dialogOpen, onClose, accountData }: DialogProps) => {

    const [dialogStatus, setDialogStatus] = useState(false);

    const [inboxEmails, setInboxEmails] = useState<Email[]>([]);
    const [showSentEmails, setShowSentEmails] = useState(false);
    const [showInboxEmails, setShowInboxEmails] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [emailDetailsOpen, setEmailDetailsOpen] = useState(false);
    const [acctId, setAcctId] = useState("");

    const handleShowSentEmails = () => {
        // setEmails(sentEmails); 
        setShowSentEmails(true);
    };
    const handleShowInboxEmails = () => {
        setInboxEmails(inboxEmails)
        setShowInboxEmails(true);

    };

    const handlePrevious = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNext = () => {
        setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
    };

    const handleHideSentEmails = () => {
        setShowSentEmails(false);
    };

    const handleTitleClick = (emailId: string) => {
        setAcctId(emailId)
        setEmailDetailsOpen(true);
    }

    const getInboxEmailsList = () => {
        const params = {
            accountId: accountData.account,
            page: currentPage,
            pageSize: 10
        };

        trackPromise(
            ApiService.getByParams(193, '/Curately/EmailEngine/getMessages.jsp', params)
                .then((response) => {
                    if (response.data && response.data.messages) {
                        setInboxEmails(response.data.messages);
                        setTotalPages(response.data.pages);
                    }
                })
                .catch(error => console.error('Failed to fetch inbox emails:', error))
        );
    };

    useEffect(() => {
        getInboxEmailsList();
    }, [accountData.account, currentPage]);


    return (
        <Dialog open={Boolean(dialogOpen)} onClose={onClose} maxWidth="xl" fullWidth id="curatelyMailDialog">
            <DialogTitle className='py-2'>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    // sx={{ width: '475px' }}
                    alignItems="center"
                >
                    <span className='addHeader'>Curately Mail</span>
                    <div>
                        <Grid container direction="row" justifyContent="end" alignItems="center">
                            <Button variant="outlined" type='button' color="secondary" className='mr-2' onClick={onClose}>Close</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <div className='emaillist-wrap'>

                    <div className="sidebar">
                        <List component="nav">
                            <ListItem className='compose' onClick={() => setDialogStatus(true)} sx={{ cursor: 'pointer', backgroundColor: '#757ce8', color: 'white', borderRadius: '5px' }}>
                                <ListItemIcon>
                                    <AddIcon style={{ color: 'white' }} />
                                </ListItemIcon>
                                <ListItemText primary="Compose" />
                            </ListItem>
                            <ListItem sx={{ cursor: 'pointer' }} onClick={handleShowInboxEmails}>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItem>
                            <ListItem sx={{ cursor: 'pointer' }} onClick={handleShowSentEmails}>
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sent" />
                            </ListItem>
                        </List>
                    </div>
                    <Grid>
                        <Box style={{
                            marginLeft: '240px',
                            padding: '0px',
                            overflow: 'auto',
                            height: 'calc(100vh - 210px)',
                            width: 'calc(100vw - 340px)'
                        }}>

                            {showInboxEmails && inboxEmails?.length > 0 ? (
                                inboxEmails.map(email => (
                                    <>
                                        <Card
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                padding: '8px 16px',
                                                backgroundColor: email.unseen ? '#ffffff' : '#f0f0f0',
                                                boxShadow: 'none',
                                                borderBottom: '1px solid #e0e0e0',
                                                '&:hover': { backgroundColor: '#f7f7f7' },
                                                color: '#202124',
                                                fontWeight: 'bold',
                                                marginBottom: '8px'
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                                <IconButton size="large" sx={{ marginRight: '16px' }}>
                                                    <CheckBoxOutlineBlankIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <StarBorderIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <LabelOutlinedIcon />
                                                </IconButton>
                                                <Typography variant="body1" className='emailTitle' component="span" onClick={() => handleTitleClick(email.emailId)}>
                                                    {email?.from?.name}
                                                    {/* ({email.from.address}) */}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ flex: 2, textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                                <Typography variant="subtitle1" onClick={() => handleTitleClick(email.emailId)} className='c-pointer'>{email.subject}</Typography>

                                            </Box>
                                            <Typography variant="caption" sx={{ flex: 0, whiteSpace: 'nowrap' }}>
                                                {DateTime.fromISO(email.date).toFormat('MM/dd/yyyy hh:mm:ss a')}
                                            </Typography>

                                        </Card>

                                    </>
                                )))
                                : null}
                        </Box>
                        {showInboxEmails && inboxEmails?.length > 0 &&
                            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2, height: "43px" }}>
                                <Button className='btnSecondary' onClick={handlePrevious} disabled={currentPage <= 1} variant="outlined" color="secondary">Previous</Button>
                                <Typography sx={{ margin: '0 15px' }}>Page {currentPage} of {totalPages}</Typography>
                                <Button className='btnSecondary' onClick={handleNext} disabled={currentPage >= totalPages} variant="outlined" type='button' color="secondary">Next</Button>
                            </Box>}
                    </Grid>

                    <Grid>
                        {dialogStatus && <EmailDialogBox
                            dialogOpen={dialogStatus}
                            onClose={() => setDialogStatus(false)}
                            name={''}
                            emailId={''}
                            fromEmail={accountData.email ? accountData.email : ""}
                            fromName={accountData.name ? accountData.name : accountData.account ? accountData.account : ""}
                            curatelyMail={true}
                            emailAccountId={accountData.account}
                        />}

                        {emailDetailsOpen && <EmailDetailsDialog
                            dialogOpen={emailDetailsOpen}
                            onClose={() => setEmailDetailsOpen(false)}
                            accountId={accountData.account}
                        />}
                    </Grid>
                </div>
            </DialogContent>
        </Dialog>
    );
};
