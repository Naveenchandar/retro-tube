import React from 'react';
import './index.css';

export function MainHeader({ data, title, icon, btn, onClick, type = '' }) {
    return (
        <div className='flex justify_spacebtw main_header'>
            <h1 className='text_left p-3'> {title}
                <MainHeaderTitle data={data} type={type} />
            </h1>
            {btn ?
                <button className="btn btn_primary main_header_btn align_center" title={btn} onClick={onClick}>
                    {icon} &nbsp;
                    <span className='main_header_btn_caption'>{btn}</span>
                </button>
                : ''
            }
        </div>
    )
}

const MainHeaderTitle = ({ data, type }) => {
    if (type) {
        return '';
    }
    return (
        <span>
            - &nbsp;{data > 1 ? `${data} videos` : `${data} video`}
        </span>
    )
}