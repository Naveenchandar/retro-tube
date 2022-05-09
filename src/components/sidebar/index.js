import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
import { sidebarOptions } from './options';

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
                {sidebarOptions.map(({ path, name, icon }) => {
                    return (
                        <li key={name} className='pointer flex align_center'>
                            <span className='nav_icon'>{icon} </span>
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