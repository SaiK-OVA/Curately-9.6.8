import { SyntheticEvent, useEffect, useState } from '../../../../../../shared/modules/React';
import { useFormik, Yup } from '../../../../../../shared/modules/Formik';
import {FormGroup} from '../../../../../../shared/modules/MaterialImports/FormGroup';
import {FormControlLabel, TextField} from '../../../../../../shared/modules/MaterialImports/FormInputs';
import {Checkbox} from '../../../../../../shared/modules/MaterialImports/FormElements';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
// import FormControl from '@mui/material/FormControl';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';
// import Select from '@mui/material/Select';
import {Tabs, Tab} from '../../../../../../shared/modules/MaterialImports/Tabs';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import {Card, CardContent} from '../../../../../../shared/modules/MaterialImports/Card';

import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import { IconButton, showToaster, Button, Grid } from '../../../../../../shared/modules/commonImports';

import ApiService from '../../../../../../shared/api/api';
import { StageInterface } from '../../Add/AddWorkflow';
import SortIcon from '@mui/icons-material/Sort';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SaveIcon from '@mui/icons-material/Save';

import VideoPreview from '../../PopUps/VideoPreview/VideoPreview';
// import RecruiterVideoRecording from '../../PopUps/RecruiterVideoRecording/RecruiterVideoRecording';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import './Info.scss';
import {ToggleButton} from '../../../../../../shared/modules/MaterialImports/ToggleButton';
import {Stack} from '../../../../../../shared/modules/MaterialImports/Stack';
import {Tooltip} from '../../../../../../shared/modules/MaterialImports/ToolTip';
import { userLocalData } from '../../../../../../shared/services/userData';
import Editor from '../../../Sequence/EmailBody/EmailBody';
import { MUIAutoComplete } from '../../../../../shared/MUIAutoComplete/MUIAutoComplete';


const Info = ({
    updated, stagesList, stageId, passedStageData = {}
}: {
    updated: any, stagesList: StageInterface[], stageId: string, passedStageData: any
}) => {

    if (!passedStageData) {
        passedStageData = {
            video: [],
            templateId: "",
            check1: "",
            check2: "",
            check3: "",
            info_text: "",
            infoid: "",
            button_label: "",
            button_type: "",
            button_stageId: "",
            button_url: ""
        }
    }
    // interface TabPanelProps {
    //     children?: ReactNode;
    //     index: number;
    //     value: number;
    // }
    passedStageData.video = (passedStageData.video) ? passedStageData.video : [];

    const [templateLayout, setTemplateLayout] = useState({
        videoFirst: (passedStageData.templateId === "1") ? true : false,
        textFirst: (passedStageData.templateId === "2") ? true : false
    })
    const [showVideoPreview, setShowVideoPreview] = useState(false);
    const [tempVideosPassed, setTempVideosPassed] = useState<any>(passedStageData.video.filter((obj: { videoType: string }) => {
        return obj.videoType === "2"
    }) || []);
    const [videoSaved, setVideoSaved] = useState(false);
    const [videoPreviewLink, setVideoPreviewLink] = useState('false');
    // const [showRecordingVideo, setShowRecordingVideo] = useState(false);
    let result = passedStageData.video.find((obj: { videoType: string }) => {
        return obj.videoType === "1"
    })
    const [tempVideo, setTempVideo] = useState((passedStageData.video && result) ? result : {});

    passedStageData.video = passedStageData.video.reduce((unique: any, o: any) => {
        if (!unique.some((obj: any) => obj.videoLink === o.videoLink)) {
            unique.push(o);
        }
        return unique;
    }, []);


    const [selectedVideo, setSelectedVideo] = useState({
        id: "",
        name: ""
    });

    const showVideo = (link: string, type: string) => {
        if (link && ((isValidUrl(link) && type === 'all') || type === 'cameraTag')) {
            setVideoPreviewLink(link);
            setShowVideoPreview(true);
        } else {
            showToaster('Please enter a Valid URL.', 'error');
        }
    }
    const deleteVideo = (id: string, videos: string, index: number) => {
        // passedStageData
        // tempVideosPassed
        trackPromise(
            ApiService.deleteById('admin', 'deleteStageVideo', id + '/' + userLocalData.getvalue('clientId')).then(async (response: any) => {
                // console.log(response);
                if (response.data.Success) {
                    if (videos === "passedStageData") {
                        let tempVideo = passedStageData.video;
                        passedStageData.videos = tempVideo.splice(index, 1);
                    }
                    if (videos === "tempVideosPassed") {
                        // let tempVideo = [...tempVideosPassed];
                        // setTempVideosPassed(tempVideo.splice(index, 1));
                        setTempVideosPassed((videos: any) => videos.filter((s: any, i: number) => (i !== index)))
                    }
                    showToaster(response.data.Message, 'success');

                    // tempQuestions.splice(i, 1);
                    // await VideoRecordingFormik.setFieldValue('questions', tempQuestions);
                    // setQuestionsList(tempQuestions);
                    // needToAddOrRemove.current.removeIndex = -1;
                    // needToAddOrRemove.current.removeId = -1;
                } else {
                    showToaster(response.data.Message, 'error');
                }
            })
        );
    }

    const infoSchema = Yup.object().shape({
        hideStage: Yup.bool(),
        showText: Yup.bool(),
        moveStage: Yup.bool().required('Recruiter is required.'),
        info_text: Yup.string(),
        videoLink: Yup.string(),
        infoId: Yup.number(),
        buttonLabel: Yup.string(),
        buttonType: Yup.string(),
        buttonStageId: Yup.string(),
        buttonUrl: Yup.string()

    });
    const infoFormik = useFormik({
        initialValues: {
            hideStage: (passedStageData.check1) ? passedStageData.check1 : false,
            showText: (passedStageData.check2) ? passedStageData.check2 : false,
            moveStage: (passedStageData.check3) ? passedStageData.check3 : false,
            info_text: (passedStageData.info_text) ? passedStageData.info_text : "",
            videoLink: (tempVideo.videoLink) ? tempVideo.videoLink : "",
            infoId: (passedStageData.infoid) ? passedStageData.infoid : 0,
            videoId: (tempVideo.videoId) ? tempVideo.videoId : "0",
            buttonLabel: (passedStageData.button_label) ? passedStageData.button_label : "",
            buttonType: (passedStageData.button_type) ? passedStageData.button_type : 0,
            buttonStageId: (passedStageData.button_stageId) ? passedStageData.button_stageId : 0,
            buttonUrl: (passedStageData.button_url) ? passedStageData.button_url : "",
        },
        // enableReinitialize: true,
        validationSchema: infoSchema,
        onSubmit: (values) => {
            // console.log(values);
            saveInfoForm();
        },
    });
    const saveInfoForm = () => {
        if (infoFormik.values.videoLink) {
            if (isValidUrl(infoFormik.values.videoLink)) {
            } else {
                showToaster('Please enter Valid URL.', 'error');
                return
            }
        }
        let tempData = {
            stageId: Number(stageId),
            recrId: Number(userLocalData.getvalue('recrId')),
            check1: Number(infoFormik.values.hideStage),
            check2: Number(infoFormik.values.showText),
            check3: Number(infoFormik.values.moveStage),
            info_text: infoFormik.values.info_text,
            infoid: Number(infoFormik.values.infoId),
            button_label: infoFormik.values.buttonLabel,
            button_type: !infoFormik.values.moveStage ? 0 : infoFormik.values.buttonType ? Number(infoFormik.values.buttonType) : 0,
            button_stageId: !infoFormik.values.moveStage ? 0 : infoFormik.values.buttonStageId ? Number(infoFormik.values.buttonStageId) : 0,
            button_url: infoFormik.values.buttonUrl,
            templateId: ((infoFormik.values.info_text && infoFormik.values.info_text !== "<p><br></p>") && checkVideoLinkIsPresent()) ? (templateLayout.videoFirst) ? "1" : (templateLayout.textFirst) ? "2" : "0" : "0",
            clientId: userLocalData.getvalue('clientId')
        }
        let videoInfoData = {
            stageId: stageId,
            video_type: 1,
            video_link: infoFormik.values.videoLink,
            videoid: infoFormik.values.videoId,
            clientId: userLocalData.getvalue('clientId')
        }
        // console.log(tempData);

        // buttonType
        // buttonStageId
        // buttonUrl
        trackPromise(
            ApiService.postWithData('admin', 'stageInfo', tempData).then((response: any) => {
                // console.log(response);
                if (response.data.Success) {
                    showToaster(`Info has been ${(passedStageData.infoid !== 0) ? "updated" : "saved"}.`, 'success');
                    let tempVideoLink = (passedStageData.video && passedStageData.video.length && passedStageData.video[0].videoLink) ? passedStageData.video[0].videoLink : "";
                    if (tempVideoLink !== infoFormik.values.videoLink) {
                        ApiService.postWithData('admin', 'stageVideo', videoInfoData).then((response: any) => {
                            // console.log(response);
                            if (response.data.Success) {
                                updated('');
                            } else {
                                showToaster(response.data.Error, 'error');
                            }
                        })
                    }
                } else {
                    showToaster(response.data.Error, 'error');
                }
            })
        );
    }
    // function TabPanel(props: TabPanelProps) {
    //     const { children, value, index, ...other } = props;

    //     return (
    //         <div
    //             role="tabpanel"
    //             hidden={value !== index}
    //             id={`simple-tabpanel-${index}`}
    //             aria-labelledby={`simple-tab-${index}`}
    //             {...other}
    //         >
    //             {value === index && (
    //                 <Box sx={{ p: 3 }}>
    //                     <div>{children}</div>
    //                 </Box>
    //             )}
    //         </div>
    //     );
    // }
    function a11yProps(index: number) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    }


    const [value, setValue] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const videoAlreadyExists = (link: string) => {
        return passedStageData.video.some((el: { video_link: string }) => {
            return el.video_link === link;
        });
    }
    const isValidUrl = (str: string) => {
        // let url;
        // try {
        //     url = new URL(text);
        // } catch (_) {
        //     return false;
        // }
        // return url.protocol === "http:" || url.protocol === "https:";

        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
    const [moveStageList, setMoveStageList] = useState<StageInterface[]>([]);
    // StageInterface[]' is not assignable to parameter of type 'SetStateAction<never[]>

    useEffect(() => {

        let stageIndex = stagesList.findIndex(obj => obj.stageId === stageId);
        if ((stageIndex > -1) && stagesList.length) {
            setMoveStageList(stagesList.slice(stageIndex + 1));
        }

        const handlerForRecruiterRecording = (ev: MessageEvent<{
            recruiterVideoPublished: boolean,
            id: string,
            stageId: string,
            recrId: string,
            mp4_url: string
        }>) => {
            // console.log(ev.data);
            if (ev.data.recruiterVideoPublished) {
                if (stageId === ev.data.stageId && userLocalData.getvalue('recrId') === ev.data.recrId) {
                    if (!videoAlreadyExists(ev.data.mp4_url) && !videoAlreadyExists('https://' + ev.data.mp4_url) && !videoSaved) {
                        setVideoSaved(true);
                        let videoInfoData = {
                            stageId: stageId,
                            video_type: 2,
                            video_link: 'https://' + ev.data.mp4_url,
                            clientId: userLocalData.getvalue('clientId')
                            // videoid: ev.data.id
                        }
                        // passedStageData.video
                        trackPromise(
                            ApiService.postWithData('admin', 'stageVideo', videoInfoData).then((response: any) => {
                                // console.log(response.data);
                                setVideoSaved(false);
                                if (response.data.Success) {
                                    updated();
                                } else {
                                    showToaster(response.data.Error, 'error');
                                }
                            })
                        );
                    }
                }

            }
        };

        window.addEventListener('message', handlerForRecruiterRecording)



        // Don't forget to remove addEventListener
        return () => window.removeEventListener('message', handlerForRecruiterRecording)
    }, []);

    const createCameraTagVideo = () => {
        // window.open(`${(window.location.protocol === 'https:') ? 'https://resume.accuick.com' : 'http://34.208.108.171:41088'}/Pipl/CameraTagRecruiter.html?recrId=${userLocalData.getvalue('recrId')}&stageId=${stageId}`);
        window.parent.postMessage(
            {
                addPipeVideoStageId: true,
                stageId: stageId
            },
            'https://www4.accuick.com'
        );

    }

    const saveInfoVideo = (url: string) => {
        if (url) {
            let videoInfoData = {
                stageId: stageId,
                video_type: 2,
                video_link: 'https://' + url,
                clientId: userLocalData.getvalue('clientId')
            }
            if (!videoAlreadyExists("https://" + url)) {
                // passedStageData.video
                trackPromise(
                    ApiService.postWithData('admin', 'stageVideo', videoInfoData).then((response: any) => {
                        if (response.data.Success) {
                            // updated();
                            // passedStageData.video.push({
                            //     videoId: response.data.VideoId,
                            //     videoLink: "https://" + url,
                            //     videoType: "2"
                            // });

                            setSelectedVideo({ id: "", name: "" });
                            setTempVideosPassed(
                                [
                                    ...tempVideosPassed,
                                    {
                                        videoId: response.data.VideoId,
                                        videoLink: "https://" + url,
                                        videoType: "2"
                                    }
                                ]
                            );
                        } else {
                            showToaster(response.data.Error, 'error');
                        }
                    })
                );
            } else {
                showToaster('Video already saved', 'error');
            }
        }
    }

    const setFormFieldValue = (e: string) => {
        if (infoFormik.values.info_text !== e) {
            infoFormik.setFieldValue('info_text', e);
        }
    }
    const checkVideoLinkIsPresent = () => {
        return isValidUrl(infoFormik.values.videoLink) || passedStageData.video.filter((obj: any) => { return obj.videoLink }).length;
    }



    return <>
        <Card className='info'>
            <CardContent>

                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography variant="h6">Info stage</Typography>
                    <Button
                        color="primary"
                        variant='contained'
                        type="button"
                        className='mt-3 mr-2'
                        size="small"
                        onClick={saveInfoForm}
                        startIcon={<SaveIcon />}
                    >
                        {(infoFormik.values.infoId && infoFormik.values.infoId !== "0") ? "Update" : "Save"}
                    </Button>

                </Grid>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox size='small'
                                name='hideStage'
                                checked={infoFormik.values.hideStage}
                                onChange={infoFormik.handleChange}
                            />
                        }
                        label="Hide this stage from applicant portal,But send email and SMS messages" />
                    <div className='d-none'>
                        <FormControlLabel
                            control={
                                <Checkbox size='small'
                                    name='showText'
                                    checked={infoFormik.values.showText}
                                    onChange={infoFormik.handleChange}
                                />
                            }
                            label="Add Text ,HTML code,Video" />
                    </div>
                    <FormControlLabel
                        control={
                            <Checkbox size='small'
                                name='moveStage'
                                checked={infoFormik.values.moveStage}
                                onChange={infoFormik.handleChange}
                            />
                        }
                        label="Allow applicants to auto move to next stage" />
                </FormGroup>
                <Card className='mt-3'>
                    <CardContent>
                        <Box sx={{ width: '100%' }}
                        // className={`${(infoFormik.values.showText) ? '' : 'd-none'}`}
                        >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="Information Tabs"
                                    variant="fullWidth"
                                >
                                    <Tab
                                        label="Text"
                                        {...a11yProps(0)}
                                        className={`${(value === 0) ? 'activeTab' : ''}`}
                                    />
                                    <Tab
                                        label="Video"
                                        {...a11yProps(1)}
                                        className={`${(value === 1) ? 'activeTab' : ''}`}
                                    />
                                </Tabs>
                            </Box>

                            {/* <TabPanel value={value} index={0}>

                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <div>

                                        
                                    </div>
                                </TabPanel> */}
                            {/* <label>Use video from library</label>

                            <Grid container spacing={2}>
                                <Grid size={8}>
                                    <TextField placeholder="Search video library" size='small' />
                                    <TextField
                                        id="videoLink"
                                        size='small'
                                        name='videoLink'
                                        label="Search video library"
                                        // className='ml-4'
                                        // sx={{ width: 160 }}
                                        fullWidth
                                        value={infoFormik.values.videoLink}
                                        onChange={infoFormik.handleChange}
                                    />
                                </Grid>
                                <Grid size={2}>
                                    <Button variant="outlined" size="small">Preview</Button>
                                </Grid>
                                <Grid size={2}>
                                    <Button variant="contained" size="small">Add</Button>
                                </Grid>
                            </Grid>
                            <Button >
                                Add Image
                            </Button> */}
                        </Box>
                        <div className='mt-2'>
                            <div className={`${(value === 0) ? '' : 'd-none'}`}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="stretch"
                                >
                                    <Editor
                                        toolbarId='info_text'
                                        id='info_text'
                                        handleChange={(e: any) => {
                                            // infoFormik.handleChange(e);
                                            setFormFieldValue(e);
                                            // console.log(e);
                                        }}
                                        editorHtml={infoFormik.values.info_text}
                                        mentions={false}
                                        saveTemplate={false}
                                    />
                                </Grid>
                            </div>
                            <div className={`${(value === 1) ? '' : 'd-none'}`}>

                                <label className='videoLabel'>Use video from youtube or Vimeo</label>
                                <Grid container spacing={2} className='mt-2 mb-5'>
                                    <Grid size={8}>
                                        <TextField
                                            id="videoLink"
                                            size='small'
                                            name='videoLink'
                                            label="Paste or type a link"
                                            fullWidth
                                            value={infoFormik.values.videoLink}
                                            onChange={infoFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={2}>
                                        {
                                            (infoFormik.values.videoLink) ?
                                                <Button variant="outlined" size="small" onClick={() => showVideo(infoFormik.values.videoLink, 'all')}>Preview</Button>
                                                :
                                                null
                                        }
                                    </Grid>
                                </Grid>

                                <label className='videoLabel'>Use video from Library</label>
                                {/* {
                                    passedStageData.video.map(
                                        (v: any, i: number) => {
                                            return (v.videoType === "2") ? <Grid container spacing={2} className='mt-0 pb-2' key={v.videoLink + i}>
                                                <Grid size={8}>
                                                    <TextField
                                                        id="videoLink"
                                                        size='small'
                                                        name='videoLink'
                                                        // label="Paste or type a link"
                                                        fullWidth
                                                        value={v.videoLink}
                                                        // onChange={infoFormik.handleChange}
                                                        disabled
                                                    />
                                                </Grid>
                                                <Grid size={4}>
                                                    {
                                                        (v.videoLink) ?
                                                            <Tooltip title="Preview">
                                                                <IconButton
                                                                    aria-label="Preview"
                                                                    className='editIcon'
                                                                    onClick={() => showVideo(v.videoLink, 'cameraTag')}
                                                                >
                                                                    <RemoveRedEyeOutlinedIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            // <Button variant="outlined" size="small" onClick={() => showVideo(v.videoLink, 'cameraTag')}>Preview</Button>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        (v.videoId) ?
                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    aria-label="Delete"
                                                                    className='editIcon'
                                                                    onClick={() => deleteVideo(v.videoId, 'passedStageData', i)}
                                                                >
                                                                    <DeleteOutlineOutlinedIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            // <Button variant="outlined" size="small" onClick={() => deleteVideo(v.videoId, 'all')}>Preview</Button>
                                                            :
                                                            null
                                                    }
                                                </Grid>
                                            </Grid>
                                                :
                                                null
                                        }
                                    )
                                } */}
                                {
                                    tempVideosPassed.map(
                                        (v: any, i: number) => {
                                            return (v.videoType === "2") ? <Grid container spacing={2} className='mt-2 pb-2' key={v.videoLink + i}>
                                                <Grid size={8}>
                                                    <TextField
                                                        id="videoLink"
                                                        size='small'
                                                        name='videoLink'
                                                        // label="Paste or type a link"
                                                        fullWidth
                                                        value={v.videoLink}
                                                        // onChange={infoFormik.handleChange}
                                                        disabled
                                                    />
                                                </Grid>
                                                {/* 
                                            <IconButton
                                                aria-label="Edit"
                                                className='editIcon'
                                                onClick={() => setShowEditTitle(true)}
                                            >
                                                <EditIcon />
                                            </IconButton> */}
                                                <Grid size={4}>
                                                    {
                                                        (v.videoLink) ?
                                                            <Tooltip title="Preview">
                                                                <IconButton
                                                                    aria-label="Preview"
                                                                    className='editIcon'
                                                                    onClick={() => showVideo(v.videoLink, 'cameraTag')}
                                                                >
                                                                    <RemoveRedEyeOutlinedIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            // <Button variant="outlined" size="small" onClick={() => showVideo(v.videoLink, 'cameraTag')}>Preview</Button>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        (v.videoId) ?
                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    aria-label="Delete"
                                                                    className='editIcon'
                                                                    onClick={() => deleteVideo(v.videoId, 'tempVideosPassed', i)}
                                                                >
                                                                    <DeleteOutlineOutlinedIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                            // <Button variant="outlined" size="small" onClick={() => deleteVideo(v.videoId, 'all')}>Preview</Button>
                                                            :
                                                            null
                                                    }
                                                </Grid>
                                            </Grid>
                                                :
                                                null
                                        }
                                    )
                                }
                                {/* <Grid size={12} key={v.videoLink}><Button href={v.videoLink} target="_blank" className='videoLink pb-2'>https:{v.videoLink}</Button></Grid> : null */}
                                <Grid container spacing={2} className='mt-0'>
                                    <Grid size={8}>

                                        <MUIAutoComplete
                                            id='recordedVideo'
                                            handleChange={(id: any, name: string) => {
                                                setSelectedVideo({ id, name });
                                                saveInfoVideo(id);
                                                // console.log('asdsd');
                                            }}
                                            valuePassed={{
                                                id: selectedVideo.id,
                                                label: selectedVideo.name
                                            }}
                                            isMultiple={false}
                                            textToShow="Select Video from Library"
                                            placeholder="Select Video from Library"
                                            width="100%"
                                            type='recordedVideo'
                                        />
                                        {/* <TextField
                                            size='small'
                                            id='buttonType'
                                            select
                                            onChange={infoFormik.handleChange}
                                            value={infoFormik.values.buttonType}
                                            name={`buttonType`}
                                            className='mb-2'
                                            label='Type'
                                            fullWidth
                                        >
                                            <MenuItem value=""></MenuItem>
                                            {passedStageData.video.map(
                                                (v: any, i: number) => {
                                                    return (v.videoType === "2") ? <MenuItem value={v.videoId} key={v.videoLink}>{v.videoLink}</MenuItem> : null
                                                }
                                            )}
                                        </TextField> */}
                                        {/* {
                                            passedStageData.video.map(
                                                (v: any, i: number) => {
                                                    return (v.videoType === "2") ? <Grid size={12} key={v.videoLink}><Button href={v.videoLink} target="_blank" className='videoLink pb-2'>https:{v.videoLink}</Button></Grid> : null
                                                }
                                            )
                                        } */}
                                    </Grid>
                                    {/* <Grid size={2}>
                                        <Button variant="outlined" size="small" onClick={
                                            () => {
                                                createCameraTagVideo()
                                            }
                                        }>Create Video</Button>
                                    </Grid> */}

                                </Grid>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* <div>
                    <label>Button</label>
                </div> */}
                <Grid
                    container
                    spacing={2}
                    className={`mt-4 ${((infoFormik.values.info_text && infoFormik.values.info_text !== "<p><br></p>") && checkVideoLinkIsPresent()) ? '' : 'd-none'}`}
                >
                    <Grid size={12}>
                        <label className='videoLabel mb-2'>Select Template Layout</label>
                    </Grid>
                    <Grid size={12}>
                        <ToggleButton
                            value="check"
                            selected={templateLayout.videoFirst}
                            color='primary'
                            className={`mr-5 ${(templateLayout.videoFirst) ? 'activeTab' : ''}`}
                            onChange={() => {
                                setTemplateLayout({
                                    videoFirst: !templateLayout.videoFirst,
                                    textFirst: templateLayout.videoFirst
                                });
                            }}
                            size='small'
                        >
                            <Stack className='pr-1'>
                                <PlayCircleIcon />
                                <SortIcon />
                            </Stack>
                            {/* <span className='fw-6'>Video First</span> */}
                        </ToggleButton>

                        <ToggleButton
                            value="check"
                            selected={templateLayout.textFirst}
                            color='primary'
                            className={`mr-4 ${(templateLayout.textFirst) ? 'c-white activeTab' : ''}`}
                            onChange={() => {
                                setTemplateLayout({
                                    videoFirst: templateLayout.textFirst,
                                    textFirst: !templateLayout.textFirst
                                });
                            }}
                            size='small'
                        >
                            <Stack className='pr-1'>
                                <SortIcon />
                                <PlayCircleIcon />
                            </Stack>
                            {/* <span className='fw-6'>Text First</span> */}
                        </ToggleButton>
                    </Grid>
                </Grid>

                <Grid container spacing={2} className={`mt-4 ${(infoFormik.values.moveStage) ? '' : 'd-none'}`}>
                    <Grid size={6}>
                        <TextField
                            id="buttonLabel"
                            size='small'
                            name='buttonLabel'
                            label="Button Label"
                            className='mb-3'
                            // sx={{ width: 160 }}
                            fullWidth
                            value={infoFormik.values.buttonLabel}
                            onChange={infoFormik.handleChange}
                        />
                    </Grid>
                    <Grid size={6}>
                        {
                            (infoFormik.values.buttonLabel) ?
                                <Button size='small' variant='contained' className='ml-3'>{infoFormik.values.buttonLabel}</Button>
                                : null
                        }
                    </Grid>
                </Grid>
                <Grid container spacing={2} className={`${(infoFormik.values.moveStage) ? '' : 'd-none'}`}>
                    <Grid size={6}>
                        <TextField
                            size='small'
                            id='buttonType'
                            select
                            onChange={infoFormik.handleChange}
                            value={infoFormik.values.buttonType}
                            name={`buttonType`}
                            className='mb-2'
                            label='Type'
                            fullWidth
                        >
                            <MenuItem value="0"></MenuItem>
                            <MenuItem value="1">Stage</MenuItem>
                            <MenuItem value="2">URL</MenuItem>
                            {/* {formsList.map(
                                (stage: any, i: number) => {
                                    return <MenuItem value={stage.formId} key={stage.formId}>{stage.formName}</MenuItem>
                                }
                            )} */}
                        </TextField>
                    </Grid>
                    <Grid size={6}>
                        <TextField
                            size='small'
                            id='buttonStageId'
                            select
                            onChange={infoFormik.handleChange}
                            value={infoFormik.values.buttonStageId}
                            name={`buttonStageId`}
                            label='Stage'
                            fullWidth
                            className={`mb-2 ${(infoFormik.values.buttonType === "1") ? '' : 'd-none'}`}
                        >
                            <MenuItem value="0"></MenuItem>
                            {moveStageList.map(
                                (stage: any, i: number) => {
                                    return (stage.stageId !== stageId) ?
                                        <MenuItem value={stage.stageId} key={stage.stageId}>{(stage.title) ? stage.title : stage.name}</MenuItem>
                                        :
                                        null
                                }
                            )}
                        </TextField>
                        <TextField
                            id="buttonUrl"
                            size='small'
                            name='buttonUrl'
                            label="URL"
                            // className='ml-4'
                            // sx={{ width: 160 }}
                            fullWidth
                            value={infoFormik.values.buttonUrl}
                            onChange={infoFormik.handleChange}
                            className={`mb-2 ${(infoFormik.values.buttonType === "2") ? '' : 'd-none'}`}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        <VideoPreview url={videoPreviewLink} open={showVideoPreview}
            closePopup={() => setShowVideoPreview(false)}></VideoPreview>
        {/* <RecruiterVideoRecording
            open={showRecordingVideo}
            stageId={stageId}
            closePopup={() => { setShowRecordingVideo(false); }}
            updated={updated}
        ></RecruiterVideoRecording> */}
    </>
}


export default Info;