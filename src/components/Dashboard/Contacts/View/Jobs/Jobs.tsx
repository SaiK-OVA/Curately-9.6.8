import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import { useEffect, useMemo, useState } from "../../../../../shared/modules/React";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

// import { Box } from '@mui/material';
// import CampaignIcon from '@mui/icons-material/Campaign';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
// import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import GridViewIcon from '@mui/icons-material/GridView';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';


// import { useParams } from 'react-router-dom';


import CustomPagination from '../../../../shared/CustomPagination/CustomPagination';
import '../../.../../Contacts.scss';
import ApiService from "../../../../../shared/api/api";
import { DateTime } from "../../../../../shared/modules/Luxon";
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import { globalData } from "../../../../../shared/services/globalData";
import { Tooltip } from "../../../../../shared/modules/MaterialImports/ToolTip";
import { userLocalData } from "../../../../../shared/services/userData";

const Jobs = ({ contactId, firstName, lastName }: { contactId: string, firstName: string, lastName: string }) => {

    // const { contactId } = useParams();

    const [rowSelection, setRowSelection] = useState({});
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    // const [rowCount, setRowCount] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [jobsData, setJobsData] = useState([]);
    const [searchValue, setSearchValue] = useState("");


    const getJobContactList = () => {
        trackPromise(
            ApiService.postWithData('admin', 'contactJobs', { contId: Number(contactId), clientId: userLocalData.getvalue('clientId') }).then(
                (response: any) => {
                    console.log(response.data.contactJobs
                    )
                    setData(response.data.contactJobs);
                    // debugger;
                }
            )
        )
    }
    useEffect(() => {
        // https://app.curately.ai/Accuick_API/Curately/Contacts/contact_jobs.jsp?clientId=3&contId=3
        getJobContactList();
    }, []);

    useEffect(() => {
        const filter = globalFilter ? globalFilter.toLowerCase() : "";
        const filtered: any = data.filter((row: any) => {
            return (
                (row.recruiterName && row.recruiterName.toLowerCase().includes(filter)) ||
                (row.jobTitle && row.jobTitle.toLowerCase().includes(filter))
            );
        });
        setJobsData(filtered as any);
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    }, [globalFilter, data]);

    // Calculate rowCount
    const rowCount = jobsData.length;

    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }

    //"date":"2012-12-20 15:18:53.0",2
    //"jobid":"37632",4
    //"billrate":"23.3300",6
    //"jobsstate":"UT",
    //"reqno":"FISVJP00007335",
    //"hmname":"Adam Halliday",5
    //"title":"Data Entry Clerk",3
    //"status":"0: Inactive",1
    //"jobscity":"Salt Lake City"



    const getJobStatus = (val: number) => {
        switch (val) {
            case 1:
                return "Open";
            case 2:
                return "Halted";
            case 3:
                return "Closed";
            case 4:
                return "Cancelled ";
            case 5:
                return "Pipeline";
            case 6:
                return "Heads Up ";
            case 7:
                return "Re-Opened ";
            case 8:
                return "Automation";
            case 9:
                return "POC ";
            case 10:
                return "Knowledge Bank ";

            default:
                return "Open";
        }
    }

    const columns: MRT_ColumnDef<(typeof data)[0]>[] = useMemo(
        () => [
            {
                accessorKey: "jobTitle",
                header: "Job Title",
                Cell: ({ renderedCellValue, row }) => {
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
                size: 190
            },
            {
                accessorKey: 'jobStatus',
                header: 'Status',
                Cell: ({ row }) => (
                    <span>{getJobStatus(Number(row.original.jobStatus))}</span>
                )
            },
            {
                accessorFn: (row) => row.jobDate,
                id: 'jobDate',
                header: 'Created Date',
                Cell: ({ row }) => (
                    <span>
                        {/* {params.row.CreatedDate.substring(0, 10)} */}
                        {DateTime.fromFormat(row.original.jobDate.substring(0, 10), 'yyyy-MM-dd').toFormat('MM/dd/yyyy')}

                    </span>
                ),
            },
            {
                accessorKey: 'recruiterName',
                header: 'Recruiter Name',
            },
            //{
            //   accessorKey: 'date',
            //   header: 'Date',
            //},
            // {
            //     accessorKey: 'jobTitle',
            //     header: 'Title',
            // },
            // {
            //     accessorKey: 'jobId',
            //     header: 'Job Id',
            // },
            // {
            //     accessorKey: 'billrate',
            //     header: 'Rate',
            // }

        ],

        []
    );

    return (
        <div className="contactsList MRTableCustom pl-0">
            <MaterialReactTable
                columns={columns}
                // enableRowSelection
                data={jobsData}
                enableTopToolbar={false}
                enablePinning
                initialState={{
                    columnPinning: { left: ["mrt-row-select", 'jobTitle'] },
                    density: "compact",
                    showGlobalFilter: false
                }}
                enableDensityToggle={false}
                enableFullScreenToggle={false}
                // manualPagination
                // manualSorting
                enableGlobalFilterModes
                columnResizeMode="onChange"
                getRowId={row => row.jobId}
                onPaginationChange={setPagination}
                enableStickyHeader
                icons={{
                    ArrowDownwardIcon: (props: any) => (
                        <SwitchLeftIcon {...props} />
                    ),
                }}
                state={{
                    pagination,
                    globalFilter,
                }}
                muiPaginationProps={{
                    rowsPerPageOptions: [pagination.pageSize],
                    showFirstButton: false,
                    showLastButton: false,
                    SelectProps: {
                        style: { display: 'none' }, // Hide the rows per page dropdown
                    },
                }}
                enablePagination={true}
                renderBottomToolbarCustomActions={() => (
                    <CustomPagination
                        page={pagination.pageIndex}
                        rowsPerPage={pagination.pageSize}
                        rowCount={rowCount}
                        onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page })}
                        showCount={false}
                    />
                )}
                onGlobalFilterChange={setGlobalFilter}

            />
        </div>
    )
}

export default Jobs;