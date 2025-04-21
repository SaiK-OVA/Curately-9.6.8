import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useRef, useState } from 'react';
// import { useParams } from 'react-router-dom';
import ApiService from "../../../../../shared/api/api";
import { DateTime } from "luxon";
import './Submissions.scss'
import { useParams } from "react-router-dom";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
// import { globalData } from "../../../../../shared/services/globalData";
import { trackPromise } from "react-promise-tracker";
import { userLocalData } from "../../../../../shared/services/userData";
import ViewCandidateModal from '../../../Candidate/ViewCandidate/ViewCandidateModal';
import { InputAdornment } from "../../../../../shared/modules/MaterialImports/InputAdornment";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { IconButton } from "../../../../../shared/modules/MaterialImports/Button";
import Close from "@mui/icons-material/Close";
import CustomPagination from "../../../../shared/CustomPagination/CustomPagination";

const Submissions = () => {
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
        // https://adminapi.curately.ai/curatelyAdmin/getJobSubmissionShortlist/2100/3
        trackPromise(ApiService.getCall("admin", 'getJobOverviewSubmissionShortlist/' + jobId + '/' + userLocalData.getvalue('clientId') + '/100')

            .then(
                (response: any) => {
                    setData(response.data.List);
                    // console.log(response.data.List);
                    // debugger;
                }
            )
        )
    }, []);


    const [viewCandidate, setViewCandidate] = useState(false);
    const viewCandidateId = useRef("");

    const openCandidateView = (id: string, sourceId: string) => {
        // let tempSourceId = (sourceId) ? "/" + sourceId : "";
        // window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim() + "/" + jobId + tempSourceId);
        viewCandidateId.current = id;
        setViewCandidate(true);
    }

    const columns: MRT_ColumnDef<typeof data[0]>[] = useMemo(
        () => [
            {
                accessorKey: 'submissionDate',
                header: 'Date',
                Cell: ({ row }) => (
                    <span>
                        {DateTime.fromFormat(row.original.submissionDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a')}
                    </span>
                ),
            },
            {
                accessorKey: 'userName',
                header: 'Candidate',
                Cell: ({ row }) => (
                    <span className="hightLightTd" onClick={() => openCandidateView(row.original.userId + "", '')}>{row.original.userName.toLowerCase()}</span>
                ),
                size: 240
            },
            // {
            //     accessorKey: 'payRate',
            //     header: 'PayRate',
            // },
            {
                accessorKey: 'recruiterName',
                header: 'Recruiter',
            },
            {
                accessorKey: 'status',
                header: 'Status',
            },
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
        <div className="Submissions">
            <div className="MRTableCustom pl-0">
                <MaterialReactTable
                    data={filteredData}
                    // enableRowSelection
                    columns={columns}
                    initialState={{
                        columnPinning: { left: ["mrt-row-select"] },
                        density: "compact",
                        showGlobalFilter: true
                    }}
                    // getRowId={(row) => row.userId}
                    enableColumnResizing
                    enableGlobalFilterModes
                    state={{ rowSelection, pagination }}
                    columnResizeMode="onChange"
                    // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                    enablePinning
                    enableStickyHeader
                    // initialState={{
                    //     columnPinning: { left: ['mrt-row-select', 'name'] },
                    //     density: 'compact',
                    //     showGlobalFilter: true,
                    //     columnOrder: [
                    //         'mrt-row-select',// move the built-in selection column 
                    //     ]
                    // }}
                    icons={{
                        ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                    }}
                    //     paginateExpandedRows={true}
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
                                ><Close fontSize='small' /></IconButton>
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
        </div>

    )
}
export default Submissions;