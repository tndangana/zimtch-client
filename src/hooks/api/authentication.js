/* eslint-disable spaced-comment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { axiosMain } from "utils/axios"
import { useReducer, useContext, createContext } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';



const initialState = {
    data: {},
    error: {},
    isLoaded: false,
    isNotLoggedInLoader: false,
    isRegistrationOneLoader: false,
    isForgottenPasswordLoader: false,
    isRessetPasswordLoader: false,
    verifiedOTPLoader: false,
    registrationLoader: false
};

export const AuthenticationContext = createContext([]);
export const useAthentication = () => {
    const { state, dispatch } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const { addToast } = useToasts();



    const registerRegistrant = async (param) => {
        try {
            dispatch({ type: "REGISTER_APPLICATION_STATUS", registrationLoader: true });
            const payload = await axiosMain.post(`/api/auth/register-user`, param);
            if (payload.status === 200) {
                dispatch({ type: "REGISTER_APPLICATION_STATUS", registrationLoader: false });
                navigate("/login");
                secureLocalStorage.clear();
                addToast("The user has been registered successfully", { appearance: 'info' });
            }
            else if (payload.status === 401) {
                dispatch({ type: "REGISTER_APPLICATION_STATUS", registrationLoader: false });
                navigate("/login");
                secureLocalStorage.clear();
                addToast("The user is not authenticated", { appearance: 'error' });
            }
            else {
                dispatch({ type: "REGISTER_APPLICATION_STATUS", registrationLoader: false });
                secureLocalStorage.clear();
                addToast("Form failed to save ", { appearance: 'error' });

            }
        } catch (error) {
            dispatch({ type: "REGISTER_APPLICATION_STATUS", registrationLoader: false });
            navigate("/error", { replace: true });
            console.error("Something went wrong with login: ", error);
        }

    }

    const authenticateRegistrant = async (param) => {
        try {
            dispatch({ type: "LOGIN_STATUS", isNotLoggedInLoader: true });
            const payload = await axiosMain.post(`/api/auth/login`, param);
            if (payload && payload.data && payload.status === 200) {
                const payload_next = {
                    success: payload.data.success,
                    token: payload.data.token,
                    id: payload.data.id,
                }
                if (payload_next) {
                    secureLocalStorage.setItem('t', payload_next);
                    if (secureLocalStorage.getItem("t")) {
                        dispatch({ type: "LOGIN_STATUS", isNotLoggedInLoader: false });
                        navigate("/");
                    }
                }
            }
       
        } catch (error) {
            dispatch({ type: "LOGIN_STATUS", isNotLoggedInLoader: false });
            if(error.success === false){
                navigate("/login", { replace: true });
                addToast("Form failed to login ", { appearance: 'error' });

                console.error("Something went wrong with login: ", error);
            }
           

        }
    }



    const logoutRegistrant = () => {
        secureLocalStorage.clear();
        navigate("/login");
    }



    const getCurrentRegistrant = () => secureLocalStorage.getItem("t");

    const getValidatedRegistrant = () => secureLocalStorage.getItem("rg");

    return { registerRegistrant, authenticateRegistrant, logoutRegistrant, state, getCurrentRegistrant, getValidatedRegistrant }

}


const actions = {
    ERROR_RESPONSE: 'ERROR_RESPONSE',
    LOADING_RESPONSE: 'LOADING_RESPONSE',
    LOGIN_STATUS: "LOGIN_STATUS",
    REGISTRATION1STATUS: "REGISTRATION1STATUS",
    FORGOTTEN_PASSWORD_STATUS: "FORGOTTEN_PASSWORD_STATUS",
    RESET_PASSWORD_LOADER: "RESET_PASSWORD_LOADER",
    VERIFY_OTP_LOADER: "VERIFY_OTP_LOADER",
    REGISTER_APPLICATION_STATUS: "REGISTER_APPLICATION_STATUS"
};

const authenticationContextReducer = (state, action) => {
    switch (action.type) {
        case actions.LOADING_RESPONSE:
            return {
                ...state, loaded: action.loaded
            }
        case actions.ERROR_RESPONSE:
            return {
                ...state, error: action.error
            }
        case actions.LOGIN_STATUS:
            return {
                ...state, isNotLoggedInLoader: action.isNotLoggedInLoader
            }
        case actions.REGISTRATION1STATUS:
            return {
                ...state, isRegistrationOneLoader: action.isRegistrationOneLoader
            }

        case actions.FORGOTTEN_PASSWORD_STATUS:
            return {
                ...state, isForgottenPasswordLoader: action.isForgottenPasswordLoader
            }
        case actions.RESET_PASSWORD_LOADER:
            return {
                ...state, isRessetPasswordLoader: action.isRessetPasswordLoader
            }
        case actions.VERIFY_OTP_LOADER:
            return {
                ...state, verifiedOTPLoader: action.verifiedOTPLoader
            }
        case actions.REGISTER_APPLICATION_STATUS:
            return {
                ...state, registrationLoader: action.registrationLoader
            }
        default:
            return {
                ...state
            }
    }
}


export const AuthenticationContextProvider = (props) => {

    const [state, dispatch] = useReducer(authenticationContextReducer, initialState);

    return (
        <AuthenticationContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AuthenticationContext.Provider>
    );
}
export const useAuthenticationContext = () => useContext(AuthenticationContext);



