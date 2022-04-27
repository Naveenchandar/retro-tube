import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export function Sidebar() {
    const linkClassName = 'p-1 sidebar_link';
    const activeLinkClassName = (isActive) => {
        if(isActive) {
            return `active ${linkClassName}`
        }
        return linkClassName
    }
    return (
        <aside className='sidebar'>
            <ul className='mt-1 p-2 sidebar_list'>
                <li><NavLink to='/' className={({ isActive }) => activeLinkClassName(isActive)}>Home</NavLink></li>
                <li><NavLink to='/explore' className={({ isActive }) => activeLinkClassName(isActive)}>Explore</NavLink></li>
                <li><NavLink to='/' className={({ isActive }) => activeLinkClassName(isActive)}>Playlists</NavLink></li>
                <li><NavLink to='/watchlater' className={({ isActive }) => activeLinkClassName(isActive)}>Watch later</NavLink></li>
                <li><NavLink to='/' className={({ isActive }) => activeLinkClassName(isActive)}>Liked videos</NavLink></li>
                <li><NavLink to='/' className={({ isActive }) => activeLinkClassName(isActive)}>History</NavLink></li>
            </ul>
        </aside>
    )
}