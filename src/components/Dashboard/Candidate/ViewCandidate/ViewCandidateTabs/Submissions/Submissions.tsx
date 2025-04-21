import { useMemo } from '../../../../../../shared/modules/React';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../../shared/modules/MaterialReactTable";
import { DateTime } from "../../../../../../shared/modules/Luxon";

import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Tooltip } from "../../../../../../shared/modules/MaterialImports/ToolTip"

import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

import { globalData } from "../../../../../../shared/services/globalData";


import "./Submissions.scss";



const Submissions = ({ submissionsList }: { submissionsList: any }) => {

    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }


    const columns: MRT_ColumnDef<(typeof submissionsList)[0]>[] = useMemo(
        () => [
            {
                accessorKey: 'statusDate', //normal accessorKey
                header: 'Date',
                Cell: ({ row }) => (
                    <span>
                        {/* {params.row.CreatedDate.substring(0, 10)} */}
                        {row.original.statusDate ? DateTime.fromFormat(row.original.statusDate?.substring(0, 16), 'yyyy-MM-dd hh:mm').toFormat('MM/dd/yyyy') : ''}

                    </span>
                ),
            },
            // {
            //     accessorKey: 'fullName',//access nested data with dot notation
            //     header: 'Candidate',
            // },
            {
                accessorKey: "jobTitle",
                header: "Job Title",
                Cell: ({ row }) => {
                    let jobTitle = (row.original.jobTitle) ? row.original.jobTitle.toLowerCase() : "";
                    let displayTitle = jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                    return (
                        <Tooltip title={jobTitle} classes={{ tooltip: 'tt-capital' }}>
                            <span
                                className="hightLightTd ellipsisText"
                                onClick={() => openJobView(row.original.jobId)}
                            >
                                {displayTitle}
                            </span>
                        </Tooltip>
                    );
                },
                size: 240
            },
            {
                accessorKey: 'statusName',
                header: 'Status',

            },
        ],
        [],
    );

    return (
        <Box className="sub">
            <div className=" MRTableCustom pl-0">
                {/* {
                    submissionsList.length ? */}
                <MaterialReactTable columns={columns} data={submissionsList}
                    //enableRowSelection
                    initialState={{ showGlobalFilter: true }} enablePinning
                    enableStickyHeader
                    enableColumnResizing
                    enableGlobalFilterModes
                    columnResizeMode="onChange"
                    icons={{
                        ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                    }}
                />
                {/* : null
                } */}
            </div>
        </Box>
    )
}

export default Submissions;