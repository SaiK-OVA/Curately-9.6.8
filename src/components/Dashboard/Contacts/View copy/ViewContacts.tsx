import  { React, useState } from '../../../../shared/modules/React';
import { useFormik, Yup } from '../../../../shared/modules/Formik';
import { Tabs,  Tab } from '../../../../shared/modules/MaterialImports/Tabs';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
import {TextField} from '../../../../shared/modules/MaterialImports/TextField';
import {MenuItem} from '../../../../shared/modules/MaterialImports/Menu';

import {Button} from '../../../../shared/modules/MaterialImports/Button';
import {Checkbox} from '../../../../shared/modules/MaterialImports/FormElements';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import { Container } from '@mui/system';

import './AddContacts.scss'




interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AddContacts = () => {
    const [value, setValue] = useState(0);
    const [isNextClicked, setNextClicked] = useState(false)
    // const [error, setError] = useState('')

    const initialValues = {
        personId: '',
        prefix: '',
        firstName: '',
        middleName: '',
        lastName: '',
        nickName: '',
        bulk: false,
        direct: '',
        mobile: '',
        fax: '',
        linkedin: '',
        email: '',
        altemail: '',
        emailcc: '',
        reports: '',
        office: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        owner: ''
    }

    const addContactValidations = Yup.object({
        personId: Yup.string().required('Required'),
        prefix: Yup.string().required('Required'),
        firstName: Yup.string().required('Required'),
        middleName: Yup.string(),
        lastName: Yup.string().required('Required'),
        nickName: Yup.string(),
        bulk: Yup.boolean(),
        owner: Yup.string(),
        direct: Yup.string(),
        mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number is not valid').required('Mobile number is required'),
        fax: Yup.string(),
        linkedin: Yup.string(),
        email: Yup.string().email('Invalid email format').required('Required'),
        altemail: Yup.string().email('Invalid email format').required('Required'),
        emailcc: Yup.string().email('Invalid email format').required('Required'),
        reports: Yup.string(),
        office: Yup.string().required('Required'),
        street: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        zipcode: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
    })

    const tabHandleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSubmit = (values: any) => {
        if (formik.isValid) {
            // console.log(formik.values)
        } else {
            // console.log('No data, Please fill the form')
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema: addContactValidations,
        onSubmit: handleSubmit
    });

    // const handleNext = () => {
    //     setNextClicked(true);
    //     console.log('trigger')
    //     if (formik.isValid) {
    //         setValue((prevValue) => {
    //             // console.log(prevValue);
    //             if (prevValue < 2) {
    //                 return prevValue + 1;
    //             }
    //             return prevValue;
    //         });
    //     } else {
    //         setNextClicked(false);
    //     }
    // };

    const tab1 = formik.values.personId !== '' && formik.values.prefix !== '' && formik.values.firstName !== '' &&
        formik.values.lastName !== ''

    const tab2 = formik.values.mobile !== '' && formik.values.email !== ''

    const tab3 = formik.values.office !== '' && formik.values.street !== '' && formik.values.city !== '' &&
        formik.values.state !== '' && formik.values.zipcode !== '' && formik.values.country !== ''


    const handleNext = () => {

        setNextClicked(true);

        if (value < 2) {
            let tabCompleted = true;
            switch (value) {
                case 0:
                    tabCompleted = tab1;
                    break;
                case 1:
                    tabCompleted = tab2
                    break;
                case 2:
                    tabCompleted = tab3
                    break;
                default:
                    tabCompleted = true;
            }

            if (tabCompleted) {
                setValue(value + 1);
            }
            else {
                setNextClicked(false);
            }
        }
    };

    const handleReset = () => {
        setValue(0);
        formik.resetForm();
    }


    return (
        <Container>
            <Typography variant='h5' className='add-contact-heading'>Add New Contact</Typography>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ width: '100%' }}>
                    <Box>
                        <Tabs value={value}
                            onChange={tabHandleChange}
                            aria-label="basic tabs example"
                            className='tabs'
                        >
                            <Tab label="Contact Information" {...a11yProps(0)} />
                            <Tab label="Work Contact Information" {...a11yProps(1)} className='tab-margin' />
                            <Tab label="Alternate Business Address" {...a11yProps(2)} className='tab-margin' />

                        </Tabs>
                    </Box>

                    <Stack className='add-contact-box' >

                        <TabPanel value={value} index={0}>

                            <Stack className='container'>
                                <Box className='input'>
                                    <label htmlFor='personId'>Person ID</label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id="personId"
                                        variant="outlined"
                                        size='small'
                                        type='text'
                                        {...formik.getFieldProps('personId')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.personId || isNextClicked) && formik.errors.personId ? formik.errors.personId : ''}
                                    </span>
                                </Box>

                                <Box className='input  input-spaces' >
                                    <label htmlFor='prefix'>Prefix </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='prefix'
                                        name='prefix'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.prefix}
                                        size="small"
                                        select
                                    >
                                        <MenuItem value="" sx={{ height: '30px' }}></MenuItem>
                                        <MenuItem value="mr">Mr.</MenuItem>
                                        <MenuItem value="mrs">Mrs.</MenuItem>
                                        <MenuItem value="ms">Ms.</MenuItem>
                                        <MenuItem value="dr">Dr.</MenuItem>
                                        <MenuItem value="rev">Rev.</MenuItem>
                                        <MenuItem value="hon">Hon.</MenuItem>
                                    </TextField>
                                    <span className='errors'>
                                        {(formik.touched.prefix || isNextClicked) && formik.errors.prefix ? formik.errors.prefix : ''}

                                    </span>

                                </Box>
                            </Stack>

                            <Stack className='container'>
                                <Box className='input'>
                                    <label htmlFor='firstName'>First Name </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='firstName'
                                        // name='firstName'
                                        variant="outlined"
                                        size='small'
                                        {...formik.getFieldProps('firstName')}
                                        type='text'
                                    />
                                    <span className='errors'>
                                        {(formik.touched.firstName || isNextClicked) && formik.errors.firstName ? formik.errors.firstName : ''}

                                    </span>
                                </Box>
                                <Box className='input input-spaces'>
                                    <label htmlFor='middleName'>Middle Name</label>
                                    <TextField
                                        id='middleName'
                                        // name='middleName'
                                        variant="outlined"
                                        size='small'
                                        type='text'
                                        {...formik.getFieldProps('middleName')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.middleName || isNextClicked) && formik.errors.middleName ? formik.errors.middleName : ''}

                                    </span>
                                </Box>
                            </Stack>

                            <Stack className='container'>
                                <Box className='input'>
                                    <label htmlFor='lastName'>Last Name </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='lastName'
                                        // name='lastName'
                                        variant="outlined"
                                        size='small'
                                        {...formik.getFieldProps('lastName')}
                                        type='text'
                                    />
                                    <span className='errors'>
                                        {(formik.touched.lastName || isNextClicked) && formik.errors.lastName ? formik.errors.lastName : ''}

                                    </span>

                                </Box>
                                <Box className='input input-spaces'>
                                    <label htmlFor='nickName'>Nickname/Preferred </label>
                                    <TextField
                                        id='nickName'
                                        // name='nickName'
                                        variant="outlined"
                                        size='small'
                                        {...formik.getFieldProps('nickName')}
                                        type='text'
                                    />
                                    <span className='errors'>
                                        {(formik.touched.nickName || isNextClicked) && formik.errors.nickName ? formik.errors.nickName : ''}

                                    </span>
                                </Box>
                            </Stack>

                            <Stack className='container'>

                                <Box>
                                    <Box>
                                        <Checkbox
                                            id="bulk"
                                            name='bulk'
                                            size='small'
                                            checked={formik.values.bulk}
                                            onChange={formik.handleChange}
                                        />
                                        <label htmlFor='bulk'>No Bulk</label>
                                    </Box>
                                </Box>

                                <Box className='input checkbox-input-spaces'>
                                    <label htmlFor='owner'>Owner </label>
                                    <TextField
                                        id="owner"
                                        name='owner'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.owner}
                                        size="small"
                                        select
                                    >
                                        <MenuItem value="" sx={{ height: '30px' }}></MenuItem>
                                        <MenuItem value="aakash">Aakash Kumar</MenuItem>
                                        <MenuItem value="aarita">Aarita Joseph</MenuItem>
                                        <MenuItem value="abhilash">Abhilash Verma</MenuItem>
                                    </TextField>
                                    <span className='errors'>
                                        {(formik.touched.owner || isNextClicked) && formik.errors.owner ? formik.errors.owner : ''}

                                    </span>

                                </Box>
                            </Stack>

                            <Stack className='container button-container'
                                direction='row' spacing={7}
                            >
                                <Button
                                    variant="contained"
                                    size='small'
                                    color="primary"
                                    className='add-contact-buttons next-Button'
                                    type='submit'
                                    onClick={handleNext}
                                >
                                    NEXT
                                </Button>

                                <Button
                                    variant="outlined"
                                    size='small'
                                    color="secondary"
                                    className='add-contact-buttons reset-Button'
                                    onClick={handleReset}
                                >
                                    RESET
                                </Button>
                            </Stack>

                        </TabPanel>

                        <TabPanel value={value} index={1}>

                            <Stack className='container'>
                                <Box className='input'>
                                    <label htmlFor='direct'>Direct Phone</label>
                                    <TextField
                                        id='direct'
                                        // name='direct'
                                        variant="outlined"
                                        size='small'
                                        {...formik.getFieldProps('direct')}
                                        type='tel'
                                    />
                                    <span className='errors'>
                                        {(formik.touched.direct || isNextClicked) && formik.errors.direct ? formik.errors.direct : ''}

                                    </span>
                                </Box>
                                <Box className='input input-spaces'>
                                    <label htmlFor='mobile'>Mobile Phone </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='mobile'
                                        // name='mobile'
                                        variant="outlined"
                                        size='small'
                                        type='tel'
                                        {...formik.getFieldProps('mobile')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.mobile || isNextClicked) && formik.errors.mobile ? formik.errors.mobile : ""}

                                    </span>
                                </Box>
                            </Stack>

                            <Stack className='container'>
                                <Box className='input'>
                                    <label htmlFor='fax'>Fax</label>
                                    <TextField
                                        id='fax'
                                        // name='fax'
                                        variant="outlined"
                                        size='small'
                                        type='text'
                                        {...formik.getFieldProps('fax')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.fax || isNextClicked) && formik.errors.fax ? formik.errors.fax : ""}

                                    </span>
                                </Box>
                                <Box className='input input-spaces'>
                                    <label htmlFor='linkedin'>Linkedin</label>
                                    <TextField
                                        id='linkedin'
                                        // name='linkedin'
                                        variant="outlined"
                                        size='small'
                                        type='text'
                                        {...formik.getFieldProps('linkedin')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.linkedin || isNextClicked) && formik.errors.linkedin ? formik.errors.linkedin : ""}

                                    </span>
                                </Box>
                            </Stack>

                            <Stack className='container'>
                                <Box className='input'>
                                    <label htmlFor='email'>Email</label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='email'
                                        // name='email'
                                        variant="outlined"
                                        size='small'
                                        type='email'
                                        {...formik.getFieldProps('email')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.email || isNextClicked) && formik.errors.email ? formik.errors.email : ""}

                                    </span>

                                </Box>
                                <Box className='input input-spaces'>
                                    <label htmlFor='altemail'>Alternate Email</label>
                                    <TextField
                                        id='altemail'
                                        // name='altemail'
                                        variant="outlined"
                                        type='email'
                                        size='small'
                                        {...formik.getFieldProps('altemail')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.altemail || isNextClicked) && formik.errors.altemail ? formik.errors.altemail : ""}

                                    </span>
                                </Box>
                            </Stack>

                            <Stack className='container '>
                                <Box className='input'>
                                    <label htmlFor='emailcc'>Email CC List</label>
                                    <TextField
                                        id='emailcc'
                                        // name='emailcc'
                                        variant="outlined"
                                        size='small'
                                        type='email'
                                        {...formik.getFieldProps('emailcc')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.emailcc || isNextClicked) && formik.errors.emailcc ? formik.errors.emailcc : ""}

                                    </span>
                                </Box>
                                <Box className='input input-spaces'>
                                    <label htmlFor='reports'>Reports to</label>
                                    <TextField
                                        id='reports'
                                        // name='reports'
                                        variant="outlined"
                                        size='small'
                                        type='text'
                                        {...formik.getFieldProps('reports')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.reports || isNextClicked) && formik.errors.reports ? formik.errors.reports : ""}

                                    </span>
                                </Box>
                            </Stack>

                            <Stack className='container button-container'
                                direction='row' spacing={7}
                            >
                                <Button
                                    variant="contained"
                                    size='small'
                                    // type='button'
                                    color="primary"
                                    className='add-contact-buttons next-Button'
                                    onClick={handleNext}
                                    type='submit'
                                >
                                    NEXT
                                </Button>

                                <Button
                                    variant="outlined"
                                    size='small'
                                    color="secondary"
                                    className='add-contact-buttons reset-Button'
                                    onClick={handleReset}
                                >
                                    RESET
                                </Button>
                            </Stack>

                        </TabPanel>

                        <TabPanel value={value} index={2}>

                            <Stack className='container '>
                                <Box className='input'>
                                    <label htmlFor='office'>Office Location Name </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='office'
                                        // name='office'
                                        variant="outlined"
                                        size='small'
                                        type='text'
                                        {...formik.getFieldProps('office')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.office || isNextClicked) && formik.errors.office ? formik.errors.office : ""}

                                    </span>
                                </Box>
                                <Box className='input input-spaces'>
                                    <label htmlFor='street'>Street Address </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='street'
                                        // name='street'
                                        variant="outlined"
                                        size='small'
                                        type='text'
                                        {...formik.getFieldProps('street')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.street || isNextClicked) && formik.errors.street ? formik.errors.street : ""}

                                    </span>
                                </Box>
                            </Stack>

                            <Stack className='container'>
                                <Box className='input'>
                                    <label htmlFor='city'>City </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='city'
                                        // name='city'
                                        variant="outlined"
                                        size='small'
                                        type='text'
                                        {...formik.getFieldProps('city')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.city || isNextClicked) && formik.errors.city ? formik.errors.city : ""}

                                    </span>
                                </Box>
                                <Box className='input input-spaces'>
                                    <label htmlFor='state'>State or Prov. </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='state'
                                        // name='state'
                                        variant="outlined"
                                        size='small'
                                        type='text'
                                        {...formik.getFieldProps('state')}
                                    />
                                    <span className='errors'>
                                        {(formik.touched.state || isNextClicked) && formik.errors.state ? formik.errors.state : ""}

                                    </span>
                                </Box>
                            </Stack>

                            <Stack className='container'>
                                <Box className='input'>
                                    <label htmlFor='zipcode'>Zip Code </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='zipcode'
                                        // name='zipcode'
                                        variant="outlined"
                                        size='small'
                                        {...formik.getFieldProps('zipcode')}
                                        type='text'
                                    />
                                    <span className='errors'>
                                        {(formik.touched.zipcode || isNextClicked) && formik.errors.zipcode ? formik.errors.zipcode : ""}

                                    </span>
                                </Box>
                                <Box className='input input-spaces'>
                                    <label htmlFor='country'>Country </label><span style={{ color: 'red' }}>*</span>
                                    <TextField
                                        id='country'
                                        // name='country'
                                        variant="outlined"
                                        size='small'
                                        {...formik.getFieldProps('country')}
                                        type='text'
                                    />
                                    <span className='errors'>
                                        {(formik.touched.country || isNextClicked) && formik.errors.country ? formik.errors.country : ""}

                                    </span>
                                </Box>
                            </Stack>

                            <Stack className='container button-container'
                                direction='row' spacing={7}
                            >
                                <Button
                                    variant="contained"
                                    size='small'
                                    color="primary"
                                    className='add-contact-buttons next-Button'
                                    type='submit'
                                    onClick={handleSubmit}
                                >
                                    SAVE
                                </Button>

                                <Button
                                    variant="outlined"
                                    size='small'
                                    color="secondary"
                                    className='add-contact-buttons reset-Button'
                                    onClick={handleReset}
                                >
                                    RESET
                                </Button>
                            </Stack>

                        </TabPanel>
                    </Stack>
                </Box>
            </form >
        </Container >
    )
}

export default AddContacts