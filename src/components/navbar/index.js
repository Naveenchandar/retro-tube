import { NavLink } from "react-router-dom";
import './index.css';

export function Navbar() {
    return (
        <div className="nav_group">
            <nav className="nav_bar flex_row justify_spacebtw">
                <div className="nav_options">
                    <ul className="navbar_nav flex">
                        <NavLink to='/' className="navbar_brand nav_link align_center">
                            Retro tube
                        </NavLink>
                        <li className="nav_item active">
                            <NavLink to='/login' className="nav_link">
                                Explore
                            </NavLink>
                        </li>
                        <li className="nav_item">
                            <NavLink to='/signup' className="nav_link">
                                Trending
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="nav_search flex align_center">
                    <NavLink to='/signup' className="nav_link">Sign up</NavLink>
                    <NavLink to='/login' className="nav_link">Log in</NavLink>
                </div>
            </nav>
        </div>
    );
}
