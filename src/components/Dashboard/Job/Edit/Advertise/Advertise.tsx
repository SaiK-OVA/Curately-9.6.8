//import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import InputLabel from '@mui/material/InputLabel';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import * as Yup from "yup";
import { useFormik } from "formik";

import './Advertise.scss';


const Advertise = () => {
    const initialAdvertiseDetails = {
        "haley": true,
        "recruiter": true,
        "accountManager": true,
        "specificemail": true,
        "pleaseselectboard": ""
    };
    const advertiseSchema = Yup.object().shape({
        "haley": Yup.boolean(),
        "recruiter": Yup.boolean(),
        "accountManager": Yup.boolean(),
        "specificemail": Yup.boolean(),
        "pleaseselectboard": Yup.string()
    });
    const advertiseFormik = useFormik({
        initialValues: initialAdvertiseDetails,
        validationSchema: advertiseSchema,
        onSubmit: (values) => {
            // console.log(values);
        }
    });
    return (
        <>
            <div className="job py-5 px-5 mx-5">
                <form
                    onSubmit={advertiseFormik.handleSubmit}
                >
                    {/* <Tabs style={{ margin: 0 }}>
                
            </Tabs> */}
                    <Tab label="Advertise" className="advert" />
                    <hr style={{ marginLeft: '15px' }} />
                    <Grid container direction="row" justifyContent="center">

                        <label>Please Select Job Board</label>
                    </Grid>
                    <Grid container direction="row" justifyContent="center">
                        {/* <InputLabel id="demo-multiple-name-label">Dice</InputLabel> */}
                        <TextField sx={{ m: 0.2, width: 200 }}
                            id="pleaseselectboard"
                            name="pleaseselectboard"
                            value={advertiseFormik.values.pleaseselectboard}
                            size="small"
                            onChange={advertiseFormik.handleChange}
                            variant="outlined"
                            select
                        >
                            <MenuItem value=""></MenuItem>
                            <MenuItem value="Part-time">Part-time</MenuItem>
                            <MenuItem value="Full-time">Full-time</MenuItem>
                        </TextField>
                    </Grid>
                    <br />
                    <Grid container direction="row" justifyContent="center">
                        <Button variant="contained" className="publishjob" type="submit">
                            Publish Job
                        </Button>
                    </Grid>
                    <div className='right'>
                        <FormControlLabel
                            style={{ width: 200, margin: 1 }}
                            control={<Checkbox />}
                            label="Haley"
                            labelPlacement="end"
                            id="haley"
                            name="haley"
                            value={advertiseFormik.values.haley}
                            onChange={advertiseFormik.handleChange}
                        />
                        <Button variant="contained" type="submit">
                            Publish Job
                        </Button>
                    </div>
                    <br />
                    <div>
                        <label className='right'>Job Boards</label><br />
                        <label>Email Notifications</label><br />
                        <FormControlLabel style={{ width: 200, margin: 1 }}
                            control={<Checkbox />}
                            label="Recruiter"
                            labelPlacement="end"
                            id="recruiter"
                            name="recruiter"
                            value={advertiseFormik.values.recruiter}
                            onChange={advertiseFormik.handleChange}
                        />
                        <FormControlLabel style={{ width: 200, margin: 1 }}
                            control={<Checkbox />}
                            label="Account Manager"
                            labelPlacement="end"
                            id="accountManager"
                            name="accountManager"
                            value={advertiseFormik.values.accountManager}
                            onChange={advertiseFormik.handleChange}
                        />
                    </div>
                    <FormControlLabel style={{ width: 200, margin: 1 }}
                        control={<Checkbox />}
                        label="Specific Email:"
                        labelPlacement="end"
                        id="specificemail"
                        name="specificemail"
                        value={advertiseFormik.values.specificemail}
                        onChange={advertiseFormik.handleChange}
                    />
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Button
                            variant="outlined"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                </form>
            </div >
        </>
    )
}

export default Advertise;