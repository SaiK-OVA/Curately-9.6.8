import { useEffect, useRef, useState } from "../../../../shared/modules/React";
import { userLocalData } from "../../../../shared/services/userData";

import { trackPromise } from "../../../../shared/modules/PromiseTrackter";
import ApiService from "../../../../shared/api/api";
import { DashboardCardInterface } from "../dashboardCardModel";

// import TrendLines from '../../Reports/Charts/Demo/TrendLines/TrendLines';
// import PieChart from "../../Reports/Charts/Demo/PieChart/PieChart";

import { ToggleButtonGroup, ToggleButton } from './../../../../shared/modules/MaterialImports/ToggleButton';
import { Tooltip } from './../../../../shared/modules/MaterialImports/ToolTip';
import Line from './../../../../shared/modules/ChartJS2/LineChart';
// import ChartJS from './../../../../shared/modules/ChartJS2/ChartJs2';


import './CardGraph.scss';
import { DateTime } from "../../../../shared/modules/Luxon";


const CardGraph = ({ cardData }: { cardData: DashboardCardInterface }) => {



    const [dateSelected, setDateSelected] = useState(3);
    const monthsForGraphDisplay = useRef<string[]>([]);


    const [lineData, setLineData] = useState<any>({
        labels: [''], // 'January', 'February', 'March', 'April', 'May', 'June', 'July'
        datasets: [
            {
                label: '',
                data: [], // 460, 200, 300, 180, 400, 500, 230
                borderColor: 'rgb(20, 110, 246)',
                backgroundColor: 'rgba(20, 110, 246, 0.5)',
            }
        ],
    });

    const getGraphData = (dates: { fromDate: string, toDate: string }) => {

        let dataToPass = {
            startDate: dates.fromDate,
            endDate: dates.toDate,
            clientId: userLocalData.getvalue('clientId'),
            recrId: userLocalData.getvalue('recrId'),
            stageId: ""
        }
        let ipToPass: 193 | 2168095 | 214 | 'admin' = 'admin';
        // const ipToPass = 'admin';
        let urlToPass = '';
        switch (cardData.id) {
            case 'jobsReceived':
                ipToPass = 'admin';
                urlToPass = 'dashBoardJobsGraph';
                break;
            case 'starts':
                urlToPass = 'dashBoardStartsGraph';
                break;
            case 'interviews':
                urlToPass = 'dashBoardStartsGraph';
                dataToPass.stageId = '300';
                break;
            case 'offersReceived':
                urlToPass = 'dashBoardStartsGraph';
                dataToPass.stageId = '400';
                break;
            case 'submissions':
                urlToPass = 'dashBoardStartsGraph';
                dataToPass.stageId = '100';
                break;
            case 'jobsWithoutSubs':
                break;
            case 'recruitersWOSubs':
                break;
            case 'recruitersWOShortlists':
                break;
            case 'recruitersWOInterviews':
                break;
            case 'swsc24h':
                // submissions without status change in 24 hours
                break;
            case 'aojwc':
                // Assigned/Owned job without coverage
                break;
            case 'scwsci3d':
                // Shortlisted candidates without status change in 3 days
                break;
            case 'iwsci5d':
                // Interviews without Status change in 5 days
                break;
            // case 'eeoc':
            //     break;
            // case 'eeocVeteran':
            //     // openGraph(unId);
            //     break;
            default:
                break;
        }
        if (urlToPass) {
            trackPromise(
                ApiService.postWithData(ipToPass, urlToPass, dataToPass).then(
                    (response: any) => {
                        if (ipToPass === 'admin') {
                            if (response.data.Message === 'Success') {
                                console.log(response.data);
                                if (response.data?.data?.length) {
                                    if (cardData.id === 'jobsReceived' || cardData.id === "starts") {
                                        let calculatedData = response.data.data;
                                        calculatedData = calculatedData.sort(function (a: { year: number; month: number }, b: { year: number; month: number }) {
                                            return a.year - b.year || a.month - b.month;
                                        });
                                        for (let si = 0; si < calculatedData.length; si++) {
                                            calculatedData[si].count = Number(calculatedData[si].count);
                                            if (calculatedData[si].month && calculatedData[si].year) {
                                                calculatedData[si].date = DateTime.fromFormat(calculatedData[si].month + " " + calculatedData[si].year, 'M yyyy').toFormat('LLL yyyy')
                                            }
                                        }

                                        setLineData({
                                            labels: calculatedData.map((item: { count: number, date: string }) => {
                                                return item.date;
                                            }),
                                            datasets: [
                                                {
                                                    label: '',
                                                    data: calculatedData.map((item: { count: number, date: string }) => {
                                                        return item.count;
                                                    }),
                                                    backgroundColor: 'rgb(255, 99, 132)',
                                                    borderColor: 'rgba(255, 99, 132, 0.5)',
                                                    // borderWidth: 1,
                                                }
                                            ]
                                        })
                                    }
                                    if (cardData.inputs.graphName === 'pie') {
                                        // setLineData(response.data);
                                    }
                                }
                            }
                            // } else if (ipToPass === 'admin') {
                            //     if (response.data.Message === 'Success') {
                            //         console.log(response.data);
                            //     }

                        }
                    }
                )
            )
        }
    }

    useEffect(() => {
        let tempMonths = []
        for (let lm = -11; lm <= 0; lm++) {
            tempMonths.push(DateTime.now().plus({ months: lm, }).toFormat('MMM-yy'));
        }
        monthsForGraphDisplay.current = tempMonths;
        updateDate("3");
    }, []);
    const updateDate = (newDate: string) => {
        let date = {
            fromDate: DateTime.fromObject({
                year: DateTime.now().plus({
                    months: -Math.abs(Number(newDate) - 1)
                }).toObject().year, month: DateTime.now().plus({
                    months: -Math.abs(Number(newDate) - 1)
                }).toObject().month, day: 1
            }).toFormat('yyyy-MM-dd'),
            toDate: DateTime.fromObject({
                year: DateTime.now().plus({
                    month: 1
                }).toObject().year, month: DateTime.now().plus({
                    month: 1
                }).toObject().month, day: 1
            }).plus({
                days: -1
            }).toFormat('yyyy-MM-dd')
        }
        getGraphData(date);
        console.log(date);
    }

    return (
        <>
            <ToggleButtonGroup
                color="primary"
                value={"" + dateSelected}
                exclusive
                onChange={(
                    event: React.MouseEvent<HTMLElement>,
                    newDate: string | null) => {
                    if (newDate) {
                        setDateSelected(Number(newDate));
                        updateDate(newDate);
                    }
                    // updateDefaultValuesData(cardsList[cardIndex].i, { ...cardsList[cardIndex].defaultValues, dateSelected: newDate });
                }}
                aria-label="Dates Selected"
                className='mb-2'
            >
                <Tooltip title="3 Months"><ToggleButton className='py-1 px-2' value="3">3 mo</ToggleButton></Tooltip>
                <Tooltip title="6 Months"><ToggleButton className='py-1 px-2' value="6">6 mo</ToggleButton></Tooltip>
                <Tooltip title="9 Months"><ToggleButton className='py-1 px-2' value="9">9 mo</ToggleButton></Tooltip>
                <Tooltip title="12 Months"><ToggleButton className='py-1 px-2' value="12">12 mo</ToggleButton></Tooltip>
            </ToggleButtonGroup>
            {
                cardData.inputs.graphName === 'line' ?
                    // <TrendLines id={cardData.i} name="" data={lineData} />
                    <Line data={lineData} options={{
                        plugins: {
                            legend: {
                                display: !1
                            },
                            title: {
                                display: !1
                            }
                        }, scales: {
                            y: {
                                beginAtZero: !0,
                                min: 0,
                                // max: o < 10 ? 10 : o
                            }
                        }
                    }} />
                    // :
                    // cardData.inputs.graphName === 'pie' ?
                    //     <PieChart id={cardData.i} data={lineData} />
                    :
                    null
            }
            {/* {cardData.id === 'eeoc' &&
                <Stack direction='row' justifyContent='space-around' alignItems='center'>
                    <PieChart
                        id={cardData.i + '1'}
                        data={lineData}
                        heading='Professionals'
                    />
                    <PieChart
                        id={cardData.i + '2'}
                        data={lineData}
                        heading='Submissions'
                    />
                    <PieChart
                        id={cardData.i + '3'}
                        data={lineData}
                        heading='Professionals'
                    />
                    <PieChart
                        id={cardData.i + '4'}
                        data={lineData}
                        heading='Professionals'
                    />
                </Stack>
            } */}
        </>
    )
}


export default CardGraph;