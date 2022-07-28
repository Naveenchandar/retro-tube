import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useComponentVisible } from "hooks/useVisible";
import { updateUser } from "features/authSlice";
import './index.css';
import { useTheme } from "hooks/useTheme";
import { BiSun } from 'react-icons/bi';
import { BsFillMoonFill } from 'react-icons/bs';

export function Navbar() {
    const { user: { firstName = '', email = '' } } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ref, isComponentVisible } = useComponentVisible(true);
    const { theme, changeTheme } = useTheme();

    const [isLogoutVisible, setIsLogoutVisible] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('retro-tube-token');
        dispatch(updateUser({}));
        navigate('/login');
    }

    useEffect(() => {
        return () => {
            setIsLogoutVisible(false);
        }
    }, [])

    return (
        <div className="nav_group">
            <nav className="nav_bar flex_row justify_spacebtw">
                <div className="nav_options">
                    <ul className="navbar_nav flex">
                        <NavLink to='/' className="navbar_brand nav_link align_center">
                            Retro tube
                        </NavLink>
                        <li className="nav_item active">
                            <NavLink to='/explore' className="nav_link" state={{ categoryName: 'all' }}>
                                Explore
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex align_center">
                    {email ?
                        <div className="relative_pos username_div">
                            <h3 className="pointer username" onClick={() => setIsLogoutVisible(isComponentVisible ? true : false)}>Hi, {firstName}</h3>
                            {isLogoutVisible && isComponentVisible && (
                                <button className="auth_btn logout_btn nav_link absolute_pos" ref={ref} onClick={handleLogout}>Logout</button>
                            )}
                        </div>
                        :
                        <div className="nav_search flex align_center">
                            <NavLink to='/signup' className="btn nav_link auth_btn">Sign up</NavLink>
                            <NavLink to='/login' className="btn nav_link auth_btn">Log in</NavLink>
                        </div>
                    }
                    <label className="theme pointer" onClick={() => changeTheme()} title={theme}>
                        {theme === 'dark' ? <BsFillMoonFill /> : <BiSun />}
                    </label>
                </div>
            </nav>
        </div>
    );
}
