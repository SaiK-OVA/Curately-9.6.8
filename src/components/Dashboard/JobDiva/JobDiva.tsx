import React, { Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress'
import { userLocalData } from '../../../shared/services/userData';
import UnAuthorized from '../../UnAuthorized/UnAuthorized';

const DivaJobs = React.lazy(() => import('./DivaJobs/DivaJobs'))
const DivaCandidates = React.lazy(() => import('./DivaCandidate/DivaCandidate'))
const HotSheet = React.lazy(() => import('./HotSheet/HotSheet'))


const JobDiva = () => {
  const { integrationIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
    integrationIds: {},
  };

  return (
    <div>
      <Routes>
        <Route path="job" element={<Suspense fallback={<CircularProgress className="centered" />}>
          <DivaJobs />
        </Suspense>} />
        <Route path="candidates" element={<Suspense fallback={<CircularProgress className="centered" />}><DivaCandidates /></Suspense>} />
        <Route path="hotlist" element={<Suspense fallback={<CircularProgress className="centered" />}>
          {integrationIds[400007] ? <HotSheet /> : <UnAuthorized />}
        </Suspense>} />
      </Routes>
      <Outlet></Outlet>
    </div>
  )
}

export default JobDiva;