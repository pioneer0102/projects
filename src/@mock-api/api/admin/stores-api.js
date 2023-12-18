import mockApi from '../../mock-api.json';
import mock from '../../mock';
import _ from '@lodash';

const storesDB = mockApi.database.examples.stores.value;

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
    const pagedUsers = store.users.slice(
        pageSize * pageNumber,
        pageSize * pageNumber + pageSize
    );
    const result = {
        ...store,
        users: pagedUsers,
        totalUser: store.users.length
    };
    return [200, result];
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
    _.assign(_.find(storesDB, { id: parseInt(id) }), updateItem);
    return [200, { success: true }];
});

mock.onPost('/api/updateStoreDetail').reply(({ data }) => {
    const { type, id, detailData } = JSON.parse(data);
    const store = _.find(storesDB, { id: parseInt(id) });
    store[type] = detailData;
    return [200, { success: true }];
});

mock.onPost('/api/removeUserFromDB').reply(({ data }) => {
    const { storeId, userId } = JSON.parse(data);
    const store = _.find(storesDB, { id: parseInt(storeId) });
    _.remove(store.users, { id: parseInt(userId) });
    return [200, { storeId: storeId, userId: userId }];
});

mock.onPost('/api/addUserinStore').reply(({ data }) => {
    const { storeId, avatar, name, email, phone, address } = JSON.parse(data);
    const store = _.find(storesDB, { id: parseInt(storeId) });
    const newUser = {
        id: store.users.length + 1,
        avatar: avatar,
        name: name,
        email: email,
        phone: phone,
        address: address
    };
    store.users.push(newUser);
    return [200, newUser];
});

mock.onPost('/api/updateUserinStore').reply(({ data }) => {
    const { storeId, id, avatar, name, email, phone, address } =
        JSON.parse(data);
    console.log(id);
    const store = _.find(storesDB, { id: parseInt(storeId) });
    const updateUser = {
        avatar: avatar,
        name: name,
        email: email,
        phone: phone,
        address: address
    };
    _.assign(_.find(store.users, { id: parseInt(id) }), updateUser);
    return [200, _.find(store.users, { id: parseInt(id) })];
});

mock.onPost('/api/modifyPos').reply(({ data }) => {
    const { storeId, type, value } = JSON.parse(data);
    const store = _.find(storesDB, { id: parseInt(storeId) });
    store.pos[type] = value;
    const result = {
        type: type,
        value: value
    };
    return [200, result];
});
