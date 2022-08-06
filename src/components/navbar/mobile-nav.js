import React from 'react';
import { NavLink } from 'react-router-dom';
import { BiSun } from 'react-icons/bi';
import { BsFillMoonFill } from 'react-icons/bs';
import { sidebarOptions } from 'components/sidebar/options'
import { useTheme } from 'hooks/useTheme';
import { MdLogout } from 'react-icons/md';
import './mobile-nav.css';

export function MobileNavigation({ show, close, user, handleLogout }) {
    const { theme, changeTheme } = useTheme();
    const { firstName, email } = user;
    if (!show) return null;
    return (
        <div className='mobile_nav_sidebar'>
            <div className='mobile_auth flex align_center justify_spacebtw'>
                {email ?
                    <div className="username_div">
                        <h3 className="pointer username">
                            Hi, {firstName}
                        </h3>
                    </div>
                    :
                    <div className="nav_search flex align_center">
                        <NavLink to='/signup' className="btn nav_link auth_btn">Sign up</NavLink>
                        <NavLink to='/login' className="btn nav_link auth_btn">Log in</NavLink>
                    </div>
                }
                <span className="material-icons-outlined mobile_close" onClick={close}>close</span>
            </div>
            <ul className="mt-1 p-1 options">
                {sidebarOptions.map(({ path, name, icon }) => {
                    return (
                        <li key={name} className='pointer flex align_center mobile_li'>
                            <span className='nav_icon'>{icon} </span>
                            <NavLink to={path}>
                                {name}
                            </NavLink>
                        </li>
                    )
                })}
                <li className='pointer flex align_center mobile_li'>
                    <span className="theme pointer mobile_theme" onClick={() => changeTheme()} title={theme}>
                        {theme === 'dark' ?
                            <div className='theme_div flex'>
                                <BsFillMoonFill />
                                <span>Dark</span>
                            </div>
                            :
                            <div>
                                <BiSun />
                                <span>Light</span>
                            </div>
                        }
                    </span>
                </li>
                <li>
                    {user?.email && (
                        <div className='flex logout_div'>
                            <span className='nav_icon'><MdLogout /></span>
                            <button className="logout_btn" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </li>
            </ul>
        </div>
    )
}