import { useState, useEffect } from 'react';
import { Card } from '../../../../../shared/modules/MaterialImports/Card';
import ClusteredColumnChart from '../Demo/ClusteredColumnChart/ClusteredColumnChart';
import { Grid } from '../../../../../shared/modules/MaterialImports/Grid';
import { TextField } from '../../../../../shared/modules/MaterialImports/TextField';
import { MenuItem } from '../../../../../shared/modules/MaterialImports/Menu';
// import { Divider } from '../../../../../shared/modules/MaterialImports/Divider';
import { Stack } from '../../../../../shared/modules/MaterialImports/Stack';
// import { Button } from '../../../../../shared/modules/MaterialImports/Button';
// import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import './Outreach.scss';
import ApiService from "../../../../../shared/api/api";
import { showToaster } from '../../../../shared/SnackBar/SnackBar';
import { DateTime } from '../../../../../shared/modules/Luxon';
import { userLocalData } from '../../../../../shared/services/userData';

const Outreach = () => {

    const [dataByMonth, setDataByMonth] = useState<any>([]);
    const [dataByCampaign, setDataByCampaign] = useState([]);
    const [dataByTeamMember, setDataByTeamMember] = useState([]);
    const [linkedinConnectData, setLinkedinConnectData] = useState([]);
    const [linkedinInmailsData, setLlinkedinInmailsData] = useState([]);
    const [selectedDate, setSelectedDate] = useState("LAST 30 DAYS");
    const [loading ,setLoading]= useState(false);
    // const [fromDate, setFromDate] = useState<any>();
    // const [toDate, setToDate] = useState<string>();

    const [dates, setDates] = useState({
        from: DateTime.now().minus({ days: 30 }).toISODate(),
        to: DateTime.now().toISODate()
    });

    const getRate = (total: number, count: number) => {
        if (total && count) {
            return Math.round(total / count)
        } else {
            return 0
        }
    }

    useEffect(() => {
        const calculatedFromDate =
            selectedDate === 'LAST 30 DAYS'
                ? DateTime.now().minus({ days: 30 }).toISODate()
                : selectedDate === 'LAST 60 DAYS'
                    ? DateTime.now().minus({ days: 60 }).toISODate()
                    : selectedDate === 'CURRENT WEEK'
                        ? DateTime.now().minus({ weeks: 1 }).toISODate()
                        : selectedDate === 'CURRENT MONTH'
                            ? DateTime.now().minus({ months: 1 }).toISODate()
                            : selectedDate === 'LAST 6 MONTHS'
                                ? DateTime.now().minus({ months: 6 }).toISODate()
                                : selectedDate === 'LAST 12 MONTHS'
                                    ? DateTime.now().minus({ months: 12 }).toISODate()
                                    : DateTime.now().toISODate();


        const fromDate = calculatedFromDate;
        const toDate = DateTime.now().toISODate() ?? '';
        setDates({ from: fromDate, to: toDate });
        // setFromDate(fromDate);
        // setToDate(toDate);
    }, [selectedDate])

    const getDataByMonth = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getOutreachByMonth', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId")
        })
            .then((response: any) => {
                if (response.data.data && response.data.Success) {
                    let tempData: any = [];
                    response.data.data.forEach((item: any) => {
                        tempData.push({
                            year: item.month,
                            value1: item.sentEmailCount,
                            value2: item.openedEmailCount,
                            value3: item.repliedEmailCount,
                        })
                    })
                    setLoading(false)
                    setDataByMonth(tempData)

                } else {
                    setLoading(false)
                    showToaster("Failed to fetch data", 'error');
                }
            })
            .catch(error => {
                // console.error("Error fetching data:", error);
                setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }

    const getDataByCampaign = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getOutreachByCampaign', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "fromDate": dates.from,
            "toDate": dates.to
        })
            .then((response: any) => {
                if (response.data.data && response.data.Success) {
                    let tempData: any = [];
                    response.data.data.forEach((item: any) => {
                        tempData.push({
                            year: item.sequenceName,
                            value1: item.sent,
                            value2: item.opened,
                            value3: item.replied,
                        })
                    })
                    setLoading(false)
                    setDataByCampaign(tempData)
                } else {
                    setLoading(false)
                    showToaster("Failed to fetch data", 'error');
                }
            })
            .catch(error => {
                // console.error("Error fetching data:", error);
                setLoading(false) 
                showToaster("Error fetching data - " + error, 'error');
            })
    }

    const getDataByTeamMember = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getOutreachByTeamMember', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "fromDate": dates.from,
            "toDate": dates.to
        })
            .then((response: any) => {
                setLoading(false)
                // console.log(response)
                if (response.data.data && response.data.Success) {
                    let tempData: any = [];
                    response.data.data.forEach((item: any) => {
                        tempData.push({
                            year: item.fullName,
                            value1: item.viewedOnLinkedin,
                            value2: item.addedToCurately,
                            value3: item.sentEmailCount,
                            value4: item.repliedEmailCount,
                        })
                    })
                    setDataByTeamMember(tempData);

                } else {
                    setLoading(false)
                    showToaster("Failed to fetch data", 'error');
                }
            })
            .catch(error => {
                // console.error("Error fetching data:", error);
                setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }


    const getLinkedInConnectData = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getLinkedinConnectReportByTeamMember', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "fromDate": dates.from,
            "toDate": dates.to
        })
            .then((response: any) => {
                // console.log(response)
                setLoading(false)
                if (response.data.data && response.data.Success) {
                    setLinkedinConnectData(response.data.data)
                } else {
                    setLoading(false)
                    showToaster("Failed to fetch data", 'error');
                }
            })
            .catch(error => {
                // console.error("Error fetching data:", error);
                setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }

    const getLinkedInInmailsData = () => {
        setLoading(true)
        ApiService.postWithData('admin', 'getLinkedinInMailsReportByTeamMember', {
            "clientId": userLocalData.getvalue("clientId"),
            "recrId": userLocalData.getvalue("recrId"),
            "fromDate": dates.from,
            "toDate": dates.to
        })
            .then((response: any) => {
                setLoading(false)
                // console.log(response)
                if (response.data.data && response.data.Success) {
                    setLlinkedinInmailsData(response.data.data)
                } else {
                    showToaster("Failed to fetch data", 'error');
                }
            })
            .catch(error => {
                // console.error("Error fetching data:", error);
                setLoading(false)
                showToaster("Error fetching data - " + error, 'error');
            })
    }
    useEffect(() => {
        loadAllAPIs();
    }, [dates]);

    const loadAllAPIs = () => {

        getDataByMonth();
        getDataByCampaign();
        getDataByTeamMember();
        getLinkedInConnectData();
        getLinkedInInmailsData();
    }



    return (
        <div id="Outreach">
            <Card className='customCard  mt-5' style={{ backgroundColor: 'var(--c-neutral-10) !important' }}>
                <div className='outreachBox'>
                    <Grid container spacing={2} className='ml-2 mt-5'>
                        <div className='sourcingHeader'>
                            <Stack direction="row" spacing={1} alignItems="center">
                                {/* <Button className='label-btn' color="secondary" disabled variant="outlined" size="small" startIcon={<AddPhotoAlternateOutlinedIcon />} > Upload Logo </Button> */}
                                {/* <Divider orientation="vertical" variant="middle" flexItem /> */}
                                <h4 className='content'>Outreach Activity</h4>
                            </Stack>
                        </div>
                    </Grid>
                    <Grid container justifyContent="space-between" >
                        <Grid>
                            <div className='GroupBy '>
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
                    <div>
                        <ClusteredColumnChart id={"cls"} height={'240px'} width={"98%"} name="Outreach by month" data={dataByMonth} labels={["Sent", "Opened", "Replied"]} loading={loading} />
                    </div>
                    <div className='tablesDiv'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Sent</th>
                                    <th>Opened</th>
                                    <th>(Rate) </th>
                                    <th>Replied</th>
                                    <th>(Rate) </th>

                                </tr>
                            </thead>
                            <tbody>
                                {dataByMonth?.map((data: any, i: number) => (
                                    <tr key={i}>
                                        <td>{data?.year}</td>
                                        <td>{data?.value1}</td>
                                        <td>{data?.value2}</td>
                                        <td>{getRate(data?.value1, data?.value2)}%</td>
                                        <td>{data.value3}</td>
                                        <td>{getRate(data?.value1, data.value3)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='outreachBox'>
                    <div>
                        <ClusteredColumnChart id={"campaign"} height={'240px'} width={"98%"} name="Outreach by Campaign" data={dataByCampaign} labels={["Sent", "Opened", "Replied"]} loading={loading} />
                    </div>
                    <div className='tablesDiv'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Sent</th>
                                    <th>Opened</th>
                                    <th>(Rate) </th>
                                    <th>Replied</th>
                                    <th>(Rate) </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataByCampaign?.map((data: any, i: number) => (
                                    <tr key={i}>
                                        <td>{data?.year}</td>
                                        <td>{data?.value1}</td>
                                        <td>{data?.value2}</td>
                                        <td>{getRate(data?.value1, data?.value2)}%</td>
                                        <td>{data.value3}</td>
                                        <td>{getRate(data?.value1, data.value3)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='outreachBox'>
                    <div>
                        <ClusteredColumnChart id={"team member"} height={'240px'} width={"98%"} name="Outreach by Team Member" data={dataByTeamMember} labels={["Viewed on Linkedin", "Added to Curately", "Emails sent", "Replies received"]} loading={loading}/>
                    </div>
                    <div className='tablesDiv'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Viewed on Linkedin</th>
                                    <th>Added to Curately</th>
                                    <th>Emails sent </th>
                                    <th>Replies received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataByTeamMember?.map((data: any, i: number) => (
                                    <tr key={i}>
                                        <td>{data?.year}</td>
                                        <td>{data?.value1}</td>
                                        <td>{data?.value2}</td>
                                        <td>{data?.value3}</td>
                                        <td>{data?.value4}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className='outreachBox'>
                    <h4>LinkedIn Viewed Profiles by team member</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Viewed Profiles</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linkedinConnectData?.map((data: any, i: number) => (
                                <tr key={i}>
                                    <td>{data?.fullName}</td>
                                    <td>{data?.connectCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='outreachBox'>
                    <h4>Linkedin Inmails sent by team member</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Inmails sent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linkedinInmailsData?.map((data: any, i: number) => (
                                <tr key={i}>
                                    <td>{data?.fullName}</td>
                                    <td>{data?.inMailsSent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>

    );
}
export default Outreach;