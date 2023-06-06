import React, { useState } from 'react';
import './Test.scss';

const MyComponent = () => {
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={`group__post${isChecked ? '__checked' : ''}`}>
            <input
                type="checkbox"
                className="toggle"
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
        </div>
    );
};

export default MyComponent;