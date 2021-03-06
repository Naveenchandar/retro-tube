import React from 'react';

export function MainHeader({ data, title, icon, btn, onClick }) {
    return (
        <div className='flex justify_spacebtw'>
            <h1 className='text_left p-3'> {title} - &nbsp;
                <span>
                    {data > 1 ? `${data} videos` : `${data} video`}
                </span>
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