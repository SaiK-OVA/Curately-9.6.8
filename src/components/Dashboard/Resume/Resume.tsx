import { React, Suspense } from '../../../shared/modules/React';
import { Outlet, Routes, Route } from 'react-router-dom';
import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress';
// import { RequireAuth } from '../../../shared/services/auth/validating';
import { userLocalData } from '../../../shared/services/userData';

import JobsAI from './JobsAI/JobsAI';
import UnAuthorized from '../../UnAuthorized/UnAuthorized';
import { ID_ADDON_PEOPLE_CANDIDATE } from '../../../shared/services/Permissions/IDs';

// const SearchAllResumes = React.lazy(() => import('./SearchAllResumes/SearchAllResumes'));
const CuratelySearch = React.lazy(() => import('./CuratelySearch/CuratelySearch'));
const People = React.lazy(() => import('./People/People'));
const AccuickResumeSearch = React.lazy(() => import('./AccuickResumeSearch/AccuickResumeSearch'));
const Community = React.lazy(() => import('./Community/Community'));
const SearchBot = React.lazy(() => import('./SearchBot/SearchBot'));
const Applicants = React.lazy(() => import('../Candidate/Applicants/Applicants'));
const HiringVolumeApplicants = React.lazy(() => import('./HiringVolumeApplicants/HiringVolumeApplicants'));
// const AccuickResumeSearch1 = React.lazy(() => import('./AccuickResumeSearch/AccuickResumeSearch1'));

// import CandidateApplicants from '../Job/View/Applicants/CandidateApplicants';


const Resume = () => {


    const { settingIds, integrationIds, adminIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
        settingIds: {},
        integrationIds: {},
        adminIds: {}
    };


    return (
        <div>
            <Routes>
                <Route path="applicants" element={
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        {/* <RequireAuth adminId={20018}> */}
                        {
                            adminIds[20018] && userLocalData.adminSettings(30002) ?
                                <HiringVolumeApplicants />
                                :
                                <Applicants />
                        }
                        {/* </RequireAuth> */}
                    </Suspense>}
                />
                <Route path="applicants/:recrId" element={
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        {/* <RequireAuth adminId={20018}> */}
                        {
                            adminIds[20018] && userLocalData.adminSettings(30002) ?
                                <HiringVolumeApplicants />
                                :
                                <Applicants />
                        }
                        {/* </RequireAuth> */}
                    </Suspense>}
                />
                <Route path="applicants" element={
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            adminIds[20018] ? <HiringVolumeApplicants /> : <UnAuthorized />
                        }
                        {/* <RequireAuth adminId={20018}><HiringVolumeApplicants /></RequireAuth> */}
                    </Suspense>}
                />
                <Route path="ask" element={
                    <Suspense fallback={<CircularProgress className="centered" />}><AccuickResumeSearch />
                    </Suspense>}
                />
                {/* <Route path="googleJobs" element={
                    <Suspense fallback={<CircularProgress className="centered" />}><AccuickResumeSearch1 />
                    </Suspense>} 
                    /> */}
                <Route path="community" element={
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            adminIds[20019] && settingIds[110008] ? <Community jobIdFromJobPage="" jobTitleFromJobPage="" isInJob={false} /> : <UnAuthorized />
                        }
                        {/* <RequireAuth adminId={20019} settingId={110008}><Community jobIdFromJobPage="" jobTitleFromJobPage="" isInJob={false} /></RequireAuth> */}
                    </Suspense>}
                />
                <Route path="jobsAI" element={
                    <Suspense fallback={<CircularProgress className="centered" />}><JobsAI />
                    </Suspense>}
                />
                <Route path="all" element={
                    <Suspense fallback={<CircularProgress className="centered" />}><CuratelySearch />
                    </Suspense>}
                />
                <Route path="jobBoards" element={
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            adminIds[20021] && integrationIds[400009] ? <CuratelySearch /> : <UnAuthorized />
                        }
                        {/* <RequireAuth adminId={20021} integrationId={400009}><CuratelySearch /></RequireAuth> */}
                    </Suspense>}
                />
                <Route path="searchBot" element={
                    <Suspense fallback={<CircularProgress className="centered" />}><SearchBot />
                    </Suspense>}
                />
                <Route path="people/*" element={
                    <Suspense fallback={<CircularProgress className="centered" />}>
                        {
                            adminIds[ID_ADDON_PEOPLE_CANDIDATE] ? <People /> : <UnAuthorized />
                        }
                        {/* <RequireAuth adminId={20022} integrationId={40006}><People /></RequireAuth> */}
                    </Suspense>}
                />

            </Routes>
            <Outlet></Outlet>
        </div >
    );
}
export default Resume;





