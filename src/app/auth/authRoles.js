/**
 * Authorization Roles
 */
const authRoles = {
    admin: ['admin', 'user'],
    staff: ['admin', 'staff'],
    user: ['user'],
    onlyGuest: []
};

export default authRoles;
