import CloseRounded from '@mui/icons-material/CloseRounded';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import Drawer from '@mui/material/Drawer';
import { DateTime } from "luxon";
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { MaterialReactTable, MRT_ColumnDef } from '../../../../../shared/modules/MaterialReactTable';
import { React, useMemo, useRef, useState } from '../../../../../shared/modules/React';
import ViewCandidateModal from '../../../Candidate/ViewCandidate/ViewCandidateModal';
import "./applicantsStatus.scss";
import CustomPagination from '../../../../shared/CustomPagination/CustomPagination';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { InputAdornment } from '../../../../../shared/modules/MaterialImports/FormInputs';
import Close from '@mui/icons-material/Close';

interface IApplicantsStatusProps {
    open: boolean;
    closePopup: { (): void };
    applicantsStatusList: any[];
    statusData: { type: string, jobId: string | number, jobTitle: string }
}

const ApplicantsStatus: React.FC<IApplicantsStatusProps> = ({ open, closePopup, applicantsStatusList, statusData }) => {
    const [viewCandidate, setViewCandidate] = useState(false);
    const viewCandidateId = useRef("");
    const [searchValue, setSearchValue] = useState("");
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25,
    });
    const [rowCount, setRowCount] = useState(0);

    const openCandidateView = (id: string) => {
        viewCandidateId.current = id;
        setViewCandidate(true);
    }
    const columns: MRT_ColumnDef<typeof applicantsStatusList[0] | any>[] = useMemo(() => [
        {
            accessorKey: 'submissionDate', header: 'Date',
            Cell: ({ row }) => (
                <span>
                    {DateTime.fromFormat(row?.original?.submissionDate?.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a')}
                </span>
            ),
        },
        {
            accessorKey: 'userName', header: 'Candidate',
            Cell: ({ row }) => (
                <span className="hightLightTd" onClick={() => openCandidateView(row.original.userId + "")}>{row.original.userName.toLowerCase()}</span>
            ),
            size: 240
        },
        { accessorKey: 'recruiterName', header: 'Recruiter', },
        { accessorKey: 'status', header: 'Status', },
    ], []);

    const filteredData = useMemo(() => {
        const finalSearchValue = searchValue.toLowerCase().trim();
        const records = applicantsStatusList.filter((each) => {
            return (
                each.userName.toLowerCase().includes(finalSearchValue) ||
                each.recruiterName.toLowerCase().includes(finalSearchValue) ||
                each.status.toLowerCase().includes(finalSearchValue)
            )
        });
        setRowCount(records.length)
        return records;
    }, [applicantsStatusList, searchValue])

    return (
        <Drawer open={open} sx={{ zIndex: 999, height: "100vh", }} onClose={closePopup} anchor='right' id="ApplicantsStatusView">
            <Stack width={"80vw"} minHeight={"100vh"} position={"relative"}>

                <Stack width={"100%"} direction={"row"} justifyContent={"space-between"} alignItems={"center"} className='applicantsStatusViewHeader'>
                    <Typography variant='h6'>{statusData?.jobTitle} - {statusData?.type}</Typography>
                    <IconButton size='small' onClick={closePopup}><CloseRounded /></IconButton>
                </Stack>

                <Box className="Submissions-table" style={{ padding: "0px 1rem", marginTop: "4rem" }}>
                    <Box className="MRTableCustom pl-0">
                        <MaterialReactTable
                            data={filteredData}
                            columns={columns}
                            initialState={{
                                columnPinning: { left: ["mrt-row-select"] },
                                density: "compact",
                                showGlobalFilter: true
                            }}
                            state={{ pagination }}
                            enableColumnResizing
                            enableGlobalFilterModes
                            columnResizeMode="onChange"
                            enablePinning
                            enableStickyHeader
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
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                            enablePagination
                            muiPaginationProps={{
                                showFirstButton: false,
                                showLastButton: false,
                                SelectProps: { style: { display: "none" } },
                            }}
                            onPaginationChange={setPagination}
                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={pagination.pageSize}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => {
                                        // setRowSelection({});
                                        setPagination({ ...pagination, pageIndex: page });
                                    }}
                                />
                            )}
                        />
                        {
                            viewCandidate ?
                                <ViewCandidateModal candidateId={viewCandidateId.current} closePopup={() => setViewCandidate(false)} jobId={statusData?.jobId ? `${statusData?.jobId}` : ""} open={viewCandidate} />
                                :
                                null
                        }
                    </Box>
                </Box>
            </Stack>
        </Drawer >
    )
}

export default ApplicantsStatus;
