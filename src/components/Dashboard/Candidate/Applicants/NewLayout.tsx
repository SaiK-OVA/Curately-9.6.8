import { Dialog, DialogActions, DialogContent, DialogTitle } from "../../../../shared/modules/MaterialImports/Dialog";
import { Divider } from "../../../../shared/modules/MaterialImports/Divider";
import { useEffect, useMemo, useState } from "../../../../shared/modules/React";
import { Button, Grid, IconButton } from "../../../../shared/modules/commonImports";
import { Loader } from "../../../shared/Loader/Loader";
// import  from "@mui/material/DialogActions";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import WorkIcon from '@mui/icons-material/Work';
import ApiService from '../../../../shared/api/api';
import { Accordion, AccordionDetails, AccordionSummary } from '../../../../shared/modules/MaterialImports/Accordion';
import { Box } from "../../../../shared/modules/MaterialImports/Box";
import { CloseIcon } from "../../../../shared/modules/MaterialImports/Dialog";
import { Checkbox } from '../../../../shared/modules/MaterialImports/FormElements';
import { FormGroup } from '../../../../shared/modules/MaterialImports/FormGroup';
import { FormControlLabel } from '../../../../shared/modules/MaterialImports/FormInputs';
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { MaterialReactTable, type MRT_ColumnDef } from "../../../../shared/modules/MaterialReactTable";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import { userLocalData } from "../../../../shared/services/userData";
import { showToaster } from "../../../shared/SnackBar/SnackBar";
import './NewLayout.scss';


type ILayoutType = "APPLICANTS" | "JOBS" | "COMMUNITY";

const NewLayout = ({ open, closePopup, layoutType, allLayoutData, userLayoutData }: {
    open: boolean;
    closePopup: any;
    layoutType: ILayoutType,
    allLayoutData: any[],
    userLayoutData: any[],
}) => {
    const [rowSelection, setRowSelection] = useState({});
    const [layoutData, setLayoutData] = useState<any[]>([]);
    const [fixedColumns, setFixedColumns] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
    const [checkedColumnsList, setCheckedColumnsList] = useState<{ name: string, isactive: boolean, key: string, checked: boolean, type: string }[]>([]);
    const [columns, setColumns] = useState<MRT_ColumnDef<any>[]>([]);

    useEffect(() => {
        if (!!checkedColumnsList?.length) {
            setColumns(() => checkedColumnsList.map((each: any) => ({ "accessorKey": each.key, "header": each.name })));
        }
    }, [checkedColumnsList]);

    useEffect(() => {
        setLayoutData(allLayoutData || []);
        setCheckedColumnsList(userLayoutData || [])
        if (!!allLayoutData?.length && !!userLayoutData?.length) {
            const tempUnCheckedColumnsList = allLayoutData.filter((each) => {
                return userLayoutData.every((data: any) => data.name !== each.name)
            }).map((each: any) => ({
                name: each.name, key: each.key, isactive: each.isactive, checked: false
            }));
            setFixedColumns(() => userLayoutData.concat(tempUnCheckedColumnsList))
        } else if (!!userLayoutData?.length) {
            let tempLayoutList = userLayoutData.map((each: any) => ({
                name: each.name,
                key: each.key,
                isactive: false,
                checked: ((each?.name && each?.key) ? true : false),
                type: each.type
            }));
            setFixedColumns([...tempLayoutList]);
        } else if (!!allLayoutData?.length) {
            let tempLayoutList = allLayoutData.map((each: any) => ({
                name: each.name,
                key: each.key,
                isactive: each.isactive,
                checked: each.isactive,
                type: each.type
            }));
            setFixedColumns([...tempLayoutList]);
        } else return;
    }, [allLayoutData, userLayoutData]);

    const saveForm = () => {

        const saveData = {
            clientId: userLocalData.getvalue("clientId"),
            userId: userLocalData.getvalue("recrId"),
            visibility: true,
            layoutJson: checkedColumnsList.map((each: any) => {
                delete each?.type;
                return each
            }),
            layoutName: "",
        };
        const endPoint = layoutType === "APPLICANTS" ? 'saveApplicantsLayout' :
            layoutType === "JOBS" ? "saveJobLayout" :
                layoutType === "COMMUNITY" ? "saveCommunityLayout" : "";

        trackPromise(
            ApiService.postWithData("admin", endPoint, saveData).then(
                (response: any) => {
                    if (response.data.Success) {
                        showToaster((response.data.Message), "success")
                        closePopup();
                    } else {
                        showToaster((response.data.Message) ? response.data.Message : "An error occured while saving the Applicants Layout.", 'error')
                    }
                }
            )
        )
    }

    const handleCheckboxChange = (columnName: string) => {
        let tempColumns = fixedColumns;
        let tempCheckedColumns = checkedColumnsList;
        let columnIndex = tempColumns.findIndex((each) => each.name === columnName);
        if (columnIndex >= 0) {
            let [splicedColumn] = tempColumns.splice(columnIndex, 1);
            tempColumns.push({
                ...splicedColumn,
                checked: !splicedColumn.checked
            });

            // Handling Checked Columns
            if (splicedColumn.checked) {
                let checkedIndex = tempCheckedColumns.findIndex((each) => each.name === splicedColumn.name);
                if (checkedIndex >= 0) tempCheckedColumns.splice(checkedIndex, 1)
            } else {
                tempCheckedColumns.push({
                    name: splicedColumn.name, key: splicedColumn.key, isactive: splicedColumn.isactive, checked: true, type: splicedColumn.type
                })
            }

            setFixedColumns([...tempColumns]);
            setCheckedColumnsList([...tempCheckedColumns])
        }
    };

    const handleDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        let reorderedColumns = Array.from(checkedColumnsList);
        const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
        reorderedColumns.splice(result.destination.index, 0, movedColumn);
        setCheckedColumnsList(reorderedColumns);
    };

    const uncheckedColumnsList = useMemo(() => {
        return fixedColumns.filter((each) => !each.checked)
    }, [fixedColumns]);

    return (

        <Dialog
            onClose={closePopup}
            maxWidth={'xl'}
            fullWidth={true} open={open} id='NewLayout'
            sx={{ minHeight: "220px" }}
        >
            <Loader />
            <DialogTitle
                className='py-2'
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <span className='addHeader'>
                        Layout
                    </span>
                    <div>
                        <Grid
                            container
                            direction="row"
                            justifyContent="end"
                            alignItems="center"
                        >
                            <CloseIcon onClick={closePopup} />

                        </Grid>
                    </div>
                </Grid>
            </DialogTitle>
            <Divider />
            <DialogContent >
                <Grid container spacing={0} className="customCard p-0 filterExpand-grid">
                    <Grid sx={{ width: 410, overflow: 'auto', opacity: 1 }}>
                        {/* <Card
                            className="cardStyle cursorPointer px-1"
                        // onClick={(e) => checkStageToOpen(e, stage)}
                        > */}
                        <Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                            className="filterListTab"
                        >
                            <DragDropContext
                                onDragEnd={handleDragEnd}
                            >
                                <Droppable droppableId="droppable">
                                    {(provided) => (
                                        <FormGroup
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {checkedColumnsList.map((columnKey, index) => (
                                                <Draggable key={columnKey.name} draggableId={columnKey.name} index={index} isDragDisabled={!columnKey.checked}>
                                                    {(provided) => (
                                                        <Stack
                                                            sx={{
                                                                minWidth: 380, mb: "10px",
                                                                border: '1px solid #cacacc',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: "space-between"
                                                            }}
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            direction="row"
                                                            spacing={2}
                                                        >

                                                            <FormControlLabel
                                                                control={<Checkbox checked={columnKey.checked}
                                                                    disabled={columnKey.isactive}
                                                                    onChange={() => handleCheckboxChange(columnKey.name)} />}
                                                                // label={columnKey.charAt(0).toUpperCase() + columnKey.slice(1)}
                                                                label={columnKey.name}
                                                                sx={{ marginLeft: "10px", opacity: 1 }}
                                                            />
                                                            <IconButton
                                                                sx={{ marginLeft: "190px" }} disabled={!columnKey.checked}
                                                                {...provided.dragHandleProps}>
                                                                <DragHandleIcon htmlColor={columnKey.isactive ? "#757575" : "#313131"} />
                                                            </IconButton>
                                                        </Stack>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder} {/* Required to ensure proper spacing */}
                                        </FormGroup>
                                    )}
                                </Droppable>
                            </DragDropContext>

                            <div style={{ height: "50px" }}>
                                <Accordion sx={{ width: "380px" }} >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                        sx={{ padding: "0px" }}
                                    >
                                        <Typography variant="subtitle2">
                                            <IconButton aria-label="Others" sx={{ padding: "4px" }} >
                                                <WorkIcon />
                                            </IconButton>
                                            Others
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ width: "380px" }}>
                                        {!!uncheckedColumnsList?.length ? <FormGroup>
                                            {uncheckedColumnsList.map((label, index) => (
                                                <Box key={index} sx={{ minWidth: 280, mb: "10px", border: '1px solid #cacacc' }}>
                                                    <FormControlLabel
                                                        control={<Checkbox checked={label.checked}
                                                            onChange={() => handleCheckboxChange(label.name)}
                                                        />}
                                                        label={label.name}
                                                        sx={{ marginLeft: "10px" }}
                                                    />
                                                </Box>
                                            ))}
                                        </FormGroup>
                                            : <Typography textAlign={"center"}>No items found</Typography>}
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </Grid>

                    </Grid>
                    <Grid sx={{ width: 'calc(100% - 410px)', border: '1px solid #cacacc', borderRadius: "3px" }}>
                        <div className="MRTableCustom pl-0">
                            <MaterialReactTable
                                key={columns.map((col: any) => col.accessorKey).join('-')}
                                columns={columns}
                                data={[]}
                                onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
                                state={{ rowSelection }} //pass our managed row selection state to the table to use
                                enablePinning
                                enableStickyHeader
                                initialState={{
                                    // columnPinning: { left: ['mrt-row-select', 'name'] },
                                    density: 'compact',
                                    // columnVisibility: { jobStatus: true }
                                    // showGlobalFilter: true,
                                }}
                                enableColumnResizing
                                // enableGlobalFilterModes
                                // columnResizeMode="onChange"
                                icons={{
                                    ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                                }}


                            />
                        </div>
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider />

            <DialogActions>
                <Button variant="contained" onClick={saveForm}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )

}
export default NewLayout;

