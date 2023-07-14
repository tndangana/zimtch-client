import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 1 routing
const AuthLogin1 = Loadable(lazy(() => import('views/authentication/authentication1/Login1')));
const AuthRegister2 = Loadable(lazy(() => import('views/authentication/authentication1/Register2')));

const AuthForgotPassword1 = Loadable(lazy(() => import('views/authentication/authentication1/ForgotPassword1')));
const AuthCheckMail1 = Loadable(lazy(() => import('views/authentication/authentication1/CheckMail1')));
const AuthResetPassword1 = Loadable(lazy(() => import('views/authentication/authentication1/ResetPassword1')));
const AuthCodeVerification1 = Loadable(lazy(() => import('views/authentication/authentication1/CodeVerification1')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login1',
            element: <AuthLogin1 />
        },
        {
            path: '/pages/register/register2',
            element: <AuthRegister2 />
        },
        {
            path: '/pages/forgot-password/forgot-password1',
            element: <AuthForgotPassword1 />
        },
        {
            path: '/pages/check-mail/check-mail1',
            element: <AuthCheckMail1 />
        },
        {
            path: '/pages/reset-password/reset-password1',
            element: <AuthResetPassword1 />
        },
        {
            path: '/pages/code-verification/code-verification1',
            element: <AuthCodeVerification1 />
        }
    ]
};

export default AuthenticationRoutes;
