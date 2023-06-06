import React, {useContext, useEffect, useMemo, useState} from 'react';
import MyHeader from "../../components/UI/navbar/MyHeader";
import './Analysis.scss';
import msgServices from "../../services/MsgServices";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import {useAuthRedirect} from "../../hooks/useAuthRedirect";
import Loading from "../../components/Loading/Loading";
import {AuthContext, CompContext} from "../../context";
import {observer} from "mobx-react-lite";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const Analysis = () => {
    useAuthRedirect();

    const { authStore, userStore } = useContext(AuthContext);

    // Posts
    const [fullDataPosts, setFullDataPosts] = useState([]);
    const [briefDataPosts, setBriefDataPosts] = useState([]);
    const [countPosts, setCountPosts] = useState([]);
    // Views
    const [fullDataViews, setFullDataViews] = useState([]);
    const [briefDataViews, setBriefDataViews] = useState([]);
    const [countViews, setCountViews] = useState([]);

    // Posts
    const [bgWeekPosts, setBgWeekPosts] = useState('#efefef')
    const [bgMonthPosts, setBgMonthPosts] = useState('none')
    // Views
    const [bgWeekViews, setBgWeekViews] = useState('#efefef')
    const [bgMonthViews, setBgMonthViews] = useState('none')

    // Posts
    const [respFullDaysPosts, setRespFullDaysPosts] = useState([]);
    const [respBriefDaysPosts, setRespBriefDaysPosts] = useState([]);
    const [respCountWeekPosts, setRespCountWeekPosts] = useState([]);
    const [respFullDatePosts, setRespFullDatePosts] = useState([]);
    const [respBriefDatePosts, setRespBriefDatePosts] = useState([]);
    const [respCountMonthPosts, setRespCountMonthPosts] = useState([]);
    // Views
    const [respFullDaysViews, setRespFullDaysViews] = useState([]);
    const [respBriefDaysViews, setRespBriefDaysViews] = useState([]);
    const [respCountWeekViews, setRespCountWeekViews] = useState([]);
    const [respFullDateViews, setRespFullDateViews] = useState([]);
    const [respBriefDateViews, setRespBriefDateViews] = useState([]);
    const [respCountMonthViews, setRespCountMonthViews] = useState([]);

    useEffect(() => {
        (async () => {
            const analysis = await msgServices.getAnalysisPosts(userStore);

            console.log(analysis)

            // Posts
            setRespFullDaysPosts(analysis.data.weekAnalysis.map(post => post.nameFullDay));
            setRespBriefDaysPosts(analysis.data.weekAnalysis.map(post => post.nameBriefDay));
            setRespCountWeekPosts(analysis.data.weekAnalysis.map(post => post.postsCount));
            // Views
            setRespFullDaysViews(analysis.data.weekAnalysis.map(post => post.nameFullDay));
            setRespBriefDaysViews(analysis.data.weekAnalysis.map(post => post.nameBriefDay));
            setRespCountWeekViews(analysis.data.weekAnalysis.map(post => post.viewsCount));

            // Posts
            setRespFullDatePosts(analysis.data.monthAnalysis.map(post => post.dateISO));
            setRespBriefDatePosts(analysis.data.monthAnalysis.map(post => post.dateISO.substring(0, 5)));
            setRespCountMonthPosts(analysis.data.monthAnalysis.map(post => post.postsCount));
            // Views
            setRespFullDateViews(analysis.data.monthAnalysis.map(post => post.dateISO));
            setRespBriefDateViews(analysis.data.monthAnalysis.map(post => post.dateISO.substring(0, 5)));
            setRespCountMonthViews(analysis.data.monthAnalysis.map(post => post.viewsCount));
        })();
    }, [])

    useEffect(() => {
        setFullDataPosts([...respFullDaysPosts].reverse());
        setBriefDataPosts([...respBriefDaysPosts].reverse());
        setCountPosts([...respCountWeekPosts].reverse());
    }, [respFullDaysPosts, respBriefDaysPosts, respCountWeekPosts]);

    useEffect(() => {
        setFullDataViews([...respFullDaysViews].reverse());
        setBriefDataViews([...respBriefDaysViews].reverse());
        setCountViews([...respCountWeekViews].reverse());
    }, [respFullDaysViews, respBriefDaysViews, respCountWeekViews]);

    const dataPosts = useMemo(() => ({
        labels: fullDataPosts,
        datasets: [
            {
                data: countPosts,
                backgroundColor: '#2C8AFF',
            },
        ]
    }), [fullDataPosts, countPosts]);

    const dataViews = useMemo(() => ({
        labels: fullDataViews,
        datasets: [
            {
                data: countViews,
                backgroundColor: '#2C8AFF',
            },
        ]
    }), [fullDataViews, countViews]);

    const optionsPosts = useMemo( () => ({
        plugins: {
            legend: {
                display: false, // disable legend labels
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const dayOfWeek = tooltipItem.label;
                        const count = tooltipItem.parsed.y;
                        return `Постов: ${count}`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    callback: (value, index) => {
                        // const dayLabels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
                        const dayLabels = briefDataPosts;
                        const dayLabel = dayLabels[index];
                        return dayLabel;
                    },
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
                title: {
                    display: false,
                },
                ticks: {
                    beginAtZero: false,
                },
            },
        },
    }), [fullDataPosts, countPosts]);

    const optionsViews = useMemo( () => ({
        plugins: {
            legend: {
                display: false, // disable legend labels
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const dayOfWeek = tooltipItem.label;
                        const count = tooltipItem.parsed.y;
                        return `Просмотров: ${count}`;
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    callback: (value, index) => {
                        // const dayLabels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
                        const dayLabels = briefDataViews;
                        const dayLabel = dayLabels[index];
                        return dayLabel;
                    },
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                },
                title: {
                    display: false,
                },
                ticks: {
                    beginAtZero: false,
                },
            },
        },
    }), [fullDataViews, countViews]);

    const handleWeekPosts = (e) => {
        e.preventDefault();
        setBgWeekPosts('#efefef')
        setBgMonthPosts('none')
        setFullDataPosts([...respFullDaysPosts].reverse());
        setBriefDataPosts([...respBriefDaysPosts].reverse())
        setCountPosts([...respCountWeekPosts].reverse());
    }

    const handleMonthPosts = (e) => {
        e.preventDefault();
        setBgWeekPosts('none')
        setBgMonthPosts('#efefef')
        setFullDataPosts([...respFullDatePosts].reverse());
        setBriefDataPosts([...respBriefDatePosts].reverse())
        setCountPosts([...respCountMonthPosts].reverse());
    }

    const handleWeekViews = (e) => {
        e.preventDefault();
        setBgWeekViews('#efefef')
        setBgMonthViews('none')
        setFullDataViews([...respFullDaysViews].reverse());
        setBriefDataViews([...respBriefDaysViews].reverse())
        setCountViews([...respCountWeekViews].reverse());
    }

    const handleMonthViews = (e) => {
        e.preventDefault();
        setBgWeekViews('none')
        setBgMonthViews('#efefef')
        setFullDataViews([...respFullDateViews].reverse());
        setBriefDataViews([...respBriefDateViews].reverse())
        setCountViews([...respCountMonthViews].reverse());
    }

    return (
        authStore.isLoading ?
            <Loading/>
            :
            <div className="analysis">
                <MyHeader className="myHeader"/>
                <div className="graph">
                    <div className="graph__count__post">
                        <div className="graph__count__post__header">
                            <h1>Количество опубликованных постов</h1>
                            <div className="graph__count__post__header__buttons">
                                <button onClick={handleWeekPosts}
                                        style={{
                                            background: bgWeekPosts
                                        }}
                                >
                                    Неделя
                                </button>
                                <button onClick={handleMonthPosts}
                                        style={{
                                            background: bgMonthPosts
                                        }}
                                >
                                    Месяц
                                </button>
                            </div>
                        </div>
                        <div className="graph__count__post__main">
                            <div className="graph__count__post__main__statistics"></div>
                            <div className="graph__count__post__main__dialog">
                                <Bar
                                    redraw={true}
                                    data={dataPosts}
                                    options={optionsPosts}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="graph__views">
                        <div className="graph__views__header">
                            <h1>Количество просмотров постов</h1>
                            <div className="graph__views__header__buttons">
                                <button onClick={handleWeekViews}
                                        style={{
                                            background: bgWeekViews
                                        }}
                                >
                                    Неделя
                                </button>
                                <button onClick={handleMonthViews}
                                        style={{
                                            background: bgMonthViews
                                        }}
                                >
                                    Месяц
                                </button>
                            </div>
                        </div>
                        <div className="graph__views__main">
                            <div className="graph__views__main__statistics"></div>
                            <div className="graph__views__main__dialog">
                                <Bar
                                    redraw={true}
                                    data={dataViews}
                                    options={optionsViews}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default observer(Analysis);