/* eslint-disable no-redeclare */
import mockApi from '../../mock-api.json';
import mock from '../../mock';

const saleDB = mockApi.database.examples.sale.value;

mock.onPost('/api/getsaleData').reply(({ data }) => {
    const { fromDate, toDate, category, item } = JSON.parse(data);
    if (fromDate === '' && toDate === '' && category === '' && item === '') {
        const saleArray = [];
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 29);

        for (let i = 0; i < 30; i++) {
            var sale = 0;
            saleDB.forEach((order) => {
                const orderDate = new Date(order.date);
                if (orderDate.toDateString() === currentDate.toDateString()) {
                    sale = sale + parseInt(order.price);
                }
            });
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            currentDate.setDate(currentDate.getDate() + 1);
            saleArray.push({ x: formattedDate, y: sale });
        }

        return [200, saleArray];
    } else {
        const saleArray = [];
        if (fromDate === '' && toDate === '') {
            const filterData = saleDB.filter((order) => {
                return (
                    (category === '' || order.category === category) &&
                    (item === '' || order.item === item)
                );
            });
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - 29);

            for (let i = 0; i < 30; i++) {
                var sale = 0;
                filterData.forEach((order) => {
                    const orderDate = new Date(order.date);
                    if (
                        orderDate.toDateString() === currentDate.toDateString()
                    ) {
                        sale = sale + parseInt(order.price);
                    }
                });
                const formattedDate = currentDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                currentDate.setDate(currentDate.getDate() + 1);
                saleArray.push({ x: formattedDate, y: sale });
            }
            return [200, saleArray];
        }
        if (fromDate !== '' && toDate !== '') {
            const filterData = saleDB.filter((order) => {
                return (
                    (category === '' || order.category === category) &&
                    (item === '' || order.item === item)
                );
            });
            for (
                let i = fromDate.toDateString();
                i < toDate.toDateString();
                i++
            ) {
                var sale = 0;
                filterData.forEach((order) => {
                    const orderDate = new Date(order.date);
                    if (orderDate.toDateString() === i.toDateString()) {
                        sale = sale + parseInt(order.price);
                    }
                });
                const formattedDate = i.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                });
                saleArray.push({ x: formattedDate, y: sale });
            }
            return [200, saleArray];
        }
    }
});
