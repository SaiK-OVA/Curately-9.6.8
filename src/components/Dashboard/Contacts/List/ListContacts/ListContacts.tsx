// import React, { useState } from 'react';
import { useState } from '../../../../../shared/modules/React';
import Modal from '@mui/material/Modal';
import {Button} from '../../../../../shared/modules/MaterialImports/Button';
import {Stack} from '../../../../../shared/modules/MaterialImports/Stack';
import {Typography} from '../../../../../shared/modules/MaterialImports/Typography';

import { Box } from '@mui/system'
import { Link } from 'react-router-dom';
import DistributionPopup from '../DistributionPopup/DistributionPopup';
import TableList from '../TableList/TableList';
import SelectedCard from '../SelectedCard/SelectedCard';

import './ListContacts.scss'

const ListContacts = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <Stack p={5}>
            <Stack className='header-container'>
                <Box className='company-name-card'>
                    <Typography variant='h6' className='header-card-heading'>COMPANY NAME</Typography>
                    <Typography variant='h5' className='company-detail-heading'>ACCENTURE</Typography>
                </Box>
                <Box className='company-id-card'>
                    <Typography variant='h6' className='header-card-heading'>COMPANY ID</Typography>
                    <Typography variant='h5' className='company-detail-heading'>9399</Typography>
                </Box>

                <Button variant="contained"
                    size='small'
                    color="primary"
                    className='list-header-buttons distribution-button'
                    onClick={handleShowPopup}
                >ADD TO DISTRIBUTION LIST</Button>
                <Button variant="outlined"
                    size='small'
                    color="secondary"
                    className='list-header-buttons add-new-button'
                    component={Link}
                    to='../add'
                >
                    ADD NEW CONTACT</Button>

            </Stack>

            <Modal open={showPopup}>
                <Box className='popup-style'>
                    {showPopup && <DistributionPopup onClose={handleClosePopup} />}
                </Box>
            </Modal>

            <Box>
                <TableList />
            </Box>

            <Box>
                <SelectedCard />
            </Box>

        </Stack>
    )
}

export default ListContacts