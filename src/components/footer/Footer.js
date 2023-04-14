import React from "react"
import fStyless from "./Footer.module.scss"
import { icon } from "./images"

function Footer() {
    return (
        <div id="footer" className={fStyless.footer}>
            <div className={fStyless.impInfo}>
                <div className={fStyless.impInfo__header}>
                    <h3>Наши контакты</h3>
                </div>
                <div className={fStyless.impInfo__contact}>
                    <div className={fStyless.impInfo__contact__item}>
                        <img src={icon.logoPhone} alt="Phone"/>
                        <a href="tel:+7(999)999-99-99">+7(999)999-99-99</a>
                    </div>
                    <div className={fStyless.impInfo__contact__item}>
                        <img src={icon.logoMail} alt="Mail"/>
                        <a href="mailto:email@mail.com">email@mail.com</a>
                    </div>
                    <div className={fStyless.impInfo__contact__item}>
                        <img src={icon.logoAddress} alt="Address"/>
                        <a href="geo:37.7749,-122.4194">City Name, Adress 1</a>
                    </div>
                </div>
            </div>
            <div className={fStyless.reserved}>
                <p>2023 © JoinGroup, All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;