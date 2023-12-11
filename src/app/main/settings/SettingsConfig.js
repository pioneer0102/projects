import UserManagement from './user-management/UserManagement';
import PosSettings from './pos-settings/PosSettings';
import UserForm from './user-management/components/UserForm';

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
            path: 'settings/user-management/:action/:id',
            element: <UserForm />
        },
        {
            path: 'settings/pos-settings',
            element: <PosSettings />
        }
    ]
};

export default SettingsConfig;