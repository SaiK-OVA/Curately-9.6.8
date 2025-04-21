// import React, { useState } from 'react';
import { useState } from '../../../../shared/modules/React';
import { trackPromise } from '../../../../shared/modules/PromiseTrackter';
import ApiService from "../../../../shared/api/api";
import './GetActivities.scss'; 

const ActivityLogComponent = () => {
    const [candidateId, setCandidateId] = useState('');
    const [activityLog, setActivityLog] = useState([]);

    const handleInputChange = (e) => {
        setCandidateId(e.target.value);
    };

    const handleButtonClick = () => {
        loadActivityLog(candidateId);
    };

    const loadActivityLog = (candidateId) => {
        trackPromise(
            ApiService.getCall(216, `/QADemoCurately/getactivityLog/${candidateId}`)
                .then((response) => {
                    if (response.data.Success) {
                        setActivityLog(response.data.activityLog);
                    } else {
                        console.error('Error fetching activity log:', response.data);
                    }
                })
                .catch((error) => {
                    console.error('API call failed:', error);
                })
        );
    };

    return (
        <div className="activity-log-container">
            <div className="input-container">
                <label htmlFor="candidateId">Enter Candidate ID</label>
                <input
                    type="text"
                    id="candidateId"
                    value={candidateId}
                    onChange={handleInputChange}
                />
                <button onClick={handleButtonClick}>Get Activities</button>
            </div>

            {activityLog.length > 0 && (
                <div className="activity-log">
                    <h2>Recent Activities</h2>
                    <ul className="activity-log-list">
                        {activityLog.map((activity, index) => (
                            <li key={index} className="activity-log-item">
                                <span className="activity-bullet">•</span>
                                <div className="activity-content">
                                    <span className="activity-description">{activity.descr}</span>
                                    <span className="activity-date">{new Date(activity.actionDate).toLocaleString()}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ActivityLogComponent;
