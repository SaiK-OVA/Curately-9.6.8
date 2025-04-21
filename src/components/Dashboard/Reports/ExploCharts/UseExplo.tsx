import {useState, useEffect} from 'react'
import { userLocalData } from '../../../../shared/services/userData';
import axios from 'axios';

const UseExplo = ({embedID}: {embedID: string}) => {
    const [jwt, setJwt] = useState('');

    useEffect(() => {
        if (!embedID) {
            return;
        }
        
        let clientId = userLocalData.getvalue('clientId');
        if(clientId){
            setJwt('');
            axios.post('https://api.explo.co/api/generate_jwt', 
                {provided_id: String(clientId), embed_id: embedID}, 
                {
                  headers: {
                    'Explo-Authorization': `Token 332786d1d62ae9f1db0b68f0442802cca97210aeaa9ea3091d6d844201f36fca`,
                    'content-type': "application/json"
                  }
                }
            ).then(res => {
                setJwt(res.data.jwt);
            }).catch(err => {
                console.log('Error fetching JWT for embedID:', embedID, err);
            });
        }
    }, [embedID]); 

  return {jwt}
}

export default UseExplo
