import React from 'react';
import './PrimaryBlock.scss';

const PrimaryBlock = ({children, header, description,  ...props}) => {
    return (
        <div className="primaryBlock" {...props}>
            <h3>{header}</h3>
            <h4>{description}</h4>
            {children}
        </div>
    );
};

export default PrimaryBlock;