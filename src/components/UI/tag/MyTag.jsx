import React from 'react';
import "./MyTag.scss";

const MyTag = ({children, ...props}) => {
    return (
        <span
            className="tag"
            {...props}
        >
            {children}
        </span>
    );
};

export default MyTag;