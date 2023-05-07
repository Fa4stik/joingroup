import React from 'react';
import './MyLink.scss';

const MyLink = ({image, ...props}) => {
    return (
        <a className="link"
           {...props}
        >
            <img src={image} alt=""/>
        </a>
    );
};

export default MyLink;