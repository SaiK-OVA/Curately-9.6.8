
import { Dialog } from "../../../../../shared/modules/MaterialImports/Dialog";
import './LinkAccountDialog.scss'

export interface DialogProps {
    url: any;
    open: boolean;
    onClose: () => void;
}

export const LinkAccountDialog = ({ url, open, onClose }: DialogProps) => {

    return (
        <Dialog open={Boolean(open)} onClose={onClose} maxWidth="xl" fullWidth id="linkAccountDialog">
            <iframe src={url} width="100%" height="calc(100vh - 50px)"></iframe>
        </Dialog>
    );
};
