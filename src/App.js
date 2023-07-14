/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// routing
import Routes from 'routes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from 'ui-component/extended/Snackbar';
import Loader from 'ui-component/Loader';
import Locales from 'ui-component/Locales';

import ThemeCustomization from 'themes';
import { dispatch } from 'store';
import { getMenu } from 'store/slices/menu';

// ==============================|| APP ||============================== //

const App = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(getMenu()).then(() => {
            setLoading(true);
        });
    }, []);

    if (!loading) return <Loader />;

    return (
        <ThemeCustomization>
            <RTLLayout>
                <Locales>

                    <NavigationScroll>
                        <>
                            <Routes />
                            <Snackbar />
                        </>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
