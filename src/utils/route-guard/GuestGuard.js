/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAthentication } from '../../hooks/api/authentication';

// project imports
import { DASHBOARD_PATH } from '../../config';


// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
    const { getCurrentRegistrant } = useAthentication();
    const token = getCurrentRegistrant();
    const navigate = useNavigate();
    useEffect(() => {
        if (token && token.success === true) {
            // OnLoad();
            navigate(DASHBOARD_PATH, { replace: true });
        }
    }, [token, navigate]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
