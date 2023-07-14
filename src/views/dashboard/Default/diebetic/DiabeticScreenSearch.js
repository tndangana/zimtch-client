/* eslint-disable prettier/prettier */
// material-ui
import {
    Grid,
    TextField,
    Typography, Box, Stack, Button
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import TagFacesIcon from '@mui/icons-material/TagFaces';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { gridSpacing } from 'store/constant';
import { useDiebetic } from '../../../../hooks/api/diabeticscreening';
import { Link as RouterLink } from 'react-router-dom';


// ==============================|| Columns Layouts ||============================== //
function ScreeningFilter() {
    const { getFilteredList } = useDiebetic();
    const handleSubmit = async (param) => {

        const payload = {
            bloodGlucoseMax: param.bloodGlucoseMax,
            bloodGlucoseMin: param.bloodGlucoseMin,
            // bloodPressureMax: param.bloodPressureMax,
            // bloodPressureMin: param.bloodPressureMin,
            heightMax: param.heightMax,
            heightMin: param.heightMin,
            weightMax: param.weightMax,
            weightMin: param.weightMin,
            systolicBloodPressureMax: param.systolicBloodPressureMax,
            systolicBloodPressureMin: param.systolicBloodPressureMin,
            diastolicBloodPressureMax: param.diastolicBloodPressureMax,
            diastolicBloodPressureMin: param.diastolicBloodPressureMin,
        };
        await getFilteredList(payload);
    }

    return (
        <>
            <Formik
                initialValues={{
                    bloodGlucoseMax: "",
                    bloodGlucoseMin: "",
                    // bloodPressureMax: "",
                    // bloodPressureMin: "",                 
                    systolicBloodPressureMax: "",
                    systolicBloodPressureMin: "",
                    diastolicBloodPressureMax: "",
                    diastolicBloodPressureMin: "",
                    heightMax: "",
                    heightMin: "",
                    weightMax: "",
                    weightMin: ""
                }}

                validationSchema={Yup.object().shape({
                    bloodGlucoseMax: Yup.number().when('bloodGlucoseMin', {
                        is: (val) => val != null && val !== '',
                        then: Yup.number().moreThan(Yup.ref('bloodGlucoseMin'), 'Max value must be greater than min value'),
                        otherwise: Yup.number(),
                    }),
                    bloodGlucoseMin: Yup.number(),
                    systolicBloodPressureMax: Yup.number().when('systolicBloodPressureMin', {
                        is: (val) => val != null && val !== '',
                        then: Yup.number().moreThan(Yup.ref('systolicBloodPressureMin'), 'Max value must be greater than min value'),
                        otherwise: Yup.number(),
                    }),
                    systolicBloodPressureMin: Yup.number(),
                    diastolicBloodPressureMax: Yup.number().when('diastolicBloodPressureMin', {
                        is: (val) => val != null && val !== '',
                        then: Yup.number().moreThan(Yup.ref('diastolicBloodPressureMin'), 'Max value must be greater than min value'),
                        otherwise: Yup.number(),
                    }),
                    diastolicBloodPressureMin: Yup.number(),
                    heightMax: Yup.number().when('heightMin', {
                        is: (val) => val != null && val !== '',
                        then: Yup.number().moreThan(Yup.ref('heightMin'), 'Max value must be greater than min value'),
                        otherwise: Yup.number(),
                    }),
                    heightMin: Yup.number(),
                    weightMax: Yup.number().when('weightMin', {
                        is: (val) => val != null && val !== '',
                        then: Yup.number().moreThan(Yup.ref('weightMin'), 'Max value must be greater than min value'),
                        otherwise: Yup.number(),
                    }),
                    weightMin: Yup.number(),
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
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <MainCard
                                title={
                                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', gap: '16px' }}>


                                        <AnimateButton sx={{ ml: 'auto' }}>
                                            <RouterLink to="/patient/add" style={{ textDecoration: 'none' }}>
                                                <Button size="large" variant="contained" color="primary">
                                                    Add Patient
                                                </Button>
                                            </RouterLink>
                                        </AnimateButton>
                                        <AnimateButton sx={{ ml: 'auto' }}>
                                            <RouterLink to="/screen/add" style={{ textDecoration: 'none' }}>
                                                <Button size="large" variant="contained" color="primary">
                                                    Add Screen
                                                </Button>
                                            </RouterLink>
                                        </AnimateButton>
                                    </Box>
                                }
                            >
                                <Box sx={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Typography variant="h5" style={{ color: 'red' }} gutterBottom>
                                        Select the threshold (s) you only want.The query only searches for patients who are 18+ and have been on treatment for the past 18 months.If you click the query button without putting any threshold all patients with treatment over 18 months will be displayed. Enjoy <TagFacesIcon />
                                    </Typography>
                                </Box>

                                <form noValidate onSubmit={handleSubmit} >
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel>Weight Maximum</InputLabel>
                                            <TextField fullWidth placeholder="Enter your weight value"
                                                name='weightMax'
                                                value={values.weightMax}
                                                onChange={handleChange}
                                                error={touched.weightMax && Boolean(errors.weightMax)}
                                                helperText={touched.weightMax && errors.weightMax} />
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel>Weight Minimum</InputLabel>
                                            <TextField fullWidth placeholder="Enter your weight value"
                                                name='weightMin'
                                                value={values.weightMin}
                                                onChange={handleChange}
                                                error={touched.weightMin && Boolean(errors.weightMin)}
                                                helperText={touched.weightMin && errors.weightMin} />
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel>Height Maximum</InputLabel>
                                            <TextField fullWidth placeholder="Enter height value"
                                                name='heightMax'
                                                value={values.heightMax}
                                                onChange={handleChange}
                                                error={touched.heightMax && Boolean(errors.heightMax)}
                                                helperText={touched.heightMax && errors.heightMax} />
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel>Height Minimum</InputLabel>
                                            <TextField fullWidth placeholder="Enter  height value"
                                                name='heightMin'
                                                value={values.heightMin}
                                                onChange={handleChange}
                                                error={touched.heightMin && Boolean(errors.heightMin)}
                                                helperText={touched.heightMin && errors.heightMin} />
                                        </Grid>
                                        {/* ------------------------------------------ */}
                                        {/* private Float systolicBloodPressure;
                                        private Float diastolicBloodPressure; */}
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel>Systolic Blood Pressure Maximum</InputLabel>
                                            <TextField fullWidth placeholder="Please enter your blood pressure value"
                                                name='systolicBloodPressureMax'
                                                value={values.systolicBloodPressureMax}
                                                onChange={handleChange}
                                                error={touched.systolicBloodPressureMax && Boolean(errors.systolicBloodPressureMax)}
                                                helperText={touched.systolicBloodPressureMax && errors.systolicBloodPressureMax} />
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel> Systolic Blood Pressure Minimum</InputLabel>
                                            <TextField fullWidth placeholder="Enter your blood pressure value"
                                                name='systolicBloodPressureMin'
                                                value={values.systolicBloodPressureMin}
                                                onChange={handleChange}
                                                error={touched.systolicBloodPressureMin && Boolean(errors.systolicBloodPressureMin)}
                                                helperText={touched.systolicBloodPressureMin && errors.systolicBloodPressureMin} />
                                        </Grid>
                                        {/* --------------------------------------------------- */}
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel>Diastolic Blood Pressure Maximum</InputLabel>
                                            <TextField fullWidth placeholder="Please enter your blood pressure value"
                                                name='diastolicBloodPressureMax'
                                                value={values.diastolicBloodPressureMax}
                                                onChange={handleChange}
                                                error={touched.diastolicBloodPressureMax && Boolean(errors.diastolicBloodPressureMax)}
                                                helperText={touched.diastolicBloodPressureMax && errors.diastolicBloodPressureMax} />
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel> Diastolic Blood Pressure Minimum</InputLabel>
                                            <TextField fullWidth placeholder="Enter your blood pressure value"
                                                name='diastolicBloodPressureMin'
                                                value={values.diastolicBloodPressureMin}
                                                onChange={handleChange}
                                                error={touched.diastolicBloodPressureMin && Boolean(errors.diastolicBloodPressureMin)}
                                                helperText={touched.diastolicBloodPressureMin && errors.diastolicBloodPressureMin} />
                                        </Grid>
                                        {/* ========================================================= */}
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel>Blood Glucose Maximum</InputLabel>
                                            <TextField fullWidth placeholder="Enter your blood glucose value"
                                                name='bloodGlucoseMax'
                                                value={values.bloodGlucoseMax}
                                                onChange={handleChange}
                                                error={touched.bloodGlucoseMax && Boolean(errors.bloodGlucoseMax)}
                                                helperText={touched.bloodGlucoseMax && errors.bloodGlucoseMax} />
                                        </Grid>
                                        <Grid item xs={12} lg={4}>
                                            <InputLabel>Blood Glucose Minimum</InputLabel>
                                            <TextField fullWidth placeholder="Enter your blood glucose value"
                                                name='bloodGlucoseMin'
                                                value={values.bloodGlucoseMin}
                                                onChange={handleChange}
                                                error={touched.bloodGlucoseMin && Boolean(errors.bloodGlucoseMin)}
                                                helperText={touched.bloodGlucoseMin && errors.bloodGlucoseMin} />
                                        </Grid>
                                    </Grid>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 1, sm: 2, md: 4 }} >
                                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'row', gap: '16px' }}>
                                            <AnimateButton>
                                                <Button
                                                    disableElevation
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Query Screens
                                                </Button>
                                            </AnimateButton>
                                        </Box>

                                    </Stack>
                                </form>
                            </MainCard>
                        </Grid>
                    </Grid>)}
            </Formik >
        </>
    );
}

export default ScreeningFilter;
