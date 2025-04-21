import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ExtensionIcon from '@mui/icons-material/Extension';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { Button } from '../../../shared/modules/MaterialImports/Button';
import pinImage from '../../../assets/images/ex-pin-image.png';
import './PinCuratelyCard.scss';

interface Props {
    onClose: () => void;
}

const PinCuratelyCard = ({onClose}: Props) => {

const handleClose = () => {
    onClose();
}

return (
    <div className='pin-curately-card'>
        <div className='arrow-up'>
            <ArrowUpwardIcon/>
        </div>

        <div className='text-wrap'>
            <h3 className='header'><PushPinIcon/> Pin Curately, Access Quickly</h3>
            <p className='text'>1. Click the <span className="icon-wrap"><ExtensionIcon/></span> icon above in Browser.</p>
            <p className='text'>2. Click the <span className="icon-wrap"><PushPinOutlinedIcon/></span> next to Curately extension.</p>
        </div>
    
        <img src={pinImage} className='pin-img'/>

        <Button 
            variant='outlined' 
            color='secondary'
            onClick={() => handleClose()}
            type='button'
        >
            Got it
        </Button>
    </div>
    )
}

export default PinCuratelyCard;