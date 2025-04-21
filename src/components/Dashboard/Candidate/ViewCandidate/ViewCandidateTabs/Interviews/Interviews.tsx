import { useMemo } from '../../../../../../shared/modules/React';

import { globalData } from '../../../../../../shared/services/globalData';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Tooltip } from '../../../../../../shared/modules/MaterialImports/ToolTip';
import { MaterialReactTable, type MRT_ColumnDef } from '../../../../../../shared/modules/MaterialReactTable';

import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

import './Interviews.scss';
import { DateTime } from 'luxon';
import masterJobStatus from '../../../../../../shared/data/JobStatus';


const Interviews = ({ candidatesList }: { candidatesList: any }) => {

    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }

    const columns: MRT_ColumnDef<(typeof candidatesList)[0]>[] = useMemo(
        () => [
            {
                accessorKey: 'statusDate',
                header: 'Status Date',
                // header: 'Interview Date',
                Cell: ({ row }) => (
                    <span>
                        {row.original.statusDate ? DateTime.fromFormat(row.original.statusDate?.substring(0, 16), 'yyyy-MM-dd hh:mm').toFormat('MM/dd/yyyy hh:mm a') : ''}

                    </span>
                ),
            },
            {
                accessorKey: 'jobTitle',
                header: 'Job Title',
                Cell: ({ row }) => (
                    <Tooltip title={row.original.jobTitle} classes={{ tooltip: 'tt-capital' }}>
                        <span className="hightLightTd" onClick={() => openJobView(row.original.jobId)}>{row.original.jobTitle}</span>
                    </Tooltip>
                ),
                size: 240
            },

            {
                accessorKey: 'statusName',
                header: 'Status',
            },

            {
                accessorKey: 'jobStatus',
                header: 'Job Status',
                Cell: ({ row }) => (
                    <span>
                        {row.original.jobStatus ? masterJobStatus.getNameById(row.original.jobStatus) : ''}
                    </span>
                )
            },
            // {
            //     accessorKey: 'timezonetemp',
            //     header: 'Interview Time',
            // },

            // {
            //     accessorKey: 'clientName',
            //     header: 'End client',
            // },

            // {
            //     accessorKey: 'reqno',
            //     header: 'Client JobID',
            // },
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
        <Box className="interview">
            {/*<Card sx={{ padding: "10px" }}>
                 <Box className="card-header">
                    <Typography variant="h6" sx={{ textTransform: 'uppercase', color: '#7d62ef', marginTop: '5px' }}>Interviewed Candidates</Typography>
                </Box>
                <Box className="interview-container">
                     {candidatesList.map((candidate: any, i: number) => (

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
                    data={candidatesList} //pass our managed row selection state to the table to use
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

        </Box >
    )
}

export default Interviews