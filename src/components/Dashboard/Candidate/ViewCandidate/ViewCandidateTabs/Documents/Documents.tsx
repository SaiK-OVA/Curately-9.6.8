
import { useCallback, useState, useEffect, lazy } from '../../../../../../shared/modules/React';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import { debounce } from "lodash";
// import { useParams } from 'react-router-dom';

import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { Box } from "../../../../../../shared/modules/MaterialImports/Box";
import { Card } from "../../../../../../shared/modules/MaterialImports/Card";
import { Button } from "../../../../../../shared/modules/MaterialImports/Button";
import { Grid } from "../../../../../../shared/modules/MaterialImports/Grid";
import { Chip } from "../../../../../../shared/modules/MaterialImports/Chip";

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { getDocumentIcon } from '../../../../../../shared/modules/documentIcons';

import ApiService from '../../../../../../shared/api/api';
import { confirmDialog } from "../../../../../shared/ConfirmDialog/ConfirmDialog";
import { userLocalData } from "../../../../../../shared/services/userData";
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';


import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import mammoth from 'mammoth';



const AddDocumentModal = lazy(() => import('../../CandidateTopCard/Popups/AddDocumentModal/AddDocumentModal'));


import './Documents.scss';


export interface documentProps {
    isLoadDocumentData: any;
    reseDoumentData: any;
    candidateId: string;
    jobId: string;
}

const Documents = ({ isLoadDocumentData, reseDoumentData, candidateId, jobId }: documentProps) => {
    // const [documentType, setDocumentType] = useState("");
    // const [openDoc, setOpenDoc] = useState(false);
    const [urlToDisplay, setUrlToDisplay] = useState({
        documentBase64: "",
        type: "",
        url: "",
        imageURL: ""
    });
    // const [fullWidth, setFullWidth] = useState(true);
    //const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');
    //  const [docsList, setDocList] = useState<any>(docList);
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [documentData, setDocumentData] = useState<any>(null);
    // console.log(docList);
    // const [currentPage, setCurrentPage] = useState(1);
    // const docsPerPage = 9;
    // const totalPages = Math.ceil(docList.length / docsPerPage);
    // const lastIndex = currentPage * docsPerPage;
    // const firstIndex = lastIndex - docsPerPage;
    // const currentList = docList.slice(firstIndex, lastIndex);
    // const { candidateId, jobId } = useParams();

    const handleClickEditOpen = (doc: any) => {
        setOpen(true);
        setIsEditMode(true)
        setDocumentData(doc);
    }
    const handleClickOpen = () => {
        setOpen(true);
        setIsEditMode(false)
        setDocumentData(null);
    };
    const handleClose = () => {
        setOpen(false);
        loadDocumentsList();
    };

    // const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //     setCurrentPage(value);
    // };

    const documentViewHandler = async (doc: string, downloadLink: string) => {
        let ext = doc.substring(doc.lastIndexOf('.') + 1).toLowerCase();

        if (ext === 'docx' || ext === 'doc') {
            await fetch(`${import.meta.env.VITE_URL_AWS}${downloadLink}`)
                .then(response => response.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.readAsArrayBuffer(blob);
                    // reader.readAsDataURL(blob);
                    reader.onload = async function (e) {
                        const arrayBuffer = reader.result;
                        // @ts-ignore
                        const result = await mammoth.convertToHtml({ arrayBuffer });
                        setUrlToDisplay({
                            documentBase64: result.value,
                            type: ext,
                            url: '',
                            imageURL: ""
                        }); // Set HTML content
                    }
                });
        } else if (ext === 'jpeg' || ext === 'jpg' || ext === 'jfif' || ext === 'exif' || ext === 'tiff' || ext === 'gif' || ext === 'bmp' || ext === 'png' || ext === 'ppm' || ext === 'pgm' || ext === 'pbm' || ext === 'pnm' || ext === 'webp' || ext === 'hdr' || ext === 'bat' || ext === 'bpg' || ext === 'svg') {
            setUrlToDisplay({
                documentBase64: "",
                type: ext,
                url: "",
                imageURL: `${import.meta.env.VITE_URL_AWS}${downloadLink}`,
            });
        } else {
            setUrlToDisplay({
                documentBase64: "",
                type: ext,
                url: `${import.meta.env.VITE_URL_AWS}${downloadLink}`,
                imageURL: ""
            });
            // } else {
            //     setUrlToDisplay({
            //         documentBase64: "",
            //         type: ext,
            //         url: `${import.meta.env.VITE_URL_AWS}${downloadLink}`
            //     });
            // setUrlToDisplay(`https://docs.google.com/gview?url=${import.meta.env.VITE_URL_AWS}${downloadLink}&embedded=true`);
            // setUrlToDisplay(`https://view.officeapps.live.com/op/embed.aspx?src=https://docs.accuick.com/Docs3/${doc}`);
        }

    }

    useEffect(() => {
        if (isLoadDocumentData) {
            reseDoumentData();
            loadDocumentsList()
        }
    }, [isLoadDocumentData])

    const handleDeleteDocument = (DocId: string) => {
        confirmDialog('Are you sure you want to delete this Document?', () => {
            deleteDocumentId(DocId);
        });
    };


    const deleteDocumentId = (DocId: string) => {
        trackPromise(

            // https://app.curately.ai/Accuick_API/Curately/Documents/delete.jsp
            ApiService.postWithData('admin', 'deletedocument', { docId: DocId, clientId: userLocalData.getvalue('clientId'), userId: userLocalData.getvalue('recrId') })
                .then(
                    (response: any) => {

                        if (response?.data?.Success) {
                            showToaster('Document has been deleted successfully.', 'success');
                            loadDocumentsList();
                        } else {
                            showToaster(response.data.Message ? response.data.Message : "An error occured while deleting", 'error');
                        }

                    }
                ).catch(
                    (response: any) => {
                        showToaster(response.response?.data?.Message ? response.response?.data?.Message : "An error occured while deleting", 'error');
                    }

                )
        )
    }

    const [documentList, setDocmentList] = useState([]);
    // const { candidateId } = useParams();

    const loadDocumentsList = useCallback(
        debounce(() => {
            // https://www4.accuick.com/Accuick_API/Curately/Documents/list.jsp?clientId=2     
            trackPromise(
                ApiService.postWithData("admin", 'getRecruiterProfile', { clientId: userLocalData.getvalue('clientId'), userId: candidateId, jobId: jobId }).then(
                    (response: any) => {
                        // console.log(response.data)
                        // debugger;
                        if (response.data.Success) {
                            setDocmentList(response.data.list);
                        }
                    }
                ))
        }, 400), [])
    useEffect(() => {
        loadDocumentsList();
    }, []);

    return (
        <Box id="documentsList">
            <Card sx={{ padding: "10px" }}>
                <Box className="card-header">
                    <Typography variant="h6" sx={{ textTransform: 'uppercase', color: '#7d62ef' }}>Documents</Typography>
                    <Button sx={{ color: '#7d62ef', fontSize: '13px' }} onClick={handleClickOpen} startIcon={<NoteAddOutlinedIcon />}>
                        Add Document
                    </Button>
                </Box>
                <Box className="documents-conatiner">
                    <Box sx={{ width: '30%', px: 1 }}>
                        <Grid container spacing={2}>

                            {documentList && documentList.map((doc: any, i: number) => (
                                <Grid size={12} key={i}>
                                    <Card className="document-box">

                                        <Chip icon={getDocumentIcon(doc.ext)} label={`${doc.docTitle}`} variant="outlined" sx={{ border: '0' }} />
                                        {/* <Box className="date-time">
                                            <Chip icon={<CalendarMonthOutlinedIcon />} label={doc.date.split(" ")[0].replaceAll("-", "/")} variant="outlined" sx={{ border: '0' }} />
                                        </Box>
                                        <Box className="date-time">
                                            <Chip icon={<AccessAlarmOutlinedIcon />} label={doc.date.split(" ")[1]} variant="outlined" sx={{ border: '0' }} />
                                        </Box> */}
                                        {/* <Box className="select-box">
                                            <CheckIcon sx={{ fontSize: '14px', color: '#fff' }} />
                                        </Box> */
                                        }
                                        <Box className="view-box">
                                            <VisibilityIcon onClick={() => documentViewHandler(`${doc.docId}.${doc.ext}`, doc.downloadLink)} sx={{ fontSize: '22px', color: '#636363' }} />
                                            <EditIcon onClick={() => handleClickEditOpen(doc)} sx={{ fontSize: '22px', color: '#636363', marginLeft: '10px' }} />
                                            <DeleteIcon onClick={() => handleDeleteDocument(`${doc.docId}`)} sx={{ fontSize: '22px', color: '#636363', marginLeft: '10px' }} />
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {/*  <Pagination count={totalPages} variant="outlined" onChange={handlePageChange} className='pagination-custom' />*/}
                    </Box>
                    <Box sx={{ width: '70%', p: 1 }}>
                        {/* <iframe src={urlToDisplay} className="docIframe" title="document" width="100%" loading='lazy'></iframe> */}
                        {
                            urlToDisplay.imageURL ?
                                <img  src={urlToDisplay.imageURL} className='docViewerImage' />
                                :
                                urlToDisplay.url ?
                                    <DocViewer
                                        className="doc-viewer"
                                        documents={[{ uri: urlToDisplay.url, fileType: urlToDisplay.type }]}
                                        config={{
                                            header: {
                                                disableHeader: false,
                                                disableFileName: false,
                                                retainURLParams: false,
                                            },
                                        }}
                                        pluginRenderers={DocViewerRenderers}
                                    />
                                    :
                                    urlToDisplay.documentBase64 ?
                                        <div dangerouslySetInnerHTML={{ __html: urlToDisplay.documentBase64 }} />
                                        :
                                        null
                        }
                    </Box>
                </Box>
            </Card>

            {/* <Dialog open={openDoc} fullWidth={fullWidth}>
                <DialogContent> */}
            {/* <iframe src={urlToDisplay} className="docIframe" title="document" width="100%" loading='lazy'></iframe> */}
            {/*   <form className="resume-upload">
                                <Grid container spacing={2}>
                                    <Grid md={6}>
                                        <Typography variant="body2">Document Type</Typography>
                                        <FormControl fullWidth>
                                            <Select
                                                size="small"
                                                value={documentType}
                                                onChange={handleChangeType}
                                            >
                                                <MenuItem value={10}>Amdocs - VP Sreening Form</MenuItem>
                                                <MenuItem value={20}>Amdocs - VP Sreening Form</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid lg={3} md={6}>
                                        <FormControlLabel className='hidecheck' control={<Checkbox defaultChecked sx={{ '&.Mui-checked': { color: '#2dce98', }, }} />} label="Hide Names" sx={{ paddingTop: '15px', marginRight: '0' }} />
                                    </Grid>
                                    <Grid md={6}>
                                        <Typography variant="body2">Alternate Title</Typography>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid md={6}>
                                        <Typography variant="body2">State</Typography>
                                        <FormControl fullWidth>
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Box className="upload-btn-wrap" sx={{ textAlign: 'center', marginTop: '10px' }}>
                                    <Button variant="outlined" size="large">Upload</Button>
                                </Box>
                            </form>
                            <Box sx={{ paddingTop: '16px' }}>
                                <Typography variant="body2">Notes</Typography>
                                <FormControl fullWidth>
                                    <TextField
                                        multiline
                                        rows={2}
                                        variant="outlined"
                                    />
                                </FormControl>
                            </Box>*/}

            {/* </DialogContent> */}
            {/*   <DialogActions>
                    <Button variant="contained" style={{ marginRight: '300px' }} size="large">Update</Button>
                    <Button onClick={handleCloseDoc} size="large">Close</Button>
                </DialogActions>*/}
            {/* </Dialog> */}
            <div>
                {/* <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}

                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Add Document
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <FormControl fullWidth >
                            <TextField
                                variant="outlined"
                                size="small"
                                label="File Name"
                                margin='dense'
                                disabled
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                variant="outlined"
                                size="small"
                                label="Alternate Name"
                                margin='dense'
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ marginTop: "10px" }}>

                            <TextField
                                select
                                id="demo-simple-select"
                                size="small"
                                label="Document Type"
                            // onChange={handleChange}

                            >
                                <MenuItem value="1" ></MenuItem>
                                <MenuItem value="2">Passport Copy</MenuItem>
                                <MenuItem value="3">Drivers License Copy</MenuItem>
                                <MenuItem value="4">SSN card Copy</MenuItem>
                                <MenuItem value="5">Travel History</MenuItem>
                                <MenuItem value="6">I-94</MenuItem>
                                <MenuItem value="7">Opt Ead</MenuItem>
                                <MenuItem value="8">CPT EAD</MenuItem>
                                <MenuItem value="9">TN Permit</MenuItem>
                                <MenuItem value="10">Certification</MenuItem>

                            </TextField>
                        </FormControl>

                    </DialogContent>

                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        marginTop={"5px"}
                        marginBottom={"10px"}>
                        <Button variant="outlined" size="small">Browse</Button>
                        <Button variant="outlined" size="small">Upload</Button>
                    </Stack>

                </BootstrapDialog> */}

                {
                    open ?
                        <AddDocumentModal dialogOpen={open} closePopup={handleClose} candidateId={candidateId ? candidateId : ""} jobId={jobId ? jobId : ""} add={!isEditMode} documentData={documentData} />
                        :
                        null
                }
            </div>
        </Box>
    )
}

export default Documents