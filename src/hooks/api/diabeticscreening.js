/* eslint-disable no-empty */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { axiosMain } from "utils/axios"
import { useReducer, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';


const initialState = {
    diabeticList: [],
    isLoaded: false,
    filteredList: [],
    createLoader: false,
    createUpdateLoader: false
};

export const DiebeticContext = createContext([]);
export const useDiebetic = () => {
    const { state, dispatch } = useContext(DiebeticContext);
    const navigate = useNavigate();
    const { addToast } = useToasts();

    const GetDiebeticList = () => {
        dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: true });
        axiosMain
            .get(`/api/screening/`)
            .then((response) => {
                if (response.status === 200) {
                    const payload = response.data;
                    dispatch({ type: 'DIEBETCIC_LIST_REPONSE', diabeticList: payload.content });
                    dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: false });
                }
            })
            .catch((error) => {
                if (error) {
                    console.error("Error getting diebetic list. Details are as follows: ", error);
                    dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: false });
                }
            })
    }

    const CreateScreen = async (param) => {
        try {
            dispatch({ type: 'CREATE_LOADER_STATUS', createLoader: true });
            const patientData = await axiosMain.post(`/api/screening/`, param);
            if (patientData.status === 201) {
                dispatch({ type: 'CREATE_LOADER_STATUS', createLoader: false });
                navigate("/");
                addToast("The record has been added successfully", { appearance: 'info' });
            }
        } catch (error) {
            dispatch({ type: 'CREATE_LOADER_STATUS', createLoader: false });
            navigate("/screen/add");
            console.error("There was a problem saving the patient record: ", error);
        }

    }

    const UpdateScreen = async (param) => {
        try {
            dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: true });
            if (param !== null) {
                const updatedPatient = await axiosMain.put(`/api/screening/${param.id}`);
                if (updatedPatient.status === 200) {
                    dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: false });
                    navigate("/");
                    addToast("The record has been added successfully", { appearance: 'info' });
                }

            }
        } catch (error) {
            navigate(`/screening/edit/${param.id}`);
            console.error("There was a problem updating the record: ", error);
            addToast("The record did not update", { appearance: 'error' });

        }
    }

    const DeleteScreen = async (param) => {
        try {
            dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: true });
            const deletedPatient = await axiosMain.delete(`/api/screening/${param.id}`);
            if (deletedPatient.status === 200) {
                dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: false });
                navigate("/");
                addToast("The record has been deleted successfully", { appearance: 'info' });
            }
        } catch (error) {
            console.error("There was a problem deleting the  record: ", error);
            addToast("The record did not update", { appearance: 'error' });
            navigate("/");
        }
    }

    const getFilteredList = async (param) => {
        try {
            dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: true });
            const paramss = {
                bloodGlucoseMax: param.bloodGlucoseMax,
                bloodGlucoseMin: param.bloodGlucoseMin,
                systolicBloodPressureMax: param.systolicBloodPressureMax,
                systolicBloodPressureMin: param.systolicBloodPressureMin,
                diastolicBloodPressureMax: param.diastolicBloodPressureMax,
                diastolicBloodPressureMin: param.diastolicBloodPressureMin,
                heightMin: param.heightMin,
                heightMax: param.heightMax,
                weightMax: param.weightMax,
                weightMin: param.weightMin,
            }
            const filterdList = await axiosMain.post(`/api/screening/filter`, paramss);
            if (filterdList.status === 200) {
                dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: false });
                if (filterdList.data.length > 0) {
                    dispatch({ type: 'FILTERED_LIST_REQUEST', filteredList: filterdList.data });
                }
            }

            if (filterdList.status === 204) {
                dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: false });
                dispatch({ type: 'FILTERED_LIST_REQUEST', filteredList: null });
            }
        } catch (error) {
            dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: false });
            console.error("There was a problem with obtaing list : ", error);
        }
    }

    return { GetDiebeticList, state, CreateScreen, DeleteScreen, UpdateScreen, getFilteredList };
}


const actions = {
    DIEBETCIC_LIST_REPONSE: "DIEBETCIC_LIST_REPONSE",
    LOADING_DATA_STATUS: "LOADING_DATA_STATUS",
    FILTERED_LIST_REQUEST: "FILTERED_LIST_REQUEST",
    CREATE_LOADER_STATUS: "CREATE_LOADER_STATUS",
};

const diebeticReducer = (state, action) => {
    switch (action.type) {
        case actions.DIEBETCIC_LIST_REPONSE:
            return {
                ...state,
                diabeticList: action.diabeticList
            }

        case actions.LOADING_DATA_STATUS:
            return {
                ...state, isLoaded: action.isLoaded
            }
        case actions.FILTERED_LIST_REQUEST:
            return {
                ...state, filteredList: action.filteredList
            }
        case actions.CREATE_LOADER_STATUS:
            return {
                ...state, createLoader: action.createLoader
            }
        default:
            return {
                ...state
            }
    }
}


export const DiebeticContextProvider = (props) => {
    const [state, dispatch] = useReducer(diebeticReducer, initialState);

    return (
        <DiebeticContext.Provider value={{ state, dispatch }}>
            {props.children}
        </DiebeticContext.Provider>
    );
}
export const useDiebeticContext = () => useContext(DiebeticContext);

