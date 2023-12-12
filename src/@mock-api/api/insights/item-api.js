/* eslint-disable no-redeclare */
import mockApi from '../../mock-api.json';
import mock from '../../mock';

const saleDB = mockApi.database.examples.sale.value;

mock.onGet('/api/getItemData').reply(() => {
    const total = saleDB.length;
    const active = saleDB.filter((sale) => {
        return sale.itemStatus === 'active';
    }).length;
    const activePercentage = Math.floor((active / total) * 100);
    const noActivePercentage = 100 - activePercentage;
    return [200, [activePercentage, noActivePercentage]];
});
