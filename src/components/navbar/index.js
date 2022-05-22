import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useComponentVisible } from "../../hooks/useVisible";
import './index.css';

export function Navbar() {
    const { user: { firstName = '', email = '' }, updateUser } = useAuth();
    const navigate = useNavigate();
    const { ref, isComponentVisible } = useComponentVisible(true);

    const [isLogoutVisible, setIsLogoutVisible] = useState(false);

    const handleLogout = () => {
        updateUser({});
        navigate('/login');
        localStorage.removeItem('retro-tube-token');
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
            </nav>
        </div>
    );
}
