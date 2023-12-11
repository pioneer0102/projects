import _ from '@lodash';
import mockApi from '../../mock-api.json';
import mock from '../../mock';

const ordersDB = mockApi.database.examples.orders.value;
const categoryDB = mockApi.database.examples.category.value;
const itemDB = mockApi.database.examples.items.value;

mock.onGet('/api/getcategorydata').reply(() => {
    const saleArray = {};
    const orderArray = {};
    const saleTotalByCategory = {};
    const orderTotalByCategory = {};
    categoryDB.forEach((category) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 29);
        if (!saleArray[category.name]) {
            saleArray[category.name] = [];
        }

        if (!orderArray[category.name]) {
            orderArray[category.name] = [];
        }

        if (!saleTotalByCategory[category.name]) {
            saleTotalByCategory[category.name] = 0;
        }

        if (!orderTotalByCategory[category.name]) {
            orderTotalByCategory[category.name] = 0;
        }

        for (let i = 0; i < 30; i++) {
            var sale = 0;
            var order = 0;
            ordersDB.forEach((oneOrder) => {
                var flag = true;
                oneOrder.items.forEach((item) => {
                    const orderDate = new Date(oneOrder.history[0].date);
                    const oneItem = _.find(itemDB, { id: item.id });
                    if (oneItem.category === category.name) {
                        if (
                            orderDate.toDateString() ===
                            currentDate.toDateString()
                        ) {
                            sale = sale + parseInt(oneItem.price);
                            flag = flag * false;
                        }
                    }
                });
                if (!flag) order++;
            });
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            saleArray[category.name].push({ x: formattedDate, y: sale });
            orderArray[category.name].push({ x: formattedDate, y: order });
            saleTotalByCategory[category.name] =
                saleTotalByCategory[category.name] + sale;
            orderTotalByCategory[category.name] =
                orderTotalByCategory[category.name] + order;
            currentDate.setDate(currentDate.getDate() + 1);
        }
    });
    const result = {
        saleArray: saleArray,
        orderArray: orderArray,
        saleTotalByCategory: saleTotalByCategory,
        orderTotalByCategory: orderTotalByCategory
    };
    return [200, result];
});
