/* eslint-disable prettier/prettier */
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import CircularProgress from '@mui/material/CircularProgress';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useAthentication } from '../../../hooks/api/authentication';
// ========================|| FIREBASE - FORGOT PASSWORD ||======================== //

const AuthForgotPassword = ({ ...others }) => {
    const theme = useTheme();


    const { forgotPassword,state } = useAthentication();
    const submitHandler = async (registrantNumber) => {
        await forgotPassword(registrantNumber);
    }

    return (
        state.isForgottenPasswordLoader ? <CircularProgress color="inherit" /> :

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
            {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                <form noValidate onSubmit={handleSubmit} {...others}>
                    <FormControl fullWidth error={Boolean(touched.registrantNumber && errors.registrantNumber)} sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="outlined-adornment-registrantNumber-forgot">Registration Number</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-registrantNumber-forgot"
                            type="text"
                            value={values.registrantNumber}
                            name="registrantNumber"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            label="Registration Number"
                            inputProps={{}}
                        />
                        {touched.registrantNumber && errors.registrantNumber && (
                            <FormHelperText error id="standard-weight-helper-text-registrantNumber-forgot">
                                {errors.registrantNumber}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
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
                                Send OTP
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default AuthForgotPassword;
