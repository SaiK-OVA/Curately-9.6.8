import { React } from '../../../shared/modules/React';
import { Dialog, DialogContent } from '../../../shared/modules/MaterialImports/Dialog';
import CreateTemplate from '../../Dashboard/Letters/Workflow/Stages/DocumentSigning/CreateTemplate';
import "./DocumentModal.scss"

interface ModalProps {
    open: boolean;
    onClose: () => void;
    documentId: string;
    handleRefresh: () => void;
    formData: any;
    documentName: string;
    stageId: string;
}

const DocumentModal: React.FC<ModalProps> = ({ open, onClose, documentId, handleRefresh, formData, documentName, stageId }) => {



    return (
        <React.Fragment>
            <Dialog open={open} onClose={onClose} className="main-dialog">
                {/* <DialogTitle>Create Template</DialogTitle> */}
                <DialogContent sx={{ overflow: "hidden" }}>
                    {/* hello */}
                    <CreateTemplate onClose={onClose} documentId={documentId} handleRefresh={handleRefresh} formData={formData} documentName={documentName} stageId={stageId} />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose}>Subscribe</Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    )
}

export default DocumentModal