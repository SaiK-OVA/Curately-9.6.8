import { ChangeEvent } from 'react';
import { useState, SyntheticEvent, useEffect, useCallback, useRef } from "../../../../../../shared/modules/React";
import { Box } from '../../../../../../shared/modules/MaterialImports/Box';
import { TextField } from '../../../../../../shared/modules/MaterialImports/FormInputs';
import { Tooltip } from '../../../../../../shared/modules/MaterialImports/ToolTip';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, IconButton } from '../../../../../../shared/modules/commonImports';

import { Popover } from '../../../../../../shared/modules/MaterialImports/Popover';
import { Tabs, Tab } from '../../../../../../shared/modules/MaterialImports/Tabs';
import { userLocalData } from "../../../../../../shared/services/userData";
import { matchPath, useLocation, useParams } from "react-router-dom";
import { trackPromise } from "../../../../../../shared/modules/PromiseTrackter";
import ApiService from '../../../../../../shared/api/api'
import DataObjectIcon from '@mui/icons-material/DataObject';
import { debounce } from 'lodash'
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// interface Place {
//     PlaceHolders: any;
// }
// interface PlaceHolderItem {
//     tablename: string;
//     viewfieldname: string;
//     columnvalue: string;
// }

// interface FilteredPlaceholders {
//     [tablename: string]: PlaceHolderItem[];
// }

// interface PlaceHoldersData {
//     PlaceHolders: {
//         [category: string]: PlaceHolderItem[];
//     };
// }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{ width: '360px' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const PlaceHolders = ({ onInsertField }: { onInsertField: (value: string) => void }) => {

    const [tabValue, setTabValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [placeholder, setPlaceholder] = useState<any>({});
    const [customPlaceholder, setCustomPlaceholder] = useState<any>({});
    const { candidateId, jobId, contactId } = useParams();
    const initialRender = useRef(true);

    const { pathname } = useLocation();

    const isCampaignPath = matchPath(`${userLocalData.getvalue('clientName')}/letter/campaigns/*`, pathname);
    const isAICampaignPath = matchPath(`${userLocalData.getvalue('clientName')}/letter/aicampaigns/*`, pathname);

    const [anchorPlaceEl, setAnchorPlaceEl] = useState<HTMLButtonElement | null>(null);

    const handleTabChange = (_: SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setSearchTerm("")
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const [isPlaceHoldersOpen, setIsPlaceHoldersOpen] = useState(false);

    const handlePopoverOpen = (event: any) => {
        setAnchorPlaceEl(event.currentTarget);
        setIsPlaceHoldersOpen(true);
    };

    const handleClosePlaceHolders = () => {
        setIsPlaceHoldersOpen(false);
        setAnchorPlaceEl(null);
    };

    const openPlaceHolder = Boolean(anchorPlaceEl);

    //     useEffect(() => {
    //         trackPromise(
    //             ApiService.postWithData('admin', 'placeHolders', {
    //                 clientId: "" + userLocalData.getvalue('clientId'),
    //                 userIds: candidateId ? candidateId : "",
    //                 jobId: jobId ? jobId : "",
    //                 recrId: userLocalData.getvalue('recrId')
    //             }).then(
    //                 (result: any) => {
    //                     setPlaceholder(result.data);
    //                 }
    //             )
    //         )

    //     }, [candidateId, jobId]
    // )

    const fetchPlaceholders = useCallback(
        debounce(() => {
            trackPromise(
                ApiService.postWithData('admin', 'placeHolders', {
                    clientId: userLocalData.getvalue('clientId'),
                    userIds: candidateId ? candidateId : "",
                    jobId: jobId ? jobId : "",
                    recrId: userLocalData.getvalue('recrId'),
                    contId: (contactId) ? contactId : '',
                }).then((result: any) => {
                    if ((result.data.Success === "true" || result.data.Success) && result.data.PlaceHolders) {
                        localStorage.setItem('PlaceHolders', JSON.stringify(result.data.PlaceHolders))
                        parsePlaceholders(result.data.PlaceHolders)
                    } else {
                        console.log(result)
                    }
                })
            );
        }, 600),
        [candidateId, jobId]
    );

    const parsePlaceholders = (placeHolder: any) => {
        let customPlaceHolders: any = {};
        if (placeHolder["Custom Details"] && Array.isArray(placeHolder["Custom Details"])) {
            for (let cd = 0; cd < placeHolder["Custom Details"].length; cd++) {
                const element = placeHolder["Custom Details"][cd];
                Object.keys(element).map(item => {
                    if (Array.isArray(placeHolder["Custom Details"][cd][item])) {
                        customPlaceHolders[item] = placeHolder["Custom Details"][cd][item];
                    }
                })

            }

        }

        if (Object.keys(customPlaceHolders).length === 0) {
            customPlaceHolders['Custom Details'] = placeHolder["Custom Details"] || [];
        }

        // delete placeHolder["Client Details"];
        // delete placeHolder["Recruiter Info"];
        // delete placeHolder["User Details"];
        if (isCampaignPath?.pathname || isAICampaignPath?.pathname) {
            delete placeHolder["Additional Details"];
            delete placeHolder["Contact Details"];
            delete placeHolder["Workflow URL"];
            if (isCampaignPath?.pathname) {
                delete placeHolder["Job Details"];
            }
        }

        delete placeHolder["Custom Details"];
        setPlaceholder(placeHolder);
        setCustomPlaceholder(customPlaceHolders);
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            // } else {
            // const Placeholders = localStorage.getItem('PlaceHolders');
            // if (Placeholders) {
            //     parsePlaceholders(JSON.parse(Placeholders))
            // } else {
            // fetchPlaceholders();
            // }
        }
        fetchPlaceholders();
        return () => {
            fetchPlaceholders.cancel();
        };
    }, []);

    const filteredPlaceholders = placeholder
        ? Object.keys(placeholder).reduce((acc, category) => {
            const filteredItems = placeholder[category] ? placeholder[category].filter((item: { viewfieldname: string }) =>
                item.viewfieldname.toLowerCase().includes(searchTerm.toLowerCase())
            ) : [];
            if (filteredItems.length > 0) {
                // @ts-ignore
                acc[category] = filteredItems;
            }
            return acc;
        }, {})
        : {};

    const customFilteredPlaceholders = customPlaceholder
        ? Object.keys(customPlaceholder).reduce((acc, category) => {
            const filteredItems = customPlaceholder[category] ? customPlaceholder[category]?.filter((item: { viewfieldname: string }) =>
                item.viewfieldname.toLowerCase().includes(searchTerm.toLowerCase())
            ) : [];
            if (filteredItems?.length > 0) {
                // @ts-ignore
                acc[category] = filteredItems;
            }
            return acc;
        }, {})
        : {};


    return (
        <div>
            <IconButton onClick={handlePopoverOpen} title="Placeholders" className='px-1'>
                <DataObjectIcon sx={{ color: '#444' }} />
            </IconButton>
            {
                (isPlaceHoldersOpen) &&
                <div>

                    <Popover
                        id="add-place-popover"
                        open={openPlaceHolder}
                        anchorEl={anchorPlaceEl}
                        onClose={handleClosePlaceHolders}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >

                        <Box>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
                                    <Tab style={{ textTransform: 'capitalize' }} label="Basics" {...a11yProps(0)} />
                                    <Tab style={{ textTransform: 'capitalize' }} label="Custom" {...a11yProps(1)} />
                                    {/* <Tab style={{ textTransform: 'capitalize' }} label="Advanced" {...a11yProps(2)} /> */}
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={tabValue} index={0}>
                                <div>
                                    <div className="px-3">
                                        <TextField
                                            placeholder="Search dynamic variables..."
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            variant="outlined"
                                            size="small"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="mt-3"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="dynamicVariables p-3">
                                        {Object.keys(filteredPlaceholders).map((category, index) => (
                                            category !== "Custom Details" ? <div key={index}>
                                                <div className="mt-1 mb-1 categoryName">{category}</div>

                                                {
                                                    // @ts-ignore
                                                    filteredPlaceholders[category]?.map((item: { viewfieldname: string, columnvalue: string }, idx: number) => (
                                                        <div className="fieldName" key={idx}>
                                                            <div className="viewFieldName" onClick={() => { onInsertField(item.viewfieldname), handleClosePlaceHolders() }}>{`{{${item.viewfieldname}}}`}</div>
                                                            {item?.columnvalue?.length > 25 ?
                                                                <Tooltip placement="right" title={item?.columnvalue ? <div dangerouslySetInnerHTML={{ __html: item.columnvalue }} /> : ""} >
                                                                    <div className="columnValue">{item.columnvalue}</div>
                                                                </Tooltip> :
                                                                <div className="columnValue">{item.columnvalue}</div>}
                                                        </div>
                                                    ))
                                                }
                                            </div> : null
                                        ))}
                                    </div>
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={tabValue} index={1}>
                                <div>
                                    <div className="px-3">
                                        <TextField
                                            placeholder="Search dynamic variables..."
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                )
                                            }}
                                            variant="outlined"
                                            size="small"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            className="mt-3"
                                            fullWidth
                                        />
                                    </div>
                                    <div className="dynamicVariables p-3">
                                        {Object.keys(customFilteredPlaceholders).map((tablename, index) => (
                                            <div key={index} >
                                                <div className="mt-1 mb-1 categoryName">{tablename}</div> {/* Display the table name */}
                                                {
                                                    // @ts-ignore
                                                    customFilteredPlaceholders[tablename].map((item: any, idx: number) => (
                                                        <div className="fieldName" key={idx}>
                                                            <div
                                                                className="viewFieldName"
                                                                onClick={() => { onInsertField(item.viewfieldname), handleClosePlaceHolders() }}
                                                            >
                                                                {`{{${item.viewfieldname}}}`}
                                                            </div>
                                                            {item.columnvalue?.length > 25 ? (
                                                                <Tooltip placement="right" title={item.columnvalue}>
                                                                    <div className="columnValue">{item.columnvalue}</div>
                                                                </Tooltip>
                                                            ) : (
                                                                <div className="columnValue">{item.columnvalue}</div>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CustomTabPanel>

                        </Box>

                    </Popover>
                </div>

            }
        </div >
    )
}
export default PlaceHolders;