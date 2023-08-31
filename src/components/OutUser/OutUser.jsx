import React from 'react';
import './OutUser.scss'
import {userChat} from "../../images/images";
import MyTag from "../UI/tag/MyTag";

const OutUser = ({image, fullName, shortText, nameTag, lastTimeMess, ...props}) => {
    const ruDate = (new Date(lastTimeMess)).toLocaleString('ru-RU');
    const nwLastTimeMess = `${ruDate.slice(0, 5)} / ${ruDate.slice(11, 17)}`
    return (
        <div className="chat__column__outUsers"
             {...props}
        >
            <div className="chat__column__outUsers__info">
                <img src={image} alt="us_01"/>
                <div className="chat__column__outUsers__info__text">
                    <h3>{fullName}</h3>
                    {shortText ? <p>{shortText}</p> : null}
                    {nameTag ? <MyTag>{nameTag}</MyTag> : null}
                </div>
            </div>
            <p>{nwLastTimeMess}</p>
        </div>
    );
};

export default OutUser;