import  {React, useEffect, useState } from '../../../../../shared/modules/React';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '../../../../../shared/modules/MaterialImports/Dialog';
import {Divider} from '../../../../../shared/modules/MaterialImports/Divider';
import {Grid, Button} from '../../../../../shared/modules/commonImports';
import CloseIcon from '@mui/icons-material/Close';
// import Accordion from '@mui/material/Accordion';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import FormGroup from '@mui/material/FormGroup';
// import Typography from '@mui/material/Typography';
import {Checkbox} from '../../../../../shared/modules/MaterialImports/FormElements';
import {TextField, FormControlLabel} from '../../../../../shared/modules/MaterialImports/FormInputs';
import {Switch} from '../../../../../shared/modules/MaterialImports/Switch';
// import Stack from '@mui/material/Stack';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { trackPromise } from '../../../../../shared/modules/PromiseTrackter';
import ApiRequests from "../../../../../shared/api/api";
import { useFormik, Yup  } from "../../../../../shared/modules/Formik";


const AddRole = ({ open, closePopup }: {
    open: boolean;
    closePopup: () => void;
}) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [rolesSetting, setRolesSetting] = useState<any[] | never[]>([]);
    const [roleSubSetting, setRoleSubSetting] = useState<any[] | never[]>([]);
    const [roleIntegration, setRoleIntegration] = useState<any[] | never[]>([]);
    const [roleSubIntegration, setRoleSubIntegration] = useState<any[] | never[]>([]);
    const [roleSettingSwitch, setRoleSettingSwitch] = useState<any>([]);
    const [roleIntegrationsSwitch, setRoleIntegrationsSwitch] = useState<any>([]);

    const handleAccordionSummaryChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialAddRoleDetails = {
        "roleName": "",
        "setting": [{
            "settingId": "",
            "settingStatus": "",
        }],
        "subSetting": [{
            "settingId": "",
            "subSettingId": "",
            "settingSubValue": "",

        }],
        "integrations": [{
            "integrationId": "",
            "integrationStatus": "",

        }],
        "subIntegration": [{
            "integrationId": "",
            "subIntegrationId": "",
            "subIntegrationStatus": "",
        }]
    }

    const addRoleSchema = Yup.object().shape({
        roleName: Yup.string(),
        setting: Yup.array().of(Yup.object().shape({
            settingId: Yup.string(),
            settingStatus: Yup.boolean(),
        })
        ),
        subSetting: Yup.array().of(Yup.object().shape({
            settingId: Yup.string(),
            subSettingId: Yup.string(),
            settingSubValue: Yup.string(),
        })
        ),
        integrations: Yup.array().of(Yup.object().shape({
            integrationId: Yup.string(),
            integrationStatus: Yup.boolean(),
        })
        ),
        subIntegration: Yup.array().of(Yup.object().shape({
            integrationId: Yup.string(),
            subIntegrationId: Yup.string(),
            subIntegrationStatus: Yup.boolean(),
        })
        ),
    })

    const addRoleFormik = useFormik({
        initialValues: initialAddRoleDetails,
        validationSchema: addRoleSchema,
        onSubmit: () => {
            submitRole();
        },
    });
    const submitRole = () => {
        setIsFormSubmitted(true);
        console.log(addRoleFormik.values);
    }

    const [filtersExpand, setFiltersExpand] = useState(false);
    const toggleFilers = () => {
        setFiltersExpand(!filtersExpand);
    }


    const loadMasterSettings = () => {
        trackPromise(
            ApiRequests.getCall(216, 'QADemoCurately/rolesSetting')
                .then((response: any) => {
                    //   console.log(response.data);
                    setRolesSetting(response.data.rolesSetting);
                }
                )
        )
    };

    const loadMasterIntegrations = () => {
        trackPromise(
            ApiRequests.getCall(216, 'QADemoCurately/rolesIntegrations')
                .then((response: any) => {
                    //   console.log(response.data);
                    setRoleIntegration(response.data.rolesIntegrations);
                }
                )
        )
    }

    const loadMasterSubSettings = () => {
        trackPromise(
            ApiRequests.getCall(216, 'QADemoCurately/roleSubSettings/0')
                .then((response: any) => {
                    //   console.log(response.data);
                    setRoleSubSetting(response.data.roleSubSettings);
                }
                )
        )
    }

    const loadMasterSubIntegrations = () => {
        trackPromise(
            ApiRequests.getCall(216, 'QADemoCurately/roleSubIntegration/0')
                .then((response: any) => {
                    //   console.log(response.data);
                    setRoleSubIntegration(response.data.roleSubIntegration);
                }
                )
        )
    }

    useEffect(() => {
        loadMasterSettings();
        loadMasterIntegrations();
        loadMasterSubSettings();
        loadMasterSubIntegrations();
    }, []);

    const handleSubSettings = (settingid: any, index: any) => {
        console.log(settingid + " -- " + index);
        trackPromise(
            ApiRequests.getCall(216, `QADemoCurately/roleSubSettings/${settingid}`)
                .then((response: any) => {
                    // console.log("innnr " + response.data.roleSubSettings);
                    //    setRoleSubSetting(response.data.roleSubSettings);

                }
                )
        )
    }

    const renderSettings = (settingid: any, filter: any, index: number, compare: any, subsettingid: any) => {
        // console.log(rvalue);
        const rvalue1 = "";// rvalue.split(",");

        switch (filter) {
            case 'drodown1':
                return (
                    <Grid size={11} className='pr-2 mt-2 mb-2'>
                        {compare}
                        <TextField fullWidth className='mt-1'
                            size="small"
                            variant="outlined"
                            select
                            // label={compare}
                            id={`${subsettingid}`}
                            name={`${subsettingid}`}
                            //  value={addRoleFormik.values.admin[i].user}
                            onChange={(e) => handleRoleSubValueChange(e, settingid)}
                        >
                            <MenuItem value="0">No Access</MenuItem>
                            <MenuItem value="5">View and Edit</MenuItem>
                            <MenuItem value="6">Edit and Delete</MenuItem>

                        </TextField>

                    </Grid>
                ); case 'dropdown1':
                return (
                    <Grid size={11} className='pr-2 mt-2 mb-2'>
                        {compare}
                        <TextField fullWidth className='mt-1'
                            size="small"
                            variant="outlined"
                            select
                            // label={compare}
                            id={`${subsettingid}`}
                            name={`${subsettingid}`}
                            //  value={addRoleFormik.values.admin[i].user}
                            onChange={(e) => handleRoleSubValueChange(e, settingid)}
                        >
                            <MenuItem value="0">No Access</MenuItem>
                            <MenuItem value="5">View and Edit</MenuItem>
                            <MenuItem value="6">Edit and Delete</MenuItem>

                        </TextField>

                    </Grid>
                ); case 'dropdown2':
                return (
                    <Grid size={11} className='pr-2 mt-2 mb-2'>
                        {compare}
                        <TextField fullWidth className='mt-1'
                            size="small"
                            variant="outlined"
                            select
                            //   label={compare}
                            id={`${subsettingid}`}
                            name={`${subsettingid}`}
                            //  value={addRoleFormik.values.admin[i].user}
                            onChange={(e) => handleRoleSubValueChange(e, settingid)}
                        >
                            <MenuItem value="0">No Access</MenuItem>
                            <MenuItem value="1">Access</MenuItem>
                        </TextField>

                    </Grid>
                ); case 'dropdown3':
                return (
                    <Grid size={11} className='pr-2 mt-2 mb-2'>
                        {compare}
                        <TextField fullWidth className='mt-1'
                            size="small"
                            variant="outlined"
                            select
                            //   label={compare}
                            id={`${subsettingid}`}
                            name={`${subsettingid}`}
                            //  value={addRoleFormik.values.admin[i].user}
                            onChange={(e) => handleRoleSubValueChange(e, settingid)}
                        >
                            <MenuItem value="0">No Access</MenuItem>
                            <MenuItem value="2">View Only</MenuItem>
                            <MenuItem value="3">Create and Edit</MenuItem>
                            <MenuItem value="4">Create, Edit and Delete</MenuItem>

                        </TextField>

                    </Grid>
                ); case 'dropdown4':
                return (
                    <Grid size={11} className='pr-2 mt-2 mb-2'>
                        {compare}
                        <TextField fullWidth className='mt-1'
                            size="small"
                            variant="outlined"
                            select
                            //   label={compare}
                            id={`${subsettingid}`}
                            name={`${subsettingid}`}
                            //  value={addRoleFormik.values.admin[i].user}
                            onChange={(e) => handleRoleSubValueChange(e, settingid)}
                        >
                            <MenuItem value="0">No Access</MenuItem>
                            <MenuItem value="2">View Only</MenuItem>
                            <MenuItem value="3">Create and Edit</MenuItem>
                        </TextField>

                    </Grid>

                );
            default:
                return null;
        }
    };


    const handleIntegrationSwitchChange = (e: any, kindex: any) => {
        const { checked, name } = e.target;
        // let newfield = { integrationId: name, integrationStatus: checked, subSetting: [] }
        roleIntegrationsSwitch[kindex] = checked;
        ///console.log(roleIntegrationsSwitch[kindex]+ " --- "+kindex+ " --- "+checked)
        let rValue = true; let cIndex = addRoleFormik.values.integrations.length;
        addRoleFormik.values.integrations && addRoleFormik.values.integrations.map((item: any, index: any) => {
            if (addRoleFormik.values.integrations[index].integrationId === name) {
                addRoleFormik.setFieldValue(`integrations[${index}].integrationStatus`, checked);
                rValue = false;
            }
        })

        if (rValue) {
            addRoleFormik.setFieldValue(`integrations[${cIndex}].integrationId`, name);
            addRoleFormik.setFieldValue(`integrations[${cIndex}].integrationStatus`, checked);
        }
    }


    const handleIntegrationSubValueChange = (e: any, integrationId: any) => {
        const { checked, value, name } = e.target;

        let rValue = true; let cIndex = addRoleFormik.values.subIntegration.length;
        addRoleFormik.values.subIntegration && addRoleFormik.values.subIntegration.map((item: any, index: any) => {
            if (addRoleFormik.values.subIntegration[index].subIntegrationId === name) {
                addRoleFormik.setFieldValue(`subIntegration[${index}].subIntegrationStatus`, checked);
                rValue = false;
            }
        })

        if (rValue) {
            addRoleFormik.setFieldValue(`subIntegration[${cIndex}].subIntegrationId`, name);
            addRoleFormik.setFieldValue(`subIntegration[${cIndex}].integrationId`, integrationId);
            addRoleFormik.setFieldValue(`subIntegration[${cIndex}].subIntegrationStatus`, checked);
        }

    }


    const handleRoleSubValueChange = (e: any, settingId: any) => {
        const { value, name } = e.target;

        let rValue = true; let cIndex = addRoleFormik.values.subSetting.length;
        addRoleFormik.values.subSetting && addRoleFormik.values.subSetting.map((item: any, index: any) => {
            if (addRoleFormik.values.subSetting[index].subSettingId === name) {
                addRoleFormik.setFieldValue(`subSetting[${index}].settingStatus`, value);
                rValue = false;
            }
        })

        if (rValue) {
            addRoleFormik.setFieldValue(`subSetting[${cIndex}].subSettingId`, name);
            addRoleFormik.setFieldValue(`subSetting[${cIndex}].settingId`, settingId);
            addRoleFormik.setFieldValue(`subSetting[${cIndex}].settingSubValue`, value);
        }

    }


    const handleRoleSwitchChange = (e: any, kindex: any) => {
        const { checked, name } = e.target;

        roleSettingSwitch[kindex] = checked;

        let rValue = true; let cIndex = addRoleFormik.values.setting.length;
        addRoleFormik.values.setting && addRoleFormik.values.setting.map((item: any, index: any) => {
            if (addRoleFormik.values.setting[index].settingId === name) {
                addRoleFormik.setFieldValue(`setting[${index}].settingStatus`, checked);
                rValue = false;
            }
        })

        if (rValue) {
            addRoleFormik.setFieldValue(`setting[${cIndex}].settingId`, name);
            addRoleFormik.setFieldValue(`setting[${cIndex}].settingStatus`, checked);
        }

    };


    return (
        <div>
            <Dialog
                maxWidth={'md'}
                open={open} fullWidth={true} className='AddUserModal customInputs'>
                <DialogTitle className='py-2'>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <span style={{ fontWeight: 'bold' }}>Add Role</span>
                        <span onClick={closePopup}>
                            <CloseIcon />
                        </span>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent className='pl-5'>
                    <div className='pl-5'>
                        <Grid container spacing={2} >
                            <Grid size={6} className='pr-2 mb-2'>
                                <label>Role Name</label>
                                <TextField fullWidth className='mt-1'
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    id="roleName"
                                    name="roleName"
                                    value={addRoleFormik.values.roleName}
                                    onChange={addRoleFormik.handleChange}
                                ></TextField>
                            </Grid>
                        </Grid>
                        <Grid container direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start">
                            {rolesSetting && rolesSetting.length && rolesSetting.map((item, idx) => (
                                <Grid container sx={{ display: 'flex', alignItems: 'center', mt: 2 }} key={idx}>
                                    <Grid size={12}>
                                        <FormControlLabel control={<Switch onChange={(e) => handleRoleSwitchChange(e, idx)} name={`${item.settingId}`} />}
                                            label={item.name}
                                        />
                                    </Grid>
                                    <Grid container direction="row" key={item.settingId + idx} className={`block-inner ${roleSettingSwitch[idx] ? "d-block" : "d-none"} `}  >
                                        <Grid container direction="row" sx={{ mb: 2 }}>
                                            {roleSubSetting && roleSubSetting.length && roleSubSetting.map((subitem: any, isx: any) => (
                                                (subitem.settingId === item.settingId) &&
                                                <Grid size={4} key={subitem.subSettingId.isx} >
                                                    {renderSettings(subitem.settingId, subitem.type, isx, subitem.name, subitem.subSettingId)}

                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}

                            <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Grid size={12} className='pr-2 mb-2'>
                                    <h3 style={{ fontWeight: 'bold' }}>Integrations</h3>
                                </Grid>
                            </Grid>
                            {roleIntegration && roleIntegration.length && roleIntegration.map((item, idx) => (
                                <Grid container size={12} key={idx}>
                                    <FormControlLabel control={<Switch onChange={(e) => handleIntegrationSwitchChange(e, idx)} name={`${item.settingId}`} />}
                                        label={item.name}
                                    />
                                    <Grid container direction="row" key={item.settingId + idx} className={`block-inner ${roleIntegrationsSwitch[idx] ? "d-block" : "d-none"} `}  >
                                        <Grid container direction="row" sx={{ mb: 2 }}>
                                            {roleSubIntegration && roleSubIntegration.length && roleSubIntegration.map((subitem: any, isx: any) => (
                                                (item.settingId === subitem.integrationId) &&
                                                <Grid size={6} key={subitem.subIntegrationId.isx} >
                                                    <FormControlLabel key={isx}
                                                        control={<Checkbox name={`${subitem.subIntegrationId}`}
                                                            onChange={(e) => handleIntegrationSubValueChange(e, subitem.integrationId)} />}
                                                        label={subitem.name} id={`${subitem.subIntegrationId}`}
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ))}

                        </Grid>

                    </div>
                </DialogContent >
                <DialogActions>
                    <Button color="primary" variant="contained" type='submit' onClick={submitRole}>Save</Button>
                </DialogActions>

            </Dialog >
        </div >
    )
}

export default AddRole