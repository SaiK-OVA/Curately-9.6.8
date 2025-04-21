
import { React, Suspense } from "../../../../shared/modules/React";
import { Routes, Route } from "react-router-dom";

import { CircularProgress } from "../../../../shared/modules/MaterialImports/CircularProgress";
import Demo from "./Demo/Demo";
import { Link } from 'react-router-dom';
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";


const ExecutiveInsights = React.lazy(() => import("./ExecutiveInsights/ExecutiveInsights"));
const HiringInsights = React.lazy(() => import("./HiringInsights/HiringInsights"));
const TalentCommunityInsights = React.lazy(() => import("./TalentCommunityInsights/TalentCommunityInsights"));
const SourcingInsights = React.lazy(() => import("./SourcingInsights/SourcingInsights"));
const PipelineInsights = React.lazy(() => import("./PipelineInsights/PipelineInsights"));
const RecruiterActivityInsights = React.lazy(() => import("./RecruiterActivityInsights/RecruiterActivityInsights"));
const MyGMHeadcount = React.lazy(() => import("./My GM Headcount/MyGMHeadcount"));
const Outreach = React.lazy(() => import("../Charts/Outreach/Outreach"));
const Charts = () => {
  return (
    <div>
      <Grid sx={{ display: 'flex', gap: 5, p: 2 }}>
        <Link to={"../reports/charts/talentCommunity"} >Talent Community Insights</Link>
        <Link to={"../reports/charts/executiveInsights"} >Executive Insights</Link>

        <Link to={"../reports/charts/sourcingInsights"}>Sourcing Insights</Link>
        <Link to={"../reports/charts/hiringInsights"}>Hiring Insights</Link>
        <Link to={"../reports/charts/recruiterActivityInsights"}>Recruiter Activity Insights</Link>

        <Link to={"../reports/charts/pipelineInsights"}>Pipeline Insights</Link>
        <Link to={"../reports/charts/myGMandHeadCountReport"}>MY GM and Headcount Report</Link>
      </Grid>



      <Routes>
        <Route
          path="talentCommunity"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <TalentCommunityInsights />
            </Suspense>
          }
        />
        <Route
          path="executiveInsights"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <ExecutiveInsights />
            </Suspense>
          }
        />
        <Route
          path="sourcingInsights"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <SourcingInsights />
            </Suspense>
          }
        />
        <Route
          path="hiringInsights"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <HiringInsights />
            </Suspense>
          }
        />
        <Route
          path="recruiterActivityInsights"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <RecruiterActivityInsights />
            </Suspense>
          }
        />
        <Route
          path="pipelineInsights"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <PipelineInsights />
            </Suspense>
          }
        />
        <Route
          path="myGMandHeadCountReport"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <MyGMHeadcount />
            </Suspense>
          }
        />
        <Route
          path="Outreach"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <Outreach />
            </Suspense>
          }
        />
        <Route
          path="demo"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <Demo />
            </Suspense>
          }
        />
      </Routes>
    </div >
  )


}
export default Charts;