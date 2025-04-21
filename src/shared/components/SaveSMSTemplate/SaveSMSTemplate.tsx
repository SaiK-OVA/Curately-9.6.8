
import { Button, IconButton } from '../../modules/MaterialImports/Button';
import { TextField } from '../../modules/MaterialImports/TextField';
import { Popover } from '../../modules/MaterialImports/Popover';
import { useState } from '../../modules/React';
import SaveIcon from '@mui/icons-material/Save';
import { showToaster } from '../../modules/commonImports';
import ApiService from '../../api/api';
import { trackPromise } from 'react-promise-tracker';
import { userLocalData } from '../../services/userData';
import { MouseEvent } from 'react';

const SaveSMSTemplate = ({ message, templateAdded }: { message: string; templateAdded : () => void }) => {


    const [templateName, setTemplateName] = useState("");



    const saveSmsTemplate = () => {

        if (templateName.trim() === "") {
            showToaster("Please Enter SMS Template Name", "warning");
            return false;
        } else if (message.trim() === "") {
            showToaster("Please enter Body Message", "warning");
            return false;
        }

        // if(values.fromPhone.trim()===""){
        //     showToaster("Please enter Phone", "warning");
        //     return false;
        // }

        const data = {
            smsId: 0,
            smsName: templateName,
            fromPhone: "",
            body: message,
            createdBy: userLocalData.getvalue('recrId'),
            clientId: userLocalData.getvalue('clientId'),
        };

        trackPromise(
            ApiService.postWithData('admin', `saveSms`, data)
                .then((response) => {
                    if (response.data.Success === true) {
                        showToaster("SMS Template saved successfully", "success");
                        closePopover();
                        templateAdded();
                    } else {
                        showToaster(response.data.Message, "error");
                    }
                })
                .catch((error: any) => {
                    // console.log(error)
                    showToaster("An error occurred while saving the template", "error");
                })
        );
    };


    const [smsPopoverElement, setSmsPopoverElement] = useState<HTMLButtonElement | null>(null);

    const openPopover = (event: MouseEvent<HTMLButtonElement>) => {
        setSmsPopoverElement(event.currentTarget);
    };

    const closePopover = () => {
        setSmsPopoverElement(null);
    };

    const isSmsPopoverOpen = Boolean(smsPopoverElement);
    const popoverId = isSmsPopoverOpen ? 'save-sms-template-popover' : undefined;



    return (
        <>
            <IconButton aria-describedby={popoverId} onClick={openPopover} disabled={!message} title="Save as Template" className='px-1'>
                <SaveIcon sx={{ color: 'var(--c-neutral-70)' }} />
            </IconButton>
            <Popover
                id={popoverId}
                open={isSmsPopoverOpen}
                anchorEl={smsPopoverElement}
                onClose={closePopover}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <p className='m-1'>Template Name:</p>
                <TextField
                    id="template-name"
                    size='small'
                    name='template-name'
                    sx={{ width: 'calc(100% - 32px)', margin: '0 1rem' }}
                    onChange={(e) => setTemplateName(e.target.value)}
                />
                <Button
                    color="primary"
                    disabled={(templateName !== "" && templateName.length > 3) ? false : true}
                    variant="contained"
                    type="submit"
                    className='mr-2'
                    size="small" sx={{ m: 2 }}
                    onClick={saveSmsTemplate}
                >
                    Save
                </Button>
            </Popover>
        </>
    )
}

export default SaveSMSTemplate