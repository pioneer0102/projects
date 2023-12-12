import { lazy } from 'react';

const InsightsApp = lazy(() => import('./index'));

const InsightsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'insights',
            element: <InsightsApp />
        }
    ]
};

export default InsightsConfig;
