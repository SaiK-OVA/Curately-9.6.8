import { useContext } from "react";
import { React, useState, useEffect, useMemo } from "../../../../../../shared/modules/React";
import { useNavigate } from "react-router-dom";
//import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Button, IconButton } from '../../../../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../../../../shared/modules/MaterialImports/Grid';
import { TextField } from '../../../../../../shared/modules/MaterialImports/TextField';
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
// import { DateTime } from 'luxon';
//import Paper from '@mui/material/Paper';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '../../../../../../shared/modules/MaterialImports/Dialog';
//import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DialogContentText from '@mui/material/DialogContentText';
import ApiService from '../../../../../../shared/api/api';

import { Stack } from "../../../../../../shared/modules/MaterialImports/Stack";
// import React, {useState} from 'react';

import { ButtonGroup } from '../../../../../../shared/modules/MaterialImports/ButtonGroup';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { FormStore } from "../../../../../../App";
import { trackPromise } from "react-promise-tracker";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Divider } from '../../../../../../shared/modules/MaterialImports/Divider';

//import LoopIcon from '@mui/icons-material/Loop';
import { Tabs, Tab } from '../../../../../../shared/modules/MaterialImports/Tabs';
import { Tooltip } from "../../../../../../shared/modules/MaterialImports/ToolTip";
import CloseIcon from '@mui/icons-material/Close';
import PreviewComponent from "../Preview/PreviewNew";

import { userLocalData } from "../../../../../../shared/services/userData";
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";
import { confirmDialog } from "../../../../../shared/ConfirmDialog/ConfirmDialog";

// import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../../../shared/store/FormBuilderStore";


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData,
//     setFormData: state.setFormData
// });

import AIMagicWand from './AIMagicWand';

import "./ListComponent.scss";
import LuxonDateParser from "../../../../../../shared/services/LuxonDateParser";
import CustomPagination from '../../../../../shared/CustomPagination/CustomPagination'
import { Close } from "@mui/icons-material";
const ListComponent = () => {
    const navigate = useNavigate();
    // const [isShowList, setShowList] = useState(true);
    const [openPreview, setOpenPreview] = useState(false);
    const [currentForm, setCurrentForm] = useState(null);
    const [listData, setListData] = useState<any[]>([]);
    const [openDeletePopup, setOpenDeletePopup] = React.useState(false);
    const [openClonePopup, setOpenClonePopup] = React.useState(false);
    // const [formDetails, setFormDetails] = useState<any>(null);
    // const [isReloadList, setIsReloadList] = useState(false);
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    const [formName, setFormName] = useState("");
    const [newFormName, setNewFormName] = useState("");
    const [formId, setFormId] = useState("");
    // const [isLoaded, setIsLoaded] = useState(false);
    // const [filtersExpand, setFiltersExpand] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const [tabValue, setTabValue] = useState('My Forms');
    const [rowSelection, setRowSelection] = useState({});
    // const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

    const [openAIMagicWand, setOpenAIMagicWand] = useState(false);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25, //customize the default page size
    });
    // const initialRender = useRef(true);
    // const duplicateIntialrender = useRef(true);

    const handleAIMagicWandOpen = () => {
        setFormData([]);
        setOpenAIMagicWand(true);
        saveAuditLog(4182);
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
        // getList();
        console.log(newValue);

        switch (newValue) {
            case "All":
                saveAuditLog(4191);
                break;
            default:
                saveAuditLog(4190);
                break;
        }
    };

    const [tabList, setTabList] = useState([
        { label: 'All', count: 187 },
        { label: 'My Forms', count: 10 },
    ]);
    // const [openGenerateModal, setOpenGenerateModal] = useState(false);

    // const handleGenerateOpen = () => {
    //     setOpenGenerateModal(true);
    // }

    const handleView = () => {
        setFormData([]);
        navigate(`/${userLocalData.getvalue('clientName')}/letter/forms/add`);
        saveAuditLog(4186);
    }
    const handleEdit = (form: any) => {
        console.log(form)
        navigate(`/${userLocalData.getvalue('clientName')}/letter/forms/edit/${form.id}`);
    }

    const handleClone = (form: any) => {
        console.log(form);
        setCurrentForm(form); // Set the current form
        setOpenClonePopup(true);
    };

    // const viewForm = async (form: any) => {

    //     getFormDetails(form.form_id);

    //     // navigate(`/formBuilder/view/${form.form_id}`);

    // }

    const getFormDetails = async (id: any) => {
        setFormId(id);
        // setOpenAIMagicWand(true);
        let postData = { "action": "get", "form_id": id, userid: userLocalData.getvalue('recrId'), clientId: userLocalData.getvalue('clientId') }
        try {
            // let response = await ApiService.displayFormData(postData);
            trackPromise(
                ApiService.postWithData('admin', 'sequenceFormBuilder', postData)
                    .then((response: any) => {
                        // console.log(response.data);
                        if (response?.data?.form_name) {
                            //  && response?.data?.form_name.startsWith("curately_")) {
                            setOpenPreview(true);
                            setFormData((response?.data?.json?.components) ? response?.data?.json?.components : []);
                            setFormName((response?.data?.form_name) ? response?.data?.form_name : "")
                            // let parsedData = JSON.parse(response.data.json);
                        } else {
                            showToaster('Json not matching', 'error');
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        // alert('Error occurred.', 'error');
                    })
            )
        }
        catch (e) {

        }

    }
    // const handleShowList = (flag: any) => {
    //     setShowList(flag)
    // }

    const handleDelete = async (id: string) => {
        // let { form_id } = formData;
        let tempData: any = { action: "delete", clientId: userLocalData.getvalue('clientId') };
        tempData.userid = userLocalData.getvalue('recrId');
        tempData.form_id = id;
        try {
            //   let postData = { "action": "delete", "form_id": form_id, userid: 1893 }
            ApiService.postWithData('admin', 'sequenceFormBuilder', tempData)
                .then(() => {
                    setOpenDeletePopup(false);
                    // setIsReloadList((prev: any) => !prev)
                    getList();
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // alert('Error occurred.', 'error');
                });
            // let resp = await ApiService.deleteForm(postData)

        }
        catch (e) {
            // console.log(e)
            setOpenDeletePopup(false);
        }
    }

    const handleCloseDeletePopup = () => {
        setOpenDeletePopup(false);
    };
    const handleCloseClonePopup = () => {
        setOpenClonePopup(false);
        setCurrentForm(null); // Reset the current form
        setNewFormName("");   // Reset the new form name
    };




    const handleeClosePreviewPopup = () => {
        setOpenPreview(false);
        // getList();
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

    useEffect(() => {
        // if (duplicateIntialrender.current) {
        //     duplicateIntialrender.current = false;
        // } else {
        getList()
        // }
    }, [tabValue]);

    useEffect(() => {
        const filtered = listData.filter(row => {
            const filter = globalFilter || '';
            return (
                row.form_name?.toLowerCase().includes(filter.toLowerCase())
            );
        });
        setFilteredData(filtered);
        setRowCount(filtered.length);
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, [globalFilter, listData]);
    const handleFormCloneSubmit = async (newFormName: any, form: any) => {

        if (form && form.id) {

            let cloneData = {
                action: 'copy',
                form_id: form.id,
                form_name: newFormName,
                // form_name: "curately_" + newFormName,
                userid: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            };

            try {

                const response = await ApiService.postWithData('admin', 'sequenceFormBuilder', cloneData);
                // console.log("Cloned form response:", response);
                if (response.data.Success) {
                    showToaster("Form has been Cloned successfully", 'success');
                    setOpenClonePopup(false)
                    getList()
                } else if (response.data.Error || response.data.Message === "already name exists") {
                    showToaster('Form with this name already exists', 'error');
                }
            } catch (error) {
                console.error("Error cloning form:", error);
                showToaster('There was an error cloning the form', 'error');

            }
        } else {
            // console.log("No form selected for cloning");
            showToaster('No form selected for cloning', 'warning',);

        }
    }


    const getList = async () => {
        console.log(tabValue);
        let allTotal; let myTotal;
        let tempData: any = { action: "list", clientId: userLocalData.getvalue('clientId') };

        //tempData.userid = ""; //userLocalData.getvalue('recrId');
        // } 
        try {
            // let response = await ApiService.getList();
            if ((tabValue === "My Forms")) {
                tempData.userid = (tabValue === "My Forms") ? userLocalData.getvalue('recrId') : "";
            } else {
                tempData.userid = "";
            }
            ApiService.postWithData('admin', 'sequenceFormBuilder', tempData)
                .then((response: any) => {
                    let builderList = [];
                    for (let gl = 0; gl < response.data.list.length; gl++) {
                        const element = response.data.list[gl];
                        builderList.push(element);
                        // if (element.form_name.startsWith("curately_")) {
                        // }

                    }
                    setListData(builderList);
                    setFilteredData(builderList || []);
                    setRowCount(builderList.length);
                    // myTotal = builderList.length;
                })
                .catch((error) => {
                    console.error("Error:", error);
                    // alert('Error occurred.', 'error');
                });
            // ApiService.postWithData('233seq', 'DemoSequence/formBuilder', tempData)
            //     .then((response: any) => {
            //         setListData(response.data.list);
            //         setRowCount(response.data.list.length);
            //     })
            //     .catch((error) => {
            //         console.error("Error:", error);
            //         // alert('Error occurred.', 'error');
            //     });

            // setIsLoaded(false);
            setTabList([
                { label: 'All', count: Number(allTotal) },
                { label: 'My Forms', count: Number(myTotal) },
            ]);
        }
        catch (e) {
            // setIsLoaded(true);
        }
    }

    // useEffect(() => {
    //     if (initialRender.current) {
    //         initialRender.current = false;
    //     } else {
    //         getList()
    //     }

    // }, [isReloadList])

    // const getFormName = (text: any) => {

    //     let finalStr = ""
    //     if (text) {
    //         let splitText = text.replace("curately_", '');
    //         finalStr = splitText;
    //     }

    //     return finalStr
    // }

    const validateUser = (userId: Number) => {
        if (Number(userId) === userLocalData.getvalue("recrId")) {
            return true
        } else {
            return false
        }
    }


    const columns: MRT_ColumnDef<(typeof listData)[0]>[] = useMemo(
        () => [
            {
                accessorKey: "form_name",
                header: "Name",
                enableColumnPinning: true,
                size: 100,
                Cell: ({ row }) => {
                    let listTitle = row.original.form_name;
                    //  let displayTitle = poolTitle.length > 30 ? poolTitle.slice(0, 30) + "..." : poolTitle;
                    return (
                        <Tooltip title={listTitle} classes={{ tooltip: 'tt-capital' }}>
                            <span
                                className="hightLightTd"
                                onClick={() => getFormDetails(row.original.form_id)}
                            >
                                {listTitle}
                            </span>
                        </Tooltip>
                    );
                },
            },
            {
                accessorKey: "modifydate",
                header: "Last Modified",
                accessorFn: (row) => `${row.date}`,
                Cell: ({ row }) => (
                    <span>
                        {
                            row.original.modifydate && LuxonDateParser.ServerEDTToSystem(row.original.modifydate.substring(0, 19), "yyyy-MM-dd hh:mm:ss", "MM/dd/yyyy hh:mm a")
                        }
                    </span>
                ),
                size: 100,
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
                Cell: ({ row }) => (
                    <Stack
                        key={row.original.form_id}
                    >
                        <ButtonGroup
                            variant="outlined"
                            id={
                                row.original.form_id
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
                            {validateUser(row.original.userid) &&
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
                                        onClick={() => handleEdit(row)}
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
                            }
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
                                    onClick={() => getFormDetails(row.original.form_id)}
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
                                title="Clone"
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
                                    onClick={() => handleClone(row)}
                                >
                                    {/* {tabValue} */}
                                    <ContentCopyIcon
                                        sx={{
                                            // height: "20px",
                                            // width: "15px",
                                            fontSize:
                                                "16px",
                                        }}
                                    />
                                </Button>
                            </Tooltip>
                            {validateUser(row.original.userid) &&
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
                                            confirmDialog('Are you sure you want to delete - ' + row.original.form_name + '?', () =>
                                                handleDelete(row.original.form_id)
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
                            }
                        </ButtonGroup>

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
        saveAuditLog(4181);
    }, [])

    return (

        <div className="findworklist pt-3 px-5">
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
                    Forms
                </Typography>
                <Stack direction="row" className="btn-container">
                    <Button variant="contained" className="btnPrimary mr-3" size="small" onClick={handleAIMagicWandOpen}>AI Quiz Generator</Button>

                    {/* <Button variant="contained" className="btnPrimary mr-3" size="small" onClick={handleGenerateOpen}>Generate</Button> */}
                    <Button variant="contained" className="btnPrimary" size="small" onClick={handleView} >Add Form</Button>
                    {/*  href="#/workflow/add" */}
                </Stack>
            </Grid>
            <Grid container className="customCard p-0 filterExpand-grid" >

                <Grid sx={{ width: '100%' }}>

                    <div className={`MRTableCustom  pl-0 `}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            className='tableTabs'
                        >
                            {
                                tabList.map((tab: any, i: number) => (
                                    <Tab key={i} value={tab.label} label={
                                        <span className='tabWithCount'>
                                            <span>{tab.label}</span>
                                            {
                                                // isLoaded ? <LoopIcon className='countLoader' /> : <span className='count'> ({getCount(String(tab.count))})</span>
                                            }
                                        </span>
                                    } />
                                ))
                            }
                        </Tabs>
                        <MaterialReactTable
                            columns={columns}
                            enableRowSelection={false}
                            data={filteredData}
                            onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                            state={{ rowSelection, pagination }} //pass our managed row selection state to the table to use
                            enablePinning
                            enableStickyHeader
                            initialState={{
                                columnPinning: { left: ['mrt-row-select', 'form_name'] },
                                density: 'compact',
                                showGlobalFilter: true,
                            }}
                            enableDensityToggle={false}
                            enableFullScreenToggle
                            // enableColumnResizing
                            // enableFilters={false}
                            enableGlobalFilterModes
                            columnResizeMode="onChange"
                            onPaginationChange={setPagination}
                            getRowId={(row) => row.form_id}
                            icons={{
                                ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                            }}
                            rowCount={rowCount}
                            muiPaginationProps={{
                                rowsPerPageOptions: [25],
                                showFirstButton: false,
                                showLastButton: false,
                                SelectProps: {
                                    style: { display: 'none' },
                                },
                            }}

                            renderBottomToolbarCustomActions={() => (
                                <CustomPagination
                                    page={pagination.pageIndex}
                                    rowsPerPage={25}
                                    rowCount={rowCount}
                                    onChangePage={(page: any) => setPagination({ ...pagination, pageIndex: page, pageSize: 25 })}
                                    showCount={false}
                                />
                            )}
                            onGlobalFilterChange={setGlobalFilter}


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


                <Dialog
                    className="formBuilder"
                    open={openDeletePopup}
                    onClose={handleCloseDeletePopup}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"

                >
                    <Box className='delete-popup-card'>

                        <DialogContent>
                            <DialogContentText
                                id="alert-dialog-description"
                            >
                                <Typography className='delete-popup-text'>
                                    Are you sure you want to delete {formData?.form_name} ?
                                </Typography>
                                {/* <Typography className='delete-popup-text'></Typography> */}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions className='delete-popup-btn-align'>
                            <Button
                                // onClick={handleDelete}
                                variant='contained'
                                className='delete-popup-btn-yes delete-popup-btn'
                                size="small"
                            >
                                Yes
                            </Button>
                            <Button onClick={handleCloseDeletePopup}
                                variant='contained'
                                className='delete-popup-btn-no delete-popup-btn'
                                size="small"
                            >
                                No
                            </Button>
                        </DialogActions>

                    </Box>
                </Dialog>
                {/* <Dialog className="formBuilder" open={openClonePopup} onClose={handleCloseClonePopup} maxWidth="md" >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <DialogTitle>Clone Form</DialogTitle>
                        <IconButton onClick={handleCloseClonePopup}>
                            <Close />
                        </IconButton>
                     </Box>
                    <DialogContent style={{minWidth:"400px"}} >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New Form Name"
                            type="text"
                            fullWidth
                            size='small'
                            className='mt-1 mb-2'
                            sx={{ width: 350 }}
                            value={newFormName}
                            onChange={(e) => setNewFormName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                <Button variant='contained'  onClick={() => handleFormCloneSubmit(newFormName, currentForm)} size='small'>Clone</Button>
                <Button color="secondary" variant="outlined" onClick={handleCloseClonePopup} size='small'>
                    Cancel
                </Button>
            </DialogActions>
                </Dialog> */}
                <Dialog className="formBuilder" open={openClonePopup} onClose={handleCloseClonePopup} maxWidth="md">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <DialogTitle>Clone Form</DialogTitle>
                        <IconButton onClick={handleCloseClonePopup}>
                            <Close />
                        </IconButton>
                    </Box>
                    <DialogContent style={{ minWidth: "400px" }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="New Form Name"
                            type="text"
                            fullWidth
                            size="small"
                            className="mt-1 mb-2"
                            sx={{ width: 350 }}
                            value={newFormName}
                            onChange={(e) => setNewFormName(e.target.value.trimStart())}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            onClick={() => {
                                const trimmedName = newFormName.trim(); // Trim spaces before submission
                                if (trimmedName) {
                                    handleFormCloneSubmit(trimmedName, currentForm);
                                } else {
                                    showToaster("Name cannot be empty.", 'error');
                                }

                            }}
                            size="small"
                        >
                            Clone
                        </Button>
                        <Button color="secondary" variant="outlined" onClick={handleCloseClonePopup} size="small">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>



                <Dialog open={openPreview} onClose={handleeClosePreviewPopup} className='formBuilder Instructions' fullWidth maxWidth={'xl'}>
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
                                {formName}
                            </span>
                            <span onClick={handleeClosePreviewPopup} className="closePopup">
                                <CloseIcon />
                            </span>
                        </Grid>
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ p: 0 }}>
                        {
                            (formName && formId) ?
                                <PreviewComponent formId={formId} formNamePassed={formName} isPreview={true} saveCandidateData={""} isShowOneByOne={true} />
                                :
                                null
                        }
                    </DialogContent>
                </Dialog>

            </Grid>


            {
                (openAIMagicWand) ?
                    <AIMagicWand open={openAIMagicWand}
                        AIFormID={formId}
                        closePopup={(load: boolean) => {
                            setOpenAIMagicWand(false);
                            if (load) {
                                getList();
                            }
                        }} />
                    :
                    null
            }

        </div>



    )
}

export default ListComponent