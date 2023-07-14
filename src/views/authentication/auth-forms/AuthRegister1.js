/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import { useAthentication } from "../../../hooks/api/authentication";
// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {
    const theme = useTheme();
    const { GetRegistrant, state } = useAthentication();

    const submitHandler = async (registrantNumber) => {
        await GetRegistrant(registrantNumber);
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with registration number</Typography>
                    </Box>
                </Grid>
            </Grid>

            {
                state.isRegistrationOneLoader ? <CircularProgress color="inherit" /> :
                    <Formik

                        initialValues={{
                            registrantNumber: ''

                        }}
                        validationSchema={Yup.object().shape({
                            registrantNumber: Yup.number().required('Registration is required')
                        })}
                        onSubmit={values => {

                            submitHandler(values);
                        }}
                    >
                        {({ errors, handleChange, handleSubmit, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} {...others}>
                                <FormControl fullWidth error={Boolean(touched.registrantNumber && errors.registrantNumber)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-email-register">Registration Number</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="text"
                                        value={values.registrantNumber}
                                        name="registrantNumber"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        inputProps={{}}
                                    />
                                    {touched.registrantNumber && errors.registrantNumber && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.registrantNumber}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <Button
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            Sign up
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </form>
                        )}
                    </Formik>}
        </>
    );
};

export default JWTRegister;
