import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button, TextField, Grid }  from '../../../../shared/modules/commonImports';


const Candidatelist = () => {
    return (
        <>
            <div>
                <Grid container spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid>
                        <h1 style={{ marginLeft: "350px" }}>Candidates List</h1>

                        <div style={{ marginRight: '150px' }}>

                            <TextField
                                size="small"
                                id="priority"
                                name='priority'
                                label='Filter the list'

                            >

                            </TextField>
                            <FilterAltIcon className='right' style={{ marginTop: '10px' }} />

                            <Button style={{ marginLeft: "500px", textTransform: 'capitalize' }} variant="contained">Search</Button>
                            <Button style={{ marginLeft: "20px", textTransform: 'capitalize' }} variant="contained">Reset</Button>
                        </div>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><label>Name</label></TableCell>
                                        <TableCell><label>Home Phone</label></TableCell>
                                        <TableCell><label>Company</label></TableCell>
                                        <TableCell><label>Modified</label></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell>Asdfghjkl</TableCell>
                                        <TableCell>123456789</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>12/03/2022 05:00 AM</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>

            </div >
        </>
    )
}


export default Candidatelist;