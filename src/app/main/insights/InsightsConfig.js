import Channels from './channels/Channels';
import Categories from './categories/Categories';

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
        // {
        //     path: 'insights/channels',
        //     element: <Channels />
        // },
        // {
        //     path: 'insights/categories',
        //     element: <Categories />
        // }
    ]
};

export default InsightsConfig;
