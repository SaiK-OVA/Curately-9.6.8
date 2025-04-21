import { Divider } from "@mui/material";
import ApiService from "../../../../shared/api/api";
import { showToaster } from "../../../../shared/modules/commonImports";
import { Button } from "../../../../shared/modules/MaterialImports/Button";
import { Checkbox } from "../../../../shared/modules/MaterialImports/FormElements";
import { FormControlLabel } from "../../../../shared/modules/MaterialImports/FormInputs";
import { List, ListItem } from "../../../../shared/modules/MaterialImports/List";
import { Stack } from "../../../../shared/modules/MaterialImports/Stack";
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import { React, useMemo, useState } from "../../../../shared/modules/React";
import { userLocalData } from "../../../../shared/services/userData";

interface IDeleteJobPortalProps {
    refetch: (refresh?: boolean) => void;
    jobPortalsData: any;
    masterJobData: any
}

const DeleteJobPortal: React.FC<IDeleteJobPortalProps> = (props) => {
    const { refetch, jobPortalsData, masterJobData } = props;
    const [selectedBoardIds, setSelectedBoardIds] = useState<{ boardId: string | number }[]>([]);
    const [isSelectAll, setIsSelectAll] = useState(false);
    let clientJobBoards = JSON.parse(localStorage.getItem("demoUserInfo") || "" as string);

    const deleteJobPortals = useMemo(() => {
        const idibuSources = masterJobData?.idibuSource?.split(",")?.filter((each: any) => each) || [];
        const portals = (!!idibuSources?.length && !!jobPortalsData?.portals?.portal?.length) ? idibuSources.map((source: any) => {
            const portalData = jobPortalsData?.portals?.portal.find((portal: any) => portal.name?.toString()?.toLowerCase() === source?.toString()?.toLowerCase());
            return { name: source, id: portalData?.id || 0 }
        }) : []
        if (!!clientJobBoards?.idibuJobBoards?.length) {
            return portals.filter((each: any) => clientJobBoards?.idibuJobBoards?.includes(each?.id));
        } else return [];
    }, []);

    const handleJobBoardClick = (boardId: any) => {
        // let boardIdsCount = jobPortalsData?.portals?.portal?.filter((each: any) => each?.status !== "deleted").length;
        let tempSelectedBoardIds = selectedBoardIds;
        const index = tempSelectedBoardIds.findIndex((each) => each.boardId.toString() === boardId.toString());
        if (index >= 0) {
            tempSelectedBoardIds.splice(index, 1);
        } else {
            tempSelectedBoardIds.push({ boardId })
        }
        setSelectedBoardIds([...tempSelectedBoardIds]);
        setIsSelectAll(() => deleteJobPortals.length === tempSelectedBoardIds.length ? true : false);
    }

    const handleSelectAllClick = (e: any, checked: boolean) => {
        setIsSelectAll(checked);
        if (checked) {
            let tempBoardIds: { boardId: string | number }[] = [];
            deleteJobPortals.map((each: any) => {
                tempBoardIds.push({ boardId: each.id })
            });
            setSelectedBoardIds([...tempBoardIds]);
        } else setSelectedBoardIds([]);
    }

    const getIsChecked = (boardId: any) => {
        const index = selectedBoardIds.findIndex((each) => each.boardId.toString() === boardId.toString());
        if (index >= 0) {
            return true;
        }
        return false
    }

    const handleDeleteJobPortals = () => {
        if (!!selectedBoardIds?.length) {
            const payLoad = {
                "boardDetails": selectedBoardIds,
                "jobId": jobPortalsData.jobId,
                "clientId": userLocalData.getvalue("clientId"),
                "recrId": userLocalData.getvalue("recrId"),
                "all": isSelectAll,
                "idibuJobId": jobPortalsData.idibuJobId,
            }
            trackPromise(
                ApiService.postWithData("admin", "deletePostedJob", payLoad).then((res: any) => {
                    if (res?.data?.Success) {
                        showToaster(res?.data?.Message, "success")
                        refetch(true);
                    } else showToaster(res?.data?.Message, "error")
                })
            )
        } else showToaster("Please select job portals to delete", "error")

    }

    return (
        <>
            {!!deleteJobPortals?.length ?
                <Stack>
                    <FormControlLabel
                        label={"Select All"}
                        control={<Checkbox checked={isSelectAll} size="small" />}
                        onChange={handleSelectAllClick}
                        sx={{ px: 2 }}
                    />
                    <Divider />
                    <List disablePadding sx={{ px: 2 }}>
                        {deleteJobPortals.map((each: any, index: number) => (
                            <ListItem key={index}>
                                <FormControlLabel
                                    id={index + each.name}
                                    name={index + each.name}
                                    label={each.name}
                                    control={<Checkbox checked={getIsChecked(each.id)} size="small" />}
                                    onChange={() => handleJobBoardClick(each.id)}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Stack px={2} mt={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={selectedBoardIds.length > 0 ? false : true}
                            sx={{ textTransform: "capitalize", height: "32px" }}
                            onClick={handleDeleteJobPortals}
                        >Delete To Job Board</Button>
                    </Stack>

                </Stack> :
                <Typography textAlign={"center"} variant="body2" color="textDisabled" py={2}>{"No Job Portals Found"}</Typography>}
        </>
    )
}

export default DeleteJobPortal