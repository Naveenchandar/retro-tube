import { useState } from 'react';
import { searchValueChange } from '../../utils';
import './index.css';

export const SearchInput = ({ value, onChange, placeholder, dispatch: { search, noSearch } }) => {

    const [inputExpand, setInputExpand] = useState(false);

    const inputFocus = (event) => {
        setInputExpand(true);
    }

    const inputBlur = (event) => {
        setInputExpand(false);
    }

    const inputChange = ({ target: { value } }) => {
        onChange(value);
        if (searchValueChange(value)) {
            search(value);
        } else {
            noSearch();
        }
    }

    return (
        <input
            type='search'
            value={value}
            onChange={inputChange}
            placeholder={placeholder}
            onFocus={inputFocus}
            onBlur={inputBlur}
            style={{ width: inputExpand ? '500px' : '300px' }}
            className='search_input'
        />
    )
}