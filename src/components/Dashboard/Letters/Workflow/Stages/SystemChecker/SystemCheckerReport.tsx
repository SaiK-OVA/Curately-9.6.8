import { useMemo } from '../../../../../../shared/modules/React';

import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../../shared/modules/MaterialReactTable";

import {Stack} from '../../../../../../shared/modules/MaterialImports/Stack';
import { TextField, InputAdornment, Button } from '../../../../../../shared/modules/commonImports';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import SendIcon from '@mui/icons-material/Send';
// import { Padding } from '@mui/icons-material';

type Person = {
    date: string;
    email: string;
    macId: string;
    ipAddress: string;
    attempt: number;
    result: string;
    action: string;
};


const data: Person[] = [
    {
        date: '2023-08-27',
        email: 'john@example.com',
        macId: '00:A0:C9:14:C8:29',
        ipAddress: '192.168.1.1',
        attempt: 1,
        result: 'pass',
        action: ''
    },
    {
        date: '2023-08-26',
        email: 'jane@example.com',
        macId: '00:A0:C9:14:C8:30',
        ipAddress: '192.168.1.2',
        attempt: 1,
        result: 'fail',
        action: ''
    },
    {
        date: '2023-08-25',
        email: 'robert@example.com',
        macId: '00:A0:C9:14:C8:31',
        ipAddress: '192.168.1.3',
        attempt: 2,
        result: 'pass',
        action: ''
    },
    {
        date: '2023-08-24',
        email: 'alice@example.com',
        macId: '00:A0:C9:14:C8:32',
        ipAddress: '192.168.1.4',
        attempt: 1,
        result: 'fail',
        action: ''
    }
]

const SystemCheckerReport = () => {

    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
            {
                accessorKey: 'date',
                header: 'Date',
                size: 150,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 150,
            },
            {
                accessorKey: 'macId',
                header: 'MAC id',
                size: 200,
            },
            {
                accessorKey: 'ipAddress',
                header: 'IP address',
                size: 150,
            },
            {
                accessorKey: 'attempt',
                header: 'Attempt',
                size: 150,
            },
            {
                accessorKey: 'result',
                header: 'Result',
                size: 150,
            },
            {
                accessorKey: 'action',
                header: 'Action',
                size: 150,
            },
        ],
        [],
    );

    return (

        <div>
            <Stack direction="row" spacing={2} justifyContent="space-around">
                <Stack  >
                    <TextField
                        id="search"
                        name="search"

                        placeholder="Search"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon
                                        className='searchIcon'

                                    />
                                </InputAdornment>
                            ),

                        }}

                        variant="outlined"
                        size='small'

                    />
                </Stack>
                <Stack direction="row" spacing={2} >
                    <Stack >
                        <Button variant="outlined" endIcon={<SendIcon />} size="small">
                            Delete
                        </Button>
                    </Stack>
                    <Stack  >
                        <Button variant="contained" endIcon={<DownloadIcon />} size="small">
                            Send
                        </Button>
                    </Stack>

                </Stack>
            </Stack>


            <div>

                <MaterialReactTable columns={columns} data={data} />
            </div >
        </div >

    )

};

export default SystemCheckerReport;
