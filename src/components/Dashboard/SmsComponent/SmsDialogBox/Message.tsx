import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';




import './Message.scss'
import Stack from '@mui/system/Stack';
import { Tooltip } from '../../../../shared/modules/MaterialImports/ToolTip';

interface MessageProps {
    type: 'IN' | 'OUT';
    body: string;
    time: string;
    name?: string;
}






const Message: React.FC<MessageProps> = ({ type, body, time, name = "" }) => {

    const formattedTime = new Date(time).toLocaleTimeString([], {

        hour: '2-digit',
        minute: '2-digit',
        hour12: true

    });

    const getName = (name: any) => {
        const nameArry = name ? name?.split(" ") : "";
        if(nameArry.length === 0) return "";
        else if(nameArry.length === 1) return nameArry[0].charAt(0);
        return nameArry[0].charAt(0) + nameArry[1].charAt(0)
    }



    return (
        <div>
            {/* <div className="time">{messageDate}</div> */}
            <div className={`message-wrapper ${type === 'IN' ? 'message-wrapper-in' : 'message-wrapper-out'}`}>

                {(type === 'IN') ? <Stack display={'flex-end'} direction={'column'}>
                    <Stack direction="row" spacing={1} alignItems={'flex-end'} justifyItems={'flex-end'}>
                        <div className='message-bubble  message-bubble-in'> {body}</div>
                        <span className='userName'>  <Tooltip title={name}>{getName(name)}</Tooltip> </span></Stack>
                    <span className='message-time'> <CheckCircleOutlineIcon className='checked-icon' />
                        {formattedTime}</span>
                </Stack> :
                    <div className='message-bubble message-bubble-out' >
                        {body}
                    </div>
                }

            </div>

        </div>
    );
};

export default Message;