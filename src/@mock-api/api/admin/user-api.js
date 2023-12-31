import _ from '@lodash';
import mock from '../../mock';
import mockApi from '../../mock-api.json';

const userDB = mockApi.database.examples.user.value;

mock.onPost('/admin/api/getUsers').reply(({ data }) => {
    const { searchText, rowsPerPage, page } = JSON.parse(data);

    const pageSize = parseInt(rowsPerPage);
    const pageNumber = parseInt(page);

    const filteredData = userDB.filter((item) => {
        return (
            searchText === '' ||
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const startIndex = pageNumber * pageSize || 0;
    const endIndex = pageNumber * pageSize + pageSize || filteredData.length;
    const pagedData = filteredData.slice(startIndex, endIndex);

    const result = {
        pagedData: pagedData,
        filterSize: filteredData.length
    };

    return [200, result];
});

mock.onGet('/admin/api/getUserById').reply((data) => {
    const { id } = data;
    const user = _.find(userDB, { id: parseInt(id) });
    return [200, user];
});

mock.onPost('/admin/api/addUser').reply(({ data }) => {
    const { name, email, role, phone, address, avatar } = JSON.parse(data);

    userDB.unshift({
        id: userDB.length + 1,
        name: name,
        email: email,
        role: role,
        phone: phone,
        address: address,
        avatar: avatar
    });

    return [200, { success: true }];
});

mock.onPost('/admin/api/updateUser').reply(({ data }) => {
    const { id, name, email, role, phone, address, avatar } = JSON.parse(data);

    const updatedUserIndex = userDB.findIndex(
        (user) => user.id === parseInt(id)
    );

    if (updatedUserIndex !== -1) {
        // Remove the user from the current position
        const updatedUser = userDB.splice(updatedUserIndex, 1)[0];

        // Add the updated user at the beginning
        userDB.unshift({
            id: updatedUser.id,
            name: name,
            email: email,
            role: role,
            phone: phone,
            address: address,
            avatar: avatar
        });
    }

    return [200, { success: true }];
});

mock.onPost('/admin/api/deleteUser').reply(({ data }) => {
    const { id } = JSON.parse(data);

    _.remove(userDB, { id: parseInt(id) });
    const result = {
        success: true,
        id: id
    };

    return [200, result];
});
