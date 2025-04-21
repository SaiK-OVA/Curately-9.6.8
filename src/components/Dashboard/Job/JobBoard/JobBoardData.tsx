import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField'; 
import FormControl from '@mui/material/FormControl';
import React, { useMemo, useState, Fragment, useContext, useRef, useEffect, FC } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import Box from "@mui/material/Box";
// import MenuItem from '@mui/material/MenuItem';
import { Card, CardContent, duration, InputLabel, OutlinedInput, Stack } from '@mui/material';
import * as Yup from "yup";
import ApiService from "../../../../shared/api/api";

import { useFormik } from "formik";
import { GetFormattedJobBoardData } from '../../Settings/JobBoards/JobBoards';

interface IDoubleSelectProps {
    filterData: any;
    bid: number,
    index: number,
    handleChange: (boardId: number, filter: any, fieldName: string, newValue: any) => void
}

const DoubleSelect: FC<IDoubleSelectProps> = ({ filterData, bid, index, handleChange }) => {
    const filteredParents = useMemo(() => {
        return filterData?.data?.option.filter((each: any) => !each?.parent);
    }, [filterData]);

    const filteredChilds = useMemo(() => {
        if (filterData?.value?.parent) {
            return filterData?.data?.option?.filter((each: any) => each?.parent?.toString() === filterData?.value?.parent?.toString())
        } else return []
    }, [filterData?.value?.parent]);

    return (
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <TextField
                value={filterData.value?.parent || ""}
                onChange={(event) => handleChange(bid, filterData, filterData.name, { parent: event.target.value, child: "" })}
                select
                name={"parent_" + filterData.name}
                fullWidth
                size="small"
                label={
                    <>
                        {filterData.description + " Parent"}
                        {filterData.required ? <span style={{ color: 'red' }}>*</span> : null}
                    </>
                }
                type={filterData.type}
            >
                {!!filteredParents?.length ? filteredParents.map((each: any, index: number) => (
                    typeof each === "string" ? <MenuItem value={""} key={index}>{each}</MenuItem> :
                        <MenuItem value={each.id} key={index}>{each.content}</MenuItem>
                )) : <MenuItem>No items found</MenuItem>}
            </TextField>

            {filterData?.multi ? <FormControl fullWidth size='small'>
                <InputLabel id={"child_" + filterData.name}><>
                    {filterData.description}
                    {filterData.required ? <span style={{ color: 'red' }}>*</span> : null}
                </>
                </InputLabel>
                <Select
                    labelId={"child_" + filterData.name}
                    size='small'
                    name={"child_" + filterData.name}
                    fullWidth
                    multiple
                    value={(filterData?.value?.child && Array.isArray(filterData?.value?.child)) ? (filterData.value.child) : (filterData?.value?.child && typeof filterData.value.child === "string") ? filterData.value.child.split(",") : []}
                    onChange={(event) => {
                        const value = event.target.value;
                        handleChange(bid, filterData, filterData.name, { parent: filterData?.value?.parent || "", child: value.join(",") })
                    }}
                    input={<OutlinedInput label={
                        <>
                            {filterData.description}
                            {filterData.required ? <span style={{ color: 'red' }}>*</span> : null}
                        </>
                    } />}
                    disabled={!filteredChilds?.length}
                >
                    {!!filteredChilds?.length ? filteredChilds.map((each: any, index: number) => (
                        typeof each === "string" ? <MenuItem value={""} key={index}>{each}</MenuItem> :
                            <MenuItem value={each.id} key={index}>{each.content}</MenuItem>
                    )) : <MenuItem>No items found</MenuItem>}
                </Select>
            </FormControl> : <TextField
                value={filterData.value?.child || ""}
                onChange={(event) => handleChange(bid, filterData, filterData.name, { parent: filterData?.value?.parent || "", child: event.target.value })}
                select
                name={"child_" + filterData.name}
                fullWidth
                size="small"
                label={
                    <>
                        {filterData.description}
                        {filterData.required ? <span style={{ color: 'red' }}>*</span> : null}
                    </>
                }
                type={filterData.type}
                disabled={!filteredChilds?.length}
            >
                {!!filteredChilds?.length ? filteredChilds.map((each: any, index: number) => (
                    typeof each === "string" ? <MenuItem value={""} key={index}>{each}</MenuItem> :
                        <MenuItem value={each.id} key={index}>{each.content}</MenuItem>
                )) : <MenuItem>No items found</MenuItem>}
            </TextField>}

        </Stack>
    )
}


const JobBoardData = (
    { boardId, boardData, sendData, jobBoardsExistingData }: {
        boardId: any;
        boardData: any;
        sendData: any;
        jobBoardsExistingData?: any;
    }
) => {
    const [listJobBoards, setListJobBoards] = useState<any>([]);
    const [boardIdData, setBoardIdData] = useState<any>({
        "boardId": boardId,
        "extrafield": [{
            "name": "",
            "value": "",
            "description": "",
            "required": "",
        }],
        "duration": {
            "name": "",
            "value": "",
        }
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialDataBoardDetails = {
        "boardId": "",
        "boardDurationDays": "",
        "extrafield": [{
            "name": "",
            "value": "",
            "required": "",
        }],
        "duration": {
            "name": "",
            "value": "",
        }
    }
    const dataBoardSchema = Yup.object().shape({
        boardId: Yup.string(),
        boardDurationDays: Yup.string(),
        extrafield: Yup.array().of(
            Yup.object().shape({
                name: Yup.string(),
                value: Yup.string(),
                required: Yup.string(),
            })
        ),
        duration: Yup.object().shape({
            name: Yup.string(),
            value: Yup.string(),
        })

    });


    const DataJobBoardFormik = useFormik({
        initialValues: initialDataBoardDetails,
        validationSchema: dataBoardSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
            //  console.log(SubscribeJobBoardFormik.values);
        },
        validateOnMount: true
    });


    useEffect(() => {
        getAllJobBoardList(boardId);
        // setBoardIdData({
        //     ...boardIdData,
        //     boardId: boardId, 
        // });
    }, []);

    const getValidatedFieldType = (fieldData: any, showDefaultType?: boolean) => {
        const defaultType = showDefaultType ? fieldData?.type : undefined
        if (fieldData?.type === "select") {
            const isOptionContainsParent = GetFormattedJobBoardData(fieldData?.data?.option).some((each) => each?.parent);
            return fieldData?.multi ? (isOptionContainsParent ? "doubleSelect" : "multi") : (isOptionContainsParent ? "doubleSelect" : defaultType)
        }
        return defaultType
    }

    const getAllJobBoardList = (boardID: any) => {

        let subData = {
            "boardId": (boardID ? boardID : "")
        }

        ApiService.postWithData('admin', `getBoardSpecificFields`, subData)
            .then((response) => {
                //   console.log("Board" + boardID);
                //   console.log(response.data.idibu.boards.board);
                let tempData = response.data.idibu.boards.board;
                tempData.extrafields.extrafield = GetFormattedJobBoardData(tempData?.extrafields?.extrafield || [])
                //    console.log(tempData?.id);
                //    console.log(tempData?.name);

                // DataJobBoardFormik.setFieldValue(`boardId`, tempData?.id, true);
                //subscribeJobBoardData &&  subscribeJobBoardData[0]?.field?.map((setting: any, si: number) => (
                let tempApplicantsList = [];
                for (let ap = 0; ap < tempData?.extrafields?.extrafield?.length; ap++) {
                    let dataToPush = {
                        name: tempData?.extrafields?.extrafield[ap].name,
                        description: tempData?.extrafields?.extrafield[ap].description,
                        required: tempData?.extrafields?.extrafield[ap].required ? tempData?.extrafields?.extrafield[ap].required : false,
                        type: getValidatedFieldType(tempData?.extrafields?.extrafield[ap]),
                        value: ""
                    }
                    tempData.extrafields.extrafield[ap].type = getValidatedFieldType(tempData.extrafields.extrafield[ap], true);

                    if (jobBoardsExistingData?.id) {
                        let valueToPass = jobBoardsExistingData?.values?.value?.find((each: any) => each?.name === tempData?.extrafields?.extrafield[ap]?.name)?.content || "";
                        let modifiedValue: any = "";
                        if (["doubleSelect"].includes(tempData?.extrafields?.extrafield[ap]?.type)) {
                            let valuesArr = valueToPass?.split(",");
                            modifiedValue = { parent: (valueToPass && valuesArr) ? valuesArr.splice(0, 1)[0] : "", child: (valueToPass && valuesArr) ? valuesArr.join(",") : "" }
                        } else {
                            modifiedValue = tempData.extrafields.extrafield[ap]?.multi ? valueToPass.toString().replace(/\s+(?=\d|,)/g, '') : valueToPass;
                        }

                        dataToPush = { ...dataToPush, value: tempData.extrafields.extrafield[ap]?.multi ? valueToPass.toString().replace(/\s+(?=\d|,)/g, '') : valueToPass }
                        tempData.extrafields.extrafield[ap].value = modifiedValue;
                    } else {
                        dataToPush = { ...dataToPush, value: "" };
                        tempData.extrafields.extrafield[ap].value = ["doubleSelect"].includes(tempData?.extrafields?.extrafield[ap]?.type) ? { parent: "", child: "" } : "";
                    }
                    tempApplicantsList.push({ ...dataToPush })
                }
                setListJobBoards(tempData);
                const durationExistingValue = (Array.isArray(tempData?.durations?.duration) && !!tempData?.durations?.duration?.length) ? (tempData?.durations?.duration[0]?.value || "") : (tempData?.durations?.duration?.value || "")

                setBoardIdData({
                    ...boardIdData,
                    boardId: tempData?.id,
                    duration: { name: "duration", value: jobBoardsExistingData?.id ? durationExistingValue : "" },
                    extrafield: tempApplicantsList,
                });
                sendData({
                    ...boardIdData,
                    boardId: tempData?.id,
                    duration: { name: "duration", value: jobBoardsExistingData?.id ? durationExistingValue : "" },
                    extrafield: tempApplicantsList,
                })

                //   console.log("DataJobBoardFormik.values");
                // console.log(tempApplicantsList);
                // console.log(boardIdData);
            })
    }

    const handleTextChange = (boardId: number, filter: any, fieldName: string, newValue: string | any) => {
        // console.log(" === " + boardId + " -- " + fieldName + " -- " + newValue);

        const tempIndex = boardIdData?.extrafield?.findIndex((item: { name: string }) => item.name === fieldName);
        if (tempIndex !== -1) {

            let newObj = boardIdData?.extrafield.map((item: any, index: number) => {
                if (item.name === fieldName) {
                    return { ...item, value: filter?.type === "doubleSelect" ? `${newValue?.parent || ""},${newValue?.child || ""}` : newValue };
                }
                return {
                    ...item
                };
            });

            setBoardIdData({
                ...boardIdData,
                extrafield: newObj
            });
            sendData({
                ...boardIdData,
                extrafield: newObj
            });

            let tempListJobBoards = listJobBoards;
            tempListJobBoards.extrafields.extrafield = tempListJobBoards.extrafields.extrafield.map((each: any) => ({
                ...each,
                value: fieldName === each.name ? newValue : (each.value || "")
            }))
            setListJobBoards(tempListJobBoards);
        }
        // const tempIndex = boardIdData?.findIndex((item: { boardId: any }) => Number(item.boardId) === Number(boardId));
        // if (tempIndex !== -1) {
        //    // tempSubMasterModule[tempIndex].checked = checked;
        // }

        //     console.log("tempIndex" + tempIndex);
        //     // setFilterValues(prev => ({ ...prev, [id]: newValue }));
        //     const boardIndex = addBoardDynamicList[0].boardDetails[tempIndex]?.extraFileds.findIndex((item: { name: string }) => (item.name) === (fieldName));

        //     console.log("boardIndex" + boardIndex);

        // addBoardDynamicList[0].boardDetails[tempIndex]?.extraFileds[boardIndex].push( [...addBoardDynamicList[0].boardDetails[tempIndex]?.extraFileds[boardIndex], {name:fieldName, value:newValue, description:addBoardDynamicList[0].boardDetails[tempIndex]?.extraFileds[boardIndex].description, required:addBoardDynamicList[0].boardDetails[tempIndex]?.extraFileds[boardIndex].required}]); 

        //     // setFilters(filters.map(filter => filter.id === id ? { ...filter, value: newValue } : filter));
        //     // setAddBoardDynamicList(addBoardDynamicList[0].boardDetails[tempIndex]?.extraFileds?.map((filter :any) => filter.name === fieldName ? { ...filter, value: newValue } : filter));
        //        console.log("addBoardDynamicList");
        //          console.log(addBoardDynamicList[0]);
        //    // const temp1 = [...addBoardDynamicList];
        // addBoardDynamicList[0].boardDetails?.map((row: any, idx: number) => {
        //     if (row.id === boardId) {
        // addBoardDynamicList[0].boardDetails[tempIndex]?.extraFileds?.map((rowextra: any, inx: number) => {
        //         if (rowextra.name === fieldName) {
        //             return {...rowextra, 'value': newValue }
        //         }
        //     });
        //     };
        //     return row;
        // });

        //    setAddBoardDynamicList(...addBoardDynamicList);

        // const temp1 = [...addBoardDynamicList];
        // const updatedData = addBoardDynamicList?.boardDetails?.map((row: any, index:number) => {
        //     console.log(boardId);
        //     console.log(row.name);
        //     // if (row.id === boardId) {
        //     //     console.log(boardId);
        //     //     if (row.extraFileds[index].name === fieldName) {
        //     //         console.log(row.extraFileds[index].name);

        //     //         return {
        //     //             ...row.extraFileds[index],
        //     //             value: newValue,
        //     //         }
        //     //     }
        //     // }

        //     // return row;
        // });
        // temp1[0].boardDetails = updatedData;
        // setAddBoardDynamicList(temp1);

        console.log(boardIdData);

        //    console.log(addBoardDynamicList);
    };

    const renderFilter = (filter: any, bid: number, index: number) => {
        //   console.log(bid + " -- "+ filter.name);
        switch (filter.type) {

            case 'select':
                return (<>
                    <TextField
                        value={filter.value}
                        onChange={(event) => handleTextChange(bid, filter, filter.name, event.target.value)}
                        select
                        name={filter.name}
                        fullWidth
                        size="small"
                        label={
                            <>
                                {filter.description}
                                {filter.required ? <span style={{ color: 'red' }}>*</span> : null}
                            </>
                        }
                        type={filter.type}
                    >
                        {filter?.data?.option?.map((sector: any, index: number) => (
                            //sector.length
                            typeof sector === "string" ? <MenuItem value="" key={index}>{sector}</MenuItem> :
                                <MenuItem key={index} value={sector.id}>{sector.content}</MenuItem>
                        ))}
                    </TextField>
                </>);
            case "multi": return <FormControl fullWidth size='small'>
                <InputLabel id={filter.name}><>
                    {filter.description}
                    {filter.required ? <span style={{ color: 'red' }}>*</span> : null}
                </>
                </InputLabel>
                <Select
                    labelId={filter.name}
                    size='small'
                    name={filter.name}
                    fullWidth
                    multiple
                    value={(filter?.value && Array.isArray(filter?.value)) ? (filter.value) : filter?.value && typeof filter.value === "string" ? filter.value.split(",") : []}
                    onChange={(event) => {
                        const value = event.target.value;
                        handleTextChange(bid, filter, filter.name, value)
                    }}
                    input={<OutlinedInput label={
                        <>
                            {filter.description}
                            {filter.required ? <span style={{ color: 'red' }}>*</span> : null}
                        </>
                    } />}
                >
                    {filter?.data?.option?.map((sector: any, index: number) => (
                        typeof sector === "string" ? <MenuItem value={sector} disabled>{sector}</MenuItem> :
                            //sector.length
                            (<MenuItem key={index} value={sector.id?.toString()}>{sector.content}</MenuItem>)
                    ))}

                </Select>
            </FormControl>
            case 'text':
                return (
                    <>

                        <TextField
                            value={filter.value}
                            fullWidth
                            name={filter.name}
                            onChange={(event) => handleTextChange(bid, filter, filter.name, event.target.value)}
                            label={
                                <>
                                    {filter.description}
                                    {filter.required ? <span style={{ color: 'red' }}>*</span> : null}
                                </>
                            }
                            type={filter.type}
                            size="small"
                        />
                    </>

                );
            case 'hidden':
                return (
                    <>
                        <TextField
                            value={filter.value}
                            fullWidth
                            name={filter.name}
                            onChange={(event) => handleTextChange(bid, filter, filter.name, event.target.value)}
                            label={
                                <>
                                    {filter.description}
                                    {filter.required ? <span style={{ color: 'red' }}>*</span> : null}
                                </>
                            }
                            type={filter.type}
                            size="small"
                        />
                    </>

                );
            case "doubleSelect": return <DoubleSelect filterData={filter} bid={bid} index={index} handleChange={handleTextChange} key={index} />;
            // case "doubleMultiSelect": return <DoubleSelect filterData={filter} bid={bid} index={index} handleChange={handleTextChange} key={index} />;
            case "textarea": return <TextField
                value={filter.value}
                fullWidth
                name={filter.name}
                onChange={(event) => handleTextChange(bid, filter, filter.name, event.target.value)}
                label={
                    <>
                        {filter.description}
                        {filter.required ? <span style={{ color: 'red' }}>*</span> : null}
                    </>
                }
                type={filter.type}
                size="small"
                multiline
                rows={2}
            />
            default:
                return null;
        }
    };


    return (
        (<Grid container direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ width: "100%" }}
        >
            <Grid className='mr-2' size={12}>
                <h4>{listJobBoards && listJobBoards.name}</h4>
            </Grid>
            <Grid className='mt-2 mr-2' size={4}>
                <TextField
                    //  onChange={(event) => handleTextChange(listJobBoards.id, listJobBoards, 'duration', event.target.value)}
                    onChange={(event) => {
                        const description = event.target.value; //.split('\n');
                        setBoardIdData({
                            ...boardIdData,
                            duration: { name: "duration", value: description },

                        });
                        sendData({
                            ...boardIdData,
                            duration: { name: "duration", value: description },
                        })
                        //  console.log(description);
                        // getAllSubLocationList('');
                    }}
                    value={boardIdData.duration.value}
                    select
                    name="duration"
                    fullWidth
                    size="small"
                    label={
                        <>
                            Duration
                            <span style={{ color: 'red' }}>*</span>
                        </>
                    }
                >
                    {listJobBoards?.durations?.duration?.length > 1 && listJobBoards?.durations?.duration?.map((subitem: any, index: any) => (
                        <MenuItem key={index} value={subitem.value}>{subitem.content}</MenuItem>
                    ))}

                    {listJobBoards?.durations?.duration?.value !== "" && <MenuItem value={listJobBoards?.durations?.duration?.value}>{listJobBoards?.durations?.duration?.content}</MenuItem>}
                </TextField>
            </Grid>
            {
                listJobBoards?.extrafields?.extrafield?.map((subitem: any, ssi: any) => (
                    <Grid
                        className={` ${subitem.type === "hidden" ? "d-none" : ""}  mt-2 mr-2`}
                        key={subitem.id}
                        size={4}>
                        {renderFilter(subitem, listJobBoards.id, ssi)}
                    </Grid>
                ))
            }
        </Grid>)
    );
}
export default JobBoardData;
