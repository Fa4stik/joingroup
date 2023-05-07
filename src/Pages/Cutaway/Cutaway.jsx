import React from 'react';
import Header from "./header/HeaderCutaway";
import styles from "./Cutaway.module.scss";
import FooterCutaway from "./footer/FooterCutaway";
import MainCutaway from "./main/MainCutaway";
import HeaderCutaway from "./header/HeaderCutaway";

const Cutaway = () => {
    return (
        <div>
            <div className={styles.mainElement}>
                <HeaderCutaway/>
                <MainCutaway/>
            </div>
            <FooterCutaway/>
        </div>
    );
};

export default Cutaway;