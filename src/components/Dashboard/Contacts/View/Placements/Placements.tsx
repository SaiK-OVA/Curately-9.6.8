import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import { useEffect, useMemo, useRef, useState } from "../../../../../shared/modules/React";
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


import CustomPagination from '../../../../shared/CustomPagination/CustomPagination'

import '../../.../../Contacts.scss';
import ApiService from "../../../../../shared/api/api";
import { DateTime } from "../../../../../shared/modules/Luxon";
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import { Tooltip } from "@mui/material";
import { globalData } from "../../../../../shared/services/globalData";
import { userLocalData } from "../../../../../shared/services/userData";
import { FormatMillisecondsToCustomDate } from "../../../../../shared/utils/FormatMillisecondsToCustomDate";
import ViewCandidateModal from "../../../Candidate/ViewCandidate/ViewCandidateModal";

const Placements = ({ contactId }: { contactId: string }) => {

    // const { contactId } = useParams();

    //  const [rowSelection, setRowSelection] = useState({});
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    // const [rowCount, setRowCount] = useState(0);
    const [globalFilter, setGlobalFilter] = useState('');
    const [placementData, setPlacementData] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [isOpenCandidateView, setIsOpenCandidateView] = useState(false);
    const candidateId = useRef<number | string>("");

    const getPlacementContactList = () => {
        trackPromise(
            ApiService.postWithData('admin', 'getContactHires', { contId: contactId, clientId: userLocalData.getvalue('clientId') }).then(
                (res: any) => {
                    //  setData(response.data);
                    setData(Array.isArray(res.data.contactTaskResponse) ? res.data.contactTaskResponse : []);
                    // setData;
                    console.log(res)
                }
            )
        )
    }
    useEffect(() => {
        // https://app.curately.ai/Accuick_API/Curately/Contacts/contact_jobs.jsp?clientId=3&contId=3
        getPlacementContactList();
    }, []);


    useEffect(() => {
        const filter = globalFilter ? globalFilter.toLowerCase() : "";
        const filtered: any = data.filter((row: any) => {
            return (
                (row.recruiterName && row.recruiterName.toLowerCase().includes(filter)) ||
                (row.jobTitle && row.jobTitle.toLowerCase().includes(filter))
            );
        });
        setPlacementData(filtered as any);
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    }, [globalFilter, data]);

    // Calculate rowCount
    const rowCount = placementData.length;

    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: 'jobTitle',
                header: 'Job Title',
                Cell: ({ row }) => {

                    let jobTitle = row.original.jobTitle
                        ? row.original.jobTitle.toLowerCase()
                        : "";
                    let displayTitle =
                        jobTitle.length > 30 ? jobTitle.slice(0, 30) + "..." : jobTitle;
                    return <Tooltip title={row.original.jobTitle} classes={{ tooltip: 'tt-capital' }}>
                        <span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}>{displayTitle}</span>
                    </Tooltip>

                },
                size: 240
            },
            {
                accessorKey: 'firstName',
                header: 'Name',
                Cell: ({ row }) => {
                    let fullName = row.original.firstName + " " + row.original.lastName
                    let displayfirstname =
                        fullName.length > 30 ? fullName.slice(0, 30) + "..." : fullName;
                    return <Tooltip title={row.original.fullName} classes={{ tooltip: 'tt-capital' }}>
                        <span className="hightLightTd" onClick={() => openCandidateView(row.original.candId)}>{displayfirstname}</span>
                    </Tooltip>
                    // <span>{row.original.firstName + " " + row.original.lastName}</span>
                },
                size: 240
            },
            {
                accessorKey: "statusDate",
                header: "Date",
                Cell: ({ row }) => (
                    <span>
                        {/* {row.original.statusDate ? DateTime.fromFormat(row.original.statusDate.toString().substring(0, 10), 'yyyy-MM-dd').toFormat('MM/dd/yyyy') : ""} */}
                        {/* {row.original.statusDate ? new Date(row.original.statusDate).getFullYear() : ""} */}
                        {FormatMillisecondsToCustomDate.formatMillisecondsToCustomDate(row.original.statusDate)}

                    </span>
                ),
                size: 100,
            },
            {
                accessorKey: 'statusName',
                header: 'Status Name',
            },

        ],
        []
    );

    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }

    const openCandidateView = (id: string) => {
        candidateId.current = id;
        setIsOpenCandidateView(true);
        // window.open(globalData.getWindowLocation() + "candidate/view/" + id);
    }
    // const columnChanged = (e: any) => {
    //     console.log(e());
    // }
    // const columnInfo = (e: any) => {
    //     console.log(e());
    // }




    return (
        <>
            <div className="contactsList MRTableCustom pl-0">
                <MaterialReactTable
                    columns={columns}
                    // enableRowSelection
                    data={placementData}
                    enableTopToolbar={false}
                    enablePinning
                    initialState={{
                        columnPinning: { left: ['mrt-row-select', 'name'] },
                        density: 'compact',
                        showGlobalFilter: true,
                        // columnOrder: [
                        //     'mrt-row-select', // move the built-in selection column 
                        //     'jobId',
                        //     'reqNo',
                        //     'title',
                        //     'date',
                        // ]
                    }}
                    enableColumnResizing
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
            {isOpenCandidateView ?
                <ViewCandidateModal
                    open={isOpenCandidateView}
                    closePopup={() => {
                        candidateId.current = "";
                        setIsOpenCandidateView(false);
                    }}
                    jobId={""} candidateId={candidateId.current as any}
                />
                : null}
        </>
    )
}

export default Placements;