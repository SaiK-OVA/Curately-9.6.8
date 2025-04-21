import UseExplo from './UseExplo'

const SourcingInsights = () => {
    const {jwt} = UseExplo({embedID: 'L21XzOKYQo'});
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

export default SourcingInsights
