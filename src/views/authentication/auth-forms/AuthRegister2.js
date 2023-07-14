/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

import { useAthentication } from "../../../hooks/api/authentication";

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {
    const { registerRegistrant, state } = useAthentication()
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);
    const [, setConfirmPassword] = useState("");
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setConfirmShowPassword(!confirmShowPassword);
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleConfirmPassword = (value) => {
        const temp = strengthIndicator(value);
        setConfirmPassword(temp);
    }

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };




    const handleSubmit = async (params) => {
        if (params.password === params.confirmPassword) {
            await registerRegistrant(params);
        }
    };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Hi,</Typography>
                    </Box>
                </Grid>
            </Grid>
            {
                state.registrationLoader ? <CircularProgress color="inherit" /> :
                    <Formik
                        initialValues={{
                            password: '',
                            first_name: '',
                            last_name: '',
                            username:'',
                            email:'',
                            phone_number:''
                        }}
                        validationSchema={Yup.object().shape({
                            username: Yup.string().max(255).required('Username is required'),
                            password: Yup.string().max(255).required('Password is required'),
                            confirmPassword: Yup.string().max(255).required('Confirm Password is required').oneOf([Yup.ref('password')], 'Passwords does not match'),

                        })}
                        onSubmit={values => {
                            try {
                                handleSubmit(values);
                            } catch (error) {
                                console.error(error)
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} {...others}>

                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-email-register">username</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="text"
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />

                                </FormControl>
                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-email-register">First Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="text"
                                        value={values.first_name}
                                        name="first_name"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />

                                </FormControl>

                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-email-register">Last Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="text"
                                        value={values.last_name}
                                        name="last_name"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-email-register">Email</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="text"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </FormControl>

                                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-email-register">Phoner Number</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="text"
                                        value={values.phone_number}
                                        name="phone_number"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                    />
                                </FormControl>


                                {/* ============================================================PASSWORD================================================================================== */}
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.password && errors.password)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-register"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        label="Password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            changePassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                {/* ============================================================ CONFIRM PASSWORD================================================================================== */}

                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-confim-password-register">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-confirm-password-register"
                                        type={confirmShowPassword ? 'text' : 'password'}
                                        value={values.confirmPassword}
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleConfirmPassword(e.target.value);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowConfirmPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {confirmShowPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        inputProps={{}}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <FormHelperText error id="standard-weight-helper-text-password-register">
                                            {errors.confirmPassword}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                {strength !== 0 && (
                                    <FormControl fullWidth>
                                        <Box sx={{ mb: 2 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box
                                                        style={{ backgroundColor: level?.color }}
                                                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                                        {level?.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}
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
                                            Complete Registration
                                        </Button>
                                    </AnimateButton>
                                </Box>
                            </form>
                        )}
                    </Formik>
            }
        </>
    );
};

export default JWTRegister;
