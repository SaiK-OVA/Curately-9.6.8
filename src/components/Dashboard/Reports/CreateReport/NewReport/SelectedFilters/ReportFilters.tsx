import { useContext } from 'react';
import { useState} from '../../../../../../shared/modules/React';
// import {
//     useMaterialReactTable,
//     type MRT_ColumnDef,
//     type MRT_Row,
//     MRT_TableContainer,
// } from 'material-react-table';
import ClearIcon from '@mui/icons-material/Clear';
import {TextField, FormControl, FormControlLabel} from '../../../../../../shared/modules/MaterialImports/FormInputs';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';
// import ButtonGroup from '@mui/material/ButtonGroup';
import {Button, IconButton, Grid} from '../../../../../../shared/modules/commonImports';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import {Tooltip}  from "../../../../../../shared/modules/MaterialImports/ToolTip";
import './ReportFilters.scss';
import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";
import '../NewReport.scss';
// import { CSS } from "@dnd-kit/utilities";
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
// import Checkbox from '@mui/material/Checkbox';
import {Select, RadioGroup,Radio} from '../../../../../../shared/modules/MaterialImports/FormElements';
// import { SelectChangeEvent } from '@mui/material/Select';

// import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import FilterRow from './FilterRow';
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';

import { addDynamicGroup as addGroup } from '../AddDynamicReport';
// import { summaryFunctionList, optionalFunctionList } from '../AddDynamicReport';
import { DynamicReportStore } from "../../CreateReport";
import { DynamicFieldStore } from "../../CreateReport";
import { DndProvider, useDrag, useDrop } from 'react-dnd';

interface IColumnDropable {
    id: string;
    //items: addGroup["columns"] | any;
    //  onCallback: (updatedColumnObjects: addGroup["columns"][]) => void;
}



const ReportFilters: FC<IColumnDropable> = ({ id }) => {
    // const { id, items } = props;
    // const { setNodeRef } = useDroppable({
    //     id
    // });
    const [cartItems, setCartItems] = useState<any>([]);
    const [dataFieldList, setDataFieldLsit] = useContext(DynamicFieldStore);
    const [addDynamicList, setAddDynamicList] = useContext(DynamicReportStore);
    const [data, setData] = useState<addGroup["filters"][]>(addDynamicList[0].filters);
    const [, drop] = useDrop({
        accept: 'LIST_ITEM',
        drop: (e: React.DragEvent<HTMLDivElement>) => {
            const newItem = e?.data?.title;
            console.log('Dropped Item:', newItem);

            if (id === "rptFilters" && addDynamicList[0]?.filters[0]) {
                // Check filters before updating
                let temp1 = [...addDynamicList];
                console.log('Current Filters:', addDynamicList[0].filters[0].filterdetails);

                let maxValue = 0; let logicValue = "";
                addDynamicList[0]?.filters[0]?.filterdetails.map((el: any) => {
                    const valueFromObject = el.id;
                    maxValue = Math.max(maxValue, valueFromObject);
                });
                logicValue = addDynamicList[0]?.filters[0]?.filterLogic;

                // Check ID and logic values
                console.log('Max Value:', maxValue);
                console.log('Logic Value:', logicValue);

                let idval = (addDynamicList[0].filters[0].filterdetails.length > 0) ? maxValue + 1 : 1;
                let CtValue = "true";
                // const temp1 = [...addDynamicList];
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
                setData(addDynamicList[0].filters);
            }
            const updatedCartItems = [...cartItems, newItem];
            setCartItems(updatedCartItems);
            console.log('Updated Cart Items:', updatedCartItems);
        }
    });
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

    // const [updatedObjects, setUpdatedObjects] = useState<addGroup["columns"]>();
    //   const [data, setData] = useState<any>([]);
    // const [dynamicSummaryList, setDynamicSummaryList] = useState<any>([]);
    // const [logicData, setLogicData] = useState<string>(addDynamicList[0].filters[0].filterLogic);

    //const handleJSONUpdate = (e: any, id: any, field: keyof addGroup["filters"]["filterdetails"]) => {
    const handleJSONUpdate = (e: any, id: any, field: String) => {
        // Update the data when the input changes
        const temp1 = [...addDynamicList];
        const updatedData = addDynamicList[0].filters[0].filterdetails.map((row: any) => {
            if (row.id === id) {
                return { ...row, compare: e.target.value };
            }
            return row;
        });
        temp1[0].filters[0].filterdetails = updatedData;
        setAddDynamicList(temp1);
        //      console.log(updatedData);
    };

    const handleTextChange = (e: any, id: any, nextValue: any, val: any, compare: any) => {
        // Update the data when the input changes
        let compValue: any;

        console.log(compare + " -current " + e.target.value + " -next " + nextValue + " -id " + id + " -val " + val);

        // if((compare === "between" || compare === "not between")){ 
        //    compValue = ((val=="1"))? e.target.value+","+nextValue : nextValue+","+e.target.value;
        //     console.log(compValue);
        // }else{
        //    compValue = e.target.value
        //     console.log(compValue);
        // }


        const temp1 = [...addDynamicList];
        const updatedData = addDynamicList[0].filters[0].filterdetails.map((row: any) => {
            if (row.id === id) {
                let endValue = (row.compareValues.length === 2) ? row.compareValues[1] : "";
                let covalue = row.compareValues[0];
                //   let endValue1= (endValue!=="")? e.target.value+","+endValue: e.target.value;
                // compValue = ((val=="1"))? endValue1 : covalue+","+e.target.value;

                // console.log("---- current " + e.target.value);
                // console.log("---- nextValue " + nextValue);
                // console.log("---- endValue " + endValue);

                if ((compare === "between" || compare === "not between")) {
                    if (val == "1") {
                        return { ...row, compareValues: [e.target.value, endValue] };
                    } else {
                        return { ...row, compareValues: [nextValue, e.target.value] };
                    }

                } else {
                    return { ...row, compareValues: [e.target.value] };
                }
            }
            return row;
        });
        temp1[0].filters[0].filterdetails = updatedData;
        setAddDynamicList(temp1);
        console.log(updatedData);
    };

    function addDays(date: Date, days: number): Date {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    const renderFilter = (id: any, filter: any, index: number, compare: any, rvalue: any) => {
        // console.log(rvalue);
        const rvalue1 = "";// rvalue.split(",");
        // let resultValue = rvalue.split(",");
        //  console.log(resultValue);
        //  let rvalue1 = resultValue[1];
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');
        const currentDate = new Date();
        const dateAfter30Days = addDays(currentDate, -10);
        const formattedDate30 = dateAfter30Days.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').reverse().join('-');
        let endate = (rvalue[1] !== "") ? rvalue[1] : formattedDate;
        let startdate = (rvalue[0] !== "") ? rvalue[0] : formattedDate30;

        switch (filter) {
            case 'Date':
                return (
                    <>
                        <FormControl>
                            <Select
                                id={`compare.${id}`}
                                value={compare}
                                size="small"
                                sx={{ width: "150px" }}
                                onChange={(e) => handleJSONUpdate(e, id, 'compare')}
                            >
                                <MenuItem value="=">is on</MenuItem>
                                <MenuItem value="!=">is not on</MenuItem>
                                <MenuItem value="<">is before</MenuItem>
                                <MenuItem value=">">is after</MenuItem>
                                <MenuItem value="<=">is before or on</MenuItem>
                                <MenuItem value=">=">is after or on</MenuItem>
                                <MenuItem value="between">Between</MenuItem>
                                <MenuItem value="not between">Not Between</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <TextField
                                value={startdate}
                                onChange={(newValue) => handleTextChange(newValue, id, endate, '1', compare)}
                                size="small"
                                label="Enter Date"
                                type='Date'
                                InputLabelProps={{ shrink: true, required: true }}
                                sx={{ width: "150px" }}
                            />
                        </FormControl>
                        <FormControl className={`${(compare === "between" || compare === "not between")
                            ? "d-block"
                            : "d-none"
                            }`}>
                            <TextField
                                value={endate}
                                onChange={(newValue) => handleTextChange(newValue, id, startdate, '2', compare)}
                                size="small"
                                label="End Date"
                                type='Date'
                                InputLabelProps={{ shrink: true, required: true }}
                                sx={{ width: "150px" }}
                            />
                        </FormControl>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopDatePicker
                                label="Select date"
                                // Adjust the format as needed
                                slotProps={{ textField: { size: 'small' } }}
                                sx={{ width: "250px" }}
                                value={rvalue}
                            onChange={(newValue) => handleTextChange(newValue,id)}

                            />
                        </LocalizationProvider> */}
                    </>
                ); case 'Boolean':
                return (
                    <>
                        Equals
                        <FormControl component="fieldset" sx={{ width: "auto" }}>
                            <RadioGroup
                                row
                                value={compare}
                                onChange={(e) => handleJSONUpdate(e, id, 'compare')}
                            >
                                <FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
                            </RadioGroup>
                        </FormControl>
                    </>
                );

            case 'String':
                return (
                    <>
                        <FormControl>
                            {/* <InputLabel id="demo-multiple-name-label" >Condition</InputLabel> */}
                            <Select
                                value={compare}
                                size="small"

                                sx={{ width: "150px" }}
                                onChange={(e) => handleJSONUpdate(e, id, 'compare')}
                            //   sx={{ mr: 5, width: 100 }}
                            >
                                <MenuItem value="contains">contains</MenuItem>
                                <MenuItem value="!contains">does not contain</MenuItem>
                                <MenuItem value="starts_with">starts with</MenuItem>
                                <MenuItem value="ends_with">ends with</MenuItem>
                                <MenuItem value="equal">is exactly</MenuItem>
                                <MenuItem value="not_equal">is not exactly</MenuItem>

                            </Select>
                        </FormControl>
                        <TextField
                            value={rvalue[0]}
                            onChange={(newValue) => handleTextChange(newValue, id, '', '1', compare)}
                            size="small"
                            label="Enter value"
                            type={filter === 'String' ? 'text' : ''}
                            sx={{ width: "150px" }}
                        />
                    </>
                );
            case 'Number':
                return (
                    <>
                        <FormControl>
                            {/* <InputLabel id="demo-multiple-name-label" >Condition</InputLabel> */}
                            <Select
                                value={compare}
                                size="small"

                                sx={{ width: "150px" }}
                                onChange={(e) => handleJSONUpdate(e, id, 'compare')}
                            //   sx={{ mr: 5, width: 100 }}
                            >
                                <MenuItem value="equal">is equal to</MenuItem>
                                <MenuItem value="not_equal">is not equal to</MenuItem>
                                <MenuItem value="<">is lower than</MenuItem>
                                <MenuItem value=">">is greater than</MenuItem>
                                <MenuItem value="<=">is lower or equal to</MenuItem>
                                <MenuItem value=">=">is greater or equal to</MenuItem>

                            </Select>
                        </FormControl>
                        <TextField
                            value={rvalue[0]}
                            onChange={(newValue) => handleTextChange(newValue, id, '', '1', compare)}
                            label="Enter value"
                            size="small"
                            sx={{ width: "150px" }}
                            type={filter === 'Number' ? 'number' : 'text'}
                        />
                    </>

                );

            default:
                return null;
        }
    };

    const removeRowTable = (id: any, index: any) => {
        const temp1 = [...addDynamicList];
        const updatedData = addDynamicList[0].filters[0].filterdetails.filter((todo: any) => {
            return todo.id !== id;
        });
        temp1[0].filters[0].filterdetails = updatedData;
        setAddDynamicList(temp1);
        //  console.log(updatedData);
        const index1 = usingSplit.indexOf(id);
        let index2 = 0;
        index2 = (index === 0) ? index1 + 1 : index1 - 1;
        //  index2 = Number(index2); 

        if (index1 !== -1) {
            usingSplit.splice(index1, 1);
        }

        if (index2 !== -1) {
            usingSplit.splice(index1, 1);
        }
        //array.slice(0, -1)
        const usingSplit1 = (usingSplit[usingSplit.length] === "AND" || usingSplit[usingSplit.length] === "OR") ? usingSplit.slice(0, -1) : usingSplit;

        const updatedLogic = usingSplit1.toString();
        const temp2 = [...addDynamicList];
        temp1[0].filters[0].filterLogic = updatedLogic;
        setAddDynamicList(temp2);

    };

    const handleButtonClick = (buttonText: any, index: any) => {
        const btnText = (buttonText === 'AND') ? 'OR' : (buttonText === 'OR') ? 'AND' : buttonText;
        usingSplit[index] = btnText;
        const updatedData = usingSplit.toString();
        const temp1 = [...addDynamicList];
        temp1[0].filters[0].filterLogic = updatedData;
        setAddDynamicList(temp1);
    };

    const usingSplit = data[0]?.filterLogic.split(',');
    // const usingSplit = logicData.split(' ');

    return (
        <div id='SelectedFilters' className='px-4 py-2' ref={drop}>
            {/* <Typography sx={{ textAlign: 'left', margin: "1px", fontWeight: "Bold" }} >  Selected Filters </Typography> */}
            <div className="customCard px-4 py-2" style={{ boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.1)' }} ref={drop}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, }} >
                    <Grid> <Typography>Filters</Typography></Grid>
                    {data && data.length && data[0].filterdetails.map((item, idx) => (
                        (idx === 0) ?
                            <Grid key={item.id + idx}><Button variant="outlined">{idx + 1}</Button></Grid>
                            :
                            <Grid key={item.id + idx}>
                                <Button variant="outlined" className='mr-3'>AND</Button>
                                <label><Button variant="outlined">{idx + 1}</Button></label>
                            </Grid>
                    ))}
                </Box>
                <Grid className='pt-1 pl-2' sx={{ height: "calc(100vh - 60px)", maxHeight: 280, overflow: 'scroll', marginTop: "5px" }}>

                    {data && data.length && data[0].filterdetails.map((item, idx) => (
                        <Grid sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, m: 1 }} key={item.dataFieldName + idx}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', mr: 1 }}>
                                {idx + 1}
                            </Avatar>
                            <IconButton size="small" disabled>
                                <LockIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ minWidth: '166px', textAlign: "left" }}>{item.displayName}</Typography>

                            {renderFilter(item.id, item.columnType, idx, item.compare, item.compareValues)}

                            <span>
                                <Tooltip
                                    title="Delete"
                                    placement="top"
                                >
                                    <Button
                                        className="customButtonForHover"
                                        sx={{
                                            borderColor: "var(--c-secondary-color)",
                                            backgroundColor: "#ffffff",
                                            color: "#919191",
                                            width: "33px",
                                        }}
                                        onClick={() => removeRowTable(item.id, idx)}
                                    >
                                        <ClearIcon
                                            sx={{
                                                fontSize:
                                                    "16px",
                                            }}
                                        />
                                    </Button>
                                </Tooltip>
                            </span>
                        </Grid>
                    ))}
                </Grid>

                <Grid
                    container
                    direction={'row'}
                    justifyContent="center"
                    alignItems="center"
                    className="cart p-2 fw-7 mt-1"
                    ref={drop}
                >
                    <span>Drop fileds here to Filters by in the report</span>
                </Grid>
            </div>
        </div>
    )

}
export default ReportFilters;