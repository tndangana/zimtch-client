/* eslint-disable prettier/prettier */
import { Link } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from './AuthWrapper1';
import AuthCardWrapper from './AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import BackgroundPattern1 from 'ui-component/cards/BackgroundPattern1';
import AuthSlider from 'ui-component/cards/AuthSlider';

// assets
import NCZ from 'assets/images/logo-final.png'


// styles
const PurpleWrapper = styled('span')({
    '&:after': {
        content: '""',
        position: 'absolute',
        top: '32%',
        left: '40%',
        width: 313,
        backgroundSize: 380,
        height: 280,
        // backgroundImage: `url(${NCZ})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: '15s wings ease-in-out infinite'
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        top: '23%',
        left: '37%',
        width: 243,
        height: 210,
        backgroundSize: 380,
        backgroundImage: `url(${NCZ})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        animation: '15s wings ease-in-out infinite',
        animationDelay: '1s'
    }
});

// carousel items
const items = [
    {
        title: 'WHO WE ARE',
        description: 'Zim-TTECH is a locally registered health trust established by experienced and passionate public health professionals who have a demonstrated track record in improving clinical services and revitalizing health systems.'
    },
    {
        title: 'Young women empowered through DREAMS project',
        description: 'It is almost midday in Tshiyakwakhiwe village, Dlamini in Tsholotsho, the scorching sun’s intense rays’  heat glares down my neck and I quickly break out into more than a little…'
    }
];

// ================================|| AUTH1 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ minHeight: '100vh' }}>
                <Grid item container justifyContent="center" md={6} lg={7} sx={{ my: 3 }}>
                    <AuthCardWrapper>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Grid
                                    container
                                    direction={matchDownSM ? 'column-reverse' : 'row'}
                                    alignItems={matchDownSM ? 'center' : 'inherit'}
                                    justifyContent={matchDownSM ? 'center' : 'space-between'}
                                >
                                    <Grid item>
                                        <Stack
                                            justifyContent={matchDownSM ? 'center' : 'flex-start'}
                                            textAlign={matchDownSM ? 'center' : 'inherit'}
                                        >
                                            <Typography
                                                color={theme.palette.primary.main}
                                                gutterBottom
                                                variant={matchDownSM ? 'h3' : 'h2'}
                                            >
                                                Hi, Welcome 
                                            </Typography>
                                            <Typography color="textPrimary" gutterBottom variant="h4">
                                                Enter your credentials to continue
                                            </Typography>
                                        </Stack>
                                    </Grid>
                                    <Grid item sx={{ mb: { xs: 3, sm: 0 } }}>
                                        <Link to="#" aria-label="theme-logo">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <AuthLogin  />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item container direction="column" alignItems="flex-end" xs={12}>
                                    <Typography
                                        component={Link}
                                        to="/register"
                                        variant="subtitle1"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        Don&apos;t have an account?
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AuthCardWrapper>
                </Grid>
                <Grid item md={6} lg={5} sx={{ position: 'relative', alignSelf: 'stretch', display: { xs: 'none', md: 'block' } }}>
                    <BackgroundPattern1>
                        <Grid item container alignItems="flex-end" justifyContent="center" spacing={3}>
                            <Grid item xs={12}>
                                <span />
                                <PurpleWrapper />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid item container justifyContent="center" sx={{ pb: 8 }}>
                                    <Grid item xs={10} lg={8} sx={{ '& .slick-list': { pb: 2 } }}>
                                        <AuthSlider items={items} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </BackgroundPattern1>
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Login;
