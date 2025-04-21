import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "../../../../shared/modules/React";
import { Button } from "../../../../shared/modules/MaterialImports/Button";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import AddGoal from "./AddGoal";
import ApiService from "../../../../shared/api/api";
import "./Goals.scss";
import { debounce } from "lodash";
import { trackPromise } from "react-promise-tracker";
import { userLocalData } from "../../../../shared/services/userData";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import LuxonDateParser from "../../../../shared/services/LuxonDateParser";
import { IconButton, Stack, SvgIconProps, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import CustomPagination from "../../../shared/CustomPagination/CustomPagination";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
//import Metric from "./Metric";
//import { Link } from "react-router-dom";

const Goals = () => {
  const isGoalAddSettingEnabled =
    userLocalData.checkSettings(110002) === 5 ||
    userLocalData.checkSettings(110002) === 6;
  const isGoalDeleteSettingEnabled =
    userLocalData.checkSettings(110002) === 6;

  interface GoalData {
    goalName?: string;
    goalId?: string;
  }
  const [openAddGoalModal, setOpenAddGoalModal] = useState(false);
  const [metricDialogOpen, setMetricDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [goalData, setGoalData] = useState<GoalData[]>([]);
  const [goalMetricStatusMapping, setGoalMetricStatusMapping] = useState()
  const [globalFilter, setGlobalFilter] = useState("");
  const [filteredData, setFilteredData] = useState<GoalData[]>([]);
  const [goalsMetricsList, setGoalsMetricsList] = useState<{ metricId: number; metric: string; }[]>([]);
  const [editingGoal, setEditingGoal] = useState({
    goalName: "",
    timeFrame: "",
    metric: "",
    target: "",
    targetValue: "",
    alert: [
      {
        alertType: "",
        alertFrequency: "",
        notificationReceipt: "",
      },
    ],
  });
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const openEditModal = (goalId: any) => {
    fetchGoalDetails(goalId)
  };

  const fetchGoalDetails = (goalId: any) => {
    trackPromise(
      ApiService.postWithData("admin", "getGaolById", {
        goalId: goalId,
        clientId: userLocalData.getvalue("clientId"),
      }).then((response: any) => {
        setEditingGoal(response.data.goalDetail);
        setIsEditMode(true);
        //  fetchGoalMerticList("CREATE_GOAL")
        setOpenAddGoalModal(true);
      })
    );
  }

  const openAddModal = () => {
    //fetchGoalMerticList('CREATE_GOAL');
    setEditingGoal({
      goalName: "",
      timeFrame: "",
      metric: "",
      target: "",
      targetValue: "",
      alert: [
        {
          alertType: "",
          alertFrequency: "",
          notificationReceipt: "",
        },
      ],
    });
    setOpenAddGoalModal(true);
    setIsEditMode(false);
  };

  const handleGoalData = (addorUpdate: boolean) => {
    setOpenAddGoalModal(false);
    addorUpdate && loadGoalList();
  };

  useEffect(() => {
    const filtered = goalData.filter((row) => {
      const filter = globalFilter || "";
      return row.goalName?.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredData(filtered);
  }, [globalFilter, goalData]);

  let data = {
    clientId: userLocalData.getvalue("clientId"),
  };
  const loadGoalList = useCallback(
    debounce(() => {
      trackPromise(
        ApiService.postWithData("admin", "getGoalList", data).then(
          (response: any) => {
            let goalData = response.data.goalDetailsList;
            for (let sd = 0; sd < goalData.length; sd++) {
              if (goalData[sd].createdDate?.length > 19) {
                goalData[sd].createdDate = LuxonDateParser.ServerEDTToSystem(
                  goalData[sd].createdDate.substring(0, 19),
                  "yyyy-MM-dd hh:mm:ss",
                  "MM/dd/yyyy hh:mm a"
                );
              }
            }
            setGoalData(response.data.goalDetailsList);
          }
        )
      );
    }, 400),
    []
  );

  const debouncedLoadGoalList = debounce(loadGoalList, 300);

  useEffect(() => {
    !openAddGoalModal && debouncedLoadGoalList();
    fetchGoalMerticList();
  }, []);

  const handleDeleteGoal = (goalId: string, goalName: string) => {
    confirmDialog(`Are you sure you want to delete ${goalName} Goal ?`, () => {
      deleteGoalId(goalId);
      loadGoalList();
    });
  };

  const deleteGoalId = (goalId: string) => {
    trackPromise(
      ApiService.postWithData("admin", "deleteGoal", {
        clientId: userLocalData.getvalue("clientId"),
        goalId: goalId,
        recrId: userLocalData.getvalue("recrId"),
      })
        .then((response: any) => {
          if (response.data.Success) {
            showToaster("Goal has been deleted successfully.", "success");
            loadGoalList();
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

  const openMetricModal = () => {
    //fetchGoalMetricStatusMapping()
    setMetricDialogOpen(true)
  }
  const handleCloseMetricModal = () => {
    setMetricDialogOpen(false)
  }


  const fetchGoalMerticList = () => {
    trackPromise(
      ApiService.getCall("admin", "getGoalMetrics/0")
        .then((response) => {
          if (response?.data?.Success) {
            let tempGoalMetrics = response?.data?.goalMetrics || [];

            setGoalsMetricsList([...tempGoalMetrics]);
          }
        })
        .catch((error) => {
          console.error("Error fetching candidate status list", error);
        })
    )
  };


  // const fetchGoalMerticList = (type: 'CREATE_GOAL' | 'METRIC_MAPPING', metricsMapData?: any) => {
  //   trackPromise(
  //     ApiService.getCall("admin", "getGoalMetrics")
  //       .then((response) => {
  //         if (response?.data?.Success) {
  //           let tempGoalMetrics = response?.data?.goalMetrics || [];
  //           tempGoalMetrics = tempGoalMetrics.map((goal: any) => ({
  //             ...goal, statusId: !!metricsMapData?.length ? metricsMapData.find((each: any) => each.metricId === goal.metricId).statusId || '' : ''
  //           }))
  //           if (type === 'METRIC_MAPPING') {
  //             setMetricDialogOpen(true)
  //           } else {
  //             setOpenAddGoalModal(true)
  //           }
  //           setGoalsMetricsList([...tempGoalMetrics]);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching candidate status list", error);
  //       })
  //   )
  // };

  // const fetchGoalMetricStatusMapping = () => {
  //   trackPromise(
  //     ApiService.postWithData('admin', 'getGoalMetricStatusMapping', {
  //       clientId: userLocalData.getvalue('clientId')
  //     })
  //       .then((response) => {

  //         setGoalMetricStatusMapping(response?.data?.goalMetricStatusMappings || [])
  //         fetchGoalMerticList('METRIC_MAPPING', response?.data?.goalMetricStatusMappings || [])

  //       }).catch((error) => {
  //         console.log("Error fetching metric status mapping list", error)
  //         fetchGoalMerticList('METRIC_MAPPING', [])
  //       })
  //   )
  // }



  const columns: MRT_ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "goalName",
        header: "GoalName",
        enableColumnPinning: true,
        size: 200,
      },
      {
        accessorKey: "metric",
        header: "Metric Name",
        size: 250,
      },
      {
        accessorKey: "createdDate",
        header: "Created On",
        size: 150,
      },
      {
        accessorKey: "Actions",
        header: "Actions",
        enableSorting: false,
        Cell: ({ row }) => (
          <Stack key={row.original.goalId}>
            <Stack direction={"row"}>
              {isGoalAddSettingEnabled ? (
                <Tooltip title="Edit" placement="top" color="primary">
                  <IconButton
                    onClick={() => {
                      openEditModal(row.original.goalId);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
              {isGoalDeleteSettingEnabled ? (
                <Tooltip title="Delete" placement="top" color="primary">
                  <IconButton
                    onClick={() => {
                      handleDeleteGoal(
                        row.original.goalId,
                        row.original.goalName
                      );
                    }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Stack>
          </Stack>
        ),

      },
    ],
    []
  );

  return (
    <div>
      <div className="pt-3 px-3 " id="Goals">
        <Grid
          container
          direction="row"
          className="customCard px-4 py-2"
          justifyContent="space-between"
          alignItems="center"
          display="flex"
          sx={{ minHeight: "auto !important" }}
        >
          <Typography variant="h6" className="header">
            Goals
          </Typography>
          <div>
            <Grid
              container
              direction="row"
              justifyContent="end"
              alignItems="center"
            >
              {/* <Link to={`/${userLocalData.getvalue("clientName")}/settings/metrics`} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                // onClick={openMetricModal}
                >
                  Metric Data
                </Button>
              </Link> */}
              <Button
                variant="contained"
                color="primary"
                size="small"
                className='ml-2'
                onClick={() => openAddModal()}
              >
                Create Goal
              </Button>
            </Grid>
          </div>
        </Grid>
        <Grid container className="customCard p-0 filterExpand-grid">
          <Grid sx={{ width: "calc(100%)" }}>
            <div className={`MRTableCustom  pl-0 `}>
              <MaterialReactTable
                columns={columns}
                data={filteredData}
                state={{
                  rowSelection,
                  pagination,
                  globalFilter,
                }}
                enableStickyHeader
                initialState={{
                  columnPinning: { left: ["mrt-row-select", "goalName"] },
                  density: "compact",
                  showGlobalFilter: true,
                }}
                muiPaginationProps={{
                  rowsPerPageOptions: [10],
                  showFirstButton: false,
                  showLastButton: false,
                  SelectProps: {
                    style: { display: "none" }, // Hide the rows per page dropdown
                  },
                }}
                enablePagination={true}
                renderBottomToolbarCustomActions={() => (
                  <CustomPagination
                    page={pagination.pageIndex}
                    rowsPerPage={10}
                    rowCount={filteredData.length}
                    onChangePage={(page: any) => {
                      setPagination({
                        ...pagination,
                        pageIndex: page,
                        pageSize: 10,
                      });
                      //   handlePaginationChange(page);
                    }}
                    showCount={false}
                  />
                )}
                onGlobalFilterChange={setGlobalFilter}
                enableFilters={false}
                enableGlobalFilterModes
                columnResizeMode="onChange"
                onPaginationChange={setPagination}
                getRowId={(row) => row.goalId}
                icons={{
                  ArrowDownwardIcon: (props: SvgIconProps) => (
                    <SwitchLeftIcon {...props} />
                  ),
                }}
                rowCount={filteredData.length}
              />
            </div>
          </Grid>
        </Grid>
        {openAddGoalModal ? (
          <AddGoal
            open={openAddGoalModal}
            handleClose={handleGoalData}
            goalData={editingGoal}
            add={!isEditMode}
            goalsMetricsList={goalsMetricsList}
          />
        ) : null}

        {/* {metricDialogOpen ? (
          <Metric
            open={metricDialogOpen}
            handleClose={handleCloseMetricModal}
            goalsMetricsList={goalsMetricsList}

          />
        ) : null} */}
      </div>
    </div>
  );
};

export default Goals;
