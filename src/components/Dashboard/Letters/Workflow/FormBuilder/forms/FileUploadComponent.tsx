import  { useContext } from "react";
import  {React, useState, useEffect, useRef } from "../../../../../../shared/modules/React";
import {Stack} from "../../../../../../shared/modules/MaterialImports/Stack";
import {Button} from '../../../../../../shared/modules/MaterialImports/Button';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import ApiService from '../../../../../../shared/api/api';

import { trackPromise } from "../../../../../../shared/modules/PromiseTrackter";
import { AllStore, FormStore } from "../../../../../../App";
import { showToaster } from "../../../../../shared/SnackBar/SnackBar";
import { shallow } from 'zustand/shallow';
import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../../../shared/store/FormBuilderStore";


const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
    formData: state.formData,
    setFormData: state.setFormData
});

interface FileProps {
    isPreview: boolean;
    getFile: (value: any, id: any) => void;
    changeHandlerFn?: any;
    name: any;
    width: any
    field: any;
    indexVal: any;
    fileData: any;
}

const FileUploadComponent: React.FC<FileProps> = ({ isPreview, getFile, changeHandlerFn, name, width, field, indexVal, fileData }) => {

    const [allData, setAllData] = useContext(AllStore);

    const [isShowImage, setShowImage] = useState(false)
    const [file, setFile] = useState<any>(null);
    const [fileInfo, setFileInfo] = useState<any>(null)
    // const [propsData, setPropsData] = useContext(Store)
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    const fileRefs = useRef<(HTMLDivElement | null)[]>([])
    const [isDrag, setDrag] = useState(false)
    // console.log(allData);
    const readFile = (e: any) => {
        // console.log(e, "ert")

        let fileData = e.target.files ? e.target.files[0] : e.dataTransfer.files[0]
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if (field && field.isResume) {
            if (!allowedTypes.includes(fileData.type)) {
                setDrag(false)
                return false
            }
        }
        console.log(e, 'check file', fileData);
        setFile(URL.createObjectURL(fileData));
        setFileInfo(fileData);
        getFile(fileData, name);
        setShowImage(true);

        var tempFormData = new FormData();
        tempFormData.append("documentname", fileData);
        tempFormData.append("form_id", allData.stageData.stage_dataCollection.formId);
        tempFormData.append("candid", allData.candidateData.id);
        tempFormData.append("jobid", allData.candidateData.jobId);
        tempFormData.append("workflow_job_cand_id", allData.candidateData.workflow_job_cand_id);
        tempFormData.append("stageId", allData.stageData.stageId);
        tempFormData.append("stageNumber", allData.stageData.stageNumber);

        trackPromise(
            ApiService.postWithFileData(193, 'Curately/Documents/upload.jsp', tempFormData).then(
                (response: any) => {
                    if (response.data.Success) {
                        let attachmentURL = import.meta.env.VITE_URL_AWS + response.data.downloadPath;
                        const newState = formData.map((obj: any) => {
                            if (obj.id === field.id) {
                                return { ...obj, file: fileData, value: attachmentURL };
                            }
                            return obj;
                        });
                        setFormData(newState);
                    } else {
                        showToaster((response.data.message) ? response.data.message : "An error occured while saving the Document.", 'error')
                    }
                }
            )
        )


    }

    const removeFile = (e: any) => {
        setFile(undefined)
        setShowImage(false)
        changeHandlerFn(field.id?.toString(), e.target.value);
        const newState = formData.map((obj: any) => {
            if (obj.id === field.id) {
                return { ...obj, file: null, value: "" };
            }
            return obj;
        });
        setFormData(newState);
        getFile("", name)

    }

    const handleFileUpload = () => {
        // console.log(isPreview, "isPreview")
        const fileInput = document.getElementById(`file-upload-${indexVal}`) as HTMLInputElement;
        if (isPreview) {

            fileInput.click();
        }

    };

    // useEffect(() => {
    //     console.log(field, 'hellooo ')
    //     if (field) {
    //         setFileInfo(field.file)
    //         if (field.file) {
    //             setFile(URL.createObjectURL(field.file))
    //             setShowImage(true)
    //         }
    //     }

    // }, [propsData.isPreview])

    // handle drag and drop file
    const handleDrag = (e: any) => {

        if (isPreview) {
            e.preventDefault();
            e.stopPropagation();
            if (e.type === "dragenter" || e.type === "dragover") {
                setDrag(true);
            } else if (e.type === "dragleave") {
                setDrag(false);
            }
        }

    }


    const handleDrop = (e: any) => {

        if (isPreview) {
            e.preventDefault()
            e.stopPropagation()
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                readFile(e)
                e.dataTransfer.clearData()
                // e.target.value = null
                setDrag(false)
            }
        }
    }

    useEffect(() => {

        if (isPreview) {
            if (fileData) {
                const fileVal = new File([fileData], fileData.name, {
                    type: fileData.type
                })
                setFileInfo(fileData)
                setFile(URL.createObjectURL(fileVal))
                setShowImage(true)

            }

        }
    }, [isPreview, fileData])


    return (
        <Stack sx={{
            gap: "10px",
            width: width
        }}
            className="file-container"
        >


            {!isShowImage ? <Box
                ref={(ref: HTMLDivElement) => fileRefs.current[indexVal] = ref}
                component="label"
                htmlFor={`file-upload-${indexVal}`}
                sx={{
                    height: "156px",
                    // width: "554px",

                    "&:hover": {
                        backgroundColor: "rgb(4 69 175 / 30%)"
                    },
                    border: isDrag ? '5px dashed rgb(4 69 175 / 80%)' : '1px dashed rgb(4 69 175 / 80%)', backgroundColor: isDrag ? 'rgb(4 69 175 / 30%)' : 'rgb(4 69 175 / 10%)',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: isPreview ? "pointer" : "none",
                }}
                onDragEnter={handleDrag}
                onDrop={handleDrop}
            // data-accept={field.isResume ? "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"}

            >

                <Button onClick={handleFileUpload} sx={{ padding: "0", margin: "0px" }}><CloudUploadOutlinedIcon sx={{ fontSize: "40px", color: "var(--c-primary-color)" }} /></Button>

                <Typography sx={{
                    fontFamily: "Segoe UI",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "var(--c-primary-color)"
                }}>Choose File
                    <span
                        style={{
                            marginLeft: "4px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: "400",
                        }}
                    >
                        or
                        <span
                            style={{
                                marginLeft: "4px",
                                color: "black",
                                fontSize: "14px",
                                fontWeight: "500",
                            }}
                        >
                            Drag here
                        </span>
                    </span>

                </Typography>
                <Typography sx={{
                    fontFamily: "Segoe UI",
                    fontSize: "12px",
                    fontWeight: "400",
                    color: "black"
                }}>Size limit: 10MB</Typography>
            </Box> :

                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#E6EDF9',
                    pt: '6px', pb: '6px', borderRadius: '5px',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '82%'
                    }}>
                        {!fileInfo?.type?.includes("image") && <InsertDriveFileIcon sx={{ color: 'var(--c-primary-color)', fontSize: '23px', pl: '5px' }} />}
                        {fileInfo && fileInfo?.type?.includes("image") ? <img src={file} alt="file" style={{ width: "100%", height: "100%" }} /> :
                            <Typography className="file-name" title={fileInfo?.name}>{fileInfo?.name}</Typography>
                        }
                    </Box>
                    <Box>
                        <Button disableRipple
                            sx={{
                                padding: "0", margin: "0px", minWidth: "0px",
                                '&:hover': {
                                    backgroundColor: 'transparent'
                                }
                            }} onClick={removeFile}>
                            <DeleteIcon sx={{
                                fontSize: "24px", color: "#DD422D", marginTop: '2px',
                                paddingRight: '5px', position: "relative",
                            }} />
                        </Button>
                    </Box>
                </Box>

                // <Box sx={{
                //     display: "flex",
                //     justifyContent: 'center',
                //     height: "156px",
                //     // width: "554px",
                //     "&:hover": {
                //         backgroundColor: "rgb(4 69 175 / 30%)"
                //     },
                //     border: isDrag ? '5px dashed rgb(4 69 175 / 80%)' : '1px dashed rgb(4 69 175 / 80%)',
                //     backgroundColor: isDrag ? 'rgb(4 69 175 / 30%)' : 'rgb(4 69 175 / 10%)',
                //     flexDirection: "row",
                //     alignItems: "center",
                //     cursor: isPreview ? "pointer" : "none",
                // }}>
                //     <Box sx={{
                //         display: 'flex', flexDirection: 'column',
                //         justifyContent: 'space-between', alignItems: 'center',
                //         border: '1px solid var(--c-primary-color)', height: '130px', width: '25%', borderRadius: '3px',
                //         backgroundColor: 'rgb(4 69 175 / 10%)'
                //     }}>
                //         <InsertDriveFileOutlinedIcon sx={{ fontSize: "60px", color: "var(--c-primary-color)", mt: '15%' }} />
                //         <Box sx={{
                //             borderTop: '1px solid var(--c-primary-color)',
                //             width: '100%',
                //             backgroundColor: '#ffffff', display: 'flex',
                //             flexDirection: 'row', alignItems: 'center', borderBottomLeftRadius: '3px',
                //             borderBottomRightRadius: '3px'
                //         }}>
                //             {fileInfo && fileInfo?.type.includes("image") ? <img src={file} alt="file" style={{ width: "100%", height: "100%" }} /> :
                //                 <Typography className="file-name" title={fileInfo?.name}>{fileInfo?.name}</Typography>
                //             }

                //             <Box>
                //                 <Button sx={{ padding: "0", margin: "0px", minWidth: "0px" }} onClick={removeFile}>
                //                     <CloseIcon sx={{
                //                         fontSize: "10px", color: "#1A1A1A", marginTop: '2px',
                //                         paddingRight: '2px', position: "relative", bottom: "3px"
                //                     }} />
                //                 </Button>
                //             </Box>
                //         </Box>
                //     </Box>

                // </Box>

            }

            {isPreview && <input
                type="file"
                id={`file-upload-${indexVal}`}
                onChange={(e) => {
                    // console.log('is calling')
                    changeHandlerFn(field.id?.toString(), e.target.value);
                    readFile(e)
                }
                }
                accept={field.isResume ? "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"}
                style={{
                    width: "350px",
                    height: "150px",
                    display: "none"
                }}
                onClick={(event: any) => {
                    event.target.value = null
                }}

                name={name}
            />}

        </Stack>
    )
}

export default FileUploadComponent