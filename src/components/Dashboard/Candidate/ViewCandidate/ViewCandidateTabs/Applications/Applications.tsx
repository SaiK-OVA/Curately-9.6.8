import { lazy, useMemo, useRef, useState } from './../../../../../../shared/modules/React';
import { DateTime } from './../../../../../../shared/modules/Luxon';


import { Box } from './../../../../../../shared/modules/MaterialImports/Box';
import { Tooltip } from './../../../../../../shared/modules/MaterialImports/ToolTip';
import { MaterialReactTable, MRT_ColumnDef } from './../../../../../../shared/modules/MaterialReactTable';

import { globalData } from '../../../../../../shared/services/globalData';

import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

const WorkflowCandidateView = lazy(() => import('./WorkflowCandidateView/WorkflowCandidateView'));
//import Tooltip from "@mui/material/Tooltip";
// import SchemaIcon from '@mui/icons-material/Schema';

import './Applications.scss';

const Applications = ({ ApplicationList }: { ApplicationList: any }) => {

    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }

    const applicantData = useRef({
        workflowCandidateId: '',
        workflowJobId: '',
        stageId: ''
    });


    const openWorkflowView = (wCId: string, jobId: string, stageId: string) => {
        applicantData.current = {
            workflowCandidateId: wCId,
            workflowJobId: jobId,
            stageId: stageId
        };

        setIsWorkflowPreviewOpen(true);
    }

    const [isWorkflowPreviewOpen, setIsWorkflowPreviewOpen] = useState(false);


    const columns: MRT_ColumnDef<(typeof ApplicationList)[0]>[] = useMemo(
        () => [
            {
                accessorKey: "jobTitle",
                enableColumnPinning: true,
                header: "Job Title",
                Cell: ({ row }) => {
                    let jobtitle = (row.original.jobTitle) ? row.original.jobTitle.toLowerCase() : "";
                    let displayTitle = jobtitle.length > 30 ? jobtitle.slice(0, 30) + "..." : jobtitle;
                    return (
                        <Tooltip title={jobtitle} classes={{ tooltip: 'tt-capital' }}>
                            <span
                                className="hightLightTd ellipsisText"
                                onClick={() => openJobView(row.original.jobId)}
                            >
                                {displayTitle}
                            </span>
                        </Tooltip>
                    );
                },
                size: 220,

            },
            {
                accessorKey: 'statusName',
                header: ' Status',
            },

            {
                accessorKey: 'createdDate',
                header: 'Date',
                Cell: ({ row }) => (
                    <span>
                        {row?.original?.createdDate ? DateTime.fromFormat(row.original.createdDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy ') : ""}
                        {/* hh:mm:ss */}
                    </span>
                ),
            },

            {
                accessorKey: 'source',
                header: 'Source',
            },
            {
                accessorKey: "workflowJobCandId",
                header: "Workflow",
                Cell: ({ row }) => (row?.original?.workFlowName) ? (
                    // <SchemaIcon className='hightLightTd' onClick={() => openWorkflowView(row.original.workflow_job_cand_id)} />
                    (row?.original?.workflowJobCandId ? <span className="hightLightTd ellipsisText" onClick={() => openWorkflowView(row.original.workflowJobCandId, row.original.jobId, row.original.stageId)}>
                        {row.original.workFlowName}
                    </span> : <span className="ellipsisText" >
                        {row.original.workFlowName}
                    </span>)
                ) : null,
                size: 190
            },

            // {
            //     accessorKey: 'round',
            //     header: 'Round',
            // },
            // {
            //     accessorKey: 'hiringmanager',
            //     header: 'Interviewers',
            // },
            // {
            //     accessorKey: 'recruitername',
            //     header: 'Created by',
            // }

        ],

        []
    );

    return (
        <Box className="Application">
            {/*<Card sx={{ padding: "10px" }}>
                 <Box className="card-header">
                    <Typography variant="h6" sx={{ textTransform: 'uppercase', color: '#7d62ef', marginTop: '5px' }}>Interviewed Candidates</Typography>
                </Box>
                <Box className="interview-container">
                     {ApplicationList.map((candidate: any, i: number) => (

                        <Stack direction="row" spacing={2} className="i-stack mb-3" key={i} >
                            <Box className="round">
                                <VideocamIcon sx={{ color: '#3e566d', fontSize: '40px', marginTop: '5px' }} />
                                <Typography className="round-label">{candidate.round}</Typography>
                            </Box>
                            <Box className="interviewed-box">
                                <Box className="box-inner">
                                    <Typography className="name candidate">{candidate.candname}</Typography>
                                    <Box className="date-time">
                                        <Chip icon={<CalendarMonthOutlinedIcon />} label={candidate.intdate.substring(0, candidate.intdate.indexOf(' '))} variant="outlined" sx={{ border: '0' }} />
                                        <Chip icon={<AccessAlarmOutlinedIcon />} label={candidate.intdate.substring(candidate.intdate.indexOf(' ') + 1)} variant="outlined" sx={{ border: '0' }} />
                                    </Box>
                                </Box>
                            </Box>
                            <Box className="interviewed-box">
                                <Box className="box-inner">
                                    <Typography className="name">Interviewed By</Typography>
                                    <Typography className="details">{candidate.interviewers}</Typography>
                                </Box>
                            </Box>
                            <Box className="interviewed-box">
                                <Box className="box-inner">
                                    <Typography className="name">Created By</Typography>
                                    <Typography className="details">{candidate.createdby}</Typography>
                                </Box>
                            </Box>
                            <Box className="interviewed-box">
                                <Box className="box-inner">
                                    {candidate.intstatus === ""}
                                    <Button className="btn-status">{candidate.status}</Button>
                                </Box>
                            </Box>
                            <Box className="interviewed-box">
                                <Box className="box-inner">
                                    <Button className="btn-details" variant="outlined" startIcon={<RemoveRedEyeIcon />}>View Details</Button>
                                </Box>
                            </Box>
                        </Stack>
                    ))} 

                </Box>
            </Card >*/}

            <div className="MRTableCustom pl-0">
                <MaterialReactTable
                    columns={columns}
                    // enableRowSelection
                    data={ApplicationList} //pass our managed row selection state to the table to use
                    enablePinning
                    enableStickyHeader
                    initialState={{
                        density: 'compact',
                        showGlobalFilter: true,
                    }}
                    enableColumnResizing
                    enableGlobalFilterModes
                    columnResizeMode="onChange"
                    icons={{
                        ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                    }}
                />
            </div>

            {
                isWorkflowPreviewOpen ?
                    <WorkflowCandidateView
                        open={isWorkflowPreviewOpen}
                        closePopup={() => {
                            applicantData.current = {
                                workflowCandidateId: '',
                                workflowJobId: '',
                                stageId: ''
                            };
                            setIsWorkflowPreviewOpen(false);
                        }}
                        applicantData={applicantData.current}
                    />
                    :
                    null
            }

        </Box >
    )
}

export default Applications