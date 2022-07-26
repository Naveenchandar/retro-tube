import React from 'react'
import { NoVideos } from 'components';

export function MainSection({ data, type, children }) {
    return (
        <section className='w_100 section_videos'>
            {data > 0 ? children : <NoVideos type={type} />}
        </section>
    )
}