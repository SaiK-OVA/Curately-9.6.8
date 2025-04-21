
import UseExplo from '../UseExplo'

const HiringInsights = () => {
    const{jwt} = UseExplo({embedID: '2k1LbPvYyJ'});
  return (
    <>
      {
        jwt && (
            <explo-dashboard
            dash-jwt={jwt}
            updateUrlParams={true}
            isProduction={true}
        />
        )
      }
    </>
  )
}

export default HiringInsights
