import { Box } from '../../../../../shared/modules/MaterialImports/Box';
import { Card } from '../../../../../shared/modules/MaterialImports/Card';
// import ClusteredColumnChart from '../Demo/ClusteredColumnChart/ClusteredColumnChart';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { TextField } from '../../../../../shared/modules/MaterialImports/TextField';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
// import Comparing from '../Demo/Comparing/Comparing';
import LineSerieswithDynamicData from '../Demo/LineSerieswithDynamicData/LineSerieswithDynamicData';
// import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
// import { Button } from '../../../../../shared/modules/MaterialImports/Button';
// import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import './OutreachKPI.scss';
import ApiService from "../../../../../shared/api/api";
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { useEffect, useState } from 'react';
import { userLocalData } from '../../../../../shared/services/userData';

export interface labelInterface {
    openRateByMonth: [];
    replyRateByMonth: [];
    openRateByTeamMember: [];
    replyRateByTeamMember: [];
    openRateByCampaign: [];
    replyRateByCampaign: [];
    selectedDate: [];
    dateFormat: [];
    chartLabels: [];
};

const Outreach = (props: any) => {
    const [openRateByMonth, setOpenRateByMonth] = useState<any>([]);
    const [replyRateByMonth, setReplyRateByMonth] = useState<any>([]);
    const [openRateByTeamMember, setOpenRateByTeamMember] = useState<any>([]);
    const [replyRateByTeamMember, setReplyRateByTeamMember] = useState<any>([]);
    const [openRateByCampaign, setOpenRateByCampaign] = useState<any>([]);
    const [replyRateByCampaign, setReplyRateByCampaign] = useState<any>({});
    const [selectedDate, setSelectedDate] = useState("LAST 30 DAYS");
    const [dateFormat, setDateFormat] = useState("yyyy-MM-DD");
    const [chartLabels, setChartLabels] = useState<labelInterface>({
        openRateByMonth: [],
        replyRateByMonth: [],
        openRateByTeamMember: [],
        replyRateByTeamMember: [],
        openRateByCampaign: [],
        replyRateByCampaign: [],
        selectedDate: [],
        dateFormat: [],
        chartLabels: [],
    });
    const [loading,setLoading]= useState(false);

    const getOpenRateDataByMonth = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getOpenrateByMonth', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "filterDurationType": selectedDate
        })
            .then((response: any) => {
                if (response.data.data && response.data.Success) {
                    setLoading(false)
                    let tempData: any = [];
                    const tempArry: any = [];
                    response.data?.data.forEach((item: any) => {
                        tempArry.push({
                            date: new Date(item.monthOrDate).getTime(),
                            value: item.openedEmailCount,
                        })
                    })
                    tempData.push(tempArry);
                    let tempLabels: any = ["Open Rate"];
                    setOpenRateByMonth(tempData)
                    setChartLabels(prevState => ({
                        ...prevState,
                        openRateByMonth: tempLabels
                    }))
                } else {
                      setLoading(false)
                    showToaster("Failed to fetch data", 'error');
                }
            })
            .catch(error => {
                  setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }

    const getReplyRateDataByMonth = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getReplyrateByMonth', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "filterDurationType": selectedDate
        })
            .then((response: any) => {
                if (response.data.data && response.data.Success) {
                    let tempData: any = [];
                    const tempArry: any = [];
                    response.data?.data.forEach((item: any) => {
                        tempArry.push({
                            date: new Date(item.monthOrDate).getTime(),
                            value: item.repliedEmailCount
                        })
                    })
                    tempData.push(tempArry);
                    let tempLabels: any = ["Reply Rate"];
                    setLoading(false)
                    setReplyRateByMonth(tempData)
                    setChartLabels(prevState => ({
                        ...prevState,
                        replyRateByMonth: tempLabels
                    }))

                } else {
                    setLoading(false)
                    showToaster("Failed to fetch data", 'error');
                }
            })
            .catch(error => {
                setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }

    const getOpenRateByTeamMember = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getOpenrateByTeamMember', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "filterDurationType": selectedDate
        })
            .then((response: any) => {
                if (response.data.Success) {
                    setLoading(false)
                    const teamMembersAry = response.data?.data;
                    let tempData: any = [];
                    let tempLabels: any = [];
                    teamMembersAry.forEach((arry: any) => {
                        const tempArry: any = [];
                        tempLabels.push(arry.fullName);
                        arry.data.forEach((item: any) => {
                            tempArry.push({
                                date: new Date(item.monthOrDate).getTime(),
                                value: item.openedEmailCount
                            })
                        })
                        tempData.push(tempArry)
                    });
                    setOpenRateByTeamMember(tempData)
                    setChartLabels(prevState => ({
                        ...prevState,
                        openRateByTeamMember: tempLabels
                    }))
                } else {
                    setLoading(false)
                    showToaster("Failed to fetch data ", 'error');
                }
            })
            .catch(error => {
                setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }

    const getReplyRateByTeamMember = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getReplyrateByTeamMember', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "filterDurationType": selectedDate
        })
            .then((response: any) => {
                if (response.data.Success) {
                    const teamMembersAry = response.data.data;
                    let tempData: any = [];
                    let tempLabels: any = [];
                    teamMembersAry.forEach((arry: any) => {
                        const tempArry: any = [];
                        tempLabels.push(arry.fullName);
                        arry.data.forEach((item: any) => {
                            tempArry.push({
                                date: new Date(item.monthOrDate).getTime(),
                                value: item.repliedEmailCount
                            })
                        })
                        tempData.push(tempArry)
                    });
                    setLoading(false)

                    setReplyRateByTeamMember(tempData)
                    setChartLabels(prevState => ({
                        ...prevState,
                        replyRateByTeamMember: tempLabels
                    }))
                } else {
                    setLoading(false)
                    showToaster("Failed to fetch data ", 'error');
                }
            })
            .catch(error => {
                setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }

    const getOpenRateByCampaign = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getOpenrateByCampaign', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "filterDurationType": selectedDate
        })
            .then((response: any) => {
                setLoading(false)
                if (response.data.Success) {
                    const teamMembersAry = response.data.data;
                    let tempData: any = [];
                    let tempLabels: any = [];
                    teamMembersAry.forEach((arry: any) => {
                        const tempArry: any = [];
                        tempLabels.push(arry.sequenceName);
                        arry.data.forEach((item: any) => {
                            tempArry.push({
                                date: new Date(item.monthOrDate).getTime(),
                                value: item.openedEmailCount,
                            })
                        })
                        tempData.push(tempArry);
                        setChartLabels(prevState => ({
                            ...prevState,
                            openRateByCampaign: tempLabels
                        }))
                    });
                    setOpenRateByCampaign(tempData)
                } else {
                    showToaster("Failed to fetch data ", 'error');
                }
            })
            .catch(error => {
                setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }

    const getReplyRateByCampaign = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getReplyrateByCampaign', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "filterDurationType": selectedDate
        })
            .then((response: any) => {
                if (response.data.Success) {
                    const teamMembersAry = response.data.data;
                    let tempData: any = [];
                    let tempLabels: any = [];
                    teamMembersAry.forEach((arry: any) => {
                        const tempArry: any = [];
                        tempLabels.push(arry.sequenceName);
                        arry.data.forEach((item: any) => {
                            tempArry.push({
                                date: new Date(item.monthOrDate).getTime(),
                                value: item.repliedEmailCount
                            })
                        })
                        tempData.push(tempArry)
                    });
                    setLoading(false)
                    setReplyRateByCampaign(tempData);
                    setChartLabels(prevState => ({
                        ...prevState,
                        replyRateByCampaign: tempLabels
                    }))
                } else {
                    setLoading(false)
                    showToaster("Failed to fetch data ", 'error');
                }
            })
            .catch(error => {
                setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }

    useEffect(() => {
        getOpenRateDataByMonth()
        getReplyRateDataByMonth()
        getOpenRateByTeamMember()
        getReplyRateByTeamMember()
        getOpenRateByCampaign()
        getReplyRateByCampaign()
    }, [selectedDate]);

    useEffect(() => {
        if (selectedDate === "LAST 6 MONTHS" || selectedDate === "LAST 12 MONTHS") {
            setDateFormat("yyyy-MM")
        } else {
            setDateFormat("yyyy-MM-DD")
        }
    }, [selectedDate])

    return (
        <div id="OutreachKPI">
            <Card className='customCard  mt-5' style={{ backgroundColor: 'var(--c-neutral-10) !important' }}>
                <div className='outreachBox'>
                    <div className='sourcingHeader'>
                        <Stack direction="row" spacing={1} alignItems="center" style={{ marginTop: '20px', marginLeft: '10px' }}>
                            {/* <Button className='label-btn' color="secondary" disabled variant="outlined" size="small" startIcon={<AddPhotoAlternateOutlinedIcon />} > Upload Logo </Button>
                        <Divider orientation="vertical" variant="middle" flexItem /> */}
                            <h4 className='content'>Outreach KPI</h4>
                        </Stack>
                    </div>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid>
                            <div className='GroupBy' >
                                <TextField fullWidth
                                    size="small"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    select
                                >
                                    <MenuItem value="LAST 30 DAYS">Last 30 Days</MenuItem>
                                    <MenuItem value="LAST 60 DAYS">Last 60 days</MenuItem>
                                    <MenuItem value="LAST 6 MONTHS">Last 6 Months</MenuItem>
                                    <MenuItem value="LAST 12 MONTHS">Last 12 Months</MenuItem>
                                    <MenuItem value="CURRENT WEEK">Current Week</MenuItem>
                                    <MenuItem value="CURRENT MONTH">Current Month</MenuItem>
                                </TextField>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className='outreachBox'>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Card className='customCard  mt-5'>
                                <LineSerieswithDynamicData
                                    dayOrMonth='month'
                                    id="Open rate by month"
                                    name="Open rate by month"
                                    data={openRateByMonth}
                                    dateformat={dateFormat}
                                    height='270px'
                                    labels={chartLabels.openRateByMonth}
                                    loading={loading}
                                />
                            </Card>
                        </Grid>
                        <Grid size={6}>
                            <Card className='customCard  mt-5'>
                                <LineSerieswithDynamicData
                                    dayOrMonth='month'
                                    id="Reply rate by month"
                                    name="Reply rate by month"
                                    data={replyRateByMonth}
                                    dateformat={dateFormat}
                                    height='270px'
                                    labels={chartLabels.replyRateByMonth}
                                    loading={loading}
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                <div className='outreachBox'>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Card className='customCard  mt-5'>
                                <LineSerieswithDynamicData
                                    dayOrMonth='month'
                                    id="Open rate by team member"
                                    name="Open rate by team member"
                                    data={openRateByTeamMember}
                                    dateformat={dateFormat}
                                    height='270px'
                                    labels={chartLabels.openRateByTeamMember}
                                    loading={loading}
                                />
                            </Card>
                        </Grid>
                        <Grid size={6}>
                            <Card className='customCard  mt-5'>
                                <LineSerieswithDynamicData
                                    dayOrMonth='month'
                                    id="Reply rate by team member"
                                    name="Reply rate by team member"
                                    data={replyRateByTeamMember}
                                    dateformat={dateFormat}
                                    height='270px'
                                    labels={chartLabels.replyRateByTeamMember}
                                    loading={loading}
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </div>
                <div className='outreachBox'>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Card className='customCard  mt-5'>
                                <LineSerieswithDynamicData
                                    dayOrMonth='month'
                                    id="Open rate by Campaign"
                                    name="Open rate by Campaign"
                                    data={openRateByCampaign}
                                    dateformat={dateFormat}
                                    height='270px'
                                    labels={chartLabels.openRateByCampaign}
                                    loading={loading}
                                />
                            </Card>
                        </Grid>
                        <Grid size={6}>
                            <Card className='customCard  mt-5'>
                                <LineSerieswithDynamicData
                                    dayOrMonth='month'
                                    id="Reply rate by Campaign"
                                    name="Reply rate by Campaign"
                                    data={replyRateByCampaign}
                                    dateformat={dateFormat}
                                    height='270px'
                                    labels={chartLabels.replyRateByCampaign}
                                    loading={loading}
                                />
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Card>
        </div>

    );
}
export default Outreach;