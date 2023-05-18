import React, { useState } from 'react';
import './SearchInput.scss';
import { userChat } from '../../../images/images';

const SearchInput = ({placeholder, width, ...props}) => {
    return (
        <div className="searchInput">
            <input
                {...props}
                type="text"
                placeholder={placeholder}
                style={{width: width}}
            />
        </div>
    );
};

export default SearchInput;