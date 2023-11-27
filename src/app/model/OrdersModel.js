const SubTotals = [
    "$10 - $100",
    "$100 - $500",
    "$500 - $1000",
    "$1000 - $5000",
    "$5000 - $10000"
];

const Channels = [
    "DoorDash",
    "Uber",
    "GrubHub"
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
        disablePadding: true,
        label: 'Customer',
        sort: true,
    },
    {
        id: 'datetime',
        align: 'left',
        disablePadding: false,
        label: 'Datetime',
        sort: true,
    },
    {
        id: 'subtotal',
        align: 'left',
        disablePadding: true,
        label: 'Subtotal',
        sort: true,
    },
    {
        id: 'channel',
        align: 'left',
        disablePadding: true,
        label: 'Channel',
        sort: true,
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: true,
        label: 'Status',
        sort: true,
    },
    {
        id: 'action',
        align: 'left',
        disablePadding: true,
        label: 'Action',
        sort: true,
    },
];

const OrderDetailCustomHeader = [
    {
        id: 'customer',
        align: 'left',
        disablePadding: true,
        label: 'Customer',
        sort: true,
    },
    {
        id: 'datetime',
        align: 'left',
        disablePadding: false,
        label: 'Datetime',
        sort: true,
    },
    {
        id: 'channel',
        align: 'left',
        disablePadding: true,
        label: 'Channel',
        sort: true,
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: true,
        label: 'Status',
        sort: true,
    },
];

const OrderDetailContentHeader = [
    {
        id: 'image',
        align: 'left',
        disablePadding: true,
        label: 'Image',
        sort: true,
    },
    {
        id: 'productname',
        align: 'left',
        disablePadding: false,
        label: 'Product Name',
        sort: true,
    },
    {
        id: 'price',
        align: 'left',
        disablePadding: true,
        label: 'Price',
        sort: true,
    },
    {
        id: 'quantity',
        align: 'left',
        disablePadding: true,
        label: 'Quantity',
        sort: true,
    },

];

export { SubTotals, Channels, Status, OrdersListHeader, OrderDetailCustomHeader, OrderDetailContentHeader };