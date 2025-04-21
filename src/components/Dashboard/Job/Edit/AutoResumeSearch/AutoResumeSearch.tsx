// import Table from '@mui/material/Table';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import Paper from '@mui/material/Paper';
// import Link from '@mui/material/Link';

//import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';



import './AutoResumeSearch.scss';


const AutoResumeSearch = () => {
    return (<>
        {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><label>Total : 0</label></TableCell>
                        <TableCell align="right"><Link className="link" href="#">Show Search Strings</Link></TableCell>
                        <TableCell align="right"><Link className="link" href="#">Search Log</Link></TableCell>
                        <TableCell align="right"><label>Auto Search</label></TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer> */}
        <Grid container spacing={2} justifyContent="flex-start">
            <Grid size={11}>
                {/* <Tabs style={{ marginRight: '5px' }}>
                    <Tab label="Auto Resume Search" className="advert" />
                </Tabs> */}
                <Tab label="Auto Resume Search" className="advert" />
                <hr style={{ marginLeft: '15px' }} />
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <div style={{ paddingLeft: '30px' }}>Resumes Found
                    <TextField style={{ marginLeft: '30px' }}
                        label="Natalie"
                        size="small" />
                </div>
            </Grid>
        </Grid>
    </>);
}

export default AutoResumeSearch;