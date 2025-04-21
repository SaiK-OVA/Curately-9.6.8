// ReferralProgram.tsx
// import React from 'react';
import './ReferralProgram.scss';
import   {Grid, TextField, Button } from '../../../shared/modules/commonImports';
import {Stack} from '../../../shared/modules/MaterialImports/Stack';
import  {Typography}  from '../../../shared/modules/MaterialImports/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import SendIcon from '@mui/icons-material/Send';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function ReferralProgram() {
  return (
    <div className="container">
      <h1 className="header">Give $25, Get $25</h1>
      <p>Give friends a $25 bonus. Get $25 when they meet the requirements for Nextaff.</p>
      <Button fullWidth variant='contained'>Share your referral link</Button>
      <p>Refer a friend</p>
      <form>
      <Grid container spacing={2} alignItems="center" >
       
        <Grid size="grow">
          <TextField fullWidth size="small" label="First Name" variant="outlined" />
        </Grid>
        <Grid size="grow">
          <TextField fullWidth size="small" label="Last Name" variant="outlined" />
        </Grid>
        <Grid size="grow">
          <TextField fullWidth size="small" label="Email or Phone" variant="outlined" />
        </Grid>
        <Grid >
          <Button  size="small" variant="contained" color="primary" type="submit" endIcon={<SendIcon />}>
            Refer Friend
          </Button>
        </Grid>
      </Grid>
    </form>
    
     
      <Stack direction="row" sx={{paddingTop:"16px"}} spacing={2}>
      
        <button className='gmail' >Import from Gmail</button>

      <Stack direction="row" spacing={2} marginTop={5} >
        <Typography>Share on</Typography>
      <FacebookIcon className='icon' />
      <TwitterIcon className='icon'/>
      <LinkedInIcon className='icon'/>
      </Stack>
      
      </Stack>

     
      <Stack direction="row" spacing={60} sx={{paddingTop:"16px", 
    marginTop: "17px"}}>
        <Stack>

        <Typography>Your referral link: </Typography>
        <Typography>[Your referral link here] </Typography>
        </Stack>
        <Stack>
            <Button variant='outlined'>Copy Link</Button>
        </Stack>
      </Stack>
      <Stack >
        <small><u>View referral program details</u></small>
      </Stack>
     

    </div>
  );
}
