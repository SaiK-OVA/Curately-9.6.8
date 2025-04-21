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

interface EmbedAudioProps {
    createdFields: any,
    addElement: (type: any, index: number) => void,
}

const EmbedAudio: React.FC<EmbedAudioProps> = ({ addElement, createdFields }) => {

    const theme = useTheme();
    const [audioUrl, setAudioUrl] = useState("")
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [propsData, setPropsData] = useContext(Store)
    const handleCloseEmbedAudioModal = (fieldId: any) => {
        setPropsData((prevPropsData: any) => ({
            ...prevPropsData,
            isEmbedAudio: ({ ...prevPropsData.isEmbedAudio, [fieldId]: false }),
        }))
    }

    const [EmbedAudioBtnClick, setEmbedAudioBtnClick] = useState(false)
    const onClickEmdedAudioBtnClick = (field: any) => {
        if (field.fieldType === 'embedaudio') {
            field.value = audioUrl;
            setPropsData((prevPropsData: any) => ({
                ...prevPropsData,
                embededAudios: [...prevPropsData.embededAudios, audioUrl],
                isEmbedAudio: ({ ...prevPropsData.isEmbedAudio, [field.uniqueId]: false }),
            }))
            setEmbedAudioBtnClick(false)
            handleCloseEmbedAudioModal(field.uniqueId)
            addElement(field, 1)
            setAudioUrl('')
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
                        open={propsData.isEmbedAudio[field.uniqueId] || false}
                        onClose={() => handleCloseEmbedAudioModal(field.uniqueId)}
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
                                    value={audioUrl}
                                    onChange={(e) => setAudioUrl(e.target.value)}
                                    placeholder="Paste any audio link"
                                />
                                <Box sx={{
                                    border: EmbedAudioBtnClick ? '1px solid rgba(58, 152, 255, 0.36)' : '1px solid transparent',
                                    borderWidth: '3px', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, borderRadius: '8px'
                                }}>
                                    <Button variant="contained"
                                        onClick={() => onClickEmdedAudioBtnClick(field)}
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
                                        Embed audio
                                    </Button>
                                </Box>

                                <Typography
                                    sx={{
                                        color: 'rgb(137, 136, 132)',
                                        fontSize: '11px', mt: '10px', fontFamily: 'Segoe UI',
                                    }}
                                >
                                    Works with SoundCloud, Spotify, MP3s and more
                                </Typography>
                            </Stack>
                        </Stack>

                    </Dialog >
                ))
            }
        </>
    )
}

export default EmbedAudio