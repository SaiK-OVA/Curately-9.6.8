// import {
//     useEffect,
//     useState
// } from '../../../../shared/modules/React';
// import updateDocumentTitle from '../../../../shared/services/title';
import { userLocalData } from '../../../../shared/services/userData';
import {
    Routes, Route,
    // Link
} from 'react-router-dom';
// import { useLocation } from "react-router-dom";
import DataLabs from './components/DataLabs/DataLabs';
import Contacts from './components/Contacts/Contacts';
import Profile from './components/Profile/Profile';
import './People.scss'

const People = () => {

    // const { search } = useLocation();
    // const clientId: any = new URLSearchParams(search).get("clientId");
    const clientId: string = userLocalData.getvalue('clientId');
    //console.log("ssssssss");
    //console.log(clientId);
    if (clientId) {
        localStorage.setItem("clientId", clientId.toString());
    }



    // const [src, setSrc] = useState((window.location.protocol === 'https:') ? window.location.origin + '/peoples?clientId=' + userLocalData.getvalue('clientId') : 'https://app.curately.ai/peoples/?clientId=' + userLocalData.getvalue('clientId'));
    // // https://careers.curately.ai/peoples?clientId=2
    // useEffect(() => {
    //     const personaArray: [40006, 400010, 400024, 400025, 400026, 400027, 400028, 400029] = [40006, 400010, 400024, 400025, 400026, 400027, 400028, 400029];
    //     let tempSrc = 'clientId=' + userLocalData.getvalue('clientId') + '&recrId=' + userLocalData.getvalue('recrId');
    //     const permissionsArray: number[] = [];
    //     for (let pi = 0; pi < personaArray.length; pi++) {
    //         if (userLocalData.checkIntegration(personaArray[pi])) {
    //             permissionsArray.push(personaArray[pi]);
    //         }
    //     }
    //     tempSrc += '&permissions=' + permissionsArray.join(',');

    //     // clientId=' + userLocalData.getvalue('clientId')

    //     setSrc((window.location.protocol === 'https:') ? window.location.origin + '/peoples?' + tempSrc : 'https://app.curately.ai/peoples/?' + tempSrc);
    //     console.log('https://app.curately.ai/peoples/?' + tempSrc);

    // }, []);

    return (
        // <>
        //     <iframe src={src} title='People' className='iframeInApp'></iframe>
        // </>
        (<Routes>
            <Route index path="/" element={<DataLabs showOnlyPersona={false} />} />
            <Route path="/home" element={<DataLabs showOnlyPersona={false} />} />
            <Route path="/contacts/:id" element={<Contacts />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<DataLabs showOnlyPersona={false} />} />
        </Routes>)
    );
}
export default People;
