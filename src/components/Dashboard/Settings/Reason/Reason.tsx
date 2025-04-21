import { useState, useEffect, useMemo, useCallback } from '../../../../shared/modules/React';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Button, IconButton } from '../../../../shared/modules/MaterialImports/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import './Reason.scss';
import { DateTime } from '../../../../shared/modules/Luxon';
import AddNewReason from './AddNewReason'
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import CircleIcon from '@mui/icons-material/Circle';
//import { reasonsData } from './ReasonData';
import { userLocalData } from "../../../../shared/services/userData";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { SvgIconProps } from '@mui/material/SvgIcon';
import LuxonDateParser from '../../../../shared/services/LuxonDateParser';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import { debounce } from 'lodash';
import TextField from '@mui/material/TextField/TextField';
import { CloseRounded, SearchOutlined } from '@mui/icons-material';

const Reason = () => {

  const isReasonAddSettingEnabled = (userLocalData.checkSettings(130003) === 5) || (userLocalData.checkSettings(130003) === 6);
  const isReasonDeleteSettingEnabled = (userLocalData.checkSettings(130003) === 6);


  const [addReasonsDialogOpen, setAddReasonsDialogOpen] = useState(false);
  // const [reasonData, setReasonData] = useState<any>({});

  const [reasonDataReject, setReasonDataReject] = useState<any>([]);
  const [reasonDataHold, setReasonDataHold] = useState<any>([]);
  const [reasonDataActive, setReasonDataPending] = useState<any>([]);

  const [editingReasons, setEditingReasons] = useState<any>({
    reasonId: "",
    reasonName: "",
    reasonTypeId: "",
    status: "",
    createdBy: "",
    clientId: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 10,
  // });
  const [paginationReject, setPaginationReject] = useState({ pageIndex: 0, pageSize: 10 });
  const [paginationHold, setPaginationHold] = useState({ pageIndex: 0, pageSize: 10 });
  const [rowCount, setRowCount] = useState(0);
  const [rejectedReasonsLength, setRejectedReasonsLength] = useState(0);
  const [holdReasonsLength, setHoldReasonsLength] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');

  const [searchValue, setSearchValue] = useState("");
  const [searchRejectValue, setSearchRejectValue] = useState("");

const filteredHoldData = useMemo(() => {
  if (!["", null, undefined].includes(searchValue)) {
    let trimmedSearchValue = searchValue?.toLowerCase()?.trim() || "";
    return reasonDataHold.filter((each: any) => {
      return Object.values(each).some((value) =>
        String(value).toLowerCase().includes(trimmedSearchValue)
      );
    });
  } else return reasonDataHold;
}, [searchValue, reasonDataHold]);

const filteredRejectData = useMemo(() => {
  if (searchRejectValue) {
    let trimmedSearchRejectValue = searchRejectValue.toLowerCase().trim();
    return reasonDataReject.filter((each: any) => {
      return Object.values(each).some((value) =>
        String(value).toLowerCase().includes(trimmedSearchRejectValue)
      );
    });
  }
  return reasonDataReject;
}, [searchRejectValue, reasonDataReject]);

useEffect(() => {
  return () => setSearchValue(""); 
}, []);

useEffect(() => {
  return () => setSearchRejectValue(""); 
}, []);

  let clientId = userLocalData.getvalue('clientId');

  const fetchReasonDetails = (reasonId: string) => {
    return new Promise((resolve, reject) => {
      trackPromise(

        //ApiService.getCall(216, `QADemoCurately/getReasonListById/${reasonId}/${clientId}`)
        ApiService.getCall('admin', `getReasonListById/${reasonId}/${clientId}`)
          .then((result) => {

            if (result.data.list && result.data.list[0].reasonId) {
              const optionDetails = result.data.list[0];
              setEditingReasons({
                reasonId: optionDetails.reasonId,
                reasonName: optionDetails.reasonName,
                reasonTypeId: optionDetails.reasonTypeId,
                status: optionDetails.status,
                createdBy: optionDetails.createdBy,
                clientId: userLocalData.getvalue('clientId')
              })
            } else {
              showToaster("Unable to fetch User Data", 'error')
            }

            setIsEditMode(true);
            resolve(result);
          })
          .catch((error) => {
            console.error('Error fetching User details:', error);
            reject(error);
          }))
    })
  }

  // useEffect(() => {
  //   setPagination(prev => ({
  //     ...prev,
  //     pageIndex: 0
  //   }));
  // }, [globalFilter]);
  useEffect(() => {
    setPaginationReject(prev => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [globalFilter]);


  useEffect(() => {
    setPaginationHold(prev => ({
      ...prev,
      pageIndex: 0,
    }));
  }, [globalFilter]);


  const openEditModal = (reasonId: any) => {
    fetchReasonDetails(reasonId)
      .then(() => {
        setAddReasonsDialogOpen(true); // Open the modal only after state is updated
        saveAuditLog(4263);
      })
      .catch(error => {
        showToaster("Unable to fetch User Data", error)
      });
  };

  const openAddModal = () => {
    setEditingReasons({
      reasonId: "",
      reasonName: "",
      reasonTypeId: "",
      status: "",
      createdBy: "",
      clientId: ""
    })
    setAddReasonsDialogOpen(true);
    setIsEditMode(false);
  };



  const convertToIST = (convertDate: any) => {
    const estDate = new Date(convertDate);
    const istDate = new Date(estDate.getTime() + (9.5 * 60 * 60 * 1000));

    const isDate = (istDate.toLocaleString() ? DateTime.fromFormat(istDate.toLocaleString(), 'M/d/yyyy, h:mm:ss a').toFormat('MM/dd/yyyy hh:mm a') : "");
    //  console.log(isDate); 
    return isDate;
  };

  // const convertToIST = (convertDate: any) => {
  //   try {
  //     const estDate = new Date(convertDate);
  //     if (isNaN(estDate.getTime())) {
  //       throw new Error('Invalid Date');
  //     }
  //     const istDate = new Date(estDate.getTime() + (9.5 * 60 * 60 * 1000));
  //     const isDate = (istDate.toLocaleString() ? DateTime.fromFormat(istDate.toLocaleString(), 'M/d/yyyy, h:mm:ss a').toFormat('MM/dd/yyyy hh:mm a') : "");
  //     return isDate;
  //   } catch (error) {
  //     console.error('Error converting date:', error);
  //     return '';
  //   }
  // };


  const handleCloseAddReasonsDialog = (addorUpdate: boolean) => {
    setAddReasonsDialogOpen(false);
    addorUpdate && loadReasonList();
  };

  const loadReasonList = useCallback(
    debounce(() => {
      trackPromise(
        ApiService.getCall('admin', `getReasonList/${clientId}`)
          .then((response: any) => {
            let reasonData = response.data.list;
            setRowCount(reasonData.length);

            // Parse dates
            reasonData.forEach((item: { createdDate: string }) => {
              if (item.createdDate?.length > 19) {
                item.createdDate = LuxonDateParser.ServerEDTToSystem(
                  item.createdDate.substring(0, 19),
                  "yyyy-MM-dd hh:mm:ss",
                  "MM/dd/yyyy hh:mm a"
                );
              }
            });


            const reasonRejected = reasonData.filter((item: { reasonTypeId: number }) => item.reasonTypeId === 50001);
            const reasonHold = reasonData.filter((item: { reasonTypeId: number }) => item.reasonTypeId === 50002);
            const reasonPending = reasonData.filter((item: { reasonTypeId: number }) => item.reasonTypeId === 50003);


            setRejectedReasonsLength(reasonRejected.length);
            setReasonDataReject(reasonRejected);
            setHoldReasonsLength(reasonHold.length);
            setReasonDataHold(reasonHold);
            setReasonDataPending(reasonPending);
          })
      );
    }, 400),
    [clientId]
  );


  useEffect(() => {
    loadReasonList();
  }, []);

  const handleDeleteReason = (ReasonId: string, ReasonName: string) => {
    confirmDialog(`Are you sure you want to delete ${ReasonName} Reason?`, () => {
      deleteReasonId(ReasonId);
      saveAuditLog(4264);
    });
  };


  const deleteReasonId = (ReasonId: string) => {
    trackPromise(

      // ApiService.deleteById(216, `QADemoCurately/deleteReason/${ReasonId}`, clientId)
      ApiService.deleteById('admin', `deleteReason/${ReasonId}`, clientId)
        .then(
          (response: any) => {

            if (response.data.Success) {
              showToaster('Reason has been deleted successfully.', 'success');
              loadReasonList();
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

  const columns: MRT_ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: 'reasonName',
        header: 'Name',
        sortType: 'alphanumeric',
        sortingFn: (rowA, rowB, columnId) => {
          const valueA = rowA.original[columnId] ? rowA.original[columnId].charAt(0).toLowerCase() : '';
          const valueB = rowB.original[columnId] ? rowB.original[columnId].charAt(0).toLowerCase() : '';
          return valueA.localeCompare(valueB);
        }
      },

      {
        accessorKey: 'createdDate',
        header: 'Date',
        // Cell: ({ row }) => {
        //   return (
        //     <span>
        //       {/* {row.original.createdDate ? convertToIST(row.original.createdDate) : ""} */}
        //        {row.original.createdDate ? DateTime.fromFormat(row.original.createdDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""} 
        //       {/*{row.original.createdDate ? convertToIST(row.original.createdDate) : ""} */}

        //     </span>
        //   );
        // },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        accessorFn: (row) => `${row.status}`,
        Cell: ({ row }) => (
          <div>
            <span>
              {
                row.original.status === 1 ? <span><CircleIcon className="active" />Active</span> :
                  row.original.status === 2 ? <span><CircleIcon className="Inactive" />Inactive</span> :
                    row.original.status === 3 ? <span><CircleIcon className="pending" />Pending</span>
                      : ""
              }
            </span>
          </div>
        )
      },

      {
        accessorKey: 'action',
        header: "Actions",
        enableSorting: false,
        Cell: ({ row }) => (
          <Stack key={row.original.reasonId}>
            <Stack direction={"row"}>
              {
                isReasonAddSettingEnabled ?
                  <Tooltip title="Edit" placement="top" color="primary">
                    <IconButton onClick={() => { openEditModal(row.original.reasonId) }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  :
                  null
              }
              {
                isReasonDeleteSettingEnabled ?
                  <Tooltip title="Delete" placement="top" color="primary">
                    <IconButton onClick={() => { handleDeleteReason(row.original.reasonId, row.original.reasonName || '') }}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  :
                  null
              }
            </Stack>
          </Stack>
        ),
        size: 100
      },
    ],
    []
  );

  const saveAuditLog = (id: number) => {
    ApiService.saveAuditLog(id);
  }

  useEffect(() => {
    saveAuditLog(4260)
  }, []);

  return (
    <div id="reasonPage">
      <div className="MRTableCustom pt-3 px-5">
        <Stack
          direction="row"
          className="customCard px-4 py-2"
          justifyContent="space-between"
          alignItems="center"
          sx={{ minHeight: 'auto !important' }}
        >
          <Typography variant="h6" className="header">
            Reasons
          </Typography>

          <Stack direction="row" className="btn-container">
            <Button variant="contained" className="btnPrimary reasonBtn" size="small" onClick={() => { openAddModal(); saveAuditLog(4261); }}>New Reason</Button>

          </Stack>

        </Stack>

        <MaterialReactTable
        columns={columns}
        data={filteredRejectData} 
        initialState={{
          density: 'compact',
          showGlobalFilter: true,
          columnPinning: { left: ['mrt-row-select', 'reasonName'] },
        }}
        enableBottomToolbar={true}
        enableGlobalFilterModes
        enableStickyHeader
        renderTopToolbar={
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
            <Typography variant="h6" className="header" sx={{ pl: 2, margin: "5px 0px" }}>
              Rejection Reasons
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <TextField
              fullWidth={false}
              placeholder='Search Rejection Reasons...'
              size='small'
              InputProps={{
                startAdornment: <SearchOutlined fontSize='small' sx={{ mr: 0.75 }} color="inherit" />,
                endAdornment: (
                  <IconButton
                    size='small'
                    sx={{ ml: 0.75 }}
                    disabled={["", null, undefined].includes(searchRejectValue)}
                    onClick={() => setSearchRejectValue("")}
                  >
                    <CloseRounded fontSize='small' />
                  </IconButton>
                ),
              }}
              value={searchRejectValue}
              onChange={(e) => setSearchRejectValue(e.target.value)}
            />
          </div>
        }
        rowCount={filteredRejectData.length}
        icons={{
          ArrowDownwardIcon: (props: SvgIconProps) => <SwitchLeftIcon {...props} />,
        }}
        muiPaginationProps={{
          rowsPerPageOptions: [10],
          showFirstButton: false,
          showLastButton: false,
          SelectProps: {
            style: { display: 'none' }, 
          },
        }}
        enablePagination={true}
        state={{
          pagination: paginationReject,
          globalFilter,
        }}
        renderBottomToolbarCustomActions={() => (
          <CustomPagination
            page={paginationReject.pageIndex}
            rowsPerPage={10}
            rowCount={filteredRejectData.length}
            onChangePage={(page) => setPaginationReject({ ...paginationReject, pageIndex: page, pageSize: 10 })}
            showCount={false}
          />
        )}
        onGlobalFilterChange={setGlobalFilter}
      />

<MaterialReactTable
  columns={columns}
  data={filteredHoldData}  
  initialState={{
    density: 'compact',
    showGlobalFilter: true,
    columnPinning: { left: ['mrt-row-select', 'reasonName'] },
  }}
  enableBottomToolbar={true}
  enableGlobalFilterModes
  enableStickyHeader
  renderTopToolbar={
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
      <Typography variant="h6" className="header" sx={{ pl: 2, margin: "5px 0px" }}>
        On-Hold Reasons
      </Typography>
      <div style={{ flexGrow: 1 }} />
      <TextField
        fullWidth={false}
        placeholder='Search On-Hold Reasons...'
        size='small'
        InputProps={{
          startAdornment: <SearchOutlined fontSize='small' sx={{ mr: 0.75 }} color="inherit" />,
          endAdornment: <IconButton size='small'
            sx={{ ml: 0.75 }}
            disabled={["", null, undefined].includes(searchValue)}
            onClick={() => setSearchValue("")}
          >
            <CloseRounded fontSize='small' />
          </IconButton>
        }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  }
  rowCount={filteredHoldData.length}
  icons={{
    ArrowDownwardIcon: (props: SvgIconProps) => <SwitchLeftIcon {...props} />
  }}
  muiPaginationProps={{
    rowsPerPageOptions: [10],
    showFirstButton: false,
    showLastButton: false,
    SelectProps: {
      style: { display: 'none' }, 
    },
  }}
  enablePagination={true}
  state={{
    pagination: paginationHold,
    globalFilter,
  }}
  renderBottomToolbarCustomActions={() => (
    <CustomPagination
      page={paginationHold.pageIndex}
      rowsPerPage={10}
      rowCount={filteredHoldData.length}
      onChangePage={(page) => setPaginationHold({ ...paginationHold, pageIndex: page, pageSize: 10 })}
      showCount={false}
    />
  )}
  onGlobalFilterChange={setGlobalFilter}
/>

        {/* <MaterialReactTable

          columns={columns}
          //  enableRowSelection
          data={reasonDataActive} // && reasonData.filter((i:any) => i.reasonType === "3")}
          initialState={{ density: 'compact' }}
          enableBottomToolbar={true}
          enableGlobalFilter={false}
          enableStickyHeader
          renderTopToolbar={
            <Typography variant="h6" className="header" sx={{ pl: 2, margin: "5px 0px" }}>
              Not Interested Reasons
            </Typography>
          }
          rowCount={reasonDataActive.length}

        />
 */}

        {
          addReasonsDialogOpen ?
            <AddNewReason
              open={addReasonsDialogOpen}
              handleClose={handleCloseAddReasonsDialog}
              add={!isEditMode}
              reasonData={editingReasons}

            />
            :
            null
        }

      </div>
    </div >
  )
}

export default Reason;