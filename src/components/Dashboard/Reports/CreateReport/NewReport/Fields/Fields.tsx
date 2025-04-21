// import { useState, useRef, useEffect, useContext } from "react";
import { useContext } from "react";
import { useState, useEffect } from "../../../../../../shared/modules/React";
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import './Fields.scss';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, InputAdornment, TextField,IconButton } from '../../../../../../shared/modules/commonImports';
// import { DndContext, DragEndEvent } from "@dnd-kit/core";
// import { styled } from '@mui/material/styles';
// import { useDraggable } from "@dnd-kit/core";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionSummary, AccordionDetails} from '../../../../../../shared/modules/MaterialImports/Accordion';
import ColumnDraggable from "./ColumnDraggable"
import { DynamicFieldStore } from "../../CreateReport";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { dataCustomFields as addDataCustomFields, type addCustomFields } from '../addCustomFields'
import AddFormulaDialogBox from '../BaseModule/AddFormulaDialogBox';
// import { Height } from '@mui/icons-material';
import { useDebounce } from '../../../../../../shared/services/useDebounce';
import ApiService from "../../../../../../shared/api/api"

//import ApiService from '../../../../../../shared/api/api';
//import { trackPromise } from 'react-promise-tracker';

// import { dataFiled as addData, type addField } from '../AddField';

const Fields = ({ dataFieldListProp }:any) => {
  const [dataList, setDataLsit] = useState<any>([]);
  const [addCustumList, setAddCustomList] = useState([...addDataCustomFields]);//
  const [addCustomFieldsList, setAddCustomFieldsList] = useState<any>([]);

  const [customData, setCustomData] = useState<any>({});
  const [dataFieldList, setDataFieldLsit] = useContext(DynamicFieldStore);


  const [fieldSuggestions, setFieldSuggestions] = useState([]);
  const [selectedFiledTitle, setSelectedFiledTitle] = useState('');

  useEffect(() => {
    //const apiContact = async () => {
    //   trackPromise(
    //     ApiService.getCall(193, 'Jobs/jobs_report.jsp').then((response: any) => {

    //         console.log(response.data);
    //         setDataFieldLsit(response.data); 
    //     })
    // ); 
    // apiContact();
  }, []);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleAddFormulaDialogOpen = (customName: any) => {
    //let index = 0;
    // console.log(customName);
    const newState = dataFieldList[0].columns.map((obj: any, index: any) => {
      if (obj.columnName === customName) {
        //  fieldIndex.current = index;
        console.log(obj.columnName);
        setCustomData({ ...obj });
      }
      return
    });
    //  console.log(customData);
    setDialogOpen(true);
    //  handleAddFormulaDialogClose();
  };

  const handleAddFormulaDialogClose = () => {
    setDialogOpen(false);
  };

  const debouncedSearch = useDebounce((term: any) => {

    const filteredResults = dataFieldList.map((module: any) => ({
      ...module,
      columns: module.columns.filter((column: any) => column.displayName.toLowerCase().includes(term.toLowerCase()) ||
        column.columnName.toLowerCase().includes(term.toLowerCase()))
    })).filter((module: any) => module.columns.length > 0);
    // console.log(filteredResults);
    setFieldSuggestions(filteredResults);
  }, 300); // Adjust the debounce delay as needed


  const handleSearchDialog = (event: any) => {
    const term = event.target.value;
    setSelectedFiledTitle(term);
    debouncedSearch(term);
  };


  const handleDeleteFormulaDialog = (customFieldName: any) => {
    console.log(customFieldName);
    const temp1 = [...addCustumList];
    const fieldState = addCustumList[0].columns.filter(module => module.columnName !== customFieldName);
    temp1[0].columns = fieldState;

    setAddCustomList(temp1);
  };


  useEffect(() => {
    const temp1 = [...addCustumList];
    if( !!addCustumList[0]?.columns?.length){
    const mutationOfData = addCustumList[0].columns.map((row: any) => {
      return row;
    });
    temp1[0].columns = mutationOfData;
    setAddCustomFieldsList(mutationOfData);
    // console.log(mutationOfData);
    let tValue = true;
    const tempData = [...dataFieldList];
    const updatedData = dataFieldList.map((row: any) => {
      if (row.ModuleName === 'Custom Fields') {
        tValue = false;
        return { ...row, columns: addCustomFieldsList };
      }
    });
    setDataFieldLsit(updatedData);

    const combinedDataSet = (tValue === true) ? [...addCustumList, ...dataFieldList] : dataFieldList;
    setDataFieldLsit(combinedDataSet);
  }
  }, [addCustumList[0]]);

  const saveAuditLog = (id: number) => {
    ApiService.saveAuditLog(id);
}

  return (
    <div id='Fields' className="customCard1 px-0 py-0">
      {/* <Typography sx={{ textAlign: 'left', margin: "1px", fontWeight: "Bold" }} > Fields </Typography> */}

      <TextField
        sx={{ marginTop: "5px", marginBottom: "15px", }}
        id="universalSearch"
        name="universalSearch"
        fullWidth
        type="text"
        placeholder="Search for Fields"
        value={selectedFiledTitle}
        onChange={handleSearchDialog}
        onClick={()=>saveAuditLog(4210)}

        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon
                className='searchIcon'
              />
            </InputAdornment>
          ),

        }}
        onKeyDown={(ev) => {
          // console.log(`Pressed keyCode ${ev.key}`);
          if (ev.key === 'Enter') {
            // Do code here
            ev.preventDefault();
          }
        }}
        variant="outlined"
        size='small'
      />
      {/* //sx={{ maxHeight:  `calc(100vh - 305px)`,  overflow:"auto"}} */}
      <Grid container spacing={0}
        sx={{
          // height: 'calc(100vh - 100px)',
          // overflowX: "hidden",
          // overflowY: "auto"
        }}
      >
        <main className="main">
          <div className="columnVal-list-section" >

            {
              (selectedFiledTitle) ? fieldSuggestions.map((columnVal: any, index: any) => {
                if (columnVal.columns.length) {
                  return (<Accordion key={columnVal.ModuleName}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`${columnVal.ModuleName}-content`}
                      id={`${columnVal.ModuleName}-header`}
                    >
                      <Typography className='heightField'>{columnVal.ModuleName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails className="columnVal-list">
                      {columnVal.columns.map((innerColumnVal: any, index: number) => {
                        if (columnVal.ModuleName !== 'Custom Fields') {
                          return (innerColumnVal.displayName !== "") && (<Grid container direction="row"><Grid size={12} className='ml-1 mb-0 pr-2'> <ColumnDraggable key={innerColumnVal.displayName + index}>{innerColumnVal.displayName}</ColumnDraggable></Grid></Grid>)
                        } else {
                          return (innerColumnVal.displayName !== "") && (<Grid container direction="row"><Grid size={1} ><IconButton className={columnVal.ModuleName !== 'Custom Fields' ? 'd-none' : ""} onClick={() => handleDeleteFormulaDialog(innerColumnVal.columnName)} ><DeleteIcon fontSize="small" /></IconButton></Grid><Grid size={1} className='pr-2'><IconButton className={columnVal.ModuleName !== 'Custom Fields' ? 'd-none' : ""} onClick={() => handleAddFormulaDialogOpen(innerColumnVal.columnName)} ><EditIcon fontSize="small" /></IconButton></Grid><Grid size={12} className='ml-3 mb-1 pr-2'> <ColumnDraggable key={innerColumnVal.displayName + index}>{innerColumnVal.displayName}</ColumnDraggable></Grid></Grid>)
                        }
                      })}
                    </AccordionDetails>
                  </Accordion>);
                }

              }) :
                dataFieldList?.map((columnVal: any, index: any) => {
                  if (columnVal.columns.length) {
                    return (<Accordion key={columnVal.ModuleName}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${columnVal.ModuleName}-content`}
                        id={`${columnVal.ModuleName}-header`}
                      >
                        <Typography className='heightField'>{columnVal.ModuleName}</Typography>
                      </AccordionSummary>
                      <AccordionDetails className="columnVal-list">
                        {columnVal.columns.map((innerColumnVal: any, index: number) => {
                          if (columnVal.ModuleName !== 'Custom Fields') {
                            return (innerColumnVal.displayName !== "") && (<Grid container direction="row" className='Column-item-header'><Grid size={12} className='my-1 p-0' style={{ opacity: 1 }}> <ColumnDraggable key={innerColumnVal.displayName + index}>{innerColumnVal.displayName}</ColumnDraggable></Grid></Grid>)
                          } else {
                            return (innerColumnVal.displayName !== "") && (<Grid container direction="row" className='Column-item-header' ><Grid size={1} ><IconButton className={columnVal.ModuleName !== 'Custom Fields' ? 'd-none' : ""} onClick={() => handleDeleteFormulaDialog(innerColumnVal.columnName)} ><DeleteIcon fontSize="small" /></IconButton></Grid>
                              <Grid size={1} className='pr-2'><IconButton className={columnVal.ModuleName !== 'Custom Fields' ? 'd-none' : ""} onClick={() => handleAddFormulaDialogOpen(innerColumnVal.columnName)} ><EditIcon fontSize="small" /></IconButton></Grid>
                              <Grid size={12} className='ml-3 mb-1 pr-2'><ColumnDraggable key={innerColumnVal.displayName + index}>{innerColumnVal.displayName}</ColumnDraggable></Grid></Grid>)
                          }
                        })}
                      </AccordionDetails>
                    </Accordion>);
                  }

                })
            }
          </div>
          {
            isDialogOpen ?
              <AddFormulaDialogBox open={isDialogOpen} onClose={handleAddFormulaDialogClose} customData={customData} onDataFromC={()=>{}} />
              :
              null
          }
        </main>
      </Grid>

    </div>
  )
}

export default Fields;
