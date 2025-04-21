import UseExplo from "../UseExplo";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'explo-dashboard': any;
    }
  }
}
const TalentCommunityDEI = () => {
    const {jwt} = UseExplo({embedID: '5rxlE0N1J9'});

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

export default TalentCommunityDEI;