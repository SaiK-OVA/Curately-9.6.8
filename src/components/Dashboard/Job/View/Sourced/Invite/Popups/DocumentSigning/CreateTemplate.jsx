import { React, useState, useEffect, useRef } from "../../../../../../../../shared/modules/React"
import { CircularProgress } from '../../../../../../../../shared/modules/MaterialImports/CircularProgress';
import { Grid } from '../../../../../../../../shared/modules/MaterialImports/GridGrid';
import { Button } from "../../../../../../../../shared/modules/MaterialImports/Button";
import { Typography } from '../../../../../../../../shared/modules/MaterialImports/Typography';
import { TextField } from '../../../../../../../../shared/modules/MaterialImports/FormInputs';
import { Box } from '../../../../../../../../shared/modules/MaterialImports/Box';
import AnvilEmbedFrame from '@anvilco/anvil-embed-frame'
// import TextField from '@mui/material/TextField';
import { URL } from "../../FormBuilder/shared/utills/Constants";
import "./DocumentSigning.scss"
import { trackPromise } from "../../../../../../../../shared/modules/PromiseTrackter";
import { userLocalData } from "../../../../../../shared/services/userData";
import APIService from "../../../../../../shared/api/api";

const CreateTemplate = ({ onClose, documentId, handleRefresh, formData, documentName, stageId }) => {
    const embedFrameRef = useRef()
    const [embedUrl, setEmbedUrl] = useState("")
    const [templateId, setTemplateId] = useState(documentId)
    const [fileInfo, setFileInfo] = useState("")
    const [showAnvilIframe, setShowAnvilIframe] = useState(false)
    const [isDrag, setDrag] = useState(false)
    const [loader, setLoader] = useState(false)
    const [isAddEamail, setAddEmail] = useState(false)
    const [signerFields, setSignerFields] = useState([])
    const [signerValues, setSignerValues] = useState({
        "hrName": "",
        "hrEmail": "",
        "recruiterName": "",
        "recruiterEmail": ""
    })

    const [hrEmailError, setHrEmailError] = useState("")
    const [recruiterEmailError, setRecruiterEmailError] = useState("")

    const { hrName, hrEmail, recruiterEmail, recruiterName } = signerValues

    useEffect(() => {
        // console.log(templateId, 'templateIdtemplateId')
        const getUrl = async () => {
            try {
                setLoader(true)
                const response = await fetch(URL + '/editTemplate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        castId: templateId,
                        fieldData: formData
                    }),
                })
                const responseJson = await response.json()
                const { url } = responseJson.data.data.generateEmbedURL
                // console.log(responseJson, 'responseJson')
                let iframUrl = url + "&withinIframe=true"
                // let iframUrl = url + "&withinIframe=true"
                // console.log(iframUrl, 'iframUrl')
                // setUrl(iframUrl)
                setEmbedUrl(iframUrl)
                setLoader(false)
            }

            catch (e) {
                setLoader(false)
            }

        }
        if (templateId) {
            getUrl()
        }


    }, [templateId])

    const handleEdit = async () => {

        embedFrameRef.current.iframeRef.current.contentWindow.postMessage({
            action: 'castEditSubmit'
        }, '*')

        // A signer has finished signing

    }
    const handleSaveFunction = async () => {
        try {
            setLoader(true)
            const allFieldsData = await fetch(URL + '/getTemplate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "eid": documentId,

                }),
            })

            const fieldResp = await allFieldsData.json()
            if (fieldResp.data.data) {
                let fieldsData = fieldResp.data.data.data;
                // console.log(fieldResp, 'fieldResp', fieldsData)
                let signatureFields = fieldsData.config.fields.filter((field) => field.type === "signature");

                if (signatureFields.length) {
                    let additionalSignatureFields = signatureFields.filter((signatureField) => {
                        return (signatureField.aliasId === "recruiterSignature" || signatureField.aliasId === "hrSignature")
                    })
                    if (additionalSignatureFields.length) {
                        setAddEmail(true)
                        let emailFields = [];
                        additionalSignatureFields.forEach((field) => {
                            emailFields.push({
                                "name": field.aliasId === "recruiterSignature" ? "recruiterName" : "hrName",
                                "email": field.aliasId === "recruiterSignature" ? "recruiterEmail" : "hrEmail",
                            })
                        })
                        const filtered = emailFields.filter((obj1, i, arr) =>
                            arr.findIndex(obj2 => (obj2.name === obj1.name)) === i
                        )
                        setSignerFields(filtered)
                    }
                    else {
                        onClose()
                    }

                }
                else {
                    onClose()
                }
                setLoader(false)
            }


        }
        catch (e) {
            setLoader(false)
        }
    }
    let eventCalled = false
    useEffect(() => {
        window.addEventListener('message', async ({ origin, data: eventObject }) => {
            // console.log(origin, "oo", eventObject)
            if (eventCalled) return
            // if (origin !== 'https://app.useanvil.com') return
            if (eventObject && typeof eventObject === 'object') {
                if (eventObject.action === 'signerLoad') {
                    // The signing UI has fully loaded
                } else if (eventObject.action === 'castEdit') {
                    handleSaveFunction()
                    eventCalled = true
                    // onClose()

                } else if (eventObject.action === 'signerError') {
                    // A signer has experienced an error
                    // setSend((prev) => !prev)
                }
            }
        })
    }, [])


    const handleClose = () => {
        handleRefresh()
        onClose()
    }
    const checkHrCondition = () => {
        let isExists = true
        let hrIndex = signerFields.findIndex((field) => field.name === "hrName")
        if (hrIndex === -1) {
            isExists = false
        }
        return isExists
    }
    const checkRecruiterCondition = () => {
        let isExists = true
        let recruiterIndex = signerFields.findIndex((field) => field.name === "recruiterName")
        if (recruiterIndex === -1) {
            isExists = false
        }
        return isExists
        // console.log(recruiterIndex, typeof recruiterIndex, 'hrii')
    }
    const handleSave = () => {
        let isHrExists = checkHrCondition()
        let isRecruiterExists = checkRecruiterCondition()
        if (isHrExists) {
            if (hrEmail) {
                if (hrEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    setHrEmailError("")
                    // console.log("isCOmm")
                    // return true
                }
                else {
                    setHrEmailError("please enter a valid email.")
                    return false
                }
            }
            else {

                if (hrEmail === "") {
                    setHrEmailError("This filed is required.")
                    return false
                }
                else {
                    return true
                }

            }
        }



        if (isRecruiterExists) {
            if (hrEmail) {
                if (recruiterEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    setRecruiterEmailError("")
                }
                else {
                    setRecruiterEmailError("please enter a valid email.")
                    return false
                }
            }
            else {
                setRecruiterEmailError("This filed is required.")
                return false
            }
        }

        let postData = {
            clientId: userLocalData.getvalue('clientId'),
            stageId: stageId,
            templateId: documentId,
            documentName: documentName,
            additionalSignature: JSON.stringify(signerValues)
            // webformSlug: workFlowResp.data.createWeld.slug
        }
        trackPromise(
            APIService.getByParams(193, 'Curately/Invite/invite_job_documentsigning_save.jsp', postData).then((response) => {
                // console.log(response.data);
                onClose()
            })
        )
    }
    const handleInputChange = (e) => {
        setSignerValues({ ...signerValues, [e.target.name]: e.target.value })
    }


    return (
        <Grid container>

            <Grid md={12} lg={12} size={12}>
                <Box sx={{ width: "100%", height: "75vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {loader ? <CircularProgress /> : !isAddEamail ? <AnvilEmbedFrame
                        ref={embedFrameRef}
                        iframeURL={embedUrl}
                        onEvent={
                            (eventObject) => {
                                // console.log(eventObject)
                                handleRefresh()
                            }

                        }
                        style={{ width: "100%", height: "100%", border: "none" }}
                        className="anvil-embed-frame"
                        data-anvil-embed
                    /> : <Grid container>

                        <Grid size={4}>

                        </Grid>
                        <Grid size={4}>
                            <Typography component={"h4"} sx={{ fontWeight: "500", mb: 2, fontSize: "18px" }}>Add Emails</Typography>
                            {signerFields.length && signerFields.map((field) => {
                                return (
                                    <>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography sx={{ fontWeight: "500" }}>{field.name === "recruiterName" ? "Recruiter Name:" : "HR Name:"}</Typography>
                                            <TextField size="small" sx={{ width: "100%" }} value={field.name === "recruiterName" ? recruiterName : hrName} name={field.name} onChange={handleInputChange} />
                                        </Box>
                                        <Box sx={{ mb: 1 }}>
                                            <Typography sx={{ fontWeight: "500" }}>{field.email === "recruiterEmail" ? "Recruiter Email:" : "HR Email:"}</Typography>
                                            <TextField size="small" sx={{ width: "100%" }} value={field.email === "recruiterEmail" ? recruiterEmail : hrEmail} name={field.email} onChange={(e) => {
                                                handleInputChange(e)
                                                if (field.email === "recruiterEmail") {
                                                    setRecruiterEmailError("")
                                                }
                                                else {
                                                    setHrEmailError("")
                                                }
                                            }} />
                                            <Box sx={{ pt: 1 }}>
                                                <Typography sx={{ color: "red", fontSize: "12px" }}>{field.email === "recruiterEmail" ? recruiterEmailError : hrEmailError}</Typography>
                                            </Box>
                                        </Box>
                                    </>
                                )
                            })}


                        </Grid>
                        <Grid size={4}>

                        </Grid>
                    </Grid>}


                </Box>



            </Grid>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, width: "100%" }}>
                <Button type="button" onClick={handleClose} sx={{ textTransform: "none", mr: 1 }}>Cancel</Button>
                {!isAddEamail ? <Button type="button" onClick={handleEdit} variant="contained">Save</Button> : <Button type="button" onClick={handleSave} variant="contained">Submit</Button>}

            </Box>
        </Grid >
    )
}

export default CreateTemplate