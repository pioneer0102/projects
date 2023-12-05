const SubTotals = [
    "$10 - $100",
    "$100 - $500",
    "$500 - $1000",
    "$1000 - $5000",
    "$5000 - $10000"
];

const Status = [
    "Completed",
    "Pending",
    "Rejected"
];

const OrdersListHeader = [
    {
        id: 'customer',
        align: 'left',
        label: 'Customer',
    },
    {
        id: 'datetime',
        align: 'left',
        label: 'Datetime',
    },
    {
        id: 'subtotal',
        align: 'left',
        label: 'Subtotal',
    },
    {
        id: 'channel',
        align: 'left',
        label: 'Channel',
    },
    {
        id: 'status',
        align: 'left',
        label: 'Status',
    },
    {
        id: 'action',
        align: 'left',
        label: 'Action',
    },
];

const OrderDetailCustomHeader = [
    {
        id: 'customer',
        align: 'left',
        label: 'Customer',
    },
    {
        id: 'datetime',
        align: 'left',
        label: 'Datetime',
    },
    {
        id: 'channel',
        align: 'left',
        label: 'Channel',
    },
    {
        id: 'status',
        align: 'left',
        label: 'Status',
        sort: true,
    },
];

const OrderDetailContentHeader = [
    {
        id: 'image',
        align: 'left',
        label: 'Image',
    },
    {
        id: 'productname',
        align: 'left',
        label: 'Product Name',
    },
    {
        id: 'price',
        align: 'left',
        label: 'Price',
    },
    {
        id: 'quantity',
        align: 'left',
        label: 'Quantity',
    },

];

export { SubTotals, Status, OrdersListHeader, OrderDetailCustomHeader, OrderDetailContentHeader };