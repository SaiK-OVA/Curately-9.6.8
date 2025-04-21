import {TextField, Button, Grid} from '../../../../../shared/modules/commonImports';
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';
import {Card, CardContent} from '../../../../../shared/modules/MaterialImports/Card';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { useFormik, Yup } from '../../../../../shared/modules/Formik';

import './OriginalPost.scss';

const OriginalPost = () => {
    const initialOriginalPostDetails = {
        "id": "3e4f84e3-9078-4451-a8b8-5897f4f4f4e3",
        "clientReferenceId": "999124441",
        "email": "john.doe.new@example.com",
        "givenName": "John",
        "familyName": "Smith",
        "confirmedNoMiddleName": true,
        "dob": "XXXX-01-20",
        "ssn": "XXXXX4321",
        "phone": "+14041231234",
        "address": {
            "addressLine": "123 Main Street",
            "municipality": "Orlando",
            "regionCode": "US-FL",
            "postalCode": "12345",
            "countryCode": "US"
        },
        "additionalAddresses": [
            {
                "addressLine": "123 PEACHTREE PLACE",
                "municipality": "ATLANTA",
                "regionCode": "US-GA",
                "postalCode": "30005",
                "countryCode": "US",
                "validFrom": "2003-08-01",
                "validTo": "2016-07-08"
            },
            {
                "addressLine": "221B Baker Street",
                "municipality": "London",
                "regionCode": "GB-LND",
                "postalCode": "NW1 6XE",
                "countryCode": "GB",
                "validFrom": "2016-07-08",
                "validTo": "2017-10-27"
            }
        ],
        "aliases": [
            {
                "givenName": "Robert",
                "familyName": "Saur",
                "middleName": "William",
                "confirmedNoMiddleName": false
            },
            {
                "givenName": "Simon",
                "familyName": "Duck",
                "confirmedNoMiddleName": true
            }
        ],
        "educationHistory": [
            {
                "schoolName": "UW",
                "schoolType": "University",
                "degree": {
                    "major": "Software Systems",
                    "degreeName": "B.S.",
                    "degreeType": "Bachelors",
                    "graduationDate": "2010-06-01",
                    "degreeCompleted": true,
                    "comments": "something"
                },
                "schoolIDNumber": "UW12345",
                "address": {
                    "addressLine": "University District",
                    "municipality": "SEATTLE",
                    "regionCode": "US-WA",
                    "postalCode": "98001",
                    "countryCode": "US",
                    "validFrom": "2008-08-01"
                },
                "aliasGivenName": "aliasFirstName1",
                "aliasFamilyName": "aliasLastName1",
                "department": "Computer Science",
                "startDate": "2008-08-01",
                "endDate": "2010-05-01",
                "email": "uwsomeemail@uwsomeemail.com",
                "phone": "14041231234",
                "fax": "+1234567890",
                "notes": "nothing",
                "type": "default"
            }
        ],
        "employmentHistory": [
            {
                "employerName": "SomeEmployer",
                "currentEmployer": true,
                "jobTitle": "SomeJobTitle",
                "startDate": "2008-10-02",
                "endDate": "2012-10-25",
                "employmentType": "FullTime",
                "department": "IT",
                "address": {
                    "addressLine": "ABC company",
                    "municipality": "SEATTLE",
                    "regionCode": "US-WA",
                    "postalCode": "98001",
                    "countryCode": "US",
                    "validFrom": "2008-08-01"
                },
                "permissionToContact": true,
                "reasonForLeaving": "nothing",
                "salary": {
                    "currency": "12345678",
                    "startingSalary": "140,000",
                    "endingSalary": "100,000"
                },
                "verification": {
                    "supervisorGivenName": "supervisorFirstName",
                    "supervisorFamilyName": "supervisorLastName",
                    "supervisorMiddleName": "supervisorMiddleName",
                    "address": {
                        "addressLine": "ABC company",
                        "municipality": "SEATTLE",
                        "regionCode": "US-WA",
                        "postalCode": "98001",
                        "countryCode": "US",
                        "validFrom": "2008-08-01"
                    },
                    "email": "abcsomeemail@abcsomeemail.com",
                    "phone": "14041231234",
                    "fax": "+1234567890"
                },
                "verifyEmployer": true,
                "notes": "nothing",
                "type": "default"
            }
        ],
        "licenses": [
            {
                "issuingAgency": {
                    "name": "Some Institute",
                    "address": {
                        "addressLine": "ABC company",
                        "municipality": "SEATTLE",
                        "regionCode": "US-WA",
                        "postalCode": "98001",
                        "countryCode": "US",
                        "validFrom": "2008-08-01"
                    }
                },
                "number": "S12345",
                "name": "Nursing Certification",
                "startDate": "2016-01-01",
                "status": "active",
                "notes": "some notes"
            }
        ],
        "screeningIds": [],
        "driversLicense": {
            "type": "personal",
            "licenseNumber": "S1234567",
            "issuingAgency": "CA"
        }
    };
    const originalpostSchema = Yup.object().shape({
        id: Yup.string(),
        clientReferenceId: Yup.string(),
        email: Yup.string(),
        givenName: Yup.string()
            .required('Given Name is required.')
            .min(4, 'At-least 4 Characters is required.'),
        familyName: Yup.string()
            .required('Family Name is required.')
            .min(4, 'At-least 4 Characters is required.'),
        confirmedNoMiddleName: Yup.boolean(),
        dob: Yup.string(),
        ssn: Yup.string(),
        phone: Yup.string(),
        address: Yup.object().shape({
            addressLine: Yup.string(),
            municipality: Yup.string(),
            regionCode: Yup.string(),
            postalCode: Yup.string(),
            countryCode: Yup.string()
        }),
        additionalAddresses: Yup.array().of(
            Yup.object().shape({
                addressLine: Yup.string(),
                municipality: Yup.string(),
                regionCode: Yup.string(),
                postalCode: Yup.string(),
                countryCode: Yup.string(),
                validFrom: Yup.string(),
                validTo: Yup.string()
            })
        ),
        aliases: Yup.array().of(
            Yup.object().shape({
                givenName: Yup.string(),
                familyName: Yup.string(),
                middleName: Yup.string(),
                confirmedNoMiddleName: Yup.boolean()
            })
        ),
        educationHistory: Yup.array().of(
            Yup.object().shape({
                schoolName: Yup.string(),
                schoolType: Yup.string(),
                degree: Yup.object().shape({
                    major: Yup.string(),
                    degreeName: Yup.string(),
                    degreeType: Yup.string(),
                    graduationDate: Yup.string(),
                    degreeCompleted: Yup.boolean(),
                    comments: Yup.string()
                }),
                schoolIDNumber: Yup.string(),
                address: Yup.object().shape({
                    addressLine: Yup.string(),
                    municipality: Yup.string(),
                    regionCode: Yup.string(),
                    postalCode: Yup.string(),
                    countryCode: Yup.string(),
                    validFrom: Yup.string()
                }),
                aliasGivenName: Yup.string(),
                aliasFamilyName: Yup.string(),
                department: Yup.string(),
                startDate: Yup.string(),
                endDate: Yup.string(),
                email: Yup.string(),
                phone: Yup.string(),
                fax: Yup.string(),
                notes: Yup.string(),
                type: Yup.string()
            })
        ),
        employmentHistory: Yup.array().of(
            Yup.object().shape({
                employerName: Yup.string(),
                currentEmployer: Yup.boolean(),
                jobTitle: Yup.string(),
                startDate: Yup.string(),
                endDate: Yup.string(),
                employmentType: Yup.string(),
                department: Yup.string(),
                address: Yup.object().shape({
                    addressLine: Yup.string(),
                    municipality: Yup.string(),
                    regionCode: Yup.string(),
                    postalCode: Yup.string(),
                    countryCode: Yup.string(),
                    validFrom: Yup.string()
                }),
                permissionToContact: Yup.boolean(),
                reasonForLeaving: Yup.string(),
                salary: Yup.object().shape({
                    currency: Yup.string(),
                    startingSalary: Yup.string(),
                    endingSalary: Yup.string()
                }),
                verification: Yup.object().shape({
                    supervisorGivenName: Yup.string(),
                    supervisorFamilyName: Yup.string(),
                    supervisorMiddleName: Yup.string(),
                    address: Yup.object().shape({
                        addressLine: Yup.string(),
                        municipality: Yup.string(),
                        regionCode: Yup.string(),
                        postalCode: Yup.string(),
                        countryCode: Yup.string(),
                        validFrom: Yup.string()
                    }),
                    email: Yup.string(),
                    phone: Yup.string(),
                    fax: Yup.string()
                }),
                verifyEmployer: Yup.boolean(),
                notes: Yup.string(),
                type: Yup.string()
            })
        ),
        licenses: Yup.array().of(
            Yup.object().shape({
                issuingAgency: Yup.object().shape({
                    name: Yup.string(),
                    address: Yup.object().shape({
                        addressLine: Yup.string(),
                        municipality: Yup.string(),
                        regionCode: Yup.string(),
                        postalCode: Yup.string(),
                        countryCode: Yup.string(),
                        validFrom: Yup.string()
                    })
                }),
                number: Yup.string(),
                name: Yup.string(),
                startDate: Yup.string(),
                status: Yup.string(),
                notes: Yup.string()
            })
        ),
        screeningIds: Yup.array().of(Yup.string()),
        driversLicense: Yup.object().shape({
            type: Yup.string(),
            licenseNumber: Yup.string(),
            issuingAgency: Yup.string()
        })
    });


    const originalpostFormik = useFormik({
        initialValues: initialOriginalPostDetails,
        validationSchema: originalpostSchema,
        onSubmit: (values) => {
            // console.log(values);
        }
    });
    const addNewFieldObject = (field: string) => {
        if (field === "additionalAddresses") {
            let tempArray = [...originalpostFormik.values.additionalAddresses];
            tempArray.push({
                "addressLine": "",
                "municipality": "",
                "regionCode": "",
                "postalCode": "",
                "countryCode": "",
                "validFrom": "",
                "validTo": "",
            });
            originalpostFormik.setFieldValue(field, tempArray);
        }
    }
    const removeAddress = (field: string, i: number) => {
        if (field === "additionalAddresses") {
            let tempAddress = [...originalpostFormik.values.additionalAddresses];
            tempAddress.splice(i, 1);
            originalpostFormik.setFieldValue('additionalAddresses', tempAddress);
        }
    }

    return (
        <>
            <form
                onSubmit={originalpostFormik.handleSubmit}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                >
                    <Typography variant='h6' gutterBottom>
                        Sample Details
                    </Typography>
                    <Card className='my-3 originalpostCard'>
                        <CardContent>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                <Grid size={4}>
                                    <TextField
                                        id="id"
                                        name="id"
                                        value={originalpostFormik.values.id}
                                        onChange={originalpostFormik.handleChange}
                                        size='small'
                                        label="ID"
                                        variant="outlined"
                                        type='text'
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid size={4}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        value={originalpostFormik.values.email}
                                        onChange={originalpostFormik.handleChange}
                                        size='small'
                                        label="Email"
                                        variant="outlined"
                                        type='text'
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                    <Typography variant='h6' gutterBottom>
                        Sample Details
                    </Typography>
                    <Card className='my-3 originalpostCard'>
                        <CardContent>
                            {
                                originalpostFormik.values.additionalAddresses.map(
                                    (address, i) => (
                                        <Card key={`additionalAddresses${i}`} className='mt-3 mb-3 p-4'>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <Grid size={8}>
                                                    <TextField
                                                        id={`additionalAddresses${i}addressLine`}
                                                        name={`additionalAddresses[${i}]addressLine`}
                                                        value={address.addressLine}
                                                        onChange={originalpostFormik.handleChange}
                                                        size='small'
                                                        label="Address Line"
                                                        variant="outlined"
                                                        type='text'
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid size={3}>
                                                    <TextField
                                                        id={`additionalAddresses${i}municipality`}
                                                        name={`additionalAddresses[${i}]municipality`}
                                                        value={address.municipality}
                                                        onChange={originalpostFormik.handleChange}
                                                        size='small'
                                                        label="Municipality"
                                                        variant="outlined"
                                                        type='text'
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid size={1}>
                                                    <RemoveCircleOutlineIcon
                                                        onClick={() => removeAddress("additionalAddresses", i)}
                                                        className={`${(originalpostFormik.values.additionalAddresses.length === 1) ? 'd-none' : ''} cursorPointer`}
                                                    />

                                                </Grid>
                                            </Grid>
                                        </Card>
                                    )
                                )
                            }

                        </CardContent>
                    </Card>
                    <Typography variant='h6' gutterBottom>
                        Sample Details
                    </Typography>
                    <Card className='my-3 originalpostCard'>
                        <CardContent>
                            {
                                originalpostFormik.values.employmentHistory.map(
                                    (emp, i) => (
                                        <Card key={`employmentHistory${i}`} className='mt-3 mb-3 p-4'>
                                            <Grid
                                                container
                                                direction="row"
                                                justifyContent="flex-start"
                                                alignItems="center"
                                                spacing={2}
                                            >
                                                <Grid size={8}>
                                                    <TextField
                                                        id={`employmentHistory${i}addressLine`}
                                                        name={`employmentHistory[${i}]addressLine`}
                                                        value={emp.verification.address.addressLine}
                                                        onChange={originalpostFormik.handleChange}
                                                        size='small'
                                                        label="Address Line"
                                                        variant="outlined"
                                                        type='text'
                                                        fullWidth
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    )
                                )
                            }

                        </CardContent>
                    </Card>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Button
                            variant="text"
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={() => addNewFieldObject('additionalAddresses')}
                        >
                            Add Address
                        </Button>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Button
                            variant="outlined"
                            startIcon={<SaveIcon />}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
export default OriginalPost;