import {Card} from "../../../../../shared/modules/MaterialImports/Card";
import {Stack} from "../../../../../shared/modules/MaterialImports/Stack";
import {Typography} from "../../../../../shared/modules/MaterialImports/Typography";
import { Box } from "@mui/system"
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import './SelectedCard.scss'

const SelectedCard = () => {
    return (
        <Stack className="selected-card-full-container" spacing={3} direction='row' mr={5}>
            <Box className='selected-card-pointer'>
                <Box className='selected-card-pointer-color'></Box>
            </Box>

            <Card className="selected-card-container">
                <Stack>
                    <Box>
                        <Typography variant='h6' className="selected-card-name-heading">ABDEL ALTABARANI</Typography>
                        <p className="selected-card-application-role">Application Tech Arch Senior Manager</p>
                    </Box>
                    <Box>
                        <Typography variant='h6' className="selected-card-headings">Email</Typography>
                        <p className="selected-card-para">abdel.m.altabarani@accenture.com</p>
                    </Box>
                </Stack>
                <Stack>
                    <Box>
                        <Typography variant='h6' className="selected-card-headings">PRIMARY CONTACT</Typography>
                        <p className="selected-card-para">(312) 693-0027</p>
                    </Box>
                    <Box>
                        <Typography variant='h6' className="selected-card-headings">SECONDARY CONTACT</Typography>
                        <p className="selected-card-para">353 1 646 2000</p>
                    </Box>
                </Stack>

                <Stack>
                    <Box>
                        <Typography variant='h6' className="selected-card-headings">LOCATION</Typography>
                        <p className="selected-card-para">Chicago, IL</p>
                    </Box>
                    <Box>
                        <Typography variant='h6' className="selected-card-headings">LAST UPDATED</Typography>
                        <p className="selected-card-para">05/31/2019 05:17 PM</p>
                    </Box>
                </Stack>

                <Stack className="selected-card-button-container" spacing={5} direction='row'>
                    <Box className='selected-card-button selected-card-edit-button' pt={2}>
                        <BorderColorIcon />
                    </Box>
                    <Box className='selected-card-button selected-card-delete-button' pt={2}>
                        <DeleteOutlineOutlinedIcon />
                    </Box>
                </Stack>
            </Card>

        </Stack>
    )
}

export default SelectedCard