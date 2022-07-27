import React from 'react';
import { Router } from './routes';
import { Navbar } from 'components';

export function NavRoutes() {
    return (
        <>
            <Navbar />
            <Router />
        </>
    )
}