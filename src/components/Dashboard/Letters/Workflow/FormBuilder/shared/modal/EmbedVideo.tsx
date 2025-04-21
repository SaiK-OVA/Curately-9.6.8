import {React, useState} from "../../../../../../../shared/modules/React";
import { useContext } from "react";
import {Dialog} from '../../../../../../../shared/modules/MaterialImports/Dialog';
import {Typography} from '../../../../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../../../../shared/modules/MaterialImports/Stack';
import { Button , TextField } from '../../../../../../../shared/modules/commonImports';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Store } from "../../../../../../../App";

interface EmbedVideoProps {
    createdFields: any,
    addElement: (type: any, index: number) => void,
}

const EmbedVideo: React.FC<EmbedVideoProps> = ({ addElement, createdFields }) => {
    const [videoUrl, setVideoUrl] = useState("")
    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [propsData, setPropsData] = useContext(Store)
    const handleCloseEmbedVideoModal = (fieldId: any) => {
        setPropsData((prevPropsData: any) => ({
            ...prevPropsData,
            isEmbedVideo: ({ ...prevPropsData.isEmbedVideo, [fieldId]: false }),
        }))
    }

    const [EmbedVideoBtnClick, setEmbedVideoBtnClick] = useState(false)
    const onClickEmdedVideoBtnClick = (field: any) => {
        if (field.fieldType === 'embedvideo') {
            field.value = videoUrl;
            setPropsData((prevPropsData: any) => ({
                ...prevPropsData,
                embededVideos: [...prevPropsData.embededVideos, videoUrl],
                isEmbedVideo: ({ ...prevPropsData.isEmbedVideo, [field.uniqueId]: false }),
            }))

            setEmbedVideoBtnClick(!EmbedVideoBtnClick)
            addElement(field, 1)
        } else {
            return false
        }
    }

    return (
        <>
            {

                propsData.embedfields.map((field: any) => (
                    <Dialog
                        className="formBuilder"
                        fullScreen={fullScreen}
                        key={field.uniqueId}
                        id={field.uniqueId}
                        open={propsData.isEmbedVideo[field.uniqueId] || false}
                        onClose={() => handleCloseEmbedVideoModal(field.uniqueId)}
                        sx={{
                            "& .MuiPaper-root.MuiDialog-paper":
                            {
                                width: "365px",
                                // maxHeight: "580px",
                                height: '175px',
                                // width: '500px',
                                borderRadius: "5px",
                                backgroundColor: "rgb(255, 255, 255)",
                            }
                        }}>
                        <Stack direction='row' spacing={2} sx={{ borderBottom: '1px solid #f0f0f0', p: '8px 8px 0px 18px' }}>
                            <Stack sx={{
                                borderBottom: "2px solid rgb(0, 0, 0)", height: '30px', display: 'flex', alignItems: 'center',
                                cursor: 'pointer'
                            }}

                            >
                                <Typography sx={{ fontSize: '14px', fontFamily: 'Segoe UI', fontWeight: 600, color: 'rgb(0, 0, 0)', }}>Embed link</Typography>
                            </Stack>
                        </Stack>



                        <Stack sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>

                            <Stack sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>

                                <TextField
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
                                    value={videoUrl}
                                    onChange={(e) => setVideoUrl(e.target.value)}
                                    placeholder="Paste video link"
                                />
                                <Box sx={{
                                    border: EmbedVideoBtnClick ? '1px solid rgba(58, 152, 255, 0.36)' : '1px solid transparent',
                                    borderWidth: '3px', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, borderRadius: '8px'
                                }}>
                                    <Button variant="contained"
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
                                        onClick={() => onClickEmdedVideoBtnClick(field)}
                                    >
                                        Embed video
                                    </Button>
                                </Box>

                                <Typography
                                    sx={{
                                        color: 'rgb(137, 136, 132)',
                                        fontSize: '11px', mt: '10px', fontFamily: 'Segoe UI',
                                    }}
                                >
                                    Works with YouTube, Vimeo, Loom, MP4s and more
                                </Typography>
                            </Stack>
                        </Stack>

                    </Dialog >
                ))
            }
        </>
    )
}

export default EmbedVideo