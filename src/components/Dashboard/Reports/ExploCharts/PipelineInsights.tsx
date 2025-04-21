import UseExplo from './UseExplo';

const PipelineInsights = () => {
    const {jwt} = UseExplo({embedID: 'R81Vgg6AZP'});
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

export default PipelineInsights
