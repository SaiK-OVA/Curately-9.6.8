import  {React, useState, useEffect, useMemo, useCallback } from "../../../../../shared/modules/React"
import { useNavigate } from "react-router-dom";
//import CircularProgress from '@mui/material/CircularProgress';
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';
// import Box from '@mui/material/Box';
import {Button, Grid} from '../../../../../shared/modules/commonImports';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
//import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import PreviewComponent from "../MainComponent/Preview/Preview";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DateTime } from '../../../../../shared/modules/Luxon';
//import Paper from '@mui/material/Paper';

import {Dialog, DialogTitle, DialogContent} from '../../../../../shared/modules/MaterialImports/Dialog';
// import DialogActions from '@mui/material/DialogActions';
//import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
// import DialogContentText from '@mui/material/DialogContentText';
import ApiService from '../../../../../shared/api/api';


import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import {Stack} from "../../../../../shared/modules/MaterialImports/Stack";
// import React, {useState} from 'react';

import {ButtonGroup} from '../../../../../shared/modules/MaterialImports/ButtonGroup';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../../shared/modules/MaterialReactTable";

// import DialogTitle from '@mui/material/DialogTitle';
import {Divider} from '../../../../../shared/modules/MaterialImports/Divider';

//import LoopIcon from '@mui/icons-material/Loop';
import {Tabs, Tab} from '../../../../../shared/modules/MaterialImports/Tabs';
import {Tooltip} from "../../../../../shared/modules/MaterialImports/ToolTip";
import CloseIcon from '@mui/icons-material/Close';

import "./ListEmailBuilder.scss";
import { userLocalData } from "../../../../../shared/services/userData";
import { confirmDialog } from "../../../../shared/ConfirmDialog/ConfirmDialog";
import { showToaster } from "../../../../shared/SnackBar/SnackBar";

import EmailBuilderData from  "../Add/EmailBuilderData";
import { debounce } from "lodash";

// import { userLocalData } from "../../../../../shared/services/userLocalData";
// import { trackPromise } from "react-promise-tracker";
// import { showToaster } from "../../../../shared/SnackBar/SnackBar";

const ListEmailBuilder = () => {
    const navigate = useNavigate();
    // const [isShowList, setShowList] = useState(true);
    const [openPreview, setOpenPreview] = useState(false);
    const [listData, setListData] = useState<any[]>([]);
    const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
    //  const [formDetails, setFormDetails] = useState<any>(null);
    const [isReloadList, setIsReloadList] = useState(false);
    //    const [formName, setFormName] = useState("");
    //    const [formId, setFormId] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [filtersExpand, setFiltersExpand] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [templateEmailHtmlOpen, setTemplateEmailHtmlOpen] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState<any | null>(null);
    const [tabValue, setTabValue] = useState('My Templates');
    const [rowSelection, setRowSelection] = useState({});
    // const [selectedRowId, setSelectedRowId] = useState<string | null>(null)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25, //customize the default page size
    });

    const [templateData, setTemplateData] = useState({
        templateName: "",
        templateId: "",
        subject: "",
        description: "",
        jsonFile: "",
        htmlFile: "",
        createdBy: userLocalData.getvalue('recrId'),
        type: 1,
        isActive: true,
        clientId: userLocalData.getvalue('clientId')
    });


    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
        //  console.log(newValue);
        getEmailTemplatesList();
    };

    const tabList = ['All', 'My Templates'];

    const handleAdd = () => {
        // setFormData([])
        setSelectedTemplateId('');
       // navigate("/" + userLocalData.getvalue('clientName') + "/letter/EmailBuilder/add")
       setTemplateEmailHtmlOpen(true); 
    }


    const handleView = (id: string) => {
        // setFormData([])
        getFormDetails(id);
        // navigate("/" + userLocalData.getvalue('clientName') + "/letter/EmailBuilder/add")
    }
    const handleEdit = (id: string) => {
        // console.log(id)
        setSelectedTemplateId(id);
        setTemplateEmailHtmlOpen(true); 
      //  navigate(`/${userLocalData.getvalue('clientName')}/letter/EmailBuilder/edit/${id}`);
    }

    // const viewForm = async (form: any) => {

    //     getFormDetails(form.templateId);

    //     // navigate(`/formBuilder/view/${form.templateId}`);

    // }

    const getFormDetails = async (id: any) => {
        trackPromise(
            ApiService.getById('admin', 'getEmailBuilderTemplatesListById', (id ? id : "") + '/' + userLocalData.getvalue('clientId'))
                .then(async (response: any) => {
                    //  console.log(response.data); EmailTemplates
                    if (response.data?.EmailTemplates && response.data?.EmailTemplates.length && response.data?.EmailTemplates[0] && response.data.EmailTemplates[0].jsonFile) {
                        // setTemplate(response.data.EmailTemplates[0].jsonFile);
                        // addEmailTemplateFormik.setTouched('')
                        setTemplateData({
                            templateName: (response.data.EmailTemplates[0].templateName) ? response.data.EmailTemplates[0].templateName : "",
                            templateId: (id) ? id : "",
                            subject: (response.data.EmailTemplates[0].subject) ? response.data.EmailTemplates[0].subject : "",
                            description: (response.data.EmailTemplates[0].description) ? response.data.EmailTemplates[0].description : "",
                            jsonFile: (response.data.EmailTemplates[0].jsonFile) ? JSON.stringify(response.data.EmailTemplates[0].jsonFile) : "",
                            htmlFile: (response.data.EmailTemplates[0].htmlFile) ? response.data.EmailTemplates[0].htmlFile : "",
                            createdBy: userLocalData.getvalue('recrId'),
                            type: 1,
                            isActive: true,
                            clientId: userLocalData.getvalue('clientId')
                        });
                    } else {
                        setTemplateData({
                            templateName: "",
                            templateId: "",
                            subject: "",
                            description: "",
                            jsonFile: "",
                            htmlFile: "",
                            createdBy: userLocalData.getvalue('recrId'),
                            type: 1,
                            isActive: true,
                            clientId: userLocalData.getvalue('clientId')
                        });
                        showToaster('Error loading template', 'error');
                    }
                    setOpenPreview(true);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // alert('Error occurred.', 'error');
                })
        )
    }
    // const handleShowList = (flag: any) => {
    //     setShowList(flag)
    // }

    const handleDelete = async (id: string) => {
        let clientId = userLocalData.getvalue('clientId')
        try {
            ApiService.deleteById(214, `deleteEmailTemplates/${id}`, clientId)
                .then((response: any) => {
                    setOpenDeletePopup(false);
                    if (response.data.Success === true) {
                        showToaster(response.data.Message, "success");
                        setIsReloadList((prev: any) => !prev)
                    } else if (response.data.Error === true) {
                        showToaster(response.data.Message, "error");
                    } else {
                        showToaster("Something went wrong", "error");
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);


                });

        }
        catch (e) {
            //   console.log(e)
            setOpenDeletePopup(false);
        }
    }

    const handleCloseEditDialog = () => { 
        setTemplateEmailHtmlOpen(false); 
    };
    const handleCloseDeletePopup = () => {
        setOpenDeletePopup(false);
    };


    const handleeClosePreviewPopup = () => {
        setOpenPreview(false);
        getEmailTemplatesList();
    };

    // const handleClickOpenDeletePopup = (data: any) => {
    //     setFormDetails(data)
    //     setOpenDeletePopup(true);

    // };

    // const getCount = (count: string) => {
    //     if (count.length > 6 && count.length < 9) {
    //         const startDigits = count.length - 6;
    //         const decimalNum = count.slice(startDigits, startDigits + 1);
    //         return (count.slice(0, startDigits) + (decimalNum !== '0' ? "." + decimalNum : '') + "M");
    //     } else if (count.length > 3 && count.length < 6) {
    //         const startDigits = count.length - 3;
    //         const decimalNum = count.slice(startDigits, startDigits + 1);
    //         return (count.slice(0, startDigits) + (decimalNum !== '0' ? "." + decimalNum : '') + "K");
    //     } else {
    //         return count
    //     }
    // }



    // const getEmailTemplatesList = async () => {
    //     let tempData: any = { action: "list" };
    //     let ClientId = userLocalData.getvalue('clientId');
    //     try {
    //         // let response = await ApiService.getEmailTemplatesList();
    //         let userId = "0";
    //         if ((tabValue === "My Templates")) {
    //             tempData.userid = (tabValue === "My Templates") ? userLocalData.getvalue('recrId') : "";
    //             userId = userLocalData.getvalue('recrId')
    //         } else {
    //             tempData.userid = "";
    //         }
    //         ApiService.getCall(216, `QADemoCurately/getEmailTempaltesList/${userId}/${ClientId}`)
    //             .then((response: any) => {
    //                 // let builderList = [];
    //                 // for (let gl = 0; gl < response.data.EmailTemplateList.length; gl++) {
    //                 //     const element = response.data.list[gl];
    //                 //     if (element.templateName.startsWith("curately_")) {
    //                 //         builderList.push(element);
    //                 //     }
    //                 // }
    //                 setListData(response.data.List);
    //                 setRowCount(response.data.List.length);
    //             })
    //             .catch((error) => {
    //                 console.error("Error:", error);
    //                 // alert('Error occurred.', 'error');
    //             });

    //         setIsLoaded(false);
    //     }
    //     catch (e) {
    //         setIsLoaded(true);
    //     }
    // }
    const getEmailTemplatesList = useCallback(
        debounce(async () => {
            setIsLoaded(false);
            const clientId = userLocalData.getvalue('clientId');
            let userId = "0";
            if (tabValue === "My Templates") {
                userId = userLocalData.getvalue('recrId');
            }

            ApiService.getCall(214, `getEmailBuilderTemplatesList/${userId}/${clientId}`)
                .then((response) => {
                    if (response.data && response.data.List) {
                        // console.log(response.data.List)
                        let tempTemplateList = [];
                        for (let sl = 0; sl < response.data.List.length; sl++) {
                            const element = response.data.List[sl];
                            (element.type !== 0) && tempTemplateList.push({
                                "templateId": element.templateId,
                                "templateName": element.templateName,
                                "description": element.description,
                                "subject": element.subject,
                                "type": element.type,
                                "isactive": element.isactive,
                                "createdBy": element.createdBy,
                                "createdDate": element.createdDate,
                                "modifyBy": element.modifyBy,
                                "modifyDate": element.modifyDate
                            })
                        }
                        setListData(tempTemplateList);
                        // setListData(response.data.List);
                        setRowCount(tempTemplateList.length);
                    } else {
                        console.error("List data is undefined.");
                        setListData([]);
                        setRowCount(0);
                    }
                    setIsLoaded(true);
                })
                .catch((error) => {
                    console.error("Error:", error);
                    setIsLoaded(true);
                });
        }, 400),
        [tabValue]
    );

    useEffect(() => {
        getEmailTemplatesList();
        return () => {
            getEmailTemplatesList.cancel();
        };
    }, [getEmailTemplatesList]);




    const columns: MRT_ColumnDef<(typeof listData)[0]>[] = useMemo(
        () => [
            {
                enableColumnPinning: true,
                accessorKey: "templateName",
                header: "Name",
                size: 300,
                Cell: ({ renderedCellValue, row }) => {
                    // let listTitle = getFormName(row.original.templateName);
                    let displayTitle = row.original.templateName.length > 30 ? row.original.templateName.slice(0, 30) + "..." : row.original.templateName;
                    return (
                        <Tooltip title={row.original.templateName} classes={{ tooltip: 'tt-capital' }}>
                            <span
                                className="hightLightTd"
                                onClick={() => handleEdit(row.original.templateId)}
                            >
                                {displayTitle}
                            </span>
                        </Tooltip>
                    );
                },
            },
            {
                accessorKey: "modifyDate",
                header: "Last Modified",
                accessorFn: (row) => `${row.date}`,
                Cell: ({ renderedCellValue, row }) => (
                    <span>
                        {row.original.modifyDate ? DateTime.fromFormat(row.original.modifyDate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""}
                    </span>
                ),
                // size: 100,
            },
            // {
            //     accessorKey: "recruiterName",
            //     header: "Owner",
            //     Cell: ({ renderedCellValue, row }) => (
            //         <span>{row.original.recruiterName}</span>
            //     ),
            //     size: 80
            // },
            // {
            //     accessorKey: "count",
            //     accessorFn: (row) => `${row.count}`,
            //     header: "Records",
            //     Cell: ({ renderedCellValue, row }) => (
            //         <span>{row.original.count}</span>
            //     ),
            // },
            {
                accessorKey: "Actions",
                header: "Actions",
                Cell: ({ renderedCellValue, row }) => (
                    <Stack
                        key={row.original.templateId}
                    >
                        <ButtonGroup
                            variant="outlined"
                            id={
                                row.original.templateId
                            }
                            sx={{
                                // width: "33px",
                                height: "31px",
                                "& .MuiButtonGroup-grouped": {
                                    marginRight: "1px",
                                    border: "1px solid var(--c-neutral-40)"
                                },
                            }}
                        >
                            <Tooltip
                                title="Edit"
                                placement="top"
                            >
                                <Button
                                    className="customButtonForHover"
                                    sx={{
                                        borderColor: "var(--c-neutral-40)",
                                        backgroundColor: "#ffffff",
                                        color: "#919191",
                                        width: "33px",
                                    }}
                                    onClick={() => handleEdit(row.original.templateId)}
                                >
                                    {/* {tabValue} */}
                                    <EditIcon
                                        sx={{
                                            // height: "20px",
                                            // width: "15px",
                                            fontSize:
                                                "16px",
                                        }}
                                    />
                                </Button>
                            </Tooltip>
                            <Tooltip
                                title="View"
                                placement="top"
                            >
                                <Button
                                    className="customButtonForHover"
                                    sx={{
                                        borderColor: "var(--c-neutral-40)",
                                        backgroundColor: "#ffffff",
                                        color: "#919191",
                                        width: "33px",
                                    }}
                                    onClick={() => handleView(row.original.templateId)}
                                >
                                    {/* {tabValue} */}
                                    <VisibilityIcon
                                        sx={{
                                            // height: "20px",
                                            // width: "15px",
                                            fontSize:
                                                "16px",
                                        }}
                                    />
                                </Button>
                            </Tooltip>
                            <Tooltip
                                title="Delete"
                                placement="top"
                            >
                                <Button
                                    className="customButtonForHover"
                                    sx={{
                                        borderColor: "var(--c-neutral-40)",
                                        backgroundColor: "#ffffff",
                                        color: "#919191",
                                        width: "33px",
                                    }}
                                    onClick={() => {
                                        confirmDialog('Are you sure you want to delete - ' + row.original.templateName + '?', () =>
                                            handleDelete(row.original.templateId)
                                        );
                                    }}
                                // onClick={() => handleClickOpenDeletePopup(row)}
                                >
                                    {/* {tabValue} */}
                                    <DeleteOutlineIcon
                                        sx={{
                                            // height: "20px",
                                            // width: "15px",
                                            fontSize:
                                                "16px",
                                        }}
                                    />
                                </Button>
                            </Tooltip>
                        </ButtonGroup>

                    </Stack>

                ),
                // size: 100
            },

        ],
        []
    );


    return (

        <div className="emailTemplateList pt-3 px-5">
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
                    Templates
                </Typography>
                <Stack direction="row" className="btn-container">
                    <Button variant="contained" color="primary" size="small" onClick={handleAdd} >Add Template</Button>
                    {/*  href="#/workflow/add" */}
                </Stack>
            </Grid>
            <Grid container className="customCard p-0 filterExpand-grid" >

                <Grid sx={{ width: filtersExpand ? 'calc(100%)' : 'calc(100% - 0px)' }}>

                    <div className={`MRTableCustom  pl-0 `}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            className='tableTabs'
                        >
                            {
                                tabList.map((tab: any, i: number) => (
                                    <Tab key={i} value={tab} label={
                                        <span>{tab}</span>
                                    } />
                                ))
                            }
                        </Tabs>
                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection={false}
                            data={listData}
                            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                            state={{ rowSelection, pagination }} //pass our managed row selection state to the table to use
                            enablePinning
                            enableStickyHeader
                            initialState={{
                                columnPinning: { left: ['mrt-row-select', 'templateName'] },
                                density: 'compact',
                                showGlobalFilter: false,
                            }}
                            enableDensityToggle={false}
                            enableFullScreenToggle
                            enableColumnResizing
                            enableFilters={false}
                            enableGlobalFilterModes
                            columnResizeMode="onChange"
                            onPaginationChange={setPagination}
                            getRowId={(row) => row.templateId}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                            rowCount={rowCount}
                        //  manualPagination
                        // paginateExpandedRows={true}
                        // enableRowVirtualization
                        // onColumnSizingChange={(e) => columnChanged(e)}
                        // onColumnSizingInfoChange={(e) => columnInfo(e)}

                        />
                    </div>

                </Grid>
                {/* {
                (openAddWorkflowModal) ?
                    <AddWorkflow
                        open={openAddWorkflowModal}
                        closePopup={() => setOpenAddWorkflowModal(false)}
                        add={true}
                        workflowData={{}}
                    />
                    :
                    null
            } */}


                {
                    openPreview ?
                        <Dialog open={openPreview} onClose={handleeClosePreviewPopup} className='Instructions' fullWidth maxWidth={'md'}>
                            <DialogTitle
                                className='py-2'
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <span>
                                        {templateData && templateData?.templateName}
                                    </span>
                                    <span onClick={handleeClosePreviewPopup} className="closePopup">
                                        <CloseIcon />
                                    </span>
                                </Grid>
                            </DialogTitle>
                            <Divider />
                            <DialogContent sx={{ p: 0 }}>
                                {
                                    (templateData && templateData?.htmlFile) ?
                                        <div style={{ padding: "20px" }} dangerouslySetInnerHTML={{ __html: templateData?.htmlFile }}></div> :
                                        null
                                }
                            </DialogContent>
                        </Dialog>
                        : null
                }

                {templateEmailHtmlOpen ?
                      <Dialog maxWidth={'xl'} open={templateEmailHtmlOpen}  onClose={handleCloseEditDialog} fullWidth >
                      <DialogTitle id="alert-dialog-title">
                      <Grid
                                  container
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                              >
                                  <span style={{ fontWeight: 'bold' }}>Email Template </span>
                                  <span onClick={handleCloseEditDialog}>
                                      <CloseIcon />
                                  </span>
                              </Grid> 
                             
                          </DialogTitle>
                          <DialogContent >
                              <>
                              <EmailBuilderData  templateId={selectedTemplateId} />
                              </>
                          </DialogContent>
                        
                      </Dialog>
                      :  null
                }
            </Grid>

            {/* <ConfirmDialog /> */}
        </div>



    )
}

export default ListEmailBuilder