import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, Login, SignUp } from '../../pages';
import { Navbar } from '../navbar';

function NavRoutes() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route />
            </Routes>
        </>
    )
}

export default NavRoutes