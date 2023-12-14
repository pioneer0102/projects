/* eslint-disable no-redeclare */
import mock from '../../mock';
import { saleDB } from './sale-api';

mock.onPost('/api/getorderData').reply(({ data }) => {
    const { status, fromDate, toDate, category, item } = JSON.parse(data);
    const diffDate = Math.floor(
        (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)
    );
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
    for (
        let i = new Date(fromDate);
        i.getTime() < new Date(toDate).getTime();
        i.setDate(i.getDate() + 1)
    ) {
        var orderNum = 0;
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
        var orderNum = 0;
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
    // for (let i = 0; i < 30; i++) {
    //     saleDB.forEach((order) => {
    //         const orderDate = new Date(order.date);
    //         if (orderDate.toDateString() === currentDate.toDateString()) {
    //             if (order.status === 'completed') completed.current++;
    //             if (order.status === 'pending') pending.current++;
    //             if (order.status === 'received') received.current++;
    //             if (order.status === 'rejected') rejected.current++;
    //         }
    //     });
    //     currentDate.setDate(currentDate.getDate() - 1);
    // }

    // for (let i = 0; i < 30; i++) {
    //     saleDB.forEach((order) => {
    //         const orderDate = new Date(order.date);
    //         if (orderDate.toDateString() === currentDate.toDateString()) {
    //             if (order.status === 'completed') completed.previous++;
    //             if (order.status === 'pending') pending.previous++;
    //             if (order.status === 'received') received.previous++;
    //             if (order.status === 'rejected') rejected.previous++;
    //         }
    //     });
    //     currentDate.setDate(currentDate.getDate() - 1);
    // }

    if (status === 'all') {
        const orderArray = [];
        // const currentDate = new Date();
        // currentDate.setDate(currentDate.getDate() - 29);

        // for (let i = 0; i < 30; i++) {
        //     var orderNum = 0;
        //     saleDB.forEach((order) => {
        //         const orderDate = new Date(order.date);
        //         if (orderDate.toDateString() === currentDate.toDateString()) {
        //             orderNum++;
        //         }
        //     });
        //     const formattedDate = currentDate.toLocaleDateString('en-US', {
        //         month: 'long',
        //         day: 'numeric',
        //         year: 'numeric'
        //     });
        //     orderArray.push({ x: formattedDate, y: orderNum });
        //     currentDate.setDate(currentDate.getDate() + 1);
        // }
        const filteredData = saleDB.filter((order) => {
            return (
                (category === '' || order.category === category) &&
                (item === '' ||
                    order.item.toLowerCase().includes(item.toLowerCase()))
            );
        });
        for (
            let i = new Date(fromDate);
            i.getTime() < new Date(toDate).getTime();
            i.setDate(i.getDate() + 1)
        ) {
            var orderNum = 0;
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
        const filteredData = saleDB.filter((order) => {
            return (
                (status === '' || order.status === status) &&
                (category === '' || order.category === category) &&
                (item === '' ||
                    order.item.toLowerCase().includes(item.toLowerCase()))
            );
        });
        for (
            let i = new Date(fromDate);
            i.getTime() < new Date(toDate).getTime();
            i.setDate(i.getDate() + 1)
        ) {
            var orderNum = 0;
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
