import mockApi from '../../mock-api.json';
import mock from '../../mock';
import _ from '@lodash';

const storesDB = mockApi.database.examples.stores.value;
const usersDB = mockApi.database.examples.user.value;

mock.onPost('/api/getAllStores').reply(({ data }) => {
    const { searchText, rowsPerPage, page } = JSON.parse(data);
    console.log(searchText, rowsPerPage, page);
    const pageSize = parseInt(rowsPerPage);
    const pageNumber = parseInt(page);

    const filteredData = storesDB.filter((store) => {
        return (
            searchText === '' ||
            store.name.toLowerCase().includes(searchText.toLowerCase())
        );
    });
    const totalCount = filteredData.length;
    const pagedData = filteredData.slice(
        pageSize * pageNumber,
        pageSize * pageNumber + pageSize
    );
    const result = {
        totalCount: totalCount,
        pagedData: pagedData
    };
    return [200, result];
});

mock.onPost('/api/getStoreById').reply(({ data }) => {
    const { id, rowsPerPage, page } = JSON.parse(data);
    const pageSize = parseInt(rowsPerPage);
    const pageNumber = parseInt(page);
    const store = _.find(storesDB, { id: parseInt(id) });
    store.usersData = [];
    store.users
        .slice(pageSize * pageNumber, pageSize * pageNumber + pageSize)
        .map((user) => {
            const oneUser = _.find(usersDB, { id: parseInt(user) });
            store.usersData.push(oneUser);
        });
    return [200, store];
});

mock.onPost('/api/addStore').reply(({ data }) => {
    const { name, address, integrations } = JSON.parse(data);
    const newItem = {
        id: storesDB.length + 1,
        name: name,
        address: address,
        integrations: integrations
    };
    storesDB.push(newItem);
    return [200, { success: true }];
});

mock.onPost('/api/updateStore').reply(({ data }) => {
    const { id, name, address, integrations } = JSON.parse(data);
    const updateItem = {
        id: id,
        name: name,
        address: address,
        integrations: integrations
    };
    _.assign(_.find(storesDB, { id }), updateItem);
    return [200, { success: true }];
});
