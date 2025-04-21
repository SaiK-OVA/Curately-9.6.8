// import React, { useState, useEffect, useCallback } from 'react';
import { 
    // useState, 
    useEffect, useCallback } from './../../../../shared/modules/React';
import './DuplicateSettings.scss';
import { useFormik, Yup } from './../../../../shared/modules/Formik';
import { Card, CardContent } from './../../../../shared/modules/MaterialImports/Card';
import {
    // Checkbox,
    Radio, RadioGroup
} from './../../../../shared/modules/MaterialImports/FormElements';
import { FormControlLabel } from './../../../../shared/modules/MaterialImports/FormInputs';
import { userLocalData } from "../../../../shared/services/userData";
import { trackPromise } from './../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';

import { Button, FormControl, Grid, TextField, } from './../../../../shared/modules/commonImports';
import { debounce } from 'lodash';

const DuplicateSettings = () => {


    let clientId = userLocalData.getvalue('clientId');
    // let userId = userLocalData.getvalue("recrId");

    // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    // const [editingSettings, setEditingSettings] = useState<any>({
    //     duplicateSettingId: "",
    //     fullName: "",
    //     email: "",
    //     phoneNumber: "",
    //     rule: "",
    //     duplicateMessage: "",
    //     createdBy: "",
    //     clientId: ""
    // });

    const initialDuplicateSettingsDetails = {
        "duplicateSettingId": "",
        "fullName": "",
        "email": "",
        "phoneNumber": "",
        "rule": "",
        "duplicateMessage": "",
        "createdBy": "",
        "clientId": ""
    }
    const duplicateSettings = Yup.object().shape({
        "duplicateSettingId": Yup.number(),
        "fullName": Yup.boolean(),
        "email": Yup.boolean(),
        "phoneNumber": Yup.boolean(),
        "rule": Yup.number(),
        "duplicateMessage": Yup.string(),
        "createdBy": Yup.number(),
        "clientId": Yup.string(),
    });

    const duplicateSettingsFormik = useFormik({
        initialValues: initialDuplicateSettingsDetails,
        validationSchema: duplicateSettings,
        onSubmit: () => {
            // setIsFormSubmitted(true);
        }
    });
    const duplicate = () => {
        // setIsFormSubmitted(true);

        let data = {
            duplicateSettingId: duplicateSettingsFormik.values.duplicateSettingId,
            fullName: duplicateSettingsFormik.values.fullName,
            email: duplicateSettingsFormik.values.email,
            phoneNumber: duplicateSettingsFormik.values.phoneNumber,
            rule: Number(duplicateSettingsFormik.values.rule),
            duplicateMessage: duplicateSettingsFormik.values.duplicateMessage,
            createdBy: userLocalData.getvalue("recrId"),
            clientId: userLocalData.getvalue("clientId")
        }

        if (duplicateSettingsFormik.isValid) {
            trackPromise(
                //http://35.155.202.216:8080/QADemoCurately/saveHolidays
                //   ApiService.postWithData(216, 'QADemoCurately/saveOrUpdateDuplicateSettings', data).then(
                ApiService.postWithData('admin', 'saveOrUpdateDuplicateSettings', data).then(
                    (response: any) => {

                        if (response.data.Success) {
                            showToaster('Duplicate Settings has been saved successfully.', 'success');
                            loadDuplicateSettingList(clientId);
                            //    duplicateSettingsFormik.resetForm();

                        } else {
                            showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                        }
                    })
            )
        } else {
            showToaster('Please fill all fields.', 'error');
        }


    }

    const loadDuplicateSettingList = useCallback(debounce((clientId: any) => {
        trackPromise(

            // ApiService.getCall(216, `QADemoCurately/duplicateSettings/${clientId}`)
            ApiService.getCall('admin', `duplicateSettings/${clientId}`)
                .then((response: any) => {

                    const tempRespData = response.data;
                    duplicateSettingsFormik.setValues(tempRespData, true);

                    // setEditingSettings(tempRespData);

                }
                )
        )
    }, 400),
        []
    );


    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        (clientId) && loadDuplicateSettingList(clientId);
        saveAuditLog(4272);
    }, []);


    return (
        <div id='duplicateSettingsPanelDiv' className='px-5 py-2'>
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="start"
            >
                <h3>Duplicate Settings</h3>
            </Grid>
            <form key={clientId} onSubmit={duplicateSettingsFormik.handleSubmit} >
                <Grid
                    container
                    direction="row"
                    justifyContent="start"
                    alignItems="start"
                >
                    {/* <Card className="customCard py-0" sx={{ width: '100%' }}>
                        <CardContent>
                            <h4>Duplicate Criteria</h4>
                            <p>Curately will flag applications as duplicate if any of the two criteria are a exact match</p>
                            <Grid container spacing={1} >
                                <Grid size={6} className='mt-1'>
                                    <FormControlLabel
                                        control={<Checkbox checked={Boolean(duplicateSettingsFormik.values.fullName)} value={duplicateSettingsFormik.values.fullName} onChange={duplicateSettingsFormik.handleChange} />}
                                        label="Full Name"
                                        labelPlacement="end"
                                        sx={{ ml: 0 }}
                                        id="fullName"
                                        name="fullName"

                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} >
                                <Grid size={6} className='mt-1'>
                                    <FormControlLabel
                                        control={<Checkbox checked={Boolean(duplicateSettingsFormik.values.email)} value={duplicateSettingsFormik.values.email}
                                            onChange={duplicateSettingsFormik.handleChange} />}
                                        label="Email"
                                        labelPlacement="end"
                                        sx={{ ml: 0 }}
                                        id="email"
                                        name="email"

                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} >
                                <Grid size={6} className='mt-1'>
                                    <FormControlLabel
                                        control={<Checkbox checked={Boolean(duplicateSettingsFormik.values.phoneNumber)} value={duplicateSettingsFormik.values.phoneNumber}
                                            onChange={duplicateSettingsFormik.handleChange} />}
                                        label="Phone Number"
                                        labelPlacement="end"
                                        sx={{ ml: 0 }}
                                        id="phoneNumber"
                                        name="phoneNumber"
                                    //   value={duplicateSettingsFormik.values.phoneNumber}
                                    //   onChange={duplicateSettingsFormik.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card> */}
                    <Card className="customCard py-0" sx={{ width: '100%', marginTop: '10px' }}>
                        <CardContent>
                            <h4>Duplicate Rule</h4>
                            <Grid container spacing={1} >
                                <Grid size={12} className='mt-1'>
                                    <FormControl>
                                        <RadioGroup name="rule" value={duplicateSettingsFormik.values.rule} onChange={(event) => {
                                            duplicateSettingsFormik.setFieldValue("rule", event.currentTarget.value)
                                        }}>
                                            <FormControlLabel value="0" control={<Radio />} label="Can apply more than once without restrictions" />
                                            <FormControlLabel value="1" control={<Radio />} label="Can apply to each job only once" />
                                            <FormControlLabel value="2" control={<Radio />} label="Cannot Apply Again" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Card className="customCard py-0" sx={{ width: '100%', marginTop: '10px' }}>
                        <CardContent>
                            <h4>Duplicate Message</h4>
                            <p>Customize a message shown to the applicants blocked by the duplicate rule.</p>
                            <Grid container spacing={1} >
                                <Grid size={6} className='mt-1'>
                                    <TextField className='mt-1'
                                        rows={5}
                                        fullWidth
                                        multiline
                                        id="duplicateMessage"
                                        name="duplicateMessage"
                                        value={duplicateSettingsFormik.values.duplicateMessage}
                                        onChange={duplicateSettingsFormik.handleChange}
                                        onClick={() => saveAuditLog(4273)}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </form>
            <Grid
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
            >
                <Button sx={{ marginTop: '10px' }} color="primary" variant="contained" type="button" onClick={() => { saveAuditLog(4274); duplicate() }}>Save</Button>
            </Grid>
        </div>
    )
}

export default DuplicateSettings;