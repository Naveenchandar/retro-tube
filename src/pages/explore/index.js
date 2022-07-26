import React from 'react';
import { Sidebar, Videos } from 'components';

export function Explore() {
    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <Videos />
            </div>
        </section>
    )
}