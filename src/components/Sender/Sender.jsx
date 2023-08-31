import React from 'react';
import "./Sender.scss";

const Sender = ({children}) => {
    return (
        <div className="chat__active__messages__sender">
            {children}
        </div>
    );
};

export default Sender;