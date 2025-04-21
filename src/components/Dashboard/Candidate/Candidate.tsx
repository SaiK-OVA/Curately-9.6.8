import { React, Suspense } from "../../../shared/modules/React";
import { Outlet, Routes, Route } from "react-router-dom";

import { CircularProgress } from "../../../shared/modules/MaterialImports/CircularProgress";

import "./Candidate.scss";
// import { RequireAuth } from "../../../shared/services/auth/validating";
import UnAuthorized from "../../UnAuthorized/UnAuthorized";

// const AddCandidate = React.lazy(() => import("./AddCandidate/AddCandidate"));
// const FindCandidates = React.lazy(() => import("./FindCandidate/FindCandidates"));
const CandidateView = React.lazy(() => import("./ViewCandidate/CandidateView"));
// const TableCandidate = React.lazy(() => import("./Table/Table"));

const Candidate = () => {



  const {  integrationIds, } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
    // settingIds: {},
    integrationIds: {},
    // adminIds: {}
  };

  return (
    <div>
      <Routes>
        <Route path="/view/:candidateId" element={
          <Suspense fallback={<CircularProgress className="centered" />}>
            {
              integrationIds[40002] ? <CandidateView /> : <UnAuthorized />
            }
            {/* <RequireAuth integrationId={40002}><CandidateView /></RequireAuth> */}
          </Suspense>}
        ></Route>
        <Route path="/view/:candidateId/:jobId" element={
          <Suspense fallback={<CircularProgress className="centered" />}>
            {
              integrationIds[40002] ? <CandidateView /> : <UnAuthorized />
            }
            {/* <RequireAuth integrationId={40002}><CandidateView /></RequireAuth> */}
          </Suspense>}
        ></Route>
        <Route path="/view/:candidateId/:jobId/:sourceId" element={
          <Suspense fallback={<CircularProgress className="centered" />}>
            {
              integrationIds[40002] ? <CandidateView /> : <UnAuthorized />
            }
            {/* <RequireAuth integrationId={40002}><CandidateView /></RequireAuth> */}
          </Suspense>}
        ></Route>
        {/* <Route
          path="add"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <AddCandidate />
            </Suspense>
          }
        /> */}
        {/* <Route
          path="find"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <FindCandidates />
            </Suspense>
          }
        /> */}
        {/* <Route
          path="view/:candId"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <ViewCandidate />
            </Suspense>
          }
        /> */}
        {/* <Route
          path="Table"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <TableCandidate />
            </Suspense>
          }
        /> */}
      </Routes>

      <Outlet></Outlet>
    </div>
  );
};

export default Candidate;
