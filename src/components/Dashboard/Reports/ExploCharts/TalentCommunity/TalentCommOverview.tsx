import UseExplo from '../UseExplo'

const TalentCommOverview = () => {
    const{jwt} = UseExplo({embedID: '08YWgovYW4'});
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

export default TalentCommOverview
