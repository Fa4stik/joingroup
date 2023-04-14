import React, {useState, useRef} from "react"
import hStyless from "./Header.module.scss"
import logo from "./img/JoinGroupLogo.png";
import AnchorLink from 'react-anchor-link-smooth-scroll';

function Header() {
    return (
        <div className={hStyless.header}>
            <div className={hStyless.header__item}>
                <div className={hStyless.logoR}>
                    <img src={logo} alt="Logo"/>
                </div>
                <div className={hStyless.delimiter}></div>
                <div className={hStyless.logoL}>
                    JoinGroup
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
                    <button className={hStyless.signIn__button}>Авторизация</button>
                </div>
            </div>
        </div>
    );
}

export default Header;