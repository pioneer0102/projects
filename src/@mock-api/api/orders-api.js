import _ from '@lodash';
import FuseUtils from '@fuse/utils/FuseUtils';
import mockApi from '../mock-api.json';
import mock from '../mock';

const ordersDB = mockApi.database.examples.orders.value;
const itemDB = mockApi.database.examples.items.value;

const priceRange = [
    { min: 10, max: 100 },
    { min: 100, max: 500 },
    { min: 500, max: 1000 },
    { min: 1000, max: 5000 },
    { min: 5000, max: 10000 },
];

mock.onGet('/api/getsize').reply((config) => {
    const dbSize = ordersDB.length;
    return [200, dbSize];
})

mock.onPost('/api/getorders').reply(({ data }) => {
    const { searchText, subtotal, channel, status, pageNumber, pageSize } = JSON.parse(data);

    const pagenumber = parseInt(pageNumber);
    const pagesize = parseInt(pageSize);

    if (searchText === '' && subtotal === '' && channel === '' && status === '') {
        const startIndex = pagenumber * pagesize;
        const endIndex = (pagenumber * pagesize + pagesize);
        const pagedData = ordersDB.slice(startIndex, endIndex);
        return [200, pagedData];
    }
    else {
        const filteredData = ordersDB.filter((item) => {
            return (
                (searchText === '' || item.customer.toLowerCase().startsWith(searchText.toLowerCase())) &&
                (subtotal === '' || ((priceRange[subtotal].min <= item.subtotal) && (item.subtotal <= priceRange[subtotal].max))) &&
                (channel === '' || item.channel === channel) &&
                (status === '' || item.status === status)
            );
        });
        const startIndex = pagenumber * pagesize || 0;
        const endIndex = (pagenumber * pagesize + pagesize) || filteredData.length;
        const pagedData = filteredData.slice(startIndex, endIndex);
        return [200, pagedData];
    }
})

mock.onPost('/api/getItem').reply(({data}) => {
    const itemList = JSON.parse(data);
    const resultArray = [];
    itemList.map((item) => {
        const oneItem = _.find(itemDB, {id: item.id});
        oneItem.quantity = item.quantity;
        oneItem && resultArray.push(oneItem);
    })
    return [200, resultArray];
})