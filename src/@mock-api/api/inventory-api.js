import _ from '@lodash';
import mockApi from '../mock-api.json';
import mock from '../mock';
import FuseUtils from '@fuse/utils';

const itemDB = mockApi.database.examples.items.value;

const priceRange = [
    { min: 10, max: 100 },
    { min: 100, max: 500 },
    { min: 500, max: 1000 },
    { min: 1000, max: 5000 },
    { min: 5000, max: 10000 },
];

mock.onPost('/api/getInventory').reply(({ data }) => {
    const { searchText, price, category, pageNumber, pageSize } = JSON.parse(data);

    const dbSize = itemDB.length;

    const pagenumber = parseInt(pageNumber);
    const pagesize = parseInt(pageSize);

    if (searchText === '' && price === '' && category === '') {
        const startIndex = pagenumber * pagesize;
        const endIndex = (pagenumber * pagesize + pagesize);
        const pagedData = itemDB.slice(startIndex, endIndex);
        const data = {
            pagedData: pagedData,
            dbSize: dbSize,
            filterSize: dbSize
        };
        return [200, data];
    }
    else {
        const filteredData = itemDB.filter((item) => {
            return (
                (searchText === '' || item.category.toLowerCase().includes(searchText.toLowerCase())) &&
                (price === '' || ((priceRange[price].min <= item.price) && (item.price <= priceRange[price].max))) &&
                (category === '' || item.category === category)
            );
        });
        const startIndex = pagenumber * pagesize || 0;
        const endIndex = (pagenumber * pagesize + pagesize) || filteredData.length;
        const pagedData = filteredData.slice(startIndex, endIndex);
        const data = {
            pagedData: pagedData,
            dbSize: dbSize,
            filterSize: filteredData.length
        };
        return [200, data];
    }
});

mock.onGet('/api/getInventoryById').reply((data) => {
    const { id } = data;
    const item = _.find(itemDB, { id: parseInt(id) });
    return [200, item];
})

mock.onPost('/api/addInventory').reply(({ data }) => {
    const { active, category, image, price, quantity, tax, upc, } = JSON.parse(data);
    const newItem = {
        id: FuseUtils.generateGUID(),
        active: active,
        category: category,
        image: image,
        price: price,
        quantity: quantity,
        tax: tax,
        upc: upc
    };
    itemDB.push(newItem);
    return [200, newItem]
});

mock.onPost('/api/updateInventory').reply(({ data }) => {
    const { id, active, category, image, price, quantity, tax, upc, } = JSON.parse(data);
    const newItem = {
        id: id,
        active: active,
        category: category,
        image: image,
        price: price,
        quantity: quantity,
        tax: tax,
        upc: upc
    };
    _.assign(_.find(itemDB, { id }), newItem);
    return [200, newItem]
});