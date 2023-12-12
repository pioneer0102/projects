const SaleTableHeader = [
    {
        id: 'date',
        align: 'left',
        label: 'Date'
    },
    {
        id: 'customer',
        align: 'left',
        label: 'Customer'
    },
    {
        id: 'channel',
        align: 'left',
        label: 'Channel'
    },
    {
        id: 'item',
        align: 'left',
        label: 'Item'
    },
    {
        id: 'sale',
        align: 'left',
        label: 'Sale'
    }
];

const Status = [
    'all',
    'completed',
    'pickedup',
    'pending',
    'received',
    'rejected'
];

export { SaleTableHeader, Status };
