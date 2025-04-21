import { React } from '../../../../../shared/modules/React';
import { TextField, FormControlLabel } from '../../../../../shared/modules/MaterialImports/FormInputs';
import { Grid, Button } from '../../../../../shared/modules/commonImports';
import { Checkbox } from '../../../../../shared/modules/MaterialImports/FormElements';
import { Box } from "../../../../../shared/modules/MaterialImports/Box";
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';

import { Card, CardContent } from '../../../../../shared/modules/MaterialImports/Card';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";

import './DirectHireFreeAgreement.scss';


const DirectHireFreeAgreement = () => {
    const [userinfo, setUserinfo] = React.useState();
    const initialHireAgreementDetails = {
        "sent": "",
        "received": "",
        "fee": "",
        "flatFree": "",
        "guaranteeInformation": "",
        "terms": "",
        "dateestablishment": "",
        "expireDate": "",
        "primaryContact": "",
    }
    const hireAgreementSchema = Yup.object().shape({
        "sent": Yup.string(),
        "received": Yup.string(),
        "fee": Yup.string(),
        "flatFree": Yup.string(),
        "guaranteeInformation": Yup.string(),
        "terms": Yup.string(),
        "dateestablishment": Yup.string(),
        "expireDate": Yup.string(),
        "primaryContact": Yup.string(),
    });
    const hireAgreementFormik = useFormik({
        initialValues: initialHireAgreementDetails,
        validationSchema: hireAgreementSchema,
        onSubmit: (values: any) => {
            setUserinfo(values);
            // console.log(values);
        }
    });
    return (
        <>
            <div>
                <form
                    onSubmit={hireAgreementFormik.handleSubmit}
                >
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={2} style={{ alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label="Sent"
                                        labelPlacement="end"
                                        id="sent"
                                        name="sent"
                                        value={hireAgreementFormik.values.sent}
                                        onChange={hireAgreementFormik.handleChange}
                                    />
                                </Grid>
                                <Grid size={2} style={{ alignItems: 'center' }}>
                                    <FormControlLabel
                                        control={<Checkbox size="small" />}
                                        label="Received"
                                        labelPlacement="end"
                                        id="received"
                                        name="received"
                                        value={hireAgreementFormik.values.received}
                                        onChange={hireAgreementFormik.handleChange}
                                    />
                                </Grid>
                                <Grid size={2}>
                                    <label>% Fee</label>
                                    <div>
                                        <Box>
                                            <TextField fullWidth style={{ marginTop: '8px' }}
                                                id="fee"
                                                name="fee"
                                                size="small"
                                                select
                                                value={hireAgreementFormik.values.fee}
                                                onChange={hireAgreementFormik.handleChange}
                                            >
                                                <MenuItem value="15">15</MenuItem>
                                                <MenuItem value="16">16</MenuItem>
                                                <MenuItem value="17">17</MenuItem>
                                                <MenuItem value="18/">18</MenuItem>
                                                <MenuItem value="19">19</MenuItem>
                                                <MenuItem value="20">20</MenuItem>
                                                <MenuItem value="21">21</MenuItem>
                                                <MenuItem value="22">22</MenuItem>
                                                <MenuItem value="23">23</MenuItem>
                                                <MenuItem value="24">24</MenuItem>
                                                <MenuItem value="25">25</MenuItem>
                                            </TextField>
                                        </Box>
                                    </div>
                                </Grid>
                                <Grid size={3}>
                                    <label>Flat Free</label>
                                    <div>
                                        <TextField
                                            id="flatFree"
                                            name="flatFree"
                                            size="small"
                                            margin="dense"
                                            value={hireAgreementFormik.values.flatFree}
                                            onChange={hireAgreementFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={3}>
                                    <label>Guarantee Information</label>
                                    <div>
                                        <TextField fullWidth
                                            id="guaranteeInformation"
                                            name="guaranteeInformation"
                                            size="small"
                                            margin="dense"
                                            value={hireAgreementFormik.values.guaranteeInformation}
                                            onChange={hireAgreementFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid size={2}>
                                    <label>Terms</label>
                                    <div>
                                        <TextField
                                            id="terms"
                                            name="terms"
                                            size="small"
                                            margin="dense"
                                            value={hireAgreementFormik.values.terms}
                                            onChange={hireAgreementFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={3}>
                                    <label>Date Establishment</label>
                                    <div>
                                        <TextField
                                            id="dateestablishment"
                                            name="dateEstablishment"
                                            size="small"
                                            margin="dense"
                                            value={hireAgreementFormik.values.dateestablishment}
                                            onChange={hireAgreementFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={2}>
                                    <label>Expire Date</label>
                                    <div>
                                        <TextField
                                            id="expireDate"
                                            name="expireDate"
                                            size="small"
                                            margin="dense"
                                            value={hireAgreementFormik.values.expireDate}
                                            onChange={hireAgreementFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={5}>
                                    <label>Primary Contact</label>
                                    <div>
                                        <TextField
                                            id="primaryContact"
                                            name="primaryContact"
                                            size="small"
                                            margin="dense"
                                            value={hireAgreementFormik.values.primaryContact}
                                            onChange={hireAgreementFormik.handleChange}
                                        />
                                        <Button style={{ margin: '5px' }} variant="contained">...</Button>
                                        <Button variant="contained">Clear</Button>
                                    </div>

                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    )
}
export default DirectHireFreeAgreement;