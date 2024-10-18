import React from 'react'
import useAuth from '../hooks/useAuth.js'
import { useLocation, Outlet, Navigate } from 'react-router-dom'

function RequireAuth() {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.accessToken
            ? <Outlet />
            :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth