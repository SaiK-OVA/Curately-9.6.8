import { useState } from '../../../../../../shared/modules/React';
// import Card from '@mui/material/Card';
import {Typography} from '../../../../../../shared/modules/MaterialImports/Typography';
// import Switch from '@mui/material/Switch';
import {Grid, Button} from '../../../../../../shared/modules/commonImports';
import './AddMessageBox.scss';
import ApiService from '../../../../../../shared/api/api';
import { trackPromise } from '../../../../../../shared/modules/PromiseTrackter';
import {Card, CardContent} from '../../../../../../shared/modules/MaterialImports/Card';
import { DateTime } from '../../../../../../shared/modules/Luxon';
import MessageDialog from '../MessageDialog/MessageDialog';

import MailIcon from '@mui/icons-material/Mail';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
// import Box from '@mui/material/Box';
import {Stack} from '../../../../../../shared/modules/MaterialImports/Stack';
import { userLocalData } from '../../../../../../shared/services/userData';
import { showToaster } from '../../../../../shared/SnackBar/SnackBar';

export interface MessageBoxInterface {
    stageId: string,
    stageData: any,
    messageData: any,
    messageType: number,
    updated: any
}



// const label = { inputProps: { 'aria-label': 'Switch demo' } };

const AddMessageBox = (
    {
        stageId,
        stageData,
        messageData,
        messageType,
        updated
    }: MessageBoxInterface
) => {

    const [openMessageModal, setOpenMessageModal] = useState(false);
    // const [isMessageEnable, setIsMessageEnable] = useState(
    //     (messageType === 1) ? stageData?.stageMessage?.isEnable : (messageType === 2) ? stageData?.followupMessage?.isEnable : false
    // );
    const [loadMessageFromApi, setLoadMessageFromApi] = useState({
        stageId: stageId,
        formId: "",
        messageId: "",
        isEnable: "",
        messageName: "",
        messageType: messageType.toString(),
        triggerType: "",
        emailEnable: false,
        smsEnable: false,
        fromName: "",
        fromEmail: "",
        fromPhone: "",
        bcc: "",
        subject: "",
        emailBody: "",
        smsBody: "",
        recrId: userLocalData.getvalue('recrId'),
        templateId: ""
    });

    const loadMessages = () => {
        showToaster('Message has been saved Successfully.', 'success');
        setOpenMessageModal(false);
        // loadMessageData();
        updated('');
    }

    const loadMessageData = () => {

        if (messageData?.messageId) {
            trackPromise(
                ApiService.getByParams(193, 'Curately/Workflow/workflow_message_get.jsp', {
                    messageId: messageData?.messageId,
                    clientId: userLocalData.getvalue('clientId')
                }).then((response: any) => {
                    // console.log(response.data);
                    let tempResponse = response.data;
                    setLoadMessageFromApi({
                        stageId: stageId,
                        formId: "",
                        messageId: (messageData?.messageId) ? messageData?.messageId : "",
                        isEnable: (tempResponse.isEnable) ? tempResponse.isEnable : "",
                        messageName: (tempResponse.messageName) ? tempResponse.messageName : "",
                        messageType: messageType.toString(),
                        triggerType: (tempResponse.triggerType) ? tempResponse.triggerType : "",
                        emailEnable: tempResponse.emailEnable,
                        smsEnable: tempResponse.smsEnable,
                        fromName: (tempResponse.fromName) ? tempResponse.fromName : "",
                        fromEmail: (tempResponse.fromEmail) ? tempResponse.fromEmail : "",
                        fromPhone: (tempResponse.fromPhone) ? tempResponse.fromPhone : "",
                        bcc: (tempResponse.bcc) ? tempResponse.bcc : "",
                        subject: (tempResponse.subject) ? tempResponse.subject : "",
                        emailBody: (tempResponse.emailBody) ? tempResponse.emailBody : "",
                        smsBody: (tempResponse.smsBody) ? tempResponse.smsBody : "",
                        recrId: userLocalData.getvalue('recrId'),
                        templateId: ""
                    });

                    setOpenMessageModal(true);
                })
            )
        } else {
            setOpenMessageModal(true);

        }
    }

    // const messageEnable = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    //     setIsMessageEnable(e.target.checked);
    //     let data = {
    //         stageId: stageId,
    //         messageId: messageData?.messageId,
    //         isEnable: e.target.checked,
    //         recrId: UserData.getId(),
    //     }
    //     trackPromise(
    //         ApiService.saveIsEnabled(data).then((response: any) => {
    //             // console.log(response.data);
    //         })
    //     )
    // }


    return (
        <div className='AddMessageBox'>
            <Card className="mt-5">
                <CardContent>
                    <Typography variant='h6' className='pb-4'>
                        <span className='pr-1'>{(messageType === 1) ? 'Stage Landing' : (messageType === 2) ? 'Follow up' : 'Final'}</span>
                        <span>Message</span>
                        {/* {
                            (messageData?.messageId)
                                ?
                                <Switch
                                    name='emailEnable'
                                    onChange={(e) => messageEnable(messageType, e)}
                                    checked={isMessageEnable}
                                />
                                : null
                        } */}
                    </Typography>
                    {
                        (messageData?.messageId)
                            ?

                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                >
                                    <span className='enableIcons'>
                                        <MailIcon className={`mr-2 ${(messageData.emailEnable) ? 'mailEnabled' : ''}`} />
                                        <MessageOutlinedIcon className={`mr-2 ${(messageData.smsEnable) ? 'smsEnabled' : ''}`} />
                                    </span>
                                    <Button variant='text' size='small' onClick={() => loadMessageData()} className='mr-2'>{messageData?.messageName}</Button>
                                </Stack>
                                <span className='lastUpdated'>
                                    <span className='pr-2'>Last updated by</span>
                                    <span className='pr-2'>{messageData?.modifyBy}</span>
                                    <span className='pr-2'>on</span>
                                    <span className='pr-2'>{DateTime.fromSQL(messageData?.modifyDate.substring(0, 10)).toFormat('MM/dd/yyyy')}</span>
                                </span>
                            </Grid>
                            :
                            <Button variant='contained' size='small' onClick={() => setOpenMessageModal(true)}>Add New Message</Button>
                    }

                </CardContent>
            </Card>
            {
                (openMessageModal) ?
                    <MessageDialog
                        open={openMessageModal}
                        onClose={loadMessages}
                        closePopup={() => setOpenMessageModal(false)}
                        stageId={stageId}
                        messageData={loadMessageFromApi}
                        messageType={messageType}
                    />
                    : null
            }
        </div>
    )
}

export default AddMessageBox;