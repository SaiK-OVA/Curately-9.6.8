
// import { Button } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

import  { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from 'react';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

// import { DateTime } from 'luxon';
import './Submissions.scss';



type Candidate = {
    date: string;
    name: {
        firstName: string;
        lastName: string;
    };
    payRate: string;
    recruiter: string;
    jobStatus: string;
    action: string;
};
const data: Candidate[] = [
    {
        date: '01/01/2001 06:30 AM',
        name: {
            firstName: 'John',
            lastName: 'Doe',
        },
        payRate: 'Hourly 5 W2',
        recruiter: 'Adam',
        jobStatus: "",
        action: "",

    },

];


const Submissions = () => {

    const columns = useMemo<MRT_ColumnDef<any>[]>(
        () => [
            {
                accessorKey: 'date', //normal accessorKey
                header: 'Date',
                // renderCell: (params: any) => (
                //     <span>
                //         {/* {params.row.CreatedDate.substring(0, 10)} */}
                //         {DateTime.fromFormat(params.row.modifiedDate.substring(0, 10), 'MM/dd/yyyy').toFormat('MM/dd/yyyy')}

                //     </span>
                // ),
            },
            {
                accessorKey: 'name.firstName',//access nested data with dot notation
                header: 'Candidate',
                // accessorFn: (row: any) => `${row.name.firstName} ${row.name.lastName}`,
            },
            {
                accessorKey: 'payRate',
                header: 'PayRate',
            },
            {
                accessorKey: 'recruiter',
                header: 'Recruiter',
            },
            {
                accessorKey: 'jobStatus',
                header: 'Status',
                // Cell: () => (
                //     <span><Button variant="contained" style={{ borderRadius: '50px', height: '25px', width: '150px', textTransform: 'capitalize' }} size="medium">1st Round Interview</Button></span>
                // ),

            },
            // {
            //     accessorKey: 'action',
            //     header: 'Action',
            //     Cell: () => (
            //         <span><MoreVertIcon /></span>
            //     ),

            // },
        ],
        [],
    );
    return (
        <div className="MRTableCustom pl-0">
            <MaterialReactTable columns={columns} data={data}
                enableDensityToggle={false}
                initialState={{ showGlobalFilter: true }}
                icons={{
                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                }}
            />
        </div>
    )
}

export default Submissions;