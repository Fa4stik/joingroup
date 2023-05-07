import React, { useEffect, useRef, useState } from 'react';
import './Test.scss';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const CursorFollower = () => {
    const data = {
        labels: ["ПН", 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
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
                        switch (dayOfWeek) {
                            case 'ПН':
                                return `Monday: ${count}`;
                            case 'ВТ':
                                return `Tuesday: ${count}`;
                            // add cases for other days of the week
                            default:
                                return '';
                        }
                    },
                },
            },
        },
    }

    return (
        <div>
            <Bar
                data={data}
                options={options}
            >

            </Bar>
        </div>
    );
};

export default CursorFollower;
