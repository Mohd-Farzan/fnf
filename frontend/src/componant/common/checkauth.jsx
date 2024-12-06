import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // Handle unauthenticated users
    if (!isAuthenticated) {
        // Allow access to login and signup pages
        if (location.pathname === '/auth/login' || location.pathname === '/auth/signup') {
            return <>{children}</>;
        }
        // Redirect to login if trying to access any other page
        return <Navigate to='/auth/login' replace />;
    }

    // Handle authenticated users
    if (isAuthenticated) {
        if (user?.role === 'admin') {
            if (location.pathname.includes('/shop') || location.pathname === '/auth/login' || location.pathname === '/auth/signup') {
                return <Navigate to='/admin/dashboard' replace />;
            }
        } else if (user?.role === 'user') {
            if (location.pathname.includes('/admin') || location.pathname === '/auth/login' || location.pathname === '/auth/signup' ) {
                return <Navigate to='/shop/home'/>;
            }
            // Allow access to shop pages
            if (location.pathname.includes('/shop')) {
                return <>{children}</>;
            }
        }
    }

    // Default rendering of children if all checks are passed
    return <>{children}</>;
}

export default CheckAuth;
