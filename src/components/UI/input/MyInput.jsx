import React from 'react';
import './MyInput.scss'

const MyInput = ({image, disp, ...props}) => {
    return (
        <input className="myInput"
            {...props}
               style={{backgroundImage: `url(${image})`, display: disp}}
        />
    );
};

export default MyInput;