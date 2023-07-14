/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
import { useEffect } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import PatientTab from './patient/PatientTab';
import GenericCard from './cards/genericCard';
import AccountCircleTwoTone from '@mui/icons-material/AccountCircleTwoTone';

import { gridSpacing } from 'store/constant';
import { usePatient } from 'hooks/api/patient';



// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const { state, getAdultPatientList, getAdultPatientList18, GetAllPatientList } = usePatient();
    useEffect(() => {
        getAdultPatientList();
    }, []);

    useEffect(() => {
        getAdultPatientList18();
    }, [])

    useEffect(() => {
        GetAllPatientList()
    }, [])
    const theme = useTheme();
    const countAllPatients = state.patientListAll.length;
    const countAllAdultPatients = state.patientListAdult.length;
    const adults1818 = state.patientListAdultWith18.length
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <GenericCard
                            primary="All Patients"
                            secondary={countAllPatients || "0"}
                            content="All patients in the system are included"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.dark}
                            loader={false}
                        />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <GenericCard
                            primary="Adult Patients"
                            secondary={countAllAdultPatients || "0"}
                            content="Adult (s) starts from 18 years and older"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.dark}
                            loader={false}

                        />
                    </Grid>
                    {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <GenericCard
                            primary="Patients 18 months + Treatment"
                            secondary={adults1818 || "0"}
                            content="Patients with treatment over 18 months only"
                            iconPrimary={AccountCircleTwoTone}
                            color={theme.palette.primary.dark}
                            loader={false}

                        />
                    </Grid> */}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={12}>
                        <PatientTab />
                    </Grid>
                    {/* <Grid item xs={12} md={4}>
                        {/* <PopularCard isLoading={isLoading} /> */}
                    {/* </Grid>  */}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
