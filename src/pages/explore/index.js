import React from 'react';
import Sidebar from '../../components/sidebar';
import { Vidoes } from '../../components/videos';

export function Explore() {
    return (
        <section>
            <div className='flex'>
                <Sidebar />
                <Vidoes />
            </div>
        </section>
    )
}