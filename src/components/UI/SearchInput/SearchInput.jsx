import React, { useState } from 'react';
import './SearchInput.scss';
import { userChat } from '../../../images/images';

const SearchInput = () => {
    const [valueInpt, setValueInpt] = useState('');

    return (
        <div className="searchInput">
            <input
                value={valueInpt}
                onChange={(e) => setValueInpt(e.target.value)}
                type="text"
                placeholder="Найдите новый чат"
            />
        </div>
    );
};

export default SearchInput;