import _ from '@lodash';
import mockApi from '../../mock-api.json';
import mock from '../../mock';

const ordersDB = mockApi.database.examples.orders.value;

// if (searchText === '' && subtotal === '' && channel === '' && status === '') {
//     const startIndex = pagenumber * pagesize;
//     const endIndex = (pagenumber * pagesize + pagesize);
//     const pagedData = ordersDB.slice(startIndex, endIndex);
//     const data = {
//         pagedData: pagedData,
//         dbSize: dbSize,
//         filterSize: dbSize
//     };
//     return [200, data];
// }
// else {
//     const filteredData = ordersDB.filter((item) => {
//         return (
//             (searchText === '' || item.customer.toLowerCase().includes(searchText.toLowerCase())) &&
//             (subtotal === '' || ((priceRange[subtotal].min <= item.subtotal) && (item.subtotal <= priceRange[subtotal].max))) &&
//             (channel === '' || item.channel === channel) &&
//             (status === '' || item.history[0].status === status)
//         );
//     });
//     const startIndex = pagenumber * pagesize || 0;
//     const endIndex = (pagenumber * pagesize + pagesize) || filteredData.length;
//     const pagedData = filteredData.slice(startIndex, endIndex);
//     const data = {
//         pagedData: pagedData,
//         dbSize: dbSize,
//         filterSize: filteredData.length
//     };
//     return [200, data];
// }

mock.onPost('/api/getsaleData').reply(({ data }) => {
    const { fromDate, toDate, category, item } = JSON.parse(data);
    if (fromDate === '' && toDate === '' && category === '' && item === '') {
        const saleArray = [];
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 29);

        for (let i = 0; i < 30; i++) {
            var sale = 0;
            ordersDB.forEach((item) => {
                const orderDate = new Date(
                    item.history[item.history.length - 1].date
                );
                if (orderDate.toDateString() === currentDate.toDateString()) {
                    sale = sale + parseInt(item.subtotal);
                }
            });
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            saleArray.push({ x: formattedDate, y: sale });
        }
        const result = {
            saleArray: saleArray
        };
        return [200, result];
    } else {
        const saleArray = ordersDB.forEach((order) => {
            const orderDate = new Date(
                order.history[item.history.length - 1].date
            );
        });
    }
});
