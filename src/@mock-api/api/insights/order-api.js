import mock from '../../mock';
import { saleDB } from './sale-api';

const process = async (status, fromDate, toDate, category, item, channel) => {
    let result = null;

    const diffDate = Math.floor(
        (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)
    );

    const completed = { previous: 0, current: 0 };
    const pending = { previous: 0, current: 0 };
    const received = { previous: 0, current: 0 };
    const rejected = { previous: 0, current: 0 };

    for (
        let i = new Date(fromDate);
        i.getTime() < new Date(toDate).getTime();
        i.setDate(i.getDate() + 1)
    ) {
        saleDB.forEach((order) => {
            const orderDate = new Date(order.date);
            if (orderDate.toDateString() === i.toDateString()) {
                if (order.status === 'completed') completed.current++;
                if (order.status === 'pending') pending.current++;
                if (order.status === 'received') received.current++;
                if (order.status === 'rejected') rejected.current++;
            }
        });
    }

    const previousFromDate = new Date(fromDate);
    previousFromDate.setDate(previousFromDate.getDate() - diffDate);
    const previousToDate = new Date(toDate);
    previousToDate.setDate(previousToDate.getDate() - diffDate);

    for (
        let i = new Date(previousFromDate);
        i.getTime() < new Date(previousToDate).getTime();
        i.setDate(i.getDate() + 1)
    ) {
        saleDB.forEach((order) => {
            const orderDate = new Date(order.date);
            if (orderDate.toDateString() === i.toDateString()) {
                if (order.status === 'completed') completed.previous++;
                if (order.status === 'pending') pending.previous++;
                if (order.status === 'received') received.previous++;
                if (order.status === 'rejected') rejected.previous++;
            }
        });
    }

    if (status === 'all') {
        const orderArray = [];
        const filteredData = saleDB.filter((order) => {
            return (
                (category === '' || order.category === category) &&
                (channel === '' || order.channel === channel) &&
                (item === '' ||
                    order.item.toLowerCase().includes(item.toLowerCase()))
            );
        });
        for (
            let i = new Date(fromDate);
            i.getTime() < new Date(toDate).getTime();
            i.setDate(i.getDate() + 1)
        ) {
            let orderNum = 0;
            filteredData.forEach((order) => {
                const orderDate = new Date(order.date);
                if (orderDate.toDateString() === i.toDateString()) {
                    orderNum++;
                }
            });
            const formattedDate = i.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            orderArray.push({ x: formattedDate, y: orderNum });
        }

        result = {
            orderArray: orderArray,
            completed: completed,
            pending: pending,
            received: received,
            rejected: rejected
        };
        return result;
    } else {
        const orderArray = [];
        const filteredData = saleDB.filter((order) => {
            return (
                (status === '' || order.status === status) &&
                (category === '' || order.category === category) &&
                (channel === '' || order.channel === channel) &&
                (item === '' ||
                    order.item.toLowerCase().includes(item.toLowerCase()))
            );
        });
        for (
            let i = new Date(fromDate);
            i.getTime() < new Date(toDate).getTime();
            i.setDate(i.getDate() + 1)
        ) {
            let orderNum = 0;
            filteredData.forEach((order) => {
                const orderDate = new Date(order.date);
                if (orderDate.toDateString() === i.toDateString()) {
                    orderNum++;
                }
            });
            const formattedDate = i.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            orderArray.push({ x: formattedDate, y: orderNum });
        }

        result = {
            orderArray: orderArray,
            completed: completed,
            pending: pending,
            received: received,
            rejected: rejected
        };
        return result;
    }
};

mock.onPost('/api/getOrderData').reply(async ({ data }) => {
    const { status, fromDate, toDate, category, item, channel } =
        JSON.parse(data);
    try {
        const result = await new Promise((resolve) => {
            setTimeout(() => {
                const processedResult = process(
                    status,
                    fromDate,
                    toDate,
                    category,
                    item,
                    channel
                );
                resolve(processedResult);
            }, 2000);
        });

        return [200, result];
    } catch (error) {
        console.error(error);
        return [500, 'Internal Server Error'];
    }
});
