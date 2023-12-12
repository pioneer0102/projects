/* eslint-disable no-redeclare */
import mockApi from '../../mock-api.json';
import mock from '../../mock';

const saleDB = mockApi.database.examples.sale.value;

mock.onPost('/api/getorderData').reply(({ data }) => {
    const { status } = JSON.parse(data);
    if (status === '') {
        const orderArray = [];
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 29);

        for (let i = 0; i < 30; i++) {
            var orderNum = 0;
            saleDB.forEach((order) => {
                const orderDate = new Date(order.date);
                if (orderDate.toDateString() === currentDate.toDateString()) {
                    orderNum++;
                }
            });
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            orderArray.push({ x: formattedDate, y: orderNum });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return [200, orderArray];
    } else {
        const orderArray = [];
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 29);

        for (let i = 0; i < 30; i++) {
            var orderNum = 0;
            saleDB.forEach((order) => {
                if (order.status === status) {
                    const orderDate = new Date(order.date);
                    if (
                        orderDate.toDateString() === currentDate.toDateString()
                    ) {
                        orderNum++;
                    }
                }
            });
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            orderArray.push({ x: formattedDate, y: orderNum });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return [200, orderArray];
    }
});
