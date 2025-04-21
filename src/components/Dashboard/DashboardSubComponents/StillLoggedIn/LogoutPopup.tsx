
import { Dialog, DialogActions, DialogContent } from '../../../../shared/modules/MaterialImports/Dialog';
import { Button } from '../../../../shared/modules/MaterialImports/Button';

const LogoutPopup = (
    {
        showTimeOutModal,
        closePopup,
        remaining,
        handleStillHere
    }
        :
        {
            showTimeOutModal: boolean
            closePopup: () => void;
            remaining: number
            handleStillHere: () => void;
        }
) => {
    return (

        <Dialog open={showTimeOutModal} onClose={() => closePopup()} maxWidth="sm" fullWidth>
            <DialogContent>
                <h3>Are you still here?</h3>
                <p>Logging out in {remaining} seconds</p>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={() => { handleStillHere(); }} size='small' >
                    I'm still here
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LogoutPopup