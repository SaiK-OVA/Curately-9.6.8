
import UseExplo from '../UseExplo'

const RaceandEthnicity = () => {
    const {jwt} = UseExplo({embedID: 'dK1oPjEAl0'});
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

export default RaceandEthnicity
