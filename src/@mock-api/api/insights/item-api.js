/* eslint-disable no-redeclare */
import mockApi from '../../mock-api.json';
import mock from '../../mock';

const saleDB = mockApi.database.examples.sale.value;

mock.onGet('/api/getItemData').reply(() => {
    const total = saleDB.length;
    const activeLength = saleDB.filter((sale) => {
        return sale.itemStatus === 'active';
    }).length;
    const active = Math.floor((activeLength / total) * 100);
    const noActive = 100 - active;
    return [200, [active, noActive]];
});
