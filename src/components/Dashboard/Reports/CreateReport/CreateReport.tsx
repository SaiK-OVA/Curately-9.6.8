import { createContext } from "react";
import { React, useState, useEffect, Suspense, useCallback } from "../../../../shared/modules/React";
import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { CircularProgress } from '../../../../shared/modules/MaterialImports/CircularProgress';
import {
    dataDynamicGroup as addDataDynamicGroup,
    // type addDynamicGroup 
} from './NewReport/AddDynamicReport';

import ApiService from '../../../../shared/api/api';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';

const SelectReportType = React.lazy(() => import('./SelectReportType/SelectReportType'));
// const NewReport = React.lazy(() => import('./NewReport/NewReport'));
const Dnd = React.lazy(() => import('./NewReport/React-Dnd-Wrap'));
const ModalReport = React.lazy(() => import('./ModalReport/ModalReport'));

// import { RequireAuth } from "../../../../shared/services/auth/validating";
import ListReport from "./ListReport/ListReport";
import { debounce } from 'lodash';
import UnAuthorized from "../../../UnAuthorized/UnAuthorized";

export const DynamicReportStore = createContext<any>([]);
export const DynamicFieldStore = createContext<any>([]);

const CreateReport = () => {

    const [addDynamicList, setAddDynamicList] = useState([...addDataDynamicGroup]);

    const [dataFieldList, setDataFieldLsit] = useState<any>([]);

    useEffect(() => {
        console.log("addDynamicList --- ");
        console.log(addDynamicList);
    }, [addDynamicList])


    const fetchJobReport = useCallback(debounce(() => {
        return trackPromise(
            ApiService.postWithData('admin', 'getJobsReport', {}).then((response: any) => {
                setDataFieldLsit(response.data.jobReportDetailsList);
            })
        );
    }, 600),
        []
    );

    useEffect(() => {
        fetchJobReport();

        return () => {

        };
    }, [fetchJobReport]);


    const { adminIds } = localStorage.getItem("masterRequireAuthSettings") ? JSON.parse(localStorage.getItem("masterRequireAuthSettings") as string) : {
        // settingIds: {},
        // integrationIds: {},
        adminIds: {}
    };


    return (
        <div id="CreateReport">
            <DynamicReportStore.Provider value={[addDynamicList, setAddDynamicList]}>
                <DynamicFieldStore.Provider value={[dataFieldList, setDataFieldLsit]}>
                    <Routes>
                        <Route index element={<Navigate to="SelectReportType" />} />
                        <Route
                            path="SelectReportType"
                            element={
                                <Suspense fallback={<CircularProgress className="centered" />}>
                                    <SelectReportType />
                                </Suspense>
                            }
                        />
                        <Route
                            path="new"
                            element={
                                <Suspense fallback={<CircularProgress className="centered" />}>
                                    {
                                        adminIds[20037] ? <Dnd /> : <UnAuthorized />
                                    }
                                    {/* < RequireAuth adminId={20037}><Dnd /></RequireAuth> */}
                                    {/* <NewReport /> */}

                                </Suspense>
                            }
                        />
                        <Route
                            path="dnd"
                            element={
                                <Suspense fallback={<CircularProgress className="centered" />}>
                                    <Dnd />
                                </Suspense>
                            }
                        />
                        <Route
                            path="ModalReport"
                            element={
                                <Suspense fallback={<CircularProgress className="centered" />}>
                                    <ModalReport />
                                </Suspense>
                            }
                        />
                        <Route
                            path="list"
                            element={
                                <Suspense fallback={<CircularProgress className="centered" />}>
                                    <ListReport />
                                </Suspense>
                            }
                        />
                        <Route
                            path="edit/:id"
                            element={
                                <Suspense fallback={<CircularProgress className="centered" />}>
                                    <Dnd />
                                </Suspense>
                            }
                        />
                    </Routes>

                    <Outlet></Outlet>
                </DynamicFieldStore.Provider>
            </DynamicReportStore.Provider>
        </div>
    )
}

export default CreateReport;