import { React, Suspense } from "../../../shared/modules/React";
import { Outlet, Routes, Route, Navigate } from "react-router-dom";

import { CircularProgress } from "../../../shared/modules/MaterialImports/CircularProgress";

import "./TalentPool.scss";
// import Community from "../Resume/Community/Community";
// import ViewPool from "./ViewPool/ViewPool";
// import { RequireAuth } from "../../../shared/services/auth/validating";
import Community from "../Resume/Community/Community";
import UnAuthorized from "../../UnAuthorized/UnAuthorized";

const FindPool = React.lazy(() => import("./Find/FindPool"));

const TalentPool = () => {

  const { integrationIds, adminIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
    // settingIds: {},
    integrationIds: {},
    adminIds: {}
  };

  return (
    <div>
      <Routes>
        <Route
          path="find"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              {
                integrationIds[400007] && adminIds[20020] ? <FindPool /> : <UnAuthorized />
              }
              {/* <RequireAuth integrationId={400007} adminId={20020}><FindPool /></RequireAuth> */}
            </Suspense>
          }
        />
        <Route
          path="view/:talentPoolId"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              {
                integrationIds[400007] ? <Community jobIdFromJobPage="" jobTitleFromJobPage="" isInJob={false} /> : <UnAuthorized />
              }
              {/* <RequireAuth integrationId={400007}><Community jobIdFromJobPage="" jobTitleFromJobPage="" isInJob={false} /></RequireAuth> */}
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="find" />} />
      </Routes>

      <Outlet></Outlet>
    </div>
  );
};

export default TalentPool;
