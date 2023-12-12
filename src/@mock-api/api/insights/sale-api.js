/* eslint-disable no-redeclare */
import mock from '../../mock';

const current = new Date();
current.setDate(current.getDate() - 365);

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

let saleDB = [];
for (let i = 0; i < 365; i++) {
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

mock.onPost('/api/getsaleData').reply(({ data }) => {
    const { fromDate, toDate, category, item } = JSON.parse(data);
    if (fromDate === '' && toDate === '' && category === '' && item === '') {
        const saleArray = [];
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 365);

        for (let i = 0; i < 365; i++) {
            let sale = 0;
            saleDB.forEach((order) => {
                const orderDate = new Date(order.date);
                if (orderDate.toDateString() === currentDate.toDateString()) {
                    console.log('erer');
                    sale = sale + parseInt(order.price);
                }
            });
            const formattedDate = currentDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
            saleArray.push({ x: formattedDate, y: sale });
            currentDate.setDate(currentDate.getDate() + 1);
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
            currentDate.setDate(currentDate.getDate() - 365);

            for (let i = 0; i < 365; i++) {
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
                saleArray.push({ x: formattedDate, y: sale });
                currentDate.setDate(currentDate.getDate() + 1);
            }
            return [200, saleArray];
        }
        if (fromDate !== '' && toDate !== '') {
            if (new Date(toDate) <= new Date(fromDate)) {
                return [200, { success: 'error date' }];
            }
            const filterData = saleDB.filter((order) => {
                return (
                    (category === '' || order.category === category) &&
                    (item === '' || order.item === item)
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
            return [200, saleArray];
        } else {
            return [200, { graph: 'keep' }];
        }
    }
});

mock.onPost('/api/getSaleTableData').reply(({ data }) => {
    const { rowsPerPage, page, fromDate, toDate, category, item } =
        JSON.parse(data);
    const pageSize = parseInt(rowsPerPage);
    const pageNumber = parseInt(page);
    if (fromDate === '' && toDate === '' && category === '' && item === '') {
        const currentDate = new Date();
        const pagedData = [];
        for (let i = 0; i < 365; i++) {
            saleDB.forEach((sale) => {
                const orderDate = new Date(sale.date);
                if (orderDate.toDateString() === currentDate.toDateString()) {
                    pagedData.push(sale);
                }
            });
            currentDate.setDate(currentDate.getDate() - 1);
        }
        const result = {
            pagedData: pagedData.slice(
                pageSize * pageNumber,
                pageSize * pageNumber + pageSize
            ),
            totalCount: pagedData.length
        };
        return [200, result];
    } else {
        if (fromDate === '' && toDate === '') {
            const filteredData = saleDB.filter((order) => {
                return (
                    (category === '' || order.category === category) &&
                    (item === '' || order.item === item)
                );
            });
            const pagedData = [];
            const currentDate = new Date();
            for (let i = 0; i < 365; i++) {
                filteredData.forEach((sale) => {
                    const orderDate = new Date(sale.date);
                    if (
                        orderDate.toDateString() === currentDate.toDateString()
                    ) {
                        pagedData.push(sale);
                    }
                });
                currentDate.setDate(currentDate.getDate() - 1);
            }
            const result = {
                pagedData: pagedData.slice(
                    pageSize * pageNumber,
                    pageSize * pageNumber + pageSize
                ),
                totalCount: pagedData.length
            };
            return [200, result];
        }
        if (fromDate !== '' && toDate !== '') {
            if (new Date(toDate) <= new Date(fromDate)) {
                return [200, { success: 'error date' }];
            }
            const filteredData = saleDB.filter((order) => {
                return (
                    (category === '' || order.category === category) &&
                    (item === '' || order.item === item)
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
            return [200, result];
        } else {
            return [200, { table: 'keep' }];
        }
    }
});
