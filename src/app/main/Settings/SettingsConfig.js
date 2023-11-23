import UserManagement from './userManagement/userManagement';
import PosSettings from './posSettings/posSettings';

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
        }
    ]
};

export default SettingsConfig;