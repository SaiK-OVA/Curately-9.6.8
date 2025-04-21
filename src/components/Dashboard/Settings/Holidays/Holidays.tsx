import { useState, useEffect, useMemo, useCallback } from "../../../../shared/modules/React"
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
//import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { DateTime } from 'luxon';
//import { Dialog, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog'
//import DialogContentText from '@mui/material/DialogContentText';  //Need to add in shared modules
import { Grid, Button, IconButton } from '../../../../shared/modules/commonImports';
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Switch } from "../../../../shared/modules/MaterialImports/Switch";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_SortingState } from "../../../../shared/modules/MaterialReactTable";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import "./Holidays.scss";
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import AddHolidays from "./AddHolidays";
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
// import { holidaysData } from "./HolidaysData";
//import Switch from "@mui/material/Switch";
import { SvgIconProps } from '@mui/material/SvgIcon';
import { userLocalData } from "../../../../shared/services/userData";
import { DateTime } from "../../../../shared/modules/Luxon";
import { debounce } from "lodash";

const Holidays = () => {
  const isHolidayAddSettingEnabled = (userLocalData.checkSettings(130008) === 5) || (userLocalData.checkSettings(130008) === 6);

  const isHolidayDeleteSettingEnabled = (userLocalData.checkSettings(130008) === 6);

  let clientId = userLocalData.getvalue('clientId');

  interface HolidaysType {
    holidayId?: string;
    holidayName: string;
    holidayDate: string;
    holidayType?: string | null;
    holidayStatus: boolean;
    clientId?: string | null;
  }


  const [holidayData, setHolidayData] = useState<HolidaysType[]>([]);

  // const [filtersExpand,] = useState(false);
  const [editingHolidays, setEditingHolidays] = useState<any>({
    holidayId: "",
    holidayName: "",
    holidayDate: "",
    holidayType: "false",
    clientId: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);
  // const [rowSelection, setRowSelection] = useState({});
  const [addHolidaysDialogOpen, setAddHolidaysDialogOpen] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');
  const [filteredData, setFilteredData] = useState<HolidaysType[]>([]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<MRT_SortingState>([{
    desc: true,
    id: 'holidayDate' ///createdDate
  }]);

  useEffect(() => {
    const filtered = holidayData.filter(row => {
      const filter = globalFilter || ''; // Ensure globalFilter is a string
      return (
        row.holidayName?.toLowerCase().includes(filter.toLowerCase()));
    });
    setFilteredData(filtered);
    setPagination(prev => ({
      ...prev,
      pageIndex: 0
    }));
  }, [globalFilter, holidayData]);
  //   const paginatedData = useMemo(() => {
  //     const start = pagination.pageIndex * pagination.pageSize;
  //     const end = start + pagination.pageSize;
  //     return filteredData.slice(start, end);
  // }, [filteredData, pagination.pageIndex, pagination.pageSize]);

  const fetchHolidayDetails = (holidayId: string) => {
    return new Promise((resolve, reject) => {
      trackPromise(
        //   ApiService.getCall(216, `QADemoCurately/getHolidaysListbyId/${holidayId}/${clientId}`)

        ApiService.getCall('admin', `getHolidaysListbyId/${holidayId}/${clientId}`)
          .then((result) => {

            if (result.data.list && result.data.list[0].holidayId) {
              const optionDetails = result.data.list[0];
              setEditingHolidays({
                holidayId: optionDetails.holidayId,
                holidayName: optionDetails.holidayName,
                holidayDate: optionDetails.holidayDate,
                holidayType: optionDetails.holidayType,
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


  const openEditModal = (holidayId: any) => {
    fetchHolidayDetails(holidayId)
      .then(() => {
        setAddHolidaysDialogOpen(true); // Open the modal only after state is updated
      })
      .catch(error => {
        showToaster("Unable to fetch User Data", error)
      });
  };

  const openAddModal = () => {
    setEditingHolidays({
      holidayId: "",
      holidayName: "",
      holidayDate: "",
      holidayType: "false",
      clientId: ""
    })
    setAddHolidaysDialogOpen(true);
    setIsEditMode(false);
    saveAuditLog(4241);
  };


  const handleCloseAddHolidaysDialog = (addorUpdate: boolean) => {
    setAddHolidaysDialogOpen(false);
    addorUpdate && loadHolidayList();
  };

  const loadHolidayList = useCallback(
    debounce(() => {
      trackPromise(
        ApiService.getCall('admin', `getHolidaysList/${clientId}`)
          .then((response) => {
            let tempArray = Array.isArray(response.data.list) ? response.data.list : [];
            tempArray = tempArray.filter((item: { holidayId: number; holidayName: string; holidayDate: string; holidayType: boolean; isActive: boolean; }) => item.holidayType || item.isActive);
            setHolidayData(tempArray);
            setRowCount(tempArray.length);
          })
      );
    }, 400), [clientId]
  );



  useEffect(() => {
    (!addHolidaysDialogOpen) && loadHolidayList();
  }, []);

  const handleDeleteHoliday = (HolidayId: string, holidayName: string) => {
    confirmDialog(`Are you sure you want to delete ${holidayName} ?`, () => {
      deleteHolidayId(HolidayId);
      // loadHolidayList();
      saveAuditLog(4244);
    });
  };


  const deleteHolidayId = (HolidayId: string) => {
    trackPromise(
      // http://35.155.202.216:8080/QADemoCurately/deleteHoliday
      // ApiService.deleteById(216, `QADemoCurately/deleteHolidays/${HolidayId}`, clientId)
      ApiService.deleteById('admin', `deleteHolidays/${HolidayId}`, clientId)
        .then(
          (response: any) => {

            if (response.data.Success) {
              showToaster('Holiday has been deleted successfully.', 'success');
              loadHolidayList();
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

  const enableOrDisableHoliday = (holidayId: string, active: boolean) => {
    trackPromise(
      // https://qaadminapi.curately.ai/curatelyAdmin/enableDisableHolidays
      ApiService.postWithData('admin', `enableDisableHolidays`, {
        clientId: clientId,
        isActive: active,
        holidayId: holidayId
      }).then((response) => {

        if (response.data.Success) {
          showToaster(`Holiday has been ${active ? "Enabled" : "Disabled"} successfully.`, 'success');
          loadHolidayList();
        } else {
          showToaster(response.data.Message ? response.data.Message : "An error occured while updating status", 'error');
        }

      }).catch((response: any) => {
        showToaster(response.response?.data?.Message ? response.response?.data?.Message : "An error occured while updating status", 'error');
      })
    );
  }


const columns: MRT_ColumnDef<any>[] = useMemo(
  () => [
    {
      accessorKey: "holidayName",
      header: "Holidays",
      size: 250
    },
    {
      accessorKey: "holidayDate",
      header: "Date",
      Cell: ({ row }) => (
        <span>
          {row.original.holidayDate ? DateTime.fromFormat(row.original.holidayDate.substring(0, 19), 'yyyy-MM-dd').toFormat('MM/dd/yyyy') : ""}
        </span>
      ),
      size: 250,
      sortType: 'datetime',
    },
    {
      accessorKey: "holidayType",
      header: "Type",
      size: 200,
      accessorFn: (row) => `${row.holidayType}`,
      Cell: ({ row }) => (
        <div>
          <span>
            {
              row.original.holidayType === true ? "Default" : "Custom"
            }
          </span>
        </div>
      )
    },

    // {
    //   accessorKey: "holidayStatus",
    //   header: "Status",
    //   Cell: ({ renderedCellValue }) => {

    //     return <Switch checked={Boolean(renderedCellValue)} size="small" />
    //   },

    //   size: 200
    // },


    {
      accessorKey: "Actions",
      header: "Enabled",
      enableSorting: false,
      Cell: ({ row }) => (
        <Stack key={row.original.holidayId}>
          {
            row.original.holidayType === true ?
              <Switch
                checked={Boolean(row.original.isActive)}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  enableOrDisableHoliday(row.original.holidayId, event.target.checked);
                }}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              :
              <Stack direction={"row"}>
                {
                  isHolidayAddSettingEnabled ?
                    <Tooltip title="Edit" placement="top" color="primary">
                      <IconButton onClick={() => { openEditModal(row.original.holidayId); saveAuditLog(4243) }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    :
                    null
                }
                {
                  isHolidayDeleteSettingEnabled ?
                    <Tooltip title="Delete" placement="top" color="primary">
                      <IconButton onClick={() => { handleDeleteHoliday(row.original.holidayId, row.original.holidayName) }}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
                    :
                    null
                }
              </Stack>
          }
        </Stack>
      ),
      size: 200
    },
  ],
  []
);

const saveAuditLog = (id: number) => {
  ApiService.saveAuditLog(id);
}

useEffect(() => {
  saveAuditLog(4240)
}, []);


const handlePaginationChange = (newPage: number) => {
  if (newPage > pagination.pageIndex) {
    saveAuditLog(4245);
  } else if (newPage < pagination.pageIndex) {
    saveAuditLog(4246);
  }
};

return (
  <div className="holidays pt-3 px-5">
    <Grid
      container
      direction="row"
      className="customCard px-4 py-2"
      justifyContent="space-between"
      alignItems="center"
      display="flex"
      sx={{ minHeight: 'auto !important' }}
    >
      <Typography variant="h6" className="headerName">
        Holidays
      </Typography>
      <Stack direction="row" className="btn-container">
        <Button variant="contained" color="primary" size="small" onClick={openAddModal} >New Holidays</Button>
      </Stack>
    </Grid>
    <Grid container className="customCard p-0" >
      <Grid sx={{ width: 'calc(100%)' }}>
        <div className={`MRTableCustom  pl-0 `}>
          <MaterialReactTable
            columns={columns}
            // enableRowSelection
            data={filteredData}
            // onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
            state={{ sorting, pagination, globalFilter }}
            enablePinning
            enableStickyHeader
            initialState={{
              columnPinning: { left: ['mrt-row-select', 'name'] },
              density: 'compact',
              showGlobalFilter: true,
            }}
            // enableSorting
            onSortingChange={setSorting}
            enableDensityToggle={false}
            enableFullScreenToggle
            // enableColumnResizing
            enableFilters={false}
            enableGlobalFilterModes
            columnResizeMode="onChange"
            onPaginationChange={setPagination}
            getRowId={(row) => row.holidayId}
            icons={{
              ArrowDownwardIcon: (props: SvgIconProps) => <SwitchLeftIcon  {...props} />
            }}
            rowCount={filteredData.length}
            muiPaginationProps={{
              rowsPerPageOptions: [10],
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
                rowsPerPage={10}
                rowCount={filteredData.length}
                onChangePage={(page: any) => {
                  setPagination({ ...pagination, pageIndex: page, pageSize: 10 });
                  handlePaginationChange(page);
                }}
                showCount={false}
              />
            )}
            onGlobalFilterChange={setGlobalFilter}
          />
        </div>
      </Grid>

      {
        addHolidaysDialogOpen ?
          <AddHolidays
            open={addHolidaysDialogOpen}
            handleClose={handleCloseAddHolidaysDialog}
            add={!isEditMode}
            holidayData={editingHolidays}

          />
          :
          null
      }
    </Grid>
  </div>
)
}

export default Holidays
