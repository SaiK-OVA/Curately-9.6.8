import { useEffect, useState } from '../../../../shared/modules/React'
import { useParams } from 'react-router-dom';
// import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import {Grid} from '../../../../shared/modules/MaterialImports/Grid';
import ApiService from '../../../../shared/api/api';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import { getStageIcon } from '../../../../shared/modules/stageicon';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import Carousel from 'react-multi-carousel';
// import { NavigateBefore, NavigateNext } from '@mui/icons-material';

// import FilterStage from './FilterStage/FilterStage';
// import WorkflowCellHtml from './ColumnsData';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';


// import { globalData } from '../../../../shared/services/globalData';

// import { DateTime } from 'luxon';
// import VideoPreview from './VideoPreview/VideoPreview';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';

// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';


import './Workflow.scss';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import ShareIcon from '@mui/icons-material/Share';
// import CloseIcon from '@mui/icons-material/Close';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { confirmDialog } from '../../../shared/ConfirmDialog/ConfirmDialog';
import { userLocalData } from '../../../../shared/services/userData';
import VirtualScrollWorkflow from './VirtualScrollWorkflow';
import { DataCollectionQAsDialog } from './DataCollectionQAs';
import { Tab, Tabs } from './../../../../shared/modules/MaterialImports/Tabs';
import { Menu, MenuItem } from './../../../../shared/modules/MaterialImports/Menu';
import { DocumentViewDialog } from '../../../../shared/components/DocumentView/DocumentView';

export interface StageInterface {
    stageTypeId: string;
    noOfCandidates: string;
    name: string;
    position: string;
    title: string;
    stageId: string;
    countToShow: string;
    isCountLoading: boolean;
}



const Workflow = () => {
    const { jobId } = useParams();

    // const [candidatesData, setCandidatesData] = useState([]);
    // const [isCandidateDataLoaded, setIsCandidateDataLoaded] = useState(false);
    // const [filteredCandidatesIds, setFilteredCandidatesIds] = useState<String[]>([]);


    // const [showVideoPreview, setShowVideoPreview] = useState(false);
    // const [videoPreviewLink, setVideoPreviewLink] = useState('');



    const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
    const openAddToListenBtn = Boolean(addtolistanchorEl);

    useEffect(() => {
        console.log(openAddToListenBtn);
    }, [openAddToListenBtn])



    const [workflowData, setWorkflowData] = useState({
        jobid: "",
        workflowName: "",
        workflow_job_id: "",
        workflowId: ""
    });
    const [stageIds, setStageIds] = useState({
        rejected: "",
        approved: "",
        onHold: ""
    });

    const [selectedStage, setSelectedStage] = useState<StageInterface>({
        stageTypeId: "",
        noOfCandidates: "",
        name: "",
        position: "",
        title: "",
        stageId: "",
        countToShow: "",
        isCountLoading: false
    });

    const [currentTabIndex, setCurrentTabIndex] = useState<boolean | number>(false);


    const handleTabChange = (e: any, tabIndex: number) => {
        console.log(tabIndex);
        setCurrentTabIndex(tabIndex);
    };

    const [selectedCandidateData, setSelectedCandidateData] = useState<any>({});

    // const [stagesToMove, setStagesToMove] = useState<StageInterface[]>([]);

    // const noOfSildesToDisplay = Math.round(100 / Math.round(window.innerWidth / 225));

    const [masterStagesList, setMasterStagesList] = useState<StageInterface[]>([]);




    const handleProfileMenuClose = () => {
        setAddToListAnchorEl(null);
    };

    const loadStagesData = () => {
        trackPromise(
            ApiService.getByParams(193, 'Curately/Workflow/workflow_job_stages_list.jsp', { jobId: jobId, clientId: userLocalData.getvalue('clientId') })
                .then((response) => {
                    // console.log(response);
                    setWorkflowData({
                        jobid: response.data.jobid,
                        workflowName: response.data.workflowName,
                        workflow_job_id: response.data.workflow_job_id,
                        workflowId: response.data.workflowId,
                    });
                    let stagesList: StageInterface[] = response.data.stages;
                    stagesList = stagesList.sort((a: StageInterface, b: StageInterface) => parseFloat(a.position) - parseFloat(b.position));
                    stagesList = stagesList.filter((i) => {
                        return ((i.stageTypeId !== "1") && i.stageTypeId !== "11")
                    });
                    if (stagesList && stagesList.length) {
                        let tempReject = stagesList.find(o => o.stageTypeId === "6");
                        let tempOnHold = stagesList.find(o => o.stageTypeId === "7");
                        let tempAccepted = stagesList.find(o => o.stageTypeId === "2");
                        setStageIds({
                            rejected: tempReject ? tempReject.stageId ? tempReject.stageId : "" : "",
                            onHold: tempOnHold ? tempOnHold.stageId ? tempOnHold.stageId : "" : "",
                            approved: tempAccepted ? tempAccepted.stageId ? tempAccepted.stageId : "" : ""
                        });
                    }
                    for (let sl = 0; sl < stagesList.length; sl++) {
                        stagesList[sl].isCountLoading = true;

                    }
                    // setMasterStagesList(stagesList);
                    // columns.;

                    // getCandidatesData(stagesList);
                    getStageCandidatesCount(stagesList);
                    setTimeout(() => {
                    }, 250);
                })
        )
    }

    const getStageCandidatesCount = async (list: StageInterface[]) => {
        console.log(list)
        for (let sl = 0; sl < list.length; sl++) {
            // list[sl].countToShow;
            if (!list[sl].countToShow) {
                await trackPromise(
                    ApiService.getByParams(193, 'Curately/Workflow/workflow_applicants_view_count.jsp', { jobId, stageId: list[sl].stageId, clientId: userLocalData.getvalue('clientId') })
                        .then((response) => {
                            list[sl].countToShow = response.data.totalSize;
                            list[sl].isCountLoading = false;
                        })
                )
            }
        }
        console.log(list)
        setMasterStagesList(list);
    }



    const moveToStage = (toStageId: string) => {
        let logData = {
            workflow_job_cand_id: selectedCandidateData.workflow_job_cand_id,
            candid: selectedCandidateData.candid,
            fromstage: selectedCandidateData.stageid,
            tostage: toStageId,
            recrid: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId')
        }
        trackPromise(
            ApiService.getByParams(193, 'Curately/Workflow/workflow_candidate_next_stage.jsp',
                {
                    workflow_job_cand_id: selectedCandidateData.workflow_job_cand_id,
                    stageId: selectedCandidateData.stageid,
                    stageNumber: selectedCandidateData.position,
                    stageId1: toStageId,
                    clientId: userLocalData.getvalue('clientId')
                }
            ).then(
                (response) => {
                    if (response.data.message === "Success") {
                        ApiService.postWithData('admin',
                            'applicantsStagesMoveLogs',
                            logData
                        ).then(
                            (response) => {
                                if (response.data.Success) {

                                } else {
                                    showToaster(response.data.message, 'error');
                                }
                            }
                        )
                    } else {
                        showToaster(response.data.message, 'error');
                    }
                }
            )
        )
    }


    useEffect(() => {
        if (!masterStagesList.length) {
            loadStagesData();
        }
    }, []);

    useEffect(() => {
        console.log(masterStagesList);
    }, [masterStagesList]);

    useEffect(() => {
        console.log(workflowData);
    }, [workflowData]);




    function tabProperties(index: number) {
        return {
            id: `sourceTabs-${index}`,
            'aria-controls': `sourceTabsPanel-${index}`,
        };
    }



    return (
        <div className='jobWorkflow pr-1'>
            <Grid className='customCard p-0' sx={{ minHeight: 'auto !important', width: 'calc(100% - 16px) !important' }}>
                <Tabs value={currentTabIndex} onChange={handleTabChange} aria-label="View Sourced Tabs" scrollButtons="auto" variant="scrollable" id=" viewSourcedTab">
                    {masterStagesList.map((item: any) => (
                        <Tab
                            key={item.stageId}
                            label={
                                <Grid container direction="column" alignContent='center'>
                                    {
                                        (item.countToShow > 0) ?
                                            <div className='statusCount'>
                                                {
                                                    (item.isCountLoading) ?
                                                        <CircularProgress color="success" /> :
                                                        (item.countToShow) ?
                                                            <span>{item.countToShow}</span>
                                                            :
                                                            <span>&nbsp;</span>
                                                }
                                                <div className='statusLabel fw-7'>{(item.title) ? item.title : item.name}</div>
                                            </div>
                                            :
                                            <div>
                                                <span>{item.countToShow}</span>
                                                <div className='statusLabel'>{(item.title) ? item.title : item.name}</div>
                                            </div>

                                    }

                                </Grid>
                            }
                            {...tabProperties(0)}
                            className='sourceTab'
                            onClick={() => {
                                // getCandidatesData(item, [])
                                setSelectedStage(item);
                            }}
                        />
                    ))}

                </Tabs>

                <div className="candidatesList MRTableCustom pl-0">
                    {
                        masterStagesList.map(
                            (item: any) => (
                                <div key={item.stageId}>
                                    {
                                        (item.stageId === selectedStage.stageId) ?
                                            <VirtualScrollWorkflow
                                                masterStagesList={masterStagesList}
                                                selectedStage={selectedStage}
                                                stageIds={stageIds}
                                                totalCount={Number(item.countToShow)}
                                                workflowData={workflowData}
                                                refetchData={loadStagesData}
                                            />
                                            : null
                                    }
                                </div>
                            )
                        )
                    }
                </div>
            </Grid>
            {/* <div className='container'>
                <div className="carousel carousel-slider">
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <div className='carousel'>
                            <Carousel responsive={responsive}>
                                {masterStagesList.map((li: StageInterface, index) => {
                                    return (
                                        <div className='pl-2' key={li.stageId}>
                                            <Card className={`mt-3 ${(selectedStage.stageId === li.stageId) ? "bg-lightGrey" : ""}`} sx={{ width: '205px', height: '105px' }}>
                                                <CardContent className='pb-3'>
                                                    <div style={{ textAlign: 'left' }}>
                                                        <div className='stageTitle'>
                                                            <span className='getStageIcon'>{getStageIcon((li.stageTypeId))}</span>
                                                            <span className='pl-2'>{li.title}</span>
                                                        </div>
                                                        <div>{li.name}</div>
                                                        <div className='text-center'>
                                                            {
                                                                (li.isCountLoading) ?
                                                                    <CircularProgress color="success" /> :
                                                                    (li.countToShow) ?
                                                                        <Button size="small" onClick={() => getCandidatesData(li, [])} className='mt-3'>{li.countToShow}</Button>
                                                                        :
                                                                        <span>&nbsp;</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )
                                })}

                            </Carousel>
                        </div>
                    </Grid>
                </div>
            </div> */}
            {/* <div className='MRTableCustom'>
                {
                    selectedStage.stageId && isCandidateDataLoaded ?

                        <MaterialReactTable
                            enableStickyHeader
                            columns={columns}
                            enableRowSelection
                            data={candidatesData}
                            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                            state={{ rowSelection, pagination }} //pass our managed row selection state to the table to use
                            enablePinning
                            initialState={{ columnPinning: { left: ['mrt-row-select'] }, density: 'compact', showGlobalFilter: true }}
                            // enableColumnResizing
                            rowCount={rowCount}
                            enableDensityToggle={false}
                            enableFullScreenToggle={false}
                            enableColumnFilters={false}

                            manualPagination

                            enableGlobalFilterModes
                            columnResizeMode="onChange"
                            onPaginationChange={setPagination}
                            getRowId={(row) => row.candid}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                        />
                        :
                        null
                }
            </div> */}

            {/* <VideoPreview url={videoPreviewLink} open={showVideoPreview}
                closePopup={() => setShowVideoPreview(false)}></VideoPreview> */}


            <Menu
                id={`addlistmenu`}
                anchorEl={addtolistanchorEl}
                open={openAddToListenBtn}
                onClose={handleProfileMenuClose}
                MenuListProps={{
                    "aria-labelledby": "add-list-btn",
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {selectedCandidateData?.nextStageList?.length ?
                    selectedCandidateData?.nextStageList.map((stage: StageInterface) => {
                        return <MenuItem
                            key={stage.stageId}
                            onClick={() => {
                                confirmDialog(`Are you sure you want to move the candidate to ${(stage.title) ? stage.title : stage.name}?`, () => {
                                    // console.log(selectedCandidateData);
                                    moveToStage(stage.stageId);
                                }, "warning"
                                );
                                handleProfileMenuClose();
                            }}
                        >
                            {(stage.title) ? stage.title : stage.name}
                        </MenuItem>
                    }
                    )
                    :
                    null
                }
            </Menu>
            <DataCollectionQAsDialog />
            <DocumentViewDialog />
        </div >
    )
}

export default Workflow;