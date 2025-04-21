import { useEffect, useState } from '../../../../../../shared/modules/React'; 
import { DateTime } from '../../../../../../shared/modules/Luxon';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Card } from '../../../../../../shared/modules/MaterialImports/Card';
import { List, ListItem, ListItemText } from '../../../../../../shared/modules/MaterialImports/List';
import { ListItemAvatar } from '../../../../../../shared/modules/MaterialImports/ListItemAvatar';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "./EmailHistory.scss";
// import ApiRequests from '../../../../../../shared/api/api';


const EmailHistory = () => {
    const [emailList, updateEmailList] = useState([]);
    const [emailOid, updateEmailOid] = useState('');
    const [email, updateEmail] = useState([]);

    const loadEmailList = () => {
        // let response = ApiRequests.getEmailHistoryList();
        // updateEmailList(response);
        // updateEmailOid(response[0]._id.$oid);
        updateEmailList([]);
    }

    const emailOnClickHandler = (oid: string) => {
        updateEmailOid(oid);
    }

    const loadEmailDetails = (emailData: any) => {
        updateEmail(emailData);
    }

    const dateFormatHandler = (date: string) => {
        return DateTime.fromISO(date).toFormat('MM/dd/yyyy, t');
    }

    useEffect(() => {
        loadEmailList();
    }, []);

    // useEffect(() => {
    //     let response = ApiRequests.getEmailDetails(emailOid);
    //     loadEmailDetails(response);
    // }, [emailOid]);


    return (
        (<Box>
            <Card sx={{ padding: "10px" }}>
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                        <List sx={{ width: '100%', bgcolor: 'background.paper', cursor: 'pointer' }}>
                            {emailList.map((item: any) => (
                                <ListItem key={item._id.$oid} onClick={(e) => emailOnClickHandler(item._id.$oid)}>
                                    <ListItemAvatar>
                                        {item.type === "OUT" ? <ArrowUpwardIcon sx={{ color: "green" }} /> : <ArrowDownwardIcon sx={{ color: "blue" }} />}

                                    </ListItemAvatar>
                                    <Box sx={{ display: "flex", width: "100%" }}>
                                        <ListItemText className="custom-list-text" primary={item.fromemail} secondary={item.subject} />
                                        <ListItemText className="email-date" primary={dateFormatHandler(item.crdate)} sx={{ flexShrink: "0" }} />
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    <Box sx={{ width: "50%" }}>

                        {email.map((item: any) => (
                            <Box className="mail-details" key={item._id.$oid}>
                                <Typography variant="h5">
                                    {item.subject}
                                </Typography>
                                <Box className="email-details">
                                    <Typography sx={{ fontSize: '0.875rem' }}>
                                        <span>Sent: </span> {dateFormatHandler(item.crdate.replace(/\s/g, ''))}
                                    </Typography>
                                    <Typography sx={{ fontSize: '0.875rem' }}>
                                        <span>To:</span> {item.candname}
                                    </Typography>
                                </Box>
                                <Box className="email-body" dangerouslySetInnerHTML={{ __html: item.body.replace('\\r\\n', '').replaceAll('\\', '') }}></Box>
                            </Box>
                        ))}



                    </Box>
                </Box>
            </Card>
        </Box>)
    );
}

export default EmailHistory