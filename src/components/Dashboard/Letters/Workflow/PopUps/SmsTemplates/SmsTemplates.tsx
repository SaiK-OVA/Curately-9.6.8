import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import Popover from "@mui/material/Popover";
import { userLocalData } from "../../../../../../shared/services/userData";
import { trackPromise } from "../../../../../../shared/modules/PromiseTrackter";
import ApiService from '../../../../../../shared/api/api';
import Tooltip from "@mui/material/Tooltip";
import './SmsTemplates.scss';

interface SmsTemplate {
    SmsId: string;
    SMSName: string;
    fromPhone: string;
    Body: string;
    createdBy: string;
}

const SmsTemplates = ({ insertSMSTemp, loadTemplates }: { insertSMSTemp: (field: string) => void, loadTemplates: boolean }) => {
    const [anchorSmsEl, setAnchorSmsEl] = useState<HTMLButtonElement | null>(null);
    const [isSmsTempOpen, setIsSmsTempOpen] = useState(false);
    const openSmsTemp = Boolean(anchorSmsEl);
    const [smsTemplateList, setSmsTemplateList] = useState<SmsTemplate[]>([]);

    const handlePopoverOpen = (event: any) => {
        setAnchorSmsEl(event.currentTarget);
        setIsSmsTempOpen(true);
    };

    const handlePopoverClose = () => {
        setIsSmsTempOpen(false);
        setAnchorSmsEl(null);
    };

    const loadSmsTemplates = () => {
        const clientId = userLocalData.getvalue('clientId');
        // const recrId = userLocalData.getvalue('recrId');
        trackPromise(
            ApiService.getCall('admin', `getSmsList/0/${clientId}`)
                .then((response: any) => {
                    setSmsTemplateList(response.data.list);
                })
        );
    };

    useEffect(() => {
        loadSmsTemplates();
    }, [loadTemplates]);

    const handleTemplateClick = (smsBody: string) => {
        insertSMSTemp(smsBody);  
        handlePopoverClose();  
    };

    return (
        <div>
            <IconButton onClick={handlePopoverOpen} title="Smstemplates" className="px-1">
                <TurnedInNotIcon sx={{ color: '#444' }} />
            </IconButton>
            {
                isSmsTempOpen &&
                <Popover
                    id="add-place-popover"
                    open={openSmsTemp}
                    anchorEl={anchorSmsEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    
                >
                    <div className="dynamicVariables p-3">
                    <div className="mt-1 mb-1 categoryName">Sms Templates</div>
                        {
                            smsTemplateList.map((smsTemplate) => (
                                <div
                                    className="fieldName" key={smsTemplate.SmsId}>
                                    <Tooltip placement="left" title={smsTemplate?.Body} >
                                        <div className="viewFieldName" onClick={() => handleTemplateClick(smsTemplate.Body)}>
                                            {smsTemplate.SMSName}
                                        </div>
                                    </Tooltip>
                                </div>

                            ))
                        }
                    </div>
                </Popover>
            }
        </div>
    );
};

export default SmsTemplates;
