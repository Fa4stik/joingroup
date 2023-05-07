import React, {useState, useRef} from "react"
import hStyless from "./Header.module.scss"
import logo from "./img/JoinGroupLogo.png";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {useNavigate} from "react-router-dom";

function HeaderCutaway() {
    const navigate = useNavigate();
    const handlerButton = (e) => {
        e.preventDefault();
        navigate('/registration');
    }

    return (
        <div className={hStyless.header}>
            <div className={hStyless.header__item}>
                <div className={hStyless.logoR}>
                    <a href="#description">
                        <img src={logo} alt="Logo"/>
                    </a>
                </div>
                <div className={hStyless.delimiter}></div>
                <div className={hStyless.logoL}>
                    <a href="#description">JoinGroup</a>
                </div>
            </div>
            <div className={hStyless.services}>
                <div className={hStyless.services__name}>
                    <span><AnchorLink href="#services">Сервисы</AnchorLink></span>
                    <span><AnchorLink href="#importantFunc">Функции</AnchorLink></span>
                    <span><AnchorLink href="#price">Цены</AnchorLink></span>
                    <span><AnchorLink href="#footer">Контакты</AnchorLink></span>
                </div>
                <div className={hStyless.delimiter}></div>
                <div className={hStyless.signIn}>
                    <button className={hStyless.signIn__button} onClick={handlerButton}>Авторизация</button>
                </div>
            </div>
        </div>
    );
}

export default HeaderCutaway;
