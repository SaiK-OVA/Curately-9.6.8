// import React, { useState, useEffect } from "react";
import { useState, useEffect } from "../../../../shared/modules/React";
// import ReactQuill from 'react-quill-new';

// import Paper from '@mui/material/Paper';
import { Stack } from '../../../../shared/modules/MaterialImports/Stack';
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { TextField, Grid, Button } from '../../../../shared/modules/commonImports';
// import { TextareaAutosize } from '@mui/base';
import { MenuItem } from '../../../../shared/modules/MaterialImports/Menu';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
import { useFormik, Yup } from '../../../../shared/modules/Formik';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ErrorMessage from "../../../shared/Error/ErrorMessage";
import ApiService from "../../../../shared/api/api";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import './ReferFriend.scss';
import Editor from "../../../shared/EmailDialogBox/EmailBody";

// const formats = [
//     "header",
//     "font",
//     "size",
//     "mention",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "indent",
//     "align",
//     "color",
//     "background",
//     "link",
//     "image",
//     "color"
// ];
const referalChecks = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "name&email", label: "Name & Email" },
    { value: "name&phone", label: "Name & Phone" },
    { value: "name&email&phone", label: "Name & Email & Phone" },
]

const periodDays = [30, 60, 90, 120, 180];

const validityDays = [30, 60, 90, 120, 180, 240, 365]

const ReferFriend = () => {

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const initialValues = {
        termsAndConditions: '',
        duplicateCheckForReferral: 'Please Select',
        bonusForExistedCandidate: 'Please Select',
        payoutForDifferentRole: 'Please Select',
        defaultPayoutBonus: '',
        defaultPayoutPeriod: 'Please Select',
        defaultReferralValidityPeriod: 'Please Select'
    }

    const referFriendSchema = Yup.object({
        termsAndConditions: Yup.string().required('Required'),
        duplicateCheckForReferral: Yup.string().test({
            name: 'is-sku',
            test(value: any, ctx) {
                if (value == "Please Select") {
                    return ctx.createError({ message: 'Required' })
                }

                return true
            }
        }).required("Required"),
        bonusForExistedCandidate: Yup.string().test({
            name: 'is-sku',
            test(value: any, ctx) {
                if (value == "Please Select") {
                    return ctx.createError({ message: 'Required' })
                }

                return true
            }
        }).required("Required"),
        payoutForDifferentRole: Yup.string().test({
            name: 'is-sku',
            test(value: any, ctx) {
                if (value == "Please Select") {
                    return ctx.createError({ message: 'Required' })
                }

                return true
            }
        }).required("Required"),
        defaultPayoutBonus: Yup.string().required('Required'),
        defaultPayoutPeriod: Yup.string().test({
            name: 'is-sku',
            test(value: any, ctx) {
                if (value == "Please Select") {
                    return ctx.createError({ message: 'Required' })
                }

                return true
            }
        }).required("Required"),
        defaultReferralValidityPeriod: Yup.string().test({
            name: 'is-sku',
            test(value: any, ctx) {
                if (value == "Please Select") {
                    return ctx.createError({ message: 'Required' })
                }

                return true
            }
        }).required("Required"),

    })
    const referFriendSettingsFormik = useFormik({
        initialValues,
        validationSchema: referFriendSchema,
        onSubmit: () => {
            saveForm();
        },
        validateOnMount: true

    });

    const saveForm = () => {
        setIsFormSubmitted(true);
        console.log(referFriendSettingsFormik, 'referFriendSettingsFormik')
        if (referFriendSettingsFormik.isValid) {
            let demoUserInfo: any = localStorage.getItem("demoUserInfo")
            let referFreindData = {
                "clientId": JSON.parse(demoUserInfo).clientId,
                "recruiterId": JSON.parse(demoUserInfo).recrId,
                "termsAndConditions": referFriendSettingsFormik.values.termsAndConditions,
                "duplicateCheckForReferral": referFriendSettingsFormik.values.duplicateCheckForReferral,
                "bonusForExistedCandidate": referFriendSettingsFormik.values.bonusForExistedCandidate == "Yes" ? true : false,
                "payoutForDifferentRole": referFriendSettingsFormik.values.payoutForDifferentRole == "Yes" ? true : false,
                "defaultPayoutBonus": Number(referFriendSettingsFormik.values.defaultPayoutBonus),
                "defaultPayoutPeriod": Number(referFriendSettingsFormik.values.defaultPayoutPeriod),
                "defaultReferralValidityPeriod": Number(referFriendSettingsFormik.values.defaultReferralValidityPeriod)
            }
            console.log(referFreindData, 'referFreindData')
            trackPromise(
                ApiService.saveReferFriendData("admin", 'upsertUserReferralMgmtData', referFreindData).then(
                    (response: any) => {
                        if (response.data.Success) {
                            showToaster(response.data.Message, 'success');

                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occured while sending refferal.", 'error')
                        }
                    }
                )
            )
        }
    }

    useEffect(() => {
        let demoUserInfo: any = localStorage.getItem("demoUserInfo")
        const getData = async () => {
            trackPromise(
                ApiService.getReferFreindData("admin", 'getReferralProgramData', JSON.parse(demoUserInfo).clientId).then(
                    (response: any) => {
                        if (response.data.Success) {
                            console.log(response.data, 'response.data')
                            let responseData = response.data
                            referFriendSettingsFormik.setFieldValue("termsAndConditions", responseData.termsAndConditions)

                            referFriendSettingsFormik.setFieldValue("defaultPayoutBonus", responseData.defaultPayoutBonus)

                            referFriendSettingsFormik.setFieldValue("duplicateCheckForReferral", responseData.duplicateCheckForReferral ? responseData.duplicateCheckForReferral : "Please Select")
                            referFriendSettingsFormik.setFieldValue("defaultPayoutPeriod", responseData.defaultPayoutPeriod ? responseData.defaultPayoutPeriod : "Please Select")


                            referFriendSettingsFormik.setFieldValue("defaultReferralValidityPeriod", responseData.defaultReferralValidityPeriod ? responseData.defaultReferralValidityPeriod : "Please Select")

                            let isbonusExist = responseData.bonusForExistedCandidate ? "yes" : "no";

                            referFriendSettingsFormik.setFieldValue("bonusForExistedCandidate", isbonusExist)

                            let isPayoutRole = responseData.payoutForDifferentRole ? "yes" : "no";

                            referFriendSettingsFormik.setFieldValue("payoutForDifferentRole", isPayoutRole)

                        } else {
                            showToaster((response.data.Message) ? response.data.Message : "An error occured while Fetching the Data.", 'error')
                        }
                    }
                )
            )
        }

        getData()
    }, [])

    return (
        <div id="referFriend">
            <Grid
                container
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                sx={{ minHeight: 'auto !important' }}
            >
                <Typography variant="h6" className="headerName">
                    Refer a Freind
                </Typography>
                <Stack direction="row" className="btn-container">
                    <Button variant="contained" color="primary" size="small" onClick={saveForm} >Update</Button>
                </Stack>
            </Grid>
            <Stack spacing={2} sx={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}>
                {/* <Typography component={"h1"} sx={{ mt: 2, mb: 2, fontWeight: "600", fontSize: "revert" }}>Terms & Conditions</Typography> */}
                <h1 style={{ marginTop: "15px", marginBottom: "15px", fontWeight: "600", fontSize: "revert" }}>Terms & Conditions</h1>
                <Box sx={{ width: "100%" }}>
                    <label style={{ paddingTop: "8px", paddingBottom: "8px", display: "inline-block", color: "#1a1a1a", fontWeight: "600" }}>Define Terms and Conditions <span style={{ color: 'red' }}>*</span></label>

                    {/* <TextField

                        placeholder=""
                        multiline
                        id="termsAndConditions"
                        name="termsAndConditions"
                        value={referFriendSettingsFormik.values.termsAndConditions}
                        onChange={referFriendSettingsFormik.handleChange}
                        error={(referFriendSettingsFormik.errors.termsAndConditions && isFormSubmitted) ? true : false}
                        maxRows={15}
                        rows={10}
                        style={{ width: "100%", padding: "0px" }}
                        className="customCard"
                    /> */}

                    <Editor
                        toolbarId='termsAndConditions'
                        placeholder=''
                        id='termsAndConditions'
                        handleChange={(e: any) => {
                            referFriendSettingsFormik.setFieldValue('termsAndConditions', e);
                        }}
                        editorHtml={referFriendSettingsFormik.values.termsAndConditions}
                        mentions={false}
                        saveTemplate={false}
                    />

                    {/* <ReactQuill
                        style={{ width: "100%", padding: "0px" }}
                        className="customCard"
                        id="termsAndConditions"

                        // onChange={this.handleChange}
                        value={referFriendSettingsFormik.values.termsAndConditions}
                        // onBlur={this.props.handleChange}
                        onChange={
                            (e: any) => {
                                referFriendSettingsFormik.setFieldValue("termsAndConditions", e)

                            }
                        }
                        formats={formats}
                        theme="snow" // pass false to use minimal theme
                    /> */}
                    <ErrorMessage formikObj={referFriendSettingsFormik} name={'termsAndConditions'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <label style={{ paddingTop: "8px", paddingBottom: "8px", display: "inline-block", color: "#1a1a1a", fontWeight: "600" }}>What will be used a duplicate check for new  <span style={{ color: 'red' }}>*</span></label>
                    <TextField
                        id="duplicateCheckForReferral"
                        name="duplicateCheckForReferral"
                        value={referFriendSettingsFormik.values.duplicateCheckForReferral}
                        onChange={referFriendSettingsFormik.handleChange}
                        error={(referFriendSettingsFormik.errors.duplicateCheckForReferral && isFormSubmitted) ? true : false}
                        select
                        placeholder="Please Select"
                        defaultValue={"Please Select"}
                        // helperText="Please select"
                        sx={{
                            width: "100%",
                            "& .MuiSelect-outlined": {
                                background: "#fff"
                            }
                        }}
                    >
                        <MenuItem key="Please Select" value={"Please Select"}>
                            Please Select
                        </MenuItem>
                        {referalChecks.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <ErrorMessage formikObj={referFriendSettingsFormik} name={'duplicateCheckForReferral'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Box>
                <Box sx={{ width: "100%" }}>
                    <label style={{ paddingTop: "8px", paddingBottom: "8px", display: "inline-block", color: "#1a1a1a", fontWeight: "600" }}>Do you want to provide referral hours, If the referred candidate already exists in your database ? <span style={{ color: 'red' }}>*</span></label>
                    <TextField
                        id="bonusForExistedCandidate"
                        name="bonusForExistedCandidate"
                        value={referFriendSettingsFormik.values.bonusForExistedCandidate}
                        onChange={referFriendSettingsFormik.handleChange}
                        error={(referFriendSettingsFormik.errors.bonusForExistedCandidate && isFormSubmitted) ? true : false}
                        select
                        placeholder="Please Select"

                        // helperText="Please select"
                        sx={{
                            width: "100%",
                            "& .MuiSelect-outlined": {
                                background: "#fff"
                            }
                        }}
                    >
                        <MenuItem key="Please Select" value={"Please Select"}>
                            Please Select
                        </MenuItem>
                        <MenuItem key="yes" value="yes">Yes</MenuItem>
                        <MenuItem key="no" value="no">No</MenuItem>
                    </TextField>

                    <ErrorMessage formikObj={referFriendSettingsFormik} name={'bonusForExistedCandidate'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Box>

                <Box sx={{ width: "100%" }}>
                    <label style={{ paddingTop: "8px", paddingBottom: "8px", display: "inline-block", color: "#1a1a1a", fontWeight: "600" }}>Is a referral eligible to payout if hired for a different role ? <span style={{ color: 'red' }}>*</span></label>
                    <TextField
                        id="payoutForDifferentRole"
                        name="payoutForDifferentRole"
                        value={referFriendSettingsFormik.values.payoutForDifferentRole}
                        onChange={referFriendSettingsFormik.handleChange}
                        error={(referFriendSettingsFormik.errors.payoutForDifferentRole && isFormSubmitted) ? true : false}
                        select
                        placeholder="Please Select"

                        // helperText="Please select"
                        sx={{
                            width: "100%", "& .MuiSelect-outlined": {
                                background: "#fff"
                            }
                        }}
                    >
                        <MenuItem key="Please Select" value={"Please Select"}>
                            Please Select
                        </MenuItem>
                        <MenuItem key="yes" value="yes">Yes</MenuItem>
                        <MenuItem key="no" value="no">No</MenuItem>
                    </TextField>

                    <ErrorMessage formikObj={referFriendSettingsFormik} name={'payoutForDifferentRole'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Box>

                <h1 style={{ marginTop: "40px", marginBottom: "40px", fontWeight: "600", fontSize: "revert" }}>Bonus Payout & Validity Settings</h1>
                <Box sx={{ width: "100%" }}>
                    <label style={{ paddingTop: "8px", paddingBottom: "8px", display: "inline-block", color: "#1a1a1a", fontWeight: "600" }}>Default Payout bonus amount (in $) <span style={{ color: 'red' }}>*</span></label>
                    <TextField
                        id="defaultPayoutBonus"
                        name="defaultPayoutBonus"
                        value={referFriendSettingsFormik.values.defaultPayoutBonus}
                        onChange={referFriendSettingsFormik.handleChange}
                        error={(referFriendSettingsFormik.errors.defaultPayoutBonus && isFormSubmitted) ? true : false}

                        placeholder=""
                        fullWidth
                        // helperText="Please select"
                        sx={{
                            width: "100%",
                            "& .MuiInputBase-input": {
                                background: "#fff"
                            }
                        }}
                    >

                    </TextField>
                    <ErrorMessage formikObj={referFriendSettingsFormik} name={'defaultPayoutBonus'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Box>

                <Box sx={{ width: "100%" }}>
                    <label style={{ paddingTop: "8px", paddingBottom: "8px", display: "inline-block", color: "#1a1a1a", fontWeight: "600" }}>Default Payout period (Days) <span style={{ color: 'red' }}>*</span></label>
                    <TextField
                        id="defaultPayoutPeriod"
                        name="defaultPayoutPeriod"
                        value={referFriendSettingsFormik.values.defaultPayoutPeriod}
                        onChange={referFriendSettingsFormik.handleChange}
                        error={(referFriendSettingsFormik.errors.defaultPayoutPeriod && isFormSubmitted) ? true : false}
                        select
                        placeholder="Please Select"
                        defaultValue={"Please Select"}
                        // helperText="Please select"
                        sx={{
                            width: "100%",
                            "& .MuiSelect-outlined": {
                                background: "#fff"
                            }
                        }}
                    >
                        <MenuItem key="Please Select" value={"Please Select"}>
                            Please Select
                        </MenuItem>
                        {periodDays.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>

                    <ErrorMessage formikObj={referFriendSettingsFormik} name={'defaultPayoutPeriod'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Box>

                <Box sx={{ width: "100%" }}>
                    <label style={{ paddingTop: "8px", paddingBottom: "8px", display: "inline-block", color: "#1a1a1a", fontWeight: "600" }}>Default Referral validity period (Days) <span style={{ color: 'red' }}>*</span></label>
                    <TextField
                        id="defaultReferralValidityPeriod"
                        name="defaultReferralValidityPeriod"
                        value={referFriendSettingsFormik.values.defaultReferralValidityPeriod}
                        onChange={referFriendSettingsFormik.handleChange}
                        error={(referFriendSettingsFormik.errors.defaultReferralValidityPeriod && isFormSubmitted) ? true : false}
                        select
                        placeholder="Please Select"
                        defaultValue={"Please Select"}
                        // helperText="Please select"
                        sx={{
                            width: "100%",
                            "& .MuiSelect-outlined": {
                                background: "#fff"
                            }
                        }}
                    >
                        <MenuItem key="Please Select" value={"Please Select"}>
                            Please Select
                        </MenuItem>
                        {validityDays.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <ErrorMessage formikObj={referFriendSettingsFormik} name={'defaultReferralValidityPeriod'} isFormSubmitted={isFormSubmitted}></ErrorMessage>
                </Box>
            </Stack>
        </div>
    )
}

export default ReferFriend