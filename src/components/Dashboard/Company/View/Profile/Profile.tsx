import {React} from '../../../../../shared/modules/React';
import {TextField, FormControlLabel} from '../../../../../shared/modules/MaterialImports/FormInputs';
import {Grid} from '../../../../../shared/modules/MaterialImports/Grid';
import {Checkbox} from '../../../../../shared/modules/MaterialImports/FormElements';
import {Box} from "../../../../../shared/modules/MaterialImports/Box";
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
import {Card, CardContent} from '../../../../../shared/modules/MaterialImports/Card';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";



import './Profile.scss';


const Profile = () => {
    const [userinfo, setUserinfo] = React.useState();
    const initialProfileDetails = {
        "active": "",
        "pipelineStatus": "",
        "industry": "",
        "sic": "",
        "yearStarted": "",
        "chkNoBulk": "",
        "employees": "",
        "revenue": "",
        "exchange": "",
        "symbol": "",
        "userAgency": "",
    }
    const profileSchema = Yup.object().shape({
        "active": Yup.string(),
        "pipelineStatus": Yup.string(),
        "industry": Yup.string(),
        "sic": Yup.string(),
        "yearStarted": Yup.string(),
        "chkNoBulk": Yup.string(),
        "employees": Yup.string(),
        "revenue": Yup.string(),
        "exchange": Yup.string(),
        "symbol": Yup.string(),
        "userAgency": Yup.string(),
    });
    const profileFormik = useFormik({
        initialValues: initialProfileDetails,
        validationSchema: profileSchema,
        onSubmit: (values: any) => {
            setUserinfo(values);
            // console.log(values);
        }
    });
    return (
        <>
            <div>
                <form
                    onSubmit={profileFormik.handleSubmit}
                >
                    <Card>
                        <CardContent>
                            <Grid>
                                <Grid container spacing={2}>
                                    <Grid size={2}>
                                        <FormControlLabel
                                            control={<Checkbox size="small" />}
                                            label="Active"
                                            labelPlacement="end"
                                            id="active"
                                            name="active"
                                            value={profileFormik.values.active}
                                            onChange={profileFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={2}>
                                        <div>                                         <Box>
                                            <TextField fullWidth style={{ marginTop: '8px' }} label="Pipeline Status" className='pipe'
                                                value={profileFormik.values.pipelineStatus}
                                                onChange={profileFormik.handleChange}
                                                id="pipelineStatus"
                                                name="pipelineStatus"
                                                select
                                                size="small"
                                            >
                                                <MenuItem value="0: Inactive">0: Inactive</MenuItem>
                                                <MenuItem value="2: Target">2: Target</MenuItem>
                                                <MenuItem value="3: SendOuts">3: SendOuts</MenuItem>
                                                <MenuItem value="4:Interviewing">4:Interviewing</MenuItem>
                                                <MenuItem value="5: $ Key Account $">5: $ Key Account $</MenuItem>
                                                <MenuItem value="1: New Lead">1: New Lead</MenuItem>
                                                <MenuItem value="0: Non-Employer">0: Non-Employer</MenuItem>
                                                <MenuItem value="5: Account">5: Account</MenuItem>
                                                <MenuItem value="0: Human Resources">0: Human Resources</MenuItem>
                                                <MenuItem value="0: Interviewer">0: Interviewer</MenuItem>
                                                <MenuItem value="3: Client">3: Client</MenuItem>
                                            </TextField>
                                        </Box>
                                        </div>
                                    </Grid>
                                    <Grid size={2}>
                                        <div >
                                            <Box>
                                                <TextField className='pipe' fullWidth style={{ marginTop: '8px' }} label="Industry"
                                                    id="industry"
                                                    name="industry"
                                                    select
                                                    size="small"
                                                    value={profileFormik.values.industry}
                                                    onChange={profileFormik.handleChange}
                                                >
                                                    <MenuItem value="-Select-">-Select-</MenuItem>
                                                    <MenuItem value="Aerospace & Defense">Aerospace & Defense</MenuItem>
                                                    <MenuItem value="Agriculture">Agriculture</MenuItem>
                                                    <MenuItem value="Auto & Transportation">Auto & Transportation</MenuItem>
                                                    <MenuItem value="Banking">Banking</MenuItem>
                                                    <MenuItem value="Computer Software">Computer Software</MenuItem>
                                                    <MenuItem value="Education">Education</MenuItem>
                                                    <MenuItem value="Environmental Services">Environmental Services</MenuItem>
                                                    <MenuItem value="Financial Services">Financial Services</MenuItem>
                                                    <MenuItem value="Information Technology">Information Technology</MenuItem>
                                                    <MenuItem value="Metals & Mining">Metals & Mining</MenuItem>
                                                    <MenuItem value="Pharmaceuticals">Pharmaceuticals</MenuItem>
                                                    <MenuItem value="Real Estate">Real Estate</MenuItem>
                                                    <MenuItem value="Security Products/Service ">Security Products/Service</MenuItem>
                                                    <MenuItem value="TeleComEquipment">TeleComEquipment</MenuItem>
                                                </TextField>
                                            </Box>
                                        </div>
                                    </Grid>
                                    <Grid size={3}>
                                        <label>SIC</label>
                                        <div>
                                            <TextField fullWidth
                                                id="sic"
                                                name="sic"
                                                size="small"
                                                margin="dense"
                                                value={profileFormik.values.sic}
                                                onChange={profileFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid size={3}>
                                        <label>Yr. Started</label>
                                        <div>
                                            <TextField fullWidth
                                                id="yearStarted"
                                                name="yearStarted"
                                                size="small"
                                                margin="dense"
                                                value={profileFormik.values.yearStarted}
                                                onChange={profileFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid size={2}>
                                        <FormControlLabel
                                            control={<Checkbox size="small" />}
                                            label="chkNoBulk"
                                            labelPlacement="end"
                                            id="chkNoBulk"
                                            name="chkNoBulk"
                                            value={profileFormik.values.chkNoBulk}
                                            onChange={profileFormik.handleChange}
                                        />
                                    </Grid>
                                    <Grid size={2}>
                                        <label style={{ marginRight: '10px' }}>Employees</label>
                                        <div>
                                            <TextField fullWidth
                                                id="employees"
                                                name="employees"
                                                size="small"
                                                margin="dense"
                                                value={profileFormik.values.employees}
                                                onChange={profileFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid size={3}>
                                        <label>Revenue</label>
                                        <div>
                                            <TextField fullWidth
                                                id="revenue"
                                                name="revenue"
                                                size="small"
                                                margin="dense"
                                                value={profileFormik.values.revenue}
                                                onChange={profileFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid size={2}>
                                        <div >
                                            <Box>
                                                <TextField fullWidth style={{ marginTop: '8px' }} className='pipe' label="Exchange"
                                                    id="exchange"
                                                    name="exchange"
                                                    select
                                                    size="small"
                                                    value={profileFormik.values.exchange}
                                                    onChange={profileFormik.handleChange}
                                                >
                                                    <MenuItem value="NASDAQ">NASDAQ</MenuItem>
                                                    <MenuItem value="NYSE">NYSE</MenuItem>
                                                    <MenuItem value="AMEX">AMEX</MenuItem>
                                                    <MenuItem value="TSX">TSX</MenuItem>
                                                </TextField>
                                            </Box>
                                        </div>
                                    </Grid>
                                    <Grid size={3}>
                                        <label>Symbol</label>
                                        <div>
                                            <TextField fullWidth
                                                id="symbol"
                                                name="symbol"
                                                size="small"
                                                margin="dense"
                                                value={profileFormik.values.symbol}
                                                onChange={profileFormik.handleChange}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid size={3}>
                                        <FormControlLabel
                                            control={<Checkbox size="small" />}
                                            label="User Agency"
                                            labelPlacement="end"
                                            id="userAgency"
                                            name="userAgency"
                                            value={profileFormik.values.userAgency}
                                            onChange={profileFormik.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    )
}
export default Profile;