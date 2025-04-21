import {Box} from '../../../../../shared/modules/MaterialImports/Box';
//import Tabs from '@mui/material/Tabs';
//import Tab from '@mui/material/Tab';
import {TextField, FormControlLabel} from '../../../../../shared/modules/MaterialImports/FormInputs';
import {Grid, Button} from '../../../../../shared/modules/commonImports';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {Checkbox} from '../../../../../shared/modules/MaterialImports/FormElements';
import { useFormik, Yup } from "../../../../../shared/modules/Formik";


import './UserDefined.scss';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));




const UserDefined = () => {
    const initialUserDefinedDetails = {
        "jobpriority": "",
        "notes": "",
        "numeric1": "",
        "closingdate": "",
        "recruiter1": "",
        "recruiter2": "",
        "numeric2": "",
        "date2": "",
        "lob": "",
        "text8": "",
        "numeric3": "",
        "date3": "",
        "text4": "",
        "originalJob": "",
        "numeric4": "",
        "date4": "",
        "costCenterNumber": "",
        "bussinessUnit": "",
        "numeric5": "",
        "date5": "",
        "relationshipJob": true,
        "liadm": true,
        "check3": true,
        "check4": true,
        "check5": true,
        "check6": true,
        "check7": true,
        "check8": true,
        "check9": true,
        "auto": true,
    };
    const userdefinedSchema = Yup.object().shape({
        "jobpriority": Yup.string(),
        "notes": Yup.string(),
        "numeric1": Yup.string(),
        "closingdate": Yup.string(),
        "recruiter1": Yup.string(),
        "recruiter2": Yup.string(),
        "numeric2": Yup.string(),
        "date2": Yup.string(),
        "lob": Yup.string(),
        "text8": Yup.string(),
        "numeric3": Yup.string(),
        "date3": Yup.string(),
        "text4": Yup.string(),
        "originalJob": Yup.string(),
        "numeric4": Yup.string(),
        "date4": Yup.string(),
        "costCenterNumber": Yup.string(),
        "bussinessUnit": Yup.string(),
        "numeric5": Yup.string(),
        "date5": Yup.string(),
        "relationshipJob": Yup.boolean(),
        "liadm": Yup.boolean(),
        "check3": Yup.boolean(),
        "check4": Yup.boolean(),
        "check5": Yup.boolean(),
        "check6": Yup.boolean(),
        "check7": Yup.boolean(),
        "check8": Yup.boolean(),
        "check9": Yup.boolean(),
        "auto": Yup.boolean(),
    });
    const userdefinedFormik = useFormik({
        initialValues: initialUserDefinedDetails,
        validationSchema: userdefinedSchema,
        onSubmit: (values) => {
            // console.log(values);
        }
    });

    return (
        <>
            <div className="job py-5 px-5 mx-5">
                <form
                    onSubmit={userdefinedFormik.handleSubmit}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container direction="row" justifyContent="start" alignItems={'left'}>
                            <Grid container direction="column">
                                {/* <Tabs style={{ margin: 0 }}>
                                    <Tab label="user-defined" className="advert" />
                                </Tabs> */}
                                <hr style={{ marginLeft: '15px' }} />
                            </Grid>
                            <Grid container spacing={2} justifyContent="flex-start">
                                <Grid size={8}>
                                    <Item><div>
                                        <label style={{ paddingRight: '132px' }}>Job Priority</label>
                                        <label style={{ paddingRight: '166px' }}>Notes</label>
                                        <label style={{ paddingRight: '140px' }}>Numeric 1</label>
                                        <label>Closing Date</label>
                                        <div>
                                            <TextField className='box1' id="jobpriority"
                                                name="jobpriority"
                                                value={userdefinedFormik.values.jobpriority}
                                                onChange={userdefinedFormik.handleChange} size="small" />
                                            <TextField className='box1' id="notes" name="notes"
                                                value={userdefinedFormik.values.notes}
                                                onChange={userdefinedFormik.handleChange} size="small" />
                                            <TextField className='box1' id="numeric1" name="numeric1"
                                                value={userdefinedFormik.values.numeric1}
                                                onChange={userdefinedFormik.handleChange} size="small" />
                                            <TextField className='box1' id="closingdate" name="closingdate"
                                                value={userdefinedFormik.values.closingdate}
                                                onChange={userdefinedFormik.handleChange} size="small" />
                                        </div>
                                    </div></Item>
                                    <Item><div>
                                        <label style={{ paddingRight: '135px' }}>Recruiter 1</label>
                                        <label style={{ paddingRight: '136px' }}>Recruiter 2</label>
                                        <label style={{ paddingRight: '140px' }}>Numeric 2</label>
                                        <label>Date 2</label>
                                        <div >
                                            <TextField className='box1' id="recruiter1" name="recruiter1"
                                                value={userdefinedFormik.values.recruiter1}
                                                onChange={userdefinedFormik.handleChange} size="small" />
                                            <TextField className='box1' id="recruiter2" name="recruiter2"
                                                value={userdefinedFormik.values.recruiter2}
                                                onChange={userdefinedFormik.handleChange} size="small" />
                                            <TextField className='box1' id="numeric2" name="numeric2"
                                                value={userdefinedFormik.values.numeric2}
                                                onChange={userdefinedFormik.handleChange} size="small" />
                                            <TextField className='box1' id="date2" name="date2"
                                                value={userdefinedFormik.values.date2}
                                                onChange={userdefinedFormik.handleChange} size="small" />
                                        </div>
                                    </div></Item>
                                    <Item><div>
                                        <label style={{ paddingRight: '173px' }}>LOB</label>
                                        <label style={{ paddingRight: '167px' }}>Text 8</label>
                                        <label style={{ paddingRight: '140px' }}>Numeric 3</label>
                                        <label>Date 3</label>
                                        <div >
                                            <TextField className='box1' id="lob" name="lob"
                                                value={userdefinedFormik.values.lob}
                                                onChange={userdefinedFormik.handleChange}
                                                size="small" variant="outlined" />
                                            <TextField className='box1' id="text8" name="text8"
                                                value={userdefinedFormik.values.text8}
                                                onChange={userdefinedFormik.handleChange}
                                                size="small" variant="outlined" />
                                            <TextField className='box1' id="numeric3" name="numeric3"
                                                value={userdefinedFormik.values.numeric3}
                                                onChange={userdefinedFormik.handleChange}
                                                size="small" variant="outlined" />
                                            <TextField className='box1' id="date3" name="date3"
                                                value={userdefinedFormik.values.date3}
                                                onChange={userdefinedFormik.handleChange}
                                                size="small" variant="outlined" />
                                        </div>
                                    </div></Item>
                                    <Item>
                                        <div>
                                            <label style={{ paddingRight: '164px' }}>Text 4</label>
                                            <label style={{ paddingRight: '73px' }}>Original Job Category</label>
                                            <label style={{ paddingRight: '140px' }}>Numeric 4</label>
                                            <label>Date 4</label>
                                            <div >
                                                <TextField className='box1' id="text4" name="text4"
                                                    value={userdefinedFormik.values.text4}
                                                    onChange={userdefinedFormik.handleChange}
                                                    size="small" variant="outlined" />
                                                <TextField className='box1' id="originalJob" name="originalJob"
                                                    value={userdefinedFormik.values.originalJob}
                                                    onChange={userdefinedFormik.handleChange}
                                                    size="small" variant="outlined" />
                                                <TextField className='box1' id="numeric4" name="numeric4"
                                                    value={userdefinedFormik.values.numeric4}
                                                    onChange={userdefinedFormik.handleChange}
                                                    size="small" variant="outlined" />
                                                <TextField className='box1' id="date4" name="date4"
                                                    value={userdefinedFormik.values.date4}
                                                    onChange={userdefinedFormik.handleChange}
                                                    size="small" variant="outlined" />
                                            </div>
                                        </div>
                                    </Item>
                                    <Item>
                                        <div>
                                            <label style={{ paddingRight: '80px' }}>Cost Center Number</label>
                                            <label style={{ paddingRight: '112px' }}>Bussiness Unit</label>
                                            <label style={{ paddingRight: '140px' }}>Numeric 5</label>
                                            <label>Date 5</label>
                                            <div >
                                                <TextField className='box1' id="costCenterNumber" name="costCenterNumber"
                                                    value={userdefinedFormik.values.costCenterNumber}
                                                    onChange={userdefinedFormik.handleChange}
                                                    size="small" variant="outlined" />
                                                <TextField className='box1' id="bussinessUnit" name="bussinessUnit"
                                                    value={userdefinedFormik.values.bussinessUnit}
                                                    onChange={userdefinedFormik.handleChange}
                                                    size="small" variant="outlined" />
                                                <TextField className='box1' id="numeric5" name="numeric5"
                                                    value={userdefinedFormik.values.numeric5}
                                                    onChange={userdefinedFormik.handleChange}
                                                    size="small" variant="outlined" />
                                                <TextField className='box1' id="date5" name="date5"
                                                    value={userdefinedFormik.values.date5}
                                                    onChange={userdefinedFormik.handleChange}
                                                    size="small" variant="outlined" />
                                            </div>
                                        </div>
                                    </Item>
                                </Grid>
                                <Grid size={4}>
                                    <Item><div>
                                        <FormControlLabel style={{ width: 200, margin: 0 }}
                                            control={<Checkbox size="small" />}
                                            label="Relationship Job"
                                            labelPlacement="end"
                                            id="relationshipJob"
                                            name="relationshipJob"
                                            value={userdefinedFormik.values.relationshipJob}
                                        />
                                        <div>
                                            <FormControlLabel style={{ width: 200, margin: 0 }}
                                                control={<Checkbox size="small" />}
                                                label="LI-Adm"
                                                labelPlacement="end"
                                                id="liadm"
                                                name="liadm"
                                                value={userdefinedFormik.values.liadm}
                                                onChange={userdefinedFormik.handleChange}
                                            />
                                            <div>
                                                <FormControlLabel style={{ width: 200, margin: 0 }}
                                                    control={<Checkbox size="small" />}
                                                    label="Check 3"
                                                    labelPlacement="end"
                                                    id="check3"
                                                    name="check3"
                                                    value={userdefinedFormik.values.check3}
                                                    onChange={userdefinedFormik.handleChange}
                                                />
                                                <div>
                                                    <FormControlLabel style={{ width: 200, margin: 0 }}
                                                        control={<Checkbox size="small" />}
                                                        label="Check 4"
                                                        labelPlacement="end"
                                                        id="check4"
                                                        name="check4"
                                                        value={userdefinedFormik.values.check4}
                                                        onChange={userdefinedFormik.handleChange}
                                                    />
                                                    <div>
                                                        <FormControlLabel style={{ width: 200, margin: 0 }}
                                                            control={<Checkbox size="small" />}
                                                            label="Check 5"
                                                            labelPlacement="end"
                                                            id="check5"
                                                            name="check5"
                                                            value={userdefinedFormik.values.check5}
                                                            onChange={userdefinedFormik.handleChange}
                                                        />
                                                        <div>
                                                            <FormControlLabel style={{ width: 200, margin: 0 }}
                                                                control={<Checkbox size="small" />}
                                                                label="Check 6"
                                                                labelPlacement="end"
                                                                id="check6"
                                                                name="check6"
                                                                value={userdefinedFormik.values.check6}
                                                                onChange={userdefinedFormik.handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <FormControlLabel style={{ width: 200, margin: 0 }}
                                                                control={<Checkbox size="small" />}
                                                                label="Check 7"
                                                                labelPlacement="end"
                                                                id="check7"
                                                                name="check7"
                                                                value={userdefinedFormik.values.check7}
                                                                onChange={userdefinedFormik.handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <FormControlLabel style={{ width: 200, margin: 0 }}
                                                                control={<Checkbox size="small" />}
                                                                label="Check 8"
                                                                labelPlacement="end"
                                                                id="check8"
                                                                name="check8"
                                                                value={userdefinedFormik.values.check8}
                                                                onChange={userdefinedFormik.handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <FormControlLabel style={{ width: 200, margin: 0 }}
                                                                control={<Checkbox size="small" />}
                                                                label="Check 9"
                                                                labelPlacement="end"
                                                                id="check9"
                                                                name="check9"
                                                                value={userdefinedFormik.values.check9}
                                                                onChange={userdefinedFormik.handleChange}
                                                            />
                                                        </div>
                                                        <div>
                                                            <FormControlLabel style={{ width: 200, margin: 0 }}
                                                                control={<Checkbox size="small" />}
                                                                label="Auto"
                                                                labelPlacement="end"
                                                                id="auto"
                                                                name="auto"
                                                                value={userdefinedFormik.values.auto}
                                                                onChange={userdefinedFormik.handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </Item>
                                </Grid>
                                <br />
                            </Grid>
                        </Grid>
                        <br />
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
                    </Box>
                </form>
            </div>
        </>
    )
}

export default UserDefined;