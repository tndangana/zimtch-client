/* eslint-disable prettier/prettier */
import { useRoutes } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //
// AuthenticationRoutes
export default function ThemeRoutes() {
    return useRoutes([LoginRoutes, MainRoutes]);
}


ToastProvider.defaultProps = {
    autoDismiss: true,
    autoDismissTimeout: 4000,
    newestOnTop: false,
    placement: 'bottom-center',
    transitionDuration: 220
};