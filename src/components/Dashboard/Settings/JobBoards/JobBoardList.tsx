import { useEffect, useMemo, useState } from "../../../../shared/modules/React";
// import { userLocalData } from "../../../../shared/services/userData";
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import ApiService from "../../../../shared/api/api";
import { DateTime } from '../../../../shared/modules/Luxon';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '../../../../shared/modules/MaterialImports/Divider';
import { Loader } from "../../../shared/Loader/Loader";
import { Dialog, DialogContent, DialogTitle } from '../../../../shared/modules/MaterialImports/Dialog';

import { showToaster } from '../../../shared/SnackBar/SnackBar';

import JobApplicantsView from "../../Settings/JobBoards/JobApplicantsView";
import './JobBoardList.scss'
import { GetFormattedJobBoardData } from "./JobBoards";


const JobBoardList = (
    { open, closePopup, boardData }: {
        open: boolean;
        closePopup: () => void;
        boardData: any
    }
) => {
    const [listJobBoardDetails, setListJobBoardDetails] = useState<any[]>([]);
    const [listJobApplicantDetails, setListJobApplicantDetails] = useState<any[]>([]);

    const [openJobApplicantsModal, SetOpenJobApplicantsModal] = useState(false);
    // const recrID = userLocalData.getvalue('recrId');
    const [portalName, setPortalName] = useState<any>();
    const [applicantCount, setApplicantCount] = useState(0);


    const closeJobApplicantsModal = () => {
        SetOpenJobApplicantsModal(false);
    }

    const JobBoardDetailsData = () => {
        trackPromise(
            ApiService.getCall('admin', 'listAllPublishedJobs').then((response) => {
                const tempIndex = response.data.idibu.response?.jobs?.job.findIndex((item: { id: number }) => item.id == boardData.jobId);
                let PortName = response.data.idibu.response?.jobs?.job[tempIndex].title + "( Ref: " + response.data.idibu.response?.jobs?.job[tempIndex].reference + ")";
                setPortalName(PortName);
                const tempPortal = GetFormattedJobBoardData(response.data.idibu.response?.jobs?.job[tempIndex].portals.portal)
                setListJobBoardDetails(tempPortal);

                // let tempData = response.data.idibu.response?.jobs?.job[tempIndex].portals.portal;
                let aCounts = 0;
                for (let ap = 0; ap < tempPortal.length; ap++) {
                    aCounts = aCounts + tempPortal[ap].applicants;
                }
                setApplicantCount(aCounts);
            })
        )
    }
    // const JobBoardIDDetailsData = () => {

    //     trackPromise(
    //         ApiService.postWithData('admin', 'idibu/getJobDetailsByReferenceOrJobId', {"jobId":boardData.jobId} ).then((response) => {
    //             if (response.data.Status === 200) {
    //                 console.log(response.data);
    //           //  const tempIndex = response.data.idibu.response?.jobs?.job.findIndex((item: { id: number }) => item.id == boardData);
    //           //  setPortalName(response.data.idibu.response?.jobs?.job[tempIndex].title)
    //             setListJobBoardDetails(response.data.idibu.response?.jobs?.job?.portals.portal);
    //             let tempData = response.data.idibu.response?.jobs?.job?.portals.portal;
    //             let aCounts = 0;
    //             for (let ap = 0; ap < tempData.length; ap++) {
    //                 aCounts = aCounts + tempData[ap].applicants;                   
    //             }
    //             setApplicantCount(aCounts);
    //           } else {
    //                 showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
    //             }
    //         })

    //     )
    // }


    const JobBoardApplicantsData = (jobId: any, BoardId: any) => {

        let tempdata = (BoardId) ?
            {
                "jobId": jobId,
                "innerPortalId": BoardId
            }
            :
            {
                "jobId": jobId,
            }

        trackPromise(
            ApiService.postWithData('admin', 'getApplicantByJobIdBoardId', tempdata).then((response) => {
                if (response.data.Status === 200) {
                    //  console.log(response.data.idibu.response?.total);
                    //  const tempIndex = response.data.idibu.response?.jobs?.job.findIndex((item: { id: number }) => item.id == boardData);
                    //  setPortalName(response.data.idibu.response?.jobs?.job[tempIndex].title)
                    let tempResponse = response.data.idibu.response;
                    tempResponse.applicants.applicant = GetFormattedJobBoardData(tempResponse.applicants.applicant)
                    setListJobApplicantDetails(tempResponse);
                    SetOpenJobApplicantsModal(true);
                } else {
                    showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                }
            })
        )
    }

    useEffect(() => {
        JobBoardDetailsData();
        ///   JobBoardIDDetailsData();
    }, [])



    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'Portal ID',
                size: 60,
            },
            {

                accessorKey: 'name',
                header: 'Portal Name',
            },
            {

                accessorKey: 'applicants',
                header: 'Applicants Count',
                Cell: ({ row }) => (
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => JobBoardApplicantsData(boardData.jobId, row.original.id)}
                    >
                        {row.original.applicants}
                    </Link>
                )
            },
            {
                accessorKey: 'expiry',
                header: 'Expiry',
                muiTableHeadCellProps: {
                    align: 'left',

                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
                Cell: ({ row }) => (
                    <span>
                        {row.original.expiry ? DateTime.fromFormat(row.original.expiry.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""}
                    </span>

                )
            },

            {
                accessorKey: 'status',
                header: 'Status',
                muiTableHeadCellProps: {
                    align: 'left',
                },
                muiTableBodyCellProps: {
                    align: 'left',
                },
                // Cell: ({ row }) => (
                //     row.original.sub_location.content && <span className="tt-lower">{row.original.sub_location.content} </span>
                // )
            },

            // {
            //     accessorKey: "Actions",
            //     header: "Actions",
            //     Cell: ({ row }) => (
            //         <Stack key={row.original.id}>
            //             <Stack direction={"row"}>

            //                 <Tooltip title="View Job Board" placement="top" color="primary">
            //                     <IconButton onClick={() => PublishBoardDetailsData(row.original.id)}>
            //                         <EditIcon />
            //                     </IconButton>
            //                 </Tooltip>

            //             </Stack>

            //         </Stack>
            //     )
            // },
        ], []

    );

    return (
        <Dialog
            maxWidth={'xl'}
            fullWidth={true} open={open} id='JobBoardsList'
        >      <Loader />
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        Job Portal Details - {portalName}
                    </span>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                        >

                            <CloseIcon onClick={() => closePopup()} />
                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent className='py-0 pt-0'>
                <div className="MRTableCustom pl-0">

                    <MaterialReactTable
                        columns={columns}
                        data={listJobBoardDetails}
                        enablePinning
                        initialState={{
                            columnPinning: { left: ["mrt-row-select"] },
                            density: "compact",
                            showGlobalFilter: false
                        }}
                        enableDensityToggle={false}
                        enableFullScreenToggle={false}

                        enableGlobalFilterModes
                        columnResizeMode="onChange"
                        getRowId={row => row.id}

                        enableStickyHeader
                        icons={{
                            ArrowDownwardIcon: (props: any) => (
                                <SwitchLeftIcon {...props} />
                            ),
                        }}
                        renderTopToolbarCustomActions={(
                            // { table }
                        ) => (
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                width="98%"
                            >
                                <span className='addHeader'>

                                </span>
                                <div>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="end"
                                        alignItems="center"
                                    >
                                        {/* <Button
                                color="primary"
                                onClick={() => JobBoardApplicantsData(boardData.jobId, '')}
                                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                              //  onClick={handleExportData}
                              //  startIcon={<FileDownloadIcon />}
                                variant="contained"
                              >
                                {applicantCount} Applicants
                              </Button> */}

                                    </Grid>
                                </div>
                            </Grid>

                        )}
                    />
                </div>


                {openJobApplicantsModal ? (
                    <JobApplicantsView
                        open={openJobApplicantsModal}
                        closePopup={closeJobApplicantsModal}
                        ApplicantsData={listJobApplicantDetails}
                        portalName={portalName}
                    />
                ) : null}


            </DialogContent>
        </Dialog >
    )
}

export default JobBoardList;