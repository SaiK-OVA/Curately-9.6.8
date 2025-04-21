import { useEffect, useState, useCallback } from 'react';

import { Link, useParams } from 'react-router-dom';

import './ReportSequence.scss';
import { Button, Grid } from '../../../../../shared/modules/commonImports';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

import ApiService from '../../../../../shared/api/api';
import { trackPromise } from 'react-promise-tracker';
import { userLocalData } from '../../../../../shared/services/userData';
import { debounce } from 'lodash';

const ReportSequence = () => {

    const { SequenceId } = useParams();
    const { sequenceType } = useParams();



    interface Stage {
        stages_no: string;
        active_count: string;
        bounce_count: string;
        click_count: string;
        fail_count: string;
        finish_count: string;
        open_count: string;
        reply_count: string;
        sent_count: string;
        unsubscribe_count: string;
        body: string;
        subject: string;
        mailBody: string;
    }

    interface SequenceData {
        sequence_name: string;
        stages: Stage[];
        total_active_count: string;
        total_bounce_count: string;
        total_click_count: string;
        total_deliverd_count: string;
        total_fail_count: string;
        total_finish_count: string;
        total_open_count: string;
        total_reply_count: string;
        total_unsubscribe_count: string;
    }

    const [sequenceData, setSequenceData] = useState<SequenceData>(
        {
            sequence_name: "",
            stages: [
                {
                    stages_no: "",
                    active_count: "-",
                    bounce_count: "-",
                    click_count: "-",
                    fail_count: "-",
                    finish_count: "-",
                    open_count: "-",
                    reply_count: "-",
                    sent_count: "-",
                    unsubscribe_count: "-",
                    body: "",
                    subject: "",
                    mailBody: ""
                }
            ],
            total_active_count: "-",
            total_bounce_count: "-",
            total_click_count: "-",
            total_deliverd_count: "-",
            total_fail_count: "-",
            total_finish_count: "-",
            total_open_count: "-",
            total_reply_count: "-",
            total_unsubscribe_count: "-"
        }
    );

    useEffect(() => {
        if (SequenceId) {
            loadUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadUserData = useCallback(debounce(() => {
        let tempUser = (SequenceId) ? SequenceId : "";
        const clientId = userLocalData.getvalue('clientId')
        if (sequenceType === 'candidate') {
            trackPromise(
                ApiService.postWithData('admin', 'getSequenceStageList', {
                    sequenceId: +tempUser, clientId
                }).then((response: any) => {

                    //console.log(response.data.list[0].stages);
                    // if (response.data.Status === 200) {
                    // let temp_unsubscribe_count = 0,
                    //     temp_bounce_count = 0,
                    //     temp_click_count = 0,
                    //     temp_open_count = 0,
                    //     temp_reply_count = 0,
                    //     temp_total_active_count = 0,
                    //     temp_sent_count = 0;
                    // let newStage: any = [];
                    // for (let ns = 0; ns < response.data.array.length; ns++) {
                    //     newStage.push(response.data.array[ns]);
                    //     newStage[ns].mailBody = extractContent(newStage[ns].body, true);
                    //     temp_unsubscribe_count = temp_unsubscribe_count + Number(newStage[ns].unsubscribe_count);
                    //     temp_bounce_count = temp_bounce_count + Number(newStage[ns].bounce_count);
                    //     temp_click_count = temp_click_count + Number(newStage[ns].click_count);
                    //     temp_open_count = temp_open_count + Number(newStage[ns].open_count);
                    //     temp_reply_count = temp_reply_count + Number(newStage[ns].reply_count);
                    //     // temp_total_active_count = temp_total_active_count + Number(newStage[ns].total_active_count);
                    //     temp_sent_count = temp_sent_count + Number(newStage[ns].sent_count);
                    // }
                    let stages: any = [];
                    for (let ns = 0; ns < response.data.list[0].stages.length; ns++) {
                        stages.push({
                            mailBody: extractContent(response.data.list[0].stages[ns].body, true),
                            stages_no: response.data.list[0].stages[ns].stages_no,
                            active_count: (response.data.list[0].stages[ns].active_count && response.data.list[0].stages[ns].active_count !== "0") ? response.data.list[0].stages[ns].active_count : "-",
                            bounce_count: (response.data.list[0].stages[ns].bounce_count && response.data.list[0].stages[ns].bounce_count !== "0") ? response.data.list[0].stages[ns].bounce_count : "-",
                            click_count: (response.data.list[0].stages[ns].click_count && response.data.list[0].stages[ns].click_count !== "0") ? response.data.list[0].stages[ns].click_count : "-",
                            fail_count: (response.data.list[0].stages[ns].fail_count && response.data.list[0].stages[ns].fail_count !== "0") ? response.data.list[0].stages[ns].fail_count : "-",
                            finish_count: (response.data.list[0].stages[ns].finish_count && response.data.list[0].stages[ns].finish_count !== "0") ? response.data.list[0].stages[ns].finish_count : "-",
                            open_count: (response.data.list[0].stages[ns].open_count && response.data.list[0].stages[ns].open_count !== "0") ? response.data.list[0].stages[ns].open_count : "-",
                            reply_count: (response.data.list[0].stages[ns].reply_count && response.data.list[0].stages[ns].reply_count !== "0") ? response.data.list[0].stages[ns].reply_count : "-",
                            sent_count: (response.data.list[0].stages[ns].sent_count && response.data.list[0].stages[ns].sent_count !== "0") ? response.data.list[0].stages[ns].sent_count : "-",
                            unsubscribe_count: (response.data.list[0].stages[ns].unsubscribe_count && response.data.list[0].stages[ns].unsubscribe_count !== "0") ? response.data.list[0].stages[ns].unsubscribe_count : "-",
                            body: response.data.list[0].stages[ns].body,
                            subject: response.data.list[0].stages[ns].subject
                        });
    
                    }
                    setSequenceData(
                        {
                            sequence_name: response.data.list[0].sequence_name,
                            stages: stages,
                            total_active_count: (response.data.list[0].total_active_count && response.data.list[0].total_active_count !== "0") ? response.data.list[0].total_active_count : "-",
                            total_bounce_count: (response.data.list[0].total_bounce_count && response.data.list[0].total_bounce_count !== "0") ? response.data.list[0].total_bounce_count : "-",
                            total_click_count: (response.data.list[0].total_click_count && response.data.list[0].total_click_count !== "0") ? response.data.list[0].total_click_count : "-",
                            total_deliverd_count: (response.data.list[0].total_deliverd_count && response.data.list[0].total_deliverd_count !== "0") ? response.data.list[0].total_deliverd_count : "-",
                            total_fail_count: (response.data.list[0].total_fail_count && response.data.list[0].total_fail_count !== "0") ? response.data.list[0].total_fail_count : "-",
                            total_finish_count: (response.data.list[0].total_finish_count && response.data.list[0].total_finish_count !== "0") ? response.data.list[0].total_finish_count : "-",
                            total_open_count: (response.data.list[0].total_open_count && response.data.list[0].total_open_count !== "0") ? response.data.list[0].total_open_count : "-",
                            total_reply_count: (response.data.list[0].total_reply_count && response.data.list[0].total_reply_count !== "0") ? response.data.list[0].total_reply_count : "-",
                            total_unsubscribe_count: (response.data.list[0].total_unsubscribe_count && response.data.list[0].total_unsubscribe_count !== "0") ? response.data.list[0].total_unsubscribe_count : "-"
                        }
                    );
                    // sequenceName: (response.data.array.length) ? response.data.array[0].sequence_name : '',
                    // unsubscribe_count: temp_unsubscribe_count,
                    // bounce_count: temp_bounce_count,
                    // click_count: temp_click_count,
                    // open_count: temp_open_count,
                    // reply_count: temp_reply_count,
                    // total_active_count: (newStage[0].total_active_count) ? newStage[0].total_active_count : '-',
                    // sent_count: temp_sent_count,
                    // stages: newStage


                    // }
                })
            );
        }
        if (sequenceType === 'contact') {
            trackPromise(
                ApiService.postWithData('admin', 'getSequenceContactStageList', {
                    sequenceId: +tempUser, clientId: clientId
                }).then((response: any) => {

                    // console.log(response);
                    // if (response.data.Status === 200) {
                    // let temp_unsubscribe_count = 0,
                    //     temp_bounce_count = 0,
                    //     temp_click_count = 0,
                    //     temp_open_count = 0,
                    //     temp_reply_count = 0,
                    //     temp_total_active_count = 0,
                    //     temp_sent_count = 0;
                    // let newStage: any = [];
                    // for (let ns = 0; ns < response.data.array.length; ns++) {
                    //     newStage.push(response.data.array[ns]);
                    //     newStage[ns].mailBody = extractContent(newStage[ns].body, true);
                    //     temp_unsubscribe_count = temp_unsubscribe_count + Number(newStage[ns].unsubscribe_count);
                    //     temp_bounce_count = temp_bounce_count + Number(newStage[ns].bounce_count);
                    //     temp_click_count = temp_click_count + Number(newStage[ns].click_count);
                    //     temp_open_count = temp_open_count + Number(newStage[ns].open_count);
                    //     temp_reply_count = temp_reply_count + Number(newStage[ns].reply_count);
                    //     // temp_total_active_count = temp_total_active_count + Number(newStage[ns].total_active_count);
                    //     temp_sent_count = temp_sent_count + Number(newStage[ns].sent_count);
                    // }
                    let stages: any = [];
                    for (let ns = 0; ns < response.data.list[0].stages.length; ns++) {
                        stages.push({
                            mailBody: extractContent(response.data.list[0].stages[ns].body, true),
                            stages_no: response.data.list[0].stages[ns].stages_no,
                            active_count: (response.data.list[0].stages[ns].active_count && response.data.list[0].stages[ns].active_count !== "0") ? response.data.list[0].stages[ns].active_count : "-",
                            bounce_count: (response.data.list[0].stages[ns].bounce_count && response.data.list[0].stages[ns].bounce_count !== "0") ? response.data.list[0].stages[ns].bounce_count : "-",
                            click_count: (response.data.list[0].stages[ns].click_count && response.data.list[0].stages[ns].click_count !== "0") ? response.data.list[0].stages[ns].click_count : "-",
                            fail_count: (response.data.list[0].stages[ns].fail_count && response.data.list[0].stages[ns].fail_count !== "0") ? response.data.list[0].stages[ns].fail_count : "-",
                            finish_count: (response.data.list[0].stages[ns].finish_count && response.data.list[0].stages[ns].finish_count !== "0") ? response.data.list[0].stages[ns].finish_count : "-",
                            open_count: (response.data.list[0].stages[ns].open_count && response.data.list[0].stages[ns].open_count !== "0") ? response.data.list[0].stages[ns].open_count : "-",
                            reply_count: (response.data.list[0].stages[ns].reply_count && response.data.list[0].stages[ns].reply_count !== "0") ? response.data.list[0].stages[ns].reply_count : "-",
                            sent_count: (response.data.list[0].stages[ns].sent_count && response.data.list[0].stages[ns].sent_count !== "0") ? response.data.list[0].stages[ns].sent_count : "-",
                            unsubscribe_count: (response.data.list[0].stages[ns].unsubscribe_count && response.data.list[0].stages[ns].unsubscribe_count !== "0") ? response.data.list[0].stages[ns].unsubscribe_count : "-",
                            body: response.data.list[0].stages[ns].body,
                            subject: response.data.list[0].stages[ns].subject
                        });
                    }
                    setSequenceData(
                        {
                            sequence_name: response.data.list[0].sequence_name,
                            stages: stages,
                            total_active_count: (response.data.list[0].total_active_count && response.data.list[0].total_active_count !== "0") ? response.data.list[0].total_active_count : "-",
                            total_bounce_count: (response.data.list[0].total_bounce_count && response.data.list[0].total_bounce_count !== "0") ? response.data.list[0].total_bounce_count : "-",
                            total_click_count: (response.data.list[0].total_click_count && response.data.list[0].total_click_count !== "0") ? response.data.list[0].total_click_count : "-",
                            total_deliverd_count: (response.data.list[0].total_deliverd_count && response.data.list[0].total_deliverd_count !== "0") ? response.data.list[0].total_deliverd_count : "-",
                            total_fail_count: (response.data.list[0].total_fail_count && response.data.list[0].total_fail_count !== "0") ? response.data.list[0].total_fail_count : "-",
                            total_finish_count: (response.data.list[0].total_finish_count && response.data.list[0].total_finish_count !== "0") ? response.data.list[0].total_finish_count : "-",
                            total_open_count: (response.data.list[0].total_open_count && response.data.list[0].total_open_count !== "0") ? response.data.list[0].total_open_count : "-",
                            total_reply_count: (response.data.list[0].total_reply_count && response.data.list[0].total_reply_count !== "0") ? response.data.list[0].total_reply_count : "-",
                            total_unsubscribe_count: (response.data.list[0].total_unsubscribe_count && response.data.list[0].total_unsubscribe_count !== "0") ? response.data.list[0].total_unsubscribe_count : "-"
                        }
                    );
                    // sequenceName: (response.data.array.length) ? response.data.array[0].sequence_name : '',
                    // unsubscribe_count: temp_unsubscribe_count,
                    // bounce_count: temp_bounce_count,
                    // click_count: temp_click_count,
                    // open_count: temp_open_count,
                    // reply_count: temp_reply_count,
                    // total_active_count: (newStage[0].total_active_count) ? newStage[0].total_active_count : '-',
                    // sent_count: temp_sent_count,
                    // stages: newStage


                    // }
                })
            );
        }
    }, 600),
        []
    );
    function extractContent(s: string, space: boolean) {
        var span = document.createElement('span');
        span.innerHTML = s;
        if (space) {
            var children = (span.querySelectorAll('*') as NodeList);
            for (var i = 0; i < children.length; i++) {
                let ele = children[i] as HTMLElement;
                if (ele.textContent)
                    ele.textContent += ' ';
                else
                    ele.innerText += ' ';
            }
        }
        return [span.textContent || span.innerText].toString().replace(/ +/g, ' ').replace(/<</g, ' ').replace(/>>/g, ' ');
    };




    return <>

        <div className='ReportSequence'>
            <div >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    className='mainDiv'
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        className='pb-2 pr-3'
                    >
                        <label className='name'>STATISTICS - {sequenceData.sequence_name}</label>
                        {/* <label className='name'>STATISTICS - {sequenceData.sequenceName}</label> */}

                        <Link to={`/${userLocalData.getvalue('clientName')}/letter/campaigns/${sequenceType}/list`} className="btn btn-primary ml-2 c-white underlineNone">
                            <Button variant="outlined" type="button" className='' size="small" color='secondary'>
                                Back to list
                            </Button>
                        </Link>
                    </Grid>
                    <Grid
                        className='header bg-white mb-3'
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            size={6}
                             
                        >

                            <div className="count">
                                <div className="mainCount">{sequenceData.total_active_count}</div>
                                <div className="mainText">Active</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">
                                    {sequenceData.total_finish_count}
                                </div>
                                <div className="mainText">Finished</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">
                                    {sequenceData.total_fail_count}
                                </div>
                                <div className="mainText">Failed</div>
                            </div>

                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            size={6}
                             
                        >

                            <div className="count">
                                <div className="mainCount">{sequenceData.total_deliverd_count}</div>
                                <div className="mainText">Delivered</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">{sequenceData.total_bounce_count}</div>
                                <div className="mainText">Bounced</div>
                            </div>
                            {/* <div className="count">
                                <div className="mainCount">{sequenceData.click_count}</div>
                                <div className="mainText">Interested</div>
                            </div> */}
                            <div className="count">
                                <div className="mainCount">{sequenceData.total_open_count}</div>
                                <div className="mainText">Open</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">{sequenceData.total_reply_count}</div>
                                <div className="mainText">Reply</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">{sequenceData.total_unsubscribe_count}</div>
                                <div className="mainText">Opt out</div>
                            </div>
                            {/* <div className="count">
                                <div className="mainCount">1524</div>
                                <div className="mainText">Scheduled</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">1248</div>
                                <div className="mainText">Delivered</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">700</div>
                                <div className="mainText">Open</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">125</div>
                                <div className="mainText">Reply</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">29</div>
                                <div className="mainText">Interested</div>
                            </div>
                            <div className="count">
                                <div className="mainCount">38</div>
                                <div className="mainText">Opt out</div>
                            </div> */}
                        </Grid>
                    </Grid>

                    <Grid className='section'>
                        <Grid container>
                            <Grid size="grow" className='stageContainer py-0 px-4'>
                                <Grid className='article px-5 py-4' id='stagesList'>
                                    <div>
                                        {
                                            sequenceData.stages.map(
                                                (stage: Stage, i: number) => {

                                                    return (
                                                        <div
                                                            className='stageBody bg-white mb-4'
                                                            id={`stageIdToView${i}`}
                                                            key={`stageBody${i}`}
                                                        >
                                                            <div className='firstLine'>
                                                                <Grid
                                                                    container
                                                                    direction="row"
                                                                    justifyContent="flex-start"
                                                                    alignItems="center"
                                                                >
                                                                    <div className='stageNumber'>Stage {stage.stages_no}</div>
                                                                    <div className='pl-2'>
                                                                        <EmailOutlinedIcon />
                                                                    </div>
                                                                    <div className='pl-2 pr-3'>
                                                                        Email
                                                                        {/* Automatic Email - Day 1 */}
                                                                    </div>
                                                                    <div className="pl-5 count">
                                                                        <span className="mainCount">{stage.active_count}</span>
                                                                        <span className="mainText">Active</span>
                                                                    </div>
                                                                    <div className="count">
                                                                        <span className="mainCount">{stage.finish_count}</span>
                                                                        <span className="mainText">Finished</span>
                                                                    </div>
                                                                    <div className="count">
                                                                        <span className="mainCount">{stage.fail_count}</span>
                                                                        <span className="mainText">Failed</span>
                                                                    </div>
                                                                </Grid>
                                                            </div>
                                                            <div className='secondLine p-5'>
                                                                <Grid
                                                                    container
                                                                    direction="row"
                                                                    justifyContent="flex-start"
                                                                    alignItems="center"
                                                                >
                                                                    <Grid sx={{ width: "calc(100% - 400px)" }}>
                                                                        <div className='subject pb-2'>
                                                                            {stage.subject}
                                                                        </div>
                                                                        <div className='mailBody'>
                                                                            {stage.mailBody}
                                                                        </div>
                                                                    </Grid>
                                                                    <div>
                                                                        <Grid
                                                                            container
                                                                            direction="row"
                                                                            justifyContent="flex-end"
                                                                            alignItems="center"
                                                                            sx={{ width: 400 }}
                                                                        >
                                                                            <div className="count">
                                                                                <div className="mainCount">{stage.sent_count}</div>
                                                                                <div className="mainText">Delivered</div>
                                                                            </div>
                                                                            <div className="count">
                                                                                <div className="mainCount">{stage.bounce_count}</div>
                                                                                <div className="mainText">Bounced</div>
                                                                            </div>
                                                                            {/* <div className="count">
                                                                                <div className="mainCount">{stage.click_count}</div>
                                                                                <div className="mainText">Interested</div>
                                                                            </div> */}
                                                                            <div className="count">
                                                                                <div className="mainCount">{stage.open_count}</div>
                                                                                <div className="mainText">Open</div>
                                                                            </div>
                                                                            <div className="count">
                                                                                <div className="mainCount">{stage.reply_count}</div>
                                                                                <div className="mainText">Reply</div>
                                                                            </div>
                                                                            <div className="count">
                                                                                <div className="mainCount">{stage.unsubscribe_count}</div>
                                                                                <div className="mainText">Opt out</div>
                                                                            </div>
                                                                        </Grid>
                                                                    </div>
                                                                </Grid>
                                                            </div>
                                                            <div className='thirdLine'>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* <Grid className='footer text-right'>
                        <Button color="primary" variant="contained" type="submit" className='mr-2' size="small">
                            {(SequenceId) ? 'Update' : 'Save'}
                        </Button>
                        <Link to="/sequence/list" className="btn btn-primary ml-2 c-white underlineNone">
                            <Button color="error" variant="outlined" type="button" className='' size="small">
                                Cancel
                            </Button>
                        </Link>
                    </Grid> */}
                </Grid>
            </div>
        </div >
    </>;
}


export default ReportSequence;