import { React, useEffect, useRef, useState, useCallback, lazy, Suspense } from '../../../shared/modules/React';
// import { Link } from 'react-router-dom';
import { WidthProvider, Responsive } from "react-grid-layout";
import './Home.scss';
// import GridLayout from "react-grid-layout";

import { Card } from '../../../shared/modules/MaterialImports/Card';
import { DashboardCardInterface } from './dashboardCardModel';
import { Grid, Button } from '../../../shared/modules/commonImports';
import ApiService from '../../../shared/api/api';
import { userLocalData } from '../../../shared/services/userData';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { v4 as uuidv4 } from 'uuid';
import { debounce } from 'lodash';
import { showToaster } from '../../../shared/modules/commonImports';

import { CircularProgress } from '../../../shared/modules/MaterialImports/CircularProgress';

const DashBoardTasks = lazy(() => import('../../shared/Tasks/DashBoardTasks'));

//new dashboard icon
// import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
} from 'chart.js';

import updateDocumentTitle from '../../../shared/services/title';
import SideMenu from './SideMenu';
// import ConfirmationDialogRaw from './ConfirmDelete/ConfirmDelete';
import CardData from './CardData/CardData';
import useCardStore, { DASHBOARD_CARD_STATE } from './DashboardCardStore';
import { shallow } from 'zustand/shallow';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
);

const ResponsiveReactGridLayout = WidthProvider(Responsive);


const cardStore = (state: DASHBOARD_CARD_STATE) => ({
    cardsList: state.cards,
    addCard: state.addCard,
    setCardsList: state.setCards
});





const Home = () => {

    const { cardsList, setCardsList, addCard } = useCardStore(cardStore, shallow);

    const [openSide, setOpenSide] = React.useState(false);
    // const [selectedId, setSelectedId] = React.useState('');
    const [layoutChanged, setLayoutChanged] = useState(false);
    // const [openConfirm, setOpenConfirm] = React.useState(false);
    const [dashBoardCards, setDashBoardCards] = React.useState(false);

    //new dashboard html

    // const toggleDashBoardTasks = () => {
    //     setDashBoardCards(prevState => !prevState);
    // };

    // const graphRefs = React.useRef({});



    // const [cardsList, setCardsList] = useState<DashboardCardInterface[]>((dashList) ? JSON.parse(dashList) : []);

    // useEffect(() => {
    //     let dashList = localStorage.getItem("dashboardList") || '';
    //     setCardsList(dashList ? JSON.parse(dashList) : []);
    // }, [])


    const openConfirmBox = (id: string) => {
        // console.log(id)
        onRemoveItem(id);
        // setSelectedId(id);
        // setTimeout(() => {
        //     setOpenConfirm(true);
        // }, 10);
    }
    // const closeConfirmBox = (id: string) => {
    //     if (id) {
    //         onRemoveItem(selectedId);
    //     }
    //     setOpenConfirm(false);
    // }

    const handleClickOpen = () => {
        setOpenSide(true);
        saveAuditLog(3844);
    };

    const handleClose = (obj: any) => {
        setOpenSide(false);
        if (obj) {//
            onAddItem(obj);
        }
    };
    const defaultProps = {
        className: "layout",
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        rowHeight: 90,
        // This turns off compaction so you can place items wherever.
        verticalCompact: true,
        // This turns off rearrangement so items will not be pushed around.
        // preventCollision: true
    };

    useEffect(() => {
        updateDocumentTitle.set('Home');
        loadCards();
        return () => {
            updateDocumentTitle.set('');
        }
    }, []);

    useEffect(() => {
        window.dispatchEvent(new Event('resize'));

        let sortedCards = cardsList.sort((a, b) => a.order - b.order);
        sortedCards = sortedCards.filter((item: any) => item.id !== "Tasks_List");
        const col = dashBoardCards ? 2 : 4;
        const rows = sortedCards.length / col;
        const width = dashBoardCards ? 6 : 3;
        let gridPositions = [];

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < col; x++) {
                gridPositions.push({ x: x * 3, y: y * 3, w: width })
            }
        }
        const cardsWithPositions = sortedCards.map((item: any, i: number) => {
            return { ...item, x: gridPositions[i].x, y: gridPositions[i].y }
        })
        setTimeout(() => {
            setCardsList([...cardsWithPositions])
        }, 100);
    }, [dashBoardCards])


    // masterDashboardList


    // const [newCounter, setNewCounter] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [BreakpointChange, setBreakpointChange] = useState({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [cols, setCols] = useState<number | undefined>(undefined);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const [layout, setLayout] = useState<any>(undefined);
    // const [compactType] = useState<any>("vertical");
    // const [chart, setChart] = useState(false);

    // var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var uniqueIds: string[] = [];

    // const generateId = () => {
    //     var newID = true;
    //     let unId = '';
    //     while (newID) {
    //         if (!unId || uniqueIds.includes(unId)) {
    //             for (let i = 0; i < 9; i++) {
    //                 unId += characters.charAt(Math.floor(Math.random() * 60));
    //             }
    //         } else {
    //             newID = false;
    //         }
    //     }
    //     // uniqueIds.push(unId);
    //     return unId;
    // }
    const onAddItem = (e: any) => {
        const isDuplicate = cardsList.some(card => card.id === e.id);
        if (isDuplicate) {
            showToaster("Card already Exists", 'error');
            return;
        }
        if (e.id === 'tasks') {
            setDashBoardCards(true);
            return;
        }
        let xVal = 0;
        let yVal = 0;
        if (cardsList.length) {
            let maxYVal = Math.max(...cardsList.map(o => o.y));
            let yFiltered = cardsList.filter(s => s.y === maxYVal);
            let maxXVal = Math.max(...yFiltered.map(o => o.x));
            let maxXYObj = yFiltered.filter(s => s.x === maxXVal);
            const maxYposition = dashBoardCards ? 3 : 9
            if ((maxXVal + maxXYObj[0].w) > maxYposition) {
                console.log('1')
                yVal = maxYVal + 1;
                xVal = 0;
            } else {
                yVal = maxYVal;
                xVal = maxXVal + maxXYObj[0].w;
            }
        }

        let tempObj = { ...e };
        tempObj.x = (tempObj.x !== undefined) ? tempObj.x : xVal;
        tempObj.y = (tempObj.y !== undefined) ? tempObj.y : yVal;
        tempObj.w = (tempObj.w !== undefined) ? tempObj.w : 3;
        tempObj.h = (tempObj.h !== undefined) ? tempObj.h : 3;
        tempObj.i = uuidv4();
        addCard(tempObj);
        setTimeout(() => {
            scrollToBottom();
        }, 200);
        setLayoutChanged(true);
    };
    // const onBreakpointChange = (breakpoint: any, cols: number) => {
    // setBreakpointChange(breakpoint);
    // setCols(cols);
    // console.log('onBreakPoint : ' + breakpoint);
    // };
    // const updateDefaultValues = (id: string, val: number, prop: string) => {
    //     getChartDetails(id, val);
    //     // console.log(event);
    //     //copying data to temp variable so that we do not directly mutate original state
    //     const tempItems = [...cardsList];
    //     //findIndex to find location of item we need to update
    //     let index = tempItems.findIndex(item => item.i === id);
    //     // -1 check to see if we found that object in working hours
    //     if (index !== -1) {
    //         let tempDefaultValues = { ...tempItems[index].defaultValues };
    //         tempItems[index].defaultValues = { ...tempDefaultValues, [prop]: val }
    //         // tempItems[index] = {
    //         //     ...tempItems[index]
    //         // }
    //     }

    //     setCardsList([...tempItems]);

    //     // localStorage.setItem("dashboardList", JSON.stringify(cardsList));
    //     // setItems(newMonths);
    // };
    // const getChartDetails = (id: string, val = 3) => {
    //     // @ts-ignore
    //     const chart = graphRefs.current['graph' + id];

    //     const chartData = {
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'].slice(0, val),
    //         datasets: [
    //             {
    //                 label: 'Dataset 1',
    //                 data: [150, 320, 280, 590, 300, 670, 350, 240, 290, 260, 150, 510].slice(0, val),
    //                 borderColor: 'rgb(255, 99, 132)',
    //                 backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //             }
    //             // {
    //             //     label: 'Dataset 2',
    //             //     data: [100, 160, 300, 410, 250, 520, 370],
    //             //     borderColor: 'rgb(53, 162, 235)',
    //             //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //             // }
    //         ],
    //     };
    //     chart.config._config.data = chartData;
    //     chart.update();

    // }

    const createElement = (el: any, i: number) => {

        let tempObj: DashboardCardInterface = JSON.parse(JSON.stringify(el));

        // console.log(tempObj)

        // const i = generateId();
        // tempObj.uniqueId = generateId();
        uniqueIds.push(tempObj.i);

        // const chartOptions = {
        //     responsive: true,
        //     plugins: {
        //         legend: {
        //             position: 'top' as const,
        //         },
        //         title: {
        //             display: true,
        //             text: 'Chart.js Line Chart',
        //         },
        //     },
        // };
        // const chartData = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'].slice(0, 3),
        //     datasets: [
        //         {
        //             label: 'Dataset 1',
        //             data: [150, 320, 280, 590, 300, 670, 350, 240, 290, 260, 150, 510].slice(0, 3),
        //             borderColor: 'rgb(255, 99, 132)',
        //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
        //         }
        //         // {
        //         //     label: 'Dataset 2',
        //         //     data: [100, 160, 300, 410, 250, 520, 370],
        //         //     borderColor: 'rgb(53, 162, 235)',
        //         //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
        //         // }
        //     ],
        // };

        // let data: any = [];
        // let count: number = 0;

        // switch (tempObj.id) {
        //     case 'starts':
        //         count = 13;
        //         data = [
        //             {
        //                 date: new Date(2024, 3).getTime(),
        //                 value: 73
        //             },
        //             {
        //                 date: new Date(2024, 4).getTime(),
        //                 value: 64
        //             },
        //             {
        //                 date: new Date(2024, 5).getTime(),
        //                 value: 39
        //             }
        //         ]
        //         break;
        //     case 'jobsReceived':
        //         count = 111;
        //         data = [
        //             {
        //                 date: new Date(2024, 3).getTime(),
        //                 value: 811
        //             },
        //             {
        //                 date: new Date(2024, 4).getTime(),
        //                 value: 858
        //             },
        //             {
        //                 date: new Date(2024, 5).getTime(),
        //                 value: 453
        //             }
        //         ]
        //         break;
        //     case 'submissions':
        //         count = 461;
        //         data = []
        //         break;
        //     case 'jobsWithoutSubs':
        //         count = 66;
        //         data = [
        //             {
        //                 category: "Jobs without subs",
        //                 value: 403
        //             },
        //             {
        //                 category: "Jobs with subs",
        //                 value: 1769
        //             },
        //         ]
        //         break;
        //     case 'recruitersWOSubs':
        //         count = 63;
        //         data = []
        //         break;
        //     case 'recruitersWOShortlists':
        //         count = 112;
        //         data = []
        //         break;
        //     case 'recruitersWOInterviews':
        //         count = 147;
        //         data = []
        //         break;
        //     case 'swsc24h':
        //         count = 56;
        //         data = []
        //         break;
        //     case 'aojwc':
        //         count = 69;
        //         data = []
        //         break;
        //     case 'scwsci3d':
        //         count = 4;
        //         data = []
        //         break;
        //     case 'iwsci5d':
        //         count = 1;
        //         data = []
        //         break;
        //     case 'eeoc':
        //         count = 20;
        //         data = [
        //             {
        //                 category: "label 1",
        //                 value: 30
        //             },
        //             {
        //                 category: "label 2",
        //                 value: 80
        //             },
        //         ];
        //         tempObj.w = 12;
        //         break;
        // }

        return (
            // <CardData key={tempObj.i} data={tempObj} removeEle={onRemoveItem} data-grid={tempObj} chartData={data}></CardData>
            (<Card key={tempObj.i} data-grid={tempObj}>
                {/* <CardHeader className='headerGrid dragHandle'
                    subheader={tempObj.title}
                    action={
                        <div className='iconsDiv pt-2'>
                            {chart ? 
                            <Filter1Icon onClick={() => setChart(false)}/> : 
                            <Timeline onClick={() => setChart(true)}/>
                            }
                            
                            <Cached />
                            <Settings />
                            <Close onClick={() => openConfirmBox(tempObj.i)} />
                        </div>
                    }> */}
                {/* <Grid container direction="row" justifyContent="space-between" alignItems="center" className='headerGrid'>
                        <div className='header'>{tempObj.title}</div>
                        <div className='iconsDiv'>
                            <Timeline />
                            <Cached />
                            <Settings />
                            <Close onClick={() => onRemoveItem(tempObj.i)} />
                        </div>
                    </Grid> */}
                {/* </CardHeader> */}
                {/* <CardContent className='p-0'>
                    <Grid container direction="column" className='py-4 px-3'> */}
                {/* <ToggleButtonGroup
                            color="primary"
                            value={tempObj.defaultValues.graphMonthsSelected || "90"}
                            exclusive
                            onChange={updateDefaultValuesMonth}
                            size="small"
                            id={tempObj.i}

                        >
                            <ToggleButton className='togBtn' value="90">3 mo</ToggleButton>
                            <ToggleButton className='togBtn' value="180">6 mo</ToggleButton>
                            <ToggleButton className='togBtn' value="270">9 mo</ToggleButton>
                            <ToggleButton className='togBtn' value="365">12 mo</ToggleButton>
                        </ToggleButtonGroup> */}
                {/* <ButtonGroup variant="outlined" size="small" color="secondary" className='toggleButtons'>
                            {/* updateDefaultValues = (id, val, prop) */}
                {/* {graphMonths.map((el) => <Button key={el.value} className={(tempObj.defaultValues.graphMonthsSelected === el.value) ? 'active' : ''} onClick={() => updateDefaultValues(tempObj.i, el.months, "graphMonthsSelected")} value={el.value}>{el.text}</Button>)} */}
                {/* </ButtonGroup> */}
                {/* <Line ref={i => {
                            // @ts-ignore
                            graphRefs.current['graph' + tempObj.i] = i
                        }}
                            options={chartOptions}
                            data={chartData}
                        /> */}
                {/* {chart ? 
                        <TrendLines id={tempObj.i} name="" data={data} /> :
                        <Typography variant='h3' textAlign='center'>13</Typography>
                        } */}
                {/* <div>{tempObj.i}</div> */}
                {/* </Grid>
                </CardContent> */}
                <CardData key={tempObj.i} removeEle={openConfirmBox} data-grid={tempObj} cardIndex={i} layoutUpdated={() => setLayoutChanged(true)} saveCardsData={handleSaveLayout}></CardData>
            </Card>)
        );
    }

    const onLayoutChange = (layout: any) => {
        let updatedLayout = [...layout];
        if (updatedLayout.length > 0) {
            updatedLayout[0].x = 0;
        }

        for (let i = 1; i < updatedLayout.length; i++) {
            const prevCard = updatedLayout[i - 1];

            if (i === 1) {
                updatedLayout[i].x = 3;
            } else {
                updatedLayout[i].x = prevCard.x + prevCard.w;
            }
            if (updatedLayout[i].x + updatedLayout[i].w > defaultProps.cols.lg) {
                updatedLayout[i].x = 0;
                updatedLayout[i].y = prevCard.y + prevCard.h;
            }
        }
        const updatedCardsList = cardsList.map((card) => {
            const layoutItem = updatedLayout.find((item) => item.i === card.i);
            return layoutItem
                ? { ...card, x: layoutItem.x, y: layoutItem.y, w: layoutItem.w, h: layoutItem.h }
                : card;
        });

        setCardsList(updatedCardsList);
    };
    // const onLayoutChange = (layout: any) => {
    //     // onLayoutChange(layout);
    //     setLayout(layout);
    // }

    const onRemoveItem = (i: string) => {
        let tempObj = cardsList.filter(function (obj) {
            return obj.i !== i;
        })
        setCardsList(tempObj);
        setLayoutChanged(true);
        // console.log(tempObj);
        // console.log(items);
    }
    // compactType={compactType}
    const scrollRef = useRef(null);
    // useEffect(() => {
    //     if (scrollRef && scrollRef.current) {
    //         // @ts-ignore
    //         scrollRef.current.elementRef.current.scrollTop = scrollRef.current.elementRef.current.scrollHeight;
    //     }
    // }, [items]);
    const scrollToBottom = () => {
        if (scrollRef && scrollRef.current) {
            // @ts-ignore
            scrollRef.current.elementRef.current.scrollTop = scrollRef.current.elementRef.current.scrollHeight;
        }
    }

    const loadCards = useCallback(debounce(() => {
        ApiService.postWithData('admin', 'dashBoardCards', {
            clientId: userLocalData.getvalue('clientId'),
            recrId: userLocalData.getvalue('recrId'),
            action: 'GET',
        }).then(
            (response: any) => {

                (response.data.dashBoardCards[0].json !== "" && response.data.dashBoardCards[0].json !== undefined) ? setCardsList(JSON.parse(response.data.dashBoardCards[0].json)) : setCardsList([])
                const responseData = response.data.dashBoardCards[0];
                const cardsJson = responseData.json;
                if (cardsJson && cardsJson !== "") {
                    const cards = JSON.parse(cardsJson);
                    const hasTasksList = cards.some((card: any) => card.id === "Tasks_List");
                    if (hasTasksList) {
                        setDashBoardCards(true);
                    }

                }


                // localStorage.setItem("dashboardList", response.dashBoardCards[0].json);
                // let filteredData: any = [];
                // for (let i = 0; i < response.data.length; i++) {
                //     filteredData.push(response.data[i])
                // }

                // let cardList = filteredData.map((card: any, i: number) => (
                //     card.id !== 'tasks' && addCard('', card.id, card.uniqueId, card.height, card.width, card)
                // ))

                // localStorage.setItem("dashboardList", JSON.stringify(cardList));
            }
        )
    }, 600),
        []
    );

    const handleSaveLayout = (passedCardsList?: DashboardCardInterface[]) => {
        let tempDashboardCardsList = [...cardsList];
        if (passedCardsList?.length) {
            tempDashboardCardsList = [...passedCardsList];
        }
        if (dashBoardCards) {
            if (!tempDashboardCardsList.some(card => card.id === 'Tasks_List')) {
                tempDashboardCardsList.push({
                    id: 'Tasks_List',
                    x: 0,
                    y: 0,
                    w: 3,
                    h: 3,
                    i: uuidv4(),
                    draggableHandle: "",
                    title: "",
                    customTitle: "",
                    inputs: {
                        settings: false,
                        allCompany: false,
                        assignedClients: false,
                        accountManager: false,
                        relationType: false,
                        billRate: false,
                        jobType: false,
                        clientType: false,
                        graph: false,
                        graphValue: "",
                        graphName: "",
                        datesDiv: false
                    },
                    defaultValues: {
                        graphMonthsSelected: "",
                        dateSelected: "",
                        fromDate: "",
                        toDate: "",
                        modifiedTitle: "",
                        companyType: "",
                        assignedClientIds: [],
                        assignedClientNames: [],
                        accountManagerIds: [],
                        accountManagerNames: [],
                        userIds: [],
                        userNames: [],
                        clientIds: [],
                        clientNames: [],
                        relationshipType: "",
                        billRate: "",
                        jobType: "",
                        clientType: "",
                        chartData: "",
                        withOutStatus: "",
                        placementType: "",
                    },
                    order: tempDashboardCardsList.length
                });
            }
        } else {
            tempDashboardCardsList = tempDashboardCardsList.filter(card => card.id !== 'Tasks_List');
            tempDashboardCardsList = addCardOrder(tempDashboardCardsList)
        }


        const payload = {
            clientId: userLocalData.getvalue('clientId'),
            recrId: userLocalData.getvalue('recrId'),
            action: 'save',
            json: JSON.stringify(tempDashboardCardsList)
        };
        ApiService.postWithData('admin', 'dashBoardCards', payload).then((response: any) => {
            setLayoutChanged(false);
            setCardsList([...tempDashboardCardsList])
        });
    };

    const onDragStop = () => {
        setLayoutChanged(true);
    };
    const onResizeStop = () => {
        setLayoutChanged(true);
    };

    const addCardOrder = (tempCardList: any) => {
        const cardList = tempCardList.map((card: any, i: number) => {
            return card = { ...card, order: ((card.y) * (12) + card.x) / 3 }
        })
        return cardList;
    }

    const saveAuditLog = (id: number) => {
        ApiService.saveAuditLog(id);
    }


    return (
        <div className='home_main'>
            <h1 className='home_title'>Dashboard</h1>
            <Card className='pt-1 card_main'>
                <Grid
                    container
                    direction='row'
                    justifyContent='end'
                    sx={{ marginTop: '5px' }}
                >
                    <Button
                        size='small'
                        disabled={!layoutChanged}
                        onClick={() => { saveAuditLog(3893); handleSaveLayout([]) }}
                        className='mr-4 btnSecondary'
                        variant='contained'
                    >
                        <SaveOutlinedIcon className='mui_icons_new' /> Save Layout
                    </Button>
                    {/* new dashboard html */}
                    {/* <Button
                        size='small'
                        className='mr-4 btnSecondary'
                        variant='contained'
                        onClick={toggleDashBoardTasks}
                    >
                        {dashBoardCards ? <VisibilityOffOutlinedIcon className='mui_icons_new' /> : <RemoveRedEyeOutlinedIcon className='mui_icons_new' />}


                        {dashBoardCards ? 'Hide Task Pane' : 'Show Task Pane'}
                    </Button> */}
                    <Button size='small' variant='contained' onClick={handleClickOpen} className='mr-4 btnPrimary'>
                        <AddCircleOutlineIcon className='mui_icons_new' />Manage Card</Button>
                </Grid>
                <hr className='hr_tag_home' />

                <div className="grid-container">
                    <div className="main-layout">
                        <ResponsiveReactGridLayout
                            ref={scrollRef}
                            layouts={{ lg: cardsList }}
                            {...defaultProps}
                            compactType="vertical"
                            onLayoutChange={onLayoutChange}
                            draggableHandle=".dragHandle"
                            onDragStop={onDragStop}
                            onResizeStop={onResizeStop}
                            useCSSTransforms={false}
                            verticalCompact={true}
                            preventCollision={false}
                        >
                            {cardsList.map((el, i) => el.id !== "Tasks_List" ? createElement(el, i) : null)}
                        </ResponsiveReactGridLayout>
                    </div>
                    {dashBoardCards && <div className="tasks-container">
                        <Suspense fallback={<CircularProgress className="centered" />}>
                            <DashBoardTasks show={dashBoardCards} notShow={setDashBoardCards} />
                        </Suspense>
                    </div>}
                </div>

                <SideMenu
                    // masterList={masterDashboardList}
                    open={openSide}//
                    onClose={handleClose}
                />
                {/* if(selectedId){} */}
                {/* <ConfirmationDialogRaw
                    open={openConfirm}
                    onConfirmClose={closeConfirmBox}    
                    value={selectedId}
                /> */}

            </Card>
        </div>
    );
}

export default Home;
