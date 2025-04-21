
import { Tab, Tabs, CustomTabProps } from '../../../../shared/modules/MaterialImports/Tabs';
import { Box } from '../../../../shared/modules/MaterialImports/Box';
import './CustomForms.scss';
import { ReactNode } from 'react';
import {  useState } from '../../../../shared/modules/React';
import ModuleForm from './ModuleForm/ModuleForm';
import { userLocalData } from '../../../../shared/services/userData';


interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            className={`${(value === index) ? '' : 'd-none'}`}
        >
            {
                value === index && (
                    <Box sx={{ pt: 1, pb: 0, pl: 1, pr: 0 }}>
                        {children}
                    </Box>
                )}
        </div>
    );
}

const CustomForms = () => {

    const [tabValue, setTabValue] = useState(1);
    const isCRMEnabled = !userLocalData.adminSettings(30003);


    return (
        <div id="CustomForms">
            <Tabs
                value={tabValue}
                onChange={(e, newValue: number) => setTabValue(newValue)}
                className="tableTabs pl-2"
            >
                {isCRMEnabled ?
                    <Tab value={1} label={"Job"} {...CustomTabProps(1)} />
                    :
                    null
                }
                <Tab value={2} label={"Candidate"} {...CustomTabProps(2)} />
                {isCRMEnabled ?
                    <Tab value={3} label={"Contact"} {...CustomTabProps(3)} />
                    :
                    null
                }
                <Tab value={4} label={"Application Form"} {...CustomTabProps(4)} />
            </Tabs>
            {isCRMEnabled ?
                <CustomTabPanel value={tabValue} index={1}>
                    <ModuleForm moduleId={20001} moduleName='Job Form data' />
                </CustomTabPanel>
                :
                null
            }
            <CustomTabPanel value={tabValue} index={2}>
                <ModuleForm moduleId={20002} moduleName='Candidate Form data' />
            </CustomTabPanel>
            {isCRMEnabled ?
                <CustomTabPanel value={tabValue} index={3}>
                    <ModuleForm moduleId={20004} moduleName='Contact Form data' />
                </CustomTabPanel>
                :
                null
            }
            <CustomTabPanel value={tabValue} index={4}>
                <ModuleForm moduleId={20039} moduleName='Application Form data' />
            </CustomTabPanel>
        </div>
    );
};

export default CustomForms;