import {React} from '../../../../../shared/modules/React';
import {Grid, TextField} from '../../../../../shared/modules/commonImports';
import {Card, CardContent} from '../../../../../shared/modules/MaterialImports/Card';
import {Box} from "../../../../../shared/modules/MaterialImports/Box";
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";

import './Overview.scss';


const Overview = () => {
    const [userinfo, setUserinfo] = React.useState();
    const initialOverviewDetails = {
        "companyId": "",
        "companyName": "",
        "owner": "",
        "mainPhone": "",
        "alternativePhone1": "",
        "alternativePhone2": "",
        "fax": "",
        "mainCompanyWebsite": "",
        "jobsWebsite": "",
        "streetAddress": "",
        "streetAddress1": "",
        "city": "",
        "stateOrProv": "",
        "postalCode": "",
        "countryOrLocale": "",
        "region": "",
    }
    const overviewSchema = Yup.object().shape({
        "companyId": Yup.string(),
        "companyName": Yup.string(),
        "owner": Yup.string(),
        "mainPhone": Yup.string(),
        "alternativePhone1": Yup.string(),
        "alternativePhone2": Yup.string(),
        "fax": Yup.string(),
        "mainCompanyWebsite": Yup.string(),
        "jobsWebsite": Yup.string(),
        "streetAddress": Yup.string(),
        "streetAddress1": Yup.string(),
        "city": Yup.string(),
        "stateOrProv": Yup.string(),
        "postalCode": Yup.string(),
        "countryOrLocale": Yup.string(),
        "region": Yup.string(),
    });
    const overviewFormik = useFormik({
        initialValues: initialOverviewDetails,
        validationSchema: overviewSchema,
        onSubmit: (values: any) => {
            setUserinfo(values);
            // console.log(values);
        }
    });
    return (
        <>
            <div>
                <form
                    onSubmit={overviewFormik.handleSubmit}
                >
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid size={4}>
                                    <label>Company ID</label>
                                    <div>
                                        <TextField
                                            fullWidth
                                            id="companyId"
                                            name="companyId"
                                            size="small"
                                            margin="dense"
                                            value={overviewFormik.values.companyId}
                                            onChange={overviewFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={4}>
                                    <label>Company Name*</label>
                                    <div>
                                        <TextField
                                            fullWidth
                                            id="companyName"
                                            name="companyName"
                                            size="small"
                                            margin="dense"
                                            value={overviewFormik.values.companyName}
                                            onChange={overviewFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={4}>
                                    <label>Owner</label>
                                    <div>
                                        <TextField style={{ marginTop: '5px' }}
                                            fullWidth
                                            id="owner"
                                            name="owner"
                                            size="small"
                                            select
                                            value={overviewFormik.values.owner}
                                            onChange={overviewFormik.handleChange}
                                        >
                                            <MenuItem value="Aakash Kumar">Aakash Kumar</MenuItem>
                                            <MenuItem value="Asha R">Asha R</MenuItem>
                                            <MenuItem value="Atul Kumar">Atul Kumar</MenuItem>
                                            <MenuItem value="Fazil Khan">Fazil Khan</MenuItem>
                                            <MenuItem value="Aakash Mehra">Aakash Mehra</MenuItem>
                                        </TextField>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid size={3}>
                                    <label>Main Phone</label>
                                    <div>
                                        <TextField
                                            fullWidth
                                            id="mainPhone"
                                            name="mainPhone"
                                            size="small"
                                            margin="dense"
                                            value={overviewFormik.values.mainPhone}
                                            onChange={overviewFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={3}>
                                    <label>Alternative Phone 1</label>
                                    <div>
                                        <TextField
                                            fullWidth
                                            id="alternativePhone1"
                                            name="alternativePhone1"
                                            size="small"
                                            margin="dense"
                                            value={overviewFormik.values.alternativePhone1}
                                            onChange={overviewFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={3}>
                                    <label>Alternative Phone 2</label>
                                    <div>
                                        <TextField
                                            fullWidth
                                            id="alternativePhone2"
                                            name="alternativePhone2"
                                            size="small"
                                            margin="dense"
                                            value={overviewFormik.values.alternativePhone2}
                                            onChange={overviewFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={3}>
                                    <label>Fax</label>
                                    <div>
                                        <TextField
                                            fullWidth
                                            id="fax"
                                            name="fax"
                                            size="small"
                                            margin="dense"
                                            value={overviewFormik.values.fax}
                                            onChange={overviewFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <label style={{ marginLeft: '15px' }}>Main Company Website*</label>
                                        <div>
                                            <TextField style={{ marginLeft: '15px' }}
                                                fullWidth
                                                id="mainCompanyWebsite"
                                                name="mainCompanyWebsite"
                                                size="small"
                                                margin="dense"
                                                value={overviewFormik.values.mainCompanyWebsite}
                                                onChange={overviewFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid size={6} >
                                        <label style={{ marginLeft: '12px' }}>Jobs Website</label>
                                        <div>
                                            <TextField style={{ marginLeft: '12px' }}
                                                fullWidth
                                                id="jobsWebsite"
                                                name="jobsWebsite"
                                                size="small"
                                                margin="dense"
                                                value={overviewFormik.values.jobsWebsite}
                                                onChange={overviewFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={4}>
                                        <label style={{ marginLeft: '15px' }}>Street Address</label>
                                        <div>
                                            <TextField style={{ marginLeft: '15px' }}
                                                fullWidth
                                                id="streetAddress"
                                                name="streetAddress"
                                                size="small"
                                                margin="dense"
                                                value={overviewFormik.values.streetAddress}
                                                onChange={overviewFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid size={4}>
                                        <label style={{ marginLeft: '15px' }}>Street Address 1</label>
                                        <div>
                                            <TextField style={{ marginLeft: '15px' }}
                                                fullWidth
                                                id="streetAddress1"
                                                name="streetAddress1"
                                                size="small"
                                                margin="dense"
                                                value={overviewFormik.values.streetAddress1}
                                                onChange={overviewFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid size={4}>
                                        <label style={{ marginLeft: '15px' }}>City</label>
                                        <div>
                                            <TextField style={{ marginLeft: '15px' }}
                                                fullWidth
                                                id="city"
                                                name="city"
                                                size="small"
                                                margin="dense"
                                                value={overviewFormik.values.city}
                                                onChange={overviewFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid size={3}>
                                    <label>State or Prov</label>
                                    <div>
                                        <TextField
                                            fullWidth
                                            id="stateOrProv"
                                            name="stateOrProv"
                                            size="small"
                                            margin="dense"
                                            value={overviewFormik.values.stateOrProv}
                                            onChange={overviewFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={3}>
                                    <label>Postal Code</label>
                                    <div>
                                        <TextField
                                            fullWidth
                                            id="postalCode"
                                            name="postalCode"
                                            size="small"
                                            margin="dense"
                                            value={overviewFormik.values.postalCode}
                                            onChange={overviewFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={3}>
                                    <label>Country/Locale</label>
                                    <div>
                                        <TextField
                                            fullWidth
                                            id="country/locale"
                                            name="country/locale"
                                            size="small"
                                            margin="dense"
                                            value={overviewFormik.values.countryOrLocale}
                                            onChange={overviewFormik.handleChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid size={3}>
                                    <label>Region</label>
                                    <div>
                                        <Box>
                                            <TextField fullWidth style={{ marginTop: '8px' }}
                                                id="region"
                                                name="region"
                                                size="small"
                                                select
                                                value={overviewFormik.values.region}
                                                onChange={overviewFormik.handleChange}
                                            >
                                                <MenuItem value=""></MenuItem>
                                                <MenuItem value="-PST">-PST</MenuItem>
                                                <MenuItem value="-MST">-MST</MenuItem>
                                                <MenuItem value="-CST">-CST</MenuItem>
                                                <MenuItem value="-EST">-EST</MenuItem>
                                                <MenuItem value="-GMT">-GMT</MenuItem>
                                                <MenuItem value="none">none</MenuItem>
                                            </TextField>
                                        </Box>
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
export default Overview;