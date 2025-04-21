import { useContext} from 'react';
import {React,  useState, useEffect, useRef, useCallback } from '../../../../../../shared/modules/React';

//  import { Formik, Form, Field, FieldArray, ErrorMessage, FormikHelpers } from 'formik';
import { useFormik,Yup } from "../../../../../../shared/modules/Formik";
// import { Typography, Container } from '@mui/material';
// import Box from '@mui/material/Box';
import {Dialog,DialogTitle,DialogContent, DialogActions} from '../../../../../../shared/modules/MaterialImports/Dialog';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';
// import Select from '@mui/material/Select';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import {Grid, TextField,Button, IconButton,InputLabel} from '../../../../../../shared/modules/commonImports';
import { SelectChangeEvent } from '@mui/material/Select';
import {Stack} from '../../../../../../shared/modules/MaterialImports/Stack';
import AddBoxIcon from '@mui/icons-material/AddBox';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { FormLabel } from '@mui/material';
// import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
import './AddFormulaDialogBox.scss'
import { DynamicFieldStore } from "../../CreateReport";
import { dataCustomFields as addDataCustomFields, type addCustomFields } from '../addCustomFields';
import ApiService from '../../../../../../shared/api/api';
import { trackPromise } from 'react-promise-tracker';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';
import { debounce } from 'lodash';


interface DialogBoxProps {
  open: boolean;
  onClose: () => void;
  customData: any;
  onDataFromC: (dataFromC: any) => void;
}

interface Column {
  columnType: string;
  displayName: string;
  moduleName: string;
  columnName: string;
}

interface Module {
  ModuleName: string;
  columns: Column[];
}

interface ColumnDisplay {
  displayName: string;
  columnName: string;
}
interface SourceValue {
  module: string;
  displayName: string;
  columnName: string;
  columnType: string;
  value: string;
  values: ColumnDisplay[];
}
interface FieldData {
  fieldName: string;
  fieldDescription: string;
  formula: string;
  separator: string;
  dataType: string;
  sourceValues: SourceValue[];

}

const AddFormulaDialogBox: React.FC<DialogBoxProps> = ({ open, onClose, customData, onDataFromC }) => {
  const apiData = useRef<Module[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [addCustumList, setAddCustomList] = useState([...addDataCustomFields]);
  const [dataFieldList, setDataFieldLsit] = useContext(DynamicFieldStore);
  const [isContactField, setIsContactField] = useState(false);

  const [isCustomList, setIsCustomList] = useState(false);
  const [idFormulaField, setIdFormulaField] = useState("");
  const [countFormulaField, setCountFormulaField] = useState(1);
  const [dataCustomEdit, setDataCustomEdit] = useState<any>(customData);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSourceDataLoaded, setIsSourceDataLoaded] = useState(false);
  // const fieldIndex = useRef<any>(customID);
  //console.log(customData);

  const fetchApiData = useCallback(
    debounce(async () => {
      try {
        // const response = await fetch('https://www4.accuick.com/Accuick_API/Jobs/jobs_report.jsp');
        // const jsonData = await response.json();
        // apiData.current = jsonData;

        const response = await trackPromise(
          ApiService.postWithData('admin', 'getJobsReport', {})
        );

        const jsonData = response.data.jobReportDetailsList;
        apiData.current = jsonData;
        console.log(jsonData,"test..")
        // console.log(jsonData.jobReportDetailsList, "test..")

        if (dataCustomEdit.columnType) {
          loadDataTypeChange(dataCustomEdit.columnType);
        } else {
          setIsSourceDataLoaded(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 500),
    [dataCustomEdit]
  );

  useEffect(() => {
    fetchApiData();

    return () => {
      fetchApiData.cancel();
    };
  }, [fetchApiData]);


  useEffect(() => {
    if (isSourceDataLoaded) {
      loadDataTypeChange(dataCustomEdit.columnType);
      console.log("Not Empty type : " + dataCustomEdit.columnType);
      console.log("Not Empty : " + customData.columnName);
    }
  }, [dataCustomEdit.columnType, customData.columnType, customData.columnName]);

  const initialCustomValues = customData.columnName ? {

    fieldName: customData.columnName,
    fieldDescription: customData.fieldDescription,
    formula: customData.formula,
    separator: customData.json[0].separator,
    dataType: customData.columnType,
    sourceValues: customData.json,

  } : {

    fieldName: '',
    fieldDescription: '',
    formula: '',
    separator: '',
    dataType: '',
    sourceValues: [],

  }
  const validationCustomSchema = Yup.object().shape({
    fieldName: Yup.string().required('Field Name is required'),
    fieldDescription: Yup.string(),
    formula: Yup.string().required('Formula is required'),
    separator: Yup.string(),
    dataType: Yup.string().required('DataType is required'),
    sourceValues: Yup.array().of(
      Yup.object().shape({
        "module": Yup.string().required('Module Name is required'),
        "values": Yup.array(),
        "displayName": Yup.string(),
        "columnName": Yup.string(),
        "columnType": Yup.string(),
        "value": Yup.string().required('Column Name is required'),
      })
    ),
  });

  // const formikConfig = {
  //   initialValues: initialCustomValues as FieldData,
  //   validationSchema: Yup.object({
  //     fieldName: Yup.string().required('Field Name is required'),
  //     fieldDescription: Yup.string(),
  //     formula: Yup.string().required('Formula is required'),
  //     separator: Yup.string(),
  //     dataType: Yup.string().required('DataType is required'),
  //   }),
  //   onSubmit: (values: FieldData, { resetForm }: FormikHelpers<FieldData>) => {
  //     //console.log("Form Values:", values);
  //     console.log(values.sourceValues.length);
  //     if (countFormulaField === values.sourceValues.length) {
  //       const temp1 = [...addCustumList];
  //       let CtValue = "true"; let FeValue = "true";
  //       const newState = addCustumList[0].columns.map((obj: any) => {
  //         if (obj.fieldName === values.fieldName) {
  //           CtValue = "false";
  //         }
  //         return obj;
  //       });

  //       if (CtValue === "true") {

  //         const filedval = values.sourceValues.map((module: any) => {
  //           console.log(module);
  //           if (module.module !== "" && module.columnName !== "") {
  //             FeValue = "true";
  //             return {
  //               ...module,
  //               moduleName: module.module, fieldName: module.columnName, dataType: module.columnType, separator: values.separator,
  //             }
  //           } else {
  //             FeValue = "false";
  //           }
  //         });

  //         const newItem1 = {

  //           columnName: values.fieldName.replaceAll(' ', '_'), displayName: values.fieldName, moduleName: 'Custom Fields',
  //           fieldDescription: values.fieldDescription,
  //           formula: values.formula, separator: values.separator, columnType: values.dataType,
  //           json: filedval
  //         };
  //         if (FeValue === "true") {
  //           temp1[0].columns.push(newItem1);
  //         }
  //         else {
  //           showToaster("Formula is required", 'error');
  //         }

  //       }

  //       setTimeout(() => {
  //         setAddCustomList(temp1);
  //       }, 200);

  //       if (FeValue === "true") {
  //         resetForm();
  //         onClose();
  //         setIsCustomList(false);
  //         setIdFormulaField("");
  //       }
  //       // console.log("Latest : ");
  //       // console.log(addCustumList);
  //     } else {
  //       showToaster("Formula is required", 'error');
  //     }
  //   },
  //   validateOnMount: true
  // };


  const addCustomFormik = useFormik({
    initialValues: initialCustomValues,
    validationSchema: validationCustomSchema,
    onSubmit: () => {
      setIsFormSubmitted(true);
      //  console.log(addCustomFormik.values);
    },
    validateOnMount: true
  });

  const updateCustomForm = () => {
    setIsFormSubmitted(true);
    //   console.log("New : " + addCustomFormik.values);
    //  console.log("Old : " +customData.columnName);
    if (addCustomFormik.isValid) {

      const tempSourceValue = addCustomFormik.values.sourceValues.map((svalue:
        {
          module: string;
          values: string[];
          displayName: string;
          columnName: string;
          columnType: string;
          value: string;
        }) => ({
          module: svalue.module,
          values: svalue.values,
          displayName: svalue.displayName,
          columnName: svalue.columnName,
          columnType: svalue.columnType,
          value: svalue.value,
        }));
      addCustomFormik.values.sourceValues = tempSourceValue;

      if (countFormulaField === addCustomFormik.values.sourceValues.length) {
        const temp1 = [...addCustumList];
        let CtValue = "true"; let FeValue = "true";

        const newState = addCustumList[0].columns.map((obj: any) => {
          if ((obj.columnName === addCustomFormik.values.fieldName.replaceAll(' ', '_')) && (obj.columnName !== customData.columnName.replaceAll(' ', '_'))) {
            CtValue = "false";
          }
          return obj;
        });


        const filedval = addCustomFormik.values.sourceValues.map((module: any) => {
          //  console.log(module);
          if (module.module !== "" && module.columnName !== "") {
            FeValue = "true";
            return {
              ...module,
              moduleName: module.module, fieldName: module.columnName, dataType: module.columnType, separator: addCustomFormik.values.separator,
            }
          } else {
            FeValue = "false";
          }
        });
        if (CtValue === "true") {

          if (FeValue === "true") {
            let tempDupArray = addCustumList[0].columns;
            for (let tda = 0; tda < tempDupArray.length; tda++) {
              const newItem1 = {
                columnName: addCustomFormik.values.fieldName.replaceAll(' ', '_'), displayName: addCustomFormik.values.fieldName, moduleName: 'Custom Fields',
                fieldDescription: addCustomFormik.values.fieldDescription,
                formula: addCustomFormik.values.formula, separator: addCustomFormik.values.separator, columnType: addCustomFormik.values.dataType,
                json: filedval
              };

              let colName = customData.columnName.replaceAll(' ', '_');
              if (tempDupArray[tda].columnName === colName) {
                //   tempHeaders.push(tempDupArray[tda]);
                // console.log(newItem1);
                temp1[0].columns[tda] = newItem1;
              }
            }
          }
          else {
            showToaster("Formula is required", 'error');
          }

        } else {
          showToaster("This Filed Name Already Exists", 'warning');
        }
        setTimeout(() => {
          setAddCustomList(temp1);
          console.log(temp1);
        }, 200);

        if ((CtValue === "true") && (FeValue === "true")) {
          //  resetForm();
          onClose();
          setIsCustomList(false);
          setIdFormulaField("");
        }
        // console.log("Latest : ");
        // console.log(addCustumList);
      }
    } else {
      showToaster('Please fill all fields.', 'error');
    }
  }


  const saveCustomForm = () => {
    setIsFormSubmitted(true);
    saveAuditLog(4209);

    if (addCustomFormik.isValid) {
      onDataFromC(addCustomFormik.values)

      const tempSourceValue = addCustomFormik.values.sourceValues.map((svalue:
        {
          module: string;
          values: string[];
          displayName: string;
          columnName: string;
          columnType: string;
          value: string;
        }) => ({
          module: svalue.module,
          values: svalue.values,
          displayName: svalue.displayName,
          columnName: svalue.columnName,
          columnType: svalue.columnType,
          value: svalue.value,
        }));
      addCustomFormik.values.sourceValues = tempSourceValue;

      if (countFormulaField === addCustomFormik.values.sourceValues.length) {
        const temp1 = [...addCustumList];
        let CtValue = "true"; let FeValue = "true";
        const newState = addCustumList[0].columns.map((obj: any) => {
          if (obj.columnName === addCustomFormik.values.fieldName.replaceAll(' ', '_')) {
            CtValue = "false";
          }
          return obj;
        });

        if (CtValue === "true") {

          const filedval = addCustomFormik.values.sourceValues.map((module: any) => {
            // console.log(module);
            if (module.module !== "" && module.columnName !== "") {
              FeValue = "true";
              return {
                ...module,
                moduleName: module.module, fieldName: module.columnName, dataType: module.columnType, separator: addCustomFormik.values.separator,
              }
            } else {
              FeValue = "false";
            }
          });

          const newItem1 = {

            columnName: addCustomFormik.values.fieldName.replaceAll(' ', '_'), displayName: addCustomFormik.values.fieldName, moduleName: 'Custom Fields',
            fieldDescription: addCustomFormik.values.fieldDescription,
            formula: addCustomFormik.values.formula, separator: addCustomFormik.values.separator, columnType: addCustomFormik.values.dataType,
            json: filedval
          };

          if (FeValue === "true") {
            temp1[0].columns.push(newItem1);
          }
          else {
            showToaster("Formula is required", 'error');
          }

        } else {
          showToaster("This Filed Name Already Exists", 'warning');
        }

        setTimeout(() => {
          setAddCustomList(temp1);
          //  console.log(temp1);
        }, 200);

        if ((CtValue === "true") && (FeValue === "true")) {
          //  resetForm();
          onClose();
          setIsCustomList(false);
          setIdFormulaField("");
          setIsSourceDataLoaded(false);
        }
        // console.log("Latest : ");
        // console.log(addCustumList);
      } else {
        showToaster("Formula is required", 'error');
      }
    } else {
      showToaster('Please fill all fields.', 'error');
    }
  }


  // console.log(addCustumList);

  const loadDataTypeChange = (dataType: any) => {

    addCustomFormik.setFieldValue('dataType', dataType);
    const filtered = apiData.current.map(module => ({
      ...module,
      columns: module.columns.filter(column => column.columnType === dataType)
    })).filter(module => module.columns.length > 0);
    setFilteredModules(filtered);
    setIsSourceDataLoaded(true);

    let newFormula = dataCustomEdit.formula;
    (newFormula && newFormula === "concat") ? setIsContactField(true) : setIsContactField(false);

    if (newFormula && newFormula === "concat") {
      setCountFormulaField(2);
    } else if (newFormula && newFormula === "datediff") {
      setCountFormulaField(2);
    } else { setCountFormulaField(1); }

    // fieldIndex.current = customID;

  };

  const handleDataTypeChange = (setFieldValue: any, event: SelectChangeEvent) => {
    const dataType = event.target.value;
    addCustomFormik.setFieldValue('dataType', dataType);
    const filtered = apiData.current.map(module => ({
      ...module,
      columns: module.columns.filter(column => column.columnType === dataType)
    })).filter(module => module.columns.length > 0);
    setFilteredModules(filtered);
    addCustomFormik.setFieldValue('sourceValues', [{ module: '', displayName: '', columnName: '', columnType: '', value: '', values: [] }]);
  };

  const handleFormulaChange = (formula: any, values: any, event: SelectChangeEvent) => {
    const newFormula = event.target.value;
    addCustomFormik.setFieldValue('formula', newFormula);
    if (newFormula && newFormula !== values.formula) {
      addCustomFormik.setFieldValue('sourceValues', [{ module: '', displayName: '', columnName: '', columnType: '', value: '', values: [] }]);
    }
    (newFormula && newFormula === "concat") ? setIsContactField(true) : setIsContactField(false);

    if (newFormula && newFormula === "concat") {
      setCountFormulaField(2);
    } else if (newFormula && newFormula === "datediff") {
      setCountFormulaField(2);
    } else { setCountFormulaField(1); }
  };

  const DisplayCustomFieldList = () => {
    setIsCustomList(true);
    setIdFormulaField("");
    // setDataCustomEdit([]);
  };

  const handleClose = () => {
    onClose();
  };


  // const handleEditCustomField = (addstring: any) => {
  //   setIdFormulaField(addstring);
  //   console.log(addCustumList[0].columns);
  //   console.log(addstring);
  //   let index = 0;
  //   const newState = addCustumList[0].columns.map((obj: any) => {
  //     if (obj.columnName === addstring) {
  //       console.log(obj.columnName);

  //       setDataCustomEdit({ ...obj });
  //     }
  //     return
  //   });

  //   console.log(dataCustomEdit);
  //   setIsCustomList(false);
  // }

  const handleModuleChange = (setFieldValue: any, index: number, event: SelectChangeEvent) => {
    const moduleName = event.target.value;
    const moduleData = filteredModules.find(module => module.ModuleName === moduleName);
    if (moduleData) {
      const newValues = moduleData.columns.map((column: any) => {
        return { ...column, displayName: column.displayName, columnName: column.columnName };
      });
      const columnTypes = moduleData.columns[0].columnType;
      const displayname = moduleData.columns[0].displayName;
      const columnName = moduleData.columns[0].columnName;
      //const separator = moduleData.columns[0].separator;
      addCustomFormik.setFieldValue(`sourceValues[${index}].module`, moduleName);
      addCustomFormik.setFieldValue(`sourceValues[${index}].values`, newValues);
      addCustomFormik.setFieldValue(`sourceValues[${index}].displayName`, displayname);
      addCustomFormik.setFieldValue(`sourceValues[${index}].columnName`, columnName);
      addCustomFormik.setFieldValue(`sourceValues[${index}].columnType`, columnTypes);

    }
  };

  const handleValueChange = (setFieldValue: any, index: number, event: SelectChangeEvent) => {
    const svalue = event.target.value;
    addCustomFormik.setFieldValue(`sourceValues[${index}].value`, svalue);
  };

  const handleAddSource = () => {
    let tempSourceFormik = [
      ...addCustomFormik.values.sourceValues
    ]
    tempSourceFormik.push({ module: '', displayName: '', columnName: '', columnType: '', value: '', values: [] })
    addCustomFormik.setFieldValue('sourceValues', tempSourceFormik);
  };

  const handleDeleteSource = (index: any) => {
    let tempSourceFormik = [
      ...addCustomFormik.values.sourceValues
    ];
    tempSourceFormik.splice(index, 1);
    addCustomFormik.setFieldValue('sourceValues', tempSourceFormik);
  };

  const saveAuditLog = (id: number) => {
    ApiService.saveAuditLog(id);
}

  return (
    // <Formik  {...formikConfig}>
    //   {({ values, setFieldValue, handleSubmit }) => (
    //     <Form>

    (<Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Calculated Field

        {/* <Box display="flex" justifyContent="flex-end" alignItems="center">
                {(isCustomList) && <Button type="button" variant="outlined" color="secondary" onClick={() => setIsCustomList(false)}>Back</Button>
                }  <Button type="button" variant="outlined" color="secondary" onClick={DisplayCustomFieldList}>List</Button>
              </Box> */}

      </DialogTitle>
      <DialogContent>
        {
          isSourceDataLoaded ?
            <form
              onSubmit={addCustomFormik.handleSubmit}
            >
              {(!isCustomList) && <Grid container spacing={2}>
                <Grid size={6} md={3} sx={{ marginTop: "15px" }} >
                  <Stack direction={"column"} spacing={1}>
                    <Stack>
                      <InputLabel>Field Name*</InputLabel>
                      <TextField fullWidth
                        id="fieldName"
                        name="fieldName"
                        variant="outlined"
                        type="text"
                        size="small"
                        value={addCustomFormik.values.fieldName}
                        onChange={addCustomFormik.handleChange}
                      />
                    </Stack>

                    <Stack>
                      <InputLabel>Field Description</InputLabel>
                      <TextField fullWidth
                        id="fieldDescription"
                        name="fieldDescription"
                        variant="outlined"
                        type="text"
                        size="small"
                        value={addCustomFormik.values.fieldDescription}
                        onChange={addCustomFormik.handleChange}
                      />

                    </Stack>

                    <Stack>
                      <InputLabel>Formula*</InputLabel>

                      <TextField
                        fullWidth
                        id="formula"
                        name="formula"
                        size="small"
                        select
                        value={addCustomFormik.values.formula}
                        //  onChange={addCustomFormik.handleChange}
                        onChange={(event: any) => handleFormulaChange('formula', addCustomFormik.values, event)}
                      >
                        <MenuItem value="avg">Average</MenuItem>
                        <MenuItem value="sum">Sum</MenuItem>
                        <MenuItem value="count">Count</MenuItem>
                        <MenuItem value="concat">Concat</MenuItem>
                        <MenuItem value="datediff">Date Diff</MenuItem>
                        <MenuItem value="min">Min</MenuItem>
                        <MenuItem value="max">Max</MenuItem>

                      </TextField>
                    </Stack>
                    <Stack className={isContactField ? '' : 'd-none'}>
                      <InputLabel>Sepeartor</InputLabel>

                      <TextField
                        fullWidth
                        id="separator"
                        name="separator"
                        size="small"
                        select
                        value={addCustomFormik.values.separator}
                        onChange={addCustomFormik.handleChange}
                      >

                        <MenuItem value="   " selected>Space</MenuItem>
                        <MenuItem value=" / ">/ (Forward slash)</MenuItem>
                        <MenuItem value=" , ">, (Comma)</MenuItem>
                        <MenuItem value=" _ ">_ (Underscore)</MenuItem>
                        <MenuItem value=" - ">- (Hyphen, dash)</MenuItem>
                        <MenuItem value=" | ">| (Vertical bar, pipe) </MenuItem>
                      </TextField>
                    </Stack>
                    <Stack>
                      <InputLabel>Datatype*</InputLabel>
                      <TextField
                        fullWidth
                        id="dataType"
                        name="dataType"
                        size="small"
                        select
                        value={addCustomFormik.values.dataType}
                        //  onChange={addCustomFormik.handleChange}
                        onChange={(event: any) => handleDataTypeChange('dataType', event)}
                      >

                        <MenuItem value="Number">Number</MenuItem>
                        <MenuItem value="String">String</MenuItem>
                        <MenuItem value="DateTime">Date & Time</MenuItem>
                        <MenuItem value="Date">Date</MenuItem>
                      </TextField>
                    </Stack>

                  </Stack>


                </Grid>
                <Grid md={1}>
                  <Divider orientation="vertical" />
                </Grid>

                <Grid size={6} md={8} >
                  <Stack direction="row" spacing={2} marginTop={2} className='backGrayColor'>
                    <Grid size={5}  ><strong>Source</strong></Grid> <Grid size={5}  ><strong>Value</strong></Grid>
                  </Stack>
                  {addCustomFormik.values.sourceValues.map((sourceValue: any, index: any) => (
                    <Stack key={index} direction="row" spacing={2} marginTop={2}>
                      <TextField
                        fullWidth

                        id={`module${index}`}
                        name={`module${index}`}
                        size="small"
                        select
                        sx={{ width: "350px" }}
                        value={sourceValue.module}
                        //  onChange={addCustomFormik.handleChange}
                        onChange={(event: any) => handleModuleChange('module', index, event)}
                      >

                        {filteredModules.map((module) => (
                          <MenuItem key={module.ModuleName} value={module.ModuleName}>
                            {module.ModuleName}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        fullWidth
                        id={`value${index}`}
                        name={`value${index}`}
                        size="small"
                        select
                        sx={{ width: "350px" }}
                        value={sourceValue.value}
                        required
                        //   onChange={addCustomFormik.handleChange}
                        onChange={(event: any) => handleValueChange('value', index, event)}
                      >

                        {sourceValue.values.map((value: any, valueIndex: any) => (
                          <MenuItem key={valueIndex} value={value.columnName}>
                            {value.displayName}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Grid size={12} md={3}>
                        {index !== 0 && (<IconButton onClick={() => handleDeleteSource(index)}>
                          <DeleteIcon />
                        </IconButton>)}
                        {(index < countFormulaField - 1) && (index === addCustomFormik.values.sourceValues.length - 1) && (
                          <IconButton
                            onClick={handleAddSource}>
                            {/* onClick={() => push({ module: '', displayName: '', columnName: '', columnType: '', values: [] })}> */}
                            <AddBoxIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Stack>
                  ))}

                </Grid>


              </Grid>
              }

              {/* 
              {(isCustomList) && <div className='customList-container'>
                <Container maxWidth="lg">
                  {addCustumList && <Typography align="left" className='headerlist-card' mb={2}>Custom Fields List</Typography>}
                  <Grid container spacing={3} className='headerlist-card'>
                    <Grid size={3}>Filed Name</Grid>
                    <Grid size={3}>Display Name</Grid>
                    <Grid size={3}>Data Type</Grid>
                    <Grid size={2}>Formula</Grid>
                    <Grid xs></Grid>
                  </Grid>
                  {addCustumList[0].columns.map((job: any, i: number) => {
                    if (job.columnName !== "") {
                      return (
                        <Grid container spacing={2} key={i} className='list-card'>
                          <Grid size={3}>{job.columnName}</Grid>
                          <Grid size={3}>{job.displayName}</Grid>
                          <Grid size={3}>{job.columnType}</Grid>
                          <Grid size={2}>{job.formula}</Grid>
                          <Grid xs>
                            {<EditIcon onClick={() => handleEditCustomField(job.columnName)} />}
                          </Grid>
                        </Grid>
                      )
                    }
                  })}

                </Container>
              </div>} */}
            </form>
            :
            null
        }
      </DialogContent>
      <DialogActions>
        <Button type="button" variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
        {(!customData.columnName) && (!isCustomList) && <Button type="submit" variant="contained" color="primary" onClick={saveCustomForm}> Create</Button>}

        {(customData.columnName) && <Button type="submit" variant="contained" color="primary" onClick={updateCustomForm}> Update</Button>
        }
      </DialogActions>
    </Dialog>)
  );

};

export default AddFormulaDialogBox;
