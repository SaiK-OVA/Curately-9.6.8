import { useContext } from "react";
import { React, useState } from "../../../../../../../shared/modules/React";
import {Dialog} from '../../../../../../../shared/modules/MaterialImports/Dialog';
import {Typography} from '../../../../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../../../../shared/modules/MaterialImports/Stack';
import {TextField} from '../../../../../../../shared/modules/MaterialImports/TextField';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import {Button} from '../../../../../../../shared/modules/MaterialImports/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Store } from "../../../../../../../App";

interface EmbedAnythingProps {
    createdFields: any,
    addElement: (type: any, index: number) => void,
}

const EmbedAnything: React.FC<EmbedAnythingProps> = ({ addElement, createdFields }) => {

    const theme = useTheme();
    const [fileUrl, setFileUrl] = useState("")
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [propsData, setPropsData] = useContext(Store)
    const handleCloseEmbedAnythingModal = (fieldId: any) => {
        setPropsData((prevPropsData: any) => ({
            ...prevPropsData,
            isEmbedAnything: ({ ...prevPropsData.isEmbedAnything, [fieldId]: false }),
        }))
    }



    const [EmdedAnythingBtnClick, setEmdedAnythingBtnClick] = useState(false)
    const onClickEmdedAnythingBtnClick = (field: any) => {
        if (field.fieldType === 'embedanything') {
            field.value = fileUrl;
            setPropsData((prevPropsData: any) => ({
                ...prevPropsData,
                embededFiles: [...prevPropsData.embededFiles, fileUrl],
                isEmbedAnything: ({ ...prevPropsData.isEmbedAnything, [field.uniqueId]: false }),
            }))
            handleCloseEmbedAnythingModal(field.uniqueId)
            setEmdedAnythingBtnClick(false)
            setFileUrl('')
            addElement(field, 1)
        } else {
            return false
        }
    }
    // console.log('isEmbedAnything', propsData.isEmbedAnything)
    return (
        <>
            {

                propsData.embedfields.map((field: any) => (
                    <Dialog
                        className="formBuilder"
                        fullScreen={fullScreen}
                        key={field.uniqueId}
                        id={field.uniqueId}
                        open={propsData.isEmbedAnything[field.uniqueId] || false}
                        onClose={() => handleCloseEmbedAnythingModal(field.uniqueId)}
                        sx={{
                            "& .MuiPaper-root.MuiDialog-paper":
                            {
                                width: "365px",
                                // maxHeight: "580px",
                                height: '190px',
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
                                    value={fileUrl}
                                    onChange={(e) => setFileUrl(e.target.value)}
                                    placeholder="Paste the link"
                                />
                                <Box sx={{
                                    border: EmdedAnythingBtnClick ? '1px solid rgba(58, 152, 255, 0.36)' : '1px solid transparent',
                                    borderWidth: '3px', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, borderRadius: '8px'
                                }}>
                                    <Button variant="contained"
                                        disableRipple
                                        sx={{
                                            width: '100%', height: '30px', backgroundColor: 'rgb(0, 0, 0)',
                                            textTransform: 'capitalize', boxShadow: 0, '&:hover': {
                                                backgroundColor: 'rgb(0, 0, 0)',
                                                boxShadow: 0,
                                            },
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            fontFamily: 'Segoe UI',
                                        }}
                                        onClick={() => onClickEmdedAnythingBtnClick(field)}
                                    >
                                        Embed link
                                    </Button>
                                </Box>

                                <Typography
                                    sx={{
                                        color: 'rgb(137, 136, 132)',
                                        fontSize: '11px', mt: '10px', fontFamily: 'Segoe UI',
                                    }}
                                >
                                    Works with links of PDFs, Calendly, Google Maps, Tweets,<br />
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'rgb(137, 136, 132)',
                                        fontSize: '11px', fontFamily: 'Segoe UI',
                                    }}
                                >
                                    public Figma files and more
                                </Typography>
                            </Stack>
                        </Stack>

                    </Dialog >

                ))
            }
        </>
    )
}

export default EmbedAnything