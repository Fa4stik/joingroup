import React, {useState, useEffect, createContext, useContext, useLayoutEffect} from 'react';
import MyLink from '../link/MyLink';
import { iconBlue, iconGray } from './images';
import './MyHeader.scss';
import { useNavigate } from 'react-router-dom';
import {MyHeaderContext} from "../../../context";
import {observer} from "mobx-react-lite";

const MyHeader = ({className}) => {
    const navigate = useNavigate();
    const { headerStore } = useContext(MyHeaderContext);

    const handleClick = (e, link) => {
        e.preventDefault();
        e.stopPropagation();
        headerStore.setActiveLink(link);
        navigate(`/${headerStore.activeLink}`);
    };

    // useEffect(() => {
    //     navigate(`/${headerStore.activeLink}`);
    //     console.log('USE EFFECT HEADER')
    // }, [navigate, headerStore.activeLink]);

    return (
        <div className={`header ${className}`}>
            <MyLink onClick={(e) => handleClick(e, 'primary')} image={iconGray.logo} />
            <MyLink
                onClick={(e) => handleClick(e, 'primary')}
                image={headerStore.activeLink === 'primary' ? iconBlue.home : iconGray.home}
            />
            <MyLink
                onClick={(e) => handleClick(e, 'userchat')}
                image={headerStore.activeLink === 'userchat' ? iconBlue.userChat : iconGray.userChat}
            />
            <MyLink
                onClick={(e) => handleClick(e, 'companychat')}
                image={headerStore.activeLink === 'companychat' ? iconBlue.compChat : iconGray.compChat}
            />
            <MyLink
                onClick={(e) => handleClick(e, 'analysis')}
                image={headerStore.activeLink === 'analysis' ? iconBlue.analysis : iconGray.analysis}
            />
            <MyLink
                onClick={(e) => handleClick(e, 'settings')}
                image={headerStore.activeLink === 'settings' ? iconBlue.setting : iconGray.setting}
            />
        </div>
    );
};

export default observer(MyHeader);
