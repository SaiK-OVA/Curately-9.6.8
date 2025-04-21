import { useCallback, useEffect, useMemo, useState } from "../../../../shared/modules/React";
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { Button } from "../../../../shared/modules/MaterialImports/Button";
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";
import ApiRequests from "../../../../shared/api/api";
import { Menu } from "../../../../shared/modules/MaterialImports/Menu";
// import MenuItem from "@mui/material/MenuItem";
import { ButtonGroup } from "../../../../shared/modules/MaterialImports/ButtonGroup";
// import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import { List, ListItem, ListItemText } from "../../../../shared/modules/MaterialImports/List";

import "./FindPool.scss";
import AddPool from "../Add/AddPool";
//import { globalData } from "../../../../shared/services/globalData";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import Sequence from "../../Job/View/Sourced/PopUps/Sequence/Sequence";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
// import { globalData } from "../../../../shared/services/globalData";
import { useNavigate } from "react-router-dom";
// import { globalData } from "../../../../shared/services/globalData";
import { userLocalData } from "../../../../shared/services/userData";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { DateTime } from '../../../../shared/modules/Luxon';
import { debounce } from "lodash";

import CustomPagination from '../../../shared/CustomPagination/CustomPagination'
import AddNewPool from "../Add/AddNewPool";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';

// import { DialogActions } from "@mui/material";
import ApiService from "../../../../shared/api/api";
import { Tabs, Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import { IconButton, TextField } from '@mui/material';
import { CloseRounded, SearchOutlined } from '@mui/icons-material';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import UpgradeButton from "../../../shared/UpgradeButton/UpgradeButton";
import { ID_SETTINGS_QUICK_ACTION } from "../../../../shared/services/Permissions/IDs";

const Findpool = () => {
  const isBullHornSettingEnabled = userLocalData.adminSettings(20043);
  const isCampaignsEnabled = userLocalData.adminSettings(20024);
  const isJobDivaAPISettingEnabled = userLocalData.adminSettings(20047);

  const isPoolAddSettingEnabled = userLocalData.checkIntegration(400006);
  const isPoolViewOrEditSettingEnabled = userLocalData.checkIntegration(400007);
  const isQuickActionsEnabled = userLocalData.adminSettings(ID_SETTINGS_QUICK_ACTION);


  const [poolList, setPoolList] = useState<any>([]);
  const [poolListNew, setPoolListNew] = useState<any>([]);

  const [rowCount, setRowCount] = useState(0);
  const [rowCountNew, setRowCountNew] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [talentpoolId1, setTalentPoolId] = useState('');
  const [searchValueOld, setSearchValueOld] = useState("");


  const sendTalentPoolId = useMemo(() => {
    return talentpoolId1;
  }, [talentpoolId1]);


  let navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState({});
  const [poolData, setPoolData] = useState<any>({});

  const [TableListOpen, setTableOpenList] = useState<null | HTMLElement>(null);
  const [openAddPoolModal, setOpenAddPoolModal] = useState(false);
  const [openAddNewPoolModal, setOpenAddNewPoolModal] = useState(false);
  const [openSequenceModal, setOpenSequenceModal] = useState(false);
  // const [TableSequenceOpen, setTableOpenSequence] = useState<null | HTMLElement>(null);
  // const openTableSequence = Boolean(TableSequenceOpen);
  // const [addtolistanchorEl, setAddToListAnchorEl] = useState<null | HTMLElement>(null);
  // const openAddToListenBtn = Boolean(addtolistanchorEl);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);

  const openTableList = Boolean(TableListOpen);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25, //customize the default page size
  });

  const [paginationNew, setNewPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [tabValue, setTabValue] = useState('myTalentPool');
  const [tabNewValue, setNewTabValue] = useState('myDynamicPool');

  const [selectSequenceList, setSelectSequenceList] = useState<any>([]);

  const [updatePool, setUpdatePool] = useState("add");
  const [menuData, setMenuData] = useState({
    rowId: "",
    recruiterName: "",
    count: 0,
    poolId: "",
    poolName: "",
    sequenceIds: [],
    sequenceNames: [],
    sequenceCount: 0,
  });

  // const [filtersExpand, setFiltersExpand] = useState(false);

  // const handleClickAddToListen = (
  //   event: React.MouseEvent<HTMLButtonElement>, rowId: any
  // ) => {
  //   setAddToListAnchorEl(event.currentTarget);
  //   setSelectedRowId(rowId);
  //   console.log(rowId);
  // };

  const handleProfileMenuClose = () => {
    // setAddToListAnchorEl(null);
    setSelectedRowId("");
  };

  const handlePoolPopupOpen = (addstring: any) => {
    setPoolData({});
    setUpdatePool(addstring);
    setOpenAddPoolModal(true);
    handleProfileMenuClose();
    saveAuditLog(4095);
  };

  // useEffect(() => {
  //   loadPools(tabValue);
  // }, [tabValue]);


  const handlePoolPopupClose = (added: boolean) => {
    setUpdatePool("");
    setOpenAddPoolModal(false);
    handleProfileMenuClose();
    setPoolData({});
    if (added) {
      loadPools(tabValue);
    }
  };
  const handleNewPoolPopupClose = () => {

    setOpenAddNewPoolModal(false);

  };
  const openSequnceToolTip = (
    event: React.MouseEvent<HTMLButtonElement>, callId: any
  ) => {
    setSelectedRowId(callId);
    setTableOpenList(event.currentTarget);
    // loadDistributionList();

    console.log("callId " + callId);
  };

  const [selectedSequence, setSelectedSequence] = useState({
    id: "",
    name: ""
  });

  // const handleTableSequence = (
  //   event: React.MouseEvent<HTMLButtonElement>, userId: any
  // ) => {
  //   setOpenSequenceModal(true);
  //   // loadDistributionList();
  //   let usrList = (userId != "") ? userId : Object.keys(rowSelection)
  //   setSelectSequenceList(usrList);
  // };

  const filteredData = useMemo(() => {
    if (!["", null, undefined].includes(searchValue)) {
      return poolListNew.filter((each: any) => {
        let trimmedSearchValue = searchValue?.toLowerCase()?.trim() || "";
        return ((each.talentPoolName.toLowerCase().includes(trimmedSearchValue)))
      })
    } else return (poolListNew || []);
  }, [searchValue, poolListNew]);

  const newRowCountFilter = useMemo(() => {
    return filteredData.length;
  }, [filteredData]);


  const PoolFilteredData = useMemo(() => {
    if (!["", null, undefined].includes(searchValueOld)) {
      return poolList.filter((each: any) => {
        let trimmedSearchValue = searchValueOld?.toLowerCase()?.trim() || "";
        return ((each.poolName.toLowerCase().includes(trimmedSearchValue)))
      })
    } else return (poolList || []);
  }, [searchValueOld, poolList]);

  const oldRowCountFilter = useMemo(() => {
    return PoolFilteredData.length;
  }, [PoolFilteredData]);



  const addToSequenceList = (id: string, name: string, candidateId: string) => {
    if (name && name.trim()) {
      handleProfileMenuClose();
      const saveData = {
        clientId: userLocalData.getvalue('clientId'),
        sequenceId: id,
        recrId: userLocalData.getvalue('recrId'),
        poolId: candidateId,
      }

      // http://35.155.202.216:8095/curatelyAdmin/sequenceAssignTalentPool
      //https://www4.accuick.com/Accuick_API/Curately/Sequence/sequence_assign_users.jsp?clientId=2&userIds=39&sequenceId=9&recrId=61
      ApiRequests.postWithData("admin", 'sequenceAssignTalentPool', saveData)
        .then(
          (response: any) => {
            // console.log(response);
            showToaster((response.data.message) ? response.data.message : "campaign saved successfully", 'success');
            loadPools(tabValue);
            saveAuditLog(4098);

            let tempData: any = poolList;
            for (let index = 0; index < poolList.length; index++) {
              if (tempData[index].poolId === candidateId) {
                tempData[index].sequenceCount = tempData[index].sequenceCount + 1;
                const arrSeqIds = tempData[index].sequenceIds;
                tempData[index].sequenceIds = [...arrSeqIds, selectedSequence.id];
                const arrSeqNames = tempData[index].sequenceNames;
                tempData[index].sequenceNames = [...arrSeqNames, selectedSequence.name];
              }
            }
            //console.log(tempData);
            setPoolList(tempData);
            setSelectedSequence({ id: "", name: "" });
            //    loadNewPools(tabNewValue)

            // if (response.data.Message === "Success") {
            //     showToaster("Sequence has been assigned", 'success');
            //     loadCanidateData();
            //     setSelectedSequence({ id: "", name: "" });
            // } else {
            //     showToaster(response.data.Message ? response.data.Message : "An error occured while assigning ", 'error');
            // }
          }
        )
        .catch((error) => {
          console.error("API Error:", error);
        });

    }
  }

  const handleDeletePoolPopupOpen = (_addstring: any, poolId: any) => {
    // setUpdatePool(addstring);
    let clientId = userLocalData.getvalue('clientId');
    //  setOpenAddPoolModal(true); http://35.155.202.216:8080/DemoCurately/deleteTalentPool/4/2 poolId - 4, clientId -2
    // console.log(poolId);

    ApiRequests.deleteById("admin", `deleteTalentPool/${poolId}`, clientId).then((response: any) => {
      console.log(response.data);
      if (response.data.Success) {
        showToaster('Pool has been delete successfully.', 'success');
        loadPools(tabValue);
        saveAuditLog(4100);
      } else {
        showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
      }
    })
    handleProfileMenuClose();
  };

  const handleUpdatePoolPopupOpen = (addstring: any, poolId: any) => {
    setUpdatePool(addstring);
    trackPromise(
      ApiRequests.getCall("admin", `gettalentpool/${poolId}/${userLocalData.getvalue('clientId')}`).then((response: any) => {
        const result = response.data.List[0];
        // console.log(result);
        // console.log(result.poolId);
        // console.log(result.poolName);
        setPoolData({
          poolId: String(result.poolId ? result.poolId : ""),
          poolName: String(result.poolName ? result.poolName : ""),
          shared: String(result.shared ? result.shared : ""),
          criteria: String(result.criteria ? result.criteria : ""),
          notes: String(result.notes ? result.notes : ""),
          jobId: String(result.jobId ? result.jobId : ""),
          jobTitle: String(result.jobTitle ? result.jobTitle : ""),
          skills: String(result.skills ? result.skills : ""),
          street: String(result.street ? result.street : ""),
          city: String(result.city ? result.city : ""),
          state: String(result.state ? result.state : ""),
          zipcode: Number(result.zipcode ? result.zipcode : ""),
          radius: String(result.radius ? result.radius : ""),
          radiusType: String(result.radiusType ? result.radiusType : ""),
          jobType: String(result.jobType ? result.jobType : ""),
          education: String(result.education ? result.education : ""),
          condition: ((result.condition === "true") || (result.condition === true)) ? true : false,
          createdBy: String(result.createdBy ? result.createdBy : ""),
        });
        console.log(poolData);
        setOpenAddPoolModal(true);
      })
    )
    handleProfileMenuClose();
  };

  // const loadNewPools = useCallback(debounce((newValue: string = tabNewValue) => {
  //   let clientId = userLocalData.getvalue('clientId');
  //   let recrId = userLocalData.getvalue('recrId');
  //   const requestBody = {
  //     clientId: clientId,
  //     recrId: recrId,
  //     all: newValue === "myDynamicPool" ? false : true,
  //     recrIds: ((newValue !== "myDynamicPool") && userLocalData.isChromeExtensionEnabled()) ? userLocalData.getvalue('invitedAndReferredRecrIds') : "",
  //   };

  //   trackPromise(
  //     ApiRequests.postWithData("admin", "getDynamicTalentPoolList", requestBody).then((result: any) => {
  //       let tempData = result.data.dynamicTalentPoolListResponses;
  //       for (let tp = 0; tp < tempData.length; tp++) {
  //         tempData[tp].sequenceIds = [];
  //         tempData[tp].sequenceCount = 0;
  //         tempData[tp].sequenceNames = [];
  //         let count = 0;
  //         let start = false;
  //         let campaigns = tempData[tp].campaigns || [];
  //         for (let j = 0; j < campaigns.length; j++) {
  //           let currentSequenceId = campaigns[j].sequenceId;
  //           let currentSequenceName = campaigns[j].sequenceName;
  //           for (let k = 0; k < tempData[tp].sequenceIds.length; k++) {
  //             if (currentSequenceId === tempData[tp].sequenceIds[k]) {
  //               start = true;
  //             }
  //           }

  //           count++;
  //           if (count === 1 && start === false) {
  //             tempData[tp].sequenceIds.push(currentSequenceId);
  //             tempData[tp].sequenceNames.push(currentSequenceName);
  //           }
  //           start = false;
  //           count = 0;
  //         }
  //         tempData[tp].sequenceCount = tempData[tp].sequenceIds.length;
  //       }
  //       setPoolListNew(tempData);
  //       setRowCountNew(tempData.length);
  //     })
  //   );
  // }, 400), [tabNewValue]);


  const loadPools = useCallback(debounce((newValue: string = "myTalentPool") => {
    let clientId = userLocalData.getvalue('clientId');
    let recrId = userLocalData.getvalue('recrId');
    const requestBody = {
      clientId: clientId,
      recrId: recrId,
      all: newValue === "myTalentPool" ? false : true,
      recrIds: ((newValue !== "myTalentPool") && userLocalData.isChromeExtensionEnabled()) ? userLocalData.getvalue('invitedAndReferredRecrIds') : "",
    };

    trackPromise(
      ApiRequests.postWithData("admin", "getTalentPoolList", requestBody).then((result: any) => {
        let tempData = result.data.list;
        for (let tp = 0; tp < tempData.length; tp++) {
          tempData[tp].sequenceIds = [];
          tempData[tp].sequenceCount = 0;
          tempData[tp].sequenceNames = [];
          let count = 0;
          let start = false;

          let sequenceIds = (tempData[tp].sequenceId && tempData[tp].sequenceId !== "0") ? tempData[tp].sequenceId.split(',') : [];
          let sequenceNames = (tempData[tp].sequenceName) ? tempData[tp].sequenceName.split(',') : [];

          for (let j = 0; j < sequenceIds.length; j++) {
            for (let k = 0; k < tempData[tp].sequenceIds.length; k++) {
              if (sequenceIds[j] === tempData[tp].sequenceIds[k]) {
                start = true;
              }
            }
            count++;
            if (count === 1 && start === false) {
              tempData[tp].sequenceIds.push(sequenceIds[j]);
              tempData[tp].sequenceNames.push(sequenceNames[j]);
            }
            start = false;
            count = 0;
          }

          tempData[tp].sequenceCount = tempData[tp].sequenceIds.length;
        }
        setPoolList(tempData);
        setRowCount(tempData.length);
      })
    );
  }, 400), [tabValue]);


  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    setPagination((prev) => ({
      ...prev,
      pageIndex: 0,
    }));
    loadPools(newValue);
  };

  // const handleTabChangeNew = (_event: React.SyntheticEvent, newValue: string) => {
  //   setNewTabValue(newValue);
  //   setNewPagination((prev) => ({
  //     ...prev,
  //     pageIndex: 0,
  //   }));
  //   loadNewPools(newValue);
  // };




  const openTalentPoolView = (id: string, name: string) => {
    localStorage.setItem("talentPoolName_" + id, name);
    navigate('/' + userLocalData.getvalue('clientName') + '/talentPool/view/' + id);
    // window.open(globalData.getWindowLocation() + "talentPool/view/" + id);

  };

  // useEffect(() => {
  //   const count = pagination.pageSize * pagination.pageIndex;
  //   const data = {
  //     next: count,
  //     pageSize: pagination.pageSize,
  //   };
  //   loadPools(data);
  // }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    (!openAddPoolModal) && setPoolData({});
    loadPools();
  }, []);

  // const handleSaveForm = (formData) => {
  // }

  // useEffect(() => {
  //   (!openAddPoolModal) && setPoolData({});
  //   loadNewPools();
  // }, []);

  const columns: MRT_ColumnDef<(typeof poolList)[0]>[] = useMemo(
    () => [
      {
        accessorKey: "poolName",
        header: "Name",
        enableColumnPinning: true,
        size: 100,
        Cell: ({ row }) => {
          let poolTitle = row.original.poolName
            ? row.original.poolName.toLowerCase()
            : "";
          let displayTitle =
            poolTitle.length > 30 ? poolTitle.slice(0, 30) + "..." : poolTitle;
          const recrId = userLocalData.getvalue('recrId');
          return (
            <Tooltip title={poolTitle} classes={{ tooltip: "tt-capital" }}>
              {row.original.modifyBy === recrId ?
                <span
                  className={"hightLightTd"}
                  onClick={() => {
                    if (isPoolViewOrEditSettingEnabled) {
                      handleUpdatePoolPopupOpen("update", row.original.poolId)
                    } else {
                      showToaster('You have no access to Edit Pool.', 'error');
                    }
                  }}
                >
                  {displayTitle}
                </span> : <span>{displayTitle}</span>}
            </Tooltip>
          )
        },
      },
      {
        accessorKey: "date",
        header: "Last Modified",
        accessorFn: row => `${row.date}`,
        Cell: ({ row }) => (
          <span>

            {DateTime.fromFormat(
              row.original.date.substring(0, 19),
              "yyyy-MM-dd hh:mm:ss"
            ).toFormat("MM/dd/yyyy ")}

          </span>
        ),
        size: 80,
      },
      {
        accessorKey: "recruiterName",
        header: "Owner",
        Cell: ({ row }) => (
          <span>{row.original.recruiterName}</span>
        ),
        size: 80,
      },
      {
        accessorKey: "count",
        accessorFn: row => `${row.count}`,
        header: "Records",
        Cell: ({ row }) => (
          row.original.count ? <span
            className="hightLightTd"
            onClick={() => {
              if (isPoolViewOrEditSettingEnabled) {
                openTalentPoolView(row.original.poolId, row.original.poolName)
              } else {
                showToaster('You have no access to View Pool.', 'error');
              }
            }}
          >
            {row.original.count}
          </span> : <span>{row.original.count}</span>
        ),
      },
      {
        accessorKey: "Actions",
        header: "Actions",
        enableSorting: false,
        Cell: ({ row }) => {
          const recrId = userLocalData.getvalue('recrId');
          return (
            <Stack key={row.original.poolId}>
              <ButtonGroup
                variant="outlined"
                id={row.original.poolId}
                sx={{
                  // width: "33px",
                  height: "28px",
                  "& .MuiButtonGroup-grouped": {
                    marginRight: "1px",
                    border: "1px solid var(--c-neutral-40)"
                  },
                }}
              >
                {/* <Tooltip title="Add to Sequence" placement="top">
                <Button
                  id={`sequencebutton-${row.original.poolId}`}
                  disableRipple
                  onClick={(e: any) => {
                    if (row.original.PoolId) {
                       setOpenSequenceModal(true);
                      handleTableSequence(e, row.original.candId)
                    }
                  }}
                  className="customButtonForHover"
                  sx={{
                    borderColor:
                      openTableSequence && selectedRowId === `${row.original.PoolId}`
                        ? "var(--c-neutral-40) !important"
                        : "var(--c-secondary-color)",
                    backgroundColor: "#ffffff",
                    color:
                      openTableSequence && selectedRowId === `${row.original.poolId}`
                        ? "#919191"
                        : "#919191",
                    "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                    {
                      borderRightColor:
                        openTableSequence && selectedRowId === `${row.original.poolId}`
                          ? "var(--c-neutral-40)"
                          : "",
                    },
                    "&:hover": {
                      borderColor: "var(--c-neutral-40)",
                      color: "#919191",
                      backgroundColor: "#ffffff",
                    },
                  }}
                >
                  <SendOutlinedIcon
                    sx={{
                      fontSize: "18px",
                      marginRight: "3px",
                    }}
                  />

                </Button>
              </Tooltip> */}
                {isCampaignsEnabled ?
                  <Tooltip
                    title={`${Number(row.original.sequenceCount) ? `In ${row.original.sequenceCount} Campaign${Number(row.original.sequenceCount) > 1 ? "s" : ""}` : `Add to Campaign`}`}
                    // title={`${Number(row.original.sequenceIds) ? `In ${row.original.sequenceIds} Sequence${Number(row.original.sequenceIds) > 1 ? "s" : ""}` : `Add to Sequence`}`}
                    placement="top"
                  >
                    <Button
                      id={`poolSeqbutton-${row.original.poolId}`}
                      disableRipple
                      onClick={(e: any) => {
                        //  console.log(e);
                        //  console.log(row.original.poolId);
                        if (row.original.poolId) {
                          setMenuData({
                            rowId: row.original.poolId,
                            recruiterName: row.original.recruiterName,
                            count: row.original.count,
                            poolId: row.original.poolId,
                            poolName: row.original.poolName,
                            sequenceIds: row.original.sequenceIds,
                            sequenceNames: row.original.sequenceNames,
                            sequenceCount: row.original.sequenceCount,

                          });
                          // handleTableSequence(e, row.original.poolId)
                          //  console.log(row.original.recruiterName);
                          setSelectedRowId(row.original.poolId);
                          openSequnceToolTip(e, row.original.poolId);
                        }
                      }}
                      aria-controls={
                        openTableList && selectedRowId === `${row.original.poolId}`
                          ? `poolSeqlist-${row.original.poolId}`
                          : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={
                        openTableList && selectedRowId === `${row.original.poolId}`
                          ? "true"
                          : undefined
                      }
                      className="customButtonForHover"
                      sx={{
                        borderColor:
                          openTableList && selectedRowId === `${row.original.poolId}`
                            ? "1px solid var(--c-neutral-40)"
                            : "var(--c-secondary-color)",
                        backgroundColor: "#ffffff",
                        color:
                          openTableList && selectedRowId === `${row.original.poolId}`
                            ? "#919191"
                            : "#919191",
                        "& .MuiButtonGroup-root .MuiButtonGroup-grouped:not(:last-of-type)":
                        {
                          borderRightColor:
                            openTableList && selectedRowId === `${row.original.poolId}`
                              ? "1px solid var(--c-neutral-40)"
                              : "",
                        },
                        "&:hover": {
                          border: "1px solid var(--c-neutral-40)",
                          color: "#919191",
                          backgroundColor: "#ffffff",
                        },
                        width: "33px",
                      }}
                    >
                      <SendOutlinedIcon
                        sx={{
                          fontSize: "16px",
                        }}
                      />
                      {
                        Number(row.original.sequenceCount) ?
                          <span>{row.original.sequenceCount}</span>
                          :
                          null
                      }
                      {/* <ArrowDropDownIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    /> */}
                    </Button>
                  </Tooltip>
                  : null}
                {isBullHornSettingEnabled ?
                  <Tooltip title="Bullhorn" placement="top">
                    <Button
                      className="customButtonForHover"
                      sx={{
                        borderColor: "var(--c-neutral-40)",
                        backgroundColor: "#ffffff",
                        color: "#919191",
                        width: "33px",
                      }}
                      id={`bullhorn-btn-${row.original.poolId}`}
                      onClick={() => {

                        publishTalentPoolToBullhorn(row.original.poolId);

                      }}
                    >
                      <BusinessOutlinedIcon
                        sx={{
                          fontSize: "18px",
                          marginRight: "3px",
                        }}
                      />
                    </Button>
                  </Tooltip>
                  :
                  null
                }
                {/* {isJobDivaAPISettingEnabled ?
                  <Tooltip title="Job Diva" placement="top">
                    <Button
                      className="customButtonForHover"
                      sx={{
                        borderColor: "var(--c-neutral-40)",
                        backgroundColor: "#ffffff",
                        color: "#919191",
                        width: "33px",
                      }}
                      id={`jobdiva-btn-${row.original.talentPoolId}`}
                      onClick={() => {

                        publishTalentPoolToJobdiva(row.original.talentPoolId);

                      }}
                    >
                      <EnergySavingsLeafOutlinedIcon
                        sx={{
                          fontSize: "18px",
                          marginRight: "3px",
                        }}
                      />
                    </Button>
                  </Tooltip>
                  :
                  null
                } */}
                {
                  (row.original.modifyBy == recrId && isPoolViewOrEditSettingEnabled) ?
                    <Tooltip title="Edit" placement="top">
                      <Button
                        className="customButtonForHover"
                        sx={{
                          borderColor: "var(--c-neutral-40)",
                          backgroundColor: "#ffffff",
                          color: "#919191",
                          width: "33px",
                        }}
                        id={`edit-btn-${row.original.poolId}`}
                        onClick={() => {
                          if (isPoolViewOrEditSettingEnabled) {
                            handleUpdatePoolPopupOpen("update", row.original.poolId);
                          } else {
                            showToaster('You have no access to Edit Pool.', 'info');
                          }
                        }}
                      >
                        <ModeEditOutlineOutlinedIcon
                          sx={{
                            fontSize: "18px",
                            marginRight: "3px",
                          }}
                        />
                      </Button>
                    </Tooltip>
                    :
                    null
                }
                {row.original.modifyBy === recrId ?
                  <Tooltip title="Delete" placement="top">
                    <Button
                      className="customButtonForHover"
                      sx={{
                        borderColor: "var(--c-neutral-40)",
                        backgroundColor: "#ffffff",
                        color: "#919191",
                        width: "33px",
                      }}
                      id={`Delete-btn-${row.original.poolId}`}
                      onClick={() => {
                        confirmDialog(`Are you sure you want to delete this Pool - ${row.original.poolName}?`, () => {
                          handleDeletePoolPopupOpen("Delete", row.original.poolId); // Replace 1 with the actual jobId you want to delete
                        }, "warning");
                      }}
                    >

                      <DeleteOutlineOutlinedIcon sx={{
                        fontSize: "18px",
                      }} />
                    </Button>
                  </Tooltip>
                  : null}

              </ButtonGroup>
            </Stack >
          )
        },
        size: 100,
      },
    ],
    []
  );

  const columnVisibility = useMemo(()=>{
    const validatedColumns = [
      {accessorKey: "Actions" , header : "Actions", isEnabled: isQuickActionsEnabled ? true : false}
    ]
    let visibleColumns : any = {}
    columns.forEach((column)=>{
      let validatedColumn = validatedColumns.find((each)=>each.accessorKey === column.accessorKey) || null ;
      visibleColumns[column.accessorKey as string] = validatedColumn? Boolean(validatedColumn?.isEnabled) : true;
    })
    return visibleColumns
  }, [columns])

  const saveAuditLog = (id: number) => {
    ApiService.saveAuditLog(id);
  }

  useEffect(() => {
    saveAuditLog(4094);
  }, [])

  const deleteTalentPoolId = (poolId: string, sequenceId: string) => {
    trackPromise(
      ApiRequests.postWithData("admin", 'deleteTalentPoolSequence', { poolId: poolId, sequenceId: sequenceId, clientId: userLocalData.getvalue('clientId') })
        .then(
          (response: any) => {
            if (response.data.Success) {
              showToaster("Talent Pool deleted Successfully", 'success');
              loadPools(tabValue);
            } else {
              showToaster(response.data.Message ? response.data.Message : "An error occured while deleting", 'error');
            }
          }
        ).catch(
          (response: any) => {
            showToaster(response.response?.data?.Message ? response.response?.data?.Message : "An error occured while deleting", 'error');
          }

        )
    )
  }


  //publishTalentPoolToJobdiva

  const publishTalentPoolToJobdiva = (poolId: any) => {

    let bodyRequest = {
      "atsName": "Jobdiva",
      "clientId": userLocalData.getvalue('clientId'),
      "recruiterId": userLocalData.getvalue('recrId'),
      "moduleName": "Pool",
      "curatelyIds": [poolId], //Object.keys(rowSelection),
    }

    ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {

      if (response.data.Success) {
        showToaster(`Talent Pool is Publshed successfully`, 'success');
        // setRowSelection({});
      } else {
        showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Talent Pool to Jobdiva - ", 'error');
      }
    }).catch(error => {
      showToaster(error.message ? error.message : "Unable to Publish Talent Pool to Jobdiva", 'error');
    });

  }

  // Bullhorn publish Tearsheet

  const publishTalentPoolToBullhorn = (poolId: any) => {

    let bodyRequest = {
      "atsName": "Bullhorn",
      "clientId": userLocalData.getvalue('clientId'),
      "recruiterId": userLocalData.getvalue('recrId'),
      "moduleName": "Pool",
      "curatelyIds": [poolId], //Object.keys(rowSelection),
    }
    // https://adminapi.cxninja.com/bullhorn-service-dev/job/%7BclientId%7D/%7BjobId%7D

    ApiService.postWithData('ats', `ats/post`, bodyRequest).then((response) => {

      if (response.data.Success) {
        showToaster(`Talent Pool is Publshed successfully`, 'success');
        // setRowSelection({});
      } else {
        showToaster((response.data.Message) ? response.data.Message : "Unable to Publish Talent Pool to BullHorn - ", 'error');
      }
    }).catch(error => {
      showToaster(error.message ? error.message : "Unable to Publish Talent Pool to BullHorn", 'error');
    });

  }

  const handlePaginationChange = (newPage: number) => {
    if (newPage > pagination.pageIndex) {
      saveAuditLog(4101);
    } else if (newPage < pagination.pageIndex) {
      saveAuditLog(4102);
    }
  };



  return (
    <>
      <div className="FindPool mx-8 pt-2">
        <Stack
          direction="row"
          className="customCard px-4 py-4"
          justifyContent="space-between"
          alignItems="center"
          sx={{ minHeight: "auto !important" }}
        >
          <Typography variant="h6" className="header">
            Talent Pool
          </Typography>
          <Stack direction="row" spacing={2} className="btn-container" justifyContent="space-between">

            {
              isPoolAddSettingEnabled ?
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handlePoolPopupOpen("add")}
                  color="primary"
                >
                  Add Pool
                </Button>
                :
                null
            }


          </Stack>
        </Stack>
        <Grid>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            className="tableTabs"
            aria-label="template tabs"
          >
            <Tab value="myTalentPool" label="My Talent Pool" />
            <Tab value="allTalentPool" label="All Talent Pool" />
          </Tabs>
        </Grid>
        <Stack alignItems={"end"} bgcolor={'white'} p={1.75}>
          <TextField
            fullWidth={false}
            placeholder='Search Talent Pool here...'
            size='small'
            InputProps={{
              startAdornment: <SearchOutlined fontSize='small' sx={{ mr: 0.75 }} color="inherit" />,
              endAdornment: <IconButton size='small'
                sx={{ ml: 0.75 }}
                disabled={["", null, undefined].includes(searchValueOld)}
                onClick={() => setSearchValueOld("")}
              ><CloseRounded fontSize='small' /></IconButton>
            }}
            value={searchValueOld}
            onChange={(e) => setSearchValueOld(e.target.value)}
          />
        </Stack>

        <Grid container spacing={0} className="customCard p-0 ">
          <Grid sx={{ width: "calc(100%)" }}>
            {/* filtersExpand ? 'calc(100%)' : 'calc(100% - 0px)' */}
            <div className={`MRTableCustom  pl-0 `} id="mrt_table_D_talentpool">
              <MaterialReactTable
                columns={columns}
                // enableRowSelection
                data={PoolFilteredData}
                onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                state={{ rowSelection, pagination, columnVisibility }} //pass our managed row selection state to the table to use
                enablePinning
                enableStickyHeader
                initialState={{
                  columnPinning: { left: ["mrt-row-select", "poolName"] },
                  density: "compact",
                  showGlobalFilter: true,
                }}
                enableTopToolbar={false}
                // enableColumnResizing
                enableGlobalFilterModes
                enableGlobalFilter={false}

                columnResizeMode="onChange"
                onPaginationChange={setPagination}
                getRowId={(row: any) => row.poolId}
                // icons={{
                //   ArrowDownwardIcon: (props: any) => (
                //     <SwitchLeftIcon {...props} />
                //   ),
                // }}
                muiPaginationProps={{
                  rowsPerPageOptions: [25],
                  showFirstButton: false,
                  showLastButton: false,
                  SelectProps: {
                    style: { display: 'none' }, // Hide the rows per page dropdown
                  },

                }}
                enablePagination={true}
                renderBottomToolbarCustomActions={() => (
                  <CustomPagination
                    page={pagination.pageIndex}
                    rowsPerPage={25}
                    rowCount={oldRowCountFilter}
                    onChangePage={(page: any) => {
                      setPagination({
                        ...pagination,
                        pageIndex: page,
                        pageSize: 25,
                      });
                      handlePaginationChange(page);
                    }}
                    showCount={false}
                  />
                )}
                rowCount={oldRowCountFilter}
              />
            </div>
          </Grid>
        </Grid>

        {openAddPoolModal ? (
          <AddPool
            open={openAddPoolModal}
            closePopup={(added) => handlePoolPopupClose(added)}
            add={updatePool === "add" ? true : false}
            poolData={poolData}
          />
        ) : null}
        {/* {openAddNewPoolModal ? (
          <AddNewPool
            open={openAddNewPoolModal}
            onSave={handleSaveForm}
            closePopup={handleNewPoolPopupClose}
            add={updatePool === "add" ? true : false}
            talentPoolId={sendTalentPoolId}
            onSaveUpdatePool={() => {
              loadNewPools();
            }}
          />
        ) : null} */}

        {openSequenceModal ? (
          <Sequence
            open={openSequenceModal}
            closePopup={() => setOpenSequenceModal(false)}
            selectedCandidateIds={selectSequenceList}
          />
        ) : null}
        {menuData && menuData.poolName}
        <Menu
          key={menuData.rowId}
          id={`poolSeqlist-${menuData.rowId}`}
          anchorEl={TableListOpen}
          open={openTableList && selectedRowId === menuData.rowId}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          MenuListProps={{
            "aria-labelledby": `poolSeqbutton-${menuData.rowId}`,
          }}
          sx={{
            boxShadow: "0px",
            "& .MuiList-root.MuiMenu-list": {
              pt: "8px",
              pb: "15px",
              pr: "10px",
              pl: "10px",
            },
          }}
        >
          {/* test {menuData.sequenceIds} - {menuData.sequenceIds.length} */}
          {
            (userLocalData.getvalue('paymentType') !== 1) ?
              <div>
                {
                  (menuData.sequenceIds.length && (menuData.sequenceIds.length === menuData.sequenceNames.length)) ? (
                    <>
                      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {
                          menuData.sequenceIds.map((value, index) => (
                            <ListItem
                              sx={{
                                ':hover': {
                                  backgroundColor: "var(--c-neutral-30)",
                                  borderRadius: "3px"
                                }
                              }}
                              key={value}
                              disableGutters
                              secondaryAction={
                                <IconButton aria-label="Remove" onClick={() => {
                                  handleProfileMenuClose();
                                  confirmDialog(`Are you sure you want to remove - ${menuData.sequenceNames[index]}?`, () => {
                                    deleteTalentPoolId(menuData.poolId, value);
                                  }, "warning");
                                }}>
                                  <ClearOutlinedIcon sx={{ color: '#737373', height: '13px', width: '13px' }} />
                                </IconButton>
                              }
                              className="pt-1 pb-1 pl-1"
                            >
                              <ListItemText
                                // onClick={() => openSequnceView(value)}
                                className="fw-6 c-skyblue"
                                primary={menuData.sequenceNames[index]}
                              />
                            </ListItem>
                          ))
                        }
                      </List>
                    </>
                  ) : null
                }

                <MUIAutoComplete
                  id='sequenceId'
                  handleChange={(id: any, name: string) => {
                    setSelectedSequence({ id, name });
                    addToSequenceList(id, name, menuData.poolId);
                  }}
                  existingSequenceIds={menuData?.sequenceIds}
                  valuePassed={
                    (selectedSequence.id) ? { label: selectedSequence.name, id: selectedSequence.id } :
                      {}
                  }
                  isMultiple={false}
                  textToShow="Select Campaign"
                  width="250px"
                  type='sequence'
                  placeholder="Select Campaign"
                />
              </div>
              :
              <UpgradeButton validationCheck='UPGRADE' callViewAPI={() => { }} />
          }


        </Menu>
        {/* <Menu

          id={`addlistmenu-${menuData.rowId}`}
          anchorEl={addtolistanchorEl}
          open={openAddToListenBtn && selectedRowId === `${menuData.rowId}`}
          onClose={handleProfileMenuClose}
          MenuListProps={{
            "aria-labelledby": `add-list-btn-${menuData.rowId}`,
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          PaperProps={{
            style: { overflow: "visible" },
          }}
          sx={{
            boxShadow: "0px",
            "& .MuiList-root.MuiMenu-list": {
              pt: "4px",
              pb: "10px",
              pr: "5px",
              pl: "5px",
            },
          }} //{`mail-${menuData.rowId}`}
        >
          <MenuItem key="edit" onClick={() => handleUpdatePoolPopupOpen("update", menuData.poolId)}>
            Edit
          </MenuItem>
          <MenuItem key="delete" onClick={() => handleDeletePoolPopupOpen("Delete", menuData.poolId)} >
            Delete
          </MenuItem>
        </Menu> */}
      </div >
    </>
  );
};
export default Findpool;