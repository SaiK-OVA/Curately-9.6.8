import ApiService from "../../../../../shared/api/api";
import { Grid, showToaster, TextField } from "../../../../../shared/modules/commonImports";
import { useFormik, Yup } from "../../../../../shared/modules/Formik";
import { Button } from "../../../../../shared/modules/MaterialImports/Button";
import { Dialog, DialogContent, DialogTitle } from "../../../../../shared/modules/MaterialImports/Dialog";
import { Divider } from "../../../../../shared/modules/MaterialImports/Divider";
import { MenuItem } from "../../../../../shared/modules/MaterialImports/Menu";
import { Stack } from "../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../shared/modules/MaterialImports/Typography";
import { trackPromise } from "../../../../../shared/modules/PromiseTrackter";
import { Fragment, React, useEffect, useRef, useState } from "../../../../../shared/modules/React";
import { userLocalData } from "../../../../../shared/services/userData";
import ErrorMessage from "../../../../shared/Error/ErrorMessage";
import { MUIAutoComplete } from "../../../../shared/MUIAutoComplete/MUIAutoComplete";
import PhoneInput from "../../../Candidate/ViewCandidate/PhoneInput";
import { Job_CountryShortCode } from "../../../Job/JobBoard/JobSectors";

interface IAddIdibuUserProps {
    openDialog: boolean;
    closeDialog: (reload?: boolean) => void;
    isEdit?: boolean;
    editUserData?: any;
}

const AddIdibuUser: React.FC<IAddIdibuUserProps> = (props) => {
    const { openDialog, closeDialog, isEdit, editUserData } = props;
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const isInitialLoad = useRef(true);
    const userInfo = JSON.parse(localStorage.getItem("demoUserInfo") || "" as string)

    const initialValues = {
        "firstname": "",
        "lastname": "",
        "company": "",
        "address": "",
        "addressLine1": "",
        "addressLine2": "",
        "addressLine3": "",
        "country": "",
        "postcode": "",
        "email": "",
        "phone": "",
        "fax": "",
        "www": "",
        "selectedRecruiterName": "",
        "selectedRecruiterId": ""
    }

    const idibuUserSchema = Yup.object().shape({
        "firstname": Yup.string().trim().required("Firstname is required"),
        "lastname": Yup.string().trim().required("Lastname is required"),
        "company": Yup.string().trim().required("Company is required"),
        "address": Yup.string().trim().required("Address is required"),
        "addressLine1": Yup.string(),
        "addressLine2": Yup.string(),
        "addressLine3": Yup.string(),
        "country": Yup.string().trim().required("Country is required"),
        "postcode": Yup.string().trim()
            .matches(/^[1-9][0-9]{0,5}$/, "Please enter a valid postcode")
            .min(4, "Please enter valid postcode")
            .max(6, "Please enter valid postcode")
            .required("Postcode is required"),
        "email": Yup.string().trim().email('Please enter Valid Email').required("Email is required"),
        "phone": Yup.string().trim().min(10, "Please enter a valid phone number").required("Phone Number is required"),
        "fax": Yup.string(),
        "www": Yup.string().trim().required("Website is required"),
        "selectedRecruiterName": Yup.string(),
        "selectedRecruiterId": Yup.string().trim().required("Please select recruiter")
    })

    const addIdibuUserFormik = useFormik({
        initialValues,
        validateOnMount: true,
        validationSchema: idibuUserSchema,
        onSubmit: () => { setIsFormSubmitted(true) },
    });

    useEffect(() => {
        if (!userInfo?.idibuTeams?.length) {
            closeDialog();
            showToaster("Teams doesn't exist. Please contact Admin", "error");
        }
        if (editUserData) {
            addIdibuUserFormik.setValues({
                "firstname": editUserData?.firstname || "",
                "lastname": editUserData?.lastname || "",
                "company": editUserData?.company || "",
                "address": editUserData?.contacts?.address || "",
                "addressLine1": editUserData?.contacts["address-line1"] || "",
                "addressLine2": editUserData?.contacts["address-line2"] || "",
                "addressLine3": editUserData?.contacts["address-line3"] || "",
                "country": Job_CountryShortCode.map((each) => each.id).includes(editUserData?.contacts?.country || "") ? (editUserData?.contacts?.country || "") : "US",
                "postcode": editUserData?.contacts?.postcode || "",
                "email": editUserData?.contacts?.email || "",
                "phone": (editUserData?.contacts?.phone?.toString() || "").replace("+91 (0) ", ""),
                "fax": editUserData?.contacts?.fax || "",
                "www": editUserData?.contacts?.www || "",
                "selectedRecruiterName": `${editUserData?.firstname || ""} ${editUserData?.lastname || ""}`,
                "selectedRecruiterId": editUserData?.recrId || ""
            }, true)
        }
    }, [])

    const handleResetForm = () => {
        addIdibuUserFormik.resetForm(initialValues as any);
        addIdibuUserFormik.setValues(initialValues, true);
        addIdibuUserFormik.setErrors({
            firstname: "Firstname is required",
            lastname: "Lastname is required",
            company: "Company is required",
            address: "Address is required",
            country: "Country is required",
            email: "Email is required",
            phone: "Phone Number is required",
            www: "Website is required",
            selectedRecruiterId: "Please select recruiter",
        });
    }

    useEffect(() => {
        if (addIdibuUserFormik.values.selectedRecruiterId && !isInitialLoad.current) {
            getRecruiterDetails();
        }
    }, [addIdibuUserFormik.values.selectedRecruiterId]);

    const getRecruiterDetails = () => {
        trackPromise(
            ApiService.postWithData("admin", "getRecruiterAction", {
                "action": "get",
                "clientId": userLocalData.getvalue("clientId"),
                "recrId": addIdibuUserFormik.values.selectedRecruiterId
            }).then((res: any) => {
                if (res.data.Success) {
                    const data = res?.data?.List[0] || {};
                    addIdibuUserFormik.setValues({
                        ...addIdibuUserFormik.values,
                        firstname: data?.firstName || "",
                        lastname: data?.lastName || "",
                        company: data?.clientName || "",
                        email: data?.email || "",
                        phone: data?.phone || ""
                    }, true)
                }
            })
        )
    }

    const validateFormFields = () => {
        if ([0, "", null, undefined].includes(addIdibuUserFormik.values.selectedRecruiterId)) {
            addIdibuUserFormik.setFieldError("selectedRecruiterId", "Please select recruiter");
            showToaster("Please select recruiter", "error");
            return false;
        } else addIdibuUserFormik.setFieldError("selectedRecruiterId", "");

        const errors: any = Object.entries(addIdibuUserFormik.errors).filter(([_, value]: any) => value).map(([_, value]: any) => value)
        if (!!errors?.length) {
            showToaster(errors[0], "error");
            return false;
        }
        return true;
    }

    const handleSaveIdibuUser = () => {
        // ApiService.saveAuditLog();
        setIsFormSubmitted(true);
        const isAllFieldsValid = validateFormFields();
        if (isAllFieldsValid) {
            let payLoad = {
                "firstname": addIdibuUserFormik.values.firstname,
                "lastname": addIdibuUserFormik.values.lastname,
                "company": addIdibuUserFormik.values.company,
                "address": addIdibuUserFormik.values.address,
                "addressLine1": addIdibuUserFormik.values.addressLine1,
                "addressLine2": addIdibuUserFormik.values.addressLine2,
                "addressLine3": addIdibuUserFormik.values.addressLine3,
                "country": addIdibuUserFormik.values.country,
                "postcode": addIdibuUserFormik.values.postcode,
                "email": addIdibuUserFormik.values.email,
                "phone": addIdibuUserFormik.values.phone,
                "fax": addIdibuUserFormik.values.fax,
                "www": addIdibuUserFormik.values.www,
                recrId: addIdibuUserFormik.values.selectedRecruiterId,
                clientId: userLocalData.getvalue("clientId"),
                "idibuTeamId": userInfo?.idibuTeams[0]
            }
            if (isEdit) {
                payLoad = Object.assign({}, payLoad, { idibuId: editUserData.id })
            }
            trackPromise(
                ApiService.postWithData("admin", "createRecruiter", payLoad).then((res: any) => {
                    if (res?.data?.Success) {
                        showToaster(res?.data?.Message || "User Created Successfully", "success");
                        closeDialog(true);
                    } else {
                        showToaster(res?.data?.Message || "Something went wrong, Please try again later", "error")
                    }
                })
            )
        }
    }

    const userFields = [
        { name: "firstname", label: "Firstname", required: true, value: addIdibuUserFormik.values.firstname, type: "text", gridSize: 4, disabled: true },
        { name: "lastname", label: "Lastname", required: true, value: addIdibuUserFormik.values.lastname, type: "text", gridSize: 4, disabled: true },
        { name: "email", label: "Email", required: true, value: addIdibuUserFormik.values.email, type: "email", gridSize: 4, disabled: true },
        { name: "company", label: "Company", required: true, value: addIdibuUserFormik.values.company, type: "text", gridSize: 4 },
        { name: "address", label: "Address", required: true, value: addIdibuUserFormik.values.address, type: "text", gridSize: 4 },
        { name: "addressLine1", label: "Address Line 1", required: false, value: addIdibuUserFormik.values.addressLine1, type: "text", gridSize: 4 },
        { name: "addressLine2", label: "Address Line 2", required: false, value: addIdibuUserFormik.values.addressLine2, type: "text", gridSize: 4 },
        { name: "addressLine3", label: "Address Line 3", required: false, value: addIdibuUserFormik.values.addressLine3, type: "text", gridSize: 4 },
        { name: "country", label: "Country", required: true, value: addIdibuUserFormik.values.country, type: "text", gridSize: 4, select: true, options: Job_CountryShortCode.sort((a, b) => a.label.localeCompare(b.label)), optionKeys: { id: "id", label: "label" } },
        { name: "postcode", label: "Postcode", required: true, value: addIdibuUserFormik.values.postcode, type: "tel", gridSize: 4, maxLength: 6 },
        { name: "phone", label: "Phone Number", required: true, value: addIdibuUserFormik.values.phone, type: "phone_number", gridSize: 4 },
        { name: "fax", label: "Fax", required: false, value: addIdibuUserFormik.values.fax, type: "text", gridSize: 4 },
        { name: "www", label: "Website", required: true, value: addIdibuUserFormik.values.www, type: "text", gridSize: 4 },
    ];

    return (
        <Dialog open={openDialog} onClose={() => closeDialog()} maxWidth="md" fullWidth>
            <DialogTitle>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant="h6">Add Idibu User</Typography>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                        <Button variant="outlined" color="secondary" onClick={() => closeDialog()}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSaveIdibuUser}>{isEdit ? "Update" : "Save"}</Button>
                    </Stack>
                </Stack>
            </DialogTitle>
            <Divider />
            <DialogContent>
                <form onSubmit={addIdibuUserFormik.handleSubmit}>
                    <Grid container size={12} columnSpacing={2} rowSpacing={0.5} my={1.5}>
                        <Grid size={12} mb={1}>
                            <Typography gutterBottom>{["", null, undefined, 0].includes(addIdibuUserFormik.values.selectedRecruiterId) &&
                                "Please select recruiter to fill the form"
                            }</Typography>
                            <MUIAutoComplete
                                id='selectedRecruiter'
                                handleChange={(id: any, name: string) => {
                                    isInitialLoad.current = false;
                                    handleResetForm();
                                    addIdibuUserFormik.setFieldValue('selectedRecruiterId', id);
                                    addIdibuUserFormik.setFieldValue('selectedRecruiterName', name);
                                    addIdibuUserFormik.setFieldError("selectedRecruiterId", "");
                                }}
                                valuePassed={(addIdibuUserFormik.values.selectedRecruiterId) ? { label: addIdibuUserFormik.values.selectedRecruiterName, id: addIdibuUserFormik.values.selectedRecruiterId } : {}}
                                isMultiple={false}
                                freeSolo
                                width="100%"
                                type='id'
                                placeholder={
                                    <span>
                                        Select Recruiter <span style={{ color: 'red' }}>*</span>
                                    </span>
                                }
                            />
                            <ErrorMessage name={"selectedRecruiterId"} formikObj={addIdibuUserFormik} isFormSubmitted={isFormSubmitted} />
                        </Grid>
                        {userFields.map((field, index: number) => (
                            <Grid key={index + field.name} size={field.gridSize} sx={{ opacity: ["", null, undefined, 0].includes(addIdibuUserFormik.values.selectedRecruiterId) ? 0.75 : 1 }}>
                                {field.type === "phone_number" ?
                                    <PhoneInput
                                        id={field.name}
                                        name={field.name}
                                        placeholder="(999) 999-9999"
                                        value={field.value}
                                        onChange={(e: any) => {
                                            addIdibuUserFormik.setFieldValue(field.name, e.target.value);
                                        }}
                                        label={<Fragment>{field.label}{field.required && <span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        type={field.type}
                                        size="small"
                                        fullWidth
                                        disabled={["", null, undefined, 0].includes(addIdibuUserFormik.values.selectedRecruiterId)}
                                    />
                                    : <TextField
                                        key={index + field.name}
                                        name={field.name}
                                        id={field.name}
                                        label={<Fragment>{field.label}{field.required && <span style={{ color: 'red' }}>*</span>}</Fragment>}
                                        placeholder={`Enter ${field.label.toLowerCase()}`}
                                        type={field.type}
                                        fullWidth
                                        size="small"
                                        value={field.value}
                                        onChange={addIdibuUserFormik.handleChange}
                                        select={field.select}
                                        disabled={(field?.disabled ? true : false) || ["", null, undefined, 0].includes(addIdibuUserFormik.values.selectedRecruiterId)}
                                    >
                                        {(field?.select) ? <MenuItem value={""}>--Select Country--</MenuItem> : null}
                                        {(field?.select && !!field?.options?.length) ? field.options?.map((each: any, index: number) => (
                                            <MenuItem key={index} value={each[field.optionKeys.id]}>{each[field.optionKeys.label]}</MenuItem>
                                        )) : null}
                                    </TextField>
                                }
                                <ErrorMessage name={field.name} formikObj={addIdibuUserFormik} isFormSubmitted={isFormSubmitted} />
                            </Grid>
                        ))}
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddIdibuUser;