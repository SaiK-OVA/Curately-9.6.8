import { React, Suspense } from "../../../../shared/modules/React";
import { Routes, Route } from "react-router-dom";

import { CircularProgress } from "../../../../shared/modules/MaterialImports/CircularProgress";
import { Link } from 'react-router-dom';
import { Grid } from "../../../../shared/modules/MaterialImports/Grid";

const ExecutiveInsights = React.lazy(() => import("./ExecutiveInsights/ExecutiveInsights"));
const HiringInsights = React.lazy(() => import("../Charts/HiringInsights/HiringInsights"));
const TalentCommunityInsights = React.lazy(() => import("./TalentCommunity/TalentCommunityOverview"));
const SourcingInsights = React.lazy(() => import("../Charts/SourcingInsights/SourcingInsights"));
const PipelineInsights = React.lazy(() => import("../Charts/PipelineInsights/PipelineInsights"));
const RecruiterActivityInsights = React.lazy(() => import("../Charts/RecruiterActivityInsights/RecruiterActivityInsights"));
const MyGMHeadcount = React.lazy(() => import("../Charts/My GM Headcount/MyGMHeadcount"));
// const TalentCommunityOverview = React.lazy(() => import("./TalentCommunityOverview"));
// const Outreach = React.lazy(() => import("../Charts/Outreach/Outreach"));


const Explo = () => {
    return (
        <div>
        <Grid sx={{ display: 'flex', gap: 5, p: 2 }}>
        <Link to={"../reports/explocharts/talentCommunityOverview"} >Talent Community Insights</Link>
        <Link to={"../reports/explocharts/exploexecutiveInsights"} >Executive Insights</Link>

        <Link to={"../reports/charts/sourcingInsights"}>Sourcing Insights</Link>
        <Link to={"../reports/charts/hiringInsights"}>Hiring Insights</Link>
        <Link to={"../reports/charts/recruiterActivityInsights"}>Recruiter Activity Insights</Link>

        <Link to={"../reports/charts/pipelineInsights"}>Pipeline Insights</Link>
        <Link to={"../reports/charts/myGMandHeadCountReport"}>MY GM and Headcount Report</Link>

        {/* <Link to={"../reports/explocharts/talentCommunityOverview"}>ExploInsights</Link> */}

        
      </Grid>
      
      <Routes>
        <Route
          path="talentCommunityOverview"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <TalentCommunityInsights />
            </Suspense>
          }
        />
        <Route
          path="exploexecutiveInsights"
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
         {/* <Route
          path="talentCommunityOverview"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <TalentCommunityOverview />
            </Suspense>
          }
        /> */}
        {/*<Route
          path="demo"
          element={
            <Suspense fallback={<CircularProgress className="centered" />}>
              <Demo />
            </Suspense>
          }
        /> */}
      </Routes>
    </div >
    )
}

export default Explo;