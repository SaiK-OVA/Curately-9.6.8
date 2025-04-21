import {
    // useContext,
    React, useEffect, useState
} from "../../../../shared/modules/React";
import { Typography } from '../../../../shared/modules/MaterialImports/Typography';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid';
import './Branding1.scss';
import { Card, CardContent } from '../../../../shared/modules/MaterialImports/Card';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { HexColorPicker } from "react-colorful";
import PixIcon from '@mui/icons-material/Pix';
// import Modal from '@mui/material/Modal';
import { Popover } from '../../../../shared/modules/MaterialImports/Popover';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from '../../../../shared/api/api';

import { showToaster } from '../../../shared/SnackBar/SnackBar';
// import { CustomThemeStore } from "../../../../App";




const Branding = () => {
    // const [colorObj, setcolorObj] = useContext(CustomThemeStore);
    const [colorObj, setcolorObj] = useState({
        primary: '#146ef6',
        secondary: '#474747'
    });

    const [brandingData, setBrandingData] = useState({
        "brandingid": 3148,
        "logo": "",
        "bgImg": "",
        // "primaryColor1": colorObj.primary,
        // "primaryColor2": colorObj.secondary,
        "primaryColor1": colorObj.primary,
        "primaryColor2": colorObj.secondary,
        "companyId": 20
    });



    const [openPrimary, setOpenPrimary] = React.useState(false);
    const [openSecondary, setOpenSecondary] = React.useState(false);


    const handleBgImgChange = (e: any) => {

        const bgImgSize = 1024;
        let selectedBGImg = e.target.files[0];
        const bgFileSize = selectedBGImg.size / 1024;

        if (bgFileSize > bgImgSize) {
            showToaster('File size should be less than 1MB', 'error');
        } else {
            let reader = new FileReader();
            reader.readAsDataURL(selectedBGImg);
            reader.onloadend = (e) => {
                //me.modelvalue = reader.result;
                // console.log('base64' + reader.result);
                setBrandingData({
                    ...brandingData,
                    bgImg: (reader.result) ? reader.result.toString() : ""
                })
            }
        }
    }

    const handleChange = (e: any) => {
        const fileSize = 500;
        let selectedFile = e.target.files[0];
        const fileSizeKB = selectedFile.size / 1024;

        if (fileSizeKB > fileSize) {
            showToaster('File size should be less than 500KB', 'error');
        } else {
            let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) => {
                //me.modelvalue = reader.result;
                // console.log('base64' + reader.result);
                setBrandingData({
                    ...brandingData,
                    logo: (reader.result) ? reader.result.toString() : ""
                })
            }
        }
    }

    const saveForm = () => {


        trackPromise(
            ApiService.postWithData(216, 'Curately/updatebranding', { ...brandingData })
                .then(
                    (response: any) => {
                        // console.log(response.data);
                        if (response.data.Success) {
                            showToaster(response.data.Message, 'success');

                        } else {
                            showToaster(response.data.Message, 'error');
                        }
                    })
                .catch((error) => {
                    console.error("Error:", error);

                }
                )
        )

    }

    useEffect(() => {
        setcolorObj({
            primary: brandingData.primaryColor1,
            secondary: brandingData.primaryColor2
        })
    }, [brandingData.primaryColor1, brandingData.primaryColor2])

    useEffect(() => {
        loadInitialData();
    }, []);


    const Reg_Exp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
    const defaultColorObj = {
        primary: 'var(--c-primary-color)',
        secondary: '#474747'
    };

    const loadInitialData = () => {
        trackPromise(
            ApiService.getCall(216, 'Curately/getbranding/20')
                .then((response) => {
                    // console.log(response.data);
                    if (response.data.Success) {
                        setBrandingData({
                            "brandingid": (response.data.BrandingId) ? response.data.BrandingId : "",
                            "logo": (response.data.Logo) ? response.data.Logo : "",
                            "bgImg": (response.data.BgImg) ? response.data.BgImg : "",
                            "primaryColor1": (response.data.PrimaryColor1 && Reg_Exp.test(response.data.PrimaryColor1)) ? response.data.PrimaryColor1 : colorObj.primary || defaultColorObj.primary,
                            "primaryColor2": (response.data.PrimaryColor2 && Reg_Exp.test(response.data.PrimaryColor2)) ? response.data.PrimaryColor2 : colorObj.secondary || defaultColorObj.secondary,
                            "companyId": 20
                        })
                    }
                })
        )
    }


    return (

        <div className="emailTemplateList pt-3 px-5">
            <Grid
                container
                direction="row"
                className="customCard px-4 py-2"
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                sx={{ minHeight: 'auto !important' }}
            >
                <Typography variant="h6" className="headerName">
                    Branding
                </Typography>

            </Grid>
            <Grid
                container
                justifyContent={'start'}
                alignItems={'center'}
            >
                <Grid sx={{ width: 500, mr: 3 }}>
                    <span style={{ fontSize: "16px", padding: "8px" }}>Logo (upto size 500kB)</span>
                    <Card className="mt-1">

                        <CardContent>
                            {!brandingData.logo &&
                                <Box component="section" sx={{ p: 2, border: '1px dashed #c8c9c9', margin: "12px", backgroundColor: "#fcfcfc" }} onChange={handleChange}>
                                    <label style={{ color: "rgba(0,0,0,0.54)", display: "grid", justifyContent: "center" }}>
                                        <CloudUploadOutlinedIcon sx={{ fontSize: "40px", color: "rgba(0,0,0,0.54)", marginLeft: "2em" }} />
                                        <span >Drop Files Here or click to upload</span>
                                        <input accept="image/jpeg" className="imageInput" name="images" type="file" />
                                    </label>
                                </Box>
                            }


                            {brandingData.logo &&
                                <Box>
                                    <img src={brandingData.logo} alt="logoImage" style={{ width: "180px" }} />
                                    <Button disableRipple
                                        sx={{
                                            padding: "0", margin: "0px", minWidth: "0px", float: "right",
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }} onClick={() => {
                                            setBrandingData({
                                                ...brandingData,
                                                logo: ""
                                            })
                                        }}>
                                        <DeleteIcon sx={{
                                            fontSize: "24px", color: "#DD422D", marginTop: '2px',
                                            paddingRight: '5px', position: "relative",
                                        }} />
                                    </Button>
                                </Box>
                            }
                        </CardContent>

                    </Card>
                </Grid>
                <Grid sx={{ width: 500 }}>
                    <span style={{ fontSize: "16px", padding: "8px" }}>Background Image (upto size 1MB)</span>
                    <Card className="mt-1 ">

                        <CardContent>
                            {!brandingData.bgImg &&
                                <Box component="section" sx={{ p: 2, border: '1px dashed #c8c9c9', margin: "12px", backgroundColor: "#fcfcfc" }} onChange={handleBgImgChange}>
                                    <label style={{ color: "rgba(0,0,0,0.54)", display: "grid", justifyContent: "center" }}>
                                        <CloudUploadOutlinedIcon sx={{ fontSize: "40px", color: "rgba(0,0,0,0.54)", marginLeft: "2em" }} />
                                        <span >Drop Files Here or click to upload</span>
                                        <input accept="image/jpeg" className="imageInput" name="images" type="file" />
                                    </label>
                                </Box>
                            }


                            {brandingData.bgImg &&
                                <Box>
                                    <img src={brandingData.bgImg} alt="backgroundImage" style={{ width: "180px" }} />
                                    <Button disableRipple
                                        sx={{
                                            padding: "0", margin: "0px", minWidth: "0px", float: "right",
                                            '&:hover': {
                                                backgroundColor: 'transparent'
                                            }
                                        }} onClick={() => {
                                            setBrandingData({
                                                ...brandingData,
                                                bgImg: ""
                                            })
                                        }}>
                                        <DeleteIcon sx={{
                                            fontSize: "24px", color: "#DD422D", marginTop: '2px',
                                            paddingRight: '5px', position: "relative",
                                        }} />
                                    </Button>
                                </Box>
                            }
                        </CardContent>

                    </Card>
                    {/* {errorMsg &&
                        <span style={{ color: "#dc3545", }}> File size should be less than 500KB</span>
                    } */}
                </Grid>
            </Grid>


            <div style={{ marginTop: "2em" }}>
                <span style={{ fontSize: "16px", padding: "8px" }}>Color Scheme</span>
            </div>

            <Box style={{ display: "flex" }}>
                <Card sx={{ minWidth: 275, width: "20%", marginTop: "5px", height: "100px", marginRight: "2em" }}>
                    <CardContent>
                        <span style={{ padding: "10px 0px 0px 0px" }}>Primary Color</span>
                        <PixIcon onClick={() => setOpenPrimary(true)} style={{ float: "right" }}></PixIcon>
                        <Popover
                            className="popoverPrimaryBox"
                            open={openPrimary}
                            onClose={() => setOpenPrimary(false)}
                            sx={{ ml: 1, }}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'left',
                            }}
                        >
                            <Box className="modalBox" style={{ top: "10%", left: "10%" }}>

                                <HexColorPicker color={brandingData.primaryColor1} onChange={(e) => {
                                    setBrandingData({
                                        ...brandingData,
                                        primaryColor1: e
                                    })
                                    // console.log(e)
                                }} />
                            </Box>
                        </Popover>
                        {/* <Modal
                            open={openPrimary}
                            onClose={() => setOpenPrimary(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="modalBox">

                                <HexColorPicker color={brandingData.primaryColor1} onChange={setPrimaryColor} />
                            </Box>
                        </Modal> */}

                        <Box sx={{ width: 200, height: 40, bgcolor: brandingData.primaryColor1, marginTop: "1em" }} />
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 275, width: "20%", marginTop: "5px", height: "100px" }}>
                    <CardContent>
                        <span style={{ padding: "10px 0px 0px 0px" }}>Secondary Color</span>
                        <PixIcon onClick={() => setOpenSecondary(true)} style={{ float: "right" }}></PixIcon>
                        <Popover
                            className="popoverSecondaryBox"
                            open={openSecondary}
                            onClose={() => setOpenSecondary(false)}
                            sx={{ ml: 1, }}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'left',
                            }}
                        >
                            <Box className="modalBox" style={{ top: "10%", left: "10%" }}>
                                <HexColorPicker color={brandingData.primaryColor2} onChange={(e) => {
                                    setBrandingData({
                                        ...brandingData,
                                        primaryColor2: e
                                    })
                                    // console.log(e)
                                }}
                                // onMouseUp={(e) => {
                                //     console.log(e);
                                // }}
                                />
                            </Box>
                        </Popover>

                        {/* <Modal
                            open={openSecondary}
                            onClose={() => setOpenSecondary(false)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="modalBox">

                                <HexColorPicker color={brandingData.primaryColor2} onChange={setSecondaryColor} />
                            </Box>
                        </Modal> */}

                        <Box sx={{ width: 200, height: 40, bgcolor: brandingData.primaryColor2, marginTop: "1em" }} />
                    </CardContent>
                </Card>



            </Box>
            <div style={{ display: "flex", marginTop: "3em", marginLeft: "16em" }}>
                <Button variant="outlined" type='button' className='mr-2' color="secondary" size="small">Cancel</Button>
                <Button variant="contained" type='button' className='' onClick={saveForm} color="primary" size="small" >Save</Button>
            </div>

        </div>
    )
}

export default Branding;