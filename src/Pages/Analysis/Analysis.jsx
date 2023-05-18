import React, {useContext} from 'react';
import MyHeader from "../../components/UI/navbar/MyHeader";
import './Analysis.scss';
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
import {AuthContext} from "../../context";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const Analysis = () => {
    const { authStore } = useContext(AuthContext);

    useAuthRedirect();

    const data = {
        labels: ["Понедельник", 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        datasets: [
            {
                data: [3, 6, 9, 4, 9, 1, 10],
                backgroundColor: '#2C8AFF',
            },
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false, // disable legend labels
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const dayOfWeek = tooltipItem.label;
                        const count = tooltipItem.parsed.y;
                        return `Диалогов: ${count}`;
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
                        const dayLabels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
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
    };

    if (authStore.isLoading) {
        return (
            <Loading/>
        )
    }

    return (
        <div className="analysis">
            <MyHeader className="myHeader"/>
            <div className="graph">
                <div className="graph__dialog">
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
                <div className="graph__post">
                    <Bar
                        data={data}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
};

export default Analysis;