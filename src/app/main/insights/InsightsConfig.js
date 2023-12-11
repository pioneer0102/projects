import Channels from './channels/Channels';
import Categories from './categories/Categories';

// const InsightsApp = lazy(() => import('./InsightsApp'));

const InsightsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'insights/channels',
            element: <Channels />
        },
        {
            path: 'insights/categories',
            element: <Categories />
        }
    ]
};

export default InsightsConfig;
