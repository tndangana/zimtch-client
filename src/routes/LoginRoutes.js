import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/authentication/authentication1/Login1')));
const AuthRegister2 = Loadable(lazy(() => import('views/authentication/authentication1/Register2')));

const AuthForgotPassword = Loadable(lazy(() => import('views/authentication/authentication1/ForgotPassword1')));
const AuthResetPassword1 = Loadable(lazy(() => import('views/authentication/authentication1/ResetPassword1')));
const MaintenanceError = Loadable(lazy(() => import('views/maintenance/Error')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister2 />
        },
        {
            path: '/forgot-password',
            element: <AuthForgotPassword />
        },
        {
            path: '/reset-password',
            element: <AuthResetPassword1 />
        },
        {
            path: '/error',
            element: <MaintenanceError />
        }
    ]
};

export default LoginRoutes;
