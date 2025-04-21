import { useState, useEffect, useMemo, useCallback } from "../../../../shared/modules/React";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
    Button,
    IconButton,
} from "../../../../shared/modules/MaterialImports/Button";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    type MRT_SortingState,
} from "../../../../shared/modules/MaterialReactTable";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import "./AddVideoList.scss";
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import ApiService from "../../../../shared/api/api";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { userLocalData } from "../../../../shared/services/userData";
import LuxonDateParser from "../../../../shared/services/LuxonDateParser";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
import { debounce } from "lodash";
import AddVideo from "../AddVideoList/AddVideo";
// import { Box, Modal } from "@mui/material";
// import { CloseIcon } from "../../../../shared/modules/MaterialImports/Dialog";
import VideoPreview from "../../Job/Workflow/VideoPreview/VideoPreview";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const AddVideoList = () => {
    const isSourceAddSettingEnabled =
        userLocalData.checkSettings(110005) === 5 ||
        userLocalData.checkSettings(110005) === 6;
    const isSourceDeleteSettingEnabled =
        userLocalData.checkSettings(110005) === 6;

    let clientId = userLocalData.getvalue("clientId");

    let recrId = userLocalData.getvalue("recrId");

    const [videoData, setVideoData] = useState<any[] | never[]>([]);
    const [editingVideo, setEditingVideo] = useState({
        Cameratagid: "",
        autoId: "",
        clientId: "",
        createdDate: "",
        label: "",
        recrId: "",
        recrName: "",
    });
    const [isEditMode, setIsEditMode] = useState(false);
    const [videoLabel, setVideoLabel] = useState("");
    const [rowSelection, setRowSelection] = useState({});
    const [addVideoDialogOpen, setAddVideoDialogOpen] = useState(false);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [rowCount, setRowCount] = useState(0);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<MRT_SortingState>([
        {
            desc: true,
            id: "createdDate",
        },
    ]);

    const [tabValue, setTabValue] = useState('myVideos');
    const loadVideoList = useCallback(
        debounce(() => {
            let data = {
                "recrId": tabValue === 'myVideos' ? userLocalData.getvalue('recrId') : 0,
                "clientId": userLocalData.getvalue('clientId')
            };
            // https://qaadminapi.curately.ai/curatelyAdmin/saveOrUpdateCriteriaEvaluationUser
            trackPromise(
                ApiService.postWithData('admin', 'getVideoList', data).then(
                    (response: any) => {
                        let videoData = response.data.videoDetails;
                        console.log(videoData, "Test..");
                        for (let sd = 0; sd < videoData.length; sd++) {
                            if (videoData[sd].createdDate?.length > 19) {
                                videoData[sd].createdDate = LuxonDateParser.ServerEDTToSystem(
                                    videoData[sd].createdDate.substring(0, 19),
                                    "yyyy-MM-dd hh:mm:ss",
                                    "MM/dd/yyyy hh:mm a"
                                );
                            }
                        }

                        setVideoData(response.data.videoDetails);
                        setRowCount(response.data.videoDetails.length);
                    }
                )
            )

        }, 400),
        [tabValue]
    );
    useEffect(() => {
        loadVideoList();
    }, [loadVideoList]);

    const debouncedLoadVideoList = debounce(loadVideoList, 300);
    const fetchVideoDetails = (autoId: number) => {
        return new Promise((resolve, reject) => {
            trackPromise(
                ApiService.getCall("admin", `getVideoById/${autoId}/${clientId}`)
                    .then((result) => {
                        console.log(result, "edit..");
                        if (result.data.videoDetail) {
                            const optionDetails = result.data.videoDetail;
                            setEditingVideo({
                                Cameratagid: optionDetails.Cameratagid,
                                autoId: optionDetails.autoId,
                                clientId: userLocalData.getvalue("clientId"),
                                createdDate: optionDetails.createdDate,
                                label: optionDetails.label,
                                recrId: optionDetails.recrId,
                                recrName: optionDetails.recrName,
                            });
                        }

                        setIsEditMode(true);
                        resolve(result);
                    })
                    .catch((error) => {
                        console.error("Error fetching User details:", error);
                        reject(error);
                    })
            );
        });
    };

    useEffect(() => {
        setPagination((prev) => ({
            ...prev,
            pageIndex: 0,
        }));
    }, [globalFilter]);

    const openEditModal = (autoId: any) => {
        fetchVideoDetails(autoId)
            .then(() => {
                setAddVideoDialogOpen(true);
            })
            .catch((error) => {
                showToaster("Unable to fetch User Data", error);
            });
    };

    const openVideo = (autoId: any) => {
        fetchVideoDetails(autoId)
            .then(() => {
                setAddVideoDialogOpen(true);
            })
            .catch((error) => {
                showToaster("Unable to fetch User Data", error);
            });
    };

    const openAddModal = () => {
        setEditingVideo({
            Cameratagid: "",
            autoId: "",
            clientId: "",
            createdDate: "",
            label: "",
            recrId: "",
            recrName: "",
        });
        setAddVideoDialogOpen(true);
        setIsEditMode(false);
    };

    // const convertToIST = (convertDate: any) => {
    //   const estDate = new Date(convertDate);
    //   const istDate = new Date(estDate.getTime() + (9.5 * 60 * 60 * 1000));

    //   const isDate = (istDate.toLocaleString() ? DateTime.fromFormat(istDate.toLocaleString(), 'dd/MM/yyyy, hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : "");
    //   //  console.log(isDate);
    //   return isDate;
    // };

    const handleCloseAddVideoDialog = (addorUpdate: boolean) => {
        setAddVideoDialogOpen(false);
        addorUpdate && loadVideoList();
    };

    useEffect(() => {
        !addVideoDialogOpen && debouncedLoadVideoList();
        //   setSorting([{
        //     desc: true,
        //     id: 'createdDate' ///createdDate
        // }]);
    }, []);

    const handleDeleteVideo = (autoId: string, label: string) => {
        confirmDialog(`Are you sure you want to delete ${label} video ?`, () => {
            deleteVideoId(autoId);
            //  loadVideoList();
        });
    };

    const deleteVideoId = (autoId: string) => {
        trackPromise(
            // http://35.155.202.216:8080/QADemoCurately/deleteVideo
            // ApiService.deleteById(216, 'QADemoCurately/deleteVideo', clientId)
            // ApiService.getCall(216, `QADemoCurately/deleteVideo/${autoId}/${clientId}`)
            ApiService.deleteById("admin", `deleteVideo/${autoId}`, clientId)
                .then((response: any) => {
                    if (response.data.Success) {
                        showToaster("Video has been deleted successfully.", "success");
                        loadVideoList();
                    } else {
                        showToaster(
                            response.data.Message
                                ? response.data.Message
                                : "An error occured while deleting",
                            "error"
                        );
                    }
                })
                .catch((response: any) => {
                    showToaster(
                        response.response?.data?.Message
                            ? response.response?.data?.Message
                            : "An error occured while deleting",
                        "error"
                    );
                })
        );
    };

    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");

    const handleOpenModal = (url: any, label: string) => {
        setVideoUrl(url);
        setOpenVideoModal(true);
        setVideoLabel(label);
    };

    const handleCloseModal = () => {
        setOpenVideoModal(false);
        setVideoUrl("");
        setVideoLabel("");
    };

    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorKey: "label",
                header: "Name",
                enableColumnPinning: true,
                size: 150,
            },
            {
                accessorKey: "recrName",
                header: "Owner",
                enableColumnPinning: true,
                size: 150,
            },
            {
                accessorKey: "createdDate",
                header: "Created On",
                // Cell: ({ row }) => (
                //   <span>
                //     {/* {row.original.createdDate ? convertToIST(row.original.createdDate) : ""} */}
                //     {row.original.createdDate ? DateTime.fromFormat(row.original.createdDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""}
                //   </span>
                // ),
                size: 150,
            },
            {
                accessorKey: "Actions",
                header: "Actions",
                enableSorting: false,
                Cell: ({ row }) => {
                    const rowRecrId = row.original.recrId;
                    const shouldDisplayActions = rowRecrId === recrId;
                    const videoLink = row.original.cameratagId
                        ? row.original.cameratagId.startsWith("//")
                            ? `https:${row.original.cameratagId}`
                            : row.original.cameratagId
                        : null;

                    return (
                        <Stack
                            key={row.original.autoId}
                            direction="row"
                            spacing={1}
                            sx={{ width: 150 }}
                        >
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                {videoLink && (
                                    <Tooltip title="Open Video" placement="top" color="primary">
                                        <IconButton
                                            onClick={() =>
                                                handleOpenModal(videoLink, row.original.label)
                                            }
                                        >
                                            <VisibilityOutlinedIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{
                                        visibility: shouldDisplayActions ? "visible" : "hidden",
                                        width: "100%",
                                    }}
                                >
                                    {/* {isSourceAddSettingEnabled && (
                    <Tooltip title="Edit" placement="top" color="primary">
                      <IconButton
                        onClick={() => openEditModal(row.original.autoId)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  )} */}

                                    {(row.original.recrId === userLocalData.getvalue('recrId')) && (
                                        <Tooltip title="Delete" placement="top" color="primary">
                                            <IconButton
                                                onClick={() =>
                                                    handleDeleteVideo(
                                                        row.original.autoId,
                                                        row.original.label
                                                    )
                                                }
                                            >
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </Stack>

                            </Stack>
                        </Stack>
                    );
                },
                size: 150,
            },
        ],
        []
    );
    const handleTabChange = (event: any, newValue: any) => {
        console.log(newValue)
        setTabValue(newValue);
        setPagination(prev => ({
            ...prev,
            pageIndex: 0
        }));
    };

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4296);
    }, []);

    return (
        <div className="emailTemplateList pt-3 px-5" id="sourceList">
            <Grid
                container
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                sx={{ minHeight: "auto !important" }}
            >
                <Typography variant="h6" className="headerName">
                    Videos
                </Typography>
                <Stack direction="row" className="btn-container">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={openAddModal}
                    >
                        Add Video
                    </Button>
                </Stack>
            </Grid>
            <Grid sx={{ width: "calc(100%)" }}>
                <Tabs
                    // className="customCard px-4 py-2" 
                    // sx={{ minHeight: 'auto !important' }}
                    value={tabValue} onChange={handleTabChange} className="tableTabs" aria-label="template tabs">
                    <Tab value="myVideos" label="My Videos" onClick={() => saveAuditLog(4255)} />
                    <Tab value="allVideos" label="All Videos" onClick={() => saveAuditLog(4256)} />
                </Tabs>
            </Grid>
            <div className={`MRTableCustom  pl-0 `}>
                <MaterialReactTable
                    columns={columns}
                    // enableRowSelection
                    data={videoData}
                    //  onRowSelectionChange={setRowSelection}
                    state={{
                        rowSelection,
                        pagination,
                        // sorting,
                        globalFilter,
                    }}
                    enablePinning
                    enableStickyHeader
                    initialState={{
                        columnPinning: { left: ["mrt-row-select", "recrName"] },
                        density: "compact",
                        showGlobalFilter: true,
                    }}
                    muiPaginationProps={{
                        rowsPerPageOptions: [10],
                        showFirstButton: false,
                        showLastButton: false,
                        SelectProps: {
                            style: { display: "none" },
                        },
                    }}
                    enablePagination={true}
                    renderBottomToolbarCustomActions={() => (
                        <CustomPagination
                            page={pagination.pageIndex}
                            rowsPerPage={10}
                            rowCount={rowCount}
                            onChangePage={(page: any) =>
                                setPagination({
                                    ...pagination,
                                    pageIndex: page,
                                    pageSize: 10,
                                })
                            }
                            showCount={false}
                        />
                    )}
                    onGlobalFilterChange={setGlobalFilter}
                    enableSorting
                    onSortingChange={setSorting}
                    enableDensityToggle={false}
                    enableFullScreenToggle
                    // enableColumnResizing
                    // enableFilters={false}
                    enableGlobalFilterModes
                    columnResizeMode="onChange"
                    onPaginationChange={setPagination}
                    getRowId={(row) => row.autoId}
                    icons={{
                        ArrowDownwardIcon: (props: SvgIconProps) => (
                            <SwitchLeftIcon {...props} />
                        ),
                    }}
                    rowCount={videoData.length}
                />
            </div>


            {
                videoUrl && openVideoModal ?
                    <VideoPreview url={videoUrl} open={openVideoModal} closePopup={() => handleCloseModal()} />
                    :
                    null
            }

            {addVideoDialogOpen ? (
                <AddVideo
                    open={addVideoDialogOpen}
                    handleClose={handleCloseAddVideoDialog}
                    videoData={editingVideo}
                    add={!isEditMode}
                    onVideoSaveSuccess={debouncedLoadVideoList}
                />
            ) : null}

        </div>
    );
};

export default AddVideoList;
