import UserManagement from './users/UserManagement';
import PosSettings from './pos/PosSettings';
import UserForm from './users/components/UserForm';

const SettingsConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'settings/users',
            element: <UserManagement />
        },
        {
            path: 'settings/users/:action/:id',
            element: <UserForm />
        },
        {
            path: 'settings/pos',
            element: <PosSettings />
        }
    ]
};

export default SettingsConfig;
