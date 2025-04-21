import { CloseOutlined, FactCheckOutlined, RefreshOutlined } from '@mui/icons-material';
import SwitchLeft from '@mui/icons-material/SwitchLeft';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Drawer from '@mui/material/Drawer';
import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Button, IconButton } from '../../../../../shared/modules/MaterialImports/Button';
import { CircularProgress } from '../../../../../shared/modules/MaterialImports/CircularProgress';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { Tooltip } from '../../../../../shared/modules/MaterialImports/ToolTip';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { MaterialReactTable, MRT_ColumnDef } from '../../../../../shared/modules/MaterialReactTable';
import { React, useEffect, useMemo, useState } from '../../../../../shared/modules/React';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import ExpandDetails from '../../../Resume/Community/ExpandDetails/ExpandDetails';
import "./EvaluateApplicantsDrawer.scss";

interface IEvaluateApplicantsDrawer {
    open: boolean;
    closeDrawer: () => void;
    applicantsData: any[];
    refetch: () => void;
    openCandidateView: (candId: any, sourceId: any) => void;
    isEvaluteSettingEnabled: boolean;
    jobCriteriaData: any
    criteriaHeadings: any;
    masterJobData: any;
    totalDBRowCount: number;
    fetchMoreOnBottomReached?: any;
    assignCriteria?: (userIds: number[]) => void;
    isLoading?: boolean;
}
const EvaluateApplicantsDrawer: React.FC<IEvaluateApplicantsDrawer> = (props) => {
    const { open, closeDrawer, applicantsData, refetch, openCandidateView, isEvaluteSettingEnabled, jobCriteriaData, masterJobData, criteriaHeadings, totalDBRowCount, fetchMoreOnBottomReached, assignCriteria, isLoading } = props;
    const [rowSelection, setRowSelection] = useState({});

    const getSlicedCell = (data: string) => {
        const displayTitle = data?.length > 30 ? data.slice(0, 30) : data;
        if (data?.length > 30) {
            return (
                <Tooltip title={data}>
                    <span>{displayTitle}...</span>
                </Tooltip>
            )
        } else return <span>{displayTitle}</span>
    }

    useEffect(() => {
        if (isLoading) {
            if (!!Object.keys(rowSelection)?.length) {
                setRowSelection({});
            }
        }
    }, [isLoading]);

    const columns: MRT_ColumnDef<any>[] = useMemo(() => {
        let defaultColumns: MRT_ColumnDef<any>[] = [
            {
                accessorKey: "candidateName",
                header: "Name",
                Cell: ({ row }) => (
                    <span className="hightLightTd" onClick={() => openCandidateView(row.original.applicantId, row.original.searchId)}>{getSlicedCell(row.original?.candidateName)}</span>
                ),
                size: 200
            }
        ];

        if (isEvaluteSettingEnabled && !!jobCriteriaData?.criteria?.length) {
            let criteriaColumns: MRT_ColumnDef<any>[] = jobCriteriaData.criteria.map((each: any) => {
                return {
                    accessorKey: each.match_criteria.replace(/\s/g, '') + "status",
                    header: each.match_criteria,
                    enableColumnActions: true,
                    Cell: ({ row }: any) => {

                        const accessKey = each.match_criteria.replace(/\s/g, '') + 'status';
                        return (
                            (row.original[accessKey]) ?
                                <Tooltip title={row.original.jobTitle} classes={{ tooltip: "tt-capital" }}>
                                    <span className={`${(row.original[accessKey].trim() === "Match") ? 'Match' : (row.original[accessKey].trim() === "Potential Match") ? 'PotentialMatch' : (row.original[accessKey].trim() === "Not a Match") ? 'NotaMatch' : ''}`}
                                    >
                                        {
                                            row.original[accessKey] === "Match" ?
                                                <ThumbUpOutlinedIcon />
                                                :
                                                row.original[accessKey] === "Potential Match" ?
                                                    <ThumbUpOutlinedIcon />
                                                    :
                                                    row.original[accessKey] === "Not a Match" ?
                                                        <ThumbDownOutlinedIcon />
                                                        :
                                                        "-"
                                        }
                                    </span>
                                </Tooltip>
                                :
                                "-"
                        );
                    },
                    Header: () => <Tooltip title={each.match_criteria}><Typography sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 1,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        pointerEvents: "auto !important",
                        maxWidth: "100% !important"
                    }}>{each.match_criteria}</Typography></Tooltip>,
                    size: 60,
                    muiTableBodyCellProps: {
                        align: "center"
                    },

                };
            })
            return defaultColumns.concat([{
                accessorKey: "criteriaScore",
                header: "Evaluate Score",
                Cell: ({ row }: any) => {
                    return <span>{`${row.original.criteria ? (row.original.scorePercentage ? row.original.scorePercentage : 0) + '%' : ''}`}</span>
                },
                size: 50,
                muiTableBodyCellProps: {
                    align: "center"
                },
            }, ...criteriaColumns]);
        } else return defaultColumns;
    }, []);


    const handleEvaluationClick = () => {
        if (assignCriteria) {
            const validatedRowSelection = Object.entries(rowSelection).filter(([_, value]) => value === true);
            if (!!validatedRowSelection?.length) {
                let userIds = validatedRowSelection.map(([key]) => parseInt(key));
                assignCriteria(userIds);
            } else showToaster("Please selet the candidates to assign evaluation criteria", "error");
        }
    }


    return (
        <>
            {/* {isLoading ? <CircularProgress className='centered' /> : null} */}
            <Drawer open={open} onClose={closeDrawer} anchor='right' id="EvaluateApplicantsDrawer">
                <Box className={`${isLoading ? "loading" : ""}`}>

                    <Stack className='headerContainer' direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                        <Typography variant='h6'>{masterJobData?.jobTitle}</Typography>
                        <IconButton size='small' onClick={closeDrawer}><CloseOutlined color='inherit' /></IconButton>
                    </Stack>

                    <Box className="contentBody">
                        <Box className="MRTableCustom pl-0">
                            <MaterialReactTable
                                columns={columns}
                                data={applicantsData}
                                enablePagination={false}
                                enableRowSelection
                                enableRowVirtualization={false}
                                manualSorting
                                enableHiding
                                enableStickyHeader
                                muiSelectCheckboxProps={(prop) => ({
                                    onChange: (e) => {
                                        if (prop.row.original.applicantId) {
                                            let tempRowSelection: any = { ...rowSelection };
                                            if (e.target.checked) {
                                                tempRowSelection[prop.row.original.applicantId] = e.target.checked;
                                            } else {
                                                if (tempRowSelection.hasOwnProperty(prop.row.original.applicantId)) {
                                                    delete tempRowSelection[prop.row.original.applicantId];
                                                }
                                            }
                                            setRowSelection({ ...rowSelection, [prop.row.original.applicantId]: e.target.checked });
                                        }
                                    }
                                })}
                                muiTableContainerProps={{
                                    onScroll: (
                                        event: any
                                    ) => {
                                        if (fetchMoreOnBottomReached) {
                                            fetchMoreOnBottomReached(event.target as HTMLDivElement)
                                        }
                                    },
                                }}
                                state={{
                                    rowSelection,
                                    columnPinning: { left: ["mrt-row-select", "candidateName"] },
                                    isLoading: isLoading
                                }}
                                getRowId={(row) => row.applicantId}
                                initialState={{
                                    density: 'compact',
                                    showGlobalFilter: true,
                                }}
                                renderBottomToolbarCustomActions={() => (
                                    <Typography>
                                        {applicantsData.length} of {totalDBRowCount}
                                    </Typography>
                                )}
                                renderTopToolbar={
                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} bgcolor={"#fafafa"} px={0.5}>
                                        {isEvaluteSettingEnabled ? <Tooltip title="Evaluate">
                                            <Button
                                                variant="text"
                                                color='secondary'
                                                size='large'
                                                disabled={Object.entries(rowSelection).filter(([_, value]) => value === true).length > 0 ? false : true}
                                                onClick={handleEvaluationClick}
                                                startIcon={<FactCheckOutlined />} />
                                        </Tooltip> : null}
                                        <Tooltip title='Refresh'>
                                            <IconButton color="primary" onClick={
                                                async () => { refetch() }
                                            }><RefreshOutlined /></IconButton>
                                        </Tooltip>
                                    </Stack>
                                }
                                positionExpandColumn={(isEvaluteSettingEnabled && masterJobData?.criteriaEvaluation) ? "last" : undefined}
                                renderDetailPanel={(isEvaluteSettingEnabled && masterJobData?.criteriaEvaluation) ? ({ row }) => {
                                    const isExpanded = row.getIsExpanded()
                                    if (!!jobCriteriaData?.criteria?.length && !!row?.original?.candidateCriteria?.length) {
                                        return isExpanded ? <ExpandDetails headingList={criteriaHeadings} candidateData={row.original} isInDrawer={true} /> : <></>
                                    }
                                    else return undefined;
                                } : undefined}
                                muiDetailPanelProps={{ colSpan: columns.length + 2, sx: { background: "#fafafa" } }}
                                muiExpandButtonProps={({ row, table }) => ({
                                    onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), //set only this row to be expanded
                                })}
                                muiExpandAllButtonProps={() => ({ className: "d-none" })}
                                icons={{
                                    ArrowDownwardIcon: (props: any) => <SwitchLeft  {...props} />
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}

export default EvaluateApplicantsDrawer;