import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export function Sidebar() {
    return (
        <aside className='sidebar'>
            <ul className='mt-1 p-2 sidebar_list'>
                <li><Link to='/' className='p-1 sidebar_link'>Home</Link></li>
                <li><Link to='/explore' className='p-1 sidebar_link'>Explore</Link></li>
                <li><Link to='/' className='p-1 sidebar_link'>Playlists</Link></li>
                <li><Link to='/' className='p-1 sidebar_link'>Watch later</Link></li>
                <li><Link to='/' className='p-1 sidebar_link'>Liked videos</Link></li>
                <li><Link to='/' className='p-1 sidebar_link'>History</Link></li>
            </ul>
        </aside>
    )
}