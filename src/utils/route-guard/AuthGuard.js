/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnLoad } from './Loader'

// project imports
import { useAthentication } from '../../hooks/api/authentication';

// ==============================|| AUTH GUARD ||============================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    OnLoad();
    const navigate = useNavigate();
    const { getCurrentRegistrant } = useAthentication();
    const token = getCurrentRegistrant();
    useEffect(() => {
        if (!token || token === undefined || token === null) {
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
