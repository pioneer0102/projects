/* eslint-disable no-redeclare */
import mock from '../../mock';

const current = new Date();
current.setDate(current.getDate() - 90);

const name = ['John Doe', 'Lion', 'Alexandra'];
const channel = ['DoorDash', 'Uber', 'GubHub'];
const status = ['completed', 'pending', 'received', 'rejected'];
const items = [
    'TISSOT watch',
    'Rolex watch',
    'iOS Handphone',
    'Android Handphone',
    'Uniform',
    'Dress',
    'APPLE',
    'HP',
    'TOSHIBA'
];
const Cagetories = ['Accessory', 'Handphone', 'Clothes', 'Laptop'];

export const saleDB = [];
for (let i = 0; i < 90; i++) {
    for (let j = 0; j < Math.floor(Math.random() * (10 - 1 + 1)) + 1; j++) {
        const item = {
            customer: name[Math.floor(Math.random() * name.length)],
            price: Math.floor(Math.random() * 500) + 1000,
            channel: channel[Math.floor(Math.random() * channel.length)],
            tax: 50,
            tip: 30,
            status: status[Math.floor(Math.random() * status.length)],
            date: new Date(current),
            item: items[Math.floor(Math.random() * items.length)],
            category: Cagetories[Math.floor(Math.random() * Cagetories.length)],
            itemStatus: 'active'
        };
        saleDB.push(item);
    }
    current.setDate(current.getDate() + 1);
}

const processGetSaleData = async (fromDate, toDate, category, item) => {
    const saleArray = [];
    const filterData = saleDB.filter((order) => {
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

    return saleArray;
};

mock.onPost('/api/getSaleData').reply(async ({ data }) => {
    const { fromDate, toDate, category, item } = JSON.parse(data);
    try {
        const saleArray = await new Promise((resolve) => {
            setTimeout(() => {
                const processedResult = processGetSaleData(
                    fromDate,
                    toDate,
                    category,
                    item
                );
                resolve(processedResult);
            }, 2000);
        });

        return [200, saleArray];
    } catch (error) {
        console.error(error);
        return [500, 'Internal Server Error'];
    }
});

const processGetSaleTableData = async (
    pageNumber,
    pageSize,
    fromDate,
    toDate,
    category,
    item
) => {
    const filteredData = saleDB.filter((order) => {
        return (
            (category === '' || order.category === category) &&
            (item === '' ||
                order.item.toLowerCase().includes(item.toLowerCase()))
        );
    });

    const pagedData = [];
    for (
        let i = new Date(fromDate);
        i.getTime() < new Date(toDate).getTime();
        i.setDate(i.getDate() + 1)
    ) {
        filteredData.forEach((sale) => {
            const orderDate = new Date(sale.date);
            if (orderDate.toDateString() === i.toDateString()) {
                pagedData.push(sale);
            }
        });
    }
    const result = {
        pagedData: pagedData.slice(
            pageSize * pageNumber,
            pageSize * pageNumber + pageSize
        ),
        totalCount: pagedData.length
    };

    return result;
};

mock.onPost('/api/getSaleTableData').reply(async ({ data }) => {
    const { rowsPerPage, page, fromDate, toDate, category, item } =
        JSON.parse(data);
    const pageSize = parseInt(rowsPerPage);
    const pageNumber = parseInt(page);

    const result = await processGetSaleTableData(
        pageNumber,
        pageSize,
        fromDate,
        toDate,
        category,
        item
    );

    return [200, result];
});
