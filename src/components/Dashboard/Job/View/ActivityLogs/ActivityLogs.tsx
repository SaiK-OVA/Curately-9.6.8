import React, { useState, useEffect } from 'react';
import './ActivityLogs.scss';
import { userLocalData } from '../../../../../shared/services/userData';
import { DateTime } from 'luxon';
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import ApiService from '../../../../../shared/api/api';
import { useParams } from 'react-router-dom';
// import masterJobData from '../../../../../shared/data/Job/Job';
import Extract from '../../../../../shared/utils/Extract';
import { Tooltip } from '../.././../../../shared/modules/MaterialImports/ToolTip';

import { styled } from '@mui/material/styles';
import { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        maxWidth: 650,
    },
});

const ActivityLog: React.FC = () => {
    const { jobId } = useParams();
    let clientId = userLocalData.getvalue('clientId');
    // let userId = userLocalData.getvalue('recrId');

    const [historyList, setHistoryList] = useState<any[]>();
    const getAllHistoryList = () => {
        ApiService.getCall('admin', `getHistory/${jobId}/${clientId}`)
            .then((response) => {
                if (response.data.Success) {
                    let historyList = response.data.historyList ? response.data.historyList : [];
                    for (let h = 0; h < historyList.length; h++) {
                        switch (historyList[h].name) {
                            // case "Pipeline Status":
                            //     historyList[h].old = masterJobData.jobStatusById(historyList[h].old); historyList[h].new = masterJobData.jobStatusById(historyList[h].new);
                            //     break;
                            // case "Priority":
                            //     historyList[h].old = masterJobData.priorityById(historyList[h].old); historyList[h].new = masterJobData.priorityById(historyList[h].new);
                            //     break;
                            // case "Job Type":
                            //     historyList[h].old = masterJobData.typeById(historyList[h].old); historyList[h].new = masterJobData.typeById(historyList[h].new);
                            //     break;
                            // case "Job Category":
                            //     historyList[h].old = masterJobData.jobCategoryById(historyList[h].old); historyList[h].new = masterJobData.jobCategoryById(historyList[h].new);
                            //     break;
                            // case "Job Hours":
                            //     historyList[h].old = masterJobData.hourById(historyList[h].old); historyList[h].new = masterJobData.hourById(historyList[h].new);
                            //     break;
                            // case "Work Type":
                            //     historyList[h].old = masterJobData.workTypeById(historyList[h].old); historyList[h].new = masterJobData.workTypeById(historyList[h].new);
                            //     break;

                            case "Public Job Description":
                            case "Original Job Description":
                                historyList[h].oldToolTipText = Extract.textFromHTML(historyList[h].old, true);
                                historyList[h].newToolTipText = Extract.textFromHTML(historyList[h].new.replace(/(?:\r\n|\r|\n)/g, '<br>'), true);
                                historyList[h].oldHTMLText = (historyList[h].oldToolTipText?.length > 30) ? historyList[h].oldToolTipText.slice(0, 30) + "..." : "";
                                historyList[h].newHTMLText = (historyList[h].newToolTipText?.length > 30) ? historyList[h].newToolTipText.slice(0, 30) + "..." : "";
                                break;
                            default: break;
                        }
                    }
                    setHistoryList(historyList);
                } else {
                    showToaster((response.data.Message) ? response.data.Message : 'An error occured', 'error');
                }

            })
    }

    useEffect(() => {
        getAllHistoryList();
    }, []);

    return (
        <div id="jobActivityLog">
            {historyList && historyList.map((activity, index) => (
                <div key={index} className="activityEntry p-2">
                    <div><span className="message">{activity.name}</span> updated from

                        {
                            (activity.oldToolTipText || activity.newToolTipText) ?
                                <>
                                    <CustomWidthTooltip title={activity.oldToolTipText} placement="top-start">
                                        <span className="message mt-5">{activity.oldHTMLText}</span>
                                    </CustomWidthTooltip>
                                    <span className='px-1'>to</span>
                                    <CustomWidthTooltip title={activity.newToolTipText} placement="top-start">
                                        <span className="message">{activity.newHTMLText} </span>
                                    </CustomWidthTooltip>
                                </>
                                :
                                <>
                                    <span className="message">{activity.old}</span>
                                    to
                                    <span className="message">{activity.new} </span>
                                </>
                        }




                    </div>
                    <div className="dateLogged pr-2">{activity.actiondate ? DateTime.fromFormat(activity.actiondate.substring(0, 19), 'yyyy-MM-dd hh:mm:ss').toFormat('MM/dd/yyyy hh:mm a') : ""}
                        - {activity.fullName}</div>
                </div>
            ))}
        </div>
    );
}

export default ActivityLog;
