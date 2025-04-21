import { useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from '../../../../../shared/modules/React';
import ApiService from '../../../../../shared/api/api';
// import { DateTime } from "luxon";
import  { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import {Box} from '../../../../../shared/modules/MaterialImports/Box';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';


import './Placements.scss'
import { globalData } from '../../../../../shared/services/globalData';
const Placements = () => {
    const { companyId } = useParams();
    const [placementData, setPlacementData] = useState<any>([]);
    const loadPlacementList = () => {
        trackPromise(
            ApiService.getByParams(193, 'Company/company_placements.jsp?', { compid: companyId, statusActive: 1 }).then(
                (response: any) => {
                    // console.log(response)   
                    setPlacementData(response.data);
                }
            ))
    }
    // const openView = (id: string) => {
    //     window.open(globalData.getWindowLocation() + "job/view/" + id);
    // }
    // Payroll Name
    // Hiring Manager
    // Tax Term
    // Job Title
    // Client Job ID
    // Hire Date
    // Estimated End Date
    // Status
    // Bill Rate
    // Pay Rate
    // Account Manager
    // Recruiter
    // Placement Type
    // Portfolio Manager
    // Portfolio Pay Out
    // Gross

    // accmngr: "Manish Karani"
    // billrate: "115.75"
    // candName: "Murph, Taunisha Patrece"
    // cid: "0"
    // estendDate: "2024-01-23"
    // gross: "6.84"
    // hiredate: "2023-08-02"
    // hrmngCandId: ""
    // jobid: "0"
    // jobtitle: "Project Manager"
    // payrate: "100.0"
    // portfilio_manager: "House"
    // portfilio_payout: ""
    // positionid: "J5F012216"
    // recr: "Pass Through"
    // reqno: "1235276"
    // status: "Active"
    // taxterm: "W2"
    // type: "Portal (FMC)"


    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }


    const columns: MRT_ColumnDef<(typeof placementData)[0]>[] = useMemo(
        () => [
            {
                accessorKey: 'candName',
                header: 'Payroll Name',
            },
            {
                accessorKey: 'hrmngCandId',
                header: 'Hiring Manager',
            },
            {
                accessorKey: 'taxterm',
                header: 'Tax Term',
            },
            {
                accessorKey: 'jobtitle',
                header: 'Job Title',
                Cell: ({ renderedCellValue, row }) => (
                    <span className="hightLightTd" onClick={() => openJobView(row.original.jobid)}>{row.original.jobtitle.toLowerCase()}</span>
                )
            },
            {
                accessorKey: 'cid',
                header: 'Client Job ID',
            },
            {
                accessorKey: 'hiredate',
                header: 'Hire Date',
            },
            {
                accessorKey: 'estendDate',
                header: 'Estimated End Date',
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            {
                accessorKey: 'billrate',
                header: 'Bill Rate',
            },
            {
                accessorKey: 'payrate',
                header: 'Pay Rate',
            },
            {
                accessorKey: 'accmngr',
                header: 'Account Manager',
            },
            {
                accessorKey: 'recr',
                header: 'Recruiter',
            },
            {
                accessorKey: 'type',
                header: 'Placement Type',
            },
            {
                accessorKey: 'portfilio_manager',
                header: 'Portfolio Manager',
            },
            {
                accessorKey: 'portfilio_payout',
                header: 'Portfolio Pay Out',
            },
            {
                accessorKey: ' gross',
                header: 'Gross',
            },
        ],

        []
    );
    useEffect(() => {
        loadPlacementList();
    }, []);

    return (
        <Box>
            <div className=" placements MRTableCustom pl-0">

                <MaterialReactTable
                    columns={columns}
                    enableRowSelection
                    data={placementData}
                    // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                    // state={{ rowSelection }} //pass our managed row selection state to the table to use
                    enablePinning
                    enableStickyHeader
                    initialState={{
                        columnPinning: { left: ['mrt-row-select', 'name'] },
                        density: 'compact',
                        showGlobalFilter: true,

                    }}
                    enableColumnResizing
                    enableGlobalFilterModes
                    columnResizeMode="onChange"
                    icons={{
                        ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                    }}
                // paginateExpandedRows={true}
                // enableRowVirtualization
                // onColumnSizingChange={(e) => columnChanged(e)}
                // onColumnSizingInfoChange={(e) => columnInfo(e)}
                />

            </div>
        </Box>

    )
}

export default Placements;