import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { CloseOutlined, DragIndicatorRounded, RestartAlt, SearchOutlined } from '@mui/icons-material';
import { Button, Checkbox, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import ApiService from "../../../../shared/api/api";
import { Grid } from '../../../../shared/modules/commonImports';
import { FormGroup } from '../../../../shared/modules/MaterialImports/FormGroup';
import { List, ListItem, ListItemIcon, ListItemText } from '../../../../shared/modules/MaterialImports/List';
import { Menu } from '../../../../shared/modules/MaterialImports/Menu';
import { userLocalData } from '../../../../shared/services/userData';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import "./NewLayoutMenu.scss";


interface IColumnsData { name: string, isactive: boolean, key: string, checked: boolean, type: string };

interface INewLayoutMenuProps {
    open: boolean;
    handleClosemenu: { (): void };
    columnsData: IColumnsData[];
    handleColumnAction: { (data: any[]): void };
    layoutType: "applicants" | "jobs" | "community",
    pinnedColumn: string,
    resetLayout?: () => void;
}

const NewLayoutMenu = forwardRef((props: INewLayoutMenuProps, ref: any) => {
    const { open, handleClosemenu, columnsData, handleColumnAction, layoutType, pinnedColumn, resetLayout } = props;
    const [unCheckedSearch, setUnCheckedSearch] = useState("");
    const [checkedColumns, setCheckedColumns] = useState<IColumnsData[]>([]);

    const unCheckedColumns = useMemo(() => {
        const unCheckedData = columnsData.filter((item: IColumnsData) => !item.checked);
        if (![null, "", undefined].includes(unCheckedSearch)) {
            return unCheckedData.filter((each) => each.name.toLowerCase().includes(unCheckedSearch.toLowerCase()))
        } else return unCheckedData;
    }, [columnsData, unCheckedSearch]);

    useEffect(() => {
        setCheckedColumns(() => columnsData.filter((each) => each.checked))
    }, [columnsData]);

    const saveForm = (passLayoutData: any[], isReset?: boolean) => {
        const { allLayoutData } = JSON.parse(localStorage.getItem(`${layoutType}_layout`) as string);

        const checkedColumnsList = passLayoutData.filter((each) => each.checked);
        const uncheckedColumnsList = passLayoutData.filter((each) => !each.checked);
        localStorage.setItem(`${layoutType}_layout`, JSON.stringify({
            allLayoutData,
            orderedLayoutData: checkedColumnsList.concat(uncheckedColumnsList)
        }))

        const saveData = {
            clientId: userLocalData.getvalue("clientId"),
            userId: userLocalData.getvalue("recrId"),
            visibility: true,
            layoutJson: isReset ? [] : checkedColumnsList.map((each) => ({
                name: each.name,
                key: each.key
            })),
            layoutName: "",
        };
        const endPoint = layoutType === "applicants" ? 'saveApplicantsLayout' :
            layoutType === "jobs" ? "saveJobLayout" :
                layoutType === "community" ? "saveCommunityLayout" : "";

        // trackPromise(
        ApiService.postWithData("admin", endPoint, saveData).then(
            (response: any) => {
                if (response.data.Success) {
                    // showToaster((response.data.Message), "success")
                    if (isReset && resetLayout) {
                        resetLayout();
                        showToaster("Layout resetted successfully", "success");
                    }
                } else {
                    showToaster((response.data.Message) ? response.data.Message : "An error occured while saving the Applicants Layout.", 'error')
                }
            }
        )
        // )
    }
    const handleDragEnd = (result: any) => {
        if (!result?.destination || result?.destination?.index === 0) {
            return;
        }
        const uncheckedColumnsList = columnsData.filter((each) => !each.checked);
        let reorderedColumns = Array.from(checkedColumns);
        const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
        reorderedColumns.splice(result.destination.index, 0, movedColumn);
        handleColumnAction(reorderedColumns.concat(uncheckedColumnsList));
        saveForm(reorderedColumns.concat(uncheckedColumnsList));
    };

    const handleColumnClick = (columnName: string) => {
        let tempColumns = Array.from(columnsData);
        let tempColumnData: any = tempColumns.find((each) => each.name === columnName);
        let tempColumnIndex = tempColumns.findIndex((each) => each.name === columnName);

        tempColumns.splice(tempColumnIndex, 1);
        tempColumns.push(tempColumnData);

        tempColumns = tempColumns.map((each, index: number) => ({
            ...each,
            checked: columnName === each.name ? !each.checked : each.checked
        }));

        if (!!tempColumns.filter((each) => each.checked)?.length) {
            handleColumnAction([...tempColumns]);
            saveForm([...tempColumns]);
        } else {
            showToaster("Atlease one column should be checked", "error")
        }
    }

    return (
        <Menu anchorEl={ref.current} open={open} onClose={handleClosemenu} id="NewLayoutMenu" anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
            <Grid container width={"100%"} spacing={3}>
                <Grid size={6} className={"search-scrollable-grid"}>
                    <Stack direction={"row"} alignItems={"center"} spacing={0.8} mb={0.75}>
                        <TextField
                            size='small'
                            variant='outlined'
                            placeholder='Search'
                            value={unCheckedSearch}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUnCheckedSearch(e.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: <SearchOutlined color={"action"} fontSize='small' sx={{ mr: 1 }} />,
                                    endAdornment: <IconButton size='small' disabled={["", null, undefined].includes(unCheckedSearch)} onClick={() => setUnCheckedSearch("")}><CloseOutlined fontSize='small' /></IconButton>
                                }
                            }}
                            sx={{ mb: 1, width: "18rem" }}
                            fullWidth
                        />
                        <Tooltip title="Reset Layout">
                            <Button size='small'
                                color='inherit' variant='outlined'
                                sx={{
                                    "&:active": {
                                        "& .MuiSvgIcon-root": {
                                            animation: "spin 1s linear infinite",
                                        }
                                    },
                                    height: "34px !important",
                                    minWidth: "28px"
                                }} onClick={() => saveForm(columnsData, true)} ><RestartAlt /></Button>
                        </Tooltip>
                    </Stack>
                    <List disablePadding >
                        {!!unCheckedColumns?.length ? unCheckedColumns?.map((each, index) => (
                            <ListItem className={`default-column`}
                                aria-disabled={each.name === pinnedColumn} key={index}
                            >
                                <ListItemText primary={each.name} onClick={() => { each.name !== pinnedColumn && handleColumnClick(each.name) }} />
                                <Checkbox checked={each.checked} onClick={() => { each.name !== pinnedColumn && handleColumnClick(each.name) }} size='small' />
                            </ListItem>
                        )) : <Typography textAlign={"center"} color={"textDisabled"}>No data found</Typography>}
                    </List>
                </Grid>
                <Grid size={6} className={"scrollable-grid"}>
                    <DragDropContext
                        onDragEnd={handleDragEnd}
                    >
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <FormGroup
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <List disablePadding >
                                        {checkedColumns?.map((each, index) => (
                                            <Draggable key={each.name}
                                                draggableId={each.name}
                                                index={index} isDragDisabled={!each.checked || each.name === pinnedColumn}>
                                                {(provided, snapshot) => (
                                                    <ListItem className={`${snapshot.isDragging ? "dragging-listItem" : ""} ${each.name === pinnedColumn ? "pinned-column" : ""} default-column`}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        aria-disabled={each.name === pinnedColumn}
                                                    >
                                                        <ListItemIcon aria-disabled={!each.checked} {...provided.dragHandleProps} sx={{ pr: each.name === pinnedColumn ? "1.3rem" : "0px" }}>
                                                            {each.name !== pinnedColumn && <DragIndicatorRounded />}
                                                        </ListItemIcon>
                                                        <ListItemText primary={(each.name === "Bulhorn" ? "Bullhorn" :
                                                            each.name === "Aviont" ? "Avionte" : each.name
                                                        )} onClick={() => { each.name !== pinnedColumn && handleColumnClick(each.name) }} />
                                                        {/* {each.checked && <CheckRounded fontSize="small" />} */}
                                                        <Checkbox checked={each.checked} onClick={() => { each.name !== pinnedColumn && handleColumnClick(each.name) }} size='small' />
                                                    </ListItem>
                                                )}
                                            </Draggable>
                                        ))}
                                    </List>
                                </FormGroup>)}
                        </Droppable>
                    </DragDropContext>
                </Grid>
            </Grid>
        </Menu>
    )
})

export default NewLayoutMenu
