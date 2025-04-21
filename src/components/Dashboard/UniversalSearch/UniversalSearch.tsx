// import React, { useEffect, useState } from "react";
import { useEffect, useState } from "./../../../shared/modules/React";
import { Accordion, AccordionSummary, AccordionDetails } from './../../../shared/modules/MaterialImports/Accordion';
// import Typography from '@mui/material/Typography';
import { MaterialReactTable, type MRT_ColumnDef } from "./../../../shared/modules/MaterialReactTable";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import { trackPromise } from './../../../shared/modules/PromiseTrackter';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ApiRequests from "../../../shared/api/api";
import { useParams } from "react-router-dom";

import './UniversalSearch.scss';
import { globalData } from "../../../shared/services/globalData";

//import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";

type Person = {
    candid: string;
    candname: string;
    phone1: string;
    email: string;
    crdate: string;
};

type Contact = {
    candid: string;
    company: string;
    compid: string;
    contid: string;
    contname: string;
    crdate: string;
    email: string;
    jobtitle: string;
    phone: string;
    web: string;
};

type Job = {
    jobid: string;
    reqno: string;
    jobtitle: string;
    company: string;
    city: string;
    state: string;
    crdate: string;
};

type Company = {
    compname: string;
    compId: string;
    crdate: string;
    phone: string;
    city: string;
    state: string;
};

const UniversalSearch = (
    // { searchString }: { searchString: string }
) => {

    const { searchString } = useParams();
    const [candidates, setCandidates] = useState<any>([]);
    const [contacts, setContacts] = useState<any>([]);
    const [jobs, setJobs] = useState<any>([]);
    const [company, setCompany] = useState<any>([]);
    const [isSearched, setIsSearched] = useState(0);


    const openCandidateView = (id: string) => {
        window.open(globalData.getWindowLocation() + "candidate/view/" + id.trim());
    }
    const columnsCandidates: MRT_ColumnDef<Person>[] = [
        // {
        //     accessorKey: "candid",
        //     header: "Id",
        //     size: 80,
        // },
        {
            accessorKey: "candname",
            header: "Name",
            Cell: ({ renderedCellValue, row }) => (
                <span className="hightLightTd" onClick={() => openCandidateView(row.original.candid)}>{row.original.candname}</span>
            ),
        },
        {
            accessorKey: "phone1",
            header: "Home Phone",
        },
        {
            accessorKey: "email",
            header: "Email",
            Cell: ({ row }) => (
                <span className="no-capitalization">{row.original.email}</span>
            ),
        },
        {
            accessorKey: "crdate",
            header: "Modified",
        },
    ];

    const openContactView = (id: string, compId: string) => {
        window.open(globalData.getWindowLocation() + "contact/view/" + id + "/" + compId);
    }
    const columnsContacts: MRT_ColumnDef<Contact>[] = [
        {
            accessorKey: "contname",
            header: "Name", Cell: ({ renderedCellValue, row }) => (
                <span className="hightLightTd" onClick={() => openContactView(row.original.contid, row.original.compid)}>{row.original.contname}</span>
            ),
        },
        // {
        //     accessorKey: "candid",
        //     header: "Id",
        //     size: 80,
        // },
        {
            accessorKey: "company",
            header: "Company",
        },
        // {
        //     accessorKey: "compid",
        //     header: "Company Id",
        //     size: 80,
        // },
        // {
        //     accessorKey: "contid",
        //     header: "Contact Id",
        //     size: 80,
        // },
        {
            accessorKey: "crdate",
            header: "Date",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "jobtitle",
            header: "Job Title",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "web",
            header: "Web",
        },
    ];

    const openJobView = (id: string) => {
        window.open(globalData.getWindowLocation() + "job/view/" + id);
    }
    const columnsJobs: MRT_ColumnDef<Job>[] = [
        {
            accessorKey: "jobid",
            header: "Job ID",
            size: 80,
            Cell: ({ renderedCellValue, row }) => (
                <span className="hightLightTd" onClick={() => openJobView(row.original.jobid)}>{row.original.jobid}</span>
            )
        },
        {
            accessorKey: "reqno",
            header: "Reqno",
        },
        {
            accessorKey: "jobtitle",
            header: "Job Title",
            size: 200,
        },
        {
            accessorKey: "company",
            header: "Company",
        },
        {
            accessorKey: "city",
            header: "City",
        },
        {
            accessorKey: "state",
            header: "State",
            size: 80,
        },
        {
            accessorKey: "crdate",
            header: "Date",
        },
    ];

    const openCompanyView = (id: string) => {
        window.open(globalData.getWindowLocation() + "company/view/" + id);
    }

    const columnsCompany: MRT_ColumnDef<Company>[] = [
        {
            accessorKey: "compname",
            header: "Company",
            enablePinning: true,
            Cell: ({ renderedCellValue, row }) => (
                (<span className="hightLightTd" onClick={() => openCompanyView(row.original.compId)}>{row.original.compname}</span>)
                // <Button onClick={() => openCandidateView(row.original.candId)}>{renderedCellValue}</Button>
            )
        },
        {
            accessorKey: "crdate",
            header: "Last Modified",
        },
        {
            accessorKey: "phone",
            header: "Phone",
        },
        {
            accessorKey: "city",
            header: "City",
        },
        {
            accessorKey: "state",
            header: "State",
        },
    ];
    // const searchString = "john";

    const loadCandidates = () => {
        trackPromise(
            ApiRequests.getByParams(193, 'Common/elasticResults.jsp', { type: 'candidate', search: searchString }).then(
                (response) => {
                    setIsSearched(isSearched + 1);
                    // console.log(response.data);
                    const canData = response.data.hits.hits;
                    let dataArry = [];
                    for (let i = 0; i < canData.length; i++) {
                        let candidate = {
                            candid: (canData[i]._source.Accuick.candid) ? canData[i]._source.Accuick.candid : '',
                            candname: (canData[i]._source.Accuick.candname) ? canData[i]._source.Accuick.candname : '',
                            phone1: (canData[i]._source.Accuick.phone1) ? canData[i]._source.Accuick.phone1 : '',
                            email: (canData[i]._source.Accuick.email) ? canData[i]._source.Accuick.email : '',
                            crdate: (canData[i]._source.Accuick.crdate) ? canData[i]._source.Accuick.crdate.substring(0, 10) : '',
                        }
                        dataArry.push(candidate);
                    }
                    // console.log(dataArry)
                    setCandidates(dataArry);
                }
            ))
    }

    const loadContacts = () => {
        trackPromise(
            ApiRequests.getByParams(193, 'Common/elasticResults.jsp', { type: 'contacts', search: searchString }).then(
                (response) => {
                    setIsSearched(isSearched + 1);
                    // console.log(response);
                    const conData = response.data.hits.hits;
                    let dataArry = [];
                    for (let i = 0; i < conData.length; i++) {
                        let contact = {
                            candid: (conData[i]._source.Accuick.candid) ? conData[i]._source.Accuick.candid : '',
                            company: (conData[i]._source.Accuick.company) ? conData[i]._source.Accuick.company : '',
                            compid: (conData[i]._source.Accuick.compid) ? conData[i]._source.Accuick.compid : '',
                            contid: (conData[i]._source.Accuick.contid) ? conData[i]._source.Accuick.contid : '',
                            contname: (conData[i]._source.Accuick.contname) ? conData[i]._source.Accuick.contname : '',
                            crdate: (conData[i]._source.Accuick.crdate) ? conData[i]._source.Accuick.crdate : '',
                            email: (conData[i]._source.Accuick.email) ? conData[i]._source.Accuick.email : '',
                            jobtitle: (conData[i]._source.Accuick.jobtitle) ? conData[i]._source.Accuick.jobtitle : '',
                            phone: (conData[i]._source.Accuick.phone1 && conData[i]._source.Accuick.phone2) ? conData[i]._source.Accuick.phone1 + ', ' + conData[i]._source.Accuick.phone2 : (conData[i]._source.Accuick.phone1) ? conData[i]._source.Accuick.phone1 : (conData[i]._source.Accuick.phone2) ? conData[i]._source.Accuick.phone2 : '',
                            web: (conData[i]._source.Accuick.web) ? conData[i]._source.Accuick.web : ''
                        }
                        dataArry.push(contact);
                    }
                    setContacts(dataArry);
                }
            ))
    }

    const loadCompanies = () => {
        setIsSearched(isSearched + 1);
        trackPromise(
            ApiRequests.getByParams(193, 'Common/elasticResults.jsp', { type: 'company', search: searchString }).then(
                (response) => {
                    // console.log(response);
                    const companyData = response.data.hits.hits;
                    let dataArry = [];
                    for (let i = 0; i < companyData.length; i++) {
                        let company = {
                            compId: (companyData[i]._id) ? companyData[i]._id : '',
                            compname: (companyData[i]._source.Accuick.compname) ? companyData[i]._source.Accuick.compname : '',
                            crdate: (companyData[i]._source.Accuick.crdate) ? companyData[i]._source.Accuick.crdate.substring(0, 10) : '',
                            phone: (companyData[i]._source.Accuick.phone) ? companyData[i]._source.Accuick.phone : '',
                            city: (companyData[i]._source.Accuick.city) ? companyData[i]._source.Accuick.city : '',
                            state: (companyData[i]._source.Accuick.state) ? companyData[i]._source.Accuick.state : ''
                        }
                        dataArry.push(company);
                    }
                    setCompany(dataArry);
                }
            ))
    }

    const loadJobs = () => {
        trackPromise(
            ApiRequests.getByParams(193, 'Common/elasticResults.jsp', { type: 'jobs', search: searchString }).then(
                (response) => {
                    setIsSearched(isSearched + 1);
                    // console.log(response.data);
                    const jobsData = response.data.hits.hits;
                    let dataArry = [];
                    for (let i = 0; i < jobsData.length; i++) {
                        let job = {
                            jobid: (jobsData[i]._source.Accuick.jobid) ? jobsData[i]._source.Accuick.jobid : '',
                            reqno: (jobsData[i]._source.Accuick.reqno) ? jobsData[i]._source.Accuick.reqno : '',
                            jobtitle: (jobsData[i]._source.Accuick.jobtitle) ? jobsData[i]._source.Accuick.jobtitle.replace("\\u0026#x2a;", "").replace("\\u0026#x2f;", "") : '',
                            company: (jobsData[i]._source.Accuick.company) ? jobsData[i]._source.Accuick.company : '',
                            city: (jobsData[i]._source.Accuick.city) ? jobsData[i]._source.Accuick.city : '',
                            state: (jobsData[i]._source.Accuick.state) ? jobsData[i]._source.Accuick.state : '',
                            crdate: (jobsData[i]._source.Accuick.crdate) ? jobsData[i]._source.Accuick.crdate.substring(0, 10) : ''
                        }
                        dataArry.push(job);
                    }
                    setJobs(dataArry);
                }
            ));
    }
    useEffect(() => {
        setIsSearched(0);
        loadCandidates();
        loadContacts();
        loadCompanies();
        loadJobs();
    }, [searchString])


    return (
        <div className="universalSearch">
            {
                (!candidates.length && !contacts.length && !jobs.length && !company.length) ?
                    <span className="noResults">No Results Found</span>
                    : null
            }
            {
                candidates.length ?
                    <Accordion defaultExpanded className="mb-4" style={{ height: "fit-content" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <span className="addHeader">Candidates</span>
                        </AccordionSummary>
                        <AccordionDetails>

                            <div className={`MRTableCustom`}>

                                <MaterialReactTable columns={columnsCandidates} data={candidates}
                                    enablePagination={false}
                                    enableGlobalFilter={false}
                                    initialState={{
                                        columnPinning: { left: ["mrt-row-select", "poolName"] },
                                        density: 'compact',
                                        showGlobalFilter: true,
                                        columnOrder: [
                                            "candname",
                                            "phone1",
                                            "email",
                                            "crdate",
                                        ]
                                    }}
                                    enablePinning
                                    enableStickyHeader
                                    enableColumnResizing
                                    enableGlobalFilterModes
                                    icons={{
                                        ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                                    }}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    : null

            }
            {
                contacts.length ?
                    <Accordion defaultExpanded className="mb-4">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <span className="addHeader">Contacts</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={`MRTableCustom`}>

                                <MaterialReactTable columns={columnsContacts} data={contacts}
                                    enablePagination={false}
                                    enableGlobalFilter={false}
                                    initialState={{
                                        density: 'compact',
                                        showGlobalFilter: true,
                                        columnOrder: [
                                            "contname",
                                            "company",
                                            "crdate",
                                            "email",
                                            "jobtitle",
                                            "phone",
                                            "web",
                                        ]
                                    }}
                                    enablePinning
                                    enableStickyHeader
                                    enableColumnResizing
                                    enableGlobalFilterModes
                                    icons={{
                                        ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                                    }}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    : null
            }
            {
                jobs.length ?
                    <Accordion defaultExpanded className="mb-4">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <span className="addHeader">Jobs</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={`MRTableCustom`}>

                                <MaterialReactTable columns={columnsJobs} data={jobs}
                                    enablePagination={false}
                                    enableGlobalFilter={false}
                                    initialState={{
                                        density: 'compact',
                                        showGlobalFilter: true,
                                        columnOrder: [
                                            "jobid",
                                            "reqno",
                                            "jobtitle",
                                            "company",
                                            "city",
                                            "state",
                                            "crdate",
                                        ]
                                    }}
                                    enablePinning
                                    enableStickyHeader
                                    enableColumnResizing
                                    enableGlobalFilterModes
                                    icons={{
                                        ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                                    }}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    : null
            }
            {
                company.length ?

                    <Accordion defaultExpanded className="mb-4">
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <span className="addHeader">Company</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={`MRTableCustom`}>

                                <MaterialReactTable columns={columnsCompany} data={company}
                                    enablePagination={false}
                                    enableGlobalFilter={false}
                                    initialState={{
                                        density: 'compact',
                                        showGlobalFilter: true,
                                        columnOrder: [
                                            "compname",
                                            "crdate",
                                            "phone",
                                            "city",
                                            "state",
                                        ]
                                    }}
                                    enablePinning
                                    enableStickyHeader
                                    enableColumnResizing
                                    enableGlobalFilterModes
                                    icons={{
                                        ArrowDownwardIcon: (props: any) => <SwitchLeftIcon  {...props} />
                                    }}
                                />
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    :
                    null
            }
        </div>
    );
};

export default UniversalSearch;
