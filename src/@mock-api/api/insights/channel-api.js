import _ from '@lodash';
import mockApi from '../../mock-api.json';
import mock from '../../mock';
import format from 'date-fns/format';

const ordersDB = mockApi.database.examples.orders.value;
const channelDB = mockApi.database.examples.channel.value;

mock.onGet('/api/getchanneldata').reply(() => {
    const saleArray = {};
    const orderArray = {};
    const saleTotalByChannel = {};
    const orderTotalByChannel = {};
    channelDB.forEach((channel) => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 29);
        if (!saleArray[channel.name]) {
            saleArray[channel.name] = [];
        }

        if (!orderArray[channel.name]) {
            orderArray[channel.name] = [];
        }

        if (!saleTotalByChannel[channel.name]) {
            saleTotalByChannel[channel.name] = 0;
        }

        if (!orderTotalByChannel[channel.name]) {
            orderTotalByChannel[channel.name] = 0;
        }

        for (let i = 0; i < 30; i++) {
            var sale = 0;
            var order = 0;
            ordersDB.forEach((item) => {
                if (item.channel == channel.name) {
                    const orderDate = new Date(item.history[0].date);
                    if (orderDate.toDateString() === currentDate.toDateString()) {
                        sale = sale + parseInt(item.subtotal);
                        order++;
                    }
                }
            })
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            saleArray[channel.name].push({ x: formattedDate, y: sale });
            orderArray[channel.name].push({ x: formattedDate, y: order });
            saleTotalByChannel[channel.name] = saleTotalByChannel[channel.name] + sale;
            orderTotalByChannel[channel.name] = orderTotalByChannel[channel.name] + order;
            currentDate.setDate(currentDate.getDate() + 1);
        }
    });
    const result = {
        saleArray: saleArray,
        orderArray: orderArray,
        saleTotalByChannel: saleTotalByChannel,
        orderTotalByChannel: orderTotalByChannel
    }
    return [200, result];
});