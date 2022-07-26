import React from 'react';
import './index.css';
import { useComponentVisible } from 'hooks/useVisible';

export function MoreOptions({ list = [], handleClickMoreOptions }) {
    const { ref, isComponentVisible } = useComponentVisible(true);
    return (
        isComponentVisible &&
        <ul className='more_options' ref={ref}>
            {list.map(item => {
                return (
                    <li
                        key={item}
                        className='more_options_item pointer'
                        onClick={() => handleClickMoreOptions(item)}
                    >{item}</li>
                )
            })}
        </ul>
    )
}