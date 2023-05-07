import React from 'react';
import './MyButton.scss';
import {Navigate} from "react-router-dom";

const MyButton = ({children, ...props}) => {
    return (
        <button className="myButton"
            {...props}
        >
            {children}
        </button>
    );
};

export default MyButton;