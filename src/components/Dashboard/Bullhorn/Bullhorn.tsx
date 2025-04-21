import React, { Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress'
import UnAuthorized from '../../UnAuthorized/UnAuthorized'

const BullhornJobs = React.lazy(() => import('./BullhornJobs/BullhornJobs'))
const BullhornCandidates = React.lazy(() => import('./BullhornCandidates/BullhornCandidates'))
const TearSheet = React.lazy(() => import('./TearSheet/TearSheet'))


const Bullhorn = () => {


  const { 
    // settingIds, 
    adminIds, integrationIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
    // settingIds: {},
    integrationIds: {},
    adminIds: {}
  };

  return (
    <div>
      <Routes>
        <Route path="Job" element={<Suspense fallback={<CircularProgress className="centered" />}>{
          integrationIds[40001] && adminIds[20043] ? <BullhornJobs /> : <UnAuthorized />
        }</Suspense>} />
        <Route path="Candidates" element={<Suspense fallback={<CircularProgress className="centered" />}>
        {adminIds[20018] && !adminIds[30003]? <BullhornCandidates />: <UnAuthorized /> }
        </Suspense>} />
        <Route path="Tearsheet" element={<Suspense fallback={<CircularProgress className="centered" />}>
        { integrationIds[400007] && adminIds[20020] && adminIds[20043]? <TearSheet /> : <UnAuthorized /> }
        </Suspense>} />
      </Routes>
      <Outlet></Outlet>
    </div>
  )
}

export default Bullhorn;