
import { FC, useContext } from "react";
import { useState } from '../../../../../../shared/modules/React';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import './DetailsReport.scss';

import {TextField, FormControlLabel,FormControl} from "../../../../../../shared/modules/MaterialImports/FormInputs";



import {Stack} from '../../../../../../shared/modules/MaterialImports/Stack';
import { Grid } from '../../../../../../shared/modules/MaterialImports/Grid';
import {Radio, RadioGroup} from '../../../../../../shared/modules/MaterialImports/FormElements';


import { DynamicReportStore } from '../../CreateReport';

import { addDynamicGroup as addGroup } from '../AddDynamicReport';


interface IColumnDropable {
    id: string;
    // items: addGroup["details"] | any;
    // onCallback: (updatedObjects: addGroup["details"][]) => void;
}

const DetailsReport: FC<IColumnDropable> = ({ id }) => {
    // const { setNodeRef } = useDroppable({
    //     id
    // });

    const [addDynamicList, setAddDynamicList] = useContext(DynamicReportStore);
    const [data, setData] = useState<addGroup["details"]>(addDynamicList[0].details);

    // const [dynamicDetails, setDynamicDetails] = useState<any>([]);
    // const [updatedObjects, setUpdatedObjects] = useState<addGroup["details"]>();
    const [nameDetails, setNameDetails] = useState();
    const [jsonDetails, setJsonDetails] = useState();
    const [descriptionDetails, setDescriptionDetails] = useState();
    //console.log(data.name);
    //   //  console.log(items);
    //     useEffect(() => {
    //         setTimeout(() => {
    //          //   setDynamicDetails([...items]);
    //        //     console.log(dynamicDetails); 

    //        updateDatafun();

    //         }, 200);

    //     }, [items]);

    //  const updateDatafun =()=>{
    //     dynamicDetails.map((row: any) => {
    //         console.log(row.name);
    //         setNameDetails(row.name);
    //         setJsonDetails(row.outputformat);
    //         setDescriptionDetails(row.description);
    //     });
    //}

    const handleJSONUpdate = (e: any, id: any, field: keyof addGroup["details"]) => {
        // Update the data when the input changes 
        const temp1 = [...addDynamicList];
        const updatedData = addDynamicList[0].details.map((row: any) => {
            return { ...row, [field]: e.target.value };
        });

        temp1[0].details = updatedData;
        setAddDynamicList(temp1);
        console.log(updatedData);
        console.log(temp1);
    };

    return (
        <div id='DetailsReport' className="px-4 py-2">
            {/* <Typography sx={{ textAlign: 'left', margin: "1px", fontWeight: "Bold" }} > Details </Typography> */}
            {/* <Divider /> */}
            <Stack className="customCard px-4 py-2" style={{ boxShadow: '0px 0px 1px 1px rgba(0, 0, 0, 0.1)' }} >
                <div className='detailReport-wrap'>
                    <div className='block-inner'>
                        <Grid container spacing={1} >
                            <Grid size={6} className='mt-2' >
                                <Typography sx={{ textAlign: 'left', margin: "3px 5px" }} className='input-label' > Name <span style={{ color: 'red' }}>*</span></Typography>
                                <TextField fullWidth
                                    id="poolName"
                                    name="poolName"
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    value={addDynamicList[0].details[0].name}
                                    onChange={(e) => handleJSONUpdate(e, addDynamicList[0].details[0].name, 'name')}
                                />

                            </Grid>
                        </Grid>
                        {/* <Grid container spacing={1} >
                                        <Grid size={6} className='mt-1'>
                                        <Typography sx={{ textAlign: 'left', margin: "3px 5px"   }}  className='input-label' > Folder <span style={{ color: 'red' }}>*</span></Typography>
                                          
                                              <TextField
                                                    fullWidth
                                                    id="jobCategory"
                                                    name="jobCategory"
                                                    size="small"
                                                    variant="outlined"
                                                    select
                                                    
                                                  //  value={addPoolFormik.values.jobCategory}
                                                 //   onChange={addPoolFormik.handleChange}
                                                    
                                                >
                                                    <MenuItem value=""></MenuItem>
                                                    <MenuItem value="490">Folder 1</MenuItem>
                                                    <MenuItem value="463">Folder 2</MenuItem>
                                                    </TextField>
                                                    </Grid>
                                    </Grid>  */}
                        <Grid container spacing={1} >
                            <Grid size={12} className='mt-1'>
                                <Typography sx={{ textAlign: 'left', margin: "3px 5px" }} className='input-label' > Output Format  <span style={{ color: 'red' }}>*</span></Typography>

                                <FormControl sx={{ textAlign: 'left', margin: "3px 5px", textAlignLast: "left" }}>

                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        className='inputLabel'
                                        sx={{ textAlign: 'left', margin: "3px 5px", textAlignLast: "left" }}

                                        value={addDynamicList[0].details[0].outputformat}
                                        onChange={(e) => handleJSONUpdate(e, addDynamicList[0].details[0].outputformat, 'outputformat')}
                                    // {(addDynamicList[0].details[0].outputformat === "JSON") ? checked : "" }
                                    >
                                        <FormControlLabel value="JSON" control={<Radio />} label="JSON" />
                                        <FormControlLabel value="View Data on Screen" control={<Radio />} label="View Data on Screen" />

                                    </RadioGroup>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Grid container spacing={1} >
                            <Grid size={6} className='mt-1'>
                                <Typography sx={{ textAlign: 'left', margin: "3px 5px" }} className='input-label' > Description (optional)</Typography>

                                <TextField fullWidth
                                    id="notes"
                                    name="notes"
                                    size="small"
                                    variant="outlined"
                                    type="text"
                                    multiline
                                    rows={2}
                                    value={addDynamicList[0].details[0].description}
                                    onChange={(e) => handleJSONUpdate(e, addDynamicList[0].details[0].description, 'description')}


                                />
                            </Grid>
                            {/* {items.map((filter:any) => (
                                <div>{filter.name}</div>
       // {filter.name} 
      ))} */}
                        </Grid>
                    </div>
                </div>
            </Stack>
        </div>
    )
}

export default DetailsReport