/* eslint-disable no-plusplus */
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
    patientListAll: [],
    patientList: [],
    patientListAdult: [],
    patientListAdultWith18: [],
    isLoaded: false,
    createLoader: false,
    adultListLoader: false,
    allPatientsListLoader: false,
    adultPatient18: false
};

export const PatientContext = createContext([]);
export const usePatient = () => {
    const { state, dispatch } = useContext(PatientContext);
    const navigate = useNavigate();
    const { addToast } = useToasts();


    const GetAllPatientList = async () => {

        try {
            const adultList = await axiosMain.get(`/api/patient/`);
            if (adultList.status === 200) {
                dispatch({ type: 'ALL_PATIENTS_INSYSYSTEM', patientListAll: adultList?.data?.content });
            }
        } catch (error) {
            console.error("There was a problem  with getting all patient list: ", error);

        }
    }

    const GetPatientList = async () => {

        dispatch({ type: 'ALL_PATIENT_LIST_LOADER', allPatientsListLoader: true });
        try {
            const adultList = await axiosMain.get(`/api/patient/get-list-age`, {
                params: {
                    age: 0
                }
            });
            if (adultList.status === 200) {
                dispatch({ type: 'PATIENTLIST_REPONSE', patientList: adultList.data });
                dispatch({ type: 'ALL_PATIENT_LIST_LOADER', allPatientsListLoader: false });

            }
        } catch (error) {
            dispatch({ type: 'ALL_PATIENT_LIST_LOADER', allPatientsListLoader: false });
            console.error("There was a problem  with getting all patient list: ", error);

        }
    }


    const CreatePatient = async (param) => {
        try {
            dispatch({ type: 'CREATE_LOADER', createLoader: true });
            const patientData = await axiosMain.post(`/api/patient/`, param);
            if (patientData.status === 201) {
                dispatch({ type: 'CREATE_LOADER', createLoader: false });
                navigate("/");
                addToast("The patient record has been added successfully", { appearance: 'info' });
            }
        } catch (error) {
            dispatch({ type: 'CREATE_LOADER', createLoader: false });
            navigate("/patient/add");
            console.error("There was a problem saving the patient record: ", error);
        }

    }

    const UpdatePatient = async (param) => {
        try {
            dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: true });
            if (param !== null) {
                const updatedPatient = await axiosMain.put(`/api/patient/${param.id}`);
                if (updatedPatient.status === 200) {
                    dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: false });
                    navigate("/");
                    addToast("The patient record has been added successfully", { appearance: 'info' });
                }

            }
        } catch (error) {
            navigate(`/patient/edit/${param.id}`);
            console.error("There was a problem updating the patient record: ", error);
            addToast("The patient record did not update", { appearance: 'error' });

        }
    }

    const DeletePatient = async (param) => {
        try {
            dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: true });
            const deletedPatient = await axiosMain.delete(`/api/patient/${param.id}`);
            if (deletedPatient.status === 200) {
                dispatch({ type: 'LOADING_DATA_STATUS', isLoaded: false });
                navigate("/");
                addToast("The patient record has been deleted successfully", { appearance: 'info' });
            }
        } catch (error) {
            console.error("There was a problem deleting the patient record: ", error);
            addToast("The patient record did not update", { appearance: 'error' });
            navigate("/");
        }
    }

    const getAdultPatientList = async () => {
        dispatch({ type: 'ADULT_PATIENT_LOADER', adultListLoader: true });
        try {
            const adultList = await axiosMain.get(`/api/patient/get-list-age`, {
                params: {
                    age: 18
                }
            });
            if (adultList.status === 200) {
                dispatch({ type: 'ADULT_PATIENT_LIST', patientListAdult: adultList.data });
                dispatch({ type: 'ADULT_PATIENT_LOADER', adultListLoader: false });

            }
        } catch (error) {
            dispatch({ type: 'ADULT_PATIENT_LOADER', adultListLoader: false });
            console.error("There was a problem  with getting adult list: ", error);

        }
    }

    const getAdultPatientList18 = async () => {
        dispatch({ type: 'ALL_PATIENT18_LIST_LOADER', adultPatient18: true });
        try {
            const adultList18 = [];
            const adultList = await axiosMain.get(`/api/patient/patient-adult-18`);
            console.log("=-=-=-=-=-=---", adultList)
            if (adultList.status === 200 && adultList.data.length > 0) {
                dispatch({ type: 'ALL_PATIENT18_LIST_LOADER', adultPatient18: false });
                dispatch({ type: 'ADULT_PATIENT_LIST18', patientListAdultWith18: adultList.data });
            }
        } catch (error) {
            dispatch({ type: 'ALL_PATIENT18_LIST_LOADER', adultPatient18: false });
            console.error("There was a problem  with getting adult list: ", error);

        }
    }

    return { GetPatientList, state, CreatePatient, DeletePatient, UpdatePatient, getAdultPatientList, getAdultPatientList18, GetAllPatientList };
}


const actions = {
    PATIENTLIST_REPONSE: "PATIENTLIST_REPONSE",
    LOADING_DATA_STATUS: "LOADING_DATA_STATUS",
    ADULT_PATIENT_LIST: "ADULT_PATIENT_LIST",
    ADULT_PATIENT_LIST18: "ADULT_PATIENT_LIST18",
    CREATE_LOADER: "CREATE_LOADER",
    ADULT_PATIENT_LOADER: "ADULT_PATIENT_LOADER",
    ALL_PATIENT_LIST_LOADER: "ALL_PATIENT_LIST_LOADER",
    ALL_PATIENT18_LIST_LOADER: "ALL_PATIENT18_LIST_LOADER",
    ALL_PATIENTS_INSYSYSTEM: "ALL_PATIENTS_INSYSYSTEM"




};

const patientReducer = (state, action) => {
    switch (action.type) {
        case actions.PATIENTLIST_REPONSE:
            return {
                ...state,
                patientList: action.patientList
            }
        case actions.LOADING_DATA_STATUS:
            return {
                ...state, isLoaded: action.isLoaded
            }

        case actions.ALL_PATIENTS_INSYSYSTEM:
            return {
                ...state, patientListAll: action.patientListAll
            }
        case actions.ADULT_PATIENT_LIST:
            return {
                ...state, patientListAdult: action.patientListAdult
            }
        case actions.ADULT_PATIENT_LIST18:
            return {
                ...state, patientListAdultWith18: action.patientListAdultWith18
            }
        case actions.CREATE_LOADER:
            return {
                ...state, createLoader: action.createLoader
            }
        case actions.ADULT_PATIENT_LOADER:
            return {
                ...state, adultListLoader: action.adultListLoader
            }
        case actions.ALL_PATIENT_LIST_LOADER:
            return {
                ...state, allPatientsListLoader: action.allPatientsListLoader
            }
        case actions.ALL_PATIENT18_LIST_LOADER:
            return {
                ...state, adultPatient18: action.adultPatient18
            }
        default:
            return {
                ...state
            }

    }
}


export const PatientContextProvider = (props) => {

    const [state, dispatch] = useReducer(patientReducer, initialState);

    return (
        <PatientContext.Provider value={{ state, dispatch }}>
            {props.children}
        </PatientContext.Provider>
    );
}
export const usePatientContext = () => useContext(PatientContext);
