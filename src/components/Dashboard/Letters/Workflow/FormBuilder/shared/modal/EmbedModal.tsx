import { useContext } from "react";
import  {React, useEffect, useState } from "../../../../../../../shared/modules/React";
import {Dialog} from '../../../../../../../shared/modules/MaterialImports/Dialog';
import {Typography} from '../../../../../../../shared/modules/MaterialImports/Typography';
import {Stack} from '../../../../../../../shared/modules/MaterialImports/Stack';
import {TextField} from '../../../../../../../shared/modules/MaterialImports/TextField';
import {Box} from '../../../../../../../shared/modules/MaterialImports/Box';
import {Button} from '../../../../../../../shared/modules/MaterialImports/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { FormStore, EmbedModalState } from "../../../../../../../App";

interface EmbedProps {

}
// import { shallow } from 'zustand/shallow';
// import useFormBuilderStore, { FORMBUILDER_STATE } from "../../../../../../../shared/store/FormBuilderStore";


// const formBuilderSelector = (state: FORMBUILDER_STATE) => ({
//     formData: state.formData, 
//     setFormData: state.setFormData
// });

const EmbedModal: React.FC<EmbedProps> = () => {
    const theme = useTheme();
    const [sourceUrl, setSourceUrl] = useState("");
    const [scrollComp, setScrollComp] = useState("");
    const [isChanged, setIsChanged] = useState(false)
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [modalData, setEmbedModalOpen] = useContext(EmbedModalState)
    const [formData, setFormData] = useContext(FormStore);
    // const { formData, setFormData } = useFormBuilderStore(formBuilderSelector, shallow);
    const [EmbedAudioBtnClick, setEmbedAudioBtnClick] = useState(false)

    const isFromHeader = sessionStorage.getItem("isFromHeader")

    const handleCloseEmbedModal = () => {
        setEmbedModalOpen({ ...modalData, open: false })
    }

    const insert = (arr: any, index: any, newItem: any) => [
        ...arr.slice(0, index),
        newItem,
        ...arr.slice(index)
    ]

    const onClickEmdedAudioBtnClick = () => {
        let { field } = modalData

        formData.forEach((form: any) => {
            form.isActive = false;
        })

        const obj = { ...field };

        obj.id = formData.length;
        obj.labelName = '';
        obj.isActive = true;
        obj.description = '';
        obj.value = sourceUrl;
        let formFields: any[];
        if (isFromHeader === "true") {
            setIsChanged((prev) => !prev)
            setScrollComp(`1comp0`)
            formFields = [obj, ...formData]
        }
        else {
            const indexValue: any = sessionStorage.getItem("indexPos")
            formFields = insert(formData, Number(indexValue) + 1, obj)
        }
        formFields?.forEach((item: any, index: any) => {
            item.id = index + 1;
        })
        setFormData([...formFields]);
        setEmbedModalOpen({ ...modalData, open: false })
        setSourceUrl("")
    }

    useEffect(() => {

        if (document.getElementById(scrollComp)) {
            const element: any = document.getElementById(scrollComp);
            element.scrollIntoView({
                block: 'end',
                behavior: 'smooth',
            });
        }

    }, [scrollComp, isChanged]);

    const getInfo = (data: any) => {
        let infoText = ""
        if (data) {
            switch (data.fieldType) {
                case "embedaudio":
                    infoText = "Works with SoundCloud, Spotify, MP3s and more"
                    break;
                case "embedanything":
                    infoText = "Works with links of PDFs, Google Maps"
                    break;
                case "embedvideo":
                    infoText = "Works with YouTube, Vimeo, Loom, MP4s and more"
            }
        }
        return infoText
    }

    const getPlaceHolder = (data: any) => {
        let placeHolderText = ''
        if (data) {
            switch (data.fieldType) {
                case "embedaudio":
                    placeHolderText = "Paste any audio link"
                    break;
                case "embedanything":
                    placeHolderText = "Paste the link"
                    break;
                case "embedvideo":
                    placeHolderText = "Paste video link"
                    break

                case "embedimage":
                    placeHolderText = "Paste any image link from web"
            }
        }
        return placeHolderText
    }



    return (
        <>



            <Dialog
                fullScreen={fullScreen}
                key={""}
                id={""}
                open={modalData.open}
                BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' } }}
                onClose={() => handleCloseEmbedModal()}
                className="formBuilder embed-modal"
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
                            value={sourceUrl}
                            onChange={(e) => setSourceUrl(e.target.value)}
                            placeholder={getPlaceHolder(modalData.field)}
                        />
                        <Box sx={{
                            border: EmbedAudioBtnClick ? '1px solid rgba(58, 152, 255, 0.36)' : '1px solid transparent',
                            borderWidth: '3px', width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, borderRadius: '8px'
                        }}>
                            <Button variant="contained"
                                onClick={() => { sourceUrl && onClickEmdedAudioBtnClick() }}
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

                        <Typography
                            sx={{
                                color: 'rgb(137, 136, 132)',
                                fontSize: '11px', mt: '10px', fontFamily: 'Segoe UI',
                            }}
                        >

                            {getInfo(modalData.field)}

                        </Typography>
                    </Stack>
                </Stack>

            </Dialog >

        </>
    )
}

export default EmbedModal;