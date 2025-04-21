// import React, { useContext, useState, useEffect, useMemo } from "react";
import  { useContext } from "react";
import  {useState, useMemo } from "../../../../../shared/modules/React";

// import Box from '@mui/material/Box';
import {Grid, Button} from '../../../../../shared/modules/commonImports';
// import IconButton from '@mui/material/IconButton';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../shared/modules/MaterialImports/Dialog';
// import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';

import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

import './NewReport.scss';

import ReportGroups from './ReportGroups/ReportGroups';
import ReportColumns from './ReportColumns/ReportColumns';
// import SelectedFilters from './SelectedFilters/SelectedFilters';
import ReportFilters from './SelectedFilters/ReportFilters';
import DetailsReport from './DetailsReport/DetailsReport';
import BaseModule from './BaseModule/BaseModule';
import Fields from './Fields/Fields';

import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../../shared/api/api';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ColumnDraggable from "./Fields/ColumnDraggable";
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import {
    DndContext,
    // DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors, DragEndEvent
} from "@dnd-kit/core";
import {
    // arrayMove, 
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";

// import { dataFiled as addData, type addField } from './AddField';
// import { dataGroup as addGroupData, type addGroup } from './AddGroup';
// import { dataFilters as addFiltersData, type Filter } from './AddFilters';

// import { dataDynamicGroup as addDataDynamicGroup, type addDynamicGroup } from './AddDynamicReport';
import { DynamicReportStore } from "../CreateReport";
import { DynamicFieldStore } from "../CreateReport";
import {Typography} from "../../../../../shared/modules/MaterialImports/Typography";

import { MaterialReactTable, type MRT_ColumnDef } from '../../../../../shared/modules/MaterialReactTable';


// export const GroupbyStore = createContext<any>([]);
// export const ColumnStore = createContext<any>([]);
// export const FilterStore = createContext<any>([]);


const NewReport = () => {

    const [dataList, setDataLsit] = useState<any>([]);
    const [cartItems, setCartItems] = useState<any>([]);
    // const [addDynamicList, setAddDynamicList] = useState(() => addDataDynamicGroup);
    const [addDynamicList, setAddDynamicList] = useContext(DynamicReportStore);

    const [dataFieldList, setDataFieldLsit] = useContext(DynamicFieldStore);
    // const [addGBDynamicList, setAddGBDynamicList] = useState(() => addDataDynamicGroup[0].groupby);
    // const [addCMDynamicList, setAddCMDynamicList] = useState(() => addDataDynamicGroup[0].columns);
    // const [addFLDynamicList, setAddFLDynamicList] = useState(() => addDataDynamicGroup[0].filters);

    const [reportViewOpen, setReportViewOpen] = useState(false);
    const [reportHeader, setReportHeader] = useState("Generated Report");

    const [reportTableData, setReportTableData] = useState<any>([]);
    // const [reportTableHeaders, setReportTableHeaders] = useState<any>([]);


    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 50, //customize the default page size
    });
    const [rowSelection, setRowSelection] = useState({});

    const [groupColumns, setGroupColumns] = useState<any>([]);


    const columns: MRT_ColumnDef<any>[] = useMemo(
        () => [], []
    );

    // useEffect(() => {
    //     const apiContact = async () => {
    //         const rUrl = "https://www4.accuick.com/Accuick_API/Jobs/jobs_report.jsp";
    //         const data = await fetch(rUrl, {
    //             method: "GET"
    //         });
    //         const jsonData = await data.json();
    //         setDataLsit(jsonData);

    //     };
    //     apiContact();
    // }, []);

    const saveForm = () => {
        //  console.log("addDynamicList");
        console.log(addDynamicList[0]);
        let tempGroupColumns = [];
        let tempData = { ...addDynamicList[0] };
        for (let tg = 0; tg < tempData.groupby.length; tg++) {
            //  tempData.groupby[tg].summaryFunction = "";
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
        console.log("tempData");
        console.log(tempData);
        // return;
        if (tempData.columns.length > 0) {

            setReportHeader(tempData.details[0].name);
            columns.length = 0;
            trackPromise(
                //https://qa.ova.work/reporting-service/getJobReportData
                ApiService.postWithData('report', 'getJobReportData', tempData).then((response: any) => {
                    // console.log("Inner Data : " + response.data);
                    if (response.data.Message === "Success") {
                        // showToaster('Report has been saved successfully.', 'success');
                        // console.log(response.data.rows);

                        let tempResponse = response.data.rows;
                        let tempHeaders = [];
                        // let tempData = [];
                        if (tempResponse && tempResponse.length && tempResponse[0]) {

                            let tempDupArray = Object.keys(tempResponse[0]);
                            for (let tda = 0; tda < tempDupArray.length; tda++) {
                                // tempHeaders.push({
                                //     displayText: tempDupArray[tda],
                                //     column: tempDupArray[tda].replace(/\s/g, '')
                                // })
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
                            // console.log(allDynamicResponse);
                            // console.log(columns);

                            setReportTableData(allDynamicResponse);
                            // setReportTableHeaders(tempHeaders); 
                            setReportViewOpen(true);

                        }
                    } else {
                        //   console.log(response.data.Message);
                        showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error');
                    }
                })

            )
        } else {
            showToaster('Please add Columns in the Report', 'warning');
        }
    }

    // const defaultAnnouncements = {
    //     onDragStart(id: any) {
    //         console.log(`Picked up draggable item ${id}.`);
    //     },
    //     onDragOver(id: any, overId: any) {
    //         if (overId) {
    //             // console.log(
    //                 `Draggable item ${id} was moved over droppable area ${overId}.`
    //             );
    //             return;
    //         }
    //         console.log(`Draggable item ${id} is no longer over a droppable area.`);
    //     },
    //     onDragEnd(id: any, overId: any) {
    //         if (overId) {
    //             // console.log(
    //                 `Draggable item ${id} was dropped over droppable area ${overId}`
    //             );
    //             return;
    //         }
    //         console.log(`Draggable item ${id} was dropped.`);
    //     },
    //     onDragCancel(id: any) {
    //         console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
    //     }
    // };
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    function findContainer(id: any) {
        // if (id in items) {
        return id;
        // }
        // return Object.keys(items).find((key) => items[key].includes(id));
    }

    function handleDragStart(event: any) {
        const { active } = event;
        const { id } = active;

        setActiveId(id);
    }


    // function handleDragEnd(event: any) {
    //     const { active, over } = event;
    //     const { id } = active;
    //     const { id: overId } = over;

    //     const activeContainer = findContainer(id);
    //     const overContainer = findContainer(overId);

    //     if (
    //         !activeContainer ||
    //         !overContainer ||
    //         activeContainer !== overContainer
    //     ) {
    //         return;
    //     }

    //     // const activeIndex = items[activeContainer].indexOf(active.id);
    //     // const overIndex = items[overContainer].indexOf(overId);

    //     // if (activeIndex !== overIndex) {
    //     //   setItems((items) => ({
    //     //     ...items,
    //     //     [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
    //     //   }));
    //     // }

    //     setActiveId(null);
    // }

    function handleDragOver(event: any) {
        const { active, over, draggingRect } = event;
        const { id } = active;
        const { id: overId } = over;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

    }
    const addItemsToCart = (e: DragEndEvent) => {

        const newItem = e.active.data.current?.title;
        // alert(e.over?.id);
        // if (e.over?.id !== "rptGroups" || !newItem) return;
        console.log(dataFieldList);

        if (e.over?.id === "rptGroups") {
            let maxValue = 0;
            const temp1 = [...addDynamicList];
            temp1[0].groupby.map((el: any) => {
                const valueFromObject = el.id;
                maxValue = Math.max(maxValue, valueFromObject);
            });

            let idval = (temp1[0].groupby.length > 0) ? maxValue + 1 : 1;
            let CtValue = "true";
            const nextShapes = dataFieldList.map((dlist: any) => {
                dlist.columns.map((innerdlist: any) => {
                    if (innerdlist.displayName === newItem) {
                        const newState = addDynamicList[0].groupby.map((obj: any) => {
                            if (obj.displayName === innerdlist.displayName) {
                                CtValue = "false";
                                idval = obj.id;
                            }
                            return obj;
                        });

                        if (CtValue === "true") {
                            const newItem1 = {
                                id: idval.toString(), module_id: innerdlist.moduleName, tablename: innerdlist.moduleName, dataFieldName: innerdlist.columnName, displayName: innerdlist.displayName,
                                displayNameToShow: innerdlist.displayName,
                                sortenabled: "true", sortorder: "ASC", columnType: innerdlist.columnType, summaryFunction: "", optionalFunctionValue: "",
                                optionalFunction: [{
                                    substring: { starting_Point: "", length_of_String: "" },
                                    left: { Number_of_characters_from_left: "" },
                                    right: { Number_of_characters_from_right: "" },
                                    dateFormat: ""
                                }],
                                formula: (innerdlist.formula) ? innerdlist.formula : "",
                                separator: (innerdlist.separator) ? innerdlist.separator : "",
                                json: (innerdlist.json) ? innerdlist.json : "",
                            };

                            temp1[0].groupby.push(newItem1);
                        }
                    }
                });
            });
            setTimeout(() => {
                setAddDynamicList(temp1);
            }, 200);
        }

        if (e.over?.id === "rptColumns") {

            let maxValue = 0;
            const temp1 = [...addDynamicList];
            temp1[0].columns.map((el: any) => {
                const valueFromObject = el.id;
                maxValue = Math.max(maxValue, valueFromObject);
            });

            let idval = (temp1[0].columns.length > 0) ? maxValue + 1 : 1;
            let CtValue = "true";
            const nextShapes = dataFieldList.map((dlist: any) => {
                dlist.columns.map((innerdlist: any) => {
                    if (innerdlist.displayName === newItem) {
                        const newState = addDynamicList[0].columns.map((obj: any) => {
                            if (obj.displayName === innerdlist.displayName) {
                                CtValue = "false";
                                idval = obj.id;
                            }
                            return obj;
                        });

                        if (CtValue === "true") {
                            const newItem1 = {
                                id: idval.toString(), module_id: innerdlist.moduleName, tablename: innerdlist.moduleName, dataFieldName: innerdlist.columnName,
                                displayName: innerdlist.displayName,
                                displayNameToShow: innerdlist.displayName,
                                sortenabled: "false", sortorder: "ASC", columnType: innerdlist.columnType, summaryFunction: "", optionalFunctionValue: "",
                                optionalFunction: [{
                                    substring: { starting_Point: "", length_of_String: "" },
                                    left: { Number_of_characters_from_left: "" },
                                    right: { Number_of_characters_from_right: "" },
                                    dateFormat: ""
                                }], SuppressDuplicates: "true",
                                WordWrap: "true",
                                ColumnWidth: "auto",
                                formula: (innerdlist.formula) ? innerdlist.formula : "",
                                separator: (innerdlist.separator) ? innerdlist.separator : "",
                                json: (innerdlist.json) ? innerdlist.json : "",
                            };
                            temp1[0].columns.push(newItem1);
                        }
                    }
                });
            });
            //  setAddDynamicList(temp1);
            setTimeout(() => {
                setAddDynamicList(temp1);
            }, 200);
            //            // console.log(addDynamicList);
        }

        if (e.over?.id === "rptFilters" && addDynamicList[0]?.filters[0]) {

            let maxValue = 0; let logicValue = "";
            addDynamicList[0]?.filters[0]?.filterdetails.map((el: any) => {
                const valueFromObject = el.id;
                maxValue = Math.max(maxValue, valueFromObject);
            });
            logicValue = addDynamicList[0]?.filters[0]?.filterLogic;

            let idval = (addDynamicList[0].filters[0].filterdetails.length > 0) ? maxValue + 1 : 1;
            let CtValue = "true";
            const temp1 = [...addDynamicList];
            const nextShapes = dataFieldList.map((dlist: any) => {
                dlist.columns.map((innerdlist: any) => {
                    if (innerdlist.displayName === newItem) {
                        const newState = addDynamicList[0].filters[0].filterdetails.map((obj: any) => {
                            if (obj.displayName === innerdlist.displayName) {
                                CtValue = "false";
                                idval = obj.id;
                            }
                            return obj;
                        });

                        if (CtValue === "true") {
                            const newItem1 = {
                                id: idval.toString(), module_id: innerdlist.moduleName, dataFieldName: innerdlist.columnName,
                                columnType: innerdlist.columnType, compare: "", condition: "AND",
                                displayName: innerdlist.displayName,
                                compareValues: []
                            };
                            temp1[0].filters[0].filterdetails.push(newItem1);
                            logicValue = logicValue.toString() + ",AND," + idval.toString();
                            const startingWord = ",AND,";
                            const logicList = removeFirstWord(logicValue, startingWord);
                            temp1[0].filters[0].filterLogic = logicList;
                        }
                    }
                });
            });
            setAddDynamicList(temp1);
        }

        //             setAddBoolean(true);
        const temp = [...cartItems];
        setCartItems(temp);
    };
    function removeFirstWord(inputString: string, startingWord: string): string {
        if (inputString.startsWith(startingWord)) {
            const words = inputString.split(startingWord);
            words.shift();
            const resultString = words.join(startingWord);
            return resultString;
        } else {
            return inputString;
        }
    }

    return (
        <div id="NewReport" className="reportOuterContainer">
            <h2 className="reportHeader">Create Report</h2>
            <DndContext
                // announcements={defaultAnnouncements}
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                //  onDragEnd={handleDragEnd}
                onDragEnd={addItemsToCart}
            >

                <Grid
                    container
                    direction={'row'}
                    justifyContent="start"
                    alignItems="start"
                    className="reportContainer"

                >
                    <Grid className="sideFileds">
                        <BaseModule />
                        <Typography className="sectionHeader" >Fields</Typography>
                        <Fields />
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
                        {/* <Divider /> */}
                        <div id='DetailsReport1' className="cart-item px-4 py-2 footer_div">
                            <Button variant="outlined" className="d-none">Cancel</Button> <Button variant="contained" onClick={saveForm}>Run</Button>
                        </div>
                    </Grid>
                </Grid>
            </DndContext>
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
    );
}
export default NewReport;
