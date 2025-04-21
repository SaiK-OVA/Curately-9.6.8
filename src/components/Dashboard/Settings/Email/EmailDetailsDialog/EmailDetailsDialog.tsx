import { useEffect, useState } from "../../../../../shared/modules/React";
import { Dialog, DialogContent, DialogTitle } from "../../../../../shared/modules/MaterialImports/Dialog";
import { Button, IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid2';
import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import ApiService from "../../../../../shared/api/api";
import { DateTime } from '../../../../../shared/modules/Luxon';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import { userLocalData } from "../../../../../shared/services/userData";
import { Typography } from "../../../../../shared/modules/MaterialImports/Typography";
import { Stack } from "../../../../../shared/modules/MaterialImports/Stack";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import './EmailDetailsDialog.scss';
import StarBorder from '@mui/icons-material/StarBorder';

export interface DialogProps {
    dialogOpen: boolean;
    onClose: () => void;
    accountId: any;
}

const EmailBlock = ({ emailData }: { emailData: any }) => {
    const [collapse, setCollapse] = useState(true);

    const extractContent = (content: any) => {
        const span = document.createElement('span');
        span.style.display = "none";
        span.innerHTML = content;
        span.remove();
        return span.textContent || span.innerText;
    }

    return (
        <div className="email-block-wrapper">
            <Typography variant="h3" className="email-sub">{emailData.subject}</Typography>
            <Stack direction="row">
                <div className="icon">
                    {emailData.type === "OUT" ? <ArrowUpwardIcon className="out" /> : <ArrowDownwardIcon className="in" />}
                </div>
                <div className="email-wrapper">
                    <Stack
                        component="div"
                        className="email-header"
                        justifyContent="space-between"
                        onClick={() => setCollapse(!collapse)}
                        direction="column"
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                            <div>
                                <Stack direction="row">
                                    <Typography variant="h4" className="name">{emailData.recrName}</Typography>
                                    {collapse && <Typography className="e-id">{"<" + emailData.emailId + ">"}</Typography>}
                                </Stack>
                                {!collapse && <Typography className="e-id">to </Typography>}
                            </div>
                            <div className="date">
                                {DateTime.fromISO(emailData.date.replace(" ", "T")).toFormat('MM/dd/yyyy hh:mm:ss a')}
                                <IconButton>
                                    <StarBorder />
                                </IconButton>
                            </div>
                        </Stack>
                        <div className="text-wrap">
                            {collapse && <Typography className="body-text">{extractContent(emailData.body)}</Typography>}
                        </div>
                    </Stack>
                    {!collapse && <div className="email-body" dangerouslySetInnerHTML={{ __html: emailData.body }}></div>}

                </div>
            </Stack>
        </div>
    )
}

export const EmailDetailsDialog = ({ dialogOpen, onClose, accountId }: DialogProps) => {
    const [emailPreviewList, setEmailPreviewList] = useState([]);

    const getEmailPreview = (accountId: any) => {
        const params = {
            emailId: 1,
            clientId: userLocalData.getvalue("clientId"),
            recrId: userLocalData.getvalue('recrId')
        };

        trackPromise(
            ApiService.postWithData('admin', 'emailLog', params)
                .then((response) => {
                    if (response.data.Message === "Success") {
                        setEmailPreviewList(response.data.emailslog)
                    }
                })
                .catch(error => console.error('Failed to fetch email preview:', error))
        );
    };

    useEffect(() => {
        getEmailPreview(accountId);
    }, [accountId]);

    return (
        <Dialog open={Boolean(dialogOpen)} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle className='py-2'>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    // sx={{ width: '475px' }}
                    alignItems="center"
                >
                    <span className='addHeader'>Email Details</span>
                    <div>
                        <Grid container direction="row" justifyContent="end" alignItems="center">
                            <Button variant="outlined" type='button' color="secondary" className='mr-2' onClick={onClose}>Close</Button>
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className="p-1" sx={{ minHeight: '300px' }}>
                {emailPreviewList.map((item: any) => (
                    <EmailBlock emailData={item} />
                ))}
            </DialogContent>
        </Dialog>
    )
}