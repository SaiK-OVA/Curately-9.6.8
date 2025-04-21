import  {React, useState, useMemo, useEffect, useCallback } from '../../../../shared/modules/React';
import CallReportMUIAutoComplete from './CallReportAutoComplete';
import { MUIAutoComplete } from '../../../shared/MUIAutoComplete/MUIAutoComplete';
import './CallReport.scss'
// import { MaterialReactTable, type MRT_ColumnDef, MRT_TableOptions } from "material-react-table";
import { MaterialReactTable, type MRT_ColumnDef, MRT_TableOptions } from "material-react-table";
import ApiService from '../../../../shared/api/api'
import {Button,IconButton,TextField} from '../../../../shared/modules/commonImports';
import {Tooltip} from '../../../../shared/modules/MaterialImports/ToolTip';
import {Typography} from '../../../../shared/modules/MaterialImports/Typography';
import Paper from '@mui/material/Paper';
import {Divider} from '../../../../shared/modules/MaterialImports/Divider';
import {Box} from '../../../../shared/modules/MaterialImports/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import {Stack} from '../../../../shared/modules/MaterialImports/Stack';
import { useFormik , Yup} from '../../../../shared/modules/Formik';
import { showToaster } from '../../../shared/SnackBar/SnackBar';

type FormValues = {
    teamId: any;
    teamName: string;
    managersId: string;
    managers: string;
    isActive: boolean,
};

const CallReport: React.FC = () => {
    const [showSecondTable, setShowSecondTable] = useState<boolean>(false);
    const [teamdata, setData] = useState<any>([]);
    const [teamId, setTeamId] = useState<any | null>(null);
    const [getTeamById, setGetTeamById] = useState<any>([]);
    const [getTeamDataId, setGetTeamDataById] = useState<any>([]);
    const [teamRecruitersId, setTeamRecruitersId] = useState<number | null>(0);
    const [managers, setManagers] = useState("");
    const [managersId, setManagersId] = useState("");

    useEffect(() => {
        fetchTeams()
    }, []);


    const formik = useFormik({
        initialValues: {
            teamId: '',
            teamName: '',
            managersId: '',
            managers: '',
            isActive: true,

        },
        validationSchema: Yup.object({
            teamName: Yup.string().required('Required'),
        }),
        onSubmit: (values: FormValues) => {
            addTeam(values);
        },
    });

    const handleSaveUpdateApiCall = (payload: any, isEditing: boolean) => {
        ApiService.postWithData(233, 'saveorupdateTeams', payload)
            .then((response: any) => {
                if (response.status === 200) {
                    fetchTeams();
                    formik.resetForm();
                    showToaster(isEditing ? 'Team updated successfully!' : 'Team added successfully!', 'success');
                } else {
                    showToaster(isEditing ? 'Error updating team!' : 'Error adding team!', 'error');
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                showToaster('Error occurred.', 'error');
            });
    };

    const addTeam = (values: FormValues, row?: any) => {
        console.log(values, row);
        const payload = {
            teamId: "0",  // Default to "0" when adding
            teamName: values.teamName,
            managersId: values.managersId,
            managers: values.managers,
            //isActive: true
        };

        console.log("Sending payload:", payload);
        handleSaveUpdateApiCall(payload, false)
    };
    const handleSaveRowTeamNameEdit: MRT_TableOptions<typeof teamdata[0]>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {
            values.managers = managers;
            values.managersId = managersId;
            const updatedData = [...teamdata];
            updatedData[row.index] = values;
            // console.log(row);
            // console.log(values);
            const payload = {
                teamId: row?.original?.teamId,
                teamName: values.teamName,
                managersId: managersId,
                managers: managers,
                //isActive: true
            };
            handleSaveUpdateApiCall(payload, true)
            exitEditingMode();
        };
    const handleDeleteTeam = useCallback(
        (teamId: number) => {
            ApiService.deleteById(233, `deleteTeams`, `${teamId}`).then((response: any) => {
                if (response.data.Success) {
                    const updatedTeams = teamdata.filter((team: any) => team.teamId !== teamId);
                    setData(updatedTeams);

                    // Show success toaster
                    showToaster('Team deleted successfully!', 'success');
                } else {
                    showToaster(response.data.Message, 'error');
                }
            }).catch(error => {
                console.error("Error deleting the team:", error);
                showToaster('Error occurred while deleting the team.', 'error');
            });
        },
        [teamdata],
    );

    const recruiterformik = useFormik({
        initialValues: {
            teamRecruitersId: '',
            fullName: '',
            recruiterId: '',
            extension: '',
            phoneNumber: ''
        },
        validationSchema: Yup.object({
            extension: Yup.string().required('Required'),
            phoneNumber: Yup.string()
                .matches(/^\d{10}$/, 'Must be between 10 digits')
                .required('Required')

        }),
        onSubmit: values => {
            addOrEditRecruiter(values);
        },
    });
    type RecruiterValues = {

        teamRecruitersId: string;
        fullName: string;
        recruiterId: string;
        extension: string;
        phoneNumber: string;
    };
    const addOrEditRecruiter = (values: RecruiterValues, row?: any) => {
        const isEditing = !!row;
        const payload = {
            teamId: teamId, // Use state variable teamId here
            teamRecruitersId: isEditing ? row?.original?.teamRecruitersId : '0',
            recruiterId: isEditing ? row.original.recruiterId : values.recruiterId,
            extension: values.extension,
            phoneNumber: values.phoneNumber
        };
        ApiService.postWithData(233, 'saveTeamRecruiter', payload)
            .then((response: any) => {
                // console.log(response);
                showToaster('Recruiter Saved successfully!', 'success');
                handleDataById(teamId)
            })
            .catch(error => {
                console.error("Error adding the recruiter:", error);

                showToaster('Error saving the recruiter.', 'error');
            });
        recruiterformik.resetForm();

    };

    const fetchTeams = () => {
        ApiService.getCall(233, 'getAllTeams').then((response: any) => {
            setData(response?.data?.teamsList);
        });
    };

    const handleDataById = (teamId: string) => {
        setTeamId(Number(teamId));
        console.log(teamId)
        ApiService.getCall(233, `getTeam/${teamId}`).then((response: any) => {
            // console.log(response?.data);
            setGetTeamDataById(response?.data)
            setGetTeamById(response?.data?.recruitersList);
            // console.log(getTeamById)
            setShowSecondTable(true)
        });

    };

    const columns: MRT_ColumnDef<(typeof teamdata)[0]>[] = useMemo(() => [{
        accessorKey: "teamName", header: "Team Name",
        Cell: ({ renderedCellValue, row }) => (
            <span className="hightLightTd" onClick={() => handleDataById(row.original.teamId)}>{row.original.teamName}</span>
        ),
    },

    {
        accessorKey: 'managers',
        header: 'Manager',
        size: 100,
        Cell: ({ renderedCellValue, row }) => {
            let managers = row.original.managers
                ? row.original.managers.toLowerCase()
                : "";
            let displayTitle =
                managers.length > 140 ? managers.slice(0, 140) + "..." : managers;
            return (
                managers.length > 140 ?
                    <Tooltip
                        title={row.original.managers}
                        classes={{ tooltip: "tt-capital" }}
                    >
                        <span>{displayTitle}</span>
                    </Tooltip>
                    :
                    <span>{displayTitle}</span>
            );
        },

        Edit: ({ cell, column, table }) => (
            <MUIAutoComplete
                id='editmanager'
                handleChange={(id: any, name: string) => {
                    setManagers(name);
                    setManagersId(id);
                    // formik.setFieldValue('managers', (name))
                    // formik.setFieldValue('managersId', (id))
                    // console.log(id, name)
                }}

                valuePassed={{
                    id: cell.row.original.managersId,
                    label: cell.row.original.managers
                }}
                isMultiple={true}
                width="200px"
                type='accuickId'

                placeholder="Select Manager"
            />)
    }
    ],
        [],
    );

    const callTeamcolumns: MRT_ColumnDef<(typeof getTeamById)[0]>[] = useMemo(
        () => [
            {
                accessorKey: "fullName",
                Edit: ({ cell, column, table }) => (
                    <MUIAutoComplete
                        id='edit-recruiter'
                        handleChange={(id: any, name: string) => {
                            recruiterformik.setFieldValue('fullName', (name))
                            recruiterformik.setFieldValue('recruiterId', (id))
                            //setAutoCompleteValue(id);
                        }}
                        isDisabled={true}
                        valuePassed={{
                            id: cell.row.original.recruiterId,
                            label: cell.row.original.fullName
                        }}
                        isMultiple={false}
                        width="200px"

                        type='id'
                        placeholder="Recruiter Name"

                    />


                ),
                header: "Name"
            },
            { accessorKey: "extension", header: "Extension" },
            { accessorKey: "phoneNumber", header: "PhoneNumber" },
        ], [],
    );

    const handleSaveRowRecruiterNameEdit: MRT_TableOptions<typeof getTeamById[0]>['onEditingRowSave'] =
        async ({ exitEditingMode, row, values }) => {

            // console.log(row, values);
            setTeamRecruitersId(row.original.teamRecruitersId);
            // console.log(row.original.teamRecruitersId)
            addOrEditRecruiter(values as RecruiterValues, row);
            exitEditingMode();
        };

    const handleDeleteRecruiter = useCallback(
        (teamRecruitersId: number, teamId: any) => {
            // console.log(teamRecruitersId)

            ApiService.deleteById(233, `deleteTeamRecruiters`, `${teamRecruitersId}`).then((response: any) => {
                if (response.data.Success) {
                    const updatedRecruiters = getTeamById.filter((team: any) => team.teamRecruitersId !== teamRecruitersId);
                    handleDataById(teamId)
                    showToaster('Recruiter deleted successfully!', 'success');
                    setGetTeamById(updatedRecruiters);
                }
                else {
                    showToaster(response.data.Message, 'error')
                }
            }).catch(error => {
                console.error("Error deleting the team:", error);
            });

        },
        [getTeamById],
    );

    return (
        <div id="callReportComponent">
            <Paper style={{ marginBottom: '20px', padding: '20px' }} className={showSecondTable ? 'd-none' : ""}>
                <div>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        p={2} >
                        <Typography variant='h6'>Manage Teams</Typography>
                        <Button variant='contained'>Save</Button>
                    </Stack>
                    <Divider />
                    <MaterialReactTable
                        columns={columns}
                        enableRowSelection
                        editDisplayMode="modal"
                        onEditingRowSave={handleSaveRowTeamNameEdit}
                        enableEditing
                        enableColumnActions={false}
                        positionActionsColumn="last"
                        data={teamdata}
                        enablePinning
                        initialState={{ columnPinning: { left: ['mrt-row-select'] }, density: 'compact', showGlobalFilter: true }}
                        enableDensityToggle={false}
                        enableFullScreenToggle={false}
                        enableGlobalFilterModes
                        columnResizeMode="onChange"
                        getRowId={(row) => row.teamName}
                        renderTopToolbarCustomActions={() => (
                            <div>
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <TextField
                                            id="outlined-basic"
                                            name="teamName"
                                            placeholder='Enter Team Name'
                                            size="small"
                                            value={formik.values.teamName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.teamName && Boolean(formik.errors.teamName)}
                                            helperText={formik.touched.teamName && formik.errors.teamName}
                                            sx={{ flex: 3, paddingLeft: "120px", paddingRight: "35px", marginLeft: "24px" }}
                                        />

                                        <div style={{ margin: 4 }}>
                                            <MUIAutoComplete
                                                id='Team'
                                                handleChange={(id: any, name: string) => {
                                                    formik.setFieldValue('managers', (name))
                                                    formik.setFieldValue('managersId', (id))
                                                }}
                                                valuePassed={
                                                    {
                                                        id: formik.values.managersId,
                                                        label: formik.values.managers,
                                                    }
                                                }
                                                isMultiple={true}
                                                width="200px"
                                                type='id'
                                                placeholder="Select Manager"
                                            />
                                        </div>
                                        <Button variant='contained' type="submit" sx={{ margin: '12px' }} >+Add</Button>
                                    </Stack>
                                </form>
                            </div>
                        )}
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <IconButton >
                                    <FormatListBulletedIcon />
                                </IconButton>
                                <Tooltip arrow placement="left" title="Edit">
                                    <IconButton onClick={() => table.setEditingRow(row)}
                                        sx={{ color: 'orange' }}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <IconButton onClick={() => handleDeleteTeam(row.original.teamId)}
                                    sx={{ color: 'red' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        )}
                    />  </div>
            </Paper>
            <Paper style={{ marginBottom: '20px', padding: '20px' }} className={showSecondTable ? '' : "d-none"}>
                <div>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        p={2}
                    >
                        <Typography variant='h6'>Manage Recruiters</Typography>
                        <Stack direction="row" justifyContent="flex-end" spacing={2}>
                            <Button variant='outlined' onClick={() => setShowSecondTable(false)}>Manage Teams</Button>
                            <Button variant='contained'>Save</Button>
                        </Stack>
                    </Stack>
                    <Divider />
                    <MaterialReactTable
                        columns={callTeamcolumns}
                        enableEditing
                        editDisplayMode='modal'
                        enableColumnActions={false}
                        positionActionsColumn="last"
                        enableRowSelection
                        onEditingRowSave={handleSaveRowRecruiterNameEdit}
                        data={getTeamById}
                        enablePinning
                        initialState={{ columnPinning: { left: ['mrt-row-select'] }, density: 'compact', showGlobalFilter: true }}
                        enableDensityToggle={false}
                        enableFullScreenToggle={false}
                        enableGlobalFilterModes
                        columnResizeMode="onChange"
                        getRowId={(row) => row.teamName}
                        renderTopToolbarCustomActions={() => (
                            <div style={{ padding: "20px" }}>
                                <Stack
                                    spacing={4}
                                    direction={"row"}
                                    alignItems="center"
                                    sx={{ paddingLeft: "120px" }}
                                >
                                    <Stack direction={"column"}>
                                        <small>Team Name</small>
                                        {getTeamDataId.teamName}
                                    </Stack>
                                    <Stack direction={"column"}>
                                        <small>Manager</small>
                                        {getTeamDataId.managers}
                                    </Stack>
                                </Stack>
                                <Divider />
                                <form onSubmit={recruiterformik.handleSubmit}>
                                    <Stack direction={"row"} spacing={4} sx={{ paddingLeft: "100px", paddingTop: '10px', paddingBottom: '12px' }} alignItems={"center"}>

                                        <CallReportMUIAutoComplete
                                            id='recruiter'
                                            handleChange={(id: any, name: string) => {
                                                recruiterformik.setFieldValue('fullName', (name))
                                                recruiterformik.setFieldValue('recruiterId', (id))
                                            }}
                                            valuePassed={{
                                                id: recruiterformik.values.recruiterId,
                                                label: recruiterformik.values.fullName
                                            }}
                                            isMultiple={false}
                                            width="200px"
                                            type='id'
                                            placeholder="Recruiter Name"
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            name="extension"
                                            placeholder='Extension'
                                            fullWidth
                                            size="small"
                                            value={recruiterformik.values.extension}
                                            onChange={recruiterformik.handleChange}
                                            onBlur={recruiterformik.handleBlur}
                                            error={recruiterformik.touched.extension && Boolean(recruiterformik.errors.extension)}
                                            helperText={recruiterformik.touched.extension && recruiterformik.errors.extension}
                                            sx={{ flex: 3, paddingLeft: 19, marginLeft: 3 }}
                                        />
                                        <TextField
                                            id="outlined-basic"
                                            name="phoneNumber"
                                            placeholder='Phone number'
                                            size="small"
                                            value={recruiterformik.values.phoneNumber}
                                            onChange={recruiterformik.handleChange}
                                            onBlur={recruiterformik.handleBlur}
                                            error={recruiterformik.touched.phoneNumber && Boolean(recruiterformik.errors.phoneNumber)}
                                            helperText={recruiterformik.touched.phoneNumber && recruiterformik.errors.phoneNumber}
                                            sx={{ flex: 4, paddingLeft: 19, marginLeft: 3 }}
                                        />
                                        <Button variant='contained' type="submit" sx={{ padding: '7px' }} >+Add</Button>
                                    </Stack>
                                    <Divider />
                                </form>
                            </div>
                        )}
                        renderRowActions={({ row, table }) => (
                            <Box sx={{ display: 'flex', gap: '1rem' }}>
                                <Tooltip arrow placement="left" title="Edit">
                                    <IconButton onClick={() => table.setEditingRow(row)}
                                        sx={{ color: 'orange' }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <IconButton onClick={() => handleDeleteRecruiter(row.original.teamRecruitersId, row.original.teamId)}
                                    sx={{ color: 'red' }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        )}
                    />
                </div>
            </Paper>
        </div>
    );
}
export default CallReport;

