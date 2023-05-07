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

const CursorFollower = () => {
    // const cursorRef = useRef(null);
    // const [cursorColor, setCursorColor] = useState('#000');
    //
    // useEffect(() => {
    //     const handleMouseMove = (event) => {
    //         const { clientX, clientY } = event;
    //         cursorRef.current.style.left = `${clientX}px`;
    //         cursorRef.current.style.top = `${clientY}px`;
    //     };
    //
    //     const handleMouseDown = () => {
    //         console.log("mouseDown");
    //         setCursorColor('#00F');
    //     };
    //
    //     const handleMouseUp = () => {
    //         console.log("mouseUp")
    //         setCursorColor('#000');
    //     };
    //
    //     window.addEventListener('mousemove', handleMouseMove);
    //     window.addEventListener('mousedown', handleMouseDown);
    //     window.addEventListener('mouseup', handleMouseUp);
    //
    //     return () => {
    //         window.removeEventListener('mousemove', handleMouseMove);
    //         window.removeEventListener('mousedown', handleMouseDown);
    //         window.removeEventListener('mouseup', handleMouseUp);
    //     };
    // }, []);
    //
    // return (
    //     <div
    //         className="cursor"
    //         ref={cursorRef}
    //         style={{ borderColor: cursorColor }}
    //     ></div>
    // );

    return (
        <div>
        </div>
    );
};

export default CursorFollower;
