import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/SignIn/SignInConfig';
import SignUpConfig from '../main/SignUp/SignUpConfig';
import Error404Page from '../main/404/Error404Page';
import PartnersConfig from '../main/Partners/PartnersConfig';
import InvManCofig from '../main/InventoryManager/InvManConfig';
import OrdersConfig from '../main/Orders/OrdersConfig';
import InsightsConfig from '../main/Insights/InsightsConfig';
import SettingsConfig from '../main/Settings/SettingsConfig';
import AdminConfig from '../main/Admin/AdminConfig';

const routeConfigs = [
  SignInConfig,
  SignUpConfig,
  PartnersConfig,
  InvManCofig,
  OrdersConfig,
  InsightsConfig,
  SettingsConfig,
  AdminConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/Partners" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
