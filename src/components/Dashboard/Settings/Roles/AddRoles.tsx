import { React, useEffect, useState, useCallback } from '../../../../shared/modules/React';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '../../../../shared/modules/MaterialImports/Dialog';
import { Button, IconButton, Grid } from '../../../../shared/modules/commonImports';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
// import { Select } from '../../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel, TextField } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Checkbox } from '../../../../shared/modules/MaterialImports/FormElements';
import { Switch } from '../../../../shared/modules/MaterialImports/Switch';
// import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import './AddRoles.scss';

import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import { AxiosResponse } from 'axios';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { Card, CardContent } from '../../../../shared/modules/MaterialImports/Card';
import ErrorMessage from '../../../shared/Error/ErrorMessage';
import ApiService from '../../../../shared/api/api';
import { RoleDataInterface, RoleData } from './Roles';
import { userLocalData } from '../../../../shared/services/userData';
import { Loader } from '../../../shared/Loader/Loader';
import { debounce } from "lodash";


interface AddRoleDialogProps {
    open: boolean;
    handleClose: () => void;
    handleAdd: () => void;
    roleData: RoleDataInterface;
}

const AddRole: React.FC<AddRoleDialogProps> = ({ open, handleClose, handleAdd, roleData }) => {

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [isSettingsLoaded, setIsSettingsLoaded] = useState(false);

    // roleData ? {
    //     roleId: roleData?.roleId || '',
    //     roleName: roleData?.roleName || '',
    //     permissions: Array.isArray(roleData?.permissions) ? roleData.permissions : [],
    //     type: roleData?.type || '',
    //     users: roleData?.users,
    //     createdOn: roleData?.createdOn,
    // } : 
    const initialAddRoleDetails = roleData && roleData.roleId ? roleData : { ...RoleData };

    const addRoleSchema = Yup.object().shape({
        roleName: Yup.string().required('Role Name is required.'),
        roleId: Yup.string(),
        setting: Yup.array().of(
            Yup.object().shape({
                settingId: Yup.number(),
                name: Yup.string(),
                isEnabled: Yup.boolean(),
                subSettings: Yup.array().of(
                    Yup.object().shape({
                        autoId: Yup.number(),
                        settingId: Yup.number(),
                        subSettingId: Yup.number(),
                        name: Yup.string(),
                        type: Yup.string(),
                        value: Yup.number(),
                    })
                )
            })
        ),
        integrations: Yup.array().of(
            Yup.object().shape({
                settingId: Yup.number(),
                name: Yup.string(),
                isEnabled: Yup.boolean(),
                subSettings: Yup.array().of(
                    Yup.object().shape({
                        autoId: Yup.number(),
                        integrationId: Yup.number(),
                        subIntegrationId: Yup.number(),
                        name: Yup.string(),
                        value: Yup.string(),
                    })
                )
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
        if (addRoleFormik.isValid) {
            //  http://35.155.202.216:8080/QADemoCurately/createrole
            if ((roleData?.roleId && ([1, 2, 3].includes(Number(roleData?.roleId))) && (userLocalData.getvalue('recrId') !== 2))) {
                showToaster('This Role cannot be edited', 'error');
                return
            }
            const tempData = {
                roleId: (roleData?.roleId) ? roleData?.roleId : 0,
                roleName: addRoleFormik.values.roleName,
                json: JSON.stringify(addRoleFormik.values),
                createdBy: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId')
            }
            // console.log(addRoleFormik.values);
            trackPromise(
                ApiService.postWithData('admin', (roleData?.roleId) ? 'updateRole' : 'createrole', tempData)
                    .then((response) => {
                        // console.log(response.data);
                        if (response.data.Success) {
                            handleAdd();
                            showToaster(`Role has been ${(roleData?.roleId) ? 'updated' : 'added'} Successfully.`, 'success');
                        } else {
                            showToaster(response.data.Message ? response.data.Message : `Error occured while ${(roleData?.roleId) ? 'updating' : 'adding'} role.`, 'error');
                        }
                    })
            )
            // handleClose();
        } else {
            showToaster('Please enter Role Name.', 'error')
        }
    }

    // const handleNewRoleTypeChange = (event: SelectChangeEvent) => {
    //     const { name, value } = event.target;
    //     addRoleFormik.setFieldValue(name, value);
    // };

    const loadMasterSettings = useCallback(debounce((modulesList: number[]) => {
        // http://35.155.202.216:8080/DemoCurately/adminMasterSettings
        trackPromise(
            // ApiRequests.getCall(216, 'DemoCurately/adminMasterSettings')
            ApiService.getCall('admin', 'adminMasterSettings')
                .then((response: AxiosResponse) => {
                    // console.log(response.data);
                    const respData = response.data;
                    if (respData.Success) {
                        const temp = { ...RoleData };

                        temp.settings = [];
                        temp.integrations = [];
                        for (let rs = 0; rs < respData.rolesSetting.length; rs++) {
                            const rsElement = respData.rolesSetting[rs];
                            if (
                                !userLocalData.isChromeExtensionEnabled()
                                ||
                                (
                                    userLocalData.isChromeExtensionEnabled() && (rsElement.settingId !== 10003) && (rsElement.settingId !== 10005)
                                )
                            ) {
                                temp.settings.push({
                                    settingId: rsElement.settingId,
                                    name: rsElement.name,
                                    isEnabled: false,
                                    subSettings: [
                                    ]
                                })
                            }
                        }
                        for (let rss = 0; rss < respData.roleSubSettings.length; rss++) {
                            const rssElement = respData.roleSubSettings[rss];
                            const rssIndex = temp.settings.findIndex(p => p.settingId == rssElement.settingId);

                            if (rssIndex !== -1) {
                                if (
                                    !userLocalData.isChromeExtensionEnabled()
                                    ||
                                    (
                                        userLocalData.isChromeExtensionEnabled() &&
                                        (
                                            ([10001, 10003, 10005].includes(rssElement.settingId)) ||
                                            ((rssElement.settingId === 10002) && ((rssElement.subSettingId === 110006) || (rssElement.subSettingId === 110007) || (rssElement.subSettingId === 110008))) ||
                                            ((rssElement.settingId === 10004) && (rssElement.subSettingId === 130008))
                                        )
                                    )
                                ) {
                                    temp.settings[rssIndex].subSettings.push({
                                        autoId: rssElement.autoId,
                                        settingId: rssElement.settingId,
                                        subSettingId: rssElement.subSettingId,
                                        name: rssElement.name,
                                        type: rssElement.type,
                                        value: 0,
                                    })
                                }
                            }
                        }
                        for (let ri = 0; ri < respData.rolesIntegrations.length; ri++) {
                            const riElement = respData.rolesIntegrations[ri];
                            if ([40001, 40002, 40003, 40004].includes(riElement.settingId)) {
                                if (
                                    ((riElement.settingId === 40001) && modulesList.includes(20001)) ||
                                    ((riElement.settingId === 40002) && modulesList.includes(20002)) ||
                                    ((riElement.settingId === 40003) && modulesList.includes(20004))
                                    // || ((riElement.settingId === 40004) && modulesList.includes(20004))
                                ) {
                                    temp.integrations.push({
                                        settingId: riElement.settingId,
                                        name: riElement.name,
                                        isEnabled: false,
                                        subSettings: [
                                        ]
                                    })
                                }
                            } else {
                                temp.integrations.push({
                                    settingId: riElement.settingId,
                                    name: riElement.name,
                                    isEnabled: false,
                                    subSettings: [
                                    ]
                                })
                            }
                        }
                        for (let rsi = 0; rsi < respData.roleSubIntegration.length; rsi++) {
                            const rsiElement = respData.roleSubIntegration[rsi];
                            const rsiIndex = temp.integrations.findIndex(p => p.settingId == rsiElement.integrationId);
                            if (rsiIndex !== -1) {
                                if (
                                    !userLocalData.isChromeExtensionEnabled()
                                    ||
                                    (
                                        userLocalData.isChromeExtensionEnabled() &&
                                        (
                                            ([40001, 40002, 40003, 40004, 40006, 40008].includes(rsiElement.integrationId)) ||
                                            ((rsiElement.integrationId === 40005) && ((rsiElement.subIntegrationId !== 400021) && (rsiElement.subIntegrationId !== 400023))) ||
                                            ((rsiElement.integrationId === 40007) && ((rsiElement.subIntegrationId === 400041) || (rsiElement.subIntegrationId === 400042) || (rsiElement.subIntegrationId === 400043)))
                                        )
                                    )
                                ) {
                                    temp.integrations[rsiIndex].subSettings.push({
                                        autoId: rsiElement.autoId,
                                        integrationId: rsiElement.integrationId,
                                        subIntegrationId: rsiElement.subIntegrationId,
                                        name: rsiElement.name,
                                        isChecked: false,
                                    })
                                }
                            }
                        }
                        // console.log(temp);
                        // console.log(JSON.stringify(temp));
                        if (roleData?.roleId) {
                            // let roleDataFromParent = { ...addRoleFormik.values };
                            temp.roleName = roleData.roleName;
                            temp.roleId = roleData.roleId;
                            for (let rd = 0; rd < roleData.settings.length; rd++) {
                                const rsElement = roleData.settings[rd];
                                const rsIndex = temp.settings.findIndex(p => p.settingId == rsElement.settingId);
                                if (rsIndex !== -1) {
                                    temp.settings[rsIndex].isEnabled = roleData.settings[rd].isEnabled;
                                    for (let settingIndex = 0; settingIndex < roleData.settings[rd].subSettings.length; settingIndex++) {
                                        const subElement = roleData.settings[rd].subSettings[settingIndex];
                                        if (temp.settings[rsIndex].subSettings?.length) {
                                            const roleSubIndex = temp.settings[rsIndex].subSettings.findIndex(p => p.subSettingId == subElement.subSettingId);
                                            if (roleSubIndex !== -1) {
                                                temp.settings[rsIndex].subSettings[roleSubIndex].value = subElement.value;
                                            }
                                        }
                                    }
                                }
                            }
                            for (let ri = 0; ri < roleData.integrations.length; ri++) {
                                const rsElement = roleData.integrations[ri];
                                const rsIndex = temp.integrations.findIndex(p => p.settingId == rsElement.settingId);
                                if (rsIndex !== -1) {
                                    temp.integrations[rsIndex].isEnabled = roleData.integrations[ri].isEnabled;
                                    for (let settingIndex = 0; settingIndex < roleData.integrations[ri].subSettings.length; settingIndex++) {
                                        const subElement = roleData.integrations[ri].subSettings[settingIndex];
                                        if (temp.integrations[rsIndex].subSettings?.length) {
                                            const roleSubIndex = temp.integrations[rsIndex].subSettings.findIndex(p => p.subIntegrationId == subElement.subIntegrationId);
                                            if (roleSubIndex !== -1) {
                                                temp.integrations[rsIndex].subSettings[roleSubIndex].isChecked = subElement.isChecked;
                                            }
                                        }
                                    }
                                }
                            }

                        }
                        addRoleFormik.setValues(temp);
                        setIsSettingsLoaded(true);
                    } else {
                        showToaster(response.data.Message ? response.data.Message : 'Error retriving Roles data', 'error');
                    }
                    // setRolesSetting(response.data.rolesSetting);
                }
                )
        )
    }, 600), [])

    const getClientMasterSettings = useCallback(debounce(() => {
        // http://35.155.202.216:8080/QADemoCurately/getAdminuserDetails/3
        ApiService.getById('admin', 'getAdminuserDetails', userLocalData.getvalue('clientId'))
            .then((response) => {
                // console.log(response.data.modules);
                loadMasterSettings([...response.data.modules, ...response.data.platform]);
            })
    }, 600), [])


    useEffect(() => {
        // loadMasterSettings();
        getClientMasterSettings();
    }, []);

    const getDropdownOptions = (type: string) => {
        switch (type) {
            case 'dropdown1':
                return [
                    { value: 0, name: "No Access" },
                    { value: 5, name: "View and Edit" },
                    { value: 6, name: "Edit and Delete" }
                ]
            case 'dropdown2':
                return [
                    { value: 0, name: "No Access" },
                    { value: 1, name: "Access" }
                ]
            case 'dropdown3':
                return [
                    { value: 0, name: "No Access" },
                    { value: 2, name: "View Only" },
                    { value: 3, name: "Create and Edit" },
                    { value: 4, name: "Create, Edit and Delete" }
                ]
            case 'dropdown4':
                return [
                    { value: 0, name: "No Access" },
                    { value: 2, name: "View Only" },
                    { value: 3, name: "Create and Edit" }
                ]
            default:
                return []
        }
    };



    return (
        <Dialog open={open} onClose={handleClose} maxWidth={'md'} fullWidth={true} >
            <DialogTitle> {roleData?.roleId ? 'Update' : 'Add'} role</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent className='bg-paleGrey' sx={{ minHeight: 320 }}>
                {
                    isSettingsLoaded ?
                        <form key={roleData?.roleId} onSubmit={addRoleFormik.handleSubmit} id="AddRole" className='customInputs'>
                            <div className='pl-5'>
                                <Grid container spacing={2} size={12}>
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
                                            disabled={Boolean(roleData?.roleId)}
                                            title={roleData?.roleId ? "Role Name Can't be edited" : ""}
                                        />
                                        <ErrorMessage formikObj={addRoleFormik} name={'roleName'} isFormSubmitted={isFormSubmitted} />
                                    </Grid>
                                </Grid>
                                <Grid container direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    {
                                        addRoleFormik.values.settings.map((setting, si) => (
                                            <Card className="customCard mt-2" key={setting.settingId}>
                                                <FormControlLabel control={
                                                    <Switch
                                                        // onChange={(e) => handleRoleSwitchChange(e, idx)}
                                                        checked={setting.isEnabled}
                                                        onChange={addRoleFormik.handleChange}
                                                        name={`settings[${si}].isEnabled`} />
                                                }
                                                    label={setting.name}
                                                />
                                                <CardContent className={`pb-0 pt-1 ${setting.isEnabled ? "d-flex" : "d-none"} `}>
                                                    <Grid container direction="row" size={12}  >
                                                        {setting.subSettings?.length ? setting.subSettings.map((subitem, ssi) => (
                                                            <Grid size={4} key={subitem.subSettingId} >
                                                                <Grid size={11} className='pr-2 mt-2 mb-2'>
                                                                    <label className='inputLabel'>{subitem.name}</label>
                                                                    <TextField fullWidth className='mt-1'
                                                                        size="small"
                                                                        variant="outlined"
                                                                        select
                                                                        id={`settings[${si}].subSettings[${ssi}].value`}
                                                                        name={`settings[${si}].subSettings[${ssi}].value`}
                                                                        value={addRoleFormik.values.settings[si].subSettings[ssi].value}
                                                                        onChange={addRoleFormik.handleChange}
                                                                    >
                                                                        {
                                                                            getDropdownOptions(subitem.type).map((option) => (
                                                                                <MenuItem value={option.value} key={option.value}>{option.name}</MenuItem>
                                                                            ))
                                                                        }
                                                                    </TextField>
                                                                </Grid>
                                                            </Grid>
                                                        ))
                                                            :
                                                            null}
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        ))
                                    }
                                    {/* <Grid container spacing={2} >
                                        <Grid size={12} className='pr-2 mb-2'>
                                            <h3 style={{ fontWeight: 'bold' }}>Integrations</h3>
                                        </Grid>
                                    </Grid> */}
                                    {
                                        addRoleFormik.values.integrations.map((integration, si) => (
                                            <Card className="customCard mt-2" key={integration.settingId + integration.name}>
                                                <FormControlLabel control={<Switch
                                                    // onChange={(e) => handleRoleSwitchChange(e, idx)}
                                                    // value={integration.isEnabled}
                                                    checked={integration.isEnabled}
                                                    onChange={addRoleFormik.handleChange}
                                                    name={`integrations[${si}].isEnabled`} />}
                                                    label={integration.name}
                                                />
                                                <CardContent className={`pb-0 pt-1 ${integration.isEnabled ? "d-flex" : "d-none"} `}>
                                                    <Grid container direction="row"  >
                                                        {
                                                            integration.subSettings.map((subitem, ssi) => (
                                                                <Grid size={12} className='' key={subitem.subIntegrationId}>
                                                                    {/* {subitem.name} */}
                                                                    <FormControlLabel key={ssi}
                                                                        control={
                                                                            <Checkbox
                                                                                id={`integrations[${si}].subSettings[${ssi}].isChecked`}
                                                                                name={`integrations[${si}].subSettings[${ssi}].isChecked`}
                                                                                checked={addRoleFormik.values.integrations[si].subSettings[ssi].isChecked}
                                                                                onChange={addRoleFormik.handleChange}
                                                                            />
                                                                        }
                                                                        label={subitem.name} id={`${subitem.subIntegrationId}`}
                                                                    />
                                                                </Grid>
                                                            ))
                                                        }
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        ))
                                    }

                                </Grid>

                            </div>
                        </form>
                        :
                        <Loader />
                }
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant='contained' size="small" onClick={() => submitRole()}> {roleData.roleId ? 'Update' : 'Add'} Role</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddRole;
