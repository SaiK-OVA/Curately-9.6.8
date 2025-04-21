import { useState, useEffect, useMemo } from "../../../../shared/modules/React";
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {Grid} from '../../../../shared/modules/MaterialImports/Grid';
import { DateTime } from '../../../../shared/modules/Luxon';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { userLocalData } from '../../../../shared/services/userData';
import ApiService from '../../../../shared/api/api';
import { globalData } from "../../../../shared/services/globalData";
import {Stack} from "../../../../shared/modules/MaterialImports/Stack";
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import HiringVolumeFilters from "./HiringVolumeFilters/HiringVolumeFilters";
import './HiringVolumeApplicants.scss';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const HiringVolumeApplicants = () => {

    const [candidateApplicants, setCandidateApplicants] = useState([
        // {
        //     candid: 38189,
        //     candname: "Jeffrey Ryan",
        //     workflow_job_cand_id: 116,
        //     workflow_job_id: 813,
        //     jobid: 2024,
        //     jobtitle: "IT Systems Analyst Advisor",
        //     workflowid: 6,
        //     WorkFlowName: "Testing Clone",
        //     Savedt: "2024-02-19 06:18:07.0",
        //     StageName: "Trigger, Approved, Rejected, On Hold",
        //     clientId: 3
        // }
    ]);

    const [filtersExpand, setFiltersExpand] = useState(false);
    const [filters, setFilters] = useState({
        job: "",
        workflow: ""
    });

    //http://localhost:3002/#/qademo/candidate/view/38189


    const openCandidateView = (id: string) => {
        window.open(globalData.getWindowLocation() + "candidate/view/" + id);
    }
    const loadApplicantsHighVolumeHiring = () => {
        let clientId = userLocalData.getvalue('clientId');
        const requestData = {
            startDate: DateTime.now().minus({ month: 6 }).toFormat('MM/dd/yyyy'),
            endDate: DateTime.now().toFormat('MM/dd/yyyy'), 
            // "2024-02-19",
            clientId: clientId
        };
        trackPromise(
            ApiService.postWithData('admin', 'applicantsHighvolumeHiring', requestData)
                .then((response) => {
                    console.log(response);
                    setCandidateApplicants((response.data?.ApplicantsHighvolumeHiring?.length ? response.data.ApplicantsHighvolumeHiring : []) );
                })
                .catch((error) => {
                    console.error("Error fetching applicants:", error);
                })
        );
    };


    useEffect(() => {
        loadApplicantsHighVolumeHiring();
    }, []);


    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: "candname",
                header: "Name",
                Cell: ({ row }) => (
                    <span className="hightLightTd" onClick={() => openCandidateView(row.original.candid)}>{row.original.candname.toLowerCase()}</span>

                ),
            },
            {
                accessorKey: "jobtitle",
                header: "Job",
                Cell: ({ row }) => (
                    <span>{row.original.jobtitle}</span>
                ),
            },
            {
                accessorKey: "WorkFlowName",
                header: "Workflow",
                Cell: ({ row }) => (
                    <span>{row.original.WorkFlowName}</span>
                ),
            },
            {
                accessorKey: "StageName",
                header: "Stages",
                Cell: ({ row }) => {
                    const stages = row.original.StageName.split(', ');
                    return (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {stages.map((stage: any, index: any) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    {/* <CheckCircleOutlineIcon style={{ fontSize: 15, marginRight: 5, color: '#1f8f94' }} /> */}
                                    {stage}
                                </div>
                            ))}
                        </div>
                    );
                }
            },
            {
                accessorKey: "Savedt",
                header: "Date",
                Cell: ({ row }) => (
                    <span>
                        {DateTime.fromFormat(
                            row.original.Savedt.substring(0, 19),
                            "yyyy-MM-dd hh:mm:ss"
                        ).toFormat("MM/dd/yyyy ")}
                    </span>
                ),
            },
            // {
            //     accessorKey: "actions",
            //     header: "Actions",
            //     Cell: ({ row }) => (
            //         <Stack direction="row" spacing={1}>
            //             <Tooltip title="Edit">
            //                 <IconButton color="primary" onClick={() => {/* Edit functionality here */}}>
            //                     <EditIcon />
            //                 </IconButton>
            //             </Tooltip>
            //             <Tooltip title="Delete">
            //                 <IconButton color="secondary" onClick={() => deleteUserContactInfo(row.original.candid, row.original.clientId)}>
            //                     <DeleteOutlineIcon />
            //                 </IconButton>
            //             </Tooltip>
            //         </Stack>
            //     ),
            // },
        ],
        []
    );

    const handleSearch = (data: any) => {
        setFilters({
            job: data.job,
            workflow: ''
        });
        // }
    }

    return (
        <div id="hiringVolumeApplicants">
            <Grid container className="customCard p-0 filterExpand-grid mt-4">
                <Grid sx={{ width: filtersExpand ? 0 : 310, overflow: 'hidden', opacity: filtersExpand ? 0 : 1 }}>
                    <Stack direction='row' className='applicantsFilterHead'>
                        <GroupOutlinedIcon />
                        <Typography component="h5">Applicants</Typography>
                    </Stack>
                    <HiringVolumeFilters onSearch={handleSearch} onFiltersChange={filters} />
                </Grid>
                <Grid sx={{ width: filtersExpand ? 'calc(100%)' : 'calc(100% - 310px)' }}>
                    <div className={`MRTableCustom ${filtersExpand ? 'pl-0' : ''}`}>

                        <div className="MRTableCustom pl-0">
                            

                            <MaterialReactTable
                                columns={columns}
                                data={candidateApplicants}
                                initialState={{
                                    density: 'compact',
                                    showGlobalFilter: false,
                                }}
                                enableFilters={false}
                                enableGlobalFilterModes
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default HiringVolumeApplicants;
