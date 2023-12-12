/* eslint-disable no-redeclare */
import mockApi from '../../mock-api.json';
import mock from '../../mock';

const saleDB = mockApi.database.examples.sale.value;

mock.onPost('/api/getorderData').reply(({ data }) => {
    const { status } = JSON.parse(data);
    const currentDate = new Date();
    const completed = {
        previous: 0,
        current: 0
    };
    const pending = {
        previous: 0,
        current: 0
    };
    const received = {
        previous: 0,
        current: 0
    };
    const rejected = {
        previous: 0,
        current: 0
    };

    for (let i = 0; i < 30; i++) {
        saleDB.forEach((order) => {
            const orderDate = new Date(order.date);
            if (orderDate.toDateString() === currentDate.toDateString()) {
                if (order.status === 'completed') completed.current++;
                if (order.status === 'pending') pending.current++;
                if (order.status === 'received') received.current++;
                if (order.status === 'rejected') rejected.current++;
            }
        });
        currentDate.setDate(currentDate.getDate() - 1);
    }

    for (let i = 0; i < 30; i++) {
        saleDB.forEach((order) => {
            const orderDate = new Date(order.date);
            if (orderDate.toDateString() === currentDate.toDateString()) {
                if (order.status === 'completed') completed.previous++;
                if (order.status === 'pending') pending.previous++;
                if (order.status === 'received') received.previous++;
                if (order.status === 'rejected') rejected.previous++;
            }
        });
        currentDate.setDate(currentDate.getDate() - 1);
    }

    if (status === 'all') {
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
        const result = {
            orderArray: orderArray,
            completed: completed,
            pending: pending,
            received: received,
            rejected: rejected
        };
        return [200, result];
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
        const result = {
            orderArray: orderArray,
            completed: completed,
            pending: pending,
            received: received,
            rejected: rejected
        };
        return [200, result];
    }
});
