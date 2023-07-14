/* eslint-disable prettier/prettier */
import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const ChartDashBoard = Loadable(lazy(() => import('views/charts')));

// Applications Data Routing
const PatientForm = Loadable(lazy(() => import('views/dashboard/Default/patient/PatientAddForm')));
const DiabeticForm = Loadable(lazy(() => import('views/dashboard/Default/diebetic/DiabeticAddForm')));



// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
      

        {
            path: '/dashboard/default',
            element: <DashboardDefault />
        },

        {
            path: '/dashboard/chart',
            element: <ChartDashBoard />
        },
    
        {
            path: '/patient/add',
            element: <PatientForm />
        },
        {
            path: '/screen/add',
            element: <DiabeticForm />
        }

    ]
};

export default MainRoutes;
