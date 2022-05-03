import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdOutlineExplore, MdOutlineWatchLater, MdOutlineHistory } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { RiPlayListLine } from 'react-icons/ri';
import { BiLike } from 'react-icons/bi';
import './index.css';

const sidebarOptions = [
    { path: '/', name: 'Home', icon: <AiOutlineHome /> },
    { path: '/explore', name: 'Explore', icon: <MdOutlineExplore /> },
    { path: '/playlists', name: 'Playlists', icon: <RiPlayListLine /> },
    { path: '/watchlater', name: 'Watch later', icon: <MdOutlineWatchLater /> },
    { path: '/', name: 'Liked videos', icon: <BiLike /> },
    { path: '/', name: 'History', icon: <MdOutlineHistory /> }
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