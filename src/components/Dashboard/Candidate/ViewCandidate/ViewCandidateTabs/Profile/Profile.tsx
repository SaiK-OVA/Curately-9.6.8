import { useEffect, useState } from '../../../../../../shared/modules/React';
import { DateTime } from '../../../../../../shared/modules/Luxon';
import { Stack } from '../../../../../../shared/modules/MaterialImports/Stack';
import { Card } from '../../../../../../shared/modules/MaterialImports/Card';
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { Typography } from '../../../../../../shared/modules/MaterialImports/Typography';
import { LANGUAGES } from '../../../../../../shared/data/Community/Community';
import ParseHTML from '../../../../../../shared/utils/ParseHTML';

import './Profile.scss';

// import DOMPurify from 'dompurify';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import ReplyIcon from '@mui/icons-material/Reply';
// import styled from '@emotion/styled';
// import { useState } from 'react';
// import askLogo from "./ask-staffing.webp";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddEmployement from './AddEmployement';
// import AddEducation from './AddEducation';
// import AddTrainingModal from './AddTrainingModal/AddTrainingModal';
// import AddLicenseModal from '../Profile/AddLicenseModal/AddLicenseModal';
// import AddLanguageModal from '../Profile/AddLanguageModal/AddLanguageModal';
// import AddSocialLinksModal from '../Profile/AddSocialLinksModal/AddSocialLinksModal';
// import AddSkillModal from '../Profile/AddSkillModal/AddSkillModal';
// import JsonData from './Candidate Profile.json';
// import { confirmDialog } from '../../../../../shared/ConfirmDialog/ConfirmDialog';
// import { DateTime } from 'luxon';

// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

// export interface Employment {
//     userEmploymentID: number;
//     userID: number;
//     companyName: string;
//     workAddress: string;
//     jobTitle: string;
//     startDate: string;
//     endDate: string;
//     empResponsibilities: string;
//     currentCompany: boolean;
//     isManual: boolean;
//     modifiedDateTime: string;
//     orderBy: number;
// };



const Profile = ({ add, candidateData }: { add: boolean, candidateData: any }) => {
    const overviewData = candidateData ? candidateData : {};
    const [dataToSummary, setDataToSummary] = useState('');


    // const [openAddEmpModal, setOpenAddEmpModal] = useState(false);
    // const [selectedEmployeeRecord, setSelectedEmployeeRecord] = useState({});
    // const [selectedEducationRecord, setSelectedEducationRecord] = useState({});


    // const [openAddEduModal, setOpenAddEduModal] = useState(false);

    // const [updateEmp, setUpdateEmp] = useState("add");

    // const handleEmpPopupOpen = (addstring: any) => {
    //     setUpdateEmp(addstring);
    //     setOpenAddEmpModal(true);
    // };

    // const [updateEdu, setUpdateEdu] = useState("add");

    // const handleEduPopupOpen = (addstring: any) => {
    //     setUpdateEdu(addstring);
    //     setOpenAddEduModal(true);
    // };
    // const [openAddSkillModal, setOpenAddSkillModal] = useState(false);
    // const [updateSkill, setUpdateSkill] = useState("add");
    // const [selectedSkillRecord, setSelectedSkillRecord] = useState({});
    // const handleSkillPopupOpen = (addstring: any) => {
    //     setUpdateSkill(addstring);
    //     setOpenAddSkillModal(true);
    // };


    // const [openAddLicenseModal, setOpenAddLicenseModal] = useState(false);
    // const [updateLicense, setUpdateLicense] = useState("add");
    // const [selectedLicenseRecord, setSelectedLicenseRecord] = useState({});
    // const handleLicensePopupOpen = (addstring: any) => {
    //     setUpdateLicense(addstring);
    //     setOpenAddLicenseModal(true);
    // };

    // const [updateTraining, setUpdateTraining] = useState("add");
    // const [openAddTrainingModal, setOpenAddTrainingModal] = useState(false);
    // const [selectedTrainingRecord, setSelectedTrainingRecord] = useState({});
    // const handleTrainingPopupOpen = (addstring: any) => {
    //     setUpdateTraining(addstring);
    //     setOpenAddTrainingModal(true);
    // };

    // const [updateSocialLinks, setUpdateSocialLinks] = useState("add");
    // const [openAddSocialLinksModal, setOpenAddSocialLinksModal] = useState(false);
    // const [selectedSocialLinkRecord, setSelectedSocialLinksRecord] = useState({});
    // const handleSocialLinksPopupOpen = (addstring: any) => {
    //     setUpdateSocialLinks(addstring);
    //     setOpenAddSocialLinksModal(true);
    // };


    // const [updateLanguage, setUpdateLanguage] = useState("add");
    // const [openAddLanguageModal, setOpenAddLanguageModal] = useState(false);
    // const [selectedLanguageRecord, setSelectedLanguageRecord] = useState({});
    // const handleLanguagePopupOpen = (addstring: any) => {
    //     setUpdateLanguage(addstring);
    //     setOpenAddLanguageModal(true);
    // };
    interface SkillInterface {
        isManual: boolean;
        skillID: number;
        skillLevelID: number;
        skillName: string;
        userId: number;
        userSkillID: number;
    }
    interface CertificationInterface {
        authorityName: string;
        certName: string;
        certTypeLookupID: number;
        completedYear: string;
        credentialID: string;
        isManual: boolean;
        modifiedDateTime: string;
        userCertID: number;
        userID: number;
    }
    interface TrainingInterface {
        completedYear: string;
        fileID: number;
        fileName: string;
        institutionName: string;
        isManual: boolean;
        modifiedDateTime: string;
        trainingName: string;
        trainingTypeLookupID: number;
        userId: number;
        userTrainingID: number;
    }
    interface SocialInterface {
        isManual: boolean;
        socialTypeLookupID: number;
        socialURL: string;
        userId: number;
        userSocialID: number;
    }
    interface LanguageInterface {
        isManual: boolean;
        langCode: string;
        langExpertLookupID: boolean;
        modifiedDateTime: string;
        userID: boolean;
        userLangID: boolean;
    }
    interface EducationInterface {
        degreeCompletionDate: string;
        degreeName: string;
        degreeType: string;
        isManual: boolean;
        modifiedDateTime: string;
        schoolName: string;
        userEducationID: number;
        userID: number;
    }

    const getLanguage = (val: string) => {
        let tempLanguage = LANGUAGES.find(i => { return i.id === val });
        return (tempLanguage && tempLanguage.label) ? tempLanguage.label : "";
    }

    const removeJunkText = (val: string) => {
        // eslint-disable-next-line no-useless-escape
        return val ? val.replace(/[^A-Za-z 0-9 \.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, '') : "";
    }

    // useEffect(() => {
    //     let tempDataToShow = "";
    //     if (overviewData && overviewData.summary) {
    //         console.log('overviewData12', overviewData)
    //         tempDataToShow = overviewData.summary.trim().replaceAll('\n', ' <br> ');
    //         tempDataToShow = tempDataToShow.replaceAll('*\t', ' <br>* ');
    //         tempDataToShow = removeJunkText(tempDataToShow);
    //     }

    //     setDataToSummary(tempDataToShow);
    // }, [overviewData]);


    useEffect(() => {

        let tempDataToShow = (overviewData && overviewData.summary.trim()) ? overviewData.summary.trim().replaceAll('\n', ' <br> ') : "";
        tempDataToShow = (tempDataToShow && tempDataToShow.trim()) ? tempDataToShow.trim().replaceAll('*\t', ' <br>* ') : "";
        tempDataToShow = removeJunkText(tempDataToShow);
        setDataToSummary(tempDataToShow);
    })
    // const sanitizedData = () => ({
    //     //{ __html: overviewData.summary }
    //     __html: DOMPurify.sanitize(dataToSummary)
    //   })

    return (
        (<div className='profile'>
            <Box sx={{ maxHeight: "500px", overflow: "auto" }}>
                {/* <Card className='card pb-3'>
                    <Grid container spacing={2} sx={{ padding: "20px" }}>
                        <Grid size={2}>
                            <img src={askLogo} alt="react logo" width={104} height={104} />
                        </Grid>
                        <Grid size={5}>
                            <Stack direction="column" spacing={1} >
                                <div className='name-text'>Aditya kumar</div>
                                <div>Location</div>
                                <TextField
                                    size="small"
                                    id="Status"
                                    name='Status'
                                    variant="outlined"
                                    defaultValue="an"
                                    select

                                >
                                    <MenuItem value="an">Available Now</MenuItem>
                                    <MenuItem value="as">Available Soon</MenuItem>
                                    <MenuItem value="pl">Passively Looking</MenuItem>
                                    <MenuItem value="nl">Not Looking</MenuItem>

                                </TextField>
                            </Stack>
                        </Grid>
                        <Grid size={5}>
                            <Stack direction="row" spacing={2} >
                                <Button className='sidebtns' variant="outlined">Download</Button>
                                <Button className='sidebtns' variant="outlined">View profile</Button>
                                <Button className='sidebtns' variant="outlined">Edit</Button>
                            </Stack>

                            <Button className='sidebtns1' variant="text"><ReplyIcon />Share</Button>

                        </Grid>

                    </Grid>
                </Card> */}
                {/* <Card className='card pb-3'>
                    <Typography className='header'>Resume</Typography>
                    <Stack
                        direction="column"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        spacing={2}
                    >
                        <Button component="label" className='sidebtns' variant="outlined">
                            Replace
                            <VisuallyHiddenInput type="file" />
                        </Button>
                        <Typography variant='subtitle1'>Supported upload formats: 2MB max in .DOC, .DOCX, or .PDF</Typography>
                    </Stack>
                </Card> */}
                {
                    (dataToSummary && ParseHTML.ExtractText(dataToSummary)) ?
                        <Card className='card pb-3'>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                            >
                                <Typography className='header'>Career Summary</Typography>
                                {/* <ModeEditIcon /> */}
                            </Stack>
                            <div style={{ padding: "20px" }} dangerouslySetInnerHTML={{ __html: dataToSummary }}></div>
                        </Card>
                        :
                        null
                }
                <Card className='card pb-3'>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}

                    >
                        <Typography className='header'>Employment History</Typography>
                        {/* <Button className='skills' color="primary" size="small" onClick={() => { setSelectedEmployeeRecord({}); handleEmpPopupOpen("add") }} >+ Add Employment </Button> */}
                    </Stack>
                    <div className='w-100 pl-5'>
                        {overviewData?.workHistory?.map((work: any, i: number) => (
                            <div key={i}>
                                <div className='historyBlock'>
                                    <Typography className='tt-capital' variant='h5'>{work.companyName ? work.companyName.replace(/\\|\//g, ' ') : ""}</Typography>
                                    <Typography className='tt-capital'>{work.jobTitle ? work.jobTitle.replace(/\\|\//g, ' ') : ""}</Typography>
                                    <Typography component='span'>
                                        {work.startDate && DateTime.fromFormat(work.startDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(work.startDate.substring(0, 7), 'yyyy-MM').toFormat('MMM yyyy') : ""}
                                        {work.startDate && DateTime.fromFormat(work.startDate.substring(0, 7), 'yyyy-MM').isValid && work.endDate && DateTime.fromFormat(work.endDate.substring(0, 7), 'yyyy-MM').isValid ? " to " : ""}
                                        {work.endDate && DateTime.fromFormat(work.endDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(work.endDate.substring(0, 7), 'yyyy-MM').toFormat('MMM yyyy') : ""}
                                    </Typography>

                                    {/* <Typography component='span'>{work.startDate ? work.startDate : ""} to {work.endDate ? work.endDate : ""}</Typography> */}
                                </div>
                            </div>
                        ))}


                    </div>
                </Card>
                <Card className='card pb-3'>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}

                    >
                        <Typography className='header'>Education</Typography>
                        {/* <Button className='skills' color="primary" size="small" onClick={() => { setSelectedEducationRecord({}); handleEduPopupOpen("add") }}>+ Add Education</Button> */}
                    </Stack>
                    <div className='w-100 pl-5'>
                        {
                            overviewData?.EducationList?.map((list: EducationInterface) => {
                                return (
                                    (<Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        key={list.userEducationID}
                                    >
                                        <div className='historyBlock'>
                                            <Typography className='tt-capital' variant='h5'>{list.degreeName !== 'null' ? list.degreeName.replace(/\\|\//g, ' ') : ""}</Typography>
                                            <Typography className='tt-capital'>{list.degreeType ? list.degreeType.replace(/\\|\//g, ' ') : ""}</Typography>
                                            <Typography component='span'>
                                                {list.degreeCompletionDate && DateTime.fromFormat(list.degreeCompletionDate.substring(0, 7), 'yyyy-MM').isValid ? DateTime.fromFormat(list.degreeCompletionDate.substring(0, 7), 'yyyy-MM').toFormat('MMM yyyy') : ""}
                                            </Typography>
                                        </div>
                                        {/* <span className='fs-14 tt-capital ml-4 mb-2'>
                                        {list.degreeName}<br></br>
                                        {list.degreeType}<br></br>
                                        {(list.degreeCompletionDate.startsWith('1900-01-01')) ? "" : DateTime.fromFormat(list.degreeCompletionDate.substring(0, 10), 'yyyy-MM-dd').toFormat('MM/dd/yyyy')}
                                    </span> */}
                                    </Stack>)
                                );
                            })
                        }
                    </div>

                </Card>

                <div>
                    <Card className='card pb-3'>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography className="header">
                                Skills
                            </Typography>
                            <Stack direction="row" className="btn-container" spacing={1}>
                                {/* <Button className='skills' color="primary" onClick={() => { setSelectedSkillRecord({}); handleSkillPopupOpen("add") }} size="small">+ Add Skill</Button> */}
                            </Stack>
                        </Stack>
                        <div className='w-100 pl-5'>
                            {
                                overviewData?.skillsList?.map((list: SkillInterface) => {
                                    return (
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            key={list.skillID}
                                        >
                                            <span className='fs-14 tt-capital'>
                                                {list.skillName}
                                            </span>
                                            {/* <span className="btn-container" >
                                                <EditIcon onClick={() => {
                                                    setSelectedSkillRecord(list);
                                                    handleSkillPopupOpen("update")
                                                }} className='mr-2 c-grey cursor-pointer' />
                                                <DeleteIcon className='c-grey cursor-pointer' onClick={() => {
                                                    confirmDialog('Are you sure you want to delete this skill record?', () => {
                                                        "warning"
                                                    }
                                                    );
                                                }} />
                                            </span> */}
                                        </Stack>
                                    )
                                })
                            }
                        </div>
                    </Card>
                </div>

                <Card className='card pb-3'>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ minHeight: 'auto !important' }}
                    >
                        <Typography variant="h6" className="header">
                            License & Certification
                        </Typography>
                        <Stack direction="row" className="btn-container" spacing={1}>
                            {/* <Button className='skills' color="primary" onClick={() => { setSelectedLicenseRecord({}); handleLicensePopupOpen("add") }} size="small">+ Add License & Certification</Button>
                                    // href="#/job/add" */}
                        </Stack>
                    </Stack>
                    <div className='w-100'>
                        {
                            overviewData?.CertList?.map((list: CertificationInterface) => {
                                return (
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <span className='fs-14 tt-capital ml-4'>
                                            {list.certName}
                                            {/*      */}
                                        </span>
                                        {/* <span className="btn-container" >
                                            <EditIcon className='mr-2 c-grey cursor-pointer' onClick={() => { setSelectedLicenseRecord(list); handleLicensePopupOpen("update") }} />
                                            <DeleteIcon className='c-grey cursor-pointer' onClick={() => {
                                                confirmDialog('Are you sure you want to delete this license & certification record?', () => {
                                                    "warning"
                                                }
                                                );
                                            }} />
                                        </span> */}
                                    </Stack>
                                )
                            })
                        }
                    </div>
                </Card>

                <Card className='card pb-3'>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ minHeight: 'auto !important' }}
                    >
                        <Typography variant="h6" className="header">
                            Trainings
                        </Typography>
                        <Stack direction="row" className="btn-container" spacing={1}>
                            {/* <Button className='skills' color="primary" onClick={() => { setSelectedTrainingRecord({}); handleTrainingPopupOpen("add") }} size="small" >+ Add Training</Button> */}
                        </Stack>
                    </Stack>
                    {
                        overviewData?.TrainingList?.map((list: TrainingInterface) => {
                            return (
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                >
                                    <span className='fs-14 tt-capital ml-4'>
                                        {list.institutionName}

                                    </span>
                                    {/* <span className="btn-container" >
                                            <EditIcon className='mr-2 c-grey cursor-pointer' onClick={() => { setSelectedTrainingRecord(list); handleTrainingPopupOpen("update") }} />
                                            <DeleteIcon className='c-grey cursor-pointer' onClick={() => {
                                                confirmDialog('Are you sure you want to delete this license & certification record?', () => {
                                                    "warning"
                                                }
                                                );
                                            }} />
                                        </span> */}
                                    {/* <Typography variant="h6" className="header" style={{ fontWeight: '400' }}>
                                                Professional - Test
                                            </Typography>
                                            <Stack direction="row" className="btn-container" spacing={1}>
                                                <Button style={{ color: '#969eb5' }} className='skills'
                                                    size="small"
                                                // href="#/job/add"
                                                >
                                                    <EditIcon onClick={() => { setSelectedTrainingRecord(list); handleTrainingPopupOpen("update") }} />
                                                    <DeleteIcon onClick={() => {
                                                        confirmDialog('Are you sure you want to delete this training record?', () => {
                                                            "warning"
                                                        }
                                                        );
                                                    }} />
                                                </Button>
                                            </Stack> */}
                                </Stack>

                            )
                        })
                    }
                    {/* 
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ minHeight: 'auto !important' }}
                            >
                                <Typography variant="h6" className="header" style={{ color: '#969eb5', fontWeight: '400' }} >
                                    Test
                                </Typography>
                            </Stack> */}
                </Card>

                <Card className='card pb-3'>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography className="header">
                            Social Links
                        </Typography>

                        {/* <Button className='skills' color="primary" onClick={() => { setSelectedSocialLinksRecord({}); handleSocialLinksPopupOpen("add") }} size="small">+ Add Social Links</Button> */}

                    </Stack>
                    {
                        overviewData?.SocialDetailsList?.map((list: SocialInterface) => {
                            return (
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                    key={list.userSocialID}
                                >
                                    <span className='fs-14 tt-lower ml-4'>
                                        {list.socialURL}
                                    </span>
                                    {/* <span className="btn-container" >
                                        <EditIcon onClick={() => { setSelectedSocialLinksRecord(list); handleSocialLinksPopupOpen("update") }}
                                            className='mr-2 c-grey cursor-pointer' />
                                        <DeleteIcon
                                            className='c-grey cursor-pointer'
                                            onClick={() => {
                                                confirmDialog('Are you sure you want to delete this social link record?', () => {
                                                    "warning"
                                                }
                                                );
                                            }} />

                                    </span> */}
                                </Stack>

                            )
                        })
                    }
                </Card>


                <Card className='card pb-3'>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography className="header">
                            Languages
                        </Typography>

                        {/* <Button className='skills' onClick={() => { setSelectedLanguageRecord({}); handleLanguagePopupOpen("add") }} color="primary" size="small" >+ Add Languages</Button> */}
                    </Stack>

                    {
                        overviewData?.LanguageDetailsList?.map((list: LanguageInterface) => {
                            return (
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    sx={{ minHeight: 'auto !important' }}
                                    key={list.langCode}
                                >
                                    <span className='fs-14 tt-capital ml-4'>
                                        {getLanguage(list.langCode)}
                                    </span>
                                    {/* <span className="btn-container" >
                                            <EditIcon onClick={() => { setSelectedLanguageRecord(list); handleLanguagePopupOpen("update") }}
                                                className='mr-2 c-grey cursor-pointer' />
                                            <DeleteIcon
                                                className='c-grey cursor-pointer' onClick={() => {
                                                    confirmDialog('Are you sure you want to delete this language record ?', () => {
                                                        "warning"
                                                    }
                                                    );
                                                }} />
                                        </span> */}
                                </Stack>
                            )
                        })
                    }
                </Card>

                {/* {openAddEmpModal ? (
                    <AddEmployement
                        open={openAddEmpModal}
                        closePopup={() => setOpenAddEmpModal(false)}
                        add={updateEmp === "add" ? true : false}
                        employeeData={selectedEmployeeRecord}
                    />
                ) : null}
                {openAddEduModal ? (
                    <AddEducation
                        open={openAddEduModal}
                        closePopup={() => setOpenAddEduModal(false)}
                        add={updateEdu === "add" ? true : false}
                        educationData={selectedEducationRecord}
                    />
                ) : null}

                {openAddSkillModal ? (
                    <AddSkillModal
                        open={openAddSkillModal}
                        closePopup={() => setOpenAddSkillModal(false)}
                        add={updateSkill === "add" ? true : false}
                        skillData={selectedSkillRecord}
                    />
                ) : null}


                {openAddLicenseModal ? (
                    <AddLicenseModal
                        open={openAddLicenseModal}
                        closePopup={() => setOpenAddLicenseModal(false)}
                        add={updateLicense === "add" ? true : false}
                        licenseData={selectedLicenseRecord}
                    />
                ) : null}
                {openAddTrainingModal ? (
                    <AddTrainingModal
                        open={openAddTrainingModal}
                        closePopup={() => setOpenAddTrainingModal(false)}
                        add={updateTraining === "add" ? true : false}
                        trainingData={selectedTrainingRecord}
                    />
                ) : null}


                {openAddSocialLinksModal ? (
                    <AddSocialLinksModal
                        open={openAddSocialLinksModal}
                        closePopup={() => setOpenAddSocialLinksModal(false)}
                        add={updateSocialLinks === "add" ? true : false}
                        socialLinksData={selectedSocialLinkRecord}
                    />
                ) : null}

                {openAddLanguageModal ? (
                    <AddLanguageModal
                        open={openAddLanguageModal}
                        closePopup={() => setOpenAddLanguageModal(false)}
                        add={updateLanguage === "add" ? true : false}
                        languageData={selectedLanguageRecord}
                    />
                ) : null} */}
            </Box>
        </div>)
    );
}
export default Profile;