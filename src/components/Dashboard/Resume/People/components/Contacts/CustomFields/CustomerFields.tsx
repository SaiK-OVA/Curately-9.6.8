// import React, { useState } from "react";
import { Box } from "../../../../../../../shared/modules/MaterialImports/Box";
import { Button } from "../../../../../../../shared/modules/MaterialImports/Button";
import { Card } from "../../../../../../../shared/modules/MaterialImports/Card";
import { Stack } from "../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../shared/modules/MaterialImports/Typography";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const CustomFields = () => {
    return (
        <Stack mb={5} direction='row' justifyContent='space-between'>
            <Card sx={{ height: '150px', width: '48%' }}>
                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E6E6E6' }}>
                    <Box sx={{ p: 2 }}>
                        <Typography sx={{ color: '#000000', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, fontSize: '16px' }}>
                            Contact (0)
                        </Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            disableRipple
                            startIcon={<BorderColorIcon sx={{
                                '& .MuiButton-startIcon>*:nth-of-type(1)': {
                                    fontSize: '15px'
                                }
                            }} />}
                            sx={{
                                height: '19px', width: '50px', p: 2, color: '#146EF6', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 600, fontSize: '14px', textTransform: 'capitalize',
                                '&:hover': {
                                    backgroundColor: '#ffffff',
                                    color: '#0852C2'
                                }
                            }}>
                            Edit
                        </Button>
                    </Box>
                </Stack>

                <Stack p={2}>
                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, fontSize: '14px' }}>
                        End Client:
                    </Typography>
                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, fontSize: '14px' }}>
                        End Client Conatct:
                    </Typography>
                </Stack>
            </Card>

            <Card sx={{ height: '125px', width: '48%' }}>
                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E6E6E6' }}>
                    <Box sx={{ p: 2 }}>
                        <Typography sx={{ color: '#000000', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, fontSize: '16px' }}>
                            Account (0)
                        </Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button
                            disableRipple
                            startIcon={<BorderColorIcon sx={{
                                '& .MuiButton-startIcon>*:nth-of-type(1)': {
                                    fontSize: '15px'
                                }
                            }} />}
                            sx={{
                                height: '19px', width: '50px', p: 2, color: '#146EF6', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 600, fontSize: '14px', textTransform: 'capitalize',
                                '&:hover': {
                                    backgroundColor: '#ffffff',
                                    color: '#0852C2'
                                }
                            }}>
                            Edit
                        </Button>
                    </Box>
                </Stack>

                <Stack p={2}>
                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, fontSize: '12px' }}>
                        No custom fields defined
                    </Typography>
                </Stack>
            </Card>
        </Stack>
    )
}

export default CustomFields