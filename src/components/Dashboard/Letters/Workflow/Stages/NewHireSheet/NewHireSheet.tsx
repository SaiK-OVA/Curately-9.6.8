import { useEffect, useRef, useState } from '../../../../../../shared/modules/React';

import { Form, Formik, useFormik, Yup} from '../../../../../../shared/modules/Formik';
import SaveIcon from '@mui/icons-material/Save';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Dialog, DialogContent, DialogActions, DialogTitle} from '../../../../../../shared/modules/MaterialImports/Dialog';
import {CircularProgress} from '../../../../../../shared/modules/MaterialImports/CircularProgress';
import {Box} from '../../../../../../shared/modules/MaterialImports/Box';
import { DatePicker, LocalizationProvider, AdapterLuxon } from '../../../../../../shared/modules/MaterialImports/DatePicker';
import { DateTime } from '../../../../../../shared/modules/Luxon';

import ApiService from '../../../../../../shared/api/api';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import { showToaster, TextField, Grid, Button } from '../../../../../../shared/modules/commonImports';
import {Divider} from '../../../../../../shared/modules/MaterialImports/Divider';
import CloseIcon from '@mui/icons-material/Close';
import {MenuItem} from '../../../../../../shared/modules/MaterialImports/Menu';
import { userLocalData } from '../../../../../../shared/services/userData';
import ErrorMessage from '../../../../../shared/Error/ErrorMessage';

const NewHireSheet = (
    {
        stageId,
        passedStageData = {},
        open,
        closePopup,
        update
    }: {
        stageId: string,
        passedStageData: any,
        open: boolean,
        closePopup: () => void,
        update: any
    }
) => {
    const ovaToken = useRef("")
    const ovaTokenAPICalled = useRef(0);
    const [showNewHireForm, setShowNewHireForm] = useState(false);
    const [sourcesList, setSourcesList] = useState([]);
    const [clientsList, setClientsList] = useState([{
        clientId: '',
        clientName: ''
    }]);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const newHireSchema = Yup.object().shape({
        hireCategory: Yup.string().required('Hire Category is required'),
        sourceId: Yup.string(),
        subvendorName: Yup.string(),
        subvendorEmail: Yup.string(),
        firstName: Yup.string(),
        middleName: Yup.string(),
        lastName: Yup.string(),
        emailId: Yup.string(),
        phone: Yup.string(),
        citizenShip: Yup.string().required('Citizenship is required'),
        citizenShipName: Yup.string(),
        address: Yup.string(),
        suiteNumber: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zipcode: Yup.string(),
        jobCategory: Yup.string().required('Job Category is required'),
        jobType: Yup.string().required('Job Type is required'),
        jobTitle: Yup.string().required('Job Title is required'),
        jobId: Yup.string(),
        sourcerName: Yup.string(),
        accountManagerName: Yup.string().required('Account Manager Name is required'),
        accountManagerEmail: Yup.string().required('Account Manager Email is required'),
        recruiterName: Yup.string().required('Recruiter Name is required'),
        recruiterEmail: Yup.string().required('Recruiter Email is required'),
        portfolioManager: Yup.string().required('Portfolio Manager is required'),
        notes: Yup.string(),
        clientName: Yup.string().required('Client Name is required'),
        clientId: Yup.string().required('Client Name is required'),
        durationOftheContract: Yup.number().required('Duration Of Contract is required'),
        tentiveStartDate: Yup.date().required('Tentative Start Date is required'),
        tentiveEndDate: Yup.date().required('Tentative End Date is required'),
        clientAddress: Yup.string().required('Client Street Address is required'),
        clientSuiteNumber: Yup.string(),
        clientCity: Yup.string().required('Client City is required'),
        clientState: Yup.string().required('Client State is required'),
        clientZipcode: Yup.string().required('Client Zip is required'),
        exemptType: Yup.string().required('Exempt Type is required'),
        payRate: Yup.number().required('Pay Rate is required'),
        billRate: Yup.number().required('Bill Rate is required'),
        otRate: Yup.number(),
        otBillRate: Yup.number(),
        doubleTimeRate: Yup.number(),
        doubleTimeBillRate: Yup.number(),
        perdiem: Yup.string(),
        perdiemRate: Yup.number(),
        reimbursement: Yup.string(),
    });
    const newHireFormik = useFormik({
        initialValues: (passedStageData.workflow_nehireid_id && passedStageData.stageId) ?
            passedStageData
            :
            {
                hireCategory: '',
                sourceId: 4,
                subvendorName: '',
                subvendorEmail: '',
                firstName: '',
                middleName: '',
                lastName: '',
                emailId: '',
                phone: '',
                citizenShip: '',
                citizenShipName: '',
                address: '',
                suiteNumber: '',
                city: '',
                state: '',
                zipcode: '',
                jobCategory: '',
                jobType: '',
                jobTitle: '',
                jobId: '',
                sourcerName: '',
                accountManagerName: '',
                accountManagerEmail: '',
                recruiterName: '',
                recruiterEmail: '',
                portfolioManager: '',
                notes: '',
                clientName: '',
                clientId: '',
                durationOftheContract: '',
                tentiveStartDate: '',
                tentiveEndDate: '',
                clientAddress: '',
                clientSuiteNumber: '',
                clientCity: '',
                clientState: '',
                clientZipcode: '',
                exemptType: '',
                payRate: '',
                billRate: '',
                otRate: '',
                otBillRate: '',
                doubleTimeRate: '',
                doubleTimeBillRate: '',
                perdiem: '',
                perdiemRate: '',
                reimbursement: '',
            },
        validationSchema: newHireSchema,
        onSubmit: (values) => {
            // console.log(values);
        }
    })
    const saveNewHireForm = () => {
        setIsFormSubmitted(true);
        if (newHireFormik.isValid) {

            let newHireValues = { ...newHireFormik.values };
            let tempTentiveStartDate = (newHireValues.tentiveStartDate) ? newHireValues.tentiveStartDate : null;
            let tempTentiveEndDate = (newHireValues.tentiveEndDate) ? newHireValues.tentiveEndDate : null;
            newHireValues.tentiveStartDate = (tempTentiveStartDate) ? newHireValues.tentiveStartDate.c ? DateTime.fromFormat(newHireValues.tentiveStartDate.c.year + '/' + newHireValues.tentiveStartDate.c.month + '/' + newHireValues.tentiveStartDate.c.day, 'yyyy/M/d').toFormat('yyyy-MM-dd') : newHireValues.tentiveStartDate.substring(0, 10) : null;

            newHireValues.tentiveEndDate = (tempTentiveEndDate) ? newHireValues.tentiveEndDate.c ? DateTime.fromFormat(newHireValues.tentiveEndDate.c.year + '/' + newHireValues.tentiveEndDate.c.month + '/' + newHireValues.tentiveEndDate.c.day, 'yyyy/M/d').toFormat('yyyy-MM-dd') : newHireValues.tentiveEndDate.substring(0, 10) : null;
            newHireValues.clientId = (newHireValues.clientId && newHireValues.clientId !== "0") ? newHireValues.clientId : 0;
            newHireValues.jobId = (newHireValues.jobId && newHireValues.jobId !== "0") ? newHireValues.jobId : 0;
            let tempData = {
                workflow_nehireid_id: (passedStageData.workflow_nehireid_id) ? passedStageData.workflow_nehireid_id : 0,
                workflow_job_cand_id: 0,
                stageId: stageId,
                recrId: userLocalData.getvalue('recrId'),
                clientId: userLocalData.getvalue('clientId'),
                ...newHireValues
            };
            trackPromise(
                ApiService.postWithData('admin', 'stageNewHire', tempData).then((response: any) => {
                    if (!response.data.error) {
                        showToaster(`New Hire Sheet has been ${(passedStageData.workflow_nehireid_id) ? "updated" : "saved"}.`, 'success');
                        update();
                    } else {
                        showToaster(response.data.Error, 'error');
                    }
                })
            )
        } else {
            showToaster('Please enter all required Fields', 'error');
        }
    }

    const getToken = (whatToLoad: string) => {
        ovaTokenAPICalled.current = ovaTokenAPICalled.current + 1;
        let data = (process.env.NODE_ENV === "development" || window.location.protocol === 'http:') ?
            {
                "emailId": "maheshv@askstaffing.com",
                "password": "test",
                "guId": "2F42C766-1453-4FDB-AB25-DCF7F9A48EE0"
            }
            :
            {
                "emailId": "accuick@askstaffing.com",
                "password": "Greenfr0g",
                "guId": "F1202F14-2501-48D8-89B2-D9221EA16EFF"
            }
        trackPromise(
            ApiService.postWithData('ova', 'gettoken', data).then((response: any,) => {
                // console.log(response);

                if (response.headers['ova-auth-token']) {
                    ovaToken.current = response.headers['ova-auth-token'];
                    if (ovaTokenAPICalled.current < 15) {
                        setTimeout(() => {
                            if (whatToLoad === 'source') {
                                loadSource();
                            }
                        }, 150);
                    } else {
                        showToaster('An error occurred ', 'error');
                    }
                    // if (load == "source") {
                    //     loadSource();
                    // } else if (load == "client") {
                    //     loadClients();
                    // } else if (load == "submit") {
                    //     submitForm('asd');
                    // } else if (load == "checkemail") {
                    //     checkEmail();
                    // } else if (load == "loadHire") {
                    //     loadNewhire();
                    // }
                }
            })
        )
    }
    const loadSource = () => {
        let config = {
            headers: {
                "ova-auth-token": ovaToken.current,
            }
        }
        trackPromise(
            ApiService.getCallWithHeaders('ova', 'sourceprofileslist', config).then((response: any,) => {
                // {message: 'Token has Expired', Status: 401}
                if (response.data.message === 'Token has Expired') {
                    getToken('source');
                } else {
                    // console.log(response.data.sourcelist);
                    setSourcesList(response.data.sourcelist.sort((a: any, b: any) => (a.sourceName > b.sourceName) ? 1 : ((b.sourceName > a.sourceName) ? -1 : 0)));

                    // description: ""
                    // sourceId: 31
                    // sourceName: "others"
                    loadClients();
                }
            })
        )
    }
    const loadClients = () => {
        let config = {
            headers: {
                "ova-auth-token": ovaToken.current,
            }
        }
        trackPromise(
            ApiService.getCallWithHeaders('ova', 'clientslist', config).then((response: any,) => {
                // {message: 'Token has Expired', Status: 401}
                if (response.data.message === 'Token has Expired') {
                    getToken('source');
                } else {
                    // console.log(response.data.clientlist);
                    setClientsList(response.data.clientlist.sort((a: any, b: any) => (a.clientName > b.clientName) ? 1 : ((b.clientName > a.clientName) ? -1 : 0)));
                    // setClientsList(response.data.clientlist);
                    setShowNewHireForm(true);
                    // description: ""
                    // sourceId: 31
                    // sourceName: "others"
                    // loadClients();
                }
            })
        )
    }
    const setClientName = (id: number | string) => {
        let tempClientValue = clientsList.find(x => x.clientId === id);
        newHireFormik.setFieldValue('clientName', (tempClientValue && tempClientValue.clientName) ? tempClientValue.clientName : "");

    }
    useEffect(() => {
        getToken('source');
        // loadSource();
    }, [])



    return <Dialog
        maxWidth={'sm'}
        // sx={{ width: 900, maxWidth: 900, minWidth: 900 }}
        fullWidth={false}
        open={open}
        className='NewHireSheet'
    >
        <Formik
            onSubmit={saveNewHireForm}
            initialValues={newHireFormik.initialValues}
        >
            {
                (
                    // { errors, values, touched, setFieldValue, handleChange }
                ) => (
                    <Form>
                        <DialogTitle
                            className='py-2'
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <span>
                                    New Hire
                                </span>
                                <span onClick={() => closePopup()} className="closePopup">
                                    <CloseIcon />
                                </span>
                            </Grid>
                        </DialogTitle>
                        <Divider />
                        <DialogContent
                            sx={{
                                width: '540px',
                                minHeight: '320px',
                                maxHeight: '70vh'
                            }}
                        >
                            {
                                showNewHireForm ?
                                    <TableContainer component={Paper} >
                                        <Table
                                            className='NewHireSheetTable'
                                            // sx={{ minWidth: 650 }}
                                            aria-label="New Hire Sheet"
                                            size='small'
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Field Name</TableCell>
                                                    <TableCell>Value</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Hire Category <span className='required'>&#8902;</span> </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="hireCategory"
                                                            size='small'
                                                            name='hireCategory'
                                                            // label="Hire Category"
                                                            fullWidth
                                                            value={newHireFormik.values.hireCategory}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            select
                                                        >
                                                            <MenuItem value={1} key={1}>W2</MenuItem>
                                                            <MenuItem value={2} key={2}>C2C</MenuItem>
                                                            <MenuItem value={3} key={3}>1099</MenuItem>
                                                        </TextField>
                                                        <ErrorMessage formikObj={newHireFormik} name={`hireCategory`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Source</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            size='small'
                                                            id="sourceId"
                                                            name='sourceId'
                                                            // label="<<Auto Populate>>"
                                                            fullWidth
                                                            value={newHireFormik.values.sourceId}
                                                            onChange={newHireFormik.handleChange}
                                                            defaultValue={4}
                                                            select
                                                            disabled
                                                        >
                                                            <MenuItem value=""></MenuItem>
                                                            {sourcesList.map(
                                                                (source: any, i: number) => {
                                                                    return <MenuItem value={source.sourceId} key={source.sourceId}>{source.sourceName}</MenuItem>
                                                                }
                                                            )}

                                                        </TextField>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Sub Vendor Name</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="subvendorName"
                                                            size='small'
                                                            name='subvendorName'
                                                            // label="Sub Vendor Name"
                                                            fullWidth
                                                            value={newHireFormik.values.subvendorName}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Sub Vendor Email</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="subvendorEmail"
                                                            size='small'
                                                            name='subvendorEmail'
                                                            // label="Sub Vendor Email"
                                                            fullWidth
                                                            value={newHireFormik.values.subvendorEmail}
                                                            onChange={newHireFormik.handleChange}
                                                            type={'email'}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>First Name</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="firstName"
                                                            size='small'
                                                            name='firstName'
                                                            label="<<Auto Populate>>"
                                                            fullWidth
                                                            value={newHireFormik.values.firstName}
                                                            onChange={newHireFormik.handleChange}
                                                            disabled
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Middle Name</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="middleName"
                                                            size='small'
                                                            name='middleName'
                                                            // label="Middle Name"
                                                            fullWidth
                                                            value={newHireFormik.values.middleName}
                                                            onChange={newHireFormik.handleChange}
                                                            disabled
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Last Name</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="lastName"
                                                            size='small'
                                                            name='lastName'
                                                            label="<<Auto Populate>>"
                                                            fullWidth
                                                            value={newHireFormik.values.lastName}
                                                            onChange={newHireFormik.handleChange}
                                                            disabled
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Email Id</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="emailId"
                                                            size='small'
                                                            name='emailId'
                                                            label="<<Auto Populate>>"
                                                            fullWidth
                                                            value={newHireFormik.values.emailId}
                                                            onChange={newHireFormik.handleChange}
                                                            disabled
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Phone</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="phone"
                                                            size='small'
                                                            name='phone'
                                                            label="<<Auto Populate>>"
                                                            fullWidth
                                                            value={newHireFormik.values.phone}
                                                            onChange={newHireFormik.handleChange}
                                                            disabled
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Citizenship<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="citizenShip"
                                                            size='small'
                                                            name='citizenShip'
                                                            // label="Citizenship"
                                                            fullWidth
                                                            value={newHireFormik.values.citizenShip}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            select
                                                        >
                                                            <MenuItem value=''></MenuItem>
                                                            <MenuItem value='US Citizen'>US Citizen</MenuItem>
                                                            <MenuItem value='Green Card'>Green Card</MenuItem>
                                                            <MenuItem value='GC EAD'>GC EAD</MenuItem>
                                                            <MenuItem value='H1B'>H1B</MenuItem>
                                                            <MenuItem value='Others'>Others</MenuItem>
                                                        </TextField>
                                                        <ErrorMessage formikObj={newHireFormik} name={`citizenShip`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Citizenship Name</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="citizenShipName"
                                                            size='small'
                                                            name='citizenShipName'
                                                            // label="Citizenship Name"
                                                            fullWidth
                                                            value={newHireFormik.values.citizenShipName}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Address</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="address"
                                                            size='small'
                                                            name='address'
                                                            // label="Address"
                                                            fullWidth
                                                            value={newHireFormik.values.address}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>APT/STE#</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="suiteNumber"
                                                            size='small'
                                                            name='suiteNumber'
                                                            // label="APT/STE"
                                                            fullWidth
                                                            value={newHireFormik.values.suiteNumber}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>City</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="city"
                                                            size='small'
                                                            name='city'
                                                            // label="City"
                                                            fullWidth
                                                            value={newHireFormik.values.city}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>State</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="state"
                                                            size='small'
                                                            name='state'
                                                            // label="State"
                                                            fullWidth
                                                            value={newHireFormik.values.state}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>ZipCode</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="zipcode"
                                                            size='small'
                                                            name='zipcode'
                                                            // label="ZipCode"
                                                            fullWidth
                                                            value={newHireFormik.values.zipcode}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Job Category<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="jobCategory"
                                                            size='small'
                                                            name='jobCategory'
                                                            // label="Job Category"
                                                            fullWidth
                                                            value={newHireFormik.values.jobCategory}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            select
                                                        >
                                                            <MenuItem value=''></MenuItem>
                                                            <MenuItem value='IT'>IT</MenuItem>
                                                            <MenuItem value='NON-IT'>NON-IT</MenuItem>
                                                        </TextField>
                                                        <ErrorMessage formikObj={newHireFormik} name={`jobCategory`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Job Type<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="jobType"
                                                            size='small'
                                                            name='jobType'
                                                            // label="Job Type"
                                                            fullWidth
                                                            value={newHireFormik.values.jobType}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            select
                                                        >
                                                            <MenuItem value=''></MenuItem>
                                                            <MenuItem value="Portal">Portal</MenuItem>
                                                            <MenuItem value="P2R">P2R</MenuItem>
                                                            <MenuItem value="Relationship">Relationship</MenuItem>
                                                        </TextField>
                                                        <ErrorMessage formikObj={newHireFormik} name={`jobType`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Job Title<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="jobTitle"
                                                            size='small'
                                                            name='jobTitle'
                                                            // label="Job Title"
                                                            fullWidth
                                                            value={newHireFormik.values.jobTitle}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`jobTitle`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Job Id</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="jobId"
                                                            size='small'
                                                            name='jobId'
                                                            // label="Job Id"
                                                            fullWidth
                                                            value={newHireFormik.values.jobId}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Sourcer Name</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="sourcerName"
                                                            size='small'
                                                            name='sourcerName'
                                                            // label="Sourcer Name"
                                                            fullWidth
                                                            value={newHireFormik.values.sourcerName}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Account Manager Name<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="accountManagerName"
                                                            size='small'
                                                            name='accountManagerName'
                                                            // label="Account Manager Name"
                                                            fullWidth
                                                            value={newHireFormik.values.accountManagerName}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`accountManagerName`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Account Manager Email<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="accountManagerEmail"
                                                            size='small'
                                                            name='accountManagerEmail'
                                                            // label="Account Manager Email"
                                                            fullWidth
                                                            value={newHireFormik.values.accountManagerEmail}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            type={'email'}
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`accountManagerEmail`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Recruiter Name<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="recruiterName"
                                                            size='small'
                                                            name='recruiterName'
                                                            fullWidth
                                                            value={newHireFormik.values.recruiterName}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Recruiter Email<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="recruiterEmail"
                                                            size='small'
                                                            name='recruiterEmail'
                                                            fullWidth
                                                            value={newHireFormik.values.recruiterEmail}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            type={'email'}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Portfolio Manager<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="portfolioManager"
                                                            size='small'
                                                            name='portfolioManager'
                                                            // label="Portfolio Manager"
                                                            fullWidth
                                                            value={newHireFormik.values.portfolioManager}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            select
                                                        >
                                                            <MenuItem value=''></MenuItem>
                                                            <MenuItem value='Mike Nocella'>Mike Nocella</MenuItem>
                                                            <MenuItem value='Jennifer Roberts'>Jennifer Roberts</MenuItem>
                                                            <MenuItem value='Tejal Fitch'>Tejal Fitch</MenuItem>
                                                            <MenuItem value='Lorena Fugedy'>Lorena Fugedy</MenuItem>
                                                        </TextField>
                                                        <ErrorMessage formikObj={newHireFormik} name={`portfolioManager`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Notes</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="notes"
                                                            size='small'
                                                            name='notes'
                                                            // label="Notes"
                                                            fullWidth
                                                            value={newHireFormik.values.notes}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Client Name<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>

                                                        <TextField
                                                            size='small'
                                                            id="clientId"
                                                            name='clientId'
                                                            label="Client Name"
                                                            fullWidth
                                                            value={newHireFormik.values.clientId}
                                                            onChange={(e) => {
                                                                newHireFormik.handleChange(e);
                                                                // console.log(e.target.value);
                                                                setClientName(e.target.value);
                                                            }}
                                                            select
                                                            required
                                                        >
                                                            <MenuItem value=""></MenuItem>
                                                            {clientsList.map(
                                                                (source: any, i: number) => {
                                                                    return <MenuItem value={source.clientId} key={source.clientId}>{source.clientName}</MenuItem>
                                                                }
                                                            )}

                                                        </TextField>
                                                        <ErrorMessage formikObj={newHireFormik} name={`clientId`} isFormSubmitted={isFormSubmitted} />
                                                        {/* <TextField
                                                        id="clientName"
                                                        size='small'
                                                        name='clientName'
                                                        // label="Client Name"
                                                        fullWidth
                                                        value={newHireFormik.values.clientName}
                                                        onChange={newHireFormik.handleChange}
                                                    /> */}
                                                    </TableCell>
                                                    {/* clientId */}
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Duration of Contract (in Months)<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="durationOftheContract"
                                                            size='small'
                                                            name='durationOftheContract'
                                                            // label="Duration of Contract (in Months)"
                                                            fullWidth
                                                            value={newHireFormik.values.durationOftheContract}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            type={'number'}
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`durationOftheContract`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Tentative Start Date<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        {/* <TextField
                                                            id="tentiveStartDate"
                                                            type={'date'}
                                                            size='small'
                                                            name='tentiveStartDate'
                                                            // label="Tentative Start Date"
                                                            fullWidth
                                                            value={newHireFormik.values.tentiveStartDate}
                                                            onChange={newHireFormik.handleChange}
                                                        /> */}
                                                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                            <DatePicker
                                                                // label="Start Date"
                                                                // toolbarPlaceholder='Tentative Start Date'
                                                                value={
                                                                    (newHireFormik.values.tentiveStartDate) ?
                                                                        newHireFormik.values.tentiveStartDate
                                                                        :
                                                                        null
                                                                }
                                                                onChange={
                                                                    (newValue) => {
                                                                        newHireFormik.setFieldValue('tentiveStartDate', newValue)
                                                                    }
                                                                }
                                                                // disableMaskedInput={true}
                                                                // // if (newValue) {
                                                                // //     setStartDate(newValue);
                                                                // // } else {
                                                                // //     setStartDate(DateTime.now());
                                                                // // }
                                                                // renderInput={(params: any) => <TextField size='small' {...params} required />}
                                                                minDate={DateTime.now()}
                                                                maxDate={(newHireFormik.values.tentiveEndDate) ? newHireFormik.values.tentiveEndDate : DateTime.now().plus({ years: 10 })}

                                                            />
                                                        </LocalizationProvider>
                                                        <ErrorMessage formikObj={newHireFormik} name={`tentiveStartDate`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Tentative End Date<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        {/* <TextField
                                                            id="tentiveEndDate"
                                                            type={'date'}
                                                            size='small'
                                                            name='tentiveEndDate'
                                                            // label="Tentative End Date"
                                                            fullWidth
                                                            value={newHireFormik.values.tentiveEndDate}
                                                            onChange={newHireFormik.handleChange}
                                                        /> */}
                                                        <LocalizationProvider dateAdapter={AdapterLuxon}>
                                                            <DatePicker
                                                                // label="Start Date"
                                                                // toolbarPlaceholder='Start Date'
                                                                value={
                                                                    (newHireFormik.values.tentiveEndDate) ?
                                                                        newHireFormik.values.tentiveEndDate
                                                                        :
                                                                        null
                                                                }
                                                                onChange={
                                                                    (newValue) => {
                                                                        newHireFormik.setFieldValue('tentiveEndDate', newValue)
                                                                    }
                                                                }
                                                                // disableMaskedInput={true}
                                                                // // value={newHireFormik.values.tentiveEndDate}
                                                                // // onChange={newHireFormik.handleChange}
                                                                // renderInput={(params: any) => <TextField size='small' {...params} required />}
                                                                minDate={(newHireFormik.values.tentiveStartDate) ? newHireFormik.values.tentiveStartDate : DateTime.now()}

                                                            />
                                                        </LocalizationProvider>
                                                        <ErrorMessage formikObj={newHireFormik} name={`tentiveEndDate`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Client Street Address<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="clientAddress"
                                                            size='small'
                                                            name='clientAddress'
                                                            // label="Client Street Address"
                                                            fullWidth
                                                            value={newHireFormik.values.clientAddress}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`clientAddress`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Client APT/STE#</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="clientSuiteNumber"
                                                            size='small'
                                                            name='clientSuiteNumber'
                                                            // label="Client APT/STE"
                                                            fullWidth
                                                            value={newHireFormik.values.clientSuiteNumber}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Client City<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="clientCity"
                                                            size='small'
                                                            name='clientCity'
                                                            // label="Client City"
                                                            fullWidth
                                                            value={newHireFormik.values.clientCity}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`clientCity`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Client State<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="clientState"
                                                            size='small'
                                                            name='clientState'
                                                            // label="Client State"
                                                            fullWidth
                                                            value={newHireFormik.values.clientState}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`clientState`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Client zip<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="clientZipcode"
                                                            size='small'
                                                            name='clientZipcode'
                                                            // label="Client zip"
                                                            fullWidth
                                                            value={newHireFormik.values.clientZipcode}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`clientZipcode`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Exempt Type<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="exemptType"
                                                            size='small'
                                                            name='exemptType'
                                                            // label="Exempt Type"
                                                            fullWidth
                                                            value={newHireFormik.values.exemptType}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            select
                                                        >
                                                            <MenuItem value='Exempt'>Exempt</MenuItem>
                                                            <MenuItem value='Non Exempt'>Non Exempt</MenuItem>
                                                        </TextField>
                                                        <ErrorMessage formikObj={newHireFormik} name={`exemptType`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Pay Rate<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="payRate"
                                                            size='small'
                                                            name='payRate'
                                                            // label="Pay Rate"
                                                            fullWidth
                                                            value={newHireFormik.values.payRate}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            type={'number'}
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`payRate`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Bill Rate<span className='required'>&#8902;</span></TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="billRate"
                                                            size='small'
                                                            name='billRate'
                                                            // label="Bill Rate"
                                                            fullWidth
                                                            value={newHireFormik.values.billRate}
                                                            onChange={newHireFormik.handleChange}
                                                            required
                                                            type={'number'}
                                                        />
                                                        <ErrorMessage formikObj={newHireFormik} name={`billRate`} isFormSubmitted={isFormSubmitted} />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>OT Rate</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="otRate"
                                                            size='small'
                                                            name='otRate'
                                                            // label="OT Rate"
                                                            fullWidth
                                                            value={newHireFormik.values.otRate}
                                                            onChange={newHireFormik.handleChange}
                                                            type={'number'}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>OT Bill Rate</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="otBillRate"
                                                            size='small'
                                                            name='otBillRate'
                                                            // label="OT Bill Rate"
                                                            fullWidth
                                                            value={newHireFormik.values.otBillRate}
                                                            onChange={newHireFormik.handleChange}
                                                            type={'number'}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Double Time Rate</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="doubleTimeRate"
                                                            size='small'
                                                            name='doubleTimeRate'
                                                            // label="Double Time Rate"
                                                            fullWidth
                                                            value={newHireFormik.values.doubleTimeRate}
                                                            onChange={newHireFormik.handleChange}
                                                            type={'number'}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Double Time Bill Rate</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="doubleTimeBillRate"
                                                            size='small'
                                                            name='doubleTimeBillRate'
                                                            // label="Double Time Bill Rate"
                                                            fullWidth
                                                            value={newHireFormik.values.doubleTimeBillRate}
                                                            onChange={newHireFormik.handleChange}
                                                            type={'number'}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Per diem is applicable?</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="perdiem"
                                                            size='small'
                                                            name='perdiem'
                                                            // label="Per diem is applicable"
                                                            fullWidth
                                                            value={newHireFormik.values.perdiem}
                                                            onChange={newHireFormik.handleChange}
                                                            select
                                                        >
                                                            <MenuItem value={"true"} key={1}>Yes</MenuItem>
                                                            <MenuItem value={"false"} key={2}>No</MenuItem>
                                                        </TextField>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Per diem Rate</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="perdiemRate"
                                                            size='small'
                                                            name='perdiemRate'
                                                            // label="Per diem Rate"
                                                            fullWidth
                                                            value={newHireFormik.values.perdiemRate}
                                                            onChange={newHireFormik.handleChange}
                                                            type={'number'}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Mileage Reimbursement</TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="reimbursement"
                                                            size='small'
                                                            name='reimbursement'
                                                            // label="Mileage Reimbursement"
                                                            fullWidth
                                                            value={newHireFormik.values.reimbursement}
                                                            onChange={newHireFormik.handleChange}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    :
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }} className='mt-5 pt-5'>
                                        <CircularProgress />
                                    </Box>
                            }
                        </DialogContent>
                        <Divider />
                        <DialogActions>
                            <Button
                                variant='contained'
                                startIcon={<SaveIcon />}
                                // onClick={saveNewHireForm}
                                size={'small'}
                                type='submit'
                            >
                                {(passedStageData.workflow_nehireid_id) ? "Update" : "Save"}
                            </Button>
                        </DialogActions>
                    </Form >
                )
            }
        </Formik>
    </Dialog>
}

export default NewHireSheet;