/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
// material-ui
import { Divider, Grid, TextField, FormHelperText, Stack, Button, Box, MenuItem } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { gridSpacing } from 'store/constant';
import { usePatient } from 'hooks/api/patient';


// ==============================|| Layouts ||============================== //
function PatientForm() {
    const { CreatePatient, state } = usePatient();
    const handleSubmit = async (params) => {
        if (params !== null) {
            const payload = {
                firstName: params.firstName,
                lastName: params.lastName,
                mobileNumber: params.mobileNumber,
                gender: params.gender,
                age: params.age,
            };
            await CreatePatient(payload);
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
                            firstName: '',
                            lastName: '',
                            mobileNumber: '',
                            gender: '',
                            age: ''
                        }}
                        validationSchema={Yup.object().shape({
                            firstName: Yup.string().max(255).required('First name is required'),
                            lastName: Yup.string().max(255).required('Last Name is required'),
                            mobileNumber: Yup.string().max(255).required('Mobile number is required'),
                            gender: Yup.string().max(255).required('Gender is required'),
                            age: Yup.number().max(110).required("Age is required")
                        })}
                        onSubmit={values => {
                            try {
                                handleSubmit(values);
                            } catch (error) {
                                console.error(error)
                            }
                        }}
                    >
                        {({ errors, handleChange, handleSubmit, values, touched }) => (
                            <Grid justifyContent="center" alignItems="center" container spacing={gridSpacing}>

                                <Grid item xs={12} lg={6}>
                                    <MainCard title="Patient Form">
                                        <form noValidate onSubmit={handleSubmit} >

                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item xs={12}>
                                                    <InputLabel>First Name</InputLabel>
                                                    <TextField fullWidth
                                                        placeholder="Enter first name"
                                                        name='firstName'
                                                        value={values.firstName}
                                                        onChange={handleChange}
                                                        error={touched.firstName && Boolean(errors.firstName)}
                                                        helperText={touched.firstName && errors.firstName} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputLabel>Last Name</InputLabel>
                                                    <TextField fullWidth
                                                        placeholder="Enter last name"
                                                        name='lastName'
                                                        value={values.lastName}
                                                        onChange={handleChange}
                                                        error={touched.lastName && Boolean(errors.lastName)}
                                                        helperText={touched.lastName && errors.lastName} />
                                                    <FormHelperText>Please enter your last name</FormHelperText>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputLabel>Age</InputLabel>
                                                    <TextField fullWidth
                                                        placeholder="Enter age"
                                                        name='age'
                                                        value={values.age}
                                                        onChange={handleChange}
                                                        error={touched.age && Boolean(errors.age)}
                                                        helperText={touched.age && errors.age}
                                                    />
                                                </Grid>
                               
                                                <Grid item xs={12} md={6}>
                                                    <TextField
                                                        id="outlined-select-traininginstitution"
                                                        select
                                                        fullWidth
                                                        label="Select gender"
                                                        name="gender"
                                                        value={values.gender}
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value="MALE">MALE</MenuItem>
                                                        <MenuItem value="FEMALE">FEMALE</MenuItem>
                                                    </TextField>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <InputLabel>Mobile Number</InputLabel>
                                                    <TextField fullWidth
                                                        placeholder="Enter mobile number"
                                                        name='mobileNumber'
                                                        value={values.mobileNumber}
                                                        onChange={handleChange}
                                                        error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                                                        helperText={touched.mobileNumber && errors.mobileNumber} />
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
                    </Formik>
            }
        </>

    );
}

export default PatientForm;
