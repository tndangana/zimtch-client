/* eslint-disable prettier/prettier */
// material-ui
import { Divider, Grid, TextField, FormHelperText, MenuItem, Stack, Button, Box, InputAdornment, Autocomplete } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CircularProgress from '@mui/material/CircularProgress';


// project imports
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { gridSpacing } from 'store/constant';
import { useDiebetic } from 'hooks/api/diabeticscreening';
import { usePatient } from 'hooks/api/patient'
import { useEffect } from 'react';
// ==============================|| Layouts ||============================== //
function DiebeticForm() {
    const { CreateScreen } = useDiebetic();
    const { GetPatientList, state } = usePatient();
    useEffect(() => {
        GetPatientList()
    }, [])

    const handleSubmit = async (params) => {
        if (params !== null) {
            const payload = {
                bloodGlucose: params.bloodGlucose,
                bloodPressure: params.bloodPressure,
                diastolicBloodPressure: params.diastolicBloodPressure,
                systolicBloodPressure: params.systolicBloodPressure,
                height: params.height,
                patientId: params.patientId,
                treatmentDate: dayjs(new Date(params.treatmentDate)),
                weight: params.weight,

            };
            await CreateScreen(payload);
        }
    }
    return (
        <>
            {
                state.createLoader === true ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) :
                    <Formik
                        initialValues={{
                            bloodGlucose: '',
                            bloodPressure: "",
                            height: '',
                            patientId: '',
                            treatmentDate: new Date(),
                            weight: '',
                            diastolicBloodPressure: '',
                            systolicBloodPressure: ''
                        }}
                        validationSchema={Yup.object().shape({
                            bloodGlucose: Yup.string().max(255).required('Blood glucose is required'),
                            diastolicBloodPressure: Yup.string().max(255).required('Diastolic Blood pressure is required'),
                            systolicBloodPressure: Yup.string().max(255).required('SystolicDiastolic Blood pressure is required'),
                            height: Yup.string().max(255).required('Height is required'),
                            patientId: Yup.string().max(255).required('Patient is required'),
                            treatmentDate: Yup.string().max(255).required('Treatment start date is required'),
                            weight: Yup.string().max(255).required('Weight is required')
                        })}
                        onSubmit={values => {
                            try {
                                handleSubmit(values);
                            } catch (error) {
                                console.error(error)
                            }
                        }}
                    >
                        {({ errors, handleChange, handleSubmit, values, touched, setFieldValue }) => (
                            <Grid justifyContent="center" alignItems="center" container spacing={gridSpacing}>

                                <Grid item xs={12} lg={6}>
                                    <MainCard title="Screening Form">
                                        <form noValidate onSubmit={handleSubmit} >

                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12} md={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <MobileDatePicker
                                                            value={values.treatmentDate}
                                                            onChange={(newValue) => {
                                                                setFieldValue("treatmentDate", newValue);
                                                            }}
                                                            label="Treatment Date"
                                                            onError={console.log}
                                                            // minDate={new Date('2018-01-01T00:00')}
                                                            inputFormat="yyyy-mm-dd"
                                                            mask="___/__/__ __:__ _M"
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    fullWidth
                                                                    margin="normal"
                                                                    InputProps={{
                                                                        endAdornment: (
                                                                            <InputAdornment position="end">
                                                                                <DateRangeIcon />
                                                                            </InputAdornment>
                                                                        )
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputLabel> Systolic Blood Pressure (mmHg)</InputLabel>
                                                    <TextField fullWidth
                                                        placeholder="Enter Systolic Blood Pressure"
                                                        name='systolicBloodPressure'
                                                        value={values.systolicBloodPressure}
                                                        onChange={handleChange}
                                                        error={touched.systolicBloodPressure && Boolean(errors.systolicBloodPressure)}
                                                        helperText={touched.systolicBloodPressure && errors.systolicBloodPressure} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputLabel>Diastolic Blood Pressure (mmHg)</InputLabel>
                                                    <TextField fullWidth
                                                        placeholder="Enter Diastolic Blood Pressure"
                                                        name='diastolicBloodPressure'
                                                        value={values.diastolicBloodPressure}
                                                        onChange={handleChange}
                                                        error={touched.diastolicBloodPressure && Boolean(errors.diastolicBloodPressure)}
                                                        helperText={touched.diastolicBloodPressure && errors.diastolicBloodPressure} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputLabel>Blood Glucose</InputLabel>
                                                    <TextField fullWidth
                                                        placeholder="Enter Blood Glucose"
                                                        name='bloodGlucose'
                                                        value={values.bloodGlucose}
                                                        onChange={handleChange}
                                                        error={touched.bloodGlucose && Boolean(errors.bloodGlucose)}
                                                        helperText={touched.bloodGlucose && errors.bloodGlucose}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputLabel>Height</InputLabel>
                                                    <TextField fullWidth
                                                        placeholder="Enter Height"
                                                        name='height'
                                                        value={values.height}
                                                        onChange={handleChange}
                                                        error={touched.height && Boolean(errors.height)}
                                                        helperText={touched.height && errors.height} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputLabel>Weight</InputLabel>
                                                    <TextField fullWidth
                                                        placeholder="Enter Weight"
                                                        name='weight'
                                                        value={values.weight}
                                                        onChange={handleChange}
                                                        error={touched.weight && Boolean(errors.weight)}
                                                        helperText={touched.weight && errors.weight}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} md={6}>
                                                    <TextField
                                                        id="outlined-select-traininginstitution"
                                                        select
                                                        fullWidth
                                                        label="Select patient"
                                                        name="patientId"
                                                        value={values.patientId}
                                                        onChange={handleChange}
                                                    >
                                                        {state.patientList.map((name) => (
                                                            <MenuItem
                                                                key={name.id}
                                                                value={name.id}
                                                            >
                                                                {name.firstName}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Stack
                                                    direction={{ xs: 'column', sm: 'row' }}
                                                    spacing={{ xs: 1, sm: 2, md: 4 }} >
                                                    <Box sx={{ mt: 2 }}>
                                                        <AnimateButton>
                                                            <Button
                                                                disableElevation
                                                                fullWidth
                                                                size="large"
                                                                type="submit"
                                                                variant="contained"
                                                                color="primary"
                                                            >
                                                                Submit
                                                            </Button>
                                                        </AnimateButton>
                                                    </Box>
                                                </Stack>
                                            </Grid>
                                        </form>
                                    </MainCard>
                                </Grid>
                            </Grid>)}
                    </Formik>}
        </>

    );
}

export default DiebeticForm;
