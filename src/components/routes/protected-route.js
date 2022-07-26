import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children }) {
    const { user } = useSelector(state => state.user);
    const location = useLocation();
    return user?.email ? children : <Navigate to='/login' replace state={{ from: location }} />
}