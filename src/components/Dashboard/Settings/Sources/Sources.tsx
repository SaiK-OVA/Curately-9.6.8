import { useState, useEffect, useMemo, useCallback } from "../../../../shared/modules/React";
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
//import Box from '@mui/material/Box';

import { Grid, Button, IconButton } from '../../../../shared/modules/commonImports';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
//import { Dialog, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog'
//import DialogContentText from '@mui/material/DialogContentText';  //Need to add in shared modules
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_SortingState } from "../../../../shared/modules/MaterialReactTable";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import "./Sources.scss";
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import AddSources from "./AddSources";

import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
// import { sourcesData } from "./SourcesData";
// import Switch from "@mui/material/Switch";
import { SvgIconProps } from '@mui/material/SvgIcon';
import { userLocalData } from "../../../../shared/services/userData";
import LuxonDateParser from '../../../../shared/services/LuxonDateParser';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import { debounce } from "lodash";

const Sources = () => {
  const isSourceAddSettingEnabled = (userLocalData.checkSettings(110005) === 5) || (userLocalData.checkSettings(110005) === 6);
  const isSourceDeleteSettingEnabled = (userLocalData.checkSettings(110005) === 6);

  interface SourcesType {
    sourcetypeid?: string;
    sourceName?: string;
    description?: string;
    status?: boolean;
    createdOn?: string | null;
    sourceType?: string | null;
    clientId?: string | null;
  }



  let clientId = userLocalData.getvalue('clientId');

  const [sourceData, setSourceData] = useState<SourcesType[]>([]);
  // const [filtersExpand,] = useState(false);
  // const [rowCount,] = useState(0);

  const [editingSources, setEditingSources] = useState({
    sourceId: "",
    sourceName: "",
    description: "",
    sourceTypeId: "",
    clientId: ""
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const [rowSelection, setRowSelection] = useState({});
  const [addSourcesDialogOpen, setAddSourcesDialogOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');
  const [filteredData, setFilteredData] = useState<SourcesType[]>([]);

  const [sorting, setSorting] = useState<MRT_SortingState>([{
    desc: true,
    id: 'createdDate' ///createdDate
  }]);
  const fetchSourceDetails = (sourceid: string) => {
    return new Promise((resolve, reject) => {
      trackPromise(

        //    ApiService.getCall(216, `QADemoCurately/getSourceListbyId/${sourceid}/${clientId}`)
        ApiService.getCall('admin', `getSourceListbyId/${sourceid}/${clientId}`)
          .then((result) => {

            if (result.data && result.data.sourceid) {
              const optionDetails = result.data;
              setEditingSources({
                sourceId: optionDetails.sourceid,
                sourceName: optionDetails.sourcename,
                description: optionDetails.description,
                sourceTypeId: optionDetails.sourcetypeid,
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
    const filtered = sourceData.filter(row => {
      const filter = globalFilter || ''; // Ensure globalFilter is a string
      return (
          row.sourceName?.toLowerCase().includes(filter.toLowerCase())      );
    });
    setFilteredData(filtered);
    setPagination(prev => ({
      ...prev,
      pageIndex: 0
    }));
  }, [globalFilter,sourceData]);

  const openEditModal = (sourceid: any) => {
    fetchSourceDetails(sourceid)
      .then(() => {
        setAddSourcesDialogOpen(true);  // Open the modal only after state is updated
        saveAuditLog(4236);
      })
      .catch(error => {
        showToaster("Unable to fetch User Data", error)
      });
  };

  const openAddModal = () => {
    setEditingSources({
      sourceId: "",
      sourceName: "",
      description: "",
      sourceTypeId: "",
      clientId: ""
    })
    setAddSourcesDialogOpen(true);
    setIsEditMode(false);
  };

  // const convertToIST = (convertDate: any) => {
  //   const estDate = new Date(convertDate);
  //   const istDate = new Date(estDate.getTime() + (9.5 * 60 * 60 * 1000));

  //   const isDate = (istDate.toLocaleString() ? DateTime.fromFormat(istDate.toLocaleString(), 'dd/MM/yyyy, hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : "");
  //   //  console.log(isDate); 
  //   return isDate;
  // };


  const handleCloseAddSourcesDialog = (addorUpdate: boolean) => {
    setAddSourcesDialogOpen(false);
    addorUpdate && loadSourceList();
  };

  const loadSourceList = useCallback(debounce(() => {
    trackPromise(

      //ApiService.getCall(216, `QADemoCurately/getSourceList/${clientId}`)
      ApiService.getCall('admin', `getSourceList/${clientId}`)
        .then((response: any) => {

          let sourceData = response.data.list;
          for (let sd = 0; sd < sourceData.length; sd++) {
            if (sourceData[sd].createdDate?.length > 19) {
              sourceData[sd].createdDate = LuxonDateParser.ServerEDTToSystem(sourceData[sd].createdDate.substring(0, 19), "yyyy-MM-dd hh:mm:ss", "MM/dd/yyyy hh:mm a");
            }

          }

          setSourceData(response.data.list);
          setRowCount(response.data.list.length)
        }
        )
    )
  }, 400), [])

  const debouncedLoadSourceList = debounce(loadSourceList, 300);



  useEffect(() => {
    (!addSourcesDialogOpen) && debouncedLoadSourceList();
    //   setSorting([{
    //     desc: true,
    //     id: 'createdDate' ///createdDate
    // }]);
  }, []);

  const handleDeleteSource = (SourceId: string, sourceName: string) => {
    confirmDialog(`Are you sure you want to delete ${sourceName} Source ?`, () => {
      deleteSourceId(SourceId);
      saveAuditLog(4237);
      //  loadSourceList();
    });
  };


  const deleteSourceId = (SourceId: string) => {
    trackPromise(
      // http://35.155.202.216:8080/QADemoCurately/deleteSource
      // ApiService.deleteById(216, 'QADemoCurately/deleteclient', clientId)
      // ApiService.getCall(216, `QADemoCurately/deleteSource/${SourceId}/${clientId}`)
      ApiService.getCall('admin', `deleteSource/${SourceId}/${clientId}`)
        .then(
          (response: any) => {

            if (response.data.Success) {
              showToaster
                ('Source has been deleted successfully.', 'success');
              loadSourceList();
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
        accessorKey: "sourceName",
        header: "Name",
        enableColumnPinning: true,
        size: 350,
      },
      {
        accessorKey: "sourceType",
        header: "Type",
        size: 350,
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
        size: 300,

      },
      // {
      //   accessorKey: "isActive",
      //   header: "Status",
      //   Cell: ({ renderedCellValue }) => {

      //     return <Switch checked={Boolean(renderedCellValue)} size="small" />
      //   },

      // },

      {
        accessorKey: "Actions",
        header: "Actions",
        enableSorting: false,
        Cell: ({ row }) => (
          <Stack key={row.original.sourceId}>
            <Stack direction={"row"}>
              {
                isSourceAddSettingEnabled ?
                  <Tooltip title="Edit" placement="top" color="primary">
                    <IconButton onClick={() => { openEditModal(row.original.sourceId) }}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  :
                  null
              }
              {
                isSourceDeleteSettingEnabled ?
                  <Tooltip title="Delete" placement="top" color="primary">
                    <IconButton onClick={() => { handleDeleteSource(row.original.sourceId, row.original.sourceName); }}>
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
    saveAuditLog(4233)
  }, []);

  
const handlePaginationChange = (newPage: number) => {
  if (newPage > pagination.pageIndex) {
    saveAuditLog(4238);
  } else if (newPage < pagination.pageIndex) {
    saveAuditLog(4239);
  }
};

  return (
    <div className="emailTemplateList pt-3 px-5" id="sourceList">
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
          Sources
        </Typography>
        <Stack direction="row" className="btn-container">
          <Button variant="contained" color="primary" size="small" onClick={() => { saveAuditLog(4234); openAddModal() }} >New Sources</Button>
        </Stack>
      </Grid>
      <Grid container className="customCard p-0 filterExpand-grid" >
        <Grid sx={{ width: 'calc(100%)' }}>
          <div className={`MRTableCustom  pl-0 `}>
            <MaterialReactTable
              columns={columns}
              // enableRowSelection
              data={filteredData}
              //  onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
              state={{
                rowSelection, pagination, sorting,
                globalFilter
              }}
              enablePinning
              enableStickyHeader
              initialState={{
                columnPinning: { left: ['mrt-row-select', 'sourceName'] },
                density: 'compact',
                showGlobalFilter: true,

              }}
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
                  onChangePage={(page: any) => {setPagination({ ...pagination, pageIndex: page, pageSize: 10 });
                  handlePaginationChange(page);}}
                  showCount={true}
                />
              )}
              onGlobalFilterChange={setGlobalFilter}
              enableSorting
              onSortingChange={setSorting}
              enableDensityToggle={false}
              enableFullScreenToggle
              // enableColumnResizing
              enableFilters={false}
              enableGlobalFilterModes
              columnResizeMode="onChange"
              onPaginationChange={setPagination}
              getRowId={(row) => row.sourceId}

              icons={{
                ArrowDownwardIcon: (props: SvgIconProps) => <SwitchLeftIcon  {...props} />
              }}
              rowCount={filteredData.length}
            />
          </div>
        </Grid>

        {
          (addSourcesDialogOpen) ?
            <AddSources
              open={addSourcesDialogOpen}
              handleClose={handleCloseAddSourcesDialog}
              sourceData={editingSources}
              add={!isEditMode}
            />
            :
            null

        }
      </Grid>
    </div>
  )
}

export default Sources
