import UserManagement from './user-management/UserManagement';
import PosSettings from './pos-settings/PosSettings';
import PosForm from './pos-settings/PosForm';

const SettingsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'settings/user-management',
            element: <UserManagement />
        },
        {
            path: 'settings/pos-settings',
            element: <PosSettings />
        },
        {
            path: 'settings/pos-settings/:action/:id',
            element: <PosForm />
        }
    ]
};

export default SettingsConfig;