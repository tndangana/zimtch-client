/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prettier/prettier */

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography, FormHelperText } from '@mui/material';

// third-party
import OtpInput from 'react18-input-otp';
import { useAthentication } from "../../../hooks/api/authentication";
import * as Yup from 'yup';
import { Formik } from 'formik'
import secureLocalStorage from "react-secure-storage";
import CircularProgress from '@mui/material/CircularProgress';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = () => {
    const theme = useTheme();
    const { verifyRegistrantOTP, state } = useAthentication();


    const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[300];
    const submitHandler = async (params) => {
        try {
            const user_name = secureLocalStorage.getItem('*');
            if (user_name) {
                params.user_name = user_name;
                await verifyRegistrantOTP(params);
            }
        } catch (error) {
            console.error("Error submitting OTP: ", error)
        }
    }
    return (
        <>
            {
                state.verifiedOTPLoader ? <CircularProgress color="inherit" /> :
                    <Formik
                        initialValues={{
                            otp: ''
                        }}
                        validationSchema={Yup.object().shape({
                            otp: Yup.number().required('Verification code is required !!')
                        })}
                        onSubmit={values => {
                            submitHandler(values);
                        }}
                    >
                        {({ errors, handleSubmit, touched, values, setFieldValue }) => (
                            <form noValidate onSubmit={handleSubmit} >

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <OtpInput
                                            value={values.otp}
                                            onChange={(newValue) => {
                                                setFieldValue("otp", newValue);
                                            }}
                                            numInputs={5}
                                            containerStyle={{ justifyContent: 'space-between' }}
                                            inputStyle={{
                                                width: '100%',
                                                margin: '8px',
                                                padding: '10px',
                                                border: `1px solid ${borderColor}`,
                                                borderRadius: 4,
                                                ':hover': {
                                                    borderColor: theme.palette.primary.main
                                                }
                                            }}
                                            focusStyle={{
                                                outline: 'none',
                                                border: `2px solid ${theme.palette.primary.main}`
                                            }}
                                        />
                                        {touched.otp && errors.otp && (
                                            <FormHelperText error id="standard-weight-helper-text--register">
                                                {errors.otp}
                                            </FormHelperText>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button disableElevation fullWidth size="large" type="submit" variant="contained">
                                            Continue
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                                            <Typography>Did not receive the one time password ? </Typography>
                                            {/* <Typography variant="body1" sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer' }} color="primary">
                                                Resend code
                                            </Typography> */}
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </form>)}
                    </Formik>
            }
        </>
    );
};
export default AuthCodeVerification;
