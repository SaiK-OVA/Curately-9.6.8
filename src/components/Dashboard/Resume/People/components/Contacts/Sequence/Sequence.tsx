// import React, { useState } from "react";
import { useState } from "../../../../../../../shared/modules/React";
import { Box } from "../../../../../../../shared/modules/MaterialImports/Box";
import { Card } from "../../../../../../../shared/modules/MaterialImports/Card";
import { Stack } from "../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../shared/modules/MaterialImports/Typography";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Switch } from '../../../../../../../shared/modules/MaterialImports/Switch';
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";

const Sequence = () => {
    const [switchChecked, setSwitchChecked] = useState(false)
    const [isCardHover, setIsCardHover] = useState(false)

    const handleCardHover = () => {
        setIsCardHover(!isCardHover)
    }

    const handleSwitchChecked = (event: any) => {
        setSwitchChecked(event.target.checked)
    }

    return (
        <Stack mb={5}>
            <Stack direction='row' spacing={0.5} alignItems='center' sx={{

            }}>
                <Typography component='h6'
                    sx={{ color: '#474747', fontSize: '16px', fontWeight: 600, fontFamily: 'Segoe UI' }}
                >
                    Contact Sequence Status
                </Typography>
                <Box component='span' sx={{
                    color: '#737373',
                }}>
                    <HelpOutlineOutlinedIcon sx={{ fontSize: '12.5px' }} />
                </Box>
            </Stack>
            <Card sx={{ height: '56px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 1, mb: 1 }} >
                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Stack sx={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        borderRight: '1px solid #E6E6E6', mt: '5px', mb: '5px', pr: '25%'
                    }}>
                        <Box
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 400 }}
                        >
                            -
                        </Box>
                        <Typography component='h6'
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 700, fontFamily: 'Segoe UI' }}
                        >
                            Active
                        </Typography>
                    </Stack>

                    <Stack sx={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        borderRight: '1px solid #E6E6E6', mt: '5px', mb: '5px', pr: '25%', pl: '25%'
                    }}>
                        <Box
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 400 }}
                        >
                            -
                        </Box>
                        <Typography component='h6'
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 700, fontFamily: 'Segoe UI' }}
                        >
                            Paused
                        </Typography>
                    </Stack>

                    <Stack sx={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        borderRight: '1px solid #E6E6E6', mt: '5px', mb: '5px', pr: '25%', pl: '25%'
                    }}>
                        <Box
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 400 }}
                        >
                            1
                        </Box>
                        <Typography component='h6'
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 700, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', whiteSpace: 'nowrap' }}
                        >
                            Not Sent
                        </Typography>
                    </Stack>

                    <Stack sx={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        borderRight: '1px solid #E6E6E6', mt: '5px', mb: '5px', pr: '25%', pl: '25%'
                    }}>
                        <Box
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 400 }}
                        >
                            -
                        </Box>
                        <Typography component='h6'
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 700, fontFamily: 'Segoe UI' }}
                        >
                            Bounced
                        </Typography>
                    </Stack>

                    <Stack sx={{
                        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                        borderRight: '1px solid #E6E6E6', mt: '5px', mb: '5px', pr: '25%', pl: '25%'
                    }}>
                        <Box
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 400 }}
                        >
                            -
                        </Box>
                        <Typography component='h6'
                            sx={{ color: '#474747', fontSize: '12px', fontWeight: 700, fontFamily: 'Segoe UI' }}
                        >
                            Finished
                        </Typography>
                    </Stack>
                </Stack>
            </Card>

            <Stack direction='row' spacing={0.5} alignItems='center' sx={{

            }}>
                <Typography component='h6'
                    sx={{ color: '#474747', fontSize: '16px', fontWeight: 600, fontFamily: 'Segoe UI' }}
                >
                    Sequences
                </Typography>
                <Box component='span' sx={{
                    color: '#737373',
                }}>
                    <HelpOutlineOutlinedIcon sx={{ fontSize: '12.5px' }} />
                </Box>
            </Stack>

            <Card
                onChange={handleCardHover}
                sx={{
                    height: '49px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 1,
                    '&:hover': {
                        backgroundColor: !isCardHover ? '#EFEFEF' : ''
                    }
                }}>
                <Stack direction='row' alignItems='center'>
                    <Stack sx={{
                        '& .MuiSwitch-root ': {
                            width: '65px', height: '45px', padding: '11px'
                        },
                        '& .MuiButtonBase-root.MuiSwitch-switchBase': {
                            padding: '12px', pt: '12.5px', '&:hover': {
                                backgroundColor: 'transparent'
                            }
                        },
                        '& .MuiSwitch-track': {
                            borderRadius: '12px',
                            opacity: 0.5,
                            backgroundColor: '#CACACC'
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            opacity: 1,
                            backgroundColor: '#146EF6',
                        },
                        '& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked': {
                            color: '#ffffff'
                        },
                        '& .MuiSwitch-root:hover .MuiSwitch-track': {
                            opacity: 1,
                            backgroundColor: switchChecked ? '#146EF6' : '#737373',
                        },
                    }} >
                        <Switch
                            disableRipple
                            checked={switchChecked}
                            onChange={handleSwitchChecked}
                        />
                    </Stack>
                    <Box component='span'>
                        <Typography component='p' sx={{ color: '#146EF6', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, fontSize: '14px' }}>
                            Justin CSRNinja Drip
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction='row' alignItems='center' justifyContent='center' pr='1%'>
                    <Stack direction='row' spacing={2} alignItems='center'>
                        <Box sx={{ height: '20px', width: '64px', backgroundColor: '#EA7B3B', p: '5px', textAlign: 'center', borderRadius: '4px' }}>
                            <Typography component='p' sx={{ color: '#ffffff', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 700, fontSize: '12px' }}>
                                Not Sent
                            </Typography>
                        </Box>
                        <Box sx={{ backgroundColor: '#F0F0F2', height: '26px', width: '25px', borderRadius: '50%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography component='p' sx={{ color: '#000000', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, fontSize: '12px' }}>
                                SG
                            </Typography>
                        </Box>

                        <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 600, fontSize: '12px' }}>
                            2m 27d
                        </Typography>

                        <Box sx={{
                            border: '1px solid #CACACC', height: '32px', width: '32px', borderRadius: '4px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: !isCardHover ? '#FBFBFD' : '#FBFBFD'
                        }}>
                            <MoreHorizOutlinedIcon sx={{ color: '#919191' }} />
                        </Box>
                    </Stack>
                </Stack>
            </Card >
        </Stack >
    )
}

export default Sequence