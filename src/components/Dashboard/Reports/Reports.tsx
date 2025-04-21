import { useEffect, useState } from "../../../shared/modules/React";
// Suspense
import { Navigate, useParams } from "react-router-dom";
import { userLocalData } from "../../../shared/services/userData";
import TalentCommunityOverview from "./ExploCharts/TalentCommunity/TalentCommunityOverview";
import HiringInsightsMaster from "./ExploCharts/HiringInsignts/HiringInsightsMaster";
import SourcingInsights from "./ExploCharts/SourcingInsights";
import RecuriterActivityInsights from "./ExploCharts/RecuriterActivityInsignts";
import PipelineInsights from "./ExploCharts/PipelineInsights";
import ExecutiveInsightsMaster from "./ExploCharts/ExecutiveInsights/ExecutiveInsightsMaster";
import JobActivityMaster from "./ExploCharts/JobActivityInsights/JobActivityMaster";
// import { Outlet, Route, Routes } from "react-router-dom";
// import CircularProgress from "@mui/material/CircularProgress";
// import JobsReport from "./Jobs/JobsReport";
// import PipelineInsights from "./PipelineInsights/PipelineInsights";

type IntegrationId = 400035 | 400030 | 400031 | 400032 | 400033 | 400036;
type SettingId = 20029 | 20030 | 20031 | 20032 | 20033 | 20034 | 20035 | 20036;
type BlockingSettingId = 30003;

type ReportConfig = {
  integrationId?: IntegrationId;
  settingId?: SettingId;
  blockingSettingId?: BlockingSettingId;
  component?: () => JSX.Element;
  url?: string;
};

const REPORTS_CONFIG: Record<string, ReportConfig> = {
  TalentCommunityInsights: {
    integrationId: 400035,
    settingId: 20029,
    blockingSettingId: 30003,
    component: TalentCommunityOverview,
    url: "https://us-west-2.quicksight.aws.amazon.com/sn/embed/share/accounts/068652499116/dashboards/63a7ffe8-dc07-44fe-b797-9bb8dd7b40a7?directory_alias=accuickquicksight"
  },
  ExecutiveInsights: {
    integrationId: 400030,
    settingId: 20030,
    blockingSettingId: 30003,
    component: ExecutiveInsightsMaster,
    url: "https://app.mokkup.ai/embed/b40c0531-ec58-4d95-9dff-c7179ce05e29"
  },
  HiringInsights: {
    integrationId: 400031,
    settingId: 20031,
    component: HiringInsightsMaster,
    url: "https://app.mokkup.ai/embed/c7c21516-4369-4eb7-9ad1-4f29f8a77048"
  },
  SourcingInsights: {
    integrationId: 400033,
    settingId: 20032,
    component: SourcingInsights,
    url: "https://app.mokkup.ai/embed/b53969eb-c3ce-4abc-9be6-3d36d9990991"
  },
  PipelineInsights: {
    integrationId: 400036,
    settingId: 20033,
    component: PipelineInsights,
    url: "https://app.mokkup.ai/embed/5b44ae4d-d8c3-42ad-b90a-f98f0314dbd9"
  },
  RecruiterActivityInsights: {
    integrationId: 400032,
    settingId: 20034,
    component: RecuriterActivityInsights,
    url: "https://app.mokkup.ai/embed/66170e5c-32d9-443a-bdad-545f82a79058"
  },
  JobActivityInsights: {
    component: JobActivityMaster,
  },
  CreateDashboard: {
    settingId: 20035,
    blockingSettingId: 30003,
    url: "https://app.curately.ai/quicksight-demo/"
  },
  QuickSight: {
    url: "https://us-west-2.quicksight.aws.amazon.com/sn/embed/share/accounts/068652499116/dashboards/9f0d3bca-e805-4d9e-ac47-1f0a170cffe4?directory_alias=accuickquicksight"
  },
  AIDataAnalyst: {
    settingId: 20036,
    blockingSettingId: 30003,
    url: "https://data.curately.ai/"
  }
};

const Reports = () => {
    const { reportName = "", clientName } = useParams();
    const [content, setContent] = useState<string | JSX.Element>("");

    const enableExploReports = () => [6, 55].includes(userLocalData.getvalue("clientId"));
    
    const hasAccess = (config: ReportConfig): boolean => {
        const { integrationId, settingId, blockingSettingId } = config;
        
        const hasIntegration = integrationId ? userLocalData.checkIntegration(integrationId) : true;
        const hasSetting = settingId ? userLocalData.adminSettings(settingId) : true;
        const isBlocked = blockingSettingId ? userLocalData.adminSettings(blockingSettingId) : false;
        
        return hasIntegration && hasSetting && !isBlocked;
    };

    useEffect(() => {
        const config = REPORTS_CONFIG[reportName];
        if (!config) {
            setContent("");
            return;
        }

        if (!hasAccess(config)) {
            setContent("unAuth");
            return;
        }

        if (enableExploReports() && config.component) {
            setContent(<config.component />);
        } else if (config.url) {
            setContent(config.url);
        } else {
            setContent("");
        }
    }, [reportName]);

    if (content === "unAuth") {
        return <Navigate to={`/${clientName}/unAuthorized`} />;
    }

    const isExploReport = enableExploReports() && 
        reportName && 
        ["TalentCommunityInsights", "ExecutiveInsights", "HiringInsights", 
         "SourcingInsights", "RecruiterActivityInsights", "PipelineInsights", "JobActivityInsights"].includes(reportName);

    return isExploReport ? 
        <>{content}</> : 
        <iframe src={content as string} title="Reports" className="iframeInApp" />;
}

export default Reports;