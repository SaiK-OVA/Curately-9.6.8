import  {React} from '../../../../../../shared/modules/React';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TextField, IconButton } from '../../../../../../shared/modules/commonImports';


function createData(
    id: number,
    module: string,
  datafiledname: string,
  displayname: string,
  sortorder: string,
) {
  return {
    id,
    module,
    datafiledname,
    displayname,
    sortorder, 
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.id}</TableCell>
        
        <TableCell component="th" scope="row">
          {row.module}
        </TableCell>
         <TableCell align="right">{row.datafiledname}</TableCell>
        <TableCell align="right"><TextField value={row.displayname}></TextField></TableCell>
        <TableCell align="right">{row.sortorder}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * 5 * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(1,'Job Posting', 'Job Posting ID', 'Job Posting ID','ASC'),
  createData(2,'Job Seeker', 'Job Seeker', 'Job Seeker','ASC'),
  createData(3,'Job Seeker', 'Job Seeker ID', 'Job Seeker ID','ASC'),
  createData(4,'Job Seeker', 'Main Document ID', 'Main Document ID','ASC'),
  createData(5,'Job Seeker', 'Worker Pay Type Max Rate', 'Worker Pay Type Max Rate','ASC'),
  createData(6,'Job Seeker', 'Site', 'Site','ASC'),
  createData(7,'Job Posting', 'Currency', 'Currency','ASC'),
  
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>ID</TableCell>
            <TableCell align="right">Module</TableCell>
            <TableCell align="right">Data Field Name</TableCell>
            <TableCell align="right">Display Name</TableCell>
            <TableCell align="right">Sort Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
