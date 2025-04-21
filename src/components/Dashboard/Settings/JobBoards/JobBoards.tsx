import ApiService from "../../../../shared/api/api";
import { Button } from '../../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../../shared/modules/MaterialImports/Grid2';
import { Typography } from "../../../../shared/modules/MaterialImports/Typography";
import { useState } from "../../../../shared/modules/React";
import IdibuUsers from "./IdibuUsers/IdibuUsers";
import JobBoardsApplicationDetails from './JobBoardApplicationDetails';
import JobBoardsPublishList from './JobBoardPublishList';
import './JobBoards.scss';

export const GetFormattedJobBoardData = (data: any) => {
    if (data && Array.isArray(data)) {
        return data || [];
    } else {
        return (typeof data === 'object' && !Array.isArray(data)) ? [data] : []
    }
}

const JobBoards = () => {
    const [openApplicantJobBoardModal, setOpenApplicantJobBoardModal] = useState(false);
    const [openIdibuUsers, setOpenIdibuUsers] = useState(false);

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }

    return (
        <div className="JobBoards pl-4 pr-3">
            <div className='pt-3'>
                <div >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className="customCard px-4 py-2 mb-2"
                        sx={{ minHeight: "auto !important" }}
                    >
                        <Typography variant="h6" className="header"> Job Board</Typography>
                        <div className="d-flex">
                            <Button variant="contained" className='mr-3' color="primary" onClick={() => setOpenIdibuUsers(true)}>
                                Idibu Users
                            </Button>
                            <div>
                                <Button variant="contained" color="primary" className='mr-3' onClick={() => { saveAuditLog(4249); setOpenApplicantJobBoardModal(true) }}>
                                    Application Details
                                </Button>
                            </div>
                        </div>
                    </Grid>
                    <JobBoardsPublishList />
                </div>

                {openApplicantJobBoardModal ? (
                    <JobBoardsApplicationDetails
                        open={openApplicantJobBoardModal}
                        closePopup={() => setOpenApplicantJobBoardModal(false)}
                    />
                ) : null}

                {
                    openIdibuUsers ?
                        <IdibuUsers
                            openDialog={openIdibuUsers}
                            closeDialog={() => setOpenIdibuUsers(false)}
                        /> : null
                }
            </div>
        </div>
    )
}

export default JobBoards;