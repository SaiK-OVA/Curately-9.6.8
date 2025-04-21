// import Table from '@mui/material/Table';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import Paper from '@mui/material/Paper';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
import VideocamSharpIcon from '@mui/icons-material/VideocamSharp';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';


import './Interviews.scss';



const Interviews = () => {
    return (<>
        {/* <Tabs style={{ margin: 0 }}>
            <Tab label="Interviewed Candidates" className="advert" />
        </Tabs>
        <Tab label="Interviewed Candidates" className="advert" />
        <hr />
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><label>Interview Date</label></TableCell>
                        <TableCell align="right"><label>Interview Time</label></TableCell>
                        <TableCell align="right"><label>Candidate</label></TableCell>
                        <TableCell align="right"><label>Type</label></TableCell>
                        <TableCell align="right"><label>Round</label></TableCell>
                        <TableCell align="right"><label>Interviews</label></TableCell>
                        <TableCell align="right"><label>Status</label></TableCell>
                        <TableCell align="right"><label>Created by</label></TableCell>
                        <TableCell align="right"><label>Actions</label></TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
        <br />
        <br /> */}
        <div className='inter'>
            <Grid container spacing={2}>
                <Grid size={2}>
                    <div className='vi'>
                        <div style={{ paddingLeft: '70px', marginTop: '10px' }}>
                            <VideocamSharpIcon /></div> </div>
                    <div className='fir'>
                        <div style={{ paddingLeft: '50px', marginTop: '20px' }}>
                            <label>First Round</label></div> </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ marginTop: '20px' }}>
                        <label>SANKIRTH KUMARA</label>
                        <div style={{ marginTop: '20px', display: 'flex' }}>
                            <EventRepeatIcon style={{ paddingRight: '5px' }} />
                            <label style={{ paddingRight: '12px', marginTop: '3px' }}>08/06/2012</label>
                            <AccessTimeIcon style={{ paddingRight: '5px' }} />
                            <label style={{ paddingRight: '12px', marginTop: '3px' }}>05:42:46</label>
                        </div>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ marginTop: '20px' }}>
                        <label>Interviewed By</label>
                        <div style={{ marginTop: '20px' }}>
                            <label> Vijaya Sargari, Bhavya Reddy</label>
                        </div>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ marginTop: '20px' }}>
                        <label>Created By</label>
                        <div style={{ marginTop: '20px' }}>
                            <label>Aditya Kumar</label>
                        </div>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ marginTop: '30px' }}>
                        <Button variant="contained" size="small">
                            <label>Scheduled</label>
                        </Button>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ marginTop: '30px' }}>
                        <Button variant="contained" size="small" style={{ borderRadius: '10px' }}>
                            <VisibilityIcon /><label>View Details</label>
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    </>);
}

export default Interviews;