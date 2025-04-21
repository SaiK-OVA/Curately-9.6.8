// import {Dialog,DialogTitle,DialogContent,Typography,LinearProgress,Box,IconButton,Button,} from "@mui/material";
import {Dialog, DialogTitle, DialogContent} from "../../../../../../shared/modules/MaterialImports/Dialog";
import {Typography} from "../../../../../../shared/modules/MaterialImports/Typography";
import {LinearProgress} from "@mui/material";
import {Box} from "../../../../../../shared/modules/MaterialImports/Box";
import CloseIcon from "@mui/icons-material/Close";
import "./AiMetrics.scss"; // Import the CSS file

const AiMetrics = ({ open, handleClose }: any) => {
    const metrics = [
        { name: "Sourced", count: 100, percentage: 100 },
        { name: "Reached", count: 90, percentage: 90 },
        { name: "Opened", count: 75, percentage: 75 },
        { name: "Clicked", count: 55, percentage: 55 },
        { name: "Responded", count: 30, percentage: 30 },
        { name: "Interested", count: 10, percentage: 10 },
        { name: "Interviewed", count: 10, percentage: 10 },
        { name: "Hired", count: 2, percentage: 2 },
    ];

    const diversityMetrics = [
        { name: "URG", percentage: 10 },
        { name: "Women", percentage: 10 },
        { name: "Veterans", percentage: 2 },
    ];

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
            <DialogTitle className="dialog-title">
                Metrics
                <CloseIcon onClick={handleClose} />
            </DialogTitle>
            <DialogContent dividers className="dialog-content">
                <p >
                    Here you can see the progression of the total number of candidates
                    sourced in this campaign.
                </p>
                <div className="MetricsPage">
                    <Box className="Metrics_sub">
                        {metrics.map((metric, index) => (
                            <Box key={index} className="metric-box">
                                <Typography variant="body2" className="metric-name">
                                    {metric.name} ({metric.count})
                                </Typography>
                                <Box className="progress-container">
                                    <LinearProgress
                                        variant="determinate"
                                        value={metric.percentage}
                                        className="linear-progress"
                                    />
                                </Box>
                                <Typography variant="caption" className="progress-percentage">
                                    {metric.percentage}%
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box className="diversity-metrics">
                        {diversityMetrics.map((metric, index) => (
                            <Box key={index} className="metric-box">
                                <Typography variant="body2" className="metric-name">
                                    {metric.name}
                                </Typography>
                                <Box className="progress-container">
                                    <LinearProgress
                                        variant="determinate"
                                        value={metric.percentage}
                                        className="linear-progress"
                                    />
                                </Box>
                                <Typography variant="caption" className="progress-percentage">
                                    {metric.percentage}%
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AiMetrics;
