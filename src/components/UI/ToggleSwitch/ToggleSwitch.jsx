import React, {useContext, useEffect, useState} from 'react';
import './ToggleSwitch.scss';
import {observer} from "mobx-react-lite";
import {CompContext} from "../../../context";

const ToggleSwitch = ({nameMess, contextMess, setContextMess}) => {
    const handleCheckboxChange = () => {
        setContextMess(!contextMess);
    };

    return (
        <div className="group__post__toggle">
            <p>{nameMess}</p>
            <div className={`group__post__toggle__item${contextMess ? '__checked' : ''}`}>
                <input
                    type="checkbox"
                    className="toggle"
                    checked={contextMess}
                    onChange={handleCheckboxChange}
                />
            </div>
        </div>
    );
};

export default observer(ToggleSwitch);