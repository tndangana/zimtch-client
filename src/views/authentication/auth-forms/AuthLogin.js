/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prettier/prettier */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

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

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAthentication } from '../../../hooks/api/authentication';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = () => {
    const theme = useTheme();
    const { authenticateRegistrant, state } = useAthentication();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginHandler = async (values) => {

        try {
            const payload = {
                username: values.registrantNumber,
                password: values.password
            }
            await authenticateRegistrant(payload);

        } catch (error) {
            console.log("Error is:", error);
        }

    }

    return (
        <>
            {
                state.isNotLoggedInLoader ? <CircularProgress color="inherit" /> :
                    <Formik
                        initialValues={{
                            registrantNumber: '',
                            password: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            registrantNumber: Yup.string().max(255).required('username is required'),
                            password: Yup.string().max(255).required('Password is required')
                        })}
                        onSubmit={values => {
                            try {
                                loginHandler(values);
                            } catch (error) {
                                console.error(error)
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit,  touched, values }) => (
                            <form noValidate onSubmit={handleSubmit} >
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.registrantNumber && errors.registrantNumber)}
                                    sx={{ ...theme.typography.customInput }}
                                >
                                    <InputLabel htmlFor="outlined-adornment-registration-login">Username</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-registrantNumber-login"
                                        type="text"
                                        value={values.registrantNumber}
                                        name="registrantNumber"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.registrantNumber && errors.registrantNumber && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.registrantNumber}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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
                                        label="Password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </FormControl>

                                <Grid container alignItems="center" justifyContent="space-between">
                                    <Grid item>
                                    </Grid>
                                    <Grid item>
                                        <Typography
                                            variant="subtitle1"
                                            component={Link}
                                            to={`/forgot-password`}
                                            color="primary"
                                            sx={{ textDecoration: 'none' }}
                                        >
                                            Forgot Password?
                                        </Typography>
                                    </Grid>
                                </Grid>

                                {errors.submit && (
                                    <Box sx={{ mt: 3 }}>
                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                    </Box>
                                )}
                                <Box sx={{ mt: 2 }}>
                                    <AnimateButton>
                                        <Button color="primary" fullWidth size="large" type="submit" variant="contained">
                                            Sign In
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

export default JWTLogin;
