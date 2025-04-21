import UseExplo from '../UseExplo';

interface ExecutiveInsightsBMSOverviewProps {
    dashboardId: string;
}

const ExecutiveInsightsBMSOverview: React.FC<ExecutiveInsightsBMSOverviewProps> = ({dashboardId}) => {
    const {jwt} = UseExplo({embedID: dashboardId});

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

export default ExecutiveInsightsBMSOverview
