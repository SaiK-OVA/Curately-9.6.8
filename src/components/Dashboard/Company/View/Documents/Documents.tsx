import { React, useState, useEffect } from '../../../../../shared/modules/React';
import { Typography } from '../../../../../shared/modules/MaterialImports/Typography';
import { Box } from "../../../../../shared/modules/MaterialImports/Box";
import { Card } from "../../../../../shared/modules/MaterialImports/Card";
import { Button, IconButton } from "../../../../../shared/modules/MaterialImports/Button";
import { Grid } from "../../../../../shared/modules/MaterialImports/Grid";
import { Chip } from "../../../../../shared/modules/MaterialImports/Chip";
import { TextField, FormControl, FormControlLabel } from "../../../../../shared/modules/MaterialImports/FormInputs";
import { MenuItem } from "../../../../../shared/modules/MaterialImports/Menu";
import { Checkbox, Select } from "../../../../../shared/modules/MaterialImports/FormElements";
import { SelectChangeEvent } from "@mui/material/Select";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
// import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
// import CheckIcon from '@mui/icons-material/Check';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '../../../../../shared/modules/MaterialImports/Dialog';
import ApiService from "../../../../../shared/api/api";
// import ImageIcon from '@mui/icons-material/Image';
// import TextFieldsIcon from '@mui/icons-material/TextFields';
// import Pagination from '@mui/material/Pagination';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';

import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';

import './Documents.scss'
import { useParams } from 'react-router-dom';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
import { getDocumentIcon } from '../../../../../shared/modules/documentIcons';

const Documents = () => {
    const [documentType, setDocumentType] = useState("");
    const [openDoc, setOpenDoc] = useState(false);
    const [docURL, setDocURL] = useState("");
    const [fullWidth, setFullWidth] = useState(true);
    //const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('md');
    const [docList, setDocList] = useState([]);

    // const [currentPage, setCurrentPage] = useState(1);
    // const docsPerPage = 10;
    // const totalPages = Math.ceil(docList.length / docsPerPage);
    // const lastIndex = currentPage * docsPerPage;
    // const firstIndex = lastIndex - docsPerPage;
    // const currentList = docList.slice(firstIndex, lastIndex);
    const [open, setOpen] = useState(false);

    const { companyId } = useParams();

    const loadDocumentsList = () => {
        //setDocList(ApiService.getDocumentsList());
        trackPromise(
            ApiService.getByParams(193, 'Company/getDocuments_JSON.jsp', { compId: companyId }).then(
                (response: any) => {
                    // console.log(response)
                    setDocList(response.data);
                }
            ))
    }
    //setDocList(ApiRequests.getDocumentsList());

    const handleChangeType = (e: SelectChangeEvent) => {
        setDocumentType(e.target.value as string);
    };



    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    interface DialogTitleProps {
        id: string;
        children?: React.ReactNode;
        onClose: () => void;
    }

    function BootstrapDialogTitle(props: DialogTitleProps) {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //     setCurrentPage(value);
    // };

    const documentViewHandler = (doc: string) => {
        let ext = doc.substring(doc.lastIndexOf('.') + 1).toLowerCase();
        let condition = (ext === 'jpeg' || ext === 'jpg' || ext === 'jfif' || ext === 'exif' || ext === 'tiff' || ext === 'gif' || ext === 'bmp' || ext === 'png' || ext === 'ppm' || ext === 'pgm' || ext === 'pbm' || ext === 'pnm' || ext === 'webp' || ext === 'hdr' || ext === 'bat' || ext === 'bpg' || ext === 'svg');

        if (condition) {
            setDocURL(`https://docs.accuick.com/Docs3/${doc}`);
        } else {
            setDocURL(`https://docs.google.com/gview?url=https://docs.accuick.com/Docs3/${doc}&embedded=true`);
            // setDocURL(`https://view.officeapps.live.com/op/embed.aspx?src=https://docs.accuick.com/Docs3/${doc}`);
        }
        // handleClickOpen();
    }

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
                    <Box sx={{ width: '30%' }}>
                        <Grid container spacing={2}>
                            {docList.map((doc: any, i: number) => (
                                <Grid size={12} key={i}>
                                    <Card className="document-box">
                                        <Chip icon={getDocumentIcon(doc.ext)} label={`${doc.docid}.${doc.ext}`} variant="outlined" sx={{ border: '0' }} />
                                        <Box className="date-time">
                                            <Chip icon={<CalendarMonthOutlinedIcon />} label={doc.modifydt.split(" ")[0].replaceAll("-", "/")} variant="outlined" sx={{ border: '0' }} />
                                            <Chip icon={<PermIdentityRoundedIcon />} label={doc.modifyby} variant="outlined" sx={{ border: '0' }} />

                                        </Box>
                                        <Box className="date-time">
                                            <Chip icon={<AccessAlarmOutlinedIcon />} label={doc.modifydt.split(" ")[1]} variant="outlined" sx={{ border: '0', marginTop: 0 }} />
                                        </Box>
                                        {/* <Box className="select-box">
                                            <CheckIcon sx={{ fontSize: '14px', color: '#fff' }} />
                                        </Box> */}
                                        <Box className="view-box">
                                            <VisibilityIcon onClick={() => documentViewHandler(`${doc.docid}.${doc.ext}`)} sx={{ fontSize: '22px', color: "#636363" }} />
                                            <EditIcon onClick={() => handleClickOpen()} sx={{ fontSize: '22px', marginLeft: '10px', color: "#636363" }} />
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        {/*  <Pagination count={totalPages} variant="outlined" onChange={handlePageChange} className='pagination-custom' />*/}
                    </Box>
                    <Box sx={{ width: '70%' }}>
                        <iframe src={docURL} className="docIframe" title="document" width="100%" loading='lazy'></iframe>
                    </Box>
                </Box>
            </Card>

            <Dialog open={openDoc} onClose={handleClose} fullWidth={fullWidth}>
                <DialogContent >
                    {/* <iframe src={docURL} className="docIframe" title="document" width="100%" loading='lazy'></iframe> */}

                    <form className="resume-upload">
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
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" style={{ marginRight: '300px' }} size="large">Update</Button>
                    <Button onClick={handleClose} size="large">Close</Button>
                </DialogActions>
            </Dialog>


            <div>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}

                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>

                    </BootstrapDialogTitle>
                    <DialogContent >
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
                        marginBottom={"10px"}>
                        <Button variant="outlined" size="small">Browse</Button>
                        <Button variant="outlined" size="small">Upload</Button>
                    </Stack>

                </BootstrapDialog>
            </div>

        </Box>
    )
}

export default Documents