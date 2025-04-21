import { useContext,FC } from "react";
import { useMemo, useEffect, useState } from "../../../../../../shared/modules/React";
import {
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_Row,
    MRT_TableContainer,
} from "material-react-table";

// import { MaterialReactTable } from "material-react-table";
import ClearIcon from "@mui/icons-material/Clear";
import {TextField, Grid, Button} from "../../../../../../shared/modules/commonImports";
import {MenuItem} from "../../../../../../shared/modules/MaterialImports/Menu";
// import ButtonGroup from "@mui/material/ButtonGroup";
import {Typography} from "../../../../../../shared/modules/MaterialImports/Typography";
import {Tooltip} from "../../../../../../shared/modules/MaterialImports/ToolTip";
import { useDroppable } from "@dnd-kit/core";
//import { CSS } from "@dnd-kit/utilities";

//import Box from '@mui/material/Box';
// import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from '@mui/material/Checkbox';
import { addDynamicGroup as addGroup } from "../AddDynamicReport";
import { summaryFunctionList, optionalFunctionList } from "../AddDynamicReport";
import { DynamicReportStore } from "../../CreateReport";
import { DynamicFieldStore } from "../../CreateReport";
import { DndProvider, useDrag, useDrop } from 'react-dnd';

import "../NewReport.scss";
import "./ReportGroups.scss";
import ApiService from "../../../../../../shared/api/api";

interface IColumnDropable {
    id: string;
    //  items: addGroup["groupby"]| any;
}

const ReportGroups: FC<IColumnDropable> = ({ id }) => {
    const [cartItems, setCartItems] = useState<any>([]);
    const [addDynamicList, setAddDynamicList] = useContext(DynamicReportStore);

    const [dataFieldList, setDataFieldLsit] = useContext(DynamicFieldStore);
    const [, drop] = useDrop({
        accept: 'LIST_ITEM',
        drop: (e: React.DragEvent<HTMLDivElement>) => {
            // console.log('event',e)

            const newItem = e?.data?.title;
            // alert(e.over?.id);
            // if (e.over?.id !== "rptGroups" || !newItem) return;

            if (id === "rptGroups") {
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
            //             setAddBoolean(true);
            const temp = [...cartItems];
            setCartItems(temp);
        }
        //   setTableItems((prevItems) => [...prevItems, newItem]);
    },
    )

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
    const [data, setData] = useState<addGroup["groupby"][]>(
        addDynamicList[0].groupby
    );
    //const [nameDetails, setNameDetails] = useState<any>();
    //const [data, setData] =useState<addGroup["groupby"][]>([]);

    useEffect(() => {
        const temp1 = [...addDynamicList];
        const mutationOfData = addDynamicList[0].groupby.map((row: any) => {
            return row;
        });
        temp1[0].groupby = mutationOfData;
        // setAddDynamicList(temp1);
        // setData(temp1[0].groupby);

    }, [addDynamicList[0].groupby, addDynamicList[0].groupby.length]);

    const handleJSONUpdate = (
        e: any,
        id: any,
        field: keyof addGroup["groupby"]
    ) => {
        // Update the data when the input changes
        const temp1 = [...addDynamicList];
        const updatedData = addDynamicList[0].groupby.map((row: any) => {
            if (row.id === id) {
                return { ...row, [field]: e.target.value };
            }
            return row;
        });
        temp1[0].groupby = updatedData;
        //  console.log(updatedData)
        setAddDynamicList(temp1);
    };

    const handleSubstringJSONUpdate = (
        e: any,
        id: any,
        field: keyof addGroup["groupby"]["optionalFunction"][0]["substring"]
    ) => {
        // Update the data when the input changes
        const temp1 = [...addDynamicList];
        const updatedData = addDynamicList[0].groupby.map((row: any) => {
            if (row.id === id) {
                return {
                    ...row,
                    optionalFunction: {
                        ...row.optionalFunction,
                        [0]: {
                            ...row.optionalFunction[0],
                            substring: {
                                ...row.optionalFunction[0].substring,
                                [field]: e.target.value,
                            },
                        },
                    },
                };
            }
            return row;
        });
        temp1[0].groupby = updatedData;
        setAddDynamicList(temp1);
    };

    const handleLeftJSONUpdate = (
        e: any,
        id: any,
        field: keyof addGroup["groupby"]["optionalFunction"][0]["left"]
    ) => {
        // Update the data when the input changes
        const temp1 = [...addDynamicList];
        const updatedData = addDynamicList[0].groupby.map((row: any) => {
            if (row.id === id) {
                return {
                    ...row,
                    optionalFunction: {
                        ...row.optionalFunction,
                        [0]: {
                            ...row.optionalFunction[0],
                            left: {
                                ...row.optionalFunction[0].left,
                                [field]: e.target.value,
                            },
                        },
                    },
                };
            }
            return row;
        });
        temp1[0].groupby = updatedData;
        setAddDynamicList(temp1);
    };

    const handleRightJSONUpdate = (
        e: any,
        id: any,
        field: keyof addGroup["groupby"]["optionalFunction"][0]["right"]
    ) => {
        // Update the data when the input changes
        const temp1 = [...addDynamicList];
        const updatedData = addDynamicList[0].groupby.map((row: any) => {
            if (row.id === id) {
                return {
                    ...row,
                    optionalFunction: {
                        ...row.optionalFunction,
                        [0]: {
                            ...row.optionalFunction[0],
                            right: {
                                ...row.optionalFunction[0].right,
                                [field]: e.target.value,
                            },
                        },
                    },
                };
            }
            return row;
        });
        temp1[0].groupby = updatedData;
        setAddDynamicList(temp1);
    };

    const removeRowTable = (id: any) => {
        const temp1 = [...addDynamicList];
        const updatedData = addDynamicList[0].groupby.filter((todo: any) => {
            return todo.id !== id;
        });
        temp1[0].groupby = updatedData;
        setAddDynamicList(temp1);
    };

    const columns = useMemo(
        () =>
            [
                {
                    accessorKey: "id",
                    header: "ID",
                    size: 50,
                },
                {
                    accessorKey: "module_id",
                    header: "Module",
                },
                {
                    accessorKey: "displayNameToShow",
                    header: "Data Field Name",
                },
                {
                    accessorKey: "displayName",
                    header: "Display Name",
                    Cell: ({ renderedCellValue, row }) => (
                        <span>
                            <TextField
                                fullWidth
                                id={`displayName-${row.original.id}`}
                                name={`displayName-${row.original.id}`}
                                size="small"
                                value={row.original.displayName}
                                onChange={e =>
                                    handleJSONUpdate(e, row.original.id, "displayName")
                                }
                            />
                        </span>
                    ),
                    size: 80,
                },
                {
                    accessorKey: "sortorder",
                    header: "Sort Order",

                    Cell: ({ renderedCellValue, row }) => (
                        <span>
                            <TextField
                                fullWidth
                                name="mileradius"
                                size="small"
                                value={row.original.sortorder}
                                // contentEditable
                                onChange={e =>
                                    handleJSONUpdate(e, row.original.id, "sortorder")
                                }
                                //  onChange={(event)=>handleJSONUpdate(event,row.original.id,'sortorder')}
                                select
                            >
                                <MenuItem value="">Select Order</MenuItem>
                                <MenuItem value="ASC">ASC</MenuItem>
                                <MenuItem value="DESC">DESC</MenuItem>
                            </TextField>
                        </span>
                    ),
                    size: 80,
                },
                {
                    accessorKey: "Actions",
                    header: "",
                    Cell: ({ renderedCellValue, row }) => (
                        <span>
                            <Tooltip title="Delete" placement="top">
                                <Button
                                    className="customButtonForHover"
                                    sx={{
                                        borderColor: "var(--c-secondary-color)",
                                        backgroundColor: "#ffffff",
                                        color: "#919191",
                                        width: "33px",
                                    }}
                                    onClick={() => removeRowTable(row.original.id)}
                                >
                                    <ClearIcon
                                        sx={{
                                            fontSize: "16px",
                                        }}
                                    />
                                </Button>
                            </Tooltip>
                        </span>
                    ),
                    size: 50,
                },
            ] as MRT_ColumnDef<addGroup["groupby"]>[],
        []
    );
    //console.log(data);
    const table = useMaterialReactTable({
        autoResetPageIndex: false,
        columns,
        data: addDynamicList[0].groupby,
        initialState: { density: "compact" },
        enableRowOrdering: true,
        enableSorting: false,
        enableBottomToolbar: true,
        enableStickyHeader: true,
        enableStickyFooter: true,
        enablePagination: false,
        muiTableContainerProps: { sx: { maxHeight: "300px" } },
        renderDetailPanel: ({ row }) => (
            <div>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <Typography>
                            {" "}
                            <span>
                                <label title="Summary Function(optional)">
                                    Summary Function(optional)
                                </label>
                                <TextField
                                    fullWidth
                                    id={`summaryfun-${row.original.id}`}
                                    name={`summaryfun-${row.original.id}`}
                                    size="small"
                                    value={row.original.summaryFunction}
                                    onChange={e =>
                                        handleJSONUpdate(e, row.original.id, "summaryFunction")
                                    }
                                    select
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    {summaryFunctionList.map((option, index) => {
                                        if (
                                            row.original.columnType === "Number" &&
                                            (option.type === "Number" || option.type !== "Number")
                                        ) {
                                            return (
                                                <MenuItem key={index} value={option.value}>
                                                    {" "}
                                                    {option.name}{" "}
                                                </MenuItem>
                                            );
                                        } else if (option.type !== "Number") {
                                            return (
                                                <MenuItem key={index} value={option.value}>
                                                    {" "}
                                                    {option.name}{" "}
                                                </MenuItem>
                                            );
                                        }
                                    })}
                                </TextField>
                            </span>{" "}
                        </Typography>
                    </Grid>

                    <Grid size={3}>
                        <Typography>
                            {" "}
                            <span>
                                <label title="Optional Function(optional)">
                                    Function(optional)
                                </label>
                                <TextField
                                    fullWidth
                                    id={`optionalfun-${row.original.id}`}
                                    name={`optionalfun-${row.original.id}`}
                                    size="small"
                                    value={row.original.optionalFunctionValue}
                                    onChange={e =>
                                        handleJSONUpdate(
                                            e,
                                            row.original.id,
                                            "optionalFunctionValue"
                                        )
                                    }
                                    select
                                >
                                    <MenuItem value="">Select</MenuItem>

                                    {optionalFunctionList.map((option, index) => {
                                        if (
                                            row.original.columnType === "Date" &&
                                            option.type === "Date"
                                        ) {
                                            return (
                                                <MenuItem key={index} value={option.value}>
                                                    {" "}
                                                    {option.name}{" "}
                                                </MenuItem>
                                            );
                                        } else if (option.type !== "Date") {
                                            return (
                                                <MenuItem key={index} value={option.value}>
                                                    {" "}
                                                    {option.name}{" "}
                                                </MenuItem>
                                            );
                                        }
                                    })}
                                </TextField>
                            </span>{" "}
                        </Typography>
                    </Grid>
                    <Grid size="grow">
                        <Typography
                            sx={{
                                margin: "auto",
                            }}
                            className={`${row.original.optionalFunctionValue === "substring"
                                ? "d-block"
                                : "d-none"
                                }`}
                        >
                            <span>
                                <label title="starting_Point">Starting Point</label>
                                <TextField
                                    size="small"
                                    id={`starting_Point.${row.id}`}
                                    sx={{ margin: "2px" }}
                                    value={
                                        row.original.optionalFunction[0].substring.starting_Point
                                    }
                                    onChange={e =>
                                        handleSubstringJSONUpdate(
                                            e,
                                            row.original.id,
                                            "starting_Point"
                                        )
                                    }
                                // contentEditable="true"
                                ></TextField>{" "}
                            </span>{" "}
                        </Typography>
                        <Typography
                            sx={{
                                margin: "auto",
                            }}
                            className={`${row.original.optionalFunctionValue === "left"
                                ? "d-block"
                                : "d-none"
                                }`}
                        >
                            <span>
                                {" "}
                                <label title="Number_of_characters_from_left">
                                    Number of characters from Left
                                </label>
                                <TextField
                                    size="small"
                                    id={`Number_of_characters_from_left.${row.id}`}
                                    sx={{ margin: "2px" }}
                                    value={
                                        row.original.optionalFunction[0].left
                                            .Number_of_characters_from_left
                                    }
                                    onChange={e =>
                                        handleLeftJSONUpdate(
                                            e,
                                            row.original.id,
                                            "Number_of_characters_from_left"
                                        )
                                    }
                                ></TextField>{" "}
                            </span>
                        </Typography>

                        <Typography
                            sx={{
                                margin: "auto",
                            }}
                            className={`${row.original.optionalFunctionValue === "right"
                                ? "d-block"
                                : "d-none"
                                }`}
                        >
                            <span>
                                {" "}
                                <label title="Number_of_characters_from_right">
                                    Number of characters from Right
                                </label>
                                <TextField
                                    size="small"
                                    id={`Number_of_characters_from_right.${row.id}`}
                                    sx={{ margin: "2px" }}
                                    value={
                                        row.original.optionalFunction[0].right
                                            .Number_of_characters_from_right
                                    }
                                    onChange={e =>
                                        handleRightJSONUpdate(
                                            e,
                                            row.original.id,
                                            "Number_of_characters_from_right"
                                        )
                                    }
                                ></TextField>{" "}
                            </span>{" "}
                        </Typography>
                    </Grid>
                    <Grid size={3}>
                        <Typography
                            className={`${row.original.optionalFunctionValue === "substring"
                                ? "d-block"
                                : "d-none"
                                }`}
                        >
                            <span>
                                {" "}
                                <label title="length_of_String">Length of String</label>
                                <TextField
                                    size="small"
                                    id={`length_of_String.${row.id}`}
                                    sx={{ margin: "2px" }}
                                    value={
                                        row.original.optionalFunction[0].substring.length_of_String
                                    }
                                    onChange={e =>
                                        handleSubstringJSONUpdate(
                                            e,
                                            row.original.id,
                                            "length_of_String"
                                        )
                                    }
                                ></TextField>{" "}
                            </span>{" "}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        ),
        muiRowDragHandleProps: ({ table }) => ({
            onDragEnd: () => {
                const { draggingRow, hoveredRow } = table.getState();
                if (hoveredRow && draggingRow) {
                    const temp1 = [...addDynamicList];
                    if (temp1[0].groupby && Array.isArray(temp1[0].groupby)) {
                        temp1[0].groupby.splice(
                            (hoveredRow as MRT_Row<addGroup["groupby"]>).index,
                            0,
                            temp1[0].groupby.splice(draggingRow.index, 1)[0]
                        );
                        // temp1[0].groupby = temp1[0].groupby;
                        setAddDynamicList(temp1);
                        //   setAddDynamicList({...addDynamicList, [0]: { ...addDynamicList[0], groupby:addDynamicList[0].groupby}});
                        // data.splice(
                        //     (hoveredRow as MRT_Row<addGroup["groupby"]>).index,
                        //     0,
                        //     data.splice(draggingRow.index, 1)[0],
                        //   );
                        //   setData([...data]);
                    }
                }
            },
        }),
        // muiBottomToolbarProps: ({ table }) => (
        //     <Grid
        //         container
        //         direction={'row'}
        //         justifyContent="center"
        //         alignItems="center"
        //         className="cart p-2 fw-7 mt-1"
        //         ref={setNodeRef}
        //     >
        //         <span>Drop fileds here to group by in the report</span>
        //     </Grid>
        // )
    });

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (

        <div id="ReportGroups" className=" px-4 py-2"
        //  style={{ boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.1)' }} 
        >
            {/* <Typography sx={{ textAlign: "left", margin: "1px", fontWeight: "Bold" }}>
                {" "}
                Groups{" "}
            </Typography> */}
            <div ref={drop}>
                <Grid className="routerHeight1 MRTableCustom" sx={{ height: 330, backgroundColor: "#ffffff" }}>
                    <MRT_TableContainer table={table} />
                    <Grid
                        container
                        direction={'row'}
                        justifyContent="center"
                        alignItems="center"
                        className="cart p-2 fw-7 mt-1"
                        ref={drop}
                        sx={{
                            position: "relative",
                            top: "-38px"
                        }}
                        // onClick={saveAuditLog(4211)}
                    >
                        <span>Drop fileds here to group by in the report</span>
                    </Grid>
                </Grid>
                {/* {items.map((item, idx) => (
                <div key={`${item}-${idx}`} className={styles["cart-item"]}>
                  {item}
                </div>
              ))} */}
            </div>
            {/* {data.map((item, idx) => (
                <div key={`${item.id}-${idx}`} >
                  {item.displayName}
                </div>
              ))} */}
        </div>

    );
};
export default ReportGroups;

// interface IColumnDropable {
//     id: string;
//     items: addGroup["groupby"]| any;
//     onCallback: (updatedGroupbyObjects: addGroup["groupby"][]) => void;
// }

// //, onCallback
// const ReportGroups: FC<IColumnDropable> = ({ id, items, onCallback}) => {
//     // const { id, items } = props;
//     const { setNodeRef } = useDroppable({
//         id
//     });
//    // console.log(id)
//   //  console.log(items)
//     const [updatedObjects, setUpdatedObjects] = useState<addGroup["groupby"]>();
//     const [data, setData] = useState<any>([]);
//      const [editedData, setEditedData] = useState<addGroup["groupby"]>();
//    // const [dynamicSummaryList, setDynamicSummaryList] = useState<any>([]);

// //    useEffect(() => {
// //     setTimeout(() => {
// //         setData([items]);
// //         console.log("change");
// //         console.log(data);
// //     }, 200);
// // }, [items]);
//     useEffect(() => {
//         setTimeout(() => {
//             setData([...items]);
//             setEditedData(data);
//             // console.log("addded");
//             // console.log(editedData);
//         }, 200);

//     }, [items.length]);

//     const handleOptionalFun = (e: any, id: any, field: any) => {
//      //   setDynamicSummaryList(e.target.value);
//     }
//     const handleJSONUpdate = (e: any, id: any, field: keyof addGroup["groupby"]) => {
//         // Update the data when the input changes
//         const updatedData = items.map((row:any) => {
//             if (row.id === id) {
//               return { ...row, [field]: e.target.value };
//             }
//             return row;
//           });

//        //  setData(updatedData);
//       //   setUpdatedObjects(updatedData);
//          onCallback(updatedData);
//          //console.log(updatedData);
//     };

//     const handleSubstringJSONUpdate = (e: any, id: any, field: keyof addGroup["groupby"]["optionalFunction"][0]["substring"]) => {
//         // Update the data when the input changes
//         const updatedData = items.map((row:any) => {
//             if (row.id === id) {
//               return { ...row, [field]: e.target.value };
//             }
//             return row;
//           });
//          setData(updatedData);
//         setUpdatedObjects(updatedData);
//         onCallback(updatedData);
//     };

//     const handleLeftJSONUpdate = (e: any, id: any, field: keyof addGroup["groupby"]["optionalFunction"][0]["left"]) => {
//         // Update the data when the input changes
//         const updatedData = items.map((row:any) => {
//             if (row.id === id) {
//               return { ...row, [field]: e.target.value };
//             }
//             return row;
//           });
//          setData(updatedData);
//         setUpdatedObjects(updatedData);
//         onCallback(updatedData);
//     };

//     const handleRightJSONUpdate = (e: any, id: any, field: keyof addGroup["groupby"]["optionalFunction"][0]["right"]) => {
//         // Update the data when the input changes
//         const updatedData = items.map((row:any) => {
//             if (row.id === id) {
//               return { ...row, [field]: e.target.value };
//             }
//             return row;
//           });
//         setData(updatedData);
//         setUpdatedObjects(updatedData);
//         onCallback(updatedData);
//     };

//     const removeRowTable = (id: any) => {
//         const updatedData = items.filter((todo: any) => {
//             return todo.id !== id;
//         });
//         // setData(updatedData);
//         // setUpdatedObjects(updatedData);
//         // onCallback(updatedData);
//     };

//     const columns = useMemo(
//         () =>
//             [
//                 {
//                     accessorKey: 'id',
//                     header: 'ID',
//                     size: 50,
//                 },
//                 {
//                     accessorKey: 'module_id',
//                     header: 'Module',
//                 },
//                 {
//                     accessorKey: 'dataFieldName',
//                     header: 'Data Field Name',
//                 },
//                 {
//                     accessorKey: 'displayName',
//                     header: 'Display Name',
//                     Cell: ({ renderedCellValue, row }) => (
//                         <span>
//                             <TextField
//                                 fullWidth
//                                 id={`displayName-${row.original.id}`}
//                                 name={`displayName-${row.original.id}`}
//                                 size="small"
//                                 value={row.original.displayName}

//                                 onChange={(e) => handleJSONUpdate(e, row.original.id, 'displayName')}
//                             />
//                         </span>
//                     ),
//                     size: 80
//                 },
//                 {
//                     accessorKey: 'sortorder',
//                     header: 'Sort Order',

//                     Cell: ({ renderedCellValue, row }) => (
//                         <span>
//                             <TextField
//                                 fullWidth
//                                 name="mileradius"
//                                 size="small"
//                                 value={row.original.sortorder}
//                                 onChange={(e) => handleJSONUpdate(e, row.original.id, 'sortorder')}
//                                 //  onChange={(event)=>handleJSONUpdate(event,row.original.id,'sortorder')}
//                                 select
//                             >
//                                 <MenuItem value="">Select Order</MenuItem>
//                                 <MenuItem value="ASC">ASC</MenuItem>
//                                 <MenuItem value="DESC">DESC</MenuItem>
//                             </TextField>

//                         </span>
//                     ),
//                     size: 80
//                 },
//                 {
//                     accessorKey: "Actions",
//                     header: "",
//                     Cell: ({ renderedCellValue, row }) => (
//                         <span>
//                             <Tooltip
//                                 title="Delete"
//                                 placement="top"
//                             >
//                                 <Button
//                                     className="customButtonForHover"
//                                     sx={{
//                                         borderColor: "var(--c-secondary-color)",
//                                         backgroundColor: "#ffffff",
//                                         color: "#919191",
//                                         width: "33px",
//                                     }}
//                                     onClick={() => removeRowTable(row.original.id)}
//                                 >
//                                     <ClearIcon
//                                         sx={{
//                                             fontSize:
//                                                 "16px",
//                                         }}
//                                     />
//                                 </Button>
//                             </Tooltip>
//                         </span>
//                     ),
//                     size: 50
//                 },
//             ] as MRT_ColumnDef<addGroup["groupby"]>[],
//         [],
//     );
//     //console.log(data);
//     const table = useMaterialReactTable({
//         autoResetPageIndex: false,
//         columns,
//         data,
//         initialState: { density: 'compact' },
//         enableRowOrdering: true,
//         enableSorting: false,
//         enableBottomToolbar: true,
//         enableStickyHeader: true,
//         enableStickyFooter: true,
//         enablePagination: false,
//         muiTableContainerProps: { sx: { maxHeight: '300px' } },
//         renderDetailPanel: ({ row }) => (
//             <div>

//                 <Grid container spacing={2}>
//                     <Grid size={3}>
//                         <Typography  > <span>
//                             <label title='Summary Function(optional)' >Summary Function(optional)</label>
//                             <TextField
//                                 fullWidth
//                                 id={`summaryfun-${row.original.id}`}
//                                 name={`summaryfun-${row.original.id}`}
//                                 size="small"
//                                 value={row.original.summaryFunction}
//                                 onChange={(e) => handleJSONUpdate(e, row.original.id, 'summaryFunction')}
//                                 select
//                             >
//                                 <MenuItem value="">Select</MenuItem>
//                                 {summaryFunctionList.map((option, index) => {
//                                     if (row.original.columnType === "Number" && (option.type === "Number" || option.type !== "Number")) {
//                                         return (<MenuItem key={index} value={option.value}>  {option.name}  </MenuItem>);
//                                     } else if (option.type !== "Number") {
//                                         return (<MenuItem key={index} value={option.value}>  {option.name}  </MenuItem>);
//                                     }
//                                 }
//                                 )}
//                             </TextField>

//                         </span> </Typography>
//                     </Grid>

//                     <Grid size={3}>
//                         <Typography  > <span>
//                             <label title='Optional Function(optional)' >Function(optional)</label>
//                             <TextField
//                                 fullWidth
//                                 id={`optionalfun-${row.original.id}`}
//                                 name={`optionalfun-${row.original.id}`}
//                                 size="small"
//                                 value={row.original.optionalFunctionValue}
//                                 onChange={(e) => handleJSONUpdate(e, row.original.id, 'optionalFunctionValue')}
//                                 select
//                             >
//                                 <MenuItem value="">Select</MenuItem>

//                                 {optionalFunctionList.map((option, index) => {
//                                     if (row.original.columnType === "Date" && option.type === "Date") {
//                                         return (<MenuItem key={index} value={option.value}>  {option.name}  </MenuItem>);
//                                     } else if (option.type !== "Date") {
//                                         return (<MenuItem key={index} value={option.value}>  {option.name}  </MenuItem>);
//                                     }
//                                 })}
//                             </TextField>

//                         </span> </Typography>
//                     </Grid>
//                     <Grid size="grow">

//                         <Typography sx={{
//                             margin: 'auto',
//                         }} className={`${row.original.optionalFunctionValue === "substring" ? "d-block" : "d-none"}`}>

//                             <span>
//                                 <label title='starting_Point' >Starting Point</label>

//                                 <TextField size='small' id={`starting_Point.${row.id}`} sx={{ margin: "2px", }}
//                                     value={row.original.optionalFunction[0].substring.starting_Point}
//                                     onChange={(e) => handleSubstringJSONUpdate(e, row.original.id, 'starting_Point')}></TextField>  </span>  </Typography>
//                         <Typography sx={{
//                             margin: 'auto',
//                         }} className={`${row.original.optionalFunctionValue === "left" ? "d-block" : "d-none"}`}>
//                             <span>    <label title='Number_of_characters_from_left' >Number of characters from Left</label>

//                                 <TextField size='small' id={`Number_of_characters_from_left.${row.id}`} sx={{ margin: "2px", }}
//                                     value={row.original.optionalFunction[0].left.Number_of_characters_from_left}
//                                     onChange={(e) => handleLeftJSONUpdate(e, row.original.id, 'Number_of_characters_from_left')}></TextField>  </span></Typography>

//                         <Typography sx={{
//                             margin: 'auto',
//                         }} className={`${row.original.optionalFunctionValue === "right" ? "d-block" : "d-none"}`}>
//                             <span>  <label title='Number_of_characters_from_right' >Number of characters from Right</label>

//                                 <TextField size='small' id={`Number_of_characters_from_right.${row.id}`} sx={{ margin: "2px", }}
//                                     value={row.original.optionalFunction[0].right.Number_of_characters_from_right}
//                                     onChange={(e) => handleRightJSONUpdate(e, row.original.id, 'Number_of_characters_from_right')}></TextField> </span> </Typography>

//                     </Grid>
//                     <Grid size={3}   >
//                         <Typography className={`${row.original.optionalFunctionValue === "substring" ? "d-block" : "d-none"}`}>
//                             <span>  <label title='length_of_String' >Length of String</label>

//                                 <TextField size='small' id={`length_of_String.${row.id}`} sx={{ margin: "2px", }}
//                                     value={row.original.optionalFunction[0].substring.length_of_String}
//                                     onChange={(e) => handleSubstringJSONUpdate(e, row.original.id, 'length_of_String')}></TextField> </span> </Typography>

//                     </Grid>
//                 </Grid>

//             </div>
//         ),
//         muiRowDragHandleProps: ({ table }) => ({
//             onDragEnd: () => {
//                 const { draggingRow, hoveredRow } = table.getState();
//                 if (hoveredRow && draggingRow) {
//                     data.splice(
//                         (hoveredRow as MRT_Row<addGroup["groupby"]>).index,
//                         0,
//                         data.splice(draggingRow.index, 1)[0],
//                     );
//                     setData([...data]);
//                 }
//             },
//         }),

//     });

//     return (
//         <div id='ReportGroups' className="customCard px-4 py-2">

//             <Typography sx={{ textAlign: 'left', margin: "1px", fontWeight: "Bold" }} > Groups </Typography>
//             <div ref={setNodeRef}>
//                 <Grid className='routerHeight1' sx={{ height: 302 }}>
//                     <MRT_TableContainer table={table} />
//                 </Grid>
//                 <div className="cart">
//                     Drop fileds here to group by in the report
//                     {/* {items.map((item, idx) => (
//         <div key={`${item}-${idx}`} className={styles["cart-item"]}>
//           {item}
//         </div>
//       ))} */}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ReportGroups;
