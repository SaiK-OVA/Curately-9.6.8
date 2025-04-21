import { Close } from '@mui/icons-material';
import Modal from '@mui/material/Modal';
import { create } from 'zustand';
import { Box } from '../../../shared/modules/MaterialImports/Box';
import { IconButton } from '../../../shared/modules/MaterialImports/Button';
import { Grid } from '../../../shared/modules/MaterialImports/Grid2';
import { Typography } from '../../../shared/modules/MaterialImports/Typography';

interface IErrorModalStore {
    openModal: boolean;
    errorMessage: string;
    title: string;
    close: () => void;
}

const useErrorModalStore = create<IErrorModalStore>((set) => ({
    openModal: false,
    errorMessage: "",
    title: "",
    close: () => set({ openModal: false, errorMessage: "", title: "" })
}))

export const OpenErrorModal = ({ errorMessage, title, openModal }: { errorMessage: string, title?: string, openModal?: boolean, }) => {
    useErrorModalStore.setState({
        openModal: openModal ? openModal : true,
        title: title ? title : "",
        errorMessage,
    });
}

const ErrorModal = () => {
    const { close, openModal, errorMessage, title } = useErrorModalStore();
    const styleModel = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 3,
    };

    if (openModal && errorMessage) return (
        <Modal
            open={openModal}
            onClose={close}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModel}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {/* sx={{ color: "red" }} */}
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        {title ? title : "Error Message"}
                    </Typography>
                    <IconButton onClick={close} size='small' className="closePopup">
                        <Close />
                    </IconButton>
                </Grid>
               
                <Typography id="modal-modal-description" sx={{ mt: 2, fontSize: "16px", maxHeight: "calc(100vh - 15rem)", overflowY: "auto" }} >
                <div className='pl-4 pr-4 ' style={{ overflowY: "auto", height: "auto" }}
                                dangerouslySetInnerHTML={{ __html: errorMessage }}></div>

                </Typography>

            </Box>
        </Modal>
    )
    else return null;
}

export default ErrorModal;