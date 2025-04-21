import  {React, useEffect } from '../../../../../../shared/modules/React';
import {Stack} from '../../../../../../shared/modules/MaterialImports/Stack';
import {TextField, FormControlLabel, FormControl} from '../../../../../../shared/modules/MaterialImports/FormInputs';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
import {Checkbox, Select} from '../../../../../../shared/modules/MaterialImports/FormElements';
import {Chip} from '../../../../../../shared/modules/MaterialImports/Chip';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';
import {FormGroup} from '../../../../../../shared/modules/MaterialImports/FormGroup';
import Icon from '@mui/material/Icon';
import {Switch} from '../../../../../../shared/modules/MaterialImports/Switch';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import SaveIcon from '@mui/icons-material/Save';

import WifiIcon from '@mui/icons-material/Wifi';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import './SystemChecker.scss';
import { useFormik,  Yup } from '../../../../../../shared/modules/Formik';
import { showToaster, InputAdornment, InputLabel, Button } from '../../../../../../shared/modules/commonImports';
import ApiService from '../../../../../../shared/api/api';
import { userLocalData } from '../../../../../../shared/services/userData';

const validationSchema = Yup.object({
    name: Yup.string(),
    osChecked: Yup.boolean(),
    osValue: Yup.array(),
    displayResolution: Yup.string(),
    cpuSpeed: Yup.number(),
    ram: Yup.number(),
    freeSpace: Yup.number(),
    internetConnection: Yup.boolean(),
    latency: Yup.number(),
    downloadSpeed: Yup.number(),
    uploadSpeed: Yup.number(),
    browser: Yup.array()
});
const SystemChecker = ({ workflowName, stageId, passedStageData = {} }: { workflowName: string, stageId: string, passedStageData: any }) => {
    const [reqId, setReqId] = React.useState((passedStageData.systemCheckerCode) ? Number(passedStageData.systemCheckerCode) : 0);

    const operatingSystemsList: string[] = ['Win7', 'Win10', 'Win11', 'Linux', 'macOS-HighSierra(10.13)'];

    const browserList: string[] = ['Chrome', 'Firefox', 'Edge', 'Safari', 'Opera', 'Internet Explorer'];


    const formik = useFormik({
        initialValues: {
            name: 'workflow - ' + workflowName + ' - ' + stageId,
            osChecked: false,
            osValue: [],
            displayResolution: '',
            displayResolutionChecked: false,
            cpuSpeed: 0,
            cpuSpeedChecked: false,
            cpuScores: 0,
            cpuScoresChecked: false,
            ram: 0,
            ramChecked: false,
            freeSpace: 0,
            freeSpaceChecked: false,
            internetConnection: false,
            connectionType: false,
            wifiChecked: false,
            ethernetChecked: false,
            latency: 0,
            latencyChecked: false,
            downloadSpeed: '',
            downloadSpeedChecked: false,
            uploadSpeed: 0,
            uploadSpeedChecked: false,
            browser: [],
            browserChecked: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log('Form values:', values);
        },
    });

    const onSaveChanges = (e: any) => {
        e.preventDefault();
        console.log(formik.values.name === "")
        if (formik.values.name === "") {
            showToaster("Name is required", "error");
            return;
        }

        if (formik.values.osChecked === false &&
            formik.values.displayResolutionChecked === false &&
            formik.values.cpuSpeedChecked === false &&
            formik.values.cpuScoresChecked === false &&
            formik.values.ramChecked === false &&
            formik.values.freeSpaceChecked === false &&
            formik.values.internetConnection === false &&
            formik.values.connectionType === false &&
            formik.values.latencyChecked === false &&
            formik.values.downloadSpeedChecked === false &&
            formik.values.uploadSpeedChecked === false &&
            formik.values.browserChecked === false) {
            showToaster("Please select at least one checkbos", "error")
            return;
        }

        const newReqobj = {
            'company_id': '10074',
            "customer": formik.values.name,
            "email_address": "",
            "operating_system": formik.values.osValue.toString(),
            "display_res": formik.values.displayResolution,
            "cpu_speed": formik.values.cpuSpeed,
            "cpu_cores": formik.values.cpuScores,
            "ram": formik.values.ram,
            "free_space": formik.values.freeSpace,
            "internet_connection": formik.values.internetConnection ? 1 : 0,
            "connection_type": getConnectionType(),
            "latency": formik.values.latency,
            "download_speed": formik.values.downloadSpeed,
            "upload_speed": formik.values.uploadSpeed,
            "web_browser": formik.values.browser.toString(),
            "reqId": reqId,
            "selectedColumns": getSelectedColums(),
            clientId: userLocalData.getvalue('clientId')
        }

        ApiService.postWithData('csr', 'saveoreditrequirements', newReqobj).then((response: any) => {
            if (response.data.Success === true) {
                // showToaster(response.data.Message, "success");
                if (reqId) {
                    showToaster(`Details have been Updated Successfully.`, 'success');
                } else {
                    if (Number(response.data.reqId)) {
                        let tempData = {
                            stageId: stageId,
                            recrId: userLocalData.getvalue('recrId'),
                            systemCheckerCode: Number(response.data.reqId),
                            clientId: userLocalData.getvalue('clientId')
                        }
                        // console.log(tempData);

                        ApiService.postWithParams(193, 'Curately/Workflow/workflow_systemchecker_save.jsp', tempData).then((response1: any) => {
                            // console.log(response1);
                            if (response1.data.message === "Success") {
                                showToaster(`Details have been Saved Successfully.`, 'success');
                                setReqId(Number(response.data.reqId));

                            } else {
                                showToaster(response1.data.Error, 'error');
                            }
                        })
                    }
                }
            } else {
                showToaster(response.data.Message, 'error');
            }
        })
    }

    const getSelectedColums = () => {

        let selectedColumns: string[] = [];

        if (formik.values.osChecked === true) selectedColumns.push('operating_system');
        if (formik.values.displayResolutionChecked === true) selectedColumns.push('display_res');
        if (formik.values.cpuSpeedChecked === true) selectedColumns.push('cpu_speed');
        if (formik.values.cpuScoresChecked === true) selectedColumns.push('cpu_cores');
        if (formik.values.ramChecked === true) selectedColumns.push('ram');
        if (formik.values.freeSpaceChecked === true) selectedColumns.push('free_space');
        if (formik.values.internetConnection === true) selectedColumns.push('internet_connection');
        if (formik.values.connectionType === true) selectedColumns.push('connection_type');
        if (formik.values.latencyChecked === true) selectedColumns.push('latency');
        if (formik.values.downloadSpeedChecked === true) selectedColumns.push('download_speed');
        if (formik.values.uploadSpeedChecked === true) selectedColumns.push('upload_speed');
        if (formik.values.browserChecked === true) selectedColumns.push('web_browser');

        return selectedColumns.toString();
    }

    const getConnectionType = () => {
        let connection = [];
        if (formik.values.wifiChecked === true) connection.push('Wifi');
        if (formik.values.ethernetChecked === true) connection.push('Ethernet');
        return connection.join('/');
    }

    const loadRequirementsList = () => {
        ApiService.getById('csr', 'requirementslist', 10074).then((response: any) => {
            // console.log(response);

            let criteriaData = response.data.requirementsList.find((obj: any) => {
                return obj.reqId === reqId
            });
            if (criteriaData && criteriaData.reqId) {
                if (criteriaData.connection_type.includes("Wifi")) formik.setFieldValue("wifiChecked", true)
                if (criteriaData.connection_type.includes("Ethernet")) formik.setFieldValue("ethernetChecked", true)
                if (criteriaData.cpu_cores > 0) formik.setFieldValue("cpuScores", criteriaData.cpu_cores);
                if (criteriaData.cpu_speed > 0) formik.setFieldValue("cpuSpeed", criteriaData.cpu_speed);
                if (criteriaData.customer !== "") formik.setFieldValue("name", criteriaData.customer);
                if (criteriaData.display_res !== "") formik.setFieldValue("displayResolution", criteriaData.display_res);
                if (criteriaData.download_speed !== "") formik.setFieldValue("downloadSpeed", criteriaData.download_speed);
                if (criteriaData.free_space !== "") formik.setFieldValue("freeSpace", criteriaData.free_space);
                if (criteriaData.internet_connection !== "") formik.setFieldValue("internetConnection", criteriaData.internet_connection === 1 ? true : false);
                if (criteriaData.latency !== "") formik.setFieldValue("latency", criteriaData.latency);
                if (criteriaData.operating_system !== "") {
                    let arry = criteriaData.operating_system.split(',');
                    formik.values.osValue = arry;
                }
                if (criteriaData.ram !== "") formik.setFieldValue("ram", criteriaData.ram);
                if (criteriaData.upload_speed > 0) formik.setFieldValue("uploadSpeed", criteriaData.upload_speed);
                if (criteriaData.web_browser !== "") {
                    let arry = criteriaData.web_browser.split(',');
                    formik.values.browser = arry;
                }
                if (criteriaData.selectedColumns !== "") {
                    let checkedFields = criteriaData.selectedColumns.split(',');
                    // console.log(checkedFields)
                    if (checkedFields.indexOf('operating_system') !== -1) formik.values.osChecked = true;
                    if (checkedFields.indexOf('display_res') !== -1) formik.values.displayResolutionChecked = true;
                    if (checkedFields.indexOf('cpu_speed') !== -1) formik.values.cpuSpeedChecked = true;
                    if (checkedFields.indexOf('cpu_cores') !== -1) formik.values.cpuScoresChecked = true;
                    if (checkedFields.indexOf('ram') !== -1) formik.values.ramChecked = true;
                    if (checkedFields.indexOf('free_space') !== -1) formik.values.freeSpaceChecked = true;
                    if (checkedFields.indexOf('internet_connection') !== -1) formik.values.internetConnection = true;
                    if (checkedFields.indexOf('connection_type') !== -1) formik.values.connectionType = true;
                    if (checkedFields.indexOf('latency') !== -1) formik.values.latencyChecked = true;
                    if (checkedFields.indexOf('download_speed') !== -1) formik.values.downloadSpeedChecked = true;
                    if (checkedFields.indexOf('upload_speed') !== -1) formik.values.uploadSpeedChecked = true;
                    if (checkedFields.indexOf('web_browser') !== -1) formik.values.browserChecked = true;
                }
            }

        })
    }

    useEffect(() => {
        if (reqId) {
            loadRequirementsList();
        }
    }, []);

    return (
        <Box sx={{ padding: "20px", borderRadius: "4px", boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.17) !important' }}>
            <div>
                <form onSubmit={(e: any) => onSaveChanges(e)}>
                    <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
                        <Stack>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                variant="outlined"
                                size="small"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                className='d-none'
                            />
                        </Stack>
                        {/* <Stack>
                        <Button variant="outlined" size="small" color="error" startIcon={<DeleteIcon />}>
                            Delete criteria
                        </Button>
                    </Stack> */}
                        <Stack>
                            <Button variant="contained" size="small" color="primary" type="submit" startIcon={<SaveIcon />}>

                                {reqId ? 'Update' : 'Save'} changes
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={4} paddingTop={3}>
                        <Stack spacing={2} className='criteria-form'>
                            <Typography variant='h5'>System criteria (Minimum)</Typography>
                            <Stack direction="row" alignItems="center" spacing={3} >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            name="osChecked"
                                            size="small"

                                            checked={formik.values.osChecked}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Operating System"
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel size="small" htmlFor="os-multi-select">Select Os</InputLabel>
                                        <Select
                                            multiple
                                            sx={{ height: '40px', width: '200px' }}
                                            size="small"
                                            name="osValue"
                                            value={formik.values.osValue}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            disabled={!formik.values.osChecked}
                                            id="os-multi-select"
                                            label="Select Os"


                                            renderValue={(selected) => (
                                                <div>
                                                    {(selected as string[]).map((value) => (

                                                        <Chip key={value} label={value} onDelete={() => {
                                                            formik.setFieldValue("osValue", formik.values.osValue.filter((v: string) => v !== value));
                                                        }} />

                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {
                                                operatingSystemsList.map((val) => {
                                                    return <MenuItem key={val} value={val}>{val}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>

                                </Stack>
                            </Stack>


                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={<Checkbox name="displayResolutionChecked" size="small" color="primary"
                                        checked={formik.values.displayResolutionChecked}
                                        onChange={formik.handleChange}

                                    />}
                                    label={<Typography variant="body1">Display Resolution</Typography>}
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2}>
                                    <FormControl fullWidth variant="outlined">

                                        <InputLabel size="small" id="displayResolution-select-label">Select DR</InputLabel>
                                        <Select
                                            labelId="displayResolution-select-label"
                                            id="dr"
                                            name="displayResolution"
                                            size="small"
                                            sx={{ height: '40px', width: '200px' }}
                                            label="Select DR"


                                            error={formik.touched.browser && Boolean(formik.errors.browser)}
                                            value={formik.values.displayResolution}
                                            onChange={formik.handleChange}
                                            disabled={!formik.values.displayResolutionChecked}
                                        >
                                            <MenuItem value="1024x768">1024x768</MenuItem>
                                            <MenuItem value="1366 x 768">1366 x 768</MenuItem>
                                            <MenuItem value="1600 x 900">1600 x 900</MenuItem>
                                            <MenuItem value="1920 x 1080">1920 x 1080</MenuItem>
                                            <MenuItem value="1920 x 1200">1920 x 1200</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={<Checkbox color="primary" size="small"
                                        name="cpuSpeedChecked"
                                        checked={formik.values.cpuSpeedChecked}
                                        onChange={formik.handleChange}

                                    />}
                                    label="CPU Speed"
                                    className='custom-label'
                                />


                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        fullWidth
                                        placeholder="Speed"
                                        variant="outlined"
                                        name="cpuSpeed"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.cpuSpeed}
                                        error={formik.touched.cpuSpeed && !!formik.errors.cpuSpeed}
                                        helperText={formik.touched.cpuSpeed && formik.errors.cpuSpeed}
                                        disabled={!formik.values.cpuSpeedChecked}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Ms</InputAdornment>
                                        }}
                                        inputProps={{
                                            minLength: 1,
                                            maxLength: 4
                                        }}
                                    />



                                </Stack>

                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            name="cpuScoresChecked"


                                            checked={formik.values.cpuScoresChecked}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="CPU Cores"
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        fullWidth
                                        placeholder="Score"
                                        variant="outlined"
                                        name="cpuScores"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.cpuScores}
                                        error={formik.touched.cpuScores && !!formik.errors.cpuScores}
                                        helperText={formik.touched.cpuScores && formik.errors.cpuScores}
                                        disabled={!formik.values.cpuScoresChecked}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Ms</InputAdornment>
                                        }}
                                        inputProps={{
                                            minLength: 1,
                                            maxLength: 4
                                        }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            name="ramChecked"
                                            checked={formik.values.ramChecked}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="RAM"
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        placeholder="RAM"
                                        fullWidth
                                        variant="outlined"
                                        name="ram"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.ram}
                                        error={formik.touched.ram && !!formik.errors.ram}
                                        helperText={formik.touched.ram && formik.errors.ram}
                                        disabled={!formik.values.ramChecked}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Ms</InputAdornment>
                                        }}
                                        inputProps={{
                                            minLength: 1,
                                            maxLength: 4
                                        }}
                                    />
                                </Stack>

                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            name="freeSpaceChecked"
                                            checked={formik.values.freeSpaceChecked}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Free Space"
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        placeholder="Free Space"
                                        fullWidth
                                        variant="outlined"
                                        name="freeSpace"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.freeSpace}
                                        error={formik.touched.freeSpace && !!formik.errors.freeSpace}
                                        helperText={formik.touched.freeSpace && formik.errors.freeSpace}
                                        disabled={!formik.values.freeSpaceChecked}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Ms</InputAdornment>
                                        }}
                                        inputProps={{
                                            minLength: 1,
                                            maxLength: 4
                                        }}
                                    />
                                </Stack>
                            </Stack>





                        </Stack>

                        <Stack spacing={2} className='criteria-form'>
                            <Typography variant='h5'>Browser/Internet criteria(Minimum)</Typography>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            name="internetConnection"
                                            checked={formik.values.internetConnection}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Internet Connection"
                                    className='custom-label'
                                />

                                <Stack direction="row" spacing={2}>
                                    <Switch
                                        name='internetConnection'
                                        checked={formik.values.internetConnection}
                                        onChange={formik.handleChange}
                                        color="primary"
                                        disabled={!formik.values.internetConnection}
                                    />
                                </Stack>


                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            name="connectionType"
                                            checked={formik.values.connectionType}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Connection Type"
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2}>
                                    <FormControl component="fieldset">
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox

                                                        icon={<Icon ><WifiIcon /></Icon>}
                                                        checkedIcon={<Icon ><WifiIcon /></Icon>}
                                                        name="wifiChecked"
                                                        checked={formik.values.wifiChecked}
                                                        onChange={formik.handleChange}
                                                        disabled={!formik.values.connectionType}
                                                    />
                                                }
                                                label="Wifi"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        icon={<Icon ><SettingsEthernetIcon /></Icon>}
                                                        checkedIcon={<Icon ><SettingsEthernetIcon /></Icon>}
                                                        name="ethernetChecked"
                                                        checked={formik.values.ethernetChecked}
                                                        onChange={formik.handleChange}
                                                        disabled={!formik.values.connectionType}
                                                    />
                                                }
                                                label="Ethernet"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Stack>

                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            name="latencyChecked"
                                            checked={formik.values.latencyChecked}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Latency"
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        fullWidth
                                        placeholder="Latency"
                                        variant="outlined"
                                        name="latency"
                                        size="small"
                                        onChange={formik.handleChange}
                                        value={formik.values.latency}
                                        error={formik.touched.latency && !!formik.errors.latency}
                                        helperText={formik.touched.latency && formik.errors.latency}
                                        disabled={!formik.values.latencyChecked}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Ms</InputAdornment>
                                        }}
                                        inputProps={{
                                            minLength: 1,
                                            maxLength: 4
                                        }}
                                    />
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            name="downloadSpeedChecked"
                                            checked={formik.values.downloadSpeedChecked}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Download Speed"
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        placeholder="Download Speed"
                                        name="downloadSpeed"
                                        size="small"
                                        value={formik.values.downloadSpeed}
                                        onChange={formik.handleChange}
                                        disabled={!formik.values.downloadSpeedChecked}
                                        error={formik.touched.downloadSpeed && Boolean(formik.errors.downloadSpeed)}
                                        helperText={formik.touched.downloadSpeed && formik.errors.downloadSpeed}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Mbps</InputAdornment>
                                        }}
                                        inputProps={{
                                            minLength: 1,
                                            maxLength: 4,
                                            'aria-label': 'Mbps'
                                        }}
                                    />

                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            name="uploadSpeedChecked"
                                            checked={formik.values.uploadSpeedChecked}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Upload Speed"
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        placeholder="Upload Speed"
                                        name="uploadSpeed"
                                        value={formik.values.uploadSpeed}
                                        onChange={formik.handleChange}
                                        disabled={!formik.values.uploadSpeedChecked}
                                        error={formik.touched.uploadSpeed && Boolean(formik.errors.uploadSpeed)}
                                        helperText={formik.touched.uploadSpeed && formik.errors.uploadSpeed}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Mbps</InputAdornment>
                                        }}
                                        inputProps={{
                                            minLength: 1,
                                            maxLength: 4,

                                        }}
                                    />

                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            color="primary"
                                            size="small"
                                            name="browserChecked"
                                            checked={formik.values.browserChecked}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                    label="Web Browser"
                                    className='custom-label'
                                />
                                <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                                    <FormControl variant="outlined" fullWidth>
                                        <InputLabel size="small" htmlFor="web-browser">Select Web Browser</InputLabel>
                                        <Select
                                            multiple
                                            displayEmpty
                                            id="web-browser"
                                            name="browser"
                                            size="small"
                                            sx={{ height: '40px' }}
                                            fullWidth
                                            value={formik.values.browser}
                                            disabled={!formik.values.browserChecked}
                                            onChange={formik.handleChange}
                                            error={formik.touched.browser && Boolean(formik.errors.browser)}
                                            label="Select Web Browser"
                                            renderValue={(selected) => (
                                                <div>
                                                    {(selected as string[]).map((value) => (

                                                        <Chip key={value} label={value} onDelete={() => {
                                                            formik.setFieldValue("browser", formik.values.browser.filter((v: string) => v !== value));
                                                        }} />

                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {
                                                browserList.map((val) => {
                                                    return <MenuItem key={val} value={val}>{val}</MenuItem>
                                                })
                                            }
                                        </Select>
                                        {formik.touched.browser && formik.errors.browser ? (
                                            <div>{formik.errors.browser}</div>
                                        ) : null}
                                    </FormControl>

                                </Stack>
                            </Stack>



                        </Stack>

                    </Stack>



                </form>
            </div>
        </Box>
    )
}

export default SystemChecker;
