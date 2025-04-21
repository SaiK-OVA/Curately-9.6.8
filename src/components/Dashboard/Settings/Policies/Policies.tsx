import { useState, useEffect, useMemo, useCallback } from "../../../../shared/modules/React";
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Grid, Button, IconButton } from '../../../../shared/modules/commonImports';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { Tooltip } from "../../../../shared/modules/MaterialImports/ToolTip";
import "./Policies.scss";
import { confirmDialog } from "../../../shared/ConfirmDialog/ConfirmDialog";
import AddPolicies from "./AddPolicies";
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import ApiService from '../../../../shared/api/api';
import { userLocalData } from "../../../../shared/services/userData";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { SvgIconProps } from '@mui/material/SvgIcon';
import CustomPagination from '../../../shared/CustomPagination/CustomPagination';
import { debounce } from "lodash";
import { Dialog, DialogTitle, DialogContent, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import { CloseIcon } from "../../../../shared/modules/MaterialImports/Dialog";
import Editor from "../../../shared/EmailDialogBox/EmailBody";
import { ExpandMoreIcon } from "../../../../shared/modules/MaterialImports/Accordion";

const Policies = () => {
  let clientId = userLocalData.getvalue('clientId');
  let recrId = userLocalData.getvalue('recrId');
  const [policies, setPolicies] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [addPoliciesDialogOpen, setAddPoliciesDialogOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<any>([{

    policyId: '',
    policyName: '',
    policyURL: '',
    policyContent: '',
    policyDownloadPath: '',
    policyType: ''
  }]);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);
  const [globalFilter, setGlobalFilter] = useState('');
  const [defaultPolicy, setDefaultPolicy] = useState('');



  const openEditModal = (policyId: any) => {
    fetchPolicyDetails(policyId)
      .then(() => {
        setIsEditMode(true);
        setAddPoliciesDialogOpen(true);
        saveAuditLog(4286);
      })
      .catch(error => {
        showToaster("Unable to fetch User Data", error)
      });
  };

  const openAddModal = () => {
    setIsEditMode(false);
    setEditingPolicy(null);
    setAddPoliciesDialogOpen(true);
  };


  const handlePolicySaveSuccess = (success: any) => {
    setAddPoliciesDialogOpen(false);
    if (success) {
      loadPolicyList();
    }
  };


  const handleDeletePolicy = (policyId: string, policyName: string) => {
    confirmDialog(`Are you sure you want to delete ${policyName} Policy?`, () => {
      deletePolicy(policyId);
    });
  };
  const deletePolicy = (policyId: string) => {
    trackPromise(
      // ApiService.deleteById(216, `QADemoCurately/deletePolicy/${policyId}/${recrId}`, clientId)
      ApiService.deleteById('admin', `deletePolicy/${policyId}/${recrId}`, clientId)
        .then(
          (response: any) => {

            if (response.data.Status === 200) {
              showToaster('Policy has been deleted successfully.', 'success');
              loadPolicyList();
              saveAuditLog(4287);
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

  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      pageIndex: 0
    }));
  }, [globalFilter]);

  const loadPolicyList = useCallback(debounce(() => {
    trackPromise(
      // ApiService.getCall(216, `/QADemoCurately/getPolicyByClientId/${clientId}`)
      ApiService.getCall('admin', `getPolicyByClientId/${clientId}`)
        .then((response: any) => {
          console.log(response)
          setPolicies(Array.isArray(response.data.Policy) ? response.data.Policy : []);
          setRowCount(response.data.Policy.length)
        }
        )
    )
  }, 400), []);

  useEffect(() => {
    loadPolicyList();
    saveAuditLog(4282);
  }, []);

  const saveAuditLog = (id: number) => {
    ApiService.saveAuditLog(id);
  }

  const handlePaginationChange = (newPage: number) => {
    if (newPage > pagination.pageIndex) {
      saveAuditLog(4288);
    } else if (newPage < pagination.pageIndex) {
      saveAuditLog(4289);
    }
  };


  // const fetchPolicyDetails = (policyId: any) => {
  //   return new Promise((resolve, reject) => {
  //     trackPromise(
  //       ApiService.getCall(216, `/QADemoCurately/getPolicyById/${policyId}/${clientId}`)
  //         .then((result) => {
  //           console.log(result.data.Policy)
  //           console.log(result.data.Policy[0].policyName);
  //           if (result.data.Policy && result.data.Policy.length > 0) {
  //             const optionDetails = result.data.Policy[0];
  //             let policyType = '';
  //             if (optionDetails.policyURL) {
  //               policyType = 'url';
  //             } else if (optionDetails.policyContent) {
  //               policyType = 'content';
  //             } else if (optionDetails.policyDownloadPath) {
  //               policyType = 'upload';
  //             }
  //             setEditingPolicy({
  //               policyId: optionDetails.policyId,
  //               policyName: optionDetails.policyName,
  //               policyURL: optionDetails.policyURL,
  //               policyContent: optionDetails.policyContent,
  //               policyDownloadPath: optionDetails.policyDownloadPath,
  //               clientId: userLocalData.getvalue('clientId'),
  //               policyType: policyType
  //             });
  //             // console.log(editingPolicy)
  //             setIsEditMode(true);
  //             resolve(result);
  //           } else {
  //             showToaster("No policy data found", 'error');
  //             reject(new Error("No policy data found"));
  //           }
  //         })
  //         .catch((error) => {
  //           console.error('Error fetching policy details:', error);
  //           showToaster("Unable to fetch policy data", 'error');
  //           reject(error);
  //         })
  //     );
  //   });
  // }
  const fetchPolicyDetails = (policyId: any) => {
    return trackPromise(
      // ApiService.getCall(216, `/QADemoCurately/getPolicyById/${policyId}/${clientId}`)
      ApiService.getCall('admin', `getPolicyById/${policyId}/${clientId}`)
        .then((result) => {
          if (result.data.Policy && result.data.Policy.length > 0) {
            const policyDetails = result.data.Policy[0];
            const policyType = policyDetails.policyURL ? 'url' :
              policyDetails.policyContent ? 'content' :
                policyDetails.policyDownloadPath ? 'upload' : '';
            const updatedPolicy = {
              policyId: policyDetails.policyId,
              policyName: policyDetails.policyName,
              policyURL: policyDetails.policyURL,
              policyContent: policyDetails.policyContent,
              policyDownloadPath: policyDetails.policyDownloadPath,
              clientId: userLocalData.getvalue('clientId'),
              policyType: policyType
            };

            setEditingPolicy(updatedPolicy); // Update all fields at once
            setIsEditMode(true);
            return updatedPolicy; // Resolve with the new policy data
          } else {
            showToaster("No policy data found", 'error');
            throw new Error("No policy data found"); // Use throw to reject the promise
          }
        })
        .catch((error) => {
          console.error('Error fetching policy details:', error);
          showToaster("Unable to fetch policy data", 'error');
          throw error; // Propagate error
        })
    );
  }
  useEffect(() => {
    if (!clientId) return;

    const fetchPolicyContent = async () => {
      try {
        const result = await trackPromise(
          ApiService.postWithData('admin', 'getPolicyContent', {
            clientId: clientId
          })
        );
        console.log(result);
        setDefaultPolicy(result?.data?.policyContentDetails?.policyContent || "");
      } catch (error) {
        console.error('Error fetching policy details:', error);
        showToaster("Unable to fetch policy data", 'error');
      }
    };

    fetchPolicyContent();
  }, [clientId]);


  const [dialogOpen, setDialogOpen] = useState(false);
  const [docURL, setDocURL] = useState("");

  const handleOpenDialog = (url: string) => {
    setDocURL(url);
    setDialogOpen(true);
  };
  const handleSavePolicyContent = async () => {
    if (!clientId || !defaultPolicy) {
      showToaster("Client ID or policy content is missing", 'error');
      return;
    }

    try {
      const response = await trackPromise(
        ApiService.postWithData('admin', 'saveOrUpdatePolicyContent', {
          clientId: clientId,
          policyContent: defaultPolicy
        })
      );

      if (response?.data?.Status === 200) {
        showToaster("Policy content updated successfully", 'success');
      } else {
        showToaster(response?.data?.Message || "Failed to update policy content", 'error');
      }
    } catch (error) {
      console.error("Error saving policy content:", error);
      showToaster("Unable to save policy content", 'error');
    }
    setExpanded(false);
  };
  const handleAccordionChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDocURL("");
  };

  const columns: MRT_ColumnDef<any>[] = useMemo(() => [
    {
      accessorKey: 'policyName',
      header: 'Policy Name',
      size: 200,
    },
    {
      accessorKey: 'content',
      header: 'Policy Details',
      size: 400,
      Cell: ({ row }) => {
        const policy = row.original;
        let displayValue = policy.policyURL || policy.policyContent || policy.policyDownloadPath;
        if (displayValue && displayValue.length > 50) {
          displayValue = `${displayValue.substring(0, 47)}...`;
        }
        // if (policy.policyURL) {
        //   return <a href={policy.policyURL} target="_blank">{displayValue}</a>;
        // }
        // if (policy.policyDownloadPath) {
        //   return <a href={`${import.meta.env.VITE_URL_AWS}${policy.policyDownloadPath}`} target="_blank">{displayValue}</a>;
        // }
        if (policy.policyURL || policy.policyDownloadPath) {
          const url = policy.policyURL || `${import.meta.env.VITE_URL_AWS}${policy.policyDownloadPath}`;
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                handleOpenDialog(url);
              }}
            >
              {displayValue}
            </a>

          );
        }

        return displayValue || 'No details available';
      }
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      enableSorting: false,
      Cell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => { openEditModal(row.original.policyId) }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => { handleDeletePolicy(row.original.policyId, row.original.policyName) }}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
      size: 100,
    },
  ], [handleOpenDialog]);

  return (
    <div className="policies pt-3 px-5">
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
          Policies
        </Typography>
        <Stack direction="row" className="btn-container">
          <Button variant="contained" color="primary" size="small" onClick={() => { saveAuditLog(4283); openAddModal() }} >New Policies</Button>
        </Stack>
      </Grid>
      <Box mb={2}>
        <Accordion expanded={expanded} onChange={handleAccordionChange}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="m-0"
            sx={{ minHeight: "48px !important" }}
          >
            <Typography>
              <Typography>
                {expanded ? (
                  'Please provide policy details'
                ) : (
                  <>
                    <strong>Standard policy :</strong>{' '}
                    {defaultPolicy.replace(/<[^>]*>/g, '')}
                  </>
                )}
              </Typography>

            </Typography>

          </AccordionSummary>

          <AccordionDetails>
            <Box mb={3}>
              {/* Your Editor component */}
              <Editor
                toolbarId="emailBody"
                id="emailBody"
                placeholder="Policies"
                editorHtml={defaultPolicy}
                handleChange={(e: any) => setDefaultPolicy(e)}
                policyPlaceholder={true}
              />
            </Box>

            <Box display="flex" justifyContent="flex-end" pt={2}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSavePolicyContent}
              >
                Save
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

      </Box>


      <Grid container className="customCard p-4">
        <Grid sx={{ width: 'calc(100%)' }}>
          <div className={`MRTableCustom  pl-0 `}>
            <MaterialReactTable
              columns={columns}
              data={policies}
              enablePinning
              enableSorting
              enableColumnFilters={true} // Enable column-specific search
              enableGlobalFilter={true} // Enable global search
              muiTableContainerProps={{ sx: { maxHeight: '70vh' } }}
              icons={{
                ArrowDownwardIcon: (props: SvgIconProps) => <SwitchLeftIcon {...props} />
              }}
              initialState={{
                columnPinning: { left: ["mrt-row-select"] },
                density: "compact",
                showGlobalFilter: true
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
                  rowCount={rowCount}
                  onChangePage={(page: any) => {
                    setPagination({ ...pagination, pageIndex: page, pageSize: 10 });
                    handlePaginationChange(page);
                  }}
                  showCount={false}
                />
              )}
              onGlobalFilterChange={setGlobalFilter}
              state={{
                pagination,
                globalFilter,
              }}
            />
          </div>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>
          Document Viewer
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <iframe src={docURL} title="Document Viewer" width="100%" height="600px" />
        </DialogContent>
      </Dialog>
      {policies && (
        <AddPolicies
          open={addPoliciesDialogOpen}
          handleClose={handlePolicySaveSuccess}
          add={!isEditMode}
          policyData={editingPolicy}
        />
      )}
    </div>
  );
}

export default Policies;
