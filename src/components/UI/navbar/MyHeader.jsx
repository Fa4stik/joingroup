import React, {useState, useEffect, createContext, useContext, useLayoutEffect} from 'react';
import MyLink from '../link/MyLink';
import { iconBlue, iconGray } from './images';
import './MyHeader.scss';
import { useNavigate } from 'react-router-dom';
import {MyHeaderContext} from "../../../context";

const MyHeader = ({className}) => {
    const navigate = useNavigate();
    const {activeLink, setActiveLink} = useContext(MyHeaderContext);

    const handleClick = (e, link) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveLink(link);
    };

    useLayoutEffect(() => {
        navigate(`/${activeLink}`);
    }, [navigate, activeLink]);

    return (
        <div className={`header ${className}`}>
            <MyLink onClick={(e) => handleClick(e, 'primary')} image={iconGray.logo} />
            <MyLink
                onClick={(e) => handleClick(e, 'primary')}
                image={activeLink === 'primary' ? iconBlue.home : iconGray.home}
            />
            <MyLink
                onClick={(e) => handleClick(e, 'userchat')}
                image={activeLink === 'userchat' ? iconBlue.userChat : iconGray.userChat}
            />
            <MyLink
                onClick={(e) => handleClick(e, 'companychat')}
                image={activeLink === 'companychat' ? iconBlue.compChat : iconGray.compChat}
            />
            <MyLink
                onClick={(e) => handleClick(e, 'analysis')}
                image={activeLink === 'analysis' ? iconBlue.analysis : iconGray.analysis}
            />
            <MyLink
                onClick={(e) => handleClick(e, 'settings')}
                image={activeLink === 'settings' ? iconBlue.setting : iconGray.setting}
            />
        </div>
    );
};

export default MyHeader;
