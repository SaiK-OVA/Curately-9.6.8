import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import { useEffect, useMemo, useRef, useState } from "../../../../../shared/modules/React";
// import { useParams } from 'react-router-dom';
import ApiService from "../../../../../shared/api/api";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

// import IconButton from "@mui/material/IconButton";

// import ViewModal from "./ViewModal";

import './Interviews.scss'
import { useParams } from "react-router-dom";
// import { globalData } from "../../../../../shared/services/globalData";
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import EditInterviewDetails from "../../../Candidate/ViewCandidate/ViewCandidateTabs/Shortlist/Popups/EditInterviewDetails/EditInterviewDetails";
import EditInterview from "../../../Candidate/ViewCandidate/ViewCandidateTabs/Shortlist/Popups/EditInterview/EditInterview";
import RescheduleModal from "./Popups/RescheduleModal";

import NotesModal from "./Popups/NotesModal";
import CancelModal from "./Popups/CancelModal";
import { DateTime } from "luxon";
import { userLocalData } from "../../../../../shared/services/userData";
import ViewCandidateModal from '../../../Candidate/ViewCandidate/ViewCandidateModal';
import { CloseOutlined } from "@mui/icons-material";
import { InputAdornment } from "../../../../../shared/modules/MaterialImports/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { IconButton } from "../../../../../shared/modules/MaterialImports/Button";
import CustomPagination from "../../../../shared/CustomPagination/CustomPagination";



const Interviews = () => {
    const [viewInterviewDetailsModal, setViewInterviewDetailsModal] = useState(false);
    const [editInterviewModal, setEditInterviewModal] = useState(false);
    const [rescheduleInterviewModal, setRescheduleInterviewModal] = useState(false);
    const [notesInterviewModal, setNotesInterviewModal] = useState(false);
    const [cancelInterviewModal, setCancelInterviewModal] = useState(false);

    const { jobId } = useParams();

    const [rowSelection, setRowSelection] = useState({});
    const [data, setData] = useState<any>([]);
    const [searchValue, setSearchValue] = useState("");
    const [rowCount, setRowCount] = useState(0);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    useEffect(() => {
        //do something when the row selection changes...
        console.info({ rowSelection });
    }, [rowSelection]);

    useEffect(() => {
        trackPromise(
            ApiService.getCall("admin", 'getJobOverviewSubmissionShortlist/' + jobId + '/' + userLocalData.getvalue('clientId') + '/300').then(
                (response: any) => {
                    setData(response.data.List);
                    // debugger;
                }
            )
        )
    }, []);

    const [viewCandidate, setViewCandidate] = useState(false);
    const viewCandidateId = useRef("");
    const openCandidateView = (id: string, sourceId: string) => {
        // let tempSourceId = (sourceId) ? "/" + sourceId : "";
        // window.open(globalData.getWindowLocation() + "candidate/view/" + id + "/" + jobId + tempSourceId);
        viewCandidateId.current = id;
        setViewCandidate(true);
    }
    const columns: MRT_ColumnDef<(typeof data)[0]>[] = useMemo(
        () => [

            {
                accessorKey: 'submissionDate', //access nested data with dot notation
                header: 'Date',
                Cell: ({ renderedCellValue, row }) => (
                    <span>
                        {DateTime.fromFormat(row.original.submissionDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a')}

                    </span>
                ),
            },
            {
                accessorKey: 'userName',
                header: 'Candidate',
                Cell: ({ renderedCellValue, row }) => (
                    <span className="hightLightTd" onClick={() => openCandidateView(row.original.userId, '')}>{row.original.userName.toLowerCase()}</span>
                ),
            },
            {
                accessorKey: 'recruiterName',
                header: 'Recruiter',
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
            // {
            //     accessorKey: 'intDate',
            //     header: 'Interview Date',
            // },
            // {
            //     accessorKey: 'intTime',
            //     header: 'Interview Time',
            // },
            // {
            //     accessorKey: 'candName',
            //     header: 'Candidate',
            //     Cell: ({ renderedCellValue, row }) => (
            //         <span className="hightLightTd" onClick={() => openCandidateView(row.original.candId, row.original.searchId)}>{row.original.candName.toLowerCase()}</span>
            //     ),
            // },
            // // {
            // //     accessorKey: 'intType',
            // //     header: 'Type',
            // // },
            // {
            //     accessorKey: 'ronnd',
            //     header: 'Round',
            // },
            // {
            //     accessorKey: 'interviewers',
            //     header: 'Interviewers',
            // },
            // {
            //     accessorKey: 'intStatus',
            //     header: 'Status',
            // },

            // {
            //     accessorKey: 'recruiterName',
            //     header: 'Created by',
            // },

            // {
            //     accessorKey: 'actions',
            //     header: 'Actions',
            //     Cell: ({ renderedCellValue, row }) => (
            //         <div>
            //             <Tooltip title="View">
            //                 <span><VisibilityIcon onClick={() => { setViewInterviewDetailsModal(true) }} /></span>
            //             </Tooltip>
            //             <Tooltip title="Notes">
            //                 <span><AssignmentTurnedInIcon onClick={() => { setNotesInterviewModal(true) }} /></span>
            //             </Tooltip>
            //             <Tooltip title="Edit">
            //                 <span><NoteAltIcon onClick={() => { setEditInterviewModal(true) }} /></span>
            //             </Tooltip>
            //             <Tooltip title="Survey">
            //                 <span><SpeakerNotesIcon /></span>
            //             </Tooltip>
            //             <Tooltip title="Schedule">
            //                 <span><EventRepeatIcon onClick={() => {
            //                     confirmDialog('Are you sure you want to Schedule? ', () => {
            //                         "warning"
            //                     }
            //                     );
            //                 }} /></span>
            //             </Tooltip>
            //             <Tooltip title="Reschedule">
            //                 <span><TodayIcon onClick={() => { setRescheduleInterviewModal(true) }} /></span>
            //             </Tooltip>
            //             <Tooltip title="Cancel">
            //                 <span><CancelOutlinedIcon onClick={() => { setCancelInterviewModal(true) }} /></span>
            //             </Tooltip>
            //             <Tooltip title="Complete">
            //                 <span><DomainVerificationOutlinedIcon onClick={() => {
            //                     confirmDialog('Are you sure you want to Complete? ', () => {
            //                         "warning"
            //                     }
            //                     );
            //                 }} /></span>
            //             </Tooltip>
            //         </div>
            //     ),
            // },

        ],
        [],
    );
    // const columnChanged = (e: any) => {
    //     console.log(e());
    // }
    // const columnInfo = (e: any) => {
    //     console.log(e());
    // }

    const filteredData = useMemo(() => {
        const finalSearchValue = searchValue.toLowerCase().trim();
        const records = data.filter((each: any) => {
            return (
                each.userName.toLowerCase().includes(finalSearchValue) ||
                each.recruiterName.toLowerCase().includes(finalSearchValue)
            )
        });
        setRowCount(records.length)
        return records;
    }, [data, searchValue]);

    return (
        <div className="Interviews">
            <div className="MRTableCustom pl-0">
                <MaterialReactTable
                    columns={columns}
                    // enableRowSelection
                    data={filteredData}
                    onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                    // state={{ rowSelection }} //pass our managed row selection state to the table to use
                    enablePinning
                    enableStickyHeader
                    initialState={{
                        // columnPinning: { left: ['mrt-row-select', 'name'] },
                        density: 'compact',
                        showGlobalFilter: true,
                        // columnOrder: [
                        //     'mrt-row-select', // move the built-in selection column 
                        // ]
                    }}
                    state={{ pagination }}
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
                    renderBottomToolbarCustomActions={() => (
                        <CustomPagination
                            page={pagination.pageIndex}
                            rowsPerPage={pagination.pageSize}
                            rowCount={rowCount}
                            onChangePage={(page: any) => {
                                setRowSelection({});
                                setPagination({ ...pagination, pageIndex: page, pageSize: 10 });
                            }}
                        />
                    )}
                    onPaginationChange={setPagination}
                    muiSearchTextFieldProps={{
                        value: searchValue,
                        onChange: (e: any) => {
                            setPagination({ ...pagination, pageIndex: 0 });
                            setSearchValue(e.target.value);
                        },
                        slotProps: {
                            input: {
                                startAdornment: <InputAdornment position="start"><SearchOutlined fontSize='small' htmlColor='#757575' /></InputAdornment>,
                                endAdornment: <IconButton
                                    size='small'
                                    disabled={["", null, undefined].includes(searchValue)}
                                    onClick={() => {
                                        setPagination({ ...pagination, pageIndex: 0 });
                                        setSearchValue("");
                                    }}
                                ><CloseOutlined fontSize='small' /></IconButton>
                            }
                        }
                    }}
                    muiPaginationProps={{
                        showFirstButton: false,
                        showLastButton: false,
                        SelectProps: { style: { display: "none" } },
                    }}
                />
                {
                    viewCandidate ?
                        <ViewCandidateModal candidateId={viewCandidateId.current} closePopup={() => setViewCandidate(false)} jobId={jobId ? jobId : ""} open={viewCandidate} />
                        :
                        null
                }
            </div>
            {
                viewInterviewDetailsModal ?
                    <EditInterview
                        dialogOpen={viewInterviewDetailsModal}
                        handleDialogClose={() => { setViewInterviewDetailsModal(false) }}
                        handleEditDetails={() => { setViewInterviewDetailsModal(true); }} />
                    :
                    null
            }
            {
                editInterviewModal ?
                    <EditInterviewDetails
                        dialogOpen={editInterviewModal}
                        handleDialogClose={() => { setEditInterviewModal(false) }} />
                    :
                    null
            }
            {
                rescheduleInterviewModal ?
                    <RescheduleModal
                        dialogOpen={rescheduleInterviewModal}
                        handleDialogClose={() => { setRescheduleInterviewModal(false) }} />
                    :
                    null
            }
            {
                notesInterviewModal ?
                    <NotesModal
                        dialogOpen={notesInterviewModal}
                        handleDialogClose={() => { setNotesInterviewModal(false) }} />
                    :
                    null
            }
            {
                cancelInterviewModal ?
                    <CancelModal
                        dialogOpen={cancelInterviewModal}
                        handleDialogClose={() => { setCancelInterviewModal(false) }} />
                    :
                    null
            }
        </div>

    )
}

export default Interviews;