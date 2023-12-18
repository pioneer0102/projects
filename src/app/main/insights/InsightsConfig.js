import { lazy } from 'react';

const Insights = lazy(() => import('./Insights'));

const InsightsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'insights',
            element: <Insights />
        }
    ]
};

export default InsightsConfig;
