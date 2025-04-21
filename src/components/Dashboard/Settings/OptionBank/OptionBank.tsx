import { useState, useEffect, useMemo, useCallback } from "../../../../shared/modules/React";
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
//import Box from '@mui/material/Box';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DateTime } from '../../../../shared/modules/Luxon';
//import { Dialog, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog'
//import DialogContentText from '@mui/material/DialogContentText';  //Need to add in shared modules
import { Grid, Button, IconButton } from '../../../../shared/modules/commonImports'
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_SortingState } from "../../../../shared/modules/MaterialReactTable";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import "./OptionBank.scss";
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import AddOptionBank from "./AddOptionBank";

import { userLocalData } from "../../../../shared/services/userData";
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
//import { optionBanksData } from "./OptionBankData";
//import Switch from "@mui/material/Switch";
import { SvgIconProps } from '@mui/material/SvgIcon';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import { debounce } from "@mui/material";

const OptionBanks = () => {

  const isOptionBankAddSettingEnabled = (userLocalData.checkSettings(130004) === 5) || (userLocalData.checkSettings(130004) === 6);
  const isOptionBankDeleteSettingEnabled = (userLocalData.checkSettings(130004) === 6);


  let clientId = userLocalData.getvalue('clientId');
  // let recrId = userLocalData.getvalue('recrId');

  // interface OptionBankType {
  //   optionBankId: string;
  //   optionBankName: string;
  //   options: string[];
  //   createdby?: string | null;
  //   clientId: string;
  // }

  const [optionData, setOptionData] = useState<any[] | never[]>([]);

  //const [openDeletePopup, setOpenDeletePopup] = React.useState(false);

  const [filtersExpand,] = useState(false);
  const [sorting, setSorting] = useState<MRT_SortingState>([{
    desc: true,
    id: 'createddate' ///createdDate
  }]);

  const [editingOptionBank, setEditingOptionBank] = useState({
    optionBankId: "",
    optionBankName: "",
    options: "",
    createdby: "",
    clientId: ""
  });

  const [rowSelection, setRowSelection] = useState({});
  const [addOptionBankDialogOpen, setAddOptionBankDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');

  const fetchOptionBankDetails = (optionBankId: string) => {
    return new Promise((resolve, reject) => {
      trackPromise(
        //   ApiService.getByParams(193, `Curately/Admin/optionbank_list.jsp`, { clientId: userLocalData.getvalue('clientId'), action: 'get', optionBankId })
        // ApiService.getCall(216, `QADemoCurately/getOptionBankListbyId/${optionBankId}/${clientId}`)
        ApiService.getCall('admin', `getOptionBankListbyId/${optionBankId}/${clientId}`)
          .then((result) => {

            if (result.data.list && result.data.list[0].optionbankId) {
              const optionDetails = result.data.list[0];
              setEditingOptionBank({
                optionBankId: optionDetails.optionbankId,
                optionBankName: optionDetails.optionbankname,
                options: optionDetails.list,
                createdby: optionDetails.createdby,
                clientId: userLocalData.getvalue('clientId')
              })
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

  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      pageIndex: 0
    }));
  }, [globalFilter]);


  const openEditModal = (optionBankId: any) => {
    fetchOptionBankDetails(optionBankId)
      .then(() => {
        setAddOptionBankDialogOpen(true); // Open the modal only after state is updated
        saveAuditLog(4270);
      })
      .catch(error => {
        showToaster("Unable to fetch User Data", error)
      });
  };

  const openAddModal = () => {
    setEditingOptionBank({
      optionBankId: "",
      optionBankName: "",
      options: "",
      createdby: "",
      clientId: ""
    })
    setAddOptionBankDialogOpen(true);
    setIsEditMode(false);
  };

  // const convertToIST = (convertDate: any) => {
  //   const estDate = new Date(convertDate);
  //   const istDate = new Date(estDate.getTime() + (9.5 * 60 * 60 * 1000));

  //   const isDate = (istDate.toLocaleString() ? DateTime.fromFormat(istDate.toLocaleString(), 'dd/MM/yyyy, hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : "");
  //   //  console.log(isDate); 
  //   return isDate;
  // };


  const handleCloseOptionDialog = (addorUpdate: boolean) => {
    setAddOptionBankDialogOpen(false);
    addorUpdate && loadOptionList();

  };

  const loadOptionList = useCallback(
    debounce(() => {
      trackPromise(
        ApiService.getCall('admin', `getOptionBankList/${clientId}`)
          .then((response: any) => {
            setOptionData(response.data.list);
            setRowCount(response.data.list.length);
          })
      );
    }, 400),
    [clientId]
  );


  useEffect(() => {
    if (!addOptionBankDialogOpen) {
      loadOptionList();
    }
  }, [addOptionBankDialogOpen, loadOptionList]);

  const handleDeleteOptionBank = (OptionBankId: string, OptionBankName: string) => {
    confirmDialog(`Are you sure you want to delete ${OptionBankName} OptionBank?`, () => {
      deleteOptionBankId(OptionBankId);
      saveAuditLog(4271);
      //    loadOptionList();
    });
  };


  const deleteOptionBankId = (OptionBankId: string) => {
    trackPromise(
      // http://35.155.202.216:8080/QADemoCurately/deleteOptionBank
      // ApiService.deleteById(216, `QADemoCurately/deleteOptionBank/${OptionBankId}`, clientId)
      ApiService.deleteById('admin', `deleteOptionBank/${OptionBankId}`, clientId)
        .then(
          (response: any) => {

            if (response.data.Success) {
              showToaster
                ('OptionBank has been deleted successfully.', 'success');
              loadOptionList();
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

        accessorKey: "optionbankname",
        header: "Name",
        enableColumnPinning: true,
        size: 350
      },
      {
        accessorKey: "list",
        header: "Options",
        Cell: ({ renderedCellValue }) => {
          if (Array.isArray(renderedCellValue)) {
            return renderedCellValue.join(', ');
          }
          return renderedCellValue;
        },
        size: 350,
      },

      // {
      //   accessorKey: "Status",
      //   header: "Status",
      //   Cell: ({ renderedCellValue }) => {

      //     return <Switch checked={Boolean(renderedCellValue)} size="small" />
      //   },
      // },
      {
        accessorKey: "createddate",
        header: "Created On",
        Cell: ({ renderedCellValue, row }) => (
          <span>
            {/* {row.original.createddate ? convertToIST(row.original.createddate) : ""} */}
            {row.original.createddate ? DateTime.fromFormat(row.original.createddate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy') : ""}
          </span>
        ),
        size: 350,
      },
      // {
      //   accessorKey: "Type",
      //   header: "Type",
      // },
      {
        accessorKey: "Actions",
        header: "Actions",
        enableSorting: false,
        Cell: ({ row }) => (
          <Stack key={row.original.optionbankId}>
            <Stack direction={"row"}>
              {
                isOptionBankAddSettingEnabled ?
                  <Tooltip title="Edit" placement="top" color="primary">
                    <IconButton onClick={() => { openEditModal(row.original.optionbankId) }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  :
                  null
              }
              {
                isOptionBankDeleteSettingEnabled ?
                  <Tooltip title="Delete" placement="top" color="primary">
                    <IconButton onClick={() => { handleDeleteOptionBank(row.original.optionbankId, row.original.optionbankname) }}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  :
                  null
              }
            </Stack>
          </Stack>
        ),
        size: 350
      },
    ],
    []
  );

  const saveAuditLog = (id: number) => {
    ApiService.saveAuditLog(id);
  }

  useEffect(() => {
    saveAuditLog(4267)
  }, []);

  return (
    <div className="emailTemplateList pt-3 px-5" id="optionBankList">
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
          OptionBanks
        </Typography>
        <Stack direction="row" className="btn-container">
          <Button variant="contained" color="primary" size="small" onClick={() => { saveAuditLog(4268); openAddModal() }} >New OptionBank</Button>
        </Stack>
      </Grid>
      <Grid container className="customCard p-0 filterExpand-grid" >
        <Grid sx={{ width: filtersExpand ? 'calc(100%)' : 'calc(100% - 0px)' }}>
          <div className={`MRTableCustom  pl-0 `}>

            <MaterialReactTable
              columns={columns}
              //   enableRowSelection
              data={optionData}
              onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
              state={{ rowSelection, sorting, pagination, globalFilter }}
              enablePinning
              enableStickyHeader
              initialState={{
                columnPinning: { left: ['mrt-row-select', 'optionbankname'] },
                density: 'compact',
                showGlobalFilter: true,
              }}
              // enableSorting
              onSortingChange={setSorting}
              enableDensityToggle={false}
              enableFullScreenToggle
              // enableColumnResizing
              // enableFilters={false}
              enableGlobalFilterModes
              columnResizeMode="onChange"
              onPaginationChange={setPagination}
              getRowId={(row) => row.optionbankId}
              icons={{
                ArrowDownwardIcon: (props: SvgIconProps) => <SwitchLeftIcon  {...props} />
              }}
              rowCount={optionData.length}
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
                  rowCount={rowCount}
                  onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page, pageSize: 10 })}
                  showCount={false}
                />
              )}
              onGlobalFilterChange={setGlobalFilter}
            />
          </div>
        </Grid>

        {
          (addOptionBankDialogOpen) ?
            <AddOptionBank
              open={addOptionBankDialogOpen}
              handleClose={handleCloseOptionDialog}
              optionData={editingOptionBank}
              add={!isEditMode}
            />
            :
            null

        }
      </Grid>
    </div>
  )
}

export default OptionBanks
