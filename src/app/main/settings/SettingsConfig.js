import UserManagement from './userManagement/userManagement';
import PosSettings from './posSettings/PosSettings';
import PosForm from './posSettings/PosForm';

const SettingsConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    routes: [
        {
            path: 'settings/userManagement',
            element: <UserManagement />
        },
        {
            path: 'settings/posSettings',
            element: <PosSettings />
        },
        {
            path: 'settings/posSettings/:action/:id',
            element: <PosForm />
        }
    ]
};

export default SettingsConfig;