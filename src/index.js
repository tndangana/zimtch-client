/* eslint-disable import/no-extraneous-dependencies */
import { createRoot } from 'react-dom/client';

// third party
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-toast-notifications';

// project imports
import App from 'App';
import { BASE_PATH } from 'config';
import { store, persister } from 'store';
import * as serviceWorker from 'serviceWorker';
import reportWebVitals from 'reportWebVitals';
import { ConfigProvider } from 'contexts/ConfigContext';
import { DiebeticContextProvider } from 'hooks/api/diabeticscreening';
import { PatientContextProvider } from 'hooks/api/patient';
import { AuthenticationContextProvider } from './hooks/api/authentication';

// style + assets
import 'assets/scss/style.scss';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <ToastProvider>
            <AuthenticationContextProvider>
                <PatientContextProvider>
                    <DiebeticContextProvider>
                        <PersistGate loading={null} persistor={persister}>
                            <ConfigProvider>
                                <HashRouter basename={BASE_PATH}>
                                    <App />
                                </HashRouter>
                            </ConfigProvider>
                        </PersistGate>
                    </DiebeticContextProvider>
                </PatientContextProvider>
            </AuthenticationContextProvider>
        </ToastProvider>
    </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
