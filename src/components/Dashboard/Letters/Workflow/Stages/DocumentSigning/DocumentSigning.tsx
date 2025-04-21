import  {React, useState, useEffect, useRef } from "../../../../../../shared/modules/React"
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {Grid, Button} from '../../../../../../shared/modules/commonImports';
import {  Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { Typography } from "../../../../../../shared/modules/MaterialImports/Typography";
import EditIcon from '@mui/icons-material/Edit';
import {Card} from '../../../../../../shared/modules/MaterialImports/Card';
import { useParams } from "react-router-dom";
import DocumentModal from "../../../../../shared/DocumentModal/DocumentModal";
import { URL, ANVILFORMFIELDS } from "../../FormBuilder/shared/utills/Constants";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import './DocumentSigning.scss';
import APIService from "../../../../../../shared/api/api";
import { userLocalData } from "../../../../../../shared/services/userData";
import { trackPromise } from "../../../../../../shared/modules/PromiseTrackter";
// interface State extends SnackbarOrigin {
//     open: boolean;
// }

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface DocumentSigningInterface {
    stageId: string,
    inviteProps: any

}

const DocumentSigning = ({
    stageId, inviteProps
}: DocumentSigningInterface
) => {
    const params = useParams()
    console.log(params, 'params')
    const dropContainer = useRef<HTMLDivElement>(null)
    const vertical = "top";
    const horizontal = "right";
    const [fileInfo, setFileInfo] = useState<any>("")
    const [templateData, setTemplateData] = useState<any>(null)
    const [documentInfo, setDocumentInfo] = useState<any>(null)
    const [isRefresh, setIsRefresh] = useState(false)

    const [isOpen, setOpen] = React.useState(false);
    const [documentId, setDocumentId] = React.useState("")
    // const [templateInfo, setTemplateInfo] = useState({ title: "", description: "", documentTitle: "" })
    const [isDrag, setDrag] = useState(false)
    const [toaster, setToasterOpen] = React.useState(false);
    const [formFields, setFormFields] = useState<any[]>([]);
    const initialRender = useRef(true);
    // // const { title, description, documentTitle } = templateInfo
    // useEffect(() => {
    //     const getTempaltes = async () => {
    //         try {
    //             const response = await fetch(URL + '/getTemplates', {
    //                 method: 'GET',
    //                 headers: { 'Content-Type': 'application/json' },

    //             })
    //             const data = await response.json()
    //             // console.log(data.data, 'data')
    //             setTemplateList(data.data?.data.casts)

    //         }
    //         catch (e) {
    //             setLoader(false)
    //         }
    //     }

    //     getTempaltes()
    // }, [])
    const readFile = (e: any) => {
        console.log(e, "ert")
        let fileDataInfo = e.target.files ? e.target.files[0] : e.dataTransfer.files[0]
        const allowedTypes = ['application/pdf']

        if (!allowedTypes.includes(fileDataInfo.type)) {
            setDrag(false)
            return false
        }
        // setFile(URL.createObjectURL(fileDataInfo))
        setFileInfo(fileDataInfo)
    }



    const removeFile = (e: any) => {
        // setFile(undefined)
        setFileInfo(null)
        // setDrag(false)
        setIsReload((prev: any) => !prev)

    }

    const handleFileUpload = () => {
        // console.log(isPreview, "isPreview")
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        fileInput.click();
    };



    // handle drag and drop file
    // const handleDrag = (e: any) => {

    //     e.preventDefault();
    //     e.stopPropagation();
    //     if (e.type === "dragenter" || e.type === "dragover") {
    //         setDrag(true);
    //     } else if (e.type === "dragleave") {
    //         setDrag(false);
    //     }


    // }

    // const handleDrop = (e: any) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //         readFile(e)
    //         e.dataTransfer.clearData()
    //         // e.target.value = null
    //         setDrag(false)
    //     }

    // }

    // const handleChange = (e: any) => {
    //     setTemplateInfo({ ...templateInfo, [e.target.name]: e.target.value })
    // }

    const toBase64 = (file: any) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    useEffect(() => {
        const createTemplate = async () => {
            try {
                const result: any = await toBase64(fileInfo);
                let fileData: any = {
                    "data": result.split(",")[1],
                    "mimetype": "application/pdf",
                    "filename": fileInfo.name
                }
                const response = await fetch(URL + '/createTemplate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({

                        "file": fileData
                    }),
                })


                const dataResp = await response.json()
                // console.log(response, 'dataResp', dataResp)
                // sessionStorage.setItem("templateData", JSON.stringify(dataResp.data.createCast))
                if (dataResp.data.data) {
                    let templateResponse = dataResp.data.data
                    setDocumentId(templateResponse.createCast.eid)
                    setOpen(true)
                    let postData = {
                        clientId: userLocalData.getvalue('clientId'),
                        stageId: stageId,
                        templateId: templateResponse.createCast.eid,
                        documentName: templateResponse.createCast.name,
                        // webformSlug: workFlowResp.data.createWeld.slug
                    }

                    // const savedResponse = await APIService.saveTemplateData(postData)
                    // "https://app.curately.ai/Accuick_API/Curately/Workflow/workflow_documentsigning_save.jsp
                    trackPromise(
                        APIService.getByParams(193, 'Curately/Workflow/workflow_documentsigning_save.jsp', postData).then((response) => {
                            // console.log(response.data);
                        })
                    )
                }

                // handleReload()
                // onClose()
                // navigate("/edit_template/" + dataResp.data.createCast.eid)

            } catch (error) {
                console.error(error);
                // onClose()
                return;
            }
        }
        if (fileInfo) {
            createTemplate()
        }

    }, [fileInfo])

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            const getDocumentInfo = () => {
                let postData = {
                    clientId: userLocalData.getvalue('clientId'),
                    stageId: stageId
                }

                trackPromise(
                    APIService.getByParams(193, 'Curately/Workflow/workflow_stages_get.jsp', postData).then((response) => {
                        setTemplateData(response.data.stage_documentsigning)
                        // console.log(response.data);
                    }).catch((error) => {
                        // console.log(error, "error")
                    })
                )
            }
            getDocumentInfo()
        }

    }, [isRefresh])

    const handleClose = () => {
        setOpen(false)
    }

    const handleRefresh = () => {
        setIsRefresh((prev: any) => !prev)
    }
    // useEffect(() => {
    //     let templateInfo: any = sessionStorage.getItem("templateData")
    //     let finalData: any = JSON.parse(templateInfo)
    //     setTemplateData(finalData)
    //     // console.log('isCalling')
    // }, [isRefresh])

    const handleEditTemplate = () => {
        setDocumentId(templateData.templateId)
        setOpen(true)
    }

    const handleDeleteTemplate = async () => {
        console.log(templateData, "templateData")
        try {
            const response = await fetch(URL + '/deleteTemplate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    "templateId": templateData.templateId
                }),
            })

            const outputResp = await response.json()
            if (outputResp) {
                sessionStorage.removeItem("templateData")
                setToasterOpen(true)
                setTemplateData(null)
                setFileInfo(null)
                let postData = {
                    clientId: userLocalData.getvalue('clientId'),
                    stageId: stageId,
                    templateId: "",
                    documentName: "",
                    // webformSlug: workFlowResp.data.createWeld.slug
                }

                // const savedResponse = await APIService.saveTemplateData(postData)
                // "https://app.curately.ai/Accuick_API/Curately/Workflow/workflow_documentsigning_save.jsp
                trackPromise(
                    APIService.getByParams(193, 'Curately/Workflow/workflow_documentsigning_save.jsp', postData).then((response) => {
                        // console.log(response.data);
                    })
                )
            }
        }
        catch (e) {

        }
    }

    const getFieldType = (component: any) => {
        let type = component.fieldType;
        let formType = "";

        switch (type) {
            case "textbox":
                formType = "shortText"
                break;
            case "textarea":
                formType = "longText"
                break;
            case "phone":
                formType = "phone"
                break;
            case "address":
                formType = "usAddress"
                break;
            case "email":
                formType = "email"
                break;
            case "opinionscale":
                formType = "checkbox"
                break;
            case "yes/no":
                formType = "checkbox"
                break;
            case "netprometer":
                formType = "checkbox"
                break;
            case "ssn":
                formType = "shortText"
                break;
            case "date":
                formType = "date"
                break;
            case "radio":
                formType = "radioGroup"
                break;

        }
        return formType
    }

    const getOptions = (component: any) => {
        let newObj: any = {}

        let aliasId: string = getAliasId(component)

        if (component.choices && component.choices.length) {
            component.choices.forEach((choice: any, index: any) => {
                newObj[`${aliasId}${index}`] = choice.value;
            })
        }
        return newObj;
    }

    const getAliasId = (field: any) => {
        // console.log(field.datakey, 'field.datakey')
        let aliasId = ""
        if (field.datakey) {
            aliasId = field.datakey
        }
        else aliasId = field.labelName.replace(/(<([^>]+)>)/gi, "").replace(/ /g, '')
        return aliasId
    }

    const getFinalFieldData = (fieldsData: any) => {
        let formArr: any[] = [];

        fieldsData.forEach((field: any) => {
            formArr.push([...field.components])
        })
        let merged = [].concat.apply([], formArr);
        return merged;
    }
    useEffect(() => {
        // let clientData: any = localStorage.getItem("demoUserInfo")
        // let parsedClientData: any = JSON.parse(clientData)

        // let formTypes = ANVILFORMFIELDS.map((fields: any) => {
        //     return {
        //         type: fields.type,
        //         format: fields.format
        //     }
        // })
        // console.log(formTypes, 'formTypesformTypes')
        const getFormFields = async () => {
            let data = {
                workflowId: params?.WorkflowId,
                clientId: userLocalData.getvalue('clientId')
            }
            let defaultFields = [
                {
                    name: 'Full name',
                    type: 'fullName',
                    aliasId: 'name',
                    required: false,
                },
                {
                    name: 'Email',
                    type: 'email',
                    aliasId: 'primaryEmail',
                    required: false,
                },
                {
                    name: 'Phone number',
                    type: 'phone',
                    aliasId: 'primaryPhone',
                    required: false,
                },
                {
                    name: 'Date',
                    type: 'date',
                    aliasId: 'dateVal',
                    required: false,
                },
                {
                    name: 'Candidate signature',
                    type: 'signature',
                    aliasId: 'candidateSignature',
                    required: false,
                },
                {
                    name: 'Recruiter signature',
                    type: 'signature',
                    aliasId: 'recruiterSignature',
                    required: false,
                },
                {
                    name: 'HR signature',
                    type: 'signature',
                    aliasId: 'hrSignature',
                    required: false,
                },
            ]
            try {
                let fieldResp = await APIService.getFormFields(data)
                // console.log(fieldResp, 'fieldResp')
                if (fieldResp.data) {
                    // fieldResp.data.formsList = []
                    let filteredJson = fieldResp.data.formsList.map((forms: any) => {
                        return forms.json
                    })

                    let parsedArrayData: any[] = [];
                    filteredJson.forEach((data: any) => {
                        parsedArrayData.push(JSON.parse(data))
                    })
                    let finalFormFields = getFinalFieldData(parsedArrayData)
                    console.log(filteredJson, 'filteredJson', parsedArrayData)
                    if (finalFormFields.length) {
                        // let parsedData = JSON.parse(filteredJson)
                        console.log(finalFormFields, 'finalFormFields')
                        let fieldsArr: any[] = []
                        finalFormFields.forEach((component: any) => {
                            if (!component.choices) {
                                fieldsArr.push({
                                    name: component.labelName ? component.labelName.replace(/(<([^>]+)>)/gi, "") : "",
                                    type: getFieldType(component),
                                    aliasId: getAliasId(component),
                                    required: false,
                                })
                            }
                            else {
                                fieldsArr.push({
                                    name: component.labelName ? component.labelName.replace(/(<([^>]+)>)/gi, "") : "",
                                    type: getFieldType(component),
                                    aliasId: getAliasId(component),
                                    required: false,
                                    options: getOptions(component)
                                })
                            }

                        });
                        let finalFields = fieldsArr.filter((field: any) => field.type !== "")
                        // console.log(fieldsArr, "filter")
                        defaultFields.forEach((field: any) => {
                            finalFields.push(field)
                        })
                        setFormFields(finalFields)
                    }
                    else {
                        setFormFields(defaultFields)
                    }

                    // console.log(JSON.parse(filteredJson), 'filteredJson', fieldsArr)

                }
            }
            catch (e) {
                setFormFields(defaultFields)
                // console.log(e)
            }
        }
        getFormFields()
    }, [])

    // handle drag and drop file
    const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDrag(true);
        } else if (e.type === "dragleave") {
            setDrag(false);
        }
    }
    // const handleDragIn = (e: any) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     setDrag(true)
    // }

    // const handleDragOut = (e: any) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     setDrag(false)
    // }

    const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            readFile(e)
            e.dataTransfer.clearData()
            setDrag(false)
        }
    }

    const [isReload, setIsReload] = useState(false)

    useEffect(() => {
        let div = dropContainer?.current
        if (div) {
            // div.addEventListener('dragenter', handleDragIn)
            // div.addEventListener('dragleave', handleDragOut)
            div.addEventListener('dragover', handleDrag)
            div.addEventListener('drop', handleDrop)
        }
        return () => {
            if (div) {
                // div.removeEventListener('dragenter', handleDragIn)
                // div.removeEventListener('dragleave', handleDragOut)
                div.removeEventListener('dragover', handleDrag)
                div.removeEventListener('drop', handleDrop)
            }
        }
    }, [JSON.stringify(templateData)])
    return (
        <Grid container>
            <Grid md={12} lg={12} size={12}>
                {!templateData?.templateId ? <Box>
                    {!fileInfo ? <Box>
                        <Box
                            component="label"
                            htmlFor="file-upload"
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

                            }}
                            ref={dropContainer}

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
                            }}>Prefered format: PDF</Typography>
                        </Box>

                        <input
                            type="file"
                            id="file-upload"
                            onChange={(e) => {
                                readFile(e)
                            }
                            }
                            accept="application/pdf"
                            style={{
                                width: "350px",
                                height: "150px",
                                display: "none"
                            }}
                            onClick={(event: any) => {
                                event.target.value = null
                            }}
                            name="fileData"

                        />

                    </Box> : <Box sx={{
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

                            <Typography className="file-name" sx={{ pl: 1 }} title={fileInfo?.name}>{fileInfo?.name}</Typography>

                        </Box>
                        <Box>
                            <Button disableRipple
                                sx={{
                                    padding: "0", margin: "0px", minWidth: "0px",
                                    '&:hover': {
                                        backgroundColor: 'transparent'
                                    }
                                }} onClick={(e: any) => {
                                    removeFile(e)
                                    // handleChange(e)
                                }}>
                                <DeleteIcon sx={{
                                    fontSize: "24px", color: "#DD422D", marginTop: '2px',
                                    paddingRight: '5px', position: "relative",
                                }} />
                            </Button>
                        </Box>
                    </Box>}
                </Box> :
                    <Card variant="outlined" className="main-flex" sx={{ p: 2 }}>
                        <Typography>
                            {templateData.documentName}
                        </Typography>
                        <Box className="flex-sub">
                            <Button className="btn-action" onClick={handleEditTemplate}>
                                <EditIcon />
                            </Button>
                            <Button className="btn-action btn-delete" onClick={handleDeleteTemplate}>
                                <DeleteIcon />
                            </Button>

                        </Box>
                    </Card>}

            </Grid>
            {/* <Grid md={2} lg={2}>
        </Grid> */}

            <DocumentModal open={isOpen} onClose={handleClose} documentId={documentId} handleRefresh={handleRefresh} formData={formFields} documentName={templateData?.documentName} stageId={stageId} />
            <Snackbar onClose={() => setToasterOpen(false)}
                anchorOrigin={{ vertical, horizontal }}

                key={vertical + horizontal}
                open={toaster}
                autoHideDuration={4000}
            >
                {
                    (<Alert severity="success">{"Document deleted successfully..."}</Alert>)

                }

            </Snackbar>
        </Grid >
    )
}

export default DocumentSigning;