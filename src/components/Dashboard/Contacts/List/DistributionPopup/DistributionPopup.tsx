import { useState } from '../../../../../shared/modules/React';
import {Button} from '../../../../../shared/modules/MaterialImports/Button';
import {Card} from '../../../../../shared/modules/MaterialImports/Card';
import {Checkbox} from '../../../../../shared/modules/MaterialImports/FormElements';
import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';
import {TextField} from '../../../../../shared/modules/MaterialImports/TextField';
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';
import {MenuItem} from '../../../../../shared/modules/MaterialImports/Menu';
// import FormControl from '@mui/material/FormControl';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { Box } from '@mui/system';
import { useFormik, Yup } from '../../../../../shared/modules/Formik';

import './DistributionPopup.scss'


interface PopupProps {
    onClose: () => void
}

const DistributionPopup = ({ onClose }: PopupProps) => {
    const [showPopup, setShowPopup] = useState(true)

    const popupValidations = Yup.object({
        category: Yup.string().required('Required'),
        list: Yup.string().required('Required'),
        name: Yup.string().required('Required'),
        private: Yup.boolean(),
        read: Yup.boolean(),
        type: Yup.string().required('Required'),
        member: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
    })

    const initialValues = {
        category: '',
        list: '',
        name: '',
        private: false,
        read: false,
        type: '',
        member: '',
        description: ''
    }

    const AddDataButton = (values: any) => {
        if (formik.isValid) {
            // console.log('AddData', formik.values)
        } else {
            // console.log('No Data, Fill the Data')
        }
    }



    const formik = useFormik({
        initialValues,
        validationSchema: popupValidations,
        onSubmit: AddDataButton
    });

    const handleCancel = () => {
        setShowPopup(false);
        onClose();
    };

    if (!showPopup) {
        return null;
    }

    return (
        <Card className='popup-card-conatainer'>
            <Typography variant='h6' pt={1}>
                Add Contacts to Distribution List
            </Typography>
            <hr />
            <form onSubmit={formik.handleSubmit}>
                <Stack className='popup-header-container' mt={2}>
                    <Box className='popup-input-header-container'>
                        <label htmlFor='category'>Select Distribution Category</label><span style={{ color: 'red' }}>*</span>
                        <TextField
                            select
                            id="category"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.category}
                            size="small"
                            name='category'
                            sx={{ width: '220px' }}
                        >
                            <MenuItem value="" sx={{ height: '30px' }}></MenuItem>
                            <MenuItem value="aakash">Aakash Kumar</MenuItem>
                            <MenuItem value="aarita">Aarita Joseph</MenuItem>
                            <MenuItem value="abhilash">Abhilash Verma</MenuItem>
                        </TextField>
                        <Typography className='popup-errors' component='p'>
                            {formik.touched.category && formik.errors.category ? formik.errors.category : null}
                        </Typography>
                    </Box>

                    <Box className='popup-input-header-container'>
                        <label htmlFor='list'>Select Distribution List </label><span style={{ color: 'red' }}>*</span>
                        <TextField
                            id="list"
                            name="list"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.list}
                            size="small"
                            select
                            sx={{ width: '220px' }}
                        >
                            <MenuItem value="" sx={{ height: '30px' }}></MenuItem>
                            <MenuItem value="aakash">Aakash Kumar</MenuItem>
                            <MenuItem value="aarita">Aarita Joseph</MenuItem>
                            <MenuItem value="abhilash">Abhilash Verma</MenuItem>
                        </TextField>
                        <Typography className='popup-errors' component='p'>
                            {formik.touched.list && formik.errors.list ? formik.errors.list : null}
                        </Typography>
                    </Box>
                    <Box mt={2} >
                        <Button
                            variant='outlined'
                            className='popup-header-button'
                            size='small'
                        >
                            <span><PersonAddAlt1OutlinedIcon /></span>
                            Create New
                        </Button>
                    </Box>
                </Stack>

                <Typography variant='h6' mt={2}>New Distribution List</Typography>
                <hr />

                <Box>
                    <Stack mt={2} spacing={5} direction='row'>
                        <Box className='popup-input'>
                            <label htmlFor='name'>Name/Title</label><span style={{ color: 'red' }}>*</span>
                            <TextField
                                size='small'
                                id='name'
                                name='name'
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type='text'
                            />
                            <Typography className='popup-errors' component='p'>
                                {formik.touched.name && formik.errors.name ? formik.errors.name : null}
                            </Typography>
                        </Box>

                        <Stack className='popup-button-container'>
                            <Box>
                                <Checkbox
                                    id='private'
                                    name='private'
                                    size='small'
                                    className='checkbox-tickMark'
                                    checked={formik.values.private}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor='private'>Private</label>
                            </Box>

                            <Box>
                                <Checkbox
                                    id='read'
                                    name='read'
                                    size='small'
                                    className='checkbox-tickMark'
                                    checked={formik.values.read}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor='read'>Read Only</label>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack mt={2} spacing={5} direction='row'>
                        <Box className='popup-input'>
                            <label htmlFor='type'>Type</label>
                            <TextField
                                id="type"
                                name="type"
                                value={formik.values.type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                size='small'
                                select
                            >
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </TextField>
                            <Typography className='popup-errors' component='p'>
                                {formik.touched.type && formik.errors.type ? formik.errors.type : null}
                            </Typography>
                        </Box>

                        <Box className='popup-input'>
                            <label htmlFor='member'>Member</label><span style={{ color: 'red' }}>*</span>
                            <TextField
                                id="member"
                                name="member"
                                value={formik.values.member}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                size='small'
                                select
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </TextField>
                            <Typography className='popup-errors' component='p'>
                                {formik.touched.member && formik.errors.member ? formik.errors.member : null}
                            </Typography>
                        </Box>

                    </Stack>

                    <Stack mt={2}>
                        <label htmlFor='description'>Description</label><span style={{ color: 'red' }}>*</span>
                        <TextField
                            id='description'
                            name='description'
                            className='popup-description-input'
                            value={formik.values.description}
                            multiline
                            rows={2}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Typography className='popup-errors' component='p'>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : null}
                        </Typography>
                    </Stack>

                    <Stack
                        mt={2}
                        className='popup-button-container'
                        direction='row'
                        spacing={10}
                    >
                        <Button
                            variant='contained'
                            className='popup-add-button'
                            onClick={() => formik.isSubmitting}
                            type='submit'
                        >
                            Add
                        </Button>
                        <Button
                            variant='outlined'
                            onClick={handleCancel}
                            className='popup-cancel-button'
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </form>
        </Card >
    )
}

export default DistributionPopup