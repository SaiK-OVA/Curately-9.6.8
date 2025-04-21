import { useState, useEffect } from '../../../../shared/modules/React';
import { Checkbox, RadioGroup, Radio, Select } from '../../../../shared/modules/MaterialImports/FormElements';
import { Button, FormControl, InputLabel } from '../../../../shared/modules/commonImports';
import {  FormLabel, FormControlLabel, TextField } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Avatar} from '../../../../shared/modules/MaterialImports/Avatar';
import { Stack} from '../../../../shared/modules/MaterialImports/Stack';
import { Box} from '../../../../shared/modules/MaterialImports/Box';
import {  MenuItem} from '../../../../shared/modules/MaterialImports/Menu';
import { Typography} from '../../../../shared/modules/MaterialImports/Typography';
import { Autocomplete} from '@mui/material';

import ApiRequests from "../../../../shared/api/api";

import { useFormik , Yup } from "../../../../shared/modules/Formik";
import './SearchAllResumes.scss';

const UserData = [

    { name: "monster" },
    { name: "dice" },
    { name: "careerBuilder" },
    { name: "accuickDatabase" }
];

interface User {
    name: string;
    isChecked?: boolean;
}

const SearchAllResumes = () => {
    const [skills, setSkills] = useState([]);
    const [users, setUsers] = useState<User[]>(UserData);





    const initialValues = {

        jobTitle: "",
        employer: "",
        schoolAttended: "",
        skillset: "",
        resumeLastModified: "",
        using: "",
        state: "",
        locationWithZipcode: "",
        authorization: "",
        skills: [{}],
        users,



    }

    const validationSchema = Yup.object({
        jobTitle: Yup.string(),
        employer: Yup.string(),
        schoolAttended: Yup.string(),
        skillset: Yup.string(),
        resumeLastModified: Yup.string(),
        using: Yup.string(),
        state: Yup.string(),
        locationWithZipcode: Yup.string(),
        authorization: Yup.string()

    });



    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values)

        },
        validationSchema,
    });




    useEffect(() => {
        ApiRequests.getByParams(171, 'getSkills.jsp', { query: 'Angular' })
            .then((result) => {
                console.log(result);
                setSkills(result.data);
            })
            .catch((error) => {
                console.error('Error fetching skills:', error);
            });
    },

        []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        const matchResult = name.match(/\[(\d+)\]/);
        const index = matchResult ? Number(matchResult[1]) : -1;
        //  const index = Number(name.match(/\[(\d+)\]/)[1]); // Extract the index from the name

        if (name === "allSelect") {
            let tempUsers = users.map((user) => {
                return { ...user, isChecked: checked };
            });
            setUsers(tempUsers);
        } else {
            let tempUsers = users.map((user, i) =>
                i === index ? { ...user, isChecked: checked } : user
            );
            setUsers(tempUsers);
        }
    };


    return (
        <>

            <div className="SearchAllResumes">

                <form onSubmit={formik.handleSubmit}>

                    <Box sx={{
                        display: 'flex', boxShadow: '1', padding: '5px', margin: '20px', justifyContent: 'center'
                    }} >
                        <Stack spacing={2} >
                            <Stack direction="row" spacing={2} justifyContent="space-between" marginTop="auto" padding={'10px'}>



                                <Avatar>VC</Avatar>

                                <Typography>VALI COMPANY8-1234-TEST73</Typography>




                                <Button
                                    variant="contained"
                                    size='small'


                                >
                                    Previous Search
                                </Button>
                                <Button
                                    size='small'
                                    variant="contained"


                                >
                                    Search BOT
                                </Button>

                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <FormControlLabel labelPlacement="bottom" sx={{ width: '120px', height: '60px', justifyContent: 'center', boxShadow: '1', }}
                                    control={
                                        <Checkbox size="small"
                                            name="allSelect"

                                            checked={!users.some((user) => user?.isChecked !== true)}
                                            onChange={handleChange}

                                        />
                                    }
                                    label="All"
                                />

                                {users.map((user, index) => (
                                    <FormControlLabel
                                        key={index}
                                        labelPlacement="bottom"
                                        sx={{
                                            width: "120px",
                                            height: "60px",
                                            justifyContent: "center",
                                            boxShadow: "1"
                                        }}
                                        control={
                                            <Checkbox
                                                checked={user?.isChecked || false}
                                                onChange={handleChange}
                                                name={`users[${index}].isChecked`}
                                            />
                                        }
                                        label={user.name}
                                    />
                                ))}




                            </Stack>
                            <Stack>
                                <Autocomplete
                                    options={skills}


                                    renderInput={(params) => <TextField {...params} />}
                                    multiple />
                            </Stack>
                            <Stack direction="row" spacing={2} >
                                <TextField label="Skill set" variant="outlined"
                                    type="text"
                                    id="skillset"
                                    name="skillset"
                                    size="small"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.skillset}
                                    fullWidth

                                />

                                <FormControl fullWidth>
                                    <InputLabel size="small" id="resumeLastModified">Resume Last Modified</InputLabel>
                                    <Select size="small"
                                        labelId="resumeLastModified"
                                        id="resumeLastModified"
                                        label="Resume Last Modified"
                                        name="resumeLastModified"
                                        value={formik.values.resumeLastModified}
                                        onChange={formik.handleChange}


                                    >
                                        <MenuItem value={10}>More than 1 year ago</MenuItem>
                                        <MenuItem value={20}>Month ago</MenuItem>
                                        <MenuItem value={30}>Week ago</MenuItem>
                                    </Select>
                                </FormControl>


                                <FormControl fullWidth>
                                    <InputLabel size="small" id="using">Using</InputLabel>
                                    <Select size="small"
                                        labelId="using"
                                        id="using"
                                        label="using"
                                        name="using"
                                        value={formik.values.using}
                                        onChange={formik.handleChange}

                                    >
                                        <MenuItem value="Boolean">Boolean</MenuItem>
                                        <MenuItem value="And">And</MenuItem>
                                        <MenuItem value="OR">OR</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="space-between">
                                <FormControl fullWidth>
                                    <InputLabel size="small" id="state">State</InputLabel>
                                    <Select

                                        size="small"
                                        labelId="state"
                                        id="state"
                                        label="state"
                                        name="state"
                                        value={formik.values.state}
                                        onChange={formik.handleChange}



                                    >
                                        <MenuItem value="Karnataka">Karnatala</MenuItem>
                                        <MenuItem value="Telangana">Telangana</MenuItem>
                                        <MenuItem value="Maharastra">Maharastra</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <Button sx={{ borderRadius: '13px' }} size="small" variant="contained" disabled>
                                    OR
                                </Button> */}
                                <TextField id="outlined-basic" label="Zipcode" variant="outlined" size="small" />
                                <FormControl fullWidth>
                                    <InputLabel size="small" id="locationWithZipcode">preferred location with Zipcode</InputLabel>
                                    <Select
                                        size="small"
                                        labelId="locationWithZipcode"
                                        id="locationWithZipcode"
                                        label="locationWithZipcode"
                                        name="locationWithZipcode"
                                        value={formik.values.locationWithZipcode}
                                        onChange={formik.handleChange}


                                    >
                                        <MenuItem value={10}>Karnatala</MenuItem>
                                        <MenuItem value={20}>Telangana</MenuItem>
                                        <MenuItem value={30}>Maharastra</MenuItem>
                                    </Select>
                                </FormControl>


                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="space-between">

                                <TextField
                                    type="text"
                                    id="jobTitle"
                                    name="jobTitle"
                                    size="small"
                                    variant="outlined"
                                    label="Job title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.jobTitle}
                                    fullWidth
                                />

                                <TextField
                                    type="text"
                                    id="employer"
                                    name="employer"
                                    size="small"
                                    variant="outlined"
                                    label="Employer"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.employer}
                                    fullWidth
                                />
                                <TextField
                                    type="text"
                                    id="schoolAttended"
                                    name="schoolAttended"
                                    size="small"
                                    variant="outlined"
                                    label="School Attended"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.schoolAttended}
                                    fullWidth
                                />
                                {/* <TextField id="outlined-basic" label="Job title" variant="outlined" />
                                <TextField id="outlined-basic" label="Employer" variant="outlined" />
                                <TextField id="outlined-basic" label="School Attended" variant="outlined" /> */}


                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="space-between">
                                <FormControl sx={{ width: 'calc(50% - 54px)' }} fullWidth>
                                    <InputLabel size="small" id="authorization">Work Authorization</InputLabel>
                                    <Select
                                        size="small"
                                        labelId="authorization"
                                        id="authorization"
                                        label="authorization"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.authorization}


                                    >
                                        <MenuItem value={10}>Karnatala</MenuItem>
                                        <MenuItem value={20}>Telangana</MenuItem>
                                        <MenuItem value={30}>Maharastra</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormLabel
                                        id="demo-row-radio-buttons-group-label">Should candidate have a government security clearence?</FormLabel>
                                    <RadioGroup

                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                        <FormControlLabel value="Either" control={<Radio />} label="Either" />

                                    </RadioGroup>
                                </FormControl>


                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                <Button
                                    variant="contained"
                                    type='submit'

                                    sx={{ borderRadius: '8px', '&:hover': { boxShadow: 'none' } }}

                                >
                                    Search
                                </Button>
                                <Button
                                    variant="outlined"

                                    sx={{ borderRadius: '8px', '&:hover': { boxShadow: 'none' } }}

                                >
                                    Reset
                                </Button>


                            </Stack>




                        </Stack>



                    </Box>














                </form >

            </div >
        </>


    );
}
export default SearchAllResumes;
