import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

const sidebarOptions = [
    { path: '/', name: 'Home' },
    { path: '/explore', name: 'Explore' },
    { path: '/', name: 'Playlists' },
    { path: '/watchlater', name: 'Watch later' },
    { path: '/', name: 'Liked videos' },
    { path: '/', name: 'History' }
];

export function Sidebar() {
    const linkClassName = 'p-1 sidebar_link';
    const activeLinkClassName = (isActive) => {
        if (isActive) {
            return `active ${linkClassName}`
        }
        return linkClassName
    }
    return (
        <aside className='sidebar'>
            <ul className='mt-1 p-2 sidebar_list'>
                {sidebarOptions.map(({ path, name }) => {
                    return (
                        <li key={name}>
                            <NavLink to={path} className={({ isActive }) => activeLinkClassName(isActive)}>
                                {name}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}