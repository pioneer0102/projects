import _ from '@lodash';
import mockApi from '../mock-api.json';
import mock from '../mock';

const ordersDB = mockApi.database.examples.orders.value;
const itemDB = mockApi.database.examples.items.value;

const priceRange = [
    { min: 10, max: 100 },
    { min: 100, max: 500 },
    { min: 500, max: 1000 },
    { min: 1000, max: 5000 },
    { min: 5000, max: 10000 }
];

mock.onPost('/api/getorders').reply(({ data }) => {
    const { searchText, subtotal, channel, status, pageNumber, pageSize } =
        JSON.parse(data);

    const dbSize = ordersDB.length;

    const pagenumber = parseInt(pageNumber);
    const pagesize = parseInt(pageSize);

    if (
        searchText === '' &&
        subtotal === '' &&
        channel === '' &&
        status === ''
    ) {
        const startIndex = pagenumber * pagesize;
        const endIndex = pagenumber * pagesize + pagesize;
        const pagedData = ordersDB.slice(startIndex, endIndex);
        const data = {
            pagedData: pagedData,
            dbSize: dbSize,
            filterSize: dbSize
        };
        return [200, data];
    } else {
        const filteredData = ordersDB.filter((item) => {
            return (
                (searchText === '' ||
                    item.customer
                        .toLowerCase()
                        .includes(searchText.toLowerCase())) &&
                (subtotal === '' ||
                    (priceRange[subtotal].min <= item.subtotal &&
                        item.subtotal <= priceRange[subtotal].max)) &&
                (channel === '' || item.channel === channel) &&
                (status === '' || item.history[0].status === status)
            );
        });
        const startIndex = pagenumber * pagesize || 0;
        const endIndex =
            pagenumber * pagesize + pagesize || filteredData.length;
        const pagedData = filteredData.slice(startIndex, endIndex);
        const data = {
            pagedData: pagedData,
            dbSize: dbSize,
            filterSize: filteredData.length
        };
        return [200, data];
    }
});

mock.onGet('/api/getItem').reply((data) => {
    const { id } = data;
    const order = _.find(ordersDB, { id: parseInt(id) });
    var resultArray = [];
    var subtotal = 0;
    order.items.map((item) => {
        const oneItem = _.find(itemDB, { id: item.id });
        oneItem.quantity = item.quantity;
        subtotal = subtotal + item.quantity * oneItem.price;
        oneItem && resultArray.push({ ...oneItem, status: item.status });
    });
    const result = {
        orderInfo: order,
        taxInfo: resultArray
    };
    return [200, result];
});

mock.onPost('/api/updateStatus').reply(({ data }) => {
    const { id, history, status } = JSON.parse(data);
    const order = _.find(ordersDB, { id: id });
    order.history[history].status = status;
    var success = false;
    if (order) {
        success = true;
    }
    return [200, { success: success }];
});

mock.onPost('/api/updateItemStatusById').reply(({ data }) => {
    const { id, itemId, itemStatus } = JSON.parse(data);
    const order = _.find(ordersDB, { id: id });
    const item = _.find(order.items, { id: itemId });
    item.status = itemStatus;
    return [200, { success: true }];
});

mock.onPost('/api/removeItem').reply(({ data }) => {
    const { orderId, itemId } = JSON.parse(data);
    const order = _.find(ordersDB, { id: orderId });
    var success = false;
    const remove = _.remove(order.items, { id: itemId });
    if (remove.length != null) {
        success = true;
    }
    if (success == true) {
        var subtotal = 0;
        order.items.map((item) => {
            const oneItem = _.find(itemDB, { id: item.id });
            subtotal = subtotal + item.quantity * oneItem.price;
        });
        order.subtotal = subtotal;
        return [200, { success: success, subtotal: order.subtotal }];
    } else {
        return [200, { success: success }];
    }
});
