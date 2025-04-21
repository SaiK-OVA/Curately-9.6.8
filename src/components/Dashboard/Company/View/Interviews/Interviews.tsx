import { useState, useEffect, useMemo } from '../../../../../shared/modules/React';
// import Typography from '@mui/material/Typography'
import {Box} from '../../../../../shared/modules/MaterialImports/Box';
// import Card from '@mui/material/Card';
// import Chip from '@mui/material/Chip';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
// import VideocamIcon from '@mui/icons-material/Videocam';
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
// import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import  { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";
import ApiService from "../../../../../shared/api/api";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';


import './Interviews.scss'

import { useParams } from 'react-router-dom';
import { globalData } from '../../../../../shared/services/globalData';

const Interviews = () => {
    const { companyId } = useParams();
    const [interviewsList, setInterviewsList] = useState<any>([]);

    const loadinterviews = () => {
        ApiService.getByParams(193, 'Company/interview_json.jsp', { compId: companyId }).then(
            (response: any) => {
                // console.log(response)
                setInterviewsList(response.data);
            }
        )
    }

    // const openView = (id: string) => {
    //     window.open(globalData.getWindowLocation() + "job/view/" + id);
    // }

    // intId
    // candid
    // searchid
    // jobid
    // job
    // candStatusId
    // candstatus
    // intDate
    // candName
    // intType
    // round
    // interviewers
    // createdBy
    // intStatus
    // actions
    // intFlag


    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }


    const columns: MRT_ColumnDef<(typeof interviewsList)[0]>[] = useMemo(
        () => [
            {
                accessorKey: 'intDate',
                header: 'Interview Date',
            },
            // {
            //     accessorKey: 'timezonetemp',
            //     header: 'Interview Time',
            // },

            {
                accessorKey: 'candName',
                header: 'End client',
            },

            {
                accessorKey: 'job',
                header: 'Job',
                Cell: ({ renderedCellValue, row }) => (
                    <span className="hightLightTd" onClick={() => openJobView(row.original.jobid)}>{row.original.job.toLowerCase()}</span>
                )
            },
            {
                accessorKey: 'round',
                header: 'Round',
            },
            {
                accessorKey: 'interviewers',
                header: 'Interviewers',
            },

            {
                accessorKey: 'intStatus',
                header: 'Status',
            },
            {
                accessorKey: 'createdBy',
                header: 'Created by',
            },

            // {
            //     accessorKey: 'job',
            //     header: 'Job',
            //     Cell: ({ renderedCellValue, row }) => (
            //         <span className="hightLightTd" onClick={() => openView(row.original.jobid)}>{row.original.job}</span>
            //     ),
            //     // jobid
            // },

        ],

        []
    );

    useEffect(() => {
        loadinterviews();
    }, [companyId]);

    return (
        <Box className="interview">
            {/*<Card sx={{ padding: "10px" }}>
                 <Box className="card-header">
                    <Typography variant="h6" sx={{ textTransform: 'uppercase', color: '#7d62ef', marginTop: '5px' }}>Interviewed Candidates</Typography>
                </Box>
                <Box className="interview-container">
                     {interviewsList.map((candidate: any, i: number) => (

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
                    enableRowSelection
                    data={interviewsList} //pass our managed row selection state to the table to use
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