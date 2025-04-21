import { useEffect, useState } from '../../../../shared/modules/React';
import { List, ListItem, ListItemIcon, ListItemText } from '../../../../shared/modules/MaterialImports/List';
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Card } from '../../../../shared/modules/MaterialImports/Card';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { Mail as MailIcon, StarBorder as StarBorderIcon, Send as SendIcon, Add as AddIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon } from '@mui/icons-material';
import EmailDialogBox from '../../../shared/EmailDialogBox/EmailDialogBox';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';

import ApiService from "../../../../shared/api/api";
import { useNavigate, useParams } from 'react-router-dom';
import { userLocalData } from '../../../../shared/services/userData';
import { DateTime } from '../../../../shared/modules/Luxon';

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
const Email = () => {


    let navigate = useNavigate();

    const { accountId } = useParams();
    const [dialogStatus, setDialogStatus] = useState(false);

    const [inboxEmails, setInboxEmails] = useState<Email[]>([]);
    const [showSentEmails, setShowSentEmails] = useState(false);
    const [showInboxEmails, setShowInboxEmails] = useState(true);
    const [inboxMailCount, setInboxMailCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

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

    const getInboxEmailsList = () => {
        const params = {
            accountId: accountId,
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
    }, [accountId, currentPage]);


    const backToList = () => {
        navigate('/' + userLocalData.getvalue('clientName') + '/settings/email');
    }

    return (

        <>
            <Grid
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                sx={{ minHeight: 'auto !important' }}
            >
                <Typography variant="h6" className="header">
                    Curately Mail
                </Typography>
                <Button variant="contained" onClick={backToList}>Back</Button>
            </Grid>
            <div style={{ display: 'flex', paddingTop: '10px' }}>

                <div className="sidebar" style={{ width: '240px', height: '100vh', position: 'fixed', top: '110px', left: '57px', backgroundColor: '#f4f4f4', padding: '20px' }}>
                    <List component="nav">
                        <ListItem onClick={() => setDialogStatus(true)} sx={{ cursor: 'pointer', backgroundColor: '#757ce8', color: 'white', borderRadius: '5px' }}>
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
                        height: 'calc(100vh - 195px)',
                        width: 'calc(100vw - 308px)'
                    }}>

                        {showInboxEmails && inboxEmails?.length > 0 ? (
                            inboxEmails.map(email => (
                                <>
                                    {/* <Card key={email?.emailId} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: 2,
                                backgroundColor: email.unseen ? '#ffffff' : '#f0f0f0', // Highlight unseen emails
                                boxShadow: 'none',
                                borderBottom: '1px solid #e0e0e0',
                                '&:hover': { backgroundColor: '#f7f7f7' },
                                color: '#202124',
                                fontWeight: 'bold',
                                marginBottom: 2
                            }}>
                                <IconButton size="large">
                                    <CheckBoxOutlineBlankIcon />
                                </IconButton>
                                <Box sx={{ flexGrow: 1, marginRight: 2 }}>
                                    <Typography variant="body1">From: {email?.from?.name} ({email.from.address})</Typography>
                                    <Typography variant="body2">To: {email.to.map(to => `${to.name} (${to.address})`).join(', ')}</Typography>
                                    <Typography variant="caption">Sent on: {new Date(email.date).toLocaleString()}</Typography>
                                </Box>
                                <Typography variant="subtitle1">{email.subject}</Typography>
                            </Card> */}
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
                                            <Typography variant="body1" sx={{ minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {email?.from?.name}
                                                {/* ({email.from.address}) */}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ flex: 2, textAlign: 'left', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                            <Typography variant="subtitle1">{email.subject}</Typography>

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
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, height: "57px" }}>
                            <Button onClick={handlePrevious} disabled={currentPage <= 1}>Previous</Button>
                            <Typography sx={{ margin: '0 15px' }}>Page {currentPage} of {totalPages}</Typography>
                            <Button onClick={handleNext} disabled={currentPage >= totalPages}>Next</Button>
                        </Box>}
                </Grid>

                <Grid>
                    {dialogStatus && <EmailDialogBox
                        dialogOpen={dialogStatus}
                        onClose={() => setDialogStatus(false)}
                        name={''}
                        emailId={''}

                    />}
                </Grid>
            </div>
        </>
    );
};

export default Email;
