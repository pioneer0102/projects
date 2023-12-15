import Users from './Users';
import UserDetail from './UserDetail';

const UsersConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: 'admin/users',
            element: <Users />
        },
        {
            path: 'admin/users/:userId/*',
            element: <UserDetail />
        }
    ]
};

export default UsersConfig;
