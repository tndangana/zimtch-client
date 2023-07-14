/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';

// project imports
import { DASHBOARD_PATH } from '../../config';

import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import imageBackground from 'assets/images/maintenance/img-error-bg.svg';
import imageDarkBackground from 'assets/images/maintenance/img-error-bg-dark.svg';
import NCZ from 'assets/images/logo-final.png';

// styles
const CardMediaWrapper = styled('div')({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative'
});

const ErrorWrapper = styled('div')({
    maxWidth: 350,
    margin: '0 auto',
    textAlign: 'center'
});

const ErrorCard = styled(Card)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const CardMediaBlock = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '3s bounce ease-in-out infinite'
});



// ==============================|| ERROR PAGE ||============================== //

const Error = () => {
    const theme = useTheme();

    return (
        <ErrorCard>
            <CardContent>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <CardMediaWrapper>
                            <CardMedia
                                component="img"
                                image={theme.palette.mode === 'dark' ? imageDarkBackground : imageBackground}
                                title="Slider5 image"
                            />
                            <CardMediaBlock src={NCZ} title="Slider 1 image" />
                            {/* <CardMediaBlue src={imageBlue} title="Slider 2 image" /> */}
                            {/* <CardMediaPurple src={imagePurple} title="Slider 3 image" /> */}
                        </CardMediaWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <ErrorWrapper>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h1" component="div">
                                        Something went wrong
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2">
                                        Contact +263 (242) 700585 / 701500 / 795342 Voip Harare 08677008938
                                        info@zimttech.org
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <AnimateButton>
                                        <Button variant="contained" size="large" component={Link} to={DASHBOARD_PATH}>
                                            <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> Home
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        </ErrorWrapper>
                    </Grid>
                </Grid>
            </CardContent>
        </ErrorCard>
    );
};

export default Error;
