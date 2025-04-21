import { CircularProgress } from "@mui/material"
import { Suspense } from "react"
import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import UnAuthorized from "../../UnAuthorized/UnAuthorized"
import Community from "../Resume/Community/Community"
import FindDynamicPool from "./DynamicFind/FindDynamicPool"
import { userLocalData } from "../../../shared/services/userData"

const DynamicTalentPool = () => {

    const { integrationIds, adminIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
        // settingIds: {},
        integrationIds: {},
        adminIds: {}
      };
  return (
    <div>
       <Routes>
        <Route
          path="dynamicfind"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              {
                integrationIds[400007] && adminIds[20020] && userLocalData.isPaid() ? <FindDynamicPool /> : <UnAuthorized />
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
        <Route path="*" element={<Navigate to="dynamicfind" />} />
      </Routes>

      <Outlet></Outlet>
    </div>
  )
}

export default DynamicTalentPool
