const SubTotals = [
    "$10 - $100",
    "$100 - $500",
    "$500 - $1000",
    "$1000 - $5000",
    "$5000 - $10000"
];

const Status = [
    "completed",
    "pickedup",
    "pending",
    "received",
    "rejected"
];

const ItemStatus = [
    "replaced",
    "canceled"
]

const OrdersListHeader = [
    {
        id: 'channel',
        align: 'left',
        label: 'Channel',
    },
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
        id: 'channel',
        align: 'left',
        label: 'Channel',
    },
    {
        id: 'datetime',
        align: 'left',
        label: 'Datetime',
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
        id: 'quantity',
        align: 'left',
        label: 'Quantity',
    },
    {
        id: 'price',
        align: 'left',
        label: 'Price',
    },
    {
        id: 'status',
        align: 'left',
        label: 'Status',
    },
    {
        id: 'price',
        align: 'left',
        label: '',
    },
];

export { SubTotals, Status, OrdersListHeader, OrderDetailCustomHeader, OrderDetailContentHeader, ItemStatus };