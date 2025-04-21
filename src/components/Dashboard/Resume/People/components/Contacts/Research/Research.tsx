import  {React, useState } from "../../../../../../../shared/modules/React";
import { Box } from "../../../../../../../shared/modules/MaterialImports/Box";
import { Button } from "../../../../../../../shared/modules/MaterialImports/Button";
import { Card } from "../../../../../../../shared/modules/MaterialImports/Card";
import { Stack } from "../../../../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../../../../shared/modules/MaterialImports/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LinkIcon from '@mui/icons-material/Link';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';


interface ResearchProps {
    companydetails: any[];
    profileData: any;
    keywords: any[];
    mobile: string;
}

const Research: React.FC<ResearchProps> = ({ companydetails, profileData, keywords, mobile }) => {
    console.log(profileData);
    const [isOverview, setOverview] = useState(true)
    const [isTech, setTech] = useState(false)
    const [isFunding, setFunding] = useState(false)
    const [isJobPost, setJobPost] = useState(false)
    const [isNews, setNews] = useState(false)
    const [isEmployeeTrend, setEmployeeTrend] = useState(false)
    const [showMore, setShowMore] = useState(false);
    //     const [companyDetailsOnce, setCompanyDetailsOnce] = useState((companydetails && companydetails.length) ? companydetails[0] : {});

    // console.log(companyDetailsOnce);

    const mobileset: string = mobile

    // const formattedMobile = `(${mobileset.slice(2, 5)})-${mobileset.slice(5, 8)}-${mobileset.slice(8)}`;
    const formattedMobile = mobileset ? `(${mobileset.slice(2, 5)})-${mobileset.slice(5, 8)}-${mobileset.slice(8)}` : ``;


    const toggleDescriptionShowMore = () => {
        setShowMore(!showMore);
    };

    const onclickOverview = () => {
        setOverview(true)
        setTech(false)
        setFunding(false)
        setJobPost(false)
        setNews(false)
        setEmployeeTrend(false)
    }

    const onclickTech = () => {
        setOverview(false)
        setTech(true)
        setFunding(false)
        setJobPost(false)
        setNews(false)
        setEmployeeTrend(false)
    }

    const onclickFunding = () => {
        setOverview(false)
        setTech(false)
        setFunding(true)
        setJobPost(false)
        setNews(false)
        setEmployeeTrend(false)
    }

    const onclickJobPost = () => {
        setOverview(false)
        setTech(false)
        setFunding(false)
        setJobPost(true)
        setNews(false)
        setEmployeeTrend(false)
    }

    const onclickNews = () => {
        setOverview(false)
        setTech(false)
        setFunding(false)
        setJobPost(false)
        setNews(true)
        setEmployeeTrend(false)
    }

    const onclickEmployeeTrend = () => {
        setOverview(false)
        setTech(false)
        setFunding(false)
        setJobPost(false)
        setNews(false)
        setEmployeeTrend(true)
    }


    const descriptionContent = "At Altice USA, we believe in the power of connections. With a relentless focus on innovating for the future, our content goes here... At Altice USA, we believe in the power of connections. With a relentless focus on innovating for the future, our content goes here";

    return (
        <Stack pb={5} sx={{ cursor: 'default' }}>
            <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    disableRipple
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#146EF6',
                        textTransform: 'capitalize',
                        padding: '10px',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            color: '#0852C2'
                        }
                    }}
                >
                    Contact Overview
                </Button>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <LockOutlinedIcon sx={{ color: '#737373' }} />
                    <Button
                        disableRipple
                        endIcon={<ArrowDropDownIcon />}
                        sx={{
                            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#146EF6',
                            textTransform: 'capitalize',
                            '&:hover': {
                                backgroundColor: '#F7F7F7',
                                color: '#0852C2'
                            }
                        }}
                    >
                        Edit
                    </Button>
                </Box>
            </Stack>



            <Card sx={{
                height: 'auto', pl: 2, mb: 2,
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                pb: 2
            }}>
                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Stack sx={{ width: '40%' }} >
                        {/* {companydetails.map((company: any) => ( */}
                        {/* {(companyDetailsOnce && companyDetailsOnce.company) ?   */}
                        <Stack sx={{ width: '90%' }}>
                            <Stack pl={8} mt={5}>
                                <Box sx={{
                                    height: '28px', width: '28px', backgroundColor: '#D9D9D9', borderRadius: '3px',
                                    mb: 1.2, ml: 2
                                }}>
                                    <img src="https://res.cloudinary.com/doxor5nnu/image/upload/v1683968391/Amazon-Logo-Font-1-scaled_f7sumk.webp" alt="img" style={{ height: '28px', width: '28px', borderRadius: '3px' }} />
                                </Box>
                                <Stack direction='row' spacing={1}>
                                    <Box sx={{
                                        height: '30px', width: '30px', border: '#919191 1px solid', borderRadius: '2px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                        '&:hover svg': {
                                            color: '#146EF6'
                                        },
                                        '&:hover': {
                                            borderColor: '#146EF6'
                                        }
                                    }}>
                                        <LinkIcon sx={{ color: '#919191' }} />
                                    </Box>
                                    <Box sx={{
                                        height: '30px', width: '30px', border: '#919191 1px solid', borderRadius: '2px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                        '&:hover svg': {
                                            color: '#146EF6'
                                        },
                                        '&:hover': {
                                            borderColor: '#146EF6'
                                        }
                                    }}>
                                        <LinkedInIcon sx={{ color: '#737373' }} />
                                    </Box>
                                    <Box sx={{
                                        height: '30px', width: '30px', border: '#919191 1px solid', borderRadius: '2px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                        '&:hover svg': {
                                            color: '#146EF6'
                                        },
                                        '&:hover': {
                                            borderColor: '#146EF6'
                                        }
                                    }}>
                                        <FacebookIcon sx={{ color: '#919191' }} />
                                    </Box>
                                    <Box sx={{
                                        height: '30px', width: '30px', border: '#919191 1px solid', borderRadius: '2px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                        '&:hover svg': {
                                            color: '#146EF6'
                                        },
                                        '&:hover': {
                                            borderColor: '#146EF6'
                                        }
                                    }}>
                                        <TwitterIcon sx={{ color: '#919191' }} />
                                    </Box>
                                </Stack>
                            </Stack>

                            <Stack mt={5} pl={1}>
                                <Stack direction='row' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Box sx={{ width: '50%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 0.3 }}>
                                            <Typography component='h6' sx={{ fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1A1A1A' }}>
                                                Company Phone
                                            </Typography>
                                            <Box component='span' sx={{ color: '#737373' }}>
                                                <HelpOutlineOutlinedIcon sx={{ fontSize: '13.33px', mt: '5px' }} />
                                            </Box>
                                        </Box>
                                        <Typography component='p' sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#474747' }}>
                                            {formattedMobile}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '50%' }}>
                                        <Typography component='h6' sx={{ fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1A1A1A' }}>
                                            Account Owner
                                        </Typography>
                                        <Typography component='p' sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#474747' }}>
                                            Shannan Glisson
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction='row' mt={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Box sx={{ width: '50%' }}>
                                        <Typography component='h6' sx={{ fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1A1A1A' }}>
                                            Industry
                                        </Typography>
                                        <Typography component='p' sx={{ fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#146EF6' }}>
                                            {profileData.job_company_name}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '50%' }}>
                                        <Typography component='h6' sx={{ fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1A1A1A' }}>
                                            Employees
                                        </Typography>
                                        <Typography component='p' sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#474747' }}>
                                            {profileData.job_company_size} <Box component='span' sx={{
                                                fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#146EF6', '&:hover': {
                                                    color: '#0852C2'
                                                }
                                            }}>
                                                Find Leads
                                            </Box>
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction='row' mt={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Box sx={{ width: '50%' }}>
                                        <Typography component='h6' sx={{ fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1A1A1A' }}>
                                            Account Stage
                                        </Typography>
                                        <Button
                                            disableRipple
                                            sx={{
                                                height: '20px',
                                                width: '39px',
                                                textTransform: 'capitalize',
                                                backgroundColor: '#F0F0F0',
                                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                                                color: '#474747',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                '&:hover': {
                                                    backgroundColor: '#CACACA'
                                                }
                                            }}
                                        >
                                            Cold
                                        </Button>
                                    </Box>
                                    <Box sx={{ width: '50%' }}>
                                        <Typography component='h6' sx={{ fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1A1A1A' }}>
                                            Founded Year
                                        </Typography>
                                        <Typography component='p' sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#474747' }}>
                                            {profileData.job_company_founded}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction='row' mt={1} sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <Box sx={{ width: '50%' }}>
                                        <Typography component='h6' sx={{ fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1A1A1A' }}>
                                            Trading
                                        </Typography>
                                        <Typography component='p' sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#474747' }}>
                                            NYSE: ATUS.
                                        </Typography>
                                    </Box>
                                    <Box sx={{ width: '50%' }}>
                                        <Typography component='h6' sx={{ fontSize: '14px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1A1A1A' }}>
                                            Annual Revenue
                                        </Typography>
                                        <Typography component='p' sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#474747' }}>
                                            $9.6B
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                        {/* :
                            (<></>) 
                        } */}

                        {/* // ))} */}
                    </Stack>
                    <Stack sx={{ width: '60%' }} mt={5}>
                        <Stack>
                            <Box>
                                <Typography component='h6' sx={{ fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 600, color: '#1A1A1A' }}>
                                    Description
                                </Typography>

                                <Typography component='p' sx={{ fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400, color: '#474747' }}>
                                    {descriptionContent.slice(0, showMore ? descriptionContent.length : 133)}
                                    {descriptionContent.length > 100 && (
                                        <Box component='span' sx={{
                                            fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 600, color: '#146EF6',
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: '#0852C2'
                                            }
                                        }} onClick={toggleDescriptionShowMore}>
                                            {showMore ? "Show Less" : "Show More"}
                                        </Box>
                                    )}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack mt={2}>
                            <Box>
                                <Typography component='h6' sx={{ fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 600, color: '#1A1A1A' }}>
                                    Keywords
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', width: 'auto', gap: 1, flexWrap: 'wrap' }}>
                                    {keywords.map((skills) => (
                                        <Box>
                                            <Box sx={{
                                                backgroundColor: '#F0F0F0', width: 'auto', height: '20px', display: 'flex', justifyContent: 'center', borderRadius: '2px', padding: '5px', cursor: 'default', '&:hover': {
                                                    backgroundColor: '#CACACA'
                                                }
                                            }}>
                                                <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 600, fontSize: '12px' }}>{skills}</Typography>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
            <Card sx={{
                height: '480px',
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
            }}>
                <Stack sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E6E6E6' }} p={2}>

                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 0.5 }}>
                        <Typography component='h6' sx={{ fontSize: '16px', fontWeight: '600', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1A1A1A', }}>
                            insights
                        </Typography>
                        <Box component='span' sx={{ color: '#737373' }}>
                            <HelpOutlineOutlinedIcon sx={{ fontSize: '16.67px', mt: '6px' }} />
                        </Box>
                    </Box>

                    <Box>
                        <Button
                            disableRipple
                            startIcon={<SettingsOutlinedIcon sx={{ fontSize: '24px' }} />}
                            sx={{
                                textTransform: 'capitalize',
                                color: '#146EF6', height: '19px',
                                width: '90px', fontSize: '14px',
                                fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 600,
                                p: 2,
                                '&:hover': {
                                    backgroundColor: '#ffffff'
                                }
                            }}
                        >
                            Settings
                        </Button>
                    </Box>
                </Stack>

                <Stack sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                    <Stack sx={{ width: '20%', borderRight: '1px solid #E6E6E6' }}>
                        <Box sx={{
                            height: '46px', display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 1, gap: 1, cursor: 'pointer',
                            borderBottom: isOverview ? '1px solid #E6E6E6' : '1px solid #ffffff', borderLeft: isOverview ? '2px solid #146EF6' : '2px solid #ffffff',
                            '&:hover': {
                                borderLeft: '2px solid #146EF6',
                                borderBottom: '1px solid #E6E6E6',
                                '&:hover svg,&:hover p': {
                                    color: '#146EF6',
                                }
                            }
                        }} onClick={onclickOverview}

                        >
                            <Box>
                                <GridViewOutlinedIcon sx={{ color: isOverview ? '#146EF6' : '#474747', fontSize: '24px' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: isOverview ? '#146EF6' : '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600 }}>
                                    Overview
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            height: '46px', display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 1, gap: 1, cursor: 'pointer',
                            borderBottom: isTech ? '1px solid #E6E6E6' : '1px solid #ffffff', borderLeft: isTech ? '2px solid #146EF6' : '2px solid #ffffff', borderTop: isTech ? '1px solid #E6E6E6' : '1px solid #ffffff',
                            '&:hover': {
                                borderLeft: '2px solid #146EF6',
                                borderTop: '1px solid #E6E6E6',
                                borderBottom: '1px solid #E6E6E6',
                                '&:hover svg,&:hover p': {
                                    color: '#146EF6',
                                }
                            }
                        }}
                            onClick={onclickTech}>
                            <Box>
                                <GridViewOutlinedIcon sx={{ color: isTech ? '#146EF6' : '#474747', fontSize: '24px' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: isTech ? '#146EF6' : '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600 }}>
                                    Technologies  <Box component='span' sx={{ pl: 5 }}>{keywords.length}</Box>
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            height: '46px', display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 1, gap: 1, cursor: 'pointer',
                            borderBottom: isFunding ? '1px solid #E6E6E6' : '1px solid #ffffff', borderLeft: isFunding ? '2px solid #146EF6' : '2px solid #ffffff', borderTop: isFunding ? '1px solid #E6E6E6' : '1px solid #ffffff',
                            '&:hover': {
                                borderLeft: '2px solid #146EF6',
                                borderTop: '1px solid #E6E6E6',
                                borderBottom: '1px solid #E6E6E6',
                                '&:hover svg,&:hover p': {
                                    color: '#146EF6',
                                }
                            }
                        }}
                            onClick={onclickFunding}>
                            <Box>
                                <GridViewOutlinedIcon sx={{ color: isFunding ? '#146EF6' : '#474747', fontSize: '24px' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: isFunding ? '#146EF6' : '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600 }}>
                                    Funding Rounds
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            height: '46px', display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 1, gap: 1, cursor: 'pointer',
                            borderBottom: isJobPost ? '1px solid #E6E6E6' : '1px solid #ffffff', borderLeft: isJobPost ? '2px solid #146EF6' : '2px solid #ffffff', borderTop: isJobPost ? '1px solid #E6E6E6' : '1px solid #ffffff',
                            '&:hover': {
                                borderLeft: '2px solid #146EF6',
                                borderTop: '1px solid #E6E6E6',
                                borderBottom: '1px solid #E6E6E6',
                                '&:hover svg,&:hover p': {
                                    color: '#146EF6',
                                }
                            }
                        }}
                            onClick={onclickJobPost}
                        >
                            <Box>
                                <GridViewOutlinedIcon sx={{ color: isJobPost ? '#146EF6' : '#474747', fontSize: '24px' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: isJobPost ? '#146EF6' : '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600 }}>
                                    Job Postings
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            height: '46px', display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 1, gap: 1, cursor: 'pointer',
                            borderBottom: isNews ? '1px solid #E6E6E6' : '1px solid #ffffff', borderLeft: isNews ? '2px solid #146EF6' : '2px solid #ffffff', borderTop: isNews ? '1px solid #E6E6E6' : '1px solid #ffffff',
                            '&:hover': {
                                borderLeft: '2px solid #146EF6',
                                borderTop: '1px solid #E6E6E6',
                                borderBottom: '1px solid #E6E6E6',
                                '&:hover svg,&:hover p': {
                                    color: '#146EF6',
                                }
                            }
                        }}
                            onClick={onclickNews}>
                            <Box>
                                <GridViewOutlinedIcon sx={{ color: isNews ? '#146EF6' : '#474747', fontSize: '24px' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: isNews ? '#146EF6' : '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600 }}>
                                    News
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{
                            height: '46px', display: 'flex', flexDirection: 'row', alignItems: 'center', pl: 1, gap: 1, cursor: 'pointer',
                            borderBottom: isEmployeeTrend ? '1px solid #E6E6E6' : '1px solid #ffffff', borderLeft: isEmployeeTrend ? '2px solid #146EF6' : '2px solid #ffffff', borderTop: isEmployeeTrend ? '1px solid #E6E6E6' : '1px solid #ffffff',
                            '&:hover': {
                                borderLeft: '2px solid #146EF6',
                                borderTop: '1px solid #E6E6E6',
                                borderBottom: '1px solid #E6E6E6',
                                '&:hover svg,&:hover p': {
                                    color: '#146EF6',
                                }
                            }
                        }}
                            onClick={onclickEmployeeTrend}>
                            <Box>
                                <GridViewOutlinedIcon sx={{ color: isEmployeeTrend ? '#146EF6' : '#474747', fontSize: '24px' }} />
                            </Box>
                            <Box>
                                <Typography sx={{ color: isEmployeeTrend ? '#146EF6' : '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600 }}>
                                    Employee Trends
                                </Typography>
                            </Box>
                        </Box>

                    </Stack>

                    {isOverview &&
                        <Stack pt={2} pl={5} >
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Box>
                                    <PersonAddAltIcon sx={{ color: '#737373', fontSize: '24px' }} />
                                </Box>
                                <Box>
                                    <Typography component='h6' sx={{ color: '#474747', fontWeight: 600, fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px' }}> Personas</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ pl: 5 }}>
                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    7 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        QA Managers Persona
                                    </Box>
                                </Typography>

                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    11 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        UX Managers Persona
                                    </Box>
                                </Typography>

                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    118 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        IT Managers Persona
                                    </Box>
                                </Typography>

                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    26 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        HR and Talent Acquisition Managers Persona
                                    </Box>
                                </Typography>

                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    8 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        Security Managers Persona
                                    </Box>
                                </Typography>

                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    19 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        MSP Program Professional Persona
                                    </Box>
                                </Typography>

                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    920 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        Information Technology Persona
                                    </Box>
                                </Typography>

                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    530 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        Application Development Persona
                                    </Box>
                                </Typography>

                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    436 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        Accenture persona
                                    </Box>
                                </Typography>

                                <Typography component='p' sx={{ color: '#474747', fontSize: '14px', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontWeight: 400 }}>
                                    665 People in <Box component='span' sx={{ color: '#146EF6', fontWeight: '600' }}>
                                        Information Technology(IT) Persona
                                    </Box>
                                </Typography>

                            </Box>
                        </Stack>
                    }

                    {isTech &&
                        <Stack sx={{ width: '80%', overflow: 'auto', height: '400px' }} >
                            <Stack sx={{
                                width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                                borderBottom: '#E6E6E6 1px solid',
                                '&:hover svg,&:hover p': {
                                    color: '#146EF6',
                                }
                            }}
                            >
                                <Stack p={1}
                                >
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 600 }}>
                                        Technology Insights Settings
                                    </Typography>
                                </Stack>
                                <Stack p={1}>
                                    <ArrowDropDownIcon sx={{ color: '#919191', fontSize: '20px' }} />
                                </Stack>
                            </Stack>

                            <Stack >
                                <Box >
                                    {companydetails.map((company: any) => (
                                        <Box sx={{
                                            borderBottom: '#E6E6E6 1px solid',
                                            '&:hover': {
                                                backgroundColor: '#F7F7F7'
                                            }
                                        }}>
                                            <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                                {company.company.name}
                                            </Typography>


                                            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                                {keywords.map((skills) => (

                                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                                        {skills}
                                                    </Typography>

                                                ))}
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>







                                {/* <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                        Apache
                                    </Typography>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                        Load Balancer
                                    </Typography>
                                </Box>
                                <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                        Attlassian
                                    </Typography>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                        CMS
                                    </Typography>
                                </Box>
                                <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                        BugHerd
                                    </Typography>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                        Widgets
                                    </Typography>
                                </Box>
                                <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                        Cloudflare DNS
                                    </Typography>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                        Domain Name Services
                                    </Typography>
                                </Box>
                                <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                        Cloudflare DNS
                                    </Typography>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                        Domain Name Services
                                    </Typography>
                                </Box>
                                <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                        Cloudflare DNS
                                    </Typography>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                        Domain Name Services
                                    </Typography>
                                </Box> */}

                            </Stack>
                        </Stack>
                    }

                    {isFunding &&
                        <Stack>
                            Funding Rounds
                        </Stack>
                    }

                    {isJobPost &&
                        <Stack sx={{ width: '80%', overflow: 'auto' }} pr={1}>
                            {companydetails.map((company: any) => (
                                <Box sx={{
                                    borderBottom: '#E6E6E6 1px solid',
                                    '&:hover': {
                                        backgroundColor: '#F7F7F7'
                                    }
                                }}>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                        {company.company.industry}
                                    </Typography>
                                    <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                        {company.company.location?.country} / {company.start_date}
                                    </Typography>
                                </Box>
                            ))}
                            {/* <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                    Director Business Planning
                                </Typography>
                                <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                    Los Angeles, California / Apr 29th 2023
                                </Typography>
                            </Box>
                            <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                    Intern
                                </Typography>
                                <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                    New York, New York / Apr 26th 2023
                                </Typography>
                            </Box>
                            <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                    Executive Producer
                                </Typography>
                                <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                    Bethpage, New York / Apr 21st 2023
                                </Typography>
                            </Box>
                            <Box sx={{ borderBottom: '#E6E6E6 1px solid' }}>
                                <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '16px', fontWeight: 600, p: 1 }}>
                                    SVP FP&A &
                                </Typography>
                                <Typography component='p' sx={{ color: '#474747', fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", sans-serif, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '14px', fontWeight: 400, p: 1 }}>
                                    Web Accelarators
                                </Typography>
                            </Box> */}
                        </Stack>
                    }

                    {isNews &&
                        <Stack>
                            News
                        </Stack>
                    }

                    {isEmployeeTrend &&
                        <Stack>
                            EmployeeTrend
                        </Stack>
                    }
                </Stack>
            </Card>
        </Stack>
    )
}

export default Research