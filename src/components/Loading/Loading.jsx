import React from 'react';
import './Loading.scss';

const Loading = () => {
    return (
        <div className="loading">
            <div className="point-animation"/>
            <div className="point-animation-2"/>
            <div className="point-animation-3"/>
        </div>
    );
};

export default Loading;