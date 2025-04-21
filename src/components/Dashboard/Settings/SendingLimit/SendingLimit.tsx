import { useState } from '../../../../shared/modules/React';
// import { Link } from "react-router";
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { TextField, FormLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box } from '../../../../shared/modules/MaterialImports/Box';

import './SendingLimit.scss'

const SendingLimit = () => {
    const [sendlimit, setSendLimit] = useState("50");
    return (
        <div id="sendLimit">
            <div className="pt-3 px-3">
                <Grid container
                    direction="column"
                    className="customCard px-4 py-2"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Typography variant="h5" className='mt-2' >Sending limits</Typography>
                    <Box className='customCard py-0 customCenteredTabs mt-2' sx={{ borderBottom: 1, borderColor: 'divider', minHeight: 'auto !important', marginBottom: '0 !important' }}></Box>
                    <div>
                        <Grid container direction="row" className="customCard mt-3 bg-lightGrey c-darkGrey" justifyContent="flex-start" style={{width: '570px'}}>
                            <Grid size={1} className='mt-4 ml-2'>
                                <EmailOutlinedIcon />
                            </Grid>
                            <Grid size={10} className='mt-3 ml-2'>
                                <Typography variant="h6" gutterBottom>Sending 200+ emails per day may impact deliverability</Typography>
                                {/* <Typography>To maintain domain health, please follow the recommendations below and link more mailboxes to increase sending capacity. </Typography> */}
                            </Grid>
                        </Grid >
                    </div>
                    <Grid container direction="row" spacing={2} className="mt-2" justifyContent="flex-start">
                        <Grid size={12} className='mt-1'>
                            <Box display="flex" alignItems="center">
                                <FormLabel className='inputLabel'><span className='fw-7'>Emails sent per day </span><span>(24-hour period)</span></FormLabel>
                                <Tooltip title="The emails sent per day (daily limit) is the maximum number of emails you can send per mailbox within a 24-hour period. This calculation may vary depending on your email service provider (ESP)." placement="right">
                                    <span>
                                        <Box alignItems="center">
                                            <InfoOutlinedIcon style={{ marginLeft: 4, paddingTop: '3', paddingLeft: 5 }} />
                                        </Box>
                                    </span>
                                </Tooltip>
                            </Box>
                            <TextField fullWidth className='mt-1'
                                helperText="Recommended daily limit: 50 or 50+ if you're sending campaigns with a > 5% reply rate and have a high domain reputation."
                                variant="outlined"
                                type="text"
                                size="small"
                                value={sendlimit}
                                onChange={(e) => {
                                    setSendLimit(e.target.value);
                                }}

                            />
                        </Grid>
                        <Grid container direction="row" spacing={2} className="mt-2 mb-3" justifyContent="flex-start">
                            <Grid size={3}>
                                <Button color="primary" variant='contained' size="small"> Save</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div >
        </div>
    )
}

export default SendingLimit