/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import { useEffect } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports


import { gridSpacing } from 'store/constant';
import { usePatient } from 'hooks/api/patient';
import { useDiebetic } from 'hooks/api/diabeticscreening'
import GenderBarChart from './genderBarChart';
import AgePieChart from './ageBarChart';





// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const { state, getAdultPatientList, getAdultPatientList18, GetAllPatientList } = usePatient();
    const { state: diabeticscreening, GetDiebeticList } = useDiebetic();
    useEffect(() => {
        getAdultPatientList();
    }, []);

    useEffect(() => {
        GetDiebeticList();
    }, [])

    useEffect(() => {
        getAdultPatientList18();
    }, [])

    useEffect(() => {
        GetAllPatientList()
    }, [])

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <GenderBarChart data={state.patientListAll} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <AgePieChart data={state.patientListAll} />
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
