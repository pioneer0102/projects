import _ from '@lodash';
import mock from '../../mock';
import mockApi from '../../mock-api.json';

const userDB = mockApi.database.examples.user.value;

mock.onPost('/admin/api/getUsers').reply(({ data }) => {
    const { searchText, rowsPerPage, page } = JSON.parse(data);

    const pagesize = parseInt(rowsPerPage);
    const pagenumber = parseInt(page);

    const filteredData = userDB.filter((item) => {
        return (
            searchText === '' ||
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const startIndex = pagenumber * pagesize || 0;
    const endIndex = pagenumber * pagesize + pagesize || filteredData.length;
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

    _.assign(_.find(userDB, { id: parseInt(id) }), {
        name: name,
        email: email,
        role: role,
        phone: phone,
        address: address,
        avatar: avatar
    });

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
