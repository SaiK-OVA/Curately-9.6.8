import  {React,  useCallback, useEffect, useRef, useState } from '../../../../shared/modules/React';
// import { Box, Button, ButtonGroup, Card, CardContent, Popover, Skeleton, Checkbox, Chip, Dialog, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Paper, Radio, RadioGroup, Select, Stack, TextField, Typography, DialogActions } from '@mui/material';
import {Skeleton} from '@mui/material';
// import {Dialog, DialogContent, DialogTitle} from '../../../../shared/modules/MaterialImports/Dialog';
import {Grid, Button, IconButton, TextField} from '../../../../shared/modules/commonImports';
import {Card, CardContent} from '../../../../shared/modules/MaterialImports/Card';
import {Divider} from '../../../../shared/modules/MaterialImports/Divider';
// import {Chip} from '../../../../shared/modules/MaterialImports/Chip';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
// import {Checkbox} from '../../../../shared/modules/MaterialImports/FormElements';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
import {ButtonGroup} from '../../../../shared/modules/MaterialImports/ButtonGroup';
import {Popover} from '../../../../shared/modules/MaterialImports/Popover';
// import UploadFileIcon from '@mui/icons-material/UploadFile';


import { HexColorPicker, HexColorInput } from 'react-colorful';
import PixIcon from '@mui/icons-material/Pix';
import ApiService from '../../../../shared/api/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { userLocalData } from '../../../../shared/services/userData';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { usePromiseTracker } from 'react-promise-tracker';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
//import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useDropzone } from 'react-dropzone';
//import ErrorMessage from '../../shared/Error/ErrorMessage';
import { useFormik, Yup } from "../../../../shared/modules/Formik";
import './Branding.scss';
import { Loader } from '../../../shared/Loader/Loader';
import { debounce } from "lodash";
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import ReactQuill from 'react-quill';
// import ApiRequests from "../../../../shared/api/api";
// import Editor from '../../../shared/EmailDialogBox/EmailBody';

const Branding = () => {

    // const [editorHeaderContent, setEditorHeaderContent] = useState('')
    // const [editorFooterContent, setEditorFooterContent] = useState('')
    // const handleEditorHeaderChange = (content: any) => {
    //     setEditorHeaderContent(content)
    // }
    // const handleEditorFooterChange = (content: any) => {
    //     setEditorFooterContent(content)
    // }
    // const handleSave = () => {

    // }
    // const [open, setOpen] = useState(false);

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    // const userId = userLocalData.getvalue('recrId');  //'61';
    const clientId = userLocalData.getvalue('clientId'); //"21"; //"21"; //"18"; //"51"; //
    const imgUrl = `${import.meta.env.VITE_URL_AWS}curately/`;

    const [colorDefaultObj, setColorDefaultObj] = useState({
        primary: '#146ef6',
        secondary: '#474747',
        miscellaneous: '#e5e1e1'
    });
    const [colorObj, setcolorObj] = useState({
        primary: '#146ef6',
        secondary: '#474747',
        miscellaneous: '#e5e1e1'
    });
    const [brandingData, setBrandingData] = useState({
        "brandId": "",
        "logo": "",
        "favicon": "",
        "banner": "",
        "secondaryLogo": "",
        "chatLogo": "",
        "socialPostImage": "",
        "logoPath": "",
        "faviconPath": "",
        "bannerPath": "",
        "secondaryLogoPath": "",
        "chatLogoPath": "",
        "socialPostImagePath": "",
        "miscellaneousColor": colorObj.miscellaneous,
        "buttonColor": colorObj.secondary,
        "brandColor": colorObj.primary,
        "logoName": "",
        "bannerName": "",
        "chatName": "",
        "socialPostName": "",
        "logoUrl": "",
        "secondaryLogoUrl": "",
        "iconTitle": "",
        "content": "",
        "shortName": "",
        "clientName": "",

    });

    const [logoStatus, setLogoStatus] = useState(true);
    const [faviconStatus, setFaviconStatus] = useState(true);
    const [socialPathStatus, setSocialPathStatus] = useState(true);

    const [chatLogoStatus, setChatLogoStatus] = useState(true);
    const [bannerStatus, setBannerStatus] = useState(true);
    const [secondaryLogoStatus, setSecondaryLogoStatus] = useState(true);
    const secondaryLogoInputRef = useRef<HTMLInputElement>(null);
    const chatLogoInputRef = useRef<HTMLInputElement>(null);
    const bannerInputRef = useRef<HTMLInputElement>(null);
    const logoInputRef = useRef<HTMLInputElement>(null);
    const faviconInputRef = useRef<HTMLInputElement>(null);
    const socialPathInputRef = useRef<HTMLInputElement>(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [anchorElPrimary, setAnchorElPrimary] = React.useState<HTMLButtonElement | null>(null);
    const [anchorElSecondary, setAnchorElSecondary] = React.useState<HTMLButtonElement | null>(null);


    const [anchorElMiscellaneous, setAnchorElMiscellaneous] = React.useState<HTMLButtonElement | null>(null);
    const openMiscellaneous = Boolean(anchorElMiscellaneous);
    const miscellaneousColorId = openMiscellaneous ? 'miscellaneous-popover' : undefined;

    const handleMiscellaneousClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElMiscellaneous(event.currentTarget);
    };

    const handleMiscellaneousClose = () => {
        setAnchorElMiscellaneous(null);
    };

    const openPrimary = Boolean(anchorElPrimary);
    const primaryColorId = openPrimary ? 'primary-popover' : undefined;
    const handlePrimaryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElPrimary(event.currentTarget);
    };

    const handlePrimaryClose = () => {
        setAnchorElPrimary(null);
    };
    const openSecondary = Boolean(anchorElSecondary);
    const secondaryColorId = openSecondary ? 'secondary-popover' : undefined;


    const handleSecondaryClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElSecondary(event.currentTarget);
    };

    const handleSecondaryClose = () => {
        setAnchorElSecondary(null);
    };


    const handleSecondaryLogoBrowseButtonClick = () => {

        if (secondaryLogoInputRef.current) {
            secondaryLogoInputRef.current.click();
        }
    };
    const handleClientBrandName = (e: any, fieldtype: any) => {
        AddBrandingFormik.setFieldValue(fieldtype, e.target.value);
    };

    const handleSecondaryLogoDeleteButtonClick = () => {
        if (AddBrandingFormik.values.secondaryLogo) {
            setBrandingData({
                ...brandingData,
                secondaryLogo: "",
                //   logoName: ""
            })
            AddBrandingFormik.setFieldValue('secondaryLogo', "");
        } else {
            setBrandingData({
                ...brandingData,
                secondaryLogoPath: "",
            })
        }
        setSecondaryLogoStatus(false);
    }


    const handleFavIconBrowseButtonClick = () => {

        if (faviconInputRef.current) {
            faviconInputRef.current.click();
        }
    };

    const handleFavIconDeleteButtonClick = () => {
        if (AddBrandingFormik.values.favicon) {
            setBrandingData({
                ...brandingData,
                favicon: "",
                //   logoName: ""
            })
            AddBrandingFormik.setFieldValue('favicon', "");
        } else {
            setBrandingData({
                ...brandingData,
                faviconPath: "",
            })
        }
        setFaviconStatus(false);
    }

    const handleBannerBrowseButtonClick = () => {

        if (bannerInputRef.current) {
            bannerInputRef.current.click();
        }
    };

    const handleBannerDeleteButtonClick = () => {
        if (AddBrandingFormik.values.banner) {
            setBrandingData({
                ...brandingData,
                banner: "",
                //   logoName: ""
            })
            AddBrandingFormik.setFieldValue('banner', "");
        } else {
            setBrandingData({
                ...brandingData,
                bannerPath: "",
            })
        }
        setBannerStatus(false);
    }
    const handleLogoBrowseButtonClick = () => {

        if (logoInputRef.current) {
            logoInputRef.current.click();
        }
    };

    const handleLogoDeleteButtonClick = () => {
        if (AddBrandingFormik.values.logo) {
            setBrandingData({
                ...brandingData,
                logo: "",
                //   logoName: ""
            })
            AddBrandingFormik.setFieldValue('logo', "");
        } else {
            setBrandingData({
                ...brandingData,
                logoPath: "",
            })
        }
        setLogoStatus(false);
    }

    const handleChatLogoBrowseButtonClick = () => {

        if (chatLogoInputRef.current) {
            chatLogoInputRef.current.click();
        }
    };

    const handleChatLogoDeleteButtonClick = () => {
        if (AddBrandingFormik.values.chatLogo) {
            setBrandingData({
                ...brandingData,
                chatLogo: "",
                //   logoName: ""
            })
            AddBrandingFormik.setFieldValue('chatLogo', "");
        } else {
            setBrandingData({
                ...brandingData,
                chatLogoPath: "",
            })
        }
        setChatLogoStatus(false);
    }

    const handleSocialPathBrowseButtonClick = () => {

        if (socialPathInputRef.current) {
            socialPathInputRef.current.click();
        }
    };

    const handleSocialPathDeleteButtonClick = () => {
        if (AddBrandingFormik.values.socialPostImage) {
            setBrandingData({
                ...brandingData,
                socialPostImage: "",
                //   logoName: ""
            })
            AddBrandingFormik.setFieldValue('socialPostImage', "");
        } else {
            setBrandingData({
                ...brandingData,
                socialPostImagePath: "",
            })
        }
        setSecondaryLogoStatus(false);
    }


    useEffect(() => {
        setcolorObj({
            primary: brandingData.brandColor,
            secondary: brandingData.buttonColor,
            miscellaneous: brandingData.miscellaneousColor,
        })
    }, [brandingData.brandColor, brandingData.buttonColor, brandingData.miscellaneousColor])


    useEffect(() => {
        AddBrandingFormik.setFieldValue("brandColor", colorObj.primary);
        AddBrandingFormik.setFieldValue("buttonColor", colorObj.secondary);
        AddBrandingFormik.setFieldValue("miscellaneousColor", colorObj.miscellaneous);
    }, [brandingData,brandingData.brandColor, brandingData.buttonColor, brandingData.miscellaneousColor ]);

    const initialAddBrandingDetails = {
        "brandId": "0",
        "clientId": clientId,
        "logo": "",
        "favicon": "",
        "banner": "",
        "secondaryLogo": "",
        "miscellaneousColor": "",
        "buttonColor": "",
        "brandColor": "",
        "logoName": "",
        "bannerName": "",
        "chatName": "",
        "chatLogo": "",
        "socialPostImage": "",
        "socialPostName": "",
        "logoUrl": "",
        "secondaryLogoUrl": "",
        "iconTitle": "",
        "content": "",
        "shortName": "",
        "clientName": "",
        "logoPath": "",
        "faviconPath": "",
        "bannerPath": "",
        "secondaryLogoPath": "",
        "chatLogoPath": "",
        "socialPostImagePath": "",
    }
    const addBrandingSchema = Yup.object().shape({

        clientId: Yup.string().required('Required'),
        brandId: Yup.string(),
        logo: Yup.string(),
        favicon: Yup.string(),
        banner: Yup.string(),
        secondaryLogo: Yup.string(),
        miscellaneousColor: Yup.string(),
        buttonColor: Yup.string(),
        brandColor: Yup.string(),
        logoName: Yup.string(),
        bannerName: Yup.string(),
        chatName: Yup.string(),
        chatLogo: Yup.string(),
        socialPostImage: Yup.string(),
        socialPostName: Yup.string(),
        logoUrl: Yup.string(),
        secondaryLogoUrl: Yup.string(),
        iconTitle: Yup.string(),
        content: Yup.string(),
        shortName: Yup.string(),
        clientName: Yup.string(),
        logoPath: Yup.string(),
        faviconPath: Yup.string(),
        bannerPath: Yup.string(),
        secondaryLogoPath: Yup.string(),
        chatLogoPath: Yup.string(),
        socialPostImagePath: Yup.string(),
    })

    const AddBrandingFormik = useFormik({
        initialValues: initialAddBrandingDetails,
        validationSchema: addBrandingSchema,
        onSubmit: () => {
            setIsFormSubmitted(true);
        },
        // onSubmit: handleSubmit
    });

    const onDropLogo = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            let logicon = "";
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                logicon = (reader.result) ? reader.result.toString() : "";
                const img = new Image();
                img.src = e.target?.result as string;

                img.onload = () => {
                    setLogoStatus(true);
                    setBrandingData({
                        ...brandingData,
                        logo: logicon
                    });
                    AddBrandingFormik.setFieldValue('logo', file);

                };
            }

            AddBrandingFormik.setFieldValue('logoName', file.name);
        }
    }, [AddBrandingFormik]);

    const {
        getRootProps: getLogoRootProps,
        getInputProps: getLogoInputProps,
        isDragActive: isLogoDragActive,
        acceptedFiles: acceptedLogoFiles
    } = useDropzone({
        onDrop: onDropLogo, multiple: false,

        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/svg+xml': ['.svg'],
            'text/csv': ['.csv']
        }
    });

    const logoFiles = acceptedLogoFiles.map(file => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>

    ));


    const onDropSecondaryLogo = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            let secondaryLogoicon = "";
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                //me.modelvalue = reader.result;

                secondaryLogoicon = (reader.result) ? reader.result.toString() : "";
                const img = new Image();
                img.src = e.target?.result as string;

                img.onload = () => {
                    setSecondaryLogoStatus(true);
                    setBrandingData({
                        ...brandingData,
                        secondaryLogo: secondaryLogoicon
                    });
                    AddBrandingFormik.setFieldValue('secondaryLogo', file);
                    // if(img.width === 200 && img.height === 200 ){
                    // }else{
                    //     showToaster
                    //     ('Plese upload the logo file dimentions width X height (200px * 200px) only', 'warning');
                    //     // showToaster (img.width+"--"+img.height, 'warning');
                    // }

                };

            }

        }
    }, [AddBrandingFormik]);

    const {
        getRootProps: getSecondaryLogoRootProps,
        getInputProps: getSecondaryLogoInputProps,
        isDragActive: isSecondaryLogoDragActive,
        acceptedFiles: acceptedSecondaryLogoFiles
    } = useDropzone({
        onDrop: onDropSecondaryLogo, multiple: false,

        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/svg+xml': ['.svg'],
            'text/csv': ['.csv']
        }
    });

    const secondaryLogoFiles = acceptedSecondaryLogoFiles.map(file => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>

    ));


    const onDropChatLogo = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            let chatlogicon = "";
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                //me.modelvalue = reader.result;

                chatlogicon = (reader.result) ? reader.result.toString() : "";
                const img = new Image();
                img.src = e.target?.result as string;

                img.onload = () => {
                    setChatLogoStatus(true);
                    setBrandingData({
                        ...brandingData,
                        chatLogo: chatlogicon
                    });
                    AddBrandingFormik.setFieldValue('chatLogo', file);
                    // if(img.width === 200 && img.height === 200 ){
                    // }else{
                    //     showToaster
                    //     ('Plese upload the logo file dimentions width X height (200px * 200px) only', 'warning');
                    //     // showToaster (img.width+"--"+img.height, 'warning');
                    // }

                };

            }

            //   AddBrandingFormik.setFieldValue('chatName', file.name);
        }
    }, [AddBrandingFormik]);

    const {
        getRootProps: getChatLogoRootProps,
        getInputProps: getChatLogoInputProps,
        isDragActive: isChatLogoDragActive,
        acceptedFiles: acceptedChatLogoFiles
    } = useDropzone({
        onDrop: onDropChatLogo, multiple: false,

        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/svg+xml': ['.svg'],
            'text/csv': ['.csv']
        }
    });

    const chatLogoFiles = acceptedChatLogoFiles.map(file => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>

    ));


    const onDropBanner = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            let bannericon = "";
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                bannericon = (reader.result) ? reader.result.toString() : "";
                const img = new Image();
                img.src = e.target?.result as string;

                img.onload = () => {
                    setLogoStatus(true);
                    setBrandingData({
                        ...brandingData,
                        banner: bannericon
                    });
                    AddBrandingFormik.setFieldValue('banner', file);

                };
            }

            AddBrandingFormik.setFieldValue('bannerName', file.name);
        }
    }, [AddBrandingFormik]);

    const {
        getRootProps: getBannerRootProps,
        getInputProps: getBannerInputProps,
        isDragActive: isBannerDragActive,
        acceptedFiles: acceptedBannerFiles
    } = useDropzone({
        onDrop: onDropBanner, multiple: false,

        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/svg+xml': ['.svg'],
            'text/csv': ['.csv']
        }
    });

    const bannerFiles = acceptedBannerFiles.map(file => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>

    ));

    const onDropFavicon = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            let favicon = "";
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                favicon = (reader.result) ? reader.result.toString() : "";
                const img = new Image();
                img.src = e.target?.result as string;

                img.onload = () => {
                    setFaviconStatus(true);
                    setBrandingData({
                        ...brandingData,
                        favicon: favicon
                    });
                    AddBrandingFormik.setFieldValue('favicon', file);

                };
            }
        }
    }, [AddBrandingFormik]);


    const {
        getRootProps: getFaviconRootProps,
        getInputProps: getFaviconInputProps,
        isDragActive: isFaviconDragActive,
        acceptedFiles: acceptedFaviconFiles
    } = useDropzone({
        onDrop: onDropFavicon, multiple: false,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/svg+xml': ['.svg'],
            'text/csv': ['.csv']
        }
    });

    const faviconFiles = acceptedFaviconFiles.map(file => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
    ));


    const onDropSocialPath = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            let socialPath = "";
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                socialPath = (reader.result) ? reader.result.toString() : "";
                const img = new Image();
                img.src = e.target?.result as string;

                img.onload = () => {
                    setSocialPathStatus(true);
                    setBrandingData({
                        ...brandingData,
                        socialPostImage: socialPath
                    });
                    AddBrandingFormik.setFieldValue('socialPostImage', file);

                };
            }
            AddBrandingFormik.setFieldValue('socialPostName', file.name);
        }
    }, [AddBrandingFormik]);


    const {
        getRootProps: getSocialPathRootProps,
        getInputProps: getSocialPathInputProps,
        isDragActive: isSocialPathDragActive,
        acceptedFiles: acceptedSocialPathFiles
    } = useDropzone({
        onDrop: onDropSocialPath, multiple: false,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/svg+xml': ['.svg'],
            'text/csv': ['.csv']
        }
    });

    const socialPathFiles = acceptedSocialPathFiles.map(file => (
        <span key={file.path}>
            {file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB
        </span>
    ));

    const saveForm = () => {

        setIsFormSubmitted(true);
        // if (!AddBrandingFormik.values.logo) {
        //     showToaster('Please enter Brand Logo ', 'error');
        //     return false
        // }
        // else if (!AddBrandingFormik.values.favicon) {
        //     showToaster('Please enter Brand Favicon ', 'error');
        //     return false
        // }

        console.log(AddBrandingFormik.values);
        console.log(brandingData);
        let tempFormData = new FormData();
        tempFormData.append('brandId', (brandingData.brandId) ? brandingData.brandId : "0");
        (AddBrandingFormik.values.logo) ? tempFormData.append('logo', AddBrandingFormik.values.logo) : null;
        (!AddBrandingFormik.values.logo && !brandingData.logoPath) ? tempFormData.append('logoDelete', "true") : tempFormData.append('logoDelete', "false");
        (AddBrandingFormik.values.favicon) ? tempFormData.append('favicon', AddBrandingFormik.values.favicon) : null;
        (!AddBrandingFormik.values.favicon && !brandingData.faviconPath) ? tempFormData.append('faviconDelete', "true") : tempFormData.append('faviconDelete', "false");
        (AddBrandingFormik.values.banner) ? tempFormData.append('banner', AddBrandingFormik.values.banner) : null;
        (!AddBrandingFormik.values.banner && !brandingData.bannerPath) ? tempFormData.append('bannerDelete', "true") : tempFormData.append('bannerDelete', "false");
        (AddBrandingFormik.values.secondaryLogo) ? tempFormData.append('secondaryLogo', AddBrandingFormik.values.secondaryLogo) : null;
        (!AddBrandingFormik.values.secondaryLogo && !brandingData.secondaryLogoPath) ? tempFormData.append('secondaryLogoDelete', "true") : tempFormData.append('secondaryLogoDelete', "false");
        (AddBrandingFormik.values.chatLogo) ? tempFormData.append('chatLogo', AddBrandingFormik.values.chatLogo) : null;
        (!AddBrandingFormik.values.chatLogo && !brandingData.chatLogoPath) ? tempFormData.append('chatLogoDelete', "true") : tempFormData.append('chatLogoDelete', "false");
        (AddBrandingFormik.values.socialPostImage) ? tempFormData.append('socialPostImage', AddBrandingFormik.values.socialPostImage) : null;
        (!AddBrandingFormik.values.socialPostImage && !brandingData.socialPostImagePath) ? tempFormData.append('socialPostImageDelete', "true") : tempFormData.append('socialPostImageDelete', "false");

        tempFormData.append('miscellaneousColor', (brandingData.miscellaneousColor) ? brandingData.miscellaneousColor : AddBrandingFormik.values.miscellaneousColor);
        tempFormData.append('buttonColor', (brandingData.buttonColor) ? brandingData.buttonColor : AddBrandingFormik.values.buttonColor);
        tempFormData.append('brandColor', (brandingData.brandColor) ? brandingData.brandColor : AddBrandingFormik.values.brandColor);

        tempFormData.append('logoUrl', (AddBrandingFormik.values.logoUrl) ? AddBrandingFormik.values.logoUrl : brandingData.logoUrl);
        tempFormData.append('secondaryLogoUrl', (AddBrandingFormik.values.secondaryLogoUrl) ? AddBrandingFormik.values.secondaryLogoUrl : brandingData.secondaryLogoUrl);

        tempFormData.append('logoName', (AddBrandingFormik.values.logoName) ? AddBrandingFormik.values.logoName : brandingData.logoName);
        tempFormData.append('bannerName', (AddBrandingFormik.values.bannerName) ? AddBrandingFormik.values.bannerName : brandingData.bannerName);
        tempFormData.append('chatName', (AddBrandingFormik.values.chatName) ? AddBrandingFormik.values.chatName : brandingData.chatName);
        tempFormData.append('socialPostName', (AddBrandingFormik.values.socialPostName) ? AddBrandingFormik.values.socialPostName : brandingData.socialPostName);
        tempFormData.append('iconTitle', (AddBrandingFormik.values.iconTitle) ? AddBrandingFormik.values.iconTitle : brandingData.iconTitle);

        tempFormData.append('shortName', (AddBrandingFormik.values.shortName) ? AddBrandingFormik.values.shortName : brandingData.shortName);
        tempFormData.append('clientName', (AddBrandingFormik.values.clientName) ? AddBrandingFormik.values.clientName : brandingData.clientName);
        tempFormData.append('content', (AddBrandingFormik.values.content) ? AddBrandingFormik.values.content : brandingData.content);
        tempFormData.append('clientId', clientId);

        //   if (AddBrandingFormik.isValid) {
        trackPromise(

            ApiService.postWithData('admin', 'saveOrUpdateBranding', tempFormData).then(
                (response) => {
                    // console.log(response.data);
                    if (response.data.Status === 200) {
                        showToaster('Branding has been saved successfully.', 'success');

                        //  AddBrandingFormik.resetForm();
                    } else {
                        showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
                    }
            })
            //      http://35.155.202.216:8080/QADemoCurately/savebranding
            //ApiService.postWithData(216, 'QADemoCurately/savebranding', { ...AddBrandingFormik.values }).then(
            // ApiService.postWithData(214, 'savebranding', { ...AddBrandingFormik.values }).then(
            //     (response) => {
            //         // console.log(response.data);
            //         if (response.data.Status === 200) {
            //             showToaster('Branding has been saved successfully.', 'success');
        
            //             //  AddBrandingFormik.resetForm();
            //         } else {
            //             showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error')
            //         }
            //     })
        )
        // } else {
        //     showToaster('Please fill all fields.', 'error');
        // }
        // 
    }




    const getBrandingData = useCallback(
        debounce((clientId) => {
            trackPromise(
                ApiService.getCall('admin', `getBranding/${clientId}`).then((response) => {
                    const tempRespData = response.data;
                    AddBrandingFormik.setValues(tempRespData, true);

                    setColorDefaultObj({
                        primary: tempRespData.brandColor || colorObj.primary,
                        secondary: tempRespData.buttonColor || colorObj.secondary,
                        miscellaneous: tempRespData.miscellaneousColor || colorObj.miscellaneous
                    });

                    setBrandingData({
                        brandId: tempRespData.brandId || "",
                        logo: "",
                        favicon: "",
                        banner: "",
                        secondaryLogo: "",
                        miscellaneousColor: tempRespData.miscellaneousColor || colorObj.miscellaneous,
                        buttonColor: tempRespData.buttonColor || colorObj.secondary,
                        brandColor: tempRespData.brandColor || colorObj.primary,
                        logoName: tempRespData.logoName || "",
                        bannerName: tempRespData.bannerName || "",
                        chatName: tempRespData.chatName || "",
                        chatLogo: "",
                        socialPostImage: "",
                        socialPostName: tempRespData.socialPostName || "",
                        logoUrl: tempRespData.logoUrl || "",
                        secondaryLogoUrl: tempRespData.secondaryLogoUrl || "",
                        iconTitle: tempRespData.iconTitle || "",
                        content: tempRespData.content || "",
                        shortName: tempRespData.shortName || "",
                        clientName: tempRespData.clientName || "",
                        logoPath: tempRespData.logoPath || "",
                        faviconPath: tempRespData.faviconPath || "",
                        bannerPath: tempRespData.bannerPath || "",
                        secondaryLogoPath: tempRespData.secondaryLogoPath || "",
                        chatLogoPath: tempRespData.chatLogoPath || "",
                        socialPostImagePath: tempRespData.socialPostImagePath || "",
                    });
                })
            );
        }, 300),
        []
    );

    useEffect(() => {
        if (clientId) {
            getBrandingData(clientId);
        }
    }, [clientId, getBrandingData])

    const { promiseInProgress } = usePromiseTracker();
    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    useEffect(() => {
        saveAuditLog(4231)
    }, []);

    return (
        <div className="BrandingPanelDiv pt-3 px-5">
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
                    Manage Branding
                </Typography>
                <Stack direction="row" className="btn-container">
                    <Button variant="contained" color="primary" size="small" onClick={() => { saveForm(); saveAuditLog(4232) }} >Update</Button>
                </Stack>
            </Grid>
            {
                promiseInProgress ? <Loader /> : null
            }
            <form key={clientId} onSubmit={AddBrandingFormik.handleSubmit} >
                <Grid container direction="row"
                    className="customCard px-2 py-0 mr-0"
                    justifyContent="space-between"
                    sx={{ height: 'calc(100vh - 170px)', overflow: 'auto' }}
                >
                    <Grid container size={6}>
                        <Box className="customCard1" sx={{ width: "100%", ml: 2, mr: 0 }}>
                            <div style={{ width: '100%' }} className='dropzone fileDropped' >
                                <ul>
                                    <li>All Logo and images should be in JPG/PNG/SVG format</li>
                                    <li>Max Upload limit is 1MB(500kb for favicon)</li>
                                </ul>
                            </div>
                        </Box>

                        <Grid container direction="row" sx={{ width: "100%", ml: 2, mr: 0 }}>

                            <Grid size={6}>
                                <div style={{ width: '100%' }} >
                                    <Typography className="brand_lable_heading">Primary Logo <i>(up to 200px x 200px)</i><span style={{ color: "red" }}>*</span></Typography>
                                </div>
                                <Grid container direction="row">
                                    <Grid size={9} className='maincontainer'>
                                        <div className='customDropZone container'>
                                            <div {...getLogoRootProps({
                                                className: `dropzone ${acceptedLogoFiles.length > 0 ? 'fileDropped' : ''}`
                                            })}>
                                                <input {...getLogoInputProps()} multiple={false}
                                                    accept="image/jpeg, image/png, image/svg+xml"
                                                    id="logoInput"
                                                    ref={logoInputRef}
                                                //  onChange={handleLogoChange}
                                                />
                                                {
                                                    isLogoDragActive ?
                                                        <p>Drop the logo here ...</p> :
                                                        (logoStatus && logoFiles && logoFiles.length) ?
                                                            <img src={brandingData?.logo} alt="Logo Preview" style={{ width: '100px', height: '100px' }} /> :
                                                            <Box className="customCard1" sx={{ width: "100%", ml: 2, mr: 0 }}>

                                                                {
                                                                    brandingData?.logo ?
                                                                        <img src={brandingData?.logo} alt="Logo Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                        brandingData?.logoPath ?
                                                                            <img src={imgUrl + brandingData?.logoPath} alt="Logo Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                            <p><br></br>Drag and Drop file, or  <span className='primary'>Browse</span>
                                                                            </p>
                                                                }
                                                            </Box>
                                                }

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid size={3} >
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="vertical soft  button group"
                                            variant="outlined"
                                            className='buttoncard'
                                        >
                                            <IconButton onClick={handleLogoBrowseButtonClick} ><CloudUploadIcon /> </IconButton>
                                            <Divider sx={{ width: "60%", ml: 1, mr: 1 }}></Divider>
                                            <IconButton
                                                onClick={handleLogoDeleteButtonClick}

                                                disabled={AddBrandingFormik.values.logo ? false : brandingData.logoPath ? false : true}

                                            ><DeleteForeverOutlinedIcon style={{ color: AddBrandingFormik.values.logo ? "red" : brandingData.logoPath ? "red" : "" }} /></IconButton>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid size={6}>
                                <div style={{ width: '100%' }} >
                                    <Typography className="brand_lable_heading">Secondary Logo <i>(up to 200px x 200px)</i><span style={{ color: "red" }}></span></Typography>
                                </div>
                                <Grid container direction="row">
                                    <Grid size={9} className='maincontainer'>
                                        <div className='customDropZone container'>
                                            <div {...getSecondaryLogoRootProps({
                                                className: `dropzone ${acceptedSecondaryLogoFiles.length > 0 ? 'fileDropped' : ''}`
                                            })}>
                                                <input {...getSecondaryLogoInputProps()} multiple={false}
                                                    accept="image/jpeg, image/png, image/svg+xml"
                                                    id="secondaryLogoInput"
                                                    ref={secondaryLogoInputRef}
                                                //  onChange={handleLogoChange}
                                                />
                                                {
                                                    isSecondaryLogoDragActive ?
                                                        <p>Drop the Secondary logo  here ...</p> :
                                                        (secondaryLogoStatus && secondaryLogoFiles && secondaryLogoFiles.length) ?
                                                            <img src={brandingData?.secondaryLogo} alt="Secondary Logo Preview" style={{ width: '100px', height: '100px' }} /> :
                                                            <Box className="customCard1" sx={{ width: "100%", ml: 2, mr: 0 }}>

                                                                {brandingData?.secondaryLogo ?
                                                                    <img src={brandingData?.secondaryLogo} alt="Secondary Logo Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                    brandingData?.secondaryLogoPath ?
                                                                        <img src={imgUrl + brandingData?.secondaryLogoPath} alt="Secondary Logo Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                        <p><br></br>Drag and Drop file, or  <span className='primary'>Browse</span>
                                                                        </p>
                                                                }
                                                            </Box>
                                                }

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid size={3} >
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="vertical soft  button group"
                                            variant="outlined"
                                            className='buttoncard'
                                        >
                                            <IconButton onClick={handleSecondaryLogoBrowseButtonClick} ><CloudUploadIcon /> </IconButton>
                                            <Divider sx={{ width: "60%", ml: 1, mr: 1 }}></Divider>
                                            <IconButton
                                                onClick={handleSecondaryLogoDeleteButtonClick}
                                                disabled={AddBrandingFormik.values.secondaryLogo ? false : brandingData?.secondaryLogoPath ? false : true}

                                            ><DeleteForeverOutlinedIcon style={{ color: AddBrandingFormik.values.secondaryLogo ? "red" : brandingData.secondaryLogoPath ? "red" : "" }} /></IconButton>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid size={6}>
                                <div style={{ width: '100%' }} >
                                    <Typography className="brand_lable_heading">Chat Logo <i>(up to 200px x 200px)</i><span style={{ color: "red" }}></span></Typography>
                                </div>
                                <Grid container direction="row">
                                    <Grid size={9} className='maincontainer'>
                                        <div className='customDropZone container'>
                                            <div {...getChatLogoRootProps({
                                                className: `dropzone ${acceptedChatLogoFiles.length > 0 ? 'fileDropped' : ''}`
                                            })}>
                                                <input {...getChatLogoInputProps()} multiple={false}
                                                    accept="image/jpeg, image/png, image/svg+xml"
                                                    id="chatLogoInput"
                                                    ref={chatLogoInputRef}
                                                //  onChange={handleLogoChange}
                                                />
                                                {
                                                    isChatLogoDragActive ?
                                                        <p>Drop the Chat logo  here ...</p> :
                                                        (chatLogoStatus && chatLogoFiles && chatLogoFiles.length) ?
                                                            <img src={brandingData?.chatLogo} alt="Chat Logo Preview" style={{ width: '100px', height: '100px' }} /> :
                                                            <Box className="customCard1" sx={{ width: "100%", ml: 2, mr: 0 }}>

                                                                {brandingData?.chatLogo ?
                                                                    <img src={brandingData?.chatLogo} alt="Chat Logo Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                    brandingData?.chatLogoPath ?
                                                                        <img src={imgUrl + brandingData?.chatLogoPath} alt="Chat Logo Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                        <p><br></br>Drag and Drop file, or  <span className='primary'>Browse</span>
                                                                        </p>
                                                                }
                                                            </Box>
                                                }

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid size={3} >
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="vertical soft  button group"
                                            variant="outlined"
                                            className='buttoncard'
                                        >
                                            <IconButton onClick={handleChatLogoBrowseButtonClick}><CloudUploadIcon /> </IconButton>
                                            <Divider sx={{ width: "60%", ml: 1, mr: 1 }}></Divider>
                                            <IconButton
                                                onClick={handleChatLogoDeleteButtonClick}
                                                disabled={AddBrandingFormik.values.chatLogo ? false : brandingData?.chatLogoPath ? false : true}

                                            ><DeleteForeverOutlinedIcon style={{ color: AddBrandingFormik.values.chatLogo ? "red" : brandingData?.chatLogoPath ? "red" : "" }} /></IconButton>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid size={6}>
                                <div style={{ width: '100%' }} >
                                    <Typography className="brand_lable_heading">Banner <i>(up to 1200px x 200px)</i><span style={{ color: "red" }}></span></Typography>
                                </div>
                                <Grid container direction="row">
                                    <Grid size={9} className='maincontainer'>
                                        <div className='customDropZone container'>
                                            <div {...getBannerRootProps({
                                                className: `dropzone ${acceptedBannerFiles.length > 0 ? 'fileDropped' : ''}`
                                            })}>
                                                <input {...getBannerInputProps()} multiple={false}
                                                    accept="image/jpeg, image/png, image/svg+xml"
                                                    id="bannerInput"
                                                    ref={bannerInputRef}
                                                //  onChange={handleLogoChange}
                                                />
                                                {
                                                    isBannerDragActive ?
                                                        <p>Drop the Banner here ...</p> :
                                                        (bannerStatus && bannerFiles && bannerFiles.length) ?
                                                            <img src={brandingData?.banner} alt="banner Preview" style={{ width: '100px', height: '100px' }} /> :
                                                            <Box className="customCard1" sx={{ width: "100%", ml: 2, mr: 0 }}>

                                                                {brandingData?.banner ?
                                                                    <img src={brandingData?.banner} alt="banner Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                    brandingData?.bannerPath ?
                                                                        <img src={imgUrl + brandingData?.bannerPath} alt="banner Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                        <p><br></br>Drag and Drop file, or  <span className='primary'>Browse</span>
                                                                        </p>
                                                                }
                                                            </Box>
                                                }

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid size={3} >
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="vertical soft  button group"
                                            variant="outlined"
                                            className='buttoncard'
                                        >
                                            <IconButton onClick={handleBannerBrowseButtonClick}><CloudUploadIcon /> </IconButton>
                                            <Divider sx={{ width: "60%", ml: 1, mr: 1 }}></Divider>
                                            <IconButton
                                                onClick={handleBannerDeleteButtonClick}
                                                disabled={AddBrandingFormik.values.banner ? false : brandingData?.bannerPath ? false : true}

                                            ><DeleteForeverOutlinedIcon style={{ color: AddBrandingFormik.values.banner ? "red" : brandingData?.bannerPath ? "red" : "" }} /></IconButton>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid size={6}>
                                <div style={{ width: '100%' }} >
                                    <Typography className="brand_lable_heading">Favicon <i>(up to 200px x 200px)</i><span style={{ color: "red" }}>*</span></Typography>
                                </div>
                                <Grid container direction="row">
                                    <Grid size={9} className='maincontainer'>
                                        <div className='customDropZone container'>
                                            <div {...getFaviconRootProps({
                                                className: `dropzone ${acceptedFaviconFiles.length > 0 ? 'fileDropped' : ''}`
                                            })}>
                                                <input {...getFaviconInputProps()} multiple={false}
                                                    accept="image/jpeg, image/png, image/svg+xml"
                                                    id="faviconInput"
                                                    ref={faviconInputRef}
                                                //  onChange={handleLogoChange}
                                                />
                                                {
                                                    isFaviconDragActive ?
                                                        <p>Drop the favicon here ...</p> :
                                                        (faviconStatus && faviconFiles && faviconFiles.length) ?
                                                            <img src={brandingData?.favicon} alt="favicon Preview" style={{ width: '100px', height: '100px' }} /> :
                                                            <Box className="customCard1" sx={{ width: "100%", ml: 2, mr: 0 }}>

                                                                {brandingData?.favicon ?
                                                                    <img src={brandingData?.favicon} alt="favicon Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                    brandingData?.faviconPath ?
                                                                        <img src={imgUrl + brandingData?.faviconPath} alt="favicon Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                        <p><br></br>Drag and Drop file, or  <span className='primary'>Browse</span>
                                                                        </p>
                                                                }
                                                            </Box>
                                                }

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid size={3} >
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="vertical soft  button group"
                                            variant="outlined"
                                            className='buttoncard'
                                        >
                                            <IconButton onClick={handleFavIconBrowseButtonClick} ><CloudUploadIcon /> </IconButton>
                                            <Divider sx={{ width: "60%", ml: 1, mr: 1 }}></Divider>
                                            <IconButton
                                                onClick={handleFavIconDeleteButtonClick}
                                                disabled={AddBrandingFormik.values.favicon ? false : brandingData?.faviconPath ? false : true}

                                            ><DeleteForeverOutlinedIcon style={{ color: AddBrandingFormik.values.favicon ? "red" : brandingData?.faviconPath ? "red" : "" }} /></IconButton>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid size={6}>
                                <div style={{ width: '100%' }} >
                                    <Typography className="brand_lable_heading">Social Post Image <i>(up to 200px x 200px)</i><span style={{ color: "red" }}></span></Typography>
                                </div>
                                <Grid container direction="row">
                                    <Grid size={9} className='maincontainer'>
                                        <div className='customDropZone container'>
                                            <div {...getSocialPathRootProps({
                                                className: `dropzone ${acceptedSocialPathFiles.length > 0 ? 'fileDropped' : ''}`
                                            })}>
                                                <input {...getSocialPathInputProps()} multiple={false}
                                                    accept="image/jpeg, image/png, image/svg+xml"
                                                    id="socialPathInput"
                                                    ref={socialPathInputRef}
                                                //  onChange={handleLogoChange}
                                                />
                                                {
                                                    isSocialPathDragActive ?
                                                        <p>Drop the Social Post Image here ...</p> :
                                                        (socialPathStatus && socialPathFiles && socialPathFiles.length) ?
                                                            <img src={brandingData?.socialPostImage} alt="Social Post Image Preview" style={{ width: '100px', height: '100px' }} /> :
                                                            <Box className="customCard1" sx={{ width: "100%", ml: 2, mr: 0 }}>

                                                                {brandingData?.socialPostImage ?
                                                                    <img src={brandingData?.socialPostImage} alt="Social Post Image Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                    brandingData?.socialPostImagePath ?
                                                                        <img src={imgUrl + brandingData?.socialPostImagePath} alt="Social Post Image Preview" style={{ width: '100px', height: '100px' }} /> :
                                                                        <p><br></br>Drag and Drop file, or  <span className='primary'>Browse</span>
                                                                        </p>
                                                                }
                                                            </Box>
                                                }

                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid size={3} >
                                        <ButtonGroup
                                            orientation="vertical"
                                            aria-label="vertical soft  button group"
                                            variant="outlined"
                                            className='buttoncard'
                                        >
                                            <IconButton onClick={handleSocialPathBrowseButtonClick} ><CloudUploadIcon /> </IconButton>
                                            <Divider sx={{ width: "60%", ml: 1, mr: 1 }}></Divider>
                                            <IconButton
                                                onClick={handleSocialPathDeleteButtonClick}
                                                disabled={AddBrandingFormik.values.socialPostImage ? false : brandingData?.socialPostImagePath ? false : true}

                                            ><DeleteForeverOutlinedIcon style={{ color: AddBrandingFormik.values.socialPostImage ? "red" : brandingData?.socialPostImagePath ? "red" : "" }} /></IconButton>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Grid>




                        </Grid>


                        <Grid container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            size={12}
                            sx={{ mb: 2 }}
                        >
                            <Card sx={{ width: "30%", marginTop: "5px", height: "100px", marginRight: "1em" }}>
                                <CardContent>
                                    <span style={{ padding: "10px 0px 0px 0px" }} className="brand_lable_heading">Primary Color</span>
                                    <PixIcon aria-describedby={primaryColorId} onClick={(e) => handlePrimaryClick(e)} style={{ float: "right" }}></PixIcon>

                                    <Grid container direction="row" size={12}>
                                        <Grid size={3}  >
                                            <Box sx={{ width: 32, height: 32, bgcolor: brandingData.brandColor, marginTop: "18px" }} onClick={(e) => handlePrimaryClick(e)} />

                                        </Grid> <Grid size={8} sx={{ marginTop: "1em" }}>
                                            <HexColorInput color={brandingData.brandColor} prefixed onChange={(e: string) => {
                                                setBrandingData({
                                                    ...brandingData,
                                                    brandColor: e
                                                })
                                            }} />
                                        </Grid>
                                        {/* <Grid size={2} sx={{ marginTop: "13px", marginLeft: "10px" }}>
                                            <Button
                                                type='button'
                                                size="small" variant='outlined'
                                                id="secondaryReset"
                                                color="secondary"
                                                fullWidth
                                                className='mt-2'
                                                style={{
                                                    //  borderColor: `${brandingData.buttonColor}`,
                                                    //   color: `${brandingData.buttonColor}`,
                                                    borderWidth: "1px",
                                                    height: 32
                                                }}
                                                onClick={() => {
                                                    AddBrandingFormik.setFieldValue("brandColor", colorDefaultObj.primary);
                                                    setBrandingData({
                                                        ...brandingData,
                                                        brandColor: colorDefaultObj.primary
                                                    })
                                                }
                                                }
                                            >Reset</Button>
                                        </Grid> */}
                                        <Popover
                                            id={primaryColorId}
                                            className="popoverPrimaryBox1"
                                            open={openPrimary}
                                            anchorEl={anchorElPrimary}
                                            onClose={handlePrimaryClose}
                                            sx={{ ml: 1, }}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <Box className="modalBox" style={{ top: "10%", left: "10%", padding: "5px", margin: "10px" }}>

                                                <HexColorPicker color={brandingData.brandColor} onChange={(e: string) => {
                                                    setBrandingData({
                                                        ...brandingData,
                                                        brandColor: e
                                                    })
                                                }} />
                                                <HexColorInput color={brandingData.brandColor} style={{ width: '99%', height: "28px" }} prefixed onChange={(e: string) => {
                                                    setBrandingData({
                                                        ...brandingData,
                                                        brandColor: e
                                                    })
                                                }} />

                                            </Box>
                                        </Popover>
                                    </Grid>
                                </CardContent>
                            </Card>

                            <Card sx={{ width: "30%", marginTop: "5px", height: "100px" }}>
                                <CardContent>
                                    <span style={{ padding: "10px 0px 0px 0px" }} className="brand_lable_heading">Accent Color</span>
                                    <PixIcon aria-describedby={miscellaneousColorId} onClick={(e) => handleMiscellaneousClick(e)} style={{ float: "right" }}></PixIcon>
                                    <Grid container direction="row" size={12}>
                                        <Grid size={3}>
                                            <Box sx={{ width: 32, height: 32, bgcolor: brandingData.miscellaneousColor, marginTop: "18px" }} onClick={(e) => handleMiscellaneousClick(e)} />

                                        </Grid> <Grid size={8} sx={{ marginTop: "1em" }}>

                                            <HexColorInput color={brandingData.miscellaneousColor} prefixed onChange={(e: string) => {
                                                setBrandingData({
                                                    ...brandingData,
                                                    miscellaneousColor: e
                                                })
                                            }} />
                                        </Grid>
                                        {/* <Grid size={2} sx={{ marginTop: "13px", marginLeft: "10px" }}>
                                            <Button
                                                type='button'
                                                size="small" variant='outlined'
                                                color="secondary"
                                                fullWidth
                                                className='mt-2'
                                                style={{
                                                    //      borderColor: `${brandingData.buttonColor}`,
                                                    //   color: `${brandingData.buttonColor}`,
                                                    borderWidth: "1px",
                                                    height: 32
                                                }}
                                                onClick={() => {
                                                    AddBrandingFormik.setFieldValue("miscellaneousColor", colorDefaultObj.miscellaneous);
                                                    setBrandingData({
                                                        ...brandingData,
                                                        miscellaneousColor: colorDefaultObj.miscellaneous
                                                    })
                                                }
                                                }
                                            >Reset</Button>
                                        </Grid> */}
                                        <Popover
                                            id='miscellaneousColorId'
                                            className="popoverMiscellaneousBox1"
                                            open={openMiscellaneous}
                                            onClose={handleMiscellaneousClose}
                                            sx={{ ml: 1, }}
                                            anchorEl={anchorElMiscellaneous}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <Box className="modalBox" style={{ top: "10%", left: "10%", padding: "5px", margin: "10px" }}>
                                                <HexColorPicker color={brandingData.miscellaneousColor} onChange={(e: string) => {
                                                    setBrandingData({
                                                        ...brandingData,
                                                        miscellaneousColor: e
                                                    })
                                                }}

                                                />
                                                <HexColorInput color={brandingData.miscellaneousColor} style={{ width: '99%', height: "28px" }} prefixed onChange={(e: string) => {
                                                    setBrandingData({
                                                        ...brandingData,
                                                        miscellaneousColor: e
                                                    })
                                                }} />
                                            </Box>
                                        </Popover>
                                    </Grid>
                                </CardContent>
                            </Card>
                            <Card sx={{ width: "30%", marginTop: "5px", height: "100px" }}>
                                <CardContent>
                                    <span style={{ padding: "10px 0px 0px 0px" }} className="brand_lable_heading">Secondary Color</span>
                                    <PixIcon aria-describedby={secondaryColorId} onClick={(e) => handleSecondaryClick(e)} style={{ float: "right" }}></PixIcon>
                                    <Grid container direction="row" size={12}>
                                        <Grid size={3}>
                                            <Box sx={{ width: 32, height: 32, bgcolor: brandingData.buttonColor, marginTop: "18px" }} onClick={(e) => handleSecondaryClick(e)} />

                                        </Grid> <Grid size={8} sx={{ marginTop: "1em" }}>

                                            <HexColorInput color={brandingData.buttonColor} prefixed onChange={(e: string) => {
                                                setBrandingData({
                                                    ...brandingData,
                                                    buttonColor: e
                                                })
                                            }} />
                                        </Grid>
                                        {/* <Grid size={2} sx={{ marginTop: "13px", marginLeft: "10px" }}>
                                            <Button
                                                type='button'
                                                size="small" variant='outlined'
                                                color="secondary"
                                                fullWidth
                                                className='mt-2'
                                                style={{
                                                    //      borderColor: `${brandingData.buttonColor}`,
                                                    //   color: `${brandingData.buttonColor}`,
                                                    borderWidth: "1px",
                                                    height: 32
                                                }}
                                                onClick={() => {
                                                    AddBrandingFormik.setFieldValue("buttonColor", colorDefaultObj.secondary);
                                                    setBrandingData({
                                                        ...brandingData,
                                                        buttonColor: colorDefaultObj.secondary
                                                    })
                                                }
                                                }
                                            >Reset</Button>
                                        </Grid> */}
                                        <Popover
                                            id='secondaryColorId'
                                            className="popoverSecondaryBox1"
                                            open={openSecondary}
                                            onClose={handleSecondaryClose}
                                            sx={{ ml: 1, }}
                                            anchorEl={anchorElSecondary}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            transformOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                        >
                                            <Box className="modalBox" style={{ top: "10%", left: "10%", padding: "5px", margin: "10px" }}>
                                                <HexColorPicker color={brandingData.buttonColor} onChange={(e: string) => {
                                                    setBrandingData({
                                                        ...brandingData,
                                                        buttonColor: e
                                                    })
                                                }}

                                                />
                                                <HexColorInput color={brandingData.buttonColor} style={{ width: '99%', height: "28px" }} prefixed onChange={(e: string) => {
                                                    setBrandingData({
                                                        ...brandingData,
                                                        buttonColor: e
                                                    })
                                                }} />
                                            </Box>
                                        </Popover>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid container spacing={1} sx={{ m: 1, ml: 2 }}>
                            <Grid size={5} sx={{ ml: 2 }} >
                                <label className="brand_lable_heading">Primary Logo Url<span style={{ color: "red" }}></span></label>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    //label="Web URL"
                                    name={`logoUrl`}
                                    id={`logoUrl`}
                                    className='mt-2'
                                    value={AddBrandingFormik.values.logoUrl}
                                    onChange={(e) => handleClientBrandName(e, "logoUrl")}
                                />
                            </Grid>
                            <Grid size={1}></Grid>
                            <Grid size={5} sx={{ mr: 0 }} >
                                <label className="brand_lable_heading">Secondary Logo Url<span style={{ color: "red" }}></span></label>
                                <TextField fullWidth
                                    variant="outlined"
                                    type="text"
                                    size="small"
                                    //label="Web URL"
                                    name={`secondaryLogoUrl`}
                                    id={`secondaryLogoUrl`}
                                    className='mt-2'
                                    value={AddBrandingFormik.values.secondaryLogoUrl}
                                    onChange={(e) => handleClientBrandName(e, "secondaryLogoUrl")}
                                />
                            </Grid>
                        </Grid>
                        {/* <br></br> */}
                        {/* <Box className="header_footer_box">

                            <Grid sx={{ marginLeft: '20px' }} className='preview_icon' onClick={handleOpen}>
                                <RemoveRedEyeOutlinedIcon className='cursor-pointer' />
                            </Grid>
                            <Grid container spacing={1} className="header_footer_subbox">
                                <Grid size={12} sx={{ ml: 2 }} >
                                    <label className="brand_lable_heading">Header<span style={{ color: "red" }}></span></label>

                                    <Editor
                                        toolbarId='header'
                                        placeholder=''
                                        id='header'
                                        handleChange={(e: any) => {
                                            handleEditorHeaderChange(e);
                                        }}
                                        editorHtml={editorHeaderContent}
                                        mentions={false}
                                        saveTemplate={false}
                                    />
                                    <ReactQuill theme="snow" value={editorHeaderContent} onChange={handleEditorHeaderChange} style={{ height: '110px', width: 'max-content', marginTop: '8px' }} onBlur={handleSave} />

                                </Grid>
                                <Grid size={1}></Grid>
                                <Grid size={12} sx={{ mr: 0, ml: 2 }} >
                                    <label className="brand_lable_heading">Footer<span style={{ color: "red" }}></span></label>
                                    <ReactQuill theme="snow" value={editorFooterContent} onChange={handleEditorFooterChange} style={{ height: '110px', width: 'max-content', marginTop: '8px' }} onBlur={handleSave} />

                                    <Editor
                                        toolbarId='footer'
                                        placeholder=''
                                        id='footer'
                                        handleChange={(e: any) => {
                                            handleEditorFooterChange(e);
                                        }}
                                        editorHtml={editorFooterContent}
                                        mentions={false}
                                        saveTemplate={false}
                                    />

                                </Grid>
                            </Grid>
                        </Box> */}
                    </Grid>
                    <Grid size={0} alignContent={'center'}>   <Divider orientation="vertical" />
                    </Grid>
                    <Grid size={5}>
                        <Box className="customCard1 " sx={{ height: `calc(100% - 20px)`, width: "98%", ml: 2, mr: 2 }}>
                            <h3>Branding Preview</h3>
                            {/* <div className="logoparent" style={{ width: '98%', height: '320px' }} > */}
                            <Stack spacing={1}>
                                {/* For variant="text", adjust the height via font-size */}
                                {/* brandingData?.faviconPath ?
                                        <img src={brandingData?.faviconPath} alt="Favicon Preview" style={{ width: '35px', height: '35px', borderRadius: "20px" }} /> :
                                     */}

                                {brandingData?.favicon ?
                                    <img src={brandingData?.favicon} alt="Favicon Preview" style={{ width: '35px', height: '35px', borderRadius: "20px" }} /> :
                                    brandingData?.faviconPath ?
                                        <img src={imgUrl + brandingData?.faviconPath} alt="Favicon Preview" style={{ width: '35px', height: '35px', borderRadius: "20px" }} /> :
                                        <Skeleton variant="circular" width={35} height={35} />
                                }

                                <Stack direction="row" spacing={5} className="btn-container">
                                    {brandingData?.logo ?
                                        <img src={brandingData?.logo} alt="Logo Preview" className='imglogo' style={{ width: '70px', height: '70px', }} /> :
                                        brandingData?.logoPath ?
                                            <img src={imgUrl + brandingData?.logoPath} alt="Logo Preview" className='imglogo' style={{ width: '70px', height: '70px', }} /> :
                                            <Skeleton variant="rounded" width={200} height={40} />
                                    }
                                    {brandingData?.secondaryLogo ?
                                        <img src={brandingData?.secondaryLogo} alt="Secondary Logo Preview" className='imglogo' style={{ width: '70px', height: '70px', }} /> :
                                        brandingData?.secondaryLogoPath ?
                                            <img src={imgUrl + brandingData?.secondaryLogoPath} alt="Secondary Logo Preview" className='imglogo' style={{ width: '70px', height: '70px', }} /> :
                                            <Skeleton variant="rounded" width={200} height={40} />
                                    }
                                </Stack>
                                {brandingData?.banner ?
                                    <img src={brandingData?.banner} alt="Banner Preview" className='imgbanner' style={{ width: '100%', height: '200px', }} /> :
                                    brandingData?.bannerPath ?
                                        <img src={imgUrl + brandingData?.bannerPath} alt="Banner Preview" className='imgbanner' style={{ width: '100%', height: '200px', }} /> :
                                        <Skeleton variant="rounded" width="100%" height={200} />
                                }



                                <Stack direction="row" spacing={5} >

                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="start"
                                        alignItems="center"
                                        style={{
                                            height: "100px"
                                        }}
                                    >
                                        {brandingData?.socialPostImage ?
                                            <img src={brandingData?.socialPostImage} alt="Social Post Image Preview" className='imglogo' style={{ width: '50px', height: '50px', }} /> :
                                            brandingData?.socialPostImagePath ?
                                                <img src={imgUrl + brandingData?.socialPostImagePath} alt="Social Post Image Preview" className='imglogo' style={{ width: '50px', height: '50px', }} /> :
                                                <Skeleton variant="rounded" width={200} height={50} />
                                        }
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="end"
                                        alignItems="center"
                                        style={{
                                            height: "200px"
                                        }}
                                    >
                                        {brandingData?.chatLogo ?
                                            <img src={brandingData?.chatLogo} alt="ChatLogo Preview" className='imglogo' style={{ width: '50px', height: '50px', }} /> :
                                            brandingData?.chatLogoPath ?
                                                <img src={imgUrl + brandingData?.chatLogoPath} alt="ChatLogo Preview" className='imglogo' style={{ width: '50px', height: '50px', }} /> :
                                                <Skeleton variant="circular" width={50} height={50} />
                                        }
                                    </Grid>
                                </Stack>
                            </Stack>


                            <Stack direction="row" spacing={1} className="btn-container">
                                <Button
                                    fullWidth type='button'
                                    size="small" className='mt-2'
                                    style={{
                                        backgroundColor: `${brandingData.brandColor}`,
                                        borderColor: `${brandingData.brandColor}`,
                                        color: '#fff',
                                        height: "30px"
                                    }}  >Primary Button</Button>
                                <Button
                                    type='button'
                                    size="small" variant='outlined'
                                    //   color={brandingData.buttonColor}
                                    fullWidth
                                    className='mt-2'
                                    style={{
                                        borderColor: `${brandingData.miscellaneousColor}`,
                                        color: `${brandingData.miscellaneousColor}`,

                                        borderWidth: "1px",
                                        height: "30px"
                                    }}
                                >Accent button</Button>
                                <Button
                                    type='button'
                                    size="small" variant='outlined'
                                    //   color={brandingData.buttonColor}
                                    fullWidth
                                    className='mt-2 mr-2'
                                    style={{
                                        borderColor: `${brandingData.buttonColor}`,
                                        color: `${brandingData.buttonColor}`,

                                        borderWidth: "1px",
                                        height: "30px"
                                    }}
                                >Secondary button</Button>
                            </Stack>

                        </Box>
                    </Grid>
                </Grid>

            </form>
        </div>
    )
}
export default Branding
