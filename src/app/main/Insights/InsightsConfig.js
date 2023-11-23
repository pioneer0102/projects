import { lazy } from 'react';
import Channels from './channels/Channels';
import Categories from './categories/Categories';

const InsightsApp = lazy(() => import('./InsightsApp'));

const InsightsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'insights',
            element: <InsightsApp />,
            childrean: [
                {
                    path: 'channels',
                    element: <Channels />
                },
                {
                    path: '/categories',
                    element: <Categories />
                }
            ]
        }
    ]
};

export default InsightsConfig;