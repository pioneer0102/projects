import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import Error404Page from '../main/404/Error404Page';
import PartnersConfig from '../main/partners/PartnersConfig';
import InvManCofig from '../main/item-management/InvManConfig';
import OrdersConfig from '../main/orders/OrdersConfig';
import InsightsConfig from '../main/insights/InsightsConfig';
import SettingsConfig from '../main/settings/SettingsConfig';
import AdminUsersConfig from '../main/admin/users/UsersConfig';
import AdminStoresConfig from '../main/admin/admin-stores/AdminStoresConfig';

const routeConfigs = [
    SignInConfig,
    SignUpConfig,
    PartnersConfig,
    InvManCofig,
    OrdersConfig,
    InsightsConfig,
    SettingsConfig,
    AdminUsersConfig,
    AdminStoresConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(
        routeConfigs,
        settingsConfig.defaultAuth
    ),
    {
        path: '/',
        element: <Navigate to="/Partners" />,
        auth: settingsConfig.defaultAuth
    },
    {
        path: 'loading',
        element: <FuseLoading />
    },
    {
        path: '404',
        element: <Error404Page />
    },
    {
        path: '*',
        element: <Navigate to="404" />
    }
];

export default routes;
