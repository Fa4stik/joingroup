import React from 'react';
import "./Recipient.scss";
import {primary} from "../../images/images";

const Recipient = ({children, recipient}) => {
    return (
        <div className="chat__active__messages__recipient">
            <img src={primary.avatar} alt="User avatar"/>
            <div className="chat__active__messages__recipient__parcel">
                <p>{recipient}</p>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Recipient;