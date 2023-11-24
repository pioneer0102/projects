import _ from '@lodash';
import FuseUtils from '@fuse/utils/FuseUtils';
import mockApi from '../mock-api.json';
import mock from '../mock';

const ordersDB = mockApi.database.examples.orders.value;
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

    // const pagedData = ordersDB.slice(startIndex, endIndex);

    if (searchText === '' && subtotal === '' && channel === '' && status === '') {
        const startIndex = pagenumber * pagesize;
        const endIndex = (pagenumber * pagesize + pagesize);
        const pagedData = ordersDB.slice(startIndex, endIndex);
        return [200, pagedData];
    }
    else {
        const filteredData = ordersDB.filter((item) => {
            console.log(priceRange[subtotal].min);
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
    // else{
    //     const filteredData = data.filter(item => {
    //         if (item.channel !== (channel || item.channel)) {
    //             return false;
    //         }
    //         if (item.status !== (status || item.status)) {
    //             return false;
    //         }
    //         if (item.subtotal !== (subtotal || item.subtotal)) {
    //             return false;
    //         }
    //         if (item.customer.toLowerCase() !== (searchText || item.customer.toLowerCase())) {
    //             return false;
    //         }
    //         return true;
    //     });
    //     // const filteredData = ordersDB.filter((item)=> item.channel == "DoorDash");
    //     const pagedData = filteredData.slice(startIndex, endIndex);
    //     return [200, pagedData];
    // }
    // const filteredData = data.filter((item) => {
    //     return (
    //         (searchText === '' || item.customer.toLowerCase().includes(searchText.toLowerCase())) &&
    //         (subtotal === '' || item.subtotal === subtotal) &&
    //         (channel === '' || item.channel === channel) &&
    //         (status === '' || item.status === status)
    //     );
    // });
    // const pagedData = filteredData.slice(startIndex, endIndex);
    // return [200, pagedData];
})