import '@mock-api';
import { useEffect } from 'react';
import BrowserRouter from '@fuse/core/BrowserRouter';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import { SnackbarProvider } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { selectCurrentLanguageDirection } from 'app/store/i18nSlice';
import { selectUser } from 'app/store/userSlice';
import themeLayouts from 'app/theme-layouts/themeLayouts';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import settingsConfig from 'app/configs/settingsConfig';
import withAppProviders from './withAppProviders';
import { AuthProvider } from './auth/AuthContext';
import { receivedNewOrder } from './main/orders/store/ordersSlice';

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
    rtl: {
        key: 'muirtl',
        stylisPlugins: [rtlPlugin],
        insertionPoint: document.getElementById('emotion-insertion-point'),
    },
    ltr: {
        key: 'muiltr',
        stylisPlugins: [],
        insertionPoint: document.getElementById('emotion-insertion-point'),
    },
};

function App() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const langDirection = useSelector(selectCurrentLanguageDirection);
    const mainTheme = useSelector(selectMainTheme);

    useEffect(() => {
        // Replace 'your-ws-server-url' with the actual WebSocket server URL

        // var sockets_bay_url = `wss://socketsbay.com/wss/v2/1/${this.sockets_bay_api_key}/`;
        const socket = new WebSocket('wss://socketsbay.com/wss/v2/1/demo/');

        // Connection opened
        socket.addEventListener('open', (event) => {
            console.log('WebSocket connection opened:', event);

            // Send a message to the server
            socket.send('Hello Server!');
        });

        // Listen for messages from the server
        socket.addEventListener('message', (event) => {
            console.log('Message from server:', event.data);
            dispatch(receivedNewOrder(event.data));
        });

        // Connection closed
        socket.addEventListener('close', (event) => {
            console.log('WebSocket connection closed:', event);
        });

        socket.addEventListener('error', (event) => {
            console.log('WebSocket error:', event.data);
        });

        // Cleanup the WebSocket connection when the component is unmounted
        return () => {
            socket.close();
        };
    }, []);

    return (
        <CacheProvider value={createCache(emotionCacheOptions[langDirection])}>
            <FuseTheme theme={mainTheme} direction={langDirection}>
                <AuthProvider>
                    <BrowserRouter>
                        <FuseAuthorization
                          userRole={user.role}
                          loginRedirectUrl={settingsConfig.loginRedirectUrl}
                        >
                            <SnackbarProvider
                                maxSnack={5}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                classes={{
                                    containerRoot: 'bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99',
                                }}
                            >
                                <FuseLayout layouts={themeLayouts} />
                            </SnackbarProvider>
                        </FuseAuthorization>
                    </BrowserRouter>
                </AuthProvider>
            </FuseTheme>
        </CacheProvider>
    );
}

export default withAppProviders(App)();
