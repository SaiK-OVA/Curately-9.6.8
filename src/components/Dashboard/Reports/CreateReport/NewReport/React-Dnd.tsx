import { useContext } from 'react';
import { React, useState, useMemo, useEffect, useCallback } from '../../../../../shared/modules/React';
// import { Paper } from '@mui/material';
import {
    MaterialReactTable,
    type MRT_ColumnDef,
    // useMaterialReactTable 
} from '../../../../../shared/modules/MaterialReactTable';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend, DndComponentClass } from 'react-dnd-html5-backend';
// import { Grid, Box, Typography, Button } from "@mui/material";
import { Grid, Button } from "../../../../../shared/modules/commonImports";
import { Typography } from "../../../../../shared/modules/MaterialImports/Typography";
// import {
//     type MRT_Row,
//     MRT_TableContainer,
// } from "material-react-table";
import ReportGroups from './ReportGroups/ReportGroups';
import ReportColumns from './ReportColumns/ReportColumns';
import ReportFilters from './SelectedFilters/ReportFilters';
import DetailsReport from './DetailsReport/DetailsReport'
import BaseModule from './BaseModule/BaseModule';
import Fields from './Fields/Fields';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../../shared/modules/MaterialImports/Dialog';
// import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { DynamicReportStore } from "../CreateReport";
// import { DynamicFieldStore } from "../CreateReport";
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import ApiService from '../../../../../shared/api/api';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { userLocalData } from '../../../../../shared/services/userData';
import { useParams } from "react-router-dom";
import './React-Dnd.scss'
import _ from 'lodash';
// import { constants } from 'fs/promises';
// import { Warning } from '@mui/icons-material';
import { debounce } from 'lodash';

interface ListItemProps {
    id: string | number;
    text: string;
}

interface TableItem {
    [key: string]: any;
}
interface CustomReportData {
    clientId: string;
    name: string;
    json: string;
    createdBy: string;
    id?: string;
}
interface ComponentAProps { }


const checkDateColumnFilters = (filters: any) => {
    for (const filter of filters) {
        for (const detail of filter.filterdetails) {
            console.log(detail.columnType, 'yes')
            if (detail.columnType === "Date" && detail.compareValues.length === 0) {
                showToaster(`Date column '${detail.dataFieldName}' has empty compare values.`, 'warning');
                return true; // Return true if any date column has empty compare values
            }
        }
    }
    console.log('No date columns with empty compare values found.');
    return false; // Return false if no such date column is found
};
const Dnd: React.FC<ComponentAProps> = () => {
    const [reportViewOpen, setReportViewOpen] = useState(false);
    const [reportHeader, setReportHeader] = useState("Generated Report");
    const [reportTableData, setReportTableData] = useState<any>([]);
    const [addDynamicList, setAddDynamicList] = useContext(DynamicReportStore);
    const [fieldData, setFieldData] = useState({});
    const [dataFieldList, setDataFieldList] = useState({});
    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [], []
    );
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50, //customize the default page size
    });
    const [rowSelection, setRowSelection] = useState({});

    const [groupColumns, setGroupColumns] = useState<any>([]);
    const { id } = useParams();
    const [parsedJson, setParsedJson] = useState<any>(null);

    const fetchReportDetails = useCallback(
        debounce(() => {
            if (!id) return;

            return new Promise((resolve, reject) => {
                trackPromise(
                    ApiService.getById('admin', `getCustomReportDetailsById/${id}`, userLocalData.getvalue('clientId'))
                        .then(response => {
                            resolve(response.data);
                        })
                        .catch(error => {
                            reject(error);
                        })
                );
            })
                .then((data: any) => {
                    const parsedJsonData = JSON.parse(data.json);
                    setParsedJson(parsedJsonData);
                })
                .catch(error => {
                    console.error("Error fetching report details:", error);
                });
        }, 500),
        [id]
    );

    useEffect(() => {
        fetchReportDetails();

        return () => {
            fetchReportDetails.cancel();
        };
    }, [fetchReportDetails]);

    useEffect(() => {
        if (parsedJson) {
            const tabledata = parsedJson.tabledata ? parsedJson.tabledata : parsedJson;

            setAddDynamicList((prevList: any) => {
                const newList = [...prevList];
                newList[0] = tabledata;
                return newList;
            });

            setDataFieldList(parsedJson.fielddata);
        }
    }, [parsedJson]);
    const handleDataFromB = (dataFromB: any) => {
        setFieldData(dataFromB)
    };

    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
    const saveForm = async (checkCondition: boolean) => {
        // if (checkCondition) {
        //     const saveResult = await saveJson();
        //     if (!saveResult) {
        //         return;
        //     }
        // }
        let tempGroupColumns = [];
        let tempData = { ...addDynamicList[0] };
        let isError: boolean = false;

        // Validation checks
        if (checkCondition) {
            if (tempData.columns.length < 1) {
                showToaster('Please add Columns in the Report', 'warning');
                return; // Exit the function if validation fails
            }
            if (tempData.filters[0].filterdetails.length === 0) {
                showToaster('Please add Filters in the Report', 'warning');
                return; // Exit the function if validation fails
            }
        } else {
            if (tempData.columns.length == 0) {
                showToaster('Please add Columns in the Report', 'warning');
                return; // Exit the function if validation fails
            }
            if (tempData.filters[0].filterdetails.length === 0) {
                showToaster('Please add Filters in the Report', 'warning');
                return; // Exit the function if validation fails
            }
        }

        // Processing group columns and columns
        for (let tg = 0; tg < tempData.groupby.length; tg++) {
            if (tempData.groupby[tg].displayName && tempData.groupby[tg].displayName.trim()) {
                tempGroupColumns.push(tempData.groupby[tg].displayName.replace(/\s/g, ''));
            }
            if (tempData.groupby[tg].module_id === "Custom Fields" || tempData.groupby[tg].module_id === "custom_field") {
                tempData.groupby[tg].module_id = "custom_field";
                tempData.groupby[tg].tablename = "custom_field";
            } else {
                delete tempData.groupby[tg].json;
            }
        }

        setGroupColumns(tempGroupColumns);

        for (let tc = 0; tc < tempData.columns.length; tc++) {
            tempData.columns[tc].summaryFunction = "";
            if (tempData.columns[tc].module_id === "Custom Fields" || tempData.columns[tc].module_id === "custom_field") {
                tempData.columns[tc].module_id = "custom_field";
                tempData.columns[tc].tablename = "custom_field";
            } else {
                delete tempData.columns[tc].json;
            }
        }
        // return;

        // Fetch and display data
        if (tempData.columns.length > 0 && tempData.filters[0].filterdetails.length !== 0) {
            setReportHeader(tempData.details[0].name);
            columns.length = 0;

            try {

                const response = await ApiService.postWithData('report', 'getJobReportData', { ...tempData, clientId: userLocalData.getvalue('clientId') });



                if (response.data.Message === "Success") {
                    let tempResponse = response.data.rows;
                    let tempHeaders = [];

                    if (tempResponse && tempResponse.length && tempResponse[0]) {
                        let tempDupArray = Object.keys(tempResponse[0]);
                        for (let tda = 0; tda < tempDupArray.length; tda++) {
                            if (tempDupArray[tda] !== "candId") {
                                tempHeaders.push(tempDupArray[tda]);
                                columns.push({
                                    accessorKey: tempDupArray[tda].replace(/\s/g, ''),
                                    header: tempDupArray[tda]
                                });
                            }
                        }
                        // console.log(tempHeaders);
                        let allDynamicResponse = [];
                        for (let tr = 0; tr < tempResponse.length; tr++) {
                            if (tempResponse[tr]) {
                                let tempObj: any = {};
                                tempObj.candId = "candId" + tr;
                                for (let dh = 0; dh < tempHeaders.length; dh++) {
                                    if (tempHeaders[dh] && tempHeaders[dh].trim()) {
                                        tempObj[tempHeaders[dh].replace(/\s/g, '')] = (tempResponse[tr][tempHeaders[dh]]) ? tempResponse[tr][tempHeaders[dh]] : "";
                                    }
                                }
                                allDynamicResponse.push(tempObj);
                            }
                        }

                        console.log('Processed Data:', allDynamicResponse);
                        setReportTableData(allDynamicResponse);
                        setReportViewOpen(true);

                        // After displaying the data, proceed with saving if checkCondition is true
                        if (checkCondition) {

                            await sleep(1);
                            // Added Sleep 1ms so that data is fully displayed and then save
                            await saveJson();
                            // Save Data 
                        }
                    } else {
                        showToaster('No data returned from API', 'warning');
                    }
                } else {
                    showToaster('Error fetching data', 'warning');
                }
            } catch (error) {

                if (error instanceof Error) {
                    const errorMessage = (error as any).response?.data?.Message || 'Filters Should Not Be Empty';
                    showToaster(errorMessage, 'warning');
                    isError = true;
                } else {
                    showToaster('An unexpected error occurred', 'warning');
                    isError = true;
                }
            }

        } else {
            if (tempData.columns.length == 0) {
                showToaster('Please add Columns in the Report', 'warning');
            } else if (tempData.filters[0].filterdetails.length === 0) {
                showToaster('Please add Filters in the Report', 'warning');
            } else {
                checkDateColumnFilters(tempData.filters);
                console.log("pass");
            }
        }
    }



    const saveJson = async () => {
        let tempGroupColumns = [];
        let tempData = { ...addDynamicList[0] };
        for (let tg = 0; tg < tempData.groupby.length; tg++) {
            if (tempData.groupby[tg].displayName && tempData.groupby[tg].displayName.trim()) {
                tempGroupColumns.push(tempData.groupby[tg].displayName.replace(/\s/g, ''));
            }
            if (tempData.groupby[tg].module_id === "Custom Fields" || tempData.groupby[tg].module_id === "custom_field") {
                tempData.groupby[tg].module_id = "custom_field";
                tempData.groupby[tg].tablename = "custom_field";
            } else {
                delete tempData.groupby[tg].json;
            }
        }
        setGroupColumns(tempGroupColumns);
        for (let tc = 0; tc < tempData.columns.length; tc++) {
            tempData.columns[tc].summaryFunction = "";
            if (tempData.columns[tc].module_id === "Custom Fields" || tempData.columns[tc].module_id === "custom_field") {
                tempData.columns[tc].module_id = "custom_field";
                tempData.columns[tc].tablename = "custom_field";
            } else {
                delete tempData.columns[tc].json;
            }
        }
        if (tempData.columns.length > 0) {

            setReportHeader(tempData.details[0].name);
            // columns.length = 0;
            let tempJson: any;

            if (_.isEmpty(fieldData)) {
                tempJson = { ...addDynamicList[0] };
            } else {
                tempJson = {
                    fielddata: fieldData,
                    tabledata: tempData
                };
            }

            const data: CustomReportData = {
                clientId: userLocalData.getvalue("clientId"),
                name: addDynamicList[0]?.details[0]?.name || "",
                json: JSON.stringify(tempJson),
                createdBy: userLocalData.getvalue('recrId'),
            };
            if (id) {
                data.id = id.toString();
            }

            try {
                const response = await trackPromise(
                    ApiService.postWithData('admin', 'saveorupdateCustomReport', data)
                );
                if (response.data.Success) {
                    showToaster(response.data.Message, 'success');
                    saveAuditLog(4214);
                    return true;
                } else {
                    showToaster(response.data.Message, 'error');
                    return false;
                }
            } catch (error) {
                console.error("Error:", error);
                showToaster(`An error occured:${error}`, 'error');
                return false;
            }
        };
    }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <div id="NewReport" className="reportOuterContainer">
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <h2 className="reportHeader">Create Report</h2>
                <div>
                    <Button variant="outlined" color="secondary" size='small' href={`#/${userLocalData.getvalue('clientName')}/reports/custom/list`}>
                        Back to List
                    </Button>


                </div>
            </Grid>
            <Grid
                container
                direction={'row'}
                justifyContent="start"
                alignItems="start"
                className="reportContainer"
            >
                <Grid className="sideFileds">
                    <BaseModule onDataFromB={handleDataFromB} />
                    <Typography className="sectionHeader" >Fields</Typography>
                    <Fields dataFieldListProp={dataFieldList} />
                </Grid>

                <Grid sx={{ width: 'calc(100% - 310px)', height: 'calc(100% - 10px)', overflow: 'scroll' }} className="mainReport">
                    {/* onCallback={handleCallback} */}
                    {/* <GroupbyStore.Provider value={[addGBDynamicList, setAddGBDynamicList]}> */}
                    <Typography className="sectionHeader">
                        {" "}
                        Groups{" "}
                    </Typography>

                    <ReportGroups id="rptGroups" />



                    {/* </GroupbyStore.Provider> */}

                    <Typography className="sectionHeader">
                        {" "}
                        Columns{" "}
                    </Typography>
                    <ReportColumns id="rptColumns" />

                    <Typography className="sectionHeader">
                        {" "}
                        Filters{" "}
                    </Typography>
                    <ReportFilters id="rptFilters" />

                    <Typography className="sectionHeader">
                        {" "}
                        Details{" "}
                    </Typography>
                    <DetailsReport id="rptDetials" />

                    <div className="footer">
                        <div className="footer__button-container">
                            <Button variant="contained" onClick={() => { saveForm(true) }} className="footer__button--save-run">Save & Run</Button>
                            <Button variant="outlined" className="d-none footer__button--cancel">Cancel</Button>
                            <Button variant="contained" onClick={() => saveForm(false)} className="footer__button--run">Run</Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            {
                reportViewOpen ?
                    <Dialog open={reportViewOpen} onClose={() => setReportViewOpen(false)} maxWidth="lg" fullWidth>
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
                                    {reportHeader}
                                </span>
                                <span onClick={() => setReportViewOpen(false)} className="closePopup">
                                    <CloseIcon />
                                </span>
                            </Grid>

                        </DialogTitle>
                        <DialogContent className="MRTableCustom">

                            <MaterialReactTable
                                enableStickyHeader
                                columns={columns}
                                enableRowSelection={false}
                                data={reportTableData}
                                onRowSelectionChange={setRowSelection}
                                state={{ rowSelection, pagination }}
                                enablePinning
                                initialState={{
                                    columnPinning: { left: ['mrt-row-select'] },
                                    density: 'compact',
                                    showGlobalFilter: true,
                                    grouping: groupColumns
                                }}
                                // enableColumnResizing
                                // rowCount={rowCount}
                                enableDensityToggle={false}
                                enableFullScreenToggle={false}
                                enableColumnFilters={false}
                                enableGrouping={true}
                                enableColumnDragging={false}


                                // manualPagination

                                enableGlobalFilterModes
                                columnResizeMode="onChange"
                                onPaginationChange={setPagination}
                                getRowId={(row) => row.candId}
                                icons={{
                                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                                }}
                            />
                            {/* <Table sx={{ minWidth: 650 }} aria-label="simple table"><TableHead><TableRow>{reportTableHeaders.map((i: any) => <TableCell>{i.displayText}</TableCell>)} </TableRow></TableHead> <TableBody> {reportTableData.map((row: any) => (<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} > {reportTableHeaders.map((i: any) => <TableCell>{row[i.displayText]}</TableCell>)} </TableRow>))}</TableBody></Table> */}
                        </DialogContent>
                        <DialogActions>
                            <Button variant="outlined" color="secondary" onClick={() => setReportViewOpen(false)}>
                                close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    :
                    null
            }
        </div>
    )

};

export default Dnd;
