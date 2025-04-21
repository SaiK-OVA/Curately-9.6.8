import {useContext} from "react";
import {React, useState } from "../../../../../../../shared/modules/React";
import {Dialog} from '../../../../../../../shared/modules/MaterialImports/Dialog';
import {Typography} from '../../../../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../../../../shared/modules/MaterialImports/Stack';
import {TextField} from '../../../../../../../shared/modules/MaterialImports/TextField';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import {Button} from '../../../../../../../shared/modules/MaterialImports/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Store } from "../../../../../../../App";
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';


interface EmbedImgProps {
    createdFields: any,
    addElement: (type: any, index: number) => void,
}

const EmbedImage: React.FC<EmbedImgProps> = ({ addElement, createdFields }) => {

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [propsData, setPropsData] = useContext(Store)
    const handleCloseEmbedModal = (fieldId: any) => {
        setPropsData((prevPropsData: any) => ({
            ...prevPropsData,
            isEmbedImg: ({ ...prevPropsData.isEmbedImg, [fieldId]: false }),
        }))
    }

    const [imageUrl, setImageUrl] = useState('')

    const [isUpload, setIsUpload] = useState(true);
    const onClickUpload = () => {
        setIsUpload(true);
        setIsLink(false);
    };

    const [isLink, setIsLink] = useState(true);
    const onClickLink = () => {
        setIsLink(true);
        setIsUpload(false);
    };

    const [EmbedImgBtnClick, setEmbedImgBtnClick] = useState(false)

    const handleImgUrl = (event: any) => {
        setImageUrl(event.target.value)
    }

    const onClickEmdedImgBtnClick = (field: any) => {
        if (field.fieldType === 'embedimage') {
            field.value = imageUrl;
            addElement(field, 1)
            setPropsData((prevPropsData: any) => ({
                ...prevPropsData,
                isEmbedImg: ({ ...prevPropsData.isEmbedImg, [field.uniqueId]: false }),
                embededImages: [...prevPropsData.embededImages, imageUrl]
            }))
            handleCloseEmbedModal(field.uniqueId)
            setEmbedImgBtnClick(false)
            setImageUrl('')
        } else {
            return false
        }
    }

    // console.log('isEmbedImg', propsData.isEmbedImg)

    return (
        <>
            {
                propsData.embedfields.map((field: any) => (

                    <Dialog
                        className="formBuilder"
                        fullScreen={fullScreen}
                        key={field.uniqueId}
                        id={field.uniqueId}
                        open={propsData.isEmbedImg[field.uniqueId] || false}
                        onClose={() => handleCloseEmbedModal(field.uniqueId)}
                        sx={{
                            "& .MuiPaper-root.MuiDialog-paper":
                            {
                                width: "830px",
                                // maxHeight: "580px",
                                height: '400px',
                                // width: '500px',
                                borderRadius: "5px",
                                backgroundColor: "rgb(255, 255, 255)",
                            }
                        }}
                    // aria-labelledby="responsive-dialog-title"
                    >
                        <Stack direction='row' spacing={2} sx={{ borderBottom: '1px solid #f0f0f0', p: '8px 8px 0px 10px' }}>
                            {/* <Stack sx={{
                    borderBottom: isUpload ? "2px solid rgb(0, 0, 0)" : "1px solid transparent", height: '30px', display: 'flex', alignItems: 'center',
                    '&:hover': {
                        borderBottom: '2px solid rgb(0, 0, 0)',
                    }, cursor: 'pointer'
                }}
                    onClick={onClickUpload}
                >
                    <Typography sx={{ fontSize: '14px', fontFamily: 'Segoe UI', fontWeight: 600, color: 'rgb(0, 0, 0)', }}>Upload</Typography>
                </Stack> */}
                            <Stack sx={{
                                borderBottom: isLink ? "2px solid rgb(0, 0, 0)" : "1px solid transparent", height: '30px', display: 'flex', alignItems: 'center',
                                '&:hover': {
                                    borderBottom: '2px solid rgb(0, 0, 0)',
                                }, cursor: 'pointer'
                            }}
                                onClick={onClickLink}
                            >
                                <Typography sx={{ fontSize: '14px', fontFamily: 'Segoe UI', fontWeight: 600, color: 'rgb(0, 0, 0)', }}>Link</Typography>
                            </Stack>

                        </Stack>
                        {/* 
            <Stack sx={{ p: 2, display: isUpload ? 'flex' : 'none', justifyContent: 'center', flexDirection: 'row', cursor: 'pointer' }}>
                <Box
                    component='label'
                    htmlFor="fileUpload"
                    sx={{
                        border: '1px dashed rgb(187, 186, 184)',
                        height: '300px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        width: '90%'
                    }}
                >
                    <FileUploadOutlinedIcon sx={{ fontSize: '50px', color: 'rgb(137, 136, 132)' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: 'bold', mt: '10px', fontFamily: 'Segoe UI', }}>Click to choose a file or drag here</Typography>
                    <Typography sx={{
                        color: 'rgb(137, 136, 132)',
                        fontSize: '11px', mt: '10px', fontFamily: 'Segoe UI',
                    }}>Size limit: 10 MB</Typography>
                </Box>
                <input type='file' style={{ display: 'none' }} id='fileUpload' />
            </Stack> */}

                        <Stack sx={{ display: isLink ? 'flex' : 'none', justifyContent: 'center', flexDirection: 'row' }}>

                            <Stack sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    value={imageUrl}
                                    onChange={handleImgUrl}
                                    sx={{
                                        width: '90%',
                                        mt: 2,
                                        color: '#1A1A1A',
                                        boxShadow: 'rgba(0, 0, 0, 0.12) ',
                                        '& .MuiInputBase-input.MuiOutlinedInput-input': {
                                            p: '8px 4px 8px 10px'
                                        },
                                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '',
                                        },
                                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgba(58, 152, 255, 0.36)',
                                            borderWidth: '3px',
                                        },
                                        '& .MuiInputBase-input': {
                                            color: '#1A1A1A',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'Segoe UI',
                                        },
                                        '& .MuiInputBase-input::placeholder': {
                                            color: '#919191',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'Segoe UI',
                                            opacity: 0.80,
                                        },
                                    }}
                                    placeholder="Paste any image link from web"
                                />

                                <Box sx={{
                                    border: EmbedImgBtnClick ? '1px solid rgba(58, 152, 255, 0.36)' : '1px solid transparent',
                                    borderWidth: '3px', width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2, borderRadius: '8px'
                                }}>
                                    <Button variant="contained"
                                        onClick={() => onClickEmdedImgBtnClick(field)}
                                        disableRipple
                                        sx={{
                                            width: '100%', height: '30px', backgroundColor: 'rgb(0, 0, 0)', textTransform: 'capitalize', boxShadow: 0, '&:hover': {
                                                backgroundColor: 'rgb(0, 0, 0)',
                                                boxShadow: 0,
                                            },
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'Segoe UI',
                                        }}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Stack>
                        </Stack>

                    </Dialog >

                ))
            }
        </>

    )
}

export default EmbedImage