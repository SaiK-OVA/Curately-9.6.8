import { userLocalData } from "../../../../../shared/services/userData";
import UseExplo from "../UseExplo";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'explo-dashboard': any;
    }
  }
}

const ExecutiveInsights = () => {
  let clientEmbedId:string = [6].includes(userLocalData.getvalue("clientId")) ?  'yWYEablYEq' : 'R81VRrL1ZP';
  
  const {jwt} = UseExplo({embedID: clientEmbedId});

  return (
    <>
    {
      jwt &&  (<explo-dashboard
        dash-jwt={jwt}
        updateUrlParams={true}
        isProduction={true}
      />)
    }
     
    </>
  )
}

export default ExecutiveInsights;