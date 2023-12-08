import _ from '@lodash';
import mockApi from '../../mock-api.json';
import mock from '../../mock';
import FuseUtils from '@fuse/utils/FuseUtils';

const userDB = mockApi.database.examples.user.value;

mock.onPost('/api/getAllUsers').reply(({ data }) => {
    const { searchText, rowsPerPage, page } = JSON.parse(data);

    const pagesize = parseInt(rowsPerPage);
    const pagenumber = parseInt(page);

    if (searchText === '') {
        const startIndex = pagenumber * pagesize;
        const endIndex = (pagenumber * pagesize + pagesize);
        const pagedData = userDB.slice(startIndex, endIndex);
        const data = {
            pagedData: pagedData,
            filterSize: userDB.length
        };
        return [200, data];
    }
    else {
        const filteredData = userDB.filter((item) => {
            return (
                (searchText === '' || item.name.toLowerCase().includes(searchText.toLowerCase()))
            );
        });
        const startIndex = pagenumber * pagesize || 0;
        const endIndex = (pagenumber * pagesize + pagesize) || filteredData.length;
        const pagedData = filteredData.slice(startIndex, endIndex);
        const data = {
            pagedData: pagedData,
            filterSize: filteredData.length
        };
        return [200, data];
    }
});

mock.onGet('/api/getUserById').reply((data) => {
    const { id } = data;
    const user = _.find(userDB, { id: id });
    return [200, user];
});

mock.onPost('/api/addUser').reply(({ data }) => {
    const { name, url, role } = JSON.parse(data);
    const id = FuseUtils.generateGUID();
    userDB.push({
        id: id,
        name: name,
        url: url,
        role: role
    });
    return [200, { success: true }]
});

mock.onPost('/api/updateUser').reply(({ data }) => {
    const { id, name, url, role } = JSON.parse(data);
    _.assign(_.find(userDB, { id: id }), {
        name: name,
        url: url,
        role: role
    });
    return [200, { success: true }];
});

mock.onPost('/api/deleteUser').reply(({ data }) => {
    const { id } = JSON.parse(data);
    _.remove(userDB, { id: id });
    const result = {
        success: true,
        id: id
    };
    return [200, result];
});