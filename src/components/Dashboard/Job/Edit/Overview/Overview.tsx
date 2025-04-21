import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
//import Tabs from '@mui/material/Tabs';
import {Tab} from '../../../../../shared/modules/MaterialImports/Tabs';
import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
//import InputAdornment from '@mui/material/InputAdornment';



import './Overview.scss';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));




const Overview = () => {
    return (
        <>
            <Grid container spacing={2} justifyContent="flex-start">
                <Grid size={7}>
                    <Item style={{ padding: '10px', margin: '5px', fontSize: '13px' }}>
                        <p>Our client, an international software development and professional services frim, is seeking an Engagement Manager in Philadelphia. Our client would prefer local</p>
                    </Item>
                </Grid>
                <Grid size={5}>
                    <Item>
                        {/* <Tabs>
                            <Tab label="Activity" className="advert" />
                        </Tabs> */}
                        <Tab label="Activity" className="advert" />
                        <hr style={{ marginLeft: '15px' }} />
                        <Grid>
                            <div style={{ display: 'flex', marginTop: '5px', alignItems: "center" }}>
                                <label style={{ paddingRight: '20px', marginTop: '6px', alignItems: "center", marginLeft: '15px' }}>Mvali</label>
                                <EventRepeatIcon style={{ paddingRight: '10px' }} /><label style={{ paddingRight: '20px', marginTop: '10px' }}>08/06/2012</label>
                                <AccessTimeIcon style={{ paddingRight: '10px' }} /><label style={{ paddingRight: '20px', marginTop: '10px' }}>05:42:46</label>
                            </div>

                        </Grid>
                        <Grid>
                            <div style={{ marginTop: '10px' }}>
                                <label style={{ paddingLeft: '15px' }}>Hiring Authority:Gopinatha Pillai,Praveen</label>
                            </div>
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        </>
    )
}

export default Overview;